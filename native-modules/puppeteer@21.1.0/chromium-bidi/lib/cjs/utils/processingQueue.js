"use strict";
/**
 * Copyright 2022 Google LLC.
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
exports.ProcessingQueue = void 0;
const log_js_1 = require("./log.js");
class ProcessingQueue {
    #logger;
    #processor;
    #queue = [];
    // Flag to keep only 1 active processor.
    #isProcessing = false;
    constructor(processor, logger) {
        this.#processor = processor;
        this.#logger = logger;
    }
    add(entry) {
        this.#queue.push(entry);
        // No need in waiting. Just initialise processor if needed.
        void this.#processIfNeeded();
    }
    async #processIfNeeded() {
        if (this.#isProcessing) {
            return;
        }
        this.#isProcessing = true;
        while (this.#queue.length > 0) {
            const entryPromise = this.#queue.shift();
            if (entryPromise !== undefined) {
                await entryPromise
                    .then((entry) => {
                    if (entry.kind === 'error') {
                        this.#logger?.(log_js_1.LogType.system, 'Event threw before sending:', entry.error);
                        return;
                    }
                    return this.#processor(entry.value);
                })
                    .catch((e) => {
                    this.#logger?.(log_js_1.LogType.system, 'Event was not processed:', e);
                });
            }
        }
        this.#isProcessing = false;
    }
}
exports.ProcessingQueue = ProcessingQueue;
//# sourceMappingURL=processingQueue.js.map