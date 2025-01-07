"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __export = (target, all) => {
    for (var name5 in all)
      __defProp(target, name5, { get: all[name5], enumerable: true });
  };
  var __copyProps = (to, from11, except, desc) => {
    if (from11 && typeof from11 === "object" || typeof from11 === "function") {
      for (let key of __getOwnPropNames(from11))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from11[key], enumerable: !(desc = __getOwnPropDesc(from11, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/.pnpm/varint@6.0.0/node_modules/varint/encode.js
  var require_encode = __commonJS({
    "node_modules/.pnpm/varint@6.0.0/node_modules/varint/encode.js"(exports, module) {
      module.exports = encode21;
      var MSB3 = 128;
      var REST3 = 127;
      var MSBALL3 = ~REST3;
      var INT3 = Math.pow(2, 31);
      function encode21(num, out, offset) {
        if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
          encode21.bytes = 0;
          throw new RangeError("Could not encode varint");
        }
        out = out || [];
        offset = offset || 0;
        var oldOffset = offset;
        while (num >= INT3) {
          out[offset++] = num & 255 | MSB3;
          num /= 128;
        }
        while (num & MSBALL3) {
          out[offset++] = num & 255 | MSB3;
          num >>>= 7;
        }
        out[offset] = num | 0;
        encode21.bytes = offset - oldOffset + 1;
        return out;
      }
    }
  });

  // node_modules/.pnpm/varint@6.0.0/node_modules/varint/decode.js
  var require_decode = __commonJS({
    "node_modules/.pnpm/varint@6.0.0/node_modules/varint/decode.js"(exports, module) {
      module.exports = read7;
      var MSB3 = 128;
      var REST3 = 127;
      function read7(buf2, offset) {
        var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
        do {
          if (counter >= l || shift > 49) {
            read7.bytes = 0;
            throw new RangeError("Could not decode varint");
          }
          b = buf2[counter++];
          res += shift < 28 ? (b & REST3) << shift : (b & REST3) * Math.pow(2, shift);
          shift += 7;
        } while (b >= MSB3);
        read7.bytes = counter - offset;
        return res;
      }
    }
  });

  // node_modules/.pnpm/varint@6.0.0/node_modules/varint/length.js
  var require_length = __commonJS({
    "node_modules/.pnpm/varint@6.0.0/node_modules/varint/length.js"(exports, module) {
      var N13 = Math.pow(2, 7);
      var N23 = Math.pow(2, 14);
      var N33 = Math.pow(2, 21);
      var N43 = Math.pow(2, 28);
      var N53 = Math.pow(2, 35);
      var N63 = Math.pow(2, 42);
      var N73 = Math.pow(2, 49);
      var N83 = Math.pow(2, 56);
      var N93 = Math.pow(2, 63);
      module.exports = function(value) {
        return value < N13 ? 1 : value < N23 ? 2 : value < N33 ? 3 : value < N43 ? 4 : value < N53 ? 5 : value < N63 ? 6 : value < N73 ? 7 : value < N83 ? 8 : value < N93 ? 9 : 10;
      };
    }
  });

  // node_modules/.pnpm/varint@6.0.0/node_modules/varint/index.js
  var require_varint = __commonJS({
    "node_modules/.pnpm/varint@6.0.0/node_modules/varint/index.js"(exports, module) {
      module.exports = {
        encode: require_encode(),
        decode: require_decode(),
        encodingLength: require_length()
      };
    }
  });

  // (disabled):crypto
  var require_crypto = __commonJS({
    "(disabled):crypto"() {
    }
  });

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/is.js
  var typeofs = [
    "string",
    "number",
    "bigint",
    "symbol"
  ];
  var objectTypeNames = [
    "Function",
    "Generator",
    "AsyncGenerator",
    "GeneratorFunction",
    "AsyncGeneratorFunction",
    "AsyncFunction",
    "Observable",
    "Array",
    "Buffer",
    "Object",
    "RegExp",
    "Date",
    "Error",
    "Map",
    "Set",
    "WeakMap",
    "WeakSet",
    "ArrayBuffer",
    "SharedArrayBuffer",
    "DataView",
    "Promise",
    "URL",
    "HTMLElement",
    "Int8Array",
    "Uint8Array",
    "Uint8ClampedArray",
    "Int16Array",
    "Uint16Array",
    "Int32Array",
    "Uint32Array",
    "Float32Array",
    "Float64Array",
    "BigInt64Array",
    "BigUint64Array"
  ];
  function is(value) {
    if (value === null) {
      return "null";
    }
    if (value === void 0) {
      return "undefined";
    }
    if (value === true || value === false) {
      return "boolean";
    }
    const typeOf = typeof value;
    if (typeofs.includes(typeOf)) {
      return typeOf;
    }
    if (typeOf === "function") {
      return "Function";
    }
    if (Array.isArray(value)) {
      return "Array";
    }
    if (isBuffer(value)) {
      return "Buffer";
    }
    const objectType = getObjectType(value);
    if (objectType) {
      return objectType;
    }
    return "Object";
  }
  function isBuffer(value) {
    return value && value.constructor && value.constructor.isBuffer && value.constructor.isBuffer.call(null, value);
  }
  function getObjectType(value) {
    const objectTypeName = Object.prototype.toString.call(value).slice(8, -1);
    if (objectTypeNames.includes(objectTypeName)) {
      return objectTypeName;
    }
    return void 0;
  }

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/token.js
  var Type = class {
    /**
     * @param {number} major
     * @param {string} name
     * @param {boolean} terminal
     */
    constructor(major, name5, terminal) {
      this.major = major;
      this.majorEncoded = major << 5;
      this.name = name5;
      this.terminal = terminal;
    }
    /* c8 ignore next 3 */
    toString() {
      return `Type[${this.major}].${this.name}`;
    }
    /**
     * @param {Type} typ
     * @returns {number}
     */
    compare(typ) {
      return this.major < typ.major ? -1 : this.major > typ.major ? 1 : 0;
    }
  };
  Type.uint = new Type(0, "uint", true);
  Type.negint = new Type(1, "negint", true);
  Type.bytes = new Type(2, "bytes", true);
  Type.string = new Type(3, "string", true);
  Type.array = new Type(4, "array", false);
  Type.map = new Type(5, "map", false);
  Type.tag = new Type(6, "tag", false);
  Type.float = new Type(7, "float", true);
  Type.false = new Type(7, "false", true);
  Type.true = new Type(7, "true", true);
  Type.null = new Type(7, "null", true);
  Type.undefined = new Type(7, "undefined", true);
  Type.break = new Type(7, "break", true);
  var Token = class {
    /**
     * @param {Type} type
     * @param {any} [value]
     * @param {number} [encodedLength]
     */
    constructor(type, value, encodedLength) {
      this.type = type;
      this.value = value;
      this.encodedLength = encodedLength;
      this.encodedBytes = void 0;
      this.byteValue = void 0;
    }
    /* c8 ignore next 3 */
    toString() {
      return `Token[${this.type}].${this.value}`;
    }
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/byte-utils.js
  var useBuffer = globalThis.process && // @ts-ignore
  !globalThis.process.browser && // @ts-ignore
  globalThis.Buffer && // @ts-ignore
  typeof globalThis.Buffer.isBuffer === "function";
  var textDecoder = new TextDecoder();
  var textEncoder = new TextEncoder();
  function isBuffer2(buf2) {
    return useBuffer && globalThis.Buffer.isBuffer(buf2);
  }
  function asU8A(buf2) {
    if (!(buf2 instanceof Uint8Array)) {
      return Uint8Array.from(buf2);
    }
    return isBuffer2(buf2) ? new Uint8Array(buf2.buffer, buf2.byteOffset, buf2.byteLength) : buf2;
  }
  var toString = useBuffer ? (
    // eslint-disable-line operator-linebreak
    /**
     * @param {Uint8Array} bytes
     * @param {number} start
     * @param {number} end
     */
    (bytes2, start, end) => {
      return end - start > 64 ? (
        // eslint-disable-line operator-linebreak
        // @ts-ignore
        globalThis.Buffer.from(bytes2.subarray(start, end)).toString("utf8")
      ) : utf8Slice(bytes2, start, end);
    }
  ) : (
    // eslint-disable-line operator-linebreak
    /**
     * @param {Uint8Array} bytes
     * @param {number} start
     * @param {number} end
     */
    (bytes2, start, end) => {
      return end - start > 64 ? textDecoder.decode(bytes2.subarray(start, end)) : utf8Slice(bytes2, start, end);
    }
  );
  var fromString = useBuffer ? (
    // eslint-disable-line operator-linebreak
    /**
     * @param {string} string
     */
    (string2) => {
      return string2.length > 64 ? (
        // eslint-disable-line operator-linebreak
        // @ts-ignore
        globalThis.Buffer.from(string2)
      ) : utf8ToBytes(string2);
    }
  ) : (
    // eslint-disable-line operator-linebreak
    /**
     * @param {string} string
     */
    (string2) => {
      return string2.length > 64 ? textEncoder.encode(string2) : utf8ToBytes(string2);
    }
  );
  var slice = useBuffer ? (
    // eslint-disable-line operator-linebreak
    /**
     * @param {Uint8Array} bytes
     * @param {number} start
     * @param {number} end
     */
    (bytes2, start, end) => {
      if (isBuffer2(bytes2)) {
        return new Uint8Array(bytes2.subarray(start, end));
      }
      return bytes2.slice(start, end);
    }
  ) : (
    // eslint-disable-line operator-linebreak
    /**
     * @param {Uint8Array} bytes
     * @param {number} start
     * @param {number} end
     */
    (bytes2, start, end) => {
      return bytes2.slice(start, end);
    }
  );
  var concat = useBuffer ? (
    // eslint-disable-line operator-linebreak
    /**
     * @param {Uint8Array[]} chunks
     * @param {number} length
     * @returns {Uint8Array}
     */
    (chunks, length3) => {
      chunks = chunks.map((c) => c instanceof Uint8Array ? c : (
        // eslint-disable-line operator-linebreak
        // @ts-ignore
        globalThis.Buffer.from(c)
      ));
      return asU8A(globalThis.Buffer.concat(chunks, length3));
    }
  ) : (
    // eslint-disable-line operator-linebreak
    /**
     * @param {Uint8Array[]} chunks
     * @param {number} length
     * @returns {Uint8Array}
     */
    (chunks, length3) => {
      const out = new Uint8Array(length3);
      let off = 0;
      for (let b of chunks) {
        if (off + b.length > out.length) {
          b = b.subarray(0, out.length - off);
        }
        out.set(b, off);
        off += b.length;
      }
      return out;
    }
  );
  var alloc = useBuffer ? (
    // eslint-disable-line operator-linebreak
    /**
     * @param {number} size
     * @returns {Uint8Array}
     */
    (size2) => {
      return globalThis.Buffer.allocUnsafe(size2);
    }
  ) : (
    // eslint-disable-line operator-linebreak
    /**
     * @param {number} size
     * @returns {Uint8Array}
     */
    (size2) => {
      return new Uint8Array(size2);
    }
  );
  function compare(b1, b2) {
    if (isBuffer2(b1) && isBuffer2(b2)) {
      return b1.compare(b2);
    }
    for (let i = 0; i < b1.length; i++) {
      if (b1[i] === b2[i]) {
        continue;
      }
      return b1[i] < b2[i] ? -1 : 1;
    }
    return 0;
  }
  function utf8ToBytes(str) {
    const out = [];
    let p = 0;
    for (let i = 0; i < str.length; i++) {
      let c = str.charCodeAt(i);
      if (c < 128) {
        out[p++] = c;
      } else if (c < 2048) {
        out[p++] = c >> 6 | 192;
        out[p++] = c & 63 | 128;
      } else if ((c & 64512) === 55296 && i + 1 < str.length && (str.charCodeAt(i + 1) & 64512) === 56320) {
        c = 65536 + ((c & 1023) << 10) + (str.charCodeAt(++i) & 1023);
        out[p++] = c >> 18 | 240;
        out[p++] = c >> 12 & 63 | 128;
        out[p++] = c >> 6 & 63 | 128;
        out[p++] = c & 63 | 128;
      } else {
        out[p++] = c >> 12 | 224;
        out[p++] = c >> 6 & 63 | 128;
        out[p++] = c & 63 | 128;
      }
    }
    return out;
  }
  function utf8Slice(buf2, offset, end) {
    const res = [];
    while (offset < end) {
      const firstByte = buf2[offset];
      let codePoint = null;
      let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (offset + bytesPerSequence <= end) {
        let secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf2[offset + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf2[offset + 1];
            thirdByte = buf2[offset + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf2[offset + 1];
            thirdByte = buf2[offset + 2];
            fourthByte = buf2[offset + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      offset += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    let res = "";
    let i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(
        String,
        codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
      );
    }
    return res;
  }

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/bl.js
  var defaultChunkSize = 256;
  var Bl = class {
    /**
     * @param {number} [chunkSize]
     */
    constructor(chunkSize = defaultChunkSize) {
      this.chunkSize = chunkSize;
      this.cursor = 0;
      this.maxCursor = -1;
      this.chunks = [];
      this._initReuseChunk = null;
    }
    reset() {
      this.cursor = 0;
      this.maxCursor = -1;
      if (this.chunks.length) {
        this.chunks = [];
      }
      if (this._initReuseChunk !== null) {
        this.chunks.push(this._initReuseChunk);
        this.maxCursor = this._initReuseChunk.length - 1;
      }
    }
    /**
     * @param {Uint8Array|number[]} bytes
     */
    push(bytes2) {
      let topChunk = this.chunks[this.chunks.length - 1];
      const newMax = this.cursor + bytes2.length;
      if (newMax <= this.maxCursor + 1) {
        const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
        topChunk.set(bytes2, chunkPos);
      } else {
        if (topChunk) {
          const chunkPos = topChunk.length - (this.maxCursor - this.cursor) - 1;
          if (chunkPos < topChunk.length) {
            this.chunks[this.chunks.length - 1] = topChunk.subarray(0, chunkPos);
            this.maxCursor = this.cursor - 1;
          }
        }
        if (bytes2.length < 64 && bytes2.length < this.chunkSize) {
          topChunk = alloc(this.chunkSize);
          this.chunks.push(topChunk);
          this.maxCursor += topChunk.length;
          if (this._initReuseChunk === null) {
            this._initReuseChunk = topChunk;
          }
          topChunk.set(bytes2, 0);
        } else {
          this.chunks.push(bytes2);
          this.maxCursor += bytes2.length;
        }
      }
      this.cursor += bytes2.length;
    }
    /**
     * @param {boolean} [reset]
     * @returns {Uint8Array}
     */
    toBytes(reset = false) {
      let byts;
      if (this.chunks.length === 1) {
        const chunk = this.chunks[0];
        if (reset && this.cursor > chunk.length / 2) {
          byts = this.cursor === chunk.length ? chunk : chunk.subarray(0, this.cursor);
          this._initReuseChunk = null;
          this.chunks = [];
        } else {
          byts = slice(chunk, 0, this.cursor);
        }
      } else {
        byts = concat(this.chunks, this.cursor);
      }
      if (reset) {
        this.reset();
      }
      return byts;
    }
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/common.js
  var decodeErrPrefix = "CBOR decode error:";
  var encodeErrPrefix = "CBOR encode error:";
  var uintMinorPrefixBytes = [];
  uintMinorPrefixBytes[23] = 1;
  uintMinorPrefixBytes[24] = 2;
  uintMinorPrefixBytes[25] = 3;
  uintMinorPrefixBytes[26] = 5;
  uintMinorPrefixBytes[27] = 9;
  function assertEnoughData(data, pos, need) {
    if (data.length - pos < need) {
      throw new Error(`${decodeErrPrefix} not enough data for type`);
    }
  }

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/0uint.js
  var uintBoundaries = [24, 256, 65536, 4294967296, BigInt("18446744073709551616")];
  function readUint8(data, offset, options) {
    assertEnoughData(data, offset, 1);
    const value = data[offset];
    if (options.strict === true && value < uintBoundaries[0]) {
      throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    }
    return value;
  }
  function readUint16(data, offset, options) {
    assertEnoughData(data, offset, 2);
    const value = data[offset] << 8 | data[offset + 1];
    if (options.strict === true && value < uintBoundaries[1]) {
      throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    }
    return value;
  }
  function readUint32(data, offset, options) {
    assertEnoughData(data, offset, 4);
    const value = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
    if (options.strict === true && value < uintBoundaries[2]) {
      throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    }
    return value;
  }
  function readUint64(data, offset, options) {
    assertEnoughData(data, offset, 8);
    const hi = data[offset] * 16777216 + (data[offset + 1] << 16) + (data[offset + 2] << 8) + data[offset + 3];
    const lo = data[offset + 4] * 16777216 + (data[offset + 5] << 16) + (data[offset + 6] << 8) + data[offset + 7];
    const value = (BigInt(hi) << BigInt(32)) + BigInt(lo);
    if (options.strict === true && value < uintBoundaries[3]) {
      throw new Error(`${decodeErrPrefix} integer encoded in more bytes than necessary (strict decode)`);
    }
    if (value <= Number.MAX_SAFE_INTEGER) {
      return Number(value);
    }
    if (options.allowBigInt === true) {
      return value;
    }
    throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
  }
  function decodeUint8(data, pos, _minor, options) {
    return new Token(Type.uint, readUint8(data, pos + 1, options), 2);
  }
  function decodeUint16(data, pos, _minor, options) {
    return new Token(Type.uint, readUint16(data, pos + 1, options), 3);
  }
  function decodeUint32(data, pos, _minor, options) {
    return new Token(Type.uint, readUint32(data, pos + 1, options), 5);
  }
  function decodeUint64(data, pos, _minor, options) {
    return new Token(Type.uint, readUint64(data, pos + 1, options), 9);
  }
  function encodeUint(buf2, token) {
    return encodeUintValue(buf2, 0, token.value);
  }
  function encodeUintValue(buf2, major, uint) {
    if (uint < uintBoundaries[0]) {
      const nuint = Number(uint);
      buf2.push([major | nuint]);
    } else if (uint < uintBoundaries[1]) {
      const nuint = Number(uint);
      buf2.push([major | 24, nuint]);
    } else if (uint < uintBoundaries[2]) {
      const nuint = Number(uint);
      buf2.push([major | 25, nuint >>> 8, nuint & 255]);
    } else if (uint < uintBoundaries[3]) {
      const nuint = Number(uint);
      buf2.push([major | 26, nuint >>> 24 & 255, nuint >>> 16 & 255, nuint >>> 8 & 255, nuint & 255]);
    } else {
      const buint = BigInt(uint);
      if (buint < uintBoundaries[4]) {
        const set = [major | 27, 0, 0, 0, 0, 0, 0, 0];
        let lo = Number(buint & BigInt(4294967295));
        let hi = Number(buint >> BigInt(32) & BigInt(4294967295));
        set[8] = lo & 255;
        lo = lo >> 8;
        set[7] = lo & 255;
        lo = lo >> 8;
        set[6] = lo & 255;
        lo = lo >> 8;
        set[5] = lo & 255;
        set[4] = hi & 255;
        hi = hi >> 8;
        set[3] = hi & 255;
        hi = hi >> 8;
        set[2] = hi & 255;
        hi = hi >> 8;
        set[1] = hi & 255;
        buf2.push(set);
      } else {
        throw new Error(`${decodeErrPrefix} encountered BigInt larger than allowable range`);
      }
    }
  }
  encodeUint.encodedSize = function encodedSize(token) {
    return encodeUintValue.encodedSize(token.value);
  };
  encodeUintValue.encodedSize = function encodedSize2(uint) {
    if (uint < uintBoundaries[0]) {
      return 1;
    }
    if (uint < uintBoundaries[1]) {
      return 2;
    }
    if (uint < uintBoundaries[2]) {
      return 3;
    }
    if (uint < uintBoundaries[3]) {
      return 5;
    }
    return 9;
  };
  encodeUint.compareTokens = function compareTokens(tok1, tok2) {
    return tok1.value < tok2.value ? -1 : tok1.value > tok2.value ? 1 : (
      /* c8 ignore next */
      0
    );
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/1negint.js
  function decodeNegint8(data, pos, _minor, options) {
    return new Token(Type.negint, -1 - readUint8(data, pos + 1, options), 2);
  }
  function decodeNegint16(data, pos, _minor, options) {
    return new Token(Type.negint, -1 - readUint16(data, pos + 1, options), 3);
  }
  function decodeNegint32(data, pos, _minor, options) {
    return new Token(Type.negint, -1 - readUint32(data, pos + 1, options), 5);
  }
  var neg1b = BigInt(-1);
  var pos1b = BigInt(1);
  function decodeNegint64(data, pos, _minor, options) {
    const int = readUint64(data, pos + 1, options);
    if (typeof int !== "bigint") {
      const value = -1 - int;
      if (value >= Number.MIN_SAFE_INTEGER) {
        return new Token(Type.negint, value, 9);
      }
    }
    if (options.allowBigInt !== true) {
      throw new Error(`${decodeErrPrefix} integers outside of the safe integer range are not supported`);
    }
    return new Token(Type.negint, neg1b - BigInt(int), 9);
  }
  function encodeNegint(buf2, token) {
    const negint = token.value;
    const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
    encodeUintValue(buf2, token.type.majorEncoded, unsigned);
  }
  encodeNegint.encodedSize = function encodedSize3(token) {
    const negint = token.value;
    const unsigned = typeof negint === "bigint" ? negint * neg1b - pos1b : negint * -1 - 1;
    if (unsigned < uintBoundaries[0]) {
      return 1;
    }
    if (unsigned < uintBoundaries[1]) {
      return 2;
    }
    if (unsigned < uintBoundaries[2]) {
      return 3;
    }
    if (unsigned < uintBoundaries[3]) {
      return 5;
    }
    return 9;
  };
  encodeNegint.compareTokens = function compareTokens2(tok1, tok2) {
    return tok1.value < tok2.value ? 1 : tok1.value > tok2.value ? -1 : (
      /* c8 ignore next */
      0
    );
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/2bytes.js
  function toToken(data, pos, prefix, length3) {
    assertEnoughData(data, pos, prefix + length3);
    const buf2 = slice(data, pos + prefix, pos + prefix + length3);
    return new Token(Type.bytes, buf2, prefix + length3);
  }
  function decodeBytesCompact(data, pos, minor, _options) {
    return toToken(data, pos, 1, minor);
  }
  function decodeBytes8(data, pos, _minor, options) {
    return toToken(data, pos, 2, readUint8(data, pos + 1, options));
  }
  function decodeBytes16(data, pos, _minor, options) {
    return toToken(data, pos, 3, readUint16(data, pos + 1, options));
  }
  function decodeBytes32(data, pos, _minor, options) {
    return toToken(data, pos, 5, readUint32(data, pos + 1, options));
  }
  function decodeBytes64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(`${decodeErrPrefix} 64-bit integer bytes lengths not supported`);
    }
    return toToken(data, pos, 9, l);
  }
  function tokenBytes(token) {
    if (token.encodedBytes === void 0) {
      token.encodedBytes = token.type === Type.string ? fromString(token.value) : token.value;
    }
    return token.encodedBytes;
  }
  function encodeBytes(buf2, token) {
    const bytes2 = tokenBytes(token);
    encodeUintValue(buf2, token.type.majorEncoded, bytes2.length);
    buf2.push(bytes2);
  }
  encodeBytes.encodedSize = function encodedSize4(token) {
    const bytes2 = tokenBytes(token);
    return encodeUintValue.encodedSize(bytes2.length) + bytes2.length;
  };
  encodeBytes.compareTokens = function compareTokens3(tok1, tok2) {
    return compareBytes(tokenBytes(tok1), tokenBytes(tok2));
  };
  function compareBytes(b1, b2) {
    return b1.length < b2.length ? -1 : b1.length > b2.length ? 1 : compare(b1, b2);
  }

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/3string.js
  function toToken2(data, pos, prefix, length3, options) {
    const totLength = prefix + length3;
    assertEnoughData(data, pos, totLength);
    const tok = new Token(Type.string, toString(data, pos + prefix, pos + totLength), totLength);
    if (options.retainStringBytes === true) {
      tok.byteValue = slice(data, pos + prefix, pos + totLength);
    }
    return tok;
  }
  function decodeStringCompact(data, pos, minor, options) {
    return toToken2(data, pos, 1, minor, options);
  }
  function decodeString8(data, pos, _minor, options) {
    return toToken2(data, pos, 2, readUint8(data, pos + 1, options), options);
  }
  function decodeString16(data, pos, _minor, options) {
    return toToken2(data, pos, 3, readUint16(data, pos + 1, options), options);
  }
  function decodeString32(data, pos, _minor, options) {
    return toToken2(data, pos, 5, readUint32(data, pos + 1, options), options);
  }
  function decodeString64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(`${decodeErrPrefix} 64-bit integer string lengths not supported`);
    }
    return toToken2(data, pos, 9, l, options);
  }
  var encodeString = encodeBytes;

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/4array.js
  function toToken3(_data, _pos, prefix, length3) {
    return new Token(Type.array, length3, prefix);
  }
  function decodeArrayCompact(data, pos, minor, _options) {
    return toToken3(data, pos, 1, minor);
  }
  function decodeArray8(data, pos, _minor, options) {
    return toToken3(data, pos, 2, readUint8(data, pos + 1, options));
  }
  function decodeArray16(data, pos, _minor, options) {
    return toToken3(data, pos, 3, readUint16(data, pos + 1, options));
  }
  function decodeArray32(data, pos, _minor, options) {
    return toToken3(data, pos, 5, readUint32(data, pos + 1, options));
  }
  function decodeArray64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(`${decodeErrPrefix} 64-bit integer array lengths not supported`);
    }
    return toToken3(data, pos, 9, l);
  }
  function decodeArrayIndefinite(data, pos, _minor, options) {
    if (options.allowIndefinite === false) {
      throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    }
    return toToken3(data, pos, 1, Infinity);
  }
  function encodeArray(buf2, token) {
    encodeUintValue(buf2, Type.array.majorEncoded, token.value);
  }
  encodeArray.compareTokens = encodeUint.compareTokens;
  encodeArray.encodedSize = function encodedSize5(token) {
    return encodeUintValue.encodedSize(token.value);
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/5map.js
  function toToken4(_data, _pos, prefix, length3) {
    return new Token(Type.map, length3, prefix);
  }
  function decodeMapCompact(data, pos, minor, _options) {
    return toToken4(data, pos, 1, minor);
  }
  function decodeMap8(data, pos, _minor, options) {
    return toToken4(data, pos, 2, readUint8(data, pos + 1, options));
  }
  function decodeMap16(data, pos, _minor, options) {
    return toToken4(data, pos, 3, readUint16(data, pos + 1, options));
  }
  function decodeMap32(data, pos, _minor, options) {
    return toToken4(data, pos, 5, readUint32(data, pos + 1, options));
  }
  function decodeMap64(data, pos, _minor, options) {
    const l = readUint64(data, pos + 1, options);
    if (typeof l === "bigint") {
      throw new Error(`${decodeErrPrefix} 64-bit integer map lengths not supported`);
    }
    return toToken4(data, pos, 9, l);
  }
  function decodeMapIndefinite(data, pos, _minor, options) {
    if (options.allowIndefinite === false) {
      throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    }
    return toToken4(data, pos, 1, Infinity);
  }
  function encodeMap(buf2, token) {
    encodeUintValue(buf2, Type.map.majorEncoded, token.value);
  }
  encodeMap.compareTokens = encodeUint.compareTokens;
  encodeMap.encodedSize = function encodedSize6(token) {
    return encodeUintValue.encodedSize(token.value);
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/6tag.js
  function decodeTagCompact(_data, _pos, minor, _options) {
    return new Token(Type.tag, minor, 1);
  }
  function decodeTag8(data, pos, _minor, options) {
    return new Token(Type.tag, readUint8(data, pos + 1, options), 2);
  }
  function decodeTag16(data, pos, _minor, options) {
    return new Token(Type.tag, readUint16(data, pos + 1, options), 3);
  }
  function decodeTag32(data, pos, _minor, options) {
    return new Token(Type.tag, readUint32(data, pos + 1, options), 5);
  }
  function decodeTag64(data, pos, _minor, options) {
    return new Token(Type.tag, readUint64(data, pos + 1, options), 9);
  }
  function encodeTag(buf2, token) {
    encodeUintValue(buf2, Type.tag.majorEncoded, token.value);
  }
  encodeTag.compareTokens = encodeUint.compareTokens;
  encodeTag.encodedSize = function encodedSize7(token) {
    return encodeUintValue.encodedSize(token.value);
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/7float.js
  var MINOR_FALSE = 20;
  var MINOR_TRUE = 21;
  var MINOR_NULL = 22;
  var MINOR_UNDEFINED = 23;
  function decodeUndefined(_data, _pos, _minor, options) {
    if (options.allowUndefined === false) {
      throw new Error(`${decodeErrPrefix} undefined values are not supported`);
    } else if (options.coerceUndefinedToNull === true) {
      return new Token(Type.null, null, 1);
    }
    return new Token(Type.undefined, void 0, 1);
  }
  function decodeBreak(_data, _pos, _minor, options) {
    if (options.allowIndefinite === false) {
      throw new Error(`${decodeErrPrefix} indefinite length items not allowed`);
    }
    return new Token(Type.break, void 0, 1);
  }
  function createToken(value, bytes2, options) {
    if (options) {
      if (options.allowNaN === false && Number.isNaN(value)) {
        throw new Error(`${decodeErrPrefix} NaN values are not supported`);
      }
      if (options.allowInfinity === false && (value === Infinity || value === -Infinity)) {
        throw new Error(`${decodeErrPrefix} Infinity values are not supported`);
      }
    }
    return new Token(Type.float, value, bytes2);
  }
  function decodeFloat16(data, pos, _minor, options) {
    return createToken(readFloat16(data, pos + 1), 3, options);
  }
  function decodeFloat32(data, pos, _minor, options) {
    return createToken(readFloat32(data, pos + 1), 5, options);
  }
  function decodeFloat64(data, pos, _minor, options) {
    return createToken(readFloat64(data, pos + 1), 9, options);
  }
  function encodeFloat(buf2, token, options) {
    const float2 = token.value;
    if (float2 === false) {
      buf2.push([Type.float.majorEncoded | MINOR_FALSE]);
    } else if (float2 === true) {
      buf2.push([Type.float.majorEncoded | MINOR_TRUE]);
    } else if (float2 === null) {
      buf2.push([Type.float.majorEncoded | MINOR_NULL]);
    } else if (float2 === void 0) {
      buf2.push([Type.float.majorEncoded | MINOR_UNDEFINED]);
    } else {
      let decoded;
      let success = false;
      if (!options || options.float64 !== true) {
        encodeFloat16(float2);
        decoded = readFloat16(ui8a, 1);
        if (float2 === decoded || Number.isNaN(float2)) {
          ui8a[0] = 249;
          buf2.push(ui8a.slice(0, 3));
          success = true;
        } else {
          encodeFloat32(float2);
          decoded = readFloat32(ui8a, 1);
          if (float2 === decoded) {
            ui8a[0] = 250;
            buf2.push(ui8a.slice(0, 5));
            success = true;
          }
        }
      }
      if (!success) {
        encodeFloat64(float2);
        decoded = readFloat64(ui8a, 1);
        ui8a[0] = 251;
        buf2.push(ui8a.slice(0, 9));
      }
    }
  }
  encodeFloat.encodedSize = function encodedSize8(token, options) {
    const float2 = token.value;
    if (float2 === false || float2 === true || float2 === null || float2 === void 0) {
      return 1;
    }
    if (!options || options.float64 !== true) {
      encodeFloat16(float2);
      let decoded = readFloat16(ui8a, 1);
      if (float2 === decoded || Number.isNaN(float2)) {
        return 3;
      }
      encodeFloat32(float2);
      decoded = readFloat32(ui8a, 1);
      if (float2 === decoded) {
        return 5;
      }
    }
    return 9;
  };
  var buffer = new ArrayBuffer(9);
  var dataView = new DataView(buffer, 1);
  var ui8a = new Uint8Array(buffer, 0);
  function encodeFloat16(inp) {
    if (inp === Infinity) {
      dataView.setUint16(0, 31744, false);
    } else if (inp === -Infinity) {
      dataView.setUint16(0, 64512, false);
    } else if (Number.isNaN(inp)) {
      dataView.setUint16(0, 32256, false);
    } else {
      dataView.setFloat32(0, inp);
      const valu32 = dataView.getUint32(0);
      const exponent = (valu32 & 2139095040) >> 23;
      const mantissa = valu32 & 8388607;
      if (exponent === 255) {
        dataView.setUint16(0, 31744, false);
      } else if (exponent === 0) {
        dataView.setUint16(0, (inp & 2147483648) >> 16 | mantissa >> 13, false);
      } else {
        const logicalExponent = exponent - 127;
        if (logicalExponent < -24) {
          dataView.setUint16(0, 0);
        } else if (logicalExponent < -14) {
          dataView.setUint16(0, (valu32 & 2147483648) >> 16 | /* sign bit */
          1 << 24 + logicalExponent, false);
        } else {
          dataView.setUint16(0, (valu32 & 2147483648) >> 16 | logicalExponent + 15 << 10 | mantissa >> 13, false);
        }
      }
    }
  }
  function readFloat16(ui8a2, pos) {
    if (ui8a2.length - pos < 2) {
      throw new Error(`${decodeErrPrefix} not enough data for float16`);
    }
    const half = (ui8a2[pos] << 8) + ui8a2[pos + 1];
    if (half === 31744) {
      return Infinity;
    }
    if (half === 64512) {
      return -Infinity;
    }
    if (half === 32256) {
      return NaN;
    }
    const exp = half >> 10 & 31;
    const mant = half & 1023;
    let val;
    if (exp === 0) {
      val = mant * 2 ** -24;
    } else if (exp !== 31) {
      val = (mant + 1024) * 2 ** (exp - 25);
    } else {
      val = mant === 0 ? Infinity : NaN;
    }
    return half & 32768 ? -val : val;
  }
  function encodeFloat32(inp) {
    dataView.setFloat32(0, inp, false);
  }
  function readFloat32(ui8a2, pos) {
    if (ui8a2.length - pos < 4) {
      throw new Error(`${decodeErrPrefix} not enough data for float32`);
    }
    const offset = (ui8a2.byteOffset || 0) + pos;
    return new DataView(ui8a2.buffer, offset, 4).getFloat32(0, false);
  }
  function encodeFloat64(inp) {
    dataView.setFloat64(0, inp, false);
  }
  function readFloat64(ui8a2, pos) {
    if (ui8a2.length - pos < 8) {
      throw new Error(`${decodeErrPrefix} not enough data for float64`);
    }
    const offset = (ui8a2.byteOffset || 0) + pos;
    return new DataView(ui8a2.buffer, offset, 8).getFloat64(0, false);
  }
  encodeFloat.compareTokens = encodeUint.compareTokens;

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/jump.js
  function invalidMinor(data, pos, minor) {
    throw new Error(`${decodeErrPrefix} encountered invalid minor (${minor}) for major ${data[pos] >>> 5}`);
  }
  function errorer(msg) {
    return () => {
      throw new Error(`${decodeErrPrefix} ${msg}`);
    };
  }
  var jump = [];
  for (let i = 0; i <= 23; i++) {
    jump[i] = invalidMinor;
  }
  jump[24] = decodeUint8;
  jump[25] = decodeUint16;
  jump[26] = decodeUint32;
  jump[27] = decodeUint64;
  jump[28] = invalidMinor;
  jump[29] = invalidMinor;
  jump[30] = invalidMinor;
  jump[31] = invalidMinor;
  for (let i = 32; i <= 55; i++) {
    jump[i] = invalidMinor;
  }
  jump[56] = decodeNegint8;
  jump[57] = decodeNegint16;
  jump[58] = decodeNegint32;
  jump[59] = decodeNegint64;
  jump[60] = invalidMinor;
  jump[61] = invalidMinor;
  jump[62] = invalidMinor;
  jump[63] = invalidMinor;
  for (let i = 64; i <= 87; i++) {
    jump[i] = decodeBytesCompact;
  }
  jump[88] = decodeBytes8;
  jump[89] = decodeBytes16;
  jump[90] = decodeBytes32;
  jump[91] = decodeBytes64;
  jump[92] = invalidMinor;
  jump[93] = invalidMinor;
  jump[94] = invalidMinor;
  jump[95] = errorer("indefinite length bytes/strings are not supported");
  for (let i = 96; i <= 119; i++) {
    jump[i] = decodeStringCompact;
  }
  jump[120] = decodeString8;
  jump[121] = decodeString16;
  jump[122] = decodeString32;
  jump[123] = decodeString64;
  jump[124] = invalidMinor;
  jump[125] = invalidMinor;
  jump[126] = invalidMinor;
  jump[127] = errorer("indefinite length bytes/strings are not supported");
  for (let i = 128; i <= 151; i++) {
    jump[i] = decodeArrayCompact;
  }
  jump[152] = decodeArray8;
  jump[153] = decodeArray16;
  jump[154] = decodeArray32;
  jump[155] = decodeArray64;
  jump[156] = invalidMinor;
  jump[157] = invalidMinor;
  jump[158] = invalidMinor;
  jump[159] = decodeArrayIndefinite;
  for (let i = 160; i <= 183; i++) {
    jump[i] = decodeMapCompact;
  }
  jump[184] = decodeMap8;
  jump[185] = decodeMap16;
  jump[186] = decodeMap32;
  jump[187] = decodeMap64;
  jump[188] = invalidMinor;
  jump[189] = invalidMinor;
  jump[190] = invalidMinor;
  jump[191] = decodeMapIndefinite;
  for (let i = 192; i <= 215; i++) {
    jump[i] = decodeTagCompact;
  }
  jump[216] = decodeTag8;
  jump[217] = decodeTag16;
  jump[218] = decodeTag32;
  jump[219] = decodeTag64;
  jump[220] = invalidMinor;
  jump[221] = invalidMinor;
  jump[222] = invalidMinor;
  jump[223] = invalidMinor;
  for (let i = 224; i <= 243; i++) {
    jump[i] = errorer("simple values are not supported");
  }
  jump[244] = invalidMinor;
  jump[245] = invalidMinor;
  jump[246] = invalidMinor;
  jump[247] = decodeUndefined;
  jump[248] = errorer("simple values are not supported");
  jump[249] = decodeFloat16;
  jump[250] = decodeFloat32;
  jump[251] = decodeFloat64;
  jump[252] = invalidMinor;
  jump[253] = invalidMinor;
  jump[254] = invalidMinor;
  jump[255] = decodeBreak;
  var quick = [];
  for (let i = 0; i < 24; i++) {
    quick[i] = new Token(Type.uint, i, 1);
  }
  for (let i = -1; i >= -24; i--) {
    quick[31 - i] = new Token(Type.negint, i, 1);
  }
  quick[64] = new Token(Type.bytes, new Uint8Array(0), 1);
  quick[96] = new Token(Type.string, "", 1);
  quick[128] = new Token(Type.array, 0, 1);
  quick[160] = new Token(Type.map, 0, 1);
  quick[244] = new Token(Type.false, false, 1);
  quick[245] = new Token(Type.true, true, 1);
  quick[246] = new Token(Type.null, null, 1);

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/encode.js
  function makeCborEncoders() {
    const encoders = [];
    encoders[Type.uint.major] = encodeUint;
    encoders[Type.negint.major] = encodeNegint;
    encoders[Type.bytes.major] = encodeBytes;
    encoders[Type.string.major] = encodeString;
    encoders[Type.array.major] = encodeArray;
    encoders[Type.map.major] = encodeMap;
    encoders[Type.tag.major] = encodeTag;
    encoders[Type.float.major] = encodeFloat;
    return encoders;
  }
  var cborEncoders = makeCborEncoders();
  var buf = new Bl();
  var Ref = class _Ref {
    /**
     * @param {object|any[]} obj
     * @param {Reference|undefined} parent
     */
    constructor(obj, parent) {
      this.obj = obj;
      this.parent = parent;
    }
    /**
     * @param {object|any[]} obj
     * @returns {boolean}
     */
    includes(obj) {
      let p = this;
      do {
        if (p.obj === obj) {
          return true;
        }
      } while (p = p.parent);
      return false;
    }
    /**
     * @param {Reference|undefined} stack
     * @param {object|any[]} obj
     * @returns {Reference}
     */
    static createCheck(stack, obj) {
      if (stack && stack.includes(obj)) {
        throw new Error(`${encodeErrPrefix} object contains circular references`);
      }
      return new _Ref(obj, stack);
    }
  };
  var simpleTokens = {
    null: new Token(Type.null, null),
    undefined: new Token(Type.undefined, void 0),
    true: new Token(Type.true, true),
    false: new Token(Type.false, false),
    emptyArray: new Token(Type.array, 0),
    emptyMap: new Token(Type.map, 0)
  };
  var typeEncoders = {
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    number(obj, _typ, _options, _refStack) {
      if (!Number.isInteger(obj) || !Number.isSafeInteger(obj)) {
        return new Token(Type.float, obj);
      } else if (obj >= 0) {
        return new Token(Type.uint, obj);
      } else {
        return new Token(Type.negint, obj);
      }
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    bigint(obj, _typ, _options, _refStack) {
      if (obj >= BigInt(0)) {
        return new Token(Type.uint, obj);
      } else {
        return new Token(Type.negint, obj);
      }
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    Uint8Array(obj, _typ, _options, _refStack) {
      return new Token(Type.bytes, obj);
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    string(obj, _typ, _options, _refStack) {
      return new Token(Type.string, obj);
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    boolean(obj, _typ, _options, _refStack) {
      return obj ? simpleTokens.true : simpleTokens.false;
    },
    /**
     * @param {any} _obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    null(_obj, _typ, _options, _refStack) {
      return simpleTokens.null;
    },
    /**
     * @param {any} _obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    undefined(_obj, _typ, _options, _refStack) {
      return simpleTokens.undefined;
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    ArrayBuffer(obj, _typ, _options, _refStack) {
      return new Token(Type.bytes, new Uint8Array(obj));
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} _options
     * @param {Reference} [_refStack]
     * @returns {TokenOrNestedTokens}
     */
    DataView(obj, _typ, _options, _refStack) {
      return new Token(Type.bytes, new Uint8Array(obj.buffer, obj.byteOffset, obj.byteLength));
    },
    /**
     * @param {any} obj
     * @param {string} _typ
     * @param {EncodeOptions} options
     * @param {Reference} [refStack]
     * @returns {TokenOrNestedTokens}
     */
    Array(obj, _typ, options, refStack) {
      if (!obj.length) {
        if (options.addBreakTokens === true) {
          return [simpleTokens.emptyArray, new Token(Type.break)];
        }
        return simpleTokens.emptyArray;
      }
      refStack = Ref.createCheck(refStack, obj);
      const entries2 = [];
      let i = 0;
      for (const e of obj) {
        entries2[i++] = objectToTokens(e, options, refStack);
      }
      if (options.addBreakTokens) {
        return [new Token(Type.array, obj.length), entries2, new Token(Type.break)];
      }
      return [new Token(Type.array, obj.length), entries2];
    },
    /**
     * @param {any} obj
     * @param {string} typ
     * @param {EncodeOptions} options
     * @param {Reference} [refStack]
     * @returns {TokenOrNestedTokens}
     */
    Object(obj, typ, options, refStack) {
      const isMap = typ !== "Object";
      const keys = isMap ? obj.keys() : Object.keys(obj);
      const length3 = isMap ? obj.size : keys.length;
      if (!length3) {
        if (options.addBreakTokens === true) {
          return [simpleTokens.emptyMap, new Token(Type.break)];
        }
        return simpleTokens.emptyMap;
      }
      refStack = Ref.createCheck(refStack, obj);
      const entries2 = [];
      let i = 0;
      for (const key of keys) {
        entries2[i++] = [
          objectToTokens(key, options, refStack),
          objectToTokens(isMap ? obj.get(key) : obj[key], options, refStack)
        ];
      }
      sortMapEntries(entries2, options);
      if (options.addBreakTokens) {
        return [new Token(Type.map, length3), entries2, new Token(Type.break)];
      }
      return [new Token(Type.map, length3), entries2];
    }
  };
  typeEncoders.Map = typeEncoders.Object;
  typeEncoders.Buffer = typeEncoders.Uint8Array;
  for (const typ of "Uint8Clamped Uint16 Uint32 Int8 Int16 Int32 BigUint64 BigInt64 Float32 Float64".split(" ")) {
    typeEncoders[`${typ}Array`] = typeEncoders.DataView;
  }
  function objectToTokens(obj, options = {}, refStack) {
    const typ = is(obj);
    const customTypeEncoder = options && options.typeEncoders && /** @type {OptionalTypeEncoder} */
    options.typeEncoders[typ] || typeEncoders[typ];
    if (typeof customTypeEncoder === "function") {
      const tokens = customTypeEncoder(obj, typ, options, refStack);
      if (tokens != null) {
        return tokens;
      }
    }
    const typeEncoder = typeEncoders[typ];
    if (!typeEncoder) {
      throw new Error(`${encodeErrPrefix} unsupported type: ${typ}`);
    }
    return typeEncoder(obj, typ, options, refStack);
  }
  function sortMapEntries(entries2, options) {
    if (options.mapSorter) {
      entries2.sort(options.mapSorter);
    }
  }

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/decode.js
  var DONE = Symbol.for("DONE");
  var BREAK = Symbol.for("BREAK");

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bytes.js
  var empty = new Uint8Array(0);
  function equals(aa, bb) {
    if (aa === bb)
      return true;
    if (aa.byteLength !== bb.byteLength) {
      return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
      if (aa[ii] !== bb[ii]) {
        return false;
      }
    }
    return true;
  }
  function coerce(o) {
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
      return o;
    if (o instanceof ArrayBuffer)
      return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error("Unknown type, must be binary type");
  }

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/vendor/base-x.js
  function base(ALPHABET, name5) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long");
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous");
      }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode21(source) {
      if (source instanceof Uint8Array)
        ;
      else if (ArrayBuffer.isView(source)) {
        source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
      } else if (Array.isArray(source)) {
        source = Uint8Array.from(source);
      }
      if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (source.length === 0) {
        return "";
      }
      var zeroes = 0;
      var length3 = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
      var size2 = (pend - pbegin) * iFACTOR + 1 >>> 0;
      var b58 = new Uint8Array(size2);
      while (pbegin !== pend) {
        var carry = source[pbegin];
        var i2 = 0;
        for (var it1 = size2 - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
          carry += 256 * b58[it1] >>> 0;
          b58[it1] = carry % BASE >>> 0;
          carry = carry / BASE >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length3 = i2;
        pbegin++;
      }
      var it2 = size2 - length3;
      while (it2 !== size2 && b58[it2] === 0) {
        it2++;
      }
      var str = LEADER.repeat(zeroes);
      for (; it2 < size2; ++it2) {
        str += ALPHABET.charAt(b58[it2]);
      }
      return str;
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String");
      }
      if (source.length === 0) {
        return new Uint8Array();
      }
      var psz = 0;
      if (source[psz] === " ") {
        return;
      }
      var zeroes = 0;
      var length3 = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
      var size2 = (source.length - psz) * FACTOR + 1 >>> 0;
      var b256 = new Uint8Array(size2);
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)];
        if (carry === 255) {
          return;
        }
        var i2 = 0;
        for (var it3 = size2 - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
          carry += BASE * b256[it3] >>> 0;
          b256[it3] = carry % 256 >>> 0;
          carry = carry / 256 >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length3 = i2;
        psz++;
      }
      if (source[psz] === " ") {
        return;
      }
      var it4 = size2 - length3;
      while (it4 !== size2 && b256[it4] === 0) {
        it4++;
      }
      var vch = new Uint8Array(zeroes + (size2 - it4));
      var j2 = zeroes;
      while (it4 !== size2) {
        vch[j2++] = b256[it4++];
      }
      return vch;
    }
    function decode28(string2) {
      var buffer2 = decodeUnsafe(string2);
      if (buffer2) {
        return buffer2;
      }
      throw new Error(`Non-${name5} character`);
    }
    return {
      encode: encode21,
      decodeUnsafe,
      decode: decode28
    };
  }
  var src = base;
  var _brrp__multiformats_scope_baseX = src;
  var base_x_default = _brrp__multiformats_scope_baseX;

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base.js
  var Encoder = class {
    name;
    prefix;
    baseEncode;
    constructor(name5, prefix, baseEncode) {
      this.name = name5;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
    }
    encode(bytes2) {
      if (bytes2 instanceof Uint8Array) {
        return `${this.prefix}${this.baseEncode(bytes2)}`;
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };
  var Decoder = class {
    name;
    prefix;
    baseDecode;
    prefixCodePoint;
    constructor(name5, prefix, baseDecode) {
      this.name = name5;
      this.prefix = prefix;
      const prefixCodePoint = prefix.codePointAt(0);
      if (prefixCodePoint === void 0) {
        throw new Error("Invalid prefix character");
      }
      this.prefixCodePoint = prefixCodePoint;
      this.baseDecode = baseDecode;
    }
    decode(text2) {
      if (typeof text2 === "string") {
        if (text2.codePointAt(0) !== this.prefixCodePoint) {
          throw Error(`Unable to decode multibase string ${JSON.stringify(text2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        }
        return this.baseDecode(text2.slice(this.prefix.length));
      } else {
        throw Error("Can only multibase decode strings");
      }
    }
    or(decoder2) {
      return or(this, decoder2);
    }
  };
  var ComposedDecoder = class {
    decoders;
    constructor(decoders) {
      this.decoders = decoders;
    }
    or(decoder2) {
      return or(this, decoder2);
    }
    decode(input) {
      const prefix = input[0];
      const decoder2 = this.decoders[prefix];
      if (decoder2 != null) {
        return decoder2.decode(input);
      } else {
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    }
  };
  function or(left, right) {
    return new ComposedDecoder({
      ...left.decoders ?? { [left.prefix]: left },
      ...right.decoders ?? { [right.prefix]: right }
    });
  }
  var Codec = class {
    name;
    prefix;
    baseEncode;
    baseDecode;
    encoder;
    decoder;
    constructor(name5, prefix, baseEncode, baseDecode) {
      this.name = name5;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
      this.baseDecode = baseDecode;
      this.encoder = new Encoder(name5, prefix, baseEncode);
      this.decoder = new Decoder(name5, prefix, baseDecode);
    }
    encode(input) {
      return this.encoder.encode(input);
    }
    decode(input) {
      return this.decoder.decode(input);
    }
  };
  function from({ name: name5, prefix, encode: encode21, decode: decode28 }) {
    return new Codec(name5, prefix, encode21, decode28);
  }
  function baseX({ name: name5, prefix, alphabet }) {
    const { encode: encode21, decode: decode28 } = base_x_default(alphabet, name5);
    return from({
      prefix,
      name: name5,
      encode: encode21,
      decode: (text2) => coerce(decode28(text2))
    });
  }
  function decode2(string2, alphabet, bitsPerChar, name5) {
    const codes = {};
    for (let i = 0; i < alphabet.length; ++i) {
      codes[alphabet[i]] = i;
    }
    let end = string2.length;
    while (string2[end - 1] === "=") {
      --end;
    }
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer2 = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
      const value = codes[string2[i]];
      if (value === void 0) {
        throw new SyntaxError(`Non-${name5} character`);
      }
      buffer2 = buffer2 << bitsPerChar | value;
      bits += bitsPerChar;
      if (bits >= 8) {
        bits -= 8;
        out[written++] = 255 & buffer2 >> bits;
      }
    }
    if (bits >= bitsPerChar || (255 & buffer2 << 8 - bits) !== 0) {
      throw new SyntaxError("Unexpected end of data");
    }
    return out;
  }
  function encode2(data, alphabet, bitsPerChar) {
    const pad = alphabet[alphabet.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer2 = 0;
    for (let i = 0; i < data.length; ++i) {
      buffer2 = buffer2 << 8 | data[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        out += alphabet[mask & buffer2 >> bits];
      }
    }
    if (bits !== 0) {
      out += alphabet[mask & buffer2 << bitsPerChar - bits];
    }
    if (pad) {
      while ((out.length * bitsPerChar & 7) !== 0) {
        out += "=";
      }
    }
    return out;
  }
  function rfc4648({ name: name5, prefix, bitsPerChar, alphabet }) {
    return from({
      prefix,
      name: name5,
      encode(input) {
        return encode2(input, alphabet, bitsPerChar);
      },
      decode(input) {
        return decode2(input, alphabet, bitsPerChar, name5);
      }
    });
  }

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base32.js
  var base32 = rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  });
  var base32upper = rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  });
  var base32pad = rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  });
  var base32padupper = rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  });
  var base32hex = rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  });
  var base32hexupper = rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  });
  var base32hexpad = rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  });
  var base32hexpadupper = rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  });
  var base32z = rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  });

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base36.js
  var base36 = baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
  });
  var base36upper = baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  });

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base58.js
  var base58btc = baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  });
  var base58flickr = baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  });

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/vendor/varint.js
  var encode_1 = encode3;
  var MSB = 128;
  var REST = 127;
  var MSBALL = ~REST;
  var INT = Math.pow(2, 31);
  function encode3(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT) {
      out[offset++] = num & 255 | MSB;
      num /= 128;
    }
    while (num & MSBALL) {
      out[offset++] = num & 255 | MSB;
      num >>>= 7;
    }
    out[offset] = num | 0;
    encode3.bytes = offset - oldOffset + 1;
    return out;
  }
  var decode3 = read;
  var MSB$1 = 128;
  var REST$1 = 127;
  function read(buf2, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
    do {
      if (counter >= l) {
        read.bytes = 0;
        throw new RangeError("Could not decode varint");
      }
      b = buf2[counter++];
      res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB$1);
    read.bytes = counter - offset;
    return res;
  }
  var N1 = Math.pow(2, 7);
  var N2 = Math.pow(2, 14);
  var N3 = Math.pow(2, 21);
  var N4 = Math.pow(2, 28);
  var N5 = Math.pow(2, 35);
  var N6 = Math.pow(2, 42);
  var N7 = Math.pow(2, 49);
  var N8 = Math.pow(2, 56);
  var N9 = Math.pow(2, 63);
  var length = function(value) {
    return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
  };
  var varint = {
    encode: encode_1,
    decode: decode3,
    encodingLength: length
  };
  var _brrp_varint = varint;
  var varint_default = _brrp_varint;

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/varint.js
  function decode4(data, offset = 0) {
    const code8 = varint_default.decode(data, offset);
    return [code8, varint_default.decode.bytes];
  }
  function encodeTo(int, target, offset = 0) {
    varint_default.encode(int, target, offset);
    return target;
  }
  function encodingLength(int) {
    return varint_default.encodingLength(int);
  }

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/hashes/digest.js
  function create(code8, digest2) {
    const size2 = digest2.byteLength;
    const sizeOffset = encodingLength(code8);
    const digestOffset = sizeOffset + encodingLength(size2);
    const bytes2 = new Uint8Array(digestOffset + size2);
    encodeTo(code8, bytes2, 0);
    encodeTo(size2, bytes2, sizeOffset);
    bytes2.set(digest2, digestOffset);
    return new Digest(code8, size2, digest2, bytes2);
  }
  function decode5(multihash) {
    const bytes2 = coerce(multihash);
    const [code8, sizeOffset] = decode4(bytes2);
    const [size2, digestOffset] = decode4(bytes2.subarray(sizeOffset));
    const digest2 = bytes2.subarray(sizeOffset + digestOffset);
    if (digest2.byteLength !== size2) {
      throw new Error("Incorrect length");
    }
    return new Digest(code8, size2, digest2, bytes2);
  }
  function equals2(a, b) {
    if (a === b) {
      return true;
    } else {
      const data = b;
      return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals(a.bytes, data.bytes);
    }
  }
  var Digest = class {
    code;
    size;
    digest;
    bytes;
    /**
     * Creates a multihash digest.
     */
    constructor(code8, size2, digest2, bytes2) {
      this.code = code8;
      this.size = size2;
      this.digest = digest2;
      this.bytes = bytes2;
    }
  };

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/cid.js
  function format(link2, base3) {
    const { bytes: bytes2, version } = link2;
    switch (version) {
      case 0:
        return toStringV0(bytes2, baseCache(link2), base3 ?? base58btc.encoder);
      default:
        return toStringV1(bytes2, baseCache(link2), base3 ?? base32.encoder);
    }
  }
  var cache = /* @__PURE__ */ new WeakMap();
  function baseCache(cid) {
    const baseCache3 = cache.get(cid);
    if (baseCache3 == null) {
      const baseCache4 = /* @__PURE__ */ new Map();
      cache.set(cid, baseCache4);
      return baseCache4;
    }
    return baseCache3;
  }
  var CID = class _CID {
    code;
    version;
    multihash;
    bytes;
    "/";
    /**
     * @param version - Version of the CID
     * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param multihash - (Multi)hash of the of the content.
     */
    constructor(version, code8, multihash, bytes2) {
      this.code = code8;
      this.version = version;
      this.multihash = multihash;
      this.bytes = bytes2;
      this["/"] = bytes2;
    }
    /**
     * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
     * please either use `CID.asCID(cid)` or switch to new signalling mechanism
     *
     * @deprecated
     */
    get asCID() {
      return this;
    }
    // ArrayBufferView
    get byteOffset() {
      return this.bytes.byteOffset;
    }
    // ArrayBufferView
    get byteLength() {
      return this.bytes.byteLength;
    }
    toV0() {
      switch (this.version) {
        case 0: {
          return this;
        }
        case 1: {
          const { code: code8, multihash } = this;
          if (code8 !== DAG_PB_CODE) {
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          }
          if (multihash.code !== SHA_256_CODE) {
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          }
          return _CID.createV0(multihash);
        }
        default: {
          throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
        }
      }
    }
    toV1() {
      switch (this.version) {
        case 0: {
          const { code: code8, digest: digest2 } = this.multihash;
          const multihash = create(code8, digest2);
          return _CID.createV1(this.code, multihash);
        }
        case 1: {
          return this;
        }
        default: {
          throw Error(`Can not convert CID version ${this.version} to version 1. This is a bug please report`);
        }
      }
    }
    equals(other) {
      return _CID.equals(this, other);
    }
    static equals(self2, other) {
      const unknown2 = other;
      return unknown2 != null && self2.code === unknown2.code && self2.version === unknown2.version && equals2(self2.multihash, unknown2.multihash);
    }
    toString(base3) {
      return format(this, base3);
    }
    toJSON() {
      return { "/": format(this) };
    }
    link() {
      return this;
    }
    [Symbol.toStringTag] = "CID";
    // Legacy
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return `CID(${this.toString()})`;
    }
    /**
     * Takes any input `value` and returns a `CID` instance if it was
     * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
     * it will return value back. If `value` is not instance of this CID
     * class, but is compatible CID it will return new instance of this
     * `CID` class. Otherwise returns null.
     *
     * This allows two different incompatible versions of CID library to
     * co-exist and interop as long as binary interface is compatible.
     */
    static asCID(input) {
      if (input == null) {
        return null;
      }
      const value = input;
      if (value instanceof _CID) {
        return value;
      } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
        const { version, code: code8, multihash, bytes: bytes2 } = value;
        return new _CID(version, code8, multihash, bytes2 ?? encodeCID(version, code8, multihash.bytes));
      } else if (value[cidSymbol] === true) {
        const { version, multihash, code: code8 } = value;
        const digest2 = decode5(multihash);
        return _CID.create(version, code8, digest2);
      } else {
        return null;
      }
    }
    /**
     * @param version - Version of the CID
     * @param code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param digest - (Multi)hash of the of the content.
     */
    static create(version, code8, digest2) {
      if (typeof code8 !== "number") {
        throw new Error("String codecs are no longer supported");
      }
      if (!(digest2.bytes instanceof Uint8Array)) {
        throw new Error("Invalid digest");
      }
      switch (version) {
        case 0: {
          if (code8 !== DAG_PB_CODE) {
            throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
          } else {
            return new _CID(version, code8, digest2, digest2.bytes);
          }
        }
        case 1: {
          const bytes2 = encodeCID(version, code8, digest2.bytes);
          return new _CID(version, code8, digest2, bytes2);
        }
        default: {
          throw new Error("Invalid version");
        }
      }
    }
    /**
     * Simplified version of `create` for CIDv0.
     */
    static createV0(digest2) {
      return _CID.create(0, DAG_PB_CODE, digest2);
    }
    /**
     * Simplified version of `create` for CIDv1.
     *
     * @param code - Content encoding format code.
     * @param digest - Multihash of the content.
     */
    static createV1(code8, digest2) {
      return _CID.create(1, code8, digest2);
    }
    /**
     * Decoded a CID from its binary representation. The byte array must contain
     * only the CID with no additional bytes.
     *
     * An error will be thrown if the bytes provided do not contain a valid
     * binary representation of a CID.
     */
    static decode(bytes2) {
      const [cid, remainder] = _CID.decodeFirst(bytes2);
      if (remainder.length !== 0) {
        throw new Error("Incorrect length");
      }
      return cid;
    }
    /**
     * Decoded a CID from its binary representation at the beginning of a byte
     * array.
     *
     * Returns an array with the first element containing the CID and the second
     * element containing the remainder of the original byte array. The remainder
     * will be a zero-length byte array if the provided bytes only contained a
     * binary CID representation.
     */
    static decodeFirst(bytes2) {
      const specs = _CID.inspectBytes(bytes2);
      const prefixSize = specs.size - specs.multihashSize;
      const multihashBytes = coerce(bytes2.subarray(prefixSize, prefixSize + specs.multihashSize));
      if (multihashBytes.byteLength !== specs.multihashSize) {
        throw new Error("Incorrect length");
      }
      const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
      const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
      const cid = specs.version === 0 ? _CID.createV0(digest2) : _CID.createV1(specs.codec, digest2);
      return [cid, bytes2.subarray(specs.size)];
    }
    /**
     * Inspect the initial bytes of a CID to determine its properties.
     *
     * Involves decoding up to 4 varints. Typically this will require only 4 to 6
     * bytes but for larger multicodec code values and larger multihash digest
     * lengths these varints can be quite large. It is recommended that at least
     * 10 bytes be made available in the `initialBytes` argument for a complete
     * inspection.
     */
    static inspectBytes(initialBytes) {
      let offset = 0;
      const next = () => {
        const [i, length3] = decode4(initialBytes.subarray(offset));
        offset += length3;
        return i;
      };
      let version = next();
      let codec = DAG_PB_CODE;
      if (version === 18) {
        version = 0;
        offset = 0;
      } else {
        codec = next();
      }
      if (version !== 0 && version !== 1) {
        throw new RangeError(`Invalid CID version ${version}`);
      }
      const prefixSize = offset;
      const multihashCode = next();
      const digestSize = next();
      const size2 = offset + digestSize;
      const multihashSize = size2 - prefixSize;
      return { version, codec, multihashCode, digestSize, multihashSize, size: size2 };
    }
    /**
     * Takes cid in a string representation and creates an instance. If `base`
     * decoder is not provided will use a default from the configuration. It will
     * throw an error if encoding of the CID is not compatible with supplied (or
     * a default decoder).
     */
    static parse(source, base3) {
      const [prefix, bytes2] = parseCIDtoBytes(source, base3);
      const cid = _CID.decode(bytes2);
      if (cid.version === 0 && source[0] !== "Q") {
        throw Error("Version 0 CID string must not include multibase prefix");
      }
      baseCache(cid).set(prefix, source);
      return cid;
    }
  };
  function parseCIDtoBytes(source, base3) {
    switch (source[0]) {
      // CIDv0 is parsed differently
      case "Q": {
        const decoder2 = base3 ?? base58btc;
        return [
          base58btc.prefix,
          decoder2.decode(`${base58btc.prefix}${source}`)
        ];
      }
      case base58btc.prefix: {
        const decoder2 = base3 ?? base58btc;
        return [base58btc.prefix, decoder2.decode(source)];
      }
      case base32.prefix: {
        const decoder2 = base3 ?? base32;
        return [base32.prefix, decoder2.decode(source)];
      }
      case base36.prefix: {
        const decoder2 = base3 ?? base36;
        return [base36.prefix, decoder2.decode(source)];
      }
      default: {
        if (base3 == null) {
          throw Error("To parse non base32, base36 or base58btc encoded CID multibase decoder must be provided");
        }
        return [source[0], base3.decode(source)];
      }
    }
  }
  function toStringV0(bytes2, cache3, base3) {
    const { prefix } = base3;
    if (prefix !== base58btc.prefix) {
      throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
    }
    const cid = cache3.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes2).slice(1);
      cache3.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  }
  function toStringV1(bytes2, cache3, base3) {
    const { prefix } = base3;
    const cid = cache3.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes2);
      cache3.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  }
  var DAG_PB_CODE = 112;
  var SHA_256_CODE = 18;
  function encodeCID(version, code8, multihash) {
    const codeOffset = encodingLength(version);
    const hashOffset = codeOffset + encodingLength(code8);
    const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo(version, bytes2, 0);
    encodeTo(code8, bytes2, codeOffset);
    bytes2.set(multihash, hashOffset);
    return bytes2;
  }
  var cidSymbol = Symbol.for("@ipld/js-cid/CID");

  // node_modules/.pnpm/@ipld+dag-cbor@9.2.2/node_modules/@ipld/dag-cbor/src/index.js
  var CID_CBOR_TAG = 42;
  function cidEncoder(obj) {
    if (obj.asCID !== obj && obj["/"] !== obj.bytes) {
      return null;
    }
    const cid = CID.asCID(obj);
    if (!cid) {
      return null;
    }
    const bytes2 = new Uint8Array(cid.bytes.byteLength + 1);
    bytes2.set(cid.bytes, 1);
    return [
      new Token(Type.tag, CID_CBOR_TAG),
      new Token(Type.bytes, bytes2)
    ];
  }
  function undefinedEncoder() {
    throw new Error("`undefined` is not supported by the IPLD Data Model and cannot be encoded");
  }
  function numberEncoder(num) {
    if (Number.isNaN(num)) {
      throw new Error("`NaN` is not supported by the IPLD Data Model and cannot be encoded");
    }
    if (num === Infinity || num === -Infinity) {
      throw new Error("`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded");
    }
    return null;
  }
  var _encodeOptions = {
    float64: true,
    typeEncoders: {
      Object: cidEncoder,
      undefined: undefinedEncoder,
      number: numberEncoder
    }
  };
  var encodeOptions = {
    ..._encodeOptions,
    typeEncoders: {
      ..._encodeOptions.typeEncoders
    }
  };
  function cidDecoder(bytes2) {
    if (bytes2[0] !== 0) {
      throw new Error("Invalid CID for CBOR tag 42; expected leading 0x00");
    }
    return CID.decode(bytes2.subarray(1));
  }
  var _decodeOptions = {
    allowIndefinite: false,
    coerceUndefinedToNull: true,
    allowNaN: false,
    allowInfinity: false,
    allowBigInt: true,
    // this will lead to BigInt for ints outside of
    // safe-integer range, which may surprise users
    strict: true,
    useMaps: false,
    rejectDuplicateMapKeys: true,
    /** @type {import('cborg').TagDecoder[]} */
    tags: []
  };
  _decodeOptions.tags[CID_CBOR_TAG] = cidDecoder;
  var decodeOptions = {
    ..._decodeOptions,
    tags: _decodeOptions.tags.slice()
  };

  // node_modules/.pnpm/@ipld+dag-ucan@3.4.0/node_modules/@ipld/dag-ucan/src/utf8.js
  var encoder = new TextEncoder();
  var decoder = new TextDecoder();
  var encode4 = (text2) => encoder.encode(text2);
  var decode6 = (bytes2) => decoder.decode(bytes2);

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/varint.js
  var varint_exports2 = {};
  __export(varint_exports2, {
    decode: () => decode8,
    encodeTo: () => encodeTo2,
    encodingLength: () => encodingLength2
  });

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/vendor/varint.js
  var encode_12 = encode5;
  var MSB2 = 128;
  var REST2 = 127;
  var MSBALL2 = ~REST2;
  var INT2 = Math.pow(2, 31);
  function encode5(num, out, offset) {
    out = out || [];
    offset = offset || 0;
    var oldOffset = offset;
    while (num >= INT2) {
      out[offset++] = num & 255 | MSB2;
      num /= 128;
    }
    while (num & MSBALL2) {
      out[offset++] = num & 255 | MSB2;
      num >>>= 7;
    }
    out[offset] = num | 0;
    encode5.bytes = offset - oldOffset + 1;
    return out;
  }
  var decode7 = read2;
  var MSB$12 = 128;
  var REST$12 = 127;
  function read2(buf2, offset) {
    var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf2.length;
    do {
      if (counter >= l) {
        read2.bytes = 0;
        throw new RangeError("Could not decode varint");
      }
      b = buf2[counter++];
      res += shift < 28 ? (b & REST$12) << shift : (b & REST$12) * Math.pow(2, shift);
      shift += 7;
    } while (b >= MSB$12);
    read2.bytes = counter - offset;
    return res;
  }
  var N12 = Math.pow(2, 7);
  var N22 = Math.pow(2, 14);
  var N32 = Math.pow(2, 21);
  var N42 = Math.pow(2, 28);
  var N52 = Math.pow(2, 35);
  var N62 = Math.pow(2, 42);
  var N72 = Math.pow(2, 49);
  var N82 = Math.pow(2, 56);
  var N92 = Math.pow(2, 63);
  var length2 = function(value) {
    return value < N12 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N42 ? 4 : value < N52 ? 5 : value < N62 ? 6 : value < N72 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
  };
  var varint2 = {
    encode: encode_12,
    decode: decode7,
    encodingLength: length2
  };
  var _brrp_varint2 = varint2;
  var varint_default2 = _brrp_varint2;

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/varint.js
  var decode8 = (data, offset = 0) => {
    const code8 = varint_default2.decode(data, offset);
    return [code8, varint_default2.decode.bytes];
  };
  var encodeTo2 = (int, target, offset = 0) => {
    varint_default2.encode(int, target, offset);
    return target;
  };
  var encodingLength2 = (int) => {
    return varint_default2.encodingLength(int);
  };

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/bytes.js
  var empty2 = new Uint8Array(0);
  var equals3 = (aa, bb) => {
    if (aa === bb) return true;
    if (aa.byteLength !== bb.byteLength) {
      return false;
    }
    for (let ii = 0; ii < aa.byteLength; ii++) {
      if (aa[ii] !== bb[ii]) {
        return false;
      }
    }
    return true;
  };
  var coerce2 = (o) => {
    if (o instanceof Uint8Array && o.constructor.name === "Uint8Array") return o;
    if (o instanceof ArrayBuffer) return new Uint8Array(o);
    if (ArrayBuffer.isView(o)) {
      return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
    }
    throw new Error("Unknown type, must be binary type");
  };

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/hashes/digest.js
  var create2 = (code8, digest2) => {
    const size2 = digest2.byteLength;
    const sizeOffset = encodingLength2(code8);
    const digestOffset = sizeOffset + encodingLength2(size2);
    const bytes2 = new Uint8Array(digestOffset + size2);
    encodeTo2(code8, bytes2, 0);
    encodeTo2(size2, bytes2, sizeOffset);
    bytes2.set(digest2, digestOffset);
    return new Digest2(code8, size2, digest2, bytes2);
  };
  var decode9 = (multihash) => {
    const bytes2 = coerce2(multihash);
    const [code8, sizeOffset] = decode8(bytes2);
    const [size2, digestOffset] = decode8(bytes2.subarray(sizeOffset));
    const digest2 = bytes2.subarray(sizeOffset + digestOffset);
    if (digest2.byteLength !== size2) {
      throw new Error("Incorrect length");
    }
    return new Digest2(code8, size2, digest2, bytes2);
  };
  var equals4 = (a, b) => {
    if (a === b) {
      return true;
    } else {
      const data = (
        /** @type {{code?:unknown, size?:unknown, bytes?:unknown}} */
        b
      );
      return a.code === data.code && a.size === data.size && data.bytes instanceof Uint8Array && equals3(a.bytes, data.bytes);
    }
  };
  var Digest2 = class {
    /**
     * Creates a multihash digest.
     *
     * @param {Code} code
     * @param {Size} size
     * @param {Uint8Array} digest
     * @param {Uint8Array} bytes
     */
    constructor(code8, size2, digest2, bytes2) {
      this.code = code8;
      this.size = size2;
      this.digest = digest2;
      this.bytes = bytes2;
    }
  };

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/vendor/base-x.js
  function base2(ALPHABET, name5) {
    if (ALPHABET.length >= 255) {
      throw new TypeError("Alphabet too long");
    }
    var BASE_MAP = new Uint8Array(256);
    for (var j = 0; j < BASE_MAP.length; j++) {
      BASE_MAP[j] = 255;
    }
    for (var i = 0; i < ALPHABET.length; i++) {
      var x = ALPHABET.charAt(i);
      var xc = x.charCodeAt(0);
      if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + " is ambiguous");
      }
      BASE_MAP[xc] = i;
    }
    var BASE = ALPHABET.length;
    var LEADER = ALPHABET.charAt(0);
    var FACTOR = Math.log(BASE) / Math.log(256);
    var iFACTOR = Math.log(256) / Math.log(BASE);
    function encode21(source) {
      if (source instanceof Uint8Array) ;
      else if (ArrayBuffer.isView(source)) {
        source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
      } else if (Array.isArray(source)) {
        source = Uint8Array.from(source);
      }
      if (!(source instanceof Uint8Array)) {
        throw new TypeError("Expected Uint8Array");
      }
      if (source.length === 0) {
        return "";
      }
      var zeroes = 0;
      var length3 = 0;
      var pbegin = 0;
      var pend = source.length;
      while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
      }
      var size2 = (pend - pbegin) * iFACTOR + 1 >>> 0;
      var b58 = new Uint8Array(size2);
      while (pbegin !== pend) {
        var carry = source[pbegin];
        var i2 = 0;
        for (var it1 = size2 - 1; (carry !== 0 || i2 < length3) && it1 !== -1; it1--, i2++) {
          carry += 256 * b58[it1] >>> 0;
          b58[it1] = carry % BASE >>> 0;
          carry = carry / BASE >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length3 = i2;
        pbegin++;
      }
      var it2 = size2 - length3;
      while (it2 !== size2 && b58[it2] === 0) {
        it2++;
      }
      var str = LEADER.repeat(zeroes);
      for (; it2 < size2; ++it2) {
        str += ALPHABET.charAt(b58[it2]);
      }
      return str;
    }
    function decodeUnsafe(source) {
      if (typeof source !== "string") {
        throw new TypeError("Expected String");
      }
      if (source.length === 0) {
        return new Uint8Array();
      }
      var psz = 0;
      if (source[psz] === " ") {
        return;
      }
      var zeroes = 0;
      var length3 = 0;
      while (source[psz] === LEADER) {
        zeroes++;
        psz++;
      }
      var size2 = (source.length - psz) * FACTOR + 1 >>> 0;
      var b256 = new Uint8Array(size2);
      while (source[psz]) {
        var carry = BASE_MAP[source.charCodeAt(psz)];
        if (carry === 255) {
          return;
        }
        var i2 = 0;
        for (var it3 = size2 - 1; (carry !== 0 || i2 < length3) && it3 !== -1; it3--, i2++) {
          carry += BASE * b256[it3] >>> 0;
          b256[it3] = carry % 256 >>> 0;
          carry = carry / 256 >>> 0;
        }
        if (carry !== 0) {
          throw new Error("Non-zero carry");
        }
        length3 = i2;
        psz++;
      }
      if (source[psz] === " ") {
        return;
      }
      var it4 = size2 - length3;
      while (it4 !== size2 && b256[it4] === 0) {
        it4++;
      }
      var vch = new Uint8Array(zeroes + (size2 - it4));
      var j2 = zeroes;
      while (it4 !== size2) {
        vch[j2++] = b256[it4++];
      }
      return vch;
    }
    function decode28(string2) {
      var buffer2 = decodeUnsafe(string2);
      if (buffer2) {
        return buffer2;
      }
      throw new Error(`Non-${name5} character`);
    }
    return {
      encode: encode21,
      decodeUnsafe,
      decode: decode28
    };
  }
  var src2 = base2;
  var _brrp__multiformats_scope_baseX2 = src2;
  var base_x_default2 = _brrp__multiformats_scope_baseX2;

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/bases/base.js
  var Encoder2 = class {
    /**
     * @param {Base} name
     * @param {Prefix} prefix
     * @param {(bytes:Uint8Array) => string} baseEncode
     */
    constructor(name5, prefix, baseEncode) {
      this.name = name5;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
    }
    /**
     * @param {Uint8Array} bytes
     * @returns {API.Multibase<Prefix>}
     */
    encode(bytes2) {
      if (bytes2 instanceof Uint8Array) {
        return `${this.prefix}${this.baseEncode(bytes2)}`;
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };
  var Decoder2 = class {
    /**
     * @param {Base} name
     * @param {Prefix} prefix
     * @param {(text:string) => Uint8Array} baseDecode
     */
    constructor(name5, prefix, baseDecode) {
      this.name = name5;
      this.prefix = prefix;
      if (prefix.codePointAt(0) === void 0) {
        throw new Error("Invalid prefix character");
      }
      this.prefixCodePoint = /** @type {number} */
      prefix.codePointAt(0);
      this.baseDecode = baseDecode;
    }
    /**
     * @param {string} text
     */
    decode(text2) {
      if (typeof text2 === "string") {
        if (text2.codePointAt(0) !== this.prefixCodePoint) {
          throw Error(`Unable to decode multibase string ${JSON.stringify(text2)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
        }
        return this.baseDecode(text2.slice(this.prefix.length));
      } else {
        throw Error("Can only multibase decode strings");
      }
    }
    /**
     * @template {string} OtherPrefix
     * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
     * @returns {ComposedDecoder<Prefix|OtherPrefix>}
     */
    or(decoder2) {
      return or2(this, decoder2);
    }
  };
  var ComposedDecoder2 = class {
    /**
     * @param {Decoders<Prefix>} decoders
     */
    constructor(decoders) {
      this.decoders = decoders;
    }
    /**
     * @template {string} OtherPrefix
     * @param {API.UnibaseDecoder<OtherPrefix>|ComposedDecoder<OtherPrefix>} decoder
     * @returns {ComposedDecoder<Prefix|OtherPrefix>}
     */
    or(decoder2) {
      return or2(this, decoder2);
    }
    /**
     * @param {string} input
     * @returns {Uint8Array}
     */
    decode(input) {
      const prefix = (
        /** @type {Prefix} */
        input[0]
      );
      const decoder2 = this.decoders[prefix];
      if (decoder2) {
        return decoder2.decode(input);
      } else {
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    }
  };
  var or2 = (left, right) => new ComposedDecoder2(
    /** @type {Decoders<L|R>} */
    {
      ...left.decoders || { [
        /** @type API.UnibaseDecoder<L> */
        left.prefix
      ]: left },
      ...right.decoders || { [
        /** @type API.UnibaseDecoder<R> */
        right.prefix
      ]: right }
    }
  );
  var Codec2 = class {
    /**
     * @param {Base} name
     * @param {Prefix} prefix
     * @param {(bytes:Uint8Array) => string} baseEncode
     * @param {(text:string) => Uint8Array} baseDecode
     */
    constructor(name5, prefix, baseEncode, baseDecode) {
      this.name = name5;
      this.prefix = prefix;
      this.baseEncode = baseEncode;
      this.baseDecode = baseDecode;
      this.encoder = new Encoder2(name5, prefix, baseEncode);
      this.decoder = new Decoder2(name5, prefix, baseDecode);
    }
    /**
     * @param {Uint8Array} input
     */
    encode(input) {
      return this.encoder.encode(input);
    }
    /**
     * @param {string} input
     */
    decode(input) {
      return this.decoder.decode(input);
    }
  };
  var from2 = ({ name: name5, prefix, encode: encode21, decode: decode28 }) => new Codec2(name5, prefix, encode21, decode28);
  var baseX2 = ({ prefix, name: name5, alphabet }) => {
    const { encode: encode21, decode: decode28 } = base_x_default2(alphabet, name5);
    return from2({
      prefix,
      name: name5,
      encode: encode21,
      /**
       * @param {string} text
       */
      decode: (text2) => coerce2(decode28(text2))
    });
  };
  var decode10 = (string2, alphabet, bitsPerChar, name5) => {
    const codes = {};
    for (let i = 0; i < alphabet.length; ++i) {
      codes[alphabet[i]] = i;
    }
    let end = string2.length;
    while (string2[end - 1] === "=") {
      --end;
    }
    const out = new Uint8Array(end * bitsPerChar / 8 | 0);
    let bits = 0;
    let buffer2 = 0;
    let written = 0;
    for (let i = 0; i < end; ++i) {
      const value = codes[string2[i]];
      if (value === void 0) {
        throw new SyntaxError(`Non-${name5} character`);
      }
      buffer2 = buffer2 << bitsPerChar | value;
      bits += bitsPerChar;
      if (bits >= 8) {
        bits -= 8;
        out[written++] = 255 & buffer2 >> bits;
      }
    }
    if (bits >= bitsPerChar || 255 & buffer2 << 8 - bits) {
      throw new SyntaxError("Unexpected end of data");
    }
    return out;
  };
  var encode6 = (data, alphabet, bitsPerChar) => {
    const pad = alphabet[alphabet.length - 1] === "=";
    const mask = (1 << bitsPerChar) - 1;
    let out = "";
    let bits = 0;
    let buffer2 = 0;
    for (let i = 0; i < data.length; ++i) {
      buffer2 = buffer2 << 8 | data[i];
      bits += 8;
      while (bits > bitsPerChar) {
        bits -= bitsPerChar;
        out += alphabet[mask & buffer2 >> bits];
      }
    }
    if (bits) {
      out += alphabet[mask & buffer2 << bitsPerChar - bits];
    }
    if (pad) {
      while (out.length * bitsPerChar & 7) {
        out += "=";
      }
    }
    return out;
  };
  var rfc46482 = ({ name: name5, prefix, bitsPerChar, alphabet }) => {
    return from2({
      prefix,
      name: name5,
      encode(input) {
        return encode6(input, alphabet, bitsPerChar);
      },
      decode(input) {
        return decode10(input, alphabet, bitsPerChar, name5);
      }
    });
  };

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/bases/base58.js
  var base58btc2 = baseX2({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
  });
  var base58flickr2 = baseX2({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
  });

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/bases/base32.js
  var base322 = rfc46482({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
  });
  var base32upper2 = rfc46482({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
  });
  var base32pad2 = rfc46482({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
  });
  var base32padupper2 = rfc46482({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
  });
  var base32hex2 = rfc46482({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
  });
  var base32hexupper2 = rfc46482({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
  });
  var base32hexpad2 = rfc46482({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
  });
  var base32hexpadupper2 = rfc46482({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
  });
  var base32z2 = rfc46482({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
  });

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/cid.js
  var format2 = (link2, base3) => {
    const { bytes: bytes2, version } = link2;
    switch (version) {
      case 0:
        return toStringV02(
          bytes2,
          baseCache2(link2),
          /** @type {API.MultibaseEncoder<"z">} */
          base3 || base58btc2.encoder
        );
      default:
        return toStringV12(
          bytes2,
          baseCache2(link2),
          /** @type {API.MultibaseEncoder<Prefix>} */
          base3 || base322.encoder
        );
    }
  };
  var cache2 = /* @__PURE__ */ new WeakMap();
  var baseCache2 = (cid) => {
    const baseCache3 = cache2.get(cid);
    if (baseCache3 == null) {
      const baseCache4 = /* @__PURE__ */ new Map();
      cache2.set(cid, baseCache4);
      return baseCache4;
    }
    return baseCache3;
  };
  var CID2 = class _CID {
    /**
     * @param {Version} version - Version of the CID
     * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param {API.MultihashDigest<Alg>} multihash - (Multi)hash of the of the content.
     * @param {Uint8Array} bytes
     *
     */
    constructor(version, code8, multihash, bytes2) {
      this.code = code8;
      this.version = version;
      this.multihash = multihash;
      this.bytes = bytes2;
      this["/"] = bytes2;
    }
    /**
     * Signalling `cid.asCID === cid` has been replaced with `cid['/'] === cid.bytes`
     * please either use `CID.asCID(cid)` or switch to new signalling mechanism
     *
     * @deprecated
     */
    get asCID() {
      return this;
    }
    // ArrayBufferView
    get byteOffset() {
      return this.bytes.byteOffset;
    }
    // ArrayBufferView
    get byteLength() {
      return this.bytes.byteLength;
    }
    /**
     * @returns {CID<Data, API.DAG_PB, API.SHA_256, 0>}
     */
    toV0() {
      switch (this.version) {
        case 0: {
          return (
            /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
            this
          );
        }
        case 1: {
          const { code: code8, multihash } = this;
          if (code8 !== DAG_PB_CODE2) {
            throw new Error("Cannot convert a non dag-pb CID to CIDv0");
          }
          if (multihash.code !== SHA_256_CODE2) {
            throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
          }
          return (
            /** @type {CID<Data, API.DAG_PB, API.SHA_256, 0>} */
            _CID.createV0(
              /** @type {API.MultihashDigest<API.SHA_256>} */
              multihash
            )
          );
        }
        default: {
          throw Error(
            `Can not convert CID version ${this.version} to version 0. This is a bug please report`
          );
        }
      }
    }
    /**
     * @returns {CID<Data, Format, Alg, 1>}
     */
    toV1() {
      switch (this.version) {
        case 0: {
          const { code: code8, digest: digest2 } = this.multihash;
          const multihash = create2(code8, digest2);
          return (
            /** @type {CID<Data, Format, Alg, 1>} */
            _CID.createV1(this.code, multihash)
          );
        }
        case 1: {
          return (
            /** @type {CID<Data, Format, Alg, 1>} */
            this
          );
        }
        default: {
          throw Error(
            `Can not convert CID version ${this.version} to version 1. This is a bug please report`
          );
        }
      }
    }
    /**
     * @param {unknown} other
     * @returns {other is CID<Data, Format, Alg, Version>}
     */
    equals(other) {
      return _CID.equals(this, other);
    }
    /**
     * @template {unknown} Data
     * @template {number} Format
     * @template {number} Alg
     * @template {API.Version} Version
     * @param {API.Link<Data, Format, Alg, Version>} self
     * @param {unknown} other
     * @returns {other is CID}
     */
    static equals(self2, other) {
      const unknown2 = (
        /** @type {{code?:unknown, version?:unknown, multihash?:unknown}} */
        other
      );
      return unknown2 && self2.code === unknown2.code && self2.version === unknown2.version && equals4(self2.multihash, unknown2.multihash);
    }
    /**
     * @param {API.MultibaseEncoder<string>} [base]
     * @returns {string}
     */
    toString(base3) {
      return format2(this, base3);
    }
    toJSON() {
      return { "/": format2(this) };
    }
    link() {
      return this;
    }
    get [Symbol.toStringTag]() {
      return "CID";
    }
    // Legacy
    [Symbol.for("nodejs.util.inspect.custom")]() {
      return `CID(${this.toString()})`;
    }
    /**
     * Takes any input `value` and returns a `CID` instance if it was
     * a `CID` otherwise returns `null`. If `value` is instanceof `CID`
     * it will return value back. If `value` is not instance of this CID
     * class, but is compatible CID it will return new instance of this
     * `CID` class. Otherwise returns null.
     *
     * This allows two different incompatible versions of CID library to
     * co-exist and interop as long as binary interface is compatible.
     *
     * @template {unknown} Data
     * @template {number} Format
     * @template {number} Alg
     * @template {API.Version} Version
     * @template {unknown} U
     * @param {API.Link<Data, Format, Alg, Version>|U} input
     * @returns {CID<Data, Format, Alg, Version>|null}
     */
    static asCID(input) {
      if (input == null) {
        return null;
      }
      const value = (
        /** @type {any} */
        input
      );
      if (value instanceof _CID) {
        return value;
      } else if (value["/"] != null && value["/"] === value.bytes || value.asCID === value) {
        const { version, code: code8, multihash, bytes: bytes2 } = value;
        return new _CID(
          version,
          code8,
          /** @type {API.MultihashDigest<Alg>} */
          multihash,
          bytes2 || encodeCID2(version, code8, multihash.bytes)
        );
      } else if (value[cidSymbol2] === true) {
        const { version, multihash, code: code8 } = value;
        const digest2 = (
          /** @type {API.MultihashDigest<Alg>} */
          decode9(multihash)
        );
        return _CID.create(version, code8, digest2);
      } else {
        return null;
      }
    }
    /**
     *
     * @template {unknown} Data
     * @template {number} Format
     * @template {number} Alg
     * @template {API.Version} Version
     * @param {Version} version - Version of the CID
     * @param {Format} code - Code of the codec content is encoded in, see https://github.com/multiformats/multicodec/blob/master/table.csv
     * @param {API.MultihashDigest<Alg>} digest - (Multi)hash of the of the content.
     * @returns {CID<Data, Format, Alg, Version>}
     */
    static create(version, code8, digest2) {
      if (typeof code8 !== "number") {
        throw new Error("String codecs are no longer supported");
      }
      if (!(digest2.bytes instanceof Uint8Array)) {
        throw new Error("Invalid digest");
      }
      switch (version) {
        case 0: {
          if (code8 !== DAG_PB_CODE2) {
            throw new Error(
              `Version 0 CID must use dag-pb (code: ${DAG_PB_CODE2}) block encoding`
            );
          } else {
            return new _CID(version, code8, digest2, digest2.bytes);
          }
        }
        case 1: {
          const bytes2 = encodeCID2(version, code8, digest2.bytes);
          return new _CID(version, code8, digest2, bytes2);
        }
        default: {
          throw new Error("Invalid version");
        }
      }
    }
    /**
     * Simplified version of `create` for CIDv0.
     *
     * @template {unknown} [T=unknown]
     * @param {API.MultihashDigest<typeof SHA_256_CODE>} digest - Multihash.
     * @returns {CID<T, typeof DAG_PB_CODE, typeof SHA_256_CODE, 0>}
     */
    static createV0(digest2) {
      return _CID.create(0, DAG_PB_CODE2, digest2);
    }
    /**
     * Simplified version of `create` for CIDv1.
     *
     * @template {unknown} Data
     * @template {number} Code
     * @template {number} Alg
     * @param {Code} code - Content encoding format code.
     * @param {API.MultihashDigest<Alg>} digest - Miltihash of the content.
     * @returns {CID<Data, Code, Alg, 1>}
     */
    static createV1(code8, digest2) {
      return _CID.create(1, code8, digest2);
    }
    /**
     * Decoded a CID from its binary representation. The byte array must contain
     * only the CID with no additional bytes.
     *
     * An error will be thrown if the bytes provided do not contain a valid
     * binary representation of a CID.
     *
     * @template {unknown} Data
     * @template {number} Code
     * @template {number} Alg
     * @template {API.Version} Ver
     * @param {API.ByteView<API.Link<Data, Code, Alg, Ver>>} bytes
     * @returns {CID<Data, Code, Alg, Ver>}
     */
    static decode(bytes2) {
      const [cid, remainder] = _CID.decodeFirst(bytes2);
      if (remainder.length) {
        throw new Error("Incorrect length");
      }
      return cid;
    }
    /**
     * Decoded a CID from its binary representation at the beginning of a byte
     * array.
     *
     * Returns an array with the first element containing the CID and the second
     * element containing the remainder of the original byte array. The remainder
     * will be a zero-length byte array if the provided bytes only contained a
     * binary CID representation.
     *
     * @template {unknown} T
     * @template {number} C
     * @template {number} A
     * @template {API.Version} V
     * @param {API.ByteView<API.Link<T, C, A, V>>} bytes
     * @returns {[CID<T, C, A, V>, Uint8Array]}
     */
    static decodeFirst(bytes2) {
      const specs = _CID.inspectBytes(bytes2);
      const prefixSize = specs.size - specs.multihashSize;
      const multihashBytes = coerce2(
        bytes2.subarray(prefixSize, prefixSize + specs.multihashSize)
      );
      if (multihashBytes.byteLength !== specs.multihashSize) {
        throw new Error("Incorrect length");
      }
      const digestBytes = multihashBytes.subarray(
        specs.multihashSize - specs.digestSize
      );
      const digest2 = new Digest2(
        specs.multihashCode,
        specs.digestSize,
        digestBytes,
        multihashBytes
      );
      const cid = specs.version === 0 ? _CID.createV0(
        /** @type {API.MultihashDigest<API.SHA_256>} */
        digest2
      ) : _CID.createV1(specs.codec, digest2);
      return [
        /** @type {CID<T, C, A, V>} */
        cid,
        bytes2.subarray(specs.size)
      ];
    }
    /**
     * Inspect the initial bytes of a CID to determine its properties.
     *
     * Involves decoding up to 4 varints. Typically this will require only 4 to 6
     * bytes but for larger multicodec code values and larger multihash digest
     * lengths these varints can be quite large. It is recommended that at least
     * 10 bytes be made available in the `initialBytes` argument for a complete
     * inspection.
     *
     * @template {unknown} T
     * @template {number} C
     * @template {number} A
     * @template {API.Version} V
     * @param {API.ByteView<API.Link<T, C, A, V>>} initialBytes
     * @returns {{ version:V, codec:C, multihashCode:A, digestSize:number, multihashSize:number, size:number }}
     */
    static inspectBytes(initialBytes) {
      let offset = 0;
      const next = () => {
        const [i, length3] = decode8(initialBytes.subarray(offset));
        offset += length3;
        return i;
      };
      let version = (
        /** @type {V} */
        next()
      );
      let codec = (
        /** @type {C} */
        DAG_PB_CODE2
      );
      if (
        /** @type {number} */
        version === 18
      ) {
        version = /** @type {V} */
        0;
        offset = 0;
      } else {
        codec = /** @type {C} */
        next();
      }
      if (version !== 0 && version !== 1) {
        throw new RangeError(`Invalid CID version ${version}`);
      }
      const prefixSize = offset;
      const multihashCode = (
        /** @type {A} */
        next()
      );
      const digestSize = next();
      const size2 = offset + digestSize;
      const multihashSize = size2 - prefixSize;
      return { version, codec, multihashCode, digestSize, multihashSize, size: size2 };
    }
    /**
     * Takes cid in a string representation and creates an instance. If `base`
     * decoder is not provided will use a default from the configuration. It will
     * throw an error if encoding of the CID is not compatible with supplied (or
     * a default decoder).
     *
     * @template {string} Prefix
     * @template {unknown} Data
     * @template {number} Code
     * @template {number} Alg
     * @template {API.Version} Ver
     * @param {API.ToString<API.Link<Data, Code, Alg, Ver>, Prefix>} source
     * @param {API.MultibaseDecoder<Prefix>} [base]
     * @returns {CID<Data, Code, Alg, Ver>}
     */
    static parse(source, base3) {
      const [prefix, bytes2] = parseCIDtoBytes2(source, base3);
      const cid = _CID.decode(bytes2);
      if (cid.version === 0 && source[0] !== "Q") {
        throw Error("Version 0 CID string must not include multibase prefix");
      }
      baseCache2(cid).set(prefix, source);
      return cid;
    }
  };
  var parseCIDtoBytes2 = (source, base3) => {
    switch (source[0]) {
      // CIDv0 is parsed differently
      case "Q": {
        const decoder2 = base3 || base58btc2;
        return [
          /** @type {Prefix} */
          base58btc2.prefix,
          decoder2.decode(`${base58btc2.prefix}${source}`)
        ];
      }
      case base58btc2.prefix: {
        const decoder2 = base3 || base58btc2;
        return [
          /** @type {Prefix} */
          base58btc2.prefix,
          decoder2.decode(source)
        ];
      }
      case base322.prefix: {
        const decoder2 = base3 || base322;
        return [
          /** @type {Prefix} */
          base322.prefix,
          decoder2.decode(source)
        ];
      }
      default: {
        if (base3 == null) {
          throw Error(
            "To parse non base32 or base58btc encoded CID multibase decoder must be provided"
          );
        }
        return [
          /** @type {Prefix} */
          source[0],
          base3.decode(source)
        ];
      }
    }
  };
  var toStringV02 = (bytes2, cache3, base3) => {
    const { prefix } = base3;
    if (prefix !== base58btc2.prefix) {
      throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
    }
    const cid = cache3.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes2).slice(1);
      cache3.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var toStringV12 = (bytes2, cache3, base3) => {
    const { prefix } = base3;
    const cid = cache3.get(prefix);
    if (cid == null) {
      const cid2 = base3.encode(bytes2);
      cache3.set(prefix, cid2);
      return cid2;
    } else {
      return cid;
    }
  };
  var DAG_PB_CODE2 = 112;
  var SHA_256_CODE2 = 18;
  var encodeCID2 = (version, code8, multihash) => {
    const codeOffset = encodingLength2(version);
    const hashOffset = codeOffset + encodingLength2(code8);
    const bytes2 = new Uint8Array(hashOffset + multihash.byteLength);
    encodeTo2(version, bytes2, 0);
    encodeTo2(code8, bytes2, codeOffset);
    bytes2.set(multihash, hashOffset);
    return bytes2;
  };
  var cidSymbol2 = Symbol.for("@ipld/js-cid/CID");

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/link.js
  var DAG_PB_CODE3 = 112;
  var createLegacy = (digest2) => CID2.create(0, DAG_PB_CODE3, digest2);
  var create3 = (code8, digest2) => CID2.create(1, code8, digest2);
  var isLink = (value) => {
    if (value == null) {
      return false;
    }
    const withSlash = (
      /** @type {{'/'?: Uint8Array, bytes: Uint8Array}} */
      value
    );
    if (withSlash["/"] != null && withSlash["/"] === withSlash.bytes) {
      return true;
    }
    const withAsCID = (
      /** @type {{'asCID'?: unknown}} */
      value
    );
    if (withAsCID.asCID === value) {
      return true;
    }
    return false;
  };
  var parse = (source, base3) => CID2.parse(source, base3);

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/hashes/identity.js
  var code = 0;
  var name = "identity";
  var encode7 = coerce2;
  var digest = (input) => create2(code, encode7(input));
  var identity = { code, name, encode: encode7, digest };

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/hashes/hasher.js
  var from3 = ({ name: name5, code: code8, encode: encode21 }) => new Hasher(name5, code8, encode21);
  var Hasher = class {
    /**
     *
     * @param {Name} name
     * @param {Code} code
     * @param {(input: Uint8Array) => Await<Uint8Array>} encode
     */
    constructor(name5, code8, encode21) {
      this.name = name5;
      this.code = code8;
      this.encode = encode21;
    }
    /**
     * @param {Uint8Array} input
     * @returns {Await<Digest.Digest<Code, number>>}
     */
    digest(input) {
      if (input instanceof Uint8Array) {
        const result = this.encode(input);
        return result instanceof Uint8Array ? create2(this.code, result) : result.then((digest2) => create2(this.code, digest2));
      } else {
        throw Error("Unknown type, must be binary type");
      }
    }
  };

  // node_modules/.pnpm/@ipld+dag-ucan@3.4.0/node_modules/@ipld/dag-ucan/src/did.js
  var DID_PREFIX = "did:";
  var DID_PREFIX_SIZE = DID_PREFIX.length;
  var DID_KEY_PREFIX = `did:key:`;
  var DID_KEY_PREFIX_SIZE = DID_KEY_PREFIX.length;
  var ED25519 = 237;
  var RSA = 4613;
  var P256 = 4608;
  var P384 = 4609;
  var P521 = 4610;
  var SECP256K1 = 231;
  var BLS12381G1 = 234;
  var BLS12381G2 = 235;
  var DID_CORE = 3357;
  var METHOD_OFFSET = varint_exports2.encodingLength(DID_CORE);
  var parse2 = (did2) => {
    if (!did2.startsWith(DID_PREFIX)) {
      throw new RangeError(`Invalid DID "${did2}", must start with 'did:'`);
    } else if (did2.startsWith(DID_KEY_PREFIX)) {
      const key = base58btc2.decode(did2.slice(DID_KEY_PREFIX_SIZE));
      return decode11(key);
    } else {
      const suffix = encode4(did2.slice(DID_PREFIX_SIZE));
      const bytes2 = new Uint8Array(suffix.byteLength + METHOD_OFFSET);
      varint_exports2.encodeTo(DID_CORE, bytes2);
      bytes2.set(suffix, METHOD_OFFSET);
      return new DID(bytes2);
    }
  };
  var format3 = (id) => id.did();
  var decode11 = (bytes2) => {
    const [code8] = varint_exports2.decode(bytes2);
    const { buffer: buffer2, byteOffset, byteLength } = bytes2;
    switch (code8) {
      case P256:
        if (bytes2.length > 35) {
          throw new RangeError(`Only p256-pub compressed is supported.`);
        }
      case ED25519:
      case RSA:
      case P384:
      case P521:
      case BLS12381G1:
      case BLS12381G2:
      case SECP256K1:
        return (
          /** @type {UCAN.PrincipalView<any>} */
          new DIDKey(buffer2, byteOffset, byteLength)
        );
      case DID_CORE:
        return new DID(buffer2, byteOffset, byteLength);
      default:
        throw new RangeError(
          `Unsupported DID encoding, unknown multicode 0x${code8.toString(16)}.`
        );
    }
  };
  var encode8 = (principal) => parse2(principal.did());
  var DID = class extends Uint8Array {
    /**
     * @returns {ID}
     */
    did() {
      const bytes2 = new Uint8Array(this.buffer, this.byteOffset + METHOD_OFFSET);
      return (
        /** @type {ID} */
        `did:${decode6(bytes2)}`
      );
    }
    toJSON() {
      return this.did();
    }
  };
  var DIDKey = class extends DID {
    /**
     * @return {`did:key:${string}`}
     */
    did() {
      return `did:key:${base58btc2.encode(this)}`;
    }
  };

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/bases/base64.js
  var base64 = rfc46482({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
  });
  var base64pad = rfc46482({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
  });
  var base64url = rfc46482({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
  });
  var base64urlpad = rfc46482({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
  });

  // node_modules/.pnpm/@ipld+dag-ucan@3.4.0/node_modules/@ipld/dag-ucan/src/signature.js
  var NON_STANDARD = 53248;
  var ES256K = 53479;
  var BLS12381G12 = 53482;
  var BLS12381G22 = 53483;
  var EdDSA = 53485;
  var ES256 = 13636096;
  var ES384 = 13636097;
  var ES512 = 13636098;
  var RS256 = 13636101;
  var EIP191 = 53649;
  var codeName = (code8) => {
    switch (code8) {
      case ES256K:
        return "ES256K";
      case BLS12381G12:
        return "BLS12381G1";
      case BLS12381G22:
        return "BLS12381G2";
      case EdDSA:
        return "EdDSA";
      case ES256:
        return "ES256";
      case ES384:
        return "ES384";
      case ES512:
        return "ES512";
      case RS256:
        return "RS256";
      case EIP191:
        return "EIP191";
      default:
        throw new RangeError(
          `Unknown signature algorithm code 0x${code8.toString(16)}`
        );
    }
  };
  var Signature = class extends Uint8Array {
    get code() {
      const [code8] = varint_exports2.decode(this);
      Object.defineProperties(this, { code: { value: code8 } });
      return (
        /** @type {A} */
        code8
      );
    }
    get size() {
      const value = size(this);
      Object.defineProperties(this, { size: { value } });
      return value;
    }
    get algorithm() {
      const value = algorithm(this);
      Object.defineProperties(this, { algorithm: { value } });
      return value;
    }
    get raw() {
      const { buffer: buffer2, byteOffset, size: size2, code: code8 } = this;
      const codeSize = varint_exports2.encodingLength(code8);
      const rawSize = varint_exports2.encodingLength(size2);
      const value = new Uint8Array(buffer2, byteOffset + codeSize + rawSize, size2);
      Object.defineProperties(this, { raw: { value } });
      return value;
    }
    /**
     * Verify that this signature was created by the given key.
     *
     * @param {UCAN.Crypto.Verifier<A>} signer
     * @param {UCAN.ByteView<T>} payload
     */
    async verify(signer, payload) {
      try {
        if (await signer.verify(payload, this) === true) {
          return { ok: {} };
        } else {
          throw new Error("Invalid signature");
        }
      } catch (cause) {
        return { error: (
          /** @type {Error} */
          cause
        ) };
      }
    }
    toJSON() {
      return toJSON2(this);
    }
  };
  var algorithm = (signature) => {
    const { code: code8, raw, buffer: buffer2, byteOffset } = signature;
    if (code8 === NON_STANDARD) {
      const offset = raw.byteLength + varint_exports2.encodingLength(code8) + varint_exports2.encodingLength(raw.byteLength);
      const bytes2 = new Uint8Array(buffer2, byteOffset + offset);
      return decode6(bytes2);
    } else {
      return codeName(code8);
    }
  };
  var size = (signature) => {
    const offset = varint_exports2.encodingLength(signature.code);
    const [size2] = varint_exports2.decode(
      new Uint8Array(signature.buffer, signature.byteOffset + offset)
    );
    return size2;
  };
  var create4 = (code8, raw) => {
    const _ = codeName(code8);
    const codeSize = varint_exports2.encodingLength(code8);
    const rawSize = varint_exports2.encodingLength(raw.byteLength);
    const signature = new Signature(codeSize + rawSize + raw.byteLength);
    varint_exports2.encodeTo(code8, signature);
    varint_exports2.encodeTo(raw.byteLength, signature, codeSize);
    signature.set(raw, codeSize + rawSize);
    Object.defineProperties(signature, {
      code: { value: code8 },
      size: { value: raw.byteLength }
    });
    return signature;
  };
  var toJSON2 = (signature) => ({
    "/": { bytes: base64.baseEncode(signature) }
  });

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/json/encode.js
  var JSONEncoder = class extends Array {
    constructor() {
      super();
      this.inRecursive = [];
    }
    /**
     * @param {Bl} buf
     */
    prefix(buf2) {
      const recurs = this.inRecursive[this.inRecursive.length - 1];
      if (recurs) {
        if (recurs.type === Type.array) {
          recurs.elements++;
          if (recurs.elements !== 1) {
            buf2.push([44]);
          }
        }
        if (recurs.type === Type.map) {
          recurs.elements++;
          if (recurs.elements !== 1) {
            if (recurs.elements % 2 === 1) {
              buf2.push([44]);
            } else {
              buf2.push([58]);
            }
          }
        }
      }
    }
    /**
     * @param {Bl} buf
     * @param {Token} token
     */
    [Type.uint.major](buf2, token) {
      this.prefix(buf2);
      const is2 = String(token.value);
      const isa = [];
      for (let i = 0; i < is2.length; i++) {
        isa[i] = is2.charCodeAt(i);
      }
      buf2.push(isa);
    }
    /**
     * @param {Bl} buf
     * @param {Token} token
     */
    [Type.negint.major](buf2, token) {
      this[Type.uint.major](buf2, token);
    }
    /**
     * @param {Bl} _buf
     * @param {Token} _token
     */
    [Type.bytes.major](_buf, _token) {
      throw new Error(`${encodeErrPrefix} unsupported type: Uint8Array`);
    }
    /**
     * @param {Bl} buf
     * @param {Token} token
     */
    [Type.string.major](buf2, token) {
      this.prefix(buf2);
      const byts = fromString(JSON.stringify(token.value));
      buf2.push(byts.length > 32 ? asU8A(byts) : byts);
    }
    /**
     * @param {Bl} buf
     * @param {Token} _token
     */
    [Type.array.major](buf2, _token) {
      this.prefix(buf2);
      this.inRecursive.push({ type: Type.array, elements: 0 });
      buf2.push([91]);
    }
    /**
     * @param {Bl} buf
     * @param {Token} _token
     */
    [Type.map.major](buf2, _token) {
      this.prefix(buf2);
      this.inRecursive.push({ type: Type.map, elements: 0 });
      buf2.push([123]);
    }
    /**
     * @param {Bl} _buf
     * @param {Token} _token
     */
    [Type.tag.major](_buf, _token) {
    }
    /**
     * @param {Bl} buf
     * @param {Token} token
     */
    [Type.float.major](buf2, token) {
      if (token.type.name === "break") {
        const recurs = this.inRecursive.pop();
        if (recurs) {
          if (recurs.type === Type.array) {
            buf2.push([93]);
          } else if (recurs.type === Type.map) {
            buf2.push([125]);
          } else {
            throw new Error("Unexpected recursive type; this should not happen!");
          }
          return;
        }
        throw new Error("Unexpected break; this should not happen!");
      }
      if (token.value === void 0) {
        throw new Error(`${encodeErrPrefix} unsupported type: undefined`);
      }
      this.prefix(buf2);
      if (token.type.name === "true") {
        buf2.push([116, 114, 117, 101]);
        return;
      } else if (token.type.name === "false") {
        buf2.push([102, 97, 108, 115, 101]);
        return;
      } else if (token.type.name === "null") {
        buf2.push([110, 117, 108, 108]);
        return;
      }
      const is2 = String(token.value);
      const isa = [];
      let dp = false;
      for (let i = 0; i < is2.length; i++) {
        isa[i] = is2.charCodeAt(i);
        if (!dp && (isa[i] === 46 || isa[i] === 101 || isa[i] === 69)) {
          dp = true;
        }
      }
      if (!dp) {
        isa.push(46);
        isa.push(48);
      }
      buf2.push(isa);
    }
  };

  // node_modules/.pnpm/multiformats@13.3.1/node_modules/multiformats/dist/src/bases/base64.js
  var base642 = rfc4648({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
  });
  var base64pad2 = rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
  });
  var base64url2 = rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
  });
  var base64urlpad2 = rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
  });

  // node_modules/.pnpm/@ipld+dag-json@10.2.3/node_modules/@ipld/dag-json/src/index.js
  var decodeOptions2 = {
    allowIndefinite: false,
    allowUndefined: false,
    allowNaN: false,
    allowInfinity: false,
    allowBigInt: true,
    // this will lead to BigInt for ints outside of
    // safe-integer range, which may surprise users
    strict: true,
    useMaps: false,
    rejectDuplicateMapKeys: true,
    /** @type {import('cborg').TagDecoder[]} */
    tags: []
  };
  decodeOptions2.tags[42] = CID.parse;
  var utf8Decoder = new TextDecoder();
  var utf8Encoder = new TextEncoder();

  // node_modules/.pnpm/multiformats@11.0.2/node_modules/multiformats/src/hashes/sha2-browser.js
  var sha = (name5) => (
    /**
     * @param {Uint8Array} data
     */
    async (data) => new Uint8Array(await crypto.subtle.digest(name5, data))
  );
  var sha256 = from3({
    name: "sha2-256",
    code: 18,
    encode: sha("SHA-256")
  });
  var sha512 = from3({
    name: "sha2-512",
    code: 19,
    encode: sha("SHA-512")
  });

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/dag.js
  var EMBED_CODE = identity.code;

  // node_modules/.pnpm/@ipld+car@5.3.3/node_modules/@ipld/car/src/decoder-common.js
  var import_varint3 = __toESM(require_varint(), 1);
  var V2_HEADER_LENGTH = (
    /* characteristics */
    16 + 8 + 8 + 8
  );

  // node_modules/.pnpm/@ipld+car@5.3.3/node_modules/@ipld/car/src/header-validator.js
  var Kinds = {
    Null: (
      /** @returns {undefined|null} */
      (obj) => obj === null ? obj : void 0
    ),
    Int: (
      /** @returns {undefined|number} */
      (obj) => Number.isInteger(obj) ? obj : void 0
    ),
    Float: (
      /** @returns {undefined|number} */
      (obj) => typeof obj === "number" && Number.isFinite(obj) ? obj : void 0
    ),
    String: (
      /** @returns {undefined|string} */
      (obj) => typeof obj === "string" ? obj : void 0
    ),
    Bool: (
      /** @returns {undefined|boolean} */
      (obj) => typeof obj === "boolean" ? obj : void 0
    ),
    Bytes: (
      /** @returns {undefined|Uint8Array} */
      (obj) => obj instanceof Uint8Array ? obj : void 0
    ),
    Link: (
      /** @returns {undefined|object} */
      (obj) => obj !== null && typeof obj === "object" && obj.asCID === obj ? obj : void 0
    ),
    List: (
      /** @returns {undefined|Array<any>} */
      (obj) => Array.isArray(obj) ? obj : void 0
    ),
    Map: (
      /** @returns {undefined|object} */
      (obj) => obj !== null && typeof obj === "object" && obj.asCID !== obj && !Array.isArray(obj) && !(obj instanceof Uint8Array) ? obj : void 0
    )
  };
  var Types = {
    "CarV1HeaderOrV2Pragma > roots (anon) > valueType (anon)": Kinds.Link,
    "CarV1HeaderOrV2Pragma > roots (anon)": (
      /** @returns {undefined|any} */
      (obj) => {
        if (Kinds.List(obj) === void 0) {
          return void 0;
        }
        for (let i = 0; i < obj.length; i++) {
          let v = obj[i];
          v = Types["CarV1HeaderOrV2Pragma > roots (anon) > valueType (anon)"](v);
          if (v === void 0) {
            return void 0;
          }
          if (v !== obj[i]) {
            const ret = obj.slice(0, i);
            for (let j = i; j < obj.length; j++) {
              let v2 = obj[j];
              v2 = Types["CarV1HeaderOrV2Pragma > roots (anon) > valueType (anon)"](v2);
              if (v2 === void 0) {
                return void 0;
              }
              ret.push(v2);
            }
            return ret;
          }
        }
        return obj;
      }
    ),
    Int: Kinds.Int,
    CarV1HeaderOrV2Pragma: (
      /** @returns {undefined|any} */
      (obj) => {
        if (Kinds.Map(obj) === void 0) {
          return void 0;
        }
        const entries2 = Object.entries(obj);
        let ret = obj;
        let requiredCount = 1;
        for (let i = 0; i < entries2.length; i++) {
          const [key, value] = entries2[i];
          switch (key) {
            case "roots":
              {
                const v = Types["CarV1HeaderOrV2Pragma > roots (anon)"](obj[key]);
                if (v === void 0) {
                  return void 0;
                }
                if (v !== value || ret !== obj) {
                  if (ret === obj) {
                    ret = {};
                    for (let j = 0; j < i; j++) {
                      ret[entries2[j][0]] = entries2[j][1];
                    }
                  }
                  ret.roots = v;
                }
              }
              break;
            case "version":
              {
                requiredCount--;
                const v = Types.Int(obj[key]);
                if (v === void 0) {
                  return void 0;
                }
                if (v !== value || ret !== obj) {
                  if (ret === obj) {
                    ret = {};
                    for (let j = 0; j < i; j++) {
                      ret[entries2[j][0]] = entries2[j][1];
                    }
                  }
                  ret.version = v;
                }
              }
              break;
            default:
              return void 0;
          }
        }
        if (requiredCount > 0) {
          return void 0;
        }
        return ret;
      }
    )
  };
  var Reprs = {
    "CarV1HeaderOrV2Pragma > roots (anon) > valueType (anon)": Kinds.Link,
    "CarV1HeaderOrV2Pragma > roots (anon)": (
      /** @returns {undefined|any} */
      (obj) => {
        if (Kinds.List(obj) === void 0) {
          return void 0;
        }
        for (let i = 0; i < obj.length; i++) {
          let v = obj[i];
          v = Reprs["CarV1HeaderOrV2Pragma > roots (anon) > valueType (anon)"](v);
          if (v === void 0) {
            return void 0;
          }
          if (v !== obj[i]) {
            const ret = obj.slice(0, i);
            for (let j = i; j < obj.length; j++) {
              let v2 = obj[j];
              v2 = Reprs["CarV1HeaderOrV2Pragma > roots (anon) > valueType (anon)"](v2);
              if (v2 === void 0) {
                return void 0;
              }
              ret.push(v2);
            }
            return ret;
          }
        }
        return obj;
      }
    ),
    Int: Kinds.Int,
    CarV1HeaderOrV2Pragma: (
      /** @returns {undefined|any} */
      (obj) => {
        if (Kinds.Map(obj) === void 0) {
          return void 0;
        }
        const entries2 = Object.entries(obj);
        let ret = obj;
        let requiredCount = 1;
        for (let i = 0; i < entries2.length; i++) {
          const [key, value] = entries2[i];
          switch (key) {
            case "roots":
              {
                const v = Reprs["CarV1HeaderOrV2Pragma > roots (anon)"](value);
                if (v === void 0) {
                  return void 0;
                }
                if (v !== value || ret !== obj) {
                  if (ret === obj) {
                    ret = {};
                    for (let j = 0; j < i; j++) {
                      ret[entries2[j][0]] = entries2[j][1];
                    }
                  }
                  ret.roots = v;
                }
              }
              break;
            case "version":
              {
                requiredCount--;
                const v = Reprs.Int(value);
                if (v === void 0) {
                  return void 0;
                }
                if (v !== value || ret !== obj) {
                  if (ret === obj) {
                    ret = {};
                    for (let j = 0; j < i; j++) {
                      ret[entries2[j][0]] = entries2[j][1];
                    }
                  }
                  ret.version = v;
                }
              }
              break;
            default:
              return void 0;
          }
        }
        if (requiredCount > 0) {
          return void 0;
        }
        return ret;
      }
    )
  };
  var CarV1HeaderOrV2Pragma = {
    toTyped: Types.CarV1HeaderOrV2Pragma,
    toRepresentation: Reprs.CarV1HeaderOrV2Pragma
  };

  // node_modules/.pnpm/cborg@4.2.7/node_modules/cborg/lib/length.js
  var cborEncoders2 = makeCborEncoders();

  // node_modules/.pnpm/@ipld+car@5.3.3/node_modules/@ipld/car/src/buffer-writer.js
  var import_varint4 = __toESM(require_varint(), 1);
  var headerPreludeTokens = [
    new Token(Type.map, 2),
    new Token(Type.string, "version"),
    new Token(Type.uint, 1),
    new Token(Type.string, "roots")
  ];
  var CID_TAG = new Token(Type.tag, 42);

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema.js
  var schema_exports3 = {};
  __export(schema_exports3, {
    API: () => API,
    Bytes: () => Bytes,
    DID: () => did_exports2,
    Link: () => link_exports2,
    Text: () => text_exports,
    URI: () => uri_exports,
    and: () => and,
    array: () => array,
    boolean: () => boolean,
    bytes: () => bytes,
    dictionary: () => dictionary,
    did: () => match3,
    endsWith: () => endsWith,
    enum: () => createEnum,
    error: () => error,
    float: () => float,
    greaterThan: () => greaterThan,
    integer: () => integer,
    intersection: () => intersection,
    lessThan: () => lessThan,
    link: () => match2,
    literal: () => literal,
    memberError: () => memberError,
    never: () => never,
    nullable: () => nullable,
    number: () => number,
    ok: () => ok,
    optional: () => optional,
    or: () => or3,
    refine: () => refine,
    startsWith: () => startsWith,
    string: () => string,
    struct: () => struct,
    text: () => match4,
    toString: () => toString2,
    tuple: () => tuple,
    typeError: () => typeError,
    uint64: () => uint64,
    unknown: () => unknown,
    uri: () => match,
    variant: () => variant
  });

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema/uri.js
  var uri_exports = {};
  __export(uri_exports, {
    from: () => from7,
    match: () => match,
    read: () => read3,
    uri: () => uri
  });

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/result.js
  var ok = (value) => {
    if (value == null) {
      throw new TypeError(`ok(${value}) is not allowed, consider ok({}) instead`);
    } else {
      return { ok: value };
    }
  };
  var Failure = class extends Error {
    describe() {
      return this.toString();
    }
    get message() {
      return this.describe();
    }
    toJSON() {
      const { name: name5, message, stack } = this;
      return { name: name5, message, stack };
    }
  };

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema/schema.js
  var API = class {
    /**
     * @param {Settings} settings
     */
    constructor(settings) {
      this.settings = settings;
    }
    toString() {
      return `new ${this.constructor.name}()`;
    }
    /**
     * @abstract
     * @param {I} input
     * @param {Settings} settings
     * @returns {Schema.ReadResult<T>}
     */
    /* c8 ignore next 3 */
    readWith(input, settings) {
      throw new Error(`Abstract method readWith must be implemented by subclass`);
    }
    /**
     * @param {I} input
     * @returns {Schema.ReadResult<T>}
     */
    read(input) {
      return this.readWith(input, this.settings);
    }
    /**
     * @param {unknown} value
     * @returns {value is T}
     */
    is(value) {
      return !this.read(
        /** @type {I} */
        value
      )?.error;
    }
    /**
     * @param {unknown} value
     * @return {T}
     */
    from(value) {
      const result = this.read(
        /** @type {I} */
        value
      );
      if (result.error) {
        throw result.error;
      } else {
        return result.ok;
      }
    }
    /**
     * @returns {Schema.Schema<T|undefined, I>}
     */
    optional() {
      return optional(this);
    }
    /**
     * @returns {Schema.Schema<T|null, I>}
     */
    nullable() {
      return nullable(this);
    }
    /**
     * @returns {Schema.Schema<T[], I>}
     */
    array() {
      return array(this);
    }
    /**
     * @template U
     * @param {Schema.Reader<U, I>} schema
     * @returns {Schema.Schema<T | U, I>}
     */
    or(schema5) {
      return or3(this, schema5);
    }
    /**
     * @template U
     * @param {Schema.Reader<U, I>} schema
     * @returns {Schema.Schema<T & U, I>}
     */
    and(schema5) {
      return and(this, schema5);
    }
    /**
     * @template {T} U
     * @param {Schema.Reader<U, T>} schema
     * @returns {Schema.Schema<U, I>}
     */
    refine(schema5) {
      return refine(this, schema5);
    }
    /**
     * @template {string} Kind
     * @param {Kind} [kind]
     * @returns {Schema.Schema<Schema.Branded<T, Kind>, I>}
     */
    brand(kind) {
      return (
        /** @type {Schema.Schema<Schema.Branded<T, Kind>, I>} */
        this
      );
    }
    /**
     * @param {Schema.NotUndefined<T>} value
     * @returns {Schema.DefaultSchema<Schema.NotUndefined<T>, I>}
     */
    default(value) {
      const fallback = this.from(value);
      if (fallback === void 0) {
        throw new Error(`Value of type undefined is not a valid default`);
      }
      const schema5 = new Default({
        reader: (
          /** @type {Schema.Reader<T, I>} */
          this
        ),
        value: (
          /** @type {Schema.NotUndefined<T>} */
          fallback
        )
      });
      return (
        /** @type {Schema.DefaultSchema<Schema.NotUndefined<T>, I>} */
        schema5
      );
    }
  };
  var Never = class extends API {
    toString() {
      return "never()";
    }
    /**
     * @param {I} input
     * @returns {Schema.ReadResult<never>}
     */
    read(input) {
      return typeError({ expect: "never", actual: input });
    }
  };
  var never = () => new Never();
  var Unknown = class extends API {
    /**
     * @param {I} input
     */
    read(input) {
      return (
        /** @type {Schema.ReadResult<unknown>}*/
        { ok: input }
      );
    }
    toString() {
      return "unknown()";
    }
  };
  var unknown = () => new Unknown();
  var Nullable = class extends API {
    /**
     * @param {I} input
     * @param {Schema.Reader<O, I>} reader
     */
    readWith(input, reader) {
      const result = reader.read(input);
      if (result.error) {
        return input === null ? { ok: null } : {
          error: new UnionError({
            causes: [
              result.error,
              typeError({ expect: "null", actual: input }).error
            ]
          })
        };
      } else {
        return result;
      }
    }
    toString() {
      return `${this.settings}.nullable()`;
    }
  };
  var nullable = (schema5) => new Nullable(schema5);
  var Optional = class extends API {
    optional() {
      return this;
    }
    /**
     * @param {I} input
     * @param {Schema.Reader<O, I>} reader
     * @returns {Schema.ReadResult<O|undefined>}
     */
    readWith(input, reader) {
      const result = reader.read(input);
      return result.error && input === void 0 ? { ok: void 0 } : result;
    }
    toString() {
      return `${this.settings}.optional()`;
    }
  };
  var Default = class extends API {
    /**
     * @returns {Schema.DefaultSchema<O & Schema.NotUndefined<O>, I>}
     */
    optional() {
      return (
        /** @type {Schema.DefaultSchema<O & Schema.NotUndefined<O>, I>} */
        this
      );
    }
    /**
     * @param {I} input
     * @param {object} options
     * @param {Schema.Reader<O|undefined, I>} options.reader
     * @param {O} options.value
     * @returns {Schema.ReadResult<O>}
     */
    readWith(input, { reader, value }) {
      if (input === void 0) {
        return (
          /** @type {Schema.ReadResult<O>} */
          { ok: value }
        );
      } else {
        const result = reader.read(input);
        return result.error ? result : result.ok !== void 0 ? (
          // We just checked that result.ok is not undefined but still needs
          // reassurance
          /** @type {Schema.ReadResult<O>} */
          result
        ) : { ok: value };
      }
    }
    toString() {
      return `${this.settings.reader}.default(${JSON.stringify(
        this.settings.value
      )})`;
    }
    get value() {
      return this.settings.value;
    }
  };
  var optional = (schema5) => new Optional(schema5);
  var ArrayOf = class extends API {
    /**
     * @param {I} input
     * @param {Schema.Reader<O, I>} schema
     */
    readWith(input, schema5) {
      if (!Array.isArray(input)) {
        return typeError({ expect: "array", actual: input });
      }
      const results = [];
      for (const [index, value] of input.entries()) {
        const result = schema5.read(value);
        if (result.error) {
          return memberError({ at: index, cause: result.error });
        } else {
          results.push(result.ok);
        }
      }
      return { ok: results };
    }
    get element() {
      return this.settings;
    }
    toString() {
      return `array(${this.element})`;
    }
  };
  var array = (schema5) => new ArrayOf(schema5);
  var Tuple = class extends API {
    /**
     * @param {I} input
     * @param {U} shape
     * @returns {Schema.ReadResult<Schema.InferTuple<U>>}
     */
    readWith(input, shape) {
      if (!Array.isArray(input)) {
        return typeError({ expect: "array", actual: input });
      }
      if (input.length !== this.shape.length) {
        return error(`Array must contain exactly ${this.shape.length} elements`);
      }
      const results = [];
      for (const [index, reader] of shape.entries()) {
        const result = reader.read(input[index]);
        if (result.error) {
          return memberError({ at: index, cause: result.error });
        } else {
          results[index] = result.ok;
        }
      }
      return { ok: (
        /** @type {Schema.InferTuple<U>} */
        results
      ) };
    }
    /** @type {U} */
    get shape() {
      return this.settings;
    }
    toString() {
      return `tuple([${this.shape.map((reader) => reader.toString()).join(", ")}])`;
    }
  };
  var tuple = (shape) => new Tuple(shape);
  var Dictionary = class _Dictionary extends API {
    /**
     * @param {I} input
     * @param {object} schema
     * @param {Schema.Reader<K, string>} schema.key
     * @param {Schema.Reader<V, I>} schema.value
     */
    readWith(input, { key, value }) {
      if (typeof input != "object" || input === null || Array.isArray(input)) {
        return typeError({
          expect: "dictionary",
          actual: input
        });
      }
      const dict = (
        /** @type {Schema.Dictionary<K, V>} */
        {}
      );
      for (const [k, v] of Object.entries(input)) {
        const keyResult = key.read(k);
        if (keyResult.error) {
          return memberError({ at: k, cause: keyResult.error });
        }
        const valueResult = value.read(v);
        if (valueResult.error) {
          return memberError({ at: k, cause: valueResult.error });
        }
        if (valueResult.ok !== void 0) {
          dict[keyResult.ok] = valueResult.ok;
        }
      }
      return { ok: dict };
    }
    get key() {
      return this.settings.key;
    }
    get value() {
      return this.settings.value;
    }
    partial() {
      const { key, value } = this.settings;
      return new _Dictionary({
        key,
        value: optional(value)
      });
    }
    toString() {
      return `dictionary(${this.settings})`;
    }
  };
  var dictionary = ({ value, key }) => new Dictionary({
    value,
    key: key || /** @type {Schema.Reader<K, string>} */
    string()
  });
  var Enum = class extends API {
    /**
     * @param {I} input
     * @param {{type:string, variants:Set<T[number]>}} settings
     * @returns {Schema.ReadResult<T[number]>}
     */
    readWith(input, { variants, type }) {
      if (variants.has(input)) {
        return (
          /** @type {Schema.ReadResult<T[number]>} */
          { ok: input }
        );
      } else {
        return typeError({ expect: type, actual: input });
      }
    }
    toString() {
      return this.settings.type;
    }
  };
  var createEnum = (variants) => new Enum({
    type: variants.join("|"),
    variants: new Set(variants)
  });
  var Union = class extends API {
    /**
     * @param {I} input
     * @param {U} variants
     */
    readWith(input, variants) {
      const causes = [];
      for (const reader of variants) {
        const result = reader.read(input);
        if (result.error) {
          causes.push(result.error);
        } else {
          return (
            /** @type {Schema.ReadResult<Schema.InferUnion<U>>} */
            result
          );
        }
      }
      return { error: new UnionError({ causes }) };
    }
    get variants() {
      return this.settings;
    }
    toString() {
      return `union([${this.variants.map((type) => type.toString()).join(", ")}])`;
    }
  };
  var union = (variants) => new Union(variants);
  var or3 = (left, right) => union([left, right]);
  var Intersection = class extends API {
    /**
     * @param {I} input
     * @param {U} schemas
     * @returns {Schema.ReadResult<Schema.InferIntersection<U>>}
     */
    readWith(input, schemas) {
      const causes = [];
      for (const schema5 of schemas) {
        const result = schema5.read(input);
        if (result.error) {
          causes.push(result.error);
        }
      }
      return causes.length > 0 ? { error: new IntersectionError({ causes }) } : (
        /** @type {Schema.ReadResult<Schema.InferIntersection<U>>} */
        {
          ok: input
        }
      );
    }
    toString() {
      return `intersection([${this.settings.map((type) => type.toString()).join(",")}])`;
    }
  };
  var intersection = (variants) => new Intersection(variants);
  var and = (left, right) => intersection([left, right]);
  var Boolean2 = class extends API {
    /**
     * @param {I} input
     */
    readWith(input) {
      switch (input) {
        case true:
        case false:
          return { ok: (
            /** @type {boolean} */
            input
          ) };
        default:
          return typeError({
            expect: "boolean",
            actual: input
          });
      }
    }
    toString() {
      return `boolean()`;
    }
  };
  var anyBoolean = new Boolean2();
  var boolean = () => anyBoolean;
  var UnknownNumber = class extends API {
    /**
     * @param {number} n
     */
    greaterThan(n) {
      return this.refine(greaterThan(n));
    }
    /**
     * @param {number} n
     */
    lessThan(n) {
      return this.refine(lessThan(n));
    }
    /**
     * @template {O} U
     * @param {Schema.Reader<U, O>} schema
     * @returns {Schema.NumberSchema<U, I>}
     */
    refine(schema5) {
      return new RefinedNumber({ base: this, schema: schema5 });
    }
  };
  var AnyNumber = class extends UnknownNumber {
    /**
     * @param {I} input
     * @returns {Schema.ReadResult<number>}
     */
    readWith(input) {
      return typeof input === "number" ? { ok: input } : typeError({ expect: "number", actual: input });
    }
    toString() {
      return `number()`;
    }
  };
  var anyNumber = new AnyNumber();
  var number = () => anyNumber;
  var RefinedNumber = class extends UnknownNumber {
    /**
     * @param {I} input
     * @param {{base:Schema.Reader<T, I>, schema:Schema.Reader<O, T>}} settings
     * @returns {Schema.ReadResult<O>}
     */
    readWith(input, { base: base3, schema: schema5 }) {
      const result = base3.read(input);
      return result.error ? result : schema5.read(result.ok);
    }
    toString() {
      return `${this.settings.base}.refine(${this.settings.schema})`;
    }
  };
  var LessThan = class extends API {
    /**
     * @param {T} input
     * @param {number} number
     * @returns {Schema.ReadResult<T>}
     */
    readWith(input, number2) {
      if (input < number2) {
        return { ok: input };
      } else {
        return error(`Expected ${input} < ${number2}`);
      }
    }
    toString() {
      return `lessThan(${this.settings})`;
    }
  };
  var lessThan = (n) => new LessThan(n);
  var GreaterThan = class extends API {
    /**
     * @param {T} input
     * @param {number} number
     * @returns {Schema.ReadResult<T>}
     */
    readWith(input, number2) {
      if (input > number2) {
        return { ok: input };
      } else {
        return error(`Expected ${input} > ${number2}`);
      }
    }
    toString() {
      return `greaterThan(${this.settings})`;
    }
  };
  var greaterThan = (n) => new GreaterThan(n);
  var Integer = {
    /**
     * @param {number} input
     * @returns {Schema.ReadResult<Schema.Integer>}
     */
    read(input) {
      return Number.isInteger(input) ? { ok: (
        /** @type {Schema.Integer} */
        input
      ) } : typeError({
        expect: "integer",
        actual: input
      });
    },
    toString() {
      return `Integer`;
    }
  };
  var anyInteger = anyNumber.refine(Integer);
  var integer = () => anyInteger;
  var MAX_UINT64 = 2n ** 64n - 1n;
  var Uint64Schema = class extends API {
    /**
     * @param {I} input
     * @returns {Schema.ReadResult<O>}
     */
    read(input) {
      switch (typeof input) {
        case "bigint":
          return input > MAX_UINT64 ? error(`Integer is too big for uint64, ${input} > ${MAX_UINT64}`) : input < 0 ? error(
            `Negative integer can not be represented as uint64, ${input} < ${0}`
          ) : { ok: (
            /** @type {I & O} */
            input
          ) };
        case "number":
          return !Number.isInteger(input) ? typeError({
            expect: "uint64",
            actual: input
          }) : input < 0 ? error(
            `Negative integer can not be represented as uint64, ${input} < ${0}`
          ) : { ok: (
            /** @type {O} */
            BigInt(input)
          ) };
        default:
          return typeError({
            expect: "uint64",
            actual: input
          });
      }
    }
    toString() {
      return `uint64`;
    }
  };
  var Uint64 = new Uint64Schema();
  var uint64 = () => Uint64;
  var Float = {
    /**
     * @param {number} number
     * @returns {Schema.ReadResult<Schema.Float>}
     */
    read(number2) {
      return Number.isFinite(number2) ? { ok: (
        /** @type {Schema.Float} */
        number2
      ) } : typeError({
        expect: "Float",
        actual: number2
      });
    },
    toString() {
      return "Float";
    }
  };
  var anyFloat = anyNumber.refine(Float);
  var float = () => anyFloat;
  var UnknownString = class extends API {
    /**
     * @template {O|unknown} U
     * @param {Schema.Reader<U, O>} schema
     * @returns {Schema.StringSchema<O & U, I>}
     */
    refine(schema5) {
      const other = (
        /** @type {Schema.Reader<U, O>} */
        schema5
      );
      const rest = new RefinedString({
        base: this,
        schema: other
      });
      return (
        /** @type {Schema.StringSchema<O & U, I>} */
        rest
      );
    }
    /**
     * @template {string} Prefix
     * @param {Prefix} prefix
     */
    startsWith(prefix) {
      return this.refine(startsWith(prefix));
    }
    /**
     * @template {string} Suffix
     * @param {Suffix} suffix
     */
    endsWith(suffix) {
      return this.refine(endsWith(suffix));
    }
    toString() {
      return `string()`;
    }
  };
  var RefinedString = class extends UnknownString {
    /**
     * @param {I} input
     * @param {{base:Schema.Reader<T, I>, schema:Schema.Reader<O, T>}} settings
     * @returns {Schema.ReadResult<T & O>}
     */
    readWith(input, { base: base3, schema: schema5 }) {
      const result = base3.read(input);
      return result.error ? result : (
        /** @type {Schema.ReadResult<T & O>} */
        schema5.read(result.ok)
      );
    }
    toString() {
      return `${this.settings.base}.refine(${this.settings.schema})`;
    }
  };
  var AnyString = class extends UnknownString {
    /**
     * @param {I} input
     * @returns {Schema.ReadResult<string>}
     */
    readWith(input) {
      return typeof input === "string" ? { ok: input } : typeError({ expect: "string", actual: input });
    }
  };
  var anyString = new AnyString();
  var string = () => anyString;
  var BytesSchema = class extends API {
    /**
     * @param {I} input
     * @returns {Schema.ReadResult<Uint8Array>}
     */
    readWith(input) {
      if (input instanceof Uint8Array) {
        return { ok: input };
      } else {
        return typeError({ expect: "Uint8Array", actual: input });
      }
    }
  };
  var Bytes = new BytesSchema();
  var bytes = () => Bytes;
  var StartsWith = class extends API {
    /**
     * @param {Body} input
     * @param {Prefix} prefix
     */
    readWith(input, prefix) {
      const result = input.startsWith(prefix) ? (
        /** @type {Schema.ReadResult<Body & `${Prefix}${Body}`>} */
        {
          ok: input
        }
      ) : error(`Expect string to start with "${prefix}" instead got "${input}"`);
      return result;
    }
    get prefix() {
      return this.settings;
    }
    toString() {
      return `startsWith("${this.prefix}")`;
    }
  };
  var startsWith = (prefix) => new StartsWith(prefix);
  var EndsWith = class extends API {
    /**
     * @param {Body} input
     * @param {Suffix} suffix
     */
    readWith(input, suffix) {
      return input.endsWith(suffix) ? (
        /** @type {Schema.ReadResult<Body & `${Body}${Suffix}`>} */
        {
          ok: input
        }
      ) : error(`Expect string to end with "${suffix}" instead got "${input}"`);
    }
    get suffix() {
      return this.settings;
    }
    toString() {
      return `endsWith("${this.suffix}")`;
    }
  };
  var endsWith = (suffix) => new EndsWith(suffix);
  var Refine = class extends API {
    /**
     * @param {I} input
     * @param {{ base: Schema.Reader<T, I>, schema: Schema.Reader<U, T> }} settings
     */
    readWith(input, { base: base3, schema: schema5 }) {
      const result = base3.read(input);
      return result.error ? result : schema5.read(result.ok);
    }
    toString() {
      return `${this.settings.base}.refine(${this.settings.schema})`;
    }
  };
  var refine = (base3, schema5) => new Refine({ base: base3, schema: schema5 });
  var Literal = class extends API {
    /**
     * @param {I} input
     * @param {T} expect
     * @returns {Schema.ReadResult<T>}
     */
    readWith(input, expect) {
      return input !== /** @type {unknown} */
      expect ? { error: new LiteralError({ expect, actual: input }) } : { ok: expect };
    }
    get value() {
      return (
        /** @type {Exclude<T, undefined>} */
        this.settings
      );
    }
    /**
     * @template {Schema.NotUndefined<T>} U
     * @param {U} value
     */
    default(value = (
      /** @type {U} */
      this.value
    )) {
      return super.default(value);
    }
    toString() {
      return `literal(${toString2(this.value)})`;
    }
  };
  var literal = (value) => new Literal(value);
  var Struct = class _Struct extends API {
    /**
     * @param {I} input
     * @param {U} shape
     * @returns {Schema.ReadResult<Schema.InferStruct<U>>}
     */
    readWith(input, shape) {
      if (typeof input != "object" || input === null || Array.isArray(input)) {
        return typeError({
          expect: "object",
          actual: input
        });
      }
      const source = (
        /** @type {{[K in keyof U]: unknown}} */
        input
      );
      const struct2 = (
        /** @type {{[K in keyof U]: Schema.Infer<U[K]>}} */
        {}
      );
      const entries2 = (
        /** @type {{[K in keyof U]: [K & string, U[K]]}[keyof U][]} */
        Object.entries(shape)
      );
      for (const [at, reader] of entries2) {
        const result = reader.read(source[at]);
        if (result.error) {
          return memberError({ at, cause: result.error });
        } else if (result.ok !== void 0) {
          struct2[at] = /** @type {Schema.Infer<U[typeof at]>} */
          result.ok;
        }
      }
      return { ok: struct2 };
    }
    /**
     * @returns {Schema.MapRepresentation<Partial<Schema.InferStruct<U>>> & Schema.StructSchema}
     */
    partial() {
      return new _Struct(
        Object.fromEntries(
          Object.entries(this.shape).map(([key, value]) => [key, optional(value)])
        )
      );
    }
    /** @type {U} */
    get shape() {
      return this.settings;
    }
    toString() {
      return [
        `struct({ `,
        ...Object.entries(this.shape).map(([key, schema5]) => `${key}: ${schema5}`).join(", "),
        ` })`
      ].join("");
    }
    /**
     * @param {Schema.InferStructSource<U>} data
     */
    create(data) {
      return this.from(data || {});
    }
    /**
     * @template {{[key:string]: Schema.Reader}} E
     * @param {E} extension
     * @returns {Schema.StructSchema<U & E, I>}
     */
    extend(extension) {
      return new _Struct({ ...this.shape, ...extension });
    }
  };
  var struct = (fields) => {
    const shape = (
      /** @type {{[K in keyof U]: Schema.Reader<unknown, unknown>}} */
      {}
    );
    const entries2 = Object.entries(fields);
    for (const [key, field] of entries2) {
      switch (typeof field) {
        case "number":
        case "string":
        case "boolean":
          shape[key] = literal(field);
          break;
        case "object":
          shape[key] = field === null ? literal(null) : field;
          break;
        default:
          throw new Error(
            `Invalid struct field "${key}", expected schema or literal, instead got ${typeof field}`
          );
      }
    }
    return new Struct(
      /** @type {V} */
      shape
    );
  };
  var Variant = class extends API {
    /**
     * @param {I} input
     * @param {U} variants
     * @returns {Schema.ReadResult<Schema.InferVariant<U>>}
     */
    readWith(input, variants) {
      if (typeof input != "object" || input === null || Array.isArray(input)) {
        return typeError({
          expect: "object",
          actual: input
        });
      }
      const keys = (
        /** @type {Array<keyof input & keyof variants & string>} */
        Object.keys(input)
      );
      const [key] = keys.length === 1 ? keys : [];
      const reader = key ? variants[key] : void 0;
      if (reader) {
        const result = reader.read(input[key]);
        return result.error ? memberError({ at: key, cause: result.error }) : { ok: (
          /** @type {Schema.InferVariant<U>} */
          { [key]: result.ok }
        ) };
      } else if (variants._) {
        const result = variants._.read(input);
        return result.error ? result : { ok: (
          /** @type {Schema.InferVariant<U>} */
          { _: result.ok }
        ) };
      } else if (key) {
        return error(
          `Expected an object with one of the these keys: ${Object.keys(variants).sort().join(", ")} instead got object with key ${key}`
        );
      } else {
        return error(
          "Expected an object with a single key instead got object with keys " + keys.sort().join(", ")
        );
      }
    }
    /**
     * @template [E=never]
     * @param {I} input
     * @param {E} [fallback]
     */
    match(input, fallback) {
      const result = this.read(input);
      if (result.error) {
        if (fallback !== void 0) {
          return [null, fallback];
        } else {
          throw result.error;
        }
      } else {
        const [key] = Object.keys(result.ok);
        const value = result.ok[key];
        return (
          /** @type {any} */
          [key, value]
        );
      }
    }
    /**
     * @template {Schema.InferVariant<U>} O
     * @param {O} source
     * @returns {O}
     */
    create(source) {
      return (
        /** @type {O} */
        this.from(source)
      );
    }
  };
  var variant = (variants) => new Variant(variants);
  var error = (message) => ({ error: new SchemaError(message) });
  var SchemaError = class extends Failure {
    get name() {
      return "SchemaError";
    }
    /* c8 ignore next 3 */
    describe() {
      return this.name;
    }
  };
  var TypeError2 = class extends SchemaError {
    /**
     * @param {{expect:string, actual:unknown}} data
     */
    constructor({ expect, actual }) {
      super();
      this.expect = expect;
      this.actual = actual;
    }
    get name() {
      return "TypeError";
    }
    describe() {
      return `Expected value of type ${this.expect} instead got ${toString2(
        this.actual
      )}`;
    }
  };
  var typeError = (data) => ({ error: new TypeError2(data) });
  var toString2 = (value) => {
    const type = typeof value;
    switch (type) {
      case "boolean":
      case "string":
        return JSON.stringify(value);
      // if these types we do not want JSON.stringify as it may mess things up
      // eg turn NaN and Infinity to null
      case "bigint":
        return `${value}n`;
      case "number":
      case "symbol":
      case "undefined":
        return String(value);
      case "object":
        return value === null ? "null" : Array.isArray(value) ? "array" : Symbol.toStringTag in /** @type {object} */
        value ? value[Symbol.toStringTag] : "object";
      default:
        return type;
    }
  };
  var LiteralError = class extends SchemaError {
    /**
     * @param {{
     * expect:string|number|boolean|null
     * actual:unknown
     * }} data
     */
    constructor({ expect, actual }) {
      super();
      this.expect = expect;
      this.actual = actual;
    }
    get name() {
      return "LiteralError";
    }
    describe() {
      return `Expected literal ${toString2(this.expect)} instead got ${toString2(
        this.actual
      )}`;
    }
  };
  var ElementError = class extends SchemaError {
    /**
     * @param {{at:number, cause:Schema.Error}} data
     */
    constructor({ at, cause }) {
      super();
      this.at = at;
      this.cause = cause;
    }
    get name() {
      return "ElementError";
    }
    describe() {
      return [
        `Array contains invalid element at ${this.at}:`,
        li(this.cause.message)
      ].join("\n");
    }
  };
  var FieldError = class extends SchemaError {
    /**
     * @param {{at:string, cause:Schema.Error}} data
     */
    constructor({ at, cause }) {
      super();
      this.at = at;
      this.cause = cause;
    }
    get name() {
      return "FieldError";
    }
    describe() {
      return [
        `Object contains invalid field "${this.at}":`,
        li(this.cause.message)
      ].join("\n");
    }
  };
  var memberError = ({ at, cause }) => typeof at === "string" ? { error: new FieldError({ at, cause }) } : { error: new ElementError({ at, cause }) };
  var UnionError = class extends SchemaError {
    /**
     * @param {{causes: Schema.Error[]}} data
     */
    constructor({ causes }) {
      super();
      this.causes = causes;
    }
    get name() {
      return "UnionError";
    }
    describe() {
      const { causes } = this;
      return [
        `Value does not match any type of the union:`,
        ...causes.map((cause) => li(cause.message))
      ].join("\n");
    }
  };
  var IntersectionError = class extends SchemaError {
    /**
     * @param {{causes: Schema.Error[]}} data
     */
    constructor({ causes }) {
      super();
      this.causes = causes;
    }
    get name() {
      return "IntersectionError";
    }
    describe() {
      const { causes } = this;
      return [
        `Value does not match following types of the intersection:`,
        ...causes.map((cause) => li(cause.message))
      ].join("\n");
    }
  };
  var indent = (message, indent2 = "  ") => `${indent2}${message.split("\n").join(`
${indent2}`)}`;
  var li = (message) => indent(`- ${message}`);

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema/uri.js
  var URISchema = class extends API {
    /**
     * @param {unknown} input
     * @param {Partial<O>} options
     * @returns {Schema.ReadResult<API.URI<O['protocol']>>}
     */
    readWith(input, { protocol } = {}) {
      if (typeof input !== "string" && !(input instanceof URL)) {
        return error(
          `Expected URI but got ${input === null ? "null" : typeof input}`
        );
      }
      try {
        const url = new URL(String(input));
        if (protocol != null && url.protocol !== protocol) {
          return error(`Expected ${protocol} URI instead got ${url.href}`);
        } else {
          return { ok: (
            /** @type {API.URI<O['protocol']>} */
            url.href
          ) };
        }
      } catch (_) {
        return error(`Invalid URI`);
      }
    }
  };
  var schema = new URISchema({});
  var uri = () => schema;
  var read3 = (input) => schema.read(input);
  var match = (options) => new URISchema(options);
  var from7 = (input) => (
    /** @type {API.URI<`${Scheme}:`>} */
    schema.from(input)
  );

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema/link.js
  var link_exports2 = {};
  __export(link_exports2, {
    create: () => create3,
    createLegacy: () => createLegacy,
    isLink: () => isLink,
    link: () => link,
    match: () => match2,
    optional: () => optional2,
    parse: () => parse,
    read: () => read4,
    schema: () => schema2
  });
  var LinkSchema = class extends API {
    /**
     *
     * @param {unknown} cid
     * @param {Settings<Code, Alg, Version>} settings
     * @returns {Schema.ReadResult<API.Link<unknown, Code, Alg, Version>>}
     */
    readWith(cid, { code: code8, multihash = {}, version }) {
      if (cid == null) {
        return error(`Expected link but got ${cid} instead`);
      } else {
        if (!isLink(cid)) {
          return error(`Expected link to be a CID instead of ${cid}`);
        } else {
          if (code8 != null && cid.code !== code8) {
            return error(
              `Expected link to be CID with 0x${code8.toString(16)} codec`
            );
          }
          if (multihash.code != null && cid.multihash.code !== multihash.code)
            return error(
              `Expected link to be CID with 0x${multihash.code.toString(
                16
              )} hashing algorithm`
            );
          if (version != null && cid.version !== version) {
            return error(
              `Expected link to be CID version ${version} instead of ${cid.version}`
            );
          }
          const [expectDigest, actualDigest] = multihash.digest != null ? [
            base322.baseEncode(multihash.digest),
            base322.baseEncode(cid.multihash.digest)
          ] : ["", ""];
          if (expectDigest !== actualDigest) {
            return error(
              `Expected link with "${expectDigest}" hash digest instead of "${actualDigest}"`
            );
          }
          return {
            ok: (
              /** @type {API.Link<unknown, any, any, any>} */
              cid
            )
          };
        }
      }
    }
  };
  var schema2 = new LinkSchema({});
  var link = () => schema2;
  var match2 = (options = {}) => new LinkSchema(options);
  var read4 = (input) => schema2.read(input);
  var optional2 = () => schema2.optional();

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema/did.js
  var did_exports2 = {};
  __export(did_exports2, {
    did: () => did,
    from: () => from8,
    match: () => match3,
    read: () => read5
  });
  var DIDSchema = class extends API {
    /**
     * @param {string} source
     * @param {void|Method} method
     */
    readWith(source, method) {
      const prefix = method ? `did:${method}:` : `did:`;
      if (!source.startsWith(prefix)) {
        return error(`Expected a ${prefix} but got "${source}" instead`);
      } else {
        return { ok: (
          /** @type {API.DID<Method>} */
          source
        ) };
      }
    }
  };
  var schema3 = string().refine(new DIDSchema());
  var did = () => schema3;
  var read5 = (input) => schema3.read(input);
  var match3 = (options = {}) => (
    /** @type {Schema.Schema<API.DID<Method> & API.URI<"did:">>} */
    string().refine(new DIDSchema(options.method))
  );
  var from8 = (input) => match3({}).from(input);

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/schema/text.js
  var text_exports = {};
  __export(text_exports, {
    match: () => match4,
    read: () => read6,
    text: () => text
  });
  var schema4 = string();
  var match4 = (options) => options ? schema4.refine(new Match(options.pattern)) : schema4;
  var text = match4;
  var read6 = (input) => schema4.read(input);
  var Match = class extends API {
    /**
     * @param {string} source
     * @param {RegExp} pattern
     */
    readWith(source, pattern) {
      if (!pattern.test(source)) {
        return error(
          `Expected to match ${pattern} but got "${source}" instead`
        );
      } else {
        return { ok: source };
      }
    }
  };

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/delegation.js
  var ArchiveSchema = variant({
    "ucan@0.9.1": (
      /** @type {Schema.Schema<API.UCANLink>} */
      match2({ version: 1 })
    )
  });

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/receipt.js
  var NOFX = Object.freeze({ fork: Object.freeze([]) });

  // node_modules/.pnpm/@ucanto+core@10.0.1/node_modules/@ucanto/core/src/message.js
  var MessageSchema = variant({
    "ucanto/message@7.0.0": struct({
      execute: match2().array().optional(),
      delegate: dictionary({
        key: string(),
        value: (
          /** @type {API.Reader<API.Link<API.ReceiptModel>>} */
          match2()
        )
      }).array().optional()
    })
  });

  // node_modules/.pnpm/@ucanto+validator@9.0.2/node_modules/@ucanto/validator/src/capability.js
  var defaultNBSchema = (
    /** @type {Schema.MapRepresentation<any>} */
    schema_exports3.struct({})
  );

  // node_modules/.pnpm/@noble+ed25519@1.7.3/node_modules/@noble/ed25519/lib/esm/index.js
  var nodeCrypto = __toESM(require_crypto(), 1);
  var _0n = BigInt(0);
  var _1n = BigInt(1);
  var _2n = BigInt(2);
  var _8n = BigInt(8);
  var CU_O = BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989");
  var CURVE = Object.freeze({
    a: BigInt(-1),
    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
    P: BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949"),
    l: CU_O,
    n: CU_O,
    h: BigInt(8),
    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960")
  });
  var POW_2_256 = BigInt("0x10000000000000000000000000000000000000000000000000000000000000000");
  var SQRT_M1 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
  var SQRT_D = BigInt("6853475219497561581579357271197624642482790079785650197046958215289687604742");
  var SQRT_AD_MINUS_ONE = BigInt("25063068953384623474111414158702152701244531502492656460079210482610430750235");
  var INVSQRT_A_MINUS_D = BigInt("54469307008909316920995813868745141605393597292927456921205312896311721017578");
  var ONE_MINUS_D_SQ = BigInt("1159843021668779879193775521855586647937357759715417654439879720876111806838");
  var D_MINUS_ONE_SQ = BigInt("40440834346308536858101042469323190826248399146238708352240133220865137265952");
  var ExtendedPoint = class _ExtendedPoint {
    constructor(x, y, z, t) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.t = t;
    }
    static fromAffine(p) {
      if (!(p instanceof Point)) {
        throw new TypeError("ExtendedPoint#fromAffine: expected Point");
      }
      if (p.equals(Point.ZERO))
        return _ExtendedPoint.ZERO;
      return new _ExtendedPoint(p.x, p.y, _1n, mod(p.x * p.y));
    }
    static toAffineBatch(points) {
      const toInv = invertBatch(points.map((p) => p.z));
      return points.map((p, i) => p.toAffine(toInv[i]));
    }
    static normalizeZ(points) {
      return this.toAffineBatch(points).map(this.fromAffine);
    }
    equals(other) {
      assertExtPoint(other);
      const { x: X1, y: Y1, z: Z1 } = this;
      const { x: X2, y: Y2, z: Z2 } = other;
      const X1Z2 = mod(X1 * Z2);
      const X2Z1 = mod(X2 * Z1);
      const Y1Z2 = mod(Y1 * Z2);
      const Y2Z1 = mod(Y2 * Z1);
      return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
    }
    negate() {
      return new _ExtendedPoint(mod(-this.x), this.y, this.z, mod(-this.t));
    }
    double() {
      const { x: X1, y: Y1, z: Z1 } = this;
      const { a } = CURVE;
      const A = mod(X1 * X1);
      const B = mod(Y1 * Y1);
      const C = mod(_2n * mod(Z1 * Z1));
      const D = mod(a * A);
      const x1y1 = X1 + Y1;
      const E = mod(mod(x1y1 * x1y1) - A - B);
      const G = D + B;
      const F = G - C;
      const H = D - B;
      const X3 = mod(E * F);
      const Y3 = mod(G * H);
      const T3 = mod(E * H);
      const Z3 = mod(F * G);
      return new _ExtendedPoint(X3, Y3, Z3, T3);
    }
    add(other) {
      assertExtPoint(other);
      const { x: X1, y: Y1, z: Z1, t: T1 } = this;
      const { x: X2, y: Y2, z: Z2, t: T2 } = other;
      const A = mod((Y1 - X1) * (Y2 + X2));
      const B = mod((Y1 + X1) * (Y2 - X2));
      const F = mod(B - A);
      if (F === _0n)
        return this.double();
      const C = mod(Z1 * _2n * T2);
      const D = mod(T1 * _2n * Z2);
      const E = D + C;
      const G = B + A;
      const H = D - C;
      const X3 = mod(E * F);
      const Y3 = mod(G * H);
      const T3 = mod(E * H);
      const Z3 = mod(F * G);
      return new _ExtendedPoint(X3, Y3, Z3, T3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    precomputeWindow(W) {
      const windows = 1 + 256 / W;
      const points = [];
      let p = this;
      let base3 = p;
      for (let window2 = 0; window2 < windows; window2++) {
        base3 = p;
        points.push(base3);
        for (let i = 1; i < 2 ** (W - 1); i++) {
          base3 = base3.add(p);
          points.push(base3);
        }
        p = base3.double();
      }
      return points;
    }
    wNAF(n, affinePoint) {
      if (!affinePoint && this.equals(_ExtendedPoint.BASE))
        affinePoint = Point.BASE;
      const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
      if (256 % W) {
        throw new Error("Point#wNAF: Invalid precomputation window, must be power of 2");
      }
      let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
      if (!precomputes) {
        precomputes = this.precomputeWindow(W);
        if (affinePoint && W !== 1) {
          precomputes = _ExtendedPoint.normalizeZ(precomputes);
          pointPrecomputes.set(affinePoint, precomputes);
        }
      }
      let p = _ExtendedPoint.ZERO;
      let f = _ExtendedPoint.BASE;
      const windows = 1 + 256 / W;
      const windowSize = 2 ** (W - 1);
      const mask = BigInt(2 ** W - 1);
      const maxNumber = 2 ** W;
      const shiftBy = BigInt(W);
      for (let window2 = 0; window2 < windows; window2++) {
        const offset = window2 * windowSize;
        let wbits = Number(n & mask);
        n >>= shiftBy;
        if (wbits > windowSize) {
          wbits -= maxNumber;
          n += _1n;
        }
        const offset1 = offset;
        const offset2 = offset + Math.abs(wbits) - 1;
        const cond1 = window2 % 2 !== 0;
        const cond2 = wbits < 0;
        if (wbits === 0) {
          f = f.add(constTimeNegate(cond1, precomputes[offset1]));
        } else {
          p = p.add(constTimeNegate(cond2, precomputes[offset2]));
        }
      }
      return _ExtendedPoint.normalizeZ([p, f])[0];
    }
    multiply(scalar, affinePoint) {
      return this.wNAF(normalizeScalar(scalar, CURVE.l), affinePoint);
    }
    multiplyUnsafe(scalar) {
      let n = normalizeScalar(scalar, CURVE.l, false);
      const G = _ExtendedPoint.BASE;
      const P0 = _ExtendedPoint.ZERO;
      if (n === _0n)
        return P0;
      if (this.equals(P0) || n === _1n)
        return this;
      if (this.equals(G))
        return this.wNAF(n);
      let p = P0;
      let d = this;
      while (n > _0n) {
        if (n & _1n)
          p = p.add(d);
        d = d.double();
        n >>= _1n;
      }
      return p;
    }
    isSmallOrder() {
      return this.multiplyUnsafe(CURVE.h).equals(_ExtendedPoint.ZERO);
    }
    isTorsionFree() {
      let p = this.multiplyUnsafe(CURVE.l / _2n).double();
      if (CURVE.l % _2n)
        p = p.add(this);
      return p.equals(_ExtendedPoint.ZERO);
    }
    toAffine(invZ) {
      const { x, y, z } = this;
      const is0 = this.equals(_ExtendedPoint.ZERO);
      if (invZ == null)
        invZ = is0 ? _8n : invert(z);
      const ax = mod(x * invZ);
      const ay = mod(y * invZ);
      const zz = mod(z * invZ);
      if (is0)
        return Point.ZERO;
      if (zz !== _1n)
        throw new Error("invZ was invalid");
      return new Point(ax, ay);
    }
    fromRistrettoBytes() {
      legacyRist();
    }
    toRistrettoBytes() {
      legacyRist();
    }
    fromRistrettoHash() {
      legacyRist();
    }
  };
  ExtendedPoint.BASE = new ExtendedPoint(CURVE.Gx, CURVE.Gy, _1n, mod(CURVE.Gx * CURVE.Gy));
  ExtendedPoint.ZERO = new ExtendedPoint(_0n, _1n, _1n, _0n);
  function constTimeNegate(condition, item) {
    const neg = item.negate();
    return condition ? neg : item;
  }
  function assertExtPoint(other) {
    if (!(other instanceof ExtendedPoint))
      throw new TypeError("ExtendedPoint expected");
  }
  function assertRstPoint(other) {
    if (!(other instanceof RistrettoPoint))
      throw new TypeError("RistrettoPoint expected");
  }
  function legacyRist() {
    throw new Error("Legacy method: switch to RistrettoPoint");
  }
  var RistrettoPoint = class _RistrettoPoint {
    constructor(ep) {
      this.ep = ep;
    }
    static calcElligatorRistrettoMap(r0) {
      const { d } = CURVE;
      const r = mod(SQRT_M1 * r0 * r0);
      const Ns = mod((r + _1n) * ONE_MINUS_D_SQ);
      let c = BigInt(-1);
      const D = mod((c - d * r) * mod(r + d));
      let { isValid: Ns_D_is_sq, value: s } = uvRatio(Ns, D);
      let s_ = mod(s * r0);
      if (!edIsNegative(s_))
        s_ = mod(-s_);
      if (!Ns_D_is_sq)
        s = s_;
      if (!Ns_D_is_sq)
        c = r;
      const Nt = mod(c * (r - _1n) * D_MINUS_ONE_SQ - D);
      const s2 = s * s;
      const W0 = mod((s + s) * D);
      const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
      const W2 = mod(_1n - s2);
      const W3 = mod(_1n + s2);
      return new ExtendedPoint(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
    }
    static hashToCurve(hex) {
      hex = ensureBytes(hex, 64);
      const r1 = bytes255ToNumberLE(hex.slice(0, 32));
      const R1 = this.calcElligatorRistrettoMap(r1);
      const r2 = bytes255ToNumberLE(hex.slice(32, 64));
      const R2 = this.calcElligatorRistrettoMap(r2);
      return new _RistrettoPoint(R1.add(R2));
    }
    static fromHex(hex) {
      hex = ensureBytes(hex, 32);
      const { a, d } = CURVE;
      const emsg = "RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint";
      const s = bytes255ToNumberLE(hex);
      if (!equalBytes(numberTo32BytesLE(s), hex) || edIsNegative(s))
        throw new Error(emsg);
      const s2 = mod(s * s);
      const u1 = mod(_1n + a * s2);
      const u2 = mod(_1n - a * s2);
      const u1_2 = mod(u1 * u1);
      const u2_2 = mod(u2 * u2);
      const v = mod(a * d * u1_2 - u2_2);
      const { isValid, value: I } = invertSqrt(mod(v * u2_2));
      const Dx = mod(I * u2);
      const Dy = mod(I * Dx * v);
      let x = mod((s + s) * Dx);
      if (edIsNegative(x))
        x = mod(-x);
      const y = mod(u1 * Dy);
      const t = mod(x * y);
      if (!isValid || edIsNegative(t) || y === _0n)
        throw new Error(emsg);
      return new _RistrettoPoint(new ExtendedPoint(x, y, _1n, t));
    }
    toRawBytes() {
      let { x, y, z, t } = this.ep;
      const u1 = mod(mod(z + y) * mod(z - y));
      const u2 = mod(x * y);
      const u2sq = mod(u2 * u2);
      const { value: invsqrt } = invertSqrt(mod(u1 * u2sq));
      const D1 = mod(invsqrt * u1);
      const D2 = mod(invsqrt * u2);
      const zInv = mod(D1 * D2 * t);
      let D;
      if (edIsNegative(t * zInv)) {
        let _x = mod(y * SQRT_M1);
        let _y = mod(x * SQRT_M1);
        x = _x;
        y = _y;
        D = mod(D1 * INVSQRT_A_MINUS_D);
      } else {
        D = D2;
      }
      if (edIsNegative(x * zInv))
        y = mod(-y);
      let s = mod((z - y) * D);
      if (edIsNegative(s))
        s = mod(-s);
      return numberTo32BytesLE(s);
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
    toString() {
      return this.toHex();
    }
    equals(other) {
      assertRstPoint(other);
      const a = this.ep;
      const b = other.ep;
      const one = mod(a.x * b.y) === mod(a.y * b.x);
      const two = mod(a.y * b.y) === mod(a.x * b.x);
      return one || two;
    }
    add(other) {
      assertRstPoint(other);
      return new _RistrettoPoint(this.ep.add(other.ep));
    }
    subtract(other) {
      assertRstPoint(other);
      return new _RistrettoPoint(this.ep.subtract(other.ep));
    }
    multiply(scalar) {
      return new _RistrettoPoint(this.ep.multiply(scalar));
    }
    multiplyUnsafe(scalar) {
      return new _RistrettoPoint(this.ep.multiplyUnsafe(scalar));
    }
  };
  RistrettoPoint.BASE = new RistrettoPoint(ExtendedPoint.BASE);
  RistrettoPoint.ZERO = new RistrettoPoint(ExtendedPoint.ZERO);
  var pointPrecomputes = /* @__PURE__ */ new WeakMap();
  var Point = class _Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
    _setWindowSize(windowSize) {
      this._WINDOW_SIZE = windowSize;
      pointPrecomputes.delete(this);
    }
    static fromHex(hex, strict = true) {
      const { d, P } = CURVE;
      hex = ensureBytes(hex, 32);
      const normed = hex.slice();
      normed[31] = hex[31] & ~128;
      const y = bytesToNumberLE(normed);
      if (strict && y >= P)
        throw new Error("Expected 0 < hex < P");
      if (!strict && y >= POW_2_256)
        throw new Error("Expected 0 < hex < 2**256");
      const y2 = mod(y * y);
      const u = mod(y2 - _1n);
      const v = mod(d * y2 + _1n);
      let { isValid, value: x } = uvRatio(u, v);
      if (!isValid)
        throw new Error("Point.fromHex: invalid y coordinate");
      const isXOdd = (x & _1n) === _1n;
      const isLastByteOdd = (hex[31] & 128) !== 0;
      if (isLastByteOdd !== isXOdd) {
        x = mod(-x);
      }
      return new _Point(x, y);
    }
    static async fromPrivateKey(privateKey) {
      return (await getExtendedPublicKey(privateKey)).point;
    }
    toRawBytes() {
      const bytes2 = numberTo32BytesLE(this.y);
      bytes2[31] |= this.x & _1n ? 128 : 0;
      return bytes2;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
    toX25519() {
      const { y } = this;
      const u = mod((_1n + y) * invert(_1n - y));
      return numberTo32BytesLE(u);
    }
    isTorsionFree() {
      return ExtendedPoint.fromAffine(this).isTorsionFree();
    }
    equals(other) {
      return this.x === other.x && this.y === other.y;
    }
    negate() {
      return new _Point(mod(-this.x), this.y);
    }
    add(other) {
      return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
    }
    subtract(other) {
      return this.add(other.negate());
    }
    multiply(scalar) {
      return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
    }
  };
  Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
  Point.ZERO = new Point(_0n, _1n);
  var Signature2 = class _Signature {
    constructor(r, s) {
      this.r = r;
      this.s = s;
      this.assertValidity();
    }
    static fromHex(hex) {
      const bytes2 = ensureBytes(hex, 64);
      const r = Point.fromHex(bytes2.slice(0, 32), false);
      const s = bytesToNumberLE(bytes2.slice(32, 64));
      return new _Signature(r, s);
    }
    assertValidity() {
      const { r, s } = this;
      if (!(r instanceof Point))
        throw new Error("Expected Point instance");
      normalizeScalar(s, CURVE.l, false);
      return this;
    }
    toRawBytes() {
      const u8 = new Uint8Array(64);
      u8.set(this.r.toRawBytes());
      u8.set(numberTo32BytesLE(this.s), 32);
      return u8;
    }
    toHex() {
      return bytesToHex(this.toRawBytes());
    }
  };
  function concatBytes(...arrays) {
    if (!arrays.every((a) => a instanceof Uint8Array))
      throw new Error("Expected Uint8Array list");
    if (arrays.length === 1)
      return arrays[0];
    const length3 = arrays.reduce((a, arr) => a + arr.length, 0);
    const result = new Uint8Array(length3);
    for (let i = 0, pad = 0; i < arrays.length; i++) {
      const arr = arrays[i];
      result.set(arr, pad);
      pad += arr.length;
    }
    return result;
  }
  var hexes = Array.from({ length: 256 }, (v, i) => i.toString(16).padStart(2, "0"));
  function bytesToHex(uint8a) {
    if (!(uint8a instanceof Uint8Array))
      throw new Error("Uint8Array expected");
    let hex = "";
    for (let i = 0; i < uint8a.length; i++) {
      hex += hexes[uint8a[i]];
    }
    return hex;
  }
  function hexToBytes(hex) {
    if (typeof hex !== "string") {
      throw new TypeError("hexToBytes: expected string, got " + typeof hex);
    }
    if (hex.length % 2)
      throw new Error("hexToBytes: received invalid unpadded hex");
    const array2 = new Uint8Array(hex.length / 2);
    for (let i = 0; i < array2.length; i++) {
      const j = i * 2;
      const hexByte = hex.slice(j, j + 2);
      const byte = Number.parseInt(hexByte, 16);
      if (Number.isNaN(byte) || byte < 0)
        throw new Error("Invalid byte sequence");
      array2[i] = byte;
    }
    return array2;
  }
  function numberTo32BytesBE(num) {
    const length3 = 32;
    const hex = num.toString(16).padStart(length3 * 2, "0");
    return hexToBytes(hex);
  }
  function numberTo32BytesLE(num) {
    return numberTo32BytesBE(num).reverse();
  }
  function edIsNegative(num) {
    return (mod(num) & _1n) === _1n;
  }
  function bytesToNumberLE(uint8a) {
    if (!(uint8a instanceof Uint8Array))
      throw new Error("Expected Uint8Array");
    return BigInt("0x" + bytesToHex(Uint8Array.from(uint8a).reverse()));
  }
  var MAX_255B = BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
  function bytes255ToNumberLE(bytes2) {
    return mod(bytesToNumberLE(bytes2) & MAX_255B);
  }
  function mod(a, b = CURVE.P) {
    const res = a % b;
    return res >= _0n ? res : b + res;
  }
  function invert(number2, modulo = CURVE.P) {
    if (number2 === _0n || modulo <= _0n) {
      throw new Error(`invert: expected positive integers, got n=${number2} mod=${modulo}`);
    }
    let a = mod(number2, modulo);
    let b = modulo;
    let x = _0n, y = _1n, u = _1n, v = _0n;
    while (a !== _0n) {
      const q = b / a;
      const r = b % a;
      const m = x - u * q;
      const n = y - v * q;
      b = a, a = r, x = u, y = v, u = m, v = n;
    }
    const gcd = b;
    if (gcd !== _1n)
      throw new Error("invert: does not exist");
    return mod(x, modulo);
  }
  function invertBatch(nums, p = CURVE.P) {
    const tmp = new Array(nums.length);
    const lastMultiplied = nums.reduce((acc, num, i) => {
      if (num === _0n)
        return acc;
      tmp[i] = acc;
      return mod(acc * num, p);
    }, _1n);
    const inverted = invert(lastMultiplied, p);
    nums.reduceRight((acc, num, i) => {
      if (num === _0n)
        return acc;
      tmp[i] = mod(acc * tmp[i], p);
      return mod(acc * num, p);
    }, inverted);
    return tmp;
  }
  function pow2(x, power) {
    const { P } = CURVE;
    let res = x;
    while (power-- > _0n) {
      res *= res;
      res %= P;
    }
    return res;
  }
  function pow_2_252_3(x) {
    const { P } = CURVE;
    const _5n = BigInt(5);
    const _10n = BigInt(10);
    const _20n = BigInt(20);
    const _40n = BigInt(40);
    const _80n = BigInt(80);
    const x2 = x * x % P;
    const b2 = x2 * x % P;
    const b4 = pow2(b2, _2n) * b2 % P;
    const b5 = pow2(b4, _1n) * x % P;
    const b10 = pow2(b5, _5n) * b5 % P;
    const b20 = pow2(b10, _10n) * b10 % P;
    const b40 = pow2(b20, _20n) * b20 % P;
    const b80 = pow2(b40, _40n) * b40 % P;
    const b160 = pow2(b80, _80n) * b80 % P;
    const b240 = pow2(b160, _80n) * b80 % P;
    const b250 = pow2(b240, _10n) * b10 % P;
    const pow_p_5_8 = pow2(b250, _2n) * x % P;
    return { pow_p_5_8, b2 };
  }
  function uvRatio(u, v) {
    const v3 = mod(v * v * v);
    const v7 = mod(v3 * v3 * v);
    const pow = pow_2_252_3(u * v7).pow_p_5_8;
    let x = mod(u * v3 * pow);
    const vx2 = mod(v * x * x);
    const root1 = x;
    const root2 = mod(x * SQRT_M1);
    const useRoot1 = vx2 === u;
    const useRoot2 = vx2 === mod(-u);
    const noRoot = vx2 === mod(-u * SQRT_M1);
    if (useRoot1)
      x = root1;
    if (useRoot2 || noRoot)
      x = root2;
    if (edIsNegative(x))
      x = mod(-x);
    return { isValid: useRoot1 || useRoot2, value: x };
  }
  function invertSqrt(number2) {
    return uvRatio(_1n, number2);
  }
  function modlLE(hash) {
    return mod(bytesToNumberLE(hash), CURVE.l);
  }
  function equalBytes(b1, b2) {
    if (b1.length !== b2.length) {
      return false;
    }
    for (let i = 0; i < b1.length; i++) {
      if (b1[i] !== b2[i]) {
        return false;
      }
    }
    return true;
  }
  function ensureBytes(hex, expectedLength) {
    const bytes2 = hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
    if (typeof expectedLength === "number" && bytes2.length !== expectedLength)
      throw new Error(`Expected ${expectedLength} bytes`);
    return bytes2;
  }
  function normalizeScalar(num, max, strict = true) {
    if (!max)
      throw new TypeError("Specify max value");
    if (typeof num === "number" && Number.isSafeInteger(num))
      num = BigInt(num);
    if (typeof num === "bigint" && num < max) {
      if (strict) {
        if (_0n < num)
          return num;
      } else {
        if (_0n <= num)
          return num;
      }
    }
    throw new TypeError("Expected valid scalar: 0 < scalar < max");
  }
  function adjustBytes25519(bytes2) {
    bytes2[0] &= 248;
    bytes2[31] &= 127;
    bytes2[31] |= 64;
    return bytes2;
  }
  function checkPrivateKey(key) {
    key = typeof key === "bigint" || typeof key === "number" ? numberTo32BytesBE(normalizeScalar(key, POW_2_256)) : ensureBytes(key);
    if (key.length !== 32)
      throw new Error(`Expected 32 bytes`);
    return key;
  }
  function getKeyFromHash(hashed) {
    const head = adjustBytes25519(hashed.slice(0, 32));
    const prefix = hashed.slice(32, 64);
    const scalar = modlLE(head);
    const point = Point.BASE.multiply(scalar);
    const pointBytes = point.toRawBytes();
    return { head, prefix, scalar, point, pointBytes };
  }
  var _sha512Sync;
  async function getExtendedPublicKey(key) {
    return getKeyFromHash(await utils.sha512(checkPrivateKey(key)));
  }
  async function sign(message, privateKey) {
    message = ensureBytes(message);
    const { prefix, scalar, pointBytes } = await getExtendedPublicKey(privateKey);
    const r = modlLE(await utils.sha512(prefix, message));
    const R = Point.BASE.multiply(r);
    const k = modlLE(await utils.sha512(R.toRawBytes(), pointBytes, message));
    const s = mod(r + k * scalar, CURVE.l);
    return new Signature2(R, s).toRawBytes();
  }
  function prepareVerification(sig, message, publicKey) {
    message = ensureBytes(message);
    if (!(publicKey instanceof Point))
      publicKey = Point.fromHex(publicKey, false);
    const { r, s } = sig instanceof Signature2 ? sig.assertValidity() : Signature2.fromHex(sig);
    const SB = ExtendedPoint.BASE.multiplyUnsafe(s);
    return { r, s, SB, pub: publicKey, msg: message };
  }
  function finishVerification(publicKey, r, SB, hashed) {
    const k = modlLE(hashed);
    const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k);
    const RkA = ExtendedPoint.fromAffine(r).add(kA);
    return RkA.subtract(SB).multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
  }
  async function verify(sig, message, publicKey) {
    const { r, SB, msg, pub } = prepareVerification(sig, message, publicKey);
    const hashed = await utils.sha512(r.toRawBytes(), pub.toRawBytes(), msg);
    return finishVerification(pub, r, SB, hashed);
  }
  Point.BASE._setWindowSize(8);
  var crypto2 = {
    node: nodeCrypto,
    web: typeof self === "object" && "crypto" in self ? self.crypto : void 0
  };
  var utils = {
    bytesToHex,
    hexToBytes,
    concatBytes,
    getExtendedPublicKey,
    mod,
    invert,
    TORSION_SUBGROUP: [
      "0100000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a",
      "0000000000000000000000000000000000000000000000000000000000000080",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05",
      "ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f",
      "26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85",
      "0000000000000000000000000000000000000000000000000000000000000000",
      "c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa"
    ],
    hashToPrivateScalar: (hash) => {
      hash = ensureBytes(hash);
      if (hash.length < 40 || hash.length > 1024)
        throw new Error("Expected 40-1024 bytes of private key as per FIPS 186");
      return mod(bytesToNumberLE(hash), CURVE.l - _1n) + _1n;
    },
    randomBytes: (bytesLength = 32) => {
      if (crypto2.web) {
        return crypto2.web.getRandomValues(new Uint8Array(bytesLength));
      } else if (crypto2.node) {
        const { randomBytes } = crypto2.node;
        return new Uint8Array(randomBytes(bytesLength).buffer);
      } else {
        throw new Error("The environment doesn't have randomBytes function");
      }
    },
    randomPrivateKey: () => {
      return utils.randomBytes(32);
    },
    sha512: async (...messages) => {
      const message = concatBytes(...messages);
      if (crypto2.web) {
        const buffer2 = await crypto2.web.subtle.digest("SHA-512", message.buffer);
        return new Uint8Array(buffer2);
      } else if (crypto2.node) {
        return Uint8Array.from(crypto2.node.createHash("sha512").update(message).digest());
      } else {
        throw new Error("The environment doesn't have sha512 function");
      }
    },
    precompute(windowSize = 8, point = Point.BASE) {
      const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);
      cached._setWindowSize(windowSize);
      cached.multiply(_2n);
      return cached;
    },
    sha512Sync: void 0
  };
  Object.defineProperties(utils, {
    sha512Sync: {
      configurable: false,
      get() {
        return _sha512Sync;
      },
      set(val) {
        if (!_sha512Sync)
          _sha512Sync = val;
      }
    }
  });

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/ed25519/verifier.js
  var verifier_exports = {};
  __export(verifier_exports, {
    code: () => code5,
    decode: () => decode21,
    encode: () => encode17,
    format: () => format6,
    name: () => name3,
    or: () => or5,
    parse: () => parse4,
    signatureAlgorithm: () => signatureAlgorithm,
    signatureCode: () => signatureCode
  });

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/verifier.js
  var parseWith = (did2, parsers) => {
    if (did2.startsWith("did:")) {
      for (const parser of parsers) {
        try {
          return parser.parse(did2);
        } catch (_) {
        }
      }
      throw new Error(`Unsupported did ${did2}`);
    } else {
      throw new Error(`Expected did instead got ${did2}`);
    }
  };
  var or4 = (left, right) => new Parser([left, right]);
  var Parser = class _Parser {
    /**
     * @param {API.PrincipalParser[]} variants
     */
    constructor(variants) {
      this.variants = variants;
    }
    /**
     * @param {API.DID} did
     */
    parse(did2) {
      return parseWith(did2, this.variants);
    }
    /**
     * @param {API.PrincipalParser} parser
     */
    or(parser) {
      return new _Parser([...this.variants, parser]);
    }
  };
  var withDID = (key, id) => new VerifierWithDID(id, key);
  var VerifierWithDID = class {
    /**
     * @param {ID} id
     * @param {API.VerifierKey<SigAlg>} key
     */
    constructor(id, key) {
      this.id = id;
      this.key = key;
    }
    did() {
      return this.id;
    }
    toDIDKey() {
      return this.key.toDIDKey();
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @param {API.Signature<T, SigAlg>} signature
     * @returns {API.Await<boolean>}
     */
    verify(payload, signature) {
      return this.key.verify(payload, signature);
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     */
    withDID(id) {
      return withDID(this.key, id);
    }
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/ed25519/verifier.js
  var code5 = 237;
  var name3 = "Ed25519";
  var signatureCode = EdDSA;
  var signatureAlgorithm = "EdDSA";
  var PUBLIC_TAG_SIZE = varint_exports2.encodingLength(code5);
  var SIZE = 32 + PUBLIC_TAG_SIZE;
  var parse4 = (did2) => decode21(parse2(did2));
  var decode21 = (bytes2) => {
    const [algorithm2] = varint_exports2.decode(bytes2);
    if (algorithm2 !== code5) {
      throw new RangeError(
        `Unsupported key algorithm with multicode 0x${code5.toString(16)}`
      );
    } else if (bytes2.byteLength !== SIZE) {
      throw new RangeError(
        `Expected Uint8Array with byteLength ${SIZE}, instead got Uint8Array with byteLength ${bytes2.byteLength}`
      );
    } else {
      return new Ed25519Verifier(bytes2.buffer, bytes2.byteOffset, bytes2.byteLength);
    }
  };
  var format6 = (principal) => format3(principal);
  var encode17 = (principal) => encode8(principal);
  var Ed25519Verifier = class extends Uint8Array {
    /** @type {typeof code} */
    get code() {
      return code5;
    }
    /** @type {typeof signatureCode} */
    get signatureCode() {
      return signatureCode;
    }
    /** @type {typeof signatureAlgorithm} */
    get signatureAlgorithm() {
      return signatureAlgorithm;
    }
    /**
     * Raw public key without a multiformat code.
     *
     * @readonly
     */
    get publicKey() {
      const key = new Uint8Array(this.buffer, this.byteOffset + PUBLIC_TAG_SIZE);
      Object.defineProperties(this, {
        publicKey: {
          value: key
        }
      });
      return key;
    }
    /**
     * DID of the Principal in `did:key` format.
     * @returns {API.DID<"key">}
     */
    did() {
      return `did:key:${base58btc2.encode(this)}`;
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @param {API.Signature<T, Signature.EdDSA>} signature
     * @returns {API.Await<boolean>}
     */
    verify(payload, signature) {
      return signature.code === signatureCode && verify(signature.raw, payload, this.publicKey);
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     * @returns {API.Verifier<ID, typeof signatureCode>}
     */
    withDID(id) {
      return withDID(this, id);
    }
    toDIDKey() {
      return this.did();
    }
  };
  var or5 = (other) => or4({ parse: parse4 }, other);

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/signer.js
  var or6 = (left, right) => new Importer([left, right]);
  var Importer = class _Importer {
    /**
     * @param {Importers} variants
     */
    constructor(variants) {
      this.variants = variants;
      this.from = create6(variants);
    }
    /**
     * @template {API.SignerImporter} Other
     * @param {Other} other
     * @returns {API.CompositeImporter<[Other, ...Importers]>}
     */
    or(other) {
      return new _Importer([other, ...this.variants]);
    }
  };
  var create6 = (importers) => {
    const from11 = (archive) => {
      if (archive.id.startsWith("did:key:")) {
        return (
          /** @type {API.Signer<ID, Alg>} */
          importWith(archive, importers)
        );
      } else {
        for (const [name5, key] of Object.entries(archive.keys)) {
          const id = (
            /** @type {API.DIDKey} */
            name5
          );
          const signer = (
            /** @type {API.Signer<API.DIDKey, Alg>} */
            importWith(
              {
                id,
                keys: { [id]: key }
              },
              importers
            )
          );
          return signer.withDID(archive.id);
        }
        throw new Error(`Archive ${archive.id} contains no keys`);
      }
    };
    return (
      /** @type {API.Intersection<Importers[number]['from']>} */
      from11
    );
  };
  var importWith = (archive, importers) => {
    for (const importer of importers) {
      try {
        return importer.from(archive);
      } catch (_) {
      }
    }
    throw new Error(`Unsupported signer`);
  };
  var withDID2 = ({ signer, verifier }, id) => new SignerWithDID(signer, verifier.withDID(id));
  var SignerWithDID = class {
    /**
     * @param {API.Signer<API.DID<'key'>, Code>} key
     * @param {API.Verifier<ID, Code>} verifier
     */
    constructor(key, verifier) {
      this.key = key;
      this.verifier = verifier;
    }
    /** @type {API.Signer<ID, Code>} */
    get signer() {
      return this;
    }
    get signatureAlgorithm() {
      return this.key.signatureAlgorithm;
    }
    get signatureCode() {
      return this.key.signatureCode;
    }
    /**
     * @returns {ID}
     */
    did() {
      return this.verifier.did();
    }
    toDIDKey() {
      return this.verifier.toDIDKey();
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     */
    withDID(id) {
      return withDID2(this.key, id);
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     */
    sign(payload) {
      return this.key.sign(payload);
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @param {API.Signature<T, Code>} signature
     */
    verify(payload, signature) {
      return this.verifier.verify(payload, signature);
    }
    toArchive() {
      const { keys } = this.key.toArchive();
      return {
        id: this.did(),
        keys
      };
    }
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/ed25519/signer.js
  var code6 = 4864;
  var signatureAlgorithm2 = signatureAlgorithm;
  var PRIVATE_TAG_SIZE = varint_exports2.encodingLength(code6);
  var PUBLIC_TAG_SIZE2 = varint_exports2.encodingLength(code5);
  var KEY_SIZE = 32;
  var SIZE2 = PRIVATE_TAG_SIZE + KEY_SIZE + PUBLIC_TAG_SIZE2 + KEY_SIZE;
  var PUB_KEY_OFFSET = PRIVATE_TAG_SIZE + KEY_SIZE;
  var from9 = ({ id, keys }) => {
    if (id.startsWith("did:key:")) {
      const key = keys[
        /** @type {API.DIDKey} */
        id
      ];
      if (key instanceof Uint8Array) {
        return decode22(key);
      }
    }
    throw new TypeError(`Unsupported archive format`);
  };
  var or7 = (other) => or6({ from: from9 }, other);
  var decode22 = (bytes2) => {
    if (bytes2.byteLength !== SIZE2) {
      throw new Error(
        `Expected Uint8Array with byteLength of ${SIZE2} instead not ${bytes2.byteLength}`
      );
    }
    {
      const [keyCode] = varint_exports2.decode(bytes2);
      if (keyCode !== code6) {
        throw new Error(`Given bytes must be a multiformat with ${code6} tag`);
      }
    }
    {
      const [code8] = varint_exports2.decode(bytes2.subarray(PUB_KEY_OFFSET));
      if (code8 !== code5) {
        throw new Error(
          `Given bytes must contain public key in multiformats with ${code5} tag`
        );
      }
    }
    return new Ed25519Signer(bytes2);
  };
  var Ed25519Signer = class extends Uint8Array {
    /** @type {typeof code} */
    get code() {
      return code6;
    }
    get signer() {
      return this;
    }
    /** @type {API.EdVerifier} */
    get verifier() {
      const bytes2 = new Uint8Array(this.buffer, PRIVATE_TAG_SIZE + KEY_SIZE);
      const verifier = decode21(bytes2);
      Object.defineProperties(this, {
        verifier: {
          value: verifier
        }
      });
      return verifier;
    }
    /**
     * Raw public key without multiformat code.
     */
    get secret() {
      const secret = new Uint8Array(this.buffer, PRIVATE_TAG_SIZE, KEY_SIZE);
      Object.defineProperties(this, {
        secret: {
          value: secret
        }
      });
      return secret;
    }
    /**
     * DID of this principal in `did:key` format.
     */
    did() {
      return this.verifier.did();
    }
    toDIDKey() {
      return this.verifier.toDIDKey();
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     * @returns {API.Signer<ID, typeof Signature.EdDSA>}
     */
    withDID(id) {
      return withDID2(this, id);
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @returns {Promise<API.SignatureView<T, typeof Signature.EdDSA>>}
     */
    async sign(payload) {
      const raw = await sign(payload, this.secret);
      return create4(this.signatureCode, raw);
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @param {API.Signature<T, typeof this.signatureCode>} signature
     */
    verify(payload, signature) {
      return this.verifier.verify(payload, signature);
    }
    get signatureAlgorithm() {
      return signatureAlgorithm2;
    }
    get signatureCode() {
      return EdDSA;
    }
    encode() {
      return this;
    }
    toArchive() {
      const id = this.did();
      return {
        id,
        keys: { [id]: this.encode() }
      };
    }
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa.js
  var rsa_exports = {};
  __export(rsa_exports, {
    Verifier: () => RSAVerifier,
    code: () => code7,
    decode: () => decode27,
    from: () => from10,
    generate: () => generate,
    name: () => name4,
    or: () => or8,
    signatureAlgorithm: () => signatureAlgorithm3,
    signatureCode: () => signatureCode2
  });

  // node_modules/.pnpm/one-webcrypto@1.0.3/node_modules/one-webcrypto/browser.mjs
  var _globalReference = globalThis || window || self;
  var webcrypto = _globalReference.crypto;

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/multiformat.js
  var tagWith = (code8, bytes2) => {
    const offset = varint_exports2.encodingLength(code8);
    const multiformat = new Uint8Array(bytes2.byteLength + offset);
    varint_exports2.encodeTo(code8, multiformat, 0);
    multiformat.set(bytes2, offset);
    return multiformat;
  };
  var untagWith = (code8, source, byteOffset = 0) => {
    const bytes2 = byteOffset !== 0 ? source.subarray(byteOffset) : source;
    const [tag, size2] = varint_exports2.decode(bytes2);
    if (tag !== code8) {
      throw new Error(
        `Expected multiformat with 0x${code8.toString(
          16
        )} tag instead got 0x${tag.toString(16)}`
      );
    } else {
      return new Uint8Array(bytes2.buffer, bytes2.byteOffset + size2);
    }
  };
  var encodingLength3 = varint_exports2.encodingLength;
  var encodeTo3 = varint_exports2.encodeTo;
  var decode23 = varint_exports2.decode;

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa/asn1.js
  var TAG_SIZE = 1;
  var INT_TAG = 2;
  var BITSTRING_TAG = 3;
  var OCTET_STRING_TAG = 4;
  var SEQUENCE_TAG = 48;
  var UNUSED_BIT_PAD = 0;
  var encodeDERLength = (length3) => {
    if (length3 <= 127) {
      return new Uint8Array([length3]);
    }
    const octets = [];
    while (length3 !== 0) {
      octets.push(length3 & 255);
      length3 = length3 >>> 8;
    }
    octets.reverse();
    return new Uint8Array([128 | octets.length & 255, ...octets]);
  };
  var readDERLength = (bytes2, offset = 0) => {
    if ((bytes2[offset] & 128) === 0) {
      return { number: bytes2[offset], consumed: 1 };
    }
    const numberBytes = bytes2[offset] & 127;
    if (bytes2.length < numberBytes + 1) {
      throw new Error(
        `ASN parsing error: Too few bytes. Expected encoded length's length to be at least ${numberBytes}`
      );
    }
    let length3 = 0;
    for (let i = 0; i < numberBytes; i++) {
      length3 = length3 << 8;
      length3 = length3 | bytes2[offset + i + 1];
    }
    return { number: length3, consumed: numberBytes + 1 };
  };
  var skip = (input, expectedTag, position) => {
    const parsed = into(input, expectedTag, position);
    return parsed.position + parsed.length;
  };
  var into = (input, expectedTag, offset) => {
    const actualTag = input[offset];
    if (actualTag !== expectedTag) {
      throw new Error(
        `ASN parsing error: Expected tag 0x${expectedTag.toString(
          16
        )} at position ${offset}, but got 0x${actualTag.toString(16)}.`
      );
    }
    const length3 = readDERLength(input, offset + TAG_SIZE);
    const position = offset + TAG_SIZE + length3.consumed;
    return { position, length: length3.number };
  };
  var encodeBitString = (input) => {
    const length3 = encodeDERLength(input.byteLength + 1);
    const bytes2 = new Uint8Array(
      TAG_SIZE + // ASN_BITSTRING_TAG
      length3.byteLength + 1 + // amount of unused bits at the end of our bitstring
      input.byteLength
    );
    let byteOffset = 0;
    bytes2[byteOffset] = BITSTRING_TAG;
    byteOffset += TAG_SIZE;
    bytes2.set(length3, byteOffset);
    byteOffset += length3.byteLength;
    bytes2[byteOffset] = UNUSED_BIT_PAD;
    byteOffset += 1;
    bytes2.set(input, byteOffset);
    return bytes2;
  };
  var encodeOctetString = (input) => {
    const length3 = encodeDERLength(input.byteLength);
    const bytes2 = new Uint8Array(TAG_SIZE + length3.byteLength + input.byteLength);
    let byteOffset = 0;
    bytes2[byteOffset] = OCTET_STRING_TAG;
    byteOffset += TAG_SIZE;
    bytes2.set(length3, byteOffset);
    byteOffset += length3.byteLength;
    bytes2.set(input, byteOffset);
    return bytes2;
  };
  var encodeSequence = (sequence) => {
    let byteLength = 0;
    for (const item of sequence) {
      byteLength += item.byteLength;
    }
    const length3 = encodeDERLength(byteLength);
    const bytes2 = new Uint8Array(TAG_SIZE + length3.byteLength + byteLength);
    let byteOffset = 0;
    bytes2[byteOffset] = SEQUENCE_TAG;
    byteOffset += TAG_SIZE;
    bytes2.set(length3, byteOffset);
    byteOffset += length3.byteLength;
    for (const item of sequence) {
      bytes2.set(item, byteOffset);
      byteOffset += item.byteLength;
    }
    return bytes2;
  };
  var readSequence = (bytes2, offset = 0) => {
    const { position, length: length3 } = into(bytes2, SEQUENCE_TAG, offset);
    return new Uint8Array(bytes2.buffer, bytes2.byteOffset + position, length3);
  };
  var encodeInt = (input) => {
    const extra = input.byteLength === 0 || input[0] & 128 ? 1 : 0;
    const length3 = encodeDERLength(input.byteLength + extra);
    const bytes2 = new Uint8Array(
      TAG_SIZE + // INT_TAG
      length3.byteLength + input.byteLength + extra
    );
    let byteOffset = 0;
    bytes2[byteOffset] = INT_TAG;
    byteOffset += TAG_SIZE;
    bytes2.set(length3, byteOffset);
    byteOffset += length3.byteLength;
    if (extra > 0) {
      bytes2[byteOffset] = UNUSED_BIT_PAD;
      byteOffset += extra;
    }
    bytes2.set(input, byteOffset);
    return bytes2;
  };
  var enterSequence = (bytes2, offset = 0) => into(bytes2, SEQUENCE_TAG, offset).position;
  var skipSequence = (bytes2, offset = 0) => skip(bytes2, SEQUENCE_TAG, offset);
  var skipInt = (bytes2, offset = 0) => skip(bytes2, INT_TAG, offset);
  var readBitString = (bytes2, offset = 0) => {
    const { position, length: length3 } = into(bytes2, BITSTRING_TAG, offset);
    const tag = bytes2[position];
    if (tag !== UNUSED_BIT_PAD) {
      throw new Error(
        `Can not read bitstring, expected length to be multiple of 8, but got ${tag} unused bits in last byte.`
      );
    }
    return new Uint8Array(
      bytes2.buffer,
      bytes2.byteOffset + position + 1,
      length3 - 1
    );
  };
  var readInt = (bytes2, byteOffset = 0) => {
    const { position, length: length3 } = into(bytes2, INT_TAG, byteOffset);
    let delta = 0;
    while (bytes2[position + delta] === 0) {
      delta++;
    }
    return new Uint8Array(
      bytes2.buffer,
      bytes2.byteOffset + position + delta,
      length3 - delta
    );
  };
  var readOctetString = (bytes2, offset = 0) => {
    const { position, length: length3 } = into(bytes2, OCTET_STRING_TAG, offset);
    return new Uint8Array(bytes2.buffer, bytes2.byteOffset + position, length3);
  };
  var readSequenceWith = (readers, source, byteOffset = 0) => {
    const results = [];
    const sequence = readSequence(source, byteOffset);
    let offset = 0;
    for (const read7 of readers) {
      const chunk = read7(sequence, offset);
      results.push(chunk);
      offset = chunk.byteOffset + chunk.byteLength - sequence.byteOffset;
    }
    return results;
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa/spki.js
  var SPKI_PARAMS_ENCODED = new Uint8Array([
    48,
    13,
    6,
    9,
    42,
    134,
    72,
    134,
    247,
    13,
    1,
    1,
    1,
    5,
    0
  ]);
  var encode18 = (key) => encodeSequence([SPKI_PARAMS_ENCODED, encodeBitString(key)]);
  var decode24 = (info) => {
    const offset = enterSequence(info, 0);
    const keyOffset = skipSequence(info, offset);
    return readBitString(info, keyOffset);
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa/pkcs8.js
  var PKSC8_HEADER = new Uint8Array([
    // version
    2,
    1,
    0,
    // privateKeyAlgorithm
    48,
    13,
    6,
    9,
    42,
    134,
    72,
    134,
    247,
    13,
    1,
    1,
    1,
    5,
    0
  ]);
  var decode25 = (info) => {
    let offset = 0;
    offset = enterSequence(info, offset);
    offset = skipInt(info, offset);
    offset = skipSequence(info, offset);
    return readOctetString(info, offset);
  };
  var encode19 = (key) => encodeSequence([PKSC8_HEADER, encodeOctetString(key)]);

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa/public-key.js
  var encode20 = ({ n, e }) => encodeSequence([encodeInt(n), encodeInt(e)]);

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa/private-key.js
  var VERSION = new Uint8Array();
  var decode26 = (source, byteOffset = 0) => {
    const [v, n, e, d, p, q, dp, dq, qi] = readSequenceWith(
      [
        readInt,
        readInt,
        readInt,
        readInt,
        readInt,
        readInt,
        readInt,
        readInt,
        readInt
      ],
      source,
      byteOffset
    );
    return { v, n, e, d, p, q, dp, dq, qi };
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/rsa.js
  var name4 = "RSA";
  var code7 = 4869;
  var verifierCode = 4613;
  var signatureCode2 = RS256;
  var signatureAlgorithm3 = "RS256";
  var ALG = "RSASSA-PKCS1-v1_5";
  var HASH_ALG = "SHA-256";
  var KEY_SIZE2 = 2048;
  var SALT_LENGTH = 128;
  var IMPORT_PARAMS = {
    name: ALG,
    hash: { name: HASH_ALG }
  };
  var generate = async ({
    size: size2 = KEY_SIZE2,
    extractable = false
  } = {}) => {
    const { publicKey, privateKey } = await webcrypto.subtle.generateKey(
      {
        name: ALG,
        modulusLength: size2,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: { name: HASH_ALG }
      },
      extractable,
      ["sign", "verify"]
    );
    const spki = await webcrypto.subtle.exportKey("spki", publicKey);
    const publicBytes = tagWith(verifierCode, decode24(new Uint8Array(spki)));
    const verifier = new RSAVerifier({ bytes: publicBytes, publicKey });
    if (!extractable) {
      return new UnextractableRSASigner({
        privateKey,
        verifier
      });
    } else {
      const pkcs8 = await webcrypto.subtle.exportKey("pkcs8", privateKey);
      const bytes2 = tagWith(code7, decode25(new Uint8Array(pkcs8)));
      return new ExtractableRSASigner({
        privateKey,
        bytes: bytes2,
        verifier
      });
    }
  };
  var from10 = ({ id, keys }) => {
    if (id.startsWith("did:key:")) {
      const did2 = (
        /** @type {API.DIDKey} */
        id
      );
      const key = keys[did2];
      if (key instanceof Uint8Array) {
        return decode27(key);
      } else {
        return new UnextractableRSASigner({
          privateKey: key,
          verifier: RSAVerifier.parse(did2)
        });
      }
    } else {
      throw new TypeError(
        `RSA can not import from ${id} archive, try generic Signer instead`
      );
    }
  };
  var or8 = (other) => or6({ from: from10 }, other);
  var decode27 = (bytes2) => {
    const rsa = decode26(untagWith(code7, bytes2));
    const publicBytes = tagWith(verifierCode, encode20(rsa));
    return new ExtractableRSASigner({
      bytes: bytes2,
      privateKey: webcrypto.subtle.importKey(
        "pkcs8",
        encode19(untagWith(code7, bytes2)),
        IMPORT_PARAMS,
        true,
        ["sign"]
      ),
      verifier: RSAVerifier.decode(publicBytes)
    });
  };
  var RSAVerifier = class _RSAVerifier {
    /**
     * @param {object} options
     * @param {API.Await<CryptoKey>} options.publicKey
     * @param {API.ByteView<API.RSAVerifier>} options.bytes
     */
    constructor({ publicKey, bytes: bytes2 }) {
      this.publicKey = publicKey;
      this.bytes = bytes2;
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     * @returns {API.Verifier<ID, typeof signatureCode>}
     */
    withDID(id) {
      return withDID(this, id);
    }
    toDIDKey() {
      return this.did();
    }
    /**
     * @param {API.ByteView<API.RSAVerifier>} bytes
     * @returns {API.RSAVerifier}
     */
    static decode(bytes2) {
      return new this({
        bytes: bytes2,
        publicKey: webcrypto.subtle.importKey(
          "spki",
          encode18(untagWith(verifierCode, bytes2)),
          IMPORT_PARAMS,
          true,
          ["verify"]
        )
      });
    }
    /**
     * @param {API.DIDKey} did
     * @returns {API.RSAVerifier}
     */
    static parse(did2) {
      return _RSAVerifier.decode(
        /** @type {Uint8Array} */
        parse2(did2)
      );
    }
    /**
     * @param {API.PrincipalParser} other
     */
    static or(other) {
      return or4(this, other);
    }
    /** @type {typeof verifierCode} */
    get code() {
      return verifierCode;
    }
    /**
     * @type {typeof signatureCode}
     */
    get signatureCode() {
      return signatureCode2;
    }
    /**
     * @type {typeof signatureAlgorithm}
     */
    get signatureAlgorithm() {
      return signatureAlgorithm3;
    }
    /**
     * DID of the Principal in `did:key` format.
     * @returns {API.DID<"key">}
     */
    did() {
      return `did:key:${base58btc2.encode(this.bytes)}`;
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @param {API.Signature<T, typeof this.signatureCode>} signature
     * @returns {Promise<boolean>}
     */
    async verify(payload, signature) {
      if (signature.code !== signatureCode2) {
        return false;
      }
      return webcrypto.subtle.verify(
        { name: ALG, hash: { name: HASH_ALG } },
        await this.publicKey,
        signature.raw,
        payload
      );
    }
  };
  var RSASigner = class {
    /**
     * @param {object} options
     * @param {API.Await<CryptoKey>} options.privateKey
     * @param {API.RSAVerifier} options.verifier
     */
    constructor({ privateKey, verifier }) {
      this.verifier = verifier;
      this.privateKey = privateKey;
    }
    get signer() {
      return this;
    }
    /**
     * @type {typeof code}
     */
    get code() {
      return code7;
    }
    /**
     * @type {typeof signatureCode}
     */
    get signatureCode() {
      return signatureCode2;
    }
    /**
     * @type {typeof signatureAlgorithm}
     */
    get signatureAlgorithm() {
      return signatureAlgorithm3;
    }
    did() {
      return this.verifier.did();
    }
    toDIDKey() {
      return this.verifier.toDIDKey();
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @param {API.Signature<T, typeof this.signatureCode>} signature
     */
    verify(payload, signature) {
      return this.verifier.verify(payload, signature);
    }
    /**
     * @template T
     * @param {API.ByteView<T>} payload
     * @returns {Promise<API.SignatureView<T, typeof signatureCode>>}
     */
    async sign(payload) {
      const buffer2 = await webcrypto.subtle.sign(
        { name: ALG, saltLength: SALT_LENGTH },
        await this.privateKey,
        payload
      );
      return create4(signatureCode2, new Uint8Array(buffer2));
    }
  };
  var ExtractableRSASigner = class extends RSASigner {
    /**
     * @param {object} options
     * @param {API.Await<CryptoKey>} options.privateKey
     * @param {EncodedSigner} options.bytes
     * @param {API.RSAVerifier} options.verifier
     */
    constructor(options) {
      super(options);
      this.bytes = options.bytes;
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     * @returns {API.Signer<ID, typeof signatureCode>}
     */
    withDID(id) {
      return withDID2(this, id);
    }
    toArchive() {
      const id = this.did();
      return {
        id,
        keys: { [id]: this.bytes }
      };
    }
  };
  var UnextractableRSASigner = class extends RSASigner {
    /**
     * @param {object} options
     * @param {CryptoKey} options.privateKey
     * @param {API.RSAVerifier} options.verifier
     */
    constructor(options) {
      super(options);
      this.privateKey = options.privateKey;
    }
    /**
     * @template {API.DID} ID
     * @param {ID} id
     * @returns {API.Signer<ID, typeof signatureCode>}
     */
    withDID(id) {
      return withDID2(this, id);
    }
    toArchive() {
      const id = this.did();
      return {
        id,
        keys: { [id]: this.privateKey }
      };
    }
  };

  // node_modules/.pnpm/@ucanto+principal@9.0.1/node_modules/@ucanto/principal/src/lib.js
  var Verifier = verifier_exports.or(RSAVerifier);
  var Signer = or7(rsa_exports);

  // src/lit-actions/validate-decrypt-invocation.js
  var decrypt = async () => {
    try {
      console.log("spaceDID: ", spaceDID);
      if (invocation.with !== spaceDID) {
        throw new Error("Space is incorrect!");
      }
      let response = {};
      console.log(accessControlConditions);
      const decryptedString = await Lit.Actions.decryptAndCombine({
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
        authSig: null,
        chain: "ethereum"
      });
      response.decryptedString = decryptedString;
      Lit.Actions.setResponse({ response: JSON.stringify(response) });
    } catch (error4) {
      Lit.Actions.setResponse({ response: error4.message });
    }
  };
  decrypt();
})();
/*! Bundled license information:

@noble/ed25519/lib/esm/index.js:
  (*! noble-ed25519 - MIT License (c) 2019 Paul Miller (paulmillr.com) *)
*/
