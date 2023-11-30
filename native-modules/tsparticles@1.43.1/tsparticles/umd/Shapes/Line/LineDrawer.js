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
    exports.LineDrawer = void 0;
    class LineDrawer {
        getSidesCount() {
            return 1;
        }
        draw(context, particle, radius) {
            context.moveTo(-radius / 2, 0);
            context.lineTo(radius / 2, 0);
        }
    }
    exports.LineDrawer = LineDrawer;
});
