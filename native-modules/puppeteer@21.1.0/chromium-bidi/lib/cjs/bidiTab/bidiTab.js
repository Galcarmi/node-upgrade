"use strict";
/**
 * Copyright 2021 Google LLC.
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
 * @license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const bidiMapper_js_1 = require("../bidiMapper/bidiMapper.js");
const cdpConnection_js_1 = require("../cdp/cdpConnection.js");
const log_js_1 = require("../utils/log.js");
const BidiParserImpl_1 = require("./BidiParserImpl");
const mapperTabPage_js_1 = require("./mapperTabPage.js");
// Initiate `setSelfTargetId` as soon as possible to prevent race condition.
const waitSelfTargetIdPromise = waitSelfTargetId();
void (async () => {
    (0, mapperTabPage_js_1.generatePage)();
    // Needed to filter out info related to BiDi target.
    const selfTargetId = await waitSelfTargetIdPromise;
    const bidiServer = await createBidiServer(selfTargetId);
    (0, mapperTabPage_js_1.log)(log_js_1.LogType.system, 'Launched');
    bidiServer.emitOutgoingMessage(bidiMapper_js_1.OutgoingBidiMessage.createResolved({
        launched: true,
    }));
})();
function createCdpConnection() {
    /**
     * A CdpTransport implementation that uses the window.cdp bindings
     * injected by Target.exposeDevToolsProtocol.
     */
    class WindowCdpTransport {
        #onMessage = null;
        constructor() {
            window.cdp.onmessage = (message) => {
                this.#onMessage?.call(null, message);
            };
        }
        setOnMessage(onMessage) {
            this.#onMessage = onMessage;
        }
        sendMessage(message) {
            window.cdp.send(message);
        }
        close() {
            this.#onMessage = null;
            window.cdp.onmessage = null;
        }
    }
    return new cdpConnection_js_1.CdpConnection(new WindowCdpTransport(), mapperTabPage_js_1.log);
}
function createBidiServer(selfTargetId) {
    class WindowBidiTransport {
        #onMessage = null;
        constructor() {
            window.onBidiMessage = (messageStr) => {
                (0, mapperTabPage_js_1.log)(`${log_js_1.LogType.bidi}:RECV ◂`, messageStr);
                let messageObject;
                try {
                    messageObject = WindowBidiTransport.#parseBidiMessage(messageStr);
                }
                catch (e) {
                    // Transport-level error does not provide channel.
                    this.#respondWithError(messageStr, "invalid argument" /* ErrorCode.InvalidArgument */, e.message, null);
                    return;
                }
                this.#onMessage?.call(null, messageObject);
            };
        }
        setOnMessage(onMessage) {
            this.#onMessage = onMessage;
        }
        sendMessage(message) {
            const messageStr = JSON.stringify(message);
            window.sendBidiResponse(messageStr);
            (0, mapperTabPage_js_1.log)(`${log_js_1.LogType.bidi}:SEND ▸`, messageStr);
        }
        close() {
            this.#onMessage = null;
            window.onBidiMessage = null;
        }
        #respondWithError(plainCommandData, errorCode, errorMessage, channel) {
            const errorResponse = WindowBidiTransport.#getErrorResponse(plainCommandData, errorCode, errorMessage);
            if (channel) {
                // XXX: get rid of any, same code existed in BidiServer.
                this.sendMessage({
                    ...errorResponse,
                    channel,
                });
            }
            else {
                this.sendMessage(errorResponse);
            }
        }
        static #getJsonType(value) {
            if (value === null) {
                return 'null';
            }
            if (Array.isArray(value)) {
                return 'array';
            }
            return typeof value;
        }
        static #getErrorResponse(messageStr, errorCode, errorMessage) {
            // XXX: this is bizarre per spec. We reparse the payload and
            // extract the ID, regardless of what kind of value it was.
            let messageId;
            try {
                const messageObj = JSON.parse(messageStr);
                if (WindowBidiTransport.#getJsonType(messageObj) === 'object' &&
                    'id' in messageObj) {
                    messageId = messageObj.id;
                }
            }
            catch { }
            return {
                type: 'error',
                id: messageId,
                error: errorCode,
                message: errorMessage,
                // XXX: optional stacktrace field.
            };
        }
        static #parseBidiMessage(messageStr) {
            let messageObject;
            try {
                messageObject = JSON.parse(messageStr);
            }
            catch {
                throw new Error('Cannot parse data as JSON');
            }
            const parsedType = WindowBidiTransport.#getJsonType(messageObject);
            if (parsedType !== 'object') {
                throw new Error(`Expected JSON object but got ${parsedType}`);
            }
            // Extract and validate id, method and params.
            const { id, method, params } = messageObject;
            const idType = WindowBidiTransport.#getJsonType(id);
            if (idType !== 'number' || !Number.isInteger(id) || id < 0) {
                // TODO: should uint64_t be the upper limit?
                // https://tools.ietf.org/html/rfc7049#section-2.1
                throw new Error(`Expected unsigned integer but got ${idType}`);
            }
            const methodType = WindowBidiTransport.#getJsonType(method);
            if (methodType !== 'string') {
                throw new Error(`Expected string method but got ${methodType}`);
            }
            const paramsType = WindowBidiTransport.#getJsonType(params);
            if (paramsType !== 'object') {
                throw new Error(`Expected object params but got ${paramsType}`);
            }
            let channel = messageObject.channel;
            if (channel !== undefined) {
                const channelType = WindowBidiTransport.#getJsonType(channel);
                if (channelType !== 'string') {
                    throw new Error(`Expected string channel but got ${channelType}`);
                }
                // Empty string channel is considered as no channel provided.
                if (channel === '') {
                    channel = undefined;
                }
            }
            return { id, method, params, channel };
        }
    }
    return bidiMapper_js_1.BidiServer.createAndStart(new WindowBidiTransport(), createCdpConnection(), selfTargetId, new BidiParserImpl_1.BidiParserImpl(), mapperTabPage_js_1.log);
}
// Needed to filter out info related to BiDi target.
async function waitSelfTargetId() {
    return new Promise((resolve) => {
        window.setSelfTargetId = (targetId) => {
            (0, mapperTabPage_js_1.log)(log_js_1.LogType.system, 'Current target ID:', targetId);
            resolve(targetId);
        };
    });
}
//# sourceMappingURL=bidiTab.js.map