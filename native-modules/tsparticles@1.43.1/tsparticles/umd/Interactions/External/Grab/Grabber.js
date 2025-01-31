(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Utils/ColorUtils", "../../../Core/Utils/Constants", "../../../Core/Utils/ExternalInteractorBase", "../../../Utils/NumberUtils", "../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Grabber = void 0;
    const ColorUtils_1 = require("../../../Utils/ColorUtils");
    const Constants_1 = require("../../../Core/Utils/Constants");
    const ExternalInteractorBase_1 = require("../../../Core/Utils/ExternalInteractorBase");
    const NumberUtils_1 = require("../../../Utils/NumberUtils");
    const Utils_1 = require("../../../Utils/Utils");
    class Grabber extends ExternalInteractorBase_1.ExternalInteractorBase {
        constructor(container) {
            super(container);
        }
        isEnabled() {
            const container = this.container, mouse = container.interactivity.mouse, events = container.actualOptions.interactivity.events;
            return events.onHover.enable && !!mouse.position && (0, Utils_1.isInArray)("grab", events.onHover.mode);
        }
        reset() {
        }
        async interact() {
            var _a;
            const container = this.container, options = container.actualOptions, interactivity = options.interactivity;
            if (!interactivity.events.onHover.enable || container.interactivity.status !== Constants_1.Constants.mouseMoveEvent) {
                return;
            }
            const mousePos = container.interactivity.mouse.position;
            if (!mousePos) {
                return;
            }
            const distance = container.retina.grabModeDistance, query = container.particles.quadTree.queryCircle(mousePos, distance);
            for (const particle of query) {
                const pos = particle.getPosition(), pointDistance = (0, NumberUtils_1.getDistance)(pos, mousePos);
                if (pointDistance > distance) {
                    continue;
                }
                const grabLineOptions = interactivity.modes.grab.links, lineOpacity = grabLineOptions.opacity, opacityLine = lineOpacity - (pointDistance * lineOpacity) / distance;
                if (opacityLine <= 0) {
                    continue;
                }
                const optColor = (_a = grabLineOptions.color) !== null && _a !== void 0 ? _a : particle.options.links.color;
                if (!container.particles.grabLineColor) {
                    const linksOptions = options.interactivity.modes.grab.links;
                    container.particles.grabLineColor = (0, ColorUtils_1.getLinkRandomColor)(optColor, linksOptions.blink, linksOptions.consent);
                }
                const colorLine = (0, ColorUtils_1.getLinkColor)(particle, undefined, container.particles.grabLineColor);
                if (!colorLine) {
                    return;
                }
                container.canvas.drawGrabLine(particle, colorLine, opacityLine, mousePos);
            }
        }
    }
    exports.Grabber = Grabber;
});
