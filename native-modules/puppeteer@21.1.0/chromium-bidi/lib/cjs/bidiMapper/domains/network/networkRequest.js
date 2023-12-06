"use strict";
/*
 * Copyright 2023 Google LLC.
 * Copyright (c) Microsoft Corporation.
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
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkRequest = void 0;
const deferred_js_1 = require("../../../utils/deferred.js");
const protocol_js_1 = require("../../../protocol/protocol.js");
class NetworkRequest {
    static #unknown = 'UNKNOWN';
    /**
     * Each network request has an associated request id, which is a string
     * uniquely identifying that request.
     *
     * The identifier for a request resulting from a redirect matches that of the
     * request that initiated it.
     */
    requestId;
    #servedFromCache = false;
    #redirectCount = 0;
    #eventManager;
    #requestWillBeSentEvent;
    #requestWillBeSentExtraInfoEvent;
    #responseReceivedEvent;
    #responseReceivedExtraInfoEvent;
    #beforeRequestSentDeferred = new deferred_js_1.Deferred();
    #responseReceivedDeferred = new deferred_js_1.Deferred();
    constructor(requestId, eventManager) {
        this.requestId = requestId;
        this.#eventManager = eventManager;
    }
    onRequestWillBeSentEvent(event) {
        if (this.#requestWillBeSentEvent !== undefined) {
            // TODO: Handle redirect event, requestId is same for the redirect chain
            return;
        }
        this.#requestWillBeSentEvent = event;
        if (this.#requestWillBeSentExtraInfoEvent !== undefined) {
            this.#beforeRequestSentDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
        this.#sendBeforeRequestEvent();
    }
    onRequestWillBeSentExtraInfoEvent(event) {
        if (this.#requestWillBeSentExtraInfoEvent !== undefined) {
            // TODO: Handle redirect event, requestId is same for the redirect chain
            return;
        }
        this.#requestWillBeSentExtraInfoEvent = event;
        if (this.#requestWillBeSentEvent !== undefined) {
            this.#beforeRequestSentDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
    }
    onResponseReceivedEventExtraInfo(event) {
        if (this.#responseReceivedExtraInfoEvent !== undefined) {
            // TODO: Handle redirect event, requestId is same for the redirect chain
            return;
        }
        this.#responseReceivedExtraInfoEvent = event;
        if (this.#responseReceivedEvent !== undefined) {
            this.#responseReceivedDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
    }
    onResponseReceivedEvent(responseReceivedEvent) {
        if (this.#responseReceivedEvent !== undefined) {
            // TODO: Handle redirect event, requestId is same for the redirect chain
            return;
        }
        this.#responseReceivedEvent = responseReceivedEvent;
        if (!responseReceivedEvent.hasExtraInfo &&
            !this.#beforeRequestSentDeferred.isFinished) {
            this.#beforeRequestSentDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
        if (!responseReceivedEvent.hasExtraInfo ||
            this.#responseReceivedExtraInfoEvent !== undefined ||
            this.#servedFromCache) {
            this.#responseReceivedDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
        this.#sendResponseReceivedEvent();
    }
    onServedFromCache() {
        if (this.#requestWillBeSentEvent !== undefined) {
            this.#beforeRequestSentDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
        if (this.#responseReceivedEvent !== undefined) {
            this.#responseReceivedDeferred.resolve({
                kind: 'success',
                value: undefined,
            });
        }
        this.#servedFromCache = true;
    }
    onLoadingFailedEvent(event) {
        this.#beforeRequestSentDeferred.resolve({
            kind: 'success',
            value: undefined,
        });
        this.#responseReceivedDeferred.resolve({
            kind: 'error',
            error: new Error('Loading Failed'),
        });
        this.#eventManager.registerEvent({
            type: 'event',
            method: protocol_js_1.ChromiumBidi.Network.EventNames.FetchErrorEvent,
            params: {
                ...this.#getBaseEventParams(),
                errorText: event.errorText,
            },
        }, this.#requestWillBeSentEvent?.frameId ?? null);
    }
    dispose() {
        const result = {
            kind: 'error',
            error: new Error('Network processor detached'),
        };
        this.#responseReceivedDeferred.resolve(result);
        this.#beforeRequestSentDeferred.resolve(result);
    }
    #getBaseEventParams() {
        return {
            context: this.#requestWillBeSentEvent?.frameId ?? null,
            navigation: this.#getNavigationId(),
            // TODO: implement.
            redirectCount: this.#redirectCount,
            request: this.#getRequestData(),
            // Timestamp should be in milliseconds, while CDP provides it in seconds.
            timestamp: Math.round((this.#requestWillBeSentEvent?.wallTime ?? 0) * 1000),
        };
    }
    #getNavigationId() {
        if (!this.#requestWillBeSentEvent ||
            !this.#requestWillBeSentEvent.loaderId ||
            // When we navigate all CDP network events have `loaderId`
            // CDP's `loaderId` and `requestId` match when
            // that request triggered the loading
            this.#requestWillBeSentEvent.loaderId !==
                this.#requestWillBeSentEvent.requestId) {
            return null;
        }
        return this.#requestWillBeSentEvent.loaderId;
    }
    #getRequestData() {
        const cookies = this.#requestWillBeSentExtraInfoEvent
            ? NetworkRequest.#getCookies(this.#requestWillBeSentExtraInfoEvent.associatedCookies)
            : [];
        return {
            request: this.#requestWillBeSentEvent?.requestId ?? NetworkRequest.#unknown,
            url: this.#requestWillBeSentEvent?.request.url ?? NetworkRequest.#unknown,
            method: this.#requestWillBeSentEvent?.request.method ?? NetworkRequest.#unknown,
            headers: NetworkRequest.#getHeaders(this.#requestWillBeSentEvent?.request.headers),
            cookies,
            // TODO: implement.
            headersSize: -1,
            // TODO: implement.
            bodySize: 0,
            timings: {
                // TODO: implement.
                timeOrigin: 0,
                // TODO: implement.
                requestTime: 0,
                // TODO: implement.
                redirectStart: 0,
                // TODO: implement.
                redirectEnd: 0,
                // TODO: implement.
                fetchStart: 0,
                // TODO: implement.
                dnsStart: 0,
                // TODO: implement.
                dnsEnd: 0,
                // TODO: implement.
                connectStart: 0,
                // TODO: implement.
                connectEnd: 0,
                // TODO: implement.
                tlsStart: 0,
                // TODO: implement.
                requestStart: 0,
                // TODO: implement.
                responseStart: 0,
                // TODO: implement.
                responseEnd: 0,
            },
        };
    }
    #sendBeforeRequestEvent() {
        if (!this.#isIgnoredEvent()) {
            this.#eventManager.registerPromiseEvent(this.#beforeRequestSentDeferred.then((result) => {
                if (result.kind === 'success') {
                    return {
                        kind: 'success',
                        value: Object.assign(this.#getBeforeRequestEvent(), {
                            type: 'event',
                        }),
                    };
                }
                return result;
            }), this.#requestWillBeSentEvent?.frameId ?? null, protocol_js_1.ChromiumBidi.Network.EventNames.BeforeRequestSentEvent);
        }
    }
    #getBeforeRequestEvent() {
        if (this.#requestWillBeSentEvent === undefined) {
            throw new Error('RequestWillBeSentEvent is not set');
        }
        return {
            method: protocol_js_1.ChromiumBidi.Network.EventNames.BeforeRequestSentEvent,
            params: {
                ...this.#getBaseEventParams(),
                initiator: {
                    type: NetworkRequest.#getInitiatorType(this.#requestWillBeSentEvent.initiator.type),
                },
            },
        };
    }
    #sendResponseReceivedEvent() {
        if (!this.#isIgnoredEvent()) {
            this.#eventManager.registerPromiseEvent(this.#responseReceivedDeferred.then((result) => {
                if (result.kind === 'success') {
                    return {
                        kind: 'success',
                        value: Object.assign(this.#getResponseReceivedEvent(), {
                            type: 'event',
                        }),
                    };
                }
                return result;
            }), this.#responseReceivedEvent?.frameId ?? null, protocol_js_1.ChromiumBidi.Network.EventNames.ResponseCompletedEvent);
        }
    }
    #getResponseReceivedEvent() {
        if (this.#requestWillBeSentEvent === undefined) {
            throw new Error('RequestWillBeSentEvent is not set');
        }
        if (this.#responseReceivedEvent === undefined) {
            throw new Error('ResponseReceivedEvent is not set');
        }
        // Chromium sends wrong extraInfo events for responses served from cache.
        // See https://github.com/puppeteer/puppeteer/issues/9965 and
        // https://crbug.com/1340398.
        if (this.#responseReceivedEvent.response.fromDiskCache) {
            this.#responseReceivedExtraInfoEvent = undefined;
        }
        const headers = NetworkRequest.#getHeaders(this.#responseReceivedEvent.response.headers);
        return {
            method: protocol_js_1.ChromiumBidi.Network.EventNames.ResponseCompletedEvent,
            params: {
                ...this.#getBaseEventParams(),
                response: {
                    url: this.#responseReceivedEvent.response.url,
                    protocol: this.#responseReceivedEvent.response.protocol ?? '',
                    status: this.#responseReceivedExtraInfoEvent?.statusCode ??
                        this.#responseReceivedEvent.response.status,
                    statusText: this.#responseReceivedEvent.response.statusText,
                    fromCache: this.#responseReceivedEvent.response.fromDiskCache ||
                        this.#responseReceivedEvent.response.fromPrefetchCache ||
                        this.#servedFromCache,
                    headers,
                    mimeType: this.#responseReceivedEvent.response.mimeType,
                    bytesReceived: this.#responseReceivedEvent.response.encodedDataLength,
                    headersSize: this.#computeResponseHeadersSize(headers),
                    // TODO: consider removing from spec.
                    bodySize: 0,
                    content: {
                        // TODO: consider removing from spec.
                        size: 0,
                    },
                },
            },
        };
    }
    #computeResponseHeadersSize(headers) {
        return headers.reduce((total, header) => {
            return (total + header.name.length + header.value.value.length + 4 // 4 = ': ' + '\r\n'
            );
        }, 0);
    }
    #isIgnoredEvent() {
        return (this.#requestWillBeSentEvent?.request.url.endsWith('/favicon.ico') ??
            false);
    }
    static #getHeaders(headers) {
        if (!headers) {
            return [];
        }
        return Object.entries(headers).map(([name, value]) => ({
            name,
            value: {
                type: 'string',
                value,
            },
        }));
    }
    static #getInitiatorType(initiatorType) {
        switch (initiatorType) {
            case 'parser':
            case 'script':
            case 'preflight':
                return initiatorType;
            default:
                return 'other';
        }
    }
    static #getCookies(associatedCookies) {
        return associatedCookies.map((cookieInfo) => {
            return {
                name: cookieInfo.cookie.name,
                value: {
                    type: 'string',
                    value: cookieInfo.cookie.value,
                },
                domain: cookieInfo.cookie.domain,
                path: cookieInfo.cookie.path,
                expires: cookieInfo.cookie.expires,
                size: cookieInfo.cookie.size,
                httpOnly: cookieInfo.cookie.httpOnly,
                secure: cookieInfo.cookie.secure,
                sameSite: NetworkRequest.#getCookiesSameSite(cookieInfo.cookie.sameSite),
            };
        });
    }
    static #getCookiesSameSite(cdpSameSiteValue) {
        switch (cdpSameSiteValue) {
            case 'Strict':
                return 'strict';
            case 'Lax':
                return 'lax';
            default:
                return 'none';
        }
    }
}
exports.NetworkRequest = NetworkRequest;
//# sourceMappingURL=networkRequest.js.map