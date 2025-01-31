"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPageContent = exports.getReadableFromProtocolStream = exports.getReadableAsBuffer = exports.importFSPromises = exports.waitWithTimeout = exports.pageBindingInitString = exports.addPageBinding = exports.evaluationString = exports.createJSHandle = exports.waitForEvent = exports.isDate = exports.isRegExp = exports.isPlainObject = exports.isNumber = exports.isString = exports.removeEventListeners = exports.addEventListener = exports.releaseObject = exports.valueFromRemoteObject = exports.getExceptionMessage = exports.debugError = void 0;
const environment_js_1 = require("../environment.js");
const assert_js_1 = require("../util/assert.js");
const ErrorLike_js_1 = require("../util/ErrorLike.js");
const Debug_js_1 = require("./Debug.js");
const ElementHandle_js_1 = require("./ElementHandle.js");
const Errors_js_1 = require("./Errors.js");
const JSHandle_js_1 = require("./JSHandle.js");
/**
 * @internal
 */
exports.debugError = (0, Debug_js_1.debug)('puppeteer:error');
/**
 * @internal
 */
function getExceptionMessage(exceptionDetails) {
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
exports.getExceptionMessage = getExceptionMessage;
/**
 * @internal
 */
function valueFromRemoteObject(remoteObject) {
    (0, assert_js_1.assert)(!remoteObject.objectId, 'Cannot extract value when objectId is given');
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
exports.valueFromRemoteObject = valueFromRemoteObject;
/**
 * @internal
 */
async function releaseObject(client, remoteObject) {
    if (!remoteObject.objectId) {
        return;
    }
    await client
        .send('Runtime.releaseObject', { objectId: remoteObject.objectId })
        .catch(error => {
        // Exceptions might happen in case of a page been navigated or closed.
        // Swallow these since they are harmless and we don't leak anything in this case.
        (0, exports.debugError)(error);
    });
}
exports.releaseObject = releaseObject;
/**
 * @internal
 */
function addEventListener(emitter, eventName, handler) {
    emitter.on(eventName, handler);
    return { emitter, eventName, handler };
}
exports.addEventListener = addEventListener;
/**
 * @internal
 */
function removeEventListeners(listeners) {
    for (const listener of listeners) {
        listener.emitter.removeListener(listener.eventName, listener.handler);
    }
    listeners.length = 0;
}
exports.removeEventListeners = removeEventListeners;
/**
 * @internal
 */
const isString = (obj) => {
    return typeof obj === 'string' || obj instanceof String;
};
exports.isString = isString;
/**
 * @internal
 */
const isNumber = (obj) => {
    return typeof obj === 'number' || obj instanceof Number;
};
exports.isNumber = isNumber;
/**
 * @internal
 */
const isPlainObject = (obj) => {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.constructor) === Object;
};
exports.isPlainObject = isPlainObject;
/**
 * @internal
 */
const isRegExp = (obj) => {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.constructor) === RegExp;
};
exports.isRegExp = isRegExp;
/**
 * @internal
 */
const isDate = (obj) => {
    return typeof obj === 'object' && (obj === null || obj === void 0 ? void 0 : obj.constructor) === Date;
};
exports.isDate = isDate;
/**
 * @internal
 */
async function waitForEvent(emitter, eventName, predicate, timeout, abortPromise) {
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
            rejectCallback(new Errors_js_1.TimeoutError('Timeout exceeded while waiting for event'));
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
    if ((0, ErrorLike_js_1.isErrorLike)(result)) {
        throw result;
    }
    return result;
}
exports.waitForEvent = waitForEvent;
/**
 * @internal
 */
function createJSHandle(context, remoteObject) {
    if (remoteObject.subtype === 'node' && context._world) {
        return new ElementHandle_js_1.CDPElementHandle(context, remoteObject, context._world.frame());
    }
    return new JSHandle_js_1.CDPJSHandle(context, remoteObject);
}
exports.createJSHandle = createJSHandle;
/**
 * @internal
 */
function evaluationString(fun, ...args) {
    if ((0, exports.isString)(fun)) {
        (0, assert_js_1.assert)(args.length === 0, 'Cannot evaluate a string with arguments');
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
exports.evaluationString = evaluationString;
/**
 * @internal
 */
function addPageBinding(type, name) {
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
exports.addPageBinding = addPageBinding;
/**
 * @internal
 */
function pageBindingInitString(type, name) {
    return evaluationString(addPageBinding, type, name);
}
exports.pageBindingInitString = pageBindingInitString;
/**
 * @internal
 */
async function waitWithTimeout(promise, taskName, timeout) {
    let reject;
    const timeoutError = new Errors_js_1.TimeoutError(`waiting for ${taskName} failed: timeout ${timeout}ms exceeded`);
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
exports.waitWithTimeout = waitWithTimeout;
/**
 * @internal
 */
let fs = null;
/**
 * @internal
 */
async function importFSPromises() {
    if (!fs) {
        try {
            fs = await Promise.resolve().then(() => __importStar(require('fs/promises')));
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
exports.importFSPromises = importFSPromises;
/**
 * @internal
 */
async function getReadableAsBuffer(readable, path) {
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
exports.getReadableAsBuffer = getReadableAsBuffer;
/**
 * @internal
 */
async function getReadableFromProtocolStream(client, handle) {
    // TODO: Once Node 18 becomes the lowest supported version, we can migrate to
    // ReadableStream.
    if (!environment_js_1.isNode) {
        throw new Error('Cannot create a stream outside of Node.js environment.');
    }
    const { Readable } = await Promise.resolve().then(() => __importStar(require('stream')));
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
exports.getReadableFromProtocolStream = getReadableFromProtocolStream;
/**
 * @internal
 */
async function setPageContent(page, content) {
    // We rely upon the fact that document.open() will reset frame lifecycle with "init"
    // lifecycle event. @see https://crrev.com/608658
    return page.evaluate(html => {
        document.open();
        document.write(html);
        document.close();
    }, content);
}
exports.setPageContent = setPageContent;
//# sourceMappingURL=util.js.map