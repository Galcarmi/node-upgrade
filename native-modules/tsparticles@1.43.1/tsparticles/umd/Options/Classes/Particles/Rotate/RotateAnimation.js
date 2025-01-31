(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../../../Utils/NumberUtils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateAnimation = void 0;
    const NumberUtils_1 = require("../../../../Utils/NumberUtils");
    class RotateAnimation {
        constructor() {
            this.enable = false;
            this.speed = 0;
            this.sync = false;
        }
        load(data) {
            if (data === undefined) {
                return;
            }
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            if (data.speed !== undefined) {
                this.speed = (0, NumberUtils_1.setRangeValue)(data.speed);
            }
            if (data.sync !== undefined) {
                this.sync = data.sync;
            }
        }
    }
    exports.RotateAnimation = RotateAnimation;
});
