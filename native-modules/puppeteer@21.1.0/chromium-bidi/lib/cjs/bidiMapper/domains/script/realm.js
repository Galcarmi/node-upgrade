"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Realm = void 0;
const protocol_js_1 = require("../../../protocol/protocol.js");
const log_js_1 = require("../../../utils/log.js");
const channelProxy_js_1 = require("./channelProxy.js");
const SHARED_ID_DIVIDER = '_element_';
class Realm {
    #realmStorage;
    #browsingContextStorage;
    #realmId;
    #browsingContextId;
    #executionContextId;
    #origin;
    #type;
    #cdpClient;
    #eventManager;
    sandbox;
    #logger;
    constructor(realmStorage, browsingContextStorage, realmId, browsingContextId, executionContextId, origin, type, sandbox, cdpClient, eventManager, logger) {
        this.#realmId = realmId;
        this.#browsingContextId = browsingContextId;
        this.#executionContextId = executionContextId;
        this.sandbox = sandbox;
        this.#origin = origin;
        this.#type = type;
        this.#cdpClient = cdpClient;
        this.#realmStorage = realmStorage;
        this.#browsingContextStorage = browsingContextStorage;
        this.#eventManager = eventManager;
        this.#logger = logger;
        this.#realmStorage.addRealm(this);
        this.#eventManager.registerEvent({
            type: 'event',
            method: protocol_js_1.ChromiumBidi.Script.EventNames.RealmCreated,
            params: this.realmInfo,
        }, this.browsingContextId);
    }
    cdpToBidiValue(cdpValue, resultOwnership) {
        const bidiValue = this.#deepSerializedToBiDi(cdpValue.result.deepSerializedValue);
        if (cdpValue.result.objectId) {
            const objectId = cdpValue.result.objectId;
            if (resultOwnership === "root" /* Script.ResultOwnership.Root */) {
                // Extend BiDi value with `handle` based on required `resultOwnership`
                // and  CDP response but not on the actual BiDi type.
                bidiValue.handle = objectId;
                // Remember all the handles sent to client.
                this.#realmStorage.knownHandlesToRealmMap.set(objectId, this.realmId);
            }
            else {
                // No need to await for the object to be released.
                void this.#releaseObject(objectId).catch((error) => this.#logger?.(log_js_1.LogType.system, error));
            }
        }
        if (cdpValue.result.type === 'object') {
            switch (cdpValue.result.subtype) {
                case 'generator':
                case 'iterator':
                    bidiValue.type = cdpValue.result.subtype;
                    delete bidiValue['value'];
                    break;
                default:
                // Intentionally left blank.
            }
        }
        return bidiValue;
    }
    /**
     * Relies on the CDP to implement proper BiDi serialization, except
     * backendNodeId/sharedId and `platformobject`.
     */
    #deepSerializedToBiDi(deepSerializedValue) {
        if (Object.hasOwn(deepSerializedValue, 'weakLocalObjectReference')) {
            deepSerializedValue.internalId = `${deepSerializedValue.weakLocalObjectReference}`;
            delete deepSerializedValue['weakLocalObjectReference'];
        }
        // Platform object is a special case. It should have only `{type: object}`
        // without `value` field.
        if (deepSerializedValue.type === 'platformobject') {
            return { type: 'object' };
        }
        const bidiValue = deepSerializedValue.value;
        if (bidiValue === undefined) {
            return deepSerializedValue;
        }
        if (deepSerializedValue.type === 'node') {
            if (Object.hasOwn(bidiValue, 'backendNodeId')) {
                deepSerializedValue.sharedId = `${this.navigableId}${SHARED_ID_DIVIDER}${bidiValue.backendNodeId}`;
                delete bidiValue['backendNodeId'];
            }
            if (Object.hasOwn(bidiValue, 'children')) {
                for (const i in bidiValue.children) {
                    bidiValue.children[i] = this.#deepSerializedToBiDi(bidiValue.children[i]);
                }
            }
            if (Object.hasOwn(bidiValue, 'shadowRoot') &&
                bidiValue.shadowRoot !== null) {
                bidiValue.shadowRoot = this.#deepSerializedToBiDi(bidiValue.shadowRoot);
            }
        }
        // Recursively update the nested values.
        if (['array', 'set', 'htmlcollection', 'nodelist'].includes(deepSerializedValue.type)) {
            for (const i in bidiValue) {
                bidiValue[i] = this.#deepSerializedToBiDi(bidiValue[i]);
            }
        }
        if (['object', 'map'].includes(deepSerializedValue.type)) {
            for (const i in bidiValue) {
                bidiValue[i] = [
                    this.#deepSerializedToBiDi(bidiValue[i][0]),
                    this.#deepSerializedToBiDi(bidiValue[i][1]),
                ];
            }
        }
        return deepSerializedValue;
    }
    get realmId() {
        return this.#realmId;
    }
    get navigableId() {
        return (this.#browsingContextStorage.findContext(this.#browsingContextId)
            ?.navigableId ?? 'UNKNOWN');
    }
    get browsingContextId() {
        return this.#browsingContextId;
    }
    get executionContextId() {
        return this.#executionContextId;
    }
    get origin() {
        return this.#origin;
    }
    get type() {
        return this.#type;
    }
    get cdpClient() {
        return this.#cdpClient;
    }
    get realmInfo() {
        return {
            realm: this.realmId,
            origin: this.origin,
            type: this.type,
            context: this.browsingContextId,
            ...(this.sandbox === undefined ? {} : { sandbox: this.sandbox }),
        };
    }
    async evaluate(expression, awaitPromise, resultOwnership, serializationOptions, userActivation = false) {
        await this.#browsingContextStorage
            .getContext(this.browsingContextId)
            .targetUnblocked();
        const cdpEvaluateResult = await this.cdpClient.sendCommand('Runtime.evaluate', {
            contextId: this.executionContextId,
            expression,
            awaitPromise,
            serializationOptions: Realm.#getSerializationOptions("deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */, serializationOptions),
            userGesture: userActivation,
        });
        if (cdpEvaluateResult.exceptionDetails) {
            return this.#getExceptionResult(cdpEvaluateResult.exceptionDetails, 0, resultOwnership);
        }
        return {
            realm: this.realmId,
            result: this.cdpToBidiValue(cdpEvaluateResult, resultOwnership),
            type: 'success',
        };
    }
    /**
     * Serializes a given CDP object into BiDi, keeping references in the
     * target's `globalThis`.
     */
    async serializeCdpObject(cdpRemoteObject, resultOwnership) {
        const argument = Realm.#cdpRemoteObjectToCallArgument(cdpRemoteObject);
        const cdpValue = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((remoteObject) => remoteObject),
            awaitPromise: false,
            arguments: [argument],
            serializationOptions: {
                serialization: "deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */,
            },
            executionContextId: this.executionContextId,
        });
        return this.cdpToBidiValue(cdpValue, resultOwnership);
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
    /**
     * Gets the string representation of an object. This is equivalent to
     * calling `toString()` on the object value.
     */
    async stringifyObject(cdpRemoteObject) {
        const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
            functionDeclaration: String((remoteObject) => String(remoteObject)),
            awaitPromise: false,
            arguments: [cdpRemoteObject],
            returnByValue: true,
            executionContextId: this.executionContextId,
        });
        return result.value;
    }
    async #flattenKeyValuePairs(mappingLocalValue) {
        const keyValueArray = [];
        for (const [key, value] of mappingLocalValue) {
            let keyArg;
            if (typeof key === 'string') {
                // Key is a string.
                keyArg = { value: key };
            }
            else {
                // Key is a serialized value.
                keyArg = await this.#deserializeToCdpArg(key);
            }
            const valueArg = await this.#deserializeToCdpArg(value);
            keyValueArray.push(keyArg);
            keyValueArray.push(valueArg);
        }
        return keyValueArray;
    }
    async #flattenValueList(listLocalValue) {
        return Promise.all(listLocalValue.map((localValue) => this.#deserializeToCdpArg(localValue)));
    }
    async #serializeCdpExceptionDetails(cdpExceptionDetails, lineOffset, resultOwnership) {
        const callFrames = cdpExceptionDetails.stackTrace?.callFrames.map((frame) => ({
            url: frame.url,
            functionName: frame.functionName,
            lineNumber: frame.lineNumber - lineOffset,
            columnNumber: frame.columnNumber,
        })) ?? [];
        // Exception should always be there.
        const exception = cdpExceptionDetails.exception;
        return {
            exception: await this.serializeCdpObject(exception, resultOwnership),
            columnNumber: cdpExceptionDetails.columnNumber,
            lineNumber: cdpExceptionDetails.lineNumber - lineOffset,
            stackTrace: {
                callFrames,
            },
            text: (await this.stringifyObject(exception)) || cdpExceptionDetails.text,
        };
    }
    async callFunction(functionDeclaration, thisLocalValue, argumentsLocalValues, awaitPromise, resultOwnership, serializationOptions, userActivation = false) {
        await this.#browsingContextStorage
            .getContext(this.browsingContextId)
            .targetUnblocked();
        const callFunctionAndSerializeScript = `(...args) => {
      function callFunction(f, args) {
        const deserializedThis = args.shift();
        const deserializedArgs = args;
        return f.apply(deserializedThis, deserializedArgs);
      }
      return callFunction((
        ${functionDeclaration}
      ), args);
    }`;
        const thisAndArgumentsList = [
            await this.#deserializeToCdpArg(thisLocalValue),
            ...(await Promise.all(argumentsLocalValues.map(async (argumentLocalValue) => this.#deserializeToCdpArg(argumentLocalValue)))),
        ];
        let cdpCallFunctionResult;
        try {
            cdpCallFunctionResult = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                functionDeclaration: callFunctionAndSerializeScript,
                awaitPromise,
                arguments: thisAndArgumentsList,
                serializationOptions: Realm.#getSerializationOptions("deep" /* Protocol.Runtime.SerializationOptionsSerialization.Deep */, serializationOptions),
                executionContextId: this.executionContextId,
                userGesture: userActivation,
            });
        }
        catch (error) {
            // Heuristic to determine if the problem is in the argument.
            // The check can be done on the `deserialization` step, but this approach
            // helps to save round-trips.
            if (error.code === -32000 &&
                [
                    'Could not find object with given id',
                    'Argument should belong to the same JavaScript world as target object',
                    'Invalid remote object id',
                ].includes(error.message)) {
                throw new protocol_js_1.NoSuchHandleException('Handle was not found.');
            }
            throw error;
        }
        if (cdpCallFunctionResult.exceptionDetails) {
            return this.#getExceptionResult(cdpCallFunctionResult.exceptionDetails, 1, resultOwnership);
        }
        return {
            type: 'success',
            result: this.cdpToBidiValue(cdpCallFunctionResult, resultOwnership),
            realm: this.realmId,
        };
    }
    async #deserializeToCdpArg(localValue) {
        if ('sharedId' in localValue && localValue.sharedId) {
            const [navigableId, rawBackendNodeId] = localValue.sharedId.split(SHARED_ID_DIVIDER);
            const backendNodeId = parseInt(rawBackendNodeId ?? '');
            if (isNaN(backendNodeId) ||
                backendNodeId === undefined ||
                navigableId === undefined) {
                throw new protocol_js_1.NoSuchNodeException(`SharedId "${localValue.sharedId}" was not found.`);
            }
            if (this.navigableId !== navigableId) {
                throw new protocol_js_1.NoSuchNodeException(`SharedId "${localValue.sharedId}" belongs to different document. Current document is ${this.navigableId}.`);
            }
            try {
                const { object } = await this.cdpClient.sendCommand('DOM.resolveNode', {
                    backendNodeId,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `obj.object.objectId` after using.
                return { objectId: object.objectId };
            }
            catch (error) {
                // Heuristic to detect "no such node" exception. Based on the  specific
                // CDP implementation.
                if (error.code === -32000 &&
                    error.message === 'No node with given id found') {
                    throw new protocol_js_1.NoSuchNodeException(`SharedId "${localValue.sharedId}" was not found.`);
                }
                throw new protocol_js_1.UnknownErrorException(error.message, error.stack);
            }
        }
        else if ('handle' in localValue && localValue.handle) {
            return { objectId: localValue.handle };
            // We tried to find a handle value but failed
            // This allows us to have exhaustive switch on `localValue.type`
        }
        else if ('handle' in localValue || 'sharedId' in localValue) {
            throw new protocol_js_1.NoSuchHandleException('Handle was not found.');
        }
        switch (localValue.type) {
            case 'undefined':
                return { unserializableValue: 'undefined' };
            case 'null':
                return { unserializableValue: 'null' };
            case 'string':
                return { value: localValue.value };
            case 'number':
                if (localValue.value === 'NaN') {
                    return { unserializableValue: 'NaN' };
                }
                else if (localValue.value === '-0') {
                    return { unserializableValue: '-0' };
                }
                else if (localValue.value === 'Infinity') {
                    return { unserializableValue: 'Infinity' };
                }
                else if (localValue.value === '-Infinity') {
                    return { unserializableValue: '-Infinity' };
                }
                return {
                    value: localValue.value,
                };
            case 'boolean':
                return { value: Boolean(localValue.value) };
            case 'bigint':
                return {
                    unserializableValue: `BigInt(${JSON.stringify(localValue.value)})`,
                };
            case 'date':
                return {
                    unserializableValue: `new Date(Date.parse(${JSON.stringify(localValue.value)}))`,
                };
            case 'regexp':
                return {
                    unserializableValue: `new RegExp(${JSON.stringify(localValue.value.pattern)}, ${JSON.stringify(localValue.value.flags)})`,
                };
            case 'map': {
                // TODO: If none of the nested keys and values has a remote
                // reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = await this.#flattenKeyValuePairs(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
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
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'object': {
                // TODO: If none of the nested keys and values has a remote
                // reference, serialize to `unserializableValue` without CDP roundtrip.
                const keyValueArray = await this.#flattenKeyValuePairs(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
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
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'array': {
                // TODO: If none of the nested items has a remote reference,
                // serialize to `unserializableValue` without CDP roundtrip.
                const args = await this.#flattenValueList(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => args),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'set': {
                // TODO: if none of the nested items has a remote reference,
                // serialize to `unserializableValue` without CDP roundtrip.
                const args = await this.#flattenValueList(localValue.value);
                const { result } = await this.cdpClient.sendCommand('Runtime.callFunctionOn', {
                    functionDeclaration: String((...args) => new Set(args)),
                    awaitPromise: false,
                    arguments: args,
                    returnByValue: false,
                    executionContextId: this.executionContextId,
                });
                // TODO(#375): Release `result.objectId` after using.
                return { objectId: result.objectId };
            }
            case 'channel': {
                const channelProxy = new channelProxy_js_1.ChannelProxy(localValue.value);
                const channelProxySendMessageHandle = await channelProxy.init(this, this.#eventManager);
                return { objectId: channelProxySendMessageHandle };
            }
            // TODO(#375): Dispose of nested objects.
        }
        // Intentionally outside to handle unknown types
        throw new Error(`Value ${JSON.stringify(localValue)} is not deserializable.`);
    }
    async #getExceptionResult(exceptionDetails, lineOffset, resultOwnership) {
        return {
            exceptionDetails: await this.#serializeCdpExceptionDetails(exceptionDetails, lineOffset, resultOwnership),
            realm: this.realmId,
            type: 'exception',
        };
    }
    static #getSerializationOptions(serialization, serializationOptions) {
        return {
            serialization,
            additionalParameters: Realm.#getAdditionalSerializationParameters(serializationOptions),
            ...Realm.#getMaxObjectDepth(serializationOptions),
        };
    }
    static #getAdditionalSerializationParameters(serializationOptions) {
        const additionalParameters = {};
        if (serializationOptions.maxDomDepth !== undefined) {
            additionalParameters['maxNodeDepth'] =
                serializationOptions.maxDomDepth === null
                    ? 1000
                    : serializationOptions.maxDomDepth;
        }
        if (serializationOptions.includeShadowTree !== undefined) {
            additionalParameters['includeShadowTree'] =
                serializationOptions.includeShadowTree;
        }
        return additionalParameters;
    }
    static #getMaxObjectDepth(serializationOptions) {
        return serializationOptions.maxObjectDepth === undefined ||
            serializationOptions.maxObjectDepth === null
            ? {}
            : { maxDepth: serializationOptions.maxObjectDepth };
    }
    async #releaseObject(handle) {
        try {
            await this.cdpClient.sendCommand('Runtime.releaseObject', {
                objectId: handle,
            });
        }
        catch (error) {
            // Heuristic to determine if the problem is in the unknown handler.
            // Ignore the error if so.
            if (!(error.code === -32000 &&
                error.message === 'Invalid remote object id')) {
                throw error;
            }
        }
    }
    async disown(handle) {
        // Disowning an object from different realm does nothing.
        if (this.#realmStorage.knownHandlesToRealmMap.get(handle) !== this.realmId) {
            return;
        }
        await this.#releaseObject(handle);
        this.#realmStorage.knownHandlesToRealmMap.delete(handle);
    }
    dispose() {
        this.#eventManager.registerEvent({
            type: 'event',
            method: protocol_js_1.ChromiumBidi.Script.EventNames.RealmDestroyed,
            params: {
                realm: this.realmId,
            },
        }, this.browsingContextId);
    }
}
exports.Realm = Realm;
//# sourceMappingURL=realm.js.map