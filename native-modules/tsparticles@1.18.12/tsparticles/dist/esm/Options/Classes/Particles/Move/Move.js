import { Attract } from "./Attract";
import { MoveDirection } from "../../../../Enums";
import { Trail } from "./Trail";
import { Noise } from "./Noise/Noise";
import { MoveAngle } from "./MoveAngle";
import { MoveGravity } from "./MoveGravity";
import { OutModes } from "./OutModes";
export class Move {
    constructor() {
        this.angle = new MoveAngle();
        this.attract = new Attract();
        this.direction = MoveDirection.none;
        this.distance = 0;
        this.enable = false;
        this.gravity = new MoveGravity();
        this.noise = new Noise();
        this.outModes = new OutModes();
        this.random = false;
        this.size = false;
        this.speed = 2;
        this.straight = false;
        this.trail = new Trail();
        this.vibrate = false;
        this.warp = false;
    }
    get collisions() {
        return false;
    }
    set collisions(value) {
    }
    get bounce() {
        return this.collisions;
    }
    set bounce(value) {
        this.collisions = value;
    }
    get out_mode() {
        return this.outMode;
    }
    set out_mode(value) {
        this.outMode = value;
    }
    get outMode() {
        return this.outModes.default;
    }
    set outMode(value) {
        this.outModes.default = value;
    }
    load(data) {
        var _a, _b;
        if (data === undefined) {
            return;
        }
        if (data.angle !== undefined) {
            if (typeof data.angle === "number") {
                this.angle.value = data.angle;
            }
            else {
                this.angle.load(data.angle);
            }
        }
        this.attract.load(data.attract);
        if (data.direction !== undefined) {
            this.direction = data.direction;
        }
        if (data.distance !== undefined) {
            this.distance = data.distance;
        }
        if (data.enable !== undefined) {
            this.enable = data.enable;
        }
        this.gravity.load(data.gravity);
        this.noise.load(data.noise);
        const outMode = (_a = data.outMode) !== null && _a !== void 0 ? _a : data.out_mode;
        if (data.outModes !== undefined || outMode !== undefined) {
            if (typeof data.outModes === "string" || (data.outModes === undefined && outMode !== undefined)) {
                this.outModes.load({
                    default: (_b = data.outModes) !== null && _b !== void 0 ? _b : outMode,
                });
            }
            else {
                this.outModes.load(data.outModes);
            }
        }
        if (data.random !== undefined) {
            this.random = data.random;
        }
        if (data.size !== undefined) {
            this.size = data.size;
        }
        if (data.speed !== undefined) {
            this.speed = data.speed;
        }
        if (data.straight !== undefined) {
            this.straight = data.straight;
        }
        this.trail.load(data.trail);
        if (data.vibrate !== undefined) {
            this.vibrate = data.vibrate;
        }
        if (data.warp !== undefined) {
            this.warp = data.warp;
        }
    }
}
