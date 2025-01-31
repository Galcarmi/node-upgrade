import { AbsorberSize } from "./AbsorberSize";
import type { IAbsorber } from "../Interfaces/IAbsorber";
import type { IOptionLoader } from "../../../../Options/Interfaces/IOptionLoader";
import type { IRangedCoordinates } from "../../../../Core/Interfaces/ICoordinates";
import { OptionsColor } from "../../../../Options/Classes/OptionsColor";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
export declare class Absorber implements IAbsorber, IOptionLoader<IAbsorber> {
    color: OptionsColor;
    draggable: boolean;
    name?: string;
    opacity: number;
    position?: RecursivePartial<IRangedCoordinates>;
    size: AbsorberSize;
    destroy: boolean;
    orbits: boolean;
    constructor();
    load(data?: RecursivePartial<IAbsorber>): void;
}
