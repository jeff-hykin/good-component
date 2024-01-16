// https://esm.sh/v135/@emotion/sheet@1.2.2/denonext/sheet.mjs
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
  function r(n2) {
    var e2 = this;
    this._insertTag = function(i3) {
      var s;
      e2.tags.length === 0 ? e2.insertionPoint ? s = e2.insertionPoint.nextSibling : e2.prepend ? s = e2.container.firstChild : s = e2.before : s = e2.tags[e2.tags.length - 1].nextSibling, e2.container.insertBefore(i3, s), e2.tags.push(i3);
    }, this.isSpeedy = n2.speedy === void 0 ? true : n2.speedy, this.tags = [], this.ctr = 0, this.nonce = n2.nonce, this.key = n2.key, this.container = n2.container, this.prepend = n2.prepend, this.insertionPoint = n2.insertionPoint, this.before = null;
  }
  var t = r.prototype;
  return t.hydrate = function(e2) {
    e2.forEach(this._insertTag);
  }, t.insert = function(e2) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(a(this));
    var i3 = this.tags[this.tags.length - 1];
    if (0)
      var s;
    if (this.isSpeedy) {
      var o3 = l(i3);
      try {
        o3.insertRule(e2, o3.cssRules.length);
      } catch {
      }
    } else
      i3.appendChild(document.createTextNode(e2));
    this.ctr++;
  }, t.flush = function() {
    this.tags.forEach(function(e2) {
      return e2.parentNode && e2.parentNode.removeChild(e2);
    }), this.tags = [], this.ctr = 0;
  }, r;
}();

// https://esm.sh/v135/stylis@4.2.0/denonext/stylis.mjs
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
function c(r, t, e2) {
  return r.replace(t, e2);
}
function _(r, t) {
  return r.indexOf(t);
}
function p(r, t) {
  return r.charCodeAt(t) | 0;
}
function $(r, t, e2) {
  return r.slice(t, e2);
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
function y(r, t, e2, s, a3, w3, g6) {
  return { value: r, root: t, parent: e2, type: s, props: a3, children: w3, line: l2, column: W, length: g6, return: "" };
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
function tr(r, t, e2, s, a3, w3, g6, x2, S) {
  for (var M = 0, C = 0, b3 = g6, I = 0, D2 = 0, O = 0, d4 = 1, H = 1, k = 1, m2 = 0, z = "", q = a3, U = w3, T2 = s, i3 = z; H; )
    switch (O = m2, m2 = E()) {
      case 40:
        if (O != 108 && p(i3, b3 - 1) == 58) {
          _(i3 += c(G(m2), "&", "&\f"), "&\f") != -1 && (k = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        i3 += G(m2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        i3 += Er(O);
        break;
      case 92:
        i3 += kr(V() - 1, 7);
        continue;
      case 47:
        switch (N()) {
          case 42:
          case 47:
            R(Ar($r(E(), V()), t, e2), S);
            break;
          default:
            i3 += "/";
        }
        break;
      case 123 * d4:
        x2[M++] = u2(i3) * k;
      case 125 * d4:
      case 59:
      case 0:
        switch (m2) {
          case 0:
          case 125:
            H = 0;
          case 59 + C:
            k == -1 && (i3 = c(i3, /\f/g, "")), D2 > 0 && u2(i3) - b3 && R(D2 > 32 ? dr(i3 + ";", s, e2, b3 - 1) : dr(c(i3, " ", "") + ";", s, e2, b3 - 2), S);
            break;
          case 59:
            i3 += ";";
          default:
            if (R(T2 = gr(i3, t, e2, M, C, a3, x2, z, q = [], U = [], b3), w3), m2 === 123)
              if (C === 0)
                tr(i3, t, T2, T2, q, w3, b3, x2, U);
              else
                switch (I === 99 && p(i3, 3) === 110 ? 100 : I) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    tr(r, T2, T2, s && R(gr(r, T2, T2, 0, 0, a3, x2, z, a3, q = [], b3), U), a3, U, b3, x2, s ? q : U);
                    break;
                  default:
                    tr(i3, T2, T2, T2, [""], U, 0, x2, U);
                }
        }
        M = C = D2 = 0, d4 = k = 1, z = i3 = "", b3 = g6;
        break;
      case 58:
        b3 = 1 + u2(i3), D2 = O;
      default:
        if (d4 < 1) {
          if (m2 == 123)
            --d4;
          else if (m2 == 125 && d4++ == 0 && wr() == 125)
            continue;
        }
        switch (i3 += Y(m2), m2 * d4) {
          case 38:
            k = C > 0 ? 1 : (i3 += "\f", -1);
            break;
          case 44:
            x2[M++] = (u2(i3) - 1) * k, k = 1;
            break;
          case 64:
            N() === 45 && (i3 += G(E())), I = N(), C = b3 = u2(z = i3 += or(V())), m2++;
            break;
          case 45:
            O === 45 && u2(i3) == 2 && (d4 = 0);
        }
    }
  return w3;
}
function gr(r, t, e2, s, a3, w3, g6, x2, S, M, C) {
  for (var b3 = a3 - 1, I = a3 === 0 ? w3 : [""], D2 = L(I), O = 0, d4 = 0, H = 0; O < s; ++O)
    for (var k = 0, m2 = $(r, b3 + 1, b3 = fr(d4 = g6[O])), z = r; k < D2; ++k)
      (z = X(d4 > 0 ? I[k] + " " + m2 : c(m2, /&\f/g, I[k]))) && (S[H++] = z);
  return y(r, t, e2, a3 === 0 ? P : x2, S, M, C);
}
function Ar(r, t, e2) {
  return y(r, t, e2, J, Y(mr()), $(r, 2, -2), 0);
}
function dr(r, t, e2, s) {
  return y(r, t, e2, K, $(r, 0, s), $(r, s + 1, -1), s);
}
function Z(r, t) {
  for (var e2 = "", s = L(r), a3 = 0; a3 < s; a3++)
    e2 += t(r[a3], a3, r, t) || "";
  return e2;
}
function qr(r, t, e2, s) {
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
  return u2(e2 = Z(r.children, s)) ? r.return = r.value + "{" + e2 + "}" : "";
}
function tt(r) {
  var t = L(r);
  return function(e2, s, a3, w3) {
    for (var g6 = "", x2 = 0; x2 < t; x2++)
      g6 += r[x2](e2, s, a3, w3) || "";
    return g6;
  };
}

// https://esm.sh/v135/@emotion/weak-memoize@0.3.1/denonext/weak-memoize.mjs
var u3 = function(n2) {
  var t = /* @__PURE__ */ new WeakMap();
  return function(e2) {
    if (t.has(e2))
      return t.get(e2);
    var a3 = n2(e2);
    return t.set(e2, a3), a3;
  };
};

// https://esm.sh/v135/@emotion/memoize@0.8.1/denonext/memoize.mjs
function u4(t) {
  var n2 = /* @__PURE__ */ Object.create(null);
  return function(e2) {
    return n2[e2] === void 0 && (n2[e2] = t(e2)), n2[e2];
  };
}

// https://esm.sh/v135/@emotion/cache@11.11.0/denonext/cache.mjs
var rr2 = function(e2, c3, n2) {
  for (var i3 = 0, o3 = 0; i3 = o3, o3 = N(), i3 === 38 && o3 === 12 && (c3[n2] = 1), !v(o3); )
    E();
  return rr(e2, h);
};
var er2 = function(e2, c3) {
  var n2 = -1, i3 = 44;
  do
    switch (v(i3)) {
      case 0:
        i3 === 38 && N() === 12 && (c3[n2] = 1), e2[n2] += rr2(h - 1, c3, n2);
        break;
      case 2:
        e2[n2] += G(i3);
        break;
      case 4:
        if (i3 === 44) {
          e2[++n2] = N() === 58 ? "&\f" : "", c3[n2] = e2[n2].length;
          break;
        }
      default:
        e2[n2] += Y(i3);
    }
  while (i3 = E());
  return e2;
};
var tr2 = function(e2, c3) {
  return ar(er2(sr(e2), c3));
};
var T = /* @__PURE__ */ new WeakMap();
var sr2 = function(e2) {
  if (!(e2.type !== "rule" || !e2.parent || e2.length < 1)) {
    for (var c3 = e2.value, n2 = e2.parent, i3 = e2.column === n2.column && e2.line === n2.line; n2.type !== "rule"; )
      if (n2 = n2.parent, !n2)
        return;
    if (!(e2.props.length === 1 && c3.charCodeAt(0) !== 58 && !T.get(n2)) && !i3) {
      T.set(e2, true);
      for (var o3 = [], g6 = tr2(c3, o3), u7 = n2.props, f4 = 0, w3 = 0; f4 < g6.length; f4++)
        for (var h3 = 0; h3 < u7.length; h3++, w3++)
          e2.props[w3] = o3[f4] ? g6[f4].replace(/&\f/g, u7[h3]) : u7[h3] + " " + g6[f4];
    }
  }
};
var nr = function(e2) {
  if (e2.type === "decl") {
    var c3 = e2.value;
    c3.charCodeAt(0) === 108 && c3.charCodeAt(2) === 98 && (e2.return = "", e2.value = "");
  }
};
function W2(r, e2) {
  switch (ur(r, e2)) {
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
      if (u2(r) - 1 - e2 > 6)
        switch (p(r, e2 + 1)) {
          case 109:
            if (p(r, e2 + 4) !== 45)
              break;
          case 102:
            return c(r, /(.+:)(.+)-([^]+)/, "$1" + o + "$2-$3$1" + F + (p(r, e2 + 3) == 108 ? "$3" : "$2-$3")) + r;
          case 115:
            return ~_(r, "stretch") ? W2(c(r, "stretch", "fill-available"), e2) + r : r;
        }
      break;
    case 4949:
      if (p(r, e2 + 1) !== 115)
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
      switch (p(r, e2 + 11)) {
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
var cr2 = function(e2, c3, n2, i3) {
  if (e2.length > -1 && !e2.return)
    switch (e2.type) {
      case K:
        e2.return = W2(e2.value, e2.length);
        break;
      case Q:
        return Z([B(e2, { value: c(e2.value, "@", "@" + o) })], i3);
      case P:
        if (e2.length)
          return er(e2.props, function(o3) {
            switch (A(o3, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return Z([B(e2, { props: [c(o3, /:(read-\w+)/, ":" + F + "$1")] })], i3);
              case "::placeholder":
                return Z([B(e2, { props: [c(o3, /:(plac\w+)/, ":" + o + "input-$1")] }), B(e2, { props: [c(o3, /:(plac\w+)/, ":" + F + "$1")] }), B(e2, { props: [c(o3, /:(plac\w+)/, n + "input-$1")] })], i3);
            }
            return "";
          });
    }
};
var ir2 = u3(function() {
  return u4(function() {
    var r = {};
    return function(e2) {
      return r[e2];
    };
  });
});
var ar2 = [cr2];
var hr = function(e2) {
  var c3 = e2.key, n2 = e2.stylisPlugins || ar2, i3 = {}, o3, g6 = [], u7, f4 = [sr2, nr];
  {
    var w3 = [qr], h3 = tt(f4.concat(n2, w3)), z = function(d4) {
      return Z(jr(d4), h3);
    }, x2 = ir2(n2)(c3), D2 = function(d4, y4) {
      var b3 = y4.name;
      return x2[b3] === void 0 && (x2[b3] = z(d4 ? d4 + "{" + y4.styles + "}" : y4.styles)), x2[b3];
    };
    u7 = function(d4, y4, b3, P2) {
      var I = y4.name, E3 = D2(d4, y4);
      if (l4.compat === void 0)
        return P2 && (l4.inserted[I] = true), E3;
      if (P2)
        l4.inserted[I] = E3;
      else
        return E3;
    };
  }
  var l4 = { key: c3, sheet: new u({ key: c3, container: o3, nonce: e2.nonce, speedy: e2.speedy, prepend: e2.prepend, insertionPoint: e2.insertionPoint }), nonce: e2.nonce, inserted: i3, registered: {}, insert: u7 };
  return l4.sheet.hydrate(g6), l4;
};

// https://esm.sh/v135/@emotion/hash@0.9.1/denonext/hash.mjs
function c2(e2) {
  for (var f4 = 0, x2, a3 = 0, d4 = e2.length; d4 >= 4; ++a3, d4 -= 4)
    x2 = e2.charCodeAt(a3) & 255 | (e2.charCodeAt(++a3) & 255) << 8 | (e2.charCodeAt(++a3) & 255) << 16 | (e2.charCodeAt(++a3) & 255) << 24, x2 = (x2 & 65535) * 1540483477 + ((x2 >>> 16) * 59797 << 16), x2 ^= x2 >>> 24, f4 = (x2 & 65535) * 1540483477 + ((x2 >>> 16) * 59797 << 16) ^ (f4 & 65535) * 1540483477 + ((f4 >>> 16) * 59797 << 16);
  switch (d4) {
    case 3:
      f4 ^= (e2.charCodeAt(a3 + 2) & 255) << 16;
    case 2:
      f4 ^= (e2.charCodeAt(a3 + 1) & 255) << 8;
    case 1:
      f4 ^= e2.charCodeAt(a3) & 255, f4 = (f4 & 65535) * 1540483477 + ((f4 >>> 16) * 59797 << 16);
  }
  return f4 ^= f4 >>> 13, f4 = (f4 & 65535) * 1540483477 + ((f4 >>> 16) * 59797 << 16), ((f4 ^ f4 >>> 15) >>> 0).toString(36);
}

// https://esm.sh/v135/@emotion/unitless@0.8.1/denonext/unitless.mjs
var o2 = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, boxFlex: 1, boxFlexGroup: 1, boxOrdinalGroup: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexPositive: 1, flexShrink: 1, flexNegative: 1, flexOrder: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, msGridRow: 1, msGridRowSpan: 1, msGridColumn: 1, msGridColumnSpan: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };

// https://esm.sh/v135/@emotion/serialize@1.1.2/denonext/serialize.mjs
var g = /[A-Z]|^ms/g;
var N2 = function(n2) {
  return n2.charCodeAt(1) === 45;
};
var d = u4(function(o3) {
  return N2(o3) ? o3 : o3.replace(g, "-$&").toLowerCase();
});

// https://esm.sh/v135/@emotion/utils@1.2.1/denonext/utils.mjs
function v2(r, e2, n2) {
  var f4 = "";
  return n2.split(" ").forEach(function(t) {
    r[t] !== void 0 ? e2.push(r[t] + ";") : f4 += t + " ";
  }), f4;
}
var u5 = function(e2, n2, f4) {
  var t = e2.key + "-" + n2.name;
  (f4 === false || e2.compat !== void 0) && e2.registered[t] === void 0 && (e2.registered[t] = n2.styles);
};
var g2 = function(e2, n2, f4) {
  u5(e2, n2, f4);
  var t = e2.key + "-" + n2.name;
  if (e2.inserted[n2.name] === void 0) {
    var s = "", i3 = n2;
    do {
      var d4 = e2.insert(n2 === i3 ? "." + t : "", i3, e2.sheet, true);
      d4 !== void 0 && (s += d4), i3 = i3.next;
    } while (i3 !== void 0);
    if (s.length !== 0)
      return s;
  }
};

// https://esm.sh/v135/@emotion/serialize@1.1.3/denonext/serialize.mjs
var g3 = /[A-Z]|^ms/g;
var b = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var N3 = function(n2) {
  return n2.charCodeAt(1) === 45;
};
var y2 = function(n2) {
  return n2 != null && typeof n2 != "boolean";
};
var d2 = u4(function(o3) {
  return N3(o3) ? o3 : o3.replace(g3, "-$&").toLowerCase();
});
var E2 = function(n2, e2) {
  switch (n2) {
    case "animation":
    case "animationName":
      if (typeof e2 == "string")
        return e2.replace(b, function(a3, s, t) {
          return i = { name: s, styles: t, next: i }, s;
        });
  }
  return o2[n2] !== 1 && !N3(n2) && typeof e2 == "number" && e2 !== 0 ? e2 + "px" : e2;
};
function u6(o3, n2, e2) {
  if (e2 == null)
    return "";
  if (e2.__emotion_styles !== void 0)
    return e2;
  switch (typeof e2) {
    case "boolean":
      return "";
    case "object": {
      if (e2.anim === 1)
        return i = { name: e2.name, styles: e2.styles, next: i }, e2.name;
      if (e2.styles !== void 0) {
        var a3 = e2.next;
        if (a3 !== void 0)
          for (; a3 !== void 0; )
            i = { name: a3.name, styles: a3.styles, next: i }, a3 = a3.next;
        var s = e2.styles + ";";
        return s;
      }
      return w(o3, n2, e2);
    }
    case "function": {
      if (o3 !== void 0) {
        var t = i, r = e2(o3);
        return i = t, u6(o3, n2, r);
      }
      break;
    }
    case "string":
      if (0)
        var c3, p3;
      break;
  }
  if (n2 == null)
    return e2;
  var l4 = n2[e2];
  return l4 !== void 0 ? l4 : e2;
}
function w(o3, n2, e2) {
  var a3 = "";
  if (Array.isArray(e2))
    for (var s = 0; s < e2.length; s++)
      a3 += u6(o3, n2, e2[s]) + ";";
  else
    for (var t in e2) {
      var r = e2[t];
      if (typeof r != "object")
        n2 != null && n2[r] !== void 0 ? a3 += t + "{" + n2[r] + "}" : y2(r) && (a3 += d2(t) + ":" + E2(t, r) + ";");
      else if (Array.isArray(r) && typeof r[0] == "string" && (n2 == null || n2[r[0]] === void 0))
        for (var c3 = 0; c3 < r.length; c3++)
          y2(r[c3]) && (a3 += d2(t) + ":" + E2(t, r[c3]) + ";");
      else {
        var p3 = u6(o3, n2, r);
        switch (t) {
          case "animation":
          case "animationName": {
            a3 += d2(t) + ":" + p3 + ";";
            break;
          }
          default:
            a3 += t + "{" + p3 + "}";
        }
      }
    }
  return a3;
}
var v3 = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var i;
var D = function(n2, e2, a3) {
  if (n2.length === 1 && typeof n2[0] == "object" && n2[0] !== null && n2[0].styles !== void 0)
    return n2[0];
  var s = true, t = "";
  i = void 0;
  var r = n2[0];
  r == null || r.raw === void 0 ? (s = false, t += u6(a3, e2, r)) : t += r[0];
  for (var c3 = 1; c3 < n2.length; c3++)
    t += u6(a3, e2, n2[c3]), s && (t += r[c3]);
  var p3;
  v3.lastIndex = 0;
  for (var l4 = "", f4; (f4 = v3.exec(t)) !== null; )
    l4 += "-" + f4[1];
  var m2 = c2(t) + l4;
  return { name: m2, styles: t, next: i };
};

// https://esm.sh/v135/@emotion/css@11.10.5/denonext/create-instance.js
function v4(f4, u7) {
  if (f4.inserted[u7.name] === void 0)
    return f4.insert("", u7, f4.sheet, true);
}
function g4(f4, u7, e2) {
  var s = [], a3 = v2(f4, s, e2);
  return s.length < 2 ? e2 : a3 + u7(s);
}
var b2 = function(u7) {
  var e2 = hr(u7);
  e2.sheet.speedy = function(c3) {
    this.isSpeedy = c3;
  }, e2.compat = true;
  var s = function() {
    for (var t = arguments.length, n2 = new Array(t), r = 0; r < t; r++)
      n2[r] = arguments[r];
    var o3 = D(n2, e2.registered, void 0);
    return g2(e2, o3, false), e2.key + "-" + o3.name;
  }, a3 = function() {
    for (var t = arguments.length, n2 = new Array(t), r = 0; r < t; r++)
      n2[r] = arguments[r];
    var o3 = D(n2, e2.registered), h3 = "animation-" + o3.name;
    return v4(e2, { name: o3.name, styles: "@keyframes " + h3 + "{" + o3.styles + "}" }), h3;
  }, i3 = function() {
    for (var t = arguments.length, n2 = new Array(t), r = 0; r < t; r++)
      n2[r] = arguments[r];
    var o3 = D(n2, e2.registered);
    v4(e2, o3);
  }, l4 = function() {
    for (var t = arguments.length, n2 = new Array(t), r = 0; r < t; r++)
      n2[r] = arguments[r];
    return g4(e2.registered, s, w2(n2));
  };
  return { css: s, cx: l4, injectGlobal: i3, keyframes: a3, hydrate: function(t) {
    t.forEach(function(n2) {
      e2.inserted[n2] = true;
    });
  }, flush: function() {
    e2.registered = {}, e2.inserted = {}, e2.sheet.flush();
  }, sheet: e2.sheet, cache: e2, getRegisteredStyles: v2.bind(null, e2.registered), merge: g4.bind(null, e2.registered, s) };
};
var w2 = function f2(u7) {
  for (var e2 = "", s = 0; s < u7.length; s++) {
    var a3 = u7[s];
    if (a3 != null) {
      var i3 = void 0;
      switch (typeof a3) {
        case "boolean":
          break;
        case "object": {
          if (Array.isArray(a3))
            i3 = f2(a3);
          else {
            i3 = "";
            for (var l4 in a3)
              a3[l4] && l4 && (i3 && (i3 += " "), i3 += l4);
          }
          break;
        }
        default:
          i3 = a3;
      }
      i3 && (e2 && (e2 += " "), e2 += i3);
    }
  }
  return e2;
};
var x = b2;

// https://esm.sh/v135/@emotion/css@11.10.5/denonext/css.mjs
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
export {
  f3 as css,
  i2 as cx
};
