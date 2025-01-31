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
/**
 * @fileoverview Provides parsing and validator for WebDriver BiDi protocol.
 * Parser types should match the `../protocol` types.
 */
import { ZodType, z as zod } from 'zod';
import { BrowsingContext as BrowsingContextTypes, Script as ScriptTypes, CDP as CdpTypes, Session as SessionTypes, CommonDataTypes as CommonDataTypesTypes } from '../protocol/protocol.js';
export declare function parseObject<T extends ZodType>(obj: unknown, schema: T): zod.infer<T>;
export declare namespace CommonDataTypes {
    const SharedReferenceSchema: zod.ZodObject<{
        sharedId: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        sharedId: string;
    }, {
        sharedId: string;
    }>;
    const RemoteReferenceSchema: zod.ZodObject<{
        handle: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        handle: string;
    }, {
        handle: string;
    }>;
    const LocalValueSchema: zod.ZodType<CommonDataTypesTypes.LocalValue>;
    const BrowsingContextSchema: zod.ZodString;
    const MaxDepthSchema: zod.ZodNumber;
}
/** @see https://w3c.github.io/webdriver-bidi/#module-script */
export declare namespace Script {
    const GetRealmsParametersSchema: zod.ZodObject<{
        context: zod.ZodOptional<zod.ZodString>;
        type: zod.ZodOptional<zod.ZodEnum<["window", "dedicated-worker", "shared-worker", "service-worker", "worker", "paint-worklet", "audio-worklet", "worklet"]>>;
    }, "strip", zod.ZodTypeAny, {
        context?: string | undefined;
        type?: "worker" | "window" | "dedicated-worker" | "shared-worker" | "service-worker" | "paint-worklet" | "audio-worklet" | "worklet" | undefined;
    }, {
        context?: string | undefined;
        type?: "worker" | "window" | "dedicated-worker" | "shared-worker" | "service-worker" | "paint-worklet" | "audio-worklet" | "worklet" | undefined;
    }>;
    function parseGetRealmsParams(params: object): ScriptTypes.GetRealmsParameters;
    function parseEvaluateParams(params: object): ScriptTypes.EvaluateParameters;
    function parseDisownParams(params: object): ScriptTypes.DisownParameters;
    const PreloadScriptSchema: zod.ZodString;
    const AddPreloadScriptParametersSchema: zod.ZodObject<{
        expression: zod.ZodString;
        sandbox: zod.ZodOptional<zod.ZodString>;
        context: zod.ZodOptional<zod.ZodString>;
    }, "strip", zod.ZodTypeAny, {
        expression: string;
        sandbox?: string | undefined;
        context?: string | undefined;
    }, {
        expression: string;
        sandbox?: string | undefined;
        context?: string | undefined;
    }>;
    function parseAddPreloadScriptParams(params: object): ScriptTypes.AddPreloadScriptParameters;
    const RemovePreloadScriptParametersSchema: zod.ZodObject<{
        script: zod.ZodString;
    }, "strip", zod.ZodTypeAny, {
        script: string;
    }, {
        script: string;
    }>;
    function parseRemovePreloadScriptParams(params: object): ScriptTypes.RemovePreloadScriptParameters;
    const ChannelSchema: zod.ZodObject<{
        type: zod.ZodLiteral<"channel">;
        value: zod.ZodObject<{
            channel: zod.ZodString;
            maxDepth: zod.ZodOptional<zod.ZodNumber>;
            ownership: zod.ZodOptional<zod.ZodEnum<["root", "none"]>>;
        }, "strip", zod.ZodTypeAny, {
            channel: string;
            maxDepth?: number | undefined;
            ownership?: "none" | "root" | undefined;
        }, {
            channel: string;
            maxDepth?: number | undefined;
            ownership?: "none" | "root" | undefined;
        }>;
    }, "strip", zod.ZodTypeAny, {
        type: "channel";
        value: {
            channel: string;
            maxDepth?: number | undefined;
            ownership?: "none" | "root" | undefined;
        };
    }, {
        type: "channel";
        value: {
            channel: string;
            maxDepth?: number | undefined;
            ownership?: "none" | "root" | undefined;
        };
    }>;
    function parseCallFunctionParams(params: object): ScriptTypes.CallFunctionParameters;
}
/** @see https://w3c.github.io/webdriver-bidi/#module-browsingContext */
export declare namespace BrowsingContext {
    function parseGetTreeParams(params: object): BrowsingContextTypes.GetTreeParameters;
    function parseNavigateParams(params: object): BrowsingContextTypes.NavigateParameters;
    function parseCreateParams(params: object): BrowsingContextTypes.CreateParameters;
    function parseCloseParams(params: object): BrowsingContextTypes.CloseParameters;
    function parseCaptureScreenshotParams(params: object): BrowsingContextTypes.CaptureScreenshotParameters;
    function parsePrintParams(params: object): BrowsingContextTypes.PrintParameters;
}
export declare namespace CDP {
    function parseSendCommandParams(params: object): CdpTypes.SendCommandParams;
    function parseGetSessionParams(params: object): CdpTypes.GetSessionParams;
}
/** @see https://w3c.github.io/webdriver-bidi/#module-session */
export declare namespace Session {
    function parseSubscribeParams(params: object): SessionTypes.SubscribeParameters;
}
