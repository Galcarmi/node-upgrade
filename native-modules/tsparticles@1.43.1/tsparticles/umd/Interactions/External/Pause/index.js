(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./Pauser"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.loadExternalPauseInteraction = void 0;
    const Pauser_1 = require("./Pauser");
    async function loadExternalPauseInteraction(engine) {
        await engine.addInteractor("externalPause", (container) => new Pauser_1.Pauser(container));
    }
    exports.loadExternalPauseInteraction = loadExternalPauseInteraction;
});
