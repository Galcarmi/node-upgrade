"use strict";
/**
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
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CdpProcessor = void 0;
class CdpProcessor {
    #browsingContextStorage;
    #cdpConnection;
    constructor(browsingContextStorage, cdpConnection) {
        this.#browsingContextStorage = browsingContextStorage;
        this.#cdpConnection = cdpConnection;
    }
    getSession(params) {
        const context = params.context;
        const sessionId = this.#browsingContextStorage.getContext(context).cdpTarget.cdpSessionId;
        if (sessionId === undefined) {
            return {};
        }
        return { session: sessionId };
    }
    async sendCommand(params) {
        const client = params.session
            ? this.#cdpConnection.getCdpClient(params.session)
            : this.#cdpConnection.browserClient();
        const result = await client.sendCommand(params.method, params.params);
        return {
            result,
            session: params.session,
        };
    }
}
exports.CdpProcessor = CdpProcessor;
//# sourceMappingURL=CdpProcessor.js.map