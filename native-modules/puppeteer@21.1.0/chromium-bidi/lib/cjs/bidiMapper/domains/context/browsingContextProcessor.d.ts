import type { ICdpConnection } from '../../../cdp/cdpConnection.js';
import { BrowsingContext, type EmptyResult } from '../../../protocol/protocol.js';
import { type LoggerFn } from '../../../utils/log.js';
import type { IEventManager } from '../events/EventManager.js';
import type { RealmStorage } from '../script/realmStorage.js';
import type { PreloadScriptStorage } from '../script/PreloadScriptStorage.js';
import type { BrowsingContextStorage } from './browsingContextStorage.js';
export declare class BrowsingContextProcessor {
    #private;
    constructor(cdpConnection: ICdpConnection, selfTargetId: string, eventManager: IEventManager, browsingContextStorage: BrowsingContextStorage, realmStorage: RealmStorage, preloadScriptStorage: PreloadScriptStorage, logger?: LoggerFn);
    getTree(params: BrowsingContext.GetTreeParameters): BrowsingContext.GetTreeResult;
    create(params: BrowsingContext.CreateParameters): Promise<BrowsingContext.CreateResult>;
    navigate(params: BrowsingContext.NavigateParameters): Promise<BrowsingContext.NavigateResult>;
    reload(params: BrowsingContext.ReloadParameters): Promise<EmptyResult>;
    activate(params: BrowsingContext.ActivateParameters): Promise<EmptyResult>;
    captureScreenshot(params: BrowsingContext.CaptureScreenshotParameters): Promise<BrowsingContext.CaptureScreenshotResult>;
    print(params: BrowsingContext.PrintParameters): Promise<BrowsingContext.PrintResult>;
    setViewport(params: BrowsingContext.SetViewportParameters): Promise<EmptyResult>;
    handleUserPrompt(params: BrowsingContext.HandleUserPromptParameters): Promise<EmptyResult>;
    close(commandParams: BrowsingContext.CloseParameters): Promise<EmptyResult>;
}
