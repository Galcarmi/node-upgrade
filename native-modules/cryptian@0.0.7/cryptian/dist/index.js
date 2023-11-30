"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEncryptStream = exports.createDecryptStream = exports.padding = exports.PaddingList = exports.StreamAlgorithmList = exports.BlockAlgorithmList = exports.ModeList = void 0;
const bindings_1 = __importDefault(require("bindings"));
var ModeList;
(function (ModeList) {
    ModeList["Cbc"] = "cbc";
    ModeList["Cfb"] = "cfb";
    ModeList["Ctr"] = "ctr";
    ModeList["Ecb"] = "ecb";
    ModeList["Ncfb"] = "ncfb";
    ModeList["Nofb"] = "nofb";
    ModeList["Ofb"] = "ofb";
})(ModeList = exports.ModeList || (exports.ModeList = {}));
var BlockAlgorithmList;
(function (BlockAlgorithmList) {
    BlockAlgorithmList["Blowfish"] = "Blowfish";
    BlockAlgorithmList["Cast128"] = "Cast128";
    BlockAlgorithmList["Cast256"] = "Cast256";
    BlockAlgorithmList["Des"] = "Des";
    BlockAlgorithmList["Threeway"] = "Threeway";
    BlockAlgorithmList["Gost"] = "Gost";
    BlockAlgorithmList["Loki97"] = "Loki97";
    BlockAlgorithmList["Rc2"] = "Rc2";
    BlockAlgorithmList["Rijndael128"] = "Rijndael128";
    BlockAlgorithmList["Rijndael192"] = "Rijndael192";
    BlockAlgorithmList["Rijndael256"] = "Rijndael256";
    BlockAlgorithmList["Safer"] = "Safer";
    BlockAlgorithmList["Saferplus"] = "Saferplus";
    BlockAlgorithmList["Tripledes"] = "Tripledes";
    BlockAlgorithmList["Xtea"] = "Xtea";
    BlockAlgorithmList["Dummy"] = "Dummy";
})(BlockAlgorithmList = exports.BlockAlgorithmList || (exports.BlockAlgorithmList = {}));
var StreamAlgorithmList;
(function (StreamAlgorithmList) {
    StreamAlgorithmList["Arcfour"] = "Arcfour";
    StreamAlgorithmList["Enigma"] = "Enigma";
    StreamAlgorithmList["Wake"] = "Wake";
})(StreamAlgorithmList = exports.StreamAlgorithmList || (exports.StreamAlgorithmList = {}));
var PaddingList;
(function (PaddingList) {
    PaddingList["Null"] = "Null";
    PaddingList["Pkcs5"] = "Pkcs5";
    PaddingList["Pkcs7"] = "Pkcs7";
    PaddingList["Space"] = "Space";
    PaddingList["Iso7816"] = "Iso7816";
    PaddingList["Iso10126"] = "Iso10126";
    PaddingList["AnsiX923"] = "AnsiX923";
})(PaddingList = exports.PaddingList || (exports.PaddingList = {}));
const cryptian = (0, bindings_1.default)('cryptian');
exports.default = cryptian;
const null_1 = __importDefault(require("./padding/null"));
const pkcs5_1 = __importDefault(require("./padding/pkcs5"));
const pkcs7_1 = __importDefault(require("./padding/pkcs7"));
const space_1 = __importDefault(require("./padding/space"));
const iso_7816_1 = __importDefault(require("./padding/iso-7816"));
const iso_10126_1 = __importDefault(require("./padding/iso-10126"));
const ansi_x923_1 = __importDefault(require("./padding/ansi-x923"));
exports.padding = {
    Null: null_1.default, Pkcs5: pkcs5_1.default, Pkcs7: pkcs7_1.default, Space: space_1.default, Iso7816: iso_7816_1.default, Iso10126: iso_10126_1.default, AnsiX923: ansi_x923_1.default
};
const block_1 = require("./transform/block");
const stream_1 = require("./transform/stream");
const stream_2 = require("./stream");
exports.createDecryptStream = (0, stream_2.prepareStream)(cryptian, stream_1.StreamDecrypt, block_1.BlockDecrypt);
exports.createEncryptStream = (0, stream_2.prepareStream)(cryptian, stream_1.StreamEncrypt, block_1.BlockEncrypt);
