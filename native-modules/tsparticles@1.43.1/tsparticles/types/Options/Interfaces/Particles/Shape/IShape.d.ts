import type { ICharacterShape } from "./ICharacterShape";
import type { IImageShape } from "./IImageShape";
import type { IPolygonShape } from "./IPolygonShape";
import type { IStroke } from "../IStroke";
import type { ShapeData } from "../../../../Types/ShapeData";
import type { ShapeType } from "../../../../Enums/Types/ShapeType";
import { SingleOrMultiple } from "../../../../Types/SingleOrMultiple";
export interface IShape {
    type: SingleOrMultiple<ShapeType | keyof typeof ShapeType | string>;
    stroke: SingleOrMultiple<IStroke>;
    polygon: SingleOrMultiple<IPolygonShape>;
    character: SingleOrMultiple<ICharacterShape>;
    image: SingleOrMultiple<IImageShape>;
    images: SingleOrMultiple<IImageShape>;
    custom: ShapeData;
    options: ShapeData;
}
