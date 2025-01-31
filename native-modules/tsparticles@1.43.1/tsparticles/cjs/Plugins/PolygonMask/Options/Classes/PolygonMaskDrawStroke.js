"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PolygonMaskDrawStroke = void 0;
const OptionsColor_1 = require("../../../../Options/Classes/OptionsColor");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
class PolygonMaskDrawStroke {
    constructor() {
        this.color = new OptionsColor_1.OptionsColor();
        this.width = 0.5;
        this.opacity = 1;
    }
    load(data) {
        var _a;
        if (!data) {
            return;
        }
        this.color = OptionsColor_1.OptionsColor.create(this.color, data.color);
        if (typeof this.color.value === "string") {
            this.opacity = (_a = (0, ColorUtils_1.stringToAlpha)(this.color.value)) !== null && _a !== void 0 ? _a : this.opacity;
        }
        if (data.opacity !== undefined) {
            this.opacity = data.opacity;
        }
        if (data.width !== undefined) {
            this.width = data.width;
        }
    }
}
exports.PolygonMaskDrawStroke = PolygonMaskDrawStroke;
