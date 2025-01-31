import { calcEasing, clamp, getDistances } from "../../../Utils/NumberUtils";
import { divMode, divModeExecute, isDivModeEnabled, isInArray } from "../../../Utils/Utils";
import { Circle } from "../../../Core/Utils/Circle";
import { Constants } from "../../../Core/Utils/Constants";
import { ExternalInteractorBase } from "../../../Core/Utils/ExternalInteractorBase";
import { Rectangle } from "../../../Core/Utils/Rectangle";
import { Vector } from "../../../Core/Utils/Vector";
export class Repulser extends ExternalInteractorBase {
    constructor(container) {
        super(container);
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        this.handleClickMode = (mode) => {
            const options = this.container.actualOptions;
            if (mode !== "repulse") {
                return;
            }
            if (!container.repulse) {
                container.repulse = { particles: [] };
            }
            container.repulse.clicking = true;
            container.repulse.count = 0;
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
            container.repulse.finish = false;
            setTimeout(() => {
                if (!container.destroyed) {
                    if (!container.repulse) {
                        container.repulse = { particles: [] };
                    }
                    container.repulse.clicking = false;
                }
            }, options.interactivity.modes.repulse.duration * 1000);
        };
    }
    isEnabled() {
        const container = this.container, options = container.actualOptions, mouse = container.interactivity.mouse, events = options.interactivity.events, divs = events.onDiv, divRepulse = isDivModeEnabled("repulse", divs);
        if (!(divRepulse || (events.onHover.enable && mouse.position) || (events.onClick.enable && mouse.clickPosition))) {
            return false;
        }
        const hoverMode = events.onHover.mode, clickMode = events.onClick.mode;
        return isInArray("repulse", hoverMode) || isInArray("repulse", clickMode) || divRepulse;
    }
    reset() {
    }
    async interact() {
        const container = this.container, options = container.actualOptions, mouseMoveStatus = container.interactivity.status === Constants.mouseMoveEvent, events = options.interactivity.events, hoverEnabled = events.onHover.enable, hoverMode = events.onHover.mode, clickEnabled = events.onClick.enable, clickMode = events.onClick.mode, divs = events.onDiv;
        if (mouseMoveStatus && hoverEnabled && isInArray("repulse", hoverMode)) {
            this.hoverRepulse();
        }
        else if (clickEnabled && isInArray("repulse", clickMode)) {
            this.clickRepulse();
        }
        else {
            divModeExecute("repulse", divs, (selector, div) => this.singleSelectorRepulse(selector, div));
        }
    }
    singleSelectorRepulse(selector, div) {
        const container = this.container, query = document.querySelectorAll(selector);
        if (!query.length) {
            return;
        }
        query.forEach((item) => {
            const elem = item, pxRatio = container.retina.pixelRatio, pos = {
                x: (elem.offsetLeft + elem.offsetWidth / 2) * pxRatio,
                y: (elem.offsetTop + elem.offsetHeight / 2) * pxRatio,
            }, repulseRadius = (elem.offsetWidth / 2) * pxRatio, area = div.type === "circle"
                ? new Circle(pos.x, pos.y, repulseRadius)
                : new Rectangle(elem.offsetLeft * pxRatio, elem.offsetTop * pxRatio, elem.offsetWidth * pxRatio, elem.offsetHeight * pxRatio), divs = container.actualOptions.interactivity.modes.repulse.divs, divRepulse = divMode(divs, elem);
            this.processRepulse(pos, repulseRadius, area, divRepulse);
        });
    }
    hoverRepulse() {
        const container = this.container, mousePos = container.interactivity.mouse.position;
        if (!mousePos) {
            return;
        }
        const repulseRadius = container.retina.repulseModeDistance;
        this.processRepulse(mousePos, repulseRadius, new Circle(mousePos.x, mousePos.y, repulseRadius));
    }
    processRepulse(position, repulseRadius, area, divRepulse) {
        var _a;
        const container = this.container, query = container.particles.quadTree.query(area), repulseOptions = container.actualOptions.interactivity.modes.repulse;
        for (const particle of query) {
            const { dx, dy, distance } = getDistances(particle.position, position), velocity = ((_a = divRepulse === null || divRepulse === void 0 ? void 0 : divRepulse.speed) !== null && _a !== void 0 ? _a : repulseOptions.speed) * repulseOptions.factor, repulseFactor = clamp(calcEasing(1 - distance / repulseRadius, repulseOptions.easing) * velocity, 0, repulseOptions.maxSpeed), normVec = Vector.create(distance === 0 ? velocity : (dx / distance) * repulseFactor, distance === 0 ? velocity : (dy / distance) * repulseFactor);
            particle.position.addTo(normVec);
        }
    }
    clickRepulse() {
        const container = this.container;
        if (!container.repulse) {
            container.repulse = { particles: [] };
        }
        if (!container.repulse.finish) {
            if (!container.repulse.count) {
                container.repulse.count = 0;
            }
            container.repulse.count++;
            if (container.repulse.count === container.particles.count) {
                container.repulse.finish = true;
            }
        }
        if (container.repulse.clicking) {
            const repulseDistance = container.retina.repulseModeDistance, repulseRadius = Math.pow(repulseDistance / 6, 3), mouseClickPos = container.interactivity.mouse.clickPosition;
            if (mouseClickPos === undefined) {
                return;
            }
            const range = new Circle(mouseClickPos.x, mouseClickPos.y, repulseRadius), query = container.particles.quadTree.query(range);
            for (const particle of query) {
                const { dx, dy, distance } = getDistances(mouseClickPos, particle.position), d = distance ** 2, velocity = container.actualOptions.interactivity.modes.repulse.speed, force = (-repulseRadius * velocity) / d;
                if (d <= repulseRadius) {
                    container.repulse.particles.push(particle);
                    const vect = Vector.create(dx, dy);
                    vect.length = force;
                    particle.velocity.setTo(vect);
                }
            }
        }
        else if (container.repulse.clicking === false) {
            for (const particle of container.repulse.particles) {
                particle.velocity.setTo(particle.initialVelocity);
            }
            container.repulse.particles = [];
        }
    }
}
