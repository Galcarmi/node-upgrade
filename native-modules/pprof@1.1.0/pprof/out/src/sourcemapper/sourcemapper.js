"use strict";
/**
 * Copyright 2016 Google Inc. All Rights Reserved.
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
// Originally copied from cloud-debug-nodejs's sourcemapper.ts from
// https://github.com/googleapis/cloud-debug-nodejs/blob/7bdc2f1f62a3b45b7b53ea79f9444c8ed50e138b/src/agent/io/sourcemapper.ts
// Modified to map from generated code to source code, rather than from source
// code to generated code.
const fs = require("fs");
const path = require("path");
const sourceMap = require("source-map");
const scanner = require("../../third_party/cloud-debug-nodejs/src/agent/io/scanner");
const pify = require('pify');
const pLimit = require('p-limit');
const readFile = pify(fs.readFile);
const CONCURRENCY = 10;
const MAP_EXT = '.map';
/**
 * @param {!Map} infoMap The map that maps input source files to
 *  SourceMapConsumer objects that are used to calculate mapping information
 * @param {string} mapPath The path to the source map file to process.  The
 *  path should be relative to the process's current working directory
 * @private
 */
function processSourceMap(infoMap, mapPath) {
    return __awaiter(this, void 0, void 0, function* () {
        // this handles the case when the path is undefined, null, or
        // the empty string
        if (!mapPath || !mapPath.endsWith(MAP_EXT)) {
            throw new Error(`The path "${mapPath}" does not specify a source map file`);
        }
        mapPath = path.normalize(mapPath);
        let contents;
        try {
            contents = yield readFile(mapPath, 'utf8');
        }
        catch (e) {
            throw new Error('Could not read source map file ' + mapPath + ': ' + e);
        }
        let consumer;
        try {
            // TODO: Determine how to reconsile the type conflict where `consumer`
            //       is constructed as a SourceMapConsumer but is used as a
            //       RawSourceMap.
            // TODO: Resolve the cast of `contents as any` (This is needed because the
            //       type is expected to be of `RawSourceMap` but the existing
            //       working code uses a string.)
            consumer = (yield new sourceMap.SourceMapConsumer(contents));
        }
        catch (e) {
            throw new Error('An error occurred while reading the ' +
                'sourceMap file ' +
                mapPath +
                ': ' +
                e);
        }
        /*
         * If the source map file defines a "file" attribute, use it as
         * the output file where the path is relative to the directory
         * containing the map file.  Otherwise, use the name of the output
         * file (with the .map extension removed) as the output file.
         */
        const dir = path.dirname(mapPath);
        const generatedBase = consumer.file
            ? consumer.file
            : path.basename(mapPath, MAP_EXT);
        const generatedPath = path.resolve(dir, generatedBase);
        infoMap.set(generatedPath, { mapFileDir: dir, mapConsumer: consumer });
    });
}
class SourceMapper {
    static create(searchDirs) {
        return __awaiter(this, void 0, void 0, function* () {
            const mapFiles = [];
            for (const dir of searchDirs) {
                try {
                    const mf = yield getMapFiles(dir);
                    mf.forEach(mapFile => {
                        mapFiles.push(path.resolve(dir, mapFile));
                    });
                }
                catch (e) {
                    throw new Error(`failed to get source maps from ${dir}: ${e}`);
                }
            }
            return createFromMapFiles(mapFiles);
        });
    }
    /**
     * @param {Array.<string>} sourceMapPaths An array of paths to .map source map
     *  files that should be processed.  The paths should be relative to the
     *  current process's current working directory
     * @param {Logger} logger A logger that reports errors that occurred while
     *  processing the given source map files
     * @constructor
     */
    constructor() {
        this.infoMap = new Map();
    }
    /**
     * Used to get the information about the transpiled file from a given input
     * source file provided there isn't any ambiguity with associating the input
     * path to exactly one output transpiled file.
     *
     * @param inputPath The (possibly relative) path to the original source file.
     * @return The `MapInfoCompiled` object that describes the transpiled file
     *  associated with the specified input path.  `null` is returned if either
     *  zero files are associated with the input path or if more than one file
     *  could possibly be associated with the given input path.
     */
    getMappingInfo(inputPath) {
        if (this.infoMap.has(path.normalize(inputPath))) {
            return this.infoMap.get(inputPath);
        }
        return null;
    }
    /**
     * Used to determine if the source file specified by the given path has
     * a .map file and an output file associated with it.
     *
     * If there is no such mapping, it could be because the input file is not
     * the input to a transpilation process or it is the input to a transpilation
     * process but its corresponding .map file was not given to the constructor
     * of this mapper.
     *
     * @param {string} inputPath The path to an input file that could
     *  possibly be the input to a transpilation process.  The path should be
     *  relative to the process's current working directory.
     */
    hasMappingInfo(inputPath) {
        return this.getMappingInfo(inputPath) !== null;
    }
    /**
     * @param {string} inputPath The path to an input file that could possibly
     *  be the input to a transpilation process.  The path should be relative to
     *  the process's current working directory
     * @param {number} The line number in the input file where the line number is
     *   zero-based.
     * @param {number} (Optional) The column number in the line of the file
     *   specified where the column number is zero-based.
     * @return {Object} The object returned has a "file" attribute for the
     *   path of the output file associated with the given input file (where the
     *   path is relative to the process's current working directory),
     *   a "line" attribute of the line number in the output file associated with
     *   the given line number for the input file, and an optional "column" number
     *   of the column number of the output file associated with the given file
     *   and line information.
     *
     *   If the given input file does not have mapping information associated
     *   with it then the input location is returned.
     */
    mappingInfo(location) {
        const inputPath = path.normalize(location.file);
        const entry = this.getMappingInfo(inputPath);
        if (entry === null) {
            return location;
        }
        const generatedPos = { line: location.line, column: location.column };
        // TODO: Determine how to remove the explicit cast here.
        const consumer = entry.mapConsumer;
        const pos = consumer.originalPositionFor(generatedPos);
        if (pos.source === null) {
            return location;
        }
        return {
            file: path.resolve(entry.mapFileDir, pos.source),
            line: pos.line || undefined,
            name: pos.name || location.name,
            column: pos.column || undefined,
        };
    }
}
exports.SourceMapper = SourceMapper;
function createFromMapFiles(mapFiles) {
    return __awaiter(this, void 0, void 0, function* () {
        const limit = pLimit(CONCURRENCY);
        const mapper = new SourceMapper();
        const promises = mapFiles.map(mapPath => limit(() => processSourceMap(mapper.infoMap, mapPath)));
        try {
            yield Promise.all(promises);
        }
        catch (err) {
            throw new Error('An error occurred while processing the source map files' + err);
        }
        return mapper;
    });
}
function getMapFiles(baseDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const fileStats = yield scanner.scan(false, baseDir, /.js.map$/);
        const mapFiles = fileStats.selectFiles(/.js.map$/, process.cwd());
        return mapFiles;
    });
}
//# sourceMappingURL=sourcemapper.js.map