import { clear, drawConnectLine, drawGrabLine, drawParticle, drawParticlePlugin, drawPlugin, gradient, paintBase, } from "../Utils/CanvasUtils";
import { colorToHsl, colorToRgb, getStyleFromHsl, getStyleFromRgb } from "../Utils/ColorUtils";
import { Constants } from "./Utils/Constants";
import { deepExtend } from "../Utils/Utils";
/**
 * Canvas manager
 * @category Core
 */
export class Canvas {
    /**
     * Constructor of canvas manager
     * @param container the parent container
     */
    constructor(container) {
        this.container = container;
        this.size = {
            height: 0,
            width: 0,
        };
        this.context = null;
        this.generatedCanvas = false;
    }
    /* ---------- tsParticles functions - canvas ------------ */
    /**
     * Initializes the canvas element
     */
    init() {
        this.resize();
        this.initStyle();
        this.initCover();
        this.initTrail();
        this.initBackground();
        this.paint();
    }
    loadCanvas(canvas) {
        var _a;
        if (this.generatedCanvas) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.generatedCanvas =
            canvas.dataset && Constants.generatedAttribute in canvas.dataset
                ? canvas.dataset[Constants.generatedAttribute] === "true"
                : this.generatedCanvas;
        this.element = canvas;
        this.originalStyle = deepExtend({}, this.element.style);
        this.size.height = canvas.offsetHeight;
        this.size.width = canvas.offsetWidth;
        this.context = this.element.getContext("2d");
        this.container.retina.init();
        this.initBackground();
    }
    destroy() {
        var _a;
        if (this.generatedCanvas) {
            (_a = this.element) === null || _a === void 0 ? void 0 : _a.remove();
        }
        this.draw((ctx) => {
            clear(ctx, this.size);
        });
    }
    /**
     * Paints the canvas background
     */
    paint() {
        const options = this.container.actualOptions;
        this.draw((ctx) => {
            if (options.backgroundMask.enable && options.backgroundMask.cover) {
                clear(ctx, this.size);
                this.paintBase(this.coverColorStyle);
            }
            else {
                this.paintBase();
            }
        });
    }
    /**
     * Clears the canvas content
     */
    clear() {
        const options = this.container.actualOptions, trail = options.particles.move.trail;
        if (options.backgroundMask.enable) {
            this.paint();
        }
        else if (trail.enable && trail.length > 0 && this.trailFillColor) {
            this.paintBase(getStyleFromRgb(this.trailFillColor, 1 / trail.length));
        }
        else {
            this.draw((ctx) => {
                clear(ctx, this.size);
            });
        }
    }
    async windowResize() {
        if (!this.element) {
            return;
        }
        this.resize();
        const container = this.container, needsRefresh = container.updateActualOptions();
        /* density particles enabled */
        container.particles.setDensity();
        for (const [, plugin] of container.plugins) {
            if (plugin.resize !== undefined) {
                plugin.resize();
            }
        }
        if (needsRefresh) {
            await container.refresh();
        }
    }
    /**
     * Calculates the size of the canvas
     */
    resize() {
        if (!this.element) {
            return;
        }
        const container = this.container, pxRatio = container.retina.pixelRatio, size = container.canvas.size, newSize = {
            width: this.element.offsetWidth * pxRatio,
            height: this.element.offsetHeight * pxRatio,
        };
        if (newSize.height === size.height &&
            newSize.width === size.width &&
            newSize.height === this.element.height &&
            newSize.width === this.element.width) {
            return;
        }
        const oldSize = Object.assign({}, size);
        this.element.width = size.width = this.element.offsetWidth * pxRatio;
        this.element.height = size.height = this.element.offsetHeight * pxRatio;
        if (this.container.started) {
            this.resizeFactor = {
                width: size.width / oldSize.width,
                height: size.height / oldSize.height,
            };
        }
    }
    drawConnectLine(p1, p2) {
        this.draw((ctx) => {
            var _a;
            const lineStyle = this.lineStyle(p1, p2);
            if (!lineStyle) {
                return;
            }
            const pos1 = p1.getPosition(), pos2 = p2.getPosition();
            drawConnectLine(ctx, (_a = p1.retina.linksWidth) !== null && _a !== void 0 ? _a : this.container.retina.linksWidth, lineStyle, pos1, pos2);
        });
    }
    drawGrabLine(particle, lineColor, opacity, mousePos) {
        const container = this.container;
        this.draw((ctx) => {
            var _a;
            const beginPos = particle.getPosition();
            drawGrabLine(ctx, (_a = particle.retina.linksWidth) !== null && _a !== void 0 ? _a : container.retina.linksWidth, beginPos, mousePos, lineColor, opacity);
        });
    }
    drawParticle(particle, delta) {
        var _a, _b, _c, _d, _e, _f;
        if (particle.spawning || particle.destroyed) {
            return;
        }
        const radius = particle.getRadius();
        if (radius <= 0) {
            return;
        }
        const pfColor = particle.getFillColor(), psColor = (_a = particle.getStrokeColor()) !== null && _a !== void 0 ? _a : pfColor;
        if (!pfColor && !psColor) {
            return;
        }
        let [fColor, sColor] = this.getPluginParticleColors(particle);
        if (!fColor || !sColor) {
            if (!fColor) {
                fColor = pfColor ? pfColor : undefined;
            }
            if (!sColor) {
                sColor = psColor ? psColor : undefined;
            }
        }
        const options = this.container.actualOptions, zIndexOptions = particle.options.zIndex, zOpacityFactor = (1 - particle.zIndexFactor) ** zIndexOptions.opacityRate, opacity = (_d = (_b = particle.bubble.opacity) !== null && _b !== void 0 ? _b : (_c = particle.opacity) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 1, strokeOpacity = (_f = (_e = particle.stroke) === null || _e === void 0 ? void 0 : _e.opacity) !== null && _f !== void 0 ? _f : opacity, zOpacity = opacity * zOpacityFactor, zStrokeOpacity = strokeOpacity * zOpacityFactor;
        const colorStyles = {
            fill: fColor ? getStyleFromHsl(fColor, zOpacity) : undefined,
        };
        colorStyles.stroke = sColor ? getStyleFromHsl(sColor, zStrokeOpacity) : colorStyles.fill;
        this.draw((ctx) => {
            const zSizeFactor = (1 - particle.zIndexFactor) ** zIndexOptions.sizeRate, container = this.container;
            for (const updater of container.particles.updaters) {
                if (updater.beforeDraw) {
                    updater.beforeDraw(particle);
                }
                if (updater.getColorStyles) {
                    const { fill, stroke } = updater.getColorStyles(particle, ctx, radius, zOpacity);
                    if (fill) {
                        colorStyles.fill = fill;
                    }
                    if (stroke) {
                        colorStyles.stroke = stroke;
                    }
                }
            }
            drawParticle(container, ctx, particle, delta, colorStyles, options.backgroundMask.enable, options.backgroundMask.composite, radius * zSizeFactor, zOpacity, particle.options.shadow);
            for (const updater of container.particles.updaters) {
                if (updater.afterDraw) {
                    updater.afterDraw(particle);
                }
            }
        });
    }
    drawPlugin(plugin, delta) {
        this.draw((ctx) => {
            drawPlugin(ctx, plugin, delta);
        });
    }
    drawParticlePlugin(plugin, particle, delta) {
        this.draw((ctx) => {
            drawParticlePlugin(ctx, plugin, particle, delta);
        });
    }
    initBackground() {
        const options = this.container.actualOptions, background = options.background, element = this.element, elementStyle = element === null || element === void 0 ? void 0 : element.style;
        if (!elementStyle) {
            return;
        }
        if (background.color) {
            const color = colorToRgb(background.color);
            elementStyle.backgroundColor = color ? getStyleFromRgb(color, background.opacity) : "";
        }
        else {
            elementStyle.backgroundColor = "";
        }
        elementStyle.backgroundImage = background.image || "";
        elementStyle.backgroundPosition = background.position || "";
        elementStyle.backgroundRepeat = background.repeat || "";
        elementStyle.backgroundSize = background.size || "";
    }
    draw(cb) {
        if (!this.context) {
            return;
        }
        return cb(this.context);
    }
    initCover() {
        const options = this.container.actualOptions, cover = options.backgroundMask.cover, color = cover.color, coverRgb = colorToRgb(color);
        if (coverRgb) {
            const coverColor = {
                r: coverRgb.r,
                g: coverRgb.g,
                b: coverRgb.b,
                a: cover.opacity,
            };
            this.coverColorStyle = getStyleFromRgb(coverColor, coverColor.a);
        }
    }
    initTrail() {
        const options = this.container.actualOptions, trail = options.particles.move.trail, fillColor = colorToRgb(trail.fillColor);
        if (fillColor) {
            const trail = options.particles.move.trail;
            this.trailFillColor = {
                r: fillColor.r,
                g: fillColor.g,
                b: fillColor.b,
                a: 1 / trail.length,
            };
        }
    }
    getPluginParticleColors(particle) {
        let fColor, sColor;
        for (const [, plugin] of this.container.plugins) {
            if (!fColor && plugin.particleFillColor) {
                fColor = colorToHsl(plugin.particleFillColor(particle));
            }
            if (!sColor && plugin.particleStrokeColor) {
                sColor = colorToHsl(plugin.particleStrokeColor(particle));
            }
            if (fColor && sColor) {
                break;
            }
        }
        return [fColor, sColor];
    }
    initStyle() {
        const element = this.element, options = this.container.actualOptions;
        if (!element) {
            return;
        }
        const originalStyle = this.originalStyle;
        if (options.fullScreen.enable) {
            this.originalStyle = deepExtend({}, element.style);
            element.style.setProperty("position", "fixed", "important");
            element.style.setProperty("z-index", options.fullScreen.zIndex.toString(10), "important");
            element.style.setProperty("top", "0", "important");
            element.style.setProperty("left", "0", "important");
            element.style.setProperty("width", "100%", "important");
            element.style.setProperty("height", "100%", "important");
        }
        else if (originalStyle) {
            element.style.position = originalStyle.position;
            element.style.zIndex = originalStyle.zIndex;
            element.style.top = originalStyle.top;
            element.style.left = originalStyle.left;
            element.style.width = originalStyle.width;
            element.style.height = originalStyle.height;
        }
        for (const key in options.style) {
            if (!key || !options.style) {
                continue;
            }
            const value = options.style[key];
            if (!value) {
                continue;
            }
            element.style.setProperty(key, value, "important");
        }
    }
    paintBase(baseColor) {
        this.draw((ctx) => {
            paintBase(ctx, this.size, baseColor);
        });
    }
    lineStyle(p1, p2) {
        return this.draw((ctx) => {
            const options = this.container.actualOptions, connectOptions = options.interactivity.modes.connect;
            return gradient(ctx, p1, p2, connectOptions.links.opacity);
        });
    }
}
