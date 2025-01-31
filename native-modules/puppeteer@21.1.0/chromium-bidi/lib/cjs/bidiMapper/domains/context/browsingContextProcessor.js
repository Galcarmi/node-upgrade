"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowsingContextProcessor = void 0;
const protocol_js_1 = require("../../../protocol/protocol.js");
const log_js_1 = require("../../../utils/log.js");
const browsingContextImpl_js_1 = require("./browsingContextImpl.js");
const cdpTarget_js_1 = require("./cdpTarget.js");
class BrowsingContextProcessor {
    #cdpConnection;
    #selfTargetId;
    #eventManager;
    #browsingContextStorage;
    #preloadScriptStorage;
    #realmStorage;
    #logger;
    constructor(cdpConnection, selfTargetId, eventManager, browsingContextStorage, realmStorage, preloadScriptStorage, logger) {
        this.#cdpConnection = cdpConnection;
        this.#selfTargetId = selfTargetId;
        this.#eventManager = eventManager;
        this.#browsingContextStorage = browsingContextStorage;
        this.#preloadScriptStorage = preloadScriptStorage;
        this.#realmStorage = realmStorage;
        this.#logger = logger;
        this.#setEventListeners(this.#cdpConnection.browserClient());
    }
    getTree(params) {
        const resultContexts = params.root === undefined
            ? this.#browsingContextStorage.getTopLevelContexts()
            : [this.#browsingContextStorage.getContext(params.root)];
        return {
            contexts: resultContexts.map((c) => c.serializeToBidiValue(params.maxDepth ?? Number.MAX_VALUE)),
        };
    }
    async create(params) {
        const browserCdpClient = this.#cdpConnection.browserClient();
        let referenceContext;
        if (params.referenceContext !== undefined) {
            referenceContext = this.#browsingContextStorage.getContext(params.referenceContext);
            if (!referenceContext.isTopLevelContext()) {
                throw new protocol_js_1.InvalidArgumentException(`referenceContext should be a top-level context`);
            }
        }
        let result;
        switch (params.type) {
            case "tab" /* BrowsingContext.CreateType.Tab */:
                result = await browserCdpClient.sendCommand('Target.createTarget', {
                    url: 'about:blank',
                    newWindow: false,
                });
                break;
            case "window" /* BrowsingContext.CreateType.Window */:
                result = await browserCdpClient.sendCommand('Target.createTarget', {
                    url: 'about:blank',
                    newWindow: true,
                });
                break;
        }
        // Wait for the new tab to be loaded to avoid race conditions in the
        // `browsingContext` events, when the `browsingContext.domContentLoaded` and
        // `browsingContext.load` events from the initial `about:blank` navigation
        // are emitted after the next navigation is started.
        // Details: https://github.com/web-platform-tests/wpt/issues/35846
        const contextId = result.targetId;
        const context = this.#browsingContextStorage.getContext(contextId);
        await context.lifecycleLoaded();
        return { context: context.id };
    }
    navigate(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return context.navigate(params.url, params.wait ?? "none" /* BrowsingContext.ReadinessState.None */);
    }
    reload(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return context.reload(params.ignoreCache ?? false, params.wait ?? "none" /* BrowsingContext.ReadinessState.None */);
    }
    async activate(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        if (!context.isTopLevelContext()) {
            throw new protocol_js_1.InvalidArgumentException('Activation is only supported on the top-level context');
        }
        await context.activate();
        return {};
    }
    async captureScreenshot(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return context.captureScreenshot();
    }
    async print(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        return context.print(params);
    }
    async setViewport(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        if (!context.isTopLevelContext()) {
            throw new protocol_js_1.InvalidArgumentException('Emulating viewport is only supported on the top-level context');
        }
        await context.setViewport(params.viewport);
        return {};
    }
    async handleUserPrompt(params) {
        const context = this.#browsingContextStorage.getContext(params.context);
        await context.handleUserPrompt(params);
        return {};
    }
    async close(commandParams) {
        const context = this.#browsingContextStorage.getContext(commandParams.context);
        if (!context.isTopLevelContext()) {
            throw new protocol_js_1.InvalidArgumentException(`Non top-level browsing context ${context.id} cannot be closed.`);
        }
        try {
            const browserCdpClient = this.#cdpConnection.browserClient();
            const detachedFromTargetPromise = new Promise((resolve) => {
                const onContextDestroyed = (event) => {
                    if (event.targetId === commandParams.context) {
                        browserCdpClient.off('Target.detachedFromTarget', onContextDestroyed);
                        resolve();
                    }
                };
                browserCdpClient.on('Target.detachedFromTarget', onContextDestroyed);
            });
            await context.close();
            // Sometimes CDP command finishes before `detachedFromTarget` event,
            // sometimes after. Wait for the CDP command to be finished, and then wait
            // for `detachedFromTarget` if it hasn't emitted.
            await detachedFromTargetPromise;
        }
        catch (error) {
            // Swallow error that arise from the page being destroyed
            // Example is navigating to faulty SSL certificate
            if (!(error.code === -32000 &&
                error.message === 'Not attached to an active page')) {
                throw error;
            }
        }
        return {};
    }
    /**
     * This method is called for each CDP session, since this class is responsible
     * for creating and destroying all targets and browsing contexts.
     */
    #setEventListeners(cdpClient) {
        cdpClient.on('Target.attachedToTarget', (params) => {
            this.#handleAttachedToTargetEvent(params, cdpClient);
        });
        cdpClient.on('Target.detachedFromTarget', (params) => {
            this.#handleDetachedFromTargetEvent(params);
        });
        cdpClient.on('Target.targetInfoChanged', (params) => {
            this.#handleTargetInfoChangedEvent(params);
        });
        cdpClient.on('Page.frameAttached', (params) => {
            this.#handleFrameAttachedEvent(params);
        });
        cdpClient.on('Page.frameDetached', (params) => {
            this.#handleFrameDetachedEvent(params);
        });
    }
    #handleFrameAttachedEvent(params) {
        const parentBrowsingContext = this.#browsingContextStorage.findContext(params.parentFrameId);
        if (parentBrowsingContext !== undefined) {
            browsingContextImpl_js_1.BrowsingContextImpl.create(parentBrowsingContext.cdpTarget, this.#realmStorage, params.frameId, params.parentFrameId, this.#eventManager, this.#browsingContextStorage, this.#logger);
        }
    }
    #handleFrameDetachedEvent(params) {
        // In case of OOPiF no need in deleting BrowsingContext.
        if (params.reason === 'swap') {
            return;
        }
        this.#browsingContextStorage.findContext(params.frameId)?.dispose();
    }
    #handleAttachedToTargetEvent(params, parentSessionCdpClient) {
        const { sessionId, targetInfo } = params;
        const targetCdpClient = this.#cdpConnection.getCdpClient(sessionId);
        if (!this.#isValidTarget(targetInfo)) {
            // DevTools or some other not supported by BiDi target. Just release
            // debugger  and ignore them.
            targetCdpClient
                .sendCommand('Runtime.runIfWaitingForDebugger')
                .then(() => parentSessionCdpClient.sendCommand('Target.detachFromTarget', params))
                .catch((error) => this.#logger?.(log_js_1.LogType.system, error));
            return;
        }
        this.#logger?.(log_js_1.LogType.browsingContexts, 'AttachedToTarget event received:', JSON.stringify(params, null, 2));
        this.#setEventListeners(targetCdpClient);
        const maybeContext = this.#browsingContextStorage.findContext(targetInfo.targetId);
        const cdpTarget = cdpTarget_js_1.CdpTarget.create(targetInfo.targetId, targetCdpClient, sessionId, this.#realmStorage, this.#eventManager, this.#preloadScriptStorage);
        if (maybeContext) {
            // OOPiF.
            maybeContext.updateCdpTarget(cdpTarget);
        }
        else {
            // New context.
            browsingContextImpl_js_1.BrowsingContextImpl.create(cdpTarget, this.#realmStorage, targetInfo.targetId, null, this.#eventManager, this.#browsingContextStorage, this.#logger);
        }
    }
    #handleDetachedFromTargetEvent(params) {
        // XXX: params.targetId is deprecated. Update this class to track using
        // params.sessionId instead.
        // https://github.com/GoogleChromeLabs/chromium-bidi/issues/60
        const contextId = params.targetId;
        this.#browsingContextStorage.findContext(contextId)?.dispose();
        this.#preloadScriptStorage
            .findPreloadScripts({ targetId: contextId })
            .map((preloadScript) => preloadScript.dispose(contextId));
    }
    #handleTargetInfoChangedEvent(params) {
        const contextId = params.targetInfo.targetId;
        this.#browsingContextStorage
            .findContext(contextId)
            ?.onTargetInfoChanged(params);
    }
    #isValidTarget(target) {
        if (target.targetId === this.#selfTargetId) {
            return false;
        }
        return ['page', 'iframe'].includes(target.type);
    }
}
exports.BrowsingContextProcessor = BrowsingContextProcessor;
//# sourceMappingURL=browsingContextProcessor.js.map