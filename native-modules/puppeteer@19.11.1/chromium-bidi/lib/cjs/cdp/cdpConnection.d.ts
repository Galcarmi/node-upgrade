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
import type { ProtocolMapping } from 'devtools-protocol/types/protocol-mapping.js';
import { ITransport } from '../utils/transport.js';
import { CdpClient } from './cdpClient.js';
/**
 * Represents a high-level CDP connection to the browser backend.
 * Manages a CdpClient instance for each active CDP session.
 */
export declare class CdpConnection {
    #private;
    constructor(transport: ITransport, log?: (...messages: unknown[]) => void);
    /**
     * Closes the connection to the browser.
     */
    close(): void;
    /**
     * @return The CdpClient object attached to the root browser session.
     */
    browserClient(): CdpClient;
    /**
     * Gets a CdpClient instance by sessionId.
     * @param sessionId The sessionId of the CdpClient to retrieve.
     * @return The CdpClient object attached to the given session, or null if the session is not attached.
     */
    getCdpClient(sessionId: string): CdpClient;
    sendCommand<CdpMethod extends keyof ProtocolMapping.Commands>(method: CdpMethod, params: ProtocolMapping.Commands[CdpMethod]['paramsType'][0] | undefined, sessionId: string | null): Promise<object>;
}
