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
import type { ICdpConnection } from '../cdp/cdpConnection.js';
import { type ChromiumBidi } from '../protocol/protocol.js';
import { EventEmitter } from '../utils/EventEmitter.js';
import { type LoggerFn } from '../utils/log.js';
import type { Result } from '../utils/result.js';
import type { IBidiParser } from './BidiParser.js';
import { OutgoingBidiMessage } from './OutgoingBidiMessage.js';
import type { BrowsingContextStorage } from './domains/context/browsingContextStorage.js';
import type { IEventManager } from './domains/events/EventManager.js';
import type { RealmStorage } from './domains/script/realmStorage.js';
type CommandProcessorEvents = {
    response: Promise<Result<OutgoingBidiMessage>>;
};
export declare class CommandProcessor extends EventEmitter<CommandProcessorEvents> {
    #private;
    constructor(cdpConnection: ICdpConnection, eventManager: IEventManager, selfTargetId: string, browsingContextStorage: BrowsingContextStorage, realmStorage: RealmStorage, parser?: IBidiParser, logger?: LoggerFn);
    processCommand(command: ChromiumBidi.Command): Promise<void>;
}
export {};
