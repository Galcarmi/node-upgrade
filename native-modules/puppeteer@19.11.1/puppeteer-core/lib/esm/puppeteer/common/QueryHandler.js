/**
 * Copyright 2023 Google Inc. All rights reserved.
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
import { ElementHandle } from '../api/ElementHandle.js';
import { assert } from '../util/assert.js';
import { isErrorLike } from '../util/ErrorLike.js';
import { interpolateFunction, stringifyFunction } from '../util/Function.js';
import { AbortError } from './Errors.js';
import { transposeIterableHandle } from './HandleIterator.js';
import { MAIN_WORLD, PUPPETEER_WORLD } from './IsolatedWorlds.js';
import { LazyArg } from './LazyArg.js';
/**
 * @internal
 */
export class QueryHandler {
    static get _querySelector() {
        if (this.querySelector) {
            return this.querySelector;
        }
        if (!this.querySelectorAll) {
            throw new Error('Cannot create default `querySelector`.');
        }
        return (this.querySelector = interpolateFunction(async (node, selector, PuppeteerUtil) => {
            const querySelectorAll = PLACEHOLDER('querySelectorAll');
            const results = querySelectorAll(node, selector, PuppeteerUtil);
            for await (const result of results) {
                return result;
            }
            return null;
        }, {
            querySelectorAll: stringifyFunction(this.querySelectorAll),
        }));
    }
    static get _querySelectorAll() {
        if (this.querySelectorAll) {
            return this.querySelectorAll;
        }
        if (!this.querySelector) {
            throw new Error('Cannot create default `querySelectorAll`.');
        }
        return (this.querySelectorAll = interpolateFunction(async function* (node, selector, PuppeteerUtil) {
            const querySelector = PLACEHOLDER('querySelector');
            const result = await querySelector(node, selector, PuppeteerUtil);
            if (result) {
                yield result;
            }
        }, {
            querySelector: stringifyFunction(this.querySelector),
        }));
    }
    /**
     * Queries for multiple nodes given a selector and {@link ElementHandle}.
     *
     * Akin to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll | Document.querySelectorAll()}.
     */
    static async *queryAll(element, selector) {
        const world = element.executionContext()._world;
        assert(world);
        const handle = await element.evaluateHandle(this._querySelectorAll, selector, LazyArg.create(context => {
            return context.puppeteerUtil;
        }));
        yield* transposeIterableHandle(handle);
    }
    /**
     * Queries for a single node given a selector and {@link ElementHandle}.
     *
     * Akin to {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector}.
     */
    static async queryOne(element, selector) {
        const world = element.executionContext()._world;
        assert(world);
        const result = await element.evaluateHandle(this._querySelector, selector, LazyArg.create(context => {
            return context.puppeteerUtil;
        }));
        if (!(result instanceof ElementHandle)) {
            await result.dispose();
            return null;
        }
        return result;
    }
    /**
     * Waits until a single node appears for a given selector and
     * {@link ElementHandle}.
     *
     * This will always query the handle in the Puppeteer world and migrate the
     * result to the main world.
     */
    static async waitFor(elementOrFrame, selector, options) {
        let frame;
        let element;
        if (!(elementOrFrame instanceof ElementHandle)) {
            frame = elementOrFrame;
        }
        else {
            frame = elementOrFrame.frame;
            element = await frame.worlds[PUPPETEER_WORLD].adoptHandle(elementOrFrame);
        }
        const { visible = false, hidden = false, timeout, signal } = options;
        try {
            if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                throw new AbortError('QueryHander.waitFor has been aborted.');
            }
            const handle = await frame.worlds[PUPPETEER_WORLD].waitForFunction(async (PuppeteerUtil, query, selector, root, visible) => {
                const querySelector = PuppeteerUtil.createFunction(query);
                const node = await querySelector(root !== null && root !== void 0 ? root : document, selector, PuppeteerUtil);
                return PuppeteerUtil.checkVisibility(node, visible);
            }, {
                polling: visible || hidden ? 'raf' : 'mutation',
                root: element,
                timeout,
                signal,
            }, LazyArg.create(context => {
                return context.puppeteerUtil;
            }), stringifyFunction(this._querySelector), selector, element, visible ? true : hidden ? false : undefined);
            if (signal === null || signal === void 0 ? void 0 : signal.aborted) {
                await handle.dispose();
                throw new AbortError('QueryHander.waitFor has been aborted.');
            }
            if (!(handle instanceof ElementHandle)) {
                await handle.dispose();
                return null;
            }
            return frame.worlds[MAIN_WORLD].transferHandle(handle);
        }
        catch (error) {
            if (!isErrorLike(error)) {
                throw error;
            }
            error.message = `Waiting for selector \`${selector}\` failed: ${error.message}`;
            throw error;
        }
        finally {
            if (element) {
                await element.dispose();
            }
        }
    }
}
//# sourceMappingURL=QueryHandler.js.map