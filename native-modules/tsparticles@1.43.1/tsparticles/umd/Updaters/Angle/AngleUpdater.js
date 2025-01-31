(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AngleUpdater = void 0;
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    function updateAngle(particle, delta) {
        var _a;
        const rotate = particle.rotate;
        if (!rotate) {
            return;
        }
        const rotateOptions = particle.options.rotate;
        const rotateAnimation = rotateOptions.animation;
        const speed = ((_a = rotate.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
        const max = 2 * Math.PI;
        if (!rotateAnimation.enable) {
            return;
        }
        switch (rotate.status) {
            case 0:
                rotate.value += speed;
                if (rotate.value > max) {
                    rotate.value -= max;
                }
                break;
            case 1:
            default:
                rotate.value -= speed;
                if (rotate.value < 0) {
                    rotate.value += max;
                }
                break;
        }
    }
    class AngleUpdater {
        constructor(container) {
            this.container = container;
        }
        init(particle) {
            const rotateOptions = particle.options.rotate;
            particle.rotate = {
                enable: rotateOptions.animation.enable,
                value: ((0, NumberUtils_1.getRangeValue)(rotateOptions.value) * Math.PI) / 180,
            };
            let rotateDirection = rotateOptions.direction;
            if (rotateDirection === "random") {
                const index = Math.floor(Math.random() * 2);
                rotateDirection = index > 0 ? "counter-clockwise" : "clockwise";
            }
            switch (rotateDirection) {
                case "counter-clockwise":
                case "counterClockwise":
                    particle.rotate.status = 1;
                    break;
                case "clockwise":
                    particle.rotate.status = 0;
                    break;
            }
            const rotateAnimation = particle.options.rotate.animation;
            if (rotateAnimation.enable) {
                particle.rotate.velocity =
                    ((0, NumberUtils_1.getRangeValue)(rotateAnimation.speed) / 360) * this.container.retina.reduceFactor;
                if (!rotateAnimation.sync) {
                    particle.rotate.velocity *= Math.random();
                }
            }
        }
        isEnabled(particle) {
            const rotate = particle.options.rotate;
            const rotateAnimation = rotate.animation;
            return !particle.destroyed && !particle.spawning && !rotate.path && rotateAnimation.enable;
        }
        update(particle, delta) {
            if (!this.isEnabled(particle)) {
                return;
            }
            updateAngle(particle, delta);
        }
    }
    exports.AngleUpdater = AngleUpdater;
});
