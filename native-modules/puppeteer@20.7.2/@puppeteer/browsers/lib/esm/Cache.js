/**
 * Copyright 2023 Google Inc. All rights reserved.
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
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Cache_rootDir;
import fs from 'fs';
import path from 'path';
import { Browser } from './browser-data/browser-data.js';
/**
 * The cache used by Puppeteer relies on the following structure:
 *
 * - rootDir
 *   -- <browser1> | browserRoot(browser1)
 *   ---- <platform>-<buildId> | installationDir()
 *   ------ the browser-platform-buildId
 *   ------ specific structure.
 *   -- <browser2> | browserRoot(browser2)
 *   ---- <platform>-<buildId> | installationDir()
 *   ------ the browser-platform-buildId
 *   ------ specific structure.
 *   @internal
 */
export class Cache {
    constructor(rootDir) {
        _Cache_rootDir.set(this, void 0);
        __classPrivateFieldSet(this, _Cache_rootDir, rootDir, "f");
    }
    browserRoot(browser) {
        return path.join(__classPrivateFieldGet(this, _Cache_rootDir, "f"), browser);
    }
    installationDir(browser, platform, buildId) {
        return path.join(this.browserRoot(browser), `${platform}-${buildId}`);
    }
    clear() {
        fs.rmSync(__classPrivateFieldGet(this, _Cache_rootDir, "f"), {
            force: true,
            recursive: true,
            maxRetries: 10,
            retryDelay: 500,
        });
    }
    uninstall(browser, platform, buildId) {
        fs.rmSync(this.installationDir(browser, platform, buildId), {
            force: true,
            recursive: true,
            maxRetries: 10,
            retryDelay: 500,
        });
    }
    getInstalledBrowsers() {
        if (!fs.existsSync(__classPrivateFieldGet(this, _Cache_rootDir, "f"))) {
            return [];
        }
        const types = fs.readdirSync(__classPrivateFieldGet(this, _Cache_rootDir, "f"));
        const browsers = types.filter((t) => {
            return Object.values(Browser).includes(t);
        });
        return browsers.flatMap(browser => {
            const files = fs.readdirSync(this.browserRoot(browser));
            return files
                .map(file => {
                const result = parseFolderPath(path.join(this.browserRoot(browser), file));
                if (!result) {
                    return null;
                }
                return {
                    path: path.join(this.browserRoot(browser), file),
                    browser,
                    platform: result.platform,
                    buildId: result.buildId,
                };
            })
                .filter((item) => {
                return item !== null;
            });
        });
    }
}
_Cache_rootDir = new WeakMap();
function parseFolderPath(folderPath) {
    const name = path.basename(folderPath);
    const splits = name.split('-');
    if (splits.length !== 2) {
        return;
    }
    const [platform, buildId] = splits;
    if (!buildId || !platform) {
        return;
    }
    return { platform, buildId };
}
//# sourceMappingURL=Cache.js.map