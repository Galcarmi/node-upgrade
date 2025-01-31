(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./BaseMover"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadBaseMover = void 0;
    const BaseMover_1 = require("./BaseMover");
    async function loadBaseMover(engine) {
        engine.addMover("base", () => new BaseMover_1.BaseMover());
    }
    exports.loadBaseMover = loadBaseMover;
});
