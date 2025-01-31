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
import { isNode } from '../environment.js';
import { assert } from '../util/assert.js';
import { isErrorLike } from '../util/ErrorLike.js';
import { debug } from './Debug.js';
import { CDPElementHandle } from './ElementHandle.js';
import { TimeoutError } from './Errors.js';
import { CDPJSHandle } from './JSHandle.js';
/**
 * @internal
 */
export const debugError = debug('puppeteer:error');
/**
 * @internal
 */
export function getExceptionMessage(exceptionDetails) {
    if (exceptionDetails.exception) {
        return (exceptionDetails.exception.description || exceptionDetails.exception.value);
    }
    let message = exceptionDetails.text;
    if (exceptionDetails.stackTrace) {
        for (const callframe of exceptionDetails.stackTrace.callFrames) {
            const location = callframe.url +
                ':' +
                callframe.lineNumber +
                ':' +
                callframe.columnNumber;
            const functionName = callframe.functionName || '<anonymous>';
            message += `\n    at ${functionName} (${location})`;
        }
    }
    return message;
}
/**
 * @internal
 */
export function valueFromRemoteObject(remoteObject) {
    assert(!remoteObject.objectId, 'Cannot extract value when objectId is given');
    if (remoteObject.unserializableValue) {
        if (remoteObject.type === 'bigint') {
            return BigInt(remoteObject.unserializableValue.replace('n', ''));
        }
        switch (remoteObject.unserializableValue) {
            case '-0':
                return -0;
            case 'NaN':
                return NaN;
            case 'Infinity':
                return Infinity;
            case '-Infinity':
                return -Infinity;
            default:
                throw new Error('Unsupported unserializable value: ' +
                    remoteObject.unserializableValue);
        }
    }
    return remoteObject.value;
}
/**
 * @internal
 */
export async function releaseObject(client, remoteObject) {
    if (!remoteObject.objectId) {
        return;
    }
    await client
        .send('Runtime.releaseObject', { objectId: remoteObject.objectId })
        .catch(error => {
        // Exceptions might happen in case of a page been navigated or closed.
        // Swallow these since they are harmless and we don't leak anything in this case.
        debugError(error);
    });
}
/**
 * @internal
 */
export function addEventListener(emitter, eventName, handler) {
    emitter.on(eventName, handler);
    return { emitter, eventName, handler };
}
/**
 * @internal
 */
export function removeEventListeners(listeners) {
    for (const listener of listeners) {
        listener.emitter.removeListener(listener.eventName, listener.handler);
    }
    listeners.length = 0;
}
/**
 * @internal
 */
export const isString = (obj) => {
    return typeof obj === 'string' || obj instanceof String;
};
/**
 * @internal
 */
export const isNumber = (obj) => {
    return typeof obj === 'number' || obj instanceof Number;
};
/**
 * @internal
 */
export const isPlainObject = (obj) => {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.constructor) === Object;
};
/**
 * @internal
 */
export const isRegExp = (obj) => {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.constructor) === RegExp;
};
/**
 * @internal
 */
export const isDate = (obj) => {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.constructor) === Date;
};
/**
 * @internal
 */
export async function waitForEvent(emitter, eventName, predicate, timeout, abortPromise) {
    let eventTimeout;
    let resolveCallback;
    let rejectCallback;
    const promise = new Promise((resolve, reject) => {
        resolveCallback = resolve;
        rejectCallback = reject;
    });
    const listener = addEventListener(emitter, eventName, async (event) => {
        if (!(await predicate(event))) {
            return;
        }
        resolveCallback(event);
    });
    if (timeout) {
        eventTimeout = setTimeout(() => {
            rejectCallback(new TimeoutError('Timeout exceeded while waiting for event'));
        }, timeout);
    }
    function cleanup() {
        removeEventListeners([listener]);
        clearTimeout(eventTimeout);
    }
    const result = await Promise.race([promise, abortPromise]).then(r => {
        cleanup();
        return r;
    }, error => {
        cleanup();
        throw error;
    });
    if (isErrorLike(result)) {
        throw result;
    }
    return result;
}
/**
 * @internal
 */
export function createJSHandle(context, remoteObject) {
    if (remoteObject.subtype === 'node' && context._world) {
        return new CDPElementHandle(context, remoteObject, context._world.frame());
    }
    return new CDPJSHandle(context, remoteObject);
}
/**
 * @internal
 */
export function evaluationString(fun, ...args) {
    if (isString(fun)) {
        assert(args.length === 0, 'Cannot evaluate a string with arguments');
        return fun;
    }
    function serializeArgument(arg) {
        if (Object.is(arg, undefined)) {
            return 'undefined';
        }
        return JSON.stringify(arg);
    }
    return `(${fun})(${args.map(serializeArgument).join(',')})`;
}
/**
 * @internal
 */
export function addPageBinding(type, name) {
    // This is the CDP binding.
    // @ts-expect-error: In a different context.
    const callCDP = globalThis[name];
    // We replace the CDP binding with a Puppeteer binding.
    Object.assign(globalThis, {
        [name](...args) {
            var _a, _b, _c;
            // This is the Puppeteer binding.
            // @ts-expect-error: In a different context.
            const callPuppeteer = globalThis[name];
            (_a = callPuppeteer.args) !== null && _a !== void 0 ? _a : (callPuppeteer.args = new Map());
            (_b = callPuppeteer.callbacks) !== null && _b !== void 0 ? _b : (callPuppeteer.callbacks = new Map());
            const seq = ((_c = callPuppeteer.lastSeq) !== null && _c !== void 0 ? _c : 0) + 1;
            callPuppeteer.lastSeq = seq;
            callPuppeteer.args.set(seq, args);
            callCDP(JSON.stringify({
                type,
                name,
                seq,
                args,
                isTrivial: !args.some(value => {
                    return value instanceof Node;
                }),
            }));
            return new Promise((resolve, reject) => {
                callPuppeteer.callbacks.set(seq, {
                    resolve(value) {
                        callPuppeteer.args.delete(seq);
                        resolve(value);
                    },
                    reject(value) {
                        callPuppeteer.args.delete(seq);
                        reject(value);
                    },
                });
            });
        },
    });
}
/**
 * @internal
 */
export function pageBindingInitString(type, name) {
    return evaluationString(addPageBinding, type, name);
}
/**
 * @internal
 */
export async function waitWithTimeout(promise, taskName, timeout) {
    let reject;
    const timeoutError = new TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
    const timeoutPromise = new Promise((_, rej) => {
        return (reject = rej);
    });
    let timeoutTimer = null;
    if (timeout) {
        timeoutTimer = setTimeout(() => {
            return reject(timeoutError);
        }, timeout);
    }
    try {
        return await Promise.race([promise, timeoutPromise]);
    }
    finally {
        if (timeoutTimer) {
            clearTimeout(timeoutTimer);
        }
    }
}
/**
 * @internal
 */
let fs = null;
/**
 * @internal
 */
export async function importFSPromises() {
    if (!fs) {
        try {
            fs = await import('fs/promises');
        }
        catch (error) {
            if (error instanceof TypeError) {
                throw new Error('Cannot write to a path outside of a Node-like environment.');
            }
            throw error;
        }
    }
    return fs;
}
/**
 * @internal
 */
export async function getReadableAsBuffer(readable, path) {
    const buffers = [];
    if (path) {
        const fs = await importFSPromises();
        const fileHandle = await fs.open(path, 'w+');
        for await (const chunk of readable) {
            buffers.push(chunk);
            await fileHandle.writeFile(chunk);
        }
        await fileHandle.close();
    }
    else {
        for await (const chunk of readable) {
            buffers.push(chunk);
        }
    }
    try {
        return Buffer.concat(buffers);
    }
    catch (error) {
        return null;
    }
}
/**
 * @internal
 */
export async function getReadableFromProtocolStream(client, handle) {
    // TODO: Once Node 18 becomes the lowest supported version, we can migrate to
    // ReadableStream.
    if (!isNode) {
        throw new Error('Cannot create a stream outside of Node.js environment.');
    }
    const { Readable } = await import('stream');
    let eof = false;
    return new Readable({
        async read(size) {
            if (eof) {
                return;
            }
            const response = await client.send('IO.read', { handle, size });
            this.push(response.data, response.base64Encoded ? 'base64' : undefined);
            if (response.eof) {
                eof = true;
                await client.send('IO.close', { handle });
                this.push(null);
            }
        },
    });
}
/**
 * @internal
 */
export async function setPageContent(page, content) {
    // We rely upon the fact that document.open() will reset frame lifecycle with "init"
    // lifecycle event. @see https://crrev.com/608658
    return page.evaluate(html => {
        document.open();
        document.write(html);
        document.close();
    }, content);
}
//# sourceMappingURL=util.js.map