import type { IOptionLoader } from "../../../Interfaces/IOptionLoader";
import type { IRepulse } from "../../../Interfaces/Interactivity/Modes/IRepulse";
import type { RecursivePartial } from "../../../../Types/RecursivePartial";
import { RepulseBase } from "./RepulseBase";
import { RepulseDiv } from "./RepulseDiv";
import type { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export declare class Repulse extends RepulseBase implements IRepulse, IOptionLoader<IRepulse> {
    divs?: SingleOrMultiple<RepulseDiv>;
    load(data?: RecursivePartial<IRepulse>): void;
}
