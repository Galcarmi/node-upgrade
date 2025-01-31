"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadParallaxMover = void 0;
const ParallaxMover_1 = require("./ParallaxMover");
async function loadParallaxMover(engine) {
    engine.addMover("parallax", () => new ParallaxMover_1.ParallaxMover());
}
exports.loadParallaxMover = loadParallaxMover;
