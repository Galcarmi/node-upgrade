"use strict";
/**
 * Copyright 2022 Google LLC.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.CDP = exports.BrowsingContext = exports.Script = exports.CommonDataTypes = exports.parseObject = void 0;
/**
 * @fileoverview Provides parsing and validator for WebDriver BiDi protocol.
 * Parser types should match the `../protocol` types.
 */
const zod_1 = require("zod");
const protocol_js_1 = require("../protocol/protocol.js");
const MAX_INT = 9007199254740991;
function parseObject(obj, schema) {
    const parseResult = schema.safeParse(obj);
    if (parseResult.success) {
        return parseResult.data;
    }
    const errorMessage = parseResult.error.errors
        .map((e) => `${e.message} in ` +
        `${e.path.map((p) => JSON.stringify(p)).join('/')}.`)
        .join(' ');
    throw new protocol_js_1.Message.InvalidArgumentException(errorMessage);
}
exports.parseObject = parseObject;
var CommonDataTypes;
(function (CommonDataTypes) {
    CommonDataTypes.SharedReferenceSchema = zod_1.z.object({
        sharedId: zod_1.z.string().min(1),
    });
    CommonDataTypes.RemoteReferenceSchema = zod_1.z.object({
        handle: zod_1.z.string().min(1),
    });
    // UndefinedValue = {
    //   type: "undefined",
    // }
    const UndefinedValueSchema = zod_1.z.object({ type: zod_1.z.literal('undefined') });
    // NullValue = {
    //   type: "null",
    // }
    const NullValueSchema = zod_1.z.object({ type: zod_1.z.literal('null') });
    // StringValue = {
    //   type: "string",
    //   value: text,
    // }
    const StringValueSchema = zod_1.z.object({
        type: zod_1.z.literal('string'),
        value: zod_1.z.string(),
    });
    // SpecialNumber = "NaN" / "-0" / "Infinity" / "-Infinity";
    const SpecialNumberSchema = zod_1.z.enum(['NaN', '-0', 'Infinity', '-Infinity']);
    // NumberValue = {
    //   type: "number",
    //   value: number / SpecialNumber,
    // }
    const NumberValueSchema = zod_1.z.object({
        type: zod_1.z.literal('number'),
        value: zod_1.z.union([SpecialNumberSchema, zod_1.z.number()]),
    });
    // BooleanValue = {
    //   type: "boolean",
    //   value: bool,
    // }
    const BooleanValueSchema = zod_1.z.object({
        type: zod_1.z.literal('boolean'),
        value: zod_1.z.boolean(),
    });
    // BigIntValue = {
    //   type: "bigint",
    //   value: text,
    // }
    const BigIntValueSchema = zod_1.z.object({
        type: zod_1.z.literal('bigint'),
        value: zod_1.z.string(),
    });
    const PrimitiveProtocolValueSchema = zod_1.z.union([
        UndefinedValueSchema,
        NullValueSchema,
        StringValueSchema,
        NumberValueSchema,
        BooleanValueSchema,
        BigIntValueSchema,
    ]);
    CommonDataTypes.LocalValueSchema = zod_1.z.lazy(() => zod_1.z.union([
        PrimitiveProtocolValueSchema,
        ArrayLocalValueSchema,
        DateLocalValueSchema,
        MapLocalValueSchema,
        ObjectLocalValueSchema,
        RegExpLocalValueSchema,
        SetLocalValueSchema,
    ]));
    // Order is important, as `parse` is processed in the same order.
    // `SharedReferenceSchema`->`RemoteReferenceSchema`->`LocalValueSchema`.
    const LocalOrRemoteValueSchema = zod_1.z.union([
        CommonDataTypes.SharedReferenceSchema,
        CommonDataTypes.RemoteReferenceSchema,
        CommonDataTypes.LocalValueSchema,
    ]);
    // ListLocalValue = [*LocalValue];
    const ListLocalValueSchema = zod_1.z.array(LocalOrRemoteValueSchema);
    // ArrayLocalValue = {
    //   type: "array",
    //   value: ListLocalValue,
    // }
    const ArrayLocalValueSchema = zod_1.z.lazy(() => zod_1.z.object({
        type: zod_1.z.literal('array'),
        value: ListLocalValueSchema,
    }));
    // DateLocalValue = {
    //   type: "date",
    //   value: text
    // }
    const DateLocalValueSchema = zod_1.z.object({
        type: zod_1.z.literal('date'),
        value: zod_1.z.string().min(1),
    });
    // MappingLocalValue = [*[(LocalValue / text), LocalValue]];
    const MappingLocalValueSchema = zod_1.z.lazy(() => zod_1.z.tuple([
        zod_1.z.union([zod_1.z.string(), LocalOrRemoteValueSchema]),
        LocalOrRemoteValueSchema,
    ]));
    // MapLocalValue = {
    //   type: "map",
    //   value: MappingLocalValue,
    // }
    const MapLocalValueSchema = zod_1.z.object({
        type: zod_1.z.literal('map'),
        value: zod_1.z.array(MappingLocalValueSchema),
    });
    // ObjectLocalValue = {
    //   type: "object",
    //   value: MappingLocalValue,
    // }
    const ObjectLocalValueSchema = zod_1.z.object({
        type: zod_1.z.literal('object'),
        value: zod_1.z.array(MappingLocalValueSchema),
    });
    // RegExpLocalValue = {
    //   type: "regexp",
    //   value: RegExpValue,
    // }
    const RegExpLocalValueSchema = zod_1.z.lazy(() => zod_1.z.object({
        type: zod_1.z.literal('regexp'),
        value: zod_1.z.object({
            pattern: zod_1.z.string(),
            flags: zod_1.z.string().optional(),
        }),
    }));
    // SetLocalValue = {
    //   type: "set",
    //   value: ListLocalValue,
    // }
    const SetLocalValueSchema = zod_1.z.lazy(() => zod_1.z.object({
        type: zod_1.z.literal('set'),
        value: ListLocalValueSchema,
    }));
    // BrowsingContext = text;
    CommonDataTypes.BrowsingContextSchema = zod_1.z.string();
    CommonDataTypes.MaxDepthSchema = zod_1.z.number().int().nonnegative().max(MAX_INT);
})(CommonDataTypes = exports.CommonDataTypes || (exports.CommonDataTypes = {}));
/** @see https://w3c.github.io/webdriver-bidi/#module-script */
var Script;
(function (Script) {
    const RealmTypeSchema = zod_1.z.enum([
        'window',
        'dedicated-worker',
        'shared-worker',
        'service-worker',
        'worker',
        'paint-worklet',
        'audio-worklet',
        'worklet',
    ]);
    Script.GetRealmsParametersSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema.optional(),
        type: RealmTypeSchema.optional(),
    });
    function parseGetRealmsParams(params) {
        return parseObject(params, Script.GetRealmsParametersSchema);
    }
    Script.parseGetRealmsParams = parseGetRealmsParams;
    // ContextTarget = {
    //   context: BrowsingContext,
    //   ?sandbox: text
    // }
    const ContextTargetSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema,
        sandbox: zod_1.z.string().optional(),
    });
    // RealmTarget = {realm: Realm};
    const RealmTargetSchema = zod_1.z.object({
        realm: zod_1.z.string().min(1),
    });
    // Target = (
    //   RealmTarget //
    //   ContextTarget
    // );
    // Order is important, as `parse` is processed in the same order.
    // `RealmTargetSchema` has higher priority.
    const TargetSchema = zod_1.z.union([RealmTargetSchema, ContextTargetSchema]);
    // ResultOwnership = "root" / "none"
    const ResultOwnershipSchema = zod_1.z.enum(['root', 'none']);
    // ScriptEvaluateParameters = {
    //   expression: text;
    //   target: Target;
    //   ?awaitPromise: bool;
    //   ?resultOwnership: ResultOwnership;
    // }
    const EvaluateParametersSchema = zod_1.z.object({
        expression: zod_1.z.string(),
        awaitPromise: zod_1.z.boolean(),
        target: TargetSchema,
        resultOwnership: ResultOwnershipSchema.optional(),
    });
    function parseEvaluateParams(params) {
        return parseObject(params, EvaluateParametersSchema);
    }
    Script.parseEvaluateParams = parseEvaluateParams;
    // DisownParameters = {
    //   handles: [Handle]
    //   target: script.Target;
    // }
    const DisownParametersSchema = zod_1.z.object({
        target: TargetSchema,
        handles: zod_1.z.array(zod_1.z.string()),
    });
    function parseDisownParams(params) {
        return parseObject(params, DisownParametersSchema);
    }
    Script.parseDisownParams = parseDisownParams;
    Script.PreloadScriptSchema = zod_1.z.string();
    Script.AddPreloadScriptParametersSchema = zod_1.z.object({
        expression: zod_1.z.string(),
        sandbox: zod_1.z.string().optional(),
        context: CommonDataTypes.BrowsingContextSchema.optional(),
    });
    function parseAddPreloadScriptParams(params) {
        return parseObject(params, Script.AddPreloadScriptParametersSchema);
    }
    Script.parseAddPreloadScriptParams = parseAddPreloadScriptParams;
    Script.RemovePreloadScriptParametersSchema = zod_1.z.object({
        script: Script.PreloadScriptSchema,
    });
    function parseRemovePreloadScriptParams(params) {
        return parseObject(params, Script.RemovePreloadScriptParametersSchema);
    }
    Script.parseRemovePreloadScriptParams = parseRemovePreloadScriptParams;
    const ChannelIdSchema = zod_1.z.string();
    const ChannelPropertiesSchema = zod_1.z.object({
        channel: ChannelIdSchema,
        // TODO(#294): maxDepth: CommonDataTypes.MaxDepthSchema.optional(),
        // See: https://github.com/w3c/webdriver-bidi/pull/361/files#r1141961142
        maxDepth: zod_1.z.number().int().min(1).max(1).optional(),
        ownership: ResultOwnershipSchema.optional(),
    });
    Script.ChannelSchema = zod_1.z.object({
        type: zod_1.z.literal('channel'),
        value: ChannelPropertiesSchema,
    });
    // ArgumentValue = (
    //   RemoteReference //
    //   LocalValue //
    //   script.Channel
    // );
    const ArgumentValueSchema = zod_1.z.union([
        CommonDataTypes.RemoteReferenceSchema,
        CommonDataTypes.SharedReferenceSchema,
        CommonDataTypes.LocalValueSchema,
        Script.ChannelSchema,
    ]);
    // CallFunctionParameters = {
    //   functionDeclaration: text;
    //   awaitPromise: bool;
    //   target: script.Target;
    //   ?arguments: [*script.ArgumentValue];
    //   ?this: script.ArgumentValue;
    //   ?resultOwnership: script.ResultOwnership;
    // }
    const CallFunctionParametersSchema = zod_1.z.object({
        functionDeclaration: zod_1.z.string(),
        target: TargetSchema,
        arguments: zod_1.z.array(ArgumentValueSchema).optional(),
        this: ArgumentValueSchema.optional(),
        awaitPromise: zod_1.z.boolean(),
        resultOwnership: ResultOwnershipSchema.optional(),
    });
    function parseCallFunctionParams(params) {
        return parseObject(params, CallFunctionParametersSchema);
    }
    Script.parseCallFunctionParams = parseCallFunctionParams;
})(Script = exports.Script || (exports.Script = {}));
/** @see https://w3c.github.io/webdriver-bidi/#module-browsingContext */
var BrowsingContext;
(function (BrowsingContext) {
    // GetTreeParameters = {
    //   ?maxDepth: js-uint,
    //   ?root: browsingContext.BrowsingContext,
    // }
    const GetTreeParametersSchema = zod_1.z.object({
        maxDepth: CommonDataTypes.MaxDepthSchema.optional(),
        root: CommonDataTypes.BrowsingContextSchema.optional(),
    });
    function parseGetTreeParams(params) {
        return parseObject(params, GetTreeParametersSchema);
    }
    BrowsingContext.parseGetTreeParams = parseGetTreeParams;
    // ReadinessState = "none" / "interactive" / "complete"
    const ReadinessStateSchema = zod_1.z.enum(['none', 'interactive', 'complete']);
    // BrowsingContextNavigateParameters = {
    //   context: BrowsingContext,
    //   url: text,
    //   ?wait: ReadinessState,
    // }
    // ReadinessState = "none" / "interactive" / "complete"
    const NavigateParametersSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema,
        url: zod_1.z.string().url(),
        wait: ReadinessStateSchema.optional(),
    });
    function parseNavigateParams(params) {
        return parseObject(params, NavigateParametersSchema);
    }
    BrowsingContext.parseNavigateParams = parseNavigateParams;
    // BrowsingContextCreateType = "tab" / "window"
    // BrowsingContextCreateParameters = {
    //   type: BrowsingContextCreateType
    // }
    const CreateParametersSchema = zod_1.z.object({
        type: zod_1.z.enum(['tab', 'window']),
        referenceContext: CommonDataTypes.BrowsingContextSchema.optional(),
    });
    function parseCreateParams(params) {
        return parseObject(params, CreateParametersSchema);
    }
    BrowsingContext.parseCreateParams = parseCreateParams;
    // BrowsingContextCloseParameters = {
    //   context: BrowsingContext
    // }
    const CloseParametersSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema,
    });
    function parseCloseParams(params) {
        return parseObject(params, CloseParametersSchema);
    }
    BrowsingContext.parseCloseParams = parseCloseParams;
    // browsingContext.CaptureScreenshotParameters = {
    //   context: browsingContext.BrowsingContext
    // }
    const CaptureScreenshotParametersSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema,
    });
    function parseCaptureScreenshotParams(params) {
        return parseObject(params, CaptureScreenshotParametersSchema);
    }
    BrowsingContext.parseCaptureScreenshotParams = parseCaptureScreenshotParams;
    // All units are in cm.
    // PrintPageParameters = {
    //   ?height: (float .ge 0.0) .default 27.94,
    //   ?width: (float .ge 0.0) .default 21.59,
    // }
    const PrintPageParametersSchema = zod_1.z.object({
        height: zod_1.z.number().min(0.0).default(27.94).optional(),
        width: zod_1.z.number().min(0.0).default(21.59).optional(),
    });
    // All units are in cm.
    // PrintMarginParameters = {
    //   ?bottom: (float .ge 0.0) .default 1.0,
    //   ?left: (float .ge 0.0) .default 1.0,
    //   ?right: (float .ge 0.0) .default 1.0,
    //   ?top: (float .ge 0.0) .default 1.0,
    // }
    const PrintMarginParametersSchema = zod_1.z.object({
        bottom: zod_1.z.number().min(0.0).default(1.0).optional(),
        left: zod_1.z.number().min(0.0).default(1.0).optional(),
        right: zod_1.z.number().min(0.0).default(1.0).optional(),
        top: zod_1.z.number().min(0.0).default(1.0).optional(),
    });
    /** @see https://w3c.github.io/webdriver/#dfn-parse-a-page-range */
    const PrintPageRangesSchema = zod_1.z
        .array(zod_1.z.union([zod_1.z.string().min(1), zod_1.z.number().int().nonnegative()]))
        .refine((pageRanges) => {
        return pageRanges.every((pageRange) => {
            const match = String(pageRange).match(
            // matches: '2' | '2-' | '-2' | '2-4'
            /^(?:(?:\d+)|(?:\d+[-])|(?:[-]\d+)|(?:(?<start>\d+)[-](?<end>\d+)))$/);
            // If a page range is specified, validate start <= end.
            const { start, end } = match?.groups ?? {};
            if (start && end && Number(start) > Number(end)) {
                return false;
            }
            return match;
        });
    });
    // PrintParameters = {
    //   context: browsingContext.BrowsingContext,
    //   ?background: bool .default false,
    //   ?margin: browsingContext.PrintMarginParameters,
    //   ?orientation: ("portrait" / "landscape") .default "portrait",
    //   ?page: browsingContext.PrintPageParameters,
    //   ?pageRanges: [*(js-uint / text)],
    //   ?scale: 0.1..2.0 .default 1.0,
    //   ?shrinkToFit: bool .default true,
    // }
    const PrintParametersSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema,
        background: zod_1.z.boolean().default(false).optional(),
        margin: PrintMarginParametersSchema.optional(),
        orientation: zod_1.z
            .enum(['portrait', 'landscape'])
            .default('portrait')
            .optional(),
        page: PrintPageParametersSchema.optional(),
        pageRanges: PrintPageRangesSchema.default([]).optional(),
        scale: zod_1.z.number().min(0.1).max(2.0).default(1.0).optional(),
        shrinkToFit: zod_1.z.boolean().default(true).optional(),
    });
    function parsePrintParams(params) {
        return parseObject(params, PrintParametersSchema);
    }
    BrowsingContext.parsePrintParams = parsePrintParams;
})(BrowsingContext = exports.BrowsingContext || (exports.BrowsingContext = {}));
var CDP;
(function (CDP) {
    const SendCommandParamsSchema = zod_1.z.object({
        // Allowing any cdpMethod, and casting to proper type later on.
        cdpMethod: zod_1.z.string(),
        // `passthrough` allows object to have any fields.
        // https://github.com/colinhacks/zod#passthrough
        cdpParams: zod_1.z.object({}).passthrough(),
        cdpSession: zod_1.z.string().optional(),
    });
    function parseSendCommandParams(params) {
        return parseObject(params, SendCommandParamsSchema);
    }
    CDP.parseSendCommandParams = parseSendCommandParams;
    const GetSessionParamsSchema = zod_1.z.object({
        context: CommonDataTypes.BrowsingContextSchema,
    });
    function parseGetSessionParams(params) {
        return parseObject(params, GetSessionParamsSchema);
    }
    CDP.parseGetSessionParams = parseGetSessionParams;
})(CDP = exports.CDP || (exports.CDP = {}));
/** @see https://w3c.github.io/webdriver-bidi/#module-session */
var Session;
(function (Session) {
    const SubscriptionRequestParametersEventsSchema = zod_1.z.enum([
        protocol_js_1.BrowsingContext.AllEvents,
        ...Object.values(protocol_js_1.BrowsingContext.EventNames),
        protocol_js_1.Log.AllEvents,
        ...Object.values(protocol_js_1.Log.EventNames),
        protocol_js_1.CDP.AllEvents,
        ...Object.values(protocol_js_1.CDP.EventNames),
        protocol_js_1.Network.AllEvents,
        ...Object.values(protocol_js_1.Network.EventNames),
        protocol_js_1.Script.AllEvents,
        ...Object.values(protocol_js_1.Script.EventNames),
    ]);
    // SessionSubscribeParameters = {
    //   events: [*text],
    //   ?contexts: [*BrowsingContext],
    // }
    const SubscriptionRequestParametersSchema = zod_1.z.object({
        events: zod_1.z.array(SubscriptionRequestParametersEventsSchema),
        contexts: zod_1.z.array(CommonDataTypes.BrowsingContextSchema).optional(),
    });
    function parseSubscribeParams(params) {
        return parseObject(params, SubscriptionRequestParametersSchema);
    }
    Session.parseSubscribeParams = parseSubscribeParams;
})(Session = exports.Session || (exports.Session = {}));
//# sourceMappingURL=protocol-parser.js.map