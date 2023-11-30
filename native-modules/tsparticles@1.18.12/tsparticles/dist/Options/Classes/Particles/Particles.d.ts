import type { IParticles } from "../../Interfaces/Particles/IParticles";
import { Links } from "./Links/Links";
import { Move } from "./Move/Move";
import { ParticlesNumber } from "./Number/ParticlesNumber";
import { Opacity } from "./Opacity/Opacity";
import { Shape } from "./Shape/Shape";
import { Size } from "./Size/Size";
import { Rotate } from "./Rotate/Rotate";
import type { RecursivePartial } from "../../../Types";
import { Shadow } from "./Shadow";
import type { SingleOrMultiple } from "../../../Types";
import { Stroke } from "./Stroke";
import { Collisions } from "./Collisions";
import { Twinkle } from "./Twinkle/Twinkle";
import { AnimatableColor } from "./AnimatableColor";
import type { IOptionLoader } from "../../Interfaces/IOptionLoader";
import { Life } from "./Life/Life";
import { Bounce } from "./Bounce/Bounce";
export declare class Particles implements IParticles, IOptionLoader<IParticles> {
    get line_linked(): Links;
    set line_linked(value: Links);
    get lineLinked(): Links;
    set lineLinked(value: Links);
    bounce: Bounce;
    collisions: Collisions;
    color: AnimatableColor;
    life: Life;
    links: Links;
    move: Move;
    number: ParticlesNumber;
    opacity: Opacity;
    reduceDuplicates: boolean;
    rotate: Rotate;
    shape: Shape;
    size: Size;
    shadow: Shadow;
    stroke: SingleOrMultiple<Stroke>;
    twinkle: Twinkle;
    constructor();
    load(data?: RecursivePartial<IParticles>): void;
}
