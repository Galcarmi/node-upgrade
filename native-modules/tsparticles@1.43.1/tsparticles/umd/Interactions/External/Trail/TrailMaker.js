(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Core/Utils/ExternalInteractorBase", "../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TrailMaker = void 0;
    const ExternalInteractorBase_1 = require("../../../Core/Utils/ExternalInteractorBase");
    const Utils_1 = require("../../../Utils/Utils");
    class TrailMaker extends ExternalInteractorBase_1.ExternalInteractorBase {
        constructor(container) {
            super(container);
            this.delay = 0;
        }
        async interact(delta) {
            var _a, _b, _c, _d;
            if (!this.container.retina.reduceFactor) {
                return;
            }
            const container = this.container, options = container.actualOptions, trailOptions = options.interactivity.modes.trail, optDelay = (trailOptions.delay * 1000) / this.container.retina.reduceFactor;
            if (this.delay < optDelay) {
                this.delay += delta.value;
            }
            if (this.delay < optDelay) {
                return;
            }
            let canEmit = true;
            if (trailOptions.pauseOnStop) {
                if (container.interactivity.mouse.position === this.lastPosition ||
                    (((_a = container.interactivity.mouse.position) === null || _a === void 0 ? void 0 : _a.x) === ((_b = this.lastPosition) === null || _b === void 0 ? void 0 : _b.x) &&
                        ((_c = container.interactivity.mouse.position) === null || _c === void 0 ? void 0 : _c.y) === ((_d = this.lastPosition) === null || _d === void 0 ? void 0 : _d.y))) {
                    canEmit = false;
                }
            }
            if (container.interactivity.mouse.position) {
                this.lastPosition = {
                    x: container.interactivity.mouse.position.x,
                    y: container.interactivity.mouse.position.y,
                };
            }
            else {
                delete this.lastPosition;
            }
            if (canEmit) {
                container.particles.push(trailOptions.quantity, container.interactivity.mouse, trailOptions.particles);
            }
            this.delay -= optDelay;
        }
        isEnabled() {
            const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events;
            return ((mouse.clicking && mouse.inside && !!mouse.position && (0, Utils_1.isInArray)("trail", events.onClick.mode)) ||
                (mouse.inside && !!mouse.position && (0, Utils_1.isInArray)("trail", events.onHover.mode)));
        }
        reset() {
        }
    }
    exports.TrailMaker = TrailMaker;
});
