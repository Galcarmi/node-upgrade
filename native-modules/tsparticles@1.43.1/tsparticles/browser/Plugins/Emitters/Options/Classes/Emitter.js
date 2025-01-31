import { AnimatableColor } from "../../../../Options/Classes/AnimatableColor";
import { EmitterLife } from "./EmitterLife";
import { EmitterRate } from "./EmitterRate";
import { EmitterSize } from "./EmitterSize";
import { deepExtend } from "../../../../Utils/Utils";
import { setRangeValue } from "../../../../Utils/NumberUtils";
/**
 * [[include:Options/Plugins/Emitters.md]]
 * @category Emitters Plugin
 */
export class Emitter {
    constructor() {
        this.autoPlay = true;
        this.fill = true;
        this.life = new EmitterLife();
        this.rate = new EmitterRate();
        this.shape = "square" /* square */;
        this.startCount = 0;
    }
    load(data) {
        if (data === undefined) {
            return;
        }
        if (data.autoPlay !== undefined) {
            this.autoPlay = data.autoPlay;
        }
        if (data.size !== undefined) {
            if (this.size === undefined) {
                this.size = new EmitterSize();
            }
            this.size.load(data.size);
        }
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        this.domId = data.domId;
        if (data.fill !== undefined) {
            this.fill = data.fill;
        }
        this.life.load(data.life);
        this.name = data.name;
        if (data.particles !== undefined) {
            this.particles = deepExtend({}, data.particles);
        }
        this.rate.load(data.rate);
        if (data.shape !== undefined) {
            this.shape = data.shape;
        }
        if (data.position !== undefined) {
            this.position = {};
            if (data.position.x !== undefined) {
                this.position.x = setRangeValue(data.position.x);
            }
            if (data.position.y !== undefined) {
                this.position.y = setRangeValue(data.position.y);
            }
        }
        if (data.spawnColor !== undefined) {
            if (this.spawnColor === undefined) {
                this.spawnColor = new AnimatableColor();
            }
            this.spawnColor.load(data.spawnColor);
        }
        if (data.startCount !== undefined) {
            this.startCount = data.startCount;
        }
    }
}
