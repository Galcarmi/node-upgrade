import Padding from './padding';
import type { Cryptian } from '.';
import type { BlockDecrypt, BlockEncrypt } from './transform/block';
import type { StreamEncrypt, StreamDecrypt } from './transform/stream';
import type { Mode } from './mode';
import type { AlgorithmBlock } from './algorithm/block';
import type { AlgorithmStream } from './algorithm/stream';
import type { TransformOptions } from 'stream';
type StreamCons = typeof StreamDecrypt | typeof StreamEncrypt;
type BlockCons = typeof BlockDecrypt | typeof BlockEncrypt;
export declare function prepareStream(cryptian: Cryptian, Stream: StreamCons, Block: BlockCons): (cipher: Mode | AlgorithmBlock | AlgorithmStream, Padder?: typeof Padding, options?: TransformOptions) => BlockEncrypt | BlockDecrypt | StreamEncrypt | StreamDecrypt;
export {};
