/// <reference types="node" />
/// <reference types="node" />
import { Transform, TransformCallback, TransformOptions } from 'stream';
import type Padding from '../padding';
import type { Mode } from '../mode';
export declare class Block extends Transform {
    _cipher: Mode;
    _padder?: Padding;
    _tail: Buffer;
    constructor(options: TransformOptions | undefined, cipher: Mode, padder?: Padding);
    _transform(data: Buffer, encoding: BufferEncoding, callback: TransformCallback): void;
}
export declare class BlockEncrypt extends Block {
    _flush(callback: TransformCallback): void;
    _pad(tail: Buffer): Buffer;
}
export declare class BlockDecrypt extends Block {
    _flush(callback: TransformCallback): void;
    _unpad(tail: Buffer): Buffer;
}
