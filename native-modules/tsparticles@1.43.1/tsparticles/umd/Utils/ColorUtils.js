(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./NumberUtils", "../Core/Utils/Constants", "./Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getHslAnimationFromHsl = exports.getHslFromAnimation = exports.getLinkRandomColor = exports.getLinkColor = exports.colorMix = exports.getStyleFromHsv = exports.getStyleFromHsl = exports.getStyleFromRgb = exports.getRandomRgbColor = exports.rgbaToHsva = exports.rgbToHsv = exports.hsvaToRgba = exports.hsvToRgb = exports.hsvaToHsla = exports.hsvToHsl = exports.hslaToHsva = exports.hslToHsv = exports.hslaToRgba = exports.hslToRgb = exports.stringToRgb = exports.stringToAlpha = exports.rgbToHsl = exports.colorToHsl = exports.colorToRgb = void 0;
    const NumberUtils_1 = require("./NumberUtils");
    const Constants_1 = require("../Core/Utils/Constants");
    const Utils_1 = require("./Utils");
    function hue2rgb(p, q, t) {
        let tCalc = t;
        if (tCalc < 0) {
            tCalc += 1;
        }
        if (tCalc > 1) {
            tCalc -= 1;
        }
        if (tCalc < 1 / 6) {
            return p + (q - p) * 6 * tCalc;
        }
        if (tCalc < 1 / 2) {
            return q;
        }
        if (tCalc < 2 / 3) {
            return p + (q - p) * (2 / 3 - tCalc) * 6;
        }
        return p;
    }
    function stringToRgba(input) {
        if (input.startsWith("rgb")) {
            const regex = /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);
            return result
                ? {
                    a: result.length > 4 ? parseFloat(result[5]) : 1,
                    b: parseInt(result[3], 10),
                    g: parseInt(result[2], 10),
                    r: parseInt(result[1], 10),
                }
                : undefined;
        }
        else if (input.startsWith("hsl")) {
            const regex = /hsla?\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);
            return result
                ? hslaToRgba({
                    a: result.length > 4 ? parseFloat(result[5]) : 1,
                    h: parseInt(result[1], 10),
                    l: parseInt(result[3], 10),
                    s: parseInt(result[2], 10),
                })
                : undefined;
        }
        else if (input.startsWith("hsv")) {
            const regex = /hsva?\(\s*(\d+)°\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([\d.]+)\s*)?\)/i;
            const result = regex.exec(input);
            return result
                ? hsvaToRgba({
                    a: result.length > 4 ? parseFloat(result[5]) : 1,
                    h: parseInt(result[1], 10),
                    s: parseInt(result[2], 10),
                    v: parseInt(result[3], 10),
                })
                : undefined;
        }
        else {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;
            const hexFixed = input.replace(shorthandRegex, (_m, r, g, b, a) => {
                return r + r + g + g + b + b + (a !== undefined ? a + a : "");
            });
            const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
            const result = regex.exec(hexFixed);
            return result
                ? {
                    a: result[4] !== undefined ? parseInt(result[4], 16) / 0xff : 1,
                    b: parseInt(result[3], 16),
                    g: parseInt(result[2], 16),
                    r: parseInt(result[1], 16),
                }
                : undefined;
        }
    }
    function colorToRgb(input, index, useIndex = true) {
        var _a, _b, _c;
        if (input === undefined) {
            return;
        }
        const color = typeof input === "string" ? { value: input } : input;
        let res;
        if (typeof color.value === "string") {
            res = color.value === Constants_1.Constants.randomColorValue ? getRandomRgbColor() : stringToRgb(color.value);
        }
        else {
            if (color.value instanceof Array) {
                const colorSelected = (0, Utils_1.itemFromArray)(color.value, index, useIndex);
                res = colorToRgb({ value: colorSelected });
            }
            else {
                const colorValue = color.value, rgbColor = (_a = colorValue.rgb) !== null && _a !== void 0 ? _a : color.value;
                if (rgbColor.r !== undefined) {
                    res = rgbColor;
                }
                else {
                    const hslColor = (_b = colorValue.hsl) !== null && _b !== void 0 ? _b : color.value;
                    if (hslColor.h !== undefined && hslColor.l !== undefined) {
                        res = hslToRgb(hslColor);
                    }
                    else {
                        const hsvColor = (_c = colorValue.hsv) !== null && _c !== void 0 ? _c : color.value;
                        if (hsvColor.h !== undefined && hsvColor.v !== undefined) {
                            res = hsvToRgb(hsvColor);
                        }
                    }
                }
            }
        }
        return res;
    }
    exports.colorToRgb = colorToRgb;
    function colorToHsl(color, index, useIndex = true) {
        const rgb = colorToRgb(color, index, useIndex);
        return rgb !== undefined ? rgbToHsl(rgb) : undefined;
    }
    exports.colorToHsl = colorToHsl;
    function rgbToHsl(color) {
        const r1 = color.r / 255, g1 = color.g / 255, b1 = color.b / 255;
        const max = Math.max(r1, g1, b1), min = Math.min(r1, g1, b1);
        const res = {
            h: 0,
            l: (max + min) / 2,
            s: 0,
        };
        if (max !== min) {
            res.s = res.l < 0.5 ? (max - min) / (max + min) : (max - min) / (2.0 - max - min);
            res.h =
                r1 === max
                    ? (g1 - b1) / (max - min)
                    : (res.h = g1 === max ? 2.0 + (b1 - r1) / (max - min) : 4.0 + (r1 - g1) / (max - min));
        }
        res.l *= 100;
        res.s *= 100;
        res.h *= 60;
        if (res.h < 0) {
            res.h += 360;
        }
        return res;
    }
    exports.rgbToHsl = rgbToHsl;
    function stringToAlpha(input) {
        var _a;
        return (_a = stringToRgba(input)) === null || _a === void 0 ? void 0 : _a.a;
    }
    exports.stringToAlpha = stringToAlpha;
    function stringToRgb(input) {
        return stringToRgba(input);
    }
    exports.stringToRgb = stringToRgb;
    function hslToRgb(hsl) {
        const result = { b: 0, g: 0, r: 0 }, hslPercent = {
            h: hsl.h / 360,
            l: hsl.l / 100,
            s: hsl.s / 100,
        };
        if (hslPercent.s === 0) {
            result.b = hslPercent.l;
            result.g = hslPercent.l;
            result.r = hslPercent.l;
        }
        else {
            const q = hslPercent.l < 0.5
                ? hslPercent.l * (1 + hslPercent.s)
                : hslPercent.l + hslPercent.s - hslPercent.l * hslPercent.s, p = 2 * hslPercent.l - q;
            result.r = hue2rgb(p, q, hslPercent.h + 1 / 3);
            result.g = hue2rgb(p, q, hslPercent.h);
            result.b = hue2rgb(p, q, hslPercent.h - 1 / 3);
        }
        result.r = Math.floor(result.r * 255);
        result.g = Math.floor(result.g * 255);
        result.b = Math.floor(result.b * 255);
        return result;
    }
    exports.hslToRgb = hslToRgb;
    function hslaToRgba(hsla) {
        const rgbResult = hslToRgb(hsla);
        return {
            a: hsla.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }
    exports.hslaToRgba = hslaToRgba;
    function hslToHsv(hsl) {
        const l = hsl.l / 100, sl = hsl.s / 100, v = l + sl * Math.min(l, 1 - l), sv = !v ? 0 : 2 * (1 - l / v);
        return {
            h: hsl.h,
            s: sv * 100,
            v: v * 100,
        };
    }
    exports.hslToHsv = hslToHsv;
    function hslaToHsva(hsla) {
        const hsvResult = hslToHsv(hsla);
        return {
            a: hsla.a,
            h: hsvResult.h,
            s: hsvResult.s,
            v: hsvResult.v,
        };
    }
    exports.hslaToHsva = hslaToHsva;
    function hsvToHsl(hsv) {
        const v = hsv.v / 100, sv = hsv.s / 100, l = v * (1 - sv / 2), sl = l === 0 || l === 1 ? 0 : (v - l) / Math.min(l, 1 - l);
        return {
            h: hsv.h,
            l: l * 100,
            s: sl * 100,
        };
    }
    exports.hsvToHsl = hsvToHsl;
    function hsvaToHsla(hsva) {
        const hslResult = hsvToHsl(hsva);
        return {
            a: hsva.a,
            h: hslResult.h,
            l: hslResult.l,
            s: hslResult.s,
        };
    }
    exports.hsvaToHsla = hsvaToHsla;
    function hsvToRgb(hsv) {
        const result = { b: 0, g: 0, r: 0 }, hsvPercent = {
            h: hsv.h / 60,
            s: hsv.s / 100,
            v: hsv.v / 100,
        };
        const c = hsvPercent.v * hsvPercent.s, x = c * (1 - Math.abs((hsvPercent.h % 2) - 1));
        let tempRgb;
        if (hsvPercent.h >= 0 && hsvPercent.h <= 1) {
            tempRgb = {
                r: c,
                g: x,
                b: 0,
            };
        }
        else if (hsvPercent.h > 1 && hsvPercent.h <= 2) {
            tempRgb = {
                r: x,
                g: c,
                b: 0,
            };
        }
        else if (hsvPercent.h > 2 && hsvPercent.h <= 3) {
            tempRgb = {
                r: 0,
                g: c,
                b: x,
            };
        }
        else if (hsvPercent.h > 3 && hsvPercent.h <= 4) {
            tempRgb = {
                r: 0,
                g: x,
                b: c,
            };
        }
        else if (hsvPercent.h > 4 && hsvPercent.h <= 5) {
            tempRgb = {
                r: x,
                g: 0,
                b: c,
            };
        }
        else if (hsvPercent.h > 5 && hsvPercent.h <= 6) {
            tempRgb = {
                r: c,
                g: 0,
                b: x,
            };
        }
        if (tempRgb) {
            const m = hsvPercent.v - c;
            result.r = Math.floor((tempRgb.r + m) * 255);
            result.g = Math.floor((tempRgb.g + m) * 255);
            result.b = Math.floor((tempRgb.b + m) * 255);
        }
        return result;
    }
    exports.hsvToRgb = hsvToRgb;
    function hsvaToRgba(hsva) {
        const rgbResult = hsvToRgb(hsva);
        return {
            a: hsva.a,
            b: rgbResult.b,
            g: rgbResult.g,
            r: rgbResult.r,
        };
    }
    exports.hsvaToRgba = hsvaToRgba;
    function rgbToHsv(rgb) {
        const rgbPercent = {
            r: rgb.r / 255,
            g: rgb.g / 255,
            b: rgb.b / 255,
        }, xMax = Math.max(rgbPercent.r, rgbPercent.g, rgbPercent.b), xMin = Math.min(rgbPercent.r, rgbPercent.g, rgbPercent.b), v = xMax, c = xMax - xMin;
        let h = 0;
        if (v === rgbPercent.r) {
            h = 60 * ((rgbPercent.g - rgbPercent.b) / c);
        }
        else if (v === rgbPercent.g) {
            h = 60 * (2 + (rgbPercent.b - rgbPercent.r) / c);
        }
        else if (v === rgbPercent.b) {
            h = 60 * (4 + (rgbPercent.r - rgbPercent.g) / c);
        }
        const s = !v ? 0 : c / v;
        return {
            h,
            s: s * 100,
            v: v * 100,
        };
    }
    exports.rgbToHsv = rgbToHsv;
    function rgbaToHsva(rgba) {
        const hsvResult = rgbToHsv(rgba);
        return {
            a: rgba.a,
            h: hsvResult.h,
            s: hsvResult.s,
            v: hsvResult.v,
        };
    }
    exports.rgbaToHsva = rgbaToHsva;
    function getRandomRgbColor(min) {
        const fixedMin = min !== null && min !== void 0 ? min : 0;
        return {
            b: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
            g: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
            r: Math.floor((0, NumberUtils_1.randomInRange)((0, NumberUtils_1.setRangeValue)(fixedMin, 256))),
        };
    }
    exports.getRandomRgbColor = getRandomRgbColor;
    function getStyleFromRgb(color, opacity) {
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    exports.getStyleFromRgb = getStyleFromRgb;
    function getStyleFromHsl(color, opacity) {
        return `hsla(${color.h}, ${color.s}%, ${color.l}%, ${opacity !== null && opacity !== void 0 ? opacity : 1})`;
    }
    exports.getStyleFromHsl = getStyleFromHsl;
    function getStyleFromHsv(color, opacity) {
        return getStyleFromHsl(hsvToHsl(color), opacity);
    }
    exports.getStyleFromHsv = getStyleFromHsv;
    function colorMix(color1, color2, size1, size2) {
        let rgb1 = color1, rgb2 = color2;
        if (rgb1.r === undefined) {
            rgb1 = hslToRgb(color1);
        }
        if (rgb2.r === undefined) {
            rgb2 = hslToRgb(color2);
        }
        return {
            b: (0, NumberUtils_1.mix)(rgb1.b, rgb2.b, size1, size2),
            g: (0, NumberUtils_1.mix)(rgb1.g, rgb2.g, size1, size2),
            r: (0, NumberUtils_1.mix)(rgb1.r, rgb2.r, size1, size2),
        };
    }
    exports.colorMix = colorMix;
    function getLinkColor(p1, p2, linkColor) {
        var _a, _b;
        if (linkColor === Constants_1.Constants.randomColorValue) {
            return getRandomRgbColor();
        }
        else if (linkColor === "mid") {
            const sourceColor = (_a = p1.getFillColor()) !== null && _a !== void 0 ? _a : p1.getStrokeColor(), destColor = (_b = p2 === null || p2 === void 0 ? void 0 : p2.getFillColor()) !== null && _b !== void 0 ? _b : p2 === null || p2 === void 0 ? void 0 : p2.getStrokeColor();
            if (sourceColor && destColor && p2) {
                return colorMix(sourceColor, destColor, p1.getRadius(), p2.getRadius());
            }
            else {
                const hslColor = sourceColor !== null && sourceColor !== void 0 ? sourceColor : destColor;
                if (hslColor) {
                    return hslToRgb(hslColor);
                }
            }
        }
        else {
            return linkColor;
        }
    }
    exports.getLinkColor = getLinkColor;
    function getLinkRandomColor(optColor, blink, consent) {
        const color = typeof optColor === "string" ? optColor : optColor.value;
        if (color === Constants_1.Constants.randomColorValue) {
            if (consent) {
                return colorToRgb({
                    value: color,
                });
            }
            else if (blink) {
                return Constants_1.Constants.randomColorValue;
            }
            else {
                return Constants_1.Constants.midColorValue;
            }
        }
        else {
            return colorToRgb({
                value: color,
            });
        }
    }
    exports.getLinkRandomColor = getLinkRandomColor;
    function getHslFromAnimation(animation) {
        return animation !== undefined
            ? {
                h: animation.h.value,
                s: animation.s.value,
                l: animation.l.value,
            }
            : undefined;
    }
    exports.getHslFromAnimation = getHslFromAnimation;
    function getHslAnimationFromHsl(hsl, animationOptions, reduceFactor) {
        const resColor = {
            h: {
                enable: false,
                value: hsl.h,
            },
            s: {
                enable: false,
                value: hsl.s,
            },
            l: {
                enable: false,
                value: hsl.l,
            },
        };
        if (animationOptions) {
            setColorAnimation(resColor.h, animationOptions.h, reduceFactor);
            setColorAnimation(resColor.s, animationOptions.s, reduceFactor);
            setColorAnimation(resColor.l, animationOptions.l, reduceFactor);
        }
        return resColor;
    }
    exports.getHslAnimationFromHsl = getHslAnimationFromHsl;
    function setColorAnimation(colorValue, colorAnimation, reduceFactor) {
        colorValue.enable = colorAnimation.enable;
        if (colorValue.enable) {
            colorValue.velocity = ((0, NumberUtils_1.getRangeValue)(colorAnimation.speed) / 100) * reduceFactor;
            if (colorAnimation.sync) {
                return;
            }
            colorValue.status = 0;
            colorValue.velocity *= Math.random();
            if (colorValue.value) {
                colorValue.value *= Math.random();
            }
        }
        else {
            colorValue.velocity = 0;
        }
    }
});
