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
import * as chromedriver from './chromedriver.js';
import * as chromium from './chromium.js';
import * as firefox from './firefox.js';
import { Browser, BrowserPlatform, BrowserTag, ChromeReleaseChannel, } from './types.js';
export const downloadUrls = {
    [Browser.CHROMEDRIVER]: chromedriver.resolveDownloadUrl,
    [Browser.CHROME]: chrome.resolveDownloadUrl,
    [Browser.CHROMIUM]: chromium.resolveDownloadUrl,
    [Browser.FIREFOX]: firefox.resolveDownloadUrl,
};
export const downloadPaths = {
    [Browser.CHROMEDRIVER]: chromedriver.resolveDownloadPath,
    [Browser.CHROME]: chrome.resolveDownloadPath,
    [Browser.CHROMIUM]: chromium.resolveDownloadPath,
    [Browser.FIREFOX]: firefox.resolveDownloadPath,
};
export const executablePathByBrowser = {
    [Browser.CHROMEDRIVER]: chromedriver.relativeExecutablePath,
    [Browser.CHROME]: chrome.relativeExecutablePath,
    [Browser.CHROMIUM]: chromium.relativeExecutablePath,
    [Browser.FIREFOX]: firefox.relativeExecutablePath,
};
export { Browser, BrowserPlatform, ChromeReleaseChannel };
/**
 * @public
 */
export async function resolveBuildId(browser, platform, tag) {
    switch (browser) {
        case Browser.FIREFOX:
            switch (tag) {
                case BrowserTag.LATEST:
                    return await firefox.resolveBuildId('FIREFOX_NIGHTLY');
                case BrowserTag.BETA:
                case BrowserTag.CANARY:
                case BrowserTag.DEV:
                case BrowserTag.STABLE:
                    throw new Error(`${tag} is not supported for ${browser}`);
            }
        case Browser.CHROME:
            switch (tag) {
                case BrowserTag.LATEST:
                    return await chrome.resolveBuildId(platform, ChromeReleaseChannel.CANARY);
                case BrowserTag.BETA:
                    return await chrome.resolveBuildId(platform, ChromeReleaseChannel.BETA);
                case BrowserTag.CANARY:
                    return await chrome.resolveBuildId(platform, ChromeReleaseChannel.CANARY);
                case BrowserTag.DEV:
                    return await chrome.resolveBuildId(platform, ChromeReleaseChannel.DEV);
                case BrowserTag.STABLE:
                    return await chrome.resolveBuildId(platform, ChromeReleaseChannel.STABLE);
            }
        case Browser.CHROMEDRIVER:
            switch (tag) {
                case BrowserTag.LATEST:
                case BrowserTag.CANARY:
                    return await chromedriver.resolveBuildId(ChromeReleaseChannel.CANARY);
                case BrowserTag.BETA:
                    return await chromedriver.resolveBuildId(ChromeReleaseChannel.BETA);
                case BrowserTag.DEV:
                    return await chromedriver.resolveBuildId(ChromeReleaseChannel.DEV);
                case BrowserTag.STABLE:
                    return await chromedriver.resolveBuildId(ChromeReleaseChannel.STABLE);
            }
        case Browser.CHROMIUM:
            switch (tag) {
                case BrowserTag.LATEST:
                    return await chromium.resolveBuildId(platform, 'latest');
                case BrowserTag.BETA:
                    return await chromium.resolveBuildId(platform, ChromeReleaseChannel.BETA);
                case BrowserTag.CANARY:
                    return await chromium.resolveBuildId(platform, ChromeReleaseChannel.CANARY);
                case BrowserTag.DEV:
                    return await chromium.resolveBuildId(platform, ChromeReleaseChannel.DEV);
                case BrowserTag.STABLE:
                    return await chromium.resolveBuildId(platform, ChromeReleaseChannel.STABLE);
            }
    }
    // We assume the tag is the buildId if it didn't match any keywords.
    return tag;
}
/**
 * @public
 */
export async function createProfile(browser, opts) {
    switch (browser) {
        case Browser.FIREFOX:
            return await firefox.createProfile(opts);
        case Browser.CHROME:
        case Browser.CHROMIUM:
            throw new Error(`Profile creation is not support for ${browser} yet`);
    }
}
/**
 * @public
 */
export function resolveSystemExecutablePath(browser, platform, channel) {
    switch (browser) {
        case Browser.CHROMEDRIVER:
        case Browser.FIREFOX:
            throw new Error(`System browser detection is not supported for ${browser} yet.`);
        case Browser.CHROME:
            return chromium.resolveSystemExecutablePath(platform, channel);
        case Browser.CHROMIUM:
            return chrome.resolveSystemExecutablePath(platform, channel);
    }
}
//# sourceMappingURL=browser-data.js.map