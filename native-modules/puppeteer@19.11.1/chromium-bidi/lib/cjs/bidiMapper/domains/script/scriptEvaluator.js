"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScriptEvaluator = exports.SHARED_ID_DIVIDER = void 0;
const protocol_js_1 = require("../../../protocol/protocol.js");
// As `script.evaluate` wraps call into serialization script, `lineNumber`
// should be adjusted.
const CALL_FUNCTION_STACKTRACE_LINE_OFFSET = 1;
const EVALUATE_STACKTRACE_LINE_OFFSET = 0;
exports.SHARED_ID_DIVIDER = '_element_';
class ScriptEvaluator {
    #eventManager;
    constructor(eventManager) {
        this.#eventManager = eventManager;
    }
    /**
     * Gets the string representation of an object. This is equivalent to
     * calling toString() on the object value.
     * @param cdpObject CDP remote object representing an object.
     * @param realm
     * @return string The stringified object.
     */
    static async stringifyObject(cdpObject, realm) {
        const stringifyResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((obj) => {
                return String(obj);
            }),
            awaitPromise: false,
            arguments: [cdpObject],
            returnByValue: true,
            executionContextId: realm.executionContextId,
        });
        return stringifyResult.result.value;
    }
    /**
     * Serializes a given CDP object into BiDi, keeping references in the
     * target's `globalThis`.
     * @param cdpRemoteObject CDP remote object to be serialized.
     * @param resultOwnership Indicates desired ResultOwnership.
     * @param realm
     */
    async serializeCdpObject(cdpRemoteObject, resultOwnership, realm) {
        const arg = ScriptEvaluator.#cdpRemoteObjectToCallArgument(cdpRemoteObject);
        const cdpWebDriverValue = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((obj) => obj),
            awaitPromise: false,
            arguments: [arg],
            generateWebDriverValue: true,
            executionContextId: realm.executionContextId,
        });
        return realm.cdpToBidiValue(cdpWebDriverValue, resultOwnership);
    }
    async scriptEvaluate(realm, expression, awaitPromise, resultOwnership) {
        const cdpEvaluateResult = await realm.cdpClient.sendCommand('Runtime.evaluate', {
            contextId: realm.executionContextId,
            expression,
            awaitPromise,
            generateWebDriverValue: true,
        });
        if (cdpEvaluateResult.exceptionDetails) {
            // Serialize exception details.
            return {
                exceptionDetails: await this.#serializeCdpExceptionDetails(cdpEvaluateResult.exceptionDetails, EVALUATE_STACKTRACE_LINE_OFFSET, resultOwnership, realm),
                type: 'exception',
                realm: realm.realmId,
            };
        }
        return {
            type: 'success',
            result: realm.cdpToBidiValue(cdpEvaluateResult, resultOwnership),
            realm: realm.realmId,
        };
    }
    async callFunction(realm, functionDeclaration, _this, _arguments, awaitPromise, resultOwnership) {
        const callFunctionAndSerializeScript = `(...args)=>{ return _callFunction((\n${functionDeclaration}\n), args);
      function _callFunction(f, args) {
        const deserializedThis = args.shift();
        const deserializedArgs = args;
        return f.apply(deserializedThis, deserializedArgs);
      }}`;
        const thisAndArgumentsList = [
            await this.#deserializeToCdpArg(_this, realm),
        ];
        thisAndArgumentsList.push(...(await Promise.all(_arguments.map(async (a) => {
            return this.#deserializeToCdpArg(a, realm);
        }))));
        let cdpCallFunctionResult;
        try {
            cdpCallFunctionResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                functionDeclaration: callFunctionAndSerializeScript,
                awaitPromise,
                arguments: thisAndArgumentsList,
                generateWebDriverValue: true,
                executionContextId: realm.executionContextId,
            });
        }
        catch (e) {
            // Heuristic to determine if the problem is in the argument.
            // The check can be done on the `deserialization` step, but this approach
            // helps to save round-trips.
            if (e.code === -32000 &&
                [
                    'Could not find object with given id',
                    'Argument should belong to the same JavaScript world as target object',
                    'Invalid remote object id',
                ].includes(e.message)) {
                throw new protocol_js_1.Message.NoSuchHandleException('Handle was not found.');
            }
            throw e;
        }
        if (cdpCallFunctionResult.exceptionDetails) {
            // Serialize exception details.
            return {
                exceptionDetails: await this.#serializeCdpExceptionDetails(cdpCallFunctionResult.exceptionDetails, CALL_FUNCTION_STACKTRACE_LINE_OFFSET, resultOwnership, realm),
                type: 'exception',
                realm: realm.realmId,
            };
        }
        return {
            type: 'success',
            result: realm.cdpToBidiValue(cdpCallFunctionResult, resultOwnership),
            realm: realm.realmId,
        };
    }
    static #cdpRemoteObjectToCallArgument(cdpRemoteObject) {
        if (cdpRemoteObject.objectId !== undefined) {
            return { objectId: cdpRemoteObject.objectId };
        }
        if (cdpRemoteObject.unserializableValue !== undefined) {
            return { unserializableValue: cdpRemoteObject.unserializableValue };
        }
        return { value: cdpRemoteObject.value };
    }
    async #deserializeToCdpArg(argumentValue, realm) {
        if ('sharedId' in argumentValue) {
            const [navigableId, rawBackendNodeId] = argumentValue.sharedId.split(exports.SHARED_ID_DIVIDER);
            const backendNodeId = parseInt(rawBackendNodeId ?? '');
            if (isNaN(backendNodeId) ||
                backendNodeId === undefined ||
                navigableId === undefined) {
                throw new protocol_js_1.Message.InvalidArgumentException(`SharedId "${argumentValue.sharedId}" should have format "{navigableId}${exports.SHARED_ID_DIVIDER}{backendNodeId}".`);
            }
            if (realm.navigableId !== navigableId) {
                throw new protocol_js_1.Message.NoSuchNodeException(`SharedId "${argumentValue.sharedId}" belongs to different document. Current document is ${realm.navigableId}.`);
            }
            try {
                const obj = await realm.cdpClient.sendCommand('DOM.resolveNode', {
                    backendNodeId,
                    executionContextId: realm.executionContextId,
                });
                // TODO(#375): Release `obj.object.objectId` after using.
                return { objectId: obj.object.objectId };
            }
            catch (e) {
                // Heuristic to detect "no such node" exception. Based on the  specific
                // CDP implementation.
                if (e.code === -32000 && e.message === 'No node with given id found') {
                    throw new protocol_js_1.Message.NoSuchNodeException(`SharedId "${argumentValue.sharedId}" was not found.`);
                }
                throw e;
            }
        }
        if ('handle' in argumentValue) {
            return { objectId: argumentValue.handle };
        }
        switch (argumentValue.type) {
            // Primitive Protocol Value
            // https://w3c.github.io/webdriver-bidi/#data-types-protocolValue-primitiveProtocolValue
            case 'undefined':
                return { unserializableValue: 'undefined' };
            case 'null':
                return { unserializableValue: 'null' };
            case 'string':
                return { value: argumentValue.value };
            case 'number':
                if (argumentValue.value === 'NaN') {
                    return { unserializableValue: 'NaN' };
                }
                else if (argumentValue.value === '-0') {
                    return { unserializableValue: '-0' };
                }
                else if (argumentValue.value === 'Infinity') {
                    return { unserializableValue: 'Infinity' };
                }
                else if (argumentValue.value === '-Infinity') {
                    return { unserializableValue: '-Infinity' };
                }
                return {
                    value: argumentValue.value,
                };
            case 'boolean':
                return { value: Boolean(argumentValue.value) };
            case 'bigint':
                return {
                    unserializableValue: `BigInt(${JSON.stringify(argumentValue.value)})`,
                };
            case 'date':
                return {
                    unserializableValue: `new Date(Date.parse(${JSON.stringify(argumentValue.value)}))`,
                };
            case 'regexp':
                return {
                    unserializableValue: `new RegExp(${JSON.stringify(argumentValue.value.pattern)}, ${JSON.stringify(argumentValue.value.flags)})`,
                };
            case 'map': {
                // TODO(sadym): If none of the nested keys and values has a remote
                // reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = await this.#flattenKeyValuePairs(argumentValue.value, realm);
                const argEvalResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => {
                        const result = new Map();
                        for (let i = 0; i < args.length; i += 2) {
                            result.set(args[i], args[i + 1]);
                        }
                        return result;
                    }),
                    awaitPromise: false,
                    arguments: keyValueArray,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(#375): Release `argEvalResult.result.objectId` after using.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'object': {
                // TODO(sadym): If none of the nested keys and values has a remote
                //  reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = await this.#flattenKeyValuePairs(argumentValue.value, realm);
                const argEvalResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => {
                        const result = {};
                        for (let i = 0; i < args.length; i += 2) {
                            // Key should be either `string`, `number`, or `symbol`.
                            const key = args[i];
                            result[key] = args[i + 1];
                        }
                        return result;
                    }),
                    awaitPromise: false,
                    arguments: keyValueArray,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(#375): Release `argEvalResult.result.objectId` after using.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'array': {
                // TODO(sadym): If none of the nested items has a remote reference,
                // serialize to `unserializableValue` without CDP roundtrip.
                const args = await this.#flattenValueList(argumentValue.value, realm);
                const argEvalResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => {
                        return args;
                    }),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(#375): Release `argEvalResult.result.objectId` after using.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'set': {
                // TODO(sadym): if none of the nested items has a remote reference,
                // serialize to `unserializableValue` without CDP roundtrip.
                const args = await this.#flattenValueList(argumentValue.value, realm);
                const argEvalResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => {
                        return new Set(args);
                    }),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                });
                // TODO(#375): Release `argEvalResult.result.objectId` after using.
                return { objectId: argEvalResult.result.objectId };
            }
            case 'channel': {
                const createChannelHandleResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String(() => {
                        const queue = [];
                        let queueNonEmptyResolver = null;
                        return {
                            /**
                             * Gets a promise, which is resolved as soon as a message occurs
                             * in the queue.
                             */
                            async getMessage() {
                                const onMessage = queue.length > 0
                                    ? Promise.resolve()
                                    : new Promise((resolve) => {
                                        queueNonEmptyResolver = resolve;
                                    });
                                await onMessage;
                                return queue.shift();
                            },
                            /**
                             * Adds a message to the queue.
                             * Resolves the pending promise if needed.
                             */
                            sendMessage(message) {
                                queue.push(message);
                                if (queueNonEmptyResolver !== null) {
                                    queueNonEmptyResolver();
                                    queueNonEmptyResolver = null;
                                }
                            },
                        };
                    }),
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                    generateWebDriverValue: false,
                });
                const channelHandle = createChannelHandleResult.result.objectId;
                // Long-poll the message queue asynchronously.
                void this.#initChannelListener(argumentValue, channelHandle, realm);
                const sendMessageArgResult = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((channelHandle) => {
                        return channelHandle.sendMessage;
                    }),
                    arguments: [
                        {
                            objectId: channelHandle,
                        },
                    ],
                    returnByValue: false,
                    executionContextId: realm.executionContextId,
                    generateWebDriverValue: false,
                });
                return { objectId: sendMessageArgResult.result.objectId };
            }
            // TODO(#375): Dispose of nested objects.
            default:
                throw new Error(`Value ${JSON.stringify(argumentValue)} is not deserializable.`);
        }
    }
    async #flattenKeyValuePairs(mapping, realm) {
        const keyValueArray = [];
        for (const [key, value] of mapping) {
            let keyArg;
            if (typeof key === 'string') {
                // Key is a string.
                keyArg = { value: key };
            }
            else {
                // Key is a serialized value.
                keyArg = await this.#deserializeToCdpArg(key, realm);
            }
            const valueArg = await this.#deserializeToCdpArg(value, realm);
            keyValueArray.push(keyArg);
            keyValueArray.push(valueArg);
        }
        return keyValueArray;
    }
    async #flattenValueList(list, realm) {
        return Promise.all(list.map((value) => this.#deserializeToCdpArg(value, realm)));
    }
    async #initChannelListener(channel, channelHandle, realm) {
        const channelId = channel.value.channel;
        // TODO(#294): Remove this loop after the realm is destroyed.
        // Rely on the CDP throwing exception in such a case.
        for (;;) {
            const message = await realm.cdpClient.sendCommand('Runtime.callFunctionOn', {
                functionDeclaration: String(async (channelHandle) => channelHandle.getMessage()),
                arguments: [
                    {
                        objectId: channelHandle,
                    },
                ],
                awaitPromise: true,
                executionContextId: realm.executionContextId,
                generateWebDriverValue: true,
            });
            this.#eventManager.registerEvent({
                method: protocol_js_1.Script.EventNames.MessageEvent,
                params: {
                    channel: channelId,
                    data: realm.cdpToBidiValue(message, channel.value.ownership ?? 'none'),
                    source: {
                        realm: realm.realmId,
                        context: realm.browsingContextId,
                    },
                },
            }, realm.browsingContextId);
        }
    }
    async #serializeCdpExceptionDetails(cdpExceptionDetails, lineOffset, resultOwnership, realm) {
        const callFrames = cdpExceptionDetails.stackTrace?.callFrames.map((frame) => ({
            url: frame.url,
            functionName: frame.functionName,
            // As `script.evaluate` wraps call into serialization script, so
            // `lineNumber` should be adjusted.
            lineNumber: frame.lineNumber - lineOffset,
            columnNumber: frame.columnNumber,
        }));
        const exception = await this.serializeCdpObject(
        // Exception should always be there.
        cdpExceptionDetails.exception, resultOwnership, realm);
        const text = await ScriptEvaluator.stringifyObject(cdpExceptionDetails.exception, realm);
        return {
            exception,
            columnNumber: cdpExceptionDetails.columnNumber,
            // As `script.evaluate` wraps call into serialization script, so
            // `lineNumber` should be adjusted.
            lineNumber: cdpExceptionDetails.lineNumber - lineOffset,
            stackTrace: {
                callFrames: callFrames || [],
            },
            text: text || cdpExceptionDetails.text,
        };
    }
}
exports.ScriptEvaluator = ScriptEvaluator;
//# sourceMappingURL=scriptEvaluator.js.map