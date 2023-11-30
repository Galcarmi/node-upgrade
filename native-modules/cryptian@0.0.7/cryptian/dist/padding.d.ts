/// <reference types="node" />
export default class Padding {
    _blockSize: number;
    constructor(blockSize: number);
    pad(chunk: Buffer): Buffer;
    unpad(chunk: Buffer): Buffer;
}
