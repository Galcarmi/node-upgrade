"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamDecrypt = exports.StreamEncrypt = exports.Stream = void 0;
const stream_1 = require("stream");
class Stream extends stream_1.Transform {
    constructor(options, cipher) {
        super(options);
        this._cipher = cipher;
    }
    _flush(callback) {
        return callback(null, Buffer.alloc(0));
    }
}
exports.Stream = Stream;
class StreamEncrypt extends Stream {
    _transform(data, encoding, callback) {
        try {
            return callback(null, this._cipher.encrypt(typeof data === 'string' ? Buffer.from(data, encoding) : data));
        }
        catch (err) {
            return callback(err);
        }
    }
}
exports.StreamEncrypt = StreamEncrypt;
class StreamDecrypt extends Stream {
    _transform(data, encoding, callback) {
        try {
            return callback(null, this._cipher.decrypt(typeof data === 'string' ? Buffer.from(data, encoding) : data));
        }
        catch (err) {
            return callback(err);
        }
    }
}
exports.StreamDecrypt = StreamDecrypt;
