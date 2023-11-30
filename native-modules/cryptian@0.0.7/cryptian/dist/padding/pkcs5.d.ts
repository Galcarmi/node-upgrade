/// <reference types="node" />
import Padding from '../padding';
export default class Pkcs5 extends Padding {
    constructor(blockSize: number);
    validateBlockSize(blockSize: number): void;
    pad(chunk: Buffer): Buffer;
    unpad(chunk: Buffer): Buffer;
}
