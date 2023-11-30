/// <reference types="node" />
import type { AlgorithmBlock } from './algorithm/block';
import type { AlgorithmStream } from './algorithm/stream';
import type { Mode } from './mode';
export type ModeCipherDecipher = {
    Cipher: typeof Mode;
    Decipher: typeof Mode;
};
export declare enum ModeList {
    Cbc = "cbc",
    Cfb = "cfb",
    Ctr = "ctr",
    Ecb = "ecb",
    Ncfb = "ncfb",
    Nofb = "nofb",
    Ofb = "ofb"
}
export declare enum BlockAlgorithmList {
    Blowfish = "Blowfish",
    Cast128 = "Cast128",
    Cast256 = "Cast256",
    Des = "Des",
    Threeway = "Threeway",
    Gost = "Gost",
    Loki97 = "Loki97",
    Rc2 = "Rc2",
    Rijndael128 = "Rijndael128",
    Rijndael192 = "Rijndael192",
    Rijndael256 = "Rijndael256",
    Safer = "Safer",
    Saferplus = "Saferplus",
    Tripledes = "Tripledes",
    Xtea = "Xtea",
    Dummy = "Dummy"
}
export declare enum StreamAlgorithmList {
    Arcfour = "Arcfour",
    Enigma = "Enigma",
    Wake = "Wake"
}
export declare enum PaddingList {
    Null = "Null",
    Pkcs5 = "Pkcs5",
    Pkcs7 = "Pkcs7",
    Space = "Space",
    Iso7816 = "Iso7816",
    Iso10126 = "Iso10126",
    AnsiX923 = "AnsiX923"
}
type AlgoList = {
    [Property in `${BlockAlgorithmList}`]: typeof AlgorithmBlock;
} & {
    [Property in `${StreamAlgorithmList}`]: typeof AlgorithmStream;
};
export type Cryptian = {
    Mode: typeof Mode;
    AlgorithmBlock: typeof AlgorithmBlock;
    AlgorithmStream: typeof AlgorithmStream;
    mode: {
        [Property in `${ModeList}`]: ModeCipherDecipher;
    };
    algorithm: AlgoList;
};
declare const _default: Cryptian;
export default _default;
import Null from "./padding/null";
import Pkcs5 from "./padding/pkcs5";
import Pkcs7 from "./padding/pkcs7";
import Space from "./padding/space";
import Iso7816 from "./padding/iso-7816";
import Iso10126 from "./padding/iso-10126";
import AnsiX923 from "./padding/ansi-x923";
export declare const padding: {
    Null: typeof Null;
    Pkcs5: typeof Pkcs5;
    Pkcs7: typeof Pkcs7;
    Space: typeof Space;
    Iso7816: typeof Iso7816;
    Iso10126: typeof Iso10126;
    AnsiX923: typeof AnsiX923;
};
import { BlockEncrypt, BlockDecrypt } from './transform/block';
import { StreamEncrypt, StreamDecrypt } from './transform/stream';
export declare const createDecryptStream: (cipher: AlgorithmBlock | AlgorithmStream | Mode, Padder?: typeof import("./padding").default | undefined, options?: import("stream").TransformOptions | undefined) => BlockEncrypt | BlockDecrypt | StreamEncrypt | StreamDecrypt;
export declare const createEncryptStream: (cipher: AlgorithmBlock | AlgorithmStream | Mode, Padder?: typeof import("./padding").default | undefined, options?: import("stream").TransformOptions | undefined) => BlockEncrypt | BlockDecrypt | StreamEncrypt | StreamDecrypt;
