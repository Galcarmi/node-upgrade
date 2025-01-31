"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bounceVertical = exports.bounceHorizontal = void 0;
const NumberUtils_1 = require("../../Utils/NumberUtils");
function bounceHorizontal(data) {
    if (!(data.outMode === "bounce" ||
        data.outMode === "bounce-horizontal" ||
        data.outMode === "bounceHorizontal" ||
        data.outMode === "split")) {
        return;
    }
    const velocity = data.particle.velocity.x;
    let bounced = false;
    if ((data.direction === "right" && data.bounds.right >= data.canvasSize.width && velocity > 0) ||
        (data.direction === "left" && data.bounds.left <= 0 && velocity < 0)) {
        const newVelocity = (0, NumberUtils_1.getRangeValue)(data.particle.options.bounce.horizontal.value);
        data.particle.velocity.x *= -newVelocity;
        bounced = true;
    }
    if (!bounced) {
        return;
    }
    const minPos = data.offset.x + data.size;
    if (data.bounds.right >= data.canvasSize.width) {
        data.particle.position.x = data.canvasSize.width - minPos;
    }
    else if (data.bounds.left <= 0) {
        data.particle.position.x = minPos;
    }
    if (data.outMode === "split") {
        data.particle.destroy();
    }
}
exports.bounceHorizontal = bounceHorizontal;
function bounceVertical(data) {
    if (data.outMode === "bounce" ||
        data.outMode === "bounce-vertical" ||
        data.outMode === "bounceVertical" ||
        data.outMode === "split") {
        const velocity = data.particle.velocity.y;
        let bounced = false;
        if ((data.direction === "bottom" &&
            data.bounds.bottom >= data.canvasSize.height &&
            velocity > 0) ||
            (data.direction === "top" && data.bounds.top <= 0 && velocity < 0)) {
            const newVelocity = (0, NumberUtils_1.getRangeValue)(data.particle.options.bounce.vertical.value);
            data.particle.velocity.y *= -newVelocity;
            bounced = true;
        }
        if (!bounced) {
            return;
        }
        const minPos = data.offset.y + data.size;
        if (data.bounds.bottom >= data.canvasSize.height) {
            data.particle.position.y = data.canvasSize.height - minPos;
        }
        else if (data.bounds.top <= 0) {
            data.particle.position.y = minPos;
        }
        if (data.outMode === "split") {
            data.particle.destroy();
        }
    }
}
exports.bounceVertical = bounceVertical;
