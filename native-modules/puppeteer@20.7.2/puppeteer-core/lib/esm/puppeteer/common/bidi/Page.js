/**
 * Copyright 2022 Google Inc. All rights reserved.
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Page_instances, _Page_accessibility, _Page_timeoutSettings, _Page_browserContext, _Page_connection, _Page_frameTree, _Page_networkManager, _Page_viewport, _Page_closedDeferred, _Page_subscribedEvents, _Page_networkManagerEvents, _Page_tracing, _Page_coverage, _Page_emulationManager, _Page_onFrameAttached, _Page_onFrameNavigated, _Page_onFrameDetached, _Page_removeFramesRecursively, _Page_onLogEntryAdded;
import { Page as PageBase, } from '../../api/Page.js';
import { assert } from '../../util/assert.js';
import { Deferred } from '../../util/Deferred.js';
import { Accessibility } from '../Accessibility.js';
import { ConsoleMessage } from '../ConsoleMessage.js';
import { Coverage } from '../Coverage.js';
import { EmulationManager } from '../EmulationManager.js';
import { TargetCloseError } from '../Errors.js';
import { FrameManagerEmittedEvents } from '../FrameManager.js';
import { FrameTree } from '../FrameTree.js';
import { NetworkManagerEmittedEvents } from '../NetworkManager.js';
import { TimeoutSettings } from '../TimeoutSettings.js';
import { Tracing } from '../Tracing.js';
import { debugError, isString, waitForEvent, waitWithTimeout, withSourcePuppeteerURLIfNone, } from '../util.js';
import { BrowsingContext } from './BrowsingContext.js';
import { Frame } from './Frame.js';
import { NetworkManager } from './NetworkManager.js';
import { getBidiHandle } from './Realm.js';
import { BidiSerializer } from './Serializer.js';
/**
 * @internal
 */
export class Page extends PageBase {
    constructor(browserContext, info) {
        super();
        _Page_instances.add(this);
        _Page_accessibility.set(this, void 0);
        _Page_timeoutSettings.set(this, new TimeoutSettings());
        _Page_browserContext.set(this, void 0);
        _Page_connection.set(this, void 0);
        _Page_frameTree.set(this, new FrameTree());
        _Page_networkManager.set(this, void 0);
        _Page_viewport.set(this, null);
        _Page_closedDeferred.set(this, Deferred.create());
        _Page_subscribedEvents.set(this, new Map([
            ['log.entryAdded', __classPrivateFieldGet(this, _Page_instances, "m", _Page_onLogEntryAdded).bind(this)],
            [
                'browsingContext.load',
                () => {
                    return this.emit("load" /* PageEmittedEvents.Load */);
                },
            ],
            [
                'browsingContext.domContentLoaded',
                () => {
                    return this.emit("domcontentloaded" /* PageEmittedEvents.DOMContentLoaded */);
                },
            ],
            ['browsingContext.contextCreated', __classPrivateFieldGet(this, _Page_instances, "m", _Page_onFrameAttached).bind(this)],
            ['browsingContext.contextDestroyed', __classPrivateFieldGet(this, _Page_instances, "m", _Page_onFrameDetached).bind(this)],
            ['browsingContext.fragmentNavigated', __classPrivateFieldGet(this, _Page_instances, "m", _Page_onFrameNavigated).bind(this)],
        ]));
        _Page_networkManagerEvents.set(this, new Map([
            [
                NetworkManagerEmittedEvents.Request,
                event => {
                    return this.emit("request" /* PageEmittedEvents.Request */, event);
                },
            ],
            [
                NetworkManagerEmittedEvents.RequestServedFromCache,
                event => {
                    return this.emit("requestservedfromcache" /* PageEmittedEvents.RequestServedFromCache */, event);
                },
            ],
            [
                NetworkManagerEmittedEvents.RequestFailed,
                event => {
                    return this.emit("requestfailed" /* PageEmittedEvents.RequestFailed */, event);
                },
            ],
            [
                NetworkManagerEmittedEvents.RequestFinished,
                event => {
                    return this.emit("requestfinished" /* PageEmittedEvents.RequestFinished */, event);
                },
            ],
            [
                NetworkManagerEmittedEvents.Response,
                event => {
                    return this.emit("response" /* PageEmittedEvents.Response */, event);
                },
            ],
        ]));
        _Page_tracing.set(this, void 0);
        _Page_coverage.set(this, void 0);
        _Page_emulationManager.set(this, void 0);
        __classPrivateFieldSet(this, _Page_browserContext, browserContext, "f");
        __classPrivateFieldSet(this, _Page_connection, browserContext.connection, "f");
        __classPrivateFieldSet(this, _Page_networkManager, new NetworkManager(__classPrivateFieldGet(this, _Page_connection, "f"), this), "f");
        __classPrivateFieldGet(this, _Page_instances, "m", _Page_onFrameAttached).call(this, {
            ...info,
            url: 'about:blank',
            children: [],
        });
        for (const [event, subscriber] of __classPrivateFieldGet(this, _Page_subscribedEvents, "f")) {
            __classPrivateFieldGet(this, _Page_connection, "f").on(event, subscriber);
        }
        for (const [event, subscriber] of __classPrivateFieldGet(this, _Page_networkManagerEvents, "f")) {
            __classPrivateFieldGet(this, _Page_networkManager, "f").on(event, subscriber);
        }
        // TODO: https://github.com/w3c/webdriver-bidi/issues/443
        __classPrivateFieldSet(this, _Page_accessibility, new Accessibility(this.mainFrame().context().cdpSession), "f");
        __classPrivateFieldSet(this, _Page_tracing, new Tracing(this.mainFrame().context().cdpSession), "f");
        __classPrivateFieldSet(this, _Page_coverage, new Coverage(this.mainFrame().context().cdpSession), "f");
        __classPrivateFieldSet(this, _Page_emulationManager, new EmulationManager(this.mainFrame().context().cdpSession), "f");
    }
    get accessibility() {
        return __classPrivateFieldGet(this, _Page_accessibility, "f");
    }
    get tracing() {
        return __classPrivateFieldGet(this, _Page_tracing, "f");
    }
    get coverage() {
        return __classPrivateFieldGet(this, _Page_coverage, "f");
    }
    browser() {
        return __classPrivateFieldGet(this, _Page_browserContext, "f").browser();
    }
    browserContext() {
        return __classPrivateFieldGet(this, _Page_browserContext, "f");
    }
    mainFrame() {
        const mainFrame = __classPrivateFieldGet(this, _Page_frameTree, "f").getMainFrame();
        assert(mainFrame, 'Requesting main frame too early!');
        return mainFrame;
    }
    frames() {
        return Array.from(__classPrivateFieldGet(this, _Page_frameTree, "f").frames());
    }
    frame(frameId) {
        return __classPrivateFieldGet(this, _Page_frameTree, "f").getById(frameId ?? '') || null;
    }
    childFrames(frameId) {
        return __classPrivateFieldGet(this, _Page_frameTree, "f").childFrames(frameId);
    }
    getNavigationResponse(id) {
        return __classPrivateFieldGet(this, _Page_networkManager, "f").getNavigationResponse(id);
    }
    async close() {
        if (__classPrivateFieldGet(this, _Page_closedDeferred, "f").finished()) {
            return;
        }
        __classPrivateFieldGet(this, _Page_closedDeferred, "f").resolve(new TargetCloseError('Page closed!'));
        this.removeAllListeners();
        __classPrivateFieldGet(this, _Page_networkManager, "f").dispose();
        await __classPrivateFieldGet(this, _Page_connection, "f").send('browsingContext.close', {
            context: this.mainFrame()._id,
        });
    }
    async evaluateHandle(pageFunction, ...args) {
        pageFunction = withSourcePuppeteerURLIfNone(this.evaluateHandle.name, pageFunction);
        return this.mainFrame().evaluateHandle(pageFunction, ...args);
    }
    async evaluate(pageFunction, ...args) {
        pageFunction = withSourcePuppeteerURLIfNone(this.evaluate.name, pageFunction);
        return this.mainFrame().evaluate(pageFunction, ...args);
    }
    async goto(url, options) {
        return this.mainFrame().goto(url, options);
    }
    async reload(options) {
        const [response] = await Promise.all([
            this.waitForResponse(response => {
                return (response.request().isNavigationRequest() &&
                    response.url() === this.url());
            }),
            this.mainFrame().context().reload(options),
        ]);
        return response;
    }
    url() {
        return this.mainFrame().url();
    }
    setDefaultNavigationTimeout(timeout) {
        __classPrivateFieldGet(this, _Page_timeoutSettings, "f").setDefaultNavigationTimeout(timeout);
    }
    setDefaultTimeout(timeout) {
        __classPrivateFieldGet(this, _Page_timeoutSettings, "f").setDefaultTimeout(timeout);
    }
    getDefaultTimeout() {
        return __classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout();
    }
    async setContent(html, options = {}) {
        await this.mainFrame().setContent(html, options);
    }
    async content() {
        return this.mainFrame().content();
    }
    isJavaScriptEnabled() {
        return __classPrivateFieldGet(this, _Page_emulationManager, "f").javascriptEnabled;
    }
    async setGeolocation(options) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").setGeolocation(options);
    }
    async setJavaScriptEnabled(enabled) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").setJavaScriptEnabled(enabled);
    }
    async emulateMediaType(type) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateMediaType(type);
    }
    async emulateCPUThrottling(factor) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateCPUThrottling(factor);
    }
    async emulateMediaFeatures(features) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateMediaFeatures(features);
    }
    async emulateTimezone(timezoneId) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateTimezone(timezoneId);
    }
    async emulateIdleState(overrides) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateIdleState(overrides);
    }
    async emulateVisionDeficiency(type) {
        return await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateVisionDeficiency(type);
    }
    async setViewport(viewport) {
        const needsReload = await __classPrivateFieldGet(this, _Page_emulationManager, "f").emulateViewport(viewport);
        __classPrivateFieldSet(this, _Page_viewport, viewport, "f");
        if (needsReload) {
            // TODO: reload seems to hang in BiDi.
            // await this.reload();
        }
    }
    viewport() {
        return __classPrivateFieldGet(this, _Page_viewport, "f");
    }
    async pdf(options = {}) {
        const { path = undefined } = options;
        const { printBackground: background, margin, landscape, width, height, pageRanges, scale, preferCSSPageSize, timeout, } = this._getPDFOptions(options, 'cm');
        const { result } = await waitWithTimeout(__classPrivateFieldGet(this, _Page_connection, "f").send('browsingContext.print', {
            context: this.mainFrame()._id,
            background,
            margin,
            orientation: landscape ? 'landscape' : 'portrait',
            page: {
                width,
                height,
            },
            pageRanges: pageRanges.split(', '),
            scale,
            shrinkToFit: !preferCSSPageSize,
        }), 'browsingContext.print', timeout);
        const buffer = Buffer.from(result.data, 'base64');
        await this._maybeWriteBufferToFile(path, buffer);
        return buffer;
    }
    async createPDFStream(options) {
        const buffer = await this.pdf(options);
        try {
            const { Readable } = await import('stream');
            return Readable.from(buffer);
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Can only pass a file path in a Node-like environment.');
            }
            throw error;
        }
    }
    async screenshot(options = {}) {
        const { path = undefined, encoding, ...args } = options;
        if (Object.keys(args).length >= 1) {
            throw new Error('BiDi only supports "encoding" and "path" options');
        }
        const { result } = await __classPrivateFieldGet(this, _Page_connection, "f").send('browsingContext.captureScreenshot', {
            context: this.mainFrame()._id,
        });
        if (encoding === 'base64') {
            return result.data;
        }
        const buffer = Buffer.from(result.data, 'base64');
        await this._maybeWriteBufferToFile(path, buffer);
        return buffer;
    }
    waitForRequest(urlOrPredicate, options = {}) {
        const { timeout = __classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        return waitForEvent(__classPrivateFieldGet(this, _Page_networkManager, "f"), NetworkManagerEmittedEvents.Request, async (request) => {
            if (isString(urlOrPredicate)) {
                return urlOrPredicate === request.url();
            }
            if (typeof urlOrPredicate === 'function') {
                return !!(await urlOrPredicate(request));
            }
            return false;
        }, timeout, __classPrivateFieldGet(this, _Page_closedDeferred, "f").valueOrThrow());
    }
    waitForResponse(urlOrPredicate, options = {}) {
        const { timeout = __classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        return waitForEvent(__classPrivateFieldGet(this, _Page_networkManager, "f"), NetworkManagerEmittedEvents.Response, async (response) => {
            if (isString(urlOrPredicate)) {
                return urlOrPredicate === response.url();
            }
            if (typeof urlOrPredicate === 'function') {
                return !!(await urlOrPredicate(response));
            }
            return false;
        }, timeout, __classPrivateFieldGet(this, _Page_closedDeferred, "f").valueOrThrow());
    }
    async waitForNetworkIdle(options = {}) {
        const { idleTime = 500, timeout = __classPrivateFieldGet(this, _Page_timeoutSettings, "f").timeout() } = options;
        await this._waitForNetworkIdle(__classPrivateFieldGet(this, _Page_networkManager, "f"), idleTime, timeout, __classPrivateFieldGet(this, _Page_closedDeferred, "f"));
    }
    title() {
        return this.mainFrame().title();
    }
}
_Page_accessibility = new WeakMap(), _Page_timeoutSettings = new WeakMap(), _Page_browserContext = new WeakMap(), _Page_connection = new WeakMap(), _Page_frameTree = new WeakMap(), _Page_networkManager = new WeakMap(), _Page_viewport = new WeakMap(), _Page_closedDeferred = new WeakMap(), _Page_subscribedEvents = new WeakMap(), _Page_networkManagerEvents = new WeakMap(), _Page_tracing = new WeakMap(), _Page_coverage = new WeakMap(), _Page_emulationManager = new WeakMap(), _Page_instances = new WeakSet(), _Page_onFrameAttached = function _Page_onFrameAttached(info) {
    if (!this.frame(info.context) &&
        (this.frame(info.parent ?? '') || !__classPrivateFieldGet(this, _Page_frameTree, "f").getMainFrame())) {
        const context = new BrowsingContext(__classPrivateFieldGet(this, _Page_connection, "f"), __classPrivateFieldGet(this, _Page_timeoutSettings, "f"), info);
        __classPrivateFieldGet(this, _Page_connection, "f").registerBrowsingContexts(context);
        const frame = new Frame(this, context, __classPrivateFieldGet(this, _Page_timeoutSettings, "f"), info.parent);
        context.setFrame(frame);
        __classPrivateFieldGet(this, _Page_frameTree, "f").addFrame(frame);
        this.emit(FrameManagerEmittedEvents.FrameAttached, frame);
    }
}, _Page_onFrameNavigated = async function _Page_onFrameNavigated(info) {
    const frameId = info.context;
    let frame = this.frame(frameId);
    // Detach all child frames first.
    if (frame) {
        for (const child of frame.childFrames()) {
            __classPrivateFieldGet(this, _Page_instances, "m", _Page_removeFramesRecursively).call(this, child);
        }
        frame = await __classPrivateFieldGet(this, _Page_frameTree, "f").waitForFrame(frameId);
        this.emit(FrameManagerEmittedEvents.FrameNavigated, frame);
    }
}, _Page_onFrameDetached = function _Page_onFrameDetached(info) {
    const frame = this.frame(info.context);
    if (frame) {
        __classPrivateFieldGet(this, _Page_instances, "m", _Page_removeFramesRecursively).call(this, frame);
    }
}, _Page_removeFramesRecursively = function _Page_removeFramesRecursively(frame) {
    for (const child of frame.childFrames()) {
        __classPrivateFieldGet(this, _Page_instances, "m", _Page_removeFramesRecursively).call(this, child);
    }
    frame.dispose();
    __classPrivateFieldGet(this, _Page_frameTree, "f").removeFrame(frame);
    this.emit(FrameManagerEmittedEvents.FrameDetached, frame);
}, _Page_onLogEntryAdded = function _Page_onLogEntryAdded(event) {
    const frame = this.frame(event.source.context);
    if (!frame) {
        return;
    }
    if (isConsoleLogEntry(event)) {
        const args = event.args.map(arg => {
            return getBidiHandle(frame.context(), arg, frame);
        });
        const text = args
            .reduce((value, arg) => {
            const parsedValue = arg.isPrimitiveValue
                ? BidiSerializer.deserialize(arg.remoteValue())
                : arg.toString();
            return `${value} ${parsedValue}`;
        }, '')
            .slice(1);
        this.emit("console" /* PageEmittedEvents.Console */, new ConsoleMessage(event.method, text, args, getStackTraceLocations(event.stackTrace)));
    }
    else if (isJavaScriptLogEntry(event)) {
        let message = event.text ?? '';
        if (event.stackTrace) {
            for (const callFrame of event.stackTrace.callFrames) {
                const location = callFrame.url +
                    ':' +
                    callFrame.lineNumber +
                    ':' +
                    callFrame.columnNumber;
                const functionName = callFrame.functionName || '<anonymous>';
                message += `\n    at ${functionName} (${location})`;
            }
        }
        const error = new Error(message);
        error.stack = ''; // Don't capture Puppeteer stacktrace.
        this.emit("pageerror" /* PageEmittedEvents.PageError */, error);
    }
    else {
        debugError(`Unhandled LogEntry with type "${event.type}", text "${event.text}" and level "${event.level}"`);
    }
};
function isConsoleLogEntry(event) {
    return event.type === 'console';
}
function isJavaScriptLogEntry(event) {
    return event.type === 'javascript';
}
function getStackTraceLocations(stackTrace) {
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
    return stackTraceLocations;
}
//# sourceMappingURL=Page.js.map