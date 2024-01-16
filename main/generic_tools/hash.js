// https://deno.land/x/base64@v0.2.1/base.ts
function getLengths(b64) {
  const len = b64.length;
  let validLen = b64.indexOf("=");
  if (validLen === -1) {
    validLen = len;
  }
  const placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function init(lookup3, revLookup3, urlsafe = false) {
  function _byteLength(validLen, placeHoldersLen) {
    return Math.floor((validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen);
  }
  function tripletToBase64(num) {
    return lookup3[num >> 18 & 63] + lookup3[num >> 12 & 63] + lookup3[num >> 6 & 63] + lookup3[num & 63];
  }
  function encodeChunk(buf, start, end) {
    const out = new Array((end - start) / 3);
    for (let i = start, curTriplet = 0; i < end; i += 3) {
      out[curTriplet++] = tripletToBase64(
        (buf[i] << 16) + (buf[i + 1] << 8) + buf[i + 2]
      );
    }
    return out.join("");
  }
  return {
    // base64 is 4/3 + up to two characters of the original data
    byteLength(b64) {
      return _byteLength.apply(null, getLengths(b64));
    },
    toUint8Array(b64) {
      const [validLen, placeHoldersLen] = getLengths(b64);
      const buf = new Uint8Array(_byteLength(validLen, placeHoldersLen));
      const len = placeHoldersLen ? validLen - 4 : validLen;
      let tmp;
      let curByte = 0;
      let i;
      for (i = 0; i < len; i += 4) {
        tmp = revLookup3[b64.charCodeAt(i)] << 18 | revLookup3[b64.charCodeAt(i + 1)] << 12 | revLookup3[b64.charCodeAt(i + 2)] << 6 | revLookup3[b64.charCodeAt(i + 3)];
        buf[curByte++] = tmp >> 16 & 255;
        buf[curByte++] = tmp >> 8 & 255;
        buf[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup3[b64.charCodeAt(i)] << 2 | revLookup3[b64.charCodeAt(i + 1)] >> 4;
        buf[curByte++] = tmp & 255;
      } else if (placeHoldersLen === 1) {
        tmp = revLookup3[b64.charCodeAt(i)] << 10 | revLookup3[b64.charCodeAt(i + 1)] << 4 | revLookup3[b64.charCodeAt(i + 2)] >> 2;
        buf[curByte++] = tmp >> 8 & 255;
        buf[curByte++] = tmp & 255;
      }
      return buf;
    },
    fromUint8Array(buf) {
      const maxChunkLength = 16383;
      const len = buf.length;
      const extraBytes = len % 3;
      const len2 = len - extraBytes;
      const parts = new Array(
        Math.ceil(len2 / maxChunkLength) + (extraBytes ? 1 : 0)
      );
      let curChunk = 0;
      let chunkEnd;
      for (let i = 0; i < len2; i += maxChunkLength) {
        chunkEnd = i + maxChunkLength;
        parts[curChunk++] = encodeChunk(
          buf,
          i,
          chunkEnd > len2 ? len2 : chunkEnd
        );
      }
      let tmp;
      if (extraBytes === 1) {
        tmp = buf[len2];
        parts[curChunk] = lookup3[tmp >> 2] + lookup3[tmp << 4 & 63];
        if (!urlsafe)
          parts[curChunk] += "==";
      } else if (extraBytes === 2) {
        tmp = buf[len2] << 8 | buf[len2 + 1] & 255;
        parts[curChunk] = lookup3[tmp >> 10] + lookup3[tmp >> 4 & 63] + lookup3[tmp << 2 & 63];
        if (!urlsafe)
          parts[curChunk] += "=";
      }
      return parts.join("");
    }
  };
}

// https://deno.land/x/base64@v0.2.1/mod.ts
var lookup = [];
var revLookup = [];
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (let i = 0, l = code.length; i < l; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
var { byteLength, toUint8Array, fromUint8Array } = init(
  lookup,
  revLookup
);

// https://deno.land/x/base64@v0.2.1/base64url.ts
var lookup2 = [];
var revLookup2 = [];
var code2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
for (let i = 0, l = code2.length; i < l; ++i) {
  lookup2[i] = code2[i];
  revLookup2[code2.charCodeAt(i)] = i;
}
var { byteLength: byteLength2, toUint8Array: toUint8Array2, fromUint8Array: fromUint8Array2 } = init(
  lookup2,
  revLookup2,
  true
);

// https://denopkg.com/chiefbiiko/std-encoding@master/mod.ts
var decoder = new TextDecoder();
var encoder = new TextEncoder();
function toHexString(buf) {
  return buf.reduce(
    (hex, byte) => `${hex}${byte < 16 ? "0" : ""}${byte.toString(16)}`,
    ""
  );
}
function fromHexString(hex) {
  const len = hex.length;
  if (len % 2 || !/^[0-9a-fA-F]+$/.test(hex)) {
    throw new TypeError("Invalid hex string.");
  }
  hex = hex.toLowerCase();
  const buf = new Uint8Array(Math.floor(len / 2));
  const end = len / 2;
  for (let i = 0; i < end; ++i) {
    buf[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return buf;
}
function decode(buf, encoding = "utf8") {
  if (/^utf-?8$/i.test(encoding)) {
    return decoder.decode(buf);
  } else if (/^base64$/i.test(encoding)) {
    return fromUint8Array(buf);
  } else if (/^base64url$/i.test(encoding)) {
    return fromUint8Array2(buf);
  } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
    return toHexString(buf);
  } else {
    throw new TypeError("Unsupported string encoding.");
  }
}
function encode(str, encoding = "utf8") {
  if (/^utf-?8$/i.test(encoding)) {
    return encoder.encode(str);
  } else if (/^base64(?:url)?$/i.test(encoding)) {
    return toUint8Array(str);
  } else if (/^hex(?:adecimal)?$/i.test(encoding)) {
    return fromHexString(str);
  } else {
    throw new TypeError("Unsupported string encoding.");
  }
}

// https://denopkg.com/chiefbiiko/sha256@v1.0.0/mod.ts
var BYTES = 32;
var SHA256 = class {
  hashSize = BYTES;
  _buf;
  _bufIdx;
  _count;
  _K;
  _H;
  _finalized;
  /** Creates a SHA256 instance. */
  constructor() {
    this._buf = new Uint8Array(64);
    this._K = new Uint32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    this.init();
  }
  /** Initializes a hash. */
  init() {
    this._H = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    this._bufIdx = 0;
    this._count = new Uint32Array(2);
    this._buf.fill(0);
    this._finalized = false;
    return this;
  }
  /** Updates the hash with additional message data. */
  update(msg, inputEncoding) {
    if (msg === null) {
      throw new TypeError("msg must be a string or Uint8Array.");
    } else if (typeof msg === "string") {
      msg = encode(msg, inputEncoding);
    }
    for (let i = 0, len = msg.length; i < len; i++) {
      this._buf[this._bufIdx++] = msg[i];
      if (this._bufIdx === 64) {
        this._transform();
        this._bufIdx = 0;
      }
    }
    const c = this._count;
    if ((c[0] += msg.length << 3) < msg.length << 3) {
      c[1]++;
    }
    c[1] += msg.length >>> 29;
    return this;
  }
  /** Finalizes the hash with additional message data. */
  digest(outputEncoding) {
    if (this._finalized) {
      throw new Error("digest has already been called.");
    }
    this._finalized = true;
    const b = this._buf;
    let idx = this._bufIdx;
    b[idx++] = 128;
    while (idx !== 56) {
      if (idx === 64) {
        this._transform();
        idx = 0;
      }
      b[idx++] = 0;
    }
    const c = this._count;
    b[56] = c[1] >>> 24 & 255;
    b[57] = c[1] >>> 16 & 255;
    b[58] = c[1] >>> 8 & 255;
    b[59] = c[1] >>> 0 & 255;
    b[60] = c[0] >>> 24 & 255;
    b[61] = c[0] >>> 16 & 255;
    b[62] = c[0] >>> 8 & 255;
    b[63] = c[0] >>> 0 & 255;
    this._transform();
    const hash2 = new Uint8Array(BYTES);
    for (let i = 0; i < 8; i++) {
      hash2[(i << 2) + 0] = this._H[i] >>> 24 & 255;
      hash2[(i << 2) + 1] = this._H[i] >>> 16 & 255;
      hash2[(i << 2) + 2] = this._H[i] >>> 8 & 255;
      hash2[(i << 2) + 3] = this._H[i] >>> 0 & 255;
    }
    this.init();
    return outputEncoding ? decode(hash2, outputEncoding) : hash2;
  }
  /** Performs one transformation cycle. */
  _transform() {
    const h = this._H;
    let h0 = h[0];
    let h1 = h[1];
    let h2 = h[2];
    let h3 = h[3];
    let h4 = h[4];
    let h5 = h[5];
    let h6 = h[6];
    let h7 = h[7];
    const w = new Uint32Array(16);
    let i;
    for (i = 0; i < 16; i++) {
      w[i] = this._buf[(i << 2) + 3] | this._buf[(i << 2) + 2] << 8 | this._buf[(i << 2) + 1] << 16 | this._buf[i << 2] << 24;
    }
    for (i = 0; i < 64; i++) {
      let tmp;
      if (i < 16) {
        tmp = w[i];
      } else {
        let a = w[i + 1 & 15];
        let b = w[i + 14 & 15];
        tmp = w[i & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i & 15] + w[i + 9 & 15] | 0;
      }
      tmp = tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + this._K[i] | 0;
      h7 = h6;
      h6 = h5;
      h5 = h4;
      h4 = h3 + tmp;
      h3 = h2;
      h2 = h1;
      h1 = h0;
      h0 = tmp + (h1 & h2 ^ h3 & (h1 ^ h2)) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10) | 0;
    }
    h[0] = h[0] + h0 | 0;
    h[1] = h[1] + h1 | 0;
    h[2] = h[2] + h2 | 0;
    h[3] = h[3] + h3 | 0;
    h[4] = h[4] + h4 | 0;
    h[5] = h[5] + h5 | 0;
    h[6] = h[6] + h6 | 0;
    h[7] = h[7] + h7 | 0;
  }
};
function sha256(msg, inputEncoding, outputEncoding) {
  return new SHA256().update(msg, inputEncoding).digest(outputEncoding);
}

// main/helpers/create_css_class.js
const hash = (value) => sha256(value, "utf-8", "hex");
export default hash