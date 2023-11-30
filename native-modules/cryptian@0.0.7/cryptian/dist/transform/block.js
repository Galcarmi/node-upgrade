"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDecrypt = exports.BlockEncrypt = exports.Block = void 0;
const stream_1 = require("stream");
class Block extends stream_1.Transform {
    constructor(options, cipher, padder) {
        super(options);
        this._cipher = cipher;
        this._padder = padder;
        this._tail = Buffer.alloc(0);
    }
    _transform(data, encoding, callback) {
        const blockSize = this._cipher.getBlockSize();
        if (typeof data === 'string') {
            data = Buffer.from(data, encoding);
        }
        data = Buffer.concat([this._tail, data]);
        const remain = blockSize + ((data.length % blockSize) || blockSize);
        const align = data.length > remain ? data.length - remain : 0;
        this._tail = data.slice(align);
        try {
            return callback(null, this._cipher.transform(data.slice(0, align)));
        }
        catch (err) {
            return callback(err);
        }
    }
}
exports.Block = Block;
class BlockEncrypt extends Block {
    _flush(callback) {
        try {
            this.push(this._cipher.transform(this._pad(this._tail)));
            return callback(null);
        }
        catch (err) {
            return callback(err);
        }
    }
    _pad(tail) {
        if (!this._cipher.isPaddingRequired()) {
            return tail;
        }
        if (!this._padder) {
            throw new Error('padding is required but padding algorithm is not provided');
        }
        return this._padder.pad(tail);
    }
}
exports.BlockEncrypt = BlockEncrypt;
class BlockDecrypt extends Block {
    _flush(callback) {
        const target = this._cipher.transform(this._tail);
        try {
            this.push(this._unpad(target));
            return callback(null);
        }
        catch (err) {
            return callback(err);
        }
    }
    _unpad(tail) {
        if (!this._cipher.isPaddingRequired()) {
            return tail;
        }
        if (!this._padder) {
            throw new Error('padding is required but padding algorithm is not provided');
        }
        return this._padder.unpad(tail);
    }
}
exports.BlockDecrypt = BlockDecrypt;
