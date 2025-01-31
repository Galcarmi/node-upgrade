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
    exports.TiltUpdater = void 0;
    const NumberUtils_1 = require("../../Utils/NumberUtils");
    function updateTilt(particle, delta) {
        var _a;
        if (!particle.tilt) {
            return;
        }
        const tilt = particle.options.tilt;
        const tiltAnimation = tilt.animation;
        const speed = ((_a = particle.tilt.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
        const max = 2 * Math.PI;
        if (!tiltAnimation.enable) {
            return;
        }
        switch (particle.tilt.status) {
            case 0:
                particle.tilt.value += speed;
                if (particle.tilt.value > max) {
                    particle.tilt.value -= max;
                }
                break;
            case 1:
            default:
                particle.tilt.value -= speed;
                if (particle.tilt.value < 0) {
                    particle.tilt.value += max;
                }
                break;
        }
    }
    class TiltUpdater {
        constructor(container) {
            this.container = container;
        }
        init(particle) {
            const tiltOptions = particle.options.tilt;
            particle.tilt = {
                enable: tiltOptions.enable,
                value: ((0, NumberUtils_1.getRangeValue)(tiltOptions.value) * Math.PI) / 180,
                sinDirection: Math.random() >= 0.5 ? 1 : -1,
                cosDirection: Math.random() >= 0.5 ? 1 : -1,
            };
            let tiltDirection = tiltOptions.direction;
            if (tiltDirection === "random") {
                const index = Math.floor(Math.random() * 2);
                tiltDirection = index > 0 ? "counter-clockwise" : "clockwise";
            }
            switch (tiltDirection) {
                case "counter-clockwise":
                case "counterClockwise":
                    particle.tilt.status = 1;
                    break;
                case "clockwise":
                    particle.tilt.status = 0;
                    break;
            }
            const tiltAnimation = particle.options.tilt.animation;
            if (tiltAnimation.enable) {
                particle.tilt.velocity = ((0, NumberUtils_1.getRangeValue)(tiltAnimation.speed) / 360) * this.container.retina.reduceFactor;
                if (!tiltAnimation.sync) {
                    particle.tilt.velocity *= Math.random();
                }
            }
        }
        isEnabled(particle) {
            const tilt = particle.options.tilt;
            const tiltAnimation = tilt.animation;
            return !particle.destroyed && !particle.spawning && tiltAnimation.enable;
        }
        update(particle, delta) {
            if (!this.isEnabled(particle)) {
                return;
            }
            updateTilt(particle, delta);
        }
    }
    exports.TiltUpdater = TiltUpdater;
});
