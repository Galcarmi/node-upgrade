var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmittersPlugin_engine;
import { CircleShape } from "./Shapes/Circle/CircleShape";
import { Emitter } from "./Options/Classes/Emitter";
import { Emitters } from "./Emitters";
import { ShapeManager } from "./ShapeManager";
import { SquareShape } from "./Shapes/Square/SquareShape";
import { isInArray } from "../../Utils/Utils";
/**
 * @category Emitters Plugin
 */
class EmittersPlugin {
    constructor(engine) {
        _EmittersPlugin_engine.set(this, void 0);
        __classPrivateFieldSet(this, _EmittersPlugin_engine, engine, "f");
        this.id = "emitters";
    }
    getPlugin(container) {
        return new Emitters(__classPrivateFieldGet(this, _EmittersPlugin_engine, "f"), container);
    }
    needsPlugin(options) {
        var _a, _b, _c;
        if (options === undefined) {
            return false;
        }
        const emitters = options.emitters;
        return ((emitters instanceof Array && !!emitters.length) ||
            emitters !== undefined ||
            (!!((_c = (_b = (_a = options.interactivity) === null || _a === void 0 ? void 0 : _a.events) === null || _b === void 0 ? void 0 : _b.onClick) === null || _c === void 0 ? void 0 : _c.mode) &&
                isInArray("emitter" /* emitter */, options.interactivity.events.onClick.mode)));
    }
    loadOptions(options, source) {
        var _a, _b;
        if (!this.needsPlugin(options) && !this.needsPlugin(source)) {
            return;
        }
        const optionsCast = options;
        if (source === null || source === void 0 ? void 0 : source.emitters) {
            if ((source === null || source === void 0 ? void 0 : source.emitters) instanceof Array) {
                optionsCast.emitters = source === null || source === void 0 ? void 0 : source.emitters.map((s) => {
                    const tmp = new Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.emitters = emitterOptions = new Emitter();
                }
                emitterOptions.load(source === null || source === void 0 ? void 0 : source.emitters);
            }
        }
        const interactivityEmitters = (_b = (_a = source === null || source === void 0 ? void 0 : source.interactivity) === null || _a === void 0 ? void 0 : _a.modes) === null || _b === void 0 ? void 0 : _b.emitters;
        if (interactivityEmitters) {
            if (interactivityEmitters instanceof Array) {
                optionsCast.interactivity.modes.emitters = interactivityEmitters.map((s) => {
                    const tmp = new Emitter();
                    tmp.load(s);
                    return tmp;
                });
            }
            else {
                let emitterOptions = optionsCast.interactivity.modes.emitters;
                if ((emitterOptions === null || emitterOptions === void 0 ? void 0 : emitterOptions.load) === undefined) {
                    optionsCast.interactivity.modes.emitters = emitterOptions = new Emitter();
                }
                emitterOptions.load(interactivityEmitters);
            }
        }
    }
}
_EmittersPlugin_engine = new WeakMap();
export async function loadEmittersPlugin(engine) {
    if (!engine.emitterShapeManager) {
        engine.emitterShapeManager = new ShapeManager(engine);
    }
    if (!engine.addEmitterShape) {
        engine.addEmitterShape = (name, shape) => {
            var _a;
            (_a = engine.emitterShapeManager) === null || _a === void 0 ? void 0 : _a.addShape(name, shape);
        };
    }
    const plugin = new EmittersPlugin(engine);
    await engine.addPlugin(plugin);
    engine.addEmitterShape("circle" /* circle */, new CircleShape());
    engine.addEmitterShape("square" /* square */, new SquareShape());
}
export * from "./EmittersEngine";
export * from "./Enums/EmitterClickMode";
export * from "./Enums/EmitterShapeType";
export * from "./Options/Interfaces/IEmitterOptions";
