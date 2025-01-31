"use strict";
/**
 * Copyright 2022 Google LLC.
 * Copyright (c) Microsoft Corporation.
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const sinon = __importStar(require("sinon"));
const buffer_js_1 = require("./buffer.js");
describe('Buffer', () => {
    it('should keep values', () => {
        const buffer = new buffer_js_1.Buffer(2);
        (0, chai_1.expect)(buffer.get()).to.deep.equal([]);
        buffer.add(1);
        (0, chai_1.expect)(buffer.get()).to.deep.equal([1]);
        buffer.add(2);
        (0, chai_1.expect)(buffer.get()).to.deep.equal([1, 2]);
        buffer.add(3);
        (0, chai_1.expect)(buffer.get()).to.deep.equal([2, 3]);
    });
    it('should call "onRemoved"', () => {
        const onRemoved = sinon.mock();
        const buffer = new buffer_js_1.Buffer(2, onRemoved);
        buffer.add(1);
        sinon.assert.notCalled(onRemoved);
        buffer.add(2);
        sinon.assert.notCalled(onRemoved);
        buffer.add(3);
        sinon.assert.calledOnceWithExactly(onRemoved, 1);
    });
});
//# sourceMappingURL=buffer.spec.js.map