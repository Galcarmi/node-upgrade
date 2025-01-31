(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CircleShape = void 0;
    class CircleShape {
        randomPosition(position, size, fill) {
            const generateTheta = (x, y) => {
                const u = Math.random() / 4.0, theta = Math.atan((y / x) * Math.tan(2 * Math.PI * u)), v = Math.random();
                if (v < 0.25) {
                    return theta;
                }
                else if (v < 0.5) {
                    return Math.PI - theta;
                }
                else if (v < 0.75) {
                    return Math.PI + theta;
                }
                else {
                    return -theta;
                }
            }, radius = (x, y, theta) => (x * y) / Math.sqrt((y * Math.cos(theta)) ** 2 + (x * Math.sin(theta)) ** 2), [a, b] = [size.width / 2, size.height / 2], randomTheta = generateTheta(a, b), maxRadius = radius(a, b, randomTheta), randomRadius = fill ? maxRadius * Math.sqrt(Math.random()) : maxRadius;
            return {
                x: position.x + randomRadius * Math.cos(randomTheta),
                y: position.y + randomRadius * Math.sin(randomTheta),
            };
        }
    }
    exports.CircleShape = CircleShape;
});
