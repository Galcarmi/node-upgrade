/**
 * Copyright 2022 Google Inc. All rights reserved.
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
/// <reference types="node" />
import { ChildProcess } from 'child_process';
import { Browser as BrowserBase, BrowserCloseCallback, BrowserContextOptions } from '../../api/Browser.js';
import { BrowserContext as BrowserContextBase } from '../../api/BrowserContext.js';
import { Viewport } from '../PuppeteerViewport.js';
import { Connection } from './Connection.js';
/**
 * @internal
 */
export declare class Browser extends BrowserBase {
    #private;
    static readonly subscribeModules: string[];
    static create(opts: Options): Promise<Browser>;
    constructor(opts: Options & {
        browserName: string;
        browserVersion: string;
    });
    get connection(): Connection;
    close(): Promise<void>;
    isConnected(): boolean;
    process(): ChildProcess | null;
    createIncognitoBrowserContext(_options?: BrowserContextOptions): Promise<BrowserContextBase>;
    version(): Promise<string>;
}
interface Options {
    process?: ChildProcess;
    closeCallback?: BrowserCloseCallback;
    connection: Connection;
    defaultViewport: Viewport | null;
    ignoreHTTPSErrors?: boolean;
}
export {};
//# sourceMappingURL=Browser.d.ts.map