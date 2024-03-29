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
    async transform(p, controller) {
      try {
        const s = await p;
        controller.enqueue(s);
      } catch (e) {
        if (e instanceof AggregateError && e.message == ERROR_WHILE_MAPPING_MESSAGE) {
          controller.error(e);
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
        const p = Promise.resolve().then(() => transformFunction(item, index));
        index++;
        writer.write(p);
        const e = p.then(() => executing.splice(executing.indexOf(e), 1));
        executing.push(e);
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
    (m) => reservedCharMap[m]
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

// https://deno.land/x/elementalist@0.5.35/main/deno.js?code
var FIELD = "\uE000";
var QUOTES = "\uE001";
function htm(statics) {
  let h = this, prev2 = 0, current = [null], field = 0, args2, name, value, quotes = [], quote = 0, last, level = 0, pre = false;
  const evaluate = (str2, parts = [], raw) => {
    let i = 0;
    str2 = !raw && str2 === QUOTES ? quotes[quote++].slice(1, -1) : str2.replace(/\ue001/g, (m) => quotes[quote++]);
    if (!str2)
      return str2;
    str2.replace(/\ue000/g, (match2, idx) => {
      if (idx)
        parts.push(str2.slice(i, idx));
      i = idx + 1;
      return parts.push(arguments[++field]);
    });
    if (i < str2.length)
      parts.push(str2.slice(i));
    return parts.length > 1 ? parts : parts[0];
  };
  const up = () => {
    ;
    [current, last, ...args2] = current;
    current.push(h(last, ...args2));
    if (pre === level--)
      pre = false;
  };
  let str = statics.join(FIELD).replace(/<!--[^]*?-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (match2) => (quotes.push(match2), QUOTES));
  str.replace(/(?:^|>)((?:[^<]|<[^\w\ue000\/?!>])*)(?:$|<)/g, (match2, text, idx, str2) => {
    let tag, close2;
    if (idx) {
      str2.slice(prev2, idx).replace(/(\S)\/$/, "$1 /").split(/\s+/).map((part, i) => {
        if (part[0] === "/") {
          part = part.slice(1);
          if (EMPTY[part])
            return;
          close2 = tag || part || 1;
        } else if (!i) {
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
    prev2 = idx + match2.length;
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
"area base basefont bgsound br col command embed frame hr image img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((v) => htm.empty[v] = true);
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
"pre textarea".split(" ").map((v) => htm.pre[v] = true);
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
    const { middleware: middleware2, errorComponentFactory, defaultPlaceholderFactory } = options || {};
    this.components = components2 || {};
    this.middleware = middleware2 || {};
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
      for (const middleware2 of (this.middleware[_ElementalClass.allTags] || []).concat(this.middleware[args2[0]] || [])) {
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
      let element2;
      if (key2 == "iframe" && properties2.src) {
        const helper = document.createElement("div");
        helper.innerHTML = `<iframe src=${JSON.stringify(properties2.src)}></iframe>`;
        element2 = helper.children[0];
        delete properties2.src;
      } else if (isSvg) {
        element2 = document.createElementNS("http://www.w3.org/2000/svg", key2);
      } else {
        element2 = document.createElement(key2);
      }
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
    const { middleware: middleware2, ...other } = options || {};
    return Elemental(
      { ...this.components, ...additionalComponents },
      {
        middleware: { ...this.middleware, ...middleware2 },
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
  const errorDetails = document.createElement("div");
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
      if (typeof value == "symbol") {
        errorJsonObject[key3] = value.toString();
      } else {
        errorJsonObject[key3] = `${value}`;
      }
    }
  }
  errorDetails.innerHTML = `
        <span>
            tag: ${errorElementPart}
        </span>
        <div>
            properties:
            <code style="max-height: 12rem; overflow: auto;">
                ${JSON.stringify(errorJsonObject, 0, 4)}
            </code>
        </div>
        <span>
            error: ${error.stack.replace(/\n/, "<br>")}
        </span>
    `;
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
  for (var i = 0, j = 0, k = 0; i < index; ++i)
    for (var x = 0, y = substr(value, post + 1, post = abs(j = points[i])), z = value; x < size; ++x)
      if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x])))
        props[k++] = z;
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
  var output2 = "";
  var length2 = sizeof(children);
  for (var i = 0; i < length2; i++)
    output2 += callback(children[i], i, children, callback) || "";
  return output2;
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
    var output2 = "";
    for (var i = 0; i < length2; i++)
      output2 += collection[i](element2, index, children, callback) || "";
    return output2;
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
    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element2.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
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
    var k, i = 0, len = str.length;
    for (; len >= 4; ++i, len -= 4) {
      k = str.charCodeAt(i) & 255 | (str.charCodeAt(++i) & 255) << 8 | (str.charCodeAt(++i) & 255) << 16 | (str.charCodeAt(++i) & 255) << 24;
      k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
      k ^= k >>> 24;
      h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
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
  function merge2(registered, css22, className) {
    var registeredStyles = [];
    var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
    if (registeredStyles.length < 2) {
      return className;
    }
    return rawClassName + css22(registeredStyles);
  }
  var createEmotion = function createEmotion2(options) {
    var cache22 = createCache__default["default"](options);
    cache22.sheet.speedy = function(value) {
      this.isSpeedy = value;
    };
    cache22.compat = true;
    var css22 = function css222() {
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
      return merge2(cache22.registered, css22, classnames(args2));
    };
    return {
      css: css22,
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
      merge: merge2.bind(null, cache22.registered, css22)
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
            for (var k in arg) {
              if (arg[k] && k) {
                toAdd && (toAdd += " ");
                toAdd += k;
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
  }), flush2 = _createEmotion.flush, hydrate2 = _createEmotion.hydrate, cx2 = _createEmotion.cx, merge2 = _createEmotion.merge, getRegisteredStyles22 = _createEmotion.getRegisteredStyles, injectGlobal2 = _createEmotion.injectGlobal, keyframes2 = _createEmotion.keyframes, css22 = _createEmotion.css, sheet22 = _createEmotion.sheet, cache3 = _createEmotion.cache;
  exports.cache = cache3;
  exports.css = css22;
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
var css2 = emotionCss_cjs.css;
var cx = emotionCss_cjs.cx;
var flush = emotionCss_cjs.flush;
var getRegisteredStyles2 = emotionCss_cjs.getRegisteredStyles;
var hydrate = emotionCss_cjs.hydrate;
var injectGlobal = emotionCss_cjs.injectGlobal;
var keyframes = emotionCss_cjs.keyframes;
var merge = emotionCss_cjs.merge;
var sheet2 = emotionCss_cjs.sheet;

// main/helpers/setup_styles.js
var setupStyles = (arg, styles) => {
  if (arg.styles) {
    arg.styles = `${styles};${css2(arg.styles)};`;
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
var F = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var ce = Object.getOwnPropertyNames;
var se = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var te = (b, k) => () => (k || b((k = { exports: {} }).exports, k), k.exports);
var fe = (b, k) => {
  for (var r in k)
    F(b, r, { get: k[r], enumerable: true });
};
var U = (b, k, r, L) => {
  if (k && typeof k == "object" || typeof k == "function")
    for (let z of ce(k))
      !ie.call(b, z) && z !== r && F(b, z, { get: () => k[z], enumerable: !(L = ne(k, z)) || L.enumerable });
  return b;
};
var B = (b, k, r) => (U(b, k, "default"), r && U(r, k, "default"));
var Q = (b, k, r) => (r = b != null ? ae(se(b)) : {}, U(k || !b || !b.__esModule ? F(r, "default", { value: b, enumerable: true }) : r, b));
var q = te((X, $) => {
  (function() {
    function b(e) {
      "use strict";
      var u = { omitExtraWLInCodeBlocks: { defaultValue: false, describe: "Omit the default extra whiteline added to code blocks", type: "boolean" }, noHeaderId: { defaultValue: false, describe: "Turn on/off generated header id", type: "boolean" }, prefixHeaderId: { defaultValue: false, describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix", type: "string" }, rawPrefixHeaderId: { defaultValue: false, describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)', type: "boolean" }, ghCompatibleHeaderId: { defaultValue: false, describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)", type: "boolean" }, rawHeaderId: { defaultValue: false, describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`, type: "boolean" }, headerLevelStart: { defaultValue: false, describe: "The header blocks level start", type: "integer" }, parseImgDimensions: { defaultValue: false, describe: "Turn on/off image dimension parsing", type: "boolean" }, simplifiedAutoLink: { defaultValue: false, describe: "Turn on/off GFM autolink style", type: "boolean" }, excludeTrailingPunctuationFromURLs: { defaultValue: false, describe: "Excludes trailing punctuation from links generated with autoLinking", type: "boolean" }, literalMidWordUnderscores: { defaultValue: false, describe: "Parse midword underscores as literal underscores", type: "boolean" }, literalMidWordAsterisks: { defaultValue: false, describe: "Parse midword asterisks as literal asterisks", type: "boolean" }, strikethrough: { defaultValue: false, describe: "Turn on/off strikethrough support", type: "boolean" }, tables: { defaultValue: false, describe: "Turn on/off tables support", type: "boolean" }, tablesHeaderId: { defaultValue: false, describe: "Add an id to table headers", type: "boolean" }, ghCodeBlocks: { defaultValue: true, describe: "Turn on/off GFM fenced code blocks support", type: "boolean" }, tasklists: { defaultValue: false, describe: "Turn on/off GFM tasklist support", type: "boolean" }, smoothLivePreview: { defaultValue: false, describe: "Prevents weird effects in live previews due to incomplete input", type: "boolean" }, smartIndentationFix: { defaultValue: false, describe: "Tries to smartly fix indentation in es6 strings", type: "boolean" }, disableForced4SpacesIndentedSublists: { defaultValue: false, describe: "Disables the requirement of indenting nested sublists by 4 spaces", type: "boolean" }, simpleLineBreaks: { defaultValue: false, describe: "Parses simple line breaks as <br> (GFM Style)", type: "boolean" }, requireSpaceBeforeHeadingText: { defaultValue: false, describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)", type: "boolean" }, ghMentions: { defaultValue: false, describe: "Enables github @mentions", type: "boolean" }, ghMentionsLink: { defaultValue: "https://github.com/{u}", describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.", type: "string" }, encodeEmails: { defaultValue: true, describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities", type: "boolean" }, openLinksInNewWindow: { defaultValue: false, describe: "Open all links in new windows", type: "boolean" }, backslashEscapesHTMLTags: { defaultValue: false, describe: "Support for HTML Tag escaping. ex: <div>foo</div>", type: "boolean" }, emoji: { defaultValue: false, describe: "Enable emoji support. Ex: `this is a :smile: emoji`", type: "boolean" }, underline: { defaultValue: false, describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`", type: "boolean" }, ellipsis: { defaultValue: true, describe: "Replaces three dots with the ellipsis unicode character", type: "boolean" }, completeHTMLDocument: { defaultValue: false, describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags", type: "boolean" }, metadata: { defaultValue: false, describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).", type: "boolean" }, splitAdjacentBlockquotes: { defaultValue: false, describe: "Split adjacent blockquote blocks", type: "boolean" } };
      if (e === false)
        return JSON.parse(JSON.stringify(u));
      var d = {};
      for (var a in u)
        u.hasOwnProperty(a) && (d[a] = u[a].defaultValue);
      return d;
    }
    function k() {
      "use strict";
      var e = b(true), u = {};
      for (var d in e)
        e.hasOwnProperty(d) && (u[d] = true);
      return u;
    }
    var r = {}, L = {}, z = {}, E = b(true), R = "vanilla", H = { github: { omitExtraWLInCodeBlocks: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, disableForced4SpacesIndentedSublists: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghCompatibleHeaderId: true, ghMentions: true, backslashEscapesHTMLTags: true, emoji: true, splitAdjacentBlockquotes: true }, original: { noHeaderId: true, ghCodeBlocks: false }, ghost: { omitExtraWLInCodeBlocks: true, parseImgDimensions: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, smoothLivePreview: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghMentions: false, encodeEmails: true }, vanilla: b(true), allOn: k() };
    r.helper = {}, r.extensions = {}, r.setOption = function(e, u) {
      "use strict";
      return E[e] = u, this;
    }, r.getOption = function(e) {
      "use strict";
      return E[e];
    }, r.getOptions = function() {
      "use strict";
      return E;
    }, r.resetOptions = function() {
      "use strict";
      E = b(true);
    }, r.setFlavor = function(e) {
      "use strict";
      if (!H.hasOwnProperty(e))
        throw Error(e + " flavor was not found");
      r.resetOptions();
      var u = H[e];
      R = e;
      for (var d in u)
        u.hasOwnProperty(d) && (E[d] = u[d]);
    }, r.getFlavor = function() {
      "use strict";
      return R;
    }, r.getFlavorOptions = function(e) {
      "use strict";
      if (H.hasOwnProperty(e))
        return H[e];
    }, r.getDefaultOptions = function(e) {
      "use strict";
      return b(e);
    }, r.subParser = function(e, u) {
      "use strict";
      if (r.helper.isString(e))
        if (typeof u < "u")
          L[e] = u;
        else {
          if (L.hasOwnProperty(e))
            return L[e];
          throw Error("SubParser named " + e + " not registered!");
        }
    }, r.extension = function(e, u) {
      "use strict";
      if (!r.helper.isString(e))
        throw Error("Extension 'name' must be a string");
      if (e = r.helper.stdExtName(e), r.helper.isUndefined(u)) {
        if (!z.hasOwnProperty(e))
          throw Error("Extension named " + e + " is not registered!");
        return z[e];
      } else {
        typeof u == "function" && (u = u()), r.helper.isArray(u) || (u = [u]);
        var d = T(u, e);
        if (d.valid)
          z[e] = u;
        else
          throw Error(d.error);
      }
    }, r.getAllExtensions = function() {
      "use strict";
      return z;
    }, r.removeExtension = function(e) {
      "use strict";
      delete z[e];
    }, r.resetExtensions = function() {
      "use strict";
      z = {};
    };
    function T(e, u) {
      "use strict";
      var d = u ? "Error in " + u + " extension->" : "Error in unnamed extension", a = { valid: true, error: "" };
      r.helper.isArray(e) || (e = [e]);
      for (var s = 0; s < e.length; ++s) {
        var i = d + " sub-extension " + s + ": ", c = e[s];
        if (typeof c != "object")
          return a.valid = false, a.error = i + "must be an object, but " + typeof c + " given", a;
        if (!r.helper.isString(c.type))
          return a.valid = false, a.error = i + 'property "type" must be a string, but ' + typeof c.type + " given", a;
        var t = c.type = c.type.toLowerCase();
        if (t === "language" && (t = c.type = "lang"), t === "html" && (t = c.type = "output"), t !== "lang" && t !== "output" && t !== "listener")
          return a.valid = false, a.error = i + "type " + t + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', a;
        if (t === "listener") {
          if (r.helper.isUndefined(c.listeners))
            return a.valid = false, a.error = i + '. Extensions of type "listener" must have a property called "listeners"', a;
        } else if (r.helper.isUndefined(c.filter) && r.helper.isUndefined(c.regex))
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
          if (r.helper.isString(c.regex) && (c.regex = new RegExp(c.regex, "g")), !(c.regex instanceof RegExp))
            return a.valid = false, a.error = i + '"regex" property must either be a string or a RegExp object, but ' + typeof c.regex + " given", a;
          if (r.helper.isUndefined(c.replace))
            return a.valid = false, a.error = i + '"regex" extensions must implement a replace string or function', a;
        }
      }
      return a;
    }
    r.validateExtension = function(e) {
      "use strict";
      var u = T(e, null);
      return u.valid ? true : (console.warn(u.error), false);
    }, r.hasOwnProperty("helper") || (r.helper = {}), r.helper.isString = function(e) {
      "use strict";
      return typeof e == "string" || e instanceof String;
    }, r.helper.isFunction = function(e) {
      "use strict";
      var u = {};
      return e && u.toString.call(e) === "[object Function]";
    }, r.helper.isArray = function(e) {
      "use strict";
      return Array.isArray(e);
    }, r.helper.isUndefined = function(e) {
      "use strict";
      return typeof e > "u";
    }, r.helper.forEach = function(e, u) {
      "use strict";
      if (r.helper.isUndefined(e))
        throw new Error("obj param is required");
      if (r.helper.isUndefined(u))
        throw new Error("callback param is required");
      if (!r.helper.isFunction(u))
        throw new Error("callback param must be a function/closure");
      if (typeof e.forEach == "function")
        e.forEach(u);
      else if (r.helper.isArray(e))
        for (var d = 0; d < e.length; d++)
          u(e[d], d, e);
      else if (typeof e == "object")
        for (var a in e)
          e.hasOwnProperty(a) && u(e[a], a, e);
      else
        throw new Error("obj does not seem to be an array or an iterable object");
    }, r.helper.stdExtName = function(e) {
      "use strict";
      return e.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function G(e, u) {
      "use strict";
      var d = u.charCodeAt(0);
      return "\xA8E" + d + "E";
    }
    r.helper.escapeCharactersCallback = G, r.helper.escapeCharacters = function(e, u, d) {
      "use strict";
      var a = "([" + u.replace(/([\[\]\\])/g, "\\$1") + "])";
      d && (a = "\\\\" + a);
      var s = new RegExp(a, "g");
      return e = e.replace(s, G), e;
    }, r.helper.unescapeHTMLEntities = function(e) {
      "use strict";
      return e.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var O = function(e, u, d, a) {
      "use strict";
      var s = a || "", i = s.indexOf("g") > -1, c = new RegExp(u + "|" + d, "g" + s.replace(/g/g, "")), t = new RegExp(u, s.replace(/g/g, "")), p = [], l, o, h, n, f;
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
    r.helper.matchRecursiveRegExp = function(e, u, d, a) {
      "use strict";
      for (var s = O(e, u, d, a), i = [], c = 0; c < s.length; ++c)
        i.push([e.slice(s[c].wholeMatch.start, s[c].wholeMatch.end), e.slice(s[c].match.start, s[c].match.end), e.slice(s[c].left.start, s[c].left.end), e.slice(s[c].right.start, s[c].right.end)]);
      return i;
    }, r.helper.replaceRecursiveRegExp = function(e, u, d, a, s) {
      "use strict";
      if (!r.helper.isFunction(u)) {
        var i = u;
        u = function() {
          return i;
        };
      }
      var c = O(e, d, a, s), t = e, p = c.length;
      if (p > 0) {
        var l = [];
        c[0].wholeMatch.start !== 0 && l.push(e.slice(0, c[0].wholeMatch.start));
        for (var o = 0; o < p; ++o)
          l.push(u(e.slice(c[o].wholeMatch.start, c[o].wholeMatch.end), e.slice(c[o].match.start, c[o].match.end), e.slice(c[o].left.start, c[o].left.end), e.slice(c[o].right.start, c[o].right.end))), o < p - 1 && l.push(e.slice(c[o].wholeMatch.end, c[o + 1].wholeMatch.start));
        c[p - 1].wholeMatch.end < e.length && l.push(e.slice(c[p - 1].wholeMatch.end)), t = l.join("");
      }
      return t;
    }, r.helper.regexIndexOf = function(e, u, d) {
      "use strict";
      if (!r.helper.isString(e))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      if (!(u instanceof RegExp))
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      var a = e.substring(d || 0).search(u);
      return a >= 0 ? a + (d || 0) : a;
    }, r.helper.splitAtIndex = function(e, u) {
      "use strict";
      if (!r.helper.isString(e))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      return [e.substring(0, u), e.substring(u)];
    }, r.helper.encodeEmailAddress = function(e) {
      "use strict";
      var u = [function(d) {
        return "&#" + d.charCodeAt(0) + ";";
      }, function(d) {
        return "&#x" + d.charCodeAt(0).toString(16) + ";";
      }, function(d) {
        return d;
      }];
      return e = e.replace(/./g, function(d) {
        if (d === "@")
          d = u[Math.floor(Math.random() * 2)](d);
        else {
          var a = Math.random();
          d = a > 0.9 ? u[2](d) : a > 0.45 ? u[1](d) : u[0](d);
        }
        return d;
      }), e;
    }, r.helper.padEnd = function(u, d, a) {
      "use strict";
      return d = d >> 0, a = String(a || " "), u.length > d ? String(u) : (d = d - u.length, d > a.length && (a += a.repeat(d / a.length)), String(u) + a.slice(0, d));
    }, typeof console > "u" && (console = { warn: function(e) {
      "use strict";
      alert(e);
    }, log: function(e) {
      "use strict";
      alert(e);
    }, error: function(e) {
      "use strict";
      throw e;
    } }), r.helper.regexes = { asteriskDashAndColon: /([*_:~])/g }, r.helper.emojis = { "+1": "\u{1F44D}", "-1": "\u{1F44E}", 100: "\u{1F4AF}", 1234: "\u{1F522}", "1st_place_medal": "\u{1F947}", "2nd_place_medal": "\u{1F948}", "3rd_place_medal": "\u{1F949}", "8ball": "\u{1F3B1}", a: "\u{1F170}\uFE0F", ab: "\u{1F18E}", abc: "\u{1F524}", abcd: "\u{1F521}", accept: "\u{1F251}", aerial_tramway: "\u{1F6A1}", airplane: "\u2708\uFE0F", alarm_clock: "\u23F0", alembic: "\u2697\uFE0F", alien: "\u{1F47D}", ambulance: "\u{1F691}", amphora: "\u{1F3FA}", anchor: "\u2693\uFE0F", angel: "\u{1F47C}", anger: "\u{1F4A2}", angry: "\u{1F620}", anguished: "\u{1F627}", ant: "\u{1F41C}", apple: "\u{1F34E}", aquarius: "\u2652\uFE0F", aries: "\u2648\uFE0F", arrow_backward: "\u25C0\uFE0F", arrow_double_down: "\u23EC", arrow_double_up: "\u23EB", arrow_down: "\u2B07\uFE0F", arrow_down_small: "\u{1F53D}", arrow_forward: "\u25B6\uFE0F", arrow_heading_down: "\u2935\uFE0F", arrow_heading_up: "\u2934\uFE0F", arrow_left: "\u2B05\uFE0F", arrow_lower_left: "\u2199\uFE0F", arrow_lower_right: "\u2198\uFE0F", arrow_right: "\u27A1\uFE0F", arrow_right_hook: "\u21AA\uFE0F", arrow_up: "\u2B06\uFE0F", arrow_up_down: "\u2195\uFE0F", arrow_up_small: "\u{1F53C}", arrow_upper_left: "\u2196\uFE0F", arrow_upper_right: "\u2197\uFE0F", arrows_clockwise: "\u{1F503}", arrows_counterclockwise: "\u{1F504}", art: "\u{1F3A8}", articulated_lorry: "\u{1F69B}", artificial_satellite: "\u{1F6F0}", astonished: "\u{1F632}", athletic_shoe: "\u{1F45F}", atm: "\u{1F3E7}", atom_symbol: "\u269B\uFE0F", avocado: "\u{1F951}", b: "\u{1F171}\uFE0F", baby: "\u{1F476}", baby_bottle: "\u{1F37C}", baby_chick: "\u{1F424}", baby_symbol: "\u{1F6BC}", back: "\u{1F519}", bacon: "\u{1F953}", badminton: "\u{1F3F8}", baggage_claim: "\u{1F6C4}", baguette_bread: "\u{1F956}", balance_scale: "\u2696\uFE0F", balloon: "\u{1F388}", ballot_box: "\u{1F5F3}", ballot_box_with_check: "\u2611\uFE0F", bamboo: "\u{1F38D}", banana: "\u{1F34C}", bangbang: "\u203C\uFE0F", bank: "\u{1F3E6}", bar_chart: "\u{1F4CA}", barber: "\u{1F488}", baseball: "\u26BE\uFE0F", basketball: "\u{1F3C0}", basketball_man: "\u26F9\uFE0F", basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F", bat: "\u{1F987}", bath: "\u{1F6C0}", bathtub: "\u{1F6C1}", battery: "\u{1F50B}", beach_umbrella: "\u{1F3D6}", bear: "\u{1F43B}", bed: "\u{1F6CF}", bee: "\u{1F41D}", beer: "\u{1F37A}", beers: "\u{1F37B}", beetle: "\u{1F41E}", beginner: "\u{1F530}", bell: "\u{1F514}", bellhop_bell: "\u{1F6CE}", bento: "\u{1F371}", biking_man: "\u{1F6B4}", bike: "\u{1F6B2}", biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F", bikini: "\u{1F459}", biohazard: "\u2623\uFE0F", bird: "\u{1F426}", birthday: "\u{1F382}", black_circle: "\u26AB\uFE0F", black_flag: "\u{1F3F4}", black_heart: "\u{1F5A4}", black_joker: "\u{1F0CF}", black_large_square: "\u2B1B\uFE0F", black_medium_small_square: "\u25FE\uFE0F", black_medium_square: "\u25FC\uFE0F", black_nib: "\u2712\uFE0F", black_small_square: "\u25AA\uFE0F", black_square_button: "\u{1F532}", blonde_man: "\u{1F471}", blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F", blossom: "\u{1F33C}", blowfish: "\u{1F421}", blue_book: "\u{1F4D8}", blue_car: "\u{1F699}", blue_heart: "\u{1F499}", blush: "\u{1F60A}", boar: "\u{1F417}", boat: "\u26F5\uFE0F", bomb: "\u{1F4A3}", book: "\u{1F4D6}", bookmark: "\u{1F516}", bookmark_tabs: "\u{1F4D1}", books: "\u{1F4DA}", boom: "\u{1F4A5}", boot: "\u{1F462}", bouquet: "\u{1F490}", bowing_man: "\u{1F647}", bow_and_arrow: "\u{1F3F9}", bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F", bowling: "\u{1F3B3}", boxing_glove: "\u{1F94A}", boy: "\u{1F466}", bread: "\u{1F35E}", bride_with_veil: "\u{1F470}", bridge_at_night: "\u{1F309}", briefcase: "\u{1F4BC}", broken_heart: "\u{1F494}", bug: "\u{1F41B}", building_construction: "\u{1F3D7}", bulb: "\u{1F4A1}", bullettrain_front: "\u{1F685}", bullettrain_side: "\u{1F684}", burrito: "\u{1F32F}", bus: "\u{1F68C}", business_suit_levitating: "\u{1F574}", busstop: "\u{1F68F}", bust_in_silhouette: "\u{1F464}", busts_in_silhouette: "\u{1F465}", butterfly: "\u{1F98B}", cactus: "\u{1F335}", cake: "\u{1F370}", calendar: "\u{1F4C6}", call_me_hand: "\u{1F919}", calling: "\u{1F4F2}", camel: "\u{1F42B}", camera: "\u{1F4F7}", camera_flash: "\u{1F4F8}", camping: "\u{1F3D5}", cancer: "\u264B\uFE0F", candle: "\u{1F56F}", candy: "\u{1F36C}", canoe: "\u{1F6F6}", capital_abcd: "\u{1F520}", capricorn: "\u2651\uFE0F", car: "\u{1F697}", card_file_box: "\u{1F5C3}", card_index: "\u{1F4C7}", card_index_dividers: "\u{1F5C2}", carousel_horse: "\u{1F3A0}", carrot: "\u{1F955}", cat: "\u{1F431}", cat2: "\u{1F408}", cd: "\u{1F4BF}", chains: "\u26D3", champagne: "\u{1F37E}", chart: "\u{1F4B9}", chart_with_downwards_trend: "\u{1F4C9}", chart_with_upwards_trend: "\u{1F4C8}", checkered_flag: "\u{1F3C1}", cheese: "\u{1F9C0}", cherries: "\u{1F352}", cherry_blossom: "\u{1F338}", chestnut: "\u{1F330}", chicken: "\u{1F414}", children_crossing: "\u{1F6B8}", chipmunk: "\u{1F43F}", chocolate_bar: "\u{1F36B}", christmas_tree: "\u{1F384}", church: "\u26EA\uFE0F", cinema: "\u{1F3A6}", circus_tent: "\u{1F3AA}", city_sunrise: "\u{1F307}", city_sunset: "\u{1F306}", cityscape: "\u{1F3D9}", cl: "\u{1F191}", clamp: "\u{1F5DC}", clap: "\u{1F44F}", clapper: "\u{1F3AC}", classical_building: "\u{1F3DB}", clinking_glasses: "\u{1F942}", clipboard: "\u{1F4CB}", clock1: "\u{1F550}", clock10: "\u{1F559}", clock1030: "\u{1F565}", clock11: "\u{1F55A}", clock1130: "\u{1F566}", clock12: "\u{1F55B}", clock1230: "\u{1F567}", clock130: "\u{1F55C}", clock2: "\u{1F551}", clock230: "\u{1F55D}", clock3: "\u{1F552}", clock330: "\u{1F55E}", clock4: "\u{1F553}", clock430: "\u{1F55F}", clock5: "\u{1F554}", clock530: "\u{1F560}", clock6: "\u{1F555}", clock630: "\u{1F561}", clock7: "\u{1F556}", clock730: "\u{1F562}", clock8: "\u{1F557}", clock830: "\u{1F563}", clock9: "\u{1F558}", clock930: "\u{1F564}", closed_book: "\u{1F4D5}", closed_lock_with_key: "\u{1F510}", closed_umbrella: "\u{1F302}", cloud: "\u2601\uFE0F", cloud_with_lightning: "\u{1F329}", cloud_with_lightning_and_rain: "\u26C8", cloud_with_rain: "\u{1F327}", cloud_with_snow: "\u{1F328}", clown_face: "\u{1F921}", clubs: "\u2663\uFE0F", cocktail: "\u{1F378}", coffee: "\u2615\uFE0F", coffin: "\u26B0\uFE0F", cold_sweat: "\u{1F630}", comet: "\u2604\uFE0F", computer: "\u{1F4BB}", computer_mouse: "\u{1F5B1}", confetti_ball: "\u{1F38A}", confounded: "\u{1F616}", confused: "\u{1F615}", congratulations: "\u3297\uFE0F", construction: "\u{1F6A7}", construction_worker_man: "\u{1F477}", construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F", control_knobs: "\u{1F39B}", convenience_store: "\u{1F3EA}", cookie: "\u{1F36A}", cool: "\u{1F192}", policeman: "\u{1F46E}", copyright: "\xA9\uFE0F", corn: "\u{1F33D}", couch_and_lamp: "\u{1F6CB}", couple: "\u{1F46B}", couple_with_heart_woman_man: "\u{1F491}", couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}", couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}", couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}", couplekiss_man_woman: "\u{1F48F}", couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}", cow: "\u{1F42E}", cow2: "\u{1F404}", cowboy_hat_face: "\u{1F920}", crab: "\u{1F980}", crayon: "\u{1F58D}", credit_card: "\u{1F4B3}", crescent_moon: "\u{1F319}", cricket: "\u{1F3CF}", crocodile: "\u{1F40A}", croissant: "\u{1F950}", crossed_fingers: "\u{1F91E}", crossed_flags: "\u{1F38C}", crossed_swords: "\u2694\uFE0F", crown: "\u{1F451}", cry: "\u{1F622}", crying_cat_face: "\u{1F63F}", crystal_ball: "\u{1F52E}", cucumber: "\u{1F952}", cupid: "\u{1F498}", curly_loop: "\u27B0", currency_exchange: "\u{1F4B1}", curry: "\u{1F35B}", custard: "\u{1F36E}", customs: "\u{1F6C3}", cyclone: "\u{1F300}", dagger: "\u{1F5E1}", dancer: "\u{1F483}", dancing_women: "\u{1F46F}", dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F", dango: "\u{1F361}", dark_sunglasses: "\u{1F576}", dart: "\u{1F3AF}", dash: "\u{1F4A8}", date: "\u{1F4C5}", deciduous_tree: "\u{1F333}", deer: "\u{1F98C}", department_store: "\u{1F3EC}", derelict_house: "\u{1F3DA}", desert: "\u{1F3DC}", desert_island: "\u{1F3DD}", desktop_computer: "\u{1F5A5}", male_detective: "\u{1F575}\uFE0F", diamond_shape_with_a_dot_inside: "\u{1F4A0}", diamonds: "\u2666\uFE0F", disappointed: "\u{1F61E}", disappointed_relieved: "\u{1F625}", dizzy: "\u{1F4AB}", dizzy_face: "\u{1F635}", do_not_litter: "\u{1F6AF}", dog: "\u{1F436}", dog2: "\u{1F415}", dollar: "\u{1F4B5}", dolls: "\u{1F38E}", dolphin: "\u{1F42C}", door: "\u{1F6AA}", doughnut: "\u{1F369}", dove: "\u{1F54A}", dragon: "\u{1F409}", dragon_face: "\u{1F432}", dress: "\u{1F457}", dromedary_camel: "\u{1F42A}", drooling_face: "\u{1F924}", droplet: "\u{1F4A7}", drum: "\u{1F941}", duck: "\u{1F986}", dvd: "\u{1F4C0}", "e-mail": "\u{1F4E7}", eagle: "\u{1F985}", ear: "\u{1F442}", ear_of_rice: "\u{1F33E}", earth_africa: "\u{1F30D}", earth_americas: "\u{1F30E}", earth_asia: "\u{1F30F}", egg: "\u{1F95A}", eggplant: "\u{1F346}", eight_pointed_black_star: "\u2734\uFE0F", eight_spoked_asterisk: "\u2733\uFE0F", electric_plug: "\u{1F50C}", elephant: "\u{1F418}", email: "\u2709\uFE0F", end: "\u{1F51A}", envelope_with_arrow: "\u{1F4E9}", euro: "\u{1F4B6}", european_castle: "\u{1F3F0}", european_post_office: "\u{1F3E4}", evergreen_tree: "\u{1F332}", exclamation: "\u2757\uFE0F", expressionless: "\u{1F611}", eye: "\u{1F441}", eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}", eyeglasses: "\u{1F453}", eyes: "\u{1F440}", face_with_head_bandage: "\u{1F915}", face_with_thermometer: "\u{1F912}", fist_oncoming: "\u{1F44A}", factory: "\u{1F3ED}", fallen_leaf: "\u{1F342}", family_man_woman_boy: "\u{1F46A}", family_man_boy: "\u{1F468}&zwj;\u{1F466}", family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_girl: "\u{1F468}&zwj;\u{1F467}", family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}", family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}", family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}", family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_boy: "\u{1F469}&zwj;\u{1F466}", family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_girl: "\u{1F469}&zwj;\u{1F467}", family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}", family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}", family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", fast_forward: "\u23E9", fax: "\u{1F4E0}", fearful: "\u{1F628}", feet: "\u{1F43E}", female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F", ferris_wheel: "\u{1F3A1}", ferry: "\u26F4", field_hockey: "\u{1F3D1}", file_cabinet: "\u{1F5C4}", file_folder: "\u{1F4C1}", film_projector: "\u{1F4FD}", film_strip: "\u{1F39E}", fire: "\u{1F525}", fire_engine: "\u{1F692}", fireworks: "\u{1F386}", first_quarter_moon: "\u{1F313}", first_quarter_moon_with_face: "\u{1F31B}", fish: "\u{1F41F}", fish_cake: "\u{1F365}", fishing_pole_and_fish: "\u{1F3A3}", fist_raised: "\u270A", fist_left: "\u{1F91B}", fist_right: "\u{1F91C}", flags: "\u{1F38F}", flashlight: "\u{1F526}", fleur_de_lis: "\u269C\uFE0F", flight_arrival: "\u{1F6EC}", flight_departure: "\u{1F6EB}", floppy_disk: "\u{1F4BE}", flower_playing_cards: "\u{1F3B4}", flushed: "\u{1F633}", fog: "\u{1F32B}", foggy: "\u{1F301}", football: "\u{1F3C8}", footprints: "\u{1F463}", fork_and_knife: "\u{1F374}", fountain: "\u26F2\uFE0F", fountain_pen: "\u{1F58B}", four_leaf_clover: "\u{1F340}", fox_face: "\u{1F98A}", framed_picture: "\u{1F5BC}", free: "\u{1F193}", fried_egg: "\u{1F373}", fried_shrimp: "\u{1F364}", fries: "\u{1F35F}", frog: "\u{1F438}", frowning: "\u{1F626}", frowning_face: "\u2639\uFE0F", frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F", frowning_woman: "\u{1F64D}", middle_finger: "\u{1F595}", fuelpump: "\u26FD\uFE0F", full_moon: "\u{1F315}", full_moon_with_face: "\u{1F31D}", funeral_urn: "\u26B1\uFE0F", game_die: "\u{1F3B2}", gear: "\u2699\uFE0F", gem: "\u{1F48E}", gemini: "\u264A\uFE0F", ghost: "\u{1F47B}", gift: "\u{1F381}", gift_heart: "\u{1F49D}", girl: "\u{1F467}", globe_with_meridians: "\u{1F310}", goal_net: "\u{1F945}", goat: "\u{1F410}", golf: "\u26F3\uFE0F", golfing_man: "\u{1F3CC}\uFE0F", golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F", gorilla: "\u{1F98D}", grapes: "\u{1F347}", green_apple: "\u{1F34F}", green_book: "\u{1F4D7}", green_heart: "\u{1F49A}", green_salad: "\u{1F957}", grey_exclamation: "\u2755", grey_question: "\u2754", grimacing: "\u{1F62C}", grin: "\u{1F601}", grinning: "\u{1F600}", guardsman: "\u{1F482}", guardswoman: "\u{1F482}&zwj;\u2640\uFE0F", guitar: "\u{1F3B8}", gun: "\u{1F52B}", haircut_woman: "\u{1F487}", haircut_man: "\u{1F487}&zwj;\u2642\uFE0F", hamburger: "\u{1F354}", hammer: "\u{1F528}", hammer_and_pick: "\u2692", hammer_and_wrench: "\u{1F6E0}", hamster: "\u{1F439}", hand: "\u270B", handbag: "\u{1F45C}", handshake: "\u{1F91D}", hankey: "\u{1F4A9}", hatched_chick: "\u{1F425}", hatching_chick: "\u{1F423}", headphones: "\u{1F3A7}", hear_no_evil: "\u{1F649}", heart: "\u2764\uFE0F", heart_decoration: "\u{1F49F}", heart_eyes: "\u{1F60D}", heart_eyes_cat: "\u{1F63B}", heartbeat: "\u{1F493}", heartpulse: "\u{1F497}", hearts: "\u2665\uFE0F", heavy_check_mark: "\u2714\uFE0F", heavy_division_sign: "\u2797", heavy_dollar_sign: "\u{1F4B2}", heavy_heart_exclamation: "\u2763\uFE0F", heavy_minus_sign: "\u2796", heavy_multiplication_x: "\u2716\uFE0F", heavy_plus_sign: "\u2795", helicopter: "\u{1F681}", herb: "\u{1F33F}", hibiscus: "\u{1F33A}", high_brightness: "\u{1F506}", high_heel: "\u{1F460}", hocho: "\u{1F52A}", hole: "\u{1F573}", honey_pot: "\u{1F36F}", horse: "\u{1F434}", horse_racing: "\u{1F3C7}", hospital: "\u{1F3E5}", hot_pepper: "\u{1F336}", hotdog: "\u{1F32D}", hotel: "\u{1F3E8}", hotsprings: "\u2668\uFE0F", hourglass: "\u231B\uFE0F", hourglass_flowing_sand: "\u23F3", house: "\u{1F3E0}", house_with_garden: "\u{1F3E1}", houses: "\u{1F3D8}", hugs: "\u{1F917}", hushed: "\u{1F62F}", ice_cream: "\u{1F368}", ice_hockey: "\u{1F3D2}", ice_skate: "\u26F8", icecream: "\u{1F366}", id: "\u{1F194}", ideograph_advantage: "\u{1F250}", imp: "\u{1F47F}", inbox_tray: "\u{1F4E5}", incoming_envelope: "\u{1F4E8}", tipping_hand_woman: "\u{1F481}", information_source: "\u2139\uFE0F", innocent: "\u{1F607}", interrobang: "\u2049\uFE0F", iphone: "\u{1F4F1}", izakaya_lantern: "\u{1F3EE}", jack_o_lantern: "\u{1F383}", japan: "\u{1F5FE}", japanese_castle: "\u{1F3EF}", japanese_goblin: "\u{1F47A}", japanese_ogre: "\u{1F479}", jeans: "\u{1F456}", joy: "\u{1F602}", joy_cat: "\u{1F639}", joystick: "\u{1F579}", kaaba: "\u{1F54B}", key: "\u{1F511}", keyboard: "\u2328\uFE0F", keycap_ten: "\u{1F51F}", kick_scooter: "\u{1F6F4}", kimono: "\u{1F458}", kiss: "\u{1F48B}", kissing: "\u{1F617}", kissing_cat: "\u{1F63D}", kissing_closed_eyes: "\u{1F61A}", kissing_heart: "\u{1F618}", kissing_smiling_eyes: "\u{1F619}", kiwi_fruit: "\u{1F95D}", koala: "\u{1F428}", koko: "\u{1F201}", label: "\u{1F3F7}", large_blue_circle: "\u{1F535}", large_blue_diamond: "\u{1F537}", large_orange_diamond: "\u{1F536}", last_quarter_moon: "\u{1F317}", last_quarter_moon_with_face: "\u{1F31C}", latin_cross: "\u271D\uFE0F", laughing: "\u{1F606}", leaves: "\u{1F343}", ledger: "\u{1F4D2}", left_luggage: "\u{1F6C5}", left_right_arrow: "\u2194\uFE0F", leftwards_arrow_with_hook: "\u21A9\uFE0F", lemon: "\u{1F34B}", leo: "\u264C\uFE0F", leopard: "\u{1F406}", level_slider: "\u{1F39A}", libra: "\u264E\uFE0F", light_rail: "\u{1F688}", link: "\u{1F517}", lion: "\u{1F981}", lips: "\u{1F444}", lipstick: "\u{1F484}", lizard: "\u{1F98E}", lock: "\u{1F512}", lock_with_ink_pen: "\u{1F50F}", lollipop: "\u{1F36D}", loop: "\u27BF", loud_sound: "\u{1F50A}", loudspeaker: "\u{1F4E2}", love_hotel: "\u{1F3E9}", love_letter: "\u{1F48C}", low_brightness: "\u{1F505}", lying_face: "\u{1F925}", m: "\u24C2\uFE0F", mag: "\u{1F50D}", mag_right: "\u{1F50E}", mahjong: "\u{1F004}\uFE0F", mailbox: "\u{1F4EB}", mailbox_closed: "\u{1F4EA}", mailbox_with_mail: "\u{1F4EC}", mailbox_with_no_mail: "\u{1F4ED}", man: "\u{1F468}", man_artist: "\u{1F468}&zwj;\u{1F3A8}", man_astronaut: "\u{1F468}&zwj;\u{1F680}", man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F", man_cook: "\u{1F468}&zwj;\u{1F373}", man_dancing: "\u{1F57A}", man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F", man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}", man_farmer: "\u{1F468}&zwj;\u{1F33E}", man_firefighter: "\u{1F468}&zwj;\u{1F692}", man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F", man_in_tuxedo: "\u{1F935}", man_judge: "\u{1F468}&zwj;\u2696\uFE0F", man_juggling: "\u{1F939}&zwj;\u2642\uFE0F", man_mechanic: "\u{1F468}&zwj;\u{1F527}", man_office_worker: "\u{1F468}&zwj;\u{1F4BC}", man_pilot: "\u{1F468}&zwj;\u2708\uFE0F", man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F", man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F", man_scientist: "\u{1F468}&zwj;\u{1F52C}", man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F", man_singer: "\u{1F468}&zwj;\u{1F3A4}", man_student: "\u{1F468}&zwj;\u{1F393}", man_teacher: "\u{1F468}&zwj;\u{1F3EB}", man_technologist: "\u{1F468}&zwj;\u{1F4BB}", man_with_gua_pi_mao: "\u{1F472}", man_with_turban: "\u{1F473}", tangerine: "\u{1F34A}", mans_shoe: "\u{1F45E}", mantelpiece_clock: "\u{1F570}", maple_leaf: "\u{1F341}", martial_arts_uniform: "\u{1F94B}", mask: "\u{1F637}", massage_woman: "\u{1F486}", massage_man: "\u{1F486}&zwj;\u2642\uFE0F", meat_on_bone: "\u{1F356}", medal_military: "\u{1F396}", medal_sports: "\u{1F3C5}", mega: "\u{1F4E3}", melon: "\u{1F348}", memo: "\u{1F4DD}", men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F", menorah: "\u{1F54E}", mens: "\u{1F6B9}", metal: "\u{1F918}", metro: "\u{1F687}", microphone: "\u{1F3A4}", microscope: "\u{1F52C}", milk_glass: "\u{1F95B}", milky_way: "\u{1F30C}", minibus: "\u{1F690}", minidisc: "\u{1F4BD}", mobile_phone_off: "\u{1F4F4}", money_mouth_face: "\u{1F911}", money_with_wings: "\u{1F4B8}", moneybag: "\u{1F4B0}", monkey: "\u{1F412}", monkey_face: "\u{1F435}", monorail: "\u{1F69D}", moon: "\u{1F314}", mortar_board: "\u{1F393}", mosque: "\u{1F54C}", motor_boat: "\u{1F6E5}", motor_scooter: "\u{1F6F5}", motorcycle: "\u{1F3CD}", motorway: "\u{1F6E3}", mount_fuji: "\u{1F5FB}", mountain: "\u26F0", mountain_biking_man: "\u{1F6B5}", mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F", mountain_cableway: "\u{1F6A0}", mountain_railway: "\u{1F69E}", mountain_snow: "\u{1F3D4}", mouse: "\u{1F42D}", mouse2: "\u{1F401}", movie_camera: "\u{1F3A5}", moyai: "\u{1F5FF}", mrs_claus: "\u{1F936}", muscle: "\u{1F4AA}", mushroom: "\u{1F344}", musical_keyboard: "\u{1F3B9}", musical_note: "\u{1F3B5}", musical_score: "\u{1F3BC}", mute: "\u{1F507}", nail_care: "\u{1F485}", name_badge: "\u{1F4DB}", national_park: "\u{1F3DE}", nauseated_face: "\u{1F922}", necktie: "\u{1F454}", negative_squared_cross_mark: "\u274E", nerd_face: "\u{1F913}", neutral_face: "\u{1F610}", new: "\u{1F195}", new_moon: "\u{1F311}", new_moon_with_face: "\u{1F31A}", newspaper: "\u{1F4F0}", newspaper_roll: "\u{1F5DE}", next_track_button: "\u23ED", ng: "\u{1F196}", no_good_man: "\u{1F645}&zwj;\u2642\uFE0F", no_good_woman: "\u{1F645}", night_with_stars: "\u{1F303}", no_bell: "\u{1F515}", no_bicycles: "\u{1F6B3}", no_entry: "\u26D4\uFE0F", no_entry_sign: "\u{1F6AB}", no_mobile_phones: "\u{1F4F5}", no_mouth: "\u{1F636}", no_pedestrians: "\u{1F6B7}", no_smoking: "\u{1F6AD}", "non-potable_water": "\u{1F6B1}", nose: "\u{1F443}", notebook: "\u{1F4D3}", notebook_with_decorative_cover: "\u{1F4D4}", notes: "\u{1F3B6}", nut_and_bolt: "\u{1F529}", o: "\u2B55\uFE0F", o2: "\u{1F17E}\uFE0F", ocean: "\u{1F30A}", octopus: "\u{1F419}", oden: "\u{1F362}", office: "\u{1F3E2}", oil_drum: "\u{1F6E2}", ok: "\u{1F197}", ok_hand: "\u{1F44C}", ok_man: "\u{1F646}&zwj;\u2642\uFE0F", ok_woman: "\u{1F646}", old_key: "\u{1F5DD}", older_man: "\u{1F474}", older_woman: "\u{1F475}", om: "\u{1F549}", on: "\u{1F51B}", oncoming_automobile: "\u{1F698}", oncoming_bus: "\u{1F68D}", oncoming_police_car: "\u{1F694}", oncoming_taxi: "\u{1F696}", open_file_folder: "\u{1F4C2}", open_hands: "\u{1F450}", open_mouth: "\u{1F62E}", open_umbrella: "\u2602\uFE0F", ophiuchus: "\u26CE", orange_book: "\u{1F4D9}", orthodox_cross: "\u2626\uFE0F", outbox_tray: "\u{1F4E4}", owl: "\u{1F989}", ox: "\u{1F402}", package: "\u{1F4E6}", page_facing_up: "\u{1F4C4}", page_with_curl: "\u{1F4C3}", pager: "\u{1F4DF}", paintbrush: "\u{1F58C}", palm_tree: "\u{1F334}", pancakes: "\u{1F95E}", panda_face: "\u{1F43C}", paperclip: "\u{1F4CE}", paperclips: "\u{1F587}", parasol_on_ground: "\u26F1", parking: "\u{1F17F}\uFE0F", part_alternation_mark: "\u303D\uFE0F", partly_sunny: "\u26C5\uFE0F", passenger_ship: "\u{1F6F3}", passport_control: "\u{1F6C2}", pause_button: "\u23F8", peace_symbol: "\u262E\uFE0F", peach: "\u{1F351}", peanuts: "\u{1F95C}", pear: "\u{1F350}", pen: "\u{1F58A}", pencil2: "\u270F\uFE0F", penguin: "\u{1F427}", pensive: "\u{1F614}", performing_arts: "\u{1F3AD}", persevere: "\u{1F623}", person_fencing: "\u{1F93A}", pouting_woman: "\u{1F64E}", phone: "\u260E\uFE0F", pick: "\u26CF", pig: "\u{1F437}", pig2: "\u{1F416}", pig_nose: "\u{1F43D}", pill: "\u{1F48A}", pineapple: "\u{1F34D}", ping_pong: "\u{1F3D3}", pisces: "\u2653\uFE0F", pizza: "\u{1F355}", place_of_worship: "\u{1F6D0}", plate_with_cutlery: "\u{1F37D}", play_or_pause_button: "\u23EF", point_down: "\u{1F447}", point_left: "\u{1F448}", point_right: "\u{1F449}", point_up: "\u261D\uFE0F", point_up_2: "\u{1F446}", police_car: "\u{1F693}", policewoman: "\u{1F46E}&zwj;\u2640\uFE0F", poodle: "\u{1F429}", popcorn: "\u{1F37F}", post_office: "\u{1F3E3}", postal_horn: "\u{1F4EF}", postbox: "\u{1F4EE}", potable_water: "\u{1F6B0}", potato: "\u{1F954}", pouch: "\u{1F45D}", poultry_leg: "\u{1F357}", pound: "\u{1F4B7}", rage: "\u{1F621}", pouting_cat: "\u{1F63E}", pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F", pray: "\u{1F64F}", prayer_beads: "\u{1F4FF}", pregnant_woman: "\u{1F930}", previous_track_button: "\u23EE", prince: "\u{1F934}", princess: "\u{1F478}", printer: "\u{1F5A8}", purple_heart: "\u{1F49C}", purse: "\u{1F45B}", pushpin: "\u{1F4CC}", put_litter_in_its_place: "\u{1F6AE}", question: "\u2753", rabbit: "\u{1F430}", rabbit2: "\u{1F407}", racehorse: "\u{1F40E}", racing_car: "\u{1F3CE}", radio: "\u{1F4FB}", radio_button: "\u{1F518}", radioactive: "\u2622\uFE0F", railway_car: "\u{1F683}", railway_track: "\u{1F6E4}", rainbow: "\u{1F308}", rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}", raised_back_of_hand: "\u{1F91A}", raised_hand_with_fingers_splayed: "\u{1F590}", raised_hands: "\u{1F64C}", raising_hand_woman: "\u{1F64B}", raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F", ram: "\u{1F40F}", ramen: "\u{1F35C}", rat: "\u{1F400}", record_button: "\u23FA", recycle: "\u267B\uFE0F", red_circle: "\u{1F534}", registered: "\xAE\uFE0F", relaxed: "\u263A\uFE0F", relieved: "\u{1F60C}", reminder_ribbon: "\u{1F397}", repeat: "\u{1F501}", repeat_one: "\u{1F502}", rescue_worker_helmet: "\u26D1", restroom: "\u{1F6BB}", revolving_hearts: "\u{1F49E}", rewind: "\u23EA", rhinoceros: "\u{1F98F}", ribbon: "\u{1F380}", rice: "\u{1F35A}", rice_ball: "\u{1F359}", rice_cracker: "\u{1F358}", rice_scene: "\u{1F391}", right_anger_bubble: "\u{1F5EF}", ring: "\u{1F48D}", robot: "\u{1F916}", rocket: "\u{1F680}", rofl: "\u{1F923}", roll_eyes: "\u{1F644}", roller_coaster: "\u{1F3A2}", rooster: "\u{1F413}", rose: "\u{1F339}", rosette: "\u{1F3F5}", rotating_light: "\u{1F6A8}", round_pushpin: "\u{1F4CD}", rowing_man: "\u{1F6A3}", rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F", rugby_football: "\u{1F3C9}", running_man: "\u{1F3C3}", running_shirt_with_sash: "\u{1F3BD}", running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F", sa: "\u{1F202}\uFE0F", sagittarius: "\u2650\uFE0F", sake: "\u{1F376}", sandal: "\u{1F461}", santa: "\u{1F385}", satellite: "\u{1F4E1}", saxophone: "\u{1F3B7}", school: "\u{1F3EB}", school_satchel: "\u{1F392}", scissors: "\u2702\uFE0F", scorpion: "\u{1F982}", scorpius: "\u264F\uFE0F", scream: "\u{1F631}", scream_cat: "\u{1F640}", scroll: "\u{1F4DC}", seat: "\u{1F4BA}", secret: "\u3299\uFE0F", see_no_evil: "\u{1F648}", seedling: "\u{1F331}", selfie: "\u{1F933}", shallow_pan_of_food: "\u{1F958}", shamrock: "\u2618\uFE0F", shark: "\u{1F988}", shaved_ice: "\u{1F367}", sheep: "\u{1F411}", shell: "\u{1F41A}", shield: "\u{1F6E1}", shinto_shrine: "\u26E9", ship: "\u{1F6A2}", shirt: "\u{1F455}", shopping: "\u{1F6CD}", shopping_cart: "\u{1F6D2}", shower: "\u{1F6BF}", shrimp: "\u{1F990}", signal_strength: "\u{1F4F6}", six_pointed_star: "\u{1F52F}", ski: "\u{1F3BF}", skier: "\u26F7", skull: "\u{1F480}", skull_and_crossbones: "\u2620\uFE0F", sleeping: "\u{1F634}", sleeping_bed: "\u{1F6CC}", sleepy: "\u{1F62A}", slightly_frowning_face: "\u{1F641}", slightly_smiling_face: "\u{1F642}", slot_machine: "\u{1F3B0}", small_airplane: "\u{1F6E9}", small_blue_diamond: "\u{1F539}", small_orange_diamond: "\u{1F538}", small_red_triangle: "\u{1F53A}", small_red_triangle_down: "\u{1F53B}", smile: "\u{1F604}", smile_cat: "\u{1F638}", smiley: "\u{1F603}", smiley_cat: "\u{1F63A}", smiling_imp: "\u{1F608}", smirk: "\u{1F60F}", smirk_cat: "\u{1F63C}", smoking: "\u{1F6AC}", snail: "\u{1F40C}", snake: "\u{1F40D}", sneezing_face: "\u{1F927}", snowboarder: "\u{1F3C2}", snowflake: "\u2744\uFE0F", snowman: "\u26C4\uFE0F", snowman_with_snow: "\u2603\uFE0F", sob: "\u{1F62D}", soccer: "\u26BD\uFE0F", soon: "\u{1F51C}", sos: "\u{1F198}", sound: "\u{1F509}", space_invader: "\u{1F47E}", spades: "\u2660\uFE0F", spaghetti: "\u{1F35D}", sparkle: "\u2747\uFE0F", sparkler: "\u{1F387}", sparkles: "\u2728", sparkling_heart: "\u{1F496}", speak_no_evil: "\u{1F64A}", speaker: "\u{1F508}", speaking_head: "\u{1F5E3}", speech_balloon: "\u{1F4AC}", speedboat: "\u{1F6A4}", spider: "\u{1F577}", spider_web: "\u{1F578}", spiral_calendar: "\u{1F5D3}", spiral_notepad: "\u{1F5D2}", spoon: "\u{1F944}", squid: "\u{1F991}", stadium: "\u{1F3DF}", star: "\u2B50\uFE0F", star2: "\u{1F31F}", star_and_crescent: "\u262A\uFE0F", star_of_david: "\u2721\uFE0F", stars: "\u{1F320}", station: "\u{1F689}", statue_of_liberty: "\u{1F5FD}", steam_locomotive: "\u{1F682}", stew: "\u{1F372}", stop_button: "\u23F9", stop_sign: "\u{1F6D1}", stopwatch: "\u23F1", straight_ruler: "\u{1F4CF}", strawberry: "\u{1F353}", stuck_out_tongue: "\u{1F61B}", stuck_out_tongue_closed_eyes: "\u{1F61D}", stuck_out_tongue_winking_eye: "\u{1F61C}", studio_microphone: "\u{1F399}", stuffed_flatbread: "\u{1F959}", sun_behind_large_cloud: "\u{1F325}", sun_behind_rain_cloud: "\u{1F326}", sun_behind_small_cloud: "\u{1F324}", sun_with_face: "\u{1F31E}", sunflower: "\u{1F33B}", sunglasses: "\u{1F60E}", sunny: "\u2600\uFE0F", sunrise: "\u{1F305}", sunrise_over_mountains: "\u{1F304}", surfing_man: "\u{1F3C4}", surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F", sushi: "\u{1F363}", suspension_railway: "\u{1F69F}", sweat: "\u{1F613}", sweat_drops: "\u{1F4A6}", sweat_smile: "\u{1F605}", sweet_potato: "\u{1F360}", swimming_man: "\u{1F3CA}", swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F", symbols: "\u{1F523}", synagogue: "\u{1F54D}", syringe: "\u{1F489}", taco: "\u{1F32E}", tada: "\u{1F389}", tanabata_tree: "\u{1F38B}", taurus: "\u2649\uFE0F", taxi: "\u{1F695}", tea: "\u{1F375}", telephone_receiver: "\u{1F4DE}", telescope: "\u{1F52D}", tennis: "\u{1F3BE}", tent: "\u26FA\uFE0F", thermometer: "\u{1F321}", thinking: "\u{1F914}", thought_balloon: "\u{1F4AD}", ticket: "\u{1F3AB}", tickets: "\u{1F39F}", tiger: "\u{1F42F}", tiger2: "\u{1F405}", timer_clock: "\u23F2", tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F", tired_face: "\u{1F62B}", tm: "\u2122\uFE0F", toilet: "\u{1F6BD}", tokyo_tower: "\u{1F5FC}", tomato: "\u{1F345}", tongue: "\u{1F445}", top: "\u{1F51D}", tophat: "\u{1F3A9}", tornado: "\u{1F32A}", trackball: "\u{1F5B2}", tractor: "\u{1F69C}", traffic_light: "\u{1F6A5}", train: "\u{1F68B}", train2: "\u{1F686}", tram: "\u{1F68A}", triangular_flag_on_post: "\u{1F6A9}", triangular_ruler: "\u{1F4D0}", trident: "\u{1F531}", triumph: "\u{1F624}", trolleybus: "\u{1F68E}", trophy: "\u{1F3C6}", tropical_drink: "\u{1F379}", tropical_fish: "\u{1F420}", truck: "\u{1F69A}", trumpet: "\u{1F3BA}", tulip: "\u{1F337}", tumbler_glass: "\u{1F943}", turkey: "\u{1F983}", turtle: "\u{1F422}", tv: "\u{1F4FA}", twisted_rightwards_arrows: "\u{1F500}", two_hearts: "\u{1F495}", two_men_holding_hands: "\u{1F46C}", two_women_holding_hands: "\u{1F46D}", u5272: "\u{1F239}", u5408: "\u{1F234}", u55b6: "\u{1F23A}", u6307: "\u{1F22F}\uFE0F", u6708: "\u{1F237}\uFE0F", u6709: "\u{1F236}", u6e80: "\u{1F235}", u7121: "\u{1F21A}\uFE0F", u7533: "\u{1F238}", u7981: "\u{1F232}", u7a7a: "\u{1F233}", umbrella: "\u2614\uFE0F", unamused: "\u{1F612}", underage: "\u{1F51E}", unicorn: "\u{1F984}", unlock: "\u{1F513}", up: "\u{1F199}", upside_down_face: "\u{1F643}", v: "\u270C\uFE0F", vertical_traffic_light: "\u{1F6A6}", vhs: "\u{1F4FC}", vibration_mode: "\u{1F4F3}", video_camera: "\u{1F4F9}", video_game: "\u{1F3AE}", violin: "\u{1F3BB}", virgo: "\u264D\uFE0F", volcano: "\u{1F30B}", volleyball: "\u{1F3D0}", vs: "\u{1F19A}", vulcan_salute: "\u{1F596}", walking_man: "\u{1F6B6}", walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F", waning_crescent_moon: "\u{1F318}", waning_gibbous_moon: "\u{1F316}", warning: "\u26A0\uFE0F", wastebasket: "\u{1F5D1}", watch: "\u231A\uFE0F", water_buffalo: "\u{1F403}", watermelon: "\u{1F349}", wave: "\u{1F44B}", wavy_dash: "\u3030\uFE0F", waxing_crescent_moon: "\u{1F312}", wc: "\u{1F6BE}", weary: "\u{1F629}", wedding: "\u{1F492}", weight_lifting_man: "\u{1F3CB}\uFE0F", weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F", whale: "\u{1F433}", whale2: "\u{1F40B}", wheel_of_dharma: "\u2638\uFE0F", wheelchair: "\u267F\uFE0F", white_check_mark: "\u2705", white_circle: "\u26AA\uFE0F", white_flag: "\u{1F3F3}\uFE0F", white_flower: "\u{1F4AE}", white_large_square: "\u2B1C\uFE0F", white_medium_small_square: "\u25FD\uFE0F", white_medium_square: "\u25FB\uFE0F", white_small_square: "\u25AB\uFE0F", white_square_button: "\u{1F533}", wilted_flower: "\u{1F940}", wind_chime: "\u{1F390}", wind_face: "\u{1F32C}", wine_glass: "\u{1F377}", wink: "\u{1F609}", wolf: "\u{1F43A}", woman: "\u{1F469}", woman_artist: "\u{1F469}&zwj;\u{1F3A8}", woman_astronaut: "\u{1F469}&zwj;\u{1F680}", woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F", woman_cook: "\u{1F469}&zwj;\u{1F373}", woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F", woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}", woman_farmer: "\u{1F469}&zwj;\u{1F33E}", woman_firefighter: "\u{1F469}&zwj;\u{1F692}", woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F", woman_judge: "\u{1F469}&zwj;\u2696\uFE0F", woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F", woman_mechanic: "\u{1F469}&zwj;\u{1F527}", woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}", woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F", woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F", woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F", woman_scientist: "\u{1F469}&zwj;\u{1F52C}", woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F", woman_singer: "\u{1F469}&zwj;\u{1F3A4}", woman_student: "\u{1F469}&zwj;\u{1F393}", woman_teacher: "\u{1F469}&zwj;\u{1F3EB}", woman_technologist: "\u{1F469}&zwj;\u{1F4BB}", woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F", womans_clothes: "\u{1F45A}", womans_hat: "\u{1F452}", women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F", womens: "\u{1F6BA}", world_map: "\u{1F5FA}", worried: "\u{1F61F}", wrench: "\u{1F527}", writing_hand: "\u270D\uFE0F", x: "\u274C", yellow_heart: "\u{1F49B}", yen: "\u{1F4B4}", yin_yang: "\u262F\uFE0F", yum: "\u{1F60B}", zap: "\u26A1\uFE0F", zipper_mouth_face: "\u{1F910}", zzz: "\u{1F4A4}", octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">', showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>` }, r.Converter = function(e) {
      "use strict";
      var u = {}, d = [], a = [], s = {}, i = R, c = { parsed: {}, raw: "", format: "" };
      t();
      function t() {
        e = e || {};
        for (var n in E)
          E.hasOwnProperty(n) && (u[n] = E[n]);
        if (typeof e == "object")
          for (var f in e)
            e.hasOwnProperty(f) && (u[f] = e[f]);
        else
          throw Error("Converter expects the passed parameter to be an object, but " + typeof e + " was passed instead.");
        u.extensions && r.helper.forEach(u.extensions, p);
      }
      function p(n, f) {
        if (f = f || null, r.helper.isString(n))
          if (n = r.helper.stdExtName(n), f = n, r.extensions[n]) {
            console.warn("DEPRECATION WARNING: " + n + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), l(r.extensions[n], n);
            return;
          } else if (!r.helper.isUndefined(z[n]))
            n = z[n];
          else
            throw Error('Extension "' + n + '" could not be loaded. It was either not found or is not a valid extension.');
        typeof n == "function" && (n = n()), r.helper.isArray(n) || (n = [n]);
        var _ = T(n, f);
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
        typeof n == "function" && (n = n(new r.Converter())), r.helper.isArray(n) || (n = [n]);
        var _ = T(n, f);
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
        if (!r.helper.isString(n))
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
            var y = s[f][g](f, _, this, m, w);
            y && typeof y < "u" && (_ = y);
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
`), n = n.replace(/\u00A0/g, "&nbsp;"), u.smartIndentationFix && (n = h(n)), n = `

` + n + `

`, n = r.subParser("detab")(n, u, f), n = n.replace(/^[ \t]+$/mg, ""), r.helper.forEach(d, function(_) {
          n = r.subParser("runExtension")(_, n, u, f);
        }), n = r.subParser("metadata")(n, u, f), n = r.subParser("hashPreCodeTags")(n, u, f), n = r.subParser("githubCodeBlocks")(n, u, f), n = r.subParser("hashHTMLBlocks")(n, u, f), n = r.subParser("hashCodeTags")(n, u, f), n = r.subParser("stripLinkDefinitions")(n, u, f), n = r.subParser("blockGamut")(n, u, f), n = r.subParser("unhashHTMLSpans")(n, u, f), n = r.subParser("unescapeSpecialChars")(n, u, f), n = n.replace(/¨D/g, "$$"), n = n.replace(/¨T/g, "\xA8"), n = r.subParser("completeHTMLDocument")(n, u, f), r.helper.forEach(a, function(_) {
          n = r.subParser("runExtension")(_, n, u, f);
        }), c = f.metadata, n;
      }, this.makeMarkdown = this.makeMd = function(n, f) {
        if (n = n.replace(/\r\n/g, `
`), n = n.replace(/\r/g, `
`), n = n.replace(/>[ \t]+</, ">\xA8NBSP;<"), !f)
          if (window && window.document)
            f = window.document;
          else
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
        var _ = f.createElement("div");
        _.innerHTML = n;
        var m = { preList: S(_) };
        j(_);
        for (var w = _.childNodes, g = "", y = 0; y < w.length; y++)
          g += r.subParser("makeMarkdown.node")(w[y], m);
        function j(v) {
          for (var P = 0; P < v.childNodes.length; ++P) {
            var C = v.childNodes[P];
            C.nodeType === 3 ? !/\S/.test(C.nodeValue) && !/^[ ]+$/.test(C.nodeValue) ? (v.removeChild(C), --P) : (C.nodeValue = C.nodeValue.split(`
`).join(" "), C.nodeValue = C.nodeValue.replace(/(\s)+/g, "$1")) : C.nodeType === 1 && j(C);
          }
        }
        function S(v) {
          for (var P = v.querySelectorAll("pre"), C = [], M = 0; M < P.length; ++M)
            if (P[M].childElementCount === 1 && P[M].firstChild.tagName.toLowerCase() === "code") {
              var N = P[M].firstChild.innerHTML.trim(), V = P[M].firstChild.getAttribute("data-language") || "";
              if (V === "")
                for (var K = P[M].firstChild.className.split(" "), D = 0; D < K.length; ++D) {
                  var Z = K[D].match(/^language-(.+)$/);
                  if (Z !== null) {
                    V = Z[1];
                    break;
                  }
                }
              N = r.helper.unescapeHTMLEntities(N), C.push(N), P[M].outerHTML = '<precode language="' + V + '" precodenum="' + M.toString() + '"></precode>';
            } else
              C.push(P[M].innerHTML), P[M].innerHTML = "", P[M].setAttribute("prenum", M.toString());
          return C;
        }
        return g;
      }, this.setOption = function(n, f) {
        u[n] = f;
      }, this.getOption = function(n) {
        return u[n];
      }, this.getOptions = function() {
        return u;
      }, this.addExtension = function(n, f) {
        f = f || null, p(n, f);
      }, this.useExtension = function(n) {
        p(n);
      }, this.setFlavor = function(n) {
        if (!H.hasOwnProperty(n))
          throw Error(n + " flavor was not found");
        var f = H[n];
        i = n;
        for (var _ in f)
          f.hasOwnProperty(_) && (u[_] = f[_]);
      }, this.getFlavor = function() {
        return i;
      }, this.removeExtension = function(n) {
        r.helper.isArray(n) || (n = [n]);
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
    }, r.subParser("anchors", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("anchors.before", e, u, d);
      var a = function(s, i, c, t, p, l, o) {
        if (r.helper.isUndefined(o) && (o = ""), c = c.toLowerCase(), s.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          t = "";
        else if (!t)
          if (c || (c = i.toLowerCase().replace(/ ?\n/g, " ")), t = "#" + c, !r.helper.isUndefined(d.gUrls[c]))
            t = d.gUrls[c], r.helper.isUndefined(d.gTitles[c]) || (o = d.gTitles[c]);
          else
            return s;
        t = t.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var h = '<a href="' + t + '"';
        return o !== "" && o !== null && (o = o.replace(/"/g, "&quot;"), o = o.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), h += ' title="' + o + '"'), u.openLinksInNewWindow && !/^#/.test(t) && (h += ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h += ">" + i + "</a>", h;
      };
      return e = e.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, a), e = e.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a), e = e.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a), e = e.replace(/\[([^\[\]]+)]()()()()()/g, a), u.ghMentions && (e = e.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(s, i, c, t, p) {
        if (c === "\\")
          return i + t;
        if (!r.helper.isString(u.ghMentionsLink))
          throw new Error("ghMentionsLink option must be a string");
        var l = u.ghMentionsLink.replace(/\{u}/g, p), o = "";
        return u.openLinksInNewWindow && (o = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), i + '<a href="' + l + '"' + o + ">" + t + "</a>";
      })), e = d.converter._dispatch("anchors.after", e, u, d), e;
    });
    var Y = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, x = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, ee = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, de = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, ue = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, I = function(e) {
      "use strict";
      return function(u, d, a, s, i, c, t) {
        a = a.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var p = a, l = "", o = "", h = d || "", n = t || "";
        return /^www\./i.test(a) && (a = a.replace(/^www\./i, "http://www.")), e.excludeTrailingPunctuationFromURLs && c && (l = c), e.openLinksInNewWindow && (o = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h + '<a href="' + a + '"' + o + ">" + p + "</a>" + l + n;
      };
    }, W = function(e, u) {
      "use strict";
      return function(d, a, s) {
        var i = "mailto:";
        return a = a || "", s = r.subParser("unescapeSpecialChars")(s, e, u), e.encodeEmails ? (i = r.helper.encodeEmailAddress(i + s), s = r.helper.encodeEmailAddress(s)) : i = i + s, a + '<a href="' + i + '">' + s + "</a>";
      };
    };
    r.subParser("autoLinks", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("autoLinks.before", e, u, d), e = e.replace(ee, I(u)), e = e.replace(ue, W(u, d)), e = d.converter._dispatch("autoLinks.after", e, u, d), e;
    }), r.subParser("simplifiedAutoLinks", function(e, u, d) {
      "use strict";
      return u.simplifiedAutoLink && (e = d.converter._dispatch("simplifiedAutoLinks.before", e, u, d), u.excludeTrailingPunctuationFromURLs ? e = e.replace(x, I(u)) : e = e.replace(Y, I(u)), e = e.replace(de, W(u, d)), e = d.converter._dispatch("simplifiedAutoLinks.after", e, u, d)), e;
    }), r.subParser("blockGamut", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("blockGamut.before", e, u, d), e = r.subParser("blockQuotes")(e, u, d), e = r.subParser("headers")(e, u, d), e = r.subParser("horizontalRule")(e, u, d), e = r.subParser("lists")(e, u, d), e = r.subParser("codeBlocks")(e, u, d), e = r.subParser("tables")(e, u, d), e = r.subParser("hashHTMLBlocks")(e, u, d), e = r.subParser("paragraphs")(e, u, d), e = d.converter._dispatch("blockGamut.after", e, u, d), e;
    }), r.subParser("blockQuotes", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("blockQuotes.before", e, u, d), e = e + `

`;
      var a = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      return u.splitAdjacentBlockquotes && (a = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), e = e.replace(a, function(s) {
        return s = s.replace(/^[ \t]*>[ \t]?/gm, ""), s = s.replace(/¨0/g, ""), s = s.replace(/^[ \t]+$/gm, ""), s = r.subParser("githubCodeBlocks")(s, u, d), s = r.subParser("blockGamut")(s, u, d), s = s.replace(/(^|\n)/g, "$1  "), s = s.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(i, c) {
          var t = c;
          return t = t.replace(/^  /mg, "\xA80"), t = t.replace(/¨0/g, ""), t;
        }), r.subParser("hashBlock")(`<blockquote>
` + s + `
</blockquote>`, u, d);
      }), e = d.converter._dispatch("blockQuotes.after", e, u, d), e;
    }), r.subParser("codeBlocks", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("codeBlocks.before", e, u, d), e += "\xA80";
      var a = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      return e = e.replace(a, function(s, i, c) {
        var t = i, p = c, l = `
`;
        return t = r.subParser("outdent")(t, u, d), t = r.subParser("encodeCode")(t, u, d), t = r.subParser("detab")(t, u, d), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), u.omitExtraWLInCodeBlocks && (l = ""), t = "<pre><code>" + t + l + "</code></pre>", r.subParser("hashBlock")(t, u, d) + p;
      }), e = e.replace(/¨0/, ""), e = d.converter._dispatch("codeBlocks.after", e, u, d), e;
    }), r.subParser("codeSpans", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("codeSpans.before", e, u, d), typeof e > "u" && (e = ""), e = e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(a, s, i, c) {
        var t = c;
        return t = t.replace(/^([ \t]*)/g, ""), t = t.replace(/[ \t]*$/g, ""), t = r.subParser("encodeCode")(t, u, d), t = s + "<code>" + t + "</code>", t = r.subParser("hashHTMLSpans")(t, u, d), t;
      }), e = d.converter._dispatch("codeSpans.after", e, u, d), e;
    }), r.subParser("completeHTMLDocument", function(e, u, d) {
      "use strict";
      if (!u.completeHTMLDocument)
        return e;
      e = d.converter._dispatch("completeHTMLDocument.before", e, u, d);
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
</html>`, e = d.converter._dispatch("completeHTMLDocument.after", e, u, d), e;
    }), r.subParser("detab", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("detab.before", e, u, d), e = e.replace(/\t(?=\t)/g, "    "), e = e.replace(/\t/g, "\xA8A\xA8B"), e = e.replace(/¨B(.+?)¨A/g, function(a, s) {
        for (var i = s, c = 4 - i.length % 4, t = 0; t < c; t++)
          i += " ";
        return i;
      }), e = e.replace(/¨A/g, "    "), e = e.replace(/¨B/g, ""), e = d.converter._dispatch("detab.after", e, u, d), e;
    }), r.subParser("ellipsis", function(e, u, d) {
      "use strict";
      return u.ellipsis && (e = d.converter._dispatch("ellipsis.before", e, u, d), e = e.replace(/\.\.\./g, "\u2026"), e = d.converter._dispatch("ellipsis.after", e, u, d)), e;
    }), r.subParser("emoji", function(e, u, d) {
      "use strict";
      if (!u.emoji)
        return e;
      e = d.converter._dispatch("emoji.before", e, u, d);
      var a = /:([\S]+?):/g;
      return e = e.replace(a, function(s, i) {
        return r.helper.emojis.hasOwnProperty(i) ? r.helper.emojis[i] : s;
      }), e = d.converter._dispatch("emoji.after", e, u, d), e;
    }), r.subParser("encodeAmpsAndAngles", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("encodeAmpsAndAngles.before", e, u, d), e = e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e = e.replace(/<(?![a-z\/?$!])/gi, "&lt;"), e = e.replace(/</g, "&lt;"), e = e.replace(/>/g, "&gt;"), e = d.converter._dispatch("encodeAmpsAndAngles.after", e, u, d), e;
    }), r.subParser("encodeBackslashEscapes", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("encodeBackslashEscapes.before", e, u, d), e = e.replace(/\\(\\)/g, r.helper.escapeCharactersCallback), e = e.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, r.helper.escapeCharactersCallback), e = d.converter._dispatch("encodeBackslashEscapes.after", e, u, d), e;
    }), r.subParser("encodeCode", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("encodeCode.before", e, u, d), e = e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, r.helper.escapeCharactersCallback), e = d.converter._dispatch("encodeCode.after", e, u, d), e;
    }), r.subParser("escapeSpecialCharsWithinTagAttributes", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", e, u, d);
      var a = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, s = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      return e = e.replace(a, function(i) {
        return i.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, r.helper.escapeCharactersCallback);
      }), e = e.replace(s, function(i) {
        return i.replace(/([\\`*_~=|])/g, r.helper.escapeCharactersCallback);
      }), e = d.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", e, u, d), e;
    }), r.subParser("githubCodeBlocks", function(e, u, d) {
      "use strict";
      return u.ghCodeBlocks ? (e = d.converter._dispatch("githubCodeBlocks.before", e, u, d), e += "\xA80", e = e.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(a, s, i, c) {
        var t = u.omitExtraWLInCodeBlocks ? "" : `
`;
        return c = r.subParser("encodeCode")(c, u, d), c = r.subParser("detab")(c, u, d), c = c.replace(/^\n+/g, ""), c = c.replace(/\n+$/g, ""), c = "<pre><code" + (i ? ' class="' + i + " language-" + i + '"' : "") + ">" + c + t + "</code></pre>", c = r.subParser("hashBlock")(c, u, d), `

\xA8G` + (d.ghCodeBlocks.push({ text: a, codeblock: c }) - 1) + `G

`;
      }), e = e.replace(/¨0/, ""), d.converter._dispatch("githubCodeBlocks.after", e, u, d)) : e;
    }), r.subParser("hashBlock", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("hashBlock.before", e, u, d), e = e.replace(/(^\n+|\n+$)/g, ""), e = `

\xA8K` + (d.gHtmlBlocks.push(e) - 1) + `K

`, e = d.converter._dispatch("hashBlock.after", e, u, d), e;
    }), r.subParser("hashCodeTags", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("hashCodeTags.before", e, u, d);
      var a = function(s, i, c, t) {
        var p = c + r.subParser("encodeCode")(i, u, d) + t;
        return "\xA8C" + (d.gHtmlSpans.push(p) - 1) + "C";
      };
      return e = r.helper.replaceRecursiveRegExp(e, a, "<code\\b[^>]*>", "</code>", "gim"), e = d.converter._dispatch("hashCodeTags.after", e, u, d), e;
    }), r.subParser("hashElement", function(e, u, d) {
      "use strict";
      return function(a, s) {
        var i = s;
        return i = i.replace(/\n\n/g, `
`), i = i.replace(/^\n/, ""), i = i.replace(/\n+$/g, ""), i = `

\xA8K` + (d.gHtmlBlocks.push(i) - 1) + `K

`, i;
      };
    }), r.subParser("hashHTMLBlocks", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("hashHTMLBlocks.before", e, u, d);
      var a = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], s = function(n, f, _, m) {
        var w = n;
        return _.search(/\bmarkdown\b/) !== -1 && (w = _ + d.converter.makeHtml(f) + m), `

\xA8K` + (d.gHtmlBlocks.push(w) - 1) + `K

`;
      };
      u.backslashEscapesHTMLTags && (e = e.replace(/\\<(\/?[^>]+?)>/g, function(n, f) {
        return "&lt;" + f + "&gt;";
      }));
      for (var i = 0; i < a.length; ++i)
        for (var c, t = new RegExp("^ {0,3}(<" + a[i] + "\\b[^>]*>)", "im"), p = "<" + a[i] + "\\b[^>]*>", l = "</" + a[i] + ">"; (c = r.helper.regexIndexOf(e, t)) !== -1; ) {
          var o = r.helper.splitAtIndex(e, c), h = r.helper.replaceRecursiveRegExp(o[1], s, p, l, "im");
          if (h === o[1])
            break;
          e = o[0].concat(h);
        }
      return e = e.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, r.subParser("hashElement")(e, u, d)), e = r.helper.replaceRecursiveRegExp(e, function(n) {
        return `

\xA8K` + (d.gHtmlBlocks.push(n) - 1) + `K

`;
      }, "^ {0,3}<!--", "-->", "gm"), e = e.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, r.subParser("hashElement")(e, u, d)), e = d.converter._dispatch("hashHTMLBlocks.after", e, u, d), e;
    }), r.subParser("hashHTMLSpans", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("hashHTMLSpans.before", e, u, d);
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
      }), e = d.converter._dispatch("hashHTMLSpans.after", e, u, d), e;
    }), r.subParser("unhashHTMLSpans", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("unhashHTMLSpans.before", e, u, d);
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
      return e = d.converter._dispatch("unhashHTMLSpans.after", e, u, d), e;
    }), r.subParser("hashPreCodeTags", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("hashPreCodeTags.before", e, u, d);
      var a = function(s, i, c, t) {
        var p = c + r.subParser("encodeCode")(i, u, d) + t;
        return `

\xA8G` + (d.ghCodeBlocks.push({ text: s, codeblock: p }) - 1) + `G

`;
      };
      return e = r.helper.replaceRecursiveRegExp(e, a, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), e = d.converter._dispatch("hashPreCodeTags.after", e, u, d), e;
    }), r.subParser("headers", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("headers.before", e, u, d);
      var a = isNaN(parseInt(u.headerLevelStart)) ? 1 : parseInt(u.headerLevelStart), s = u.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, i = u.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      e = e.replace(s, function(p, l) {
        var o = r.subParser("spanGamut")(l, u, d), h = u.noHeaderId ? "" : ' id="' + t(l) + '"', n = a, f = "<h" + n + h + ">" + o + "</h" + n + ">";
        return r.subParser("hashBlock")(f, u, d);
      }), e = e.replace(i, function(p, l) {
        var o = r.subParser("spanGamut")(l, u, d), h = u.noHeaderId ? "" : ' id="' + t(l) + '"', n = a + 1, f = "<h" + n + h + ">" + o + "</h" + n + ">";
        return r.subParser("hashBlock")(f, u, d);
      });
      var c = u.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      e = e.replace(c, function(p, l, o) {
        var h = o;
        u.customizedHeaderId && (h = o.replace(/\s?\{([^{]+?)}\s*$/, ""));
        var n = r.subParser("spanGamut")(h, u, d), f = u.noHeaderId ? "" : ' id="' + t(o) + '"', _ = a - 1 + l.length, m = "<h" + _ + f + ">" + n + "</h" + _ + ">";
        return r.subParser("hashBlock")(m, u, d);
      });
      function t(p) {
        var l, o;
        if (u.customizedHeaderId) {
          var h = p.match(/\{([^{]+?)}\s*$/);
          h && h[1] && (p = h[1]);
        }
        return l = p, r.helper.isString(u.prefixHeaderId) ? o = u.prefixHeaderId : u.prefixHeaderId === true ? o = "section-" : o = "", u.rawPrefixHeaderId || (l = o + l), u.ghCompatibleHeaderId ? l = l.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : u.rawHeaderId ? l = l.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : l = l.replace(/[^\w]/g, "").toLowerCase(), u.rawPrefixHeaderId && (l = o + l), d.hashLinkCounts[l] ? l = l + "-" + d.hashLinkCounts[l]++ : d.hashLinkCounts[l] = 1, l;
      }
      return e = d.converter._dispatch("headers.after", e, u, d), e;
    }), r.subParser("horizontalRule", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("horizontalRule.before", e, u, d);
      var a = r.subParser("hashBlock")("<hr />", u, d);
      return e = e.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, a), e = e.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, a), e = e.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, a), e = d.converter._dispatch("horizontalRule.after", e, u, d), e;
    }), r.subParser("images", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("images.before", e, u, d);
      var a = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, s = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, i = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, c = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, t = /!\[([^\[\]]+)]()()()()()/g;
      function p(o, h, n, f, _, m, w, g) {
        return f = f.replace(/\s/g, ""), l(o, h, n, f, _, m, w, g);
      }
      function l(o, h, n, f, _, m, w, g) {
        var y = d.gUrls, j = d.gTitles, S = d.gDimensions;
        if (n = n.toLowerCase(), g || (g = ""), o.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          f = "";
        else if (f === "" || f === null)
          if ((n === "" || n === null) && (n = h.toLowerCase().replace(/ ?\n/g, " ")), f = "#" + n, !r.helper.isUndefined(y[n]))
            f = y[n], r.helper.isUndefined(j[n]) || (g = j[n]), r.helper.isUndefined(S[n]) || (_ = S[n].width, m = S[n].height);
          else
            return o;
        h = h.replace(/"/g, "&quot;").replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), f = f.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var v = '<img src="' + f + '" alt="' + h + '"';
        return g && r.helper.isString(g) && (g = g.replace(/"/g, "&quot;").replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), v += ' title="' + g + '"'), _ && m && (_ = _ === "*" ? "auto" : _, m = m === "*" ? "auto" : m, v += ' width="' + _ + '"', v += ' height="' + m + '"'), v += " />", v;
      }
      return e = e.replace(c, l), e = e.replace(i, p), e = e.replace(s, l), e = e.replace(a, l), e = e.replace(t, l), e = d.converter._dispatch("images.after", e, u, d), e;
    }), r.subParser("italicsAndBold", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("italicsAndBold.before", e, u, d);
      function a(s, i, c) {
        return i + s + c;
      }
      return u.literalMidWordUnderscores ? (e = e.replace(/\b___(\S[\s\S]*?)___\b/g, function(s, i) {
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
      })), u.literalMidWordAsterisks ? (e = e.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(s, i, c) {
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
      })), e = d.converter._dispatch("italicsAndBold.after", e, u, d), e;
    }), r.subParser("lists", function(e, u, d) {
      "use strict";
      function a(c, t) {
        d.gListLevel++, c = c.replace(/\n{2,}$/, `
`), c += "\xA80";
        var p = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, l = /\n[ \t]*\n(?!¨0)/.test(c);
        return u.disableForced4SpacesIndentedSublists && (p = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), c = c.replace(p, function(o, h, n, f, _, m, w) {
          w = w && w.trim() !== "";
          var g = r.subParser("outdent")(_, u, d), y = "";
          return m && u.tasklists && (y = ' class="task-list-item" style="list-style-type: none;"', g = g.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var j = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            return w && (j += " checked"), j += ">", j;
          })), g = g.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(j) {
            return "\xA8A" + j;
          }), h || g.search(/\n{2,}/) > -1 ? (g = r.subParser("githubCodeBlocks")(g, u, d), g = r.subParser("blockGamut")(g, u, d)) : (g = r.subParser("lists")(g, u, d), g = g.replace(/\n$/, ""), g = r.subParser("hashHTMLBlocks")(g, u, d), g = g.replace(/\n\n+/g, `

`), l ? g = r.subParser("paragraphs")(g, u, d) : g = r.subParser("spanGamut")(g, u, d)), g = g.replace("\xA8A", ""), g = "<li" + y + ">" + g + `</li>
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
        var l = u.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, o = u.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, h = t === "ul" ? l : o, n = "";
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
      return e = d.converter._dispatch("lists.before", e, u, d), e += "\xA80", d.gListLevel ? e = e.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c, t, p) {
        var l = p.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i(t, l, true);
      }) : e = e.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c, t, p, l) {
        var o = l.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i(p, o, false);
      }), e = e.replace(/¨0/, ""), e = d.converter._dispatch("lists.after", e, u, d), e;
    }), r.subParser("metadata", function(e, u, d) {
      "use strict";
      if (!u.metadata)
        return e;
      e = d.converter._dispatch("metadata.before", e, u, d);
      function a(s) {
        d.metadata.raw = s, s = s.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), s = s.replace(/\n {4}/g, " "), s.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(i, c, t) {
          return d.metadata.parsed[c] = t, "";
        });
      }
      return e = e.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(s, i, c) {
        return a(c), "\xA8M";
      }), e = e.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(s, i, c) {
        return i && (d.metadata.format = i), a(c), "\xA8M";
      }), e = e.replace(/¨M/g, ""), e = d.converter._dispatch("metadata.after", e, u, d), e;
    }), r.subParser("outdent", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("outdent.before", e, u, d), e = e.replace(/^(\t|[ ]{1,4})/gm, "\xA80"), e = e.replace(/¨0/g, ""), e = d.converter._dispatch("outdent.after", e, u, d), e;
    }), r.subParser("paragraphs", function(e, u, d) {
      "use strict";
      e = d.converter._dispatch("paragraphs.before", e, u, d), e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, "");
      for (var a = e.split(/\n{2,}/g), s = [], i = a.length, c = 0; c < i; c++) {
        var t = a[c];
        t.search(/¨(K|G)(\d+)\1/g) >= 0 ? s.push(t) : t.search(/\S/) >= 0 && (t = r.subParser("spanGamut")(t, u, d), t = t.replace(/^([ \t]*)/g, "<p>"), t += "</p>", s.push(t));
      }
      for (i = s.length, c = 0; c < i; c++) {
        for (var p = "", l = s[c], o = false; /¨(K|G)(\d+)\1/.test(l); ) {
          var h = RegExp.$1, n = RegExp.$2;
          h === "K" ? p = d.gHtmlBlocks[n] : o ? p = r.subParser("encodeCode")(d.ghCodeBlocks[n].text, u, d) : p = d.ghCodeBlocks[n].codeblock, p = p.replace(/\$/g, "$$$$"), l = l.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, p), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l) && (o = true);
        }
        s[c] = l;
      }
      return e = s.join(`
`), e = e.replace(/^\n+/g, ""), e = e.replace(/\n+$/g, ""), d.converter._dispatch("paragraphs.after", e, u, d);
    }), r.subParser("runExtension", function(e, u, d, a) {
      "use strict";
      if (e.filter)
        u = e.filter(u, a.converter, d);
      else if (e.regex) {
        var s = e.regex;
        s instanceof RegExp || (s = new RegExp(s, "g")), u = u.replace(s, e.replace);
      }
      return u;
    }), r.subParser("spanGamut", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("spanGamut.before", e, u, d), e = r.subParser("codeSpans")(e, u, d), e = r.subParser("escapeSpecialCharsWithinTagAttributes")(e, u, d), e = r.subParser("encodeBackslashEscapes")(e, u, d), e = r.subParser("images")(e, u, d), e = r.subParser("anchors")(e, u, d), e = r.subParser("autoLinks")(e, u, d), e = r.subParser("simplifiedAutoLinks")(e, u, d), e = r.subParser("emoji")(e, u, d), e = r.subParser("underline")(e, u, d), e = r.subParser("italicsAndBold")(e, u, d), e = r.subParser("strikethrough")(e, u, d), e = r.subParser("ellipsis")(e, u, d), e = r.subParser("hashHTMLSpans")(e, u, d), e = r.subParser("encodeAmpsAndAngles")(e, u, d), u.simpleLineBreaks ? /\n\n¨K/.test(e) || (e = e.replace(/\n+/g, `<br />
`)) : e = e.replace(/  +\n/g, `<br />
`), e = d.converter._dispatch("spanGamut.after", e, u, d), e;
    }), r.subParser("strikethrough", function(e, u, d) {
      "use strict";
      function a(s) {
        return u.simplifiedAutoLink && (s = r.subParser("simplifiedAutoLinks")(s, u, d)), "<del>" + s + "</del>";
      }
      return u.strikethrough && (e = d.converter._dispatch("strikethrough.before", e, u, d), e = e.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(s, i) {
        return a(i);
      }), e = d.converter._dispatch("strikethrough.after", e, u, d)), e;
    }), r.subParser("stripLinkDefinitions", function(e, u, d) {
      "use strict";
      var a = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, s = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      e += "\xA80";
      var i = function(c, t, p, l, o, h, n) {
        return t = t.toLowerCase(), e.toLowerCase().split(t).length - 1 < 2 ? c : (p.match(/^data:.+?\/.+?;base64,/) ? d.gUrls[t] = p.replace(/\s/g, "") : d.gUrls[t] = r.subParser("encodeAmpsAndAngles")(p, u, d), h ? h + n : (n && (d.gTitles[t] = n.replace(/"|'/g, "&quot;")), u.parseImgDimensions && l && o && (d.gDimensions[t] = { width: l, height: o }), ""));
      };
      return e = e.replace(s, i), e = e.replace(a, i), e = e.replace(/¨0/, ""), e;
    }), r.subParser("tables", function(e, u, d) {
      "use strict";
      if (!u.tables)
        return e;
      var a = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, s = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function i(o) {
        return /^:[ \t]*--*$/.test(o) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(o) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(o) ? ' style="text-align:center;"' : "";
      }
      function c(o, h) {
        var n = "";
        return o = o.trim(), (u.tablesHeaderId || u.tableHeaderId) && (n = ' id="' + o.replace(/ /g, "_").toLowerCase() + '"'), o = r.subParser("spanGamut")(o, u, d), "<th" + n + h + ">" + o + `</th>
`;
      }
      function t(o, h) {
        var n = r.subParser("spanGamut")(o, u, d);
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
          /^ {0,3}\|/.test(n[h]) && (n[h] = n[h].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(n[h]) && (n[h] = n[h].replace(/\|[ \t]*$/, "")), n[h] = r.subParser("codeSpans")(n[h], u, d);
        var f = n[0].split("|").map(function(v) {
          return v.trim();
        }), _ = n[1].split("|").map(function(v) {
          return v.trim();
        }), m = [], w = [], g = [], y = [];
        for (n.shift(), n.shift(), h = 0; h < n.length; ++h)
          n[h].trim() !== "" && m.push(n[h].split("|").map(function(v) {
            return v.trim();
          }));
        if (f.length < _.length)
          return o;
        for (h = 0; h < _.length; ++h)
          g.push(i(_[h]));
        for (h = 0; h < f.length; ++h)
          r.helper.isUndefined(g[h]) && (g[h] = ""), w.push(c(f[h], g[h]));
        for (h = 0; h < m.length; ++h) {
          for (var j = [], S = 0; S < w.length; ++S)
            r.helper.isUndefined(m[h][S]), j.push(t(m[h][S], g[S]));
          y.push(j);
        }
        return p(w, y);
      }
      return e = d.converter._dispatch("tables.before", e, u, d), e = e.replace(/\\(\|)/g, r.helper.escapeCharactersCallback), e = e.replace(a, l), e = e.replace(s, l), e = d.converter._dispatch("tables.after", e, u, d), e;
    }), r.subParser("underline", function(e, u, d) {
      "use strict";
      return u.underline && (e = d.converter._dispatch("underline.before", e, u, d), u.literalMidWordUnderscores ? (e = e.replace(/\b___(\S[\s\S]*?)___\b/g, function(a, s) {
        return "<u>" + s + "</u>";
      }), e = e.replace(/\b__(\S[\s\S]*?)__\b/g, function(a, s) {
        return "<u>" + s + "</u>";
      })) : (e = e.replace(/___(\S[\s\S]*?)___/g, function(a, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a;
      }), e = e.replace(/__(\S[\s\S]*?)__/g, function(a, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a;
      })), e = e.replace(/(_)/g, r.helper.escapeCharactersCallback), e = d.converter._dispatch("underline.after", e, u, d)), e;
    }), r.subParser("unescapeSpecialChars", function(e, u, d) {
      "use strict";
      return e = d.converter._dispatch("unescapeSpecialChars.before", e, u, d), e = e.replace(/¨E(\d+)E/g, function(a, s) {
        var i = parseInt(s);
        return String.fromCharCode(i);
      }), e = d.converter._dispatch("unescapeSpecialChars.after", e, u, d), e;
    }), r.subParser("makeMarkdown.blockquote", function(e, u) {
      "use strict";
      var d = "";
      if (e.hasChildNodes())
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i) {
          var c = r.subParser("makeMarkdown.node")(a[i], u);
          c !== "" && (d += c);
        }
      return d = d.trim(), d = "> " + d.split(`
`).join(`
> `), d;
    }), r.subParser("makeMarkdown.codeBlock", function(e, u) {
      "use strict";
      var d = e.getAttribute("language"), a = e.getAttribute("precodenum");
      return "```" + d + `
` + u.preList[a] + "\n```";
    }), r.subParser("makeMarkdown.codeSpan", function(e) {
      "use strict";
      return "`" + e.innerHTML + "`";
    }), r.subParser("makeMarkdown.emphasis", function(e, u) {
      "use strict";
      var d = "";
      if (e.hasChildNodes()) {
        d += "*";
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r.subParser("makeMarkdown.node")(a[i], u);
        d += "*";
      }
      return d;
    }), r.subParser("makeMarkdown.header", function(e, u, d) {
      "use strict";
      var a = new Array(d + 1).join("#"), s = "";
      if (e.hasChildNodes()) {
        s = a + " ";
        for (var i = e.childNodes, c = i.length, t = 0; t < c; ++t)
          s += r.subParser("makeMarkdown.node")(i[t], u);
      }
      return s;
    }), r.subParser("makeMarkdown.hr", function() {
      "use strict";
      return "---";
    }), r.subParser("makeMarkdown.image", function(e) {
      "use strict";
      var u = "";
      return e.hasAttribute("src") && (u += "![" + e.getAttribute("alt") + "](", u += "<" + e.getAttribute("src") + ">", e.hasAttribute("width") && e.hasAttribute("height") && (u += " =" + e.getAttribute("width") + "x" + e.getAttribute("height")), e.hasAttribute("title") && (u += ' "' + e.getAttribute("title") + '"'), u += ")"), u;
    }), r.subParser("makeMarkdown.links", function(e, u) {
      "use strict";
      var d = "";
      if (e.hasChildNodes() && e.hasAttribute("href")) {
        var a = e.childNodes, s = a.length;
        d = "[";
        for (var i = 0; i < s; ++i)
          d += r.subParser("makeMarkdown.node")(a[i], u);
        d += "](", d += "<" + e.getAttribute("href") + ">", e.hasAttribute("title") && (d += ' "' + e.getAttribute("title") + '"'), d += ")";
      }
      return d;
    }), r.subParser("makeMarkdown.list", function(e, u, d) {
      "use strict";
      var a = "";
      if (!e.hasChildNodes())
        return "";
      for (var s = e.childNodes, i = s.length, c = e.getAttribute("start") || 1, t = 0; t < i; ++t)
        if (!(typeof s[t].tagName > "u" || s[t].tagName.toLowerCase() !== "li")) {
          var p = "";
          d === "ol" ? p = c.toString() + ". " : p = "- ", a += p + r.subParser("makeMarkdown.listItem")(s[t], u), ++c;
        }
      return a += `
<!-- -->
`, a.trim();
    }), r.subParser("makeMarkdown.listItem", function(e, u) {
      "use strict";
      for (var d = "", a = e.childNodes, s = a.length, i = 0; i < s; ++i)
        d += r.subParser("makeMarkdown.node")(a[i], u);
      return /\n$/.test(d) ? d = d.split(`
`).join(`
    `).replace(/^ {4}$/gm, "").replace(/\n\n+/g, `

`) : d += `
`, d;
    }), r.subParser("makeMarkdown.node", function(e, u, d) {
      "use strict";
      d = d || false;
      var a = "";
      if (e.nodeType === 3)
        return r.subParser("makeMarkdown.txt")(e, u);
      if (e.nodeType === 8)
        return "<!--" + e.data + `-->

`;
      if (e.nodeType !== 1)
        return "";
      var s = e.tagName.toLowerCase();
      switch (s) {
        case "h1":
          d || (a = r.subParser("makeMarkdown.header")(e, u, 1) + `

`);
          break;
        case "h2":
          d || (a = r.subParser("makeMarkdown.header")(e, u, 2) + `

`);
          break;
        case "h3":
          d || (a = r.subParser("makeMarkdown.header")(e, u, 3) + `

`);
          break;
        case "h4":
          d || (a = r.subParser("makeMarkdown.header")(e, u, 4) + `

`);
          break;
        case "h5":
          d || (a = r.subParser("makeMarkdown.header")(e, u, 5) + `

`);
          break;
        case "h6":
          d || (a = r.subParser("makeMarkdown.header")(e, u, 6) + `

`);
          break;
        case "p":
          d || (a = r.subParser("makeMarkdown.paragraph")(e, u) + `

`);
          break;
        case "blockquote":
          d || (a = r.subParser("makeMarkdown.blockquote")(e, u) + `

`);
          break;
        case "hr":
          d || (a = r.subParser("makeMarkdown.hr")(e, u) + `

`);
          break;
        case "ol":
          d || (a = r.subParser("makeMarkdown.list")(e, u, "ol") + `

`);
          break;
        case "ul":
          d || (a = r.subParser("makeMarkdown.list")(e, u, "ul") + `

`);
          break;
        case "precode":
          d || (a = r.subParser("makeMarkdown.codeBlock")(e, u) + `

`);
          break;
        case "pre":
          d || (a = r.subParser("makeMarkdown.pre")(e, u) + `

`);
          break;
        case "table":
          d || (a = r.subParser("makeMarkdown.table")(e, u) + `

`);
          break;
        case "code":
          a = r.subParser("makeMarkdown.codeSpan")(e, u);
          break;
        case "em":
        case "i":
          a = r.subParser("makeMarkdown.emphasis")(e, u);
          break;
        case "strong":
        case "b":
          a = r.subParser("makeMarkdown.strong")(e, u);
          break;
        case "del":
          a = r.subParser("makeMarkdown.strikethrough")(e, u);
          break;
        case "a":
          a = r.subParser("makeMarkdown.links")(e, u);
          break;
        case "img":
          a = r.subParser("makeMarkdown.image")(e, u);
          break;
        default:
          a = e.outerHTML + `

`;
      }
      return a;
    }), r.subParser("makeMarkdown.paragraph", function(e, u) {
      "use strict";
      var d = "";
      if (e.hasChildNodes())
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r.subParser("makeMarkdown.node")(a[i], u);
      return d = d.trim(), d;
    }), r.subParser("makeMarkdown.pre", function(e, u) {
      "use strict";
      var d = e.getAttribute("prenum");
      return "<pre>" + u.preList[d] + "</pre>";
    }), r.subParser("makeMarkdown.strikethrough", function(e, u) {
      "use strict";
      var d = "";
      if (e.hasChildNodes()) {
        d += "~~";
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r.subParser("makeMarkdown.node")(a[i], u);
        d += "~~";
      }
      return d;
    }), r.subParser("makeMarkdown.strong", function(e, u) {
      "use strict";
      var d = "";
      if (e.hasChildNodes()) {
        d += "**";
        for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
          d += r.subParser("makeMarkdown.node")(a[i], u);
        d += "**";
      }
      return d;
    }), r.subParser("makeMarkdown.table", function(e, u) {
      "use strict";
      var d = "", a = [[], []], s = e.querySelectorAll("thead>tr>th"), i = e.querySelectorAll("tbody>tr"), c, t;
      for (c = 0; c < s.length; ++c) {
        var p = r.subParser("makeMarkdown.tableCell")(s[c], u), l = "---";
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
          typeof n[t] < "u" && (f = r.subParser("makeMarkdown.tableCell")(n[t], u)), a[h].push(f);
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
          c === 1 ? a[c][t].slice(-1) === ":" ? a[c][t] = r.helper.padEnd(a[c][t].slice(-1), _ - 1, "-") + ":" : a[c][t] = r.helper.padEnd(a[c][t], _, "-") : a[c][t] = r.helper.padEnd(a[c][t], _);
        d += "| " + a[c].join(" | ") + ` |
`;
      }
      return d.trim();
    }), r.subParser("makeMarkdown.tableCell", function(e, u) {
      "use strict";
      var d = "";
      if (!e.hasChildNodes())
        return "";
      for (var a = e.childNodes, s = a.length, i = 0; i < s; ++i)
        d += r.subParser("makeMarkdown.node")(a[i], u, true);
      return d.trim();
    }), r.subParser("makeMarkdown.txt", function(e) {
      "use strict";
      var u = e.nodeValue;
      return u = u.replace(/ +/g, " "), u = u.replace(/¨NBSP;/g, " "), u = r.helper.unescapeHTMLEntities(u), u = u.replace(/([*_~|`])/g, "\\$1"), u = u.replace(/^(\s*)>/g, "\\$1>"), u = u.replace(/^#/gm, "\\#"), u = u.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3"), u = u.replace(/^( {0,3}\d+)\./gm, "$1\\."), u = u.replace(/^( {0,3})([+-])/gm, "$1\\$2"), u = u.replace(/]([\s]*)\(/g, "\\]$1\\("), u = u.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:"), u;
    });
    var re = this;
    typeof define == "function" && define.amd ? define(function() {
      "use strict";
      return r;
    }) : typeof $ < "u" && $.exports ? $.exports = r : re.showdown = r;
  }).call(X);
});
var A = {};
fe(A, { default: () => he });
var oe = Q(q());
B(A, Q(q()));
var { default: J, ...le } = oe;
var he = J !== void 0 ? J : le;

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

// main/actions/show_toast.js
var toastOn = css2``;
var toastify = css2`
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
var toastClose = css2`
    background: transparent;
    border: 0;
    color: white;
    cursor: pointer;
    font-family: inherit;
    font-size: 1em;
    opacity: 0.4;
    padding: 0 5px;
`;
var toastifyRight = css2`
    right: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyLeft = css2`
    left: 15px;
    @media only screen and (max-width: 360px) {
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
    }
`;
var toastifyTop = css2`
    top: 50px;
`;
var toastifyBottom = css2`
    bottom: 50px;
`;
var toastifyRounded = css2`
    border-radius: 25px;
`;
var toastifyAvatar = css2`
    width: 1.5em;
    height: 1.5em;
    margin: -7px 5px;
    border-radius: 2px;
`;
var toastifyCenter = css2`
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
var columnClass = css2`
            display: flex;
            flex-direction: column;
            transition: all 0.4s ease-in-out 0s;
        `;
function Column({ verticalAlignment, horizontalAlignment, children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(columnClass, arg.class);
  const justify = translateAlignment(verticalAlignment || "top");
  const align = translateAlignment(horizontalAlignment || "left");
  const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment;
  arg = setup_styles_default(arg, `
                display: flex;
                flex-direction: column;
                transition: all 0.4s ease-in-out 0s;
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `);
  return /* @__PURE__ */ html("div", { ...arg }, children);
}
var rowClass = css2`
            display: flex;
            flex-direction: row;
            transition: all 0.4s ease-in-out 0s;
        `;
function Row({ verticalAlignment, horizontalAlignment, children, ...arg }) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(rowClass, arg.class);
  const justify = translateAlignment(horizontalAlignment || "left");
  const align = translateAlignment(verticalAlignment || "top");
  const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment;
  arg = setup_styles_default(arg, `
                display: flex;
                flex-direction: row;
                transition: all 0.4s ease-in-out 0s;
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `);
  return /* @__PURE__ */ html("div", { ...arg }, children);
}
var codeClass = css2`
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
  return /* @__PURE__ */ html("code", { ...arg }, children);
}
var inputClass = css2`
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            overflow: visible;
        `;
function Input(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(inputClass, arg.class);
  arg = setup_styles_default(arg, `
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                overflow: visible;
            `);
  return /* @__PURE__ */ html("input", { ...arg });
}
var buttonClass = css2`
            border-radius: 0;
            margin: 0;
            font-family: inherit;
            font-size: inherit;
            line-height: inherit;
            -webkit-appearance: button;
            overflow: visible;
            text-transform: none;
        `;
function Button(arg) {
  arg = setup_class_styles_default(arg);
  arg.class = combine_classes_default(buttonClass, arg.class);
  arg = setup_styles_default(arg, `
                border-radius: 0;
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                line-height: inherit;
                -webkit-appearance: button;
                overflow: visible;
                text-transform: none;
            `);
  return /* @__PURE__ */ html("button", { ...arg }, arg.children);
}
var checkboxClass = css2`
            box-sizing: border-box;
            padding: 0;
        `;
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
var dropdownPlaceholder = css2`
            overflow: visible;
        `;
var dropdownList = css2`
            overflow: auto;
            height: fit-content;
            max-height: 50vh;
        `;
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
  css2 as css,
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
