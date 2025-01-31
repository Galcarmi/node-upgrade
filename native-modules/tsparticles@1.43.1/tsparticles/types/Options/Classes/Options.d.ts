import { Background } from "./Background/Background";
import { BackgroundMask } from "./BackgroundMask/BackgroundMask";
import type { Engine } from "../../engine";
import { FullScreen } from "./FullScreen/FullScreen";
import type { IOptionLoader } from "../Interfaces/IOptionLoader";
import type { IOptions } from "../Interfaces/IOptions";
import { Interactivity } from "./Interactivity/Interactivity";
import { ManualParticle } from "./ManualParticle";
import { Motion } from "./Motion/Motion";
import { ParticlesOptions } from "./Particles/ParticlesOptions";
import type { RangeValue } from "../../Types/RangeValue";
import type { RecursivePartial } from "../../Types/RecursivePartial";
import { Responsive } from "./Responsive";
import { Theme } from "./Theme/Theme";
export declare class Options implements IOptions, IOptionLoader<IOptions> {
    #private;
    get fps_limit(): number;
    set fps_limit(value: number);
    get retina_detect(): boolean;
    set retina_detect(value: boolean);
    get backgroundMode(): FullScreen;
    set backgroundMode(value: FullScreen);
    autoPlay: boolean;
    background: Background;
    backgroundMask: BackgroundMask;
    detectRetina: boolean;
    duration: RangeValue;
    fpsLimit: number;
    fullScreen: FullScreen;
    interactivity: Interactivity;
    manualParticles: ManualParticle[];
    motion: Motion;
    particles: ParticlesOptions;
    pauseOnBlur: boolean;
    pauseOnOutsideViewport: boolean;
    preset?: string | string[];
    style: RecursivePartial<CSSStyleDeclaration>;
    responsive: Responsive[];
    themes: Theme[];
    zLayers: number;
    defaultDarkTheme?: string;
    defaultLightTheme?: string;
    [name: string]: unknown;
    constructor(engine: Engine);
    load(data?: RecursivePartial<IOptions>): void;
    setTheme(name?: string): void;
    setResponsive(width: number, pxRatio: number, defaultOptions: IOptions): number | undefined;
    private importPreset;
}
