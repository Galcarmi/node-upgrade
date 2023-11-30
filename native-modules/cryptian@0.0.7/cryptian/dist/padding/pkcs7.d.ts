import Pkcs5 from './pkcs5';
export default class Pkcs7 extends Pkcs5 {
    validateBlockSize(blockSize: number): void;
}
