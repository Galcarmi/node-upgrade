"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Opacity = void 0;
const OpacityAnimation_1 = require("./OpacityAnimation");
const ValueWithRandom_1 = require("../../ValueWithRandom");
class Opacity extends ValueWithRandom_1.ValueWithRandom {
    constructor() {
        super();
        this.animation = new OpacityAnimation_1.OpacityAnimation();
        this.random.minimumValue = 0.1;
        this.value = 1;
    }
    get anim() {
        return this.animation;
    }
    set anim(value) {
        this.animation = value;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        super.load(data);
        this.animation.load((_a = data.animation) !== null && _a !== void 0 ? _a : data.anim);
    }
}
exports.Opacity = Opacity;
