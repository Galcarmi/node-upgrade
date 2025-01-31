import type { ContainerImage, IImage, IImageParticle } from "./Utils";
import type { Container } from "../../Core/Container";
import type { IShapeDrawer } from "../../Core/Interfaces/IShapeDrawer";
import type { Particle } from "../../Core/Particle";
export declare class ImageDrawer implements IShapeDrawer {
    #private;
    constructor();
    getSidesCount(): number;
    getImages(container: Container): ContainerImage;
    addImage(container: Container, image: IImage): void;
    destroy(): void;
    draw(context: CanvasRenderingContext2D, particle: IImageParticle, radius: number, opacity: number): void;
    loadShape(particle: Particle): void;
    private loadImageShape;
}
