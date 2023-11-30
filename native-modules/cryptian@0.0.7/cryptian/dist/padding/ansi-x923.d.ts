/// <reference types="node" />
import Padding from "../padding";
export default class AnsiX923 extends Padding {
    pad(chunk: Buffer): Buffer;
    unpad(chunk: Buffer): Buffer;
}
