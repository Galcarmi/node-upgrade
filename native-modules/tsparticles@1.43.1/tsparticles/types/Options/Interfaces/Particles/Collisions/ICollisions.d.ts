import type { CollisionMode } from "../../../../Enums/Modes/CollisionMode";
import type { IBounce } from "../Bounce/IBounce";
import type { ICollisionsOverlap } from "./ICollisionsOverlap";
export interface ICollisions {
    bounce: IBounce;
    enable: boolean;
    mode: CollisionMode | keyof typeof CollisionMode;
    overlap: ICollisionsOverlap;
}
