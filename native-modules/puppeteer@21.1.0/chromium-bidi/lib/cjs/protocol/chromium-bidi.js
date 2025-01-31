"use strict";
/**
 * Copyright 2023 Google LLC.
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Network = exports.BrowsingContext = exports.Log = exports.Script = void 0;
// keep-sorted end
var Script;
(function (Script) {
    let EventNames;
    (function (EventNames) {
        // keep-sorted start
        EventNames["AllScriptEvent"] = "script";
        EventNames["MessageEvent"] = "script.message";
        EventNames["RealmCreated"] = "script.realmCreated";
        EventNames["RealmDestroyed"] = "script.realmDestroyed";
        // keep-sorted end
    })(EventNames = Script.EventNames || (Script.EventNames = {}));
})(Script || (exports.Script = Script = {}));
var Log;
(function (Log) {
    let EventNames;
    (function (EventNames) {
        EventNames["AllLogEvent"] = "log";
        EventNames["LogEntryAddedEvent"] = "log.entryAdded";
    })(EventNames = Log.EventNames || (Log.EventNames = {}));
})(Log || (exports.Log = Log = {}));
var BrowsingContext;
(function (BrowsingContext) {
    let EventNames;
    (function (EventNames) {
        // keep-sorted start
        EventNames["AllBrowsingContextEvent"] = "browsingContext";
        EventNames["ContextCreatedEvent"] = "browsingContext.contextCreated";
        EventNames["ContextDestroyedEvent"] = "browsingContext.contextDestroyed";
        EventNames["DomContentLoadedEvent"] = "browsingContext.domContentLoaded";
        EventNames["FragmentNavigated"] = "browsingContext.fragmentNavigated";
        EventNames["LoadEvent"] = "browsingContext.load";
        EventNames["NavigationStarted"] = "browsingContext.navigationStarted";
        EventNames["UserPromptClosed"] = "browsingContext.userPromptClosed";
        EventNames["UserPromptOpened"] = "browsingContext.userPromptOpened";
        // keep-sorted end
    })(EventNames = BrowsingContext.EventNames || (BrowsingContext.EventNames = {}));
})(BrowsingContext || (exports.BrowsingContext = BrowsingContext = {}));
var Network;
(function (Network) {
    let EventNames;
    (function (EventNames) {
        // keep-sorted start
        EventNames["AllNetworkEvent"] = "network";
        EventNames["BeforeRequestSentEvent"] = "network.beforeRequestSent";
        EventNames["FetchErrorEvent"] = "network.fetchError";
        EventNames["ResponseCompletedEvent"] = "network.responseCompleted";
        EventNames["ResponseStartedEvent"] = "network.responseStarted";
        // keep-sorted end
    })(EventNames = Network.EventNames || (Network.EventNames = {}));
})(Network || (exports.Network = Network = {}));
//# sourceMappingURL=chromium-bidi.js.map