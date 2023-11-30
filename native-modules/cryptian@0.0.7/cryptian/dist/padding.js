"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class Padding {
    constructor(blockSize) {
        this._blockSize = blockSize;
    }
    pad(chunk) {
        throw new error_1.NotImplementedError('pad function should be implemented');
    }
    unpad(chunk) {
        throw new error_1.NotImplementedError('unpad function should be implemented');
    }
}
exports.default = Padding;
