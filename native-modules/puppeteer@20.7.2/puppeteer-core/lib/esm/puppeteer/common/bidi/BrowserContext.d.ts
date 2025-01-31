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
import { BrowserContext as BrowserContextBase } from '../../api/BrowserContext.js';
import { Page as PageBase } from '../../api/Page.js';
import { Viewport } from '../PuppeteerViewport.js';
import { Browser } from './Browser.js';
import { Connection } from './Connection.js';
interface BrowserContextOptions {
    defaultViewport: Viewport | null;
}
/**
 * @internal
 */
export declare class BrowserContext extends BrowserContextBase {
    #private;
    constructor(browser: Browser, options: BrowserContextOptions);
    get connection(): Connection;
    newPage(): Promise<PageBase>;
    close(): Promise<void>;
    browser(): Browser;
    pages(): Promise<PageBase[]>;
}
export {};
//# sourceMappingURL=BrowserContext.d.ts.map