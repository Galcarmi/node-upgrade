"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const padding_1 = __importDefault(require("../padding"));
class Null extends padding_1.default {
    pad(chunk) {
        const padSize = this._blockSize - (chunk.length % this._blockSize);
        return Buffer.concat([chunk, Buffer.alloc(padSize, 0)]);
    }
    unpad(chunk) {
        let length = chunk.length;
        while (length--) {
            const size = chunk.length - length;
            if ((chunk[length] === 0) && (size <= this._blockSize)) {
                continue;
            }
            return chunk.slice(0, length + 1);
        }
        return Buffer.alloc(0);
    }
}
exports.default = Null;
