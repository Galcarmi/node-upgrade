"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionDispatcher = void 0;
const protocol_js_1 = require("../../../protocol/protocol.js");
const assert_js_1 = require("../../../utils/assert.js");
const USKeyboardLayout_js_1 = require("./USKeyboardLayout.js");
const keyUtils_js_1 = require("./keyUtils.js");
/** https://w3c.github.io/webdriver/#dfn-center-point */
const CALCULATE_IN_VIEW_CENTER_PT_DECL = ((i) => {
    const t = i.getClientRects()[0], e = Math.max(0, Math.min(t.x, t.x + t.width)), n = Math.min(window.innerWidth, Math.max(t.x, t.x + t.width)), h = Math.max(0, Math.min(t.y, t.y + t.height)), m = Math.min(window.innerHeight, Math.max(t.y, t.y + t.height));
    return [e + ((n - e) >> 1), h + ((m - h) >> 1)];
}).toString();
const IS_MAC_DECL = (() => {
    return navigator.platform.toLowerCase().includes('mac');
}).toString();
async function getElementCenter(context, element) {
    const sandbox = await context.getOrCreateSandbox(undefined);
    const result = await sandbox.callFunction(CALCULATE_IN_VIEW_CENTER_PT_DECL, { type: 'undefined' }, [element], false, "none" /* Script.ResultOwnership.None */, {});
    if (result.type === 'exception') {
        throw new protocol_js_1.NoSuchElementException(`Origin element ${element.sharedId} was not found`);
    }
    (0, assert_js_1.assert)(result.result.type === 'array');
    (0, assert_js_1.assert)(result.result.value?.[0]?.type === 'number');
    (0, assert_js_1.assert)(result.result.value?.[1]?.type === 'number');
    const { result: { value: [{ value: x }, { value: y }], }, } = result;
    return { x: x, y: y };
}
class ActionDispatcher {
    static isMacOS = async (context) => {
        const result = await (await context.getOrCreateSandbox(undefined)).callFunction(IS_MAC_DECL, { type: 'undefined' }, [], false, "none" /* Script.ResultOwnership.None */, {});
        (0, assert_js_1.assert)(result.type !== 'exception');
        (0, assert_js_1.assert)(result.result.type === 'boolean');
        return result.result.value;
    };
    #tickStart = 0;
    #tickDuration = 0;
    #inputState;
    #context;
    #isMacOS;
    constructor(inputState, context, isMacOS) {
        this.#inputState = inputState;
        this.#context = context;
        this.#isMacOS = isMacOS;
    }
    async dispatchActions(optionsByTick) {
        await this.#inputState.queue.run(async () => {
            for (const options of optionsByTick) {
                await this.dispatchTickActions(options);
            }
        });
    }
    async dispatchTickActions(options) {
        this.#tickStart = performance.now();
        this.#tickDuration = 0;
        for (const { action } of options) {
            if ('duration' in action && action.duration !== undefined) {
                this.#tickDuration = Math.max(this.#tickDuration, action.duration);
            }
        }
        const promises = [
            new Promise((resolve) => setTimeout(resolve, this.#tickDuration)),
        ];
        for (const option of options) {
            // In theory we have to wait for each action to happen, but CDP is serial,
            // so as an optimization, we queue all CDP commands at once and await all
            // of them.
            promises.push(this.#dispatchAction(option));
        }
        await Promise.all(promises);
    }
    async #dispatchAction({ id, action }) {
        const source = this.#inputState.get(id);
        const keyState = this.#inputState.getGlobalKeyState();
        switch (action.type) {
            case 'keyDown': {
                // SAFETY: The source is validated before.
                await this.#dispatchKeyDownAction(source, action);
                this.#inputState.cancelList.push({
                    id,
                    action: {
                        ...action,
                        type: 'keyUp',
                    },
                });
                break;
            }
            case 'keyUp': {
                // SAFETY: The source is validated before.
                await this.#dispatchKeyUpAction(source, action);
                break;
            }
            case 'pause': {
                // TODO: Implement waiting on the input source.
                break;
            }
            case 'pointerDown': {
                // SAFETY: The source is validated before.
                await this.#dispatchPointerDownAction(source, keyState, action);
                this.#inputState.cancelList.push({
                    id,
                    action: {
                        ...action,
                        type: 'pointerUp',
                    },
                });
                break;
            }
            case 'pointerMove': {
                // SAFETY: The source is validated before.
                await this.#dispatchPointerMoveAction(source, keyState, action);
                break;
            }
            case 'pointerUp': {
                // SAFETY: The source is validated before.
                await this.#dispatchPointerUpAction(source, keyState, action);
                break;
            }
            case 'scroll': {
                // SAFETY: The source is validated before.
                await this.#dispatchScrollAction(source, keyState, action);
                break;
            }
        }
    }
    #dispatchPointerDownAction(source, keyState, action) {
        const { button } = action;
        if (source.pressed.has(button)) {
            return;
        }
        source.pressed.add(button);
        const { x, y, subtype: pointerType } = source;
        const { width, height, pressure, twist, tangentialPressure } = action;
        const { tiltX, tiltY } = 'tiltX' in action ? action : {};
        // TODO: Implement azimuth/altitude angle.
        // --- Platform-specific code begins here ---
        const { modifiers } = keyState;
        switch (pointerType) {
            case "mouse" /* Input.PointerType.Mouse */:
            case "pen" /* Input.PointerType.Pen */:
                source.setClickCount({ x, y, timeStamp: performance.now() });
                // TODO: Implement width and height when available.
                return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                    type: 'mousePressed',
                    x,
                    y,
                    modifiers,
                    button: getCdpButton(button),
                    buttons: source.buttons,
                    clickCount: source.clickCount,
                    pointerType,
                    tangentialPressure,
                    tiltX,
                    tiltY,
                    twist,
                    force: pressure,
                });
            case "touch" /* Input.PointerType.Touch */:
                return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchTouchEvent', {
                    type: 'touchStart',
                    touchPoints: [
                        {
                            x,
                            y,
                            radiusX: width,
                            radiusY: height,
                            tangentialPressure,
                            tiltX,
                            tiltY,
                            twist,
                            force: pressure,
                            id: source.pointerId,
                        },
                    ],
                    modifiers,
                });
        }
        // --- Platform-specific code ends here ---
    }
    #dispatchPointerUpAction(source, keyState, action) {
        const { button } = action;
        if (!source.pressed.has(button)) {
            return;
        }
        source.pressed.delete(button);
        const { x, y, subtype: pointerType } = source;
        // --- Platform-specific code begins here ---
        const { modifiers } = keyState;
        switch (pointerType) {
            case "mouse" /* Input.PointerType.Mouse */:
            case "pen" /* Input.PointerType.Pen */:
                // TODO: Implement width and height when available.
                return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                    type: 'mouseReleased',
                    x,
                    y,
                    modifiers,
                    button: getCdpButton(button),
                    buttons: source.buttons,
                    clickCount: source.clickCount,
                    pointerType,
                });
            case "touch" /* Input.PointerType.Touch */:
                return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchTouchEvent', {
                    type: 'touchEnd',
                    touchPoints: [
                        {
                            x,
                            y,
                            id: source.pointerId,
                        },
                    ],
                    modifiers,
                });
        }
        // --- Platform-specific code ends here ---
    }
    async #dispatchPointerMoveAction(source, keyState, action) {
        const { x: startX, y: startY, subtype: pointerType } = source;
        const { width, height, pressure, twist, tangentialPressure, x: offsetX, y: offsetY, origin = 'viewport', duration = this.#tickDuration, } = action;
        const { tiltX, tiltY } = 'tiltX' in action ? action : {};
        // TODO: Implement azimuth/altitude angle.
        const { targetX, targetY } = await this.#getCoordinateFromOrigin(origin, offsetX, offsetY, startX, startY);
        if (targetX < 0 || targetY < 0) {
            throw new protocol_js_1.MoveTargetOutOfBoundsException(`Cannot move beyond viewport (x: ${targetX}, y: ${targetY})`);
        }
        let last;
        do {
            const ratio = duration > 0 ? (performance.now() - this.#tickStart) / duration : 1;
            last = ratio >= 1;
            let x;
            let y;
            if (last) {
                x = targetX;
                y = targetY;
            }
            else {
                x = Math.round(ratio * (targetX - startX) + startX);
                y = Math.round(ratio * (targetY - startY) + startY);
            }
            if (source.x !== x || source.y !== y) {
                // --- Platform-specific code begins here ---
                const { modifiers } = keyState;
                switch (pointerType) {
                    case "mouse" /* Input.PointerType.Mouse */:
                    case "pen" /* Input.PointerType.Pen */:
                        // TODO: Implement width and height when available.
                        await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                            type: 'mouseMoved',
                            x,
                            y,
                            modifiers,
                            clickCount: 0,
                            button: getCdpButton(source.pressed.values().next().value ?? 5),
                            buttons: source.buttons,
                            pointerType,
                            tangentialPressure,
                            tiltX,
                            tiltY,
                            twist,
                            force: pressure,
                        });
                        break;
                    case "touch" /* Input.PointerType.Touch */:
                        await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchTouchEvent', {
                            type: 'touchMove',
                            touchPoints: [
                                {
                                    x,
                                    y,
                                    radiusX: width,
                                    radiusY: height,
                                    tangentialPressure,
                                    tiltX,
                                    tiltY,
                                    twist,
                                    force: pressure,
                                    id: source.pointerId,
                                },
                            ],
                            modifiers,
                        });
                        break;
                }
                // --- Platform-specific code ends here ---
                source.x = x;
                source.y = y;
            }
        } while (!last);
    }
    async #getCoordinateFromOrigin(origin, offsetX, offsetY, startX, startY) {
        let targetX;
        let targetY;
        switch (origin) {
            case 'viewport':
                targetX = offsetX;
                targetY = offsetY;
                break;
            case 'pointer':
                targetX = startX + offsetX;
                targetY = startY + offsetY;
                break;
            default: {
                const { x: posX, y: posY } = await getElementCenter(this.#context, origin.element);
                // SAFETY: These can never be special numbers.
                targetX = posX + offsetX;
                targetY = posY + offsetY;
                break;
            }
        }
        return { targetX, targetY };
    }
    async #dispatchScrollAction(_source, keyState, action) {
        const { deltaX: targetDeltaX, deltaY: targetDeltaY, x: offsetX, y: offsetY, origin = 'viewport', duration = this.#tickDuration, } = action;
        if (origin === 'pointer') {
            throw new protocol_js_1.InvalidArgumentException('"pointer" origin is invalid for scrolling.');
        }
        const { targetX, targetY } = await this.#getCoordinateFromOrigin(origin, offsetX, offsetY, 0, 0);
        if (targetX < 0 || targetY < 0) {
            throw new protocol_js_1.MoveTargetOutOfBoundsException(`Cannot move beyond viewport (x: ${targetX}, y: ${targetY})`);
        }
        let currentDeltaX = 0;
        let currentDeltaY = 0;
        let last;
        do {
            const ratio = duration > 0 ? (performance.now() - this.#tickStart) / duration : 1;
            last = ratio >= 1;
            let deltaX;
            let deltaY;
            if (last) {
                deltaX = targetDeltaX - currentDeltaX;
                deltaY = targetDeltaY - currentDeltaY;
            }
            else {
                deltaX = Math.round(ratio * targetDeltaX - currentDeltaX);
                deltaY = Math.round(ratio * targetDeltaY - currentDeltaY);
            }
            if (deltaX !== 0 || deltaY !== 0) {
                // --- Platform-specific code begins here ---
                const { modifiers } = keyState;
                await this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchMouseEvent', {
                    type: 'mouseWheel',
                    deltaX,
                    deltaY,
                    x: targetX,
                    y: targetY,
                    modifiers,
                });
                // --- Platform-specific code ends here ---
                currentDeltaX += deltaX;
                currentDeltaY += deltaY;
            }
        } while (!last);
    }
    async #dispatchKeyDownAction(source, action) {
        if ([...action.value].length > 1) {
            throw new protocol_js_1.InvalidArgumentException(`Invalid key value: ${action.value}`);
        }
        const rawKey = action.value;
        const key = (0, keyUtils_js_1.getNormalizedKey)(rawKey);
        const repeat = source.pressed.has(key);
        const code = (0, keyUtils_js_1.getKeyCode)(rawKey);
        const location = (0, keyUtils_js_1.getKeyLocation)(rawKey);
        switch (key) {
            case 'Alt':
                source.alt = true;
                break;
            case 'Shift':
                source.shift = true;
                break;
            case 'Control':
                source.ctrl = true;
                break;
            case 'Meta':
                source.meta = true;
                break;
        }
        source.pressed.add(key);
        const { modifiers } = source;
        // --- Platform-specific code begins here ---
        // The spread is a little hack so JS gives us an array of unicode characters
        // to measure.
        const unmodifiedText = getKeyEventUnmodifiedText(key, source);
        const text = getKeyEventText(code ?? '', source) ?? unmodifiedText;
        let command;
        // The following commands need to be declared because Chromium doesn't
        // handle them. See
        // https://source.chromium.org/chromium/chromium/src/+/refs/heads/main:third_party/blink/renderer/core/editing/editing_behavior.cc;l=169;drc=b8143cf1dfd24842890fcd831c4f5d909bef4fc4;bpv=0;bpt=1.
        if (this.#isMacOS && source.meta) {
            switch (code) {
                case 'KeyA':
                    command = 'SelectAll';
                    break;
                case 'KeyC':
                    command = 'Copy';
                    break;
                case 'KeyV':
                    command = source.shift ? 'PasteAndMatchStyle' : 'Paste';
                    break;
                case 'KeyX':
                    command = 'Cut';
                    break;
                case 'KeyZ':
                    command = source.shift ? 'Redo' : 'Undo';
                    break;
                default:
                // Intentionally empty.
            }
        }
        const promises = [
            this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchKeyEvent', {
                type: text ? 'keyDown' : 'rawKeyDown',
                windowsVirtualKeyCode: USKeyboardLayout_js_1.KeyToKeyCode[key],
                key,
                code,
                text,
                unmodifiedText,
                autoRepeat: repeat,
                isSystemKey: source.alt || undefined,
                location: location < 3 ? location : undefined,
                isKeypad: location === 3,
                modifiers,
                commands: command ? [command] : undefined,
            }),
        ];
        // Drag cancelling happens on escape.
        if (key === 'Escape') {
            if (!source.alt &&
                ((this.#isMacOS && !source.ctrl && !source.meta) || !this.#isMacOS)) {
                promises.push(this.#context.cdpTarget.cdpClient.sendCommand('Input.cancelDragging'));
            }
        }
        await Promise.all(promises);
        // --- Platform-specific code ends here ---
    }
    #dispatchKeyUpAction(source, action) {
        if ([...action.value].length > 1) {
            throw new protocol_js_1.InvalidArgumentException(`Invalid key value: ${action.value}`);
        }
        const rawKey = action.value;
        const key = (0, keyUtils_js_1.getNormalizedKey)(rawKey);
        if (!source.pressed.has(key)) {
            return;
        }
        const code = (0, keyUtils_js_1.getKeyCode)(rawKey);
        const location = (0, keyUtils_js_1.getKeyLocation)(rawKey);
        switch (key) {
            case 'Alt':
                source.alt = false;
                break;
            case 'Shift':
                source.shift = false;
                break;
            case 'Control':
                source.ctrl = false;
                break;
            case 'Meta':
                source.meta = false;
                break;
        }
        source.pressed.delete(key);
        const { modifiers } = source;
        // --- Platform-specific code begins here ---
        // The spread is a little hack so JS gives us an array of unicode characters
        // to measure.
        const unmodifiedText = getKeyEventUnmodifiedText(key, source);
        const text = getKeyEventText(code ?? '', source) ?? unmodifiedText;
        return this.#context.cdpTarget.cdpClient.sendCommand('Input.dispatchKeyEvent', {
            type: 'keyUp',
            windowsVirtualKeyCode: USKeyboardLayout_js_1.KeyToKeyCode[key],
            key,
            code,
            text,
            unmodifiedText,
            location: location < 3 ? location : undefined,
            isSystemKey: source.alt || undefined,
            isKeypad: location === 3,
            modifiers,
        });
        // --- Platform-specific code ends here ---
    }
}
exports.ActionDispatcher = ActionDispatcher;
const getKeyEventUnmodifiedText = (key, source) => {
    if (key === 'Enter') {
        return '\r';
    }
    return [...key].length === 1
        ? source.shift
            ? key.toLocaleUpperCase('en-US')
            : key
        : undefined;
};
const getKeyEventText = (code, source) => {
    if (source.ctrl) {
        switch (code) {
            case 'Digit2':
                if (source.shift) {
                    return '\x00';
                }
                break;
            case 'KeyA':
                return '\x01';
            case 'KeyB':
                return '\x02';
            case 'KeyC':
                return '\x03';
            case 'KeyD':
                return '\x04';
            case 'KeyE':
                return '\x05';
            case 'KeyF':
                return '\x06';
            case 'KeyG':
                return '\x07';
            case 'KeyH':
                return '\x08';
            case 'KeyI':
                return '\x09';
            case 'KeyJ':
                return '\x0A';
            case 'KeyK':
                return '\x0B';
            case 'KeyL':
                return '\x0C';
            case 'KeyM':
                return '\x0D';
            case 'KeyN':
                return '\x0E';
            case 'KeyO':
                return '\x0F';
            case 'KeyP':
                return '\x10';
            case 'KeyQ':
                return '\x11';
            case 'KeyR':
                return '\x12';
            case 'KeyS':
                return '\x13';
            case 'KeyT':
                return '\x14';
            case 'KeyU':
                return '\x15';
            case 'KeyV':
                return '\x16';
            case 'KeyW':
                return '\x17';
            case 'KeyX':
                return '\x18';
            case 'KeyY':
                return '\x19';
            case 'KeyZ':
                return '\x1A';
            case 'BracketLeft':
                return '\x1B';
            case 'Backslash':
                return '\x1C';
            case 'BracketRight':
                return '\x1D';
            case 'Digit6':
                if (source.shift) {
                    return '\x1E';
                }
                break;
            case 'Minus':
                return '\x1F';
        }
        return '';
    }
    if (source.alt) {
        return '';
    }
    return;
};
function getCdpButton(button) {
    switch (button) {
        case 0:
            return 'left';
        case 1:
            return 'middle';
        case 2:
            return 'right';
        case 3:
            return 'back';
        case 4:
            return 'forward';
        default:
            return 'none';
    }
}
//# sourceMappingURL=ActionDispatcher.js.map