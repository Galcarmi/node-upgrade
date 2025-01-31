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
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdpClient = void 0;
const EventEmitter_js_1 = require("../utils/EventEmitter.js");
class CdpClient extends EventEmitter_js_1.EventEmitter {
    #cdpConnection;
    #sessionId;
    constructor(cdpConnection, sessionId) {
        super();
        this.#cdpConnection = cdpConnection;
        this.#sessionId = sessionId;
    }
    /**
     * Creates a new CDP client object that communicates with the browser using a given
     * transport mechanism.
     * @param transport A transport object that will be used to send and receive raw CDP messages.
     * @return A connected CDP client object.
     */
    static create(cdpConnection, sessionId) {
        return new CdpClient(cdpConnection, sessionId);
    }
    /**
     * Returns command promise, which will be resolved with the command result after receiving CDP result.
     * @param method Name of the CDP command to call.
     * @param params Parameters to pass to the CDP command.
     */
    sendCommand(method, ...params) {
        const param = params[0];
        return this.#cdpConnection.sendCommand(method, param, this.#sessionId);
    }
}
exports.CdpClient = CdpClient;
//# sourceMappingURL=cdpClient.js.map