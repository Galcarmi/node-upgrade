/// <reference types="node" />
import Padding from '../padding';
export default class Space extends Padding {
    pad(chunk: Buffer): Buffer;
    unpad(chunk: Buffer): Buffer;
}
