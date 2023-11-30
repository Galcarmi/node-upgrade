"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const padding_1 = __importDefault(require("../padding"));
class Iso7816 extends padding_1.default {
    pad(chunk) {
        const padSize = this._blockSize - (chunk.length % this._blockSize);
        const padding = Buffer.alloc(padSize, 0);
        padding[0] = 0x80;
        return Buffer.concat([chunk, padding]);
    }
    unpad(chunk) {
        let length = chunk.length;
        while (length--) {
            const size = chunk.length - length;
            if (size > this._blockSize) {
                throw new Error('Padding size exceeded block size');
            }
            if (chunk[length] === 0x80) {
                return chunk.slice(0, length);
            }
            if (chunk[length] !== 0) {
                throw new Error('Padding byte is not null');
            }
        }
        return Buffer.alloc(0);
    }
}
exports.default = Iso7816;
