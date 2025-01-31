import * as heapProfiler from './heap-profiler';
import * as timeProfiler from './time-profiler';
export { encode, encodeSync } from './profile-encoder';
export { SourceMapper } from './sourcemapper/sourcemapper';
export declare const time: {
    profile: typeof timeProfiler.profile;
    start: typeof timeProfiler.start;
};
export declare const heap: {
    start: typeof heapProfiler.start;
    stop: typeof heapProfiler.stop;
    profile: typeof heapProfiler.profile;
    v8Profile: typeof heapProfiler.v8Profile;
};
