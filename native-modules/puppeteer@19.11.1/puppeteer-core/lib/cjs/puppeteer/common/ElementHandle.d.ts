/**
 * Copyright 2019 Google Inc. All rights reserved.
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
import { Protocol } from 'devtools-protocol';
import { BoundingBox, BoxModel, ClickOptions, ElementHandle, Offset, Point, PressOptions } from '../api/ElementHandle.js';
import { ScreenshotOptions } from '../api/Page.js';
import { CDPSession } from './Connection.js';
import { ExecutionContext } from './ExecutionContext.js';
import { Frame } from './Frame.js';
import { WaitForSelectorOptions } from './IsolatedWorld.js';
import { CDPJSHandle } from './JSHandle.js';
import { ElementFor, EvaluateFuncWith, HandleFor, NodeFor } from './types.js';
import { KeyInput } from './USKeyboardLayout.js';
/**
 * The CDPElementHandle extends ElementHandle now to keep compatibility
 * with `instanceof` because of that we need to have methods for
 * CDPJSHandle to in this implementation as well.
 *
 * @internal
 */
export declare class CDPElementHandle<ElementType extends Node = Element> extends ElementHandle<ElementType> {
    #private;
    handle: CDPJSHandle<ElementType>;
    constructor(context: ExecutionContext, remoteObject: Protocol.Runtime.RemoteObject, frame: Frame);
    /**
     * @internal
     */
    executionContext(): ExecutionContext;
    /**
     * @internal
     */
    get client(): CDPSession;
    remoteObject(): Protocol.Runtime.RemoteObject;
    get frame(): Frame;
    $<Selector extends string>(selector: Selector): Promise<CDPElementHandle<NodeFor<Selector>> | null>;
    $$<Selector extends string>(selector: Selector): Promise<Array<CDPElementHandle<NodeFor<Selector>>>>;
    $eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<NodeFor<Selector>, Params> = EvaluateFuncWith<NodeFor<Selector>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
    $$eval<Selector extends string, Params extends unknown[], Func extends EvaluateFuncWith<Array<NodeFor<Selector>>, Params> = EvaluateFuncWith<Array<NodeFor<Selector>>, Params>>(selector: Selector, pageFunction: Func | string, ...args: Params): Promise<Awaited<ReturnType<Func>>>;
    $x(expression: string): Promise<Array<CDPElementHandle<Node>>>;
    waitForSelector<Selector extends string>(selector: Selector, options?: WaitForSelectorOptions): Promise<CDPElementHandle<NodeFor<Selector>> | null>;
    waitForXPath(xpath: string, options?: {
        visible?: boolean;
        hidden?: boolean;
        timeout?: number;
    }): Promise<CDPElementHandle<Node> | null>;
    isVisible(): Promise<boolean>;
    isHidden(): Promise<boolean>;
    toElement<K extends keyof HTMLElementTagNameMap | keyof SVGElementTagNameMap>(tagName: K): Promise<HandleFor<ElementFor<K>>>;
    contentFrame(): Promise<Frame | null>;
    scrollIntoView(this: CDPElementHandle<Element>): Promise<void>;
    clickablePoint(offset?: Offset): Promise<Point>;
    /**
     * This method scrolls element into view if needed, and then
     * uses {@link Page.mouse} to hover over the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    hover(this: CDPElementHandle<Element>): Promise<void>;
    /**
     * This method scrolls element into view if needed, and then
     * uses {@link Page.mouse} to click in the center of the element.
     * If the element is detached from DOM, the method throws an error.
     */
    click(this: CDPElementHandle<Element>, options?: Readonly<ClickOptions>): Promise<void>;
    /**
     * This method creates and captures a dragevent from the element.
     */
    drag(this: CDPElementHandle<Element>, target: Point): Promise<Protocol.Input.DragData>;
    dragEnter(this: CDPElementHandle<Element>, data?: Protocol.Input.DragData): Promise<void>;
    dragOver(this: CDPElementHandle<Element>, data?: Protocol.Input.DragData): Promise<void>;
    drop(this: CDPElementHandle<Element>, data?: Protocol.Input.DragData): Promise<void>;
    dragAndDrop(this: CDPElementHandle<Element>, target: CDPElementHandle<Node>, options?: {
        delay: number;
    }): Promise<void>;
    select(...values: string[]): Promise<string[]>;
    uploadFile(this: CDPElementHandle<HTMLInputElement>, ...filePaths: string[]): Promise<void>;
    tap(this: CDPElementHandle<Element>): Promise<void>;
    touchStart(this: CDPElementHandle<Element>): Promise<void>;
    touchMove(this: CDPElementHandle<Element>): Promise<void>;
    touchEnd(this: CDPElementHandle<Element>): Promise<void>;
    focus(): Promise<void>;
    type(text: string, options?: {
        delay: number;
    }): Promise<void>;
    press(key: KeyInput, options?: PressOptions): Promise<void>;
    boundingBox(): Promise<BoundingBox | null>;
    boxModel(): Promise<BoxModel | null>;
    screenshot(this: CDPElementHandle<Element>, options?: ScreenshotOptions): Promise<string | Buffer>;
}
//# sourceMappingURL=ElementHandle.d.ts.map