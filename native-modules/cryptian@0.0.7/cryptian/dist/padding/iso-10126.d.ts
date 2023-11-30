/// <reference types="node" />
import Padding from '../padding';
export default class Iso10126 extends Padding {
    pad(chunk: Buffer): Buffer;
    unpad(chunk: Buffer): Buffer;
}
