/// <reference types="node" />
/// <reference types="node" />
import { Transform, TransformCallback, TransformOptions } from 'stream';
import type { AlgorithmStream } from '../algorithm/stream';
export declare class Stream extends Transform {
    _cipher: AlgorithmStream;
    constructor(options: TransformOptions | undefined, cipher: AlgorithmStream);
    _flush(callback: TransformCallback): void;
}
export declare class StreamEncrypt extends Stream {
    _transform(data: Buffer, encoding: BufferEncoding, callback: TransformCallback): void;
}
export declare class StreamDecrypt extends Stream {
    _transform(data: Buffer, encoding: BufferEncoding, callback: TransformCallback): void;
}
