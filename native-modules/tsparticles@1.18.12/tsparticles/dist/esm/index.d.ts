import { Main } from "./main";
import { CanvasUtils, ColorUtils, Constants, Utils } from "./Utils";
import { IOptions as ISlimOptions } from "./Options/Interfaces/IOptions";
import { IAbsorberOptions } from "./Plugins/Absorbers/Options/Interfaces/IAbsorberOptions";
import { IEmitterOptions } from "./Plugins/Emitters/Options/Interfaces/IEmitterOptions";
import { IPolygonMaskOptions } from "./Plugins/PolygonMask/Options/Interfaces/IPolygonMaskOptions";
import { RecursivePartial } from "./Types";
declare const tsParticles: Main;
declare const particlesJS: import("./pjs").IParticlesJS, pJSDom: import("./Core/Container").Container[];
export * from "./Core/Container";
export * from "./Enums";
export * from "./Plugins/Absorbers/Enums";
export * from "./Plugins/Emitters/Enums";
export * from "./Plugins/PolygonMask/Enums";
export { CanvasUtils, ColorUtils, Constants, Utils };
export * from "./Types";
export { particlesJS, pJSDom, tsParticles };
export declare type IOptions = ISlimOptions & IAbsorberOptions & IEmitterOptions & IPolygonMaskOptions;
export declare type ISourceOptions = RecursivePartial<IOptions>;
