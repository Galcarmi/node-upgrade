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
var _Page_handlerMap;
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitToPixels = exports.supportedMetrics = exports.Page = void 0;
const EventEmitter_js_1 = require("../common/EventEmitter.js");
const PDFOptions_js_1 = require("../common/PDFOptions.js");
const util_js_1 = require("../common/util.js");
const assert_js_1 = require("../util/assert.js");
/**
 * Page provides methods to interact with a single tab or
 * {@link https://developer.chrome.com/extensions/background_pages | extension background page}
 * in Chromium.
 *
 * :::note
 *
 * One Browser instance might have multiple Page instances.
 *
 * :::
 *
 * @example
 * This example creates a page, navigates it to a URL, and then saves a screenshot:
 *
 * ```ts
 * import puppeteer from 'puppeteer';
 *
 * (async () => {
 *   const browser = await puppeteer.launch();
 *   const page = await browser.newPage();
 *   await page.goto('https://example.com');
 *   await page.screenshot({path: 'screenshot.png'});
 *   await browser.close();
 * })();
 * ```
 *
 * The Page class extends from Puppeteer's {@link EventEmitter} class and will
 * emit various events which are documented in the {@link PageEmittedEvents} enum.
 *
 * @example
 * This example logs a message for a single page `load` event:
 *
 * ```ts
 * page.once('load', () => console.log('Page loaded!'));
 * ```
 *
 * To unsubscribe from events use the {@link Page.off} method:
 *
 * ```ts
 * function logRequest(interceptedRequest) {
 *   console.log('A request was made:', interceptedRequest.url());
 * }
 * page.on('request', logRequest);
 * // Sometime later...
 * page.off('request', logRequest);
 * ```
 *
 * @public
 */
class Page extends EventEmitter_js_1.EventEmitter {
    /**
     * @internal
     */
    constructor() {
        super();
        _Page_handlerMap.set(this, new WeakMap());
    }
    /**
     * `true` if drag events are being intercepted, `false` otherwise.
     */
    isDragInterceptionEnabled() {
        throw new Error('Not implemented');
    }
    /**
     * `true` if the page has JavaScript enabled, `false` otherwise.
     */
    isJavaScriptEnabled() {
        throw new Error('Not implemented');
    }
    /**
     * Listen to page events.
     *
     * :::note
     *
     * This method exists to define event typings and handle proper wireup of
     * cooperative request interception. Actual event listening and dispatching is
     * delegated to {@link EventEmitter}.
     *
     * :::
     */
    on(eventName, handler) {
        if (eventName === 'request') {
            const wrap = __classPrivateFieldGet(this, _Page_handlerMap, "f").get(handler) ||
                ((event) => {
                    event.enqueueInterceptAction(() => {
                        return handler(event);
                    });
                });
            __classPrivateFieldGet(this, _Page_handlerMap, "f").set(handler, wrap);
            return super.on(eventName, wrap);
        }
        return super.on(eventName, handler);
    }
    once(eventName, handler) {
        // Note: this method only exists to define the types; we delegate the impl
        // to EventEmitter.
        return super.once(eventName, handler);
    }
    off(eventName, handler) {
        if (eventName === 'request') {
            handler = __classPrivateFieldGet(this, _Page_handlerMap, "f").get(handler) || handler;
        }
        return super.off(eventName, handler);
    }
    waitForFileChooser() {
        throw new Error('Not implemented');
    }
    async setGeolocation() {
        throw new Error('Not implemented');
    }
    /**
     * A target this page was created from.
     */
    target() {
        throw new Error('Not implemented');
    }
    /**
     * Get the browser the page belongs to.
     */
    browser() {
        throw new Error('Not implemented');
    }
    /**
     * Get the browser context that the page belongs to.
     */
    browserContext() {
        throw new Error('Not implemented');
    }
    /**
     * The page's main frame.
     *
     * @remarks
     * Page is guaranteed to have a main frame which persists during navigations.
     */
    mainFrame() {
        throw new Error('Not implemented');
    }
    /**
     * {@inheritDoc Keyboard}
     */
    get keyboard() {
        throw new Error('Not implemented');
    }
    /**
     * {@inheritDoc Touchscreen}
     */
    get touchscreen() {
        throw new Error('Not implemented');
    }
    /**
     * {@inheritDoc Coverage}
     */
    get coverage() {
        throw new Error('Not implemented');
    }
    /**
     * {@inheritDoc Tracing}
     */
    get tracing() {
        throw new Error('Not implemented');
    }
    /**
     * {@inheritDoc Accessibility}
     */
    get accessibility() {
        throw new Error('Not implemented');
    }
    /**
     * An array of all frames attached to the page.
     */
    frames() {
        throw new Error('Not implemented');
    }
    /**
     * All of the dedicated {@link
     * https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API |
     * WebWorkers} associated with the page.
     *
     * @remarks
     * This does not contain ServiceWorkers
     */
    workers() {
        throw new Error('Not implemented');
    }
    async setRequestInterception() {
        throw new Error('Not implemented');
    }
    async setDragInterception() {
        throw new Error('Not implemented');
    }
    setOfflineMode() {
        throw new Error('Not implemented');
    }
    emulateNetworkConditions() {
        throw new Error('Not implemented');
    }
    setDefaultNavigationTimeout() {
        throw new Error('Not implemented');
    }
    setDefaultTimeout() {
        throw new Error('Not implemented');
    }
    /**
     * Maximum time in milliseconds.
     */
    getDefaultTimeout() {
        throw new Error('Not implemented');
    }
    async $() {
        throw new Error('Not implemented');
    }
    async $$() {
        throw new Error('Not implemented');
    }
    async evaluateHandle() {
        throw new Error('Not implemented');
    }
    async queryObjects() {
        throw new Error('Not implemented');
    }
    async $eval() {
        throw new Error('Not implemented');
    }
    async $$eval() {
        throw new Error('Not implemented');
    }
    async $x() {
        throw new Error('Not implemented');
    }
    async cookies() {
        throw new Error('Not implemented');
    }
    async deleteCookie() {
        throw new Error('Not implemented');
    }
    async setCookie() {
        throw new Error('Not implemented');
    }
    async addScriptTag() {
        throw new Error('Not implemented');
    }
    async addStyleTag() {
        throw new Error('Not implemented');
    }
    async exposeFunction() {
        throw new Error('Not implemented');
    }
    async authenticate() {
        throw new Error('Not implemented');
    }
    async setExtraHTTPHeaders() {
        throw new Error('Not implemented');
    }
    async setUserAgent() {
        throw new Error('Not implemented');
    }
    /**
     * Object containing metrics as key/value pairs.
     *
     * @returns
     *
     * - `Timestamp` : The timestamp when the metrics sample was taken.
     *
     * - `Documents` : Number of documents in the page.
     *
     * - `Frames` : Number of frames in the page.
     *
     * - `JSEventListeners` : Number of events in the page.
     *
     * - `Nodes` : Number of DOM nodes in the page.
     *
     * - `LayoutCount` : Total number of full or partial page layout.
     *
     * - `RecalcStyleCount` : Total number of page style recalculations.
     *
     * - `LayoutDuration` : Combined durations of all page layouts.
     *
     * - `RecalcStyleDuration` : Combined duration of all page style
     *   recalculations.
     *
     * - `ScriptDuration` : Combined duration of JavaScript execution.
     *
     * - `TaskDuration` : Combined duration of all tasks performed by the browser.
     *
     * - `JSHeapUsedSize` : Used JavaScript heap size.
     *
     * - `JSHeapTotalSize` : Total JavaScript heap size.
     *
     * @remarks
     * All timestamps are in monotonic time: monotonically increasing time
     * in seconds since an arbitrary point in the past.
     */
    async metrics() {
        throw new Error('Not implemented');
    }
    /**
     * The page's URL.
     * @remarks Shortcut for
     * {@link Frame.url | page.mainFrame().url()}.
     */
    url() {
        throw new Error('Not implemented');
    }
    /**
     * The full HTML contents of the page, including the DOCTYPE.
     */
    async content() {
        throw new Error('Not implemented');
    }
    async setContent() {
        throw new Error('Not implemented');
    }
    async goto() {
        throw new Error('Not implemented');
    }
    async reload() {
        throw new Error('Not implemented');
    }
    async waitForNavigation() {
        throw new Error('Not implemented');
    }
    async waitForRequest() {
        throw new Error('Not implemented');
    }
    async waitForResponse() {
        throw new Error('Not implemented');
    }
    async waitForNetworkIdle() {
        throw new Error('Not implemented');
    }
    async waitForFrame() {
        throw new Error('Not implemented');
    }
    async goBack() {
        throw new Error('Not implemented');
    }
    async goForward() {
        throw new Error('Not implemented');
    }
    /**
     * Brings page to front (activates tab).
     */
    async bringToFront() {
        throw new Error('Not implemented');
    }
    /**
     * Emulates a given device's metrics and user agent.
     *
     * To aid emulation, Puppeteer provides a list of known devices that can be
     * via {@link KnownDevices}.
     *
     * @remarks
     * This method is a shortcut for calling two methods:
     * {@link Page.setUserAgent} and {@link Page.setViewport}.
     *
     * @remarks
     * This method will resize the page. A lot of websites don't expect phones to
     * change size, so you should emulate before navigating to the page.
     *
     * @example
     *
     * ```ts
     * import {KnownDevices} from 'puppeteer';
     * const iPhone = KnownDevices['iPhone 6'];
     *
     * (async () => {
     *   const browser = await puppeteer.launch();
     *   const page = await browser.newPage();
     *   await page.emulate(iPhone);
     *   await page.goto('https://www.google.com');
     *   // other actions...
     *   await browser.close();
     * })();
     * ```
     */
    async emulate(device) {
        await Promise.all([
            this.setUserAgent(device.userAgent),
            this.setViewport(device.viewport),
        ]);
    }
    async setJavaScriptEnabled() {
        throw new Error('Not implemented');
    }
    async setBypassCSP() {
        throw new Error('Not implemented');
    }
    async emulateMediaType() {
        throw new Error('Not implemented');
    }
    async emulateCPUThrottling() {
        throw new Error('Not implemented');
    }
    async emulateMediaFeatures() {
        throw new Error('Not implemented');
    }
    async emulateTimezone() {
        throw new Error('Not implemented');
    }
    async emulateIdleState() {
        throw new Error('Not implemented');
    }
    async emulateVisionDeficiency() {
        throw new Error('Not implemented');
    }
    async setViewport() {
        throw new Error('Not implemented');
    }
    /**
     * Current page viewport settings.
     *
     * @returns
     *
     * - `width`: page's width in pixels
     *
     * - `height`: page's height in pixels
     *
     * - `deviceScaleFactor`: Specify device scale factor (can be though of as
     *   dpr). Defaults to `1`.
     *
     * - `isMobile`: Whether the meta viewport tag is taken into account. Defaults
     *   to `false`.
     *
     * - `hasTouch`: Specifies if viewport supports touch events. Defaults to
     *   `false`.
     *
     * - `isLandScape`: Specifies if viewport is in landscape mode. Defaults to
     *   `false`.
     */
    viewport() {
        throw new Error('Not implemented');
    }
    async evaluate() {
        throw new Error('Not implemented');
    }
    async evaluateOnNewDocument() {
        throw new Error('Not implemented');
    }
    async setCacheEnabled() {
        throw new Error('Not implemented');
    }
    /**
     * @internal
     */
    async _maybeWriteBufferToFile(path, buffer) {
        if (!path) {
            return;
        }
        const fs = await (0, util_js_1.importFSPromises)();
        await fs.writeFile(path, buffer);
    }
    async screenshot() {
        throw new Error('Not implemented');
    }
    /**
     * @internal
     */
    _getPDFOptions(options = {}, lengthUnit = 'in') {
        var _a, _b, _c, _d, _e, _f;
        const defaults = {
            scale: 1,
            displayHeaderFooter: false,
            headerTemplate: '',
            footerTemplate: '',
            printBackground: false,
            landscape: false,
            pageRanges: '',
            preferCSSPageSize: false,
            omitBackground: false,
            timeout: 30000,
        };
        let width = 8.5;
        let height = 11;
        if (options.format) {
            const format = PDFOptions_js_1.paperFormats[options.format.toLowerCase()];
            (0, assert_js_1.assert)(format, 'Unknown paper format: ' + options.format);
            width = format.width;
            height = format.height;
        }
        else {
            width = (_a = convertPrintParameterToInches(options.width, lengthUnit)) !== null && _a !== void 0 ? _a : width;
            height =
                (_b = convertPrintParameterToInches(options.height, lengthUnit)) !== null && _b !== void 0 ? _b : height;
        }
        const margin = {
            top: convertPrintParameterToInches((_c = options.margin) === null || _c === void 0 ? void 0 : _c.top, lengthUnit) || 0,
            left: convertPrintParameterToInches((_d = options.margin) === null || _d === void 0 ? void 0 : _d.left, lengthUnit) || 0,
            bottom: convertPrintParameterToInches((_e = options.margin) === null || _e === void 0 ? void 0 : _e.bottom, lengthUnit) || 0,
            right: convertPrintParameterToInches((_f = options.margin) === null || _f === void 0 ? void 0 : _f.right, lengthUnit) || 0,
        };
        const output = {
            ...defaults,
            ...options,
            width,
            height,
            margin,
        };
        return output;
    }
    async createPDFStream() {
        throw new Error('Not implemented');
    }
    async pdf() {
        throw new Error('Not implemented');
    }
    /**
     * The page's title
     *
     * @remarks
     * Shortcut for {@link Frame.title | page.mainFrame().title()}.
     */
    async title() {
        throw new Error('Not implemented');
    }
    async close() {
        throw new Error('Not implemented');
    }
    /**
     * Indicates that the page has been closed.
     * @returns
     */
    isClosed() {
        throw new Error('Not implemented');
    }
    /**
     * {@inheritDoc Mouse}
     */
    get mouse() {
        throw new Error('Not implemented');
    }
    click() {
        throw new Error('Not implemented');
    }
    focus() {
        throw new Error('Not implemented');
    }
    hover() {
        throw new Error('Not implemented');
    }
    select() {
        throw new Error('Not implemented');
    }
    tap() {
        throw new Error('Not implemented');
    }
    type() {
        throw new Error('Not implemented');
    }
    waitForTimeout() {
        throw new Error('Not implemented');
    }
    async waitForSelector() {
        throw new Error('Not implemented');
    }
    waitForXPath() {
        throw new Error('Not implemented');
    }
    waitForFunction() {
        throw new Error('Not implemented');
    }
    waitForDevicePrompt() {
        throw new Error('Not implemented');
    }
}
exports.Page = Page;
_Page_handlerMap = new WeakMap();
/**
 * @internal
 */
exports.supportedMetrics = new Set([
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
/**
 * @internal
 */
exports.unitToPixels = {
    px: 1,
    in: 96,
    cm: 37.8,
    mm: 3.78,
};
function convertPrintParameterToInches(parameter, lengthUnit = 'in') {
    if (typeof parameter === 'undefined') {
        return undefined;
    }
    let pixels;
    if ((0, util_js_1.isNumber)(parameter)) {
        // Treat numbers as pixel values to be aligned with phantom's paperSize.
        pixels = parameter;
    }
    else if ((0, util_js_1.isString)(parameter)) {
        const text = parameter;
        let unit = text.substring(text.length - 2).toLowerCase();
        let valueText = '';
        if (unit in exports.unitToPixels) {
            valueText = text.substring(0, text.length - 2);
        }
        else {
            // In case of unknown unit try to parse the whole parameter as number of pixels.
            // This is consistent with phantom's paperSize behavior.
            unit = 'px';
            valueText = text;
        }
        const value = Number(valueText);
        (0, assert_js_1.assert)(!isNaN(value), 'Failed to parse parameter value: ' + text);
        pixels = value * exports.unitToPixels[unit];
    }
    else {
        throw new Error('page.pdf() Cannot handle parameter type: ' + typeof parameter);
    }
    return pixels / exports.unitToPixels[lengthUnit];
}
//# sourceMappingURL=Page.js.map