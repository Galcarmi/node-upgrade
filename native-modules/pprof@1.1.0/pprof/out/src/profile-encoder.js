"use strict";
/**
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pify = require("pify");
const zlib_1 = require("zlib");
const profile_1 = require("../../proto/profile");
const gzipPromise = pify(zlib_1.gzip);
function encode(profile) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = profile_1.perftools.profiles.Profile.encode(profile).finish();
        return gzipPromise(buffer);
    });
}
exports.encode = encode;
function encodeSync(profile) {
    const buffer = profile_1.perftools.profiles.Profile.encode(profile).finish();
    return zlib_1.gzipSync(buffer);
}
exports.encodeSync = encodeSync;
//# sourceMappingURL=profile-encoder.js.map