// https://deno.land/x/good@1.4.4.3/value.js
var typedArrayClasses = [
  Uint16Array,
  Uint32Array,
  Uint8Array,
  Uint8ClampedArray,
  Int16Array,
  Int32Array,
  Int8Array,
  Float32Array,
  Float64Array,
  globalThis.BigInt64Array,
  globalThis.BigUint64Array
].filter((each) => each);
var copyableClasses = /* @__PURE__ */ new Set([RegExp, Date, URL, ...typedArrayClasses, globalThis.ArrayBuffer, globalThis.DataView]);
var IteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf([][Symbol.iterator]()));
var ArrayIterator = Object.getPrototypeOf([][Symbol.iterator]);
var MapIterator = Object.getPrototypeOf((/* @__PURE__ */ new Map())[Symbol.iterator]);
var SetIterator = Object.getPrototypeOf((/* @__PURE__ */ new Set())[Symbol.iterator]);
var AsyncFunction = class {
};
var GeneratorFunction = class {
};
var AsyncGeneratorFunction = class {
};
var SyncGenerator = class {
};
var AsyncGenerator = class {
};
try {
  AsyncFunction = eval("(async function(){}).constructor");
  GeneratorFunction = eval("(function*(){}).constructor");
  AsyncGeneratorFunction = eval("(async function*(){}).constructor");
  SyncGenerator = eval("((function*(){})()).constructor");
  AsyncGenerator = eval("((async function*(){})()).constructor");
} catch (error) {
}
var isPrimitive = (value) => !(value instanceof Object);
var isPureObject = (value) => value instanceof Object && Object.getPrototypeOf(value).constructor == Object;
var isPracticallyPrimitive = (value) => isPrimitive(value) || value instanceof Date || value instanceof RegExp || value instanceof URL;
var isBuiltInIterator = (value) => IteratorPrototype.isPrototypeOf(value);
var isGeneratorType = (value) => {
  if (value instanceof Object) {
    if (isBuiltInIterator(value)) {
      return true;
    }
    const constructor = value.constructor;
    return constructor == SyncGenerator || constructor == AsyncGenerator;
  }
  return false;
};
var isAsyncIterable = function(value) {
  return value && typeof value[Symbol.asyncIterator] === "function";
};
var isSyncIterable = function(value) {
  return value && typeof value[Symbol.iterator] === "function";
};
var isIterableObjectOrContainer = function(value) {
  return value instanceof Object && (typeof value[Symbol.iterator] == "function" || typeof value[Symbol.asyncIterator] === "function");
};
var isTechnicallyIterable = function(value) {
  return value instanceof Object || typeof value == "string";
};
var isSyncIterableObjectOrContainer = function(value) {
  return value instanceof Object && typeof value[Symbol.iterator] == "function";
};
var deepCopySymbol = Symbol.for("deepCopy");
var clonedFromSymbol = Symbol();
var getThis = Symbol();
Object.getPrototypeOf(function() {
})[getThis] = function() {
  return this;
};
function deepCopyInner(value, valueChain = [], originalToCopyMap = /* @__PURE__ */ new Map()) {
  valueChain.push(value);
  if (value == null) {
    return value;
  }
  if (!(value instanceof Object)) {
    return value;
  }
  if (originalToCopyMap.has(value)) {
    return originalToCopyMap.get(value);
  }
  if (value[deepCopySymbol] instanceof Function) {
    const clonedValue = value[deepCopySymbol](originalToCopyMap);
    originalToCopyMap.set(value, clonedValue);
    return clonedValue;
  }
  if (isGeneratorType(value)) {
    throw Error(`Sadly built-in generators cannot be deep copied.
And I found a generator along this path:
${valueChain.reverse().map((each) => `${each},
`)}`);
  }
  let object, theThis, thisCopy;
  if (value instanceof Date) {
    object = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    object = new RegExp(value);
  } else if (value instanceof URL) {
    object = new URL(value);
  } else if (value instanceof Function) {
    theThis = value[getThis]();
    object = value.bind(theThis);
  } else if (copyableClasses.has(value.constructor)) {
    object = new value.constructor(value);
  } else if (value instanceof Array) {
    object = [];
  } else if (value instanceof Set) {
    object = /* @__PURE__ */ new Set();
  } else if (value instanceof Map) {
    object = /* @__PURE__ */ new Map();
  }
  originalToCopyMap.set(value, object);
  if (object instanceof Function) {
    thisCopy = deepCopyInner(theThis, valueChain, originalToCopyMap);
    object = object.bind(thisCopy);
  }
  const output2 = object;
  try {
    output2.constructor = value.constructor;
  } catch (error) {
  }
  Object.setPrototypeOf(output2, Object.getPrototypeOf(value));
  const propertyDefinitions = {};
  for (const [key2, description] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    const { value: value2, get, set, ...options } = description;
    const getIsFunc = get instanceof Function;
    const setIsFunc = set instanceof Function;
    if (getIsFunc || setIsFunc) {
      propertyDefinitions[key2] = {
        ...options,
        get: get ? function(...args2) {
          return get.apply(output2, args2);
        } : void 0,
        set: set ? function(...args2) {
          return set.apply(output2, args2);
        } : void 0
      };
    } else {
      if (key2 == "length" && output2 instanceof Array) {
        continue;
      }
      propertyDefinitions[key2] = {
        ...options,
        value: deepCopyInner(value2, valueChain, originalToCopyMap)
      };
    }
  }
  Object.defineProperties(output2, propertyDefinitions);
  return output2;
}
var deepCopy = (value) => deepCopyInner(value);
var shallowSortObject = (obj) => {
  return Object.keys(obj).sort().reduce(
    (newObj, key2) => {
      newObj[key2] = obj[key2];
      return newObj;
    },
    {}
  );
};
var deepSortObject = (obj, seen = /* @__PURE__ */ new Map()) => {
  if (!(obj instanceof Object)) {
    return obj;
  } else if (seen.has(obj)) {
    return seen.get(obj);
  } else {
    if (obj instanceof Array) {
      const sortedChildren = [];
      seen.set(obj, sortedChildren);
      for (const each of obj) {
        sortedChildren.push(deepSortObject(each, seen));
      }
      return sortedChildren;
    } else {
      const sorted = {};
      seen.set(obj, sorted);
      for (const eachKey of Object.keys(obj).sort()) {
        sorted[eachKey] = deepSortObject(obj[eachKey], seen);
      }
      return sorted;
    }
  }
};
var stableStringify = (value, ...args2) => {
  return JSON.stringify(deepSortObject(value), ...args2);
};
var allKeys = function(obj) {
  let keys = [];
  if (obj == null) {
    return [];
  }
  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }
  while (obj) {
    keys = keys.concat(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return keys;
};
var ownKeyDescriptions = Object.getOwnPropertyDescriptors;
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

// https://deno.land/x/good@1.4.4.3/async.js
var objectPrototype = Object.getPrototypeOf({});

// https://deno.land/x/good@1.4.4.3/iterable.js
var emptyIterator = /* @__PURE__ */ function* () {
}();
var makeIterable = (object) => {
  if (object == null) {
    return emptyIterator;
  }
  if (object[Symbol.iterator] instanceof Function || object[Symbol.asyncIterator] instanceof Function) {
    return object;
  }
  if (Object.getPrototypeOf(object).constructor == Object) {
    return Object.entries(object);
  }
  return emptyIterator;
};
var Stop = Symbol("iterationStop");
var iter = (object) => {
  const iterable = makeIterable(object);
  if (iterable[Symbol.asyncIterator]) {
    return iterable[Symbol.asyncIterator]();
  } else {
    return iterable[Symbol.iterator]();
  }
};
async function asyncIteratorToList(asyncIterator) {
  const results = [];
  for await (const each of asyncIterator) {
    results.push(each);
  }
  return results;
}
var zip = function* (...iterables) {
  iterables = iterables.map((each) => iter(each));
  while (true) {
    const nexts = iterables.map((each) => each.next());
    if (nexts.every((each) => each.done)) {
      break;
    }
    yield nexts.map((each) => each.value);
  }
};
var ERROR_WHILE_MAPPING_MESSAGE = "Threw while mapping.";
function concurrentlyTransform({ iterator, transformFunction, poolLimit = null, awaitAll = false }) {
  poolLimit = poolLimit || concurrentlyTransform.defaultPoolLimit;
  const res = new TransformStream({
    async transform(p5, controller) {
      try {
        const s = await p5;
        controller.enqueue(s);
      } catch (e3) {
        if (e3 instanceof AggregateError && e3.message == ERROR_WHILE_MAPPING_MESSAGE) {
          controller.error(e3);
        }
      }
    }
  });
  const mainPromise = (async () => {
    const writer = res.writable.getWriter();
    const executing = [];
    try {
      let index = 0;
      for await (const item of iterator) {
        const p5 = Promise.resolve().then(() => transformFunction(item, index));
        index++;
        writer.write(p5);
        const e3 = p5.then(() => executing.splice(executing.indexOf(e3), 1));
        executing.push(e3);
        if (executing.length >= poolLimit) {
          await Promise.race(executing);
        }
      }
      await Promise.all(executing);
      writer.close();
    } catch {
      const errors = [];
      for (const result of await Promise.allSettled(executing)) {
        if (result.status == "rejected") {
          errors.push(result.reason);
        }
      }
      writer.write(Promise.reject(
        new AggregateError(errors, ERROR_WHILE_MAPPING_MESSAGE)
      )).catch(() => {
      });
    }
  })();
  const asyncIterator = res.readable[Symbol.asyncIterator]();
  if (!awaitAll) {
    return asyncIterator;
  } else {
    return mainPromise.then(() => asyncIteratorToList(asyncIterator));
  }
}
concurrentlyTransform.defaultPoolLimit = 40;

// https://deno.land/x/good@1.4.4.3/string.js
var indent = ({ string, by = "    ", noLead = false }) => (noLead ? "" : by) + string.replace(/\n/g, "\n" + by);
var toString = (value) => {
  if (typeof value == "symbol") {
    return toRepresentation(value);
  } else if (!(value instanceof Object)) {
    return value != null ? value.toString() : `${value}`;
  } else {
    return toRepresentation(value);
  }
};
var reprSymbol = Symbol.for("representation");
var denoInspectSymbol = Symbol.for("Deno.customInspect");
var toRepresentation = (item) => {
  const alreadySeen = /* @__PURE__ */ new Set();
  const recursionWrapper = (item2) => {
    if (item2 instanceof Object) {
      if (alreadySeen.has(item2)) {
        return `[Self Reference]`;
      } else {
        alreadySeen.add(item2);
      }
    }
    let output2;
    if (item2 === void 0) {
      output2 = "undefined";
    } else if (item2 === null) {
      output2 = "null";
    } else if (typeof item2 == "string") {
      output2 = JSON.stringify(item2);
    } else if (typeof item2 == "symbol") {
      if (!item2.description) {
        output2 = "Symbol()";
      } else {
        const globalVersion = Symbol.for(item2.description);
        if (globalVersion == item2) {
          output2 = `Symbol.for(${JSON.stringify(item2.description)})`;
        } else {
          output2 = `Symbol(${JSON.stringify(item2.description)})`;
        }
      }
    } else if (item2 instanceof Date) {
      output2 = `new Date(${item2.getTime()})`;
    } else if (item2 instanceof Array) {
      output2 = `[${item2.map((each) => recursionWrapper(each)).join(",")}]`;
    } else if (item2 instanceof Set) {
      output2 = `new Set(${[...item2].map((each) => recursionWrapper(each)).join(",")})`;
    } else if (item2 instanceof Object && item2.constructor == Object) {
      output2 = pureObjectRepr(item2);
    } else if (item2 instanceof Map) {
      let string = "new Map(";
      for (const [key2, value] of item2.entries()) {
        const stringKey = recursionWrapper(key2);
        const stringValue = recursionWrapper(value);
        if (!stringKey.match(/\n/g)) {
          string += `
  [${stringKey}, ${indent({ string: stringValue, by: "  ", noLead: true })}],`;
        } else {
          string += `
  [${indent({ string: stringKey, by: "  ", noLead: true })},
  ${indent({ string: stringValue, by: "    ", noLead: true })}],`;
        }
      }
      string += "\n)";
      output2 = string;
    } else {
      if (item2[reprSymbol] instanceof Function) {
        try {
          output2 = item2[reprSymbol]();
          return output2;
        } catch (error) {
        }
      }
      if (item2[denoInspectSymbol] instanceof Function) {
        try {
          output2 = item2[denoInspectSymbol]();
          return output2;
        } catch (error) {
        }
      }
      try {
        output2 = item2.toString();
        if (output2 !== "[object Object]") {
          return output2;
        }
      } catch (error) {
      }
      try {
        if (item2.constructor instanceof Function && item2.prototype && typeof item2.name == "string") {
          output2 = `class ${item2.name} { /*...*/ }`;
          return output2;
        }
      } catch (error) {
      }
      try {
        if (item2.constructor instanceof Function && typeof item2.constructor.name == "string") {
          output2 = `new ${item2.constructor.name}(${pureObjectRepr(item2)})`;
          return output2;
        }
      } catch (error) {
      }
      return pureObjectRepr(item2);
    }
    return output2;
  };
  const pureObjectRepr = (item2) => {
    let string = "{";
    for (const [key2, value] of Object.entries(item2)) {
      const stringKey = recursionWrapper(key2);
      const stringValue = recursionWrapper(value);
      string += `
  ${stringKey}: ${indent({ string: stringValue, by: "  ", noLead: true })},`;
    }
    string += "\n}";
    return string;
  };
  return recursionWrapper(item);
};
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
    (m3) => reservedCharMap[m3]
  );
}
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
  const output2 = new Proxy(regex3, regexProxyOptions);
  Object.setPrototypeOf(output2, Object.getPrototypeOf(regex3));
  return output2;
};
function regexWithStripWarning(shouldStrip) {
  return (strings, ...values) => {
    let newRegexString = "";
    for (const [string, value] of zip(strings, values)) {
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
var textDecoder = new TextDecoder("utf-8");
var textEncoder = new TextEncoder("utf-8");
var utf8BytesToString = textDecoder.decode.bind(textDecoder);
var stringToUtf8Bytes = textEncoder.encode.bind(textEncoder);

// https://deno.land/x/good@0.7.8/value.js
var primitiveArrayClasses = [Uint16Array, Uint32Array, Uint8Array, Uint8ClampedArray, Int16Array, Int32Array, Int8Array, Float32Array, Float64Array, globalThis.BigInt64Array, globalThis.BigUint64Array].filter((each) => each);
var allKeys2 = function(obj) {
  let keys = [];
  if (obj == null) {
    return [];
  }
  if (!(obj instanceof Object)) {
    obj = Object.getPrototypeOf(obj);
  }
  while (obj) {
    keys = keys.concat(Reflect.ownKeys(obj));
    obj = Object.getPrototypeOf(obj);
  }
  return keys;
};
var ownKeyDescriptions2 = Object.getOwnPropertyDescriptors;
var allKeyDescriptions2 = function(value, options = { includingBuiltin: false }) {
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
var MapIterator2 = Object.getPrototypeOf((/* @__PURE__ */ new Map()).keys());
var SetIterator2 = Object.getPrototypeOf((/* @__PURE__ */ new Set()).keys());
var GeneratorFunction2 = class {
};
var AsyncGeneratorFunction2 = class {
};
try {
  GeneratorFunction2 = eval("((function*(){})()).constructor");
  AsyncGeneratorFunction2 = eval("((async function*(){})()).constructor");
} catch (error) {
}
var isGeneratorType2 = (value) => {
  if (value instanceof Object) {
    const prototype = Object.getPrototypeOf(value);
    if (prototype == MapIterator2 || prototype == SetIterator2) {
      return true;
    }
    const constructor = value.constructor;
    return constructor == GeneratorFunction2 || constructor == AsyncGeneratorFunction2;
  }
  return false;
};
var deepCopySymbol2 = Symbol.for("deepCopy");
var clonedFromSymbol2 = Symbol();
var getThis2 = Symbol();
Object.getPrototypeOf(function() {
})[getThis2] = function() {
  return this;
};
function deepCopyInner2(value, valueChain = [], originalToCopyMap = /* @__PURE__ */ new Map()) {
  valueChain.push(value);
  if (value == null) {
    return value;
  }
  if (!(value instanceof Object)) {
    return value;
  }
  if (originalToCopyMap.has(value)) {
    return originalToCopyMap.get(value);
  }
  if (value[deepCopySymbol2] instanceof Function) {
    const clonedValue = value[deepCopySymbol2]();
    originalToCopyMap.set(value, clonedValue);
    return clonedValue;
  }
  if (isGeneratorType2(value)) {
    throw Error(`Sadly built-in generators cannot be deep copied.
And I found a generator along this path:
${valueChain.reverse().map((each) => `${each},
`)}`);
  }
  let object, theThis, thisCopy;
  if (value instanceof Date) {
    object = new Date(value.getTime());
  } else if (value instanceof RegExp) {
    object = new RegExp(value);
  } else if (value instanceof Function) {
    theThis = value[getThis2]();
    object = function(...args2) {
      return value.apply(thisCopy, args2);
    };
  } else if (primitiveArrayClasses.includes(value.constructor)) {
    object = new value.constructor([...value]);
  } else if (value instanceof Array) {
    object = [];
  } else if (value instanceof Set) {
    object = /* @__PURE__ */ new Set();
  } else if (value instanceof Map) {
    object = /* @__PURE__ */ new Map();
  }
  originalToCopyMap.set(value, object);
  if (object instanceof Function) {
    thisCopy = deepCopyInner2(theThis, valueChain, originalToCopyMap);
  }
  const output2 = object;
  try {
    output2.constructor = value.constructor;
  } catch (error) {
  }
  Object.setPrototypeOf(output2, Object.getPrototypeOf(value));
  const propertyDefinitions = {};
  for (const [key2, description] of Object.entries(Object.getOwnPropertyDescriptors(value))) {
    const { value: value2, get, set, ...options } = description;
    const getIsFunc = get instanceof Function;
    const setIsFunc = set instanceof Function;
    if (getIsFunc || setIsFunc) {
      propertyDefinitions[key2] = {
        ...options,
        get: get ? function(...args2) {
          return get.apply(output2, args2);
        } : void 0,
        set: set ? function(...args2) {
          return set.apply(output2, args2);
        } : void 0
      };
    } else {
      if (key2 == "length" && output2 instanceof Array) {
        continue;
      }
      propertyDefinitions[key2] = {
        ...options,
        value: deepCopyInner2(value2, valueChain, originalToCopyMap)
      };
    }
  }
  Object.defineProperties(output2, propertyDefinitions);
  return output2;
}
var deepCopy2 = (value) => deepCopyInner2(value);
var shallowSortObject2 = (obj) => {
  return Object.keys(obj).sort().reduce(
    (newObj, key2) => {
      newObj[key2] = obj[key2];
      return newObj;
    },
    {}
  );
};
var deepSortObject2 = (obj, seen = /* @__PURE__ */ new Map()) => {
  if (!(obj instanceof Object)) {
    return obj;
  } else if (seen.has(obj)) {
    return seen.get(obj);
  } else {
    if (obj instanceof Array) {
      const sortedChildren = [];
      seen.set(obj, sortedChildren);
      for (const each of obj) {
        sortedChildren.push(deepSortObject2(each, seen));
      }
      return sortedChildren;
    } else {
      const sorted = {};
      seen.set(obj, sorted);
      for (const eachKey of Object.keys(obj).sort()) {
        sorted[eachKey] = deepSortObject2(obj[eachKey], seen);
      }
      return sorted;
    }
  }
};
var stableStringify2 = (value, ...args2) => {
  return JSON.stringify(deepSortObject2(value), ...args2);
};

// https://deno.land/x/elementalist@0.5.34/main/deno.js?code
var FIELD = "\uE000";
var QUOTES = "\uE001";
function htm(statics) {
  let h5 = this, prev = 0, current = [null], field = 0, args2, name, value, quotes = [], quote = 0, last, level = 0, pre = false;
  const evaluate = (str2, parts = [], raw) => {
    let i5 = 0;
    str2 = !raw && str2 === QUOTES ? quotes[quote++].slice(1, -1) : str2.replace(/\ue001/g, (m3) => quotes[quote++]);
    if (!str2)
      return str2;
    str2.replace(/\ue000/g, (match, idx) => {
      if (idx)
        parts.push(str2.slice(i5, idx));
      i5 = idx + 1;
      return parts.push(arguments[++field]);
    });
    if (i5 < str2.length)
      parts.push(str2.slice(i5));
    return parts.length > 1 ? parts : parts[0];
  };
  const up = () => {
    ;
    [current, last, ...args2] = current;
    current.push(h5(last, ...args2));
    if (pre === level--)
      pre = false;
  };
  let str = statics.join(FIELD).replace(/<!--[^]*?-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (match) => (quotes.push(match), QUOTES));
  str.replace(/(?:^|>)((?:[^<]|<[^\w\ue000\/?!>])*)(?:$|<)/g, (match, text, idx, str2) => {
    let tag, close2;
    if (idx) {
      str2.slice(prev, idx).replace(/(\S)\/$/, "$1 /").split(/\s+/).map((part, i5) => {
        if (part[0] === "/") {
          part = part.slice(1);
          if (EMPTY[part])
            return;
          close2 = tag || part || 1;
        } else if (!i5) {
          tag = evaluate(part);
          if (typeof tag === "string") {
            while (CLOSE[current[1] + tag])
              up();
          }
          current = [current, tag, null];
          level++;
          if (!pre && PRE[tag])
            pre = level;
          if (EMPTY[tag])
            close2 = tag;
        } else if (part) {
          let props = current[2] || (current[2] = {});
          if (part.slice(0, 3) === "...") {
            Object.assign(props, arguments[++field]);
          } else {
            ;
            [name, value] = part.split("=");
            Array.isArray(value = props[evaluate(name)] = value ? evaluate(value) : true) && // if prop value is array - make sure it serializes as string without csv
            (value.toString = value.join.bind(value, ""));
          }
        }
      });
    }
    if (close2) {
      if (!current[0])
        err(`Wrong close tag \`${close2}\``);
      up();
      while (last !== close2 && CLOSE[last])
        up();
    }
    prev = idx + match.length;
    if (!pre)
      text = text.replace(/\s*\n\s*/g, "").replace(/\s+/g, " ");
    if (text)
      evaluate((last = 0, text), current, true);
  });
  if (current[0] && CLOSE[current[1]])
    up();
  if (level)
    err(`Unclosed \`${current[1]}\`.`);
  return current.length < 3 ? current[1] : (current.shift(), current);
}
var err = (msg) => {
  throw SyntaxError(msg);
};
var EMPTY = htm.empty = {};
var CLOSE = htm.close = {};
var PRE = htm.pre = {};
"area base basefont bgsound br col command embed frame hr image img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((v9) => htm.empty[v9] = true);
var close = {
  li: "",
  dt: "dd",
  dd: "dt",
  p: "address article aside blockquote details div dl fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol pre section table",
  rt: "rp",
  rp: "rt",
  optgroup: "",
  option: "optgroup",
  caption: "tbody thead tfoot tr colgroup",
  colgroup: "thead tbody tfoot tr caption",
  thead: "tbody tfoot caption",
  tbody: "tfoot caption",
  tfoot: "caption",
  tr: "tbody tfoot",
  td: "th tr",
  th: "td tr tbody"
};
for (let tag in close) {
  for (let closer of [...close[tag].split(" "), tag])
    htm.close[tag] = htm.close[tag + closer] = true;
}
"pre textarea".split(" ").map((v9) => htm.pre[v9] = true);
var xhtm = htm;
var validStyleAttribute = Object.freeze(/* @__PURE__ */ new Set(["accent-color", "align-content", "align-items", "align-self", "align-tracks", "all", "animation", "animation-delay", "animation-direction", "animation-duration", "animation-fill-mode", "animation-iteration-count", "animation-name", "animation-play-state", "animation-timeline", "animation-timing-function", "appearance", "ascent-override", "aspect-ratio", "backdrop-filter", "backface-visibility", "background", "background-attachment", "background-blend-mode", "background-clip", "background-color", "background-image", "background-origin", "background-position", "background-position-x", "background-position-y", "background-repeat", "background-size", "bleed", "block-overflow", "block-size", "border", "border-block", "border-block-color", "border-block-end", "border-block-end-color", "border-block-end-style", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-style", "border-block-start-width", "border-block-style", "border-block-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-style", "border-bottom-width", "border-collapse", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image", "border-image-outset", "border-image-repeat", "border-image-slice", "border-image-source", "border-image-width", "border-inline", "border-inline-color", "border-inline-end", "border-inline-end-color", "border-inline-end-style", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-style", "border-inline-start-width", "border-inline-style", "border-inline-width", "border-left", "border-left-color", "border-left-style", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-style", "border-right-width", "border-spacing", "border-start-end-radius", "border-start-start-radius", "border-style", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-style", "border-top-width", "border-width", "bottom", "box-decoration-break", "box-shadow", "box-sizing", "break-after", "break-before", "break-inside", "caption-side", "caret-color", "clear", "clip", "clip-path", "color", "color-scheme", "column-count", "column-fill", "column-gap", "column-rule", "column-rule-color", "column-rule-style", "column-rule-width", "column-span", "column-width", "columns", "contain", "content", "content-visibility", "counter-increment", "counter-reset", "counter-set", "cursor", "length", "angle", "descent-override", "direction", "display", "resolution", "empty-cells", "fallback", "filter", "flex", "flex-basis", "flex-direction", "flex-flow", "flex-grow", "flex-shrink", "flex-wrap", "flex_value", "float", "font", "font-display", "font-family", "font-feature-settings", "font-kerning", "font-language-override", "font-optical-sizing", "font-size", "font-size-adjust", "font-stretch", "font-style", "font-synthesis", "font-variant", "font-variant-alternates", "font-variant-caps", "font-variant-east-asian", "font-variant-ligatures", "font-variant-numeric", "font-variant-position", "font-variation-settings", "font-weight", "forced-color-adjust", "gap", "grid", "grid-area", "grid-auto-columns", "grid-auto-flow", "grid-auto-rows", "grid-column", "grid-column-end", "grid-column-start", "grid-row", "grid-row-end", "grid-row-start", "grid-template", "grid-template-areas", "grid-template-columns", "grid-template-rows", "frequency", "hanging-punctuation", "height", "hyphenate-character", "hyphens", "image-orientation", "image-rendering", "image-resolution", "inherit", "inherits", "initial", "initial-letter", "initial-letter-align", "initial-value", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "isolation", "justify-content", "justify-items", "justify-self", "justify-tracks", "left", "letter-spacing", "line-break", "line-clamp", "line-gap-override", "line-height", "line-height-step", "list-style", "list-style-image", "list-style-position", "list-style-type", "margin", "margin-block", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "margin-trim", "marks", "mask", "mask-border", "mask-border-mode", "mask-border-outset", "mask-border-repeat", "mask-border-slice", "mask-border-source", "mask-border-width", "mask-clip", "mask-composite", "mask-image", "mask-mode", "mask-origin", "mask-position", "mask-repeat", "mask-size", "mask-type", "masonry-auto-flow", "math-style", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "max-zoom", "min-block-size", "min-height", "min-inline-size", "min-width", "min-zoom", "mix-blend-mode", "time", "negative", "object-fit", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "orientation", "orphans", "outline", "outline-color", "outline-offset", "outline-style", "outline-width", "overflow", "overflow-anchor", "overflow-block", "overflow-clip-margin", "overflow-inline", "overflow-wrap", "overflow-x", "overflow-y", "overscroll-behavior", "overscroll-behavior-block", "overscroll-behavior-inline", "overscroll-behavior-x", "overscroll-behavior-y", "Pseudo-classes", "Pseudo-elements", "pad", "padding", "padding-block", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "page-break-after", "page-break-before", "page-break-inside", "paint-order", "perspective", "perspective-origin", "place-content", "place-items", "place-self", "pointer-events", "position", "prefix", "print-color-adjust", "quotes", "range", "resize", "revert", "right", "rotate", "row-gap", "ruby-align", "ruby-merge", "ruby-position", "scale", "scroll-behavior", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-align", "scroll-snap-stop", "scroll-snap-type", "scrollbar-color", "scrollbar-gutter", "scrollbar-width", "shape-image-threshold", "shape-margin", "shape-outside", "size", "size-adjust", "speak-as", "src", "suffix", "symbols", "syntax", "system", "tab-size", "table-layout", "text-align", "text-align-last", "text-combine-upright", "text-decoration", "text-decoration-color", "text-decoration-line", "text-decoration-skip", "text-decoration-skip-ink", "text-decoration-style", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-emphasis-position", "text-emphasis-style", "text-indent", "text-justify", "text-orientation", "text-overflow", "text-rendering", "text-shadow", "text-size-adjust", "text-transform", "text-underline-offset", "text-underline-position", "top", "touch-action", "transform", "transform-box", "transform-origin", "transform-style", "transition", "transition-delay", "transition-duration", "transition-property", "transition-timing-function", "translate", "unicode-bidi", "unicode-range", "unset", "user-select", "user-zoom", "vertical-align", "viewport-fit", "visibility", "white-space", "widows", "width", "will-change", "word-break", "word-spacing", "word-wrap", "writing-mode", "z-index", "zoom"]));
var validNonCallbackHtmlAttributes = Object.freeze(/* @__PURE__ */ new Set(["class", "style", "value", "id", "contenteditable", "href", "hidden", "autofocus", "src", "name", "accept", "accesskey", "action", "align", "alt", "async", "autocomplete", "autoplay", "border", "charset", "checked", "cite", "cols", "colspan", "content", "controls", "coords", "data", "datetime", "default", "defer", "dir", "dirname", "disabled", "download", "draggable", "enctype", "for", "form", "formaction", "headers", "high", "hreflang", "http", "ismap", "kind", "label", "lang", "list", "loop", "low", "max", "maxlength", "media", "method", "min", "multiple", "muted", "novalidate", "open", "optimum", "pattern", "placeholder", "poster", "preload", "readonly", "rel", "required", "reversed", "rows", "rowspan", "sandbox", "scope", "selected", "shape", "size", "sizes", "span", "spellcheck", "srcdoc", "srclang", "srcset", "start", "step", "tabindex", "target", "title", "translate", "type", "usemap", "wrap", "bgcolor", "width", "color", "height"]));
var isValidStyleAttribute = (key2) => key2.startsWith("-") || validStyleAttribute.has(key2);
var kebabCase = (string) => string.replace(/[a-z]([A-Z])(?=[a-z])/g, (each) => `${each[0]}-${each.slice(1).toLowerCase()}`);
var isConstructor = (obj) => !!obj.prototype && !!obj.prototype.constructor.name;
var attachProperties = (source, target) => {
  const attributes = allKeyDescriptions2(source);
  const propertiesDefition = {};
  for (const [key2, value] of Object.entries(attributes)) {
    if (["constructor", "prototype", "length"].includes(key2)) {
      continue;
    }
    propertiesDefition[key2] = {
      get: () => source[key2]
    };
  }
  Object.defineProperties(target, propertiesDefition);
  return target;
};
var toHtmlElement = Symbol.for("toHtmlElement");
var ElementalClass = class _ElementalClass {
  constructor(components2 = {}, options = {}) {
    const { middleware, errorComponentFactory, defaultPlaceholderFactory } = options || {};
    this.components = components2 || {};
    this.middleware = middleware || {};
    this.defaultPlaceholderFactory = defaultPlaceholderFactory || (() => document.createElement("div"));
    this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory;
    this.html = this.createElement.bind(this);
    this.xhtm = xhtm.bind((...args2) => this.createElement(...args2));
  }
  static debug = false;
  static allTags = Symbol.for("allTags");
  static exclusivelySvgElements = /* @__PURE__ */ new Set(["svg", "animate", "animateMotion", "animateTransform", "circle", "clipPath", "defs", "desc", "discard", "ellipse", "feBlend", "feColorMatrix", "feComponentTransfer", "feComposite", "feConvolveMatrix", "feDiffuseLighting", "feDisplacementMap", "feDistantLight", "feDropShadow", "feFlood", "feFuncA", "feFuncB", "feFuncG", "feFuncR", "feGaussianBlur", "feImage", "feMerge", "feMergeNode", "feMorphology", "feOffset", "fePointLight", "feSpecularLighting", "feSpotLight", "feTile", "feTurbulence", "filter", "foreignObject", "g", "hatch", "hatchpath", "image", "line", "linearGradient", "marker", "mask", "mesh", "meshgradient", "meshpatch", "meshrow", "metadata", "mpath", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "set", "stop", "switch", "symbol", "text", "textPath", "tspan", "unknown", "use", "view"]);
  static randomId = (name) => `${name}${Math.random()}`.replace(".", "");
  static makeHtmlElement = function(element2) {
    if (element2 instanceof Node || element2 instanceof Element || element2 instanceof HTMLDocument) {
      return element2;
    } else {
      if (element2 == null) {
        return new window.Text("");
      } else if (typeof element2 == "string") {
        return new window.Text(element2);
      } else if (typeof element2 == "symbol") {
        return new window.Text(element2.toString());
      } else if (!(element2 instanceof Object)) {
        return new window.Text(`${element2}`);
      } else if (element2[toHtmlElement] != null) {
        return _ElementalClass.makeHtmlElement(element2[toHtmlElement]);
      } else {
        throw Error(`Cannot coerce ${element2} into an html element`);
      }
    }
  };
  static appendChildren = function(element2, ...children) {
    const { element: altElement, insertBefore } = element2;
    let primitiveAppend = (child) => element2.appendChild(child);
    if (insertBefore && !(insertBefore instanceof Function)) {
      element2 = altElement;
      primitiveAppend = (child) => element2.insertBefore(insertBefore, child);
    }
    for (const each of children) {
      if (each instanceof Array) {
        _ElementalClass.appendChildren(element2, ...each);
      } else if (each instanceof Function) {
        _ElementalClass.appendChildren(element2, each());
      } else if (each instanceof Promise) {
        const elementPromise = each;
        const placeholder = elementPromise.placeholder || document.createElement("div");
        primitiveAppend(placeholder);
        setTimeout(async () => {
          try {
            const result = await elementPromise;
            if (!(result instanceof Array)) {
              const htmlElement = _ElementalClass.makeHtmlElement(result);
              placeholder.replaceWith(htmlElement);
            } else {
              let parentElement = placeholder.parentElement;
              if (!parentElement) {
                parentElement = await new Promise((resolve, reject) => {
                  let intervalId = setInterval(() => {
                    if (placeholder.parentElement) {
                      resolve(placeholder.parentElement);
                      clearInterval(intervalId);
                    }
                  }, 70);
                });
              }
              for (const each2 of result) {
                try {
                  _ElementalClass.appendChildren({
                    element: parentElement,
                    insertBefore: placeholder
                  }, each2);
                } catch (error) {
                  parentElement.insertBefore(placeholder, createErrorElement(`When async component ${toString(element2)} resolved, it created an array. One of those elements in the array caused an error when it tried to be added as a child:
 ${toString(error)}`));
                }
              }
            }
          } catch (error) {
            placeholder.replaceWith(
              defaultErrorComponentFactory({ ...properties, children }, key, error)
            );
          }
        }, 0);
      } else {
        primitiveAppend(_ElementalClass.makeHtmlElement(each));
      }
    }
    return element2;
  };
  static css = function(first, ...args2) {
    if (typeof first == "string") {
      return first;
    } else if (first == null) {
      return "";
    } else if (first instanceof Array) {
      const strings = first;
      const values = args2;
      let finalString = "";
      for (const each of strings) {
        finalString += each;
        if (values.length > 0) {
          const value = values.shift();
          if (value instanceof Object) {
            finalString += Elemental.css(value);
          } else {
            finalString += `${value}`;
          }
        }
      }
      return finalString;
    } else if (first instanceof Object) {
      let finalString = "";
      for (const [key2, value] of Object.entries(first)) {
        if (value != null) {
          finalString += `${kebabCase(key2)}: ${value};`;
        }
      }
      return finalString;
    } else {
      return first;
    }
  };
  static combineClasses = (...classes) => {
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
  createElement(...args2) {
    if (args2[0] instanceof Array) {
      return this.xhtm(...args2);
    } else {
      _ElementalClass.debug && console.debug(`args is:`, args2);
      for (const middleware of (this.middleware[_ElementalClass.allTags] || []).concat(this.middleware[args2[0]] || [])) {
        try {
          args2 = eachMiddleWare(args2);
        } catch (error) {
          console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args2);
        }
      }
      let [key2, properties2, ...children] = args2;
      _ElementalClass.debug && console.debug(`key, properties, children is:`, key2, properties2, children);
      if (this.components[key2] instanceof Function) {
        key2 = this.components[key2];
      }
      if (key2 instanceof Function) {
        let output2;
        try {
          output2 = isConstructor(key2) ? new key2({ ...properties2, children }) : key2({ ...properties2, children });
        } catch (error) {
          return this.errorComponentFactory({ ...properties2, children }, key2, error);
        }
        if (output2 instanceof Promise) {
          const elementPromise = output2;
          const placeholder = elementPromise.placeholder || this.defaultPlaceholderFactory(output2);
          setTimeout(async () => {
            try {
              const result = await elementPromise;
              if (!(result instanceof Array)) {
                const htmlElement = _ElementalClass.makeHtmlElement(result);
                placeholder.replaceWith(htmlElement);
              } else {
                let parentElement = placeholder.parentElement;
                if (!parentElement) {
                  parentElement = await new Promise((resolve, reject) => {
                    let intervalId = setInterval(() => {
                      if (placeholder.parentElement) {
                        resolve(placeholder.parentElement);
                        clearInterval(intervalId);
                      }
                    }, 70);
                  });
                }
                for (const each of result) {
                  try {
                    _ElementalClass.appendChildren({
                      element: parentElement,
                      insertBefore: placeholder
                    }, each);
                  } catch (error) {
                    parentElement.insertBefore(placeholder, createErrorElement(`Something returned a promise, which resolved to an array, and then something tried to append those to an element (this element: ${element2}). One of the items in the array ${each} caused an error when it tried to be added as a child:
 ${toString(error)}`));
                  }
                }
              }
            } catch (error) {
              placeholder.replaceWith(
                this.errorComponentFactory({ ...properties2, children }, key2, error)
              );
            }
          }, 0);
          return placeholder;
        } else {
          return output2;
        }
      }
      const isSvg = _ElementalClass.exclusivelySvgElements.has(key2);
      const element2 = isSvg ? document.createElementNS("http://www.w3.org/2000/svg", key2) : document.createElement(key2);
      let styleString = "";
      if (properties2 instanceof Object) {
        for (let [key3, value] of Object.entries(properties2)) {
          if (key3 == "style") {
            styleString += _ElementalClass.css(value);
            continue;
          }
          if (key3.slice(0, 2) == "on" && key3.slice(2, 3).toLowerCase() !== key3.slice(2, 3) && value instanceof Function) {
            element2.addEventListener(key3.slice(2).toLowerCase(), value);
          }
          if (key3 == "class") {
            if (value instanceof Array) {
              value = value.join(" ");
            } else if (value instanceof Object) {
              let newValue = "";
              for (const [classString, enable] of Object.entries(value)) {
                if (enable) {
                  newValue += classString;
                }
              }
              value = newValue;
            }
          }
          if (isSvg) {
            if (value instanceof Array) {
              value = value.join(" ");
            }
            element2.setAttribute(kebabCase(key3), value);
            continue;
          }
          if (value != null && !(value instanceof Object) && validNonCallbackHtmlAttributes.has(key3)) {
            element2.setAttribute(key3, value);
          }
          try {
            element2[key3] = value;
          } catch (error) {
          }
          if (isValidStyleAttribute(key3)) {
            styleString += `;${key3}: ${value};`;
          }
        }
      }
      if (styleString) {
        element2.setAttribute("style", styleString);
      }
      return _ElementalClass.appendChildren(element2, ...children);
    }
  }
  extend(additionalComponents = {}, options = {}) {
    const { middleware, ...other } = options || {};
    return Elemental(
      { ...this.components, ...additionalComponents },
      {
        middleware: { ...this.middleware, ...middleware },
        ...other
      }
    );
  }
};
var Elemental = (...args2) => {
  const elementalObject = new ElementalClass(...args2);
  const createElementFunction = elementalObject.createElement.bind(elementalObject);
  attachProperties(ElementalClass, createElementFunction);
  attachProperties(elementalObject, createElementFunction);
  return createElementFunction;
};
attachProperties(ElementalClass, Elemental);
function createErrorElement(error) {
  const element2 = document.createElement("div");
  element2.setAttribute("style", `
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
    `);
  element2.innerHTML = `I'm sorry, there was an error when loading this part of the page \u{1F641}.<br>Here's the error message: ${Option(toString(error != null && error.message || error)).innerHTML}`;
}
function defaultErrorComponentFactory({ children, ...properties2 }, key2, error) {
  const element2 = document.createElement("div");
  const errorDetails = document.createElement("code");
  const childContainer = document.createElement("div");
  element2.setAttribute("style", `
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
    `);
  element2.innerHTML = `I'm sorry, there was an error when loading this part of the page \u{1F641} `;
  let errorElementPart;
  if (typeof key2 == "string") {
    errorElementPart = `<${key2} />`;
  } else {
    try {
      errorElementPart = `<${key2.prototype.constructor.name} />`;
    } catch (error2) {
      try {
        errorElementPart = `<${key2.name} />`;
      } catch (error3) {
        errorElementPart = `<${key2} />`;
      }
    }
  }
  let errorJsonObject = {};
  for (const [key3, value] of Object.entries(properties2)) {
    try {
      errorJsonObject[key3] = JSON.parse(JSON.stringify(value));
    } catch (error2) {
      errorJsonObject[key3] = `${value}`;
    }
  }
  errorDetails.innerHTML = `tag: ${errorElementPart}
properties: ${JSON.stringify(errorJsonObject, 0, 4)}
error: ${error}`;
  errorDetails.setAttribute("style", `
        padding: 1rem;
        background-color: #161b22;
        color: #789896;
        white-space: pre;
        max-width: 85vw;
        overflow: auto;
    `);
  element2.appendChild(errorDetails);
  childContainer.setAttribute("style", `
        all: unset
        display: flex
        flex-direction: column
        margin-top: 1.3rem
    `);
  ElementalClass.appendChildren(childContainer, children);
  element2.appendChild(childContainer);
  return element2;
}
try {
  const originalHead = document.head;
  Object.defineProperty(document, "head", {
    set: (element2) => ElementalClass.appendChildren(originalHead, ...element2.childNodes),
    get: () => originalHead,
    writable: true
  });
} catch (error) {
}
var combineClasses = ElementalClass.combineClasses;
var html = Elemental();
var css = ElementalClass.css;
var allTags = ElementalClass.allTags;

// main/helpers/css.bundle.js
function l(r) {
  if (r.sheet)
    return r.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === r)
      return document.styleSheets[t];
}
function a(r) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", r.key), r.nonce !== void 0 && t.setAttribute("nonce", r.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var u = function() {
  function r(n22) {
    var e22 = this;
    this._insertTag = function(i32) {
      var s;
      e22.tags.length === 0 ? e22.insertionPoint ? s = e22.insertionPoint.nextSibling : e22.prepend ? s = e22.container.firstChild : s = e22.before : s = e22.tags[e22.tags.length - 1].nextSibling, e22.container.insertBefore(i32, s), e22.tags.push(i32);
    }, this.isSpeedy = n22.speedy === void 0 ? true : n22.speedy, this.tags = [], this.ctr = 0, this.nonce = n22.nonce, this.key = n22.key, this.container = n22.container, this.prepend = n22.prepend, this.insertionPoint = n22.insertionPoint, this.before = null;
  }
  var t = r.prototype;
  return t.hydrate = function(e22) {
    e22.forEach(this._insertTag);
  }, t.insert = function(e22) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(a(this));
    var i32 = this.tags[this.tags.length - 1];
    if (0)
      var s;
    if (this.isSpeedy) {
      var o32 = l(i32);
      try {
        o32.insertRule(e22, o32.cssRules.length);
      } catch {
      }
    } else
      i32.appendChild(document.createTextNode(e22));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(e22) {
      return e22.parentNode && e22.parentNode.removeChild(e22);
    }), this.tags = [], this.ctr = 0;
  }, r;
}();
var n = "-ms-";
var F = "-moz-";
var o = "-webkit-";
var J = "comm";
var P = "rule";
var K = "decl";
var ir = "@import";
var Q = "@keyframes";
var pr = "@layer";
var fr = Math.abs;
var Y = String.fromCharCode;
var xr = Object.assign;
function ur(r, t) {
  return p(r, 0) ^ 45 ? (((t << 2 ^ p(r, 0)) << 2 ^ p(r, 1)) << 2 ^ p(r, 2)) << 2 ^ p(r, 3) : 0;
}
function X(r) {
  return r.trim();
}
function A(r, t) {
  return (r = t.exec(r)) ? r[0] : r;
}
function c(r, t, e22) {
  return r.replace(t, e22);
}
function _(r, t) {
  return r.indexOf(t);
}
function p(r, t) {
  return r.charCodeAt(t) | 0;
}
function $(r, t, e22) {
  return r.slice(t, e22);
}
function u2(r) {
  return r.length;
}
function L(r) {
  return r.length;
}
function R(r, t) {
  return t.push(r), r;
}
function er(r, t) {
  return r.map(t).join("");
}
var l2 = 1;
var W = 1;
var br = 0;
var h = 0;
var f = 0;
var j = "";
function y(r, t, e22, s, a32, w32, g62) {
  return { value: r, root: t, parent: e22, type: s, props: a32, children: w32, line: l2, column: W, length: g62, return: "" };
}
function B(r, t) {
  return xr(y("", null, null, "", null, null, 0), r, { length: -r.length }, t);
}
function mr() {
  return f;
}
function wr() {
  return f = h > 0 ? p(j, --h) : 0, W--, f === 10 && (W = 1, l2--), f;
}
function E() {
  return f = h < br ? p(j, h++) : 0, W++, f === 10 && (W = 1, l2++), f;
}
function N() {
  return p(j, h);
}
function V() {
  return h;
}
function rr(r, t) {
  return $(j, r, t);
}
function v(r) {
  switch (r) {
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
function sr(r) {
  return l2 = W = 1, br = u2(j = r), h = 0, [];
}
function ar(r) {
  return j = "", r;
}
function G(r) {
  return X(rr(h - 1, cr(r === 91 ? r + 2 : r === 40 ? r + 1 : r)));
}
function Er(r) {
  for (; (f = N()) && f < 33; )
    E();
  return v(r) > 2 || v(f) > 3 ? "" : " ";
}
function kr(r, t) {
  for (; --t && E() && !(f < 48 || f > 102 || f > 57 && f < 65 || f > 70 && f < 97); )
    ;
  return rr(r, V() + (t < 6 && N() == 32 && E() == 32));
}
function cr(r) {
  for (; E(); )
    switch (f) {
      case r:
        return h;
      case 34:
      case 39:
        r !== 34 && r !== 39 && cr(f);
        break;
      case 40:
        r === 41 && cr(r);
        break;
      case 92:
        E();
        break;
    }
  return h;
}
function $r(r, t) {
  for (; E() && r + f !== 57; )
    if (r + f === 84 && N() === 47)
      break;
  return "/*" + rr(t, h - 1) + "*" + Y(r === 47 ? r : E());
}
function or(r) {
  for (; !v(N()); )
    E();
  return rr(r, h);
}
function jr(r) {
  return ar(tr("", null, null, null, [""], r = sr(r), 0, [0], r));
}
function tr(r, t, e22, s, a32, w32, g62, x22, S) {
  for (var M = 0, C = 0, b32 = g62, I = 0, D22 = 0, O = 0, d42 = 1, H = 1, k = 1, m22 = 0, z = "", q2 = a32, U2 = w32, T22 = s, i32 = z; H; )
    switch (O = m22, m22 = E()) {
      case 40:
        if (O != 108 && p(i32, b32 - 1) == 58) {
          _(i32 += c(G(m22), "&", "&\f"), "&\f") != -1 && (k = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        i32 += G(m22);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        i32 += Er(O);
        break;
      case 92:
        i32 += kr(V() - 1, 7);
        continue;
      case 47:
        switch (N()) {
          case 42:
          case 47:
            R(Ar($r(E(), V()), t, e22), S);
            break;
          default:
            i32 += "/";
        }
        break;
      case 123 * d42:
        x22[M++] = u2(i32) * k;
      case 125 * d42:
      case 59:
      case 0:
        switch (m22) {
          case 0:
          case 125:
            H = 0;
          case 59 + C:
            k == -1 && (i32 = c(i32, /\f/g, "")), D22 > 0 && u2(i32) - b32 && R(D22 > 32 ? dr(i32 + ";", s, e22, b32 - 1) : dr(c(i32, " ", "") + ";", s, e22, b32 - 2), S);
            break;
          case 59:
            i32 += ";";
          default:
            if (R(T22 = gr(i32, t, e22, M, C, a32, x22, z, q2 = [], U2 = [], b32), w32), m22 === 123)
              if (C === 0)
                tr(i32, t, T22, T22, q2, w32, b32, x22, U2);
              else
                switch (I === 99 && p(i32, 3) === 110 ? 100 : I) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    tr(r, T22, T22, s && R(gr(r, T22, T22, 0, 0, a32, x22, z, a32, q2 = [], b32), U2), a32, U2, b32, x22, s ? q2 : U2);
                    break;
                  default:
                    tr(i32, T22, T22, T22, [""], U2, 0, x22, U2);
                }
        }
        M = C = D22 = 0, d42 = k = 1, z = i32 = "", b32 = g62;
        break;
      case 58:
        b32 = 1 + u2(i32), D22 = O;
      default:
        if (d42 < 1) {
          if (m22 == 123)
            --d42;
          else if (m22 == 125 && d42++ == 0 && wr() == 125)
            continue;
        }
        switch (i32 += Y(m22), m22 * d42) {
          case 38:
            k = C > 0 ? 1 : (i32 += "\f", -1);
            break;
          case 44:
            x22[M++] = (u2(i32) - 1) * k, k = 1;
            break;
          case 64:
            N() === 45 && (i32 += G(E())), I = N(), C = b32 = u2(z = i32 += or(V())), m22++;
            break;
          case 45:
            O === 45 && u2(i32) == 2 && (d42 = 0);
        }
    }
  return w32;
}
function gr(r, t, e22, s, a32, w32, g62, x22, S, M, C) {
  for (var b32 = a32 - 1, I = a32 === 0 ? w32 : [""], D22 = L(I), O = 0, d42 = 0, H = 0; O < s; ++O)
    for (var k = 0, m22 = $(r, b32 + 1, b32 = fr(d42 = g62[O])), z = r; k < D22; ++k)
      (z = X(d42 > 0 ? I[k] + " " + m22 : c(m22, /&\f/g, I[k]))) && (S[H++] = z);
  return y(r, t, e22, a32 === 0 ? P : x22, S, M, C);
}
function Ar(r, t, e22) {
  return y(r, t, e22, J, Y(mr()), $(r, 2, -2), 0);
}
function dr(r, t, e22, s) {
  return y(r, t, e22, K, $(r, 0, s), $(r, s + 1, -1), s);
}
function Z(r, t) {
  for (var e22 = "", s = L(r), a32 = 0; a32 < s; a32++)
    e22 += t(r[a32], a32, r, t) || "";
  return e22;
}
function qr(r, t, e22, s) {
  switch (r.type) {
    case pr:
      if (r.children.length)
        break;
    case ir:
    case K:
      return r.return = r.return || r.value;
    case J:
      return "";
    case Q:
      return r.return = r.value + "{" + Z(r.children, s) + "}";
    case P:
      r.value = r.props.join(",");
  }
  return u2(e22 = Z(r.children, s)) ? r.return = r.value + "{" + e22 + "}" : "";
}
function tt(r) {
  var t = L(r);
  return function(e22, s, a32, w32) {
    for (var g62 = "", x22 = 0; x22 < t; x22++)
      g62 += r[x22](e22, s, a32, w32) || "";
    return g62;
  };
}
var u3 = function(n22) {
  var t = /* @__PURE__ */ new WeakMap();
  return function(e22) {
    if (t.has(e22))
      return t.get(e22);
    var a32 = n22(e22);
    return t.set(e22, a32), a32;
  };
};
function u4(t) {
  var n22 = /* @__PURE__ */ Object.create(null);
  return function(e22) {
    return n22[e22] === void 0 && (n22[e22] = t(e22)), n22[e22];
  };
}
var rr2 = function(e22, c32, n22) {
  for (var i32 = 0, o32 = 0; i32 = o32, o32 = N(), i32 === 38 && o32 === 12 && (c32[n22] = 1), !v(o32); )
    E();
  return rr(e22, h);
};
var er2 = function(e22, c32) {
  var n22 = -1, i32 = 44;
  do
    switch (v(i32)) {
      case 0:
        i32 === 38 && N() === 12 && (c32[n22] = 1), e22[n22] += rr2(h - 1, c32, n22);
        break;
      case 2:
        e22[n22] += G(i32);
        break;
      case 4:
        if (i32 === 44) {
          e22[++n22] = N() === 58 ? "&\f" : "", c32[n22] = e22[n22].length;
          break;
        }
      default:
        e22[n22] += Y(i32);
    }
  while (i32 = E());
  return e22;
};
var tr2 = function(e22, c32) {
  return ar(er2(sr(e22), c32));
};
var T = /* @__PURE__ */ new WeakMap();
var sr2 = function(e22) {
  if (!(e22.type !== "rule" || !e22.parent || e22.length < 1)) {
    for (var c32 = e22.value, n22 = e22.parent, i32 = e22.column === n22.column && e22.line === n22.line; n22.type !== "rule"; )
      if (n22 = n22.parent, !n22)
        return;
    if (!(e22.props.length === 1 && c32.charCodeAt(0) !== 58 && !T.get(n22)) && !i32) {
      T.set(e22, true);
      for (var o32 = [], g62 = tr2(c32, o32), u72 = n22.props, f42 = 0, w32 = 0; f42 < g62.length; f42++)
        for (var h32 = 0; h32 < u72.length; h32++, w32++)
          e22.props[w32] = o32[f42] ? g62[f42].replace(/&\f/g, u72[h32]) : u72[h32] + " " + g62[f42];
    }
  }
};
var nr = function(e22) {
  if (e22.type === "decl") {
    var c32 = e22.value;
    c32.charCodeAt(0) === 108 && c32.charCodeAt(2) === 98 && (e22.return = "", e22.value = "");
  }
};
function W2(r, e22) {
  switch (ur(r, e22)) {
    case 5103:
      return o + "print-" + r + r;
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
      return o + r + r;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return o + r + F + r + n + r + r;
    case 6828:
    case 4268:
      return o + r + n + r + r;
    case 6165:
      return o + r + n + "flex-" + r + r;
    case 5187:
      return o + r + c(r, /(\w+).+(:[^]+)/, o + "box-$1$2" + n + "flex-$1$2") + r;
    case 5443:
      return o + r + n + "flex-item-" + c(r, /flex-|-self/, "") + r;
    case 4675:
      return o + r + n + "flex-line-pack" + c(r, /align-content|flex-|-self/, "") + r;
    case 5548:
      return o + r + n + c(r, "shrink", "negative") + r;
    case 5292:
      return o + r + n + c(r, "basis", "preferred-size") + r;
    case 6060:
      return o + "box-" + c(r, "-grow", "") + o + r + n + c(r, "grow", "positive") + r;
    case 4554:
      return o + c(r, /([^-])(transform)/g, "$1" + o + "$2") + r;
    case 6187:
      return c(c(c(r, /(zoom-|grab)/, o + "$1"), /(image-set)/, o + "$1"), r, "") + r;
    case 5495:
    case 3959:
      return c(r, /(image-set\([^]*)/, o + "$1$`$1");
    case 4968:
      return c(c(r, /(.+:)(flex-)?(.*)/, o + "box-pack:$3" + n + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + o + r + r;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return c(r, /(.+)-inline(.+)/, o + "$1$2") + r;
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
      if (u2(r) - 1 - e22 > 6)
        switch (p(r, e22 + 1)) {
          case 109:
            if (p(r, e22 + 4) !== 45)
              break;
          case 102:
            return c(r, /(.+:)(.+)-([^]+)/, "$1" + o + "$2-$3$1" + F + (p(r, e22 + 3) == 108 ? "$3" : "$2-$3")) + r;
          case 115:
            return ~_(r, "stretch") ? W2(c(r, "stretch", "fill-available"), e22) + r : r;
        }
      break;
    case 4949:
      if (p(r, e22 + 1) !== 115)
        break;
    case 6444:
      switch (p(r, u2(r) - 3 - (~_(r, "!important") && 10))) {
        case 107:
          return c(r, ":", ":" + o) + r;
        case 101:
          return c(r, /(.+:)([^;!]+)(;|!.+)?/, "$1" + o + (p(r, 14) === 45 ? "inline-" : "") + "box$3$1" + o + "$2$3$1" + n + "$2box$3") + r;
      }
      break;
    case 5936:
      switch (p(r, e22 + 11)) {
        case 114:
          return o + r + n + c(r, /[svh]\w+-[tblr]{2}/, "tb") + r;
        case 108:
          return o + r + n + c(r, /[svh]\w+-[tblr]{2}/, "tb-rl") + r;
        case 45:
          return o + r + n + c(r, /[svh]\w+-[tblr]{2}/, "lr") + r;
      }
      return o + r + n + r + r;
  }
  return r;
}
var cr2 = function(e22, c32, n22, i32) {
  if (e22.length > -1 && !e22.return)
    switch (e22.type) {
      case K:
        e22.return = W2(e22.value, e22.length);
        break;
      case Q:
        return Z([B(e22, { value: c(e22.value, "@", "@" + o) })], i32);
      case P:
        if (e22.length)
          return er(e22.props, function(o32) {
            switch (A(o32, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return Z([B(e22, { props: [c(o32, /:(read-\w+)/, ":" + F + "$1")] })], i32);
              case "::placeholder":
                return Z([B(e22, { props: [c(o32, /:(plac\w+)/, ":" + o + "input-$1")] }), B(e22, { props: [c(o32, /:(plac\w+)/, ":" + F + "$1")] }), B(e22, { props: [c(o32, /:(plac\w+)/, n + "input-$1")] })], i32);
            }
            return "";
          });
    }
};
var ir2 = u3(function() {
  return u4(function() {
    var r = {};
    return function(e22) {
      return r[e22];
    };
  });
});
var ar2 = [cr2];
var hr = function(e22) {
  var c32 = e22.key, n22 = e22.stylisPlugins || ar2, i32 = {}, o32, g62 = [], u72, f42 = [sr2, nr];
  {
    var w32 = [qr], h32 = tt(f42.concat(n22, w32)), z = function(d42) {
      return Z(jr(d42), h32);
    }, x22 = ir2(n22)(c32), D22 = function(d42, y42) {
      var b32 = y42.name;
      return x22[b32] === void 0 && (x22[b32] = z(d42 ? d42 + "{" + y42.styles + "}" : y42.styles)), x22[b32];
    };
    u72 = function(d42, y42, b32, P22) {
      var I = y42.name, E32 = D22(d42, y42);
      if (l42.compat === void 0)
        return P22 && (l42.inserted[I] = true), E32;
      if (P22)
        l42.inserted[I] = E32;
      else
        return E32;
    };
  }
  var l42 = { key: c32, sheet: new u({ key: c32, container: o32, nonce: e22.nonce, speedy: e22.speedy, prepend: e22.prepend, insertionPoint: e22.insertionPoint }), nonce: e22.nonce, inserted: i32, registered: {}, insert: u72 };
  return l42.sheet.hydrate(g62), l42;
};
function c2(e22) {
  for (var f42 = 0, x22, a32 = 0, d42 = e22.length; d42 >= 4; ++a32, d42 -= 4)
    x22 = e22.charCodeAt(a32) & 255 | (e22.charCodeAt(++a32) & 255) << 8 | (e22.charCodeAt(++a32) & 255) << 16 | (e22.charCodeAt(++a32) & 255) << 24, x22 = (x22 & 65535) * 1540483477 + ((x22 >>> 16) * 59797 << 16), x22 ^= x22 >>> 24, f42 = (x22 & 65535) * 1540483477 + ((x22 >>> 16) * 59797 << 16) ^ (f42 & 65535) * 1540483477 + ((f42 >>> 16) * 59797 << 16);
  switch (d42) {
    case 3:
      f42 ^= (e22.charCodeAt(a32 + 2) & 255) << 16;
    case 2:
      f42 ^= (e22.charCodeAt(a32 + 1) & 255) << 8;
    case 1:
      f42 ^= e22.charCodeAt(a32) & 255, f42 = (f42 & 65535) * 1540483477 + ((f42 >>> 16) * 59797 << 16);
  }
  return f42 ^= f42 >>> 13, f42 = (f42 & 65535) * 1540483477 + ((f42 >>> 16) * 59797 << 16), ((f42 ^ f42 >>> 15) >>> 0).toString(36);
}
var o2 = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, boxFlex: 1, boxFlexGroup: 1, boxOrdinalGroup: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexPositive: 1, flexShrink: 1, flexNegative: 1, flexOrder: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, msGridRow: 1, msGridRowSpan: 1, msGridColumn: 1, msGridColumnSpan: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
var g = /[A-Z]|^ms/g;
var N2 = function(n22) {
  return n22.charCodeAt(1) === 45;
};
var d = u4(function(o32) {
  return N2(o32) ? o32 : o32.replace(g, "-$&").toLowerCase();
});
function v2(r, e22, n22) {
  var f42 = "";
  return n22.split(" ").forEach(function(t) {
    r[t] !== void 0 ? e22.push(r[t] + ";") : f42 += t + " ";
  }), f42;
}
var u5 = function(e22, n22, f42) {
  var t = e22.key + "-" + n22.name;
  (f42 === false || e22.compat !== void 0) && e22.registered[t] === void 0 && (e22.registered[t] = n22.styles);
};
var g2 = function(e22, n22, f42) {
  u5(e22, n22, f42);
  var t = e22.key + "-" + n22.name;
  if (e22.inserted[n22.name] === void 0) {
    var s = "", i32 = n22;
    do {
      var d42 = e22.insert(n22 === i32 ? "." + t : "", i32, e22.sheet, true);
      d42 !== void 0 && (s += d42), i32 = i32.next;
    } while (i32 !== void 0);
    if (s.length !== 0)
      return s;
  }
};
var g3 = /[A-Z]|^ms/g;
var b = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var N3 = function(n22) {
  return n22.charCodeAt(1) === 45;
};
var y2 = function(n22) {
  return n22 != null && typeof n22 != "boolean";
};
var d2 = u4(function(o32) {
  return N3(o32) ? o32 : o32.replace(g3, "-$&").toLowerCase();
});
var E2 = function(n22, e22) {
  switch (n22) {
    case "animation":
    case "animationName":
      if (typeof e22 == "string")
        return e22.replace(b, function(a32, s, t) {
          return i = { name: s, styles: t, next: i }, s;
        });
  }
  return o2[n22] !== 1 && !N3(n22) && typeof e22 == "number" && e22 !== 0 ? e22 + "px" : e22;
};
function u6(o32, n22, e22) {
  if (e22 == null)
    return "";
  if (e22.__emotion_styles !== void 0)
    return e22;
  switch (typeof e22) {
    case "boolean":
      return "";
    case "object": {
      if (e22.anim === 1)
        return i = { name: e22.name, styles: e22.styles, next: i }, e22.name;
      if (e22.styles !== void 0) {
        var a32 = e22.next;
        if (a32 !== void 0)
          for (; a32 !== void 0; )
            i = { name: a32.name, styles: a32.styles, next: i }, a32 = a32.next;
        var s = e22.styles + ";";
        return s;
      }
      return w(o32, n22, e22);
    }
    case "function": {
      if (o32 !== void 0) {
        var t = i, r = e22(o32);
        return i = t, u6(o32, n22, r);
      }
      break;
    }
    case "string":
      if (0)
        var c32, p32;
      break;
  }
  if (n22 == null)
    return e22;
  var l42 = n22[e22];
  return l42 !== void 0 ? l42 : e22;
}
function w(o32, n22, e22) {
  var a32 = "";
  if (Array.isArray(e22))
    for (var s = 0; s < e22.length; s++)
      a32 += u6(o32, n22, e22[s]) + ";";
  else
    for (var t in e22) {
      var r = e22[t];
      if (typeof r != "object")
        n22 != null && n22[r] !== void 0 ? a32 += t + "{" + n22[r] + "}" : y2(r) && (a32 += d2(t) + ":" + E2(t, r) + ";");
      else if (Array.isArray(r) && typeof r[0] == "string" && (n22 == null || n22[r[0]] === void 0))
        for (var c32 = 0; c32 < r.length; c32++)
          y2(r[c32]) && (a32 += d2(t) + ":" + E2(t, r[c32]) + ";");
      else {
        var p32 = u6(o32, n22, r);
        switch (t) {
          case "animation":
          case "animationName": {
            a32 += d2(t) + ":" + p32 + ";";
            break;
          }
          default:
            a32 += t + "{" + p32 + "}";
        }
      }
    }
  return a32;
}
var v3 = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var i;
var D = function(n22, e22, a32) {
  if (n22.length === 1 && typeof n22[0] == "object" && n22[0] !== null && n22[0].styles !== void 0)
    return n22[0];
  var s = true, t = "";
  i = void 0;
  var r = n22[0];
  r == null || r.raw === void 0 ? (s = false, t += u6(a32, e22, r)) : t += r[0];
  for (var c32 = 1; c32 < n22.length; c32++)
    t += u6(a32, e22, n22[c32]), s && (t += r[c32]);
  var p32;
  v3.lastIndex = 0;
  for (var l42 = "", f42; (f42 = v3.exec(t)) !== null; )
    l42 += "-" + f42[1];
  var m22 = c2(t) + l42;
  return { name: m22, styles: t, next: i };
};
function v4(f42, u72) {
  if (f42.inserted[u72.name] === void 0)
    return f42.insert("", u72, f42.sheet, true);
}
function g4(f42, u72, e22) {
  var s = [], a32 = v2(f42, s, e22);
  return s.length < 2 ? e22 : a32 + u72(s);
}
var b2 = function(u72) {
  var e22 = hr(u72);
  e22.sheet.speedy = function(c32) {
    this.isSpeedy = c32;
  }, e22.compat = true;
  var s = function() {
    for (var t = arguments.length, n22 = new Array(t), r = 0; r < t; r++)
      n22[r] = arguments[r];
    var o32 = D(n22, e22.registered, void 0);
    return g2(e22, o32, false), e22.key + "-" + o32.name;
  }, a32 = function() {
    for (var t = arguments.length, n22 = new Array(t), r = 0; r < t; r++)
      n22[r] = arguments[r];
    var o32 = D(n22, e22.registered), h32 = "animation-" + o32.name;
    return v4(e22, { name: o32.name, styles: "@keyframes " + h32 + "{" + o32.styles + "}" }), h32;
  }, i32 = function() {
    for (var t = arguments.length, n22 = new Array(t), r = 0; r < t; r++)
      n22[r] = arguments[r];
    var o32 = D(n22, e22.registered);
    v4(e22, o32);
  }, l42 = function() {
    for (var t = arguments.length, n22 = new Array(t), r = 0; r < t; r++)
      n22[r] = arguments[r];
    return g4(e22.registered, s, w2(n22));
  };
  return { css: s, cx: l42, injectGlobal: i32, keyframes: a32, hydrate: function(t) {
    t.forEach(function(n22) {
      e22.inserted[n22] = true;
    });
  }, flush: function() {
    e22.registered = {}, e22.inserted = {}, e22.sheet.flush();
  }, sheet: e22.sheet, cache: e22, getRegisteredStyles: v2.bind(null, e22.registered), merge: g4.bind(null, e22.registered, s) };
};
var w2 = function f2(u72) {
  for (var e22 = "", s = 0; s < u72.length; s++) {
    var a32 = u72[s];
    if (a32 != null) {
      var i32 = void 0;
      switch (typeof a32) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(a32))
            i32 = f2(a32);
          else {
            i32 = "";
            for (var l42 in a32)
              a32[l42] && l42 && (i32 && (i32 += " "), i32 += l42);
          }
          break;
        }
        default:
          i32 = a32;
      }
      i32 && (e22 && (e22 += " "), e22 += i32);
    }
  }
  return e22;
};
var x = b2;
var e = x({ key: "css" });
var a2 = e.flush;
var m = e.hydrate;
var i2 = e.cx;
var h2 = e.merge;
var l3 = e.getRegisteredStyles;
var y3 = e.injectGlobal;
var g5 = e.keyframes;
var f3 = e.css;
var p2 = e.sheet;
var d3 = e.cache;

// main/helpers/setup_styles.js
var setupStyles = (arg, styles) => {
  if (arg.styles) {
    arg.styles = `${styles};${f3(arg.styles)};`;
  } else {
    arg.styles = styles;
  }
  return arg;
};
var setup_styles_default = setupStyles;

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
    for (let i5 = start, curTriplet = 0; i5 < end; i5 += 3) {
      out[curTriplet++] = tripletToBase64(
        (buf[i5] << 16) + (buf[i5 + 1] << 8) + buf[i5 + 2]
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
      let i5;
      for (i5 = 0; i5 < len; i5 += 4) {
        tmp = revLookup3[b64.charCodeAt(i5)] << 18 | revLookup3[b64.charCodeAt(i5 + 1)] << 12 | revLookup3[b64.charCodeAt(i5 + 2)] << 6 | revLookup3[b64.charCodeAt(i5 + 3)];
        buf[curByte++] = tmp >> 16 & 255;
        buf[curByte++] = tmp >> 8 & 255;
        buf[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup3[b64.charCodeAt(i5)] << 2 | revLookup3[b64.charCodeAt(i5 + 1)] >> 4;
        buf[curByte++] = tmp & 255;
      } else if (placeHoldersLen === 1) {
        tmp = revLookup3[b64.charCodeAt(i5)] << 10 | revLookup3[b64.charCodeAt(i5 + 1)] << 4 | revLookup3[b64.charCodeAt(i5 + 2)] >> 2;
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
      for (let i5 = 0; i5 < len2; i5 += maxChunkLength) {
        chunkEnd = i5 + maxChunkLength;
        parts[curChunk++] = encodeChunk(
          buf,
          i5,
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
for (let i5 = 0, l7 = code.length; i5 < l7; ++i5) {
  lookup[i5] = code[i5];
  revLookup[code.charCodeAt(i5)] = i5;
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
for (let i5 = 0, l7 = code2.length; i5 < l7; ++i5) {
  lookup2[i5] = code2[i5];
  revLookup2[code2.charCodeAt(i5)] = i5;
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
  for (let i5 = 0; i5 < end; ++i5) {
    buf[i5] = parseInt(hex.substr(i5 * 2, 2), 16);
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
    for (let i5 = 0, len = msg.length; i5 < len; i5++) {
      this._buf[this._bufIdx++] = msg[i5];
      if (this._bufIdx === 64) {
        this._transform();
        this._bufIdx = 0;
      }
    }
    const c5 = this._count;
    if ((c5[0] += msg.length << 3) < msg.length << 3) {
      c5[1]++;
    }
    c5[1] += msg.length >>> 29;
    return this;
  }
  /** Finalizes the hash with additional message data. */
  digest(outputEncoding) {
    if (this._finalized) {
      throw new Error("digest has already been called.");
    }
    this._finalized = true;
    const b5 = this._buf;
    let idx = this._bufIdx;
    b5[idx++] = 128;
    while (idx !== 56) {
      if (idx === 64) {
        this._transform();
        idx = 0;
      }
      b5[idx++] = 0;
    }
    const c5 = this._count;
    b5[56] = c5[1] >>> 24 & 255;
    b5[57] = c5[1] >>> 16 & 255;
    b5[58] = c5[1] >>> 8 & 255;
    b5[59] = c5[1] >>> 0 & 255;
    b5[60] = c5[0] >>> 24 & 255;
    b5[61] = c5[0] >>> 16 & 255;
    b5[62] = c5[0] >>> 8 & 255;
    b5[63] = c5[0] >>> 0 & 255;
    this._transform();
    const hash2 = new Uint8Array(BYTES);
    for (let i5 = 0; i5 < 8; i5++) {
      hash2[(i5 << 2) + 0] = this._H[i5] >>> 24 & 255;
      hash2[(i5 << 2) + 1] = this._H[i5] >>> 16 & 255;
      hash2[(i5 << 2) + 2] = this._H[i5] >>> 8 & 255;
      hash2[(i5 << 2) + 3] = this._H[i5] >>> 0 & 255;
    }
    this.init();
    return outputEncoding ? decode(hash2, outputEncoding) : hash2;
  }
  /** Performs one transformation cycle. */
  _transform() {
    const h5 = this._H;
    let h0 = h5[0];
    let h1 = h5[1];
    let h22 = h5[2];
    let h32 = h5[3];
    let h42 = h5[4];
    let h52 = h5[5];
    let h6 = h5[6];
    let h7 = h5[7];
    const w5 = new Uint32Array(16);
    let i5;
    for (i5 = 0; i5 < 16; i5++) {
      w5[i5] = this._buf[(i5 << 2) + 3] | this._buf[(i5 << 2) + 2] << 8 | this._buf[(i5 << 2) + 1] << 16 | this._buf[i5 << 2] << 24;
    }
    for (i5 = 0; i5 < 64; i5++) {
      let tmp;
      if (i5 < 16) {
        tmp = w5[i5];
      } else {
        let a5 = w5[i5 + 1 & 15];
        let b5 = w5[i5 + 14 & 15];
        tmp = w5[i5 & 15] = (a5 >>> 7 ^ a5 >>> 18 ^ a5 >>> 3 ^ a5 << 25 ^ a5 << 14) + (b5 >>> 17 ^ b5 >>> 19 ^ b5 >>> 10 ^ b5 << 15 ^ b5 << 13) + w5[i5 & 15] + w5[i5 + 9 & 15] | 0;
      }
      tmp = tmp + h7 + (h42 >>> 6 ^ h42 >>> 11 ^ h42 >>> 25 ^ h42 << 26 ^ h42 << 21 ^ h42 << 7) + (h6 ^ h42 & (h52 ^ h6)) + this._K[i5] | 0;
      h7 = h6;
      h6 = h52;
      h52 = h42;
      h42 = h32 + tmp;
      h32 = h22;
      h22 = h1;
      h1 = h0;
      h0 = tmp + (h1 & h22 ^ h32 & (h1 ^ h22)) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10) | 0;
    }
    h5[0] = h5[0] + h0 | 0;
    h5[1] = h5[1] + h1 | 0;
    h5[2] = h5[2] + h22 | 0;
    h5[3] = h5[3] + h32 | 0;
    h5[4] = h5[4] + h42 | 0;
    h5[5] = h5[5] + h52 | 0;
    h5[6] = h5[6] + h6 | 0;
    h5[7] = h5[7] + h7 | 0;
  }
};
function sha256(msg, inputEncoding, outputEncoding) {
  return new SHA256().update(msg, inputEncoding).digest(outputEncoding);
}
var hash = (value) => sha256(value, "utf-8", "hex");
var hash_default = hash;

// main/helpers/create_css_class.js
var dynamicClasses = /* @__PURE__ */ new Set();
var helperStyle = document.createElement("style");
var createCssClass = (name, styles) => {
  const classStyles = [styles].flat(Infinity);
  const key2 = `${name}${hash_default(`${classStyles}`)}`;
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
var combineClasses2 = (...classes) => {
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
var combine_classes_default = combineClasses2;

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

// https://esm.sh/v135/showdown@2.1.0/denonext/showdown.mjs
var ae = Object.create;
var F2 = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var ce = Object.getOwnPropertyNames;
var se = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var te = (b5, k) => () => (k || b5((k = { exports: {} }).exports, k), k.exports);
var fe = (b5, k) => {
  for (var r in k)
    F2(b5, r, { get: k[r], enumerable: true });
};
var U = (b5, k, r, L3) => {
  if (k && typeof k == "object" || typeof k == "function")
    for (let z of ce(k))
      !ie.call(b5, z) && z !== r && F2(b5, z, { get: () => k[z], enumerable: !(L3 = ne(k, z)) || L3.enumerable });
  return b5;
};
var B2 = (b5, k, r) => (U(b5, k, "default"), r && U(r, k, "default"));
var Q2 = (b5, k, r) => (r = b5 != null ? ae(se(b5)) : {}, U(k || !b5 || !b5.__esModule ? F2(r, "default", { value: b5, enumerable: true }) : r, b5));
var q = te((X3, $3) => {
  (function() {
    function b5(e3) {
      "use strict";
      var u13 = { omitExtraWLInCodeBlocks: { defaultValue: false, describe: "Omit the default extra whiteline added to code blocks", type: "boolean" }, noHeaderId: { defaultValue: false, describe: "Turn on/off generated header id", type: "boolean" }, prefixHeaderId: { defaultValue: false, describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix", type: "string" }, rawPrefixHeaderId: { defaultValue: false, describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)', type: "boolean" }, ghCompatibleHeaderId: { defaultValue: false, describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)", type: "boolean" }, rawHeaderId: { defaultValue: false, describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`, type: "boolean" }, headerLevelStart: { defaultValue: false, describe: "The header blocks level start", type: "integer" }, parseImgDimensions: { defaultValue: false, describe: "Turn on/off image dimension parsing", type: "boolean" }, simplifiedAutoLink: { defaultValue: false, describe: "Turn on/off GFM autolink style", type: "boolean" }, excludeTrailingPunctuationFromURLs: { defaultValue: false, describe: "Excludes trailing punctuation from links generated with autoLinking", type: "boolean" }, literalMidWordUnderscores: { defaultValue: false, describe: "Parse midword underscores as literal underscores", type: "boolean" }, literalMidWordAsterisks: { defaultValue: false, describe: "Parse midword asterisks as literal asterisks", type: "boolean" }, strikethrough: { defaultValue: false, describe: "Turn on/off strikethrough support", type: "boolean" }, tables: { defaultValue: false, describe: "Turn on/off tables support", type: "boolean" }, tablesHeaderId: { defaultValue: false, describe: "Add an id to table headers", type: "boolean" }, ghCodeBlocks: { defaultValue: true, describe: "Turn on/off GFM fenced code blocks support", type: "boolean" }, tasklists: { defaultValue: false, describe: "Turn on/off GFM tasklist support", type: "boolean" }, smoothLivePreview: { defaultValue: false, describe: "Prevents weird effects in live previews due to incomplete input", type: "boolean" }, smartIndentationFix: { defaultValue: false, describe: "Tries to smartly fix indentation in es6 strings", type: "boolean" }, disableForced4SpacesIndentedSublists: { defaultValue: false, describe: "Disables the requirement of indenting nested sublists by 4 spaces", type: "boolean" }, simpleLineBreaks: { defaultValue: false, describe: "Parses simple line breaks as <br> (GFM Style)", type: "boolean" }, requireSpaceBeforeHeadingText: { defaultValue: false, describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)", type: "boolean" }, ghMentions: { defaultValue: false, describe: "Enables github @mentions", type: "boolean" }, ghMentionsLink: { defaultValue: "https://github.com/{u}", describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.", type: "string" }, encodeEmails: { defaultValue: true, describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities", type: "boolean" }, openLinksInNewWindow: { defaultValue: false, describe: "Open all links in new windows", type: "boolean" }, backslashEscapesHTMLTags: { defaultValue: false, describe: "Support for HTML Tag escaping. ex: <div>foo</div>", type: "boolean" }, emoji: { defaultValue: false, describe: "Enable emoji support. Ex: `this is a :smile: emoji`", type: "boolean" }, underline: { defaultValue: false, describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`", type: "boolean" }, ellipsis: { defaultValue: true, describe: "Replaces three dots with the ellipsis unicode character", type: "boolean" }, completeHTMLDocument: { defaultValue: false, describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags", type: "boolean" }, metadata: { defaultValue: false, describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).", type: "boolean" }, splitAdjacentBlockquotes: { defaultValue: false, describe: "Split adjacent blockquote blocks", type: "boolean" } };
      if (e3 === false)
        return JSON.parse(JSON.stringify(u13));
      var d7 = {};
      for (var a5 in u13)
        u13.hasOwnProperty(a5) && (d7[a5] = u13[a5].defaultValue);
      return d7;
    }
    function k() {
      "use strict";
      var e3 = b5(true), u13 = {};
      for (var d7 in e3)
        e3.hasOwnProperty(d7) && (u13[d7] = true);
      return u13;
    }
    var r = {}, L3 = {}, z = {}, E5 = b5(true), R3 = "vanilla", H = { github: { omitExtraWLInCodeBlocks: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, disableForced4SpacesIndentedSublists: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghCompatibleHeaderId: true, ghMentions: true, backslashEscapesHTMLTags: true, emoji: true, splitAdjacentBlockquotes: true }, original: { noHeaderId: true, ghCodeBlocks: false }, ghost: { omitExtraWLInCodeBlocks: true, parseImgDimensions: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, smoothLivePreview: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghMentions: false, encodeEmails: true }, vanilla: b5(true), allOn: k() };
    r.helper = {}, r.extensions = {}, r.setOption = function(e3, u13) {
      "use strict";
      return E5[e3] = u13, this;
    }, r.getOption = function(e3) {
      "use strict";
      return E5[e3];
    }, r.getOptions = function() {
      "use strict";
      return E5;
    }, r.resetOptions = function() {
      "use strict";
      E5 = b5(true);
    }, r.setFlavor = function(e3) {
      "use strict";
      if (!H.hasOwnProperty(e3))
        throw Error(e3 + " flavor was not found");
      r.resetOptions();
      var u13 = H[e3];
      R3 = e3;
      for (var d7 in u13)
        u13.hasOwnProperty(d7) && (E5[d7] = u13[d7]);
    }, r.getFlavor = function() {
      "use strict";
      return R3;
    }, r.getFlavorOptions = function(e3) {
      "use strict";
      if (H.hasOwnProperty(e3))
        return H[e3];
    }, r.getDefaultOptions = function(e3) {
      "use strict";
      return b5(e3);
    }, r.subParser = function(e3, u13) {
      "use strict";
      if (r.helper.isString(e3))
        if (typeof u13 < "u")
          L3[e3] = u13;
        else {
          if (L3.hasOwnProperty(e3))
            return L3[e3];
          throw Error("SubParser named " + e3 + " not registered!");
        }
    }, r.extension = function(e3, u13) {
      "use strict";
      if (!r.helper.isString(e3))
        throw Error("Extension 'name' must be a string");
      if (e3 = r.helper.stdExtName(e3), r.helper.isUndefined(u13)) {
        if (!z.hasOwnProperty(e3))
          throw Error("Extension named " + e3 + " is not registered!");
        return z[e3];
      } else {
        typeof u13 == "function" && (u13 = u13()), r.helper.isArray(u13) || (u13 = [u13]);
        var d7 = T3(u13, e3);
        if (d7.valid)
          z[e3] = u13;
        else
          throw Error(d7.error);
      }
    }, r.getAllExtensions = function() {
      "use strict";
      return z;
    }, r.removeExtension = function(e3) {
      "use strict";
      delete z[e3];
    }, r.resetExtensions = function() {
      "use strict";
      z = {};
    };
    function T3(e3, u13) {
      "use strict";
      var d7 = u13 ? "Error in " + u13 + " extension->" : "Error in unnamed extension", a5 = { valid: true, error: "" };
      r.helper.isArray(e3) || (e3 = [e3]);
      for (var s = 0; s < e3.length; ++s) {
        var i5 = d7 + " sub-extension " + s + ": ", c5 = e3[s];
        if (typeof c5 != "object")
          return a5.valid = false, a5.error = i5 + "must be an object, but " + typeof c5 + " given", a5;
        if (!r.helper.isString(c5.type))
          return a5.valid = false, a5.error = i5 + 'property "type" must be a string, but ' + typeof c5.type + " given", a5;
        var t = c5.type = c5.type.toLowerCase();
        if (t === "language" && (t = c5.type = "lang"), t === "html" && (t = c5.type = "output"), t !== "lang" && t !== "output" && t !== "listener")
          return a5.valid = false, a5.error = i5 + "type " + t + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', a5;
        if (t === "listener") {
          if (r.helper.isUndefined(c5.listeners))
            return a5.valid = false, a5.error = i5 + '. Extensions of type "listener" must have a property called "listeners"', a5;
        } else if (r.helper.isUndefined(c5.filter) && r.helper.isUndefined(c5.regex))
          return a5.valid = false, a5.error = i5 + t + ' extensions must define either a "regex" property or a "filter" method', a5;
        if (c5.listeners) {
          if (typeof c5.listeners != "object")
            return a5.valid = false, a5.error = i5 + '"listeners" property must be an object but ' + typeof c5.listeners + " given", a5;
          for (var p5 in c5.listeners)
            if (c5.listeners.hasOwnProperty(p5) && typeof c5.listeners[p5] != "function")
              return a5.valid = false, a5.error = i5 + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + p5 + " must be a function but " + typeof c5.listeners[p5] + " given", a5;
        }
        if (c5.filter) {
          if (typeof c5.filter != "function")
            return a5.valid = false, a5.error = i5 + '"filter" must be a function, but ' + typeof c5.filter + " given", a5;
        } else if (c5.regex) {
          if (r.helper.isString(c5.regex) && (c5.regex = new RegExp(c5.regex, "g")), !(c5.regex instanceof RegExp))
            return a5.valid = false, a5.error = i5 + '"regex" property must either be a string or a RegExp object, but ' + typeof c5.regex + " given", a5;
          if (r.helper.isUndefined(c5.replace))
            return a5.valid = false, a5.error = i5 + '"regex" extensions must implement a replace string or function', a5;
        }
      }
      return a5;
    }
    r.validateExtension = function(e3) {
      "use strict";
      var u13 = T3(e3, null);
      return u13.valid ? true : (console.warn(u13.error), false);
    }, r.hasOwnProperty("helper") || (r.helper = {}), r.helper.isString = function(e3) {
      "use strict";
      return typeof e3 == "string" || e3 instanceof String;
    }, r.helper.isFunction = function(e3) {
      "use strict";
      var u13 = {};
      return e3 && u13.toString.call(e3) === "[object Function]";
    }, r.helper.isArray = function(e3) {
      "use strict";
      return Array.isArray(e3);
    }, r.helper.isUndefined = function(e3) {
      "use strict";
      return typeof e3 > "u";
    }, r.helper.forEach = function(e3, u13) {
      "use strict";
      if (r.helper.isUndefined(e3))
        throw new Error("obj param is required");
      if (r.helper.isUndefined(u13))
        throw new Error("callback param is required");
      if (!r.helper.isFunction(u13))
        throw new Error("callback param must be a function/closure");
      if (typeof e3.forEach == "function")
        e3.forEach(u13);
      else if (r.helper.isArray(e3))
        for (var d7 = 0; d7 < e3.length; d7++)
          u13(e3[d7], d7, e3);
      else if (typeof e3 == "object")
        for (var a5 in e3)
          e3.hasOwnProperty(a5) && u13(e3[a5], a5, e3);
      else
        throw new Error("obj does not seem to be an array or an iterable object");
    }, r.helper.stdExtName = function(e3) {
      "use strict";
      return e3.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function G3(e3, u13) {
      "use strict";
      var d7 = u13.charCodeAt(0);
      return "\xA8E" + d7 + "E";
    }
    r.helper.escapeCharactersCallback = G3, r.helper.escapeCharacters = function(e3, u13, d7) {
      "use strict";
      var a5 = "([" + u13.replace(/([\[\]\\])/g, "\\$1") + "])";
      d7 && (a5 = "\\\\" + a5);
      var s = new RegExp(a5, "g");
      return e3 = e3.replace(s, G3), e3;
    }, r.helper.unescapeHTMLEntities = function(e3) {
      "use strict";
      return e3.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var O = function(e3, u13, d7, a5) {
      "use strict";
      var s = a5 || "", i5 = s.indexOf("g") > -1, c5 = new RegExp(u13 + "|" + d7, "g" + s.replace(/g/g, "")), t = new RegExp(u13, s.replace(/g/g, "")), p5 = [], l7, o5, h5, n3, f7;
      do
        for (l7 = 0; h5 = c5.exec(e3); )
          if (t.test(h5[0]))
            l7++ || (o5 = c5.lastIndex, n3 = o5 - h5[0].length);
          else if (l7 && !--l7) {
            f7 = h5.index + h5[0].length;
            var _3 = { left: { start: n3, end: o5 }, match: { start: o5, end: h5.index }, right: { start: h5.index, end: f7 }, wholeMatch: { start: n3, end: f7 } };
            if (p5.push(_3), !i5)
              return p5;
          }
      while (l7 && (c5.lastIndex = o5));
      return p5;
    };
    r.helper.matchRecursiveRegExp = function(e3, u13, d7, a5) {
      "use strict";
      for (var s = O(e3, u13, d7, a5), i5 = [], c5 = 0; c5 < s.length; ++c5)
        i5.push([e3.slice(s[c5].wholeMatch.start, s[c5].wholeMatch.end), e3.slice(s[c5].match.start, s[c5].match.end), e3.slice(s[c5].left.start, s[c5].left.end), e3.slice(s[c5].right.start, s[c5].right.end)]);
      return i5;
    }, r.helper.replaceRecursiveRegExp = function(e3, u13, d7, a5, s) {
      "use strict";
      if (!r.helper.isFunction(u13)) {
        var i5 = u13;
        u13 = function() {
          return i5;
        };
      }
      var c5 = O(e3, d7, a5, s), t = e3, p5 = c5.length;
      if (p5 > 0) {
        var l7 = [];
        c5[0].wholeMatch.start !== 0 && l7.push(e3.slice(0, c5[0].wholeMatch.start));
        for (var o5 = 0; o5 < p5; ++o5)
          l7.push(u13(e3.slice(c5[o5].wholeMatch.start, c5[o5].wholeMatch.end), e3.slice(c5[o5].match.start, c5[o5].match.end), e3.slice(c5[o5].left.start, c5[o5].left.end), e3.slice(c5[o5].right.start, c5[o5].right.end))), o5 < p5 - 1 && l7.push(e3.slice(c5[o5].wholeMatch.end, c5[o5 + 1].wholeMatch.start));
        c5[p5 - 1].wholeMatch.end < e3.length && l7.push(e3.slice(c5[p5 - 1].wholeMatch.end)), t = l7.join("");
      }
      return t;
    }, r.helper.regexIndexOf = function(e3, u13, d7) {
      "use strict";
      if (!r.helper.isString(e3))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      if (!(u13 instanceof RegExp))
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      var a5 = e3.substring(d7 || 0).search(u13);
      return a5 >= 0 ? a5 + (d7 || 0) : a5;
    }, r.helper.splitAtIndex = function(e3, u13) {
      "use strict";
      if (!r.helper.isString(e3))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      return [e3.substring(0, u13), e3.substring(u13)];
    }, r.helper.encodeEmailAddress = function(e3) {
      "use strict";
      var u13 = [function(d7) {
        return "&#" + d7.charCodeAt(0) + ";";
      }, function(d7) {
        return "&#x" + d7.charCodeAt(0).toString(16) + ";";
      }, function(d7) {
        return d7;
      }];
      return e3 = e3.replace(/./g, function(d7) {
        if (d7 === "@")
          d7 = u13[Math.floor(Math.random() * 2)](d7);
        else {
          var a5 = Math.random();
          d7 = a5 > 0.9 ? u13[2](d7) : a5 > 0.45 ? u13[1](d7) : u13[0](d7);
        }
        return d7;
      }), e3;
    }, r.helper.padEnd = function(u13, d7, a5) {
      "use strict";
      return d7 = d7 >> 0, a5 = String(a5 || " "), u13.length > d7 ? String(u13) : (d7 = d7 - u13.length, d7 > a5.length && (a5 += a5.repeat(d7 / a5.length)), String(u13) + a5.slice(0, d7));
    }, typeof console > "u" && (console = { warn: function(e3) {
      "use strict";
      alert(e3);
    }, log: function(e3) {
      "use strict";
      alert(e3);
    }, error: function(e3) {
      "use strict";
      throw e3;
    } }), r.helper.regexes = { asteriskDashAndColon: /([*_:~])/g }, r.helper.emojis = { "+1": "\u{1F44D}", "-1": "\u{1F44E}", 100: "\u{1F4AF}", 1234: "\u{1F522}", "1st_place_medal": "\u{1F947}", "2nd_place_medal": "\u{1F948}", "3rd_place_medal": "\u{1F949}", "8ball": "\u{1F3B1}", a: "\u{1F170}\uFE0F", ab: "\u{1F18E}", abc: "\u{1F524}", abcd: "\u{1F521}", accept: "\u{1F251}", aerial_tramway: "\u{1F6A1}", airplane: "\u2708\uFE0F", alarm_clock: "\u23F0", alembic: "\u2697\uFE0F", alien: "\u{1F47D}", ambulance: "\u{1F691}", amphora: "\u{1F3FA}", anchor: "\u2693\uFE0F", angel: "\u{1F47C}", anger: "\u{1F4A2}", angry: "\u{1F620}", anguished: "\u{1F627}", ant: "\u{1F41C}", apple: "\u{1F34E}", aquarius: "\u2652\uFE0F", aries: "\u2648\uFE0F", arrow_backward: "\u25C0\uFE0F", arrow_double_down: "\u23EC", arrow_double_up: "\u23EB", arrow_down: "\u2B07\uFE0F", arrow_down_small: "\u{1F53D}", arrow_forward: "\u25B6\uFE0F", arrow_heading_down: "\u2935\uFE0F", arrow_heading_up: "\u2934\uFE0F", arrow_left: "\u2B05\uFE0F", arrow_lower_left: "\u2199\uFE0F", arrow_lower_right: "\u2198\uFE0F", arrow_right: "\u27A1\uFE0F", arrow_right_hook: "\u21AA\uFE0F", arrow_up: "\u2B06\uFE0F", arrow_up_down: "\u2195\uFE0F", arrow_up_small: "\u{1F53C}", arrow_upper_left: "\u2196\uFE0F", arrow_upper_right: "\u2197\uFE0F", arrows_clockwise: "\u{1F503}", arrows_counterclockwise: "\u{1F504}", art: "\u{1F3A8}", articulated_lorry: "\u{1F69B}", artificial_satellite: "\u{1F6F0}", astonished: "\u{1F632}", athletic_shoe: "\u{1F45F}", atm: "\u{1F3E7}", atom_symbol: "\u269B\uFE0F", avocado: "\u{1F951}", b: "\u{1F171}\uFE0F", baby: "\u{1F476}", baby_bottle: "\u{1F37C}", baby_chick: "\u{1F424}", baby_symbol: "\u{1F6BC}", back: "\u{1F519}", bacon: "\u{1F953}", badminton: "\u{1F3F8}", baggage_claim: "\u{1F6C4}", baguette_bread: "\u{1F956}", balance_scale: "\u2696\uFE0F", balloon: "\u{1F388}", ballot_box: "\u{1F5F3}", ballot_box_with_check: "\u2611\uFE0F", bamboo: "\u{1F38D}", banana: "\u{1F34C}", bangbang: "\u203C\uFE0F", bank: "\u{1F3E6}", bar_chart: "\u{1F4CA}", barber: "\u{1F488}", baseball: "\u26BE\uFE0F", basketball: "\u{1F3C0}", basketball_man: "\u26F9\uFE0F", basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F", bat: "\u{1F987}", bath: "\u{1F6C0}", bathtub: "\u{1F6C1}", battery: "\u{1F50B}", beach_umbrella: "\u{1F3D6}", bear: "\u{1F43B}", bed: "\u{1F6CF}", bee: "\u{1F41D}", beer: "\u{1F37A}", beers: "\u{1F37B}", beetle: "\u{1F41E}", beginner: "\u{1F530}", bell: "\u{1F514}", bellhop_bell: "\u{1F6CE}", bento: "\u{1F371}", biking_man: "\u{1F6B4}", bike: "\u{1F6B2}", biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F", bikini: "\u{1F459}", biohazard: "\u2623\uFE0F", bird: "\u{1F426}", birthday: "\u{1F382}", black_circle: "\u26AB\uFE0F", black_flag: "\u{1F3F4}", black_heart: "\u{1F5A4}", black_joker: "\u{1F0CF}", black_large_square: "\u2B1B\uFE0F", black_medium_small_square: "\u25FE\uFE0F", black_medium_square: "\u25FC\uFE0F", black_nib: "\u2712\uFE0F", black_small_square: "\u25AA\uFE0F", black_square_button: "\u{1F532}", blonde_man: "\u{1F471}", blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F", blossom: "\u{1F33C}", blowfish: "\u{1F421}", blue_book: "\u{1F4D8}", blue_car: "\u{1F699}", blue_heart: "\u{1F499}", blush: "\u{1F60A}", boar: "\u{1F417}", boat: "\u26F5\uFE0F", bomb: "\u{1F4A3}", book: "\u{1F4D6}", bookmark: "\u{1F516}", bookmark_tabs: "\u{1F4D1}", books: "\u{1F4DA}", boom: "\u{1F4A5}", boot: "\u{1F462}", bouquet: "\u{1F490}", bowing_man: "\u{1F647}", bow_and_arrow: "\u{1F3F9}", bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F", bowling: "\u{1F3B3}", boxing_glove: "\u{1F94A}", boy: "\u{1F466}", bread: "\u{1F35E}", bride_with_veil: "\u{1F470}", bridge_at_night: "\u{1F309}", briefcase: "\u{1F4BC}", broken_heart: "\u{1F494}", bug: "\u{1F41B}", building_construction: "\u{1F3D7}", bulb: "\u{1F4A1}", bullettrain_front: "\u{1F685}", bullettrain_side: "\u{1F684}", burrito: "\u{1F32F}", bus: "\u{1F68C}", business_suit_levitating: "\u{1F574}", busstop: "\u{1F68F}", bust_in_silhouette: "\u{1F464}", busts_in_silhouette: "\u{1F465}", butterfly: "\u{1F98B}", cactus: "\u{1F335}", cake: "\u{1F370}", calendar: "\u{1F4C6}", call_me_hand: "\u{1F919}", calling: "\u{1F4F2}", camel: "\u{1F42B}", camera: "\u{1F4F7}", camera_flash: "\u{1F4F8}", camping: "\u{1F3D5}", cancer: "\u264B\uFE0F", candle: "\u{1F56F}", candy: "\u{1F36C}", canoe: "\u{1F6F6}", capital_abcd: "\u{1F520}", capricorn: "\u2651\uFE0F", car: "\u{1F697}", card_file_box: "\u{1F5C3}", card_index: "\u{1F4C7}", card_index_dividers: "\u{1F5C2}", carousel_horse: "\u{1F3A0}", carrot: "\u{1F955}", cat: "\u{1F431}", cat2: "\u{1F408}", cd: "\u{1F4BF}", chains: "\u26D3", champagne: "\u{1F37E}", chart: "\u{1F4B9}", chart_with_downwards_trend: "\u{1F4C9}", chart_with_upwards_trend: "\u{1F4C8}", checkered_flag: "\u{1F3C1}", cheese: "\u{1F9C0}", cherries: "\u{1F352}", cherry_blossom: "\u{1F338}", chestnut: "\u{1F330}", chicken: "\u{1F414}", children_crossing: "\u{1F6B8}", chipmunk: "\u{1F43F}", chocolate_bar: "\u{1F36B}", christmas_tree: "\u{1F384}", church: "\u26EA\uFE0F", cinema: "\u{1F3A6}", circus_tent: "\u{1F3AA}", city_sunrise: "\u{1F307}", city_sunset: "\u{1F306}", cityscape: "\u{1F3D9}", cl: "\u{1F191}", clamp: "\u{1F5DC}", clap: "\u{1F44F}", clapper: "\u{1F3AC}", classical_building: "\u{1F3DB}", clinking_glasses: "\u{1F942}", clipboard: "\u{1F4CB}", clock1: "\u{1F550}", clock10: "\u{1F559}", clock1030: "\u{1F565}", clock11: "\u{1F55A}", clock1130: "\u{1F566}", clock12: "\u{1F55B}", clock1230: "\u{1F567}", clock130: "\u{1F55C}", clock2: "\u{1F551}", clock230: "\u{1F55D}", clock3: "\u{1F552}", clock330: "\u{1F55E}", clock4: "\u{1F553}", clock430: "\u{1F55F}", clock5: "\u{1F554}", clock530: "\u{1F560}", clock6: "\u{1F555}", clock630: "\u{1F561}", clock7: "\u{1F556}", clock730: "\u{1F562}", clock8: "\u{1F557}", clock830: "\u{1F563}", clock9: "\u{1F558}", clock930: "\u{1F564}", closed_book: "\u{1F4D5}", closed_lock_with_key: "\u{1F510}", closed_umbrella: "\u{1F302}", cloud: "\u2601\uFE0F", cloud_with_lightning: "\u{1F329}", cloud_with_lightning_and_rain: "\u26C8", cloud_with_rain: "\u{1F327}", cloud_with_snow: "\u{1F328}", clown_face: "\u{1F921}", clubs: "\u2663\uFE0F", cocktail: "\u{1F378}", coffee: "\u2615\uFE0F", coffin: "\u26B0\uFE0F", cold_sweat: "\u{1F630}", comet: "\u2604\uFE0F", computer: "\u{1F4BB}", computer_mouse: "\u{1F5B1}", confetti_ball: "\u{1F38A}", confounded: "\u{1F616}", confused: "\u{1F615}", congratulations: "\u3297\uFE0F", construction: "\u{1F6A7}", construction_worker_man: "\u{1F477}", construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F", control_knobs: "\u{1F39B}", convenience_store: "\u{1F3EA}", cookie: "\u{1F36A}", cool: "\u{1F192}", policeman: "\u{1F46E}", copyright: "\xA9\uFE0F", corn: "\u{1F33D}", couch_and_lamp: "\u{1F6CB}", couple: "\u{1F46B}", couple_with_heart_woman_man: "\u{1F491}", couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}", couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}", couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}", couplekiss_man_woman: "\u{1F48F}", couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}", cow: "\u{1F42E}", cow2: "\u{1F404}", cowboy_hat_face: "\u{1F920}", crab: "\u{1F980}", crayon: "\u{1F58D}", credit_card: "\u{1F4B3}", crescent_moon: "\u{1F319}", cricket: "\u{1F3CF}", crocodile: "\u{1F40A}", croissant: "\u{1F950}", crossed_fingers: "\u{1F91E}", crossed_flags: "\u{1F38C}", crossed_swords: "\u2694\uFE0F", crown: "\u{1F451}", cry: "\u{1F622}", crying_cat_face: "\u{1F63F}", crystal_ball: "\u{1F52E}", cucumber: "\u{1F952}", cupid: "\u{1F498}", curly_loop: "\u27B0", currency_exchange: "\u{1F4B1}", curry: "\u{1F35B}", custard: "\u{1F36E}", customs: "\u{1F6C3}", cyclone: "\u{1F300}", dagger: "\u{1F5E1}", dancer: "\u{1F483}", dancing_women: "\u{1F46F}", dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F", dango: "\u{1F361}", dark_sunglasses: "\u{1F576}", dart: "\u{1F3AF}", dash: "\u{1F4A8}", date: "\u{1F4C5}", deciduous_tree: "\u{1F333}", deer: "\u{1F98C}", department_store: "\u{1F3EC}", derelict_house: "\u{1F3DA}", desert: "\u{1F3DC}", desert_island: "\u{1F3DD}", desktop_computer: "\u{1F5A5}", male_detective: "\u{1F575}\uFE0F", diamond_shape_with_a_dot_inside: "\u{1F4A0}", diamonds: "\u2666\uFE0F", disappointed: "\u{1F61E}", disappointed_relieved: "\u{1F625}", dizzy: "\u{1F4AB}", dizzy_face: "\u{1F635}", do_not_litter: "\u{1F6AF}", dog: "\u{1F436}", dog2: "\u{1F415}", dollar: "\u{1F4B5}", dolls: "\u{1F38E}", dolphin: "\u{1F42C}", door: "\u{1F6AA}", doughnut: "\u{1F369}", dove: "\u{1F54A}", dragon: "\u{1F409}", dragon_face: "\u{1F432}", dress: "\u{1F457}", dromedary_camel: "\u{1F42A}", drooling_face: "\u{1F924}", droplet: "\u{1F4A7}", drum: "\u{1F941}", duck: "\u{1F986}", dvd: "\u{1F4C0}", "e-mail": "\u{1F4E7}", eagle: "\u{1F985}", ear: "\u{1F442}", ear_of_rice: "\u{1F33E}", earth_africa: "\u{1F30D}", earth_americas: "\u{1F30E}", earth_asia: "\u{1F30F}", egg: "\u{1F95A}", eggplant: "\u{1F346}", eight_pointed_black_star: "\u2734\uFE0F", eight_spoked_asterisk: "\u2733\uFE0F", electric_plug: "\u{1F50C}", elephant: "\u{1F418}", email: "\u2709\uFE0F", end: "\u{1F51A}", envelope_with_arrow: "\u{1F4E9}", euro: "\u{1F4B6}", european_castle: "\u{1F3F0}", european_post_office: "\u{1F3E4}", evergreen_tree: "\u{1F332}", exclamation: "\u2757\uFE0F", expressionless: "\u{1F611}", eye: "\u{1F441}", eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}", eyeglasses: "\u{1F453}", eyes: "\u{1F440}", face_with_head_bandage: "\u{1F915}", face_with_thermometer: "\u{1F912}", fist_oncoming: "\u{1F44A}", factory: "\u{1F3ED}", fallen_leaf: "\u{1F342}", family_man_woman_boy: "\u{1F46A}", family_man_boy: "\u{1F468}&zwj;\u{1F466}", family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_girl: "\u{1F468}&zwj;\u{1F467}", family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}", family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}", family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}", family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_boy: "\u{1F469}&zwj;\u{1F466}", family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_girl: "\u{1F469}&zwj;\u{1F467}", family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}", family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}", family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", fast_forward: "\u23E9", fax: "\u{1F4E0}", fearful: "\u{1F628}", feet: "\u{1F43E}", female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F", ferris_wheel: "\u{1F3A1}", ferry: "\u26F4", field_hockey: "\u{1F3D1}", file_cabinet: "\u{1F5C4}", file_folder: "\u{1F4C1}", film_projector: "\u{1F4FD}", film_strip: "\u{1F39E}", fire: "\u{1F525}", fire_engine: "\u{1F692}", fireworks: "\u{1F386}", first_quarter_moon: "\u{1F313}", first_quarter_moon_with_face: "\u{1F31B}", fish: "\u{1F41F}", fish_cake: "\u{1F365}", fishing_pole_and_fish: "\u{1F3A3}", fist_raised: "\u270A", fist_left: "\u{1F91B}", fist_right: "\u{1F91C}", flags: "\u{1F38F}", flashlight: "\u{1F526}", fleur_de_lis: "\u269C\uFE0F", flight_arrival: "\u{1F6EC}", flight_departure: "\u{1F6EB}", floppy_disk: "\u{1F4BE}", flower_playing_cards: "\u{1F3B4}", flushed: "\u{1F633}", fog: "\u{1F32B}", foggy: "\u{1F301}", football: "\u{1F3C8}", footprints: "\u{1F463}", fork_and_knife: "\u{1F374}", fountain: "\u26F2\uFE0F", fountain_pen: "\u{1F58B}", four_leaf_clover: "\u{1F340}", fox_face: "\u{1F98A}", framed_picture: "\u{1F5BC}", free: "\u{1F193}", fried_egg: "\u{1F373}", fried_shrimp: "\u{1F364}", fries: "\u{1F35F}", frog: "\u{1F438}", frowning: "\u{1F626}", frowning_face: "\u2639\uFE0F", frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F", frowning_woman: "\u{1F64D}", middle_finger: "\u{1F595}", fuelpump: "\u26FD\uFE0F", full_moon: "\u{1F315}", full_moon_with_face: "\u{1F31D}", funeral_urn: "\u26B1\uFE0F", game_die: "\u{1F3B2}", gear: "\u2699\uFE0F", gem: "\u{1F48E}", gemini: "\u264A\uFE0F", ghost: "\u{1F47B}", gift: "\u{1F381}", gift_heart: "\u{1F49D}", girl: "\u{1F467}", globe_with_meridians: "\u{1F310}", goal_net: "\u{1F945}", goat: "\u{1F410}", golf: "\u26F3\uFE0F", golfing_man: "\u{1F3CC}\uFE0F", golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F", gorilla: "\u{1F98D}", grapes: "\u{1F347}", green_apple: "\u{1F34F}", green_book: "\u{1F4D7}", green_heart: "\u{1F49A}", green_salad: "\u{1F957}", grey_exclamation: "\u2755", grey_question: "\u2754", grimacing: "\u{1F62C}", grin: "\u{1F601}", grinning: "\u{1F600}", guardsman: "\u{1F482}", guardswoman: "\u{1F482}&zwj;\u2640\uFE0F", guitar: "\u{1F3B8}", gun: "\u{1F52B}", haircut_woman: "\u{1F487}", haircut_man: "\u{1F487}&zwj;\u2642\uFE0F", hamburger: "\u{1F354}", hammer: "\u{1F528}", hammer_and_pick: "\u2692", hammer_and_wrench: "\u{1F6E0}", hamster: "\u{1F439}", hand: "\u270B", handbag: "\u{1F45C}", handshake: "\u{1F91D}", hankey: "\u{1F4A9}", hatched_chick: "\u{1F425}", hatching_chick: "\u{1F423}", headphones: "\u{1F3A7}", hear_no_evil: "\u{1F649}", heart: "\u2764\uFE0F", heart_decoration: "\u{1F49F}", heart_eyes: "\u{1F60D}", heart_eyes_cat: "\u{1F63B}", heartbeat: "\u{1F493}", heartpulse: "\u{1F497}", hearts: "\u2665\uFE0F", heavy_check_mark: "\u2714\uFE0F", heavy_division_sign: "\u2797", heavy_dollar_sign: "\u{1F4B2}", heavy_heart_exclamation: "\u2763\uFE0F", heavy_minus_sign: "\u2796", heavy_multiplication_x: "\u2716\uFE0F", heavy_plus_sign: "\u2795", helicopter: "\u{1F681}", herb: "\u{1F33F}", hibiscus: "\u{1F33A}", high_brightness: "\u{1F506}", high_heel: "\u{1F460}", hocho: "\u{1F52A}", hole: "\u{1F573}", honey_pot: "\u{1F36F}", horse: "\u{1F434}", horse_racing: "\u{1F3C7}", hospital: "\u{1F3E5}", hot_pepper: "\u{1F336}", hotdog: "\u{1F32D}", hotel: "\u{1F3E8}", hotsprings: "\u2668\uFE0F", hourglass: "\u231B\uFE0F", hourglass_flowing_sand: "\u23F3", house: "\u{1F3E0}", house_with_garden: "\u{1F3E1}", houses: "\u{1F3D8}", hugs: "\u{1F917}", hushed: "\u{1F62F}", ice_cream: "\u{1F368}", ice_hockey: "\u{1F3D2}", ice_skate: "\u26F8", icecream: "\u{1F366}", id: "\u{1F194}", ideograph_advantage: "\u{1F250}", imp: "\u{1F47F}", inbox_tray: "\u{1F4E5}", incoming_envelope: "\u{1F4E8}", tipping_hand_woman: "\u{1F481}", information_source: "\u2139\uFE0F", innocent: "\u{1F607}", interrobang: "\u2049\uFE0F", iphone: "\u{1F4F1}", izakaya_lantern: "\u{1F3EE}", jack_o_lantern: "\u{1F383}", japan: "\u{1F5FE}", japanese_castle: "\u{1F3EF}", japanese_goblin: "\u{1F47A}", japanese_ogre: "\u{1F479}", jeans: "\u{1F456}", joy: "\u{1F602}", joy_cat: "\u{1F639}", joystick: "\u{1F579}", kaaba: "\u{1F54B}", key: "\u{1F511}", keyboard: "\u2328\uFE0F", keycap_ten: "\u{1F51F}", kick_scooter: "\u{1F6F4}", kimono: "\u{1F458}", kiss: "\u{1F48B}", kissing: "\u{1F617}", kissing_cat: "\u{1F63D}", kissing_closed_eyes: "\u{1F61A}", kissing_heart: "\u{1F618}", kissing_smiling_eyes: "\u{1F619}", kiwi_fruit: "\u{1F95D}", koala: "\u{1F428}", koko: "\u{1F201}", label: "\u{1F3F7}", large_blue_circle: "\u{1F535}", large_blue_diamond: "\u{1F537}", large_orange_diamond: "\u{1F536}", last_quarter_moon: "\u{1F317}", last_quarter_moon_with_face: "\u{1F31C}", latin_cross: "\u271D\uFE0F", laughing: "\u{1F606}", leaves: "\u{1F343}", ledger: "\u{1F4D2}", left_luggage: "\u{1F6C5}", left_right_arrow: "\u2194\uFE0F", leftwards_arrow_with_hook: "\u21A9\uFE0F", lemon: "\u{1F34B}", leo: "\u264C\uFE0F", leopard: "\u{1F406}", level_slider: "\u{1F39A}", libra: "\u264E\uFE0F", light_rail: "\u{1F688}", link: "\u{1F517}", lion: "\u{1F981}", lips: "\u{1F444}", lipstick: "\u{1F484}", lizard: "\u{1F98E}", lock: "\u{1F512}", lock_with_ink_pen: "\u{1F50F}", lollipop: "\u{1F36D}", loop: "\u27BF", loud_sound: "\u{1F50A}", loudspeaker: "\u{1F4E2}", love_hotel: "\u{1F3E9}", love_letter: "\u{1F48C}", low_brightness: "\u{1F505}", lying_face: "\u{1F925}", m: "\u24C2\uFE0F", mag: "\u{1F50D}", mag_right: "\u{1F50E}", mahjong: "\u{1F004}\uFE0F", mailbox: "\u{1F4EB}", mailbox_closed: "\u{1F4EA}", mailbox_with_mail: "\u{1F4EC}", mailbox_with_no_mail: "\u{1F4ED}", man: "\u{1F468}", man_artist: "\u{1F468}&zwj;\u{1F3A8}", man_astronaut: "\u{1F468}&zwj;\u{1F680}", man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F", man_cook: "\u{1F468}&zwj;\u{1F373}", man_dancing: "\u{1F57A}", man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F", man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}", man_farmer: "\u{1F468}&zwj;\u{1F33E}", man_firefighter: "\u{1F468}&zwj;\u{1F692}", man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F", man_in_tuxedo: "\u{1F935}", man_judge: "\u{1F468}&zwj;\u2696\uFE0F", man_juggling: "\u{1F939}&zwj;\u2642\uFE0F", man_mechanic: "\u{1F468}&zwj;\u{1F527}", man_office_worker: "\u{1F468}&zwj;\u{1F4BC}", man_pilot: "\u{1F468}&zwj;\u2708\uFE0F", man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F", man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F", man_scientist: "\u{1F468}&zwj;\u{1F52C}", man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F", man_singer: "\u{1F468}&zwj;\u{1F3A4}", man_student: "\u{1F468}&zwj;\u{1F393}", man_teacher: "\u{1F468}&zwj;\u{1F3EB}", man_technologist: "\u{1F468}&zwj;\u{1F4BB}", man_with_gua_pi_mao: "\u{1F472}", man_with_turban: "\u{1F473}", tangerine: "\u{1F34A}", mans_shoe: "\u{1F45E}", mantelpiece_clock: "\u{1F570}", maple_leaf: "\u{1F341}", martial_arts_uniform: "\u{1F94B}", mask: "\u{1F637}", massage_woman: "\u{1F486}", massage_man: "\u{1F486}&zwj;\u2642\uFE0F", meat_on_bone: "\u{1F356}", medal_military: "\u{1F396}", medal_sports: "\u{1F3C5}", mega: "\u{1F4E3}", melon: "\u{1F348}", memo: "\u{1F4DD}", men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F", menorah: "\u{1F54E}", mens: "\u{1F6B9}", metal: "\u{1F918}", metro: "\u{1F687}", microphone: "\u{1F3A4}", microscope: "\u{1F52C}", milk_glass: "\u{1F95B}", milky_way: "\u{1F30C}", minibus: "\u{1F690}", minidisc: "\u{1F4BD}", mobile_phone_off: "\u{1F4F4}", money_mouth_face: "\u{1F911}", money_with_wings: "\u{1F4B8}", moneybag: "\u{1F4B0}", monkey: "\u{1F412}", monkey_face: "\u{1F435}", monorail: "\u{1F69D}", moon: "\u{1F314}", mortar_board: "\u{1F393}", mosque: "\u{1F54C}", motor_boat: "\u{1F6E5}", motor_scooter: "\u{1F6F5}", motorcycle: "\u{1F3CD}", motorway: "\u{1F6E3}", mount_fuji: "\u{1F5FB}", mountain: "\u26F0", mountain_biking_man: "\u{1F6B5}", mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F", mountain_cableway: "\u{1F6A0}", mountain_railway: "\u{1F69E}", mountain_snow: "\u{1F3D4}", mouse: "\u{1F42D}", mouse2: "\u{1F401}", movie_camera: "\u{1F3A5}", moyai: "\u{1F5FF}", mrs_claus: "\u{1F936}", muscle: "\u{1F4AA}", mushroom: "\u{1F344}", musical_keyboard: "\u{1F3B9}", musical_note: "\u{1F3B5}", musical_score: "\u{1F3BC}", mute: "\u{1F507}", nail_care: "\u{1F485}", name_badge: "\u{1F4DB}", national_park: "\u{1F3DE}", nauseated_face: "\u{1F922}", necktie: "\u{1F454}", negative_squared_cross_mark: "\u274E", nerd_face: "\u{1F913}", neutral_face: "\u{1F610}", new: "\u{1F195}", new_moon: "\u{1F311}", new_moon_with_face: "\u{1F31A}", newspaper: "\u{1F4F0}", newspaper_roll: "\u{1F5DE}", next_track_button: "\u23ED", ng: "\u{1F196}", no_good_man: "\u{1F645}&zwj;\u2642\uFE0F", no_good_woman: "\u{1F645}", night_with_stars: "\u{1F303}", no_bell: "\u{1F515}", no_bicycles: "\u{1F6B3}", no_entry: "\u26D4\uFE0F", no_entry_sign: "\u{1F6AB}", no_mobile_phones: "\u{1F4F5}", no_mouth: "\u{1F636}", no_pedestrians: "\u{1F6B7}", no_smoking: "\u{1F6AD}", "non-potable_water": "\u{1F6B1}", nose: "\u{1F443}", notebook: "\u{1F4D3}", notebook_with_decorative_cover: "\u{1F4D4}", notes: "\u{1F3B6}", nut_and_bolt: "\u{1F529}", o: "\u2B55\uFE0F", o2: "\u{1F17E}\uFE0F", ocean: "\u{1F30A}", octopus: "\u{1F419}", oden: "\u{1F362}", office: "\u{1F3E2}", oil_drum: "\u{1F6E2}", ok: "\u{1F197}", ok_hand: "\u{1F44C}", ok_man: "\u{1F646}&zwj;\u2642\uFE0F", ok_woman: "\u{1F646}", old_key: "\u{1F5DD}", older_man: "\u{1F474}", older_woman: "\u{1F475}", om: "\u{1F549}", on: "\u{1F51B}", oncoming_automobile: "\u{1F698}", oncoming_bus: "\u{1F68D}", oncoming_police_car: "\u{1F694}", oncoming_taxi: "\u{1F696}", open_file_folder: "\u{1F4C2}", open_hands: "\u{1F450}", open_mouth: "\u{1F62E}", open_umbrella: "\u2602\uFE0F", ophiuchus: "\u26CE", orange_book: "\u{1F4D9}", orthodox_cross: "\u2626\uFE0F", outbox_tray: "\u{1F4E4}", owl: "\u{1F989}", ox: "\u{1F402}", package: "\u{1F4E6}", page_facing_up: "\u{1F4C4}", page_with_curl: "\u{1F4C3}", pager: "\u{1F4DF}", paintbrush: "\u{1F58C}", palm_tree: "\u{1F334}", pancakes: "\u{1F95E}", panda_face: "\u{1F43C}", paperclip: "\u{1F4CE}", paperclips: "\u{1F587}", parasol_on_ground: "\u26F1", parking: "\u{1F17F}\uFE0F", part_alternation_mark: "\u303D\uFE0F", partly_sunny: "\u26C5\uFE0F", passenger_ship: "\u{1F6F3}", passport_control: "\u{1F6C2}", pause_button: "\u23F8", peace_symbol: "\u262E\uFE0F", peach: "\u{1F351}", peanuts: "\u{1F95C}", pear: "\u{1F350}", pen: "\u{1F58A}", pencil2: "\u270F\uFE0F", penguin: "\u{1F427}", pensive: "\u{1F614}", performing_arts: "\u{1F3AD}", persevere: "\u{1F623}", person_fencing: "\u{1F93A}", pouting_woman: "\u{1F64E}", phone: "\u260E\uFE0F", pick: "\u26CF", pig: "\u{1F437}", pig2: "\u{1F416}", pig_nose: "\u{1F43D}", pill: "\u{1F48A}", pineapple: "\u{1F34D}", ping_pong: "\u{1F3D3}", pisces: "\u2653\uFE0F", pizza: "\u{1F355}", place_of_worship: "\u{1F6D0}", plate_with_cutlery: "\u{1F37D}", play_or_pause_button: "\u23EF", point_down: "\u{1F447}", point_left: "\u{1F448}", point_right: "\u{1F449}", point_up: "\u261D\uFE0F", point_up_2: "\u{1F446}", police_car: "\u{1F693}", policewoman: "\u{1F46E}&zwj;\u2640\uFE0F", poodle: "\u{1F429}", popcorn: "\u{1F37F}", post_office: "\u{1F3E3}", postal_horn: "\u{1F4EF}", postbox: "\u{1F4EE}", potable_water: "\u{1F6B0}", potato: "\u{1F954}", pouch: "\u{1F45D}", poultry_leg: "\u{1F357}", pound: "\u{1F4B7}", rage: "\u{1F621}", pouting_cat: "\u{1F63E}", pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F", pray: "\u{1F64F}", prayer_beads: "\u{1F4FF}", pregnant_woman: "\u{1F930}", previous_track_button: "\u23EE", prince: "\u{1F934}", princess: "\u{1F478}", printer: "\u{1F5A8}", purple_heart: "\u{1F49C}", purse: "\u{1F45B}", pushpin: "\u{1F4CC}", put_litter_in_its_place: "\u{1F6AE}", question: "\u2753", rabbit: "\u{1F430}", rabbit2: "\u{1F407}", racehorse: "\u{1F40E}", racing_car: "\u{1F3CE}", radio: "\u{1F4FB}", radio_button: "\u{1F518}", radioactive: "\u2622\uFE0F", railway_car: "\u{1F683}", railway_track: "\u{1F6E4}", rainbow: "\u{1F308}", rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}", raised_back_of_hand: "\u{1F91A}", raised_hand_with_fingers_splayed: "\u{1F590}", raised_hands: "\u{1F64C}", raising_hand_woman: "\u{1F64B}", raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F", ram: "\u{1F40F}", ramen: "\u{1F35C}", rat: "\u{1F400}", record_button: "\u23FA", recycle: "\u267B\uFE0F", red_circle: "\u{1F534}", registered: "\xAE\uFE0F", relaxed: "\u263A\uFE0F", relieved: "\u{1F60C}", reminder_ribbon: "\u{1F397}", repeat: "\u{1F501}", repeat_one: "\u{1F502}", rescue_worker_helmet: "\u26D1", restroom: "\u{1F6BB}", revolving_hearts: "\u{1F49E}", rewind: "\u23EA", rhinoceros: "\u{1F98F}", ribbon: "\u{1F380}", rice: "\u{1F35A}", rice_ball: "\u{1F359}", rice_cracker: "\u{1F358}", rice_scene: "\u{1F391}", right_anger_bubble: "\u{1F5EF}", ring: "\u{1F48D}", robot: "\u{1F916}", rocket: "\u{1F680}", rofl: "\u{1F923}", roll_eyes: "\u{1F644}", roller_coaster: "\u{1F3A2}", rooster: "\u{1F413}", rose: "\u{1F339}", rosette: "\u{1F3F5}", rotating_light: "\u{1F6A8}", round_pushpin: "\u{1F4CD}", rowing_man: "\u{1F6A3}", rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F", rugby_football: "\u{1F3C9}", running_man: "\u{1F3C3}", running_shirt_with_sash: "\u{1F3BD}", running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F", sa: "\u{1F202}\uFE0F", sagittarius: "\u2650\uFE0F", sake: "\u{1F376}", sandal: "\u{1F461}", santa: "\u{1F385}", satellite: "\u{1F4E1}", saxophone: "\u{1F3B7}", school: "\u{1F3EB}", school_satchel: "\u{1F392}", scissors: "\u2702\uFE0F", scorpion: "\u{1F982}", scorpius: "\u264F\uFE0F", scream: "\u{1F631}", scream_cat: "\u{1F640}", scroll: "\u{1F4DC}", seat: "\u{1F4BA}", secret: "\u3299\uFE0F", see_no_evil: "\u{1F648}", seedling: "\u{1F331}", selfie: "\u{1F933}", shallow_pan_of_food: "\u{1F958}", shamrock: "\u2618\uFE0F", shark: "\u{1F988}", shaved_ice: "\u{1F367}", sheep: "\u{1F411}", shell: "\u{1F41A}", shield: "\u{1F6E1}", shinto_shrine: "\u26E9", ship: "\u{1F6A2}", shirt: "\u{1F455}", shopping: "\u{1F6CD}", shopping_cart: "\u{1F6D2}", shower: "\u{1F6BF}", shrimp: "\u{1F990}", signal_strength: "\u{1F4F6}", six_pointed_star: "\u{1F52F}", ski: "\u{1F3BF}", skier: "\u26F7", skull: "\u{1F480}", skull_and_crossbones: "\u2620\uFE0F", sleeping: "\u{1F634}", sleeping_bed: "\u{1F6CC}", sleepy: "\u{1F62A}", slightly_frowning_face: "\u{1F641}", slightly_smiling_face: "\u{1F642}", slot_machine: "\u{1F3B0}", small_airplane: "\u{1F6E9}", small_blue_diamond: "\u{1F539}", small_orange_diamond: "\u{1F538}", small_red_triangle: "\u{1F53A}", small_red_triangle_down: "\u{1F53B}", smile: "\u{1F604}", smile_cat: "\u{1F638}", smiley: "\u{1F603}", smiley_cat: "\u{1F63A}", smiling_imp: "\u{1F608}", smirk: "\u{1F60F}", smirk_cat: "\u{1F63C}", smoking: "\u{1F6AC}", snail: "\u{1F40C}", snake: "\u{1F40D}", sneezing_face: "\u{1F927}", snowboarder: "\u{1F3C2}", snowflake: "\u2744\uFE0F", snowman: "\u26C4\uFE0F", snowman_with_snow: "\u2603\uFE0F", sob: "\u{1F62D}", soccer: "\u26BD\uFE0F", soon: "\u{1F51C}", sos: "\u{1F198}", sound: "\u{1F509}", space_invader: "\u{1F47E}", spades: "\u2660\uFE0F", spaghetti: "\u{1F35D}", sparkle: "\u2747\uFE0F", sparkler: "\u{1F387}", sparkles: "\u2728", sparkling_heart: "\u{1F496}", speak_no_evil: "\u{1F64A}", speaker: "\u{1F508}", speaking_head: "\u{1F5E3}", speech_balloon: "\u{1F4AC}", speedboat: "\u{1F6A4}", spider: "\u{1F577}", spider_web: "\u{1F578}", spiral_calendar: "\u{1F5D3}", spiral_notepad: "\u{1F5D2}", spoon: "\u{1F944}", squid: "\u{1F991}", stadium: "\u{1F3DF}", star: "\u2B50\uFE0F", star2: "\u{1F31F}", star_and_crescent: "\u262A\uFE0F", star_of_david: "\u2721\uFE0F", stars: "\u{1F320}", station: "\u{1F689}", statue_of_liberty: "\u{1F5FD}", steam_locomotive: "\u{1F682}", stew: "\u{1F372}", stop_button: "\u23F9", stop_sign: "\u{1F6D1}", stopwatch: "\u23F1", straight_ruler: "\u{1F4CF}", strawberry: "\u{1F353}", stuck_out_tongue: "\u{1F61B}", stuck_out_tongue_closed_eyes: "\u{1F61D}", stuck_out_tongue_winking_eye: "\u{1F61C}", studio_microphone: "\u{1F399}", stuffed_flatbread: "\u{1F959}", sun_behind_large_cloud: "\u{1F325}", sun_behind_rain_cloud: "\u{1F326}", sun_behind_small_cloud: "\u{1F324}", sun_with_face: "\u{1F31E}", sunflower: "\u{1F33B}", sunglasses: "\u{1F60E}", sunny: "\u2600\uFE0F", sunrise: "\u{1F305}", sunrise_over_mountains: "\u{1F304}", surfing_man: "\u{1F3C4}", surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F", sushi: "\u{1F363}", suspension_railway: "\u{1F69F}", sweat: "\u{1F613}", sweat_drops: "\u{1F4A6}", sweat_smile: "\u{1F605}", sweet_potato: "\u{1F360}", swimming_man: "\u{1F3CA}", swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F", symbols: "\u{1F523}", synagogue: "\u{1F54D}", syringe: "\u{1F489}", taco: "\u{1F32E}", tada: "\u{1F389}", tanabata_tree: "\u{1F38B}", taurus: "\u2649\uFE0F", taxi: "\u{1F695}", tea: "\u{1F375}", telephone_receiver: "\u{1F4DE}", telescope: "\u{1F52D}", tennis: "\u{1F3BE}", tent: "\u26FA\uFE0F", thermometer: "\u{1F321}", thinking: "\u{1F914}", thought_balloon: "\u{1F4AD}", ticket: "\u{1F3AB}", tickets: "\u{1F39F}", tiger: "\u{1F42F}", tiger2: "\u{1F405}", timer_clock: "\u23F2", tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F", tired_face: "\u{1F62B}", tm: "\u2122\uFE0F", toilet: "\u{1F6BD}", tokyo_tower: "\u{1F5FC}", tomato: "\u{1F345}", tongue: "\u{1F445}", top: "\u{1F51D}", tophat: "\u{1F3A9}", tornado: "\u{1F32A}", trackball: "\u{1F5B2}", tractor: "\u{1F69C}", traffic_light: "\u{1F6A5}", train: "\u{1F68B}", train2: "\u{1F686}", tram: "\u{1F68A}", triangular_flag_on_post: "\u{1F6A9}", triangular_ruler: "\u{1F4D0}", trident: "\u{1F531}", triumph: "\u{1F624}", trolleybus: "\u{1F68E}", trophy: "\u{1F3C6}", tropical_drink: "\u{1F379}", tropical_fish: "\u{1F420}", truck: "\u{1F69A}", trumpet: "\u{1F3BA}", tulip: "\u{1F337}", tumbler_glass: "\u{1F943}", turkey: "\u{1F983}", turtle: "\u{1F422}", tv: "\u{1F4FA}", twisted_rightwards_arrows: "\u{1F500}", two_hearts: "\u{1F495}", two_men_holding_hands: "\u{1F46C}", two_women_holding_hands: "\u{1F46D}", u5272: "\u{1F239}", u5408: "\u{1F234}", u55b6: "\u{1F23A}", u6307: "\u{1F22F}\uFE0F", u6708: "\u{1F237}\uFE0F", u6709: "\u{1F236}", u6e80: "\u{1F235}", u7121: "\u{1F21A}\uFE0F", u7533: "\u{1F238}", u7981: "\u{1F232}", u7a7a: "\u{1F233}", umbrella: "\u2614\uFE0F", unamused: "\u{1F612}", underage: "\u{1F51E}", unicorn: "\u{1F984}", unlock: "\u{1F513}", up: "\u{1F199}", upside_down_face: "\u{1F643}", v: "\u270C\uFE0F", vertical_traffic_light: "\u{1F6A6}", vhs: "\u{1F4FC}", vibration_mode: "\u{1F4F3}", video_camera: "\u{1F4F9}", video_game: "\u{1F3AE}", violin: "\u{1F3BB}", virgo: "\u264D\uFE0F", volcano: "\u{1F30B}", volleyball: "\u{1F3D0}", vs: "\u{1F19A}", vulcan_salute: "\u{1F596}", walking_man: "\u{1F6B6}", walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F", waning_crescent_moon: "\u{1F318}", waning_gibbous_moon: "\u{1F316}", warning: "\u26A0\uFE0F", wastebasket: "\u{1F5D1}", watch: "\u231A\uFE0F", water_buffalo: "\u{1F403}", watermelon: "\u{1F349}", wave: "\u{1F44B}", wavy_dash: "\u3030\uFE0F", waxing_crescent_moon: "\u{1F312}", wc: "\u{1F6BE}", weary: "\u{1F629}", wedding: "\u{1F492}", weight_lifting_man: "\u{1F3CB}\uFE0F", weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F", whale: "\u{1F433}", whale2: "\u{1F40B}", wheel_of_dharma: "\u2638\uFE0F", wheelchair: "\u267F\uFE0F", white_check_mark: "\u2705", white_circle: "\u26AA\uFE0F", white_flag: "\u{1F3F3}\uFE0F", white_flower: "\u{1F4AE}", white_large_square: "\u2B1C\uFE0F", white_medium_small_square: "\u25FD\uFE0F", white_medium_square: "\u25FB\uFE0F", white_small_square: "\u25AB\uFE0F", white_square_button: "\u{1F533}", wilted_flower: "\u{1F940}", wind_chime: "\u{1F390}", wind_face: "\u{1F32C}", wine_glass: "\u{1F377}", wink: "\u{1F609}", wolf: "\u{1F43A}", woman: "\u{1F469}", woman_artist: "\u{1F469}&zwj;\u{1F3A8}", woman_astronaut: "\u{1F469}&zwj;\u{1F680}", woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F", woman_cook: "\u{1F469}&zwj;\u{1F373}", woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F", woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}", woman_farmer: "\u{1F469}&zwj;\u{1F33E}", woman_firefighter: "\u{1F469}&zwj;\u{1F692}", woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F", woman_judge: "\u{1F469}&zwj;\u2696\uFE0F", woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F", woman_mechanic: "\u{1F469}&zwj;\u{1F527}", woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}", woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F", woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F", woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F", woman_scientist: "\u{1F469}&zwj;\u{1F52C}", woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F", woman_singer: "\u{1F469}&zwj;\u{1F3A4}", woman_student: "\u{1F469}&zwj;\u{1F393}", woman_teacher: "\u{1F469}&zwj;\u{1F3EB}", woman_technologist: "\u{1F469}&zwj;\u{1F4BB}", woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F", womans_clothes: "\u{1F45A}", womans_hat: "\u{1F452}", women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F", womens: "\u{1F6BA}", world_map: "\u{1F5FA}", worried: "\u{1F61F}", wrench: "\u{1F527}", writing_hand: "\u270D\uFE0F", x: "\u274C", yellow_heart: "\u{1F49B}", yen: "\u{1F4B4}", yin_yang: "\u262F\uFE0F", yum: "\u{1F60B}", zap: "\u26A1\uFE0F", zipper_mouth_face: "\u{1F910}", zzz: "\u{1F4A4}", octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">', showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>` }, r.Converter = function(e3) {
      "use strict";
      var u13 = {}, d7 = [], a5 = [], s = {}, i5 = R3, c5 = { parsed: {}, raw: "", format: "" };
      t();
      function t() {
        e3 = e3 || {};
        for (var n3 in E5)
          E5.hasOwnProperty(n3) && (u13[n3] = E5[n3]);
        if (typeof e3 == "object")
          for (var f7 in e3)
            e3.hasOwnProperty(f7) && (u13[f7] = e3[f7]);
        else
          throw Error("Converter expects the passed parameter to be an object, but " + typeof e3 + " was passed instead.");
        u13.extensions && r.helper.forEach(u13.extensions, p5);
      }
      function p5(n3, f7) {
        if (f7 = f7 || null, r.helper.isString(n3))
          if (n3 = r.helper.stdExtName(n3), f7 = n3, r.extensions[n3]) {
            console.warn("DEPRECATION WARNING: " + n3 + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), l7(r.extensions[n3], n3);
            return;
          } else if (!r.helper.isUndefined(z[n3]))
            n3 = z[n3];
          else
            throw Error('Extension "' + n3 + '" could not be loaded. It was either not found or is not a valid extension.');
        typeof n3 == "function" && (n3 = n3()), r.helper.isArray(n3) || (n3 = [n3]);
        var _3 = T3(n3, f7);
        if (!_3.valid)
          throw Error(_3.error);
        for (var m3 = 0; m3 < n3.length; ++m3) {
          switch (n3[m3].type) {
            case "lang":
              d7.push(n3[m3]);
              break;
            case "output":
              a5.push(n3[m3]);
              break;
          }
          if (n3[m3].hasOwnProperty("listeners"))
            for (var w5 in n3[m3].listeners)
              n3[m3].listeners.hasOwnProperty(w5) && o5(w5, n3[m3].listeners[w5]);
        }
      }
      function l7(n3, f7) {
        typeof n3 == "function" && (n3 = n3(new r.Converter())), r.helper.isArray(n3) || (n3 = [n3]);
        var _3 = T3(n3, f7);
        if (!_3.valid)
          throw Error(_3.error);
        for (var m3 = 0; m3 < n3.length; ++m3)
          switch (n3[m3].type) {
            case "lang":
              d7.push(n3[m3]);
              break;
            case "output":
              a5.push(n3[m3]);
              break;
            default:
              throw Error("Extension loader error: Type unrecognized!!!");
          }
      }
      function o5(n3, f7) {
        if (!r.helper.isString(n3))
          throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof n3 + " given");
        if (typeof f7 != "function")
          throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof f7 + " given");
        s.hasOwnProperty(n3) || (s[n3] = []), s[n3].push(f7);
      }
      function h5(n3) {
        var f7 = n3.match(/^\s*/)[0].length, _3 = new RegExp("^\\s{0," + f7 + "}", "gm");
        return n3.replace(_3, "");
      }
      this._dispatch = function(f7, _3, m3, w5) {
        if (s.hasOwnProperty(f7))
          for (var g11 = 0; g11 < s[f7].length; ++g11) {
            var y7 = s[f7][g11](f7, _3, this, m3, w5);
            y7 && typeof y7 < "u" && (_3 = y7);
          }
        return _3;
      }, this.listen = function(n3, f7) {
        return o5(n3, f7), this;
      }, this.makeHtml = function(n3) {
        if (!n3)
          return n3;
        var f7 = { gHtmlBlocks: [], gHtmlMdBlocks: [], gHtmlSpans: [], gUrls: {}, gTitles: {}, gDimensions: {}, gListLevel: 0, hashLinkCounts: {}, langExtensions: d7, outputModifiers: a5, converter: this, ghCodeBlocks: [], metadata: { parsed: {}, raw: "", format: "" } };
        return n3 = n3.replace(/¨/g, "\xA8T"), n3 = n3.replace(/\$/g, "\xA8D"), n3 = n3.replace(/\r\n/g, `
`), n3 = n3.replace(/\r/g, `
`), n3 = n3.replace(/\u00A0/g, "&nbsp;"), u13.smartIndentationFix && (n3 = h5(n3)), n3 = `

` + n3 + `

`, n3 = r.subParser("detab")(n3, u13, f7), n3 = n3.replace(/^[ \t]+$/mg, ""), r.helper.forEach(d7, function(_3) {
          n3 = r.subParser("runExtension")(_3, n3, u13, f7);
        }), n3 = r.subParser("metadata")(n3, u13, f7), n3 = r.subParser("hashPreCodeTags")(n3, u13, f7), n3 = r.subParser("githubCodeBlocks")(n3, u13, f7), n3 = r.subParser("hashHTMLBlocks")(n3, u13, f7), n3 = r.subParser("hashCodeTags")(n3, u13, f7), n3 = r.subParser("stripLinkDefinitions")(n3, u13, f7), n3 = r.subParser("blockGamut")(n3, u13, f7), n3 = r.subParser("unhashHTMLSpans")(n3, u13, f7), n3 = r.subParser("unescapeSpecialChars")(n3, u13, f7), n3 = n3.replace(/¨D/g, "$$"), n3 = n3.replace(/¨T/g, "\xA8"), n3 = r.subParser("completeHTMLDocument")(n3, u13, f7), r.helper.forEach(a5, function(_3) {
          n3 = r.subParser("runExtension")(_3, n3, u13, f7);
        }), c5 = f7.metadata, n3;
      }, this.makeMarkdown = this.makeMd = function(n3, f7) {
        if (n3 = n3.replace(/\r\n/g, `
`), n3 = n3.replace(/\r/g, `
`), n3 = n3.replace(/>[ \t]+</, ">\xA8NBSP;<"), !f7)
          if (window && window.document)
            f7 = window.document;
          else
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
        var _3 = f7.createElement("div");
        _3.innerHTML = n3;
        var m3 = { preList: S(_3) };
        j3(_3);
        for (var w5 = _3.childNodes, g11 = "", y7 = 0; y7 < w5.length; y7++)
          g11 += r.subParser("makeMarkdown.node")(w5[y7], m3);
        function j3(v9) {
          for (var P3 = 0; P3 < v9.childNodes.length; ++P3) {
            var C = v9.childNodes[P3];
            C.nodeType === 3 ? !/\S/.test(C.nodeValue) && !/^[ ]+$/.test(C.nodeValue) ? (v9.removeChild(C), --P3) : (C.nodeValue = C.nodeValue.split(`
`).join(" "), C.nodeValue = C.nodeValue.replace(/(\s)+/g, "$1")) : C.nodeType === 1 && j3(C);
          }
        }
        function S(v9) {
          for (var P3 = v9.querySelectorAll("pre"), C = [], M = 0; M < P3.length; ++M)
            if (P3[M].childElementCount === 1 && P3[M].firstChild.tagName.toLowerCase() === "code") {
              var N7 = P3[M].firstChild.innerHTML.trim(), V3 = P3[M].firstChild.getAttribute("data-language") || "";
              if (V3 === "")
                for (var K3 = P3[M].firstChild.className.split(" "), D3 = 0; D3 < K3.length; ++D3) {
                  var Z3 = K3[D3].match(/^language-(.+)$/);
                  if (Z3 !== null) {
                    V3 = Z3[1];
                    break;
                  }
                }
              N7 = r.helper.unescapeHTMLEntities(N7), C.push(N7), P3[M].outerHTML = '<precode language="' + V3 + '" precodenum="' + M.toString() + '"></precode>';
            } else
              C.push(P3[M].innerHTML), P3[M].innerHTML = "", P3[M].setAttribute("prenum", M.toString());
          return C;
        }
        return g11;
      }, this.setOption = function(n3, f7) {
        u13[n3] = f7;
      }, this.getOption = function(n3) {
        return u13[n3];
      }, this.getOptions = function() {
        return u13;
      }, this.addExtension = function(n3, f7) {
        f7 = f7 || null, p5(n3, f7);
      }, this.useExtension = function(n3) {
        p5(n3);
      }, this.setFlavor = function(n3) {
        if (!H.hasOwnProperty(n3))
          throw Error(n3 + " flavor was not found");
        var f7 = H[n3];
        i5 = n3;
        for (var _3 in f7)
          f7.hasOwnProperty(_3) && (u13[_3] = f7[_3]);
      }, this.getFlavor = function() {
        return i5;
      }, this.removeExtension = function(n3) {
        r.helper.isArray(n3) || (n3 = [n3]);
        for (var f7 = 0; f7 < n3.length; ++f7) {
          for (var _3 = n3[f7], m3 = 0; m3 < d7.length; ++m3)
            d7[m3] === _3 && d7.splice(m3, 1);
          for (var w5 = 0; w5 < a5.length; ++w5)
            a5[w5] === _3 && a5.splice(w5, 1);
        }
      }, this.getAllExtensions = function() {
        return { language: d7, output: a5 };
      }, this.getMetadata = function(n3) {
        return n3 ? c5.raw : c5.parsed;
      }, this.getMetadataFormat = function() {
        return c5.format;
      }, this._setMetadataPair = function(n3, f7) {
        c5.parsed[n3] = f7;
      }, this._setMetadataFormat = function(n3) {
        c5.format = n3;
      }, this._setMetadataRaw = function(n3) {
        c5.raw = n3;
      };
    }, r.subParser("anchors", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("anchors.before", e3, u13, d7);
      var a5 = function(s, i5, c5, t, p5, l7, o5) {
        if (r.helper.isUndefined(o5) && (o5 = ""), c5 = c5.toLowerCase(), s.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          t = "";
        else if (!t)
          if (c5 || (c5 = i5.toLowerCase().replace(/ ?\n/g, " ")), t = "#" + c5, !r.helper.isUndefined(d7.gUrls[c5]))
            t = d7.gUrls[c5], r.helper.isUndefined(d7.gTitles[c5]) || (o5 = d7.gTitles[c5]);
          else
            return s;
        t = t.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var h5 = '<a href="' + t + '"';
        return o5 !== "" && o5 !== null && (o5 = o5.replace(/"/g, "&quot;"), o5 = o5.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), h5 += ' title="' + o5 + '"'), u13.openLinksInNewWindow && !/^#/.test(t) && (h5 += ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h5 += ">" + i5 + "</a>", h5;
      };
      return e3 = e3.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, a5), e3 = e3.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a5), e3 = e3.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a5), e3 = e3.replace(/\[([^\[\]]+)]()()()()()/g, a5), u13.ghMentions && (e3 = e3.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(s, i5, c5, t, p5) {
        if (c5 === "\\")
          return i5 + t;
        if (!r.helper.isString(u13.ghMentionsLink))
          throw new Error("ghMentionsLink option must be a string");
        var l7 = u13.ghMentionsLink.replace(/\{u}/g, p5), o5 = "";
        return u13.openLinksInNewWindow && (o5 = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), i5 + '<a href="' + l7 + '"' + o5 + ">" + t + "</a>";
      })), e3 = d7.converter._dispatch("anchors.after", e3, u13, d7), e3;
    });
    var Y3 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, x3 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, ee = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, de = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, ue = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, I = function(e3) {
      "use strict";
      return function(u13, d7, a5, s, i5, c5, t) {
        a5 = a5.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var p5 = a5, l7 = "", o5 = "", h5 = d7 || "", n3 = t || "";
        return /^www\./i.test(a5) && (a5 = a5.replace(/^www\./i, "http://www.")), e3.excludeTrailingPunctuationFromURLs && c5 && (l7 = c5), e3.openLinksInNewWindow && (o5 = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h5 + '<a href="' + a5 + '"' + o5 + ">" + p5 + "</a>" + l7 + n3;
      };
    }, W5 = function(e3, u13) {
      "use strict";
      return function(d7, a5, s) {
        var i5 = "mailto:";
        return a5 = a5 || "", s = r.subParser("unescapeSpecialChars")(s, e3, u13), e3.encodeEmails ? (i5 = r.helper.encodeEmailAddress(i5 + s), s = r.helper.encodeEmailAddress(s)) : i5 = i5 + s, a5 + '<a href="' + i5 + '">' + s + "</a>";
      };
    };
    r.subParser("autoLinks", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("autoLinks.before", e3, u13, d7), e3 = e3.replace(ee, I(u13)), e3 = e3.replace(ue, W5(u13, d7)), e3 = d7.converter._dispatch("autoLinks.after", e3, u13, d7), e3;
    }), r.subParser("simplifiedAutoLinks", function(e3, u13, d7) {
      "use strict";
      return u13.simplifiedAutoLink && (e3 = d7.converter._dispatch("simplifiedAutoLinks.before", e3, u13, d7), u13.excludeTrailingPunctuationFromURLs ? e3 = e3.replace(x3, I(u13)) : e3 = e3.replace(Y3, I(u13)), e3 = e3.replace(de, W5(u13, d7)), e3 = d7.converter._dispatch("simplifiedAutoLinks.after", e3, u13, d7)), e3;
    }), r.subParser("blockGamut", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("blockGamut.before", e3, u13, d7), e3 = r.subParser("blockQuotes")(e3, u13, d7), e3 = r.subParser("headers")(e3, u13, d7), e3 = r.subParser("horizontalRule")(e3, u13, d7), e3 = r.subParser("lists")(e3, u13, d7), e3 = r.subParser("codeBlocks")(e3, u13, d7), e3 = r.subParser("tables")(e3, u13, d7), e3 = r.subParser("hashHTMLBlocks")(e3, u13, d7), e3 = r.subParser("paragraphs")(e3, u13, d7), e3 = d7.converter._dispatch("blockGamut.after", e3, u13, d7), e3;
    }), r.subParser("blockQuotes", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("blockQuotes.before", e3, u13, d7), e3 = e3 + `

`;
      var a5 = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      return u13.splitAdjacentBlockquotes && (a5 = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), e3 = e3.replace(a5, function(s) {
        return s = s.replace(/^[ \t]*>[ \t]?/gm, ""), s = s.replace(/¨0/g, ""), s = s.replace(/^[ \t]+$/gm, ""), s = r.subParser("githubCodeBlocks")(s, u13, d7), s = r.subParser("blockGamut")(s, u13, d7), s = s.replace(/(^|\n)/g, "$1  "), s = s.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(i5, c5) {
          var t = c5;
          return t = t.replace(/^  /mg, "\xA80"), t = t.replace(/¨0/g, ""), t;
        }), r.subParser("hashBlock")(`<blockquote>
` + s + `
</blockquote>`, u13, d7);
      }), e3 = d7.converter._dispatch("blockQuotes.after", e3, u13, d7), e3;
    }), r.subParser("codeBlocks", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("codeBlocks.before", e3, u13, d7), e3 += "\xA80";
      var a5 = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      return e3 = e3.replace(a5, function(s, i5, c5) {
        var t = i5, p5 = c5, l7 = `
`;
        return t = r.subParser("outdent")(t, u13, d7), t = r.subParser("encodeCode")(t, u13, d7), t = r.subParser("detab")(t, u13, d7), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), u13.omitExtraWLInCodeBlocks && (l7 = ""), t = "<pre><code>" + t + l7 + "</code></pre>", r.subParser("hashBlock")(t, u13, d7) + p5;
      }), e3 = e3.replace(/¨0/, ""), e3 = d7.converter._dispatch("codeBlocks.after", e3, u13, d7), e3;
    }), r.subParser("codeSpans", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("codeSpans.before", e3, u13, d7), typeof e3 > "u" && (e3 = ""), e3 = e3.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(a5, s, i5, c5) {
        var t = c5;
        return t = t.replace(/^([ \t]*)/g, ""), t = t.replace(/[ \t]*$/g, ""), t = r.subParser("encodeCode")(t, u13, d7), t = s + "<code>" + t + "</code>", t = r.subParser("hashHTMLSpans")(t, u13, d7), t;
      }), e3 = d7.converter._dispatch("codeSpans.after", e3, u13, d7), e3;
    }), r.subParser("completeHTMLDocument", function(e3, u13, d7) {
      "use strict";
      if (!u13.completeHTMLDocument)
        return e3;
      e3 = d7.converter._dispatch("completeHTMLDocument.before", e3, u13, d7);
      var a5 = "html", s = `<!DOCTYPE HTML>
`, i5 = "", c5 = `<meta charset="utf-8">
`, t = "", p5 = "";
      typeof d7.metadata.parsed.doctype < "u" && (s = "<!DOCTYPE " + d7.metadata.parsed.doctype + `>
`, a5 = d7.metadata.parsed.doctype.toString().toLowerCase(), (a5 === "html" || a5 === "html5") && (c5 = '<meta charset="utf-8">'));
      for (var l7 in d7.metadata.parsed)
        if (d7.metadata.parsed.hasOwnProperty(l7))
          switch (l7.toLowerCase()) {
            case "doctype":
              break;
            case "title":
              i5 = "<title>" + d7.metadata.parsed.title + `</title>
`;
              break;
            case "charset":
              a5 === "html" || a5 === "html5" ? c5 = '<meta charset="' + d7.metadata.parsed.charset + `">
` : c5 = '<meta name="charset" content="' + d7.metadata.parsed.charset + `">
`;
              break;
            case "language":
            case "lang":
              t = ' lang="' + d7.metadata.parsed[l7] + '"', p5 += '<meta name="' + l7 + '" content="' + d7.metadata.parsed[l7] + `">
`;
              break;
            default:
              p5 += '<meta name="' + l7 + '" content="' + d7.metadata.parsed[l7] + `">
`;
          }
      return e3 = s + "<html" + t + `>
<head>
` + i5 + c5 + p5 + `</head>
<body>
` + e3.trim() + `
</body>
</html>`, e3 = d7.converter._dispatch("completeHTMLDocument.after", e3, u13, d7), e3;
    }), r.subParser("detab", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("detab.before", e3, u13, d7), e3 = e3.replace(/\t(?=\t)/g, "    "), e3 = e3.replace(/\t/g, "\xA8A\xA8B"), e3 = e3.replace(/¨B(.+?)¨A/g, function(a5, s) {
        for (var i5 = s, c5 = 4 - i5.length % 4, t = 0; t < c5; t++)
          i5 += " ";
        return i5;
      }), e3 = e3.replace(/¨A/g, "    "), e3 = e3.replace(/¨B/g, ""), e3 = d7.converter._dispatch("detab.after", e3, u13, d7), e3;
    }), r.subParser("ellipsis", function(e3, u13, d7) {
      "use strict";
      return u13.ellipsis && (e3 = d7.converter._dispatch("ellipsis.before", e3, u13, d7), e3 = e3.replace(/\.\.\./g, "\u2026"), e3 = d7.converter._dispatch("ellipsis.after", e3, u13, d7)), e3;
    }), r.subParser("emoji", function(e3, u13, d7) {
      "use strict";
      if (!u13.emoji)
        return e3;
      e3 = d7.converter._dispatch("emoji.before", e3, u13, d7);
      var a5 = /:([\S]+?):/g;
      return e3 = e3.replace(a5, function(s, i5) {
        return r.helper.emojis.hasOwnProperty(i5) ? r.helper.emojis[i5] : s;
      }), e3 = d7.converter._dispatch("emoji.after", e3, u13, d7), e3;
    }), r.subParser("encodeAmpsAndAngles", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("encodeAmpsAndAngles.before", e3, u13, d7), e3 = e3.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e3 = e3.replace(/<(?![a-z\/?$!])/gi, "&lt;"), e3 = e3.replace(/</g, "&lt;"), e3 = e3.replace(/>/g, "&gt;"), e3 = d7.converter._dispatch("encodeAmpsAndAngles.after", e3, u13, d7), e3;
    }), r.subParser("encodeBackslashEscapes", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("encodeBackslashEscapes.before", e3, u13, d7), e3 = e3.replace(/\\(\\)/g, r.helper.escapeCharactersCallback), e3 = e3.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, r.helper.escapeCharactersCallback), e3 = d7.converter._dispatch("encodeBackslashEscapes.after", e3, u13, d7), e3;
    }), r.subParser("encodeCode", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("encodeCode.before", e3, u13, d7), e3 = e3.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, r.helper.escapeCharactersCallback), e3 = d7.converter._dispatch("encodeCode.after", e3, u13, d7), e3;
    }), r.subParser("escapeSpecialCharsWithinTagAttributes", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", e3, u13, d7);
      var a5 = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, s = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      return e3 = e3.replace(a5, function(i5) {
        return i5.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, r.helper.escapeCharactersCallback);
      }), e3 = e3.replace(s, function(i5) {
        return i5.replace(/([\\`*_~=|])/g, r.helper.escapeCharactersCallback);
      }), e3 = d7.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", e3, u13, d7), e3;
    }), r.subParser("githubCodeBlocks", function(e3, u13, d7) {
      "use strict";
      return u13.ghCodeBlocks ? (e3 = d7.converter._dispatch("githubCodeBlocks.before", e3, u13, d7), e3 += "\xA80", e3 = e3.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(a5, s, i5, c5) {
        var t = u13.omitExtraWLInCodeBlocks ? "" : `
`;
        return c5 = r.subParser("encodeCode")(c5, u13, d7), c5 = r.subParser("detab")(c5, u13, d7), c5 = c5.replace(/^\n+/g, ""), c5 = c5.replace(/\n+$/g, ""), c5 = "<pre><code" + (i5 ? ' class="' + i5 + " language-" + i5 + '"' : "") + ">" + c5 + t + "</code></pre>", c5 = r.subParser("hashBlock")(c5, u13, d7), `

\xA8G` + (d7.ghCodeBlocks.push({ text: a5, codeblock: c5 }) - 1) + `G

`;
      }), e3 = e3.replace(/¨0/, ""), d7.converter._dispatch("githubCodeBlocks.after", e3, u13, d7)) : e3;
    }), r.subParser("hashBlock", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("hashBlock.before", e3, u13, d7), e3 = e3.replace(/(^\n+|\n+$)/g, ""), e3 = `

\xA8K` + (d7.gHtmlBlocks.push(e3) - 1) + `K

`, e3 = d7.converter._dispatch("hashBlock.after", e3, u13, d7), e3;
    }), r.subParser("hashCodeTags", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("hashCodeTags.before", e3, u13, d7);
      var a5 = function(s, i5, c5, t) {
        var p5 = c5 + r.subParser("encodeCode")(i5, u13, d7) + t;
        return "\xA8C" + (d7.gHtmlSpans.push(p5) - 1) + "C";
      };
      return e3 = r.helper.replaceRecursiveRegExp(e3, a5, "<code\\b[^>]*>", "</code>", "gim"), e3 = d7.converter._dispatch("hashCodeTags.after", e3, u13, d7), e3;
    }), r.subParser("hashElement", function(e3, u13, d7) {
      "use strict";
      return function(a5, s) {
        var i5 = s;
        return i5 = i5.replace(/\n\n/g, `
`), i5 = i5.replace(/^\n/, ""), i5 = i5.replace(/\n+$/g, ""), i5 = `

\xA8K` + (d7.gHtmlBlocks.push(i5) - 1) + `K

`, i5;
      };
    }), r.subParser("hashHTMLBlocks", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("hashHTMLBlocks.before", e3, u13, d7);
      var a5 = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], s = function(n3, f7, _3, m3) {
        var w5 = n3;
        return _3.search(/\bmarkdown\b/) !== -1 && (w5 = _3 + d7.converter.makeHtml(f7) + m3), `

\xA8K` + (d7.gHtmlBlocks.push(w5) - 1) + `K

`;
      };
      u13.backslashEscapesHTMLTags && (e3 = e3.replace(/\\<(\/?[^>]+?)>/g, function(n3, f7) {
        return "&lt;" + f7 + "&gt;";
      }));
      for (var i5 = 0; i5 < a5.length; ++i5)
        for (var c5, t = new RegExp("^ {0,3}(<" + a5[i5] + "\\b[^>]*>)", "im"), p5 = "<" + a5[i5] + "\\b[^>]*>", l7 = "</" + a5[i5] + ">"; (c5 = r.helper.regexIndexOf(e3, t)) !== -1; ) {
          var o5 = r.helper.splitAtIndex(e3, c5), h5 = r.helper.replaceRecursiveRegExp(o5[1], s, p5, l7, "im");
          if (h5 === o5[1])
            break;
          e3 = o5[0].concat(h5);
        }
      return e3 = e3.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, r.subParser("hashElement")(e3, u13, d7)), e3 = r.helper.replaceRecursiveRegExp(e3, function(n3) {
        return `

\xA8K` + (d7.gHtmlBlocks.push(n3) - 1) + `K

`;
      }, "^ {0,3}<!--", "-->", "gm"), e3 = e3.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, r.subParser("hashElement")(e3, u13, d7)), e3 = d7.converter._dispatch("hashHTMLBlocks.after", e3, u13, d7), e3;
    }), r.subParser("hashHTMLSpans", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("hashHTMLSpans.before", e3, u13, d7);
      function a5(s) {
        return "\xA8C" + (d7.gHtmlSpans.push(s) - 1) + "C";
      }
      return e3 = e3.replace(/<[^>]+?\/>/gi, function(s) {
        return a5(s);
      }), e3 = e3.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(s) {
        return a5(s);
      }), e3 = e3.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(s) {
        return a5(s);
      }), e3 = e3.replace(/<[^>]+?>/gi, function(s) {
        return a5(s);
      }), e3 = d7.converter._dispatch("hashHTMLSpans.after", e3, u13, d7), e3;
    }), r.subParser("unhashHTMLSpans", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("unhashHTMLSpans.before", e3, u13, d7);
      for (var a5 = 0; a5 < d7.gHtmlSpans.length; ++a5) {
        for (var s = d7.gHtmlSpans[a5], i5 = 0; /¨C(\d+)C/.test(s); ) {
          var c5 = RegExp.$1;
          if (s = s.replace("\xA8C" + c5 + "C", d7.gHtmlSpans[c5]), i5 === 10) {
            console.error("maximum nesting of 10 spans reached!!!");
            break;
          }
          ++i5;
        }
        e3 = e3.replace("\xA8C" + a5 + "C", s);
      }
      return e3 = d7.converter._dispatch("unhashHTMLSpans.after", e3, u13, d7), e3;
    }), r.subParser("hashPreCodeTags", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("hashPreCodeTags.before", e3, u13, d7);
      var a5 = function(s, i5, c5, t) {
        var p5 = c5 + r.subParser("encodeCode")(i5, u13, d7) + t;
        return `

\xA8G` + (d7.ghCodeBlocks.push({ text: s, codeblock: p5 }) - 1) + `G

`;
      };
      return e3 = r.helper.replaceRecursiveRegExp(e3, a5, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), e3 = d7.converter._dispatch("hashPreCodeTags.after", e3, u13, d7), e3;
    }), r.subParser("headers", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("headers.before", e3, u13, d7);
      var a5 = isNaN(parseInt(u13.headerLevelStart)) ? 1 : parseInt(u13.headerLevelStart), s = u13.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, i5 = u13.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      e3 = e3.replace(s, function(p5, l7) {
        var o5 = r.subParser("spanGamut")(l7, u13, d7), h5 = u13.noHeaderId ? "" : ' id="' + t(l7) + '"', n3 = a5, f7 = "<h" + n3 + h5 + ">" + o5 + "</h" + n3 + ">";
        return r.subParser("hashBlock")(f7, u13, d7);
      }), e3 = e3.replace(i5, function(p5, l7) {
        var o5 = r.subParser("spanGamut")(l7, u13, d7), h5 = u13.noHeaderId ? "" : ' id="' + t(l7) + '"', n3 = a5 + 1, f7 = "<h" + n3 + h5 + ">" + o5 + "</h" + n3 + ">";
        return r.subParser("hashBlock")(f7, u13, d7);
      });
      var c5 = u13.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      e3 = e3.replace(c5, function(p5, l7, o5) {
        var h5 = o5;
        u13.customizedHeaderId && (h5 = o5.replace(/\s?\{([^{]+?)}\s*$/, ""));
        var n3 = r.subParser("spanGamut")(h5, u13, d7), f7 = u13.noHeaderId ? "" : ' id="' + t(o5) + '"', _3 = a5 - 1 + l7.length, m3 = "<h" + _3 + f7 + ">" + n3 + "</h" + _3 + ">";
        return r.subParser("hashBlock")(m3, u13, d7);
      });
      function t(p5) {
        var l7, o5;
        if (u13.customizedHeaderId) {
          var h5 = p5.match(/\{([^{]+?)}\s*$/);
          h5 && h5[1] && (p5 = h5[1]);
        }
        return l7 = p5, r.helper.isString(u13.prefixHeaderId) ? o5 = u13.prefixHeaderId : u13.prefixHeaderId === true ? o5 = "section-" : o5 = "", u13.rawPrefixHeaderId || (l7 = o5 + l7), u13.ghCompatibleHeaderId ? l7 = l7.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : u13.rawHeaderId ? l7 = l7.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : l7 = l7.replace(/[^\w]/g, "").toLowerCase(), u13.rawPrefixHeaderId && (l7 = o5 + l7), d7.hashLinkCounts[l7] ? l7 = l7 + "-" + d7.hashLinkCounts[l7]++ : d7.hashLinkCounts[l7] = 1, l7;
      }
      return e3 = d7.converter._dispatch("headers.after", e3, u13, d7), e3;
    }), r.subParser("horizontalRule", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("horizontalRule.before", e3, u13, d7);
      var a5 = r.subParser("hashBlock")("<hr />", u13, d7);
      return e3 = e3.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, a5), e3 = e3.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, a5), e3 = e3.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, a5), e3 = d7.converter._dispatch("horizontalRule.after", e3, u13, d7), e3;
    }), r.subParser("images", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("images.before", e3, u13, d7);
      var a5 = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, s = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, i5 = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, c5 = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, t = /!\[([^\[\]]+)]()()()()()/g;
      function p5(o5, h5, n3, f7, _3, m3, w5, g11) {
        return f7 = f7.replace(/\s/g, ""), l7(o5, h5, n3, f7, _3, m3, w5, g11);
      }
      function l7(o5, h5, n3, f7, _3, m3, w5, g11) {
        var y7 = d7.gUrls, j3 = d7.gTitles, S = d7.gDimensions;
        if (n3 = n3.toLowerCase(), g11 || (g11 = ""), o5.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          f7 = "";
        else if (f7 === "" || f7 === null)
          if ((n3 === "" || n3 === null) && (n3 = h5.toLowerCase().replace(/ ?\n/g, " ")), f7 = "#" + n3, !r.helper.isUndefined(y7[n3]))
            f7 = y7[n3], r.helper.isUndefined(j3[n3]) || (g11 = j3[n3]), r.helper.isUndefined(S[n3]) || (_3 = S[n3].width, m3 = S[n3].height);
          else
            return o5;
        h5 = h5.replace(/"/g, "&quot;").replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), f7 = f7.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var v9 = '<img src="' + f7 + '" alt="' + h5 + '"';
        return g11 && r.helper.isString(g11) && (g11 = g11.replace(/"/g, "&quot;").replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), v9 += ' title="' + g11 + '"'), _3 && m3 && (_3 = _3 === "*" ? "auto" : _3, m3 = m3 === "*" ? "auto" : m3, v9 += ' width="' + _3 + '"', v9 += ' height="' + m3 + '"'), v9 += " />", v9;
      }
      return e3 = e3.replace(c5, l7), e3 = e3.replace(i5, p5), e3 = e3.replace(s, l7), e3 = e3.replace(a5, l7), e3 = e3.replace(t, l7), e3 = d7.converter._dispatch("images.after", e3, u13, d7), e3;
    }), r.subParser("italicsAndBold", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("italicsAndBold.before", e3, u13, d7);
      function a5(s, i5, c5) {
        return i5 + s + c5;
      }
      return u13.literalMidWordUnderscores ? (e3 = e3.replace(/\b___(\S[\s\S]*?)___\b/g, function(s, i5) {
        return a5(i5, "<strong><em>", "</em></strong>");
      }), e3 = e3.replace(/\b__(\S[\s\S]*?)__\b/g, function(s, i5) {
        return a5(i5, "<strong>", "</strong>");
      }), e3 = e3.replace(/\b_(\S[\s\S]*?)_\b/g, function(s, i5) {
        return a5(i5, "<em>", "</em>");
      })) : (e3 = e3.replace(/___(\S[\s\S]*?)___/g, function(s, i5) {
        return /\S$/.test(i5) ? a5(i5, "<strong><em>", "</em></strong>") : s;
      }), e3 = e3.replace(/__(\S[\s\S]*?)__/g, function(s, i5) {
        return /\S$/.test(i5) ? a5(i5, "<strong>", "</strong>") : s;
      }), e3 = e3.replace(/_([^\s_][\s\S]*?)_/g, function(s, i5) {
        return /\S$/.test(i5) ? a5(i5, "<em>", "</em>") : s;
      })), u13.literalMidWordAsterisks ? (e3 = e3.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(s, i5, c5) {
        return a5(c5, i5 + "<strong><em>", "</em></strong>");
      }), e3 = e3.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(s, i5, c5) {
        return a5(c5, i5 + "<strong>", "</strong>");
      }), e3 = e3.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(s, i5, c5) {
        return a5(c5, i5 + "<em>", "</em>");
      })) : (e3 = e3.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(s, i5) {
        return /\S$/.test(i5) ? a5(i5, "<strong><em>", "</em></strong>") : s;
      }), e3 = e3.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(s, i5) {
        return /\S$/.test(i5) ? a5(i5, "<strong>", "</strong>") : s;
      }), e3 = e3.replace(/\*([^\s*][\s\S]*?)\*/g, function(s, i5) {
        return /\S$/.test(i5) ? a5(i5, "<em>", "</em>") : s;
      })), e3 = d7.converter._dispatch("italicsAndBold.after", e3, u13, d7), e3;
    }), r.subParser("lists", function(e3, u13, d7) {
      "use strict";
      function a5(c5, t) {
        d7.gListLevel++, c5 = c5.replace(/\n{2,}$/, `
`), c5 += "\xA80";
        var p5 = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, l7 = /\n[ \t]*\n(?!¨0)/.test(c5);
        return u13.disableForced4SpacesIndentedSublists && (p5 = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), c5 = c5.replace(p5, function(o5, h5, n3, f7, _3, m3, w5) {
          w5 = w5 && w5.trim() !== "";
          var g11 = r.subParser("outdent")(_3, u13, d7), y7 = "";
          return m3 && u13.tasklists && (y7 = ' class="task-list-item" style="list-style-type: none;"', g11 = g11.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var j3 = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            return w5 && (j3 += " checked"), j3 += ">", j3;
          })), g11 = g11.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(j3) {
            return "\xA8A" + j3;
          }), h5 || g11.search(/\n{2,}/) > -1 ? (g11 = r.subParser("githubCodeBlocks")(g11, u13, d7), g11 = r.subParser("blockGamut")(g11, u13, d7)) : (g11 = r.subParser("lists")(g11, u13, d7), g11 = g11.replace(/\n$/, ""), g11 = r.subParser("hashHTMLBlocks")(g11, u13, d7), g11 = g11.replace(/\n\n+/g, `

`), l7 ? g11 = r.subParser("paragraphs")(g11, u13, d7) : g11 = r.subParser("spanGamut")(g11, u13, d7)), g11 = g11.replace("\xA8A", ""), g11 = "<li" + y7 + ">" + g11 + `</li>
`, g11;
        }), c5 = c5.replace(/¨0/g, ""), d7.gListLevel--, t && (c5 = c5.replace(/\s+$/, "")), c5;
      }
      function s(c5, t) {
        if (t === "ol") {
          var p5 = c5.match(/^ *(\d+)\./);
          if (p5 && p5[1] !== "1")
            return ' start="' + p5[1] + '"';
        }
        return "";
      }
      function i5(c5, t, p5) {
        var l7 = u13.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, o5 = u13.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, h5 = t === "ul" ? l7 : o5, n3 = "";
        if (c5.search(h5) !== -1)
          (function _3(m3) {
            var w5 = m3.search(h5), g11 = s(c5, t);
            w5 !== -1 ? (n3 += `

<` + t + g11 + `>
` + a5(m3.slice(0, w5), !!p5) + "</" + t + `>
`, t = t === "ul" ? "ol" : "ul", h5 = t === "ul" ? l7 : o5, _3(m3.slice(w5))) : n3 += `

<` + t + g11 + `>
` + a5(m3, !!p5) + "</" + t + `>
`;
          })(c5);
        else {
          var f7 = s(c5, t);
          n3 = `

<` + t + f7 + `>
` + a5(c5, !!p5) + "</" + t + `>
`;
        }
        return n3;
      }
      return e3 = d7.converter._dispatch("lists.before", e3, u13, d7), e3 += "\xA80", d7.gListLevel ? e3 = e3.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c5, t, p5) {
        var l7 = p5.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i5(t, l7, true);
      }) : e3 = e3.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c5, t, p5, l7) {
        var o5 = l7.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i5(p5, o5, false);
      }), e3 = e3.replace(/¨0/, ""), e3 = d7.converter._dispatch("lists.after", e3, u13, d7), e3;
    }), r.subParser("metadata", function(e3, u13, d7) {
      "use strict";
      if (!u13.metadata)
        return e3;
      e3 = d7.converter._dispatch("metadata.before", e3, u13, d7);
      function a5(s) {
        d7.metadata.raw = s, s = s.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), s = s.replace(/\n {4}/g, " "), s.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(i5, c5, t) {
          return d7.metadata.parsed[c5] = t, "";
        });
      }
      return e3 = e3.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(s, i5, c5) {
        return a5(c5), "\xA8M";
      }), e3 = e3.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(s, i5, c5) {
        return i5 && (d7.metadata.format = i5), a5(c5), "\xA8M";
      }), e3 = e3.replace(/¨M/g, ""), e3 = d7.converter._dispatch("metadata.after", e3, u13, d7), e3;
    }), r.subParser("outdent", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("outdent.before", e3, u13, d7), e3 = e3.replace(/^(\t|[ ]{1,4})/gm, "\xA80"), e3 = e3.replace(/¨0/g, ""), e3 = d7.converter._dispatch("outdent.after", e3, u13, d7), e3;
    }), r.subParser("paragraphs", function(e3, u13, d7) {
      "use strict";
      e3 = d7.converter._dispatch("paragraphs.before", e3, u13, d7), e3 = e3.replace(/^\n+/g, ""), e3 = e3.replace(/\n+$/g, "");
      for (var a5 = e3.split(/\n{2,}/g), s = [], i5 = a5.length, c5 = 0; c5 < i5; c5++) {
        var t = a5[c5];
        t.search(/¨(K|G)(\d+)\1/g) >= 0 ? s.push(t) : t.search(/\S/) >= 0 && (t = r.subParser("spanGamut")(t, u13, d7), t = t.replace(/^([ \t]*)/g, "<p>"), t += "</p>", s.push(t));
      }
      for (i5 = s.length, c5 = 0; c5 < i5; c5++) {
        for (var p5 = "", l7 = s[c5], o5 = false; /¨(K|G)(\d+)\1/.test(l7); ) {
          var h5 = RegExp.$1, n3 = RegExp.$2;
          h5 === "K" ? p5 = d7.gHtmlBlocks[n3] : o5 ? p5 = r.subParser("encodeCode")(d7.ghCodeBlocks[n3].text, u13, d7) : p5 = d7.ghCodeBlocks[n3].codeblock, p5 = p5.replace(/\$/g, "$$$$"), l7 = l7.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, p5), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l7) && (o5 = true);
        }
        s[c5] = l7;
      }
      return e3 = s.join(`
`), e3 = e3.replace(/^\n+/g, ""), e3 = e3.replace(/\n+$/g, ""), d7.converter._dispatch("paragraphs.after", e3, u13, d7);
    }), r.subParser("runExtension", function(e3, u13, d7, a5) {
      "use strict";
      if (e3.filter)
        u13 = e3.filter(u13, a5.converter, d7);
      else if (e3.regex) {
        var s = e3.regex;
        s instanceof RegExp || (s = new RegExp(s, "g")), u13 = u13.replace(s, e3.replace);
      }
      return u13;
    }), r.subParser("spanGamut", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("spanGamut.before", e3, u13, d7), e3 = r.subParser("codeSpans")(e3, u13, d7), e3 = r.subParser("escapeSpecialCharsWithinTagAttributes")(e3, u13, d7), e3 = r.subParser("encodeBackslashEscapes")(e3, u13, d7), e3 = r.subParser("images")(e3, u13, d7), e3 = r.subParser("anchors")(e3, u13, d7), e3 = r.subParser("autoLinks")(e3, u13, d7), e3 = r.subParser("simplifiedAutoLinks")(e3, u13, d7), e3 = r.subParser("emoji")(e3, u13, d7), e3 = r.subParser("underline")(e3, u13, d7), e3 = r.subParser("italicsAndBold")(e3, u13, d7), e3 = r.subParser("strikethrough")(e3, u13, d7), e3 = r.subParser("ellipsis")(e3, u13, d7), e3 = r.subParser("hashHTMLSpans")(e3, u13, d7), e3 = r.subParser("encodeAmpsAndAngles")(e3, u13, d7), u13.simpleLineBreaks ? /\n\n¨K/.test(e3) || (e3 = e3.replace(/\n+/g, `<br />
`)) : e3 = e3.replace(/  +\n/g, `<br />
`), e3 = d7.converter._dispatch("spanGamut.after", e3, u13, d7), e3;
    }), r.subParser("strikethrough", function(e3, u13, d7) {
      "use strict";
      function a5(s) {
        return u13.simplifiedAutoLink && (s = r.subParser("simplifiedAutoLinks")(s, u13, d7)), "<del>" + s + "</del>";
      }
      return u13.strikethrough && (e3 = d7.converter._dispatch("strikethrough.before", e3, u13, d7), e3 = e3.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(s, i5) {
        return a5(i5);
      }), e3 = d7.converter._dispatch("strikethrough.after", e3, u13, d7)), e3;
    }), r.subParser("stripLinkDefinitions", function(e3, u13, d7) {
      "use strict";
      var a5 = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, s = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      e3 += "\xA80";
      var i5 = function(c5, t, p5, l7, o5, h5, n3) {
        return t = t.toLowerCase(), e3.toLowerCase().split(t).length - 1 < 2 ? c5 : (p5.match(/^data:.+?\/.+?;base64,/) ? d7.gUrls[t] = p5.replace(/\s/g, "") : d7.gUrls[t] = r.subParser("encodeAmpsAndAngles")(p5, u13, d7), h5 ? h5 + n3 : (n3 && (d7.gTitles[t] = n3.replace(/"|'/g, "&quot;")), u13.parseImgDimensions && l7 && o5 && (d7.gDimensions[t] = { width: l7, height: o5 }), ""));
      };
      return e3 = e3.replace(s, i5), e3 = e3.replace(a5, i5), e3 = e3.replace(/¨0/, ""), e3;
    }), r.subParser("tables", function(e3, u13, d7) {
      "use strict";
      if (!u13.tables)
        return e3;
      var a5 = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, s = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function i5(o5) {
        return /^:[ \t]*--*$/.test(o5) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(o5) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(o5) ? ' style="text-align:center;"' : "";
      }
      function c5(o5, h5) {
        var n3 = "";
        return o5 = o5.trim(), (u13.tablesHeaderId || u13.tableHeaderId) && (n3 = ' id="' + o5.replace(/ /g, "_").toLowerCase() + '"'), o5 = r.subParser("spanGamut")(o5, u13, d7), "<th" + n3 + h5 + ">" + o5 + `</th>
`;
      }
      function t(o5, h5) {
        var n3 = r.subParser("spanGamut")(o5, u13, d7);
        return "<td" + h5 + ">" + n3 + `</td>
`;
      }
      function p5(o5, h5) {
        for (var n3 = `<table>
<thead>
<tr>
`, f7 = o5.length, _3 = 0; _3 < f7; ++_3)
          n3 += o5[_3];
        for (n3 += `</tr>
</thead>
<tbody>
`, _3 = 0; _3 < h5.length; ++_3) {
          n3 += `<tr>
`;
          for (var m3 = 0; m3 < f7; ++m3)
            n3 += h5[_3][m3];
          n3 += `</tr>
`;
        }
        return n3 += `</tbody>
</table>
`, n3;
      }
      function l7(o5) {
        var h5, n3 = o5.split(`
`);
        for (h5 = 0; h5 < n3.length; ++h5)
          /^ {0,3}\|/.test(n3[h5]) && (n3[h5] = n3[h5].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(n3[h5]) && (n3[h5] = n3[h5].replace(/\|[ \t]*$/, "")), n3[h5] = r.subParser("codeSpans")(n3[h5], u13, d7);
        var f7 = n3[0].split("|").map(function(v9) {
          return v9.trim();
        }), _3 = n3[1].split("|").map(function(v9) {
          return v9.trim();
        }), m3 = [], w5 = [], g11 = [], y7 = [];
        for (n3.shift(), n3.shift(), h5 = 0; h5 < n3.length; ++h5)
          n3[h5].trim() !== "" && m3.push(n3[h5].split("|").map(function(v9) {
            return v9.trim();
          }));
        if (f7.length < _3.length)
          return o5;
        for (h5 = 0; h5 < _3.length; ++h5)
          g11.push(i5(_3[h5]));
        for (h5 = 0; h5 < f7.length; ++h5)
          r.helper.isUndefined(g11[h5]) && (g11[h5] = ""), w5.push(c5(f7[h5], g11[h5]));
        for (h5 = 0; h5 < m3.length; ++h5) {
          for (var j3 = [], S = 0; S < w5.length; ++S)
            r.helper.isUndefined(m3[h5][S]), j3.push(t(m3[h5][S], g11[S]));
          y7.push(j3);
        }
        return p5(w5, y7);
      }
      return e3 = d7.converter._dispatch("tables.before", e3, u13, d7), e3 = e3.replace(/\\(\|)/g, r.helper.escapeCharactersCallback), e3 = e3.replace(a5, l7), e3 = e3.replace(s, l7), e3 = d7.converter._dispatch("tables.after", e3, u13, d7), e3;
    }), r.subParser("underline", function(e3, u13, d7) {
      "use strict";
      return u13.underline && (e3 = d7.converter._dispatch("underline.before", e3, u13, d7), u13.literalMidWordUnderscores ? (e3 = e3.replace(/\b___(\S[\s\S]*?)___\b/g, function(a5, s) {
        return "<u>" + s + "</u>";
      }), e3 = e3.replace(/\b__(\S[\s\S]*?)__\b/g, function(a5, s) {
        return "<u>" + s + "</u>";
      })) : (e3 = e3.replace(/___(\S[\s\S]*?)___/g, function(a5, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a5;
      }), e3 = e3.replace(/__(\S[\s\S]*?)__/g, function(a5, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a5;
      })), e3 = e3.replace(/(_)/g, r.helper.escapeCharactersCallback), e3 = d7.converter._dispatch("underline.after", e3, u13, d7)), e3;
    }), r.subParser("unescapeSpecialChars", function(e3, u13, d7) {
      "use strict";
      return e3 = d7.converter._dispatch("unescapeSpecialChars.before", e3, u13, d7), e3 = e3.replace(/¨E(\d+)E/g, function(a5, s) {
        var i5 = parseInt(s);
        return String.fromCharCode(i5);
      }), e3 = d7.converter._dispatch("unescapeSpecialChars.after", e3, u13, d7), e3;
    }), r.subParser("makeMarkdown.blockquote", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (e3.hasChildNodes())
        for (var a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5) {
          var c5 = r.subParser("makeMarkdown.node")(a5[i5], u13);
          c5 !== "" && (d7 += c5);
        }
      return d7 = d7.trim(), d7 = "> " + d7.split(`
`).join(`
> `), d7;
    }), r.subParser("makeMarkdown.codeBlock", function(e3, u13) {
      "use strict";
      var d7 = e3.getAttribute("language"), a5 = e3.getAttribute("precodenum");
      return "```" + d7 + `
` + u13.preList[a5] + "\n```";
    }), r.subParser("makeMarkdown.codeSpan", function(e3) {
      "use strict";
      return "`" + e3.innerHTML + "`";
    }), r.subParser("makeMarkdown.emphasis", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (e3.hasChildNodes()) {
        d7 += "*";
        for (var a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5)
          d7 += r.subParser("makeMarkdown.node")(a5[i5], u13);
        d7 += "*";
      }
      return d7;
    }), r.subParser("makeMarkdown.header", function(e3, u13, d7) {
      "use strict";
      var a5 = new Array(d7 + 1).join("#"), s = "";
      if (e3.hasChildNodes()) {
        s = a5 + " ";
        for (var i5 = e3.childNodes, c5 = i5.length, t = 0; t < c5; ++t)
          s += r.subParser("makeMarkdown.node")(i5[t], u13);
      }
      return s;
    }), r.subParser("makeMarkdown.hr", function() {
      "use strict";
      return "---";
    }), r.subParser("makeMarkdown.image", function(e3) {
      "use strict";
      var u13 = "";
      return e3.hasAttribute("src") && (u13 += "![" + e3.getAttribute("alt") + "](", u13 += "<" + e3.getAttribute("src") + ">", e3.hasAttribute("width") && e3.hasAttribute("height") && (u13 += " =" + e3.getAttribute("width") + "x" + e3.getAttribute("height")), e3.hasAttribute("title") && (u13 += ' "' + e3.getAttribute("title") + '"'), u13 += ")"), u13;
    }), r.subParser("makeMarkdown.links", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (e3.hasChildNodes() && e3.hasAttribute("href")) {
        var a5 = e3.childNodes, s = a5.length;
        d7 = "[";
        for (var i5 = 0; i5 < s; ++i5)
          d7 += r.subParser("makeMarkdown.node")(a5[i5], u13);
        d7 += "](", d7 += "<" + e3.getAttribute("href") + ">", e3.hasAttribute("title") && (d7 += ' "' + e3.getAttribute("title") + '"'), d7 += ")";
      }
      return d7;
    }), r.subParser("makeMarkdown.list", function(e3, u13, d7) {
      "use strict";
      var a5 = "";
      if (!e3.hasChildNodes())
        return "";
      for (var s = e3.childNodes, i5 = s.length, c5 = e3.getAttribute("start") || 1, t = 0; t < i5; ++t)
        if (!(typeof s[t].tagName > "u" || s[t].tagName.toLowerCase() !== "li")) {
          var p5 = "";
          d7 === "ol" ? p5 = c5.toString() + ". " : p5 = "- ", a5 += p5 + r.subParser("makeMarkdown.listItem")(s[t], u13), ++c5;
        }
      return a5 += `
<!-- -->
`, a5.trim();
    }), r.subParser("makeMarkdown.listItem", function(e3, u13) {
      "use strict";
      for (var d7 = "", a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5)
        d7 += r.subParser("makeMarkdown.node")(a5[i5], u13);
      return /\n$/.test(d7) ? d7 = d7.split(`
`).join(`
    `).replace(/^ {4}$/gm, "").replace(/\n\n+/g, `

`) : d7 += `
`, d7;
    }), r.subParser("makeMarkdown.node", function(e3, u13, d7) {
      "use strict";
      d7 = d7 || false;
      var a5 = "";
      if (e3.nodeType === 3)
        return r.subParser("makeMarkdown.txt")(e3, u13);
      if (e3.nodeType === 8)
        return "<!--" + e3.data + `-->

`;
      if (e3.nodeType !== 1)
        return "";
      var s = e3.tagName.toLowerCase();
      switch (s) {
        case "h1":
          d7 || (a5 = r.subParser("makeMarkdown.header")(e3, u13, 1) + `

`);
          break;
        case "h2":
          d7 || (a5 = r.subParser("makeMarkdown.header")(e3, u13, 2) + `

`);
          break;
        case "h3":
          d7 || (a5 = r.subParser("makeMarkdown.header")(e3, u13, 3) + `

`);
          break;
        case "h4":
          d7 || (a5 = r.subParser("makeMarkdown.header")(e3, u13, 4) + `

`);
          break;
        case "h5":
          d7 || (a5 = r.subParser("makeMarkdown.header")(e3, u13, 5) + `

`);
          break;
        case "h6":
          d7 || (a5 = r.subParser("makeMarkdown.header")(e3, u13, 6) + `

`);
          break;
        case "p":
          d7 || (a5 = r.subParser("makeMarkdown.paragraph")(e3, u13) + `

`);
          break;
        case "blockquote":
          d7 || (a5 = r.subParser("makeMarkdown.blockquote")(e3, u13) + `

`);
          break;
        case "hr":
          d7 || (a5 = r.subParser("makeMarkdown.hr")(e3, u13) + `

`);
          break;
        case "ol":
          d7 || (a5 = r.subParser("makeMarkdown.list")(e3, u13, "ol") + `

`);
          break;
        case "ul":
          d7 || (a5 = r.subParser("makeMarkdown.list")(e3, u13, "ul") + `

`);
          break;
        case "precode":
          d7 || (a5 = r.subParser("makeMarkdown.codeBlock")(e3, u13) + `

`);
          break;
        case "pre":
          d7 || (a5 = r.subParser("makeMarkdown.pre")(e3, u13) + `

`);
          break;
        case "table":
          d7 || (a5 = r.subParser("makeMarkdown.table")(e3, u13) + `

`);
          break;
        case "code":
          a5 = r.subParser("makeMarkdown.codeSpan")(e3, u13);
          break;
        case "em":
        case "i":
          a5 = r.subParser("makeMarkdown.emphasis")(e3, u13);
          break;
        case "strong":
        case "b":
          a5 = r.subParser("makeMarkdown.strong")(e3, u13);
          break;
        case "del":
          a5 = r.subParser("makeMarkdown.strikethrough")(e3, u13);
          break;
        case "a":
          a5 = r.subParser("makeMarkdown.links")(e3, u13);
          break;
        case "img":
          a5 = r.subParser("makeMarkdown.image")(e3, u13);
          break;
        default:
          a5 = e3.outerHTML + `

`;
      }
      return a5;
    }), r.subParser("makeMarkdown.paragraph", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (e3.hasChildNodes())
        for (var a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5)
          d7 += r.subParser("makeMarkdown.node")(a5[i5], u13);
      return d7 = d7.trim(), d7;
    }), r.subParser("makeMarkdown.pre", function(e3, u13) {
      "use strict";
      var d7 = e3.getAttribute("prenum");
      return "<pre>" + u13.preList[d7] + "</pre>";
    }), r.subParser("makeMarkdown.strikethrough", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (e3.hasChildNodes()) {
        d7 += "~~";
        for (var a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5)
          d7 += r.subParser("makeMarkdown.node")(a5[i5], u13);
        d7 += "~~";
      }
      return d7;
    }), r.subParser("makeMarkdown.strong", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (e3.hasChildNodes()) {
        d7 += "**";
        for (var a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5)
          d7 += r.subParser("makeMarkdown.node")(a5[i5], u13);
        d7 += "**";
      }
      return d7;
    }), r.subParser("makeMarkdown.table", function(e3, u13) {
      "use strict";
      var d7 = "", a5 = [[], []], s = e3.querySelectorAll("thead>tr>th"), i5 = e3.querySelectorAll("tbody>tr"), c5, t;
      for (c5 = 0; c5 < s.length; ++c5) {
        var p5 = r.subParser("makeMarkdown.tableCell")(s[c5], u13), l7 = "---";
        if (s[c5].hasAttribute("style")) {
          var o5 = s[c5].getAttribute("style").toLowerCase().replace(/\s/g, "");
          switch (o5) {
            case "text-align:left;":
              l7 = ":---";
              break;
            case "text-align:right;":
              l7 = "---:";
              break;
            case "text-align:center;":
              l7 = ":---:";
              break;
          }
        }
        a5[0][c5] = p5.trim(), a5[1][c5] = l7;
      }
      for (c5 = 0; c5 < i5.length; ++c5) {
        var h5 = a5.push([]) - 1, n3 = i5[c5].getElementsByTagName("td");
        for (t = 0; t < s.length; ++t) {
          var f7 = " ";
          typeof n3[t] < "u" && (f7 = r.subParser("makeMarkdown.tableCell")(n3[t], u13)), a5[h5].push(f7);
        }
      }
      var _3 = 3;
      for (c5 = 0; c5 < a5.length; ++c5)
        for (t = 0; t < a5[c5].length; ++t) {
          var m3 = a5[c5][t].length;
          m3 > _3 && (_3 = m3);
        }
      for (c5 = 0; c5 < a5.length; ++c5) {
        for (t = 0; t < a5[c5].length; ++t)
          c5 === 1 ? a5[c5][t].slice(-1) === ":" ? a5[c5][t] = r.helper.padEnd(a5[c5][t].slice(-1), _3 - 1, "-") + ":" : a5[c5][t] = r.helper.padEnd(a5[c5][t], _3, "-") : a5[c5][t] = r.helper.padEnd(a5[c5][t], _3);
        d7 += "| " + a5[c5].join(" | ") + ` |
`;
      }
      return d7.trim();
    }), r.subParser("makeMarkdown.tableCell", function(e3, u13) {
      "use strict";
      var d7 = "";
      if (!e3.hasChildNodes())
        return "";
      for (var a5 = e3.childNodes, s = a5.length, i5 = 0; i5 < s; ++i5)
        d7 += r.subParser("makeMarkdown.node")(a5[i5], u13, true);
      return d7.trim();
    }), r.subParser("makeMarkdown.txt", function(e3) {
      "use strict";
      var u13 = e3.nodeValue;
      return u13 = u13.replace(/ +/g, " "), u13 = u13.replace(/¨NBSP;/g, " "), u13 = r.helper.unescapeHTMLEntities(u13), u13 = u13.replace(/([*_~|`])/g, "\\$1"), u13 = u13.replace(/^(\s*)>/g, "\\$1>"), u13 = u13.replace(/^#/gm, "\\#"), u13 = u13.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3"), u13 = u13.replace(/^( {0,3}\d+)\./gm, "$1\\."), u13 = u13.replace(/^( {0,3})([+-])/gm, "$1\\$2"), u13 = u13.replace(/]([\s]*)\(/g, "\\]$1\\("), u13 = u13.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:"), u13;
    });
    var re = this;
    typeof define == "function" && define.amd ? define(function() {
      "use strict";
      return r;
    }) : typeof $3 < "u" && $3.exports ? $3.exports = r : re.showdown = r;
  }).call(X3);
});
var A2 = {};
fe(A2, { default: () => he });
var oe = Q2(q());
B2(A2, Q2(q()));
var { default: J2, ...le } = oe;
var he = J2 !== void 0 ? J2 : le;

// main/components/markdown.js
var markdownConverter = new he.Converter();
var Markdown = ({ text }) => {
  const element2 = document.createElement("div");
  const indent2 = text.match(/\t* *\n( *)/)[1];
  text = text.replace(regex`${/^/}${indent2}`.gm, "");
  element2.innerHTML = markdownConverter.makeHtml(text);
  return element2;
};
var markdown_default = Markdown;

// https://esm.sh/v135/@emotion/sheet@1.2.2/denonext/sheet.mjs
function l4(r) {
  if (r.sheet)
    return r.sheet;
  for (var t = 0; t < document.styleSheets.length; t++)
    if (document.styleSheets[t].ownerNode === r)
      return document.styleSheets[t];
}
function a3(r) {
  var t = document.createElement("style");
  return t.setAttribute("data-emotion", r.key), r.nonce !== void 0 && t.setAttribute("nonce", r.nonce), t.appendChild(document.createTextNode("")), t.setAttribute("data-s", ""), t;
}
var u7 = function() {
  function r(n3) {
    var e3 = this;
    this._insertTag = function(i5) {
      var s;
      e3.tags.length === 0 ? e3.insertionPoint ? s = e3.insertionPoint.nextSibling : e3.prepend ? s = e3.container.firstChild : s = e3.before : s = e3.tags[e3.tags.length - 1].nextSibling, e3.container.insertBefore(i5, s), e3.tags.push(i5);
    }, this.isSpeedy = n3.speedy === void 0 ? true : n3.speedy, this.tags = [], this.ctr = 0, this.nonce = n3.nonce, this.key = n3.key, this.container = n3.container, this.prepend = n3.prepend, this.insertionPoint = n3.insertionPoint, this.before = null;
  }
  var t = r.prototype;
  return t.hydrate = function(e3) {
    e3.forEach(this._insertTag);
  }, t.insert = function(e3) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(a3(this));
    var i5 = this.tags[this.tags.length - 1];
    if (0)
      var s;
    if (this.isSpeedy) {
      var o5 = l4(i5);
      try {
        o5.insertRule(e3, o5.cssRules.length);
      } catch {
      }
    } else
      i5.appendChild(document.createTextNode(e3));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(e3) {
      return e3.parentNode && e3.parentNode.removeChild(e3);
    }), this.tags = [], this.ctr = 0;
  }, r;
}();

// https://esm.sh/v135/stylis@4.2.0/denonext/stylis.mjs
var n2 = "-ms-";
var F3 = "-moz-";
var o3 = "-webkit-";
var J3 = "comm";
var P2 = "rule";
var K2 = "decl";
var ir3 = "@import";
var Q3 = "@keyframes";
var pr2 = "@layer";
var fr2 = Math.abs;
var Y2 = String.fromCharCode;
var xr2 = Object.assign;
function ur2(r, t) {
  return p3(r, 0) ^ 45 ? (((t << 2 ^ p3(r, 0)) << 2 ^ p3(r, 1)) << 2 ^ p3(r, 2)) << 2 ^ p3(r, 3) : 0;
}
function X2(r) {
  return r.trim();
}
function A3(r, t) {
  return (r = t.exec(r)) ? r[0] : r;
}
function c3(r, t, e3) {
  return r.replace(t, e3);
}
function _2(r, t) {
  return r.indexOf(t);
}
function p3(r, t) {
  return r.charCodeAt(t) | 0;
}
function $2(r, t, e3) {
  return r.slice(t, e3);
}
function u8(r) {
  return r.length;
}
function L2(r) {
  return r.length;
}
function R2(r, t) {
  return t.push(r), r;
}
function er3(r, t) {
  return r.map(t).join("");
}
var l5 = 1;
var W3 = 1;
var br2 = 0;
var h3 = 0;
var f4 = 0;
var j2 = "";
function y4(r, t, e3, s, a5, w5, g11) {
  return { value: r, root: t, parent: e3, type: s, props: a5, children: w5, line: l5, column: W3, length: g11, return: "" };
}
function B3(r, t) {
  return xr2(y4("", null, null, "", null, null, 0), r, { length: -r.length }, t);
}
function mr2() {
  return f4;
}
function wr2() {
  return f4 = h3 > 0 ? p3(j2, --h3) : 0, W3--, f4 === 10 && (W3 = 1, l5--), f4;
}
function E3() {
  return f4 = h3 < br2 ? p3(j2, h3++) : 0, W3++, f4 === 10 && (W3 = 1, l5++), f4;
}
function N4() {
  return p3(j2, h3);
}
function V2() {
  return h3;
}
function rr3(r, t) {
  return $2(j2, r, t);
}
function v5(r) {
  switch (r) {
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
function sr3(r) {
  return l5 = W3 = 1, br2 = u8(j2 = r), h3 = 0, [];
}
function ar3(r) {
  return j2 = "", r;
}
function G2(r) {
  return X2(rr3(h3 - 1, cr3(r === 91 ? r + 2 : r === 40 ? r + 1 : r)));
}
function Er2(r) {
  for (; (f4 = N4()) && f4 < 33; )
    E3();
  return v5(r) > 2 || v5(f4) > 3 ? "" : " ";
}
function kr2(r, t) {
  for (; --t && E3() && !(f4 < 48 || f4 > 102 || f4 > 57 && f4 < 65 || f4 > 70 && f4 < 97); )
    ;
  return rr3(r, V2() + (t < 6 && N4() == 32 && E3() == 32));
}
function cr3(r) {
  for (; E3(); )
    switch (f4) {
      case r:
        return h3;
      case 34:
      case 39:
        r !== 34 && r !== 39 && cr3(f4);
        break;
      case 40:
        r === 41 && cr3(r);
        break;
      case 92:
        E3();
        break;
    }
  return h3;
}
function $r2(r, t) {
  for (; E3() && r + f4 !== 57; )
    if (r + f4 === 84 && N4() === 47)
      break;
  return "/*" + rr3(t, h3 - 1) + "*" + Y2(r === 47 ? r : E3());
}
function or2(r) {
  for (; !v5(N4()); )
    E3();
  return rr3(r, h3);
}
function jr2(r) {
  return ar3(tr3("", null, null, null, [""], r = sr3(r), 0, [0], r));
}
function tr3(r, t, e3, s, a5, w5, g11, x3, S) {
  for (var M = 0, C = 0, b5 = g11, I = 0, D3 = 0, O = 0, d7 = 1, H = 1, k = 1, m3 = 0, z = "", q2 = a5, U2 = w5, T3 = s, i5 = z; H; )
    switch (O = m3, m3 = E3()) {
      case 40:
        if (O != 108 && p3(i5, b5 - 1) == 58) {
          _2(i5 += c3(G2(m3), "&", "&\f"), "&\f") != -1 && (k = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        i5 += G2(m3);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        i5 += Er2(O);
        break;
      case 92:
        i5 += kr2(V2() - 1, 7);
        continue;
      case 47:
        switch (N4()) {
          case 42:
          case 47:
            R2(Ar2($r2(E3(), V2()), t, e3), S);
            break;
          default:
            i5 += "/";
        }
        break;
      case 123 * d7:
        x3[M++] = u8(i5) * k;
      case 125 * d7:
      case 59:
      case 0:
        switch (m3) {
          case 0:
          case 125:
            H = 0;
          case 59 + C:
            k == -1 && (i5 = c3(i5, /\f/g, "")), D3 > 0 && u8(i5) - b5 && R2(D3 > 32 ? dr2(i5 + ";", s, e3, b5 - 1) : dr2(c3(i5, " ", "") + ";", s, e3, b5 - 2), S);
            break;
          case 59:
            i5 += ";";
          default:
            if (R2(T3 = gr2(i5, t, e3, M, C, a5, x3, z, q2 = [], U2 = [], b5), w5), m3 === 123)
              if (C === 0)
                tr3(i5, t, T3, T3, q2, w5, b5, x3, U2);
              else
                switch (I === 99 && p3(i5, 3) === 110 ? 100 : I) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    tr3(r, T3, T3, s && R2(gr2(r, T3, T3, 0, 0, a5, x3, z, a5, q2 = [], b5), U2), a5, U2, b5, x3, s ? q2 : U2);
                    break;
                  default:
                    tr3(i5, T3, T3, T3, [""], U2, 0, x3, U2);
                }
        }
        M = C = D3 = 0, d7 = k = 1, z = i5 = "", b5 = g11;
        break;
      case 58:
        b5 = 1 + u8(i5), D3 = O;
      default:
        if (d7 < 1) {
          if (m3 == 123)
            --d7;
          else if (m3 == 125 && d7++ == 0 && wr2() == 125)
            continue;
        }
        switch (i5 += Y2(m3), m3 * d7) {
          case 38:
            k = C > 0 ? 1 : (i5 += "\f", -1);
            break;
          case 44:
            x3[M++] = (u8(i5) - 1) * k, k = 1;
            break;
          case 64:
            N4() === 45 && (i5 += G2(E3())), I = N4(), C = b5 = u8(z = i5 += or2(V2())), m3++;
            break;
          case 45:
            O === 45 && u8(i5) == 2 && (d7 = 0);
        }
    }
  return w5;
}
function gr2(r, t, e3, s, a5, w5, g11, x3, S, M, C) {
  for (var b5 = a5 - 1, I = a5 === 0 ? w5 : [""], D3 = L2(I), O = 0, d7 = 0, H = 0; O < s; ++O)
    for (var k = 0, m3 = $2(r, b5 + 1, b5 = fr2(d7 = g11[O])), z = r; k < D3; ++k)
      (z = X2(d7 > 0 ? I[k] + " " + m3 : c3(m3, /&\f/g, I[k]))) && (S[H++] = z);
  return y4(r, t, e3, a5 === 0 ? P2 : x3, S, M, C);
}
function Ar2(r, t, e3) {
  return y4(r, t, e3, J3, Y2(mr2()), $2(r, 2, -2), 0);
}
function dr2(r, t, e3, s) {
  return y4(r, t, e3, K2, $2(r, 0, s), $2(r, s + 1, -1), s);
}
function Z2(r, t) {
  for (var e3 = "", s = L2(r), a5 = 0; a5 < s; a5++)
    e3 += t(r[a5], a5, r, t) || "";
  return e3;
}
function qr2(r, t, e3, s) {
  switch (r.type) {
    case pr2:
      if (r.children.length)
        break;
    case ir3:
    case K2:
      return r.return = r.return || r.value;
    case J3:
      return "";
    case Q3:
      return r.return = r.value + "{" + Z2(r.children, s) + "}";
    case P2:
      r.value = r.props.join(",");
  }
  return u8(e3 = Z2(r.children, s)) ? r.return = r.value + "{" + e3 + "}" : "";
}
function tt2(r) {
  var t = L2(r);
  return function(e3, s, a5, w5) {
    for (var g11 = "", x3 = 0; x3 < t; x3++)
      g11 += r[x3](e3, s, a5, w5) || "";
    return g11;
  };
}

// https://esm.sh/v135/@emotion/weak-memoize@0.3.1/denonext/weak-memoize.mjs
var u9 = function(n3) {
  var t = /* @__PURE__ */ new WeakMap();
  return function(e3) {
    if (t.has(e3))
      return t.get(e3);
    var a5 = n3(e3);
    return t.set(e3, a5), a5;
  };
};

// https://esm.sh/v135/@emotion/memoize@0.8.1/denonext/memoize.mjs
function u10(t) {
  var n3 = /* @__PURE__ */ Object.create(null);
  return function(e3) {
    return n3[e3] === void 0 && (n3[e3] = t(e3)), n3[e3];
  };
}

// https://esm.sh/v135/@emotion/cache@11.11.0/denonext/cache.mjs
var rr4 = function(e3, c5, n3) {
  for (var i5 = 0, o5 = 0; i5 = o5, o5 = N4(), i5 === 38 && o5 === 12 && (c5[n3] = 1), !v5(o5); )
    E3();
  return rr3(e3, h3);
};
var er4 = function(e3, c5) {
  var n3 = -1, i5 = 44;
  do
    switch (v5(i5)) {
      case 0:
        i5 === 38 && N4() === 12 && (c5[n3] = 1), e3[n3] += rr4(h3 - 1, c5, n3);
        break;
      case 2:
        e3[n3] += G2(i5);
        break;
      case 4:
        if (i5 === 44) {
          e3[++n3] = N4() === 58 ? "&\f" : "", c5[n3] = e3[n3].length;
          break;
        }
      default:
        e3[n3] += Y2(i5);
    }
  while (i5 = E3());
  return e3;
};
var tr4 = function(e3, c5) {
  return ar3(er4(sr3(e3), c5));
};
var T2 = /* @__PURE__ */ new WeakMap();
var sr4 = function(e3) {
  if (!(e3.type !== "rule" || !e3.parent || e3.length < 1)) {
    for (var c5 = e3.value, n3 = e3.parent, i5 = e3.column === n3.column && e3.line === n3.line; n3.type !== "rule"; )
      if (n3 = n3.parent, !n3)
        return;
    if (!(e3.props.length === 1 && c5.charCodeAt(0) !== 58 && !T2.get(n3)) && !i5) {
      T2.set(e3, true);
      for (var o5 = [], g11 = tr4(c5, o5), u13 = n3.props, f7 = 0, w5 = 0; f7 < g11.length; f7++)
        for (var h5 = 0; h5 < u13.length; h5++, w5++)
          e3.props[w5] = o5[f7] ? g11[f7].replace(/&\f/g, u13[h5]) : u13[h5] + " " + g11[f7];
    }
  }
};
var nr2 = function(e3) {
  if (e3.type === "decl") {
    var c5 = e3.value;
    c5.charCodeAt(0) === 108 && c5.charCodeAt(2) === 98 && (e3.return = "", e3.value = "");
  }
};
function W4(r, e3) {
  switch (ur2(r, e3)) {
    case 5103:
      return o3 + "print-" + r + r;
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
      return o3 + r + r;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return o3 + r + F3 + r + n2 + r + r;
    case 6828:
    case 4268:
      return o3 + r + n2 + r + r;
    case 6165:
      return o3 + r + n2 + "flex-" + r + r;
    case 5187:
      return o3 + r + c3(r, /(\w+).+(:[^]+)/, o3 + "box-$1$2" + n2 + "flex-$1$2") + r;
    case 5443:
      return o3 + r + n2 + "flex-item-" + c3(r, /flex-|-self/, "") + r;
    case 4675:
      return o3 + r + n2 + "flex-line-pack" + c3(r, /align-content|flex-|-self/, "") + r;
    case 5548:
      return o3 + r + n2 + c3(r, "shrink", "negative") + r;
    case 5292:
      return o3 + r + n2 + c3(r, "basis", "preferred-size") + r;
    case 6060:
      return o3 + "box-" + c3(r, "-grow", "") + o3 + r + n2 + c3(r, "grow", "positive") + r;
    case 4554:
      return o3 + c3(r, /([^-])(transform)/g, "$1" + o3 + "$2") + r;
    case 6187:
      return c3(c3(c3(r, /(zoom-|grab)/, o3 + "$1"), /(image-set)/, o3 + "$1"), r, "") + r;
    case 5495:
    case 3959:
      return c3(r, /(image-set\([^]*)/, o3 + "$1$`$1");
    case 4968:
      return c3(c3(r, /(.+:)(flex-)?(.*)/, o3 + "box-pack:$3" + n2 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + o3 + r + r;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return c3(r, /(.+)-inline(.+)/, o3 + "$1$2") + r;
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
      if (u8(r) - 1 - e3 > 6)
        switch (p3(r, e3 + 1)) {
          case 109:
            if (p3(r, e3 + 4) !== 45)
              break;
          case 102:
            return c3(r, /(.+:)(.+)-([^]+)/, "$1" + o3 + "$2-$3$1" + F3 + (p3(r, e3 + 3) == 108 ? "$3" : "$2-$3")) + r;
          case 115:
            return ~_2(r, "stretch") ? W4(c3(r, "stretch", "fill-available"), e3) + r : r;
        }
      break;
    case 4949:
      if (p3(r, e3 + 1) !== 115)
        break;
    case 6444:
      switch (p3(r, u8(r) - 3 - (~_2(r, "!important") && 10))) {
        case 107:
          return c3(r, ":", ":" + o3) + r;
        case 101:
          return c3(r, /(.+:)([^;!]+)(;|!.+)?/, "$1" + o3 + (p3(r, 14) === 45 ? "inline-" : "") + "box$3$1" + o3 + "$2$3$1" + n2 + "$2box$3") + r;
      }
      break;
    case 5936:
      switch (p3(r, e3 + 11)) {
        case 114:
          return o3 + r + n2 + c3(r, /[svh]\w+-[tblr]{2}/, "tb") + r;
        case 108:
          return o3 + r + n2 + c3(r, /[svh]\w+-[tblr]{2}/, "tb-rl") + r;
        case 45:
          return o3 + r + n2 + c3(r, /[svh]\w+-[tblr]{2}/, "lr") + r;
      }
      return o3 + r + n2 + r + r;
  }
  return r;
}
var cr4 = function(e3, c5, n3, i5) {
  if (e3.length > -1 && !e3.return)
    switch (e3.type) {
      case K2:
        e3.return = W4(e3.value, e3.length);
        break;
      case Q3:
        return Z2([B3(e3, { value: c3(e3.value, "@", "@" + o3) })], i5);
      case P2:
        if (e3.length)
          return er3(e3.props, function(o5) {
            switch (A3(o5, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return Z2([B3(e3, { props: [c3(o5, /:(read-\w+)/, ":" + F3 + "$1")] })], i5);
              case "::placeholder":
                return Z2([B3(e3, { props: [c3(o5, /:(plac\w+)/, ":" + o3 + "input-$1")] }), B3(e3, { props: [c3(o5, /:(plac\w+)/, ":" + F3 + "$1")] }), B3(e3, { props: [c3(o5, /:(plac\w+)/, n2 + "input-$1")] })], i5);
            }
            return "";
          });
    }
};
var ir4 = u9(function() {
  return u10(function() {
    var r = {};
    return function(e3) {
      return r[e3];
    };
  });
});
var ar4 = [cr4];
var hr2 = function(e3) {
  var c5 = e3.key, n3 = e3.stylisPlugins || ar4, i5 = {}, o5, g11 = [], u13, f7 = [sr4, nr2];
  {
    var w5 = [qr2], h5 = tt2(f7.concat(n3, w5)), z = function(d7) {
      return Z2(jr2(d7), h5);
    }, x3 = ir4(n3)(c5), D3 = function(d7, y7) {
      var b5 = y7.name;
      return x3[b5] === void 0 && (x3[b5] = z(d7 ? d7 + "{" + y7.styles + "}" : y7.styles)), x3[b5];
    };
    u13 = function(d7, y7, b5, P3) {
      var I = y7.name, E5 = D3(d7, y7);
      if (l7.compat === void 0)
        return P3 && (l7.inserted[I] = true), E5;
      if (P3)
        l7.inserted[I] = E5;
      else
        return E5;
    };
  }
  var l7 = { key: c5, sheet: new u7({ key: c5, container: o5, nonce: e3.nonce, speedy: e3.speedy, prepend: e3.prepend, insertionPoint: e3.insertionPoint }), nonce: e3.nonce, inserted: i5, registered: {}, insert: u13 };
  return l7.sheet.hydrate(g11), l7;
};

// https://esm.sh/v135/@emotion/hash@0.9.1/denonext/hash.mjs
function c4(e3) {
  for (var f7 = 0, x3, a5 = 0, d7 = e3.length; d7 >= 4; ++a5, d7 -= 4)
    x3 = e3.charCodeAt(a5) & 255 | (e3.charCodeAt(++a5) & 255) << 8 | (e3.charCodeAt(++a5) & 255) << 16 | (e3.charCodeAt(++a5) & 255) << 24, x3 = (x3 & 65535) * 1540483477 + ((x3 >>> 16) * 59797 << 16), x3 ^= x3 >>> 24, f7 = (x3 & 65535) * 1540483477 + ((x3 >>> 16) * 59797 << 16) ^ (f7 & 65535) * 1540483477 + ((f7 >>> 16) * 59797 << 16);
  switch (d7) {
    case 3:
      f7 ^= (e3.charCodeAt(a5 + 2) & 255) << 16;
    case 2:
      f7 ^= (e3.charCodeAt(a5 + 1) & 255) << 8;
    case 1:
      f7 ^= e3.charCodeAt(a5) & 255, f7 = (f7 & 65535) * 1540483477 + ((f7 >>> 16) * 59797 << 16);
  }
  return f7 ^= f7 >>> 13, f7 = (f7 & 65535) * 1540483477 + ((f7 >>> 16) * 59797 << 16), ((f7 ^ f7 >>> 15) >>> 0).toString(36);
}

// https://esm.sh/v135/@emotion/unitless@0.8.1/denonext/unitless.mjs
var o4 = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, boxFlex: 1, boxFlexGroup: 1, boxOrdinalGroup: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexPositive: 1, flexShrink: 1, flexNegative: 1, flexOrder: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, msGridRow: 1, msGridRowSpan: 1, msGridColumn: 1, msGridColumnSpan: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };

// https://esm.sh/v135/@emotion/serialize@1.1.2/denonext/serialize.mjs
var g6 = /[A-Z]|^ms/g;
var N5 = function(n3) {
  return n3.charCodeAt(1) === 45;
};
var d4 = u10(function(o5) {
  return N5(o5) ? o5 : o5.replace(g6, "-$&").toLowerCase();
});

// https://esm.sh/v135/@emotion/utils@1.2.1/denonext/utils.mjs
function v6(r, e3, n3) {
  var f7 = "";
  return n3.split(" ").forEach(function(t) {
    r[t] !== void 0 ? e3.push(r[t] + ";") : f7 += t + " ";
  }), f7;
}
var u11 = function(e3, n3, f7) {
  var t = e3.key + "-" + n3.name;
  (f7 === false || e3.compat !== void 0) && e3.registered[t] === void 0 && (e3.registered[t] = n3.styles);
};
var g7 = function(e3, n3, f7) {
  u11(e3, n3, f7);
  var t = e3.key + "-" + n3.name;
  if (e3.inserted[n3.name] === void 0) {
    var s = "", i5 = n3;
    do {
      var d7 = e3.insert(n3 === i5 ? "." + t : "", i5, e3.sheet, true);
      d7 !== void 0 && (s += d7), i5 = i5.next;
    } while (i5 !== void 0);
    if (s.length !== 0)
      return s;
  }
};

// https://esm.sh/v135/@emotion/serialize@1.1.3/denonext/serialize.mjs
var g8 = /[A-Z]|^ms/g;
var b3 = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var N6 = function(n3) {
  return n3.charCodeAt(1) === 45;
};
var y5 = function(n3) {
  return n3 != null && typeof n3 != "boolean";
};
var d5 = u10(function(o5) {
  return N6(o5) ? o5 : o5.replace(g8, "-$&").toLowerCase();
});
var E4 = function(n3, e3) {
  switch (n3) {
    case "animation":
    case "animationName":
      if (typeof e3 == "string")
        return e3.replace(b3, function(a5, s, t) {
          return i3 = { name: s, styles: t, next: i3 }, s;
        });
  }
  return o4[n3] !== 1 && !N6(n3) && typeof e3 == "number" && e3 !== 0 ? e3 + "px" : e3;
};
function u12(o5, n3, e3) {
  if (e3 == null)
    return "";
  if (e3.__emotion_styles !== void 0)
    return e3;
  switch (typeof e3) {
    case "boolean":
      return "";
    case "object": {
      if (e3.anim === 1)
        return i3 = { name: e3.name, styles: e3.styles, next: i3 }, e3.name;
      if (e3.styles !== void 0) {
        var a5 = e3.next;
        if (a5 !== void 0)
          for (; a5 !== void 0; )
            i3 = { name: a5.name, styles: a5.styles, next: i3 }, a5 = a5.next;
        var s = e3.styles + ";";
        return s;
      }
      return w3(o5, n3, e3);
    }
    case "function": {
      if (o5 !== void 0) {
        var t = i3, r = e3(o5);
        return i3 = t, u12(o5, n3, r);
      }
      break;
    }
    case "string":
      if (0)
        var c5, p5;
      break;
  }
  if (n3 == null)
    return e3;
  var l7 = n3[e3];
  return l7 !== void 0 ? l7 : e3;
}
function w3(o5, n3, e3) {
  var a5 = "";
  if (Array.isArray(e3))
    for (var s = 0; s < e3.length; s++)
      a5 += u12(o5, n3, e3[s]) + ";";
  else
    for (var t in e3) {
      var r = e3[t];
      if (typeof r != "object")
        n3 != null && n3[r] !== void 0 ? a5 += t + "{" + n3[r] + "}" : y5(r) && (a5 += d5(t) + ":" + E4(t, r) + ";");
      else if (Array.isArray(r) && typeof r[0] == "string" && (n3 == null || n3[r[0]] === void 0))
        for (var c5 = 0; c5 < r.length; c5++)
          y5(r[c5]) && (a5 += d5(t) + ":" + E4(t, r[c5]) + ";");
      else {
        var p5 = u12(o5, n3, r);
        switch (t) {
          case "animation":
          case "animationName": {
            a5 += d5(t) + ":" + p5 + ";";
            break;
          }
          default:
            a5 += t + "{" + p5 + "}";
        }
      }
    }
  return a5;
}
var v7 = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var i3;
var D2 = function(n3, e3, a5) {
  if (n3.length === 1 && typeof n3[0] == "object" && n3[0] !== null && n3[0].styles !== void 0)
    return n3[0];
  var s = true, t = "";
  i3 = void 0;
  var r = n3[0];
  r == null || r.raw === void 0 ? (s = false, t += u12(a5, e3, r)) : t += r[0];
  for (var c5 = 1; c5 < n3.length; c5++)
    t += u12(a5, e3, n3[c5]), s && (t += r[c5]);
  var p5;
  v7.lastIndex = 0;
  for (var l7 = "", f7; (f7 = v7.exec(t)) !== null; )
    l7 += "-" + f7[1];
  var m3 = c4(t) + l7;
  return { name: m3, styles: t, next: i3 };
};

// https://esm.sh/v135/@emotion/css@11.10.5/denonext/create-instance.js
function v8(f7, u13) {
  if (f7.inserted[u13.name] === void 0)
    return f7.insert("", u13, f7.sheet, true);
}
function g9(f7, u13, e3) {
  var s = [], a5 = v6(f7, s, e3);
  return s.length < 2 ? e3 : a5 + u13(s);
}
var b4 = function(u13) {
  var e3 = hr2(u13);
  e3.sheet.speedy = function(c5) {
    this.isSpeedy = c5;
  }, e3.compat = true;
  var s = function() {
    for (var t = arguments.length, n3 = new Array(t), r = 0; r < t; r++)
      n3[r] = arguments[r];
    var o5 = D2(n3, e3.registered, void 0);
    return g7(e3, o5, false), e3.key + "-" + o5.name;
  }, a5 = function() {
    for (var t = arguments.length, n3 = new Array(t), r = 0; r < t; r++)
      n3[r] = arguments[r];
    var o5 = D2(n3, e3.registered), h5 = "animation-" + o5.name;
    return v8(e3, { name: o5.name, styles: "@keyframes " + h5 + "{" + o5.styles + "}" }), h5;
  }, i5 = function() {
    for (var t = arguments.length, n3 = new Array(t), r = 0; r < t; r++)
      n3[r] = arguments[r];
    var o5 = D2(n3, e3.registered);
    v8(e3, o5);
  }, l7 = function() {
    for (var t = arguments.length, n3 = new Array(t), r = 0; r < t; r++)
      n3[r] = arguments[r];
    return g9(e3.registered, s, w4(n3));
  };
  return { css: s, cx: l7, injectGlobal: i5, keyframes: a5, hydrate: function(t) {
    t.forEach(function(n3) {
      e3.inserted[n3] = true;
    });
  }, flush: function() {
    e3.registered = {}, e3.inserted = {}, e3.sheet.flush();
  }, sheet: e3.sheet, cache: e3, getRegisteredStyles: v6.bind(null, e3.registered), merge: g9.bind(null, e3.registered, s) };
};
var w4 = function f5(u13) {
  for (var e3 = "", s = 0; s < u13.length; s++) {
    var a5 = u13[s];
    if (a5 != null) {
      var i5 = void 0;
      switch (typeof a5) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(a5))
            i5 = f5(a5);
          else {
            i5 = "";
            for (var l7 in a5)
              a5[l7] && l7 && (i5 && (i5 += " "), i5 += l7);
          }
          break;
        }
        default:
          i5 = a5;
      }
      i5 && (e3 && (e3 += " "), e3 += i5);
    }
  }
  return e3;
};
var x2 = b4;

// https://esm.sh/v135/@emotion/css@11.10.5/denonext/css.mjs
var e2 = x2({ key: "css" });
var a4 = e2.flush;
var m2 = e2.hydrate;
var i4 = e2.cx;
var h4 = e2.merge;
var l6 = e2.getRegisteredStyles;
var y6 = e2.injectGlobal;
var g10 = e2.keyframes;
var f6 = e2.css;
var p4 = e2.sheet;
var d6 = e2.cache;

// main/actions/show_toast.js
var toastOn = f6``;
var toastify = f6`
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
var toastClose = f6`
    background: transparent;
    border: 0;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    opacity: 0.4;
    padding: 0 5px;
`;
var toastifyRight = f6`
    right: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyLeft = f6`
    left: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyTop = f6`
    top: 50px;
`;
var toastifyBottom = f6`
    bottom: 50px;
`;
var toastifyRounded = f6`
    border-radius: 25px;
`;
var toastifyAvatar = f6`
    width: 1.5em;
    height: 1.5em;
    margin: -7px 5px;
    border-radius: 2px;
`;
var toastifyCenter = f6`
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
    close: false,
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
  * @param {boolean} [options.close=false] - To show the close icon or not
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
      const x3 = this._getAxisOffsetAValue("x", this.options);
      const y7 = this._getAxisOffsetAValue("y", this.options);
      const xOffset = this.options.position == "left" ? x3 : `-${x3}`;
      const yOffset = this.options.gravity == toastifyTop ? y7 : `-${y7}`;
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
    for (let i5 = 0; i5 < allToasts.length; i5++) {
      if (allToasts[i5].classList.contains(toastifyTop) === true) {
        classUsed = toastifyTop;
        topOrBottom = "top";
      } else {
        classUsed = toastifyBottom;
        topOrBottom = "bottom";
      }
      let height = allToasts[i5].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length - 1);
      let offset = 15;
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width <= 360) {
        allToasts[i5].style[topOrBottom] = `${offsetSize[topOrBottom]}px`;
        offsetSize[topOrBottom] += height + offset;
      } else {
        if (allToasts[i5].classList.contains(toastifyLeft) === true) {
          allToasts[i5].style[topOrBottom] = `${topLeftOffsetSize[topOrBottom]}px`;
          topLeftOffsetSize[topOrBottom] += height + offset;
        } else {
          allToasts[i5].style[topOrBottom] = `${topRightOffsetSize[topOrBottom]}px`;
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
var helperElement = document.createElement("div");
helperElement.setAttribute("note", "STUFF WILL BREAK IF YOU DELETE ME");
helperElement.setAttribute("style", "position: fixed; top: 0; left: 0;");
window.addEventListener("load", () => document.body.prepend(helperElement));
var translateAlignment = (name) => {
  if (name == "top" || name == "left") {
    return "flex-start";
  } else if (name == "bottom" || name == "right") {
    return "flex-end";
  } else {
    return name;
  }
};
var columnClass = create_css_class_default(`column`, [
  `{
                display: flex;
                flex-direction: column;
                transition: all 0.4s ease-in-out 0s;
            }`
]);
function Column({ verticalAlignment, horizontalAlignment, children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(columnClass, arg.class);
  const justify = translateAlignment(verticalAlignment || "top");
  const align = translateAlignment(horizontalAlignment || "left");
  const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment;
  arg = setup_styles_default(arg, `
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `);
  return /* @__PURE__ */ html("div", { ...arg }, children);
}
var rowClass = create_css_class_default(`row`, [
  `{
                display: flex;
                flex-direction: row;
                transition: all 0.4s ease-in-out 0s;
            }`
]);
function Row({ verticalAlignment, horizontalAlignment, children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(rowClass, arg.class);
  const justify = translateAlignment(horizontalAlignment || "left");
  const align = translateAlignment(verticalAlignment || "top");
  const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment;
  arg = setup_styles_default(arg, `
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `);
  return /* @__PURE__ */ html("div", { ...arg }, children);
}
var codeClass = create_css_class_default(`code`, [
  // these mostly exist to create similar behavior across browsers 
  `{
                white-space: pre;
                font-family: monospace, monospace;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
                margin: 0;
                padding: 0;
                border: 0;
            }`
]);
function Code({ children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(codeClass, arg.class);
  return /* @__PURE__ */ html("code", { ...arg }, children);
}
var inputClass = create_css_class_default(`input`, [
  // these merely exist to create similar behavior across browsers 
  `{
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                overflow: visible;
            }`,
  `[type=date]           { -webkit-appearance: listbox; }`,
  `[type=time]           { -webkit-appearance: listbox; }`,
  `[type=datetime-local] { -webkit-appearance: listbox; }`,
  `[type=month]          { -webkit-appearance: listbox; }`
]);
function Input(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(inputClass, arg.class);
  return /* @__PURE__ */ html("input", { ...arg });
}
var buttonClass = create_css_class_default(`button`, [
  // these merely exist to create similar behavior across browsers 
  `{
                border-radius: 0;
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                -webkit-appearance: button;
                overflow: visible;
                text-transform: none;
            }`,
  `::-moz-focus-inner   { border-style: none; padding: 0;}`
]);
function Button(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(buttonClass, arg.class);
  return /* @__PURE__ */ html("button", { ...arg }, arg.children);
}
var checkboxClass = create_css_class_default(`checkbox`, [
  // these merely exist to create similar behavior across browsers 
  `{
                box-sizing: border-box;
                padding: 0;
            }`
]);
function Checkbox(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(inputClass, checkboxClass, arg.class);
  const element2 = /* @__PURE__ */ html("input", { type: "checkbox", ...arg });
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
var dropdownPlaceholder = create_css_class_default(`dropdownPlaceholder`, [
  // these merely exist to create similar behavior across browsers 
  `{
                overflow: visible;
            }`
]);
var dropdownList = create_css_class_default(`dropdownList`, [
  // these merely exist to create similar behavior across browsers 
  `{
                overflow: auto;
                height: fit-content;
                max-height: 50vh;
            }`
]);
function Dropdown({ children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(dropdownList, arg.class);
  const placeholder = /* @__PURE__ */ html(Column, { class: dropdownPlaceholder });
  const listOfOptions = /* @__PURE__ */ html(Column, { class: dropdownList, ...arg }, children);
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
    let filePicker = /* @__PURE__ */ html(
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
  const container = /* @__PURE__ */ html(
    "div",
    {
      class: combine_classes_default(classIds.popUp, otherArgs.class),
      onClick: (event) => {
        if (event.target == container) {
          container.remove();
        }
      }
    },
    /* @__PURE__ */ html(Column, { verticalAlignment: "top", horizontalAlignment: "center", style: "width: fit-content; height: 50vh; overflow-y: auto;" }, children)
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
  f3 as css,
  i2 as cx,
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
