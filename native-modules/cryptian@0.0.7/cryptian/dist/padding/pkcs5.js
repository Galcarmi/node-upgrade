"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const padding_1 = __importDefault(require("../padding"));
class Pkcs5 extends padding_1.default {
    constructor(blockSize) {
        super(blockSize);
        this.validateBlockSize(blockSize);
    }
    validateBlockSize(blockSize) {
        if (blockSize !== 8) {
            throw new Error('PKCS5 allows only 8 bytes block size');
        }
    }
    pad(chunk) {
        const padSize = this._blockSize - (chunk.length % this._blockSize);
        return Buffer.concat([chunk, Buffer.alloc(padSize, padSize)]);
    }
    unpad(chunk) {
        const paddingByte = chunk[chunk.length - 1];
        if (paddingByte > this._blockSize) {
            throw new Error('Invalid padding byte by padding size');
        }
        for (let i = 1; i < paddingByte; i++) {
            if (chunk[chunk.length - i] !== paddingByte) {
                throw new Error('Padding byte array not same');
            }
        }
        return chunk.slice(0, chunk.length - paddingByte);
    }
}
exports.default = Pkcs5;
