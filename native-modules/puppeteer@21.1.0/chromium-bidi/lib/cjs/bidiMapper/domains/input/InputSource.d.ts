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
import type { Input } from '../../../protocol/protocol.js';
export declare const enum SourceType {
    Key = "key",
    Pointer = "pointer",
    Wheel = "wheel",
    None = "none"
}
export declare class NoneSource {
    type: SourceType.None;
}
export declare class KeySource {
    #private;
    type: SourceType.Key;
    pressed: Set<string>;
    get modifiers(): number;
    get alt(): boolean;
    set alt(value: boolean);
    get ctrl(): boolean;
    set ctrl(value: boolean);
    get meta(): boolean;
    set meta(value: boolean);
    get shift(): boolean;
    set shift(value: boolean);
}
interface ClickContext {
    x: number;
    y: number;
    timeStamp: number;
}
export declare class PointerSource {
    #private;
    type: SourceType.Pointer;
    subtype: Input.PointerType;
    pointerId: number;
    pressed: Set<number>;
    x: number;
    y: number;
    constructor(id: number, subtype: Input.PointerType);
    get buttons(): number;
    setClickCount(context: ClickContext): void;
    get clickCount(): number;
}
export declare class WheelSource {
    type: SourceType.Wheel;
}
export type InputSource = NoneSource | KeySource | PointerSource | WheelSource;
export type InputSourceFor<Type extends SourceType> = Type extends SourceType.Key ? KeySource : Type extends SourceType.Pointer ? PointerSource : Type extends SourceType.Wheel ? WheelSource : NoneSource;
export {};
