"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveAngle = void 0;
const NumberUtils_1 = require("../../../../Utils/NumberUtils");
class MoveAngle {
    constructor() {
        this.offset = 0;
        this.value = 90;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.offset !== undefined) {
            this.offset = (0, NumberUtils_1.setRangeValue)(data.offset);
        }
        if (data.value !== undefined) {
            this.value = (0, NumberUtils_1.setRangeValue)(data.value);
        }
    }
}
exports.MoveAngle = MoveAngle;
