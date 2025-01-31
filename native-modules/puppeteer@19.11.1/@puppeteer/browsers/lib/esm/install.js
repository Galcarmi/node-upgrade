/**
 * Copyright 2017 Google Inc. All rights reserved.
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
import assert from 'assert';
import { existsSync } from 'fs';
import { mkdir, unlink } from 'fs/promises';
import os from 'os';
import path from 'path';
import { downloadUrls, } from './browser-data/browser-data.js';
import { Cache } from './Cache.js';
import { debug } from './debug.js';
import { detectBrowserPlatform } from './detectPlatform.js';
import { unpackArchive } from './fileUtil.js';
import { downloadFile, headHttpRequest } from './httpUtil.js';
const debugInstall = debug('puppeteer:browsers:install');
const times = new Map();
function debugTime(label) {
    times.set(label, process.hrtime());
}
function debugTimeEnd(label) {
    const end = process.hrtime();
    const start = times.get(label);
    if (!start) {
        return;
    }
    const duration = end[0] * 1000 + end[1] / 1e6 - (start[0] * 1000 + start[1] / 1e6); // calculate duration in milliseconds
    debugInstall(`Duration for ${label}: ${duration}ms`);
}
/**
 * @public
 */
export async function install(options) {
    var _a, _b;
    (_a = options.platform) !== null && _a !== void 0 ? _a : (options.platform = detectBrowserPlatform());
    (_b = options.unpack) !== null && _b !== void 0 ? _b : (options.unpack = true);
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
    }
    const url = getDownloadUrl(options.browser, options.platform, options.buildId, options.baseUrl);
    const fileName = url.toString().split('/').pop();
    assert(fileName, `A malformed download URL was found: ${url}.`);
    const structure = new Cache(options.cacheDir);
    const browserRoot = structure.browserRoot(options.browser);
    const archivePath = path.join(browserRoot, fileName);
    if (!existsSync(browserRoot)) {
        await mkdir(browserRoot, { recursive: true });
    }
    if (!options.unpack) {
        if (existsSync(archivePath)) {
            return {
                path: archivePath,
                browser: options.browser,
                platform: options.platform,
                buildId: options.buildId,
            };
        }
        debugInstall(`Downloading binary from ${url}`);
        debugTime('download');
        await downloadFile(url, archivePath, options.downloadProgressCallback);
        debugTimeEnd('download');
        return {
            path: archivePath,
            browser: options.browser,
            platform: options.platform,
            buildId: options.buildId,
        };
    }
    const outputPath = structure.installationDir(options.browser, options.platform, options.buildId);
    if (existsSync(outputPath)) {
        return {
            path: outputPath,
            browser: options.browser,
            platform: options.platform,
            buildId: options.buildId,
        };
    }
    try {
        debugInstall(`Downloading binary from ${url}`);
        try {
            debugTime('download');
            await downloadFile(url, archivePath, options.downloadProgressCallback);
        }
        finally {
            debugTimeEnd('download');
        }
        debugInstall(`Installing ${archivePath} to ${outputPath}`);
        try {
            debugTime('extract');
            await unpackArchive(archivePath, outputPath);
        }
        finally {
            debugTimeEnd('extract');
        }
    }
    finally {
        if (existsSync(archivePath)) {
            await unlink(archivePath);
        }
    }
    return {
        path: outputPath,
        browser: options.browser,
        platform: options.platform,
        buildId: options.buildId,
    };
}
/**
 * @public
 */
export async function canDownload(options) {
    var _a;
    (_a = options.platform) !== null && _a !== void 0 ? _a : (options.platform = detectBrowserPlatform());
    if (!options.platform) {
        throw new Error(`Cannot download a binary for the provided platform: ${os.platform()} (${os.arch()})`);
    }
    return await headHttpRequest(getDownloadUrl(options.browser, options.platform, options.buildId, options.baseUrl));
}
function getDownloadUrl(browser, platform, buildId, baseUrl) {
    return new URL(downloadUrls[browser](platform, buildId, baseUrl));
}
//# sourceMappingURL=install.js.map