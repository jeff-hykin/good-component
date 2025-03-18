// https://deno.land/x/good@1.13.2.0/flattened/empty_generator_object.js
var emptyGeneratorObject = /* @__PURE__ */ function* () {
}();
emptyGeneratorObject.length = 0;

// https://deno.land/x/good@1.13.2.0/flattened/make_iterator.js
var makeIterator = (value) => {
  if (typeof value?.next == "function") {
    return value;
  } else if (value == null) {
    return emptyGeneratorObject;
  } else if (typeof value[Symbol.iterator] == "function") {
    const iterator = value[Symbol.iterator]();
    if (!Number.isFinite(iterator?.length)) {
      if (Number.isFinite(value?.length)) {
        iterator.length = value.length;
      } else if (Number.isFinite(value?.size)) {
        iterator.length = value.size;
      }
    }
    return iterator;
  } else if (typeof value[Symbol.asyncIterator] == "function") {
    const iterator = value[Symbol.asyncIterator]();
    if (!Number.isFinite(iterator?.length)) {
      if (Number.isFinite(value?.length)) {
        iterator.length = value.length;
      } else if (Number.isFinite(value?.size)) {
        iterator.length = value.size;
      }
    }
    return iterator;
  } else if (typeof value == "function") {
    return value();
  } else if (Object.getPrototypeOf(value).constructor == Object) {
    const entries = Object.entries(value);
    const output = entries[Symbol.iterator]();
    output.length = entries.length;
    return output;
  }
  return emptyGeneratorObject;
};

// https://deno.land/x/good@1.13.2.0/flattened/iter_zip_long_sync.js
var innerIterZipLongSync = function* (...iterables) {
  const iterators = iterables.map(makeIterator);
  while (true) {
    const nexts = iterators.map((each) => each.next());
    if (nexts.every((each) => each.done)) {
      break;
    }
    yield nexts.map((each) => each.value);
  }
};
var iterZipLongSync = function(...iterables) {
  const generatorObject = innerIterZipLongSync(...iterables);
  const finalLength = Math.max(...iterables.map((each) => typeof each != "function" && (typeof each?.length == "number" ? each?.length : each.size)));
  if (finalLength == finalLength) {
    generatorObject.length = finalLength;
  }
  return generatorObject;
};

// https://deno.land/x/good@1.13.2.0/flattened/indent.js
var indent = ({ string, by = "    ", noLead = false }) => (noLead ? "" : by) + string.replace(/\n/g, "\n" + by);

// https://deno.land/x/good@1.13.2.0/flattened/typed_array__class.js
var TypedArray = typeof globalThis?.Uint8Array != "function" ? class {
} : Object.getPrototypeOf(Uint8Array.prototype).constructor;

// https://deno.land/x/good@1.13.2.0/flattened/typed_array_classes.js
var typedArrayClasses = [
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Int32Array,
  Int8Array,
  Float32Array,
  Float64Array
];
if (globalThis.BigInt64Array) {
  typedArrayClasses.push(globalThis.BigInt64Array);
}
if (globalThis.BigUint64Array) {
  typedArrayClasses.push(globalThis.BigUint64Array);
}

// https://deno.land/x/good@1.13.2.0/flattened/all_keys.js
var allKeys = function(obj) {
  const listOfKeys = [];
  if (obj == null) {
    return [];
  }
  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }
  while (obj) {
    listOfKeys.push(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return [...new Set(listOfKeys.flat(1))];
};

// https://deno.land/x/good@1.13.2.0/flattened/is_valid_identifier.js
var regexIdentifier = /^(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D])(?:[\$0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])*$/;
var regexIdentifierES5 = /^(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|null|this|true|void|with|break|catch|class|const|false|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$)(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])(?:[\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])*$/;
var regexES6ReservedWord = /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|await|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/;
function isValidIdentifier(value) {
  if (typeof value != "string") {
    return false;
  }
  const tmp = value.replace(/\\u([a-fA-F0-9]{4})|\\u\{([0-9a-fA-F]{1,})\}/g, function($0, $1, $2) {
    var codePoint = parseInt($2 || $1, 16);
    if (codePoint >= 55296 && codePoint <= 57343) {
      return "\0";
    }
    return String.fromCodePoint(codePoint);
  });
  const es5Warning = !regexIdentifierES5.test(
    // Only Unicode escapes are allowed in ES5 identifiers.
    value.replace(/\\u([a-fA-F0-9]{4})/g, function($0, $1) {
      return String.fromCodePoint(parseInt($1, 16));
    })
  );
  var isReserved;
  if ((isReserved = regexES6ReservedWord.test(tmp)) || !regexIdentifier.test(tmp)) {
    return false;
  } else {
    return true;
  }
}

// https://deno.land/x/good@1.13.2.0/flattened/is_valid_key_literal.js
function isValidKeyLiteral(value) {
  if (typeof value != "string") {
    return false;
  }
  if (value.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*$/)) {
    return true;
  }
  return isValidIdentifier(value);
}

// https://deno.land/x/good@1.13.2.0/flattened/to_representation.js
var reprSymbol = Symbol.for("representation");
var denoInspectSymbol = Symbol.for("Deno.customInspect");
var RegExpPrototype = RegExp.prototype;
var BigIntPrototype = BigInt.prototype;
var DatePrototype = Date.prototype;
var ArrayPrototype = Array.prototype;
var SetPrototype = Set.prototype;
var MapPrototype = Map.prototype;
var ObjectPrototype = Object.prototype;
var ErrorPrototype = Error.prototype;
var PromisePrototype = Promise.prototype;
var UrlPrototype = globalThis.URL?.prototype;
var isProbablyAPrototype = (item) => typeof item?.constructor == "function" && item.constructor?.prototype == item && isValidIdentifier(item.constructor?.name);
var representSymbol = (item) => {
  if (!item.description) {
    return "Symbol()";
  } else {
    const description = item.description;
    let globalVersion = Symbol.for(description);
    if (globalVersion == item) {
      return `Symbol.for(${JSON.stringify(description)})`;
    } else if (description.startsWith("Symbol.") && Symbol[description.slice(7)]) {
      return description;
    } else {
      return `Symbol(${JSON.stringify(description)})`;
    }
  }
};
var reprKey = (key2) => {
  if (typeof key2 == "symbol") {
    return `[${representSymbol(key2)}]`;
  } else if (isValidKeyLiteral(key2)) {
    return key2;
  } else {
    return JSON.stringify(key2);
  }
};
var allGlobalKeysAtInit = Object.freeze(allKeys(globalThis));
var toRepresentation = (item, { alreadySeen = /* @__PURE__ */ new Map(), debug = false, simplified, indent: indent2 = "    ", globalValues } = {}) => {
  if (Number.isFinite(indent2)) {
    indent2 = " ".repeat(indent2);
  }
  const options = { alreadySeen, debug, simplified, indent: indent2 };
  const recursionWrapper = (item2, options2) => {
    let groupIsOn = false;
    try {
      if (item2 === void 0) {
        return "undefined";
      } else if (item2 === null) {
        return "null";
      }
      const { alreadySeen: alreadySeen2, simplified: simplified2, indent: indent3 } = options2;
      if (item2 instanceof Object) {
        if (alreadySeen2.has(item2)) {
          const output2 = alreadySeen2.get(item2);
          if (output2 != null) {
            return output2;
          } else {
            return `${String(item2)} /*Self Reference*/`;
          }
        } else {
          alreadySeen2.set(item2, null);
        }
      }
      const prototype = Object.getPrototypeOf(item2);
      if (typeof item2[reprSymbol] == "function") {
        try {
          const output2 = item2[reprSymbol](options2);
          alreadySeen2.set(item2, output2);
          return output2;
        } catch (error) {
          if (debug) {
            console.error(`calling Symbol.for("representation") method failed (skipping)
Error was: ${error?.stack || error}`);
          }
        }
      }
      if (typeof item2[denoInspectSymbol] == "function") {
        try {
          const output2 = item2[denoInspectSymbol](options2);
          alreadySeen2.set(item2, output2);
          return output2;
        } catch (error) {
          if (debug) {
            console.error(`calling Symbol.for("Deno.customInspect") method failed (skipping)
Error was: ${error?.stack || error}`);
          }
        }
      }
      if (debug) {
        console.group();
        groupIsOn = true;
      }
      let output;
      if (typeof item2 == "number" || typeof item2 == "boolean" || prototype == RegExpPrototype) {
        output = String(item2);
      } else if (typeof item2 == "string") {
        output = JSON.stringify(item2);
      } else if (typeof item2 == "symbol") {
        output = representSymbol(item2);
      } else if (prototype == BigIntPrototype) {
        output = `BigInt(${item2.toString()})`;
      } else if (prototype == DatePrototype) {
        output = `new Date(${item2.getTime()})`;
      } else if (prototype == ArrayPrototype) {
        output = arrayLikeRepr(item2, options2);
        let nonIndexKeys;
        try {
          nonIndexKeys = Object.keys(item2).filter((each) => !(Number.isInteger(each - 0) && each >= 0));
        } catch (error) {
          if (debug) {
            console.error(`[toRepresentation] error checking nonIndexKeys
${error?.stack || error}`);
          }
        }
        if (nonIndexKeys.length > 0) {
          let extraKeys = {};
          for (const each of nonIndexKeys) {
            try {
              extraKeys[each] = item2[each];
            } catch (error) {
            }
          }
          if (Object.keys(extraKeys).length > 0) {
            output = `Object.assign(${output}, ${pureObjectRepr(extraKeys)})`;
          }
        }
      } else if (prototype == SetPrototype) {
        output = `new Set(${arrayLikeRepr(item2, options2)})`;
      } else if (prototype == MapPrototype) {
        output = `new Map(${mapLikeObject(item2.entries(), options2)})`;
      } else if (prototype == PromisePrototype) {
        output = `Promise.resolve(/*unknown*/)`;
      } else if (prototype == UrlPrototype) {
        output = `new URL(${JSON.stringify(item2?.href)})`;
      } else if (isGlobalValue(item2)) {
        const key2 = globalValueMap.get(item2);
        if (isValidIdentifier(key2) || key2 == "eval") {
          output = key2;
        } else {
          if (typeof key2 == "symbol") {
            output = `globalThis[${representSymbol(key2)}]`;
          } else if (isValidKeyLiteral(key2)) {
            output = `globalThis.${key2}`;
          } else {
            output = `globalThis[${JSON.stringify(key2)}]`;
          }
        }
      } else if (isProbablyAPrototype(item2)) {
        const name = item2.constructor.name;
        let isPrototypeOfGlobal;
        try {
          isPrototypeOfGlobal = globalThis[name]?.prototype == item2;
        } catch (error) {
        }
        if (isPrototypeOfGlobal) {
          output = `${name}.prototype`;
        } else {
          if (simplified2) {
            output = `${name}.prototype /*${name} is local*/`;
          } else {
            output = `/*prototype of ${name}*/ ${customObjectRepr(item2, options2)}`;
          }
        }
      } else if (prototype == ErrorPrototype && item2?.constructor != globalThis.DOMException) {
        try {
          output = `new Error(${JSON.stringify(item2?.message)})`;
        } catch (error) {
          output = `new Error(${JSON.stringify(item2)})`;
        }
      } else if (typeof item2 == "function") {
        let isNativeCode;
        let asString;
        let isClass;
        const getAsString = () => {
          if (asString != null) {
            return asString;
          }
          try {
            asString = Function.prototype.toString.call(item2);
          } catch (error) {
          }
          return asString;
        };
        const getIsNativeCode = () => {
          if (isNativeCode != null) {
            return isNativeCode;
          }
          try {
            isNativeCode = !!getAsString().match(/{\s*\[native code\]\s*}$/);
          } catch (error) {
          }
          return isNativeCode;
        };
        const getIsClass = () => {
          if (isClass != null) {
            return isClass;
          }
          try {
            isClass = item2.name && getAsString().match(/^class\b/);
          } catch (error) {
          }
          return isClass;
        };
        const name = item2.name;
        if (isValidIdentifier(name)) {
          if (getIsNativeCode()) {
            output = `${name} /*native function*/`;
          } else if (getIsClass()) {
            if (simplified2) {
              output = `${name} /*class*/`;
            } else {
              output = getAsString();
            }
          } else {
            if (simplified2) {
              output = `${item2.name} /*function*/`;
            } else {
              output = `(${getAsString()})`;
            }
          }
        } else if (getIsClass()) {
          if (typeof name == "string") {
            output = `/*name: ${JSON.stringify(name)}*/ class { /*...*/ }`;
          } else if (simplified2) {
            output = `class { /*...*/ }`;
          } else {
            output = getAsString();
          }
        } else if (typeof name == "string" && getAsString().match(/^(function )?(g|s)et\b/)) {
          const realName = name.slice(4);
          if (name[0] == "g") {
            output = `Object.getOwnPropertyDescriptor({/*unknown obj*/},${JSON.stringify(realName)}).get`;
          } else {
            output = `Object.getOwnPropertyDescriptor({/*unknown obj*/},${JSON.stringify(realName)}).set`;
          }
        } else if (name) {
          if (simplified2) {
            if (getIsNativeCode()) {
              if (name.startsWith("get ")) {
                const realName = name.slice(4);
                if (Object.getOwnPropertyDescriptor(globalThis, realName)?.get == item2) {
                  output = `Object.getOwnPropertyDescriptor(globalThis, ${JSON.stringify(realName)}).get /*native getter*/`;
                } else {
                  output = `Object.getOwnPropertyDescriptor({/*unknown obj*/}, ${JSON.stringify(realName)}).get`;
                }
              } else if (name.startsWith("set ")) {
                const realName = name.slice(4);
                if (Object.getOwnPropertyDescriptor(globalThis, realName)?.set == item2) {
                  output = `Object.getOwnPropertyDescriptor(globalThis, ${JSON.stringify(realName)}).set /*native setter*/`;
                } else {
                  output = `Object.getOwnPropertyDescriptor({/*unknown obj*/}, ${JSON.stringify(realName)}).set`;
                }
              } else {
                output = `(function(){/*name: ${recursionWrapper(name, options2)}, native function*/}})`;
              }
            } else {
              output = `(function(){/*name: ${recursionWrapper(name, options2)}*/}})`;
            }
          } else {
            output = `/*name: ${recursionWrapper(name, options2)}*/ (${getAsString()})`;
          }
        } else {
          if (simplified2) {
            if (getIsNativeCode()) {
              output = `(function(){/*native function*/}})`;
            } else {
              output = `(function(){/*...*/}})`;
            }
          } else {
            output = `(${getAsString()})`;
          }
        }
      } else {
        output = customObjectRepr(item2, options2);
      }
      if (groupIsOn) {
        console.groupEnd();
      }
      alreadySeen2.set(item2, output);
      return output;
    } catch (error) {
      if (groupIsOn) {
        console.groupEnd();
      }
      if (debug) {
        console.debug(`[toRepresentation] error is: ${error}`, error?.stack || error);
      }
      try {
        return String(item2);
      } catch (error2) {
        return "{} /*error: catestrophic representation failure*/";
      }
    }
  };
  let globalValueMap;
  const isGlobalValue = (item2) => {
    if (globalValueMap == null) {
      globalValueMap = globalValueMap || new Map(allGlobalKeysAtInit.filter((each) => {
        try {
          globalThis[each];
        } catch (error) {
          return false;
        }
        return true;
      }).map((each) => [globalThis[each], each]));
      for (const [key2, value] of Object.entries(globalValues || {})) {
        globalValueMap.set(key2, value);
      }
    }
    return globalValueMap.has(item2);
  };
  const pureObjectRepr = (item2) => {
    if (options.simplified == null) {
      options.simplified = true;
    }
    let string = "{";
    let propertyDescriptors;
    try {
      propertyDescriptors = Object.entries(Object.getOwnPropertyDescriptors(item2));
    } catch (error) {
      if (debug) {
        console.error(`[toRepresentation] error getting Object.propertyDescriptor
${error?.stack || error}`);
      }
      try {
        return String(item2);
      } catch (error2) {
        return "undefined /*error: catestrophic representation failure*/";
      }
    }
    for (const [key2, { value, writable, enumerable, configurable, get, set }] of propertyDescriptors) {
      const stringKey = reprKey(key2);
      if (get) {
        string += `
${indent2}get ${stringKey}(){/*contents*/}`;
      } else {
        string += `
${indent2}${stringKey}: ${indent({ string: recursionWrapper(value, options), by: options.indent, noLead: true })},`;
      }
    }
    if (propertyDescriptors.length == 0) {
      string += "}";
    } else {
      string += "\n}";
    }
    return string;
  };
  const arrayLikeRepr = (item2, options2) => {
    if (options2.simplified == null) {
      options2.simplified = true;
    }
    const chunks = [];
    let oneHasNewLine = false;
    for (const each of item2) {
      const repr = recursionWrapper(each, options2);
      chunks.push(repr);
      if (!oneHasNewLine && repr.includes("\n")) {
        oneHasNewLine = true;
      }
    }
    if (!oneHasNewLine) {
      return `[${chunks.join(",")}]`;
    } else {
      return `[
${chunks.map((each) => indent({ string: each, by: options2.indent, noLead: false })).join(",\n")}
]`;
    }
  };
  const mapLikeObject = (entries, options2) => {
    let string = "";
    for (const [key2, value] of entries) {
      if (options2.simplified == null) {
        options2.simplified = true;
      }
      const stringKey = recursionWrapper(key2, options2);
      const stringValue = recursionWrapper(value, options2);
      if (!stringKey.includes("\n")) {
        const formattedValue = stringValue.includes("\n") ? indent({ string: stringValue, by: options2.indent, noLead: true }) : indent({ string: stringValue, by: options2.indent, noLead: true });
        string += `
${options2.indent}[${stringKey}, ${formattedValue}],`;
      } else {
        const doubleIndent = options2.indent + options2.indent;
        string += `
${options2.indent}[
${indent({ string: stringKey, by: doubleIndent, noLead: false })},
${indent({ string: stringValue, by: doubleIndent, noLead: false })}
${options2.indent}],`;
      }
    }
    if (string.length == 0) {
      return "";
    } else {
      return `[${string}
]`;
    }
  };
  const customObjectRepr = (item2, options2) => {
    const prototype = Object.getPrototypeOf(item2);
    if (prototype == ObjectPrototype) {
      return pureObjectRepr(item2);
    }
    let className = prototype.constructor?.name;
    let output;
    if (typeof className != "string" || className == "Object" || className == "Function") {
      className = null;
    }
    const vanillaCustomObjRepr = () => {
      if (className) {
        if (options2.simplified) {
          return `new ${className}(/*...*/)`;
        } else {
          return `new ${className}(${pureObjectRepr(item2)})`;
        }
      } else {
        return pureObjectRepr(item2);
      }
    };
    if (item2 instanceof Array || item2 instanceof TypedArray || item2 instanceof Set) {
      let isAllIndexKeys;
      try {
        isAllIndexKeys = Object.keys(item2).every((each) => Number.isInteger(each - 0) && each >= 0);
      } catch (error) {
        if (debug) {
          console.error(`[toRepresentation] error checking isAllIndexKeys
${error?.stack || error}`);
        }
      }
      let arrayLikeReprString;
      if (isAllIndexKeys) {
        try {
          arrayLikeReprString = arrayLikeRepr(item2, options2);
        } catch (error) {
          isAllIndexKeys = false;
        }
      }
      if (isAllIndexKeys) {
        if (className) {
          output = `new ${className}(${arrayLikeReprString})`;
        } else {
          if (item2 instanceof Array) {
            output = arrayLikeReprString;
          } else if (item2 instanceof TypedArray) {
            for (const each of typedArrayClasses) {
              if (item2 instanceof each) {
                output = `new ${each.name}(${arrayLikeReprString})`;
                break;
              }
            }
          } else if (item2 instanceof Set) {
            output = `new Set(${arrayLikeReprString})`;
          }
        }
      } else {
        output = vanillaCustomObjRepr(item2);
      }
    } else if (item2 instanceof Map) {
      if (className && options2.simplified) {
        output = `new ${className}(/*...*/)`;
      } else {
        let entries = [];
        try {
          entries = Map.prototype.entries.call(item2);
        } catch (error) {
          if (debug) {
            console.error(`[toRepresentation] error getting Map.prototype.entries
${error?.stack || error}`);
          }
        }
        const core = mapLikeObject(entries, options2);
        if (className) {
          output = `new ${className}(${core})`;
        } else {
          output = `new Map(${core})`;
        }
      }
    } else {
      try {
        output = vanillaCustomObjRepr(item2);
      } catch (error) {
        try {
          output = pureObjectRepr(item2);
        } catch (error2) {
          try {
            output = item2.toString();
          } catch (error3) {
            return "undefined /*error: catestrophic representation failure*/";
          }
        }
      }
    }
    return output;
  };
  try {
    const output = recursionWrapper(item, options);
    return output;
  } catch (error) {
    if (debug) {
      console.debug(`[toRepresentation] error is:`, error);
    }
    return String(item);
  }
};

// https://deno.land/x/good@1.13.2.0/flattened/to_string.js
var toString = (value) => {
  if (typeof value == "symbol") {
    return toRepresentation(value);
  } else if (!(value instanceof Object)) {
    return value != null ? value.toString() : `${value}`;
  } else {
    return toRepresentation(value);
  }
};

// https://deno.land/x/good@1.13.2.0/flattened/escape_regex_match.js
var reservedCharMap = {
  "&": "\\x26",
  "!": "\\x21",
  "#": "\\x23",
  "$": "\\$",
  "%": "\\x25",
  "*": "\\*",
  "+": "\\+",
  ",": "\\x2c",
  ".": "\\.",
  ":": "\\x3a",
  ";": "\\x3b",
  "<": "\\x3c",
  "=": "\\x3d",
  ">": "\\x3e",
  "?": "\\?",
  "@": "\\x40",
  "^": "\\^",
  "`": "\\x60",
  "~": "\\x7e",
  "(": "\\(",
  ")": "\\)",
  "[": "\\[",
  "]": "\\]",
  "{": "\\{",
  "}": "\\}",
  "/": "\\/",
  "-": "\\x2d",
  "\\": "\\\\",
  "|": "\\|"
};
var RX_REGEXP_ESCAPE = new RegExp(
  `[${Object.values(reservedCharMap).join("")}]`,
  "gu"
);
function escapeRegexMatch(str) {
  return str.replaceAll(
    RX_REGEXP_ESCAPE,
    (m) => reservedCharMap[m]
  );
}

// https://deno.land/x/good@1.13.2.0/flattened/regex.js
var regexpProxy = Symbol("regexpProxy");
var realExec = RegExp.prototype.exec;
RegExp.prototype.exec = function(...args2) {
  if (this[regexpProxy]) {
    return realExec.apply(this[regexpProxy], args2);
  }
  return realExec.apply(this, args2);
};
var proxyRegExp;
var regexProxyOptions = Object.freeze({
  get(original, key2) {
    if (typeof key2 == "string" && key2.match(/^[igmusyv]+$/)) {
      return proxyRegExp(original, key2);
    }
    if (key2 == regexpProxy) {
      return original;
    }
    return original[key2];
  },
  set(original, key2, value) {
    original[key2] = value;
    return true;
  }
});
proxyRegExp = (parent, flags) => {
  const regex3 = new RegExp(parent, flags);
  const output = new Proxy(regex3, regexProxyOptions);
  Object.setPrototypeOf(output, Object.getPrototypeOf(regex3));
  return output;
};
function regexWithStripWarning(shouldStrip) {
  return (strings, ...values) => {
    let newRegexString = "";
    for (const [string, value] of iterZipLongSync(strings, values)) {
      newRegexString += string;
      if (value instanceof RegExp) {
        if (!shouldStrip && value.flags.replace(/g/, "").length > 0) {
          console.warn(`Warning: flags inside of regex:
    The RegExp trigging this warning is: ${value}
    When calling the regex interpolater (e.g. regex\`something\${stuff}\`)
    one of the \${} values (the one above) was a RegExp with a flag enabled
    e.g. /stuff/i  <- i = ignoreCase flag enabled
    When the /stuff/i gets interpolated, its going to loose its flags
    (thats what I'm warning you about)
    
    To disable/ignore this warning do:
        regex.stripFlags\`something\${/stuff/i}\`
    If you want to add flags to the output of regex\`something\${stuff}\` do:
        regex\`something\${stuff}\`.i   // ignoreCase
        regex\`something\${stuff}\`.ig  // ignoreCase and global
        regex\`something\${stuff}\`.gi  // functionally equivlent
`);
        }
        newRegexString += `(?:${value.source})`;
      } else if (value != null) {
        newRegexString += escapeRegexMatch(toString(value));
      }
    }
    return proxyRegExp(newRegexString, "");
  };
}
var regex2 = regexWithStripWarning(false);
regex2.stripFlags = regexWithStripWarning(true);

// https://deno.land/x/good@1.13.2.0/flattened/utf8_bytes_to_string.js
var textDecoder = new TextDecoder("utf-8");
var utf8BytesToString = textDecoder.decode.bind(textDecoder);

// https://deno.land/x/good@1.13.2.0/flattened/string_to_utf8_bytes.js
var textEncoder = new TextEncoder("utf-8");
var stringToUtf8Bytes = textEncoder.encode.bind(textEncoder);

// https://deno.land/x/good@1.13.2.0/flattened/built_in_copyable_primitive_classes.js
var builtInCopyablePrimitiveClasses = /* @__PURE__ */ new Set([RegExp, Date, URL, ...typedArrayClasses, globalThis.ArrayBuffer, globalThis.DataView]);

// https://deno.land/x/good@1.13.2.0/flattened/sync_iterator_prototype.js
var syncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));

// https://deno.land/x/good@1.13.2.0/flattened/array_iterator__class.js
var ArrayIterator = Object.getPrototypeOf([][Symbol.iterator]);

// https://deno.land/x/good@1.13.2.0/flattened/map_iterator__class.js
var MapIterator = Object.getPrototypeOf((/* @__PURE__ */ new Map())[Symbol.iterator]);

// https://deno.land/x/good@1.13.2.0/flattened/set_iterator__class.js
var SetIterator = Object.getPrototypeOf((/* @__PURE__ */ new Set())[Symbol.iterator]);

// https://deno.land/x/good@1.13.2.0/flattened/async_function__class.js
var AsyncFunction = class {
};
try {
  AsyncFunction = eval("(async function(){}).constructor");
} catch (err) {
}

// https://deno.land/x/good@1.13.2.0/flattened/sync_generator_function__class.js
var SyncGeneratorFunction = class {
};
try {
  SyncGeneratorFunction = eval("(function*(){}).constructor");
} catch (err) {
}

// https://deno.land/x/good@1.13.2.0/flattened/async_generator_function__class.js
var AsyncGeneratorFunction = class {
};
try {
  AsyncGeneratorFunction = eval("(async function*(){}).constructor");
} catch (err) {
}

// https://deno.land/x/good@1.13.2.0/flattened/sync_generator_object__class.js
var SyncGeneratorObject = class {
};
try {
  SyncGeneratorObject = eval("((function*(){})()).constructor");
} catch (err) {
}

// https://deno.land/x/good@1.13.2.0/flattened/async_generator_object__class.js
var AsyncGeneratorObject = class {
};
try {
  AsyncGeneratorObject = eval("((async function*(){})()).constructor");
} catch (err) {
}

// https://deno.land/x/good@1.13.2.0/flattened/is_built_in_sync_iterator.js
var isBuiltInSyncIterator = syncIteratorPrototype.isPrototypeOf.bind(syncIteratorPrototype);

// https://deno.land/x/good@1.13.2.0/flattened/deep_copy_symbol.js
var deepCopySymbol = Symbol.for("deepCopy");

// https://deno.land/x/good@1.13.2.0/flattened/deep_copy.js
var clonedFromSymbol = Symbol();
var getThis = Symbol();
Object.getPrototypeOf(function() {
})[getThis] = function() {
  return this;
};

// https://deno.land/x/good@1.13.2.0/flattened/all_key_descriptions.js
var allKeyDescriptions = function(value, options = { includingBuiltin: false }) {
  var { includingBuiltin } = { ...options };
  let descriptions = [];
  if (value == null) {
    return {};
  }
  if (!(value instanceof Object)) {
    value = Object.getPrototypeOf(value);
  }
  const rootPrototype = Object.getPrototypeOf({});
  let prevObj;
  while (value && value != prevObj) {
    if (!includingBuiltin && value == rootPrototype) {
      break;
    }
    descriptions = descriptions.concat(Object.entries(Object.getOwnPropertyDescriptors(value)));
    prevObj = value;
    value = Object.getPrototypeOf(value);
  }
  descriptions.reverse();
  return Object.fromEntries(descriptions);
};

// https://esm.sh/v135/gh/jeff-hykin/elemental@0.6.4/denonext/main/deno.js
var J = "\uE000";
var F = "\uE001";
function k(r2) {
  let e = this, o = 0, t = [null], n = 0, i, s, d, a = [], l = 0, c, f = 0, m = false, h = (p, b = [], E) => {
    let x = 0;
    return p = !E && p === F ? a[l++].slice(1, -1) : p.replace(/\ue001/g, (g) => a[l++]), p && (p.replace(/\ue000/g, (g, y) => (y && b.push(p.slice(x, y)), x = y + 1, b.push(arguments[++n]))), x < p.length && b.push(p.slice(x)), b.length > 1 ? b : b[0]);
  }, v = () => {
    [t, c, ...i] = t, t.push(e(c, ...i)), m === f-- && (m = false);
  };
  return r2.join(J).replace(/<!--[^]*?-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (p) => (a.push(p), F)).replace(/(?:^|>)((?:[^<]|<[^\w\ue000\/?!>])*)(?:$|<)/g, (p, b, E, x) => {
    let g, y;
    if (E && x.slice(o, E).replace(/(\S)\/$/, "$1 /").split(/\s+/).map((w, D) => {
      if (w[0] === "/") {
        if (w = w.slice(1), P[w])
          return;
        y = g || w || 1;
      } else if (D) {
        if (w) {
          let z = t[2] || (t[2] = {});
          w.slice(0, 3) === "..." ? Object.assign(z, arguments[++n]) : ([s, d] = w.split("="), Array.isArray(d = z[h(s)] = d ? h(d) : true) && (d.toString = d.join.bind(d, "")));
        }
      } else {
        if (g = h(w), typeof g == "string")
          for (; S[t[1] + g]; )
            v();
        t = [t, g, null], f++, !m && U[g] && (m = f), P[g] && (y = g);
      }
    }), y)
      for (t[0] || T(`Wrong close tag \`${y}\``), v(); c !== y && S[c]; )
        v();
    o = E + p.length, m || (b = b.replace(/\s*\n\s*/g, "").replace(/\s+/g, " ")), b && h((c = 0, b), t, true);
  }), t[0] && S[t[1]] && v(), f && T(`Unclosed \`${t[1]}\`.`), t.length < 3 ? t[1] : (t.shift(), t);
}
var T = (r2) => {
  throw SyntaxError(r2);
};
var P = k.empty = {};
var S = k.close = {};
var U = k.pre = {};
"area base basefont bgsound br col command embed frame hr image img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((r2) => k.empty[r2] = true);
var L = { li: "", dt: "dd", dd: "dt", p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table", rt: "rp", rp: "rt", optgroup: "", option: "optgroup", caption: "tbody thead tfoot tr colgroup", colgroup: "thead tbody tfoot tr caption", thead: "tbody tfoot caption", tbody: "tfoot caption", tfoot: "caption", tr: "tbody tfoot", td: "th tr", th: "td tr tbody" };
for (let r2 in L)
  for (let e of [...L[r2].split(" "), r2])
    k.close[r2] = k.close[r2 + e] = true;
"pre textarea".split(" ").map((r2) => k.pre[r2] = true);
var G = k;
var R = Object.freeze(/* @__PURE__ */ new Set(["accent-color", "align-content", "align-items", "align-self", "align-tracks", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timeline", "animation-timing-function", "appearance", "ascent-override", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "bleed", "block-overflow", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "color", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cursor", "length", "angle", "descent-override", "direction", "display", "resolution", "empty-cells", "fallback", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex_value", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "frequency", "hanging-punctuation", "height", "hyphenate-character", "hyphens", "image-orientation", "image-rendering", "image-resolution", "inherit", "inherits", "initial", "initial-letter", "initial-letter-align", "initial-value", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "justify-tracks", "left", "letter-spacing", "line-break", "line-clamp", "line-gap-override", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-style", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "max-zoom", "min-block-size", "min-height", "min-inline-size", "min-width", "min-zoom", "mix-blend-mode", "time", "negative", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orientation", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "Pseudo-classes", "Pseudo-elements", "pad", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "prefix", "print-color-adjust", "quotes", "range", "resize", "revert", "right", "rotate", "row-gap", "ruby-align", "ruby-merge", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "size", "size-adjust", "speak-as", "src", "suffix", "symbols", "syntax", "system", "tab-size", "table-layout", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "unicode-range", "unset", "user-select", "user-zoom", "vertical-align", "viewport-fit", "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"]));
var I = Object.freeze(/* @__PURE__ */ new Set(["class", "style", "value", "id", "contenteditable", "href", "hidden", "autofocus", "src", "name", "accept", "accesskey", "action", "align", "alt", "async", "autocomplete", "autoplay", "border", "charset", "checked", "cite", "cols", "colspan", "content", "controls", "coords", "data", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "for", "form", "formaction", "headers", "high", "hreflang", "http", "ismap", "kind", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "muted", "novalidate", "open", "optimum", "pattern", "placeholder", "poster", "preload", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "selected", "shape", "size", "sizes", "span", "spellcheck", "srcdoc", "srclang", "srcset", "start", "step", "tabindex", "target", "title", "translate", "type", "usemap", "wrap", "bgcolor", "width", "color", "height"]));
var B = (r2) => r2.startsWith("-") || R.has(r2);
var C = (r2) => r2.replace(/[a-z]([A-Z])(?=[a-z])/g, (e) => `${e[0]}-${e.slice(1).toLowerCase()}`);
var V = (r2) => !!r2.prototype && !!r2.prototype.constructor.name;
var $ = (r2, e) => {
  let o = allKeyDescriptions(r2), t = {};
  for (let [n, i] of Object.entries(o))
    ["constructor", "prototype", "length"].includes(n) || (t[n] = { get: () => r2[n] });
  return Object.defineProperties(e, t), e;
};
var M = Symbol.for("toHtmlElement");
var u = class r {
  constructor(e = {}, o = {}) {
    let { middleware: t, errorComponentFactory: n, defaultPlaceholderFactory: i } = o || {};
    this.components = e || {}, this.middleware = t || {}, this.defaultPlaceholderFactory = i || (() => document.createElement("div")), this.errorComponentFactory = n || N, this.html = this.createElement.bind(this), this.xhtm = G.bind((...s) => this.createElement(...s));
  }
  static debug = false;
  static allTags = Symbol.for("allTags");
  static exclusivelySvgElements = /* @__PURE__ */ new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view"]);
  static randomId = (e) => `${e}${Math.random()}`.replace(".", "");
  static makeHtmlElement = function(e) {
    if (e instanceof Node || e instanceof Element || e instanceof HTMLDocument)
      return e;
    if (e == null)
      return new window.Text("");
    if (typeof e == "string")
      return new window.Text(e);
    if (typeof e == "symbol")
      return new window.Text(e.toString());
    if (e instanceof Object) {
      if (e[M] != null)
        return r.makeHtmlElement(e[M]);
      {
        let o;
        try {
          o = Object.getPrototypeOf(e).constructor.name, o = o && `class ${JSON.stringify(o)}`;
        } catch {
        }
        throw Error(`Cannot coerce ${o || e} into an html element
`, e);
      }
    } else
      return new window.Text(`${e}`);
  };
  static appendChildren = function(e, ...o) {
    let { element: t, insertBefore: n } = e, i = (s) => e.appendChild(s);
    n && !(n instanceof Function) && (e = t, i = (s) => e.insertBefore(n, s));
    for (let s of o)
      if (s instanceof Array)
        r.appendChildren(e, ...s);
      else if (s instanceof Function)
        r.appendChildren(e, s());
      else if (s instanceof Promise) {
        let d = s, a = d.placeholder || document.createElement("div");
        i(a), setTimeout(async () => {
          try {
            let l = await d;
            if (l instanceof Array) {
              let c = a.parentElement;
              c || (c = await new Promise((f, m) => {
                let h = setInterval(() => {
                  a.parentElement && (f(a.parentElement), clearInterval(h));
                }, 70);
              }));
              for (let f of l)
                try {
                  r.appendChildren({ element: c, insertBefore: a }, f);
                } catch (m) {
                  c.insertBefore(a, H(`When async component ${toString(e)} resolved, it created an array. One of those elements in the array caused an error when it tried to be added as a child:
 ${toString(m)}`));
                }
            } else {
              let c = r.makeHtmlElement(l);
              a.replaceWith(c);
            }
          } catch (l) {
            a.replaceWith(N({ ...properties, children: o }, key, l));
          }
        }, 0);
      } else
        i(r.makeHtmlElement(s));
    return e;
  };
  static css = function(e, ...o) {
    if (typeof e == "string")
      return e;
    if (e == null)
      return "";
    if (e instanceof Array) {
      let t = e, n = o, i = "";
      for (let s of t)
        if (i += s, n.length > 0) {
          let d = n.shift();
          d instanceof Object ? i += j.css(d) : i += `${d}`;
        }
      return i;
    } else if (e instanceof Object) {
      let t = "";
      for (let [n, i] of Object.entries(e))
        i != null && (t += `${C(n)}: ${i};`);
      return t;
    } else
      return e;
  };
  static combineClasses = (...e) => {
    e = e.filter((t) => t != null);
    let o = [];
    for (let t of e)
      if (typeof t == "string" && (t = t.split(" ")), t instanceof Array) {
        t = t.flat(1 / 0);
        for (let n of t)
          o.push(n);
      } else if (t instanceof Object)
        for (let [n, i] of Object.entries(t))
          i && o.push(n);
    return o;
  };
  createElement(...e) {
    if (e[0] instanceof Array)
      return this.xhtm(...e);
    {
      r.debug && console.debug("args is:", e);
      for (let a of (this.middleware[r.allTags] || []).concat(this.middleware[e[0]] || []))
        try {
          e = eachMiddleWare(e);
        } catch {
          console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, e);
        }
      let [o, t, ...n] = e;
      if (r.debug && console.debug("key, properties, children is:", o, t, n), this.components[o] instanceof Function && (o = this.components[o]), o instanceof Function) {
        let a;
        try {
          a = V(o) ? new o({ ...t, children: n }) : o({ ...t, children: n });
        } catch (l) {
          return this.errorComponentFactory({ ...t, children: n }, o, l);
        }
        if (a instanceof Promise) {
          let l = a, c = l.placeholder || this.defaultPlaceholderFactory(a);
          return setTimeout(async () => {
            try {
              let f = await l;
              if (f instanceof Array) {
                let m = c.parentElement;
                m || (m = await new Promise((h, v) => {
                  let A = setInterval(() => {
                    c.parentElement && (h(c.parentElement), clearInterval(A));
                  }, 70);
                }));
                for (let h of f)
                  try {
                    r.appendChildren({ element: m, insertBefore: c }, h);
                  } catch (v) {
                    m.insertBefore(c, H(`Something returned a promise, which resolved to an array, and then something tried to append those to an element (this element: ${s}). One of the items in the array ${h} caused an error when it tried to be added as a child:
 ${toString(v)}`));
                  }
              } else {
                let m = r.makeHtmlElement(f);
                c.replaceWith(m);
              }
            } catch (f) {
              c.replaceWith(this.errorComponentFactory({ ...t, children: n }, o, f));
            }
          }, 0), c;
        } else
          return a;
      }
      let i = r.exclusivelySvgElements.has(o), s;
      if (o == "iframe" && t.src) {
        let a = document.createElement("div");
        a.innerHTML = `<iframe src=${JSON.stringify(t.src)}></iframe>`, s = a.children[0], delete t.src;
      } else
        i ? s = document.createElementNS("http://www.w3.org/2000/svg", o) : s = document.createElement(o);
      let d = "";
      if (t instanceof Object)
        for (let [a, l] of Object.entries(t)) {
          if (a == "style") {
            d += r.css(l);
            continue;
          }
          if (a.slice(0, 2) == "on" && a.slice(2, 3).toLowerCase() !== a.slice(2, 3) && l instanceof Function && s.addEventListener(a.slice(2).toLowerCase(), l), a == "class") {
            if (l instanceof Array)
              l = l.join(" ");
            else if (l instanceof Object) {
              let c = "";
              for (let [f, m] of Object.entries(l))
                m && (c += f);
              l = c;
            }
          }
          if (i) {
            l instanceof Array && (l = l.join(" ")), s.setAttribute(C(a), l);
            continue;
          }
          l != null && !(l instanceof Object) && I.has(a) && s.setAttribute(a, l);
          try {
            s[a] = l;
          } catch {
          }
          B(a) && (d += `;${a}: ${l};`);
        }
      return d && s.setAttribute("style", d), r.appendChildren(s, ...n);
    }
  }
  extend(e = {}, o = {}) {
    let { middleware: t, ...n } = o || {};
    return j({ ...this.components, ...e }, { middleware: { ...this.middleware, ...t }, ...n });
  }
};
var j = (...r2) => {
  let e = new u(...r2), o = e.createElement.bind(e);
  return $(u, o), $(e, o), o;
};
$(u, j);
function H(r2) {
  let e = document.createElement("div");
  e.setAttribute("style", `
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    `), e.innerHTML = `I'm sorry, there was an error when loading this part of the page \u{1F641}.<br>Here's the error message: ${Option(toString(r2 != null && r2.message || r2)).innerHTML}`;
}
function N({ children: r2, ...e }, o, t) {
  let n = document.createElement("div"), i = document.createElement("div"), s = document.createElement("div");
  n.setAttribute("style", `
        all:              unset;
        display:          flex;
        flex-direction:   column;
        padding:          1.5rem;
        background-color: #f5a5a8;
        color:            white;
        font-family:      -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size:        18px;
        font-weight:      400;
        overflow:         auto;
    `), n.innerHTML = "I'm sorry, there was an error when loading this part of the page \u{1F641} ";
  let d;
  if (typeof o == "string")
    d = `&lt;${o} />`;
  else
    try {
      d = `&lt;${o.prototype.constructor.name} />`;
    } catch {
      try {
        d = `&lt;${o.name} />`;
      } catch {
        d = `&lt;${o} />`;
      }
    }
  let a = {};
  for (let [l, c] of Object.entries(e))
    try {
      a[l] = JSON.parse(JSON.stringify(c));
    } catch {
      typeof c == "symbol" ? a[l] = c.toString() : a[l] = `${c}`;
    }
  i.innerHTML = `<span>error: ${`${t}`.replace(/\n/, "<br>")}<br>location:<br>${indent({ string: t.stack, by: "    " }).replace(/\n/, "<br>")}</span><br><span>tag: ${d}</span><br><div>properties:<br><code style="max-height: 12rem; overflow: auto;">${JSON.stringify(a, 0, 4)}</code></div>`, i.setAttribute("style", `
        padding: 1rem;
        background-color: #161b22;
        color: #789896;
        white-space: pre;
        max-width: 85vw;
        overflow: auto;
    `), n.appendChild(i), s.setAttribute("style", `
        all: unset
        display: flex
        flex-direction: column
        margin-top: 1.3rem
    `);
  for (let l of r2 || [])
    try {
      u.appendChildren(s, [l]);
    } catch {
    }
  return n.appendChild(s), n;
}
try {
  let r2 = document.head;
  Object.defineProperty(document, "head", { set: (e) => u.appendChildren(r2, ...e.childNodes), get: () => r2, writable: true });
} catch {
}
var ee = (r2, e, { isSvg: o = false } = {}) => {
  let t = "";
  if (e instanceof Object)
    for (let [n, i] of Object.entries(e)) {
      if (n == "style") {
        t += u.css(i);
        continue;
      }
      if (n.slice(0, 2) == "on" && n.slice(2, 3).toLowerCase() !== n.slice(2, 3) && i instanceof Function && r2.addEventListener(n.slice(2).toLowerCase(), i), n == "class") {
        if (i instanceof Array)
          i = i.join(" ");
        else if (i instanceof Object) {
          let s = "";
          for (let [d, a] of Object.entries(i))
            a && (s += d);
          i = s;
        }
      }
      if (o) {
        i instanceof Array && (i = i.join(" ")), r2.setAttribute(C(n), i);
        continue;
      }
      i != null && !(i instanceof Object) && I.has(n) && r2.setAttribute(n, i);
      try {
        r2[n] = i;
      } catch {
      }
      B(n) && (t += `;${n}: ${i};`);
    }
  return t && r2.setAttribute("style", `${r2.getAttribute("style") || ""};${t}`), e.children && u.appendChildren(r2, ...e.children), r2;
};
var K = u.combineClasses;
var Q = j();
var Y = u.css;
var Z = u.allTags;

// main/helpers/css.bundle.js
var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function getDefaultExportFromNamespaceIfNotNamed(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var cache_exports = {};
__export(cache_exports, {
  default: () => cache_default
});
var sheet_exports = {};
__export(sheet_exports, {
  StyleSheet: () => StyleSheet,
  __moduleExports: () => emotionSheet_cjs,
  default: () => sheet_default
});
function createCommonjsModule2(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire2(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire2() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionSheet_cjs_prod = createCommonjsModule2(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function sheetForTag(tag) {
    if (tag.sheet) {
      return tag.sheet;
    }
    for (var i = 0; i < document.styleSheets.length; i++) {
      if (document.styleSheets[i].ownerNode === tag) {
        return document.styleSheets[i];
      }
    }
  }
  function createStyleElement(options) {
    var tag = document.createElement("style");
    tag.setAttribute("data-emotion", options.key);
    if (options.nonce !== void 0) {
      tag.setAttribute("nonce", options.nonce);
    }
    tag.appendChild(document.createTextNode(""));
    tag.setAttribute("data-s", "");
    return tag;
  }
  var StyleSheet2 = /* @__PURE__ */ function() {
    function StyleSheet3(options) {
      var _this = this;
      this._insertTag = function(tag) {
        var before;
        if (_this.tags.length === 0) {
          if (_this.insertionPoint) {
            before = _this.insertionPoint.nextSibling;
          } else if (_this.prepend) {
            before = _this.container.firstChild;
          } else {
            before = _this.before;
          }
        } else {
          before = _this.tags[_this.tags.length - 1].nextSibling;
        }
        _this.container.insertBefore(tag, before);
        _this.tags.push(tag);
      };
      this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
      this.tags = [];
      this.ctr = 0;
      this.nonce = options.nonce;
      this.key = options.key;
      this.container = options.container;
      this.prepend = options.prepend;
      this.insertionPoint = options.insertionPoint;
      this.before = null;
    }
    var _proto = StyleSheet3.prototype;
    _proto.hydrate = function hydrate2(nodes) {
      nodes.forEach(this._insertTag);
    };
    _proto.insert = function insert(rule) {
      if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
        this._insertTag(createStyleElement(this));
      }
      var tag = this.tags[this.tags.length - 1];
      if (this.isSpeedy) {
        var sheet3 = sheetForTag(tag);
        try {
          sheet3.insertRule(rule, sheet3.cssRules.length);
        } catch (e) {
        }
      } else {
        tag.appendChild(document.createTextNode(rule));
      }
      this.ctr++;
    };
    _proto.flush = function flush2() {
      this.tags.forEach(function(tag) {
        return tag.parentNode && tag.parentNode.removeChild(tag);
      });
      this.tags = [];
      this.ctr = 0;
    };
    return StyleSheet3;
  }();
  exports.StyleSheet = StyleSheet2;
});
var emotionSheet_cjs = createCommonjsModule2(function(module) {
  {
    module.exports = emotionSheet_cjs_prod;
  }
});
var StyleSheet = emotionSheet_cjs.StyleSheet;
var sheet_default = emotionSheet_cjs;
var stylis_exports = {};
__export(stylis_exports, {
  CHARSET: () => CHARSET,
  COMMENT: () => COMMENT,
  COUNTER_STYLE: () => COUNTER_STYLE,
  DECLARATION: () => DECLARATION,
  DOCUMENT: () => DOCUMENT,
  FONT_FACE: () => FONT_FACE,
  FONT_FEATURE_VALUES: () => FONT_FEATURE_VALUES,
  IMPORT: () => IMPORT,
  KEYFRAMES: () => KEYFRAMES,
  MEDIA: () => MEDIA,
  MOZ: () => MOZ,
  MS: () => MS,
  NAMESPACE: () => NAMESPACE,
  PAGE: () => PAGE,
  RULESET: () => RULESET,
  SUPPORTS: () => SUPPORTS,
  VIEWPORT: () => VIEWPORT,
  WEBKIT: () => WEBKIT,
  abs: () => abs,
  alloc: () => alloc,
  append: () => append,
  assign: () => assign,
  caret: () => caret,
  char: () => char,
  character: () => character,
  characters: () => characters,
  charat: () => charat,
  column: () => column,
  combine: () => combine,
  comment: () => comment,
  commenter: () => commenter,
  compile: () => compile,
  copy: () => copy,
  dealloc: () => dealloc,
  declaration: () => declaration,
  default: () => stylis_default,
  delimit: () => delimit,
  delimiter: () => delimiter,
  escaping: () => escaping,
  from: () => from,
  hash: () => hash,
  identifier: () => identifier,
  indexof: () => indexof,
  length: () => length,
  line: () => line,
  match: () => match,
  middleware: () => middleware,
  namespace: () => namespace,
  next: () => next,
  node: () => node,
  parse: () => parse,
  peek: () => peek,
  position: () => position,
  prefix: () => prefix,
  prefixer: () => prefixer,
  prev: () => prev,
  replace: () => replace,
  ruleset: () => ruleset,
  rulesheet: () => rulesheet,
  serialize: () => serialize,
  sizeof: () => sizeof,
  slice: () => slice,
  stringify: () => stringify,
  strlen: () => strlen,
  substr: () => substr,
  token: () => token,
  tokenize: () => tokenize,
  tokenizer: () => tokenizer,
  trim: () => trim,
  whitespace: () => whitespace
});
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var PAGE = "@page";
var MEDIA = "@media";
var IMPORT = "@import";
var CHARSET = "@charset";
var VIEWPORT = "@viewport";
var SUPPORTS = "@supports";
var DOCUMENT = "@document";
var NAMESPACE = "@namespace";
var KEYFRAMES = "@keyframes";
var FONT_FACE = "@font-face";
var COUNTER_STYLE = "@counter-style";
var FONT_FEATURE_VALUES = "@font-feature-values";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "" };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0), root, { length: -root.length }, props);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function tokenize(value) {
  return dealloc(tokenizer(alloc(value)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function tokenizer(children) {
  while (next())
    switch (token(character)) {
      case 0:
        append(identifier(position - 1), children);
        break;
      case 2:
        append(delimit(character), children);
        break;
      default:
        append(from(character), children);
    }
  return children;
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j2 = 0, k2 = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j2 = points[i])), z = value; x < size; ++x)
      if (z = trim(j2 > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k2++] = z;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4200:
      if (!match(value, /flex-|baseline/))
        return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    case 4384:
    case 3616:
      if (children && children.some(function(element2, index) {
        return length2 = index, match(element2.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span") ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span") ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element2) {
        return match(element2.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a, b, c, d, e, f) {
        return MS + a + ":" + b + f + (c ? MS + a + "-span:" + (d ? e : +e - +b) + f : "") + value;
      });
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element2, index, children, callback) {
  switch (element2.type) {
    case IMPORT:
    case DECLARATION:
      return element2.return = element2.return || element2.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element2.return = element2.value + "{" + serialize(element2.children, callback) + "}";
    case RULESET:
      element2.value = element2.props.join(",");
  }
  return strlen(children = serialize(element2.children, callback)) ? element2.return = element2.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element2, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element2, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element2) {
    if (!element2.root) {
      if (element2 = element2.return)
        callback(element2);
    }
  };
}
function prefixer(element2, index, children, callback) {
  if (element2.length > -1) {
    if (!element2.return)
      switch (element2.type) {
        case DECLARATION:
          element2.return = prefix(element2.value, element2.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element2, { value: replace(element2.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element2.length)
            return combine(element2.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element2, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element2, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element2, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element2, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}
function namespace(element2) {
  switch (element2.type) {
    case RULESET:
      element2.props = element2.props.map(function(value) {
        return combine(tokenize(value), function(value2, index, children) {
          switch (charat(value2, 0)) {
            case 12:
              return substr(value2, 1, strlen(value2));
            case 0:
            case 40:
            case 43:
            case 62:
            case 126:
              return value2;
            case 58:
              if (children[++index] === "global")
                children[index] = "", children[++index] = "\f" + substr(children[index], index = 1, -1);
            case 32:
              return index === 1 ? "" : value2;
            default:
              switch (index) {
                case 0:
                  element2 = value2;
                  return sizeof(children) > 1 ? "" : value2;
                case (index = sizeof(children) - 1):
                case 2:
                  return index === 2 ? value2 + element2 + element2 : value2 + element2;
                default:
                  return value2;
              }
          }
        });
      });
  }
}
var stylis_default = null;
var weak_memoize_exports = {};
__export(weak_memoize_exports, {
  default: () => weak_memoize_default
});
function createCommonjsModule3(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire3(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire3() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionWeakMemoize_cjs_prod = createCommonjsModule3(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var weakMemoize2 = function weakMemoize22(func) {
    var cache = /* @__PURE__ */ new WeakMap();
    return function(arg) {
      if (cache.has(arg)) {
        return cache.get(arg);
      }
      var ret = func(arg);
      cache.set(arg, ret);
      return ret;
    };
  };
  exports.default = weakMemoize2;
});
var emotionWeakMemoize_cjs = createCommonjsModule3(function(module) {
  {
    module.exports = emotionWeakMemoize_cjs_prod;
  }
});
var weak_memoize_default = emotionWeakMemoize_cjs;
var memoize_exports = {};
__export(memoize_exports, {
  default: () => memoize_default
});
function createCommonjsModule4(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire4(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire4() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionMemoize_cjs_prod = createCommonjsModule4(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function memoize3(fn) {
    var cache = /* @__PURE__ */ Object.create(null);
    return function(arg) {
      if (cache[arg] === void 0)
        cache[arg] = fn(arg);
      return cache[arg];
    };
  }
  exports.default = memoize3;
});
var emotionMemoize_cjs = createCommonjsModule4(function(module) {
  {
    module.exports = emotionMemoize_cjs_prod;
  }
});
var memoize_default = emotionMemoize_cjs;
function createCommonjsModule5(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire5(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function getDefaultExportFromNamespaceIfNotNamed2(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire5() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var sheet = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(sheet_exports);
var stylis = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(stylis_exports);
var weakMemoize = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(weak_memoize_exports);
var memoize = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed2(memoize_exports);
var emotionCache_cjs_prod = createCommonjsModule5(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var weakMemoize__default = /* @__PURE__ */ _interopDefault(weakMemoize);
  var memoize__default = /* @__PURE__ */ _interopDefault(memoize);
  var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
    var previous = 0;
    var character2 = 0;
    while (true) {
      previous = character2;
      character2 = stylis.peek();
      if (previous === 38 && character2 === 12) {
        points[index] = 1;
      }
      if (stylis.token(character2)) {
        break;
      }
      stylis.next();
    }
    return stylis.slice(begin, stylis.position);
  };
  var toRules = function toRules2(parsed, points) {
    var index = -1;
    var character2 = 44;
    do {
      switch (stylis.token(character2)) {
        case 0:
          if (character2 === 38 && stylis.peek() === 12) {
            points[index] = 1;
          }
          parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
          break;
        case 2:
          parsed[index] += stylis.delimit(character2);
          break;
        case 4:
          if (character2 === 44) {
            parsed[++index] = stylis.peek() === 58 ? "&\f" : "";
            points[index] = parsed[index].length;
            break;
          }
        default:
          parsed[index] += stylis.from(character2);
      }
    } while (character2 = stylis.next());
    return parsed;
  };
  var getRules = function getRules2(value, points) {
    return stylis.dealloc(toRules(stylis.alloc(value), points));
  };
  var fixedElements = /* @__PURE__ */ new WeakMap();
  var compat = function compat2(element2) {
    if (element2.type !== "rule" || !element2.parent || element2.length < 1) {
      return;
    }
    var value = element2.value, parent = element2.parent;
    var isImplicitRule = element2.column === parent.column && element2.line === parent.line;
    while (parent.type !== "rule") {
      parent = parent.parent;
      if (!parent)
        return;
    }
    if (element2.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
      return;
    }
    if (isImplicitRule) {
      return;
    }
    fixedElements.set(element2, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k2 = 0; i < rules.length; i++) {
      for (var j2 = 0; j2 < parentRules.length; j2++, k2++) {
        element2.props[k2] = points[i] ? rules[i].replace(/&\f/g, parentRules[j2]) : parentRules[j2] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel2(element2) {
    if (element2.type === "decl") {
      var value = element2.value;
      if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
        element2["return"] = "";
        element2.value = "";
      }
    }
  };
  function prefix2(value, length2) {
    switch (stylis.hash(value, length2)) {
      case 5103:
        return stylis.WEBKIT + "print-" + value + value;
      case 5737:
      case 4201:
      case 3177:
      case 3433:
      case 1641:
      case 4457:
      case 2921:
      case 5572:
      case 6356:
      case 5844:
      case 3191:
      case 6645:
      case 3005:
      case 6391:
      case 5879:
      case 5623:
      case 6135:
      case 4599:
      case 4855:
      case 4215:
      case 6389:
      case 5109:
      case 5365:
      case 5621:
      case 3829:
        return stylis.WEBKIT + value + value;
      case 5349:
      case 4246:
      case 4810:
      case 6968:
      case 2756:
        return stylis.WEBKIT + value + stylis.MOZ + value + stylis.MS + value + value;
      case 6828:
      case 4268:
        return stylis.WEBKIT + value + stylis.MS + value + value;
      case 6165:
        return stylis.WEBKIT + value + stylis.MS + "flex-" + value + value;
      case 5187:
        return stylis.WEBKIT + value + stylis.replace(value, /(\w+).+(:[^]+)/, stylis.WEBKIT + "box-$1$2" + stylis.MS + "flex-$1$2") + value;
      case 5443:
        return stylis.WEBKIT + value + stylis.MS + "flex-item-" + stylis.replace(value, /flex-|-self/, "") + value;
      case 4675:
        return stylis.WEBKIT + value + stylis.MS + "flex-line-pack" + stylis.replace(value, /align-content|flex-|-self/, "") + value;
      case 5548:
        return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "shrink", "negative") + value;
      case 5292:
        return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "basis", "preferred-size") + value;
      case 6060:
        return stylis.WEBKIT + "box-" + stylis.replace(value, "-grow", "") + stylis.WEBKIT + value + stylis.MS + stylis.replace(value, "grow", "positive") + value;
      case 4554:
        return stylis.WEBKIT + stylis.replace(value, /([^-])(transform)/g, "$1" + stylis.WEBKIT + "$2") + value;
      case 6187:
        return stylis.replace(stylis.replace(stylis.replace(value, /(zoom-|grab)/, stylis.WEBKIT + "$1"), /(image-set)/, stylis.WEBKIT + "$1"), value, "") + value;
      case 5495:
      case 3959:
        return stylis.replace(value, /(image-set\([^]*)/, stylis.WEBKIT + "$1$`$1");
      case 4968:
        return stylis.replace(stylis.replace(value, /(.+:)(flex-)?(.*)/, stylis.WEBKIT + "box-pack:$3" + stylis.MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + stylis.WEBKIT + value + value;
      case 4095:
      case 3583:
      case 4068:
      case 2532:
        return stylis.replace(value, /(.+)-inline(.+)/, stylis.WEBKIT + "$1$2") + value;
      case 8116:
      case 7059:
      case 5753:
      case 5535:
      case 5445:
      case 5701:
      case 4933:
      case 4677:
      case 5533:
      case 5789:
      case 5021:
      case 4765:
        if (stylis.strlen(value) - 1 - length2 > 6)
          switch (stylis.charat(value, length2 + 1)) {
            case 109:
              if (stylis.charat(value, length2 + 4) !== 45)
                break;
            case 102:
              return stylis.replace(value, /(.+:)(.+)-([^]+)/, "$1" + stylis.WEBKIT + "$2-$3$1" + stylis.MOZ + (stylis.charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
            case 115:
              return ~stylis.indexof(value, "stretch") ? prefix2(stylis.replace(value, "stretch", "fill-available"), length2) + value : value;
          }
        break;
      case 4949:
        if (stylis.charat(value, length2 + 1) !== 115)
          break;
      case 6444:
        switch (stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, "!important") && 10))) {
          case 107:
            return stylis.replace(value, ":", ":" + stylis.WEBKIT) + value;
          case 101:
            return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + stylis.WEBKIT + "$2$3$1" + stylis.MS + "$2box$3") + value;
        }
        break;
      case 5936:
        switch (stylis.charat(value, length2 + 11)) {
          case 114:
            return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
          case 108:
            return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
          case 45:
            return stylis.WEBKIT + value + stylis.MS + stylis.replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
        }
        return stylis.WEBKIT + value + stylis.MS + value + value;
    }
    return value;
  }
  var prefixer2 = function prefixer22(element2, index, children, callback) {
    if (element2.length > -1) {
      if (!element2["return"])
        switch (element2.type) {
          case stylis.DECLARATION:
            element2["return"] = prefix2(element2.value, element2.length);
            break;
          case stylis.KEYFRAMES:
            return stylis.serialize([stylis.copy(element2, {
              value: stylis.replace(element2.value, "@", "@" + stylis.WEBKIT)
            })], callback);
          case stylis.RULESET:
            if (element2.length)
              return stylis.combine(element2.props, function(value) {
                switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return stylis.serialize([stylis.copy(element2, {
                      props: [stylis.replace(value, /:(read-\w+)/, ":" + stylis.MOZ + "$1")]
                    })], callback);
                  case "::placeholder":
                    return stylis.serialize([stylis.copy(element2, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.WEBKIT + "input-$1")]
                    }), stylis.copy(element2, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.MOZ + "$1")]
                    }), stylis.copy(element2, {
                      props: [stylis.replace(value, /:(plac\w+)/, stylis.MS + "input-$1")]
                    })], callback);
                }
                return "";
              });
        }
    }
  };
  var isBrowser = typeof document !== "undefined";
  var getServerStylisCache = isBrowser ? void 0 : weakMemoize__default["default"](function() {
    return memoize__default["default"](function() {
      var cache = {};
      return function(name) {
        return cache[name];
      };
    });
  });
  var defaultStylisPlugins = [prefixer2];
  var createCache2 = function createCache22(options) {
    var key2 = options.key;
    if (isBrowser && key2 === "css") {
      var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
      Array.prototype.forEach.call(ssrStyles, function(node2) {
        var dataEmotionAttribute = node2.getAttribute("data-emotion");
        if (dataEmotionAttribute.indexOf(" ") === -1) {
          return;
        }
        document.head.appendChild(node2);
        node2.setAttribute("data-s", "");
      });
    }
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
    var inserted = {};
    var container;
    var nodesToHydrate = [];
    if (isBrowser) {
      container = options.container || document.head;
      Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key2 + ' "]'), function(node2) {
        var attrib = node2.getAttribute("data-emotion").split(" ");
        for (var i = 1; i < attrib.length; i++) {
          inserted[attrib[i]] = true;
        }
        nodesToHydrate.push(node2);
      });
    }
    var _insert;
    var omnipresentPlugins = [compat, removeLabel];
    if (isBrowser) {
      var currentSheet;
      var finalizingPlugins = [stylis.stringify, stylis.rulesheet(function(rule) {
        currentSheet.insert(rule);
      })];
      var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
      var stylis$12 = function stylis$13(styles) {
        return stylis.serialize(stylis.compile(styles), serializer);
      };
      _insert = function insert(selector, serialized, sheet22, shouldCache) {
        currentSheet = sheet22;
        stylis$12(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        if (shouldCache) {
          cache.inserted[serialized.name] = true;
        }
      };
    } else {
      var _finalizingPlugins = [stylis.stringify];
      var _serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins));
      var _stylis = function _stylis2(styles) {
        return stylis.serialize(stylis.compile(styles), _serializer);
      };
      var serverStylisCache = getServerStylisCache(stylisPlugins)(key2);
      var getRules2 = function getRules3(selector, serialized) {
        var name = serialized.name;
        if (serverStylisCache[name] === void 0) {
          serverStylisCache[name] = _stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
        }
        return serverStylisCache[name];
      };
      _insert = function _insert2(selector, serialized, sheet22, shouldCache) {
        var name = serialized.name;
        var rules = getRules2(selector, serialized);
        if (cache.compat === void 0) {
          if (shouldCache) {
            cache.inserted[name] = true;
          }
          return rules;
        } else {
          if (shouldCache) {
            cache.inserted[name] = rules;
          } else {
            return rules;
          }
        }
      };
    }
    var cache = {
      key: key2,
      sheet: new sheet.StyleSheet({
        key: key2,
        container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend,
        insertionPoint: options.insertionPoint
      }),
      nonce: options.nonce,
      inserted,
      registered: {},
      insert: _insert
    };
    cache.sheet.hydrate(nodesToHydrate);
    return cache;
  };
  exports.default = createCache2;
});
var emotionCache_cjs = createCommonjsModule5(function(module) {
  {
    module.exports = emotionCache_cjs_prod;
  }
});
var cache_default = emotionCache_cjs;
var serialize_exports = {};
__export(serialize_exports, {
  __moduleExports: () => emotionSerialize_cjs,
  default: () => serialize_default,
  serializeStyles: () => serializeStyles
});
var hash_exports = {};
__export(hash_exports, {
  default: () => hash_default
});
function createCommonjsModule6(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire6(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire6() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionHash_cjs_prod = createCommonjsModule6(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function murmur2(str) {
    var h = 0;
    var k2, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k2 = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k2 = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16);
      k2 ^= k2 >>> 24;
      h = (k2 & 65535) * 1540483477 + ((k2 >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    switch (len) {
      case 3:
        h ^= (str.charCodeAt(i + 2) & 255) << 16;
      case 2:
        h ^= (str.charCodeAt(i + 1) & 255) << 8;
      case 1:
        h ^= str.charCodeAt(i) & 255;
        h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    }
    h ^= h >>> 13;
    h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
    return ((h ^ h >>> 15) >>> 0).toString(36);
  }
  exports.default = murmur2;
});
var emotionHash_cjs = createCommonjsModule6(function(module) {
  {
    module.exports = emotionHash_cjs_prod;
  }
});
var hash_default = emotionHash_cjs;
var unitless_exports = {};
__export(unitless_exports, {
  default: () => unitless_default
});
function createCommonjsModule7(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire7(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire7() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionUnitless_cjs_prod = createCommonjsModule7(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var unitlessKeys = {
    animationIterationCount: 1,
    borderImageOutset: 1,
    borderImageSlice: 1,
    borderImageWidth: 1,
    boxFlex: 1,
    boxFlexGroup: 1,
    boxOrdinalGroup: 1,
    columnCount: 1,
    columns: 1,
    flex: 1,
    flexGrow: 1,
    flexPositive: 1,
    flexShrink: 1,
    flexNegative: 1,
    flexOrder: 1,
    gridRow: 1,
    gridRowEnd: 1,
    gridRowSpan: 1,
    gridRowStart: 1,
    gridColumn: 1,
    gridColumnEnd: 1,
    gridColumnSpan: 1,
    gridColumnStart: 1,
    msGridRow: 1,
    msGridRowSpan: 1,
    msGridColumn: 1,
    msGridColumnSpan: 1,
    fontWeight: 1,
    lineHeight: 1,
    opacity: 1,
    order: 1,
    orphans: 1,
    tabSize: 1,
    widows: 1,
    zIndex: 1,
    zoom: 1,
    WebkitLineClamp: 1,
    fillOpacity: 1,
    floodOpacity: 1,
    stopOpacity: 1,
    strokeDasharray: 1,
    strokeDashoffset: 1,
    strokeMiterlimit: 1,
    strokeOpacity: 1,
    strokeWidth: 1
  };
  exports.default = unitlessKeys;
});
var emotionUnitless_cjs = createCommonjsModule7(function(module) {
  {
    module.exports = emotionUnitless_cjs_prod;
  }
});
var unitless_default = emotionUnitless_cjs;
function createCommonjsModule8(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire8(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function getDefaultExportFromNamespaceIfNotNamed3(n) {
  return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire8() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var hashString = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed3(hash_exports);
var unitless = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed3(unitless_exports);
var memoize2 = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed3(memoize_exports);
var emotionSerialize_cjs_prod = createCommonjsModule8(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var hashString__default = /* @__PURE__ */ _interopDefault(hashString);
  var unitless__default = /* @__PURE__ */ _interopDefault(unitless);
  var memoize__default = /* @__PURE__ */ _interopDefault(memoize2);
  var hyphenateRegex = /[A-Z]|^ms/g;
  var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
  var isCustomProperty = function isCustomProperty2(property) {
    return property.charCodeAt(1) === 45;
  };
  var isProcessableValue = function isProcessableValue2(value) {
    return value != null && typeof value !== "boolean";
  };
  var processStyleName = /* @__PURE__ */ memoize__default["default"](function(styleName) {
    return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
  });
  var processStyleValue = function processStyleValue2(key2, value) {
    switch (key2) {
      case "animation":
      case "animationName": {
        if (typeof value === "string") {
          return value.replace(animationRegex, function(match2, p1, p2) {
            cursor = {
              name: p1,
              styles: p2,
              next: cursor
            };
            return p1;
          });
        }
      }
    }
    if (unitless__default["default"][key2] !== 1 && !isCustomProperty(key2) && typeof value === "number" && value !== 0) {
      return value + "px";
    }
    return value;
  };
  var noComponentSelectorMessage = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
  function handleInterpolation(mergedProps, registered, interpolation) {
    if (interpolation == null) {
      return "";
    }
    if (interpolation.__emotion_styles !== void 0) {
      return interpolation;
    }
    switch (typeof interpolation) {
      case "boolean": {
        return "";
      }
      case "object": {
        if (interpolation.anim === 1) {
          cursor = {
            name: interpolation.name,
            styles: interpolation.styles,
            next: cursor
          };
          return interpolation.name;
        }
        if (interpolation.styles !== void 0) {
          var next2 = interpolation.next;
          if (next2 !== void 0) {
            while (next2 !== void 0) {
              cursor = {
                name: next2.name,
                styles: next2.styles,
                next: cursor
              };
              next2 = next2.next;
            }
          }
          var styles = interpolation.styles + ";";
          return styles;
        }
        return createStringFromObject(mergedProps, registered, interpolation);
      }
      case "function": {
        if (mergedProps !== void 0) {
          var previousCursor = cursor;
          var result = interpolation(mergedProps);
          cursor = previousCursor;
          return handleInterpolation(mergedProps, registered, result);
        }
        break;
      }
    }
    if (registered == null) {
      return interpolation;
    }
    var cached = registered[interpolation];
    return cached !== void 0 ? cached : interpolation;
  }
  function createStringFromObject(mergedProps, registered, obj) {
    var string = "";
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        string += handleInterpolation(mergedProps, registered, obj[i]) + ";";
      }
    } else {
      for (var _key in obj) {
        var value = obj[_key];
        if (typeof value !== "object") {
          if (registered != null && registered[value] !== void 0) {
            string += _key + "{" + registered[value] + "}";
          } else if (isProcessableValue(value)) {
            string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
          }
        } else {
          if (_key === "NO_COMPONENT_SELECTOR" && false) {
            throw new Error(noComponentSelectorMessage);
          }
          if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
            for (var _i = 0; _i < value.length; _i++) {
              if (isProcessableValue(value[_i])) {
                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
              }
            }
          } else {
            var interpolated = handleInterpolation(mergedProps, registered, value);
            switch (_key) {
              case "animation":
              case "animationName": {
                string += processStyleName(_key) + ":" + interpolated + ";";
                break;
              }
              default: {
                string += _key + "{" + interpolated + "}";
              }
            }
          }
        }
      }
    }
    return string;
  }
  var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
  var cursor;
  var serializeStyles2 = function serializeStyles3(args2, registered, mergedProps) {
    if (args2.length === 1 && typeof args2[0] === "object" && args2[0] !== null && args2[0].styles !== void 0) {
      return args2[0];
    }
    var stringMode = true;
    var styles = "";
    cursor = void 0;
    var strings = args2[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {
      styles += strings[0];
    }
    for (var i = 1; i < args2.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args2[i]);
      if (stringMode) {
        styles += strings[i];
      }
    }
    labelPattern.lastIndex = 0;
    var identifierName = "";
    var match2;
    while ((match2 = labelPattern.exec(styles)) !== null) {
      identifierName += "-" + match2[1];
    }
    var name = hashString__default["default"](styles) + identifierName;
    return {
      name,
      styles,
      next: cursor
    };
  };
  exports.serializeStyles = serializeStyles2;
});
var emotionSerialize_cjs = createCommonjsModule8(function(module) {
  {
    module.exports = emotionSerialize_cjs_prod;
  }
});
var serialize_default = emotionSerialize_cjs;
var serializeStyles = emotionSerialize_cjs.serializeStyles;
var utils_exports = {};
__export(utils_exports, {
  __moduleExports: () => emotionUtils_cjs,
  default: () => utils_default,
  getRegisteredStyles: () => getRegisteredStyles,
  insertStyles: () => insertStyles,
  registerStyles: () => registerStyles
});
function createCommonjsModule9(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire9(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn(module, module.exports), module.exports;
}
function commonjsRequire9() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionUtils_cjs_prod = createCommonjsModule9(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var isBrowser = typeof document !== "undefined";
  function getRegisteredStyles22(registered, registeredStyles, classNames) {
    var rawClassName = "";
    classNames.split(" ").forEach(function(className) {
      if (registered[className] !== void 0) {
        registeredStyles.push(registered[className] + ";");
      } else {
        rawClassName += className + " ";
      }
    });
    return rawClassName;
  }
  var registerStyles2 = function registerStyles3(cache, serialized, isStringTag) {
    var className = cache.key + "-" + serialized.name;
    if ((isStringTag === false || isBrowser === false && cache.compat !== void 0) && cache.registered[className] === void 0) {
      cache.registered[className] = serialized.styles;
    }
  };
  var insertStyles2 = function insertStyles3(cache, serialized, isStringTag) {
    registerStyles2(cache, serialized, isStringTag);
    var className = cache.key + "-" + serialized.name;
    if (cache.inserted[serialized.name] === void 0) {
      var stylesForSSR = "";
      var current = serialized;
      do {
        var maybeStyles = cache.insert(serialized === current ? "." + className : "", current, cache.sheet, true);
        if (!isBrowser && maybeStyles !== void 0) {
          stylesForSSR += maybeStyles;
        }
        current = current.next;
      } while (current !== void 0);
      if (!isBrowser && stylesForSSR.length !== 0) {
        return stylesForSSR;
      }
    }
  };
  exports.getRegisteredStyles = getRegisteredStyles22;
  exports.insertStyles = insertStyles2;
  exports.registerStyles = registerStyles2;
});
var emotionUtils_cjs = createCommonjsModule9(function(module) {
  {
    module.exports = emotionUtils_cjs_prod;
  }
});
var utils_default = emotionUtils_cjs;
var getRegisteredStyles = emotionUtils_cjs.getRegisteredStyles;
var insertStyles = emotionUtils_cjs.insertStyles;
var registerStyles = emotionUtils_cjs.registerStyles;
var createCache = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed(cache_exports);
var serialize2 = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed(serialize_exports);
var utils = /* @__PURE__ */ getDefaultExportFromNamespaceIfNotNamed(utils_exports);
var emotionCssCreateInstance_cjs_prod = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function _interopDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var createCache__default = /* @__PURE__ */ _interopDefault(createCache);
  function insertWithoutScoping(cache22, serialized) {
    if (cache22.inserted[serialized.name] === void 0) {
      return cache22.insert("", serialized, cache22.sheet, true);
    }
  }
  function merge2(registered, css2, className) {
    var registeredStyles = [];
    var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css2(registeredStyles);
  }
  var createEmotion = function createEmotion2(options) {
    var cache22 = createCache__default["default"](options);
    cache22.sheet.speedy = function(value) {
      this.isSpeedy = value;
    };
    cache22.compat = true;
    var css2 = function css22() {
      for (var _len = arguments.length, args2 = new Array(_len), _key = 0; _key < _len; _key++) {
        args2[_key] = arguments[_key];
      }
      var serialized = serialize2.serializeStyles(args2, cache22.registered, void 0);
      utils.insertStyles(cache22, serialized, false);
      return cache22.key + "-" + serialized.name;
    };
    var keyframes2 = function keyframes22() {
      for (var _len2 = arguments.length, args2 = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args2[_key2] = arguments[_key2];
      }
      var serialized = serialize2.serializeStyles(args2, cache22.registered);
      var animation = "animation-" + serialized.name;
      insertWithoutScoping(cache22, {
        name: serialized.name,
        styles: "@keyframes " + animation + "{" + serialized.styles + "}"
      });
      return animation;
    };
    var injectGlobal2 = function injectGlobal22() {
      for (var _len3 = arguments.length, args2 = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args2[_key3] = arguments[_key3];
      }
      var serialized = serialize2.serializeStyles(args2, cache22.registered);
      insertWithoutScoping(cache22, serialized);
    };
    var cx2 = function cx22() {
      for (var _len4 = arguments.length, args2 = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args2[_key4] = arguments[_key4];
      }
      return merge2(cache22.registered, css2, classnames(args2));
    };
    return {
      css: css2,
      cx: cx2,
      injectGlobal: injectGlobal2,
      keyframes: keyframes2,
      hydrate: function hydrate2(ids) {
        ids.forEach(function(key2) {
          cache22.inserted[key2] = true;
        });
      },
      flush: function flush2() {
        cache22.registered = {};
        cache22.inserted = {};
        cache22.sheet.flush();
      },
      sheet: cache22.sheet,
      cache: cache22,
      getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache22.registered),
      merge: merge2.bind(null, cache22.registered, css2)
    };
  };
  var classnames = function classnames2(args2) {
    var cls = "";
    for (var i = 0; i < args2.length; i++) {
      var arg = args2[i];
      if (arg == null)
        continue;
      var toAdd = void 0;
      switch (typeof arg) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(arg)) {
            toAdd = classnames2(arg);
          } else {
            toAdd = "";
            for (var k2 in arg) {
              if (arg[k2] && k2) {
                toAdd && (toAdd += " ");
                toAdd += k2;
              }
            }
          }
          break;
        }
        default: {
          toAdd = arg;
        }
      }
      if (toAdd) {
        cls && (cls += " ");
        cls += toAdd;
      }
    }
    return cls;
  };
  exports.default = createEmotion;
});
var emotionCss_cjs_prod = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var _createEmotion = emotionCssCreateInstance_cjs_prod["default"]({
    key: "css"
  }), flush2 = _createEmotion.flush, hydrate2 = _createEmotion.hydrate, cx2 = _createEmotion.cx, merge2 = _createEmotion.merge, getRegisteredStyles22 = _createEmotion.getRegisteredStyles, injectGlobal2 = _createEmotion.injectGlobal, keyframes2 = _createEmotion.keyframes, css2 = _createEmotion.css, sheet22 = _createEmotion.sheet, cache3 = _createEmotion.cache;
  exports.cache = cache3;
  exports.css = css2;
  exports.cx = cx2;
  exports.flush = flush2;
  exports.getRegisteredStyles = getRegisteredStyles22;
  exports.hydrate = hydrate2;
  exports.injectGlobal = injectGlobal2;
  exports.keyframes = keyframes2;
  exports.merge = merge2;
  exports.sheet = sheet22;
});
var emotionCss_cjs = createCommonjsModule(function(module) {
  {
    module.exports = emotionCss_cjs_prod;
  }
});
var cache2 = emotionCss_cjs.cache;
var css = emotionCss_cjs.css;
var cx = emotionCss_cjs.cx;
var flush = emotionCss_cjs.flush;
var getRegisteredStyles2 = emotionCss_cjs.getRegisteredStyles;
var hydrate = emotionCss_cjs.hydrate;
var injectGlobal = emotionCss_cjs.injectGlobal;
var keyframes = emotionCss_cjs.keyframes;
var merge = emotionCss_cjs.merge;
var sheet2 = emotionCss_cjs.sheet;

// main/helpers/helper_element.js
var helperElement = document.createElement("div");
helperElement.setAttribute("note", "STUFF WILL BREAK IF YOU DELETE ME");
helperElement.setAttribute("style", "position: fixed; top: 0; left: 0;");
window.addEventListener("load", () => document.body.prepend(helperElement));

// main/helpers/translate_alignment.js
var translateAlignment = (name) => {
  if (name == "top" || name == "left") {
    return "flex-start";
  } else if (name == "bottom" || name == "right") {
    return "flex-end";
  } else {
    return name;
  }
};

// main/generic_tools/hash.js
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
    const hash22 = new Uint8Array(BYTES);
    for (let i = 0; i < 8; i++) {
      hash22[(i << 2) + 0] = this._H[i] >>> 24 & 255;
      hash22[(i << 2) + 1] = this._H[i] >>> 16 & 255;
      hash22[(i << 2) + 2] = this._H[i] >>> 8 & 255;
      hash22[(i << 2) + 3] = this._H[i] >>> 0 & 255;
    }
    this.init();
    return outputEncoding ? decode(hash22, outputEncoding) : hash22;
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
var hash2 = (value) => sha256(value, "utf-8", "hex");
var hash_default2 = hash2;

// main/helpers/create_css_class.js
var dynamicClasses = /* @__PURE__ */ new Set();
var helperStyle = document.createElement("style");
var createCssClass = (name, styles) => {
  const classStyles = [styles].flat(Infinity);
  const key2 = `${name}${hash_default2(`${classStyles}`)}`;
  if (!dynamicClasses.has(key2)) {
    dynamicClasses.add(key2);
    for (const each of classStyles) {
      helperStyle.innerHTML += `.${key2}${each}`;
    }
  }
  return key2;
};
createCssClass.helperStyle = helperStyle;
createCssClass.dynamicClasses = dynamicClasses;
var create_css_class_default = createCssClass;

// main/helpers/combine_classes.js
var combineClasses = (...classes) => {
  classes = classes.filter((each) => each != null);
  let classesFinalList = [];
  for (let eachEntry of classes) {
    if (typeof eachEntry == "string") {
      eachEntry = eachEntry.split(" ");
    }
    if (eachEntry instanceof Array) {
      eachEntry = eachEntry.flat(Infinity);
      for (let eachName of eachEntry) {
        classesFinalList.push(eachName);
      }
    } else if (eachEntry instanceof Object) {
      for (const [className, enabled] of Object.entries(eachEntry)) {
        if (enabled) {
          classesFinalList.push(className);
        }
      }
    }
  }
  return classesFinalList;
};
var combine_classes_default = combineClasses;

// main/helpers/setup_class_styles.js
var setupClassStyles = (arg) => {
  if (arg.classStyles) {
    const className = create_css_class_default(``, arg.classStyles);
    arg.class = combine_classes_default(className, arg.class);
  }
  return arg;
};
var setup_class_styles_default = setupClassStyles;

// main/helpers/add_dynamic_style_flags.js
var dynamicStyler = Symbol("dynamicStyler");

// main/components/column.js
var columnClass = css`
    display: flex;
    flex-direction: column;
    transition: all 0.4s ease-in-out 0s;
`;
function Column({ verticalAlignment, horizontalAlignment, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(columnClass, arg.class);
  const justify = translateAlignment(verticalAlignment || "top");
  const align = translateAlignment(horizontalAlignment || "left");
  const div = document.createElement(`div`);
  div.setAttribute("name", "Column");
  ee(div, {
    style: `
            justify-content: ${justify};
            align-items: ${align};
            text-align: ${horizontalAlignment || "inherit"};
        `.replace(/\s+/g, " ").trim()
    // replace is to help bundle optimizers
  });
  ee(div, arg);
  return div;
}

// main/components/row.js
var rowClass = css`
    display: flex;
    flex-direction: row;
    transition: all 0.4s ease-in-out 0s;
`;
function Row({ verticalAlignment, horizontalAlignment, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(rowClass, arg.class);
  const justify = translateAlignment(horizontalAlignment || "left");
  const align = translateAlignment(verticalAlignment || "top");
  const div = document.createElement(`div`);
  div.setAttribute("name", "Row");
  ee(div, {
    style: `
            justify-content: ${justify};
            align-items: ${align};
            text-align: ${horizontalAlignment || "inherit"};
        `.replace(/\s+/g, " ").trim()
    // replace is to help bundle optimizers
  });
  ee(div, arg);
  return div;
}

// main/components/button.js
var buttonClass = css`
    border-radius: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    -webkit-appearance: button;
    overflow: visible;
    text-transform: none;
    cursor: pointer;
`;
function Button(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(buttonClass, arg.class);
  const button = document.createElement(`button`);
  ee(button, arg);
  return button;
}

// https://esm.sh/showdown@2.1.0/denonext/showdown.mjs
var ee2 = Object.create;
var O = Object.defineProperty;
var de = Object.getOwnPropertyDescriptor;
var ue = Object.getOwnPropertyNames;
var re = Object.getPrototypeOf;
var ae = Object.prototype.hasOwnProperty;
var ne = (b, y) => () => (y || b((y = { exports: {} }).exports, y), y.exports);
var ce = (b, y, r2, A) => {
  if (y && typeof y == "object" || typeof y == "function")
    for (let z of ue(y))
      !ae.call(b, z) && z !== r2 && O(b, z, { get: () => y[z], enumerable: !(A = de(y, z)) || A.enumerable });
  return b;
};
var se = (b, y, r2) => (r2 = b != null ? ee2(re(b)) : {}, ce(y || !b || !b.__esModule ? O(r2, "default", { value: b, enumerable: true }) : r2, b));
var K2 = ne((W, B2) => {
  (function() {
    function b(e) {
      "use strict";
      var u2 = { omitExtraWLInCodeBlocks: { defaultValue: false, describe: "Omit the default extra whiteline added to code blocks", type: "boolean" }, noHeaderId: { defaultValue: false, describe: "Turn on/off generated header id", type: "boolean" }, prefixHeaderId: { defaultValue: false, describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix", type: "string" }, rawPrefixHeaderId: { defaultValue: false, describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)', type: "boolean" }, ghCompatibleHeaderId: { defaultValue: false, describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)", type: "boolean" }, rawHeaderId: { defaultValue: false, describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`, type: "boolean" }, headerLevelStart: { defaultValue: false, describe: "The header blocks level start", type: "integer" }, parseImgDimensions: { defaultValue: false, describe: "Turn on/off image dimension parsing", type: "boolean" }, simplifiedAutoLink: { defaultValue: false, describe: "Turn on/off GFM autolink style", type: "boolean" }, excludeTrailingPunctuationFromURLs: { defaultValue: false, describe: "Excludes trailing punctuation from links generated with autoLinking", type: "boolean" }, literalMidWordUnderscores: { defaultValue: false, describe: "Parse midword underscores as literal underscores", type: "boolean" }, literalMidWordAsterisks: { defaultValue: false, describe: "Parse midword asterisks as literal asterisks", type: "boolean" }, strikethrough: { defaultValue: false, describe: "Turn on/off strikethrough support", type: "boolean" }, tables: { defaultValue: false, describe: "Turn on/off tables support", type: "boolean" }, tablesHeaderId: { defaultValue: false, describe: "Add an id to table headers", type: "boolean" }, ghCodeBlocks: { defaultValue: true, describe: "Turn on/off GFM fenced code blocks support", type: "boolean" }, tasklists: { defaultValue: false, describe: "Turn on/off GFM tasklist support", type: "boolean" }, smoothLivePreview: { defaultValue: false, describe: "Prevents weird effects in live previews due to incomplete input", type: "boolean" }, smartIndentationFix: { defaultValue: false, describe: "Tries to smartly fix indentation in es6 strings", type: "boolean" }, disableForced4SpacesIndentedSublists: { defaultValue: false, describe: "Disables the requirement of indenting nested sublists by 4 spaces", type: "boolean" }, simpleLineBreaks: { defaultValue: false, describe: "Parses simple line breaks as <br> (GFM Style)", type: "boolean" }, requireSpaceBeforeHeadingText: { defaultValue: false, describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)", type: "boolean" }, ghMentions: { defaultValue: false, describe: "Enables github @mentions", type: "boolean" }, ghMentionsLink: { defaultValue: "https://github.com/{u}", describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.", type: "string" }, encodeEmails: { defaultValue: true, describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities", type: "boolean" }, openLinksInNewWindow: { defaultValue: false, describe: "Open all links in new windows", type: "boolean" }, backslashEscapesHTMLTags: { defaultValue: false, describe: "Support for HTML Tag escaping. ex: <div>foo</div>", type: "boolean" }, emoji: { defaultValue: false, describe: "Enable emoji support. Ex: `this is a :smile: emoji`", type: "boolean" }, underline: { defaultValue: false, describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`", type: "boolean" }, ellipsis: { defaultValue: true, describe: "Replaces three dots with the ellipsis unicode character", type: "boolean" }, completeHTMLDocument: { defaultValue: false, describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags", type: "boolean" }, metadata: { defaultValue: false, describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).", type: "boolean" }, splitAdjacentBlockquotes: { defaultValue: false, describe: "Split adjacent blockquote blocks", type: "boolean" } };
      if (e === false)
        return JSON.parse(JSON.stringify(u2));
      var d = {};
      for (var a in u2)
        u2.hasOwnProperty(a) && (d[a] = u2[a].defaultValue);
      return d;
    }
    function y() {
      "use strict";
      var e = b(true), u2 = {};
      for (var d in e)
        e.hasOwnProperty(d) && (u2[d] = true);
      return u2;
    }
    var r2 = {}, A = {}, z = {}, E = b(true), $2 = "vanilla", L2 = { github: { omitExtraWLInCodeBlocks: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, disableForced4SpacesIndentedSublists: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghCompatibleHeaderId: true, ghMentions: true, backslashEscapesHTMLTags: true, emoji: true, splitAdjacentBlockquotes: true }, original: { noHeaderId: true, ghCodeBlocks: false }, ghost: { omitExtraWLInCodeBlocks: true, parseImgDimensions: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, smoothLivePreview: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghMentions: false, encodeEmails: true }, vanilla: b(true), allOn: y() };
    r2.helper = {}, r2.extensions = {}, r2.setOption = function(e, u2) {
      "use strict";
      return E[e] = u2, this;
    }, r2.getOption = function(e) {
      "use strict";
      return E[e];
    }, r2.getOptions = function() {
      "use strict";
      return E;
    }, r2.resetOptions = function() {
      "use strict";
      E = b(true);
    }, r2.setFlavor = function(e) {
      "use strict";
      if (!L2.hasOwnProperty(e))
        throw Error(e + " flavor was not found");
      r2.resetOptions();
      var u2 = L2[e];
      $2 = e;
      for (var d in u2)
        u2.hasOwnProperty(d) && (E[d] = u2[d]);
    }, r2.getFlavor = function() {
      "use strict";
      return $2;
    }, r2.getFlavorOptions = function(e) {
      "use strict";
      if (L2.hasOwnProperty(e))
        return L2[e];
    }, r2.getDefaultOptions = function(e) {
      "use strict";
      return b(e);
    }, r2.subParser = function(e, u2) {
      "use strict";
      if (r2.helper.isString(e))
        if (typeof u2 < "u")
          A[e] = u2;
        else {
          if (A.hasOwnProperty(e))
            return A[e];
          throw Error("SubParser named " + e + " not registered!");
        }
    }, r2.extension = function(e, u2) {
      "use strict";
      if (!r2.helper.isString(e))
        throw Error("Extension 'name' must be a string");
      if (e = r2.helper.stdExtName(e), r2.helper.isUndefined(u2)) {
        if (!z.hasOwnProperty(e))
          throw Error("Extension named " + e + " is not registered!");
        return z[e];
      } else {
        typeof u2 == "function" && (u2 = u2()), r2.helper.isArray(u2) || (u2 = [u2]);
        var d = H2(u2, e);
        if (d.valid)
          z[e] = u2;
        else
          throw Error(d.error);
      }
    }, r2.getAllExtensions = function() {
      "use strict";
      return z;
    }, r2.removeExtension = function(e) {
      "use strict";
      delete z[e];
    }, r2.resetExtensions = function() {
      "use strict";
      z = {};
    };
    function H2(e, u2) {
      "use strict";
      var d = u2 ? "Error in " + u2 + " extension->" : "Error in unnamed extension", a = { valid: true, error: "" };
      r2.helper.isArray(e) || (e = [e]);
      for (var s = 0; s < e.length; ++s) {
        var i = d + " sub-extension " + s + ": ", c = e[s];
        if (typeof c != "object")
          return a.valid = false, a.error = i + "must be an object, but " + typeof c + " given", a;
        if (!r2.helper.isString(c.type))
          return a.valid = false, a.error = i + 'property "type" must be a string, but ' + typeof c.type + " given", a;
        var t = c.type = c.type.toLowerCase();
        if (t === "language" && (t = c.type = "lang"), t === "html" && (t = c.type = "output"), t !== "lang" && t !== "output" && t !== "listener")
          return a.valid = false, a.error = i + "type " + t + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', a;
        if (t === "listener") {
          if (r2.helper.isUndefined(c.listeners))
            return a.valid = false, a.error = i + '. Extensions of type "listener" must have a property called "listeners"', a;
        } else if (r2.helper.isUndefined(c.filter) && r2.helper.isUndefined(c.regex))
          return a.valid = false, a.error = i + t + ' extensions must define either a "regex" property or a "filter" method', a;
        if (c.listeners) {
          if (typeof c.listeners != "object")
            return a.valid = false, a.error = i + '"listeners" property must be an object but ' + typeof c.listeners + " given", a;
          for (var p in c.listeners)
            if (c.listeners.hasOwnProperty(p) && typeof c.listeners[p] != "function")
              return a.valid = false, a.error = i + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + p + " must be a function but " + typeof c.listeners[p] + " given", a;
        }
        if (c.filter) {
          if (typeof c.filter != "function")
            return a.valid = false, a.error = i + '"filter" must be a function, but ' + typeof c.filter + " given", a;
        } else if (c.regex) {
          if (r2.helper.isString(c.regex) && (c.regex = new RegExp(c.regex, "g")), !(c.regex instanceof RegExp))
            return a.valid = false, a.error = i + '"regex" property must either be a string or a RegExp object, but ' + typeof c.regex + " given", a;
          if (r2.helper.isUndefined(c.replace))
            return a.valid = false, a.error = i + '"regex" extensions must implement a replace string or function', a;
        }
      }
      return a;
    }
    r2.validateExtension = function(e) {
      "use strict";
      var u2 = H2(e, null);
      return u2.valid ? true : (console.warn(u2.error), false);
    }, r2.hasOwnProperty("helper") || (r2.helper = {}), r2.helper.isString = function(e) {
      "use strict";
      return typeof e == "string" || e instanceof String;
    }, r2.helper.isFunction = function(e) {
      "use strict";
      var u2 = {};
      return e && u2.toString.call(e) === "[object Function]";
    }, r2.helper.isArray = function(e) {
      "use strict";
      return Array.isArray(e);
    }, r2.helper.isUndefined = function(e) {
      "use strict";
      return typeof e > "u";
    }, r2.helper.forEach = function(e, u2) {
      "use strict";
      if (r2.helper.isUndefined(e))
        throw new Error("obj param is required");
      if (r2.helper.isUndefined(u2))
        throw new Error("callback param is required");
      if (!r2.helper.isFunction(u2))
        throw new Error("callback param must be a function/closure");
      if (typeof e.forEach == "function")
        e.forEach(u2);
      else if (r2.helper.isArray(e))
        for (var d = 0; d < e.length; d++)
          u2(e[d], d, e);
      else if (typeof e == "object")
        for (var a in e)
          e.hasOwnProperty(a) && u2(e[a], a, e);
      else
        throw new Error("obj does not seem to be an array or an iterable object");
    }, r2.helper.stdExtName = function(e) {
      "use strict";
      return e.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function D(e, u2) {
      "use strict";
      var d = u2.charCodeAt(0);
      return "\xA8E" + d + "E";
    }
    r2.helper.escapeCharactersCallback = D, r2.helper.escapeCharacters = function(e, u2, d) {
      "use strict";
      var a = "([" + u2.replace(/([\[\]\\])/g, "\\$1") + "])";
      d && (a = "\\\\" + a);
      var s = new RegExp(a, "g");
      return e = e.replace(s, D), e;
    }, r2.helper.unescapeHTMLEntities = function(e) {
      "use strict";
      return e.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var F2 = function(e, u2, d, a) {
      "use strict";
      var s = a || "", i = s.indexOf("g") > -1, c = new RegExp(u2 + "|" + d, "g" + s.replace(/g/g, "")), t = new RegExp(u2, s.replace(/g/g, "")), p = [], l, o, h, n, f;
      do
        for (l = 0; h = c.exec(e); )
          if (t.test(h[0]))
            l++ || (o = c.lastIndex, n = o - h[0].length);
          else if (l && !--l) {
            f = h.index + h[0].length;
            var _ = { left: { start: n, end: o }, match: { start: o, end: h.index }, right: { start: h.index, end: f }, wholeMatch: { start: n, end: f } };
            if (p.push(_), !i)
              return p;
          }
      while (l && (c.lastIndex = o));
      return p;
    };
    r2.helper.matchRecursiveRegExp = function(e, u2, d, a) {
      "use strict";
      for (var s = F2(e, u2, d, a), i = [], c = 0; c < s.length; ++c)
        i.push([e.slice(s[c].wholeMatch.start, s[c].wholeMatch.end), e.slice(s[c].match.start, s[c].match.end), e.slice(s[c].left.start, s[c].left.end), e.slice(s[c].right.start, s[c].right.end)]);
      return i;
    }, r2.helper.replaceRecursiveRegExp = function(e, u2, d, a, s) {
      "use strict";
      if (!r2.helper.isFunction(u2)) {
        var i = u2;
        u2 = function() {
          return i;
        };
      }
      var c = F2(e, d, a, s), t = e, p = c.length;
      if (p > 0) {
        var l = [];
        c[0].wholeMatch.start !== 0 && l.push(e.slice(0, c[0].wholeMatch.start));
        for (var o = 0; o < p; ++o)
          l.push(u2(e.slice(c[o].wholeMatch.start, c[o].wholeMatch.end), e.slice(c[o].match.start, c[o].match.end), e.slice(c[o].left.start, c[o].left.end), e.slice(c[o].right.start, c[o].right.end))), o < p - 1 && l.push(e.slice(c[o].wholeMatch.end, c[o + 1].wholeMatch.start));
        c[p - 1].wholeMatch.end < e.length && l.push(e.slice(c[p - 1].wholeMatch.end)), t = l.join("");
      }
      return t;
    }, r2.helper.regexIndexOf = function(e, u2, d) {
      "use strict";
      if (!r2.helper.isString(e))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      if (!(u2 instanceof RegExp))
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      var a = e.substring(d || 0).search(u2);
      return a >= 0 ? a + (d || 0) : a;
    }, r2.helper.splitAtIndex = function(e, u2) {
      "use strict";
      if (!r2.helper.isString(e))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      return [e.substring(0, u2), e.substring(u2)];
    }, r2.helper.encodeEmailAddress = function(e) {
      "use strict";
      var u2 = [function(d) {
        return "&#" + d.charCodeAt(0) + ";";
      }, function(d) {
        return "&#x" + d.charCodeAt(0).toString(16) + ";";
      }, function(d) {
        return d;
      }];
      return e = e.replace(/./g, function(d) {
        if (d === "@")
          d = u2[Math.floor(Math.random() * 2)](d);
        else {
          var a = Math.random();
          d = a > 0.9 ? u2[2](d) : a > 0.45 ? u2[1](d) : u2[0](d);
        }
        return d;
      }), e;
    }, r2.helper.padEnd = function(u2, d, a) {
      "use strict";
      return d = d >> 0, a = String(a || " "), u2.length > d ? String(u2) : (d = d - u2.length, d > a.length && (a += a.repeat(d / a.length)), String(u2) + a.slice(0, d));
    }, typeof console > "u" && (console = { warn: function(e) {
      "use strict";
      alert(e);
    }, log: function(e) {
      "use strict";
      alert(e);
    }, error: function(e) {
      "use strict";
      throw e;
    } }), r2.helper.regexes = { asteriskDashAndColon: /([*_:~])/g }, r2.helper.emojis = { "+1": "\u{1F44D}", "-1": "\u{1F44E}", 100: "\u{1F4AF}", 1234: "\u{1F522}", "1st_place_medal": "\u{1F947}", "2nd_place_medal": "\u{1F948}", "3rd_place_medal": "\u{1F949}", "8ball": "\u{1F3B1}", a: "\u{1F170}\uFE0F", ab: "\u{1F18E}", abc: "\u{1F524}", abcd: "\u{1F521}", accept: "\u{1F251}", aerial_tramway: "\u{1F6A1}", airplane: "\u2708\uFE0F", alarm_clock: "\u23F0", alembic: "\u2697\uFE0F", alien: "\u{1F47D}", ambulance: "\u{1F691}", amphora: "\u{1F3FA}", anchor: "\u2693\uFE0F", angel: "\u{1F47C}", anger: "\u{1F4A2}", angry: "\u{1F620}", anguished: "\u{1F627}", ant: "\u{1F41C}", apple: "\u{1F34E}", aquarius: "\u2652\uFE0F", aries: "\u2648\uFE0F", arrow_backward: "\u25C0\uFE0F", arrow_double_down: "\u23EC", arrow_double_up: "\u23EB", arrow_down: "\u2B07\uFE0F", arrow_down_small: "\u{1F53D}", arrow_forward: "\u25B6\uFE0F", arrow_heading_down: "\u2935\uFE0F", arrow_heading_up: "\u2934\uFE0F", arrow_left: "\u2B05\uFE0F", arrow_lower_left: "\u2199\uFE0F", arrow_lower_right: "\u2198\uFE0F", arrow_right: "\u27A1\uFE0F", arrow_right_hook: "\u21AA\uFE0F", arrow_up: "\u2B06\uFE0F", arrow_up_down: "\u2195\uFE0F", arrow_up_small: "\u{1F53C}", arrow_upper_left: "\u2196\uFE0F", arrow_upper_right: "\u2197\uFE0F", arrows_clockwise: "\u{1F503}", arrows_counterclockwise: "\u{1F504}", art: "\u{1F3A8}", articulated_lorry: "\u{1F69B}", artificial_satellite: "\u{1F6F0}", astonished: "\u{1F632}", athletic_shoe: "\u{1F45F}", atm: "\u{1F3E7}", atom_symbol: "\u269B\uFE0F", avocado: "\u{1F951}", b: "\u{1F171}\uFE0F", baby: "\u{1F476}", baby_bottle: "\u{1F37C}", baby_chick: "\u{1F424}", baby_symbol: "\u{1F6BC}", back: "\u{1F519}", bacon: "\u{1F953}", badminton: "\u{1F3F8}", baggage_claim: "\u{1F6C4}", baguette_bread: "\u{1F956}", balance_scale: "\u2696\uFE0F", balloon: "\u{1F388}", ballot_box: "\u{1F5F3}", ballot_box_with_check: "\u2611\uFE0F", bamboo: "\u{1F38D}", banana: "\u{1F34C}", bangbang: "\u203C\uFE0F", bank: "\u{1F3E6}", bar_chart: "\u{1F4CA}", barber: "\u{1F488}", baseball: "\u26BE\uFE0F", basketball: "\u{1F3C0}", basketball_man: "\u26F9\uFE0F", basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F", bat: "\u{1F987}", bath: "\u{1F6C0}", bathtub: "\u{1F6C1}", battery: "\u{1F50B}", beach_umbrella: "\u{1F3D6}", bear: "\u{1F43B}", bed: "\u{1F6CF}", bee: "\u{1F41D}", beer: "\u{1F37A}", beers: "\u{1F37B}", beetle: "\u{1F41E}", beginner: "\u{1F530}", bell: "\u{1F514}", bellhop_bell: "\u{1F6CE}", bento: "\u{1F371}", biking_man: "\u{1F6B4}", bike: "\u{1F6B2}", biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F", bikini: "\u{1F459}", biohazard: "\u2623\uFE0F", bird: "\u{1F426}", birthday: "\u{1F382}", black_circle: "\u26AB\uFE0F", black_flag: "\u{1F3F4}", black_heart: "\u{1F5A4}", black_joker: "\u{1F0CF}", black_large_square: "\u2B1B\uFE0F", black_medium_small_square: "\u25FE\uFE0F", black_medium_square: "\u25FC\uFE0F", black_nib: "\u2712\uFE0F", black_small_square: "\u25AA\uFE0F", black_square_button: "\u{1F532}", blonde_man: "\u{1F471}", blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F", blossom: "\u{1F33C}", blowfish: "\u{1F421}", blue_book: "\u{1F4D8}", blue_car: "\u{1F699}", blue_heart: "\u{1F499}", blush: "\u{1F60A}", boar: "\u{1F417}", boat: "\u26F5\uFE0F", bomb: "\u{1F4A3}", book: "\u{1F4D6}", bookmark: "\u{1F516}", bookmark_tabs: "\u{1F4D1}", books: "\u{1F4DA}", boom: "\u{1F4A5}", boot: "\u{1F462}", bouquet: "\u{1F490}", bowing_man: "\u{1F647}", bow_and_arrow: "\u{1F3F9}", bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F", bowling: "\u{1F3B3}", boxing_glove: "\u{1F94A}", boy: "\u{1F466}", bread: "\u{1F35E}", bride_with_veil: "\u{1F470}", bridge_at_night: "\u{1F309}", briefcase: "\u{1F4BC}", broken_heart: "\u{1F494}", bug: "\u{1F41B}", building_construction: "\u{1F3D7}", bulb: "\u{1F4A1}", bullettrain_front: "\u{1F685}", bullettrain_side: "\u{1F684}", burrito: "\u{1F32F}", bus: "\u{1F68C}", business_suit_levitating: "\u{1F574}", busstop: "\u{1F68F}", bust_in_silhouette: "\u{1F464}", busts_in_silhouette: "\u{1F465}", butterfly: "\u{1F98B}", cactus: "\u{1F335}", cake: "\u{1F370}", calendar: "\u{1F4C6}", call_me_hand: "\u{1F919}", calling: "\u{1F4F2}", camel: "\u{1F42B}", camera: "\u{1F4F7}", camera_flash: "\u{1F4F8}", camping: "\u{1F3D5}", cancer: "\u264B\uFE0F", candle: "\u{1F56F}", candy: "\u{1F36C}", canoe: "\u{1F6F6}", capital_abcd: "\u{1F520}", capricorn: "\u2651\uFE0F", car: "\u{1F697}", card_file_box: "\u{1F5C3}", card_index: "\u{1F4C7}", card_index_dividers: "\u{1F5C2}", carousel_horse: "\u{1F3A0}", carrot: "\u{1F955}", cat: "\u{1F431}", cat2: "\u{1F408}", cd: "\u{1F4BF}", chains: "\u26D3", champagne: "\u{1F37E}", chart: "\u{1F4B9}", chart_with_downwards_trend: "\u{1F4C9}", chart_with_upwards_trend: "\u{1F4C8}", checkered_flag: "\u{1F3C1}", cheese: "\u{1F9C0}", cherries: "\u{1F352}", cherry_blossom: "\u{1F338}", chestnut: "\u{1F330}", chicken: "\u{1F414}", children_crossing: "\u{1F6B8}", chipmunk: "\u{1F43F}", chocolate_bar: "\u{1F36B}", christmas_tree: "\u{1F384}", church: "\u26EA\uFE0F", cinema: "\u{1F3A6}", circus_tent: "\u{1F3AA}", city_sunrise: "\u{1F307}", city_sunset: "\u{1F306}", cityscape: "\u{1F3D9}", cl: "\u{1F191}", clamp: "\u{1F5DC}", clap: "\u{1F44F}", clapper: "\u{1F3AC}", classical_building: "\u{1F3DB}", clinking_glasses: "\u{1F942}", clipboard: "\u{1F4CB}", clock1: "\u{1F550}", clock10: "\u{1F559}", clock1030: "\u{1F565}", clock11: "\u{1F55A}", clock1130: "\u{1F566}", clock12: "\u{1F55B}", clock1230: "\u{1F567}", clock130: "\u{1F55C}", clock2: "\u{1F551}", clock230: "\u{1F55D}", clock3: "\u{1F552}", clock330: "\u{1F55E}", clock4: "\u{1F553}", clock430: "\u{1F55F}", clock5: "\u{1F554}", clock530: "\u{1F560}", clock6: "\u{1F555}", clock630: "\u{1F561}", clock7: "\u{1F556}", clock730: "\u{1F562}", clock8: "\u{1F557}", clock830: "\u{1F563}", clock9: "\u{1F558}", clock930: "\u{1F564}", closed_book: "\u{1F4D5}", closed_lock_with_key: "\u{1F510}", closed_umbrella: "\u{1F302}", cloud: "\u2601\uFE0F", cloud_with_lightning: "\u{1F329}", cloud_with_lightning_and_rain: "\u26C8", cloud_with_rain: "\u{1F327}", cloud_with_snow: "\u{1F328}", clown_face: "\u{1F921}", clubs: "\u2663\uFE0F", cocktail: "\u{1F378}", coffee: "\u2615\uFE0F", coffin: "\u26B0\uFE0F", cold_sweat: "\u{1F630}", comet: "\u2604\uFE0F", computer: "\u{1F4BB}", computer_mouse: "\u{1F5B1}", confetti_ball: "\u{1F38A}", confounded: "\u{1F616}", confused: "\u{1F615}", congratulations: "\u3297\uFE0F", construction: "\u{1F6A7}", construction_worker_man: "\u{1F477}", construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F", control_knobs: "\u{1F39B}", convenience_store: "\u{1F3EA}", cookie: "\u{1F36A}", cool: "\u{1F192}", policeman: "\u{1F46E}", copyright: "\xA9\uFE0F", corn: "\u{1F33D}", couch_and_lamp: "\u{1F6CB}", couple: "\u{1F46B}", couple_with_heart_woman_man: "\u{1F491}", couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}", couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}", couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}", couplekiss_man_woman: "\u{1F48F}", couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}", cow: "\u{1F42E}", cow2: "\u{1F404}", cowboy_hat_face: "\u{1F920}", crab: "\u{1F980}", crayon: "\u{1F58D}", credit_card: "\u{1F4B3}", crescent_moon: "\u{1F319}", cricket: "\u{1F3CF}", crocodile: "\u{1F40A}", croissant: "\u{1F950}", crossed_fingers: "\u{1F91E}", crossed_flags: "\u{1F38C}", crossed_swords: "\u2694\uFE0F", crown: "\u{1F451}", cry: "\u{1F622}", crying_cat_face: "\u{1F63F}", crystal_ball: "\u{1F52E}", cucumber: "\u{1F952}", cupid: "\u{1F498}", curly_loop: "\u27B0", currency_exchange: "\u{1F4B1}", curry: "\u{1F35B}", custard: "\u{1F36E}", customs: "\u{1F6C3}", cyclone: "\u{1F300}", dagger: "\u{1F5E1}", dancer: "\u{1F483}", dancing_women: "\u{1F46F}", dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F", dango: "\u{1F361}", dark_sunglasses: "\u{1F576}", dart: "\u{1F3AF}", dash: "\u{1F4A8}", date: "\u{1F4C5}", deciduous_tree: "\u{1F333}", deer: "\u{1F98C}", department_store: "\u{1F3EC}", derelict_house: "\u{1F3DA}", desert: "\u{1F3DC}", desert_island: "\u{1F3DD}", desktop_computer: "\u{1F5A5}", male_detective: "\u{1F575}\uFE0F", diamond_shape_with_a_dot_inside: "\u{1F4A0}", diamonds: "\u2666\uFE0F", disappointed: "\u{1F61E}", disappointed_relieved: "\u{1F625}", dizzy: "\u{1F4AB}", dizzy_face: "\u{1F635}", do_not_litter: "\u{1F6AF}", dog: "\u{1F436}", dog2: "\u{1F415}", dollar: "\u{1F4B5}", dolls: "\u{1F38E}", dolphin: "\u{1F42C}", door: "\u{1F6AA}", doughnut: "\u{1F369}", dove: "\u{1F54A}", dragon: "\u{1F409}", dragon_face: "\u{1F432}", dress: "\u{1F457}", dromedary_camel: "\u{1F42A}", drooling_face: "\u{1F924}", droplet: "\u{1F4A7}", drum: "\u{1F941}", duck: "\u{1F986}", dvd: "\u{1F4C0}", "e-mail": "\u{1F4E7}", eagle: "\u{1F985}", ear: "\u{1F442}", ear_of_rice: "\u{1F33E}", earth_africa: "\u{1F30D}", earth_americas: "\u{1F30E}", earth_asia: "\u{1F30F}", egg: "\u{1F95A}", eggplant: "\u{1F346}", eight_pointed_black_star: "\u2734\uFE0F", eight_spoked_asterisk: "\u2733\uFE0F", electric_plug: "\u{1F50C}", elephant: "\u{1F418}", email: "\u2709\uFE0F", end: "\u{1F51A}", envelope_with_arrow: "\u{1F4E9}", euro: "\u{1F4B6}", european_castle: "\u{1F3F0}", european_post_office: "\u{1F3E4}", evergreen_tree: "\u{1F332}", exclamation: "\u2757\uFE0F", expressionless: "\u{1F611}", eye: "\u{1F441}", eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}", eyeglasses: "\u{1F453}", eyes: "\u{1F440}", face_with_head_bandage: "\u{1F915}", face_with_thermometer: "\u{1F912}", fist_oncoming: "\u{1F44A}", factory: "\u{1F3ED}", fallen_leaf: "\u{1F342}", family_man_woman_boy: "\u{1F46A}", family_man_boy: "\u{1F468}&zwj;\u{1F466}", family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_girl: "\u{1F468}&zwj;\u{1F467}", family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}", family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}", family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}", family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_boy: "\u{1F469}&zwj;\u{1F466}", family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_girl: "\u{1F469}&zwj;\u{1F467}", family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}", family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}", family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", fast_forward: "\u23E9", fax: "\u{1F4E0}", fearful: "\u{1F628}", feet: "\u{1F43E}", female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F", ferris_wheel: "\u{1F3A1}", ferry: "\u26F4", field_hockey: "\u{1F3D1}", file_cabinet: "\u{1F5C4}", file_folder: "\u{1F4C1}", film_projector: "\u{1F4FD}", film_strip: "\u{1F39E}", fire: "\u{1F525}", fire_engine: "\u{1F692}", fireworks: "\u{1F386}", first_quarter_moon: "\u{1F313}", first_quarter_moon_with_face: "\u{1F31B}", fish: "\u{1F41F}", fish_cake: "\u{1F365}", fishing_pole_and_fish: "\u{1F3A3}", fist_raised: "\u270A", fist_left: "\u{1F91B}", fist_right: "\u{1F91C}", flags: "\u{1F38F}", flashlight: "\u{1F526}", fleur_de_lis: "\u269C\uFE0F", flight_arrival: "\u{1F6EC}", flight_departure: "\u{1F6EB}", floppy_disk: "\u{1F4BE}", flower_playing_cards: "\u{1F3B4}", flushed: "\u{1F633}", fog: "\u{1F32B}", foggy: "\u{1F301}", football: "\u{1F3C8}", footprints: "\u{1F463}", fork_and_knife: "\u{1F374}", fountain: "\u26F2\uFE0F", fountain_pen: "\u{1F58B}", four_leaf_clover: "\u{1F340}", fox_face: "\u{1F98A}", framed_picture: "\u{1F5BC}", free: "\u{1F193}", fried_egg: "\u{1F373}", fried_shrimp: "\u{1F364}", fries: "\u{1F35F}", frog: "\u{1F438}", frowning: "\u{1F626}", frowning_face: "\u2639\uFE0F", frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F", frowning_woman: "\u{1F64D}", middle_finger: "\u{1F595}", fuelpump: "\u26FD\uFE0F", full_moon: "\u{1F315}", full_moon_with_face: "\u{1F31D}", funeral_urn: "\u26B1\uFE0F", game_die: "\u{1F3B2}", gear: "\u2699\uFE0F", gem: "\u{1F48E}", gemini: "\u264A\uFE0F", ghost: "\u{1F47B}", gift: "\u{1F381}", gift_heart: "\u{1F49D}", girl: "\u{1F467}", globe_with_meridians: "\u{1F310}", goal_net: "\u{1F945}", goat: "\u{1F410}", golf: "\u26F3\uFE0F", golfing_man: "\u{1F3CC}\uFE0F", golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F", gorilla: "\u{1F98D}", grapes: "\u{1F347}", green_apple: "\u{1F34F}", green_book: "\u{1F4D7}", green_heart: "\u{1F49A}", green_salad: "\u{1F957}", grey_exclamation: "\u2755", grey_question: "\u2754", grimacing: "\u{1F62C}", grin: "\u{1F601}", grinning: "\u{1F600}", guardsman: "\u{1F482}", guardswoman: "\u{1F482}&zwj;\u2640\uFE0F", guitar: "\u{1F3B8}", gun: "\u{1F52B}", haircut_woman: "\u{1F487}", haircut_man: "\u{1F487}&zwj;\u2642\uFE0F", hamburger: "\u{1F354}", hammer: "\u{1F528}", hammer_and_pick: "\u2692", hammer_and_wrench: "\u{1F6E0}", hamster: "\u{1F439}", hand: "\u270B", handbag: "\u{1F45C}", handshake: "\u{1F91D}", hankey: "\u{1F4A9}", hatched_chick: "\u{1F425}", hatching_chick: "\u{1F423}", headphones: "\u{1F3A7}", hear_no_evil: "\u{1F649}", heart: "\u2764\uFE0F", heart_decoration: "\u{1F49F}", heart_eyes: "\u{1F60D}", heart_eyes_cat: "\u{1F63B}", heartbeat: "\u{1F493}", heartpulse: "\u{1F497}", hearts: "\u2665\uFE0F", heavy_check_mark: "\u2714\uFE0F", heavy_division_sign: "\u2797", heavy_dollar_sign: "\u{1F4B2}", heavy_heart_exclamation: "\u2763\uFE0F", heavy_minus_sign: "\u2796", heavy_multiplication_x: "\u2716\uFE0F", heavy_plus_sign: "\u2795", helicopter: "\u{1F681}", herb: "\u{1F33F}", hibiscus: "\u{1F33A}", high_brightness: "\u{1F506}", high_heel: "\u{1F460}", hocho: "\u{1F52A}", hole: "\u{1F573}", honey_pot: "\u{1F36F}", horse: "\u{1F434}", horse_racing: "\u{1F3C7}", hospital: "\u{1F3E5}", hot_pepper: "\u{1F336}", hotdog: "\u{1F32D}", hotel: "\u{1F3E8}", hotsprings: "\u2668\uFE0F", hourglass: "\u231B\uFE0F", hourglass_flowing_sand: "\u23F3", house: "\u{1F3E0}", house_with_garden: "\u{1F3E1}", houses: "\u{1F3D8}", hugs: "\u{1F917}", hushed: "\u{1F62F}", ice_cream: "\u{1F368}", ice_hockey: "\u{1F3D2}", ice_skate: "\u26F8", icecream: "\u{1F366}", id: "\u{1F194}", ideograph_advantage: "\u{1F250}", imp: "\u{1F47F}", inbox_tray: "\u{1F4E5}", incoming_envelope: "\u{1F4E8}", tipping_hand_woman: "\u{1F481}", information_source: "\u2139\uFE0F", innocent: "\u{1F607}", interrobang: "\u2049\uFE0F", iphone: "\u{1F4F1}", izakaya_lantern: "\u{1F3EE}", jack_o_lantern: "\u{1F383}", japan: "\u{1F5FE}", japanese_castle: "\u{1F3EF}", japanese_goblin: "\u{1F47A}", japanese_ogre: "\u{1F479}", jeans: "\u{1F456}", joy: "\u{1F602}", joy_cat: "\u{1F639}", joystick: "\u{1F579}", kaaba: "\u{1F54B}", key: "\u{1F511}", keyboard: "\u2328\uFE0F", keycap_ten: "\u{1F51F}", kick_scooter: "\u{1F6F4}", kimono: "\u{1F458}", kiss: "\u{1F48B}", kissing: "\u{1F617}", kissing_cat: "\u{1F63D}", kissing_closed_eyes: "\u{1F61A}", kissing_heart: "\u{1F618}", kissing_smiling_eyes: "\u{1F619}", kiwi_fruit: "\u{1F95D}", koala: "\u{1F428}", koko: "\u{1F201}", label: "\u{1F3F7}", large_blue_circle: "\u{1F535}", large_blue_diamond: "\u{1F537}", large_orange_diamond: "\u{1F536}", last_quarter_moon: "\u{1F317}", last_quarter_moon_with_face: "\u{1F31C}", latin_cross: "\u271D\uFE0F", laughing: "\u{1F606}", leaves: "\u{1F343}", ledger: "\u{1F4D2}", left_luggage: "\u{1F6C5}", left_right_arrow: "\u2194\uFE0F", leftwards_arrow_with_hook: "\u21A9\uFE0F", lemon: "\u{1F34B}", leo: "\u264C\uFE0F", leopard: "\u{1F406}", level_slider: "\u{1F39A}", libra: "\u264E\uFE0F", light_rail: "\u{1F688}", link: "\u{1F517}", lion: "\u{1F981}", lips: "\u{1F444}", lipstick: "\u{1F484}", lizard: "\u{1F98E}", lock: "\u{1F512}", lock_with_ink_pen: "\u{1F50F}", lollipop: "\u{1F36D}", loop: "\u27BF", loud_sound: "\u{1F50A}", loudspeaker: "\u{1F4E2}", love_hotel: "\u{1F3E9}", love_letter: "\u{1F48C}", low_brightness: "\u{1F505}", lying_face: "\u{1F925}", m: "\u24C2\uFE0F", mag: "\u{1F50D}", mag_right: "\u{1F50E}", mahjong: "\u{1F004}\uFE0F", mailbox: "\u{1F4EB}", mailbox_closed: "\u{1F4EA}", mailbox_with_mail: "\u{1F4EC}", mailbox_with_no_mail: "\u{1F4ED}", man: "\u{1F468}", man_artist: "\u{1F468}&zwj;\u{1F3A8}", man_astronaut: "\u{1F468}&zwj;\u{1F680}", man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F", man_cook: "\u{1F468}&zwj;\u{1F373}", man_dancing: "\u{1F57A}", man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F", man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}", man_farmer: "\u{1F468}&zwj;\u{1F33E}", man_firefighter: "\u{1F468}&zwj;\u{1F692}", man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F", man_in_tuxedo: "\u{1F935}", man_judge: "\u{1F468}&zwj;\u2696\uFE0F", man_juggling: "\u{1F939}&zwj;\u2642\uFE0F", man_mechanic: "\u{1F468}&zwj;\u{1F527}", man_office_worker: "\u{1F468}&zwj;\u{1F4BC}", man_pilot: "\u{1F468}&zwj;\u2708\uFE0F", man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F", man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F", man_scientist: "\u{1F468}&zwj;\u{1F52C}", man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F", man_singer: "\u{1F468}&zwj;\u{1F3A4}", man_student: "\u{1F468}&zwj;\u{1F393}", man_teacher: "\u{1F468}&zwj;\u{1F3EB}", man_technologist: "\u{1F468}&zwj;\u{1F4BB}", man_with_gua_pi_mao: "\u{1F472}", man_with_turban: "\u{1F473}", tangerine: "\u{1F34A}", mans_shoe: "\u{1F45E}", mantelpiece_clock: "\u{1F570}", maple_leaf: "\u{1F341}", martial_arts_uniform: "\u{1F94B}", mask: "\u{1F637}", massage_woman: "\u{1F486}", massage_man: "\u{1F486}&zwj;\u2642\uFE0F", meat_on_bone: "\u{1F356}", medal_military: "\u{1F396}", medal_sports: "\u{1F3C5}", mega: "\u{1F4E3}", melon: "\u{1F348}", memo: "\u{1F4DD}", men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F", menorah: "\u{1F54E}", mens: "\u{1F6B9}", metal: "\u{1F918}", metro: "\u{1F687}", microphone: "\u{1F3A4}", microscope: "\u{1F52C}", milk_glass: "\u{1F95B}", milky_way: "\u{1F30C}", minibus: "\u{1F690}", minidisc: "\u{1F4BD}", mobile_phone_off: "\u{1F4F4}", money_mouth_face: "\u{1F911}", money_with_wings: "\u{1F4B8}", moneybag: "\u{1F4B0}", monkey: "\u{1F412}", monkey_face: "\u{1F435}", monorail: "\u{1F69D}", moon: "\u{1F314}", mortar_board: "\u{1F393}", mosque: "\u{1F54C}", motor_boat: "\u{1F6E5}", motor_scooter: "\u{1F6F5}", motorcycle: "\u{1F3CD}", motorway: "\u{1F6E3}", mount_fuji: "\u{1F5FB}", mountain: "\u26F0", mountain_biking_man: "\u{1F6B5}", mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F", mountain_cableway: "\u{1F6A0}", mountain_railway: "\u{1F69E}", mountain_snow: "\u{1F3D4}", mouse: "\u{1F42D}", mouse2: "\u{1F401}", movie_camera: "\u{1F3A5}", moyai: "\u{1F5FF}", mrs_claus: "\u{1F936}", muscle: "\u{1F4AA}", mushroom: "\u{1F344}", musical_keyboard: "\u{1F3B9}", musical_note: "\u{1F3B5}", musical_score: "\u{1F3BC}", mute: "\u{1F507}", nail_care: "\u{1F485}", name_badge: "\u{1F4DB}", national_park: "\u{1F3DE}", nauseated_face: "\u{1F922}", necktie: "\u{1F454}", negative_squared_cross_mark: "\u274E", nerd_face: "\u{1F913}", neutral_face: "\u{1F610}", new: "\u{1F195}", new_moon: "\u{1F311}", new_moon_with_face: "\u{1F31A}", newspaper: "\u{1F4F0}", newspaper_roll: "\u{1F5DE}", next_track_button: "\u23ED", ng: "\u{1F196}", no_good_man: "\u{1F645}&zwj;\u2642\uFE0F", no_good_woman: "\u{1F645}", night_with_stars: "\u{1F303}", no_bell: "\u{1F515}", no_bicycles: "\u{1F6B3}", no_entry: "\u26D4\uFE0F", no_entry_sign: "\u{1F6AB}", no_mobile_phones: "\u{1F4F5}", no_mouth: "\u{1F636}", no_pedestrians: "\u{1F6B7}", no_smoking: "\u{1F6AD}", "non-potable_water": "\u{1F6B1}", nose: "\u{1F443}", notebook: "\u{1F4D3}", notebook_with_decorative_cover: "\u{1F4D4}", notes: "\u{1F3B6}", nut_and_bolt: "\u{1F529}", o: "\u2B55\uFE0F", o2: "\u{1F17E}\uFE0F", ocean: "\u{1F30A}", octopus: "\u{1F419}", oden: "\u{1F362}", office: "\u{1F3E2}", oil_drum: "\u{1F6E2}", ok: "\u{1F197}", ok_hand: "\u{1F44C}", ok_man: "\u{1F646}&zwj;\u2642\uFE0F", ok_woman: "\u{1F646}", old_key: "\u{1F5DD}", older_man: "\u{1F474}", older_woman: "\u{1F475}", om: "\u{1F549}", on: "\u{1F51B}", oncoming_automobile: "\u{1F698}", oncoming_bus: "\u{1F68D}", oncoming_police_car: "\u{1F694}", oncoming_taxi: "\u{1F696}", open_file_folder: "\u{1F4C2}", open_hands: "\u{1F450}", open_mouth: "\u{1F62E}", open_umbrella: "\u2602\uFE0F", ophiuchus: "\u26CE", orange_book: "\u{1F4D9}", orthodox_cross: "\u2626\uFE0F", outbox_tray: "\u{1F4E4}", owl: "\u{1F989}", ox: "\u{1F402}", package: "\u{1F4E6}", page_facing_up: "\u{1F4C4}", page_with_curl: "\u{1F4C3}", pager: "\u{1F4DF}", paintbrush: "\u{1F58C}", palm_tree: "\u{1F334}", pancakes: "\u{1F95E}", panda_face: "\u{1F43C}", paperclip: "\u{1F4CE}", paperclips: "\u{1F587}", parasol_on_ground: "\u26F1", parking: "\u{1F17F}\uFE0F", part_alternation_mark: "\u303D\uFE0F", partly_sunny: "\u26C5\uFE0F", passenger_ship: "\u{1F6F3}", passport_control: "\u{1F6C2}", pause_button: "\u23F8", peace_symbol: "\u262E\uFE0F", peach: "\u{1F351}", peanuts: "\u{1F95C}", pear: "\u{1F350}", pen: "\u{1F58A}", pencil2: "\u270F\uFE0F", penguin: "\u{1F427}", pensive: "\u{1F614}", performing_arts: "\u{1F3AD}", persevere: "\u{1F623}", person_fencing: "\u{1F93A}", pouting_woman: "\u{1F64E}", phone: "\u260E\uFE0F", pick: "\u26CF", pig: "\u{1F437}", pig2: "\u{1F416}", pig_nose: "\u{1F43D}", pill: "\u{1F48A}", pineapple: "\u{1F34D}", ping_pong: "\u{1F3D3}", pisces: "\u2653\uFE0F", pizza: "\u{1F355}", place_of_worship: "\u{1F6D0}", plate_with_cutlery: "\u{1F37D}", play_or_pause_button: "\u23EF", point_down: "\u{1F447}", point_left: "\u{1F448}", point_right: "\u{1F449}", point_up: "\u261D\uFE0F", point_up_2: "\u{1F446}", police_car: "\u{1F693}", policewoman: "\u{1F46E}&zwj;\u2640\uFE0F", poodle: "\u{1F429}", popcorn: "\u{1F37F}", post_office: "\u{1F3E3}", postal_horn: "\u{1F4EF}", postbox: "\u{1F4EE}", potable_water: "\u{1F6B0}", potato: "\u{1F954}", pouch: "\u{1F45D}", poultry_leg: "\u{1F357}", pound: "\u{1F4B7}", rage: "\u{1F621}", pouting_cat: "\u{1F63E}", pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F", pray: "\u{1F64F}", prayer_beads: "\u{1F4FF}", pregnant_woman: "\u{1F930}", previous_track_button: "\u23EE", prince: "\u{1F934}", princess: "\u{1F478}", printer: "\u{1F5A8}", purple_heart: "\u{1F49C}", purse: "\u{1F45B}", pushpin: "\u{1F4CC}", put_litter_in_its_place: "\u{1F6AE}", question: "\u2753", rabbit: "\u{1F430}", rabbit2: "\u{1F407}", racehorse: "\u{1F40E}", racing_car: "\u{1F3CE}", radio: "\u{1F4FB}", radio_button: "\u{1F518}", radioactive: "\u2622\uFE0F", railway_car: "\u{1F683}", railway_track: "\u{1F6E4}", rainbow: "\u{1F308}", rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}", raised_back_of_hand: "\u{1F91A}", raised_hand_with_fingers_splayed: "\u{1F590}", raised_hands: "\u{1F64C}", raising_hand_woman: "\u{1F64B}", raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F", ram: "\u{1F40F}", ramen: "\u{1F35C}", rat: "\u{1F400}", record_button: "\u23FA", recycle: "\u267B\uFE0F", red_circle: "\u{1F534}", registered: "\xAE\uFE0F", relaxed: "\u263A\uFE0F", relieved: "\u{1F60C}", reminder_ribbon: "\u{1F397}", repeat: "\u{1F501}", repeat_one: "\u{1F502}", rescue_worker_helmet: "\u26D1", restroom: "\u{1F6BB}", revolving_hearts: "\u{1F49E}", rewind: "\u23EA", rhinoceros: "\u{1F98F}", ribbon: "\u{1F380}", rice: "\u{1F35A}", rice_ball: "\u{1F359}", rice_cracker: "\u{1F358}", rice_scene: "\u{1F391}", right_anger_bubble: "\u{1F5EF}", ring: "\u{1F48D}", robot: "\u{1F916}", rocket: "\u{1F680}", rofl: "\u{1F923}", roll_eyes: "\u{1F644}", roller_coaster: "\u{1F3A2}", rooster: "\u{1F413}", rose: "\u{1F339}", rosette: "\u{1F3F5}", rotating_light: "\u{1F6A8}", round_pushpin: "\u{1F4CD}", rowing_man: "\u{1F6A3}", rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F", rugby_football: "\u{1F3C9}", running_man: "\u{1F3C3}", running_shirt_with_sash: "\u{1F3BD}", running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F", sa: "\u{1F202}\uFE0F", sagittarius: "\u2650\uFE0F", sake: "\u{1F376}", sandal: "\u{1F461}", santa: "\u{1F385}", satellite: "\u{1F4E1}", saxophone: "\u{1F3B7}", school: "\u{1F3EB}", school_satchel: "\u{1F392}", scissors: "\u2702\uFE0F", scorpion: "\u{1F982}", scorpius: "\u264F\uFE0F", scream: "\u{1F631}", scream_cat: "\u{1F640}", scroll: "\u{1F4DC}", seat: "\u{1F4BA}", secret: "\u3299\uFE0F", see_no_evil: "\u{1F648}", seedling: "\u{1F331}", selfie: "\u{1F933}", shallow_pan_of_food: "\u{1F958}", shamrock: "\u2618\uFE0F", shark: "\u{1F988}", shaved_ice: "\u{1F367}", sheep: "\u{1F411}", shell: "\u{1F41A}", shield: "\u{1F6E1}", shinto_shrine: "\u26E9", ship: "\u{1F6A2}", shirt: "\u{1F455}", shopping: "\u{1F6CD}", shopping_cart: "\u{1F6D2}", shower: "\u{1F6BF}", shrimp: "\u{1F990}", signal_strength: "\u{1F4F6}", six_pointed_star: "\u{1F52F}", ski: "\u{1F3BF}", skier: "\u26F7", skull: "\u{1F480}", skull_and_crossbones: "\u2620\uFE0F", sleeping: "\u{1F634}", sleeping_bed: "\u{1F6CC}", sleepy: "\u{1F62A}", slightly_frowning_face: "\u{1F641}", slightly_smiling_face: "\u{1F642}", slot_machine: "\u{1F3B0}", small_airplane: "\u{1F6E9}", small_blue_diamond: "\u{1F539}", small_orange_diamond: "\u{1F538}", small_red_triangle: "\u{1F53A}", small_red_triangle_down: "\u{1F53B}", smile: "\u{1F604}", smile_cat: "\u{1F638}", smiley: "\u{1F603}", smiley_cat: "\u{1F63A}", smiling_imp: "\u{1F608}", smirk: "\u{1F60F}", smirk_cat: "\u{1F63C}", smoking: "\u{1F6AC}", snail: "\u{1F40C}", snake: "\u{1F40D}", sneezing_face: "\u{1F927}", snowboarder: "\u{1F3C2}", snowflake: "\u2744\uFE0F", snowman: "\u26C4\uFE0F", snowman_with_snow: "\u2603\uFE0F", sob: "\u{1F62D}", soccer: "\u26BD\uFE0F", soon: "\u{1F51C}", sos: "\u{1F198}", sound: "\u{1F509}", space_invader: "\u{1F47E}", spades: "\u2660\uFE0F", spaghetti: "\u{1F35D}", sparkle: "\u2747\uFE0F", sparkler: "\u{1F387}", sparkles: "\u2728", sparkling_heart: "\u{1F496}", speak_no_evil: "\u{1F64A}", speaker: "\u{1F508}", speaking_head: "\u{1F5E3}", speech_balloon: "\u{1F4AC}", speedboat: "\u{1F6A4}", spider: "\u{1F577}", spider_web: "\u{1F578}", spiral_calendar: "\u{1F5D3}", spiral_notepad: "\u{1F5D2}", spoon: "\u{1F944}", squid: "\u{1F991}", stadium: "\u{1F3DF}", star: "\u2B50\uFE0F", star2: "\u{1F31F}", star_and_crescent: "\u262A\uFE0F", star_of_david: "\u2721\uFE0F", stars: "\u{1F320}", station: "\u{1F689}", statue_of_liberty: "\u{1F5FD}", steam_locomotive: "\u{1F682}", stew: "\u{1F372}", stop_button: "\u23F9", stop_sign: "\u{1F6D1}", stopwatch: "\u23F1", straight_ruler: "\u{1F4CF}", strawberry: "\u{1F353}", stuck_out_tongue: "\u{1F61B}", stuck_out_tongue_closed_eyes: "\u{1F61D}", stuck_out_tongue_winking_eye: "\u{1F61C}", studio_microphone: "\u{1F399}", stuffed_flatbread: "\u{1F959}", sun_behind_large_cloud: "\u{1F325}", sun_behind_rain_cloud: "\u{1F326}", sun_behind_small_cloud: "\u{1F324}", sun_with_face: "\u{1F31E}", sunflower: "\u{1F33B}", sunglasses: "\u{1F60E}", sunny: "\u2600\uFE0F", sunrise: "\u{1F305}", sunrise_over_mountains: "\u{1F304}", surfing_man: "\u{1F3C4}", surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F", sushi: "\u{1F363}", suspension_railway: "\u{1F69F}", sweat: "\u{1F613}", sweat_drops: "\u{1F4A6}", sweat_smile: "\u{1F605}", sweet_potato: "\u{1F360}", swimming_man: "\u{1F3CA}", swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F", symbols: "\u{1F523}", synagogue: "\u{1F54D}", syringe: "\u{1F489}", taco: "\u{1F32E}", tada: "\u{1F389}", tanabata_tree: "\u{1F38B}", taurus: "\u2649\uFE0F", taxi: "\u{1F695}", tea: "\u{1F375}", telephone_receiver: "\u{1F4DE}", telescope: "\u{1F52D}", tennis: "\u{1F3BE}", tent: "\u26FA\uFE0F", thermometer: "\u{1F321}", thinking: "\u{1F914}", thought_balloon: "\u{1F4AD}", ticket: "\u{1F3AB}", tickets: "\u{1F39F}", tiger: "\u{1F42F}", tiger2: "\u{1F405}", timer_clock: "\u23F2", tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F", tired_face: "\u{1F62B}", tm: "\u2122\uFE0F", toilet: "\u{1F6BD}", tokyo_tower: "\u{1F5FC}", tomato: "\u{1F345}", tongue: "\u{1F445}", top: "\u{1F51D}", tophat: "\u{1F3A9}", tornado: "\u{1F32A}", trackball: "\u{1F5B2}", tractor: "\u{1F69C}", traffic_light: "\u{1F6A5}", train: "\u{1F68B}", train2: "\u{1F686}", tram: "\u{1F68A}", triangular_flag_on_post: "\u{1F6A9}", triangular_ruler: "\u{1F4D0}", trident: "\u{1F531}", triumph: "\u{1F624}", trolleybus: "\u{1F68E}", trophy: "\u{1F3C6}", tropical_drink: "\u{1F379}", tropical_fish: "\u{1F420}", truck: "\u{1F69A}", trumpet: "\u{1F3BA}", tulip: "\u{1F337}", tumbler_glass: "\u{1F943}", turkey: "\u{1F983}", turtle: "\u{1F422}", tv: "\u{1F4FA}", twisted_rightwards_arrows: "\u{1F500}", two_hearts: "\u{1F495}", two_men_holding_hands: "\u{1F46C}", two_women_holding_hands: "\u{1F46D}", u5272: "\u{1F239}", u5408: "\u{1F234}", u55b6: "\u{1F23A}", u6307: "\u{1F22F}\uFE0F", u6708: "\u{1F237}\uFE0F", u6709: "\u{1F236}", u6e80: "\u{1F235}", u7121: "\u{1F21A}\uFE0F", u7533: "\u{1F238}", u7981: "\u{1F232}", u7a7a: "\u{1F233}", umbrella: "\u2614\uFE0F", unamused: "\u{1F612}", underage: "\u{1F51E}", unicorn: "\u{1F984}", unlock: "\u{1F513}", up: "\u{1F199}", upside_down_face: "\u{1F643}", v: "\u270C\uFE0F", vertical_traffic_light: "\u{1F6A6}", vhs: "\u{1F4FC}", vibration_mode: "\u{1F4F3}", video_camera: "\u{1F4F9}", video_game: "\u{1F3AE}", violin: "\u{1F3BB}", virgo: "\u264D\uFE0F", volcano: "\u{1F30B}", volleyball: "\u{1F3D0}", vs: "\u{1F19A}", vulcan_salute: "\u{1F596}", walking_man: "\u{1F6B6}", walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F", waning_crescent_moon: "\u{1F318}", waning_gibbous_moon: "\u{1F316}", warning: "\u26A0\uFE0F", wastebasket: "\u{1F5D1}", watch: "\u231A\uFE0F", water_buffalo: "\u{1F403}", watermelon: "\u{1F349}", wave: "\u{1F44B}", wavy_dash: "\u3030\uFE0F", waxing_crescent_moon: "\u{1F312}", wc: "\u{1F6BE}", weary: "\u{1F629}", wedding: "\u{1F492}", weight_lifting_man: "\u{1F3CB}\uFE0F", weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F", whale: "\u{1F433}", whale2: "\u{1F40B}", wheel_of_dharma: "\u2638\uFE0F", wheelchair: "\u267F\uFE0F", white_check_mark: "\u2705", white_circle: "\u26AA\uFE0F", white_flag: "\u{1F3F3}\uFE0F", white_flower: "\u{1F4AE}", white_large_square: "\u2B1C\uFE0F", white_medium_small_square: "\u25FD\uFE0F", white_medium_square: "\u25FB\uFE0F", white_small_square: "\u25AB\uFE0F", white_square_button: "\u{1F533}", wilted_flower: "\u{1F940}", wind_chime: "\u{1F390}", wind_face: "\u{1F32C}", wine_glass: "\u{1F377}", wink: "\u{1F609}", wolf: "\u{1F43A}", woman: "\u{1F469}", woman_artist: "\u{1F469}&zwj;\u{1F3A8}", woman_astronaut: "\u{1F469}&zwj;\u{1F680}", woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F", woman_cook: "\u{1F469}&zwj;\u{1F373}", woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F", woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}", woman_farmer: "\u{1F469}&zwj;\u{1F33E}", woman_firefighter: "\u{1F469}&zwj;\u{1F692}", woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F", woman_judge: "\u{1F469}&zwj;\u2696\uFE0F", woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F", woman_mechanic: "\u{1F469}&zwj;\u{1F527}", woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}", woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F", woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F", woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F", woman_scientist: "\u{1F469}&zwj;\u{1F52C}", woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F", woman_singer: "\u{1F469}&zwj;\u{1F3A4}", woman_student: "\u{1F469}&zwj;\u{1F393}", woman_teacher: "\u{1F469}&zwj;\u{1F3EB}", woman_technologist: "\u{1F469}&zwj;\u{1F4BB}", woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F", womans_clothes: "\u{1F45A}", womans_hat: "\u{1F452}", women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F", womens: "\u{1F6BA}", world_map: "\u{1F5FA}", worried: "\u{1F61F}", wrench: "\u{1F527}", writing_hand: "\u270D\uFE0F", x: "\u274C", yellow_heart: "\u{1F49B}", yen: "\u{1F4B4}", yin_yang: "\u262F\uFE0F", yum: "\u{1F60B}", zap: "\u26A1\uFE0F", zipper_mouth_face: "\u{1F910}", zzz: "\u{1F4A4}", octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">', showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>` }, r2.Converter = function(e) {
      "use strict";
      var u2 = {}, d = [], a = [], s = {}, i = $2, c = { parsed: {}, raw: "", format: "" };
      t();
      function t() {
        e = e || {};
        for (var n in E)
          E.hasOwnProperty(n) && (u2[n] = E[n]);
        if (typeof e == "object")
          for (var f in e)
            e.hasOwnProperty(f) && (u2[f] = e[f]);
        else
          throw Error("Converter expects the passed parameter to be an object, but " + typeof e + " was passed instead.");
        u2.extensions && r2.helper.forEach(u2.extensions, p);
      }
      function p(n, f) {
        if (f = f || null, r2.helper.isString(n))
          if (n = r2.helper.stdExtName(n), f = n, r2.extensions[n]) {
            console.warn("DEPRECATION WARNING: " + n + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), l(r2.extensions[n], n);
            return;
          } else if (!r2.helper.isUndefined(z[n]))
            n = z[n];
          else
            throw Error('Extension "' + n + '" could not be loaded. It was either not found or is not a valid extension.');
        typeof n == "function" && (n = n()), r2.helper.isArray(n) || (n = [n]);
        var _ = H2(n, f);
        if (!_.valid)
          throw Error(_.error);
        for (var m = 0; m < n.length; ++m) {
          switch (n[m].type) {
            case "lang":
              d.push(n[m]);
              break;
            case "output":
              a.push(n[m]);
              break;
          }
          if (n[m].hasOwnProperty("listeners"))
            for (var w in n[m].listeners)
              n[m].listeners.hasOwnProperty(w) && o(w, n[m].listeners[w]);
        }
      }
      function l(n, f) {
        typeof n == "function" && (n = n(new r2.Converter())), r2.helper.isArray(n) || (n = [n]);
        var _ = H2(n, f);
        if (!_.valid)
          throw Error(_.error);
        for (var m = 0; m < n.length; ++m)
          switch (n[m].type) {
            case "lang":
              d.push(n[m]);
              break;
            case "output":
              a.push(n[m]);
              break;
            default:
              throw Error("Extension loader error: Type unrecognized!!!");
          }
      }
      function o(n, f) {
        if (!r2.helper.isString(n))
          throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof n + " given");
        if (typeof f != "function")
          throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof f + " given");
        s.hasOwnProperty(n) || (s[n] = []), s[n].push(f);
      }
      function h(n) {
        var f = n.match(/^\s*/)[0].length, _ = new RegExp("^\\s{0," + f + "}", "gm");
        return n.replace(_, "");
      }
      this._dispatch = function(f, _, m, w) {
        if (s.hasOwnProperty(f))
          for (var g = 0; g < s[f].length; ++g) {
            var v = s[f][g](f, _, this, m, w);
            v && typeof v < "u" && (_ = v);
          }
        return _;
      }, this.listen = function(n, f) {
        return o(n, f), this;
      }, this.makeHtml = function(n) {
        if (!n)
          return n;
        var f = { gHtmlBlocks: [], gHtmlMdBlocks: [], gHtmlSpans: [], gUrls: {}, gTitles: {}, gDimensions: {}, gListLevel: 0, hashLinkCounts: {}, langExtensions: d, outputModifiers: a, converter: this, ghCodeBlocks: [], metadata: { parsed: {}, raw: "", format: "" } };
        return n = n.replace(/¨/g, "\xA8T"), n = n.replace(/\$/g, "\xA8D"), n = n.replace(/\r\n/g, `
`), n = n.replace(/\r/g, `
`), n = n.replace(/\u00A0/g, "&nbsp;"), u2.smartIndentationFix && (n = h(n)), n = `

` + n + `

`, n = r2.subParser("detab")(n, u2, f), n = n.replace(/^[ \t]+$/mg, ""), r2.helper.forEach(d, function(_) {
          n = r2.subParser("runExtension")(_, n, u2, f);
        }), n = r2.subParser("metadata")(n, u2, f), n = r2.subParser("hashPreCodeTags")(n, u2, f), n = r2.subParser("githubCodeBlocks")(n, u2, f), n = r2.subParser("hashHTMLBlocks")(n, u2, f), n = r2.subParser("hashCodeTags")(n, u2, f), n = r2.subParser("stripLinkDefinitions")(n, u2, f), n = r2.subParser("blockGamut")(n, u2, f), n = r2.subParser("unhashHTMLSpans")(n, u2, f), n = r2.subParser("unescapeSpecialChars")(n, u2, f), n = n.replace(/¨D/g, "$$"), n = n.replace(/¨T/g, "\xA8"), n = r2.subParser("completeHTMLDocument")(n, u2, f), r2.helper.forEach(a, function(_) {
          n = r2.subParser("runExtension")(_, n, u2, f);
        }), c = f.metadata, n;
      }, this.makeMarkdown = this.makeMd = function(n, f) {
        if (n = n.replace(/\r\n/g, `
`), n = n.replace(/\r/g, `
`), n = n.replace(/>[ \t]+</, ">\xA8NBSP;<"), !f)
          if (globalThis && globalThis.document)
            f = globalThis.document;
          else
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
        var _ = f.createElement("div");
        _.innerHTML = n;
        var m = { preList: S2(_) };
        j2(_);
        for (var w = _.childNodes, g = "", v = 0; v < w.length; v++)
          g += r2.subParser("makeMarkdown.node")(w[v], m);
        function j2(k2) {
          for (var P2 = 0; P2 < k2.childNodes.length; ++P2) {
            var C2 = k2.childNodes[P2];
            C2.nodeType === 3 ? !/\S/.test(C2.nodeValue) && !/^[ ]+$/.test(C2.nodeValue) ? (k2.removeChild(C2), --P2) : (C2.nodeValue = C2.nodeValue.split(`
`).join(" "), C2.nodeValue = C2.nodeValue.replace(/(\s)+/g, "$1")) : C2.nodeType === 1 && j2(C2);
          }
        }
        function S2(k2) {
          for (var P2 = k2.querySelectorAll("pre"), C2 = [], M2 = 0; M2 < P2.length; ++M2)
            if (P2[M2].childElementCount === 1 && P2[M2].firstChild.tagName.toLowerCase() === "code") {
              var I2 = P2[M2].firstChild.innerHTML.trim(), N2 = P2[M2].firstChild.getAttribute("data-language") || "";
              if (N2 === "")
                for (var q = P2[M2].firstChild.className.split(" "), V2 = 0; V2 < q.length; ++V2) {
                  var G2 = q[V2].match(/^language-(.+)$/);
                  if (G2 !== null) {
                    N2 = G2[1];
                    break;
                  }
                }
              I2 = r2.helper.unescapeHTMLEntities(I2), C2.push(I2), P2[M2].outerHTML = '<precode language="' + N2 + '" precodenum="' + M2.toString() + '"></precode>';
            } else
              C2.push(P2[M2].innerHTML), P2[M2].innerHTML = "", P2[M2].setAttribute("prenum", M2.toString());
          return C2;
        }
        return g;
      }, this.setOption = function(n, f) {
        u2[n] = f;
      }, this.getOption = function(n) {
        return u2[n];
      }, this.getOptions = function() {
        return u2;
      }, this.addExtension = function(n, f) {
        f = f || null, p(n, f);
      }, this.useExtension = function(n) {
        p(n);
      }, this.setFlavor = function(n) {
        if (!L2.hasOwnProperty(n))
          throw Error(n + " flavor was not found");
        var f = L2[n];
        i = n;
        for (var _ in f)
          f.hasOwnProperty(_) && (u2[_] = f[_]);
      }, this.getFlavor = function() {
        return i;
      }, this.removeExtension = function(n) {
        r2.helper.isArray(n) || (n = [n]);
        for (var f = 0; f < n.length; ++f) {
          for (var _ = n[f], m = 0; m < d.length; ++m)
            d[m] === _ && d.splice(m, 1);
          for (var w = 0; w < a.length; ++w)
            a[w] === _ && a.splice(w, 1);
        }
      }, this.getAllExtensions = function() {
        return { language: d, output: a };
      }, this.getMetadata = function(n) {
        return n ? c.raw : c.parsed;
      }, this.getMetadataFormat = function() {
        return c.format;
      }, this._setMetadataPair = function(n, f) {
        c.parsed[n] = f;
      }, this._setMetadataFormat = function(n) {
        c.format = n;
      }, this._setMetadataRaw = function(n) {
        c.raw = n;
      };
    }, r2.subParser("anchors", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("anchors.before", e, u2, d);
      var a = function(s, i, c, t, p, l, o) {
        if (r2.helper.isUndefined(o) && (o = ""), c = c.toLowerCase(), s.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          t = "";
        else if (!t)
          if (c || (c = i.toLowerCase().replace(/ ?\n/g, " ")), t = "#" + c, !r2.helper.isUndefined(d.gUrls[c]))
            t = d.gUrls[c], r2.helper.isUndefined(d.gTitles[c]) || (o = d.gTitles[c]);
          else
            return s;
        t = t.replace(r2.helper.regexes.asteriskDashAndColon, r2.helper.escapeCharactersCallback);
        var h = '<a href="' + t + '"';
        return o !== "" && o !== null && (o = o.replace(/"/g, "&quot;"), o = o.replace(r2.helper.regexes.asteriskDashAndColon, r2.helper.escapeCharactersCallback), h += ' title="' + o + '"'), u2.openLinksInNewWindow && !/^#/.test(t) && (h += ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h += ">" + i + "</a>", h;
      };
      return e = e.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, a), e = e.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a), e = e.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a), e = e.replace(/\[([^\[\]]+)]()()()()()/g, a), u2.ghMentions && (e = e.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(s, i, c, t, p) {
        if (c === "\\")
          return i + t;
        if (!r2.helper.isString(u2.ghMentionsLink))
          throw new Error("ghMentionsLink option must be a string");
        var l = u2.ghMentionsLink.replace(/\{u}/g, p), o = "";
        return u2.openLinksInNewWindow && (o = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), i + '<a href="' + l + '"' + o + ">" + t + "</a>";
      })), e = d.converter._dispatch("anchors.after", e, u2, d), e;
    });
    var Z2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, Q2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, X = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, J2 = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, Y2 = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, R2 = function(e) {
      "use strict";
      return function(u2, d, a, s, i, c, t) {
        a = a.replace(r2.helper.regexes.asteriskDashAndColon, r2.helper.escapeCharactersCallback);
        var p = a, l = "", o = "", h = d || "", n = t || "";
        return /^www\./i.test(a) && (a = a.replace(/^www\./i, "http://www.")), e.excludeTrailingPunctuationFromURLs && c && (l = c), e.openLinksInNewWindow && (o = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h + '<a href="' + a + '"' + o + ">" + p + "</a>" + l + n;
      };
    }, U2 = function(e, u2) {
      "use strict";
      return function(d, a, s) {
        var i = "mailto:";
        return a = a || "", s = r2.subParser("unescapeSpecialChars")(s, e, u2), e.encodeEmails ? (i = r2.helper.encodeEmailAddress(i + s), s = r2.helper.encodeEmailAddress(s)) : i = i + s, a + '<a href="' + i + '">' + s + "</a>";
      };
    };
    r2.subParser("autoLinks", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("autoLinks.before", e, u2, d), e = e.replace(X, R2(u2)), e = e.replace(Y2, U2(u2, d)), e = d.converter._dispatch("autoLinks.after", e, u2, d), e;
    }), r2.subParser("simplifiedAutoLinks", function(e, u2, d) {
      "use strict";
      return u2.simplifiedAutoLink && (e = d.converter._dispatch("simplifiedAutoLinks.before", e, u2, d), u2.excludeTrailingPunctuationFromURLs ? e = e.replace(Q2, R2(u2)) : e = e.replace(Z2, R2(u2)), e = e.replace(J2, U2(u2, d)), e = d.converter._dispatch("simplifiedAutoLinks.after", e, u2, d)), e;
    }), r2.subParser("blockGamut", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("blockGamut.before", e, u2, d), e = r2.subParser("blockQuotes")(e, u2, d), e = r2.subParser("headers")(e, u2, d), e = r2.subParser("horizontalRule")(e, u2, d), e = r2.subParser("lists")(e, u2, d), e = r2.subParser("codeBlocks")(e, u2, d), e = r2.subParser("tables")(e, u2, d), e = r2.subParser("hashHTMLBlocks")(e, u2, d), e = r2.subParser("paragraphs")(e, u2, d), e = d.converter._dispatch("blockGamut.after", e, u2, d), e;
    }), r2.subParser("blockQuotes", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("blockQuotes.before", e, u2, d), e = e + `

`;
      var a = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      return u2.splitAdjacentBlockquotes && (a = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), e = e.replace(a, function(s) {
        return s = s.replace(/^[ \t]*>[ \t]?/gm, ""), s = s.replace(/¨0/g, ""), s = s.replace(/^[ \t]+$/gm, ""), s = r2.subParser("githubCodeBlocks")(s, u2, d), s = r2.subParser("blockGamut")(s, u2, d), s = s.replace(/(^|\n)/g, "$1  "), s = s.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(i, c) {
          var t = c;
          return t = t.replace(/^  /mg, "\xA80"), t = t.replace(/¨0/g, ""), t;
        }), r2.subParser("hashBlock")(`<blockquote>
` + s + `
</blockquote>`, u2, d);
      }), e = d.converter._dispatch("blockQuotes.after", e, u2, d), e;
    }), r2.subParser("codeBlocks", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("codeBlocks.before", e, u2, d), e += "\xA80";
      var a = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      return e = e.replace(a, function(s, i, c) {
        var t = i, p = c, l = `
`;
        return t = r2.subParser("outdent")(t, u2, d), t = r2.subParser("encodeCode")(t, u2, d), t = r2.subParser("detab")(t, u2, d), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), u2.omitExtraWLInCodeBlocks && (l = ""), t = "<pre><code>" + t + l + "</code></pre>", r2.subParser("hashBlock")(t, u2, d) + p;
      }), e = e.replace(/¨0/, ""), e = d.converter._dispatch("codeBlocks.after", e, u2, d), e;
    }), r2.subParser("codeSpans", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("codeSpans.before", e, u2, d), typeof e > "u" && (e = ""), e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(a, s, i, c) {
        var t = c;
        return t = t.replace(/^([ \t]*)/g, ""), t = t.replace(/[ \t]*$/g, ""), t = r2.subParser("encodeCode")(t, u2, d), t = s + "<code>" + t + "</code>", t = r2.subParser("hashHTMLSpans")(t, u2, d), t;
      }), e = d.converter._dispatch("codeSpans.after", e, u2, d), e;
    }), r2.subParser("completeHTMLDocument", function(e, u2, d) {
      "use strict";
      if (!u2.completeHTMLDocument)
        return e;
      e = d.converter._dispatch("completeHTMLDocument.before", e, u2, d);
      var a = "html", s = `<!DOCTYPE HTML>
`, i = "", c = `<meta charset="utf-8">
`, t = "", p = "";
      typeof d.metadata.parsed.doctype < "u" && (s = "<!DOCTYPE " + d.metadata.parsed.doctype + `>
`, a = d.metadata.parsed.doctype.toString().toLowerCase(), (a === "html" || a === "html5") && (c = '<meta charset="utf-8">'));
      for (var l in d.metadata.parsed)
        if (d.metadata.parsed.hasOwnProperty(l))
          switch (l.toLowerCase()) {
            case "doctype":
              break;
            case "title":
              i = "<title>" + d.metadata.parsed.title + `</title>
`;
              break;
            case "charset":
              a === "html" || a === "html5" ? c = '<meta charset="' + d.metadata.parsed.charset + `">
` : c = '<meta name="charset" content="' + d.metadata.parsed.charset + `">
`;
              break;
            case "language":
            case "lang":
              t = ' lang="' + d.metadata.parsed[l] + '"', p += '<meta name="' + l + '" content="' + d.metadata.parsed[l] + `">
`;
              break;
            default:
              p += '<meta name="' + l + '" content="' + d.metadata.parsed[l] + `">
`;
          }
      return e = s + "<html" + t + `>
<head>
` + i + c + p + `</head>
<body>
` + e.trim() + `
</body>
</html>`, e = d.converter._dispatch("completeHTMLDocument.after", e, u2, d), e;
    }), r2.subParser("detab", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("detab.before", e, u2, d), e = e.replace(/\t(?=\t)/g, "    "), e = e.replace(/\t/g, "\xA8A\xA8B"), e = e.replace(/¨B(.+?)¨A/g, function(a, s) {
        for (var i = s, c = 4 - i.length % 4, t = 0; t < c; t++)
          i += " ";
        return i;
      }), e = e.replace(/¨A/g, "    "), e = e.replace(/¨B/g, ""), e = d.converter._dispatch("detab.after", e, u2, d), e;
    }), r2.subParser("ellipsis", function(e, u2, d) {
      "use strict";
      return u2.ellipsis && (e = d.converter._dispatch("ellipsis.before", e, u2, d), e = e.replace(/\.\.\./g, "\u2026"), e = d.converter._dispatch("ellipsis.after", e, u2, d)), e;
    }), r2.subParser("emoji", function(e, u2, d) {
      "use strict";
      if (!u2.emoji)
        return e;
      e = d.converter._dispatch("emoji.before", e, u2, d);
      var a = /:([\S]+?):/g;
      return e = e.replace(a, function(s, i) {
        return r2.helper.emojis.hasOwnProperty(i) ? r2.helper.emojis[i] : s;
      }), e = d.converter._dispatch("emoji.after", e, u2, d), e;
    }), r2.subParser("encodeAmpsAndAngles", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("encodeAmpsAndAngles.before", e, u2, d), e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?$!])/gi, "&lt;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = d.converter._dispatch("encodeAmpsAndAngles.after", e, u2, d), e;
    }), r2.subParser("encodeBackslashEscapes", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("encodeBackslashEscapes.before", e, u2, d), e = e.replace(/\\(\\)/g, r2.helper.escapeCharactersCallback), e = e.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, r2.helper.escapeCharactersCallback), e = d.converter._dispatch("encodeBackslashEscapes.after", e, u2, d), e;
    }), r2.subParser("encodeCode", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("encodeCode.before", e, u2, d), e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, r2.helper.escapeCharactersCallback), e = d.converter._dispatch("encodeCode.after", e, u2, d), e;
    }), r2.subParser("escapeSpecialCharsWithinTagAttributes", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", e, u2, d);
      var a = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, s = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      return e = e.replace(a, function(i) {
        return i.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, r2.helper.escapeCharactersCallback);
      }), e = e.replace(s, function(i) {
        return i.replace(/([\\`*_~=|])/g, r2.helper.escapeCharactersCallback);
      }), e = d.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", e, u2, d), e;
    }), r2.subParser("githubCodeBlocks", function(e, u2, d) {
      "use strict";
      return u2.ghCodeBlocks ? (e = d.converter._dispatch("githubCodeBlocks.before", e, u2, d), e += "\xA80", e = e.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(a, s, i, c) {
        var t = u2.omitExtraWLInCodeBlocks ? "" : `
`;
        return c = r2.subParser("encodeCode")(c, u2, d), c = r2.subParser("detab")(c, u2, d), c = c.replace(/^\n+/g, ""), c = c.replace(/\n+$/g, ""), c = "<pre><code" + (i ? ' class="' + i + " language-" + i + '"' : "") + ">" + c + t + "</code></pre>", c = r2.subParser("hashBlock")(c, u2, d), `

\xA8G` + (d.ghCodeBlocks.push({ text: a, codeblock: c }) - 1) + `G

`;
      }), e = e.replace(/¨0/, ""), d.converter._dispatch("githubCodeBlocks.after", e, u2, d)) : e;
    }), r2.subParser("hashBlock", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("hashBlock.before", e, u2, d), e = e.replace(/(^\n+|\n+$)/g, ""), e = `

\xA8K` + (d.gHtmlBlocks.push(e) - 1) + `K

`, e = d.converter._dispatch("hashBlock.after", e, u2, d), e;
    }), r2.subParser("hashCodeTags", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("hashCodeTags.before", e, u2, d);
      var a = function(s, i, c, t) {
        var p = c + r2.subParser("encodeCode")(i, u2, d) + t;
        return "\xA8C" + (d.gHtmlSpans.push(p) - 1) + "C";
      };
      return e = r2.helper.replaceRecursiveRegExp(e, a, "<code\\b[^>]*>", "</code>", "gim"), e = d.converter._dispatch("hashCodeTags.after", e, u2, d), e;
    }), r2.subParser("hashElement", function(e, u2, d) {
      "use strict";
      return function(a, s) {
        var i = s;
        return i = i.replace(/\n\n/g, `
`), i = i.replace(/^\n/, ""), i = i.replace(/\n+$/g, ""), i = `

\xA8K` + (d.gHtmlBlocks.push(i) - 1) + `K

`, i;
      };
    }), r2.subParser("hashHTMLBlocks", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("hashHTMLBlocks.before", e, u2, d);
      var a = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], s = function(n, f, _, m) {
        var w = n;
        return _.search(/\bmarkdown\b/) !== -1 && (w = _ + d.converter.makeHtml(f) + m), `

\xA8K` + (d.gHtmlBlocks.push(w) - 1) + `K

`;
      };
      u2.backslashEscapesHTMLTags && (e = e.replace(/\\<(\/?[^>]+?)>/g, function(n, f) {
        return "&lt;" + f + "&gt;";
      }));
      for (var i = 0; i < a.length; ++i)
        for (var c, t = new RegExp("^ {0,3}(<" + a[i] + "\\b[^>]*>)", "im"), p = "<" + a[i] + "\\b[^>]*>", l = "</" + a[i] + ">"; (c = r2.helper.regexIndexOf(e, t)) !== -1; ) {
          var o = r2.helper.splitAtIndex(e, c), h = r2.helper.replaceRecursiveRegExp(o[1], s, p, l, "im");
          if (h === o[1])
            break;
          e = o[0].concat(h);
        }
      return e = e.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, r2.subParser("hashElement")(e, u2, d)), e = r2.helper.replaceRecursiveRegExp(e, function(n) {
        return `

\xA8K` + (d.gHtmlBlocks.push(n) - 1) + `K

`;
      }, "^ {0,3}<!--", "-->", "gm"), e = e.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, r2.subParser("hashElement")(e, u2, d)), e = d.converter._dispatch("hashHTMLBlocks.after", e, u2, d), e;
    }), r2.subParser("hashHTMLSpans", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("hashHTMLSpans.before", e, u2, d);
      function a(s) {
        return "\xA8C" + (d.gHtmlSpans.push(s) - 1) + "C";
      }
      return e = e.replace(/<[^>]+?\/>/gi, function(s) {
        return a(s);
      }), e = e.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(s) {
        return a(s);
      }), e = e.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(s) {
        return a(s);
      }), e = e.replace(/<[^>]+?>/gi, function(s) {
        return a(s);
      }), e = d.converter._dispatch("hashHTMLSpans.after", e, u2, d), e;
    }), r2.subParser("unhashHTMLSpans", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("unhashHTMLSpans.before", e, u2, d);
      for (var a = 0; a < d.gHtmlSpans.length; ++a) {
        for (var s = d.gHtmlSpans[a], i = 0; /¨C(\d+)C/.test(s); ) {
          var c = RegExp.$1;
          if (s = s.replace("\xA8C" + c + "C", d.gHtmlSpans[c]), i === 10) {
            console.error("maximum nesting of 10 spans reached!!!");
            break;
          }
          ++i;
        }
        e = e.replace("\xA8C" + a + "C", s);
      }
      return e = d.converter._dispatch("unhashHTMLSpans.after", e, u2, d), e;
    }), r2.subParser("hashPreCodeTags", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("hashPreCodeTags.before", e, u2, d);
      var a = function(s, i, c, t) {
        var p = c + r2.subParser("encodeCode")(i, u2, d) + t;
        return `

\xA8G` + (d.ghCodeBlocks.push({ text: s, codeblock: p }) - 1) + `G

`;
      };
      return e = r2.helper.replaceRecursiveRegExp(e, a, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), e = d.converter._dispatch("hashPreCodeTags.after", e, u2, d), e;
    }), r2.subParser("headers", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("headers.before", e, u2, d);
      var a = isNaN(parseInt(u2.headerLevelStart)) ? 1 : parseInt(u2.headerLevelStart), s = u2.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, i = u2.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      e = e.replace(s, function(p, l) {
        var o = r2.subParser("spanGamut")(l, u2, d), h = u2.noHeaderId ? "" : ' id="' + t(l) + '"', n = a, f = "<h" + n + h + ">" + o + "</h" + n + ">";
        return r2.subParser("hashBlock")(f, u2, d);
      }), e = e.replace(i, function(p, l) {
        var o = r2.subParser("spanGamut")(l, u2, d), h = u2.noHeaderId ? "" : ' id="' + t(l) + '"', n = a + 1, f = "<h" + n + h + ">" + o + "</h" + n + ">";
        return r2.subParser("hashBlock")(f, u2, d);
      });
      var c = u2.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      e = e.replace(c, function(p, l, o) {
        var h = o;
        u2.customizedHeaderId && (h = o.replace(/\s?\{([^{]+?)}\s*$/, ""));
        var n = r2.subParser("spanGamut")(h, u2, d), f = u2.noHeaderId ? "" : ' id="' + t(o) + '"', _ = a - 1 + l.length, m = "<h" + _ + f + ">" + n + "</h" + _ + ">";
        return r2.subParser("hashBlock")(m, u2, d);
      });
      function t(p) {
        var l, o;
        if (u2.customizedHeaderId) {
          var h = p.match(/\{([^{]+?)}\s*$/);
          h && h[1] && (p = h[1]);
        }
        return l = p, r2.helper.isString(u2.prefixHeaderId) ? o = u2.prefixHeaderId : u2.prefixHeaderId === true ? o = "section-" : o = "", u2.rawPrefixHeaderId || (l = o + l), u2.ghCompatibleHeaderId ? l = l.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : u2.rawHeaderId ? l = l.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : l = l.replace(/[^\w]/g, "").toLowerCase(), u2.rawPrefixHeaderId && (l = o + l), d.hashLinkCounts[l] ? l = l + "-" + d.hashLinkCounts[l]++ : d.hashLinkCounts[l] = 1, l;
      }
      return e = d.converter._dispatch("headers.after", e, u2, d), e;
    }), r2.subParser("horizontalRule", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("horizontalRule.before", e, u2, d);
      var a = r2.subParser("hashBlock")("<hr />", u2, d);
      return e = e.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, a), e = e.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, a), e = e.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, a), e = d.converter._dispatch("horizontalRule.after", e, u2, d), e;
    }), r2.subParser("images", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("images.before", e, u2, d);
      var a = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, s = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, i = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, c = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, t = /!\[([^\[\]]+)]()()()()()/g;
      function p(o, h, n, f, _, m, w, g) {
        return f = f.replace(/\s/g, ""), l(o, h, n, f, _, m, w, g);
      }
      function l(o, h, n, f, _, m, w, g) {
        var v = d.gUrls, j2 = d.gTitles, S2 = d.gDimensions;
        if (n = n.toLowerCase(), g || (g = ""), o.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          f = "";
        else if (f === "" || f === null)
          if ((n === "" || n === null) && (n = h.toLowerCase().replace(/ ?\n/g, " ")), f = "#" + n, !r2.helper.isUndefined(v[n]))
            f = v[n], r2.helper.isUndefined(j2[n]) || (g = j2[n]), r2.helper.isUndefined(S2[n]) || (_ = S2[n].width, m = S2[n].height);
          else
            return o;
        h = h.replace(/"/g, "&quot;").replace(r2.helper.regexes.asteriskDashAndColon, r2.helper.escapeCharactersCallback), f = f.replace(r2.helper.regexes.asteriskDashAndColon, r2.helper.escapeCharactersCallback);
        var k2 = '<img src="' + f + '" alt="' + h + '"';
        return g && r2.helper.isString(g) && (g = g.replace(/"/g, "&quot;").replace(r2.helper.regexes.asteriskDashAndColon, r2.helper.escapeCharactersCallback), k2 += ' title="' + g + '"'), _ && m && (_ = _ === "*" ? "auto" : _, m = m === "*" ? "auto" : m, k2 += ' width="' + _ + '"', k2 += ' height="' + m + '"'), k2 += " />", k2;
      }
      return e = e.replace(c, l), e = e.replace(i, p), e = e.replace(s, l), e = e.replace(a, l), e = e.replace(t, l), e = d.converter._dispatch("images.after", e, u2, d), e;
    }), r2.subParser("italicsAndBold", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("italicsAndBold.before", e, u2, d);
      function a(s, i, c) {
        return i + s + c;
      }
      return u2.literalMidWordUnderscores ? (e = e.replace(/\b___(\S[\s\S]*?)___\b/g, function(s, i) {
        return a(i, "<strong><em>", "</em></strong>");
      }), e = e.replace(/\b__(\S[\s\S]*?)__\b/g, function(s, i) {
        return a(i, "<strong>", "</strong>");
      }), e = e.replace(/\b_(\S[\s\S]*?)_\b/g, function(s, i) {
        return a(i, "<em>", "</em>");
      })) : (e = e.replace(/___(\S[\s\S]*?)___/g, function(s, i) {
        return /\S$/.test(i) ? a(i, "<strong><em>", "</em></strong>") : s;
      }), e = e.replace(/__(\S[\s\S]*?)__/g, function(s, i) {
        return /\S$/.test(i) ? a(i, "<strong>", "</strong>") : s;
      }), e = e.replace(/_([^\s_][\s\S]*?)_/g, function(s, i) {
        return /\S$/.test(i) ? a(i, "<em>", "</em>") : s;
      })), u2.literalMidWordAsterisks ? (e = e.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(s, i, c) {
        return a(c, i + "<strong><em>", "</em></strong>");
      }), e = e.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(s, i, c) {
        return a(c, i + "<strong>", "</strong>");
      }), e = e.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(s, i, c) {
        return a(c, i + "<em>", "</em>");
      })) : (e = e.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(s, i) {
        return /\S$/.test(i) ? a(i, "<strong><em>", "</em></strong>") : s;
      }), e = e.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(s, i) {
        return /\S$/.test(i) ? a(i, "<strong>", "</strong>") : s;
      }), e = e.replace(/\*([^\s*][\s\S]*?)\*/g, function(s, i) {
        return /\S$/.test(i) ? a(i, "<em>", "</em>") : s;
      })), e = d.converter._dispatch("italicsAndBold.after", e, u2, d), e;
    }), r2.subParser("lists", function(e, u2, d) {
      "use strict";
      function a(c, t) {
        d.gListLevel++, c = c.replace(/\n{2,}$/, `
`), c += "\xA80";
        var p = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, l = /\n[ \t]*\n(?!¨0)/.test(c);
        return u2.disableForced4SpacesIndentedSublists && (p = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), c = c.replace(p, function(o, h, n, f, _, m, w) {
          w = w && w.trim() !== "";
          var g = r2.subParser("outdent")(_, u2, d), v = "";
          return m && u2.tasklists && (v = ' class="task-list-item" style="list-style-type: none;"', g = g.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var j2 = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            return w && (j2 += " checked"), j2 += ">", j2;
          })), g = g.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(j2) {
            return "\xA8A" + j2;
          }), h || g.search(/\n{2,}/) > -1 ? (g = r2.subParser("githubCodeBlocks")(g, u2, d), g = r2.subParser("blockGamut")(g, u2, d)) : (g = r2.subParser("lists")(g, u2, d), g = g.replace(/\n$/, ""), g = r2.subParser("hashHTMLBlocks")(g, u2, d), g = g.replace(/\n\n+/g, `

`), l ? g = r2.subParser("paragraphs")(g, u2, d) : g = r2.subParser("spanGamut")(g, u2, d)), g = g.replace("\xA8A", ""), g = "<li" + v + ">" + g + `</li>
`, g;
        }), c = c.replace(/¨0/g, ""), d.gListLevel--, t && (c = c.replace(/\s+$/, "")), c;
      }
      function s(c, t) {
        if (t === "ol") {
          var p = c.match(/^ *(\d+)\./);
          if (p && p[1] !== "1")
            return ' start="' + p[1] + '"';
        }
        return "";
      }
      function i(c, t, p) {
        var l = u2.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, o = u2.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, h = t === "ul" ? l : o, n = "";
        if (c.search(h) !== -1)
          (function _(m) {
            var w = m.search(h), g = s(c, t);
            w !== -1 ? (n += `

<` + t + g + `>
` + a(m.slice(0, w), !!p) + "</" + t + `>
`, t = t === "ul" ? "ol" : "ul", h = t === "ul" ? l : o, _(m.slice(w))) : n += `

<` + t + g + `>
` + a(m, !!p) + "</" + t + `>
`;
          })(c);
        else {
          var f = s(c, t);
          n = `

<` + t + f + `>
` + a(c, !!p) + "</" + t + `>
`;
        }
        return n;
      }
      return e = d.converter._dispatch("lists.before", e, u2, d), e += "\xA80", d.gListLevel ? e = e.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c, t, p) {
        var l = p.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i(t, l, true);
      }) : e = e.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c, t, p, l) {
        var o = l.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i(p, o, false);
      }), e = e.replace(/¨0/, ""), e = d.converter._dispatch("lists.after", e, u2, d), e;
    }), r2.subParser("metadata", function(e, u2, d) {
      "use strict";
      if (!u2.metadata)
        return e;
      e = d.converter._dispatch("metadata.before", e, u2, d);
      function a(s) {
        d.metadata.raw = s, s = s.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), s = s.replace(/\n {4}/g, " "), s.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(i, c, t) {
          return d.metadata.parsed[c] = t, "";
        });
      }
      return e = e.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(s, i, c) {
        return a(c), "\xA8M";
      }), e = e.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(s, i, c) {
        return i && (d.metadata.format = i), a(c), "\xA8M";
      }), e = e.replace(/¨M/g, ""), e = d.converter._dispatch("metadata.after", e, u2, d), e;
    }), r2.subParser("outdent", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("outdent.before", e, u2, d), e = e.replace(/^(\t|[ ]{1,4})/gm, "\xA80"), e = e.replace(/¨0/g, ""), e = d.converter._dispatch("outdent.after", e, u2, d), e;
    }), r2.subParser("paragraphs", function(e, u2, d) {
      "use strict";
      e = d.converter._dispatch("paragraphs.before", e, u2, d), e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
      for (var a = e.split(/\n{2,}/g), s = [], i = a.length, c = 0; c < i; c++) {
        var t = a[c];
        t.search(/¨(K|G)(\d+)\1/g) >= 0 ? s.push(t) : t.search(/\S/) >= 0 && (t = r2.subParser("spanGamut")(t, u2, d), t = t.replace(/^([ \t]*)/g, "<p>"), t += "</p>", s.push(t));
      }
      for (i = s.length, c = 0; c < i; c++) {
        for (var p = "", l = s[c], o = false; /¨(K|G)(\d+)\1/.test(l); ) {
          var h = RegExp.$1, n = RegExp.$2;
          h === "K" ? p = d.gHtmlBlocks[n] : o ? p = r2.subParser("encodeCode")(d.ghCodeBlocks[n].text, u2, d) : p = d.ghCodeBlocks[n].codeblock, p = p.replace(/\$/g, "$$$$"), l = l.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, p), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l) && (o = true);
        }
        s[c] = l;
      }
      return e = s.join(`
`), e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, ""), d.converter._dispatch("paragraphs.after", e, u2, d);
    }), r2.subParser("runExtension", function(e, u2, d, a) {
      "use strict";
      if (e.filter)
        u2 = e.filter(u2, a.converter, d);
      else if (e.regex) {
        var s = e.regex;
        s instanceof RegExp || (s = new RegExp(s, "g")), u2 = u2.replace(s, e.replace);
      }
      return u2;
    }), r2.subParser("spanGamut", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("spanGamut.before", e, u2, d), e = r2.subParser("codeSpans")(e, u2, d), e = r2.subParser("escapeSpecialCharsWithinTagAttributes")(e, u2, d), e = r2.subParser("encodeBackslashEscapes")(e, u2, d), e = r2.subParser("images")(e, u2, d), e = r2.subParser("anchors")(e, u2, d), e = r2.subParser("autoLinks")(e, u2, d), e = r2.subParser("simplifiedAutoLinks")(e, u2, d), e = r2.subParser("emoji")(e, u2, d), e = r2.subParser("underline")(e, u2, d), e = r2.subParser("italicsAndBold")(e, u2, d), e = r2.subParser("strikethrough")(e, u2, d), e = r2.subParser("ellipsis")(e, u2, d), e = r2.subParser("hashHTMLSpans")(e, u2, d), e = r2.subParser("encodeAmpsAndAngles")(e, u2, d), u2.simpleLineBreaks ? /\n\n¨K/.test(e) || (e = e.replace(/\n+/g, `<br />
`)) : e = e.replace(/  +\n/g, `<br />
`), e = d.converter._dispatch("spanGamut.after", e, u2, d), e;
    }), r2.subParser("strikethrough", function(e, u2, d) {
      "use strict";
      function a(s) {
        return u2.simplifiedAutoLink && (s = r2.subParser("simplifiedAutoLinks")(s, u2, d)), "<del>" + s + "</del>";
      }
      return u2.strikethrough && (e = d.converter._dispatch("strikethrough.before", e, u2, d), e = e.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(s, i) {
        return a(i);
      }), e = d.converter._dispatch("strikethrough.after", e, u2, d)), e;
    }), r2.subParser("stripLinkDefinitions", function(e, u2, d) {
      "use strict";
      var a = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, s = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      e += "\xA80";
      var i = function(c, t, p, l, o, h, n) {
        return t = t.toLowerCase(), e.toLowerCase().split(t).length - 1 < 2 ? c : (p.match(/^data:.+?\/.+?;base64,/) ? d.gUrls[t] = p.replace(/\s/g, "") : d.gUrls[t] = r2.subParser("encodeAmpsAndAngles")(p, u2, d), h ? h + n : (n && (d.gTitles[t] = n.replace(/"|'/g, "&quot;")), u2.parseImgDimensions && l && o && (d.gDimensions[t] = { width: l, height: o }), ""));
      };
      return e = e.replace(s, i), e = e.replace(a, i), e = e.replace(/¨0/, ""), e;
    }), r2.subParser("tables", function(e, u2, d) {
      "use strict";
      if (!u2.tables)
        return e;
      var a = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, s = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function i(o) {
        return /^:[ \t]*--*$/.test(o) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(o) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(o) ? ' style="text-align:center;"' : "";
      }
      function c(o, h) {
        var n = "";
        return o = o.trim(), (u2.tablesHeaderId || u2.tableHeaderId) && (n = ' id="' + o.replace(/ /g, "_").toLowerCase() + '"'), o = r2.subParser("spanGamut")(o, u2, d), "<th" + n + h + ">" + o + `</th>
`;
      }
      function t(o, h) {
        var n = r2.subParser("spanGamut")(o, u2, d);
        return "<td" + h + ">" + n + `</td>
`;
      }
      function p(o, h) {
        for (var n = `<table>
<thead>
<tr>
`, f = o.length, _ = 0; _ < f; ++_)
          n += o[_];
        for (n += `</tr>
</thead>
<tbody>
`, _ = 0; _ < h.length; ++_) {
          n += `<tr>
`;
          for (var m = 0; m < f; ++m)
            n += h[_][m];
          n += `</tr>
`;
        }
        return n += `</tbody>
</table>
`, n;
      }
      function l(o) {
        var h, n = o.split(`
`);
        for (h = 0; h < n.length; ++h)
          /^ {0,3}\|/.test(n[h]) && (n[h] = n[h].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(n[h]) && (n[h] = n[h].replace(/\|[ \t]*$/, "")), n[h] = r2.subParser("codeSpans")(n[h], u2, d);
        var f = n[0].split("|").map(function(k2) {
          return k2.trim();
        }), _ = n[1].split("|").map(function(k2) {
          return k2.trim();
        }), m = [], w = [], g = [], v = [];
        for (n.shift(), n.shift(), h = 0; h < n.length; ++h)
          n[h].trim() !== "" && m.push(n[h].split("|").map(function(k2) {
            return k2.trim();
          }));
        if (f.length < _.length)
          return o;
        for (h = 0; h < _.length; ++h)
          g.push(i(_[h]));
        for (h = 0; h < f.length; ++h)
          r2.helper.isUndefined(g[h]) && (g[h] = ""), w.push(c(f[h], g[h]));
        for (h = 0; h < m.length; ++h) {
          for (var j2 = [], S2 = 0; S2 < w.length; ++S2)
            r2.helper.isUndefined(m[h][S2]), j2.push(t(m[h][S2], g[S2]));
          v.push(j2);
        }
        return p(w, v);
      }
      return e = d.converter._dispatch("tables.before", e, u2, d), e = e.replace(/\\(\|)/g, r2.helper.escapeCharactersCallback), e = e.replace(a, l), e = e.replace(s, l), e = d.converter._dispatch("tables.after", e, u2, d), e;
    }), r2.subParser("underline", function(e, u2, d) {
      "use strict";
      return u2.underline && (e = d.converter._dispatch("underline.before", e, u2, d), u2.literalMidWordUnderscores ? (e = e.replace(/\b___(\S[\s\S]*?)___\b/g, function(a, s) {
        return "<u>" + s + "</u>";
      }), e = e.replace(/\b__(\S[\s\S]*?)__\b/g, function(a, s) {
        return "<u>" + s + "</u>";
      })) : (e = e.replace(/___(\S[\s\S]*?)___/g, function(a, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a;
      }), e = e.replace(/__(\S[\s\S]*?)__/g, function(a, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a;
      })), e = e.replace(/(_)/g, r2.helper.escapeCharactersCallback), e = d.converter._dispatch("underline.after", e, u2, d)), e;
    }), r2.subParser("unescapeSpecialChars", function(e, u2, d) {
      "use strict";
      return e = d.converter._dispatch("unescapeSpecialChars.before", e, u2, d), e = e.replace(/¨E(\d+)E/g, function(a, s) {
        var i = parseInt(s);
        return String.fromCharCode(i);
      }), e = d.converter._dispatch("unescapeSpecialChars.after", e, u2, d), e;
    }), r2.subParser("makeMarkdown.blockquote", function(e, u2) {
      "use strict";
      var d = "";
      if (e.hasChildNodes())
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i) {
          var c = r2.subParser("makeMarkdown.node")(a[i], u2);
          c !== "" && (d += c);
        }
      return d = d.trim(), d = "> " + d.split(`
`).join(`
> `), d;
    }), r2.subParser("makeMarkdown.codeBlock", function(e, u2) {
      "use strict";
      var d = e.getAttribute("language"), a = e.getAttribute("precodenum");
      return "```" + d + `
` + u2.preList[a] + "\n```";
    }), r2.subParser("makeMarkdown.codeSpan", function(e) {
      "use strict";
      return "`" + e.innerHTML + "`";
    }), r2.subParser("makeMarkdown.emphasis", function(e, u2) {
      "use strict";
      var d = "";
      if (e.hasChildNodes()) {
        d += "*";
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r2.subParser("makeMarkdown.node")(a[i], u2);
        d += "*";
      }
      return d;
    }), r2.subParser("makeMarkdown.header", function(e, u2, d) {
      "use strict";
      var a = new Array(d + 1).join("#"), s = "";
      if (e.hasChildNodes()) {
        s = a + " ";
        for (var i = e.childNodes, c = i.length, t = 0; t < c; ++t)
          s += r2.subParser("makeMarkdown.node")(i[t], u2);
      }
      return s;
    }), r2.subParser("makeMarkdown.hr", function() {
      "use strict";
      return "---";
    }), r2.subParser("makeMarkdown.image", function(e) {
      "use strict";
      var u2 = "";
      return e.hasAttribute("src") && (u2 += "![" + e.getAttribute("alt") + "](", u2 += "<" + e.getAttribute("src") + ">", e.hasAttribute("width") && e.hasAttribute("height") && (u2 += " =" + e.getAttribute("width") + "x" + e.getAttribute("height")), e.hasAttribute("title") && (u2 += ' "' + e.getAttribute("title") + '"'), u2 += ")"), u2;
    }), r2.subParser("makeMarkdown.links", function(e, u2) {
      "use strict";
      var d = "";
      if (e.hasChildNodes() && e.hasAttribute("href")) {
        var a = e.childNodes, s = a.length;
        d = "[";
        for (var i = 0; i < s; ++i)
          d += r2.subParser("makeMarkdown.node")(a[i], u2);
        d += "](", d += "<" + e.getAttribute("href") + ">", e.hasAttribute("title") && (d += ' "' + e.getAttribute("title") + '"'), d += ")";
      }
      return d;
    }), r2.subParser("makeMarkdown.list", function(e, u2, d) {
      "use strict";
      var a = "";
      if (!e.hasChildNodes())
        return "";
      for (var s = e.childNodes, i = s.length, c = e.getAttribute("start") || 1, t = 0; t < i; ++t)
        if (!(typeof s[t].tagName > "u" || s[t].tagName.toLowerCase() !== "li")) {
          var p = "";
          d === "ol" ? p = c.toString() + ". " : p = "- ", a += p + r2.subParser("makeMarkdown.listItem")(s[t], u2), ++c;
        }
      return a += `
<!-- -->
`, a.trim();
    }), r2.subParser("makeMarkdown.listItem", function(e, u2) {
      "use strict";
      for (var d = "", a = e.childNodes, s = a.length, i = 0; i < s; ++i)
        d += r2.subParser("makeMarkdown.node")(a[i], u2);
      return /\n$/.test(d) ? d = d.split(`
`).join(`
    `).replace(/^ {4}$/gm, "").replace(/\n\n+/g, `

`) : d += `
`, d;
    }), r2.subParser("makeMarkdown.node", function(e, u2, d) {
      "use strict";
      d = d || false;
      var a = "";
      if (e.nodeType === 3)
        return r2.subParser("makeMarkdown.txt")(e, u2);
      if (e.nodeType === 8)
        return "<!--" + e.data + `-->

`;
      if (e.nodeType !== 1)
        return "";
      var s = e.tagName.toLowerCase();
      switch (s) {
        case "h1":
          d || (a = r2.subParser("makeMarkdown.header")(e, u2, 1) + `

`);
          break;
        case "h2":
          d || (a = r2.subParser("makeMarkdown.header")(e, u2, 2) + `

`);
          break;
        case "h3":
          d || (a = r2.subParser("makeMarkdown.header")(e, u2, 3) + `

`);
          break;
        case "h4":
          d || (a = r2.subParser("makeMarkdown.header")(e, u2, 4) + `

`);
          break;
        case "h5":
          d || (a = r2.subParser("makeMarkdown.header")(e, u2, 5) + `

`);
          break;
        case "h6":
          d || (a = r2.subParser("makeMarkdown.header")(e, u2, 6) + `

`);
          break;
        case "p":
          d || (a = r2.subParser("makeMarkdown.paragraph")(e, u2) + `

`);
          break;
        case "blockquote":
          d || (a = r2.subParser("makeMarkdown.blockquote")(e, u2) + `

`);
          break;
        case "hr":
          d || (a = r2.subParser("makeMarkdown.hr")(e, u2) + `

`);
          break;
        case "ol":
          d || (a = r2.subParser("makeMarkdown.list")(e, u2, "ol") + `

`);
          break;
        case "ul":
          d || (a = r2.subParser("makeMarkdown.list")(e, u2, "ul") + `

`);
          break;
        case "precode":
          d || (a = r2.subParser("makeMarkdown.codeBlock")(e, u2) + `

`);
          break;
        case "pre":
          d || (a = r2.subParser("makeMarkdown.pre")(e, u2) + `

`);
          break;
        case "table":
          d || (a = r2.subParser("makeMarkdown.table")(e, u2) + `

`);
          break;
        case "code":
          a = r2.subParser("makeMarkdown.codeSpan")(e, u2);
          break;
        case "em":
        case "i":
          a = r2.subParser("makeMarkdown.emphasis")(e, u2);
          break;
        case "strong":
        case "b":
          a = r2.subParser("makeMarkdown.strong")(e, u2);
          break;
        case "del":
          a = r2.subParser("makeMarkdown.strikethrough")(e, u2);
          break;
        case "a":
          a = r2.subParser("makeMarkdown.links")(e, u2);
          break;
        case "img":
          a = r2.subParser("makeMarkdown.image")(e, u2);
          break;
        default:
          a = e.outerHTML + `

`;
      }
      return a;
    }), r2.subParser("makeMarkdown.paragraph", function(e, u2) {
      "use strict";
      var d = "";
      if (e.hasChildNodes())
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r2.subParser("makeMarkdown.node")(a[i], u2);
      return d = d.trim(), d;
    }), r2.subParser("makeMarkdown.pre", function(e, u2) {
      "use strict";
      var d = e.getAttribute("prenum");
      return "<pre>" + u2.preList[d] + "</pre>";
    }), r2.subParser("makeMarkdown.strikethrough", function(e, u2) {
      "use strict";
      var d = "";
      if (e.hasChildNodes()) {
        d += "~~";
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r2.subParser("makeMarkdown.node")(a[i], u2);
        d += "~~";
      }
      return d;
    }), r2.subParser("makeMarkdown.strong", function(e, u2) {
      "use strict";
      var d = "";
      if (e.hasChildNodes()) {
        d += "**";
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r2.subParser("makeMarkdown.node")(a[i], u2);
        d += "**";
      }
      return d;
    }), r2.subParser("makeMarkdown.table", function(e, u2) {
      "use strict";
      var d = "", a = [[], []], s = e.querySelectorAll("thead>tr>th"), i = e.querySelectorAll("tbody>tr"), c, t;
      for (c = 0; c < s.length; ++c) {
        var p = r2.subParser("makeMarkdown.tableCell")(s[c], u2), l = "---";
        if (s[c].hasAttribute("style")) {
          var o = s[c].getAttribute("style").toLowerCase().replace(/\s/g, "");
          switch (o) {
            case "text-align:left;":
              l = ":---";
              break;
            case "text-align:right;":
              l = "---:";
              break;
            case "text-align:center;":
              l = ":---:";
              break;
          }
        }
        a[0][c] = p.trim(), a[1][c] = l;
      }
      for (c = 0; c < i.length; ++c) {
        var h = a.push([]) - 1, n = i[c].getElementsByTagName("td");
        for (t = 0; t < s.length; ++t) {
          var f = " ";
          typeof n[t] < "u" && (f = r2.subParser("makeMarkdown.tableCell")(n[t], u2)), a[h].push(f);
        }
      }
      var _ = 3;
      for (c = 0; c < a.length; ++c)
        for (t = 0; t < a[c].length; ++t) {
          var m = a[c][t].length;
          m > _ && (_ = m);
        }
      for (c = 0; c < a.length; ++c) {
        for (t = 0; t < a[c].length; ++t)
          c === 1 ? a[c][t].slice(-1) === ":" ? a[c][t] = r2.helper.padEnd(a[c][t].slice(-1), _ - 1, "-") + ":" : a[c][t] = r2.helper.padEnd(a[c][t], _, "-") : a[c][t] = r2.helper.padEnd(a[c][t], _);
        d += "| " + a[c].join(" | ") + ` |
`;
      }
      return d.trim();
    }), r2.subParser("makeMarkdown.tableCell", function(e, u2) {
      "use strict";
      var d = "";
      if (!e.hasChildNodes())
        return "";
      for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
        d += r2.subParser("makeMarkdown.node")(a[i], u2, true);
      return d.trim();
    }), r2.subParser("makeMarkdown.txt", function(e) {
      "use strict";
      var u2 = e.nodeValue;
      return u2 = u2.replace(/ +/g, " "), u2 = u2.replace(/¨NBSP;/g, " "), u2 = r2.helper.unescapeHTMLEntities(u2), u2 = u2.replace(/([*_~|`])/g, "\\$1"), u2 = u2.replace(/^(\s*)>/g, "\\$1>"), u2 = u2.replace(/^#/gm, "\\#"), u2 = u2.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3"), u2 = u2.replace(/^( {0,3}\d+)\./gm, "$1\\."), u2 = u2.replace(/^( {0,3})([+-])/gm, "$1\\$2"), u2 = u2.replace(/]([\s]*)\(/g, "\\]$1\\("), u2 = u2.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:"), u2;
    });
    var x = this;
    typeof define == "function" && define.amd ? define(function() {
      "use strict";
      return r2;
    }) : typeof B2 < "u" && B2.exports ? B2.exports = r2 : x.showdown = r2;
  }).call(W);
});
var T2 = se(K2());
var { helper: te2, extensions: fe, setOption: oe, getOption: le, getOptions: he, resetOptions: pe, setFlavor: _e, getFlavor: me, getFlavorOptions: ge, getDefaultOptions: we, subParser: be, extension: ke, getAllExtensions: ve, removeExtension: ye, resetExtensions: Pe, validateExtension: ze, Converter: je } = T2;
var Ce = T2.default ?? T2;

// main/components/markdown.js
var markdownConverter = new Ce.Converter();
var Markdown = ({ text }) => {
  const element2 = document.createElement("div");
  const indent2 = text.match(/\t* *\n( *)/)[1];
  text = text.replace(regex`${/^/}${indent2}`.gm, "");
  element2.innerHTML = markdownConverter.makeHtml(text);
  return element2;
};
var markdown_default = Markdown;

// main/actions/show_toast.js
var toastOn = css``;
var toastify = css`
    padding: 12px 20px;
    color: #ffffff;
    display: inline-block;
    box-shadow: 0 3px 6px -1px rgba(0, 0, 0, 0.12), 0 10px 36px -4px rgba(77, 96, 232, 0.3);
    background: -webkit-linear-gradient(315deg, #73a5ff, #5477f5);
    background: linear-gradient(135deg, #73a5ff, #5477f5);
    position: fixed;
    opacity: 0;
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
    border-radius: 2px;
    cursor: pointer;
    text-decoration: none;
    max-width: calc(50% - 20px);
    z-index: 2147483647;
    &${toastOn} {
        opacity: 1;
    }
`;
var toastClose = css`
    background: transparent;
    border: 0;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    opacity: 0.4;
    padding: 0 5px;
`;
var toastifyRight = css`
    right: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyLeft = css`
    left: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyTop = css`
    top: 50px;
`;
var toastifyBottom = css`
    bottom: 50px;
`;
var toastifyRounded = css`
    border-radius: 25px;
`;
var toastifyAvatar = css`
    width: 1.5em;
    height: 1.5em;
    margin: -7px 5px;
    border-radius: 2px;
`;
var toastifyCenter = css`
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    max-width: fit-content;
    max-width: -moz-fit-content;
`;
var nameMapping = {
  right: toastifyRight,
  left: toastifyLeft,
  top: toastifyTop,
  bottom: toastifyBottom,
  rounded: toastifyRounded,
  avatar: toastifyAvatar,
  center: toastifyCenter
};
var Toastify = class {
  defaults = {
    oldestFirst: true,
    text: "Toastify is awesome!",
    node: void 0,
    duration: 3e3,
    selector: void 0,
    callback: function() {
    },
    destination: void 0,
    newWindow: false,
    close: true,
    gravity: toastifyBottom,
    positionLeft: false,
    position: "",
    backgroundColor: "",
    avatar: "",
    className: "",
    stopOnFocus: true,
    onClick: function() {
    },
    offset: { x: 0, y: 0 },
    escapeMarkup: true,
    ariaLive: "polite",
    style: { background: "" }
  };
  /**
  * Init the Toastify class
  * @example
  *     new Toastify({
  *         text: "This is a toast",
  *         duration: 3000
  *     }).showToast()
  *
  * @param {ToastifyConfigurationObject} options - The configuration object to configure Toastify
  * @param {string} [options.text=Hi there!] - Message to be displayed in the toast
  * @param {Element} [options.node] - Provide a node to be mounted inside the toast. node takes higher precedence over text
  * @param {number} [options.duration=3000] - Duration for which the toast should be displayed. -1 for permanent toast
  * @param {string} [options.selector] - CSS Selector on which the toast should be added
  * @param {url} [options.destination] - URL to which the browser should be navigated on click of the toast
  * @param {boolean} [options.newWindow=false] - Decides whether the destination should be opened in a new window or not
  * @param {boolean} [options.close=true] - To show the close icon or not
  * @param {string} [options.gravity=toastify-top] - To show the toast from top or bottom
  * @param {string} [options.position=right] - To show the toast on left or right
  * @param {string} [options.backgroundColor] - Sets the background color of the toast (To be deprecated)
  * @param {url} [options.avatar] - Image/icon to be shown before text
  * @param {string} [options.className] - Ability to provide custom class name for further customization
  * @param {boolean} [options.stopOnFocus] - To stop timer when hovered over the toast (Only if duration is set)
  * @param {Function} [options.callback] - Invoked when the toast is dismissed
  * @param {Function} [options.onClick] - Invoked when the toast is clicked
  * @param {Object} [options.offset] - Ability to add some offset to axis
  * @param {boolean} [options.escapeMarkup=true] - Toggle the default behavior of escaping HTML markup
  * @param {string} [options.ariaLive] - Announce the toast to screen readers
  * @param {Object} [options.style] - Use the HTML DOM style property to add styles to toast
  */
  constructor(options) {
    this.version = "1.12.0";
    this.options = {};
    this.toastElement = null;
    this._rootElement = document.body;
    this.options = Object.assign(this.defaults, options);
    if (this.options.backgroundColor) {
    }
    this.toastElement = null;
    this.options.gravity = options.gravity === "bottom" ? toastifyBottom : toastifyTop;
    this.options.stopOnFocus = options.stopOnFocus === void 0 ? true : options.stopOnFocus;
    if (options.backgroundColor) {
      this.options.style.background = options.backgroundColor;
    }
  }
  /**
  * Display the toast
  * @public
  */
  showToast() {
    this.toastElement = this._buildToast();
    if (typeof this.options.selector === "string") {
      this._rootElement = document.getElementById(this.options.selector);
    } else if (this.options.selector instanceof HTMLElement || this.options.selector instanceof ShadowRoot) {
      this._rootElement = this.options.selector;
    } else {
      this._rootElement = document.body;
    }
    if (!this._rootElement) {
      throw "Root element is not defined";
    }
    this._rootElement.insertBefore(this.toastElement, this._rootElement.firstChild);
    this._reposition();
    if (this.options.duration > 0) {
      this.toastElement.timeOutValue = window.setTimeout(() => {
        this._removeElement(this.toastElement);
      }, this.options.duration);
    }
    return this;
  }
  /**
  * Hide the toast
  * @public
  */
  hideToast() {
    if (this.toastElement.timeOutValue) {
      clearTimeout(this.toastElement.timeOutValue);
    }
    this._removeElement(this.toastElement);
  }
  /**
  * Build the Toastify element
  * @returns {Element}
  * @private
  */
  _buildToast() {
    if (!this.options) {
      throw "Toastify is not initialized";
    }
    let divElement = document.createElement("div");
    divElement.className = `${toastify} ${toastOn} ${this.options.className}`;
    divElement.className += ` ${nameMapping[this.options.position]}`;
    divElement.className += ` ${this.options.gravity}`;
    for (const property in this.options.style) {
      divElement.style[property] = this.options.style[property];
    }
    if (this.options.ariaLive) {
      divElement.setAttribute("aria-live", this.options.ariaLive);
    }
    if (this.options.node && this.options.node.nodeType === Node.ELEMENT_NODE) {
      divElement.appendChild(this.options.node);
    } else {
      if (this.options.escapeMarkup) {
        divElement.innerText = this.options.text;
      } else {
        divElement.innerHTML = this.options.text;
      }
      if (this.options.avatar !== "") {
        let avatarElement = document.createElement("img");
        avatarElement.src = this.options.avatar;
        avatarElement.className = toastifyAvatar;
        if (this.options.position == "left") {
          divElement.appendChild(avatarElement);
        } else {
          divElement.insertAdjacentElement("afterbegin", avatarElement);
        }
      }
    }
    if (this.options.close === true) {
      let closeElement = document.createElement("button");
      closeElement.type = "button";
      closeElement.setAttribute("aria-label", "Close");
      closeElement.className = toastClose;
      closeElement.innerHTML = "&#10006;";
      closeElement.addEventListener("click", (event) => {
        event.stopPropagation();
        this._removeElement(this.toastElement);
        window.clearTimeout(this.toastElement.timeOutValue);
      });
      const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (this.options.position == "left" && width > 360) {
        divElement.insertAdjacentElement("afterbegin", closeElement);
      } else {
        divElement.appendChild(closeElement);
      }
    }
    if (this.options.stopOnFocus && this.options.duration > 0) {
      divElement.addEventListener("mouseover", (event) => {
        window.clearTimeout(divElement.timeOutValue);
      });
      divElement.addEventListener("mouseleave", () => {
        divElement.timeOutValue = window.setTimeout(() => {
          this._removeElement(divElement);
        }, this.options.duration);
      });
    }
    if (typeof this.options.destination !== "undefined") {
      divElement.addEventListener("click", (event) => {
        event.stopPropagation();
        if (this.options.newWindow === true) {
          window.open(this.options.destination, "_blank");
        } else {
          window.location = this.options.destination;
        }
      });
    }
    if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
      divElement.addEventListener("click", (event) => {
        event.stopPropagation();
        this.options.onClick();
      });
    }
    if (typeof this.options.offset === "object") {
      const x = this._getAxisOffsetAValue("x", this.options);
      const y = this._getAxisOffsetAValue("y", this.options);
      const xOffset = this.options.position == "left" ? x : `-${x}`;
      const yOffset = this.options.gravity == toastifyTop ? y : `-${y}`;
      divElement.style.transform = `translate(${xOffset},${yOffset})`;
    }
    return divElement;
  }
  /**
  * Remove the toast from the DOM
  * @param {Element} toastElement
  */
  _removeElement(toastElement) {
    toastElement.className = toastElement.className.replace(` ${toastOn}`, "");
    window.setTimeout(() => {
      if (this.options.node && this.options.node.parentNode) {
        this.options.node.parentNode.removeChild(this.options.node);
      }
      if (toastElement.parentNode) {
        toastElement.parentNode.removeChild(toastElement);
      }
      this.options.callback.call(toastElement);
      this._reposition();
    }, 400);
  }
  /**
  * Position the toast on the DOM
  * @private
  */
  _reposition() {
    let topLeftOffsetSize = {
      top: 15,
      bottom: 15
    };
    let topRightOffsetSize = {
      top: 15,
      bottom: 15
    };
    let offsetSize = {
      top: 15,
      bottom: 15
    };
    let allToasts = this._rootElement.querySelectorAll(`.${toastify}`);
    let classUsed;
    let topOrBottom;
    for (let i = 0; i < allToasts.length; i++) {
      if (allToasts[i].classList.contains(toastifyTop) === true) {
        classUsed = toastifyTop;
        topOrBottom = "top";
      } else {
        classUsed = toastifyBottom;
        topOrBottom = "bottom";
      }
      let height = allToasts[i].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length - 1);
      let offset = 15;
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width <= 360) {
        allToasts[i].style[topOrBottom] = `${offsetSize[topOrBottom]}px`;
        offsetSize[topOrBottom] += height + offset;
      } else {
        if (allToasts[i].classList.contains(toastifyLeft) === true) {
          allToasts[i].style[topOrBottom] = `${topLeftOffsetSize[topOrBottom]}px`;
          topLeftOffsetSize[topOrBottom] += height + offset;
        } else {
          allToasts[i].style[topOrBottom] = `${topRightOffsetSize[topOrBottom]}px`;
          topRightOffsetSize[topOrBottom] += height + offset;
        }
      }
    }
  }
  /**
  * Helper function to get offset
  * @param {string} axis - 'x' or 'y'
  * @param {ToastifyConfigurationObject} options - The options object containing the offset object
  */
  _getAxisOffsetAValue(axis, options) {
    if (options.offset[axis]) {
      if (isNaN(options.offset[axis])) {
        return options.offset[axis];
      } else {
        return `${options.offset[axis]}px`;
      }
    }
    return "0px";
  }
};
var showToast = (message, options) => {
  const toast = new Toastify({
    position: "right",
    gravity: "bottom",
    ...options,
    text: message
  });
  toast.showToast();
  return toast;
};

// elements.jsx
var codeClass = css`
            white-space: pre;
            font-family: monospace, monospace;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
            margin: 0;
            padding: 0;
            border: 0;
        `;
function Code({ children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(codeClass, arg.class);
  return /* @__PURE__ */ Q("code", { ...arg }, children);
}
var inputClass = css`
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            overflow: visible;
        `;
function Input(arg) {
  const element2 = document.createElement(`input`);
  ee(element2, {
    style: `
                    margin: 0;
                    font-family: inherit;
                    font-size: inherit;
                    line-height: inherit;
                    overflow: visible;
                `.replace(/\s+/g, " ").trim()
    // replace is to help bundle optimizers
  });
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(inputClass, arg.class);
  return /* @__PURE__ */ Q("input", { ...arg });
}
var checkboxClass = css`
            box-sizing: border-box;
            padding: 0;
        `;
function Checkbox(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(inputClass, checkboxClass, arg.class);
  const element2 = /* @__PURE__ */ Q("input", { type: "checkbox", ...arg });
  Object.defineProperties(element2, {
    value: {
      get() {
        this.checked;
      },
      set(value) {
        this.checked = value;
      }
    }
  });
  const propNames = Object.keys(arg);
  if (!propNames.includes("checked") && propNames.includes("value")) {
    element2.checked = arg.value;
  } else {
    element2.checked = arg.checked;
  }
  return element2;
}
var originalDisplayValueSymbol = Symbol("originalDisplayValue");
var dropdownPlaceholder = css`
            overflow: visible;
        `;
var dropdownList = css`
            overflow: auto;
            height: fit-content;
            max-height: 50vh;
        `;
function Dropdown({ children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(dropdownList, arg.class);
  const placeholder = /* @__PURE__ */ Q(Column, { class: dropdownPlaceholder });
  const listOfOptions = /* @__PURE__ */ Q(Column, { class: dropdownList, ...arg }, children);
  for (const each of listOfOptions.children) {
    each[originalDisplayValueSymbol] = each.style.display;
  }
  const onMainClickOrInput = (event) => {
    placeholder.style.minHeight = `${listOfOptions.clientHeight}px`;
    placeholder.style.maxHeight = `${listOfOptions.clientHeight}px`;
    placeholder.style.minWidth = `${listOfOptions.clientWidth}px`;
    placeholder.style.maxWidth = `${listOfOptions.clientWidth}px`;
    const parent = listOfOptions.parentNode;
    parent.replaceChild(placeholder, listOfOptions);
    placeholder.appendChild(listOfOptions);
    for (const each of listOfOptions.children) {
      each.style.display = each[originalDisplayValueSymbol];
    }
  };
  const onOptionClickOrInput = (event) => {
    placeholder.selected = event.target;
    for (const each of listOfOptions.children) {
      each[originalDisplayValueSymbol] = each.style.display;
      if (each != element.selected) {
        each.style.display = "none";
      }
    }
    const parent = placeholder?.parentNode;
    if (parent?.replaceChild) {
      parent.replaceChild(listOfOptions, placeholder);
    }
  };
  listOfOptions.addEventListener("click", onMainClickOrInput);
  listOfOptions.addEventListener("input", onMainClickOrInput);
  for (const each of listOfOptions.children) {
    each.addEventListener("click", onOptionClickOrInput);
    each.addEventListener("input", onOptionClickOrInput);
  }
  onOptionClickOrInput({ target: args.default });
  return listOfOptions;
}
var components = {
  Column,
  Row,
  Code,
  Input,
  Button,
  Checkbox,
  Dropdown,
  Markdown: markdown_default
};
var askForFiles = async () => {
  return new Promise((resolve, reject) => {
    let value = null;
    let waitValue;
    let hasResolved = false;
    const cleanResolve = (returnValue) => {
      value = returnValue;
      if (hasResolved) {
        return;
      }
      if (!waitValue && returnValue.length == 0) {
        waitValue = setTimeout(() => {
          if (!hasResolved) {
            hasResolved = true;
            resolve(value);
          }
        }, 200);
      } else {
        clearTimeout(waitValue);
        hasResolved = true;
        resolve(value);
      }
      try {
        window.removeEventListener("focus", listener);
        helperElement.removeChild(filePicker);
      } catch (error) {
      }
    };
    const listener = () => cleanResolve([]);
    window.addEventListener("focus", listener);
    let filePicker = /* @__PURE__ */ Q(
      "input",
      {
        type: "file",
        onInput: (event) => {
          cleanResolve(event.target.files);
        },
        onBlur: (event) => {
          cleanResolve([]);
        },
        hidden: true
      }
    );
    helperElement.appendChild(filePicker);
    filePicker.click();
  });
};
var popUp = async ({ children, ...otherArgs }) => {
  const container = /* @__PURE__ */ Q(
    "div",
    {
      class: combine_classes_default(classIds.popUp, otherArgs.class),
      onClick: (event) => {
        if (event.target == container) {
          container.remove();
        }
      }
    },
    /* @__PURE__ */ Q(Column, { verticalAlignment: "top", horizontalAlignment: "center", style: "width: fit-content; height: 50vh; overflow-y: auto;" }, children)
  );
  helperElement.prepend(container);
  return container;
};
export {
  Button,
  Checkbox,
  Code,
  Column,
  Dropdown,
  Input,
  Row,
  Toastify,
  askForFiles,
  components,
  css,
  cx,
  popUp,
  showToast
};
/*! Bundled license information:

showdown/dist/showdown.js:
  (*! showdown v 2.1.0 - 21-04-2022 *)
*/
/*!
* Toastify js 1.12.0
* https://github.com/apvarun/toastify-js
* @license MIT licensed
*
* Copyright (C) 2018 Varun A P
*/
