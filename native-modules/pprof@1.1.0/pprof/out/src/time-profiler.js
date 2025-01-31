"use strict";
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
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
const delay_1 = require("delay");
const profile_serializer_1 = require("./profile-serializer");
const time_profiler_bindings_1 = require("./time-profiler-bindings");
let profiling = false;
const DEFAULT_INTERVAL_MICROS = 1000;
function profile(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const stop = start(options.intervalMicros || DEFAULT_INTERVAL_MICROS, options.name, options.sourceMapper, options.lineNumbers);
        yield delay_1.default(options.durationMillis);
        return stop();
    });
}
exports.profile = profile;
function start(intervalMicros = DEFAULT_INTERVAL_MICROS, name, sourceMapper, lineNumbers) {
    if (profiling) {
        throw new Error('already profiling');
    }
    profiling = true;
    const runName = name || `pprof-${Date.now()}-${Math.random()}`;
    time_profiler_bindings_1.setSamplingInterval(intervalMicros);
    // Node.js contains an undocumented API for reporting idle status to V8.
    // This lets the profiler distinguish idle time from time spent in native
    // code. Ideally this should be default behavior. Until then, use the
    // undocumented API.
    // See https://github.com/nodejs/node/issues/19009#issuecomment-403161559.
    // tslint:disable-next-line no-any
    process._startProfilerIdleNotifier();
    time_profiler_bindings_1.startProfiling(runName, lineNumbers);
    return function stop() {
        profiling = false;
        const result = time_profiler_bindings_1.stopProfiling(runName, lineNumbers);
        // tslint:disable-next-line no-any
        process._stopProfilerIdleNotifier();
        const profile = profile_serializer_1.serializeTimeProfile(result, intervalMicros, sourceMapper);
        return profile;
    };
}
exports.start = start;
//# sourceMappingURL=time-profiler.js.map