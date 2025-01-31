(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Core/Utils/Circle", "../../../Core/Utils/CircleWarp", "../../../Core/Utils/ParticlesInteractorBase", "../../../Utils/NumberUtils", "../../../Utils/ColorUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Linker = void 0;
    const Circle_1 = require("../../../Core/Utils/Circle");
    const CircleWarp_1 = require("../../../Core/Utils/CircleWarp");
    const ParticlesInteractorBase_1 = require("../../../Core/Utils/ParticlesInteractorBase");
    const NumberUtils_1 = require("../../../Utils/NumberUtils");
    const ColorUtils_1 = require("../../../Utils/ColorUtils");
    function getLinkDistance(pos1, pos2, optDistance, canvasSize, warp) {
        let distance = (0, NumberUtils_1.getDistance)(pos1, pos2);
        if (!warp || distance <= optDistance) {
            return distance;
        }
        const pos2NE = {
            x: pos2.x - canvasSize.width,
            y: pos2.y,
        };
        distance = (0, NumberUtils_1.getDistance)(pos1, pos2NE);
        if (distance <= optDistance) {
            return distance;
        }
        const pos2SE = {
            x: pos2.x - canvasSize.width,
            y: pos2.y - canvasSize.height,
        };
        distance = (0, NumberUtils_1.getDistance)(pos1, pos2SE);
        if (distance <= optDistance) {
            return distance;
        }
        const pos2SW = {
            x: pos2.x,
            y: pos2.y - canvasSize.height,
        };
        distance = (0, NumberUtils_1.getDistance)(pos1, pos2SW);
        return distance;
    }
    class Linker extends ParticlesInteractorBase_1.ParticlesInteractorBase {
        constructor(container) {
            super(container);
        }
        isEnabled(particle) {
            return particle.options.links.enable;
        }
        reset() {
        }
        async interact(p1) {
            var _a;
            p1.links = [];
            const pos1 = p1.getPosition(), container = this.container, canvasSize = container.canvas.size;
            if (pos1.x < 0 || pos1.y < 0 || pos1.x > canvasSize.width || pos1.y > canvasSize.height) {
                return;
            }
            const linkOpt1 = p1.options.links, optOpacity = linkOpt1.opacity, optDistance = (_a = p1.retina.linksDistance) !== null && _a !== void 0 ? _a : container.retina.linksDistance, warp = linkOpt1.warp, range = warp
                ? new CircleWarp_1.CircleWarp(pos1.x, pos1.y, optDistance, canvasSize)
                : new Circle_1.Circle(pos1.x, pos1.y, optDistance), query = container.particles.quadTree.query(range);
            for (const p2 of query) {
                const linkOpt2 = p2.options.links;
                if (p1 === p2 ||
                    !linkOpt2.enable ||
                    linkOpt1.id !== linkOpt2.id ||
                    p2.spawning ||
                    p2.destroyed ||
                    p1.links.map((t) => t.destination).indexOf(p2) !== -1 ||
                    p2.links.map((t) => t.destination).indexOf(p1) !== -1) {
                    continue;
                }
                const pos2 = p2.getPosition();
                if (pos2.x < 0 || pos2.y < 0 || pos2.x > canvasSize.width || pos2.y > canvasSize.height) {
                    continue;
                }
                const distance = getLinkDistance(pos1, pos2, optDistance, canvasSize, warp && linkOpt2.warp);
                if (distance > optDistance) {
                    return;
                }
                const opacityLine = (1 - distance / optDistance) * optOpacity;
                this.setColor(p1);
                p1.links.push({
                    destination: p2,
                    opacity: opacityLine,
                });
            }
        }
        setColor(p1) {
            const container = this.container, linksOptions = p1.options.links;
            let linkColor = linksOptions.id === undefined
                ? container.particles.linksColor
                : container.particles.linksColors.get(linksOptions.id);
            if (!linkColor) {
                const optColor = linksOptions.color;
                linkColor = (0, ColorUtils_1.getLinkRandomColor)(optColor, linksOptions.blink, linksOptions.consent);
                if (linksOptions.id === undefined) {
                    container.particles.linksColor = linkColor;
                }
                else {
                    container.particles.linksColors.set(linksOptions.id, linkColor);
                }
            }
        }
    }
    exports.Linker = Linker;
});
