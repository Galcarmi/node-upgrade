/// <reference types="node" />
export declare class AlgorithmBlock {
    constructor();
    setKey(key: string | Buffer): this;
    encrypt(plaintext: string | Buffer): Buffer;
    decrypt(ciphertext: string | Buffer): Buffer;
    getName(): string;
    getVersion(): number;
    getKeySizes(): Array<number>;
    reset(): this;
    setEndianCompat(compat: boolean): this;
    getBlockSize(): number;
}
