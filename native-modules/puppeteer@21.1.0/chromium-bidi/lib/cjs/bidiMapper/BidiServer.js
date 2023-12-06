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
exports.BidiServer = void 0;
const EventEmitter_js_1 = require("../utils/EventEmitter.js");
const log_js_1 = require("../utils/log.js");
const processingQueue_js_1 = require("../utils/processingQueue.js");
const CommandProcessor_js_1 = require("./CommandProcessor.js");
const browsingContextStorage_js_1 = require("./domains/context/browsingContextStorage.js");
const EventManager_js_1 = require("./domains/events/EventManager.js");
const realmStorage_js_1 = require("./domains/script/realmStorage.js");
class BidiServer extends EventEmitter_js_1.EventEmitter {
    #messageQueue;
    #transport;
    #commandProcessor;
    #browsingContextStorage = new browsingContextStorage_js_1.BrowsingContextStorage();
    #logger;
    #handleIncomingMessage = (message) => {
        void this.#commandProcessor.processCommand(message).catch((error) => {
            this.#logger?.(log_js_1.LogType.system, error);
        });
    };
    #processOutgoingMessage = async (messageEntry) => {
        const message = messageEntry.message;
        if (messageEntry.channel !== null) {
            message['channel'] = messageEntry.channel;
        }
        await this.#transport.sendMessage(message);
    };
    constructor(bidiTransport, cdpConnection, selfTargetId, parser, logger) {
        super();
        this.#logger = logger;
        this.#messageQueue = new processingQueue_js_1.ProcessingQueue(this.#processOutgoingMessage, this.#logger);
        this.#transport = bidiTransport;
        this.#transport.setOnMessage(this.#handleIncomingMessage);
        this.#commandProcessor = new CommandProcessor_js_1.CommandProcessor(cdpConnection, new EventManager_js_1.EventManager(this), selfTargetId, this.#browsingContextStorage, new realmStorage_js_1.RealmStorage(), parser, this.#logger);
        this.#commandProcessor.on('response', (response) => {
            this.emitOutgoingMessage(response);
        });
    }
    static async createAndStart(bidiTransport, cdpConnection, selfTargetId, parser, logger) {
        const server = new BidiServer(bidiTransport, cdpConnection, selfTargetId, parser, logger);
        const cdpClient = cdpConnection.browserClient();
        // Needed to get events about new targets.
        await cdpClient.sendCommand('Target.setDiscoverTargets', { discover: true });
        // Needed to automatically attach to new targets.
        await cdpClient.sendCommand('Target.setAutoAttach', {
            autoAttach: true,
            waitForDebuggerOnStart: true,
            flatten: true,
        });
        await server.#topLevelContextsLoaded();
        return server;
    }
    /**
     * Sends BiDi message.
     */
    emitOutgoingMessage(messageEntry) {
        this.#messageQueue.add(messageEntry);
    }
    close() {
        this.#transport.close();
    }
    getBrowsingContextStorage() {
        return this.#browsingContextStorage;
    }
    async #topLevelContextsLoaded() {
        await Promise.all(this.#browsingContextStorage
            .getTopLevelContexts()
            .map((c) => c.lifecycleLoaded()));
    }
}
exports.BidiServer = BidiServer;
//# sourceMappingURL=BidiServer.js.map