import type { IParticles } from "../../Options/Interfaces/Particles/IParticles";
import type { RecursivePartial } from "../../Types/RecursivePartial";
export interface IShapeValues {
    close?: boolean;
    fill?: boolean;
    particles?: RecursivePartial<IParticles>;
    [key: string]: unknown;
}
