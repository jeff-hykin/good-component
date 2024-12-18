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
      if (children && children.some(function(element, index) {
        return length2 = index, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span") ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span") ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
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
function stringify(element, index, children, callback) {
  switch (element.type) {
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      element.value = element.props.join(",");
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(element.props, function(value) {
              switch (match(value, /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  return serialize([copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] })], callback);
                case "::placeholder":
                  return serialize([
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }),
                    copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] })
                  ], callback);
              }
              return "";
            });
      }
  }
}
function namespace(element) {
  switch (element.type) {
    case RULESET:
      element.props = element.props.map(function(value) {
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
                  element = value2;
                  return sizeof(children) > 1 ? "" : value2;
                case (index = sizeof(children) - 1):
                case 2:
                  return index === 2 ? value2 + element + element : value2 + element;
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
  var compat = function compat2(element) {
    if (element.type !== "rule" || !element.parent || element.length < 1) {
      return;
    }
    var value = element.value, parent = element.parent;
    var isImplicitRule = element.column === parent.column && element.line === parent.line;
    while (parent.type !== "rule") {
      parent = parent.parent;
      if (!parent)
        return;
    }
    if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
      return;
    }
    if (isImplicitRule) {
      return;
    }
    fixedElements.set(element, true);
    var points = [];
    var rules = getRules(value, points);
    var parentRules = parent.props;
    for (var i = 0, k = 0; i < rules.length; i++) {
      for (var j = 0; j < parentRules.length; j++, k++) {
        element.props[k] = points[i] ? rules[i].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i];
      }
    }
  };
  var removeLabel = function removeLabel2(element) {
    if (element.type === "decl") {
      var value = element.value;
      if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
        element["return"] = "";
        element.value = "";
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
  var prefixer2 = function prefixer22(element, index, children, callback) {
    if (element.length > -1) {
      if (!element["return"])
        switch (element.type) {
          case stylis.DECLARATION:
            element["return"] = prefix2(element.value, element.length);
            break;
          case stylis.KEYFRAMES:
            return stylis.serialize([stylis.copy(element, {
              value: stylis.replace(element.value, "@", "@" + stylis.WEBKIT)
            })], callback);
          case stylis.RULESET:
            if (element.length)
              return stylis.combine(element.props, function(value) {
                switch (stylis.match(value, /(::plac\w+|:read-\w+)/)) {
                  case ":read-only":
                  case ":read-write":
                    return stylis.serialize([stylis.copy(element, {
                      props: [stylis.replace(value, /:(read-\w+)/, ":" + stylis.MOZ + "$1")]
                    })], callback);
                  case "::placeholder":
                    return stylis.serialize([stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.WEBKIT + "input-$1")]
                    }), stylis.copy(element, {
                      props: [stylis.replace(value, /:(plac\w+)/, ":" + stylis.MOZ + "$1")]
                    }), stylis.copy(element, {
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
    var key = options.key;
    if (isBrowser && key === "css") {
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
      Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node2) {
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
      var serverStylisCache = getServerStylisCache(stylisPlugins)(key);
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
      key,
      sheet: new sheet.StyleSheet({
        key,
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
  var processStyleValue = function processStyleValue2(key, value) {
    switch (key) {
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
    if (unitless__default["default"][key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
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
  var serializeStyles2 = function serializeStyles3(args, registered, mergedProps) {
    if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
      return args[0];
    }
    var stringMode = true;
    var styles = "";
    cursor = void 0;
    var strings = args[0];
    if (strings == null || strings.raw === void 0) {
      stringMode = false;
      styles += handleInterpolation(mergedProps, registered, strings);
    } else {
      styles += strings[0];
    }
    for (var i = 1; i < args.length; i++) {
      styles += handleInterpolation(mergedProps, registered, args[i]);
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
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      var serialized = serialize2.serializeStyles(args, cache22.registered, void 0);
      utils.insertStyles(cache22, serialized, false);
      return cache22.key + "-" + serialized.name;
    };
    var keyframes2 = function keyframes22() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      var serialized = serialize2.serializeStyles(args, cache22.registered);
      var animation = "animation-" + serialized.name;
      insertWithoutScoping(cache22, {
        name: serialized.name,
        styles: "@keyframes " + animation + "{" + serialized.styles + "}"
      });
      return animation;
    };
    var injectGlobal2 = function injectGlobal22() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      var serialized = serialize2.serializeStyles(args, cache22.registered);
      insertWithoutScoping(cache22, serialized);
    };
    var cx2 = function cx22() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return merge2(cache22.registered, css2, classnames(args));
    };
    return {
      css: css2,
      cx: cx2,
      injectGlobal: injectGlobal2,
      keyframes: keyframes2,
      hydrate: function hydrate2(ids) {
        ids.forEach(function(key) {
          cache22.inserted[key] = true;
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
  var classnames = function classnames2(args) {
    var cls = "";
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
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

// main/helpers/hover_style_helper.js
var hoverStyleHelper = ({ element, hoverStyle }) => {
  if (hoverStyle) {
    let hoverStyleAlreadyActive = false;
    const helper = document.createElement("div");
    const hoverStyleAsString = `${css(hoverStyle)}`;
    helper.style.cssText = hoverStyleAsString;
    const styleObject = {};
    const keys = Object.values(helper.style);
    for (const key of keys) {
      styleObject[key] = helper.style[key];
    }
    const valuesBefore = {};
    element.addEventListener("mouseover", () => {
      if (!hoverStyleAlreadyActive) {
        hoverStyleAlreadyActive = true;
        for (const key of keys) {
          valuesBefore[key] = element.style[key];
        }
        element.style.cssText += hoverStyleAsString;
      }
    });
    element.addEventListener("mouseout", () => {
      if (hoverStyleAlreadyActive) {
        hoverStyleAlreadyActive = false;
        const style = element.style;
        const mixinStyleObject = {};
        for (const [key, value] of Object.entries(styleObject)) {
          if (style[key] == value) {
            mixinStyleObject[key] = valuesBefore[key];
          }
        }
        const mixinStyles = `${css(mixinStyleObject)}`;
        style.cssText += mixinStyles;
        Object.assign(style, mixinStyleObject);
      }
    });
  }
};
var hover_style_helper_default = hoverStyleHelper;
export {
  hover_style_helper_default as default
};
