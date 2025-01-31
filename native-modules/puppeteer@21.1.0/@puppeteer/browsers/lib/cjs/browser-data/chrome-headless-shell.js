"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveBuildId = exports.relativeExecutablePath = exports.resolveDownloadPath = exports.resolveDownloadUrl = void 0;
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
const path_1 = __importDefault(require("path"));
const types_js_1 = require("./types.js");
function folder(platform) {
    switch (platform) {
        case types_js_1.BrowserPlatform.LINUX:
            return 'linux64';
        case types_js_1.BrowserPlatform.MAC_ARM:
            return 'mac-arm64';
        case types_js_1.BrowserPlatform.MAC:
            return 'mac-x64';
        case types_js_1.BrowserPlatform.WIN32:
            return 'win32';
        case types_js_1.BrowserPlatform.WIN64:
            return 'win64';
    }
}
function resolveDownloadUrl(platform, buildId, baseUrl = 'https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing') {
    return `${baseUrl}/${resolveDownloadPath(platform, buildId).join('/')}`;
}
exports.resolveDownloadUrl = resolveDownloadUrl;
function resolveDownloadPath(platform, buildId) {
    return [
        buildId,
        folder(platform),
        `chrome-headless-shell-${folder(platform)}.zip`,
    ];
}
exports.resolveDownloadPath = resolveDownloadPath;
function relativeExecutablePath(platform, _buildId) {
    switch (platform) {
        case types_js_1.BrowserPlatform.MAC:
        case types_js_1.BrowserPlatform.MAC_ARM:
            return path_1.default.join('chrome-headless-shell-' + folder(platform), 'chrome-headless-shell');
        case types_js_1.BrowserPlatform.LINUX:
            return path_1.default.join('chrome-headless-shell-linux64', 'chrome-headless-shell');
        case types_js_1.BrowserPlatform.WIN32:
        case types_js_1.BrowserPlatform.WIN64:
            return path_1.default.join('chrome-headless-shell-' + folder(platform), 'chrome-headless-shell.exe');
    }
}
exports.relativeExecutablePath = relativeExecutablePath;
var chrome_js_1 = require("./chrome.js");
Object.defineProperty(exports, "resolveBuildId", { enumerable: true, get: function () { return chrome_js_1.resolveBuildId; } });
//# sourceMappingURL=chrome-headless-shell.js.map