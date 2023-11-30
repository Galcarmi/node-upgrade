import type { IHsl, IRgb } from "../Core/Interfaces/Colors";
import { AlterType } from "../Enums/Types/AlterType";
import type { Container } from "../Core/Container";
import type { IContainerPlugin } from "../Core/Interfaces/IContainerPlugin";
import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import type { IDelta } from "../Core/Interfaces/IDelta";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { ILinksShadow } from "../Options/Interfaces/Particles/Links/ILinksShadow";
import type { IParticle } from "../Core/Interfaces/IParticle";
import type { IParticleColorStyle } from "../Core/Interfaces/IParticleColorStyle";
import type { IShadow } from "../Options/Interfaces/Particles/IShadow";
import type { Particle } from "../Core/Particle";
export declare function paintBase(context: CanvasRenderingContext2D, dimension: IDimension, baseColor?: string): void;
export declare function clear(context: CanvasRenderingContext2D, dimension: IDimension): void;
export declare function drawLinkLine(context: CanvasRenderingContext2D, width: number, begin: ICoordinates, end: ICoordinates, maxDistance: number, canvasSize: IDimension, warp: boolean, backgroundMask: boolean, composite: GlobalCompositeOperation, colorLine: IRgb, opacity: number, shadow: ILinksShadow): void;
export declare function drawLinkTriangle(context: CanvasRenderingContext2D, pos1: ICoordinates, pos2: ICoordinates, pos3: ICoordinates, backgroundMask: boolean, composite: GlobalCompositeOperation, colorTriangle: IRgb, opacityTriangle: number): void;
export declare function drawConnectLine(context: CanvasRenderingContext2D, width: number, lineStyle: CanvasGradient, begin: ICoordinates, end: ICoordinates): void;
export declare function gradient(context: CanvasRenderingContext2D, p1: IParticle, p2: IParticle, opacity: number): CanvasGradient | undefined;
export declare function drawGrabLine(context: CanvasRenderingContext2D, width: number, begin: ICoordinates, end: ICoordinates, colorLine: IRgb, opacity: number): void;
export declare function drawParticle(container: Container, context: CanvasRenderingContext2D, particle: IParticle, delta: IDelta, colorStyles: IParticleColorStyle, backgroundMask: boolean, composite: GlobalCompositeOperation, radius: number, opacity: number, shadow: IShadow): void;
export declare function drawShape(container: Container, context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number, delta: IDelta): void;
export declare function drawShapeAfterEffect(container: Container, context: CanvasRenderingContext2D, particle: IParticle, radius: number, opacity: number, delta: IDelta): void;
export declare function drawPlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, delta: IDelta): void;
export declare function drawParticlePlugin(context: CanvasRenderingContext2D, plugin: IContainerPlugin, particle: Particle, delta: IDelta): void;
export declare function drawEllipse(context: CanvasRenderingContext2D, particle: IParticle, fillColorValue: IHsl | undefined, radius: number, opacity: number, width: number, rotation: number, start: number, end: number): void;
export declare function alterHsl(color: IHsl, type: AlterType, value: number): IHsl;
