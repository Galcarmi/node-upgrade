"use strict";
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CDPPage_instances, _CDPPage_closed, _CDPPage_client, _CDPPage_target, _CDPPage_keyboard, _CDPPage_mouse, _CDPPage_timeoutSettings, _CDPPage_touchscreen, _CDPPage_accessibility, _CDPPage_frameManager, _CDPPage_emulationManager, _CDPPage_tracing, _CDPPage_bindings, _CDPPage_exposedFunctions, _CDPPage_coverage, _CDPPage_viewport, _CDPPage_screenshotTaskQueue, _CDPPage_workers, _CDPPage_fileChooserDeferreds, _CDPPage_sessionCloseDeferred, _CDPPage_serviceWorkerBypassed, _CDPPage_userDragInterceptionEnabled, _CDPPage_onDetachedFromTarget, _CDPPage_onAttachedToTarget, _CDPPage_initialize, _CDPPage_onFileChooser, _CDPPage_onTargetCrashed, _CDPPage_onLogEntryAdded, _CDPPage_emitMetrics, _CDPPage_buildMetricsObject, _CDPPage_handleException, _CDPPage_onConsoleAPI, _CDPPage_onBindingCalled, _CDPPage_addConsoleMessage, _CDPPage_onDialog, _CDPPage_go, _CDPPage_screenshotTask;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CDPPage = void 0;
const Page_js_1 = require("../api/Page.js");
const assert_js_1 = require("../util/assert.js");
const Deferred_js_1 = require("../util/Deferred.js");
const ErrorLike_js_1 = require("../util/ErrorLike.js");
const Accessibility_js_1 = require("./Accessibility.js");
const Binding_js_1 = require("./Binding.js");
const Connection_js_1 = require("./Connection.js");
const ConsoleMessage_js_1 = require("./ConsoleMessage.js");
const Coverage_js_1 = require("./Coverage.js");
const Dialog_js_1 = require("./Dialog.js");
const EmulationManager_js_1 = require("./EmulationManager.js");
const Errors_js_1 = require("./Errors.js");
const FileChooser_js_1 = require("./FileChooser.js");
const FrameManager_js_1 = require("./FrameManager.js");
const Input_js_1 = require("./Input.js");
const IsolatedWorlds_js_1 = require("./IsolatedWorlds.js");
const NetworkManager_js_1 = require("./NetworkManager.js");
const TimeoutSettings_js_1 = require("./TimeoutSettings.js");
const Tracing_js_1 = require("./Tracing.js");
const util_js_1 = require("./util.js");
const WebWorker_js_1 = require("./WebWorker.js");
/**
 * @internal
 */
class CDPPage extends Page_js_1.Page {
    /**
     * @internal
     */
    static async _create(client, target, ignoreHTTPSErrors, defaultViewport, screenshotTaskQueue) {
        const page = new CDPPage(client, target, ignoreHTTPSErrors, screenshotTaskQueue);
        await __classPrivateFieldGet(page, _CDPPage_instances, "m", _CDPPage_initialize).call(page);
        if (defaultViewport) {
            try {
                await page.setViewport(defaultViewport);
            }
            catch (err) {
                if ((0, ErrorLike_js_1.isErrorLike)(err) && (0, Connection_js_1.isTargetClosedError)(err)) {
                    (0, util_js_1.debugError)(err);
                }
                else {
                    throw err;
                }
            }
        }
        return page;
    }
    /**
     * @internal
     */
    constructor(client, target, ignoreHTTPSErrors, screenshotTaskQueue) {
        super();
        _CDPPage_instances.add(this);
        _CDPPage_closed.set(this, false);
        _CDPPage_client.set(this, void 0);
        _CDPPage_target.set(this, void 0);
        _CDPPage_keyboard.set(this, void 0);
        _CDPPage_mouse.set(this, void 0);
        _CDPPage_timeoutSettings.set(this, new TimeoutSettings_js_1.TimeoutSettings());
        _CDPPage_touchscreen.set(this, void 0);
        _CDPPage_accessibility.set(this, void 0);
        _CDPPage_frameManager.set(this, void 0);
        _CDPPage_emulationManager.set(this, void 0);
        _CDPPage_tracing.set(this, void 0);
        _CDPPage_bindings.set(this, new Map());
        _CDPPage_exposedFunctions.set(this, new Map());
        _CDPPage_coverage.set(this, void 0);
        _CDPPage_viewport.set(this, void 0);
        _CDPPage_screenshotTaskQueue.set(this, void 0);
        _CDPPage_workers.set(this, new Map());
        _CDPPage_fileChooserDeferreds.set(this, new Set());
        _CDPPage_sessionCloseDeferred.set(this, Deferred_js_1.Deferred.create());
        _CDPPage_serviceWorkerBypassed.set(this, false);
        _CDPPage_userDragInterceptionEnabled.set(this, false);
        _CDPPage_onDetachedFromTarget.set(this, (target) => {
            const sessionId = target._session()?.id();
            const worker = __classPrivateFieldGet(this, _CDPPage_workers, "f").get(sessionId);
            if (!worker) {
                return;
            }
            __classPrivateFieldGet(this, _CDPPage_workers, "f").delete(sessionId);
            this.emit("workerdestroyed" /* PageEmittedEvents.WorkerDestroyed */, worker);
        });
        _CDPPage_onAttachedToTarget.set(this, (createdTarget) => {
            __classPrivateFieldGet(this, _CDPPage_frameManager, "f").onAttachedToTarget(createdTarget);
            if (createdTarget._getTargetInfo().type === 'worker') {
                const session = createdTarget._session();
                (0, assert_js_1.assert)(session);
                const worker = new WebWorker_js_1.WebWorker(session, createdTarget.url(), __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_addConsoleMessage).bind(this), __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_handleException).bind(this));
                __classPrivateFieldGet(this, _CDPPage_workers, "f").set(session.id(), worker);
                this.emit("workercreated" /* PageEmittedEvents.WorkerCreated */, worker);
            }
            if (createdTarget._session()) {
                __classPrivateFieldGet(this, _CDPPage_target, "f")
                    ._targetManager()
                    .addTargetInterceptor(createdTarget._session(), __classPrivateFieldGet(this, _CDPPage_onAttachedToTarget, "f"));
            }
        });
        __classPrivateFieldSet(this, _CDPPage_client, client, "f");
        __classPrivateFieldSet(this, _CDPPage_target, target, "f");
        __classPrivateFieldSet(this, _CDPPage_keyboard, new Input_js_1.Keyboard(client), "f");
        __classPrivateFieldSet(this, _CDPPage_mouse, new Input_js_1.Mouse(client, __classPrivateFieldGet(this, _CDPPage_keyboard, "f")), "f");
        __classPrivateFieldSet(this, _CDPPage_touchscreen, new Input_js_1.Touchscreen(client, __classPrivateFieldGet(this, _CDPPage_keyboard, "f")), "f");
        __classPrivateFieldSet(this, _CDPPage_accessibility, new Accessibility_js_1.Accessibility(client), "f");
        __classPrivateFieldSet(this, _CDPPage_frameManager, new FrameManager_js_1.FrameManager(client, this, ignoreHTTPSErrors, __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f")), "f");
        __classPrivateFieldSet(this, _CDPPage_emulationManager, new EmulationManager_js_1.EmulationManager(client), "f");
        __classPrivateFieldSet(this, _CDPPage_tracing, new Tracing_js_1.Tracing(client), "f");
        __classPrivateFieldSet(this, _CDPPage_coverage, new Coverage_js_1.Coverage(client), "f");
        __classPrivateFieldSet(this, _CDPPage_screenshotTaskQueue, screenshotTaskQueue, "f");
        __classPrivateFieldSet(this, _CDPPage_viewport, null, "f");
        __classPrivateFieldGet(this, _CDPPage_target, "f")
            ._targetManager()
            .addTargetInterceptor(__classPrivateFieldGet(this, _CDPPage_client, "f"), __classPrivateFieldGet(this, _CDPPage_onAttachedToTarget, "f"));
        __classPrivateFieldGet(this, _CDPPage_target, "f")
            ._targetManager()
            .on("targetGone" /* TargetManagerEmittedEvents.TargetGone */, __classPrivateFieldGet(this, _CDPPage_onDetachedFromTarget, "f"));
        __classPrivateFieldGet(this, _CDPPage_frameManager, "f").on(FrameManager_js_1.FrameManagerEmittedEvents.FrameAttached, event => {
            return this.emit("frameattached" /* PageEmittedEvents.FrameAttached */, event);
        });
        __classPrivateFieldGet(this, _CDPPage_frameManager, "f").on(FrameManager_js_1.FrameManagerEmittedEvents.FrameDetached, event => {
            return this.emit("framedetached" /* PageEmittedEvents.FrameDetached */, event);
        });
        __classPrivateFieldGet(this, _CDPPage_frameManager, "f").on(FrameManager_js_1.FrameManagerEmittedEvents.FrameNavigated, event => {
            return this.emit("framenavigated" /* PageEmittedEvents.FrameNavigated */, event);
        });
        const networkManager = __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager;
        networkManager.on(NetworkManager_js_1.NetworkManagerEmittedEvents.Request, event => {
            return this.emit("request" /* PageEmittedEvents.Request */, event);
        });
        networkManager.on(NetworkManager_js_1.NetworkManagerEmittedEvents.RequestServedFromCache, event => {
            return this.emit("requestservedfromcache" /* PageEmittedEvents.RequestServedFromCache */, event);
        });
        networkManager.on(NetworkManager_js_1.NetworkManagerEmittedEvents.Response, event => {
            return this.emit("response" /* PageEmittedEvents.Response */, event);
        });
        networkManager.on(NetworkManager_js_1.NetworkManagerEmittedEvents.RequestFailed, event => {
            return this.emit("requestfailed" /* PageEmittedEvents.RequestFailed */, event);
        });
        networkManager.on(NetworkManager_js_1.NetworkManagerEmittedEvents.RequestFinished, event => {
            return this.emit("requestfinished" /* PageEmittedEvents.RequestFinished */, event);
        });
        client.once(Connection_js_1.CDPSessionEmittedEvents.Disconnected, () => {
            return __classPrivateFieldGet(this, _CDPPage_sessionCloseDeferred, "f").resolve(new Errors_js_1.TargetCloseError('Target closed'));
        });
        client.on('Page.domContentEventFired', () => {
            return this.emit("domcontentloaded" /* PageEmittedEvents.DOMContentLoaded */);
        });
        client.on('Page.loadEventFired', () => {
            return this.emit("load" /* PageEmittedEvents.Load */);
        });
        client.on('Runtime.consoleAPICalled', event => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_onConsoleAPI).call(this, event);
        });
        client.on('Runtime.bindingCalled', event => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_onBindingCalled).call(this, event);
        });
        client.on('Page.javascriptDialogOpening', event => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_onDialog).call(this, event);
        });
        client.on('Runtime.exceptionThrown', exception => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_handleException).call(this, exception.exceptionDetails);
        });
        client.on('Inspector.targetCrashed', () => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_onTargetCrashed).call(this);
        });
        client.on('Performance.metrics', event => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_emitMetrics).call(this, event);
        });
        client.on('Log.entryAdded', event => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_onLogEntryAdded).call(this, event);
        });
        client.on('Page.fileChooserOpened', event => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_onFileChooser).call(this, event);
        });
        __classPrivateFieldGet(this, _CDPPage_target, "f")._isClosedDeferred
            .valueOrThrow()
            .then(() => {
            __classPrivateFieldGet(this, _CDPPage_target, "f")
                ._targetManager()
                .removeTargetInterceptor(__classPrivateFieldGet(this, _CDPPage_client, "f"), __classPrivateFieldGet(this, _CDPPage_onAttachedToTarget, "f"));
            __classPrivateFieldGet(this, _CDPPage_target, "f")
                ._targetManager()
                .off("targetGone" /* TargetManagerEmittedEvents.TargetGone */, __classPrivateFieldGet(this, _CDPPage_onDetachedFromTarget, "f"));
            this.emit("close" /* PageEmittedEvents.Close */);
            __classPrivateFieldSet(this, _CDPPage_closed, true, "f");
        })
            .catch(util_js_1.debugError);
    }
    /**
     * @internal
     */
    _client() {
        return __classPrivateFieldGet(this, _CDPPage_client, "f");
    }
    isServiceWorkerBypassed() {
        return __classPrivateFieldGet(this, _CDPPage_serviceWorkerBypassed, "f");
    }
    isDragInterceptionEnabled() {
        return __classPrivateFieldGet(this, _CDPPage_userDragInterceptionEnabled, "f");
    }
    isJavaScriptEnabled() {
        return __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").javascriptEnabled;
    }
    waitForFileChooser(options = {}) {
        const needsEnable = __classPrivateFieldGet(this, _CDPPage_fileChooserDeferreds, "f").size === 0;
        const { timeout = __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
        const deferred = Deferred_js_1.Deferred.create({
            message: `Waiting for \`FileChooser\` failed: ${timeout}ms exceeded`,
            timeout,
        });
        __classPrivateFieldGet(this, _CDPPage_fileChooserDeferreds, "f").add(deferred);
        let enablePromise;
        if (needsEnable) {
            enablePromise = __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.setInterceptFileChooserDialog', {
                enabled: true,
            });
        }
        return Promise.all([deferred.valueOrThrow(), enablePromise])
            .then(([result]) => {
            return result;
        })
            .catch(error => {
            __classPrivateFieldGet(this, _CDPPage_fileChooserDeferreds, "f").delete(deferred);
            throw error;
        });
    }
    async setGeolocation(options) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").setGeolocation(options);
    }
    target() {
        return __classPrivateFieldGet(this, _CDPPage_target, "f");
    }
    browser() {
        return __classPrivateFieldGet(this, _CDPPage_target, "f").browser();
    }
    browserContext() {
        return __classPrivateFieldGet(this, _CDPPage_target, "f").browserContext();
    }
    mainFrame() {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").mainFrame();
    }
    get keyboard() {
        return __classPrivateFieldGet(this, _CDPPage_keyboard, "f");
    }
    get touchscreen() {
        return __classPrivateFieldGet(this, _CDPPage_touchscreen, "f");
    }
    get coverage() {
        return __classPrivateFieldGet(this, _CDPPage_coverage, "f");
    }
    get tracing() {
        return __classPrivateFieldGet(this, _CDPPage_tracing, "f");
    }
    get accessibility() {
        return __classPrivateFieldGet(this, _CDPPage_accessibility, "f");
    }
    frames() {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").frames();
    }
    workers() {
        return Array.from(__classPrivateFieldGet(this, _CDPPage_workers, "f").values());
    }
    async setRequestInterception(value) {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.setRequestInterception(value);
    }
    async setBypassServiceWorker(bypass) {
        __classPrivateFieldSet(this, _CDPPage_serviceWorkerBypassed, bypass, "f");
        return __classPrivateFieldGet(this, _CDPPage_client, "f").send('Network.setBypassServiceWorker', { bypass });
    }
    async setDragInterception(enabled) {
        __classPrivateFieldSet(this, _CDPPage_userDragInterceptionEnabled, enabled, "f");
        return __classPrivateFieldGet(this, _CDPPage_client, "f").send('Input.setInterceptDrags', { enabled });
    }
    setOfflineMode(enabled) {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.setOfflineMode(enabled);
    }
    emulateNetworkConditions(networkConditions) {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.emulateNetworkConditions(networkConditions);
    }
    setDefaultNavigationTimeout(timeout) {
        __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").setDefaultNavigationTimeout(timeout);
    }
    setDefaultTimeout(timeout) {
        __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").setDefaultTimeout(timeout);
    }
    getDefaultTimeout() {
        return __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").timeout();
    }
    async evaluateHandle(pageFunction, ...args) {
        pageFunction = (0, util_js_1.withSourcePuppeteerURLIfNone)(this.evaluateHandle.name, pageFunction);
        const context = await this.mainFrame().executionContext();
        return context.evaluateHandle(pageFunction, ...args);
    }
    async queryObjects(prototypeHandle) {
        const context = await this.mainFrame().executionContext();
        (0, assert_js_1.assert)(!prototypeHandle.disposed, 'Prototype JSHandle is disposed!');
        (0, assert_js_1.assert)(prototypeHandle.id, 'Prototype JSHandle must not be referencing primitive value');
        const response = await context._client.send('Runtime.queryObjects', {
            prototypeObjectId: prototypeHandle.id,
        });
        return (0, util_js_1.createJSHandle)(context, response.objects);
    }
    async cookies(...urls) {
        const originalCookies = (await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Network.getCookies', {
            urls: urls.length ? urls : [this.url()],
        })).cookies;
        const unsupportedCookieAttributes = ['priority'];
        const filterUnsupportedAttributes = (cookie) => {
            for (const attr of unsupportedCookieAttributes) {
                delete cookie[attr];
            }
            return cookie;
        };
        return originalCookies.map(filterUnsupportedAttributes);
    }
    async deleteCookie(...cookies) {
        const pageURL = this.url();
        for (const cookie of cookies) {
            const item = Object.assign({}, cookie);
            if (!cookie.url && pageURL.startsWith('http')) {
                item.url = pageURL;
            }
            await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Network.deleteCookies', item);
        }
    }
    async setCookie(...cookies) {
        const pageURL = this.url();
        const startsWithHTTP = pageURL.startsWith('http');
        const items = cookies.map(cookie => {
            const item = Object.assign({}, cookie);
            if (!item.url && startsWithHTTP) {
                item.url = pageURL;
            }
            (0, assert_js_1.assert)(item.url !== 'about:blank', `Blank page can not have cookie "${item.name}"`);
            (0, assert_js_1.assert)(!String.prototype.startsWith.call(item.url || '', 'data:'), `Data URL page can not have cookie "${item.name}"`);
            return item;
        });
        await this.deleteCookie(...items);
        if (items.length) {
            await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Network.setCookies', { cookies: items });
        }
    }
    async addScriptTag(options) {
        return this.mainFrame().addScriptTag(options);
    }
    async addStyleTag(options) {
        return this.mainFrame().addStyleTag(options);
    }
    async exposeFunction(name, pptrFunction) {
        if (__classPrivateFieldGet(this, _CDPPage_bindings, "f").has(name)) {
            throw new Error(`Failed to add page binding with name ${name}: window['${name}'] already exists!`);
        }
        let binding;
        switch (typeof pptrFunction) {
            case 'function':
                binding = new Binding_js_1.Binding(name, pptrFunction);
                break;
            default:
                binding = new Binding_js_1.Binding(name, pptrFunction.default);
                break;
        }
        __classPrivateFieldGet(this, _CDPPage_bindings, "f").set(name, binding);
        const expression = (0, util_js_1.pageBindingInitString)('exposedFun', name);
        await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Runtime.addBinding', { name });
        const { identifier } = await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.addScriptToEvaluateOnNewDocument', {
            source: expression,
        });
        __classPrivateFieldGet(this, _CDPPage_exposedFunctions, "f").set(name, identifier);
        await Promise.all(this.frames().map(frame => {
            return frame.evaluate(expression).catch(util_js_1.debugError);
        }));
    }
    async removeExposedFunction(name) {
        const exposedFun = __classPrivateFieldGet(this, _CDPPage_exposedFunctions, "f").get(name);
        if (!exposedFun) {
            throw new Error(`Failed to remove page binding with name ${name}: window['${name}'] does not exists!`);
        }
        await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Runtime.removeBinding', { name });
        await this.removeScriptToEvaluateOnNewDocument(exposedFun);
        await Promise.all(this.frames().map(frame => {
            return frame
                .evaluate(name => {
                // Removes the dangling Puppeteer binding wrapper.
                // @ts-expect-error: In a different context.
                globalThis[name] = undefined;
            }, name)
                .catch(util_js_1.debugError);
        }));
        __classPrivateFieldGet(this, _CDPPage_exposedFunctions, "f").delete(name);
        __classPrivateFieldGet(this, _CDPPage_bindings, "f").delete(name);
    }
    async authenticate(credentials) {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.authenticate(credentials);
    }
    async setExtraHTTPHeaders(headers) {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.setExtraHTTPHeaders(headers);
    }
    async setUserAgent(userAgent, userAgentMetadata) {
        return __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.setUserAgent(userAgent, userAgentMetadata);
    }
    async metrics() {
        const response = await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Performance.getMetrics');
        return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_buildMetricsObject).call(this, response.metrics);
    }
    url() {
        return this.mainFrame().url();
    }
    async content() {
        return await this.mainFrame().content();
    }
    async setContent(html, options = {}) {
        await this.mainFrame().setContent(html, options);
    }
    async goto(url, options = {}) {
        return await this.mainFrame().goto(url, options);
    }
    async reload(options) {
        const result = await Promise.all([
            this.waitForNavigation(options),
            __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.reload'),
        ]);
        return result[0];
    }
    async waitForNavigation(options = {}) {
        return await this.mainFrame().waitForNavigation(options);
    }
    async waitForRequest(urlOrPredicate, options = {}) {
        const { timeout = __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
        return (0, util_js_1.waitForEvent)(__classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager, NetworkManager_js_1.NetworkManagerEmittedEvents.Request, async (request) => {
            if ((0, util_js_1.isString)(urlOrPredicate)) {
                return urlOrPredicate === request.url();
            }
            if (typeof urlOrPredicate === 'function') {
                return !!(await urlOrPredicate(request));
            }
            return false;
        }, timeout, __classPrivateFieldGet(this, _CDPPage_sessionCloseDeferred, "f").valueOrThrow());
    }
    async waitForResponse(urlOrPredicate, options = {}) {
        const { timeout = __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
        return (0, util_js_1.waitForEvent)(__classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager, NetworkManager_js_1.NetworkManagerEmittedEvents.Response, async (response) => {
            if ((0, util_js_1.isString)(urlOrPredicate)) {
                return urlOrPredicate === response.url();
            }
            if (typeof urlOrPredicate === 'function') {
                return !!(await urlOrPredicate(response));
            }
            return false;
        }, timeout, __classPrivateFieldGet(this, _CDPPage_sessionCloseDeferred, "f").valueOrThrow());
    }
    async waitForNetworkIdle(options = {}) {
        const { idleTime = 500, timeout = __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
        await this._waitForNetworkIdle(__classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager, idleTime, timeout, __classPrivateFieldGet(this, _CDPPage_sessionCloseDeferred, "f"));
    }
    async waitForFrame(urlOrPredicate, options = {}) {
        const { timeout = __classPrivateFieldGet(this, _CDPPage_timeoutSettings, "f").timeout() } = options;
        let predicate;
        if ((0, util_js_1.isString)(urlOrPredicate)) {
            predicate = (frame) => {
                return Promise.resolve(urlOrPredicate === frame.url());
            };
        }
        else {
            predicate = (frame) => {
                const value = urlOrPredicate(frame);
                if (typeof value === 'boolean') {
                    return Promise.resolve(value);
                }
                return value;
            };
        }
        const eventRace = Deferred_js_1.Deferred.race([
            (0, util_js_1.waitForEvent)(__classPrivateFieldGet(this, _CDPPage_frameManager, "f"), FrameManager_js_1.FrameManagerEmittedEvents.FrameAttached, predicate, timeout, __classPrivateFieldGet(this, _CDPPage_sessionCloseDeferred, "f").valueOrThrow()),
            (0, util_js_1.waitForEvent)(__classPrivateFieldGet(this, _CDPPage_frameManager, "f"), FrameManager_js_1.FrameManagerEmittedEvents.FrameNavigated, predicate, timeout, __classPrivateFieldGet(this, _CDPPage_sessionCloseDeferred, "f").valueOrThrow()),
            ...this.frames().map(async (frame) => {
                if (await predicate(frame)) {
                    return frame;
                }
                return await eventRace;
            }),
        ]);
        return eventRace;
    }
    async goBack(options = {}) {
        return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_go).call(this, -1, options);
    }
    async goForward(options = {}) {
        return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_go).call(this, +1, options);
    }
    async bringToFront() {
        await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.bringToFront');
    }
    async setJavaScriptEnabled(enabled) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").setJavaScriptEnabled(enabled);
    }
    async setBypassCSP(enabled) {
        await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.setBypassCSP', { enabled });
    }
    async emulateMediaType(type) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateMediaType(type);
    }
    async emulateCPUThrottling(factor) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateCPUThrottling(factor);
    }
    async emulateMediaFeatures(features) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateMediaFeatures(features);
    }
    async emulateTimezone(timezoneId) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateTimezone(timezoneId);
    }
    async emulateIdleState(overrides) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateIdleState(overrides);
    }
    async emulateVisionDeficiency(type) {
        return await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateVisionDeficiency(type);
    }
    async setViewport(viewport) {
        const needsReload = await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").emulateViewport(viewport);
        __classPrivateFieldSet(this, _CDPPage_viewport, viewport, "f");
        if (needsReload) {
            await this.reload();
        }
    }
    viewport() {
        return __classPrivateFieldGet(this, _CDPPage_viewport, "f");
    }
    async evaluate(pageFunction, ...args) {
        pageFunction = (0, util_js_1.withSourcePuppeteerURLIfNone)(this.evaluate.name, pageFunction);
        return this.mainFrame().evaluate(pageFunction, ...args);
    }
    async evaluateOnNewDocument(pageFunction, ...args) {
        const source = (0, util_js_1.evaluationString)(pageFunction, ...args);
        const { identifier } = await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.addScriptToEvaluateOnNewDocument', {
            source,
        });
        return { identifier };
    }
    async removeScriptToEvaluateOnNewDocument(identifier) {
        await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.removeScriptToEvaluateOnNewDocument', {
            identifier,
        });
    }
    async setCacheEnabled(enabled = true) {
        await __classPrivateFieldGet(this, _CDPPage_frameManager, "f").networkManager.setCacheEnabled(enabled);
    }
    async screenshot(options = {}) {
        let screenshotType = "png" /* Protocol.Page.CaptureScreenshotRequestFormat.Png */;
        // options.type takes precedence over inferring the type from options.path
        // because it may be a 0-length file with no extension created beforehand
        // (i.e. as a temp file).
        if (options.type) {
            screenshotType =
                options.type;
        }
        else if (options.path) {
            const filePath = options.path;
            const extension = filePath
                .slice(filePath.lastIndexOf('.') + 1)
                .toLowerCase();
            switch (extension) {
                case 'png':
                    screenshotType = "png" /* Protocol.Page.CaptureScreenshotRequestFormat.Png */;
                    break;
                case 'jpeg':
                case 'jpg':
                    screenshotType = "jpeg" /* Protocol.Page.CaptureScreenshotRequestFormat.Jpeg */;
                    break;
                case 'webp':
                    screenshotType = "webp" /* Protocol.Page.CaptureScreenshotRequestFormat.Webp */;
                    break;
                default:
                    throw new Error(`Unsupported screenshot type for extension \`.${extension}\``);
            }
        }
        if (options.quality) {
            (0, assert_js_1.assert)(screenshotType === "jpeg" /* Protocol.Page.CaptureScreenshotRequestFormat.Jpeg */ ||
                screenshotType === "webp" /* Protocol.Page.CaptureScreenshotRequestFormat.Webp */, 'options.quality is unsupported for the ' +
                screenshotType +
                ' screenshots');
            (0, assert_js_1.assert)(typeof options.quality === 'number', 'Expected options.quality to be a number but found ' +
                typeof options.quality);
            (0, assert_js_1.assert)(Number.isInteger(options.quality), 'Expected options.quality to be an integer');
            (0, assert_js_1.assert)(options.quality >= 0 && options.quality <= 100, 'Expected options.quality to be between 0 and 100 (inclusive), got ' +
                options.quality);
        }
        (0, assert_js_1.assert)(!options.clip || !options.fullPage, 'options.clip and options.fullPage are exclusive');
        if (options.clip) {
            (0, assert_js_1.assert)(typeof options.clip.x === 'number', 'Expected options.clip.x to be a number but found ' +
                typeof options.clip.x);
            (0, assert_js_1.assert)(typeof options.clip.y === 'number', 'Expected options.clip.y to be a number but found ' +
                typeof options.clip.y);
            (0, assert_js_1.assert)(typeof options.clip.width === 'number', 'Expected options.clip.width to be a number but found ' +
                typeof options.clip.width);
            (0, assert_js_1.assert)(typeof options.clip.height === 'number', 'Expected options.clip.height to be a number but found ' +
                typeof options.clip.height);
            (0, assert_js_1.assert)(options.clip.width !== 0, 'Expected options.clip.width not to be 0.');
            (0, assert_js_1.assert)(options.clip.height !== 0, 'Expected options.clip.height not to be 0.');
        }
        return __classPrivateFieldGet(this, _CDPPage_screenshotTaskQueue, "f").postTask(() => {
            return __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_screenshotTask).call(this, screenshotType, options);
        });
    }
    async createPDFStream(options = {}) {
        const { landscape, displayHeaderFooter, headerTemplate, footerTemplate, printBackground, scale, width: paperWidth, height: paperHeight, margin, pageRanges, preferCSSPageSize, omitBackground, timeout, } = this._getPDFOptions(options);
        if (omitBackground) {
            await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").setTransparentBackgroundColor();
        }
        const printCommandPromise = __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.printToPDF', {
            transferMode: 'ReturnAsStream',
            landscape,
            displayHeaderFooter,
            headerTemplate,
            footerTemplate,
            printBackground,
            scale,
            paperWidth,
            paperHeight,
            marginTop: margin.top,
            marginBottom: margin.bottom,
            marginLeft: margin.left,
            marginRight: margin.right,
            pageRanges,
            preferCSSPageSize,
        });
        const result = await (0, util_js_1.waitWithTimeout)(printCommandPromise, 'Page.printToPDF', timeout);
        if (omitBackground) {
            await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").resetDefaultBackgroundColor();
        }
        (0, assert_js_1.assert)(result.stream, '`stream` is missing from `Page.printToPDF');
        return (0, util_js_1.getReadableFromProtocolStream)(__classPrivateFieldGet(this, _CDPPage_client, "f"), result.stream);
    }
    async pdf(options = {}) {
        const { path = undefined } = options;
        const readable = await this.createPDFStream(options);
        const buffer = await (0, util_js_1.getReadableAsBuffer)(readable, path);
        (0, assert_js_1.assert)(buffer, 'Could not create buffer');
        return buffer;
    }
    async title() {
        return this.mainFrame().title();
    }
    async close(options = { runBeforeUnload: undefined }) {
        const connection = __classPrivateFieldGet(this, _CDPPage_client, "f").connection();
        (0, assert_js_1.assert)(connection, 'Protocol error: Connection closed. Most likely the page has been closed.');
        const runBeforeUnload = !!options.runBeforeUnload;
        if (runBeforeUnload) {
            await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.close');
        }
        else {
            await connection.send('Target.closeTarget', {
                targetId: __classPrivateFieldGet(this, _CDPPage_target, "f")._targetId,
            });
            await __classPrivateFieldGet(this, _CDPPage_target, "f")._isClosedDeferred.valueOrThrow();
        }
    }
    isClosed() {
        return __classPrivateFieldGet(this, _CDPPage_closed, "f");
    }
    get mouse() {
        return __classPrivateFieldGet(this, _CDPPage_mouse, "f");
    }
    click(selector, options = {}) {
        return this.mainFrame().click(selector, options);
    }
    focus(selector) {
        return this.mainFrame().focus(selector);
    }
    hover(selector) {
        return this.mainFrame().hover(selector);
    }
    select(selector, ...values) {
        return this.mainFrame().select(selector, ...values);
    }
    tap(selector) {
        return this.mainFrame().tap(selector);
    }
    type(selector, text, options) {
        return this.mainFrame().type(selector, text, options);
    }
    waitForXPath(xpath, options = {}) {
        return this.mainFrame().waitForXPath(xpath, options);
    }
    waitForFunction(pageFunction, options = {}, ...args) {
        return this.mainFrame().waitForFunction(pageFunction, options, ...args);
    }
    /**
     * This method is typically coupled with an action that triggers a device
     * request from an api such as WebBluetooth.
     *
     * :::caution
     *
     * This must be called before the device request is made. It will not return a
     * currently active device prompt.
     *
     * :::
     *
     * @example
     *
     * ```ts
     * const [devicePrompt] = Promise.all([
     *   page.waitForDevicePrompt(),
     *   page.click('#connect-bluetooth'),
     * ]);
     * await devicePrompt.select(
     *   await devicePrompt.waitForDevice(({name}) => name.includes('My Device'))
     * );
     * ```
     */
    waitForDevicePrompt(options = {}) {
        return this.mainFrame().waitForDevicePrompt(options);
    }
}
exports.CDPPage = CDPPage;
_CDPPage_closed = new WeakMap(), _CDPPage_client = new WeakMap(), _CDPPage_target = new WeakMap(), _CDPPage_keyboard = new WeakMap(), _CDPPage_mouse = new WeakMap(), _CDPPage_timeoutSettings = new WeakMap(), _CDPPage_touchscreen = new WeakMap(), _CDPPage_accessibility = new WeakMap(), _CDPPage_frameManager = new WeakMap(), _CDPPage_emulationManager = new WeakMap(), _CDPPage_tracing = new WeakMap(), _CDPPage_bindings = new WeakMap(), _CDPPage_exposedFunctions = new WeakMap(), _CDPPage_coverage = new WeakMap(), _CDPPage_viewport = new WeakMap(), _CDPPage_screenshotTaskQueue = new WeakMap(), _CDPPage_workers = new WeakMap(), _CDPPage_fileChooserDeferreds = new WeakMap(), _CDPPage_sessionCloseDeferred = new WeakMap(), _CDPPage_serviceWorkerBypassed = new WeakMap(), _CDPPage_userDragInterceptionEnabled = new WeakMap(), _CDPPage_onDetachedFromTarget = new WeakMap(), _CDPPage_onAttachedToTarget = new WeakMap(), _CDPPage_instances = new WeakSet(), _CDPPage_initialize = async function _CDPPage_initialize() {
    try {
        await Promise.all([
            __classPrivateFieldGet(this, _CDPPage_frameManager, "f").initialize(),
            __classPrivateFieldGet(this, _CDPPage_client, "f").send('Performance.enable'),
            __classPrivateFieldGet(this, _CDPPage_client, "f").send('Log.enable'),
        ]);
    }
    catch (err) {
        if ((0, ErrorLike_js_1.isErrorLike)(err) && (0, Connection_js_1.isTargetClosedError)(err)) {
            (0, util_js_1.debugError)(err);
        }
        else {
            throw err;
        }
    }
}, _CDPPage_onFileChooser = async function _CDPPage_onFileChooser(event) {
    if (!__classPrivateFieldGet(this, _CDPPage_fileChooserDeferreds, "f").size) {
        return;
    }
    const frame = __classPrivateFieldGet(this, _CDPPage_frameManager, "f").frame(event.frameId);
    (0, assert_js_1.assert)(frame, 'This should never happen.');
    // This is guaranteed to be an HTMLInputElement handle by the event.
    const handle = (await frame.worlds[IsolatedWorlds_js_1.MAIN_WORLD].adoptBackendNode(event.backendNodeId));
    const fileChooser = new FileChooser_js_1.FileChooser(handle, event);
    for (const promise of __classPrivateFieldGet(this, _CDPPage_fileChooserDeferreds, "f")) {
        promise.resolve(fileChooser);
    }
    __classPrivateFieldGet(this, _CDPPage_fileChooserDeferreds, "f").clear();
}, _CDPPage_onTargetCrashed = function _CDPPage_onTargetCrashed() {
    this.emit('error', new Error('Page crashed!'));
}, _CDPPage_onLogEntryAdded = function _CDPPage_onLogEntryAdded(event) {
    const { level, text, args, source, url, lineNumber } = event.entry;
    if (args) {
        args.map(arg => {
            return (0, util_js_1.releaseObject)(__classPrivateFieldGet(this, _CDPPage_client, "f"), arg);
        });
    }
    if (source !== 'worker') {
        this.emit("console" /* PageEmittedEvents.Console */, new ConsoleMessage_js_1.ConsoleMessage(level, text, [], [{ url, lineNumber }]));
    }
}, _CDPPage_emitMetrics = function _CDPPage_emitMetrics(event) {
    this.emit("metrics" /* PageEmittedEvents.Metrics */, {
        title: event.title,
        metrics: __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_buildMetricsObject).call(this, event.metrics),
    });
}, _CDPPage_buildMetricsObject = function _CDPPage_buildMetricsObject(metrics) {
    const result = {};
    for (const metric of metrics || []) {
        if (supportedMetrics.has(metric.name)) {
            result[metric.name] = metric.value;
        }
    }
    return result;
}, _CDPPage_handleException = function _CDPPage_handleException(exceptionDetails) {
    this.emit("pageerror" /* PageEmittedEvents.PageError */, (0, util_js_1.createClientError)(exceptionDetails));
}, _CDPPage_onConsoleAPI = async function _CDPPage_onConsoleAPI(event) {
    if (event.executionContextId === 0) {
        // DevTools protocol stores the last 1000 console messages. These
        // messages are always reported even for removed execution contexts. In
        // this case, they are marked with executionContextId = 0 and are
        // reported upon enabling Runtime agent.
        //
        // Ignore these messages since:
        // - there's no execution context we can use to operate with message
        //   arguments
        // - these messages are reported before Puppeteer clients can subscribe
        //   to the 'console'
        //   page event.
        //
        // @see https://github.com/puppeteer/puppeteer/issues/3865
        return;
    }
    const context = __classPrivateFieldGet(this, _CDPPage_frameManager, "f").getExecutionContextById(event.executionContextId, __classPrivateFieldGet(this, _CDPPage_client, "f"));
    if (!context) {
        (0, util_js_1.debugError)(new Error(`ExecutionContext not found for a console message: ${JSON.stringify(event)}`));
        return;
    }
    const values = event.args.map(arg => {
        return (0, util_js_1.createJSHandle)(context, arg);
    });
    __classPrivateFieldGet(this, _CDPPage_instances, "m", _CDPPage_addConsoleMessage).call(this, event.type, values, event.stackTrace);
}, _CDPPage_onBindingCalled = async function _CDPPage_onBindingCalled(event) {
    let payload;
    try {
        payload = JSON.parse(event.payload);
    }
    catch {
        // The binding was either called by something in the page or it was
        // called before our wrapper was initialized.
        return;
    }
    const { type, name, seq, args, isTrivial } = payload;
    if (type !== 'exposedFun') {
        return;
    }
    const context = __classPrivateFieldGet(this, _CDPPage_frameManager, "f").executionContextById(event.executionContextId, __classPrivateFieldGet(this, _CDPPage_client, "f"));
    if (!context) {
        return;
    }
    const binding = __classPrivateFieldGet(this, _CDPPage_bindings, "f").get(name);
    await binding?.run(context, seq, args, isTrivial);
}, _CDPPage_addConsoleMessage = function _CDPPage_addConsoleMessage(eventType, args, stackTrace) {
    if (!this.listenerCount("console" /* PageEmittedEvents.Console */)) {
        args.forEach(arg => {
            return arg.dispose();
        });
        return;
    }
    const textTokens = [];
    for (const arg of args) {
        const remoteObject = arg.remoteObject();
        if (remoteObject.objectId) {
            textTokens.push(arg.toString());
        }
        else {
            textTokens.push((0, util_js_1.valueFromRemoteObject)(remoteObject));
        }
    }
    const stackTraceLocations = [];
    if (stackTrace) {
        for (const callFrame of stackTrace.callFrames) {
            stackTraceLocations.push({
                url: callFrame.url,
                lineNumber: callFrame.lineNumber,
                columnNumber: callFrame.columnNumber,
            });
        }
    }
    const message = new ConsoleMessage_js_1.ConsoleMessage(eventType, textTokens.join(' '), args, stackTraceLocations);
    this.emit("console" /* PageEmittedEvents.Console */, message);
}, _CDPPage_onDialog = function _CDPPage_onDialog(event) {
    let dialogType = null;
    const validDialogTypes = new Set([
        'alert',
        'confirm',
        'prompt',
        'beforeunload',
    ]);
    if (validDialogTypes.has(event.type)) {
        dialogType = event.type;
    }
    (0, assert_js_1.assert)(dialogType, 'Unknown javascript dialog type: ' + event.type);
    const dialog = new Dialog_js_1.Dialog(__classPrivateFieldGet(this, _CDPPage_client, "f"), dialogType, event.message, event.defaultPrompt);
    this.emit("dialog" /* PageEmittedEvents.Dialog */, dialog);
}, _CDPPage_go = async function _CDPPage_go(delta, options) {
    const history = await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.getNavigationHistory');
    const entry = history.entries[history.currentIndex + delta];
    if (!entry) {
        return null;
    }
    const result = await Promise.all([
        this.waitForNavigation(options),
        __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.navigateToHistoryEntry', { entryId: entry.id }),
    ]);
    return result[0];
}, _CDPPage_screenshotTask = async function _CDPPage_screenshotTask(format, options = {}) {
    await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Target.activateTarget', {
        targetId: __classPrivateFieldGet(this, _CDPPage_target, "f")._targetId,
    });
    let clip = options.clip ? processClip(options.clip) : undefined;
    let captureBeyondViewport = options.captureBeyondViewport ?? true;
    const fromSurface = options.fromSurface;
    if (options.fullPage) {
        // Overwrite clip for full page.
        clip = undefined;
        if (!captureBeyondViewport) {
            const metrics = await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.getLayoutMetrics');
            // Fallback to `contentSize` in case of using Firefox.
            const { width, height } = metrics.cssContentSize || metrics.contentSize;
            const { isMobile = false, deviceScaleFactor = 1, isLandscape = false, } = __classPrivateFieldGet(this, _CDPPage_viewport, "f") || {};
            const screenOrientation = isLandscape
                ? { angle: 90, type: 'landscapePrimary' }
                : { angle: 0, type: 'portraitPrimary' };
            await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Emulation.setDeviceMetricsOverride', {
                mobile: isMobile,
                width,
                height,
                deviceScaleFactor,
                screenOrientation,
            });
        }
    }
    else if (!clip) {
        captureBeyondViewport = false;
    }
    const shouldSetDefaultBackground = options.omitBackground && (format === 'png' || format === 'webp');
    if (shouldSetDefaultBackground) {
        await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").setTransparentBackgroundColor();
    }
    const result = await __classPrivateFieldGet(this, _CDPPage_client, "f").send('Page.captureScreenshot', {
        format,
        quality: options.quality,
        clip: clip && {
            ...clip,
            scale: clip.scale ?? 1,
        },
        captureBeyondViewport,
        fromSurface,
    });
    if (shouldSetDefaultBackground) {
        await __classPrivateFieldGet(this, _CDPPage_emulationManager, "f").resetDefaultBackgroundColor();
    }
    if (options.fullPage && __classPrivateFieldGet(this, _CDPPage_viewport, "f")) {
        await this.setViewport(__classPrivateFieldGet(this, _CDPPage_viewport, "f"));
    }
    if (options.encoding === 'base64') {
        return result.data;
    }
    const buffer = Buffer.from(result.data, 'base64');
    await this._maybeWriteBufferToFile(options.path, buffer);
    return buffer;
    function processClip(clip) {
        const x = Math.round(clip.x);
        const y = Math.round(clip.y);
        const width = Math.round(clip.width + clip.x - x);
        const height = Math.round(clip.height + clip.y - y);
        return { x, y, width, height, scale: clip.scale };
    }
};
const supportedMetrics = new Set([
    'Timestamp',
    'Documents',
    'Frames',
    'JSEventListeners',
    'Nodes',
    'LayoutCount',
    'RecalcStyleCount',
    'LayoutDuration',
    'RecalcStyleDuration',
    'ScriptDuration',
    'TaskDuration',
    'JSHeapUsedSize',
    'JSHeapTotalSize',
]);
//# sourceMappingURL=Page.js.map