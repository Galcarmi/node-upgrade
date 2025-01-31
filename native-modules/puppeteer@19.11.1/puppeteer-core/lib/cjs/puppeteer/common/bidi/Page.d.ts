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
/// <reference types="node" />
import type { Readable } from 'stream';
import { HTTPResponse } from '../../api/HTTPResponse.js';
import { Page as PageBase, ScreenshotOptions, WaitForOptions } from '../../api/Page.js';
import { PDFOptions } from '../PDFOptions.js';
import { EvaluateFunc, HandleFor } from '../types.js';
import { Context } from './Context.js';
/**
 * @internal
 */
export declare class Page extends PageBase {
    #private;
    constructor(context: Context);
    close(): Promise<void>;
    evaluateHandle<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<HandleFor<Awaited<ReturnType<Func>>>>;
    evaluate<Params extends unknown[], Func extends EvaluateFunc<Params> = EvaluateFunc<Params>>(pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
    goto(url: string, options?: WaitForOptions & {
        referer?: string | undefined;
        referrerPolicy?: string | undefined;
    }): Promise<HTTPResponse | null>;
    url(): string;
    setDefaultNavigationTimeout(timeout: number): void;
    setDefaultTimeout(timeout: number): void;
    setContent(html: string, options?: WaitForOptions): Promise<void>;
    content(): Promise<string>;
    pdf(options?: PDFOptions): Promise<Buffer>;
    createPDFStream(options?: PDFOptions | undefined): Promise<Readable>;
    screenshot(options: ScreenshotOptions & {
        encoding: 'base64';
    }): Promise<string>;
    screenshot(options?: ScreenshotOptions & {
        encoding?: 'binary';
    }): never;
}
//# sourceMappingURL=Page.d.ts.map