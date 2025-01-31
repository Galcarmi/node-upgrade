import { MoveDirection, MoveDirectionAlt } from "../../../../Enums/Directions/MoveDirection";
import { AnimatableColor } from "../../../../Options/Classes/AnimatableColor";
import { EmitterLife } from "./EmitterLife";
import { EmitterRate } from "./EmitterRate";
import { EmitterShapeType } from "../../Enums/EmitterShapeType";
import { EmitterSize } from "./EmitterSize";
import type { IEmitter } from "../Interfaces/IEmitter";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IParticles } from "../../../../Options/Interfaces/Particles/IParticles";
import type { IRangedCoordinates } from "../../../../Core/Interfaces/ICoordinates";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Emitter implements IEmitter, IOptionLoader<IEmitter> {
    autoPlay: boolean;
    size?: EmitterSize;
    direction?: MoveDirection | keyof typeof MoveDirection | MoveDirectionAlt | number;
    domId?: string;
    fill: boolean;
    life: EmitterLife;
    name?: string;
    particles?: RecursivePartial<IParticles>;
    position?: RecursivePartial<IRangedCoordinates>;
    rate: EmitterRate;
    shape: EmitterShapeType | keyof typeof EmitterShapeType;
    spawnColor?: AnimatableColor;
    startCount: number;
    constructor();
    load(data?: RecursivePartial<IEmitter>): void;
}
