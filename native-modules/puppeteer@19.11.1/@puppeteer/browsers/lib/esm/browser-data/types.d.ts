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
import * as chrome from './chrome.js';
import * as firefox from './firefox.js';
/**
 * Supported browsers.
 *
 * @public
 */
export declare enum Browser {
    CHROME = "chrome",
    CHROMIUM = "chromium",
    FIREFOX = "firefox",
    CHROMEDRIVER = "chromedriver"
}
/**
 * Platform names used to identify a OS platfrom x architecture combination in the way
 * that is relevant for the browser download.
 *
 * @public
 */
export declare enum BrowserPlatform {
    LINUX = "linux",
    MAC = "mac",
    MAC_ARM = "mac_arm",
    WIN32 = "win32",
    WIN64 = "win64"
}
export declare const downloadUrls: {
    chrome: typeof chrome.resolveDownloadUrl;
    chromium: typeof chrome.resolveDownloadUrl;
    firefox: typeof firefox.resolveDownloadUrl;
};
/**
 * @public
 */
export declare enum BrowserTag {
    LATEST = "latest"
}
/**
 * @public
 */
export interface ProfileOptions {
    preferences: Record<string, unknown>;
    path: string;
}
/**
 * @public
 */
export declare enum ChromeReleaseChannel {
    STABLE = "stable",
    DEV = "dev",
    CANARY = "canary",
    BETA = "beta"
}
//# sourceMappingURL=types.d.ts.map