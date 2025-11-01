"use strict";
var proto = (() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
        while (index < arguments.length)
          params[offset++] = arguments[index++];
        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err) {
            if (pending) {
              pending = false;
              if (err)
                reject(err);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err) {
            if (pending) {
              pending = false;
              reject(err);
            }
          }
        });
      }
    }
  });

  // node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      var base64 = exports2;
      base64.length = function length(string) {
        var p = string.length;
        if (!p)
          return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }
  });

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    }
  });

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined") (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
        else (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
        if (typeof Float64Array !== "undefined") (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
        else (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports3;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e) {
        }
        return null;
      }
    }
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      var utf8 = exports2;
      utf8.length = function utf8_length(string) {
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i = 0, t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128)
            chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
          else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (
        /* istanbul ignore next */
        []
      );
      util.emptyObject = Object.freeze ? Object.freeze({}) : (
        /* istanbul ignore next */
        {}
      );
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = (function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e) {
          return null;
        }
      })();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = /* istanbul ignore next */
      util.global.dcodeIO && /* istanbul ignore next */
      util.global.dcodeIO.Long || /* istanbul ignore next */
      util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits.lo, bits.hi, unsigned);
        return bits.toNumber(Boolean(unsigned));
      };
      function merge(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
        return dst;
      }
      util.merge = merge;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge(this, properties);
        }
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: function get() {
              return name;
            },
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: function value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
        function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        };
      };
    }
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create();
      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp(
          (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
          value
        )).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits = LongBits.from(value);
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits.length(), bits);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits = LongBits.from(value);
        return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
          buf[pos + i] = val[i];
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        } : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    }
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      } : function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      };
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create();
      Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
      util.Array.prototype.slice;
      Reader.prototype.uint32 = /* @__PURE__ */ (function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      })();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
          bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          /* istanbul ignore next */
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      BufferReader._configure();
    }
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err, response) {
              if (err) {
                self2.emit("error", err, method);
                return callback(err);
              }
              if (response === null) {
                self2.end(
                  /* endedByRPC */
                  true
                );
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err2) {
                  self2.emit("error", err2, method);
                  return callback(err2);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err) {
          self2.emit("error", err, method);
          setTimeout(function() {
            callback(err);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure();
    }
  });

  // node_modules/protobufjs/minimal.js
  var require_minimal2 = __commonJS({
    "node_modules/protobufjs/minimal.js"(exports2, module2) {
      "use strict";
      module2.exports = require_index_minimal();
    }
  });

  // out/js/turtlpass_pb.cjs.js
  var require_turtlpass_pb_cjs = __commonJS({
    "out/js/turtlpass_pb.cjs.js"(exports2, module2) {
      var $protobuf = require_minimal2();
      var $Reader = $protobuf.Reader;
      var $Writer = $protobuf.Writer;
      var $util = $protobuf.util;
      var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
      $root.turtlpass = (function() {
        var turtlpass = {};
        turtlpass.CommandType = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "UNKNOWN"] = 0;
          values[valuesById[1] = "GET_DEVICE_INFO"] = 1;
          values[valuesById[2] = "INITIALIZE_SEED"] = 2;
          values[valuesById[3] = "GENERATE_PASSWORD"] = 3;
          values[valuesById[4] = "FACTORY_RESET"] = 4;
          return values;
        })();
        turtlpass.Charset = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "LETTERS_ONLY"] = 0;
          values[valuesById[1] = "NUMBERS_ONLY"] = 1;
          values[valuesById[2] = "LETTERS_NUMBERS"] = 2;
          values[valuesById[3] = "LETTERS_NUMBERS_SYMBOLS"] = 3;
          return values;
        })();
        turtlpass.ErrorCode = (function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "NONE"] = 0;
          values[valuesById[1] = "INVALID_COMMAND"] = 1;
          values[valuesById[2] = "INVALID_PARAMS"] = 2;
          values[valuesById[3] = "INVALID_ENTROPY_LENGTH"] = 3;
          values[valuesById[4] = "INVALID_PASSWORD_LENGTH"] = 4;
          values[valuesById[5] = "INVALID_SEED_LENGTH"] = 5;
          values[valuesById[6] = "SEED_NOT_INITIALIZED"] = 6;
          values[valuesById[7] = "PASSWORD_FAILED"] = 7;
          values[valuesById[8] = "PROTO_DECODING_FAILED"] = 8;
          values[valuesById[9] = "PROTO_ENCODING_FAILED"] = 9;
          values[valuesById[10] = "INTERNAL_ERROR"] = 10;
          return values;
        })();
        turtlpass.GeneratePasswordParams = (function() {
          function GeneratePasswordParams(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          GeneratePasswordParams.prototype.entropy = $util.newBuffer([]);
          GeneratePasswordParams.prototype.length = 0;
          GeneratePasswordParams.prototype.charset = 0;
          GeneratePasswordParams.create = function create(properties) {
            return new GeneratePasswordParams(properties);
          };
          GeneratePasswordParams.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.entropy != null && Object.hasOwnProperty.call(message, "entropy"))
              writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).bytes(message.entropy);
            if (message.length != null && Object.hasOwnProperty.call(message, "length"))
              writer.uint32(
                /* id 2, wireType 0 =*/
                16
              ).uint32(message.length);
            if (message.charset != null && Object.hasOwnProperty.call(message, "charset"))
              writer.uint32(
                /* id 3, wireType 0 =*/
                24
              ).int32(message.charset);
            return writer;
          };
          GeneratePasswordParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          GeneratePasswordParams.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.turtlpass.GeneratePasswordParams();
            while (reader.pos < end) {
              var tag = reader.uint32();
              if (tag === error)
                break;
              switch (tag >>> 3) {
                case 1: {
                  message.entropy = reader.bytes();
                  break;
                }
                case 2: {
                  message.length = reader.uint32();
                  break;
                }
                case 3: {
                  message.charset = reader.int32();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          GeneratePasswordParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          GeneratePasswordParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.entropy != null && message.hasOwnProperty("entropy")) {
              if (!(message.entropy && typeof message.entropy.length === "number" || $util.isString(message.entropy)))
                return "entropy: buffer expected";
            }
            if (message.length != null && message.hasOwnProperty("length")) {
              if (!$util.isInteger(message.length))
                return "length: integer expected";
            }
            if (message.charset != null && message.hasOwnProperty("charset"))
              switch (message.charset) {
                default:
                  return "charset: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                  break;
              }
            return null;
          };
          GeneratePasswordParams.fromObject = function fromObject(object) {
            if (object instanceof $root.turtlpass.GeneratePasswordParams)
              return object;
            var message = new $root.turtlpass.GeneratePasswordParams();
            if (object.entropy != null) {
              if (typeof object.entropy === "string")
                $util.base64.decode(object.entropy, message.entropy = $util.newBuffer($util.base64.length(object.entropy)), 0);
              else if (object.entropy.length >= 0)
                message.entropy = object.entropy;
            }
            if (object.length != null)
              message.length = object.length >>> 0;
            switch (object.charset) {
              default:
                if (typeof object.charset === "number") {
                  message.charset = object.charset;
                  break;
                }
                break;
              case "LETTERS_ONLY":
              case 0:
                message.charset = 0;
                break;
              case "NUMBERS_ONLY":
              case 1:
                message.charset = 1;
                break;
              case "LETTERS_NUMBERS":
              case 2:
                message.charset = 2;
                break;
              case "LETTERS_NUMBERS_SYMBOLS":
              case 3:
                message.charset = 3;
                break;
            }
            return message;
          };
          GeneratePasswordParams.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              if (options.bytes === String)
                object.entropy = "";
              else {
                object.entropy = [];
                if (options.bytes !== Array)
                  object.entropy = $util.newBuffer(object.entropy);
              }
              object.length = 0;
              object.charset = options.enums === String ? "LETTERS_ONLY" : 0;
            }
            if (message.entropy != null && message.hasOwnProperty("entropy"))
              object.entropy = options.bytes === String ? $util.base64.encode(message.entropy, 0, message.entropy.length) : options.bytes === Array ? Array.prototype.slice.call(message.entropy) : message.entropy;
            if (message.length != null && message.hasOwnProperty("length"))
              object.length = message.length;
            if (message.charset != null && message.hasOwnProperty("charset"))
              object.charset = options.enums === String ? $root.turtlpass.Charset[message.charset] === void 0 ? message.charset : $root.turtlpass.Charset[message.charset] : message.charset;
            return object;
          };
          GeneratePasswordParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          GeneratePasswordParams.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === void 0) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/turtlpass.GeneratePasswordParams";
          };
          return GeneratePasswordParams;
        })();
        turtlpass.InitializeSeedParams = (function() {
          function InitializeSeedParams(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          InitializeSeedParams.prototype.seed = $util.newBuffer([]);
          InitializeSeedParams.create = function create(properties) {
            return new InitializeSeedParams(properties);
          };
          InitializeSeedParams.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.seed != null && Object.hasOwnProperty.call(message, "seed"))
              writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).bytes(message.seed);
            return writer;
          };
          InitializeSeedParams.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          InitializeSeedParams.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.turtlpass.InitializeSeedParams();
            while (reader.pos < end) {
              var tag = reader.uint32();
              if (tag === error)
                break;
              switch (tag >>> 3) {
                case 1: {
                  message.seed = reader.bytes();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          InitializeSeedParams.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          InitializeSeedParams.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.seed != null && message.hasOwnProperty("seed")) {
              if (!(message.seed && typeof message.seed.length === "number" || $util.isString(message.seed)))
                return "seed: buffer expected";
            }
            return null;
          };
          InitializeSeedParams.fromObject = function fromObject(object) {
            if (object instanceof $root.turtlpass.InitializeSeedParams)
              return object;
            var message = new $root.turtlpass.InitializeSeedParams();
            if (object.seed != null) {
              if (typeof object.seed === "string")
                $util.base64.decode(object.seed, message.seed = $util.newBuffer($util.base64.length(object.seed)), 0);
              else if (object.seed.length >= 0)
                message.seed = object.seed;
            }
            return message;
          };
          InitializeSeedParams.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults)
              if (options.bytes === String)
                object.seed = "";
              else {
                object.seed = [];
                if (options.bytes !== Array)
                  object.seed = $util.newBuffer(object.seed);
              }
            if (message.seed != null && message.hasOwnProperty("seed"))
              object.seed = options.bytes === String ? $util.base64.encode(message.seed, 0, message.seed.length) : options.bytes === Array ? Array.prototype.slice.call(message.seed) : message.seed;
            return object;
          };
          InitializeSeedParams.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          InitializeSeedParams.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === void 0) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/turtlpass.InitializeSeedParams";
          };
          return InitializeSeedParams;
        })();
        turtlpass.DeviceInfo = (function() {
          function DeviceInfo(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          DeviceInfo.prototype.turtlpassVersion = "";
          DeviceInfo.prototype.arduinoVersion = "";
          DeviceInfo.prototype.compilerVersion = "";
          DeviceInfo.prototype.nanopbVersion = "";
          DeviceInfo.prototype.boardName = "";
          DeviceInfo.prototype.uniqueBoardId = $util.newBuffer([]);
          DeviceInfo.create = function create(properties) {
            return new DeviceInfo(properties);
          };
          DeviceInfo.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.turtlpassVersion != null && Object.hasOwnProperty.call(message, "turtlpassVersion"))
              writer.uint32(
                /* id 1, wireType 2 =*/
                10
              ).string(message.turtlpassVersion);
            if (message.arduinoVersion != null && Object.hasOwnProperty.call(message, "arduinoVersion"))
              writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).string(message.arduinoVersion);
            if (message.compilerVersion != null && Object.hasOwnProperty.call(message, "compilerVersion"))
              writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).string(message.compilerVersion);
            if (message.nanopbVersion != null && Object.hasOwnProperty.call(message, "nanopbVersion"))
              writer.uint32(
                /* id 4, wireType 2 =*/
                34
              ).string(message.nanopbVersion);
            if (message.boardName != null && Object.hasOwnProperty.call(message, "boardName"))
              writer.uint32(
                /* id 5, wireType 2 =*/
                42
              ).string(message.boardName);
            if (message.uniqueBoardId != null && Object.hasOwnProperty.call(message, "uniqueBoardId"))
              writer.uint32(
                /* id 6, wireType 2 =*/
                50
              ).bytes(message.uniqueBoardId);
            return writer;
          };
          DeviceInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          DeviceInfo.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.turtlpass.DeviceInfo();
            while (reader.pos < end) {
              var tag = reader.uint32();
              if (tag === error)
                break;
              switch (tag >>> 3) {
                case 1: {
                  message.turtlpassVersion = reader.string();
                  break;
                }
                case 2: {
                  message.arduinoVersion = reader.string();
                  break;
                }
                case 3: {
                  message.compilerVersion = reader.string();
                  break;
                }
                case 4: {
                  message.nanopbVersion = reader.string();
                  break;
                }
                case 5: {
                  message.boardName = reader.string();
                  break;
                }
                case 6: {
                  message.uniqueBoardId = reader.bytes();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          DeviceInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          DeviceInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.turtlpassVersion != null && message.hasOwnProperty("turtlpassVersion")) {
              if (!$util.isString(message.turtlpassVersion))
                return "turtlpassVersion: string expected";
            }
            if (message.arduinoVersion != null && message.hasOwnProperty("arduinoVersion")) {
              if (!$util.isString(message.arduinoVersion))
                return "arduinoVersion: string expected";
            }
            if (message.compilerVersion != null && message.hasOwnProperty("compilerVersion")) {
              if (!$util.isString(message.compilerVersion))
                return "compilerVersion: string expected";
            }
            if (message.nanopbVersion != null && message.hasOwnProperty("nanopbVersion")) {
              if (!$util.isString(message.nanopbVersion))
                return "nanopbVersion: string expected";
            }
            if (message.boardName != null && message.hasOwnProperty("boardName")) {
              if (!$util.isString(message.boardName))
                return "boardName: string expected";
            }
            if (message.uniqueBoardId != null && message.hasOwnProperty("uniqueBoardId")) {
              if (!(message.uniqueBoardId && typeof message.uniqueBoardId.length === "number" || $util.isString(message.uniqueBoardId)))
                return "uniqueBoardId: buffer expected";
            }
            return null;
          };
          DeviceInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.turtlpass.DeviceInfo)
              return object;
            var message = new $root.turtlpass.DeviceInfo();
            if (object.turtlpassVersion != null)
              message.turtlpassVersion = String(object.turtlpassVersion);
            if (object.arduinoVersion != null)
              message.arduinoVersion = String(object.arduinoVersion);
            if (object.compilerVersion != null)
              message.compilerVersion = String(object.compilerVersion);
            if (object.nanopbVersion != null)
              message.nanopbVersion = String(object.nanopbVersion);
            if (object.boardName != null)
              message.boardName = String(object.boardName);
            if (object.uniqueBoardId != null) {
              if (typeof object.uniqueBoardId === "string")
                $util.base64.decode(object.uniqueBoardId, message.uniqueBoardId = $util.newBuffer($util.base64.length(object.uniqueBoardId)), 0);
              else if (object.uniqueBoardId.length >= 0)
                message.uniqueBoardId = object.uniqueBoardId;
            }
            return message;
          };
          DeviceInfo.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.turtlpassVersion = "";
              object.arduinoVersion = "";
              object.compilerVersion = "";
              object.nanopbVersion = "";
              object.boardName = "";
              if (options.bytes === String)
                object.uniqueBoardId = "";
              else {
                object.uniqueBoardId = [];
                if (options.bytes !== Array)
                  object.uniqueBoardId = $util.newBuffer(object.uniqueBoardId);
              }
            }
            if (message.turtlpassVersion != null && message.hasOwnProperty("turtlpassVersion"))
              object.turtlpassVersion = message.turtlpassVersion;
            if (message.arduinoVersion != null && message.hasOwnProperty("arduinoVersion"))
              object.arduinoVersion = message.arduinoVersion;
            if (message.compilerVersion != null && message.hasOwnProperty("compilerVersion"))
              object.compilerVersion = message.compilerVersion;
            if (message.nanopbVersion != null && message.hasOwnProperty("nanopbVersion"))
              object.nanopbVersion = message.nanopbVersion;
            if (message.boardName != null && message.hasOwnProperty("boardName"))
              object.boardName = message.boardName;
            if (message.uniqueBoardId != null && message.hasOwnProperty("uniqueBoardId"))
              object.uniqueBoardId = options.bytes === String ? $util.base64.encode(message.uniqueBoardId, 0, message.uniqueBoardId.length) : options.bytes === Array ? Array.prototype.slice.call(message.uniqueBoardId) : message.uniqueBoardId;
            return object;
          };
          DeviceInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          DeviceInfo.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === void 0) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/turtlpass.DeviceInfo";
          };
          return DeviceInfo;
        })();
        turtlpass.Command = (function() {
          function Command(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          Command.prototype.type = 0;
          Command.prototype.genPass = null;
          Command.prototype.initSeed = null;
          var $oneOfFields;
          Object.defineProperty(Command.prototype, "parameters", {
            get: $util.oneOfGetter($oneOfFields = ["genPass", "initSeed"]),
            set: $util.oneOfSetter($oneOfFields)
          });
          Command.create = function create(properties) {
            return new Command(properties);
          };
          Command.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
              writer.uint32(
                /* id 1, wireType 0 =*/
                8
              ).int32(message.type);
            if (message.genPass != null && Object.hasOwnProperty.call(message, "genPass"))
              $root.turtlpass.GeneratePasswordParams.encode(message.genPass, writer.uint32(
                /* id 2, wireType 2 =*/
                18
              ).fork()).ldelim();
            if (message.initSeed != null && Object.hasOwnProperty.call(message, "initSeed"))
              $root.turtlpass.InitializeSeedParams.encode(message.initSeed, writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).fork()).ldelim();
            return writer;
          };
          Command.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          Command.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.turtlpass.Command();
            while (reader.pos < end) {
              var tag = reader.uint32();
              if (tag === error)
                break;
              switch (tag >>> 3) {
                case 1: {
                  message.type = reader.int32();
                  break;
                }
                case 2: {
                  message.genPass = $root.turtlpass.GeneratePasswordParams.decode(reader, reader.uint32());
                  break;
                }
                case 3: {
                  message.initSeed = $root.turtlpass.InitializeSeedParams.decode(reader, reader.uint32());
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          Command.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          Command.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            var properties = {};
            if (message.type != null && message.hasOwnProperty("type"))
              switch (message.type) {
                default:
                  return "type: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                  break;
              }
            if (message.genPass != null && message.hasOwnProperty("genPass")) {
              properties.parameters = 1;
              {
                var error = $root.turtlpass.GeneratePasswordParams.verify(message.genPass);
                if (error)
                  return "genPass." + error;
              }
            }
            if (message.initSeed != null && message.hasOwnProperty("initSeed")) {
              if (properties.parameters === 1)
                return "parameters: multiple values";
              properties.parameters = 1;
              {
                var error = $root.turtlpass.InitializeSeedParams.verify(message.initSeed);
                if (error)
                  return "initSeed." + error;
              }
            }
            return null;
          };
          Command.fromObject = function fromObject(object) {
            if (object instanceof $root.turtlpass.Command)
              return object;
            var message = new $root.turtlpass.Command();
            switch (object.type) {
              default:
                if (typeof object.type === "number") {
                  message.type = object.type;
                  break;
                }
                break;
              case "UNKNOWN":
              case 0:
                message.type = 0;
                break;
              case "GET_DEVICE_INFO":
              case 1:
                message.type = 1;
                break;
              case "INITIALIZE_SEED":
              case 2:
                message.type = 2;
                break;
              case "GENERATE_PASSWORD":
              case 3:
                message.type = 3;
                break;
              case "FACTORY_RESET":
              case 4:
                message.type = 4;
                break;
            }
            if (object.genPass != null) {
              if (typeof object.genPass !== "object")
                throw TypeError(".turtlpass.Command.genPass: object expected");
              message.genPass = $root.turtlpass.GeneratePasswordParams.fromObject(object.genPass);
            }
            if (object.initSeed != null) {
              if (typeof object.initSeed !== "object")
                throw TypeError(".turtlpass.Command.initSeed: object expected");
              message.initSeed = $root.turtlpass.InitializeSeedParams.fromObject(object.initSeed);
            }
            return message;
          };
          Command.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults)
              object.type = options.enums === String ? "UNKNOWN" : 0;
            if (message.type != null && message.hasOwnProperty("type"))
              object.type = options.enums === String ? $root.turtlpass.CommandType[message.type] === void 0 ? message.type : $root.turtlpass.CommandType[message.type] : message.type;
            if (message.genPass != null && message.hasOwnProperty("genPass")) {
              object.genPass = $root.turtlpass.GeneratePasswordParams.toObject(message.genPass, options);
              if (options.oneofs)
                object.parameters = "genPass";
            }
            if (message.initSeed != null && message.hasOwnProperty("initSeed")) {
              object.initSeed = $root.turtlpass.InitializeSeedParams.toObject(message.initSeed, options);
              if (options.oneofs)
                object.parameters = "initSeed";
            }
            return object;
          };
          Command.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          Command.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === void 0) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/turtlpass.Command";
          };
          return Command;
        })();
        turtlpass.Response = (function() {
          function Response(properties) {
            if (properties) {
              for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                if (properties[keys[i]] != null)
                  this[keys[i]] = properties[keys[i]];
            }
          }
          Response.prototype.success = false;
          Response.prototype.error = 0;
          Response.prototype.deviceInfo = null;
          Response.prototype.data = $util.newBuffer([]);
          Response.create = function create(properties) {
            return new Response(properties);
          };
          Response.encode = function encode(message, writer) {
            if (!writer)
              writer = $Writer.create();
            if (message.success != null && Object.hasOwnProperty.call(message, "success"))
              writer.uint32(
                /* id 1, wireType 0 =*/
                8
              ).bool(message.success);
            if (message.error != null && Object.hasOwnProperty.call(message, "error"))
              writer.uint32(
                /* id 2, wireType 0 =*/
                16
              ).int32(message.error);
            if (message.deviceInfo != null && Object.hasOwnProperty.call(message, "deviceInfo"))
              $root.turtlpass.DeviceInfo.encode(message.deviceInfo, writer.uint32(
                /* id 3, wireType 2 =*/
                26
              ).fork()).ldelim();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
              writer.uint32(
                /* id 4, wireType 2 =*/
                34
              ).bytes(message.data);
            return writer;
          };
          Response.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
          };
          Response.decode = function decode(reader, length, error) {
            if (!(reader instanceof $Reader))
              reader = $Reader.create(reader);
            var end = length === void 0 ? reader.len : reader.pos + length, message = new $root.turtlpass.Response();
            while (reader.pos < end) {
              var tag = reader.uint32();
              if (tag === error)
                break;
              switch (tag >>> 3) {
                case 1: {
                  message.success = reader.bool();
                  break;
                }
                case 2: {
                  message.error = reader.int32();
                  break;
                }
                case 3: {
                  message.deviceInfo = $root.turtlpass.DeviceInfo.decode(reader, reader.uint32());
                  break;
                }
                case 4: {
                  message.data = reader.bytes();
                  break;
                }
                default:
                  reader.skipType(tag & 7);
                  break;
              }
            }
            return message;
          };
          Response.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
              reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
          };
          Response.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
              return "object expected";
            if (message.success != null && message.hasOwnProperty("success")) {
              if (typeof message.success !== "boolean")
                return "success: boolean expected";
            }
            if (message.error != null && message.hasOwnProperty("error"))
              switch (message.error) {
                default:
                  return "error: enum value expected";
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                case 10:
                  break;
              }
            if (message.deviceInfo != null && message.hasOwnProperty("deviceInfo")) {
              var error = $root.turtlpass.DeviceInfo.verify(message.deviceInfo);
              if (error)
                return "deviceInfo." + error;
            }
            if (message.data != null && message.hasOwnProperty("data")) {
              if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                return "data: buffer expected";
            }
            return null;
          };
          Response.fromObject = function fromObject(object) {
            if (object instanceof $root.turtlpass.Response)
              return object;
            var message = new $root.turtlpass.Response();
            if (object.success != null)
              message.success = Boolean(object.success);
            switch (object.error) {
              default:
                if (typeof object.error === "number") {
                  message.error = object.error;
                  break;
                }
                break;
              case "NONE":
              case 0:
                message.error = 0;
                break;
              case "INVALID_COMMAND":
              case 1:
                message.error = 1;
                break;
              case "INVALID_PARAMS":
              case 2:
                message.error = 2;
                break;
              case "INVALID_ENTROPY_LENGTH":
              case 3:
                message.error = 3;
                break;
              case "INVALID_PASSWORD_LENGTH":
              case 4:
                message.error = 4;
                break;
              case "INVALID_SEED_LENGTH":
              case 5:
                message.error = 5;
                break;
              case "SEED_NOT_INITIALIZED":
              case 6:
                message.error = 6;
                break;
              case "PASSWORD_FAILED":
              case 7:
                message.error = 7;
                break;
              case "PROTO_DECODING_FAILED":
              case 8:
                message.error = 8;
                break;
              case "PROTO_ENCODING_FAILED":
              case 9:
                message.error = 9;
                break;
              case "INTERNAL_ERROR":
              case 10:
                message.error = 10;
                break;
            }
            if (object.deviceInfo != null) {
              if (typeof object.deviceInfo !== "object")
                throw TypeError(".turtlpass.Response.deviceInfo: object expected");
              message.deviceInfo = $root.turtlpass.DeviceInfo.fromObject(object.deviceInfo);
            }
            if (object.data != null) {
              if (typeof object.data === "string")
                $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
              else if (object.data.length >= 0)
                message.data = object.data;
            }
            return message;
          };
          Response.toObject = function toObject(message, options) {
            if (!options)
              options = {};
            var object = {};
            if (options.defaults) {
              object.success = false;
              object.error = options.enums === String ? "NONE" : 0;
              object.deviceInfo = null;
              if (options.bytes === String)
                object.data = "";
              else {
                object.data = [];
                if (options.bytes !== Array)
                  object.data = $util.newBuffer(object.data);
              }
            }
            if (message.success != null && message.hasOwnProperty("success"))
              object.success = message.success;
            if (message.error != null && message.hasOwnProperty("error"))
              object.error = options.enums === String ? $root.turtlpass.ErrorCode[message.error] === void 0 ? message.error : $root.turtlpass.ErrorCode[message.error] : message.error;
            if (message.deviceInfo != null && message.hasOwnProperty("deviceInfo"))
              object.deviceInfo = $root.turtlpass.DeviceInfo.toObject(message.deviceInfo, options);
            if (message.data != null && message.hasOwnProperty("data"))
              object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
            return object;
          };
          Response.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
          };
          Response.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === void 0) {
              typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/turtlpass.Response";
          };
          return Response;
        })();
        return turtlpass;
      })();
      module2.exports = $root;
    }
  });
  return require_turtlpass_pb_cjs();
})();
