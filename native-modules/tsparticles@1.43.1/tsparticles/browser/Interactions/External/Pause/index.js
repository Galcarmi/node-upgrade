import { Pauser } from "./Pauser";
export async function loadExternalPauseInteraction(engine) {
    await engine.addInteractor("externalPause", (container) => new Pauser(container));
}
