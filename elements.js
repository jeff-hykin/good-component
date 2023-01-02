// deno-fmt-ignore-file
// deno-lint-ignore-file
// This code was bundled using `deno bundle` and it's not recommended to edit it manually

[
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
].filter((each)=>each
);
Object.getOwnPropertyDescriptors;
const allKeyDescriptions = function(value, options = {
    includingBuiltin: false
}) {
    var { includingBuiltin  } = {
        ...options
    };
    let descriptions = [];
    if (value == null) {
        return {};
    }
    if (!(value instanceof Object)) {
        value = Object.getPrototypeOf(value);
    }
    const rootPrototype = Object.getPrototypeOf({});
    let prevObj;
    while(value && value != prevObj){
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
Object.getPrototypeOf(new Map().keys());
Object.getPrototypeOf(new Set().keys());
let GeneratorFunction = class {
};
let AsyncGeneratorFunction = class {
};
try {
    GeneratorFunction = eval("((function*(){})()).constructor");
    AsyncGeneratorFunction = eval("((async function*(){})()).constructor");
} catch (error) {}
Symbol.for("deepCopy");
Symbol();
const getThis = Symbol();
Object.getPrototypeOf(function() {})[getThis] = function() {
    return this;
};
var e = "", t = "";
function o(r1) {
    var p1, a1, l2, s, c1 = arguments, i1 = this, n = 0, d = [], h = 0, u = [], f = 0;
    d.root = !0;
    var g = function(e1, o1, r2) {
        void 0 === o1 && (o1 = []);
        var p2 = 0;
        return (e1 = r2 || e1 !== t ? e1.replace(/\ue001/g, (e)=>u[f++]
        ) : u[f++].slice(1, -1)) ? (e1.replace(/\ue000/g, (t, r3)=>(r3 && o1.push(e1.slice(p2, r3)), p2 = r3 + 1, o1.push(c1[++h]))
        ), p2 < e1.length && o1.push(e1.slice(p2)), o1.length > 1 ? o1 : o1[0]) : e1;
    }, m = ()=>{
        [d, s, ...p1] = d, d.push(i1(s, ...p1));
    };
    return r1.join(e).replace(/<!--[^]*-->/g, "").replace(/<!\[CDATA\[[^]*\]\]>/g, "").replace(/('|")[^\1]*?\1/g, (e2)=>(u.push(e2), t)
    ).replace(/\s+/g, " ").replace(/(?:^|>)([^<]*)(?:$|<)/g, (e3, t1, r4, p3)=>{
        var c, i2;
        if (r4 && p3.slice(n, r4).replace(/(\S)\/$/, "$1 /").split(" ").map((e4, t2)=>{
            if ("/" === e4[0]) c = i2 || e4.slice(1) || 1;
            else if (t2) {
                if (e4) {
                    var r5 = d[2] || (d[2] = {});
                    "..." === e4.slice(0, 3) ? Object.assign(r5, arguments[++h]) : ([a1, l2] = e4.split("="), r5[g(a1)] = !l2 || g(l2));
                }
            } else {
                for(i2 = g(e4); o.close[d[1] + i2];)m();
                d = [
                    d,
                    i2,
                    null
                ], o.empty[i2] && (c = i2);
            }
        }), c) for(m(); s !== c && o.close[s];)m();
        n = r4 + e3.length, t1 && " " !== t1 && g((s = 0, t1), d, !0);
    }), d.root || m(), d.length > 1 ? d : d[0];
}
o.empty = {}, o.close = {}, "area base br col command embed hr img input keygen link meta param source track wbr ! !doctype ? ?xml".split(" ").map((e5)=>o.empty[e5] = o.empty[e5.toUpperCase()] = !0
);
var r = {
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
}, p = function(e6) {
    [
        ...r[e6].split(" "),
        e6
    ].map((t3)=>{
        o.close[e6] = o.close[e6.toUpperCase()] = o.close[e6 + t3] = o.close[e6.toUpperCase() + t3] = o.close[e6 + t3.toUpperCase()] = o.close[e6.toUpperCase() + t3.toUpperCase()] = !0;
    });
};
for(var a in r)p(a);
const xhtm = o;
const validStyleAttribute = Object.freeze(new Set([
    "accent-color",
    "align-content",
    "align-items",
    "align-self",
    "align-tracks",
    "all",
    "animation",
    "animation-delay",
    "animation-direction",
    "animation-duration",
    "animation-fill-mode",
    "animation-iteration-count",
    "animation-name",
    "animation-play-state",
    "animation-timeline",
    "animation-timing-function",
    "appearance",
    "ascent-override",
    "aspect-ratio",
    "backdrop-filter",
    "backface-visibility",
    "background",
    "background-attachment",
    "background-blend-mode",
    "background-clip",
    "background-color",
    "background-image",
    "background-origin",
    "background-position",
    "background-position-x",
    "background-position-y",
    "background-repeat",
    "background-size",
    "bleed",
    "block-overflow",
    "block-size",
    "border",
    "border-block",
    "border-block-color",
    "border-block-end",
    "border-block-end-color",
    "border-block-end-style",
    "border-block-end-width",
    "border-block-start",
    "border-block-start-color",
    "border-block-start-style",
    "border-block-start-width",
    "border-block-style",
    "border-block-width",
    "border-bottom",
    "border-bottom-color",
    "border-bottom-left-radius",
    "border-bottom-right-radius",
    "border-bottom-style",
    "border-bottom-width",
    "border-collapse",
    "border-color",
    "border-end-end-radius",
    "border-end-start-radius",
    "border-image",
    "border-image-outset",
    "border-image-repeat",
    "border-image-slice",
    "border-image-source",
    "border-image-width",
    "border-inline",
    "border-inline-color",
    "border-inline-end",
    "border-inline-end-color",
    "border-inline-end-style",
    "border-inline-end-width",
    "border-inline-start",
    "border-inline-start-color",
    "border-inline-start-style",
    "border-inline-start-width",
    "border-inline-style",
    "border-inline-width",
    "border-left",
    "border-left-color",
    "border-left-style",
    "border-left-width",
    "border-radius",
    "border-right",
    "border-right-color",
    "border-right-style",
    "border-right-width",
    "border-spacing",
    "border-start-end-radius",
    "border-start-start-radius",
    "border-style",
    "border-top",
    "border-top-color",
    "border-top-left-radius",
    "border-top-right-radius",
    "border-top-style",
    "border-top-width",
    "border-width",
    "bottom",
    "box-decoration-break",
    "box-shadow",
    "box-sizing",
    "break-after",
    "break-before",
    "break-inside",
    "caption-side",
    "caret-color",
    "clear",
    "clip",
    "clip-path",
    "color",
    "color-scheme",
    "column-count",
    "column-fill",
    "column-gap",
    "column-rule",
    "column-rule-color",
    "column-rule-style",
    "column-rule-width",
    "column-span",
    "column-width",
    "columns",
    "contain",
    "content",
    "content-visibility",
    "counter-increment",
    "counter-reset",
    "counter-set",
    "cursor",
    "length",
    "angle",
    "descent-override",
    "direction",
    "display",
    "resolution",
    "empty-cells",
    "fallback",
    "filter",
    "flex",
    "flex-basis",
    "flex-direction",
    "flex-flow",
    "flex-grow",
    "flex-shrink",
    "flex-wrap",
    "flex_value",
    "float",
    "font",
    "font-display",
    "font-family",
    "font-feature-settings",
    "font-kerning",
    "font-language-override",
    "font-optical-sizing",
    "font-size",
    "font-size-adjust",
    "font-stretch",
    "font-style",
    "font-synthesis",
    "font-variant",
    "font-variant-alternates",
    "font-variant-caps",
    "font-variant-east-asian",
    "font-variant-ligatures",
    "font-variant-numeric",
    "font-variant-position",
    "font-variation-settings",
    "font-weight",
    "forced-color-adjust",
    "gap",
    "grid",
    "grid-area",
    "grid-auto-columns",
    "grid-auto-flow",
    "grid-auto-rows",
    "grid-column",
    "grid-column-end",
    "grid-column-start",
    "grid-row",
    "grid-row-end",
    "grid-row-start",
    "grid-template",
    "grid-template-areas",
    "grid-template-columns",
    "grid-template-rows",
    "frequency",
    "hanging-punctuation",
    "height",
    "hyphenate-character",
    "hyphens",
    "image-orientation",
    "image-rendering",
    "image-resolution",
    "inherit",
    "inherits",
    "initial",
    "initial-letter",
    "initial-letter-align",
    "initial-value",
    "inline-size",
    "input-security",
    "inset",
    "inset-block",
    "inset-block-end",
    "inset-block-start",
    "inset-inline",
    "inset-inline-end",
    "inset-inline-start",
    "isolation",
    "justify-content",
    "justify-items",
    "justify-self",
    "justify-tracks",
    "left",
    "letter-spacing",
    "line-break",
    "line-clamp",
    "line-gap-override",
    "line-height",
    "line-height-step",
    "list-style",
    "list-style-image",
    "list-style-position",
    "list-style-type",
    "margin",
    "margin-block",
    "margin-block-end",
    "margin-block-start",
    "margin-bottom",
    "margin-inline",
    "margin-inline-end",
    "margin-inline-start",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin-trim",
    "marks",
    "mask",
    "mask-border",
    "mask-border-mode",
    "mask-border-outset",
    "mask-border-repeat",
    "mask-border-slice",
    "mask-border-source",
    "mask-border-width",
    "mask-clip",
    "mask-composite",
    "mask-image",
    "mask-mode",
    "mask-origin",
    "mask-position",
    "mask-repeat",
    "mask-size",
    "mask-type",
    "masonry-auto-flow",
    "math-style",
    "max-block-size",
    "max-height",
    "max-inline-size",
    "max-lines",
    "max-width",
    "max-zoom",
    "min-block-size",
    "min-height",
    "min-inline-size",
    "min-width",
    "min-zoom",
    "mix-blend-mode",
    "time",
    "negative",
    "object-fit",
    "object-position",
    "offset",
    "offset-anchor",
    "offset-distance",
    "offset-path",
    "offset-position",
    "offset-rotate",
    "opacity",
    "order",
    "orientation",
    "orphans",
    "outline",
    "outline-color",
    "outline-offset",
    "outline-style",
    "outline-width",
    "overflow",
    "overflow-anchor",
    "overflow-block",
    "overflow-clip-margin",
    "overflow-inline",
    "overflow-wrap",
    "overflow-x",
    "overflow-y",
    "overscroll-behavior",
    "overscroll-behavior-block",
    "overscroll-behavior-inline",
    "overscroll-behavior-x",
    "overscroll-behavior-y",
    "Pseudo-classes",
    "Pseudo-elements",
    "pad",
    "padding",
    "padding-block",
    "padding-block-end",
    "padding-block-start",
    "padding-bottom",
    "padding-inline",
    "padding-inline-end",
    "padding-inline-start",
    "padding-left",
    "padding-right",
    "padding-top",
    "page-break-after",
    "page-break-before",
    "page-break-inside",
    "paint-order",
    "perspective",
    "perspective-origin",
    "place-content",
    "place-items",
    "place-self",
    "pointer-events",
    "position",
    "prefix",
    "print-color-adjust",
    "quotes",
    "range",
    "resize",
    "revert",
    "right",
    "rotate",
    "row-gap",
    "ruby-align",
    "ruby-merge",
    "ruby-position",
    "scale",
    "scroll-behavior",
    "scroll-margin",
    "scroll-margin-block",
    "scroll-margin-block-end",
    "scroll-margin-block-start",
    "scroll-margin-bottom",
    "scroll-margin-inline",
    "scroll-margin-inline-end",
    "scroll-margin-inline-start",
    "scroll-margin-left",
    "scroll-margin-right",
    "scroll-margin-top",
    "scroll-padding",
    "scroll-padding-block",
    "scroll-padding-block-end",
    "scroll-padding-block-start",
    "scroll-padding-bottom",
    "scroll-padding-inline",
    "scroll-padding-inline-end",
    "scroll-padding-inline-start",
    "scroll-padding-left",
    "scroll-padding-right",
    "scroll-padding-top",
    "scroll-snap-align",
    "scroll-snap-stop",
    "scroll-snap-type",
    "scrollbar-color",
    "scrollbar-gutter",
    "scrollbar-width",
    "shape-image-threshold",
    "shape-margin",
    "shape-outside",
    "size",
    "size-adjust",
    "speak-as",
    "src",
    "suffix",
    "symbols",
    "syntax",
    "system",
    "tab-size",
    "table-layout",
    "text-align",
    "text-align-last",
    "text-combine-upright",
    "text-decoration",
    "text-decoration-color",
    "text-decoration-line",
    "text-decoration-skip",
    "text-decoration-skip-ink",
    "text-decoration-style",
    "text-decoration-thickness",
    "text-emphasis",
    "text-emphasis-color",
    "text-emphasis-position",
    "text-emphasis-style",
    "text-indent",
    "text-justify",
    "text-orientation",
    "text-overflow",
    "text-rendering",
    "text-shadow",
    "text-size-adjust",
    "text-transform",
    "text-underline-offset",
    "text-underline-position",
    "top",
    "touch-action",
    "transform",
    "transform-box",
    "transform-origin",
    "transform-style",
    "transition",
    "transition-delay",
    "transition-duration",
    "transition-property",
    "transition-timing-function",
    "translate",
    "unicode-bidi",
    "unicode-range",
    "unset",
    "user-select",
    "user-zoom",
    "vertical-align",
    "viewport-fit",
    "visibility",
    "white-space",
    "widows",
    "width",
    "will-change",
    "word-break",
    "word-spacing",
    "word-wrap",
    "writing-mode",
    "z-index",
    "zoom"
]));
const validNonCallbackHtmlAttributes = Object.freeze(new Set([
    "class",
    "style",
    "value",
    "id",
    "contenteditable",
    "href",
    "hidden",
    "autofocus",
    "src",
    "name",
    "accept",
    "accesskey",
    "action",
    "align",
    "alt",
    "async",
    "autocomplete",
    "autoplay",
    "border",
    "charset",
    "checked",
    "cite",
    "cols",
    "colspan",
    "content",
    "controls",
    "coords",
    "data",
    "datetime",
    "default",
    "defer",
    "dir",
    "dirname",
    "disabled",
    "download",
    "draggable",
    "enctype",
    "for",
    "form",
    "formaction",
    "headers",
    "high",
    "hreflang",
    "http",
    "ismap",
    "kind",
    "label",
    "lang",
    "list",
    "loop",
    "low",
    "max",
    "maxlength",
    "media",
    "method",
    "min",
    "multiple",
    "muted",
    "novalidate",
    "open",
    "optimum",
    "pattern",
    "placeholder",
    "poster",
    "preload",
    "readonly",
    "rel",
    "required",
    "reversed",
    "rows",
    "rowspan",
    "sandbox",
    "scope",
    "selected",
    "shape",
    "size",
    "sizes",
    "span",
    "spellcheck",
    "srcdoc",
    "srclang",
    "srcset",
    "start",
    "step",
    "tabindex",
    "target",
    "title",
    "translate",
    "type",
    "usemap",
    "wrap",
    "bgcolor",
    "width",
    "color",
    "height", 
]));
const isValidStyleAttribute = (key)=>key.startsWith('-') || validStyleAttribute.has(key)
;
const kebabCase = (string)=>string.replace(/[a-z]([A-Z])(?=[a-z])/g, (each)=>`${each[0]}-${each.slice(1).toLowerCase()}`
    )
;
const isConstructor = (obj)=>!!obj.prototype && !!obj.prototype.constructor.name
;
const attachProperties = (source, target)=>{
    const attributes = allKeyDescriptions(source);
    const propertiesDefition = {};
    for (const [key, value] of Object.entries(attributes)){
        if ([
            'constructor',
            'prototype',
            'length', 
        ].includes(key)) {
            continue;
        }
        propertiesDefition[key] = {
            get: ()=>source[key]
        };
    }
    Object.defineProperties(target, propertiesDefition);
    return target;
};
class ElementalClass {
    constructor(components = {}, options = {}){
        const { middleware: middleware1 , errorComponentFactory  } = options || {};
        this.components = components || {};
        this.middleware = middleware1 || {};
        this.errorComponentFactory = errorComponentFactory || defaultErrorComponentFactory;
        this.html = this.createElement;
        this.xhtm = xhtm.bind((...args)=>this.createElement(...args)
        );
    }
    static debug = false;
    static allTags = Symbol.for("allTags");
    static exclusivelySvgElements = new Set([
        "svg",
        "animate",
        "animateMotion",
        "animateTransform",
        "circle",
        "clipPath",
        "defs",
        "desc",
        "discard",
        "ellipse",
        "feBlend",
        "feColorMatrix",
        "feComponentTransfer",
        "feComposite",
        "feConvolveMatrix",
        "feDiffuseLighting",
        "feDisplacementMap",
        "feDistantLight",
        "feDropShadow",
        "feFlood",
        "feFuncA",
        "feFuncB",
        "feFuncG",
        "feFuncR",
        "feGaussianBlur",
        "feImage",
        "feMerge",
        "feMergeNode",
        "feMorphology",
        "feOffset",
        "fePointLight",
        "feSpecularLighting",
        "feSpotLight",
        "feTile",
        "feTurbulence",
        "filter",
        "foreignObject",
        "g",
        "hatch",
        "hatchpath",
        "image",
        "line",
        "linearGradient",
        "marker",
        "mask",
        "mesh",
        "meshgradient",
        "meshpatch",
        "meshrow",
        "metadata",
        "mpath",
        "path",
        "pattern",
        "polygon",
        "polyline",
        "radialGradient",
        "rect",
        "set",
        "stop",
        "switch",
        "symbol",
        "text",
        "textPath",
        "tspan",
        "unknown",
        "use",
        "view", 
    ]);
    static randomId = (name)=>`${name}${Math.random()}`.replace(".", "")
    ;
    static appendChildren = function(element, ...children) {
        for (const each of children){
            if (typeof each == 'string') {
                element.appendChild(new window.Text(each));
            } else if (each == null) {
                element.appendChild(new window.Text(""));
            } else if (!(each instanceof Object)) {
                element.appendChild(new window.Text(`${each}`));
            } else if (each instanceof Node) {
                element.appendChild(each);
            } else if (each instanceof Array) {
                ElementalClass.appendChildren(element, ...each);
            } else if (each instanceof Function) {
                ElementalClass.appendChildren(element, each());
            } else if (each instanceof Promise) {
                const elementPromise = each;
                const placeholder = elementPromise.placeholder || document.createElement("div");
                setTimeout(async ()=>placeholder.replaceWith(await elementPromise)
                , 0);
                element.appendChild(placeholder);
            } else if (each != null && each instanceof Object) {
                element.appendChild(each);
            }
        }
        return element;
    };
    static css = function(first, ...args) {
        if (typeof first == 'string') {
            return first;
        } else if (first == null) {
            return "";
        } else if (first instanceof Array) {
            const strings = first;
            const values = args;
            let finalString = "";
            for (const each of strings){
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
            for (const [key, value] of Object.entries(first)){
                if (value != null) {
                    finalString += `${kebabCase(key)}: ${value};`;
                }
            }
            return finalString;
        } else {
            return first;
        }
    };
    static combineClasses = (...classes)=>{
        classes = classes.filter((each)=>each != null
        );
        let classesFinalList = [];
        for (let eachEntry of classes){
            if (typeof eachEntry == 'string') {
                eachEntry = eachEntry.split(" ");
            }
            if (eachEntry instanceof Array) {
                eachEntry = eachEntry.flat(Infinity);
                for (let eachName of eachEntry){
                    classesFinalList.push(eachName);
                }
            } else if (eachEntry instanceof Object) {
                for (const [className, enabled] of Object.entries(eachEntry)){
                    if (enabled) {
                        classesFinalList.push(className);
                    }
                }
            }
        }
        return classesFinalList;
    };
    createElement(...args) {
        if (args[0] instanceof Array) {
            return this.xhtm(...args);
        } else {
            ElementalClass.debug && console.debug(`args is:`, args);
            for (const middleware of (this.middleware[ElementalClass.allTags] || []).concat(this.middleware[args[0]] || [])){
                try {
                    args = eachMiddleWare(args);
                } catch (error) {
                    console.error("[ElementalClass] one of the middleware functions failed:", eachMiddleWare, args);
                }
            }
            let [key, properties, ...children] = args;
            ElementalClass.debug && console.debug(`key, properties, children is:`, key, properties, children);
            if (this.components[key] instanceof Function) {
                key = this.components[key];
            }
            if (key instanceof Function) {
                let output;
                try {
                    output = isConstructor(key) ? new key({
                        ...properties,
                        children
                    }) : key({
                        ...properties,
                        children
                    });
                } catch (error1) {
                    return this.errorComponentFactory({
                        ...properties,
                        children
                    }, key, error1);
                }
                if (output instanceof Promise) {
                    const elementPromise = output;
                    const placeholder = elementPromise.placeholder || document.createElement("div");
                    setTimeout(async ()=>placeholder.replaceWith(await elementPromise)
                    , 0);
                    return placeholder;
                } else {
                    return output;
                }
            }
            const isSvg = ElementalClass.exclusivelySvgElements.has(key);
            const element = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', key) : document.createElement(key);
            let styleString = "";
            if (properties instanceof Object) {
                for (let [key, value] of Object.entries(properties)){
                    if (key == 'style') {
                        styleString += ElementalClass.css(value);
                        continue;
                    }
                    if (key.slice(0, 2) == 'on' && value instanceof Function) {
                        element.addEventListener(key.slice(2).toLowerCase(), value);
                    }
                    if (key == 'class') {
                        if (value instanceof Array) {
                            value = value.join(" ");
                        } else if (value instanceof Object) {
                            let newValue = "";
                            for (const [classString, enable] of Object.entries(value)){
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
                        element.setAttribute(kebabCase(key), value);
                        continue;
                    }
                    if (value != null && !(value instanceof Object) && validNonCallbackHtmlAttributes.has(key)) {
                        element.setAttribute(key, value);
                    }
                    try {
                        element[key] = value;
                    } catch (error) {}
                    if (isValidStyleAttribute(key)) {
                        styleString += `;${key}: ${value};`;
                    }
                }
            }
            if (styleString) {
                element.setAttribute("style", styleString);
            }
            return ElementalClass.appendChildren(element, ...children);
        }
    }
    extend(additionalComponents = {}, options = {}) {
        const { middleware: middleware2 , ...other } = options || {};
        return Elemental({
            ...this.components,
            ...additionalComponents
        }, {
            middleware: {
                ...this.middleware,
                ...middleware2
            },
            ...other
        });
    }
}
const Elemental = (...args)=>{
    const elementalObject = new ElementalClass(...args);
    const createElementFunction = elementalObject.createElement.bind(elementalObject);
    attachProperties(ElementalClass, createElementFunction);
    attachProperties(elementalObject, createElementFunction);
    return createElementFunction;
};
attachProperties(ElementalClass, Elemental);
function defaultErrorComponentFactory({ children , ...properties }, key, error2) {
    const element = document.createElement("div");
    const errorDetails = document.createElement("code");
    const childContainer = document.createElement("div");
    element.setAttribute('style', `
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
    element.innerHTML = `I'm sorry, there was an error when loading this part of the page 🙁 `;
    let errorElementPart;
    if (typeof key == 'string') {
        errorElementPart = `<${key} />`;
    } else {
        try {
            errorElementPart = `<${key.prototype.constructor.name} />`;
        } catch (error) {
            try {
                errorElementPart = `<${key.name} />`;
            } catch (error) {
                errorElementPart = `<${key} />`;
            }
        }
    }
    let errorJsonObject = {};
    for (const [key1, value] of Object.entries(properties)){
        try {
            errorJsonObject[key1] = JSON.parse(JSON.stringify(value));
        } catch (error) {
            errorJsonObject[key1] = `${value}`;
        }
    }
    errorDetails.innerHTML = `tag: ${errorElementPart}\nproperties: ${JSON.stringify(errorJsonObject, 0, 4)}\nerror: ${error2}`;
    errorDetails.setAttribute('style', `
        padding: 1rem;
        background-color: #161b22;
        color: #789896;
        white-space: pre;
        max-width: 85vw;
        overflow: auto;
    `);
    element.appendChild(errorDetails);
    childContainer.setAttribute('style', `
        all: unset
        display: flex
        flex-direction: column
        margin-top: 1.3rem
    `);
    ElementalClass.appendChildren(childContainer, children);
    element.appendChild(childContainer);
    return element;
}
try {
    const originalHead = document.head;
    Object.defineProperty(document, "head", {
        set: (element)=>ElementalClass.appendChildren(originalHead, ...element.childNodes)
        ,
        get: ()=>originalHead
        ,
        writable: true
    });
} catch (error3) {}
const combineClasses = ElementalClass.combineClasses;
const html = Elemental();
const css = ElementalClass.css;
ElementalClass.allTags;
function getLengths(b64) {
    const len = b64.length;
    let validLen = b64.indexOf("=");
    if (validLen === -1) {
        validLen = len;
    }
    const placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
function init(lookup2, revLookup2, urlsafe = false) {
    function _byteLength(validLen, placeHoldersLen) {
        return Math.floor((validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen);
    }
    function tripletToBase64(num) {
        return lookup2[num >> 18 & 0x3f] + lookup2[num >> 12 & 0x3f] + lookup2[num >> 6 & 0x3f] + lookup2[num & 0x3f];
    }
    function encodeChunk(buf, start, end) {
        const out = new Array((end - start) / 3);
        for(let i3 = start, curTriplet = 0; i3 < end; i3 += 3){
            out[curTriplet++] = tripletToBase64((buf[i3] << 16) + (buf[i3 + 1] << 8) + buf[i3 + 2]);
        }
        return out.join("");
    }
    return {
        byteLength (b64) {
            return _byteLength.apply(null, getLengths(b64));
        },
        toUint8Array (b64) {
            const [validLen, placeHoldersLen] = getLengths(b64);
            const buf = new Uint8Array(_byteLength(validLen, placeHoldersLen));
            const len = placeHoldersLen ? validLen - 4 : validLen;
            let tmp;
            let curByte = 0;
            let i4;
            for(i4 = 0; i4 < len; i4 += 4){
                tmp = revLookup2[b64.charCodeAt(i4)] << 18 | revLookup2[b64.charCodeAt(i4 + 1)] << 12 | revLookup2[b64.charCodeAt(i4 + 2)] << 6 | revLookup2[b64.charCodeAt(i4 + 3)];
                buf[curByte++] = tmp >> 16 & 0xff;
                buf[curByte++] = tmp >> 8 & 0xff;
                buf[curByte++] = tmp & 0xff;
            }
            if (placeHoldersLen === 2) {
                tmp = revLookup2[b64.charCodeAt(i4)] << 2 | revLookup2[b64.charCodeAt(i4 + 1)] >> 4;
                buf[curByte++] = tmp & 0xff;
            } else if (placeHoldersLen === 1) {
                tmp = revLookup2[b64.charCodeAt(i4)] << 10 | revLookup2[b64.charCodeAt(i4 + 1)] << 4 | revLookup2[b64.charCodeAt(i4 + 2)] >> 2;
                buf[curByte++] = tmp >> 8 & 0xff;
                buf[curByte++] = tmp & 0xff;
            }
            return buf;
        },
        fromUint8Array (buf) {
            const maxChunkLength = 16383;
            const len = buf.length;
            const extraBytes = len % 3;
            const len2 = len - extraBytes;
            const parts = new Array(Math.ceil(len2 / 16383) + (extraBytes ? 1 : 0));
            let curChunk = 0;
            let chunkEnd;
            for(let i5 = 0; i5 < len2; i5 += maxChunkLength){
                chunkEnd = i5 + maxChunkLength;
                parts[curChunk++] = encodeChunk(buf, i5, chunkEnd > len2 ? len2 : chunkEnd);
            }
            let tmp;
            if (extraBytes === 1) {
                tmp = buf[len2];
                parts[curChunk] = lookup2[tmp >> 2] + lookup2[tmp << 4 & 0x3f];
                if (!urlsafe) parts[curChunk] += "==";
            } else if (extraBytes === 2) {
                tmp = buf[len2] << 8 | buf[len2 + 1] & 0xff;
                parts[curChunk] = lookup2[tmp >> 10] + lookup2[tmp >> 4 & 0x3f] + lookup2[tmp << 2 & 0x3f];
                if (!urlsafe) parts[curChunk] += "=";
            }
            return parts.join("");
        }
    };
}
const lookup = [];
const revLookup = [];
const code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(let i = 0, l = code.length; i < l; ++i){
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
}
revLookup["-".charCodeAt(0)] = 62;
revLookup["_".charCodeAt(0)] = 63;
const { byteLength , toUint8Array , fromUint8Array  } = init(lookup, revLookup);
const lookup1 = [];
const revLookup1 = [];
const code1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
for(let i1 = 0, l1 = code1.length; i1 < l1; ++i1){
    lookup1[i1] = code1[i1];
    revLookup1[code1.charCodeAt(i1)] = i1;
}
const { byteLength: byteLength1 , toUint8Array: toUint8Array1 , fromUint8Array: fromUint8Array1  } = init(lookup1, revLookup1, true);
const decoder = new TextDecoder();
const encoder = new TextEncoder();
function toHexString(buf) {
    return buf.reduce((hex, __byte)=>`${hex}${__byte < 16 ? "0" : ""}${__byte.toString(16)}`
    , "");
}
function fromHexString(hex) {
    const len = hex.length;
    if (len % 2 || !/^[0-9a-fA-F]+$/.test(hex)) {
        throw new TypeError("Invalid hex string.");
    }
    hex = hex.toLowerCase();
    const buf = new Uint8Array(Math.floor(len / 2));
    const end = len / 2;
    for(let i6 = 0; i6 < end; ++i6){
        buf[i6] = parseInt(hex.substr(i6 * 2, 2), 16);
    }
    return buf;
}
function decode(buf, encoding = "utf8") {
    if (/^utf-?8$/i.test(encoding)) {
        return decoder.decode(buf);
    } else if (/^base64$/i.test(encoding)) {
        return fromUint8Array(buf);
    } else if (/^base64url$/i.test(encoding)) {
        return fromUint8Array1(buf);
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
class SHA256 {
    hashSize = 32;
    _buf;
    _bufIdx;
    _count;
    _K;
    _H;
    _finalized;
    constructor(){
        this._buf = new Uint8Array(64);
        this._K = new Uint32Array([
            0x428a2f98,
            0x71374491,
            0xb5c0fbcf,
            0xe9b5dba5,
            0x3956c25b,
            0x59f111f1,
            0x923f82a4,
            0xab1c5ed5,
            0xd807aa98,
            0x12835b01,
            0x243185be,
            0x550c7dc3,
            0x72be5d74,
            0x80deb1fe,
            0x9bdc06a7,
            0xc19bf174,
            0xe49b69c1,
            0xefbe4786,
            0x0fc19dc6,
            0x240ca1cc,
            0x2de92c6f,
            0x4a7484aa,
            0x5cb0a9dc,
            0x76f988da,
            0x983e5152,
            0xa831c66d,
            0xb00327c8,
            0xbf597fc7,
            0xc6e00bf3,
            0xd5a79147,
            0x06ca6351,
            0x14292967,
            0x27b70a85,
            0x2e1b2138,
            0x4d2c6dfc,
            0x53380d13,
            0x650a7354,
            0x766a0abb,
            0x81c2c92e,
            0x92722c85,
            0xa2bfe8a1,
            0xa81a664b,
            0xc24b8b70,
            0xc76c51a3,
            0xd192e819,
            0xd6990624,
            0xf40e3585,
            0x106aa070,
            0x19a4c116,
            0x1e376c08,
            0x2748774c,
            0x34b0bcb5,
            0x391c0cb3,
            0x4ed8aa4a,
            0x5b9cca4f,
            0x682e6ff3,
            0x748f82ee,
            0x78a5636f,
            0x84c87814,
            0x8cc70208,
            0x90befffa,
            0xa4506ceb,
            0xbef9a3f7,
            0xc67178f2
        ]);
        this.init();
    }
    init() {
        this._H = new Uint32Array([
            0x6a09e667,
            0xbb67ae85,
            0x3c6ef372,
            0xa54ff53a,
            0x510e527f,
            0x9b05688c,
            0x1f83d9ab,
            0x5be0cd19
        ]);
        this._bufIdx = 0;
        this._count = new Uint32Array(2);
        this._buf.fill(0);
        this._finalized = false;
        return this;
    }
    update(msg, inputEncoding) {
        if (msg === null) {
            throw new TypeError("msg must be a string or Uint8Array.");
        } else if (typeof msg === "string") {
            msg = encode(msg, inputEncoding);
        }
        for(let i7 = 0, len = msg.length; i7 < len; i7++){
            this._buf[this._bufIdx++] = msg[i7];
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
    digest(outputEncoding) {
        if (this._finalized) {
            throw new Error("digest has already been called.");
        }
        this._finalized = true;
        const b = this._buf;
        let idx = this._bufIdx;
        b[idx++] = 0x80;
        while(idx !== 56){
            if (idx === 64) {
                this._transform();
                idx = 0;
            }
            b[idx++] = 0;
        }
        const c = this._count;
        b[56] = c[1] >>> 24 & 0xff;
        b[57] = c[1] >>> 16 & 0xff;
        b[58] = c[1] >>> 8 & 0xff;
        b[59] = c[1] >>> 0 & 0xff;
        b[60] = c[0] >>> 24 & 0xff;
        b[61] = c[0] >>> 16 & 0xff;
        b[62] = c[0] >>> 8 & 0xff;
        b[63] = c[0] >>> 0 & 0xff;
        this._transform();
        const hash2 = new Uint8Array(32);
        for(let i8 = 0; i8 < 8; i8++){
            hash2[(i8 << 2) + 0] = this._H[i8] >>> 24 & 0xff;
            hash2[(i8 << 2) + 1] = this._H[i8] >>> 16 & 0xff;
            hash2[(i8 << 2) + 2] = this._H[i8] >>> 8 & 0xff;
            hash2[(i8 << 2) + 3] = this._H[i8] >>> 0 & 0xff;
        }
        this.init();
        return outputEncoding ? decode(hash2, outputEncoding) : hash2;
    }
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
        let i9;
        for(i9 = 0; i9 < 16; i9++){
            w[i9] = this._buf[(i9 << 2) + 3] | this._buf[(i9 << 2) + 2] << 8 | this._buf[(i9 << 2) + 1] << 16 | this._buf[i9 << 2] << 24;
        }
        for(i9 = 0; i9 < 64; i9++){
            let tmp;
            if (i9 < 16) {
                tmp = w[i9];
            } else {
                let a2 = w[i9 + 1 & 15];
                let b = w[i9 + 14 & 15];
                tmp = w[i9 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i9 & 15] + w[i9 + 9 & 15] | 0;
            }
            tmp = tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + this._K[i9] | 0;
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
}
function sha256(msg, inputEncoding, outputEncoding) {
    return new SHA256().update(msg, inputEncoding).digest(outputEncoding);
}
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
function createCommonjsModule1(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire1(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire1() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionSheet_cjs_prod = createCommonjsModule1(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function sheetForTag(tag) {
        if (tag.sheet) {
            return tag.sheet;
        }
        for(var i10 = 0; i10 < document.styleSheets.length; i10++){
            if (document.styleSheets[i10].ownerNode === tag) {
                return document.styleSheets[i10];
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
    var StyleSheet2 = function() {
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
        _proto.hydrate = function hydrate(nodes) {
            nodes.forEach(this._insertTag);
        };
        _proto.insert = function insert(rule) {
            if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
                this._insertTag(createStyleElement(this));
            }
            var tag = this.tags[this.tags.length - 1];
            if (this.isSpeedy) {
                var sheet1 = sheetForTag(tag);
                try {
                    sheet1.insertRule(rule, sheet1.cssRules.length);
                } catch (e) {}
            } else {
                tag.appendChild(document.createTextNode(rule));
            }
            this.ctr++;
        };
        _proto.flush = function flush() {
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
var emotionSheet_cjs = createCommonjsModule1(function(module) {
    {
        module.exports = emotionSheet_cjs_prod;
    }
});
var StyleSheet = emotionSheet_cjs.StyleSheet;
const mod = {
    StyleSheet: StyleSheet,
    __moduleExports: emotionSheet_cjs,
    default: emotionSheet_cjs
};
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
    return {
        value,
        root,
        parent,
        type,
        props,
        children,
        line,
        column,
        length: length2,
        return: ""
    };
}
function copy(root, props) {
    return assign(node("", null, null, "", null, null, 0), root, {
        length: -root.length
    }, props);
}
function __char() {
    return character;
}
function prev() {
    character = position > 0 ? charat(characters, --position) : 0;
    if (column--, character === 10) column = 1, line--;
    return character;
}
function next() {
    character = position < length ? charat(characters, position++) : 0;
    if (column++, character === 10) column = 1, line++;
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
    switch(type){
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
    while(character = peek())if (character < 33) next();
    else break;
    return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function tokenizer(children) {
    while(next())switch(token(character)){
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
    while(--count && next())if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97) break;
    return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
    while(next())switch(character){
        case type:
            return position;
        case 34:
        case 39:
            if (type !== 34 && type !== 39) delimiter(character);
            break;
        case 40:
            if (type === 41) delimiter(type);
            break;
        case 92:
            next();
            break;
    }
    return position;
}
function commenter(type, index) {
    while(next())if (type + character === 47 + 10) break;
    else if (type + character === 42 + 42 && peek() === 47) break;
    return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
    while(!token(peek()))next();
    return slice(index, position);
}
function compile(value) {
    return dealloc(parse("", null, null, null, [
        ""
    ], value = alloc(value), 0, [
        0
    ], value));
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
    while(scanning)switch(previous = character2, character2 = next()){
        case 40:
            if (previous != 108 && charat(characters2, length2 - 1) == 58) {
                if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1) ampersand = -1;
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
            switch(peek()){
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
            switch(character2){
                case 0:
                case 125:
                    scanning = 0;
                case 59 + offset:
                    if (property > 0 && strlen(characters2) - length2) append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2), declarations);
                    break;
                case 59:
                    characters2 += ";";
                default:
                    append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2), rulesets);
                    if (character2 === 123) if (offset === 0) parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
                    else switch(atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule){
                        case 100:
                        case 109:
                        case 115:
                            parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2), children), rules, children, length2, points, rule ? props : children);
                            break;
                        default:
                            parse(characters2, reference, reference, reference, [
                                ""
                            ], children, 0, points, children);
                    }
            }
            index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
            break;
        case 58:
            length2 = 1 + strlen(characters2), property = previous;
        default:
            if (variable < 1) {
                if (character2 == 123) --variable;
                else if (character2 == 125 && (variable++) == 0 && prev() == 125) continue;
            }
            switch(characters2 += from(character2), character2 * variable){
                case 38:
                    ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
                    break;
                case 44:
                    points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
                    break;
                case 64:
                    if (peek() === 45) characters2 += delimit(next());
                    atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
                    break;
                case 45:
                    if (previous === 45 && strlen(characters2) == 2) variable = 0;
            }
    }
    return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2) {
    var post = offset - 1;
    var rule = offset === 0 ? rules : [
        ""
    ];
    var size = sizeof(rule);
    for(var i11 = 0, j = 0, k = 0; i11 < index; ++i11)for(var x = 0, y = substr(value, post + 1, post = abs(j = points[i11])), z = value; x < size; ++x)if (z = trim(j > 0 ? rule[x] + " " + y : replace(y, /&\f/g, rule[x]))) props[k++] = z;
    return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2);
}
function comment(value, root, parent) {
    return node(value, root, parent, COMMENT, from(__char()), substr(value, 2, -2), 0);
}
function declaration(value, root, parent, length2) {
    return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2);
}
function prefix(value, length2, children) {
    switch(hash(value, length2)){
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
            switch(charat(value, length2 + 11)){
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
            if (!match(value, /flex-|baseline/)) return MS + "grid-column-align" + substr(value, length2) + value;
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
            if (strlen(value) - 1 - length2 > 6) switch(charat(value, length2 + 1)){
                case 109:
                    if (charat(value, length2 + 4) !== 45) break;
                case 102:
                    return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
                case 115:
                    return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
            }
            break;
        case 5152:
        case 5920:
            return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_, a3, b, c, d, e7, f) {
                return MS + a3 + ":" + b + f + (c ? MS + a3 + "-span:" + (d ? e7 : +e7 - +b) + f : "") + value;
            });
        case 4949:
            if (charat(value, length2 + 6) === 121) return replace(value, ":", ":" + WEBKIT) + value;
            break;
        case 6444:
            switch(charat(value, charat(value, 14) === 45 ? 18 : 11)){
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
    for(var i12 = 0; i12 < length2; i12++)output += callback(children[i12], i12, children, callback) || "";
    return output;
}
function stringify(element, index, children, callback) {
    switch(element.type){
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
        for(var i13 = 0; i13 < length2; i13++)output += collection[i13](element, index, children, callback) || "";
        return output;
    };
}
function rulesheet(callback) {
    return function(element) {
        if (!element.root) {
            if (element = element.return) callback(element);
        }
    };
}
function prefixer(element, index, children, callback) {
    if (element.length > -1) {
        if (!element.return) switch(element.type){
            case DECLARATION:
                element.return = prefix(element.value, element.length, children);
                return;
            case KEYFRAMES:
                return serialize([
                    copy(element, {
                        value: replace(element.value, "@", "@" + WEBKIT)
                    })
                ], callback);
            case RULESET:
                if (element.length) return combine(element.props, function(value) {
                    switch(match(value, /(::plac\w+|:read-\w+)/)){
                        case ":read-only":
                        case ":read-write":
                            return serialize([
                                copy(element, {
                                    props: [
                                        replace(value, /:(read-\w+)/, ":" + MOZ + "$1")
                                    ]
                                })
                            ], callback);
                        case "::placeholder":
                            return serialize([
                                copy(element, {
                                    props: [
                                        replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")
                                    ]
                                }),
                                copy(element, {
                                    props: [
                                        replace(value, /:(plac\w+)/, ":" + MOZ + "$1")
                                    ]
                                }),
                                copy(element, {
                                    props: [
                                        replace(value, /:(plac\w+)/, MS + "input-$1")
                                    ]
                                })
                            ], callback);
                    }
                    return "";
                });
        }
    }
}
function namespace(element) {
    switch(element.type){
        case RULESET:
            element.props = element.props.map(function(value) {
                return combine(tokenize(value), function(value2, index, children) {
                    switch(charat(value2, 0)){
                        case 12:
                            return substr(value2, 1, strlen(value2));
                        case 0:
                        case 40:
                        case 43:
                        case 62:
                        case 126:
                            return value2;
                        case 58:
                            if (children[++index] === "global") children[index] = "", children[++index] = "\f" + substr(children[index], index = 1, -1);
                        case 32:
                            return index === 1 ? "" : value2;
                        default:
                            switch(index){
                                case 0:
                                    element = value2;
                                    return sizeof(children) > 1 ? "" : value2;
                                case index = sizeof(children) - 1:
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
const mod1 = function() {
    return {
        CHARSET: CHARSET,
        COMMENT: COMMENT,
        COUNTER_STYLE: COUNTER_STYLE,
        DECLARATION: DECLARATION,
        DOCUMENT: DOCUMENT,
        FONT_FACE: FONT_FACE,
        FONT_FEATURE_VALUES: FONT_FEATURE_VALUES,
        IMPORT: IMPORT,
        KEYFRAMES: KEYFRAMES,
        MEDIA: MEDIA,
        MOZ: MOZ,
        MS: MS,
        NAMESPACE: NAMESPACE,
        PAGE: PAGE,
        RULESET: RULESET,
        SUPPORTS: SUPPORTS,
        VIEWPORT: VIEWPORT,
        WEBKIT: WEBKIT,
        abs: abs,
        alloc: alloc,
        append: append,
        assign: assign,
        caret: caret,
        char: __char,
        character: character,
        characters: characters,
        charat: charat,
        column: column,
        combine: combine,
        comment: comment,
        commenter: commenter,
        compile: compile,
        copy: copy,
        dealloc: dealloc,
        declaration: declaration,
        delimit: delimit,
        delimiter: delimiter,
        escaping: escaping,
        from: from,
        hash: hash,
        identifier: identifier,
        indexof: indexof,
        length: length,
        line: line,
        match: match,
        middleware: middleware,
        namespace: namespace,
        next: next,
        node: node,
        parse: parse,
        peek: peek,
        position: position,
        prefix: prefix,
        prefixer: prefixer,
        prev: prev,
        replace: replace,
        ruleset: ruleset,
        rulesheet: rulesheet,
        serialize: serialize,
        sizeof: sizeof,
        slice: slice,
        stringify: stringify,
        strlen: strlen,
        substr: substr,
        token: token,
        tokenize: tokenize,
        tokenizer: tokenizer,
        trim: trim,
        whitespace: whitespace,
        default: null
    };
}();
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
var emotionWeakMemoize_cjs_prod = createCommonjsModule2(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var weakMemoize1 = function weakMemoize2(func) {
        var cache = new WeakMap();
        return function(arg) {
            if (cache.has(arg)) {
                return cache.get(arg);
            }
            var ret = func(arg);
            cache.set(arg, ret);
            return ret;
        };
    };
    exports.default = weakMemoize1;
});
var emotionWeakMemoize_cjs = createCommonjsModule2(function(module) {
    {
        module.exports = emotionWeakMemoize_cjs_prod;
    }
});
const mod2 = {
    default: emotionWeakMemoize_cjs
};
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
var emotionMemoize_cjs_prod = createCommonjsModule3(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function memoize2(fn) {
        var cache = Object.create(null);
        return function(arg) {
            if (cache[arg] === void 0) cache[arg] = fn(arg);
            return cache[arg];
        };
    }
    exports.default = memoize2;
});
var emotionMemoize_cjs = createCommonjsModule3(function(module) {
    {
        module.exports = emotionMemoize_cjs_prod;
    }
});
const mod3 = {
    default: emotionMemoize_cjs
};
function createCommonjsModule4(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire4(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function getDefaultExportFromNamespaceIfNotNamed1(n) {
    return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire4() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var sheet = getDefaultExportFromNamespaceIfNotNamed1(mod);
var stylis = getDefaultExportFromNamespaceIfNotNamed1(mod1);
var weakMemoize = getDefaultExportFromNamespaceIfNotNamed1(mod2);
var memoize = getDefaultExportFromNamespaceIfNotNamed1(mod3);
var emotionCache_cjs_prod = createCommonjsModule4(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _interopDefault(e8) {
        return e8 && e8.__esModule ? e8 : {
            default: e8
        };
    }
    var weakMemoize__default = _interopDefault(weakMemoize);
    var memoize__default = _interopDefault(memoize);
    var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
        var previous = 0;
        var character1 = 0;
        while(true){
            previous = character1;
            character1 = stylis.peek();
            if (previous === 38 && character1 === 12) {
                points[index] = 1;
            }
            if (stylis.token(character1)) {
                break;
            }
            stylis.next();
        }
        return stylis.slice(begin, stylis.position);
    };
    var toRules = function toRules2(parsed, points) {
        var index = -1;
        var character3 = 44;
        do {
            switch(stylis.token(character3)){
                case 0:
                    if (character3 === 38 && stylis.peek() === 12) {
                        points[index] = 1;
                    }
                    parsed[index] += identifierWithPointTracking(stylis.position - 1, points, index);
                    break;
                case 2:
                    parsed[index] += stylis.delimit(character3);
                    break;
                case 4:
                    if (character3 === 44) {
                        parsed[++index] = stylis.peek() === 58 ? "&\f" : "";
                        points[index] = parsed[index].length;
                        break;
                    }
                default:
                    parsed[index] += stylis.from(character3);
            }
        }while (character3 = stylis.next())
        return parsed;
    };
    var getRules = function getRules2(value, points) {
        return stylis.dealloc(toRules(stylis.alloc(value), points));
    };
    var fixedElements = new WeakMap();
    var compat = function compat2(element) {
        if (element.type !== "rule" || !element.parent || element.length < 1) {
            return;
        }
        var value = element.value, parent = element.parent;
        var isImplicitRule = element.column === parent.column && element.line === parent.line;
        while(parent.type !== "rule"){
            parent = parent.parent;
            if (!parent) return;
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
        for(var i14 = 0, k = 0; i14 < rules.length; i14++){
            for(var j = 0; j < parentRules.length; j++, k++){
                element.props[k] = points[i14] ? rules[i14].replace(/&\f/g, parentRules[j]) : parentRules[j] + " " + rules[i14];
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
    function prefix1(value, length1) {
        switch(stylis.hash(value, length1)){
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
                if (stylis.strlen(value) - 1 - length1 > 6) switch(stylis.charat(value, length1 + 1)){
                    case 109:
                        if (stylis.charat(value, length1 + 4) !== 45) break;
                    case 102:
                        return stylis.replace(value, /(.+:)(.+)-([^]+)/, "$1" + stylis.WEBKIT + "$2-$3$1" + stylis.MOZ + (stylis.charat(value, length1 + 3) == 108 ? "$3" : "$2-$3")) + value;
                    case 115:
                        return ~stylis.indexof(value, "stretch") ? prefix1(stylis.replace(value, "stretch", "fill-available"), length1) + value : value;
                }
                break;
            case 4949:
                if (stylis.charat(value, length1 + 1) !== 115) break;
            case 6444:
                switch(stylis.charat(value, stylis.strlen(value) - 3 - (~stylis.indexof(value, "!important") && 10))){
                    case 107:
                        return stylis.replace(value, ":", ":" + stylis.WEBKIT) + value;
                    case 101:
                        return stylis.replace(value, /(.+:)([^;!]+)(;|!.+)?/, "$1" + stylis.WEBKIT + (stylis.charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + stylis.WEBKIT + "$2$3$1" + stylis.MS + "$2box$3") + value;
                }
                break;
            case 5936:
                switch(stylis.charat(value, length1 + 11)){
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
    var prefixer1 = function prefixer2(element, index, children, callback) {
        if (element.length > -1) {
            if (!element["return"]) switch(element.type){
                case stylis.DECLARATION:
                    element["return"] = prefix1(element.value, element.length);
                    break;
                case stylis.KEYFRAMES:
                    return stylis.serialize([
                        stylis.copy(element, {
                            value: stylis.replace(element.value, "@", "@" + stylis.WEBKIT)
                        })
                    ], callback);
                case stylis.RULESET:
                    if (element.length) return stylis.combine(element.props, function(value) {
                        switch(stylis.match(value, /(::plac\w+|:read-\w+)/)){
                            case ":read-only":
                            case ":read-write":
                                return stylis.serialize([
                                    stylis.copy(element, {
                                        props: [
                                            stylis.replace(value, /:(read-\w+)/, ":" + stylis.MOZ + "$1")
                                        ]
                                    })
                                ], callback);
                            case "::placeholder":
                                return stylis.serialize([
                                    stylis.copy(element, {
                                        props: [
                                            stylis.replace(value, /:(plac\w+)/, ":" + stylis.WEBKIT + "input-$1")
                                        ]
                                    }),
                                    stylis.copy(element, {
                                        props: [
                                            stylis.replace(value, /:(plac\w+)/, ":" + stylis.MOZ + "$1")
                                        ]
                                    }),
                                    stylis.copy(element, {
                                        props: [
                                            stylis.replace(value, /:(plac\w+)/, stylis.MS + "input-$1")
                                        ]
                                    })
                                ], callback);
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
    var defaultStylisPlugins = [
        prefixer1
    ];
    var createCache1 = function createCache2(options) {
        var key = options.key;
        if (isBrowser && key === "css") {
            var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
            Array.prototype.forEach.call(ssrStyles, function(node1) {
                var dataEmotionAttribute = node1.getAttribute("data-emotion");
                if (dataEmotionAttribute.indexOf(" ") === -1) {
                    return;
                }
                document.head.appendChild(node1);
                node1.setAttribute("data-s", "");
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
                for(var i15 = 1; i15 < attrib.length; i15++){
                    inserted[attrib[i15]] = true;
                }
                nodesToHydrate.push(node2);
            });
        }
        var _insert;
        var omnipresentPlugins = [
            compat,
            removeLabel
        ];
        if (isBrowser) {
            var currentSheet;
            var finalizingPlugins = [
                stylis.stringify,
                stylis.rulesheet(function(rule) {
                    currentSheet.insert(rule);
                })
            ];
            var serializer = stylis.middleware(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
            var stylis$12 = function stylis$13(styles) {
                return stylis.serialize(stylis.compile(styles), serializer);
            };
            _insert = function insert(selector, serialized, sheet2, shouldCache) {
                currentSheet = sheet2;
                stylis$12(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
                if (shouldCache) {
                    cache.inserted[serialized.name] = true;
                }
            };
        } else {
            var _finalizingPlugins = [
                stylis.stringify
            ];
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
            _insert = function _insert2(selector, serialized, sheet2, shouldCache) {
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
    exports.default = createCache1;
});
var emotionCache_cjs = createCommonjsModule4(function(module) {
    {
        module.exports = emotionCache_cjs_prod;
    }
});
const mod4 = {
    default: emotionCache_cjs
};
function createCommonjsModule5(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire5(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire5() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionHash_cjs_prod = createCommonjsModule5(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function murmur2(str) {
        var h = 0;
        var k, i16 = 0, len = str.length;
        for(; len >= 4; ++i16, len -= 4){
            k = str.charCodeAt(i16) & 255 | (str.charCodeAt(++i16) & 255) << 8 | (str.charCodeAt(++i16) & 255) << 16 | (str.charCodeAt(++i16) & 255) << 24;
            k = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16);
            k ^= k >>> 24;
            h = (k & 65535) * 1540483477 + ((k >>> 16) * 59797 << 16) ^ (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
        }
        switch(len){
            case 3:
                h ^= (str.charCodeAt(i16 + 2) & 255) << 16;
            case 2:
                h ^= (str.charCodeAt(i16 + 1) & 255) << 8;
            case 1:
                h ^= str.charCodeAt(i16) & 255;
                h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
        }
        h ^= h >>> 13;
        h = (h & 65535) * 1540483477 + ((h >>> 16) * 59797 << 16);
        return ((h ^ h >>> 15) >>> 0).toString(36);
    }
    exports.default = murmur2;
});
var emotionHash_cjs = createCommonjsModule5(function(module) {
    {
        module.exports = emotionHash_cjs_prod;
    }
});
const mod5 = {
    default: emotionHash_cjs
};
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
var emotionUnitless_cjs_prod = createCommonjsModule6(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
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
var emotionUnitless_cjs = createCommonjsModule6(function(module) {
    {
        module.exports = emotionUnitless_cjs_prod;
    }
});
const mod6 = {
    default: emotionUnitless_cjs
};
function createCommonjsModule7(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire7(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function getDefaultExportFromNamespaceIfNotNamed2(n) {
    return n && Object.prototype.hasOwnProperty.call(n, "default") && Object.keys(n).length === 1 ? n["default"] : n;
}
function commonjsRequire7() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var hashString = getDefaultExportFromNamespaceIfNotNamed2(mod5);
var unitless = getDefaultExportFromNamespaceIfNotNamed2(mod6);
var memoize1 = getDefaultExportFromNamespaceIfNotNamed2(mod3);
var emotionSerialize_cjs_prod = createCommonjsModule7(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _interopDefault(e9) {
        return e9 && e9.__esModule ? e9 : {
            default: e9
        };
    }
    var hashString__default = _interopDefault(hashString);
    var unitless__default = _interopDefault(unitless);
    var memoize__default = _interopDefault(memoize1);
    var hyphenateRegex = /[A-Z]|^ms/g;
    var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
    var isCustomProperty = function isCustomProperty2(property) {
        return property.charCodeAt(1) === 45;
    };
    var isProcessableValue = function isProcessableValue2(value) {
        return value != null && typeof value !== "boolean";
    };
    var processStyleName = memoize__default["default"](function(styleName) {
        return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
    });
    var processStyleValue = function processStyleValue2(key, value) {
        switch(key){
            case "animation":
            case "animationName":
                {
                    if (typeof value === "string") {
                        return value.replace(animationRegex, function(match, p1, p2) {
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
    function handleInterpolation(mergedProps, registered, interpolation) {
        if (interpolation == null) {
            return "";
        }
        if (interpolation.__emotion_styles !== void 0) {
            return interpolation;
        }
        switch(typeof interpolation){
            case "boolean":
                {
                    return "";
                }
            case "object":
                {
                    if (interpolation.anim === 1) {
                        cursor = {
                            name: interpolation.name,
                            styles: interpolation.styles,
                            next: cursor
                        };
                        return interpolation.name;
                    }
                    if (interpolation.styles !== void 0) {
                        var next1 = interpolation.next;
                        if (next1 !== void 0) {
                            while(next1 !== void 0){
                                cursor = {
                                    name: next1.name,
                                    styles: next1.styles,
                                    next: cursor
                                };
                                next1 = next1.next;
                            }
                        }
                        var styles = interpolation.styles + ";";
                        return styles;
                    }
                    return createStringFromObject(mergedProps, registered, interpolation);
                }
            case "function":
                {
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
            for(var i17 = 0; i17 < obj.length; i17++){
                string += handleInterpolation(mergedProps, registered, obj[i17]) + ";";
            }
        } else {
            for(var _key in obj){
                var value = obj[_key];
                if (typeof value !== "object") {
                    if (registered != null && registered[value] !== void 0) {
                        string += _key + "{" + registered[value] + "}";
                    } else if (isProcessableValue(value)) {
                        string += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
                    }
                } else {
                    if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
                        for(var _i = 0; _i < value.length; _i++){
                            if (isProcessableValue(value[_i])) {
                                string += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
                            }
                        }
                    } else {
                        var interpolated = handleInterpolation(mergedProps, registered, value);
                        switch(_key){
                            case "animation":
                            case "animationName":
                                {
                                    string += processStyleName(_key) + ":" + interpolated + ";";
                                    break;
                                }
                            default:
                                {
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
        for(var i18 = 1; i18 < args.length; i18++){
            styles += handleInterpolation(mergedProps, registered, args[i18]);
            if (stringMode) {
                styles += strings[i18];
            }
        }
        labelPattern.lastIndex = 0;
        var identifierName = "";
        var match1;
        while((match1 = labelPattern.exec(styles)) !== null){
            identifierName += "-" + match1[1];
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
var emotionSerialize_cjs = createCommonjsModule7(function(module) {
    {
        module.exports = emotionSerialize_cjs_prod;
    }
});
var serializeStyles = emotionSerialize_cjs.serializeStyles;
const mod7 = {
    __moduleExports: emotionSerialize_cjs,
    serializeStyles: serializeStyles,
    default: emotionSerialize_cjs
};
function createCommonjsModule8(fn, basedir, module) {
    return module = {
        path: basedir,
        exports: {},
        require: function(path, base) {
            return commonjsRequire8(path, base === void 0 || base === null ? module.path : base);
        }
    }, fn(module, module.exports), module.exports;
}
function commonjsRequire8() {
    throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
var emotionUtils_cjs_prod = createCommonjsModule8(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var isBrowser = typeof document !== "undefined";
    function getRegisteredStyles2(registered, registeredStyles, classNames) {
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
            }while (current !== void 0)
            if (!isBrowser && stylesForSSR.length !== 0) {
                return stylesForSSR;
            }
        }
    };
    exports.getRegisteredStyles = getRegisteredStyles2;
    exports.insertStyles = insertStyles2;
    exports.registerStyles = registerStyles2;
});
var emotionUtils_cjs = createCommonjsModule8(function(module) {
    {
        module.exports = emotionUtils_cjs_prod;
    }
});
var getRegisteredStyles = emotionUtils_cjs.getRegisteredStyles;
var insertStyles = emotionUtils_cjs.insertStyles;
var registerStyles = emotionUtils_cjs.registerStyles;
const mod8 = {
    __moduleExports: emotionUtils_cjs,
    getRegisteredStyles: getRegisteredStyles,
    insertStyles: insertStyles,
    registerStyles: registerStyles,
    default: emotionUtils_cjs
};
var createCache = getDefaultExportFromNamespaceIfNotNamed(mod4);
var serialize1 = getDefaultExportFromNamespaceIfNotNamed(mod7);
var utils = getDefaultExportFromNamespaceIfNotNamed(mod8);
var emotionCssCreateInstance_cjs_prod = createCommonjsModule(function(module, exports) {
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _interopDefault(e10) {
        return e10 && e10.__esModule ? e10 : {
            default: e10
        };
    }
    var createCache__default = _interopDefault(createCache);
    function insertWithoutScoping(cache2, serialized) {
        if (cache2.inserted[serialized.name] === void 0) {
            return cache2.insert("", serialized, cache2.sheet, true);
        }
    }
    function merge(registered, css2, className) {
        var registeredStyles = [];
        var rawClassName = utils.getRegisteredStyles(registered, registeredStyles, className);
        if (registeredStyles.length < 2) {
            return className;
        }
        return rawClassName + css2(registeredStyles);
    }
    var createEmotion = function createEmotion2(options) {
        var cache2 = createCache__default["default"](options);
        cache2.sheet.speedy = function(value) {
            this.isSpeedy = value;
        };
        cache2.compat = true;
        var css3 = function css2() {
            for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                args[_key] = arguments[_key];
            }
            var serialized = serialize1.serializeStyles(args, cache2.registered, void 0);
            utils.insertStyles(cache2, serialized, false);
            return cache2.key + "-" + serialized.name;
        };
        var keyframes = function keyframes2() {
            for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++){
                args[_key2] = arguments[_key2];
            }
            var serialized = serialize1.serializeStyles(args, cache2.registered);
            var animation = "animation-" + serialized.name;
            insertWithoutScoping(cache2, {
                name: serialized.name,
                styles: "@keyframes " + animation + "{" + serialized.styles + "}"
            });
            return animation;
        };
        var injectGlobal = function injectGlobal2() {
            for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++){
                args[_key3] = arguments[_key3];
            }
            var serialized = serialize1.serializeStyles(args, cache2.registered);
            insertWithoutScoping(cache2, serialized);
        };
        var cx1 = function cx2() {
            for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++){
                args[_key4] = arguments[_key4];
            }
            return merge(cache2.registered, css3, classnames(args));
        };
        return {
            css: css3,
            cx: cx1,
            injectGlobal,
            keyframes,
            hydrate: function hydrate(ids) {
                ids.forEach(function(key) {
                    cache2.inserted[key] = true;
                });
            },
            flush: function flush() {
                cache2.registered = {};
                cache2.inserted = {};
                cache2.sheet.flush();
            },
            sheet: cache2.sheet,
            cache: cache2,
            getRegisteredStyles: utils.getRegisteredStyles.bind(null, cache2.registered),
            merge: merge.bind(null, cache2.registered, css3)
        };
    };
    var classnames = function classnames2(args) {
        var cls = "";
        for(var i19 = 0; i19 < args.length; i19++){
            var arg = args[i19];
            if (arg == null) continue;
            var toAdd = void 0;
            switch(typeof arg){
                case "boolean":
                    break;
                case "object":
                    {
                        if (Array.isArray(arg)) {
                            toAdd = classnames2(arg);
                        } else {
                            toAdd = "";
                            for(var k in arg){
                                if (arg[k] && k) {
                                    toAdd && (toAdd += " ");
                                    toAdd += k;
                                }
                            }
                        }
                        break;
                    }
                default:
                    {
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
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _createEmotion = emotionCssCreateInstance_cjs_prod["default"]({
        key: "css"
    }), flush2 = _createEmotion.flush, hydrate2 = _createEmotion.hydrate, cx2 = _createEmotion.cx, merge2 = _createEmotion.merge, getRegisteredStyles2 = _createEmotion.getRegisteredStyles, injectGlobal2 = _createEmotion.injectGlobal, keyframes2 = _createEmotion.keyframes, css2 = _createEmotion.css, sheet2 = _createEmotion.sheet, cache3 = _createEmotion.cache;
    exports.cache = cache3;
    exports.css = css2;
    exports.cx = cx2;
    exports.flush = flush2;
    exports.getRegisteredStyles = getRegisteredStyles2;
    exports.hydrate = hydrate2;
    exports.injectGlobal = injectGlobal2;
    exports.keyframes = keyframes2;
    exports.merge = merge2;
    exports.sheet = sheet2;
});
var emotionCss_cjs = createCommonjsModule(function(module) {
    {
        module.exports = emotionCss_cjs_prod;
    }
});
emotionCss_cjs.cache;
var css1 = emotionCss_cjs.css;
var cx = emotionCss_cjs.cx;
emotionCss_cjs.flush;
emotionCss_cjs.getRegisteredStyles;
emotionCss_cjs.hydrate;
emotionCss_cjs.injectGlobal;
emotionCss_cjs.keyframes;
emotionCss_cjs.merge;
emotionCss_cjs.sheet;
export { css1 as css, cx as cx };
const hash1 = (value)=>sha256(value, 'utf-8', 'hex')
;
window.Elemental = Elemental;
const helperElement = document.createElement("div");
helperElement.setAttribute("note", "STUFF WILL BREAK IF YOU DELETE ME");
helperElement.setAttribute("style", "position: fixed; top: 0; left: 0;");
window.addEventListener("load", ()=>document.body.prepend(helperElement)
);
const helperStyle = document.createElement("style");
const setupStyles = (arg, styles)=>{
    if (arg.styles) {
        arg.styles = `${styles};${css(arg.styles)};`;
    } else {
        arg.styles = styles;
    }
    return arg;
};
const dynamicClasses = new Set();
const createCssClass = (name, styles)=>{
    const classStyles = [
        styles
    ].flat(Infinity);
    const key = `${name}${hash1(`${classStyles}`)}`;
    if (!dynamicClasses.has(key)) {
        dynamicClasses.add(key);
        for (const each of classStyles){
            helperStyle.innerHTML += `.${key}${each}`;
        }
    }
    return key;
};
const setupClassStyles = (arg)=>{
    if (arg.classStyles) {
        const className = createCssClass(``, arg.classStyles);
        arg.class = combineClasses(className, arg.class);
    }
    return arg;
};
const translateAlignment = (name)=>{
    if (name == "top" || name == "left") {
        return "flex-start";
    } else if (name == "bottom" || name == "right") {
        return "flex-end";
    } else {
        return name;
    }
};
const columnClass = createCssClass(`column`, [
    `{
                display: flex;
                flex-direction: column;
                transition: all 0.4s ease-in-out 0s;
            }`
]);
function Column({ verticalAlignment , horizontalAlignment , children , ...arg }) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(columnClass, arg.class);
    const justify = translateAlignment(verticalAlignment || "top");
    const align = translateAlignment(horizontalAlignment || "left");
    const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment;
    arg = setupStyles(arg, `
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `);
    return html("div", Object.assign({}, arg), children);
}
const rowClass = createCssClass(`row`, [
    `{
                display: flex;
                flex-direction: row;
                transition: all 0.4s ease-in-out 0s;
            }`
]);
function Row({ verticalAlignment , horizontalAlignment , children , ...arg }) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(rowClass, arg.class);
    const justify = translateAlignment(horizontalAlignment || "left");
    const align = translateAlignment(verticalAlignment || "top");
    const verticalText = verticalAlignment == "center" ? "middle" : verticalAlignment;
    arg = setupStyles(arg, `
                justify-content: ${justify};
                align-items: ${align};
                text-align: ${horizontalAlignment};
                vertical-align: ${verticalText};
            `);
    return html("div", Object.assign({}, arg), children);
}
const codeClass = createCssClass(`code`, [
    `{
                white-space: pre;
                font-family: monospace, monospace;
                font-size: 100%;
                font: inherit;
                vertical-align: baseline;
                margin: 0;
                padding: 0;
                border: 0;
            }`, 
]);
function Code({ children , ...arg }) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(codeClass, arg.class);
    return html("code", Object.assign({}, arg), children);
}
const inputClass = createCssClass(`input`, [
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
    `[type=month]          { -webkit-appearance: listbox; }`, 
]);
function Input(arg) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(inputClass, arg.class);
    return html("input", Object.assign({}, arg));
}
const buttonClass = createCssClass(`button`, [
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
    `::-moz-focus-inner   { border-style: none; padding: 0;}`, 
]);
function Button(arg) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(buttonClass, arg.class);
    return html("button", Object.assign({}, arg), arg.children);
}
const checkboxClass = createCssClass(`checkbox`, [
    `{
                box-sizing: border-box;
                padding: 0;
            }`, 
]);
function Checkbox(arg) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(inputClass, checkboxClass, arg.class);
    const element = html("input", Object.assign({
        type: "checkbox"
    }, arg));
    Object.defineProperties(element, {
        value: {
            get () {
                this.checked;
            },
            set (value) {
                this.checked = value;
            }
        }
    });
    const propNames = Object.keys(arg);
    if (!propNames.includes("checked") && propNames.includes("value")) {
        element.checked = arg.value;
    } else {
        element.checked = arg.checked;
    }
    return element;
}
const originalDisplayValueSymbol = Symbol("originalDisplayValue");
const dropdownPlaceholder = createCssClass(`dropdownPlaceholder`, [
    `{
                overflow: visible;
            }`, 
]);
const dropdownList = createCssClass(`dropdownList`, [
    `{
                overflow: auto;
                height: fit-content;
                max-height: 50vh;
            }`, 
]);
function Dropdown({ children , ...arg }) {
    arg = setupClassStyles(arg);
    arg.class = combineClasses(dropdownList, arg.class);
    const placeholder = html(Column, {
        class: dropdownPlaceholder
    });
    const listOfOptions = html(Column, Object.assign({
        class: dropdownList
    }, arg), children);
    for (const each2 of listOfOptions.children){
        each2[originalDisplayValueSymbol] = each2.style.display;
    }
    const onMainClickOrInput = (event)=>{
        placeholder.style.minHeight = `${listOfOptions.clientHeight}px`;
        placeholder.style.maxHeight = `${listOfOptions.clientHeight}px`;
        placeholder.style.minWidth = `${listOfOptions.clientWidth}px`;
        placeholder.style.maxWidth = `${listOfOptions.clientWidth}px`;
        const parent = listOfOptions.parentNode;
        parent.replaceChild(placeholder, listOfOptions);
        placeholder.appendChild(listOfOptions);
        for (const each of listOfOptions.children){
            each.style.display = each[originalDisplayValueSymbol];
        }
    };
    const onOptionClickOrInput = (event)=>{
        placeholder.selected = event.target;
        for (const each of listOfOptions.children){
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
    for (const each1 of listOfOptions.children){
        each1.addEventListener("click", onOptionClickOrInput);
        each1.addEventListener("input", onOptionClickOrInput);
    }
    onOptionClickOrInput({
        target: args.default
    });
    return listOfOptions;
}
const askForFiles = async ()=>{
    return new Promise((resolve, reject)=>{
        const cleanResolve = (returnValue)=>{
            resolve(returnValue);
            window.removeEventListener("focus", listener);
            try {
                helperElement.removeChild(filePicker);
            } catch (error) {}
        };
        const listener = ()=>cleanResolve([])
        ;
        window.addEventListener("focus", listener);
        let filePicker = html("input", {
            type: "file",
            onInput: (event)=>{
                cleanResolve(event.target.files);
            },
            onBlur: (event)=>{
                cleanResolve([]);
            },
            hidden: true
        });
        helperElement.appendChild(filePicker);
        filePicker.click();
    });
};
const popUp = async ({ children , ...otherArgs })=>{
    const container = html("div", {
        class: combineClasses(classIds.popUp, otherArgs.class),
        onClick: (event)=>{
            if (event.target == container) {
                container.remove();
            }
        }
    }, html(Column, {
        verticalAlignment: "top",
        horizontalAlignment: "center",
        style: "width: fit-content; height: 50vh; overflow-y: auto;"
    }, children));
    helperElement.prepend(container);
    return container;
};
const toastOn = css``;
const toastify = css`
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
const toastClose = css`
        background: transparent;
        border: 0;
        color: white;
        cursor: pointer;
        font-family: inherit;
        font-size: 1em;
        opacity: 0.4;
        padding: 0 5px;
    `;
const toastifyRight = css`
        right: 15px;
        @media only screen and (max-width: 360px) {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            max-width: fit-content;
        }
    `;
const toastifyLeft = css`
        left: 15px;
        @media only screen and (max-width: 360px) {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            max-width: fit-content;
        }
    `;
const toastifyTop = css`
        top: -150px;
    `;
const toastifyBottom = css`
        bottom: -150px;
    `;
const toastifyRounded = css`
        border-radius: 25px;
    `;
const toastifyAvatar = css`
        width: 1.5em;
        height: 1.5em;
        margin: -7px 5px;
        border-radius: 2px;
    `;
const toastifyCenter = css`
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        max-width: fit-content;
        max-width: -moz-fit-content;
    `;
const nameMapping = {
    right: toastifyRight,
    left: toastifyLeft,
    top: toastifyTop,
    bottom: toastifyBottom,
    rounded: toastifyRounded,
    avatar: toastifyAvatar,
    center: toastifyCenter
};
class Toastify {
    defaults = {
        oldestFirst: true,
        text: "Toastify is awesome!",
        node: undefined,
        duration: 3000,
        selector: undefined,
        callback: function() {},
        destination: undefined,
        newWindow: false,
        close: false,
        gravity: toastifyTop,
        positionLeft: false,
        position: "",
        backgroundColor: "",
        avatar: "",
        className: "",
        stopOnFocus: true,
        onClick: function() {},
        offset: {
            x: 0,
            y: 0
        },
        escapeMarkup: true,
        ariaLive: "polite",
        style: {
            background: ""
        }
    };
    constructor(options){
        this.version = "1.12.0";
        this.options = {};
        this.toastElement = null;
        this._rootElement = document.body;
        this.options = Object.assign(this.defaults, options);
        if (this.options.backgroundColor) {
            console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
        }
        this.toastElement = null;
        this.options.gravity = options.gravity === "bottom" ? toastifyBottom : toastifyTop;
        this.options.stopOnFocus = options.stopOnFocus === undefined ? true : options.stopOnFocus;
        if (options.backgroundColor) {
            this.options.style.background = options.backgroundColor;
        }
    }
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
            this.toastElement.timeOutValue = window.setTimeout(()=>{
                this._removeElement(this.toastElement);
            }, this.options.duration);
        }
        return this;
    }
    hideToast() {
        if (this.toastElement.timeOutValue) {
            clearTimeout(this.toastElement.timeOutValue);
        }
        this._removeElement(this.toastElement);
    }
    _buildToast() {
        if (!this.options) {
            throw "Toastify is not initialized";
        }
        let divElement = document.createElement("div");
        divElement.className = `${toastify} ${toastOn} ${this.options.className}`;
        divElement.className += ` ${nameMapping[this.options.position]}`;
        divElement.className += ` ${this.options.gravity}`;
        for(const property in this.options.style){
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
            closeElement.addEventListener("click", (event)=>{
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
            divElement.addEventListener("mouseover", (event)=>{
                window.clearTimeout(divElement.timeOutValue);
            });
            divElement.addEventListener("mouseleave", ()=>{
                divElement.timeOutValue = window.setTimeout(()=>{
                    this._removeElement(divElement);
                }, this.options.duration);
            });
        }
        if (typeof this.options.destination !== "undefined") {
            divElement.addEventListener("click", (event)=>{
                event.stopPropagation();
                if (this.options.newWindow === true) {
                    window.open(this.options.destination, "_blank");
                } else {
                    window.location = this.options.destination;
                }
            });
        }
        if (typeof this.options.onClick === "function" && typeof this.options.destination === "undefined") {
            divElement.addEventListener("click", (event)=>{
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
    _removeElement(toastElement) {
        toastElement.className = toastElement.className.replace(` ${toastOn}`, "");
        window.setTimeout(()=>{
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
        for(let i20 = 0; i20 < allToasts.length; i20++){
            if (allToasts[i20].classList.contains(toastifyTop) === true) {
                classUsed = toastifyTop;
            } else {
                classUsed = toastifyBottom;
            }
            let height = allToasts[i20].offsetHeight;
            classUsed = classUsed.substr(9, classUsed.length - 1);
            let offset = 15;
            let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
            if (width <= 360) {
                allToasts[i20].style[classUsed] = `${offsetSize[classUsed]}px`;
                offsetSize[classUsed] += height + offset;
            } else {
                if (allToasts[i20].classList.contains(toastifyLeft) === true) {
                    allToasts[i20].style[classUsed] = `${topLeftOffsetSize[classUsed]}px`;
                    topLeftOffsetSize[classUsed] += height + offset;
                } else {
                    allToasts[i20].style[classUsed] = `${topRightOffsetSize[classUsed]}px`;
                    topRightOffsetSize[classUsed] += height + offset;
                }
            }
        }
    }
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
}
export { Column as Column };
export { Row as Row };
export { Code as Code };
export { Input as Input };
export { Button as Button };
export { Checkbox as Checkbox };
export { Dropdown as Dropdown };
export { askForFiles as askForFiles };
export { popUp as popUp };
export { Toastify as Toastify };

