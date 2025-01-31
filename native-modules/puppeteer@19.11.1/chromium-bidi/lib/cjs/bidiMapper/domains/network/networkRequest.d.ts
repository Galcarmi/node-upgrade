/**
 * @fileoverview `NetworkRequest` represents a single network request and keeps
 * track of all the related CDP events.
 */
import Protocol from 'devtools-protocol';
import { IEventManager } from '../events/EventManager';
export declare class NetworkRequest {
    #private;
    requestId: string;
    constructor(requestId: string, eventManager: IEventManager);
    onRequestWillBeSentEvent(requestWillBeSentEvent: Protocol.Network.RequestWillBeSentEvent): void;
    onRequestWillBeSentExtraInfoEvent(requestWillBeSentExtraInfoEvent: Protocol.Network.RequestWillBeSentExtraInfoEvent): void;
    onResponseReceivedEvent(responseReceivedEvent: Protocol.Network.ResponseReceivedEvent): void;
    onResponseReceivedEventExtraInfo(responseReceivedExtraInfoEvent: Protocol.Network.ResponseReceivedExtraInfoEvent): void;
    onLoadingFailedEvent(loadingFailedEvent: Protocol.Network.LoadingFailedEvent): void;
}
