"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareStream = void 0;
const padding_1 = __importDefault(require("./padding"));
function prepareStream(cryptian, Stream, Block) {
    return (cipher, Padder, options) => {
        if (cipher instanceof cryptian.AlgorithmStream) {
            return new Stream(options, cipher);
        }
        if (!(cipher instanceof cryptian.Mode)) {
            if (cipher instanceof cryptian.AlgorithmBlock) {
                throw new Error('You should wrap block algorithm with mode algorithm');
            }
            throw new Error('Cipher should be algorithm for stream encryption or mode for block encryption');
        }
        if (!cipher.isPaddingRequired()) {
            return new Block(options, cipher);
        }
        if (typeof Padder !== 'function') {
            throw new Error('Padder should be constructor');
        }
        const padder = new Padder(cipher.getBlockSize());
        if (!(padder instanceof padding_1.default)) {
            throw new Error('Padder constructor should be instance of Padding');
        }
        return new Block(options, cipher, padder);
    };
}
exports.prepareStream = prepareStream;
