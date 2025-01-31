"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealmStorage = void 0;
const protocol_js_1 = require("../../../protocol/protocol.js");
/** Container class for browsing realms. */
class RealmStorage {
    /** Tracks handles and their realms sent to the client. */
    #knownHandlesToRealm = new Map();
    /** Map from realm ID to Realm. */
    #realmMap = new Map();
    get knownHandlesToRealm() {
        return this.#knownHandlesToRealm;
    }
    get realmMap() {
        return this.#realmMap;
    }
    /** Finds all realms that match the given filter. */
    findRealms(filter) {
        return Array.from(this.#realmMap.values()).filter((realm) => {
            if (filter.realmId !== undefined && filter.realmId !== realm.realmId) {
                return false;
            }
            if (filter.browsingContextId !== undefined &&
                filter.browsingContextId !== realm.browsingContextId) {
                return false;
            }
            if (filter.navigableId !== undefined &&
                filter.navigableId !== realm.navigableId) {
                return false;
            }
            if (filter.executionContextId !== undefined &&
                filter.executionContextId !== realm.executionContextId) {
                return false;
            }
            if (filter.origin !== undefined && filter.origin !== realm.origin) {
                return false;
            }
            if (filter.type !== undefined && filter.type !== realm.type) {
                return false;
            }
            if (filter.sandbox !== undefined && filter.sandbox !== realm.sandbox) {
                return false;
            }
            if (filter.cdpSessionId !== undefined &&
                filter.cdpSessionId !== realm.cdpSessionId) {
                return false;
            }
            return true;
        });
    }
    findRealm(filter) {
        const maybeRealms = this.findRealms(filter);
        if (maybeRealms.length !== 1) {
            return undefined;
        }
        return maybeRealms[0];
    }
    /** Gets the only realm that matches the given filter, if any, otherwise throws. */
    getRealm(filter) {
        const maybeRealm = this.findRealm(filter);
        if (maybeRealm === undefined) {
            throw new protocol_js_1.Message.NoSuchFrameException(`Realm ${JSON.stringify(filter)} not found`);
        }
        return maybeRealm;
    }
    /** Deletes all realms that match the given filter. */
    deleteRealms(filter) {
        this.findRealms(filter).map((realm) => {
            this.#realmMap.delete(realm.realmId);
            Array.from(this.#knownHandlesToRealm.entries())
                .filter(([, r]) => r === realm.realmId)
                .map(([handle]) => this.#knownHandlesToRealm.delete(handle));
        });
    }
}
exports.RealmStorage = RealmStorage;
//# sourceMappingURL=realmStorage.js.map