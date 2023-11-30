/// <reference types="node" />
import Padding from "../padding";
export default class Iso7816 extends Padding {
    pad(chunk: Buffer): Buffer;
    unpad(chunk: Buffer): Buffer;
}
