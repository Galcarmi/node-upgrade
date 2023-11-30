"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const padding_1 = __importDefault(require("../padding"));
class Iso10126 extends padding_1.default {
    pad(chunk) {
        const padSize = this._blockSize - (chunk.length % this._blockSize);
        const padding = (0, crypto_1.randomBytes)(padSize);
        padding[padSize - 1] = padSize;
        return Buffer.concat([chunk, padding]);
    }
    unpad(chunk) {
        const size = chunk[chunk.length - 1];
        if (size > this._blockSize) {
            throw new Error('Invalid block size or last byte not indicating the padding size');
        }
        return chunk.slice(0, chunk.length - size);
    }
}
exports.default = Iso10126;
