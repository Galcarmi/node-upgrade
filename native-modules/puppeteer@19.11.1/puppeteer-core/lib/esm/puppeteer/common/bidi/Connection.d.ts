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
import * as Bidi from 'chromium-bidi/lib/cjs/protocol/protocol.js';
import { ConnectionTransport } from '../ConnectionTransport.js';
import { EventEmitter } from '../EventEmitter.js';
import { Context } from './Context.js';
/**
 * @internal
 */
interface Commands {
    'script.evaluate': {
        params: Bidi.Script.EvaluateParameters;
        returnType: Bidi.Script.EvaluateResult;
    };
    'script.callFunction': {
        params: Bidi.Script.CallFunctionParameters;
        returnType: Bidi.Script.CallFunctionResult;
    };
    'script.disown': {
        params: Bidi.Script.DisownParameters;
        returnType: Bidi.Script.DisownResult;
    };
    'browsingContext.create': {
        params: Bidi.BrowsingContext.CreateParameters;
        returnType: Bidi.BrowsingContext.CreateResult;
    };
    'browsingContext.close': {
        params: Bidi.BrowsingContext.CloseParameters;
        returnType: Bidi.BrowsingContext.CloseResult;
    };
    'browsingContext.navigate': {
        params: Bidi.BrowsingContext.NavigateParameters;
        returnType: Bidi.BrowsingContext.NavigateResult;
    };
    'browsingContext.print': {
        params: Bidi.BrowsingContext.PrintParameters;
        returnType: Bidi.BrowsingContext.PrintResult;
    };
    'browsingContext.captureScreenshot': {
        params: Bidi.BrowsingContext.CaptureScreenshotParameters;
        returnType: Bidi.BrowsingContext.CaptureScreenshotResult;
    };
    'session.new': {
        params: {
            capabilities?: Record<any, unknown>;
        };
        returnType: {
            sessionId: string;
        };
    };
    'session.status': {
        params: object;
        returnType: Bidi.Session.StatusResult;
    };
    'session.subscribe': {
        params: Bidi.Session.SubscribeParameters;
        returnType: Bidi.Session.SubscribeResult;
    };
    'session.unsubscribe': {
        params: Bidi.Session.SubscribeParameters;
        returnType: Bidi.Session.UnsubscribeResult;
    };
}
/**
 * @internal
 */
export declare class Connection extends EventEmitter {
    #private;
    constructor(transport: ConnectionTransport, delay?: number, timeout?: number);
    get closed(): boolean;
    context(contextId: string): Context | null;
    send<T extends keyof Commands>(method: T, params: Commands[T]['params']): Promise<Commands[T]['returnType']>;
    /**
     * @internal
     */
    protected onMessage(message: string): Promise<void>;
    dispose(): void;
}
export {};
//# sourceMappingURL=Connection.d.ts.map