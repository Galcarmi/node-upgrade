"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const padding_1 = __importDefault(require("../padding"));
class AnsiX923 extends padding_1.default {
    pad(chunk) {
        const padSize = this._blockSize - (chunk.length % this._blockSize);
        const padding = Buffer.alloc(padSize, 0);
        padding[padSize - 1] = padSize;
        return Buffer.concat([chunk, padding]);
    }
    unpad(chunk) {
        const size = chunk[chunk.length - 1];
        if (size > this._blockSize) {
            throw new Error('Invalid block size or last byte not indicating the padding size');
        }
        const limit = chunk.length - size;
        const padding = chunk.slice(limit);
        for (let i = 0; i < size - 1; i++) {
            if (padding[i] !== 0) {
                throw new Error('Padding byte should be zero');
            }
        }
        return chunk.slice(0, limit);
    }
}
exports.default = AnsiX923;
