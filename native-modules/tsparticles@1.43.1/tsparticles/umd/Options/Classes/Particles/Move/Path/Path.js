(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./PathDelay", "../../../../../Utils/Utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Path = void 0;
    const PathDelay_1 = require("./PathDelay");
    const Utils_1 = require("../../../../../Utils/Utils");
    class Path {
        constructor() {
            this.clamp = true;
            this.delay = new PathDelay_1.PathDelay();
            this.enable = false;
            this.options = {};
        }
        load(data) {
            if (data === undefined) {
                return;
            }
            if (data.clamp !== undefined) {
                this.clamp = data.clamp;
            }
            this.delay.load(data.delay);
            if (data.enable !== undefined) {
                this.enable = data.enable;
            }
            this.generator = data.generator;
            if (data.options) {
                this.options = (0, Utils_1.deepExtend)(this.options, data.options);
            }
        }
    }
    exports.Path = Path;
});
