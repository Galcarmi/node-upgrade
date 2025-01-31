/**
 * Copyright 2015 Google Inc. All Rights Reserved.
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
export interface FileStats {
    hash?: string;
    lines: number;
}
export interface ScanStats {
    [filename: string]: FileStats | undefined;
}
export interface ScanResults {
    errors(): Map<string, Error>;
    all(): ScanStats;
    selectFiles(regex: RegExp, baseDir: string): string[];
    hash?: string;
}
export declare function scan(shouldHash: boolean, baseDir: string, regex: RegExp): Promise<ScanResults>;
