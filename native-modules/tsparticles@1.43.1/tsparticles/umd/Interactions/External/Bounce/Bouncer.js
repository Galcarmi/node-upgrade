(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../Utils/Utils", "../../../Core/Utils/Circle", "../../../Core/Utils/Constants", "../../../Core/Utils/ExternalInteractorBase", "../../../Core/Utils/Rectangle", "../../../Core/Utils/Vector"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bouncer = void 0;
    const Utils_1 = require("../../../Utils/Utils");
    const Circle_1 = require("../../../Core/Utils/Circle");
    const Constants_1 = require("../../../Core/Utils/Constants");
    const ExternalInteractorBase_1 = require("../../../Core/Utils/ExternalInteractorBase");
    const Rectangle_1 = require("../../../Core/Utils/Rectangle");
    const Vector_1 = require("../../../Core/Utils/Vector");
    class Bouncer extends ExternalInteractorBase_1.ExternalInteractorBase {
        constructor(container) {
            super(container);
        }
        isEnabled() {
            const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv;
            return ((mouse.position && events.onHover.enable && (0, Utils_1.isInArray)("bounce", events.onHover.mode)) ||
                (0, Utils_1.isDivModeEnabled)("bounce", divs));
        }
        async interact() {
            const container = this.container, options = container.actualOptions, events = options.interactivity.events, mouseMoveStatus = container.interactivity.status === Constants_1.Constants.mouseMoveEvent, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, divs = events.onDiv;
            if (mouseMoveStatus && hoverEnabled && (0, Utils_1.isInArray)("bounce", hoverMode)) {
                this.processMouseBounce();
            }
            else {
                (0, Utils_1.divModeExecute)("bounce", divs, (selector, div) => this.singleSelectorBounce(selector, div));
            }
        }
        reset() {
        }
        processMouseBounce() {
            const container = this.container, pxRatio = container.retina.pixelRatio, tolerance = 10 * pxRatio, mousePos = container.interactivity.mouse.position, radius = container.retina.bounceModeDistance;
            if (mousePos) {
                this.processBounce(mousePos, radius, new Circle_1.Circle(mousePos.x, mousePos.y, radius + tolerance));
            }
        }
        singleSelectorBounce(selector, div) {
            const container = this.container, query = document.querySelectorAll(selector);
            if (!query.length) {
                return;
            }
            query.forEach((item) => {
                const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                    x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                    y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
                }, radius = (elem.offsetWidth / 2) * pxRatio, tolerance = 10 * pxRatio, area = div.type === "circle"
                    ? new Circle_1.Circle(pos.x, pos.y, radius + tolerance)
                    : new Rectangle_1.Rectangle(elem.offsetLeft * pxRatio - tolerance, elem.offsetTop * pxRatio - tolerance, elem.offsetWidth * pxRatio + tolerance * 2, elem.offsetHeight * pxRatio + tolerance * 2);
                this.processBounce(pos, radius, area);
            });
        }
        processBounce(position, radius, area) {
            const query = this.container.particles.quadTree.query(area);
            for (const particle of query) {
                if (area instanceof Circle_1.Circle) {
                    (0, Utils_1.circleBounce)((0, Utils_1.circleBounceDataFromParticle)(particle), {
                        position,
                        radius,
                        mass: (radius ** 2 * Math.PI) / 2,
                        velocity: Vector_1.Vector.origin,
                        factor: Vector_1.Vector.origin,
                    });
                }
                else if (area instanceof Rectangle_1.Rectangle) {
                    (0, Utils_1.rectBounce)(particle, (0, Utils_1.calculateBounds)(position, radius));
                }
            }
        }
    }
    exports.Bouncer = Bouncer;
});
