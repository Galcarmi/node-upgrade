"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pkcs5_1 = __importDefault(require("./pkcs5"));
class Pkcs7 extends pkcs5_1.default {
    validateBlockSize(blockSize) {
        if (blockSize > 255) {
            throw new Error('PKCS7 block size can be up to 255 bytes');
        }
    }
}
exports.default = Pkcs7;
