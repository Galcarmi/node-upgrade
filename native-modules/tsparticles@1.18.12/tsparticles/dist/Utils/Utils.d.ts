import type { ICoordinates } from "../Core/Interfaces/ICoordinates";
import { DivMode } from "../Enums";
import type { ICharacterShape } from "../Options/Interfaces/Particles/Shape/ICharacterShape";
import type { IBounds } from "../Core/Interfaces/IBounds";
import type { IDimension } from "../Core/Interfaces/IDimension";
import type { IImage } from "../Core/Interfaces/IImage";
import type { SingleOrMultiple } from "../Types";
import { DivEvent } from "../Options/Classes/Interactivity/Events/DivEvent";
import type { IModeDiv } from "../Options/Interfaces/Interactivity/Modes/IModeDiv";
import { OutModeDirection } from "../Enums/Directions/OutModeDirection";
import { IParticle } from "../Core/Interfaces/IParticle";
import { ICircleBouncer } from "../Core/Interfaces/ICircleBouncer";
declare type CSSOMString = string;
declare type FontFaceLoadStatus = "unloaded" | "loading" | "loaded" | "error";
declare type FontFaceSetStatus = "loading" | "loaded";
interface FontFace {
    family: CSSOMString;
    style: CSSOMString;
    weight: CSSOMString;
    stretch: CSSOMString;
    unicodeRange: CSSOMString;
    variant: CSSOMString;
    featureSettings: CSSOMString;
    variationSettings: CSSOMString;
    display: CSSOMString;
    readonly status: FontFaceLoadStatus;
    readonly loaded: Promise<FontFace>;
    load(): Promise<FontFace>;
}
interface FontFaceSet {
    readonly status: FontFaceSetStatus;
    readonly ready: Promise<FontFaceSet>;
    check(font: string, text?: string): boolean;
    load(font: string, text?: string): Promise<FontFace[]>;
}
declare global {
    interface Document {
        fonts: FontFaceSet;
    }
    interface Window {
        customRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        mozRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        oRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        msRequestAnimationFrame: (callback: FrameRequestCallback) => number;
        customCancelRequestAnimationFrame: (handle: number) => void;
        webkitCancelRequestAnimationFrame: (handle: number) => void;
        mozCancelRequestAnimationFrame: (handle: number) => void;
        oCancelRequestAnimationFrame: (handle: number) => void;
        msCancelRequestAnimationFrame: (handle: number) => void;
        Path2D?: Path2D;
    }
}
export declare class Utils {
    static isSsr(): boolean;
    static get animate(): (callback: FrameRequestCallback) => number;
    static get cancelAnimation(): (handle: number) => void;
    static isInArray<T>(value: T, array: SingleOrMultiple<T>): boolean;
    static loadFont(character: ICharacterShape): Promise<void>;
    static arrayRandomIndex<T>(array: T[]): number;
    static itemFromArray<T>(array: T[], index?: number, useIndex?: boolean): T;
    static isPointInside(point: ICoordinates, size: IDimension, radius?: number, direction?: OutModeDirection): boolean;
    static areBoundsInside(bounds: IBounds, size: IDimension, direction?: OutModeDirection): boolean;
    static calculateBounds(point: ICoordinates, radius: number): IBounds;
    static loadImage(source: string): Promise<IImage>;
    static downloadSvgImage(source: string): Promise<IImage>;
    static deepExtend(destination: unknown, ...sources: unknown[]): unknown;
    static isDivModeEnabled(mode: DivMode, divs: SingleOrMultiple<DivEvent>): boolean;
    static divModeExecute(mode: DivMode, divs: SingleOrMultiple<DivEvent>, callback: (id: string, div: DivEvent) => void): void;
    static singleDivModeExecute(div: DivEvent, callback: (selector: string, div: DivEvent) => void): void;
    static divMode<T extends IModeDiv>(divs?: SingleOrMultiple<T>, element?: HTMLElement): T | undefined;
    static circleBounceDataFromParticle(p: IParticle): ICircleBouncer;
    static circleBounce(p1: ICircleBouncer, p2: ICircleBouncer): void;
    static rectBounce(particle: IParticle, divBounds: IBounds): void;
}
export {};
