import { clamp } from "../../Utils/NumberUtils";
function checkDestroy(particle, value, minValue, maxValue) {
    switch (particle.options.size.animation.destroy) {
        case "max" /* max */:
            if (value >= maxValue) {
                particle.destroy();
            }
            break;
        case "min" /* min */:
            if (value <= minValue) {
                particle.destroy();
            }
            break;
    }
}
function updateSize(particle, delta) {
    var _a, _b, _c, _d;
    const sizeVelocity = ((_a = particle.size.velocity) !== null && _a !== void 0 ? _a : 0) * delta.factor;
    const minValue = particle.size.min;
    const maxValue = particle.size.max;
    if (particle.destroyed ||
        !particle.size.enable ||
        (((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) > ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0))) {
        return;
    }
    switch (particle.size.status) {
        case 0 /* increasing */:
            if (particle.size.value >= maxValue) {
                particle.size.status = 1 /* decreasing */;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value += sizeVelocity;
            }
            break;
        case 1 /* decreasing */:
            if (particle.size.value <= minValue) {
                particle.size.status = 0 /* increasing */;
                if (!particle.size.loops) {
                    particle.size.loops = 0;
                }
                particle.size.loops++;
            }
            else {
                particle.size.value -= sizeVelocity;
            }
    }
    checkDestroy(particle, particle.size.value, minValue, maxValue);
    if (!particle.destroyed) {
        particle.size.value = clamp(particle.size.value, minValue, maxValue);
    }
}
export class SizeUpdater {
    init() {
        // nothing
    }
    isEnabled(particle) {
        var _a, _b, _c, _d;
        return (!particle.destroyed &&
            !particle.spawning &&
            particle.size.enable &&
            (((_a = particle.size.maxLoops) !== null && _a !== void 0 ? _a : 0) <= 0 ||
                (((_b = particle.size.maxLoops) !== null && _b !== void 0 ? _b : 0) > 0 && ((_c = particle.size.loops) !== null && _c !== void 0 ? _c : 0) < ((_d = particle.size.maxLoops) !== null && _d !== void 0 ? _d : 0))));
    }
    update(particle, delta) {
        if (!this.isEnabled(particle)) {
            return;
        }
        updateSize(particle, delta);
    }
}
