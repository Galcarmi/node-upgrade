/**
 * Copyright 2023 Google LLC.
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
import { type EmptyResult, Script } from '../../../protocol/protocol';
import type { BrowsingContextStorage } from '../context/browsingContextStorage';
import type { PreloadScriptStorage } from './PreloadScriptStorage';
import type { RealmStorage } from './realmStorage';
export declare class ScriptProcessor {
    #private;
    constructor(browsingContextStorage: BrowsingContextStorage, realmStorage: RealmStorage, preloadScriptStorage: PreloadScriptStorage);
    addPreloadScript(params: Script.AddPreloadScriptParameters): Promise<Script.AddPreloadScriptResult>;
    removePreloadScript(params: Script.RemovePreloadScriptParameters): Promise<EmptyResult>;
    callFunction(params: Script.CallFunctionParameters): Promise<Script.EvaluateResult>;
    evaluate(params: Script.EvaluateParameters): Promise<Script.EvaluateResult>;
    disown(params: Script.DisownParameters): Promise<EmptyResult>;
    getRealms(params: Script.GetRealmsParameters): Script.GetRealmsResult;
}
