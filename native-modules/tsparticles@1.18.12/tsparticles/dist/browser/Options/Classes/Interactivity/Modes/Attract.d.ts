import type { IAttract } from "../../../Interfaces/Interactivity/Modes/IAttract";
import type { RecursivePartial } from "../../../../Types";
import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
export declare class Attract implements IAttract, IOptionLoader<IAttract> {
    distance: number;
    duration: number;
    speed: number;
    constructor();
    load(data?: RecursivePartial<IAttract>): void;
}
