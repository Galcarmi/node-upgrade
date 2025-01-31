import { Vector } from "../Core/Utils/Vector";
/**
 * Clamps a number between a minimum and maximum value
 * @param num the source number
 * @param min the minimum value
 * @param max the maximum value
 */
export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
/**
 *
 * @param comp1
 * @param comp2
 * @param weight1
 * @param weight2
 */
export function mix(comp1, comp2, weight1, weight2) {
    return Math.floor((comp1 * weight1 + comp2 * weight2) / (weight1 + weight2));
}
export function randomInRange(r) {
    const max = getRangeMax(r);
    let min = getRangeMin(r);
    if (max === min) {
        min = 0;
    }
    return Math.random() * (max - min) + min;
}
export function getRangeValue(value) {
    return typeof value === "number" ? value : randomInRange(value);
}
export function getRangeMin(value) {
    return typeof value === "number" ? value : value.min;
}
export function getRangeMax(value) {
    return typeof value === "number" ? value : value.max;
}
export function setRangeValue(source, value) {
    if (source === value || (value === undefined && typeof source === "number")) {
        return source;
    }
    const min = getRangeMin(source), max = getRangeMax(source);
    return value !== undefined
        ? {
            min: Math.min(min, value),
            max: Math.max(max, value),
        }
        : setRangeValue(min, max);
}
export function getValue(options) {
    const random = options.random, { enable, minimumValue } = typeof random === "boolean"
        ? {
            enable: random,
            minimumValue: 0,
        }
        : random;
    return enable ? getRangeValue(setRangeValue(options.value, minimumValue)) : getRangeValue(options.value);
}
/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */
export function getDistances(pointA, pointB) {
    const dx = pointA.x - pointB.x, dy = pointA.y - pointB.y;
    return { dx: dx, dy: dy, distance: Math.sqrt(dx * dx + dy * dy) };
}
/**
 * Gets the distance between two coordinates
 * @param pointA the first coordinate
 * @param pointB the second coordinate
 */
export function getDistance(pointA, pointB) {
    return getDistances(pointA, pointB).distance;
}
export function getParticleDirectionAngle(direction) {
    if (typeof direction === "number") {
        return (direction * Math.PI) / 180;
    }
    else {
        switch (direction) {
            case "top" /* top */:
                return -Math.PI / 2;
            case "top-right" /* topRight */:
                return -Math.PI / 4;
            case "right" /* right */:
                return 0;
            case "bottom-right" /* bottomRight */:
                return Math.PI / 4;
            case "bottom" /* bottom */:
                return Math.PI / 2;
            case "bottom-left" /* bottomLeft */:
                return (3 * Math.PI) / 4;
            case "left" /* left */:
                return Math.PI;
            case "top-left" /* topLeft */:
                return (-3 * Math.PI) / 4;
            case "none" /* none */:
            default:
                return Math.random() * Math.PI * 2;
        }
    }
}
/**
 * Get Particle base velocity
 * @param direction the direction to use for calculating the velocity
 */
export function getParticleBaseVelocity(direction) {
    const baseVelocity = Vector.origin;
    baseVelocity.length = 1;
    baseVelocity.angle = direction;
    return baseVelocity;
}
export function collisionVelocity(v1, v2, m1, m2) {
    return Vector.create((v1.x * (m1 - m2)) / (m1 + m2) + (v2.x * 2 * m2) / (m1 + m2), v1.y);
}
export function calcEasing(value, type) {
    switch (type) {
        case "ease-out-quad" /* easeOutQuad */:
            return 1 - (1 - value) ** 2;
        case "ease-out-cubic" /* easeOutCubic */:
            return 1 - (1 - value) ** 3;
        case "ease-out-quart" /* easeOutQuart */:
            return 1 - (1 - value) ** 4;
        case "ease-out-quint" /* easeOutQuint */:
            return 1 - (1 - value) ** 5;
        case "ease-out-expo" /* easeOutExpo */:
            return value === 1 ? 1 : 1 - Math.pow(2, -10 * value);
        case "ease-out-sine" /* easeOutSine */:
            return Math.sin((value * Math.PI) / 2);
        case "ease-out-back" /* easeOutBack */: {
            const c1 = 1.70158, c3 = c1 + 1;
            return 1 + c3 * Math.pow(value - 1, 3) + c1 * Math.pow(value - 1, 2);
        }
        case "ease-out-circ" /* easeOutCirc */:
            return Math.sqrt(1 - Math.pow(value - 1, 2));
        default:
            return value;
    }
}
/**
 * Gets exact position from percent position based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionFromSize(data) {
    var _a, _b;
    return ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined && ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined
        ? {
            x: (data.position.x * data.size.width) / 100,
            y: (data.position.y * data.size.height) / 100,
        }
        : undefined;
}
/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionOrRandomFromSize(data) {
    var _a, _b, _c, _d;
    return {
        x: (((_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * 100) * data.size.width) / 100,
        y: (((_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * 100) * data.size.height) / 100,
    };
}
/**
 * Gets exact position from percent position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcPositionOrRandomFromSizeRanged(data) {
    var _a, _b;
    const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcPositionOrRandomFromSize({ size: data.size, position });
}
/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcExactPositionOrRandomFromSize(data) {
    var _a, _b, _c, _d;
    return {
        x: (_b = (_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== null && _b !== void 0 ? _b : Math.random() * data.size.width,
        y: (_d = (_c = data.position) === null || _c === void 0 ? void 0 : _c.y) !== null && _d !== void 0 ? _d : Math.random() * data.size.height,
    };
}
/**
 * Gets exact position from exact position, or a random one if not specified, based on the given size
 * @param data the data to use for calculating the position
 * @returns the exact position
 */
export function calcExactPositionOrRandomFromSizeRanged(data) {
    var _a, _b;
    const position = {
        x: ((_a = data.position) === null || _a === void 0 ? void 0 : _a.x) !== undefined ? getRangeValue(data.position.x) : undefined,
        y: ((_b = data.position) === null || _b === void 0 ? void 0 : _b.y) !== undefined ? getRangeValue(data.position.y) : undefined,
    };
    return calcExactPositionOrRandomFromSize({ size: data.size, position });
}
