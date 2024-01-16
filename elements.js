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
  for (var M = 0, C = 0, b3 = g6, I = 0, D2 = 0, O = 0, d4 = 1, H = 1, k = 1, m2 = 0, z = "", q2 = a3, U2 = w3, T2 = s, i3 = z; H; )
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
            if (R(T2 = gr(i3, t, e2, M, C, a3, x2, z, q2 = [], U2 = [], b3), w3), m2 === 123)
              if (C === 0)
                tr(i3, t, T2, T2, q2, w3, b3, x2, U2);
              else
                switch (I === 99 && p(i3, 3) === 110 ? 100 : I) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    tr(r, T2, T2, s && R(gr(r, T2, T2, 0, 0, a3, x2, z, a3, q2 = [], b3), U2), a3, U2, b3, x2, s ? q2 : U2);
                    break;
                  default:
                    tr(i3, T2, T2, T2, [""], U2, 0, x2, U2);
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
var u3 = function(n2) {
  var t = /* @__PURE__ */ new WeakMap();
  return function(e2) {
    if (t.has(e2))
      return t.get(e2);
    var a3 = n2(e2);
    return t.set(e2, a3), a3;
  };
};
function u4(t) {
  var n2 = /* @__PURE__ */ Object.create(null);
  return function(e2) {
    return n2[e2] === void 0 && (n2[e2] = t(e2)), n2[e2];
  };
}
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
var o2 = { animationIterationCount: 1, aspectRatio: 1, borderImageOutset: 1, borderImageSlice: 1, borderImageWidth: 1, boxFlex: 1, boxFlexGroup: 1, boxOrdinalGroup: 1, columnCount: 1, columns: 1, flex: 1, flexGrow: 1, flexPositive: 1, flexShrink: 1, flexNegative: 1, flexOrder: 1, gridRow: 1, gridRowEnd: 1, gridRowSpan: 1, gridRowStart: 1, gridColumn: 1, gridColumnEnd: 1, gridColumnSpan: 1, gridColumnStart: 1, msGridRow: 1, msGridRowSpan: 1, msGridColumn: 1, msGridColumnSpan: 1, fontWeight: 1, lineHeight: 1, opacity: 1, order: 1, orphans: 1, tabSize: 1, widows: 1, zIndex: 1, zoom: 1, WebkitLineClamp: 1, fillOpacity: 1, floodOpacity: 1, stopOpacity: 1, strokeDasharray: 1, strokeDashoffset: 1, strokeMiterlimit: 1, strokeOpacity: 1, strokeWidth: 1 };
var g = /[A-Z]|^ms/g;
var N2 = function(n2) {
  return n2.charCodeAt(1) === 45;
};
var d = u4(function(o3) {
  return N2(o3) ? o3 : o3.replace(g, "-$&").toLowerCase();
});
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
    for (let i3 = start, curTriplet = 0; i3 < end; i3 += 3) {
      out[curTriplet++] = tripletToBase64(
        (buf[i3] << 16) + (buf[i3 + 1] << 8) + buf[i3 + 2]
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
      let i3;
      for (i3 = 0; i3 < len; i3 += 4) {
        tmp = revLookup3[b64.charCodeAt(i3)] << 18 | revLookup3[b64.charCodeAt(i3 + 1)] << 12 | revLookup3[b64.charCodeAt(i3 + 2)] << 6 | revLookup3[b64.charCodeAt(i3 + 3)];
        buf[curByte++] = tmp >> 16 & 255;
        buf[curByte++] = tmp >> 8 & 255;
        buf[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup3[b64.charCodeAt(i3)] << 2 | revLookup3[b64.charCodeAt(i3 + 1)] >> 4;
        buf[curByte++] = tmp & 255;
      } else if (placeHoldersLen === 1) {
        tmp = revLookup3[b64.charCodeAt(i3)] << 10 | revLookup3[b64.charCodeAt(i3 + 1)] << 4 | revLookup3[b64.charCodeAt(i3 + 2)] >> 2;
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
      for (let i3 = 0; i3 < len2; i3 += maxChunkLength) {
        chunkEnd = i3 + maxChunkLength;
        parts[curChunk++] = encodeChunk(
          buf,
          i3,
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
for (let i3 = 0, l4 = code.length; i3 < l4; ++i3) {
  lookup[i3] = code[i3];
  revLookup[code.charCodeAt(i3)] = i3;
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
for (let i3 = 0, l4 = code2.length; i3 < l4; ++i3) {
  lookup2[i3] = code2[i3];
  revLookup2[code2.charCodeAt(i3)] = i3;
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
  for (let i3 = 0; i3 < end; ++i3) {
    buf[i3] = parseInt(hex.substr(i3 * 2, 2), 16);
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
    for (let i3 = 0, len = msg.length; i3 < len; i3++) {
      this._buf[this._bufIdx++] = msg[i3];
      if (this._bufIdx === 64) {
        this._transform();
        this._bufIdx = 0;
      }
    }
    const c3 = this._count;
    if ((c3[0] += msg.length << 3) < msg.length << 3) {
      c3[1]++;
    }
    c3[1] += msg.length >>> 29;
    return this;
  }
  /** Finalizes the hash with additional message data. */
  digest(outputEncoding) {
    if (this._finalized) {
      throw new Error("digest has already been called.");
    }
    this._finalized = true;
    const b3 = this._buf;
    let idx = this._bufIdx;
    b3[idx++] = 128;
    while (idx !== 56) {
      if (idx === 64) {
        this._transform();
        idx = 0;
      }
      b3[idx++] = 0;
    }
    const c3 = this._count;
    b3[56] = c3[1] >>> 24 & 255;
    b3[57] = c3[1] >>> 16 & 255;
    b3[58] = c3[1] >>> 8 & 255;
    b3[59] = c3[1] >>> 0 & 255;
    b3[60] = c3[0] >>> 24 & 255;
    b3[61] = c3[0] >>> 16 & 255;
    b3[62] = c3[0] >>> 8 & 255;
    b3[63] = c3[0] >>> 0 & 255;
    this._transform();
    const hash2 = new Uint8Array(BYTES);
    for (let i3 = 0; i3 < 8; i3++) {
      hash2[(i3 << 2) + 0] = this._H[i3] >>> 24 & 255;
      hash2[(i3 << 2) + 1] = this._H[i3] >>> 16 & 255;
      hash2[(i3 << 2) + 2] = this._H[i3] >>> 8 & 255;
      hash2[(i3 << 2) + 3] = this._H[i3] >>> 0 & 255;
    }
    this.init();
    return outputEncoding ? decode(hash2, outputEncoding) : hash2;
  }
  /** Performs one transformation cycle. */
  _transform() {
    const h3 = this._H;
    let h0 = h3[0];
    let h1 = h3[1];
    let h22 = h3[2];
    let h32 = h3[3];
    let h4 = h3[4];
    let h5 = h3[5];
    let h6 = h3[6];
    let h7 = h3[7];
    const w3 = new Uint32Array(16);
    let i3;
    for (i3 = 0; i3 < 16; i3++) {
      w3[i3] = this._buf[(i3 << 2) + 3] | this._buf[(i3 << 2) + 2] << 8 | this._buf[(i3 << 2) + 1] << 16 | this._buf[i3 << 2] << 24;
    }
    for (i3 = 0; i3 < 64; i3++) {
      let tmp;
      if (i3 < 16) {
        tmp = w3[i3];
      } else {
        let a3 = w3[i3 + 1 & 15];
        let b3 = w3[i3 + 14 & 15];
        tmp = w3[i3 & 15] = (a3 >>> 7 ^ a3 >>> 18 ^ a3 >>> 3 ^ a3 << 25 ^ a3 << 14) + (b3 >>> 17 ^ b3 >>> 19 ^ b3 >>> 10 ^ b3 << 15 ^ b3 << 13) + w3[i3 & 15] + w3[i3 + 9 & 15] | 0;
      }
      tmp = tmp + h7 + (h4 >>> 6 ^ h4 >>> 11 ^ h4 >>> 25 ^ h4 << 26 ^ h4 << 21 ^ h4 << 7) + (h6 ^ h4 & (h5 ^ h6)) + this._K[i3] | 0;
      h7 = h6;
      h6 = h5;
      h5 = h4;
      h4 = h32 + tmp;
      h32 = h22;
      h22 = h1;
      h1 = h0;
      h0 = tmp + (h1 & h22 ^ h32 & (h1 ^ h22)) + (h1 >>> 2 ^ h1 >>> 13 ^ h1 >>> 22 ^ h1 << 30 ^ h1 << 19 ^ h1 << 10) | 0;
    }
    h3[0] = h3[0] + h0 | 0;
    h3[1] = h3[1] + h1 | 0;
    h3[2] = h3[2] + h22 | 0;
    h3[3] = h3[3] + h32 | 0;
    h3[4] = h3[4] + h4 | 0;
    h3[5] = h3[5] + h5 | 0;
    h3[6] = h3[6] + h6 | 0;
    h3[7] = h3[7] + h7 | 0;
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
  const key = `${name}${hash_default(`${classStyles}`)}`;
  if (!dynamicClasses.has(key)) {
    dynamicClasses.add(key);
    for (const each of classStyles) {
      helperStyle.innerHTML += `.${key}${each}`;
    }
  }
  return key;
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

// https://esm.sh/v135/showdown@2.1.0/denonext/showdown.mjs
var ae = Object.create;
var F2 = Object.defineProperty;
var ne = Object.getOwnPropertyDescriptor;
var ce = Object.getOwnPropertyNames;
var se = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var te = (b3, k) => () => (k || b3((k = { exports: {} }).exports, k), k.exports);
var fe = (b3, k) => {
  for (var r in k)
    F2(b3, r, { get: k[r], enumerable: true });
};
var U = (b3, k, r, L2) => {
  if (k && typeof k == "object" || typeof k == "function")
    for (let z of ce(k))
      !ie.call(b3, z) && z !== r && F2(b3, z, { get: () => k[z], enumerable: !(L2 = ne(k, z)) || L2.enumerable });
  return b3;
};
var B2 = (b3, k, r) => (U(b3, k, "default"), r && U(r, k, "default"));
var Q2 = (b3, k, r) => (r = b3 != null ? ae(se(b3)) : {}, U(k || !b3 || !b3.__esModule ? F2(r, "default", { value: b3, enumerable: true }) : r, b3));
var q = te((X2, $2) => {
  (function() {
    function b3(e2) {
      "use strict";
      var u7 = { omitExtraWLInCodeBlocks: { defaultValue: false, describe: "Omit the default extra whiteline added to code blocks", type: "boolean" }, noHeaderId: { defaultValue: false, describe: "Turn on/off generated header id", type: "boolean" }, prefixHeaderId: { defaultValue: false, describe: "Add a prefix to the generated header ids. Passing a string will prefix that string to the header id. Setting to true will add a generic 'section-' prefix", type: "string" }, rawPrefixHeaderId: { defaultValue: false, describe: 'Setting this option to true will prevent showdown from modifying the prefix. This might result in malformed IDs (if, for instance, the " char is used in the prefix)', type: "boolean" }, ghCompatibleHeaderId: { defaultValue: false, describe: "Generate header ids compatible with github style (spaces are replaced with dashes, a bunch of non alphanumeric chars are removed)", type: "boolean" }, rawHeaderId: { defaultValue: false, describe: `Remove only spaces, ' and " from generated header ids (including prefixes), replacing them with dashes (-). WARNING: This might result in malformed ids`, type: "boolean" }, headerLevelStart: { defaultValue: false, describe: "The header blocks level start", type: "integer" }, parseImgDimensions: { defaultValue: false, describe: "Turn on/off image dimension parsing", type: "boolean" }, simplifiedAutoLink: { defaultValue: false, describe: "Turn on/off GFM autolink style", type: "boolean" }, excludeTrailingPunctuationFromURLs: { defaultValue: false, describe: "Excludes trailing punctuation from links generated with autoLinking", type: "boolean" }, literalMidWordUnderscores: { defaultValue: false, describe: "Parse midword underscores as literal underscores", type: "boolean" }, literalMidWordAsterisks: { defaultValue: false, describe: "Parse midword asterisks as literal asterisks", type: "boolean" }, strikethrough: { defaultValue: false, describe: "Turn on/off strikethrough support", type: "boolean" }, tables: { defaultValue: false, describe: "Turn on/off tables support", type: "boolean" }, tablesHeaderId: { defaultValue: false, describe: "Add an id to table headers", type: "boolean" }, ghCodeBlocks: { defaultValue: true, describe: "Turn on/off GFM fenced code blocks support", type: "boolean" }, tasklists: { defaultValue: false, describe: "Turn on/off GFM tasklist support", type: "boolean" }, smoothLivePreview: { defaultValue: false, describe: "Prevents weird effects in live previews due to incomplete input", type: "boolean" }, smartIndentationFix: { defaultValue: false, describe: "Tries to smartly fix indentation in es6 strings", type: "boolean" }, disableForced4SpacesIndentedSublists: { defaultValue: false, describe: "Disables the requirement of indenting nested sublists by 4 spaces", type: "boolean" }, simpleLineBreaks: { defaultValue: false, describe: "Parses simple line breaks as <br> (GFM Style)", type: "boolean" }, requireSpaceBeforeHeadingText: { defaultValue: false, describe: "Makes adding a space between `#` and the header text mandatory (GFM Style)", type: "boolean" }, ghMentions: { defaultValue: false, describe: "Enables github @mentions", type: "boolean" }, ghMentionsLink: { defaultValue: "https://github.com/{u}", describe: "Changes the link generated by @mentions. Only applies if ghMentions option is enabled.", type: "string" }, encodeEmails: { defaultValue: true, describe: "Encode e-mail addresses through the use of Character Entities, transforming ASCII e-mail addresses into its equivalent decimal entities", type: "boolean" }, openLinksInNewWindow: { defaultValue: false, describe: "Open all links in new windows", type: "boolean" }, backslashEscapesHTMLTags: { defaultValue: false, describe: "Support for HTML Tag escaping. ex: <div>foo</div>", type: "boolean" }, emoji: { defaultValue: false, describe: "Enable emoji support. Ex: `this is a :smile: emoji`", type: "boolean" }, underline: { defaultValue: false, describe: "Enable support for underline. Syntax is double or triple underscores: `__underline word__`. With this option enabled, underscores no longer parses into `<em>` and `<strong>`", type: "boolean" }, ellipsis: { defaultValue: true, describe: "Replaces three dots with the ellipsis unicode character", type: "boolean" }, completeHTMLDocument: { defaultValue: false, describe: "Outputs a complete html document, including `<html>`, `<head>` and `<body>` tags", type: "boolean" }, metadata: { defaultValue: false, describe: "Enable support for document metadata (defined at the top of the document between `\xAB\xAB\xAB` and `\xBB\xBB\xBB` or between `---` and `---`).", type: "boolean" }, splitAdjacentBlockquotes: { defaultValue: false, describe: "Split adjacent blockquote blocks", type: "boolean" } };
      if (e2 === false)
        return JSON.parse(JSON.stringify(u7));
      var d4 = {};
      for (var a3 in u7)
        u7.hasOwnProperty(a3) && (d4[a3] = u7[a3].defaultValue);
      return d4;
    }
    function k() {
      "use strict";
      var e2 = b3(true), u7 = {};
      for (var d4 in e2)
        e2.hasOwnProperty(d4) && (u7[d4] = true);
      return u7;
    }
    var r = {}, L2 = {}, z = {}, E3 = b3(true), R2 = "vanilla", H = { github: { omitExtraWLInCodeBlocks: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, disableForced4SpacesIndentedSublists: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghCompatibleHeaderId: true, ghMentions: true, backslashEscapesHTMLTags: true, emoji: true, splitAdjacentBlockquotes: true }, original: { noHeaderId: true, ghCodeBlocks: false }, ghost: { omitExtraWLInCodeBlocks: true, parseImgDimensions: true, simplifiedAutoLink: true, excludeTrailingPunctuationFromURLs: true, literalMidWordUnderscores: true, strikethrough: true, tables: true, tablesHeaderId: true, ghCodeBlocks: true, tasklists: true, smoothLivePreview: true, simpleLineBreaks: true, requireSpaceBeforeHeadingText: true, ghMentions: false, encodeEmails: true }, vanilla: b3(true), allOn: k() };
    r.helper = {}, r.extensions = {}, r.setOption = function(e2, u7) {
      "use strict";
      return E3[e2] = u7, this;
    }, r.getOption = function(e2) {
      "use strict";
      return E3[e2];
    }, r.getOptions = function() {
      "use strict";
      return E3;
    }, r.resetOptions = function() {
      "use strict";
      E3 = b3(true);
    }, r.setFlavor = function(e2) {
      "use strict";
      if (!H.hasOwnProperty(e2))
        throw Error(e2 + " flavor was not found");
      r.resetOptions();
      var u7 = H[e2];
      R2 = e2;
      for (var d4 in u7)
        u7.hasOwnProperty(d4) && (E3[d4] = u7[d4]);
    }, r.getFlavor = function() {
      "use strict";
      return R2;
    }, r.getFlavorOptions = function(e2) {
      "use strict";
      if (H.hasOwnProperty(e2))
        return H[e2];
    }, r.getDefaultOptions = function(e2) {
      "use strict";
      return b3(e2);
    }, r.subParser = function(e2, u7) {
      "use strict";
      if (r.helper.isString(e2))
        if (typeof u7 < "u")
          L2[e2] = u7;
        else {
          if (L2.hasOwnProperty(e2))
            return L2[e2];
          throw Error("SubParser named " + e2 + " not registered!");
        }
    }, r.extension = function(e2, u7) {
      "use strict";
      if (!r.helper.isString(e2))
        throw Error("Extension 'name' must be a string");
      if (e2 = r.helper.stdExtName(e2), r.helper.isUndefined(u7)) {
        if (!z.hasOwnProperty(e2))
          throw Error("Extension named " + e2 + " is not registered!");
        return z[e2];
      } else {
        typeof u7 == "function" && (u7 = u7()), r.helper.isArray(u7) || (u7 = [u7]);
        var d4 = T2(u7, e2);
        if (d4.valid)
          z[e2] = u7;
        else
          throw Error(d4.error);
      }
    }, r.getAllExtensions = function() {
      "use strict";
      return z;
    }, r.removeExtension = function(e2) {
      "use strict";
      delete z[e2];
    }, r.resetExtensions = function() {
      "use strict";
      z = {};
    };
    function T2(e2, u7) {
      "use strict";
      var d4 = u7 ? "Error in " + u7 + " extension->" : "Error in unnamed extension", a3 = { valid: true, error: "" };
      r.helper.isArray(e2) || (e2 = [e2]);
      for (var s = 0; s < e2.length; ++s) {
        var i3 = d4 + " sub-extension " + s + ": ", c3 = e2[s];
        if (typeof c3 != "object")
          return a3.valid = false, a3.error = i3 + "must be an object, but " + typeof c3 + " given", a3;
        if (!r.helper.isString(c3.type))
          return a3.valid = false, a3.error = i3 + 'property "type" must be a string, but ' + typeof c3.type + " given", a3;
        var t = c3.type = c3.type.toLowerCase();
        if (t === "language" && (t = c3.type = "lang"), t === "html" && (t = c3.type = "output"), t !== "lang" && t !== "output" && t !== "listener")
          return a3.valid = false, a3.error = i3 + "type " + t + ' is not recognized. Valid values: "lang/language", "output/html" or "listener"', a3;
        if (t === "listener") {
          if (r.helper.isUndefined(c3.listeners))
            return a3.valid = false, a3.error = i3 + '. Extensions of type "listener" must have a property called "listeners"', a3;
        } else if (r.helper.isUndefined(c3.filter) && r.helper.isUndefined(c3.regex))
          return a3.valid = false, a3.error = i3 + t + ' extensions must define either a "regex" property or a "filter" method', a3;
        if (c3.listeners) {
          if (typeof c3.listeners != "object")
            return a3.valid = false, a3.error = i3 + '"listeners" property must be an object but ' + typeof c3.listeners + " given", a3;
          for (var p3 in c3.listeners)
            if (c3.listeners.hasOwnProperty(p3) && typeof c3.listeners[p3] != "function")
              return a3.valid = false, a3.error = i3 + '"listeners" property must be an hash of [event name]: [callback]. listeners.' + p3 + " must be a function but " + typeof c3.listeners[p3] + " given", a3;
        }
        if (c3.filter) {
          if (typeof c3.filter != "function")
            return a3.valid = false, a3.error = i3 + '"filter" must be a function, but ' + typeof c3.filter + " given", a3;
        } else if (c3.regex) {
          if (r.helper.isString(c3.regex) && (c3.regex = new RegExp(c3.regex, "g")), !(c3.regex instanceof RegExp))
            return a3.valid = false, a3.error = i3 + '"regex" property must either be a string or a RegExp object, but ' + typeof c3.regex + " given", a3;
          if (r.helper.isUndefined(c3.replace))
            return a3.valid = false, a3.error = i3 + '"regex" extensions must implement a replace string or function', a3;
        }
      }
      return a3;
    }
    r.validateExtension = function(e2) {
      "use strict";
      var u7 = T2(e2, null);
      return u7.valid ? true : (console.warn(u7.error), false);
    }, r.hasOwnProperty("helper") || (r.helper = {}), r.helper.isString = function(e2) {
      "use strict";
      return typeof e2 == "string" || e2 instanceof String;
    }, r.helper.isFunction = function(e2) {
      "use strict";
      var u7 = {};
      return e2 && u7.toString.call(e2) === "[object Function]";
    }, r.helper.isArray = function(e2) {
      "use strict";
      return Array.isArray(e2);
    }, r.helper.isUndefined = function(e2) {
      "use strict";
      return typeof e2 > "u";
    }, r.helper.forEach = function(e2, u7) {
      "use strict";
      if (r.helper.isUndefined(e2))
        throw new Error("obj param is required");
      if (r.helper.isUndefined(u7))
        throw new Error("callback param is required");
      if (!r.helper.isFunction(u7))
        throw new Error("callback param must be a function/closure");
      if (typeof e2.forEach == "function")
        e2.forEach(u7);
      else if (r.helper.isArray(e2))
        for (var d4 = 0; d4 < e2.length; d4++)
          u7(e2[d4], d4, e2);
      else if (typeof e2 == "object")
        for (var a3 in e2)
          e2.hasOwnProperty(a3) && u7(e2[a3], a3, e2);
      else
        throw new Error("obj does not seem to be an array or an iterable object");
    }, r.helper.stdExtName = function(e2) {
      "use strict";
      return e2.replace(/[_?*+\/\\.^-]/g, "").replace(/\s/g, "").toLowerCase();
    };
    function G2(e2, u7) {
      "use strict";
      var d4 = u7.charCodeAt(0);
      return "\xA8E" + d4 + "E";
    }
    r.helper.escapeCharactersCallback = G2, r.helper.escapeCharacters = function(e2, u7, d4) {
      "use strict";
      var a3 = "([" + u7.replace(/([\[\]\\])/g, "\\$1") + "])";
      d4 && (a3 = "\\\\" + a3);
      var s = new RegExp(a3, "g");
      return e2 = e2.replace(s, G2), e2;
    }, r.helper.unescapeHTMLEntities = function(e2) {
      "use strict";
      return e2.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
    };
    var O = function(e2, u7, d4, a3) {
      "use strict";
      var s = a3 || "", i3 = s.indexOf("g") > -1, c3 = new RegExp(u7 + "|" + d4, "g" + s.replace(/g/g, "")), t = new RegExp(u7, s.replace(/g/g, "")), p3 = [], l4, o3, h3, n2, f4;
      do
        for (l4 = 0; h3 = c3.exec(e2); )
          if (t.test(h3[0]))
            l4++ || (o3 = c3.lastIndex, n2 = o3 - h3[0].length);
          else if (l4 && !--l4) {
            f4 = h3.index + h3[0].length;
            var _2 = { left: { start: n2, end: o3 }, match: { start: o3, end: h3.index }, right: { start: h3.index, end: f4 }, wholeMatch: { start: n2, end: f4 } };
            if (p3.push(_2), !i3)
              return p3;
          }
      while (l4 && (c3.lastIndex = o3));
      return p3;
    };
    r.helper.matchRecursiveRegExp = function(e2, u7, d4, a3) {
      "use strict";
      for (var s = O(e2, u7, d4, a3), i3 = [], c3 = 0; c3 < s.length; ++c3)
        i3.push([e2.slice(s[c3].wholeMatch.start, s[c3].wholeMatch.end), e2.slice(s[c3].match.start, s[c3].match.end), e2.slice(s[c3].left.start, s[c3].left.end), e2.slice(s[c3].right.start, s[c3].right.end)]);
      return i3;
    }, r.helper.replaceRecursiveRegExp = function(e2, u7, d4, a3, s) {
      "use strict";
      if (!r.helper.isFunction(u7)) {
        var i3 = u7;
        u7 = function() {
          return i3;
        };
      }
      var c3 = O(e2, d4, a3, s), t = e2, p3 = c3.length;
      if (p3 > 0) {
        var l4 = [];
        c3[0].wholeMatch.start !== 0 && l4.push(e2.slice(0, c3[0].wholeMatch.start));
        for (var o3 = 0; o3 < p3; ++o3)
          l4.push(u7(e2.slice(c3[o3].wholeMatch.start, c3[o3].wholeMatch.end), e2.slice(c3[o3].match.start, c3[o3].match.end), e2.slice(c3[o3].left.start, c3[o3].left.end), e2.slice(c3[o3].right.start, c3[o3].right.end))), o3 < p3 - 1 && l4.push(e2.slice(c3[o3].wholeMatch.end, c3[o3 + 1].wholeMatch.start));
        c3[p3 - 1].wholeMatch.end < e2.length && l4.push(e2.slice(c3[p3 - 1].wholeMatch.end)), t = l4.join("");
      }
      return t;
    }, r.helper.regexIndexOf = function(e2, u7, d4) {
      "use strict";
      if (!r.helper.isString(e2))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      if (!(u7 instanceof RegExp))
        throw "InvalidArgumentError: second parameter of showdown.helper.regexIndexOf function must be an instance of RegExp";
      var a3 = e2.substring(d4 || 0).search(u7);
      return a3 >= 0 ? a3 + (d4 || 0) : a3;
    }, r.helper.splitAtIndex = function(e2, u7) {
      "use strict";
      if (!r.helper.isString(e2))
        throw "InvalidArgumentError: first parameter of showdown.helper.regexIndexOf function must be a string";
      return [e2.substring(0, u7), e2.substring(u7)];
    }, r.helper.encodeEmailAddress = function(e2) {
      "use strict";
      var u7 = [function(d4) {
        return "&#" + d4.charCodeAt(0) + ";";
      }, function(d4) {
        return "&#x" + d4.charCodeAt(0).toString(16) + ";";
      }, function(d4) {
        return d4;
      }];
      return e2 = e2.replace(/./g, function(d4) {
        if (d4 === "@")
          d4 = u7[Math.floor(Math.random() * 2)](d4);
        else {
          var a3 = Math.random();
          d4 = a3 > 0.9 ? u7[2](d4) : a3 > 0.45 ? u7[1](d4) : u7[0](d4);
        }
        return d4;
      }), e2;
    }, r.helper.padEnd = function(u7, d4, a3) {
      "use strict";
      return d4 = d4 >> 0, a3 = String(a3 || " "), u7.length > d4 ? String(u7) : (d4 = d4 - u7.length, d4 > a3.length && (a3 += a3.repeat(d4 / a3.length)), String(u7) + a3.slice(0, d4));
    }, typeof console > "u" && (console = { warn: function(e2) {
      "use strict";
      alert(e2);
    }, log: function(e2) {
      "use strict";
      alert(e2);
    }, error: function(e2) {
      "use strict";
      throw e2;
    } }), r.helper.regexes = { asteriskDashAndColon: /([*_:~])/g }, r.helper.emojis = { "+1": "\u{1F44D}", "-1": "\u{1F44E}", 100: "\u{1F4AF}", 1234: "\u{1F522}", "1st_place_medal": "\u{1F947}", "2nd_place_medal": "\u{1F948}", "3rd_place_medal": "\u{1F949}", "8ball": "\u{1F3B1}", a: "\u{1F170}\uFE0F", ab: "\u{1F18E}", abc: "\u{1F524}", abcd: "\u{1F521}", accept: "\u{1F251}", aerial_tramway: "\u{1F6A1}", airplane: "\u2708\uFE0F", alarm_clock: "\u23F0", alembic: "\u2697\uFE0F", alien: "\u{1F47D}", ambulance: "\u{1F691}", amphora: "\u{1F3FA}", anchor: "\u2693\uFE0F", angel: "\u{1F47C}", anger: "\u{1F4A2}", angry: "\u{1F620}", anguished: "\u{1F627}", ant: "\u{1F41C}", apple: "\u{1F34E}", aquarius: "\u2652\uFE0F", aries: "\u2648\uFE0F", arrow_backward: "\u25C0\uFE0F", arrow_double_down: "\u23EC", arrow_double_up: "\u23EB", arrow_down: "\u2B07\uFE0F", arrow_down_small: "\u{1F53D}", arrow_forward: "\u25B6\uFE0F", arrow_heading_down: "\u2935\uFE0F", arrow_heading_up: "\u2934\uFE0F", arrow_left: "\u2B05\uFE0F", arrow_lower_left: "\u2199\uFE0F", arrow_lower_right: "\u2198\uFE0F", arrow_right: "\u27A1\uFE0F", arrow_right_hook: "\u21AA\uFE0F", arrow_up: "\u2B06\uFE0F", arrow_up_down: "\u2195\uFE0F", arrow_up_small: "\u{1F53C}", arrow_upper_left: "\u2196\uFE0F", arrow_upper_right: "\u2197\uFE0F", arrows_clockwise: "\u{1F503}", arrows_counterclockwise: "\u{1F504}", art: "\u{1F3A8}", articulated_lorry: "\u{1F69B}", artificial_satellite: "\u{1F6F0}", astonished: "\u{1F632}", athletic_shoe: "\u{1F45F}", atm: "\u{1F3E7}", atom_symbol: "\u269B\uFE0F", avocado: "\u{1F951}", b: "\u{1F171}\uFE0F", baby: "\u{1F476}", baby_bottle: "\u{1F37C}", baby_chick: "\u{1F424}", baby_symbol: "\u{1F6BC}", back: "\u{1F519}", bacon: "\u{1F953}", badminton: "\u{1F3F8}", baggage_claim: "\u{1F6C4}", baguette_bread: "\u{1F956}", balance_scale: "\u2696\uFE0F", balloon: "\u{1F388}", ballot_box: "\u{1F5F3}", ballot_box_with_check: "\u2611\uFE0F", bamboo: "\u{1F38D}", banana: "\u{1F34C}", bangbang: "\u203C\uFE0F", bank: "\u{1F3E6}", bar_chart: "\u{1F4CA}", barber: "\u{1F488}", baseball: "\u26BE\uFE0F", basketball: "\u{1F3C0}", basketball_man: "\u26F9\uFE0F", basketball_woman: "\u26F9\uFE0F&zwj;\u2640\uFE0F", bat: "\u{1F987}", bath: "\u{1F6C0}", bathtub: "\u{1F6C1}", battery: "\u{1F50B}", beach_umbrella: "\u{1F3D6}", bear: "\u{1F43B}", bed: "\u{1F6CF}", bee: "\u{1F41D}", beer: "\u{1F37A}", beers: "\u{1F37B}", beetle: "\u{1F41E}", beginner: "\u{1F530}", bell: "\u{1F514}", bellhop_bell: "\u{1F6CE}", bento: "\u{1F371}", biking_man: "\u{1F6B4}", bike: "\u{1F6B2}", biking_woman: "\u{1F6B4}&zwj;\u2640\uFE0F", bikini: "\u{1F459}", biohazard: "\u2623\uFE0F", bird: "\u{1F426}", birthday: "\u{1F382}", black_circle: "\u26AB\uFE0F", black_flag: "\u{1F3F4}", black_heart: "\u{1F5A4}", black_joker: "\u{1F0CF}", black_large_square: "\u2B1B\uFE0F", black_medium_small_square: "\u25FE\uFE0F", black_medium_square: "\u25FC\uFE0F", black_nib: "\u2712\uFE0F", black_small_square: "\u25AA\uFE0F", black_square_button: "\u{1F532}", blonde_man: "\u{1F471}", blonde_woman: "\u{1F471}&zwj;\u2640\uFE0F", blossom: "\u{1F33C}", blowfish: "\u{1F421}", blue_book: "\u{1F4D8}", blue_car: "\u{1F699}", blue_heart: "\u{1F499}", blush: "\u{1F60A}", boar: "\u{1F417}", boat: "\u26F5\uFE0F", bomb: "\u{1F4A3}", book: "\u{1F4D6}", bookmark: "\u{1F516}", bookmark_tabs: "\u{1F4D1}", books: "\u{1F4DA}", boom: "\u{1F4A5}", boot: "\u{1F462}", bouquet: "\u{1F490}", bowing_man: "\u{1F647}", bow_and_arrow: "\u{1F3F9}", bowing_woman: "\u{1F647}&zwj;\u2640\uFE0F", bowling: "\u{1F3B3}", boxing_glove: "\u{1F94A}", boy: "\u{1F466}", bread: "\u{1F35E}", bride_with_veil: "\u{1F470}", bridge_at_night: "\u{1F309}", briefcase: "\u{1F4BC}", broken_heart: "\u{1F494}", bug: "\u{1F41B}", building_construction: "\u{1F3D7}", bulb: "\u{1F4A1}", bullettrain_front: "\u{1F685}", bullettrain_side: "\u{1F684}", burrito: "\u{1F32F}", bus: "\u{1F68C}", business_suit_levitating: "\u{1F574}", busstop: "\u{1F68F}", bust_in_silhouette: "\u{1F464}", busts_in_silhouette: "\u{1F465}", butterfly: "\u{1F98B}", cactus: "\u{1F335}", cake: "\u{1F370}", calendar: "\u{1F4C6}", call_me_hand: "\u{1F919}", calling: "\u{1F4F2}", camel: "\u{1F42B}", camera: "\u{1F4F7}", camera_flash: "\u{1F4F8}", camping: "\u{1F3D5}", cancer: "\u264B\uFE0F", candle: "\u{1F56F}", candy: "\u{1F36C}", canoe: "\u{1F6F6}", capital_abcd: "\u{1F520}", capricorn: "\u2651\uFE0F", car: "\u{1F697}", card_file_box: "\u{1F5C3}", card_index: "\u{1F4C7}", card_index_dividers: "\u{1F5C2}", carousel_horse: "\u{1F3A0}", carrot: "\u{1F955}", cat: "\u{1F431}", cat2: "\u{1F408}", cd: "\u{1F4BF}", chains: "\u26D3", champagne: "\u{1F37E}", chart: "\u{1F4B9}", chart_with_downwards_trend: "\u{1F4C9}", chart_with_upwards_trend: "\u{1F4C8}", checkered_flag: "\u{1F3C1}", cheese: "\u{1F9C0}", cherries: "\u{1F352}", cherry_blossom: "\u{1F338}", chestnut: "\u{1F330}", chicken: "\u{1F414}", children_crossing: "\u{1F6B8}", chipmunk: "\u{1F43F}", chocolate_bar: "\u{1F36B}", christmas_tree: "\u{1F384}", church: "\u26EA\uFE0F", cinema: "\u{1F3A6}", circus_tent: "\u{1F3AA}", city_sunrise: "\u{1F307}", city_sunset: "\u{1F306}", cityscape: "\u{1F3D9}", cl: "\u{1F191}", clamp: "\u{1F5DC}", clap: "\u{1F44F}", clapper: "\u{1F3AC}", classical_building: "\u{1F3DB}", clinking_glasses: "\u{1F942}", clipboard: "\u{1F4CB}", clock1: "\u{1F550}", clock10: "\u{1F559}", clock1030: "\u{1F565}", clock11: "\u{1F55A}", clock1130: "\u{1F566}", clock12: "\u{1F55B}", clock1230: "\u{1F567}", clock130: "\u{1F55C}", clock2: "\u{1F551}", clock230: "\u{1F55D}", clock3: "\u{1F552}", clock330: "\u{1F55E}", clock4: "\u{1F553}", clock430: "\u{1F55F}", clock5: "\u{1F554}", clock530: "\u{1F560}", clock6: "\u{1F555}", clock630: "\u{1F561}", clock7: "\u{1F556}", clock730: "\u{1F562}", clock8: "\u{1F557}", clock830: "\u{1F563}", clock9: "\u{1F558}", clock930: "\u{1F564}", closed_book: "\u{1F4D5}", closed_lock_with_key: "\u{1F510}", closed_umbrella: "\u{1F302}", cloud: "\u2601\uFE0F", cloud_with_lightning: "\u{1F329}", cloud_with_lightning_and_rain: "\u26C8", cloud_with_rain: "\u{1F327}", cloud_with_snow: "\u{1F328}", clown_face: "\u{1F921}", clubs: "\u2663\uFE0F", cocktail: "\u{1F378}", coffee: "\u2615\uFE0F", coffin: "\u26B0\uFE0F", cold_sweat: "\u{1F630}", comet: "\u2604\uFE0F", computer: "\u{1F4BB}", computer_mouse: "\u{1F5B1}", confetti_ball: "\u{1F38A}", confounded: "\u{1F616}", confused: "\u{1F615}", congratulations: "\u3297\uFE0F", construction: "\u{1F6A7}", construction_worker_man: "\u{1F477}", construction_worker_woman: "\u{1F477}&zwj;\u2640\uFE0F", control_knobs: "\u{1F39B}", convenience_store: "\u{1F3EA}", cookie: "\u{1F36A}", cool: "\u{1F192}", policeman: "\u{1F46E}", copyright: "\xA9\uFE0F", corn: "\u{1F33D}", couch_and_lamp: "\u{1F6CB}", couple: "\u{1F46B}", couple_with_heart_woman_man: "\u{1F491}", couple_with_heart_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F468}", couple_with_heart_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F469}", couplekiss_man_man: "\u{1F468}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F468}", couplekiss_man_woman: "\u{1F48F}", couplekiss_woman_woman: "\u{1F469}&zwj;\u2764\uFE0F&zwj;\u{1F48B}&zwj;\u{1F469}", cow: "\u{1F42E}", cow2: "\u{1F404}", cowboy_hat_face: "\u{1F920}", crab: "\u{1F980}", crayon: "\u{1F58D}", credit_card: "\u{1F4B3}", crescent_moon: "\u{1F319}", cricket: "\u{1F3CF}", crocodile: "\u{1F40A}", croissant: "\u{1F950}", crossed_fingers: "\u{1F91E}", crossed_flags: "\u{1F38C}", crossed_swords: "\u2694\uFE0F", crown: "\u{1F451}", cry: "\u{1F622}", crying_cat_face: "\u{1F63F}", crystal_ball: "\u{1F52E}", cucumber: "\u{1F952}", cupid: "\u{1F498}", curly_loop: "\u27B0", currency_exchange: "\u{1F4B1}", curry: "\u{1F35B}", custard: "\u{1F36E}", customs: "\u{1F6C3}", cyclone: "\u{1F300}", dagger: "\u{1F5E1}", dancer: "\u{1F483}", dancing_women: "\u{1F46F}", dancing_men: "\u{1F46F}&zwj;\u2642\uFE0F", dango: "\u{1F361}", dark_sunglasses: "\u{1F576}", dart: "\u{1F3AF}", dash: "\u{1F4A8}", date: "\u{1F4C5}", deciduous_tree: "\u{1F333}", deer: "\u{1F98C}", department_store: "\u{1F3EC}", derelict_house: "\u{1F3DA}", desert: "\u{1F3DC}", desert_island: "\u{1F3DD}", desktop_computer: "\u{1F5A5}", male_detective: "\u{1F575}\uFE0F", diamond_shape_with_a_dot_inside: "\u{1F4A0}", diamonds: "\u2666\uFE0F", disappointed: "\u{1F61E}", disappointed_relieved: "\u{1F625}", dizzy: "\u{1F4AB}", dizzy_face: "\u{1F635}", do_not_litter: "\u{1F6AF}", dog: "\u{1F436}", dog2: "\u{1F415}", dollar: "\u{1F4B5}", dolls: "\u{1F38E}", dolphin: "\u{1F42C}", door: "\u{1F6AA}", doughnut: "\u{1F369}", dove: "\u{1F54A}", dragon: "\u{1F409}", dragon_face: "\u{1F432}", dress: "\u{1F457}", dromedary_camel: "\u{1F42A}", drooling_face: "\u{1F924}", droplet: "\u{1F4A7}", drum: "\u{1F941}", duck: "\u{1F986}", dvd: "\u{1F4C0}", "e-mail": "\u{1F4E7}", eagle: "\u{1F985}", ear: "\u{1F442}", ear_of_rice: "\u{1F33E}", earth_africa: "\u{1F30D}", earth_americas: "\u{1F30E}", earth_asia: "\u{1F30F}", egg: "\u{1F95A}", eggplant: "\u{1F346}", eight_pointed_black_star: "\u2734\uFE0F", eight_spoked_asterisk: "\u2733\uFE0F", electric_plug: "\u{1F50C}", elephant: "\u{1F418}", email: "\u2709\uFE0F", end: "\u{1F51A}", envelope_with_arrow: "\u{1F4E9}", euro: "\u{1F4B6}", european_castle: "\u{1F3F0}", european_post_office: "\u{1F3E4}", evergreen_tree: "\u{1F332}", exclamation: "\u2757\uFE0F", expressionless: "\u{1F611}", eye: "\u{1F441}", eye_speech_bubble: "\u{1F441}&zwj;\u{1F5E8}", eyeglasses: "\u{1F453}", eyes: "\u{1F440}", face_with_head_bandage: "\u{1F915}", face_with_thermometer: "\u{1F912}", fist_oncoming: "\u{1F44A}", factory: "\u{1F3ED}", fallen_leaf: "\u{1F342}", family_man_woman_boy: "\u{1F46A}", family_man_boy: "\u{1F468}&zwj;\u{1F466}", family_man_boy_boy: "\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_girl: "\u{1F468}&zwj;\u{1F467}", family_man_girl_boy: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_girl_girl: "\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_man_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}", family_man_man_boy_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_man_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}", family_man_man_girl_boy: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_man_girl_girl: "\u{1F468}&zwj;\u{1F468}&zwj;\u{1F467}&zwj;\u{1F467}", family_man_woman_boy_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_man_woman_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}", family_man_woman_girl_boy: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_man_woman_girl_girl: "\u{1F468}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_boy: "\u{1F469}&zwj;\u{1F466}", family_woman_boy_boy: "\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_girl: "\u{1F469}&zwj;\u{1F467}", family_woman_girl_boy: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_girl_girl: "\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", family_woman_woman_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}", family_woman_woman_boy_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F466}&zwj;\u{1F466}", family_woman_woman_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}", family_woman_woman_girl_boy: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F466}", family_woman_woman_girl_girl: "\u{1F469}&zwj;\u{1F469}&zwj;\u{1F467}&zwj;\u{1F467}", fast_forward: "\u23E9", fax: "\u{1F4E0}", fearful: "\u{1F628}", feet: "\u{1F43E}", female_detective: "\u{1F575}\uFE0F&zwj;\u2640\uFE0F", ferris_wheel: "\u{1F3A1}", ferry: "\u26F4", field_hockey: "\u{1F3D1}", file_cabinet: "\u{1F5C4}", file_folder: "\u{1F4C1}", film_projector: "\u{1F4FD}", film_strip: "\u{1F39E}", fire: "\u{1F525}", fire_engine: "\u{1F692}", fireworks: "\u{1F386}", first_quarter_moon: "\u{1F313}", first_quarter_moon_with_face: "\u{1F31B}", fish: "\u{1F41F}", fish_cake: "\u{1F365}", fishing_pole_and_fish: "\u{1F3A3}", fist_raised: "\u270A", fist_left: "\u{1F91B}", fist_right: "\u{1F91C}", flags: "\u{1F38F}", flashlight: "\u{1F526}", fleur_de_lis: "\u269C\uFE0F", flight_arrival: "\u{1F6EC}", flight_departure: "\u{1F6EB}", floppy_disk: "\u{1F4BE}", flower_playing_cards: "\u{1F3B4}", flushed: "\u{1F633}", fog: "\u{1F32B}", foggy: "\u{1F301}", football: "\u{1F3C8}", footprints: "\u{1F463}", fork_and_knife: "\u{1F374}", fountain: "\u26F2\uFE0F", fountain_pen: "\u{1F58B}", four_leaf_clover: "\u{1F340}", fox_face: "\u{1F98A}", framed_picture: "\u{1F5BC}", free: "\u{1F193}", fried_egg: "\u{1F373}", fried_shrimp: "\u{1F364}", fries: "\u{1F35F}", frog: "\u{1F438}", frowning: "\u{1F626}", frowning_face: "\u2639\uFE0F", frowning_man: "\u{1F64D}&zwj;\u2642\uFE0F", frowning_woman: "\u{1F64D}", middle_finger: "\u{1F595}", fuelpump: "\u26FD\uFE0F", full_moon: "\u{1F315}", full_moon_with_face: "\u{1F31D}", funeral_urn: "\u26B1\uFE0F", game_die: "\u{1F3B2}", gear: "\u2699\uFE0F", gem: "\u{1F48E}", gemini: "\u264A\uFE0F", ghost: "\u{1F47B}", gift: "\u{1F381}", gift_heart: "\u{1F49D}", girl: "\u{1F467}", globe_with_meridians: "\u{1F310}", goal_net: "\u{1F945}", goat: "\u{1F410}", golf: "\u26F3\uFE0F", golfing_man: "\u{1F3CC}\uFE0F", golfing_woman: "\u{1F3CC}\uFE0F&zwj;\u2640\uFE0F", gorilla: "\u{1F98D}", grapes: "\u{1F347}", green_apple: "\u{1F34F}", green_book: "\u{1F4D7}", green_heart: "\u{1F49A}", green_salad: "\u{1F957}", grey_exclamation: "\u2755", grey_question: "\u2754", grimacing: "\u{1F62C}", grin: "\u{1F601}", grinning: "\u{1F600}", guardsman: "\u{1F482}", guardswoman: "\u{1F482}&zwj;\u2640\uFE0F", guitar: "\u{1F3B8}", gun: "\u{1F52B}", haircut_woman: "\u{1F487}", haircut_man: "\u{1F487}&zwj;\u2642\uFE0F", hamburger: "\u{1F354}", hammer: "\u{1F528}", hammer_and_pick: "\u2692", hammer_and_wrench: "\u{1F6E0}", hamster: "\u{1F439}", hand: "\u270B", handbag: "\u{1F45C}", handshake: "\u{1F91D}", hankey: "\u{1F4A9}", hatched_chick: "\u{1F425}", hatching_chick: "\u{1F423}", headphones: "\u{1F3A7}", hear_no_evil: "\u{1F649}", heart: "\u2764\uFE0F", heart_decoration: "\u{1F49F}", heart_eyes: "\u{1F60D}", heart_eyes_cat: "\u{1F63B}", heartbeat: "\u{1F493}", heartpulse: "\u{1F497}", hearts: "\u2665\uFE0F", heavy_check_mark: "\u2714\uFE0F", heavy_division_sign: "\u2797", heavy_dollar_sign: "\u{1F4B2}", heavy_heart_exclamation: "\u2763\uFE0F", heavy_minus_sign: "\u2796", heavy_multiplication_x: "\u2716\uFE0F", heavy_plus_sign: "\u2795", helicopter: "\u{1F681}", herb: "\u{1F33F}", hibiscus: "\u{1F33A}", high_brightness: "\u{1F506}", high_heel: "\u{1F460}", hocho: "\u{1F52A}", hole: "\u{1F573}", honey_pot: "\u{1F36F}", horse: "\u{1F434}", horse_racing: "\u{1F3C7}", hospital: "\u{1F3E5}", hot_pepper: "\u{1F336}", hotdog: "\u{1F32D}", hotel: "\u{1F3E8}", hotsprings: "\u2668\uFE0F", hourglass: "\u231B\uFE0F", hourglass_flowing_sand: "\u23F3", house: "\u{1F3E0}", house_with_garden: "\u{1F3E1}", houses: "\u{1F3D8}", hugs: "\u{1F917}", hushed: "\u{1F62F}", ice_cream: "\u{1F368}", ice_hockey: "\u{1F3D2}", ice_skate: "\u26F8", icecream: "\u{1F366}", id: "\u{1F194}", ideograph_advantage: "\u{1F250}", imp: "\u{1F47F}", inbox_tray: "\u{1F4E5}", incoming_envelope: "\u{1F4E8}", tipping_hand_woman: "\u{1F481}", information_source: "\u2139\uFE0F", innocent: "\u{1F607}", interrobang: "\u2049\uFE0F", iphone: "\u{1F4F1}", izakaya_lantern: "\u{1F3EE}", jack_o_lantern: "\u{1F383}", japan: "\u{1F5FE}", japanese_castle: "\u{1F3EF}", japanese_goblin: "\u{1F47A}", japanese_ogre: "\u{1F479}", jeans: "\u{1F456}", joy: "\u{1F602}", joy_cat: "\u{1F639}", joystick: "\u{1F579}", kaaba: "\u{1F54B}", key: "\u{1F511}", keyboard: "\u2328\uFE0F", keycap_ten: "\u{1F51F}", kick_scooter: "\u{1F6F4}", kimono: "\u{1F458}", kiss: "\u{1F48B}", kissing: "\u{1F617}", kissing_cat: "\u{1F63D}", kissing_closed_eyes: "\u{1F61A}", kissing_heart: "\u{1F618}", kissing_smiling_eyes: "\u{1F619}", kiwi_fruit: "\u{1F95D}", koala: "\u{1F428}", koko: "\u{1F201}", label: "\u{1F3F7}", large_blue_circle: "\u{1F535}", large_blue_diamond: "\u{1F537}", large_orange_diamond: "\u{1F536}", last_quarter_moon: "\u{1F317}", last_quarter_moon_with_face: "\u{1F31C}", latin_cross: "\u271D\uFE0F", laughing: "\u{1F606}", leaves: "\u{1F343}", ledger: "\u{1F4D2}", left_luggage: "\u{1F6C5}", left_right_arrow: "\u2194\uFE0F", leftwards_arrow_with_hook: "\u21A9\uFE0F", lemon: "\u{1F34B}", leo: "\u264C\uFE0F", leopard: "\u{1F406}", level_slider: "\u{1F39A}", libra: "\u264E\uFE0F", light_rail: "\u{1F688}", link: "\u{1F517}", lion: "\u{1F981}", lips: "\u{1F444}", lipstick: "\u{1F484}", lizard: "\u{1F98E}", lock: "\u{1F512}", lock_with_ink_pen: "\u{1F50F}", lollipop: "\u{1F36D}", loop: "\u27BF", loud_sound: "\u{1F50A}", loudspeaker: "\u{1F4E2}", love_hotel: "\u{1F3E9}", love_letter: "\u{1F48C}", low_brightness: "\u{1F505}", lying_face: "\u{1F925}", m: "\u24C2\uFE0F", mag: "\u{1F50D}", mag_right: "\u{1F50E}", mahjong: "\u{1F004}\uFE0F", mailbox: "\u{1F4EB}", mailbox_closed: "\u{1F4EA}", mailbox_with_mail: "\u{1F4EC}", mailbox_with_no_mail: "\u{1F4ED}", man: "\u{1F468}", man_artist: "\u{1F468}&zwj;\u{1F3A8}", man_astronaut: "\u{1F468}&zwj;\u{1F680}", man_cartwheeling: "\u{1F938}&zwj;\u2642\uFE0F", man_cook: "\u{1F468}&zwj;\u{1F373}", man_dancing: "\u{1F57A}", man_facepalming: "\u{1F926}&zwj;\u2642\uFE0F", man_factory_worker: "\u{1F468}&zwj;\u{1F3ED}", man_farmer: "\u{1F468}&zwj;\u{1F33E}", man_firefighter: "\u{1F468}&zwj;\u{1F692}", man_health_worker: "\u{1F468}&zwj;\u2695\uFE0F", man_in_tuxedo: "\u{1F935}", man_judge: "\u{1F468}&zwj;\u2696\uFE0F", man_juggling: "\u{1F939}&zwj;\u2642\uFE0F", man_mechanic: "\u{1F468}&zwj;\u{1F527}", man_office_worker: "\u{1F468}&zwj;\u{1F4BC}", man_pilot: "\u{1F468}&zwj;\u2708\uFE0F", man_playing_handball: "\u{1F93E}&zwj;\u2642\uFE0F", man_playing_water_polo: "\u{1F93D}&zwj;\u2642\uFE0F", man_scientist: "\u{1F468}&zwj;\u{1F52C}", man_shrugging: "\u{1F937}&zwj;\u2642\uFE0F", man_singer: "\u{1F468}&zwj;\u{1F3A4}", man_student: "\u{1F468}&zwj;\u{1F393}", man_teacher: "\u{1F468}&zwj;\u{1F3EB}", man_technologist: "\u{1F468}&zwj;\u{1F4BB}", man_with_gua_pi_mao: "\u{1F472}", man_with_turban: "\u{1F473}", tangerine: "\u{1F34A}", mans_shoe: "\u{1F45E}", mantelpiece_clock: "\u{1F570}", maple_leaf: "\u{1F341}", martial_arts_uniform: "\u{1F94B}", mask: "\u{1F637}", massage_woman: "\u{1F486}", massage_man: "\u{1F486}&zwj;\u2642\uFE0F", meat_on_bone: "\u{1F356}", medal_military: "\u{1F396}", medal_sports: "\u{1F3C5}", mega: "\u{1F4E3}", melon: "\u{1F348}", memo: "\u{1F4DD}", men_wrestling: "\u{1F93C}&zwj;\u2642\uFE0F", menorah: "\u{1F54E}", mens: "\u{1F6B9}", metal: "\u{1F918}", metro: "\u{1F687}", microphone: "\u{1F3A4}", microscope: "\u{1F52C}", milk_glass: "\u{1F95B}", milky_way: "\u{1F30C}", minibus: "\u{1F690}", minidisc: "\u{1F4BD}", mobile_phone_off: "\u{1F4F4}", money_mouth_face: "\u{1F911}", money_with_wings: "\u{1F4B8}", moneybag: "\u{1F4B0}", monkey: "\u{1F412}", monkey_face: "\u{1F435}", monorail: "\u{1F69D}", moon: "\u{1F314}", mortar_board: "\u{1F393}", mosque: "\u{1F54C}", motor_boat: "\u{1F6E5}", motor_scooter: "\u{1F6F5}", motorcycle: "\u{1F3CD}", motorway: "\u{1F6E3}", mount_fuji: "\u{1F5FB}", mountain: "\u26F0", mountain_biking_man: "\u{1F6B5}", mountain_biking_woman: "\u{1F6B5}&zwj;\u2640\uFE0F", mountain_cableway: "\u{1F6A0}", mountain_railway: "\u{1F69E}", mountain_snow: "\u{1F3D4}", mouse: "\u{1F42D}", mouse2: "\u{1F401}", movie_camera: "\u{1F3A5}", moyai: "\u{1F5FF}", mrs_claus: "\u{1F936}", muscle: "\u{1F4AA}", mushroom: "\u{1F344}", musical_keyboard: "\u{1F3B9}", musical_note: "\u{1F3B5}", musical_score: "\u{1F3BC}", mute: "\u{1F507}", nail_care: "\u{1F485}", name_badge: "\u{1F4DB}", national_park: "\u{1F3DE}", nauseated_face: "\u{1F922}", necktie: "\u{1F454}", negative_squared_cross_mark: "\u274E", nerd_face: "\u{1F913}", neutral_face: "\u{1F610}", new: "\u{1F195}", new_moon: "\u{1F311}", new_moon_with_face: "\u{1F31A}", newspaper: "\u{1F4F0}", newspaper_roll: "\u{1F5DE}", next_track_button: "\u23ED", ng: "\u{1F196}", no_good_man: "\u{1F645}&zwj;\u2642\uFE0F", no_good_woman: "\u{1F645}", night_with_stars: "\u{1F303}", no_bell: "\u{1F515}", no_bicycles: "\u{1F6B3}", no_entry: "\u26D4\uFE0F", no_entry_sign: "\u{1F6AB}", no_mobile_phones: "\u{1F4F5}", no_mouth: "\u{1F636}", no_pedestrians: "\u{1F6B7}", no_smoking: "\u{1F6AD}", "non-potable_water": "\u{1F6B1}", nose: "\u{1F443}", notebook: "\u{1F4D3}", notebook_with_decorative_cover: "\u{1F4D4}", notes: "\u{1F3B6}", nut_and_bolt: "\u{1F529}", o: "\u2B55\uFE0F", o2: "\u{1F17E}\uFE0F", ocean: "\u{1F30A}", octopus: "\u{1F419}", oden: "\u{1F362}", office: "\u{1F3E2}", oil_drum: "\u{1F6E2}", ok: "\u{1F197}", ok_hand: "\u{1F44C}", ok_man: "\u{1F646}&zwj;\u2642\uFE0F", ok_woman: "\u{1F646}", old_key: "\u{1F5DD}", older_man: "\u{1F474}", older_woman: "\u{1F475}", om: "\u{1F549}", on: "\u{1F51B}", oncoming_automobile: "\u{1F698}", oncoming_bus: "\u{1F68D}", oncoming_police_car: "\u{1F694}", oncoming_taxi: "\u{1F696}", open_file_folder: "\u{1F4C2}", open_hands: "\u{1F450}", open_mouth: "\u{1F62E}", open_umbrella: "\u2602\uFE0F", ophiuchus: "\u26CE", orange_book: "\u{1F4D9}", orthodox_cross: "\u2626\uFE0F", outbox_tray: "\u{1F4E4}", owl: "\u{1F989}", ox: "\u{1F402}", package: "\u{1F4E6}", page_facing_up: "\u{1F4C4}", page_with_curl: "\u{1F4C3}", pager: "\u{1F4DF}", paintbrush: "\u{1F58C}", palm_tree: "\u{1F334}", pancakes: "\u{1F95E}", panda_face: "\u{1F43C}", paperclip: "\u{1F4CE}", paperclips: "\u{1F587}", parasol_on_ground: "\u26F1", parking: "\u{1F17F}\uFE0F", part_alternation_mark: "\u303D\uFE0F", partly_sunny: "\u26C5\uFE0F", passenger_ship: "\u{1F6F3}", passport_control: "\u{1F6C2}", pause_button: "\u23F8", peace_symbol: "\u262E\uFE0F", peach: "\u{1F351}", peanuts: "\u{1F95C}", pear: "\u{1F350}", pen: "\u{1F58A}", pencil2: "\u270F\uFE0F", penguin: "\u{1F427}", pensive: "\u{1F614}", performing_arts: "\u{1F3AD}", persevere: "\u{1F623}", person_fencing: "\u{1F93A}", pouting_woman: "\u{1F64E}", phone: "\u260E\uFE0F", pick: "\u26CF", pig: "\u{1F437}", pig2: "\u{1F416}", pig_nose: "\u{1F43D}", pill: "\u{1F48A}", pineapple: "\u{1F34D}", ping_pong: "\u{1F3D3}", pisces: "\u2653\uFE0F", pizza: "\u{1F355}", place_of_worship: "\u{1F6D0}", plate_with_cutlery: "\u{1F37D}", play_or_pause_button: "\u23EF", point_down: "\u{1F447}", point_left: "\u{1F448}", point_right: "\u{1F449}", point_up: "\u261D\uFE0F", point_up_2: "\u{1F446}", police_car: "\u{1F693}", policewoman: "\u{1F46E}&zwj;\u2640\uFE0F", poodle: "\u{1F429}", popcorn: "\u{1F37F}", post_office: "\u{1F3E3}", postal_horn: "\u{1F4EF}", postbox: "\u{1F4EE}", potable_water: "\u{1F6B0}", potato: "\u{1F954}", pouch: "\u{1F45D}", poultry_leg: "\u{1F357}", pound: "\u{1F4B7}", rage: "\u{1F621}", pouting_cat: "\u{1F63E}", pouting_man: "\u{1F64E}&zwj;\u2642\uFE0F", pray: "\u{1F64F}", prayer_beads: "\u{1F4FF}", pregnant_woman: "\u{1F930}", previous_track_button: "\u23EE", prince: "\u{1F934}", princess: "\u{1F478}", printer: "\u{1F5A8}", purple_heart: "\u{1F49C}", purse: "\u{1F45B}", pushpin: "\u{1F4CC}", put_litter_in_its_place: "\u{1F6AE}", question: "\u2753", rabbit: "\u{1F430}", rabbit2: "\u{1F407}", racehorse: "\u{1F40E}", racing_car: "\u{1F3CE}", radio: "\u{1F4FB}", radio_button: "\u{1F518}", radioactive: "\u2622\uFE0F", railway_car: "\u{1F683}", railway_track: "\u{1F6E4}", rainbow: "\u{1F308}", rainbow_flag: "\u{1F3F3}\uFE0F&zwj;\u{1F308}", raised_back_of_hand: "\u{1F91A}", raised_hand_with_fingers_splayed: "\u{1F590}", raised_hands: "\u{1F64C}", raising_hand_woman: "\u{1F64B}", raising_hand_man: "\u{1F64B}&zwj;\u2642\uFE0F", ram: "\u{1F40F}", ramen: "\u{1F35C}", rat: "\u{1F400}", record_button: "\u23FA", recycle: "\u267B\uFE0F", red_circle: "\u{1F534}", registered: "\xAE\uFE0F", relaxed: "\u263A\uFE0F", relieved: "\u{1F60C}", reminder_ribbon: "\u{1F397}", repeat: "\u{1F501}", repeat_one: "\u{1F502}", rescue_worker_helmet: "\u26D1", restroom: "\u{1F6BB}", revolving_hearts: "\u{1F49E}", rewind: "\u23EA", rhinoceros: "\u{1F98F}", ribbon: "\u{1F380}", rice: "\u{1F35A}", rice_ball: "\u{1F359}", rice_cracker: "\u{1F358}", rice_scene: "\u{1F391}", right_anger_bubble: "\u{1F5EF}", ring: "\u{1F48D}", robot: "\u{1F916}", rocket: "\u{1F680}", rofl: "\u{1F923}", roll_eyes: "\u{1F644}", roller_coaster: "\u{1F3A2}", rooster: "\u{1F413}", rose: "\u{1F339}", rosette: "\u{1F3F5}", rotating_light: "\u{1F6A8}", round_pushpin: "\u{1F4CD}", rowing_man: "\u{1F6A3}", rowing_woman: "\u{1F6A3}&zwj;\u2640\uFE0F", rugby_football: "\u{1F3C9}", running_man: "\u{1F3C3}", running_shirt_with_sash: "\u{1F3BD}", running_woman: "\u{1F3C3}&zwj;\u2640\uFE0F", sa: "\u{1F202}\uFE0F", sagittarius: "\u2650\uFE0F", sake: "\u{1F376}", sandal: "\u{1F461}", santa: "\u{1F385}", satellite: "\u{1F4E1}", saxophone: "\u{1F3B7}", school: "\u{1F3EB}", school_satchel: "\u{1F392}", scissors: "\u2702\uFE0F", scorpion: "\u{1F982}", scorpius: "\u264F\uFE0F", scream: "\u{1F631}", scream_cat: "\u{1F640}", scroll: "\u{1F4DC}", seat: "\u{1F4BA}", secret: "\u3299\uFE0F", see_no_evil: "\u{1F648}", seedling: "\u{1F331}", selfie: "\u{1F933}", shallow_pan_of_food: "\u{1F958}", shamrock: "\u2618\uFE0F", shark: "\u{1F988}", shaved_ice: "\u{1F367}", sheep: "\u{1F411}", shell: "\u{1F41A}", shield: "\u{1F6E1}", shinto_shrine: "\u26E9", ship: "\u{1F6A2}", shirt: "\u{1F455}", shopping: "\u{1F6CD}", shopping_cart: "\u{1F6D2}", shower: "\u{1F6BF}", shrimp: "\u{1F990}", signal_strength: "\u{1F4F6}", six_pointed_star: "\u{1F52F}", ski: "\u{1F3BF}", skier: "\u26F7", skull: "\u{1F480}", skull_and_crossbones: "\u2620\uFE0F", sleeping: "\u{1F634}", sleeping_bed: "\u{1F6CC}", sleepy: "\u{1F62A}", slightly_frowning_face: "\u{1F641}", slightly_smiling_face: "\u{1F642}", slot_machine: "\u{1F3B0}", small_airplane: "\u{1F6E9}", small_blue_diamond: "\u{1F539}", small_orange_diamond: "\u{1F538}", small_red_triangle: "\u{1F53A}", small_red_triangle_down: "\u{1F53B}", smile: "\u{1F604}", smile_cat: "\u{1F638}", smiley: "\u{1F603}", smiley_cat: "\u{1F63A}", smiling_imp: "\u{1F608}", smirk: "\u{1F60F}", smirk_cat: "\u{1F63C}", smoking: "\u{1F6AC}", snail: "\u{1F40C}", snake: "\u{1F40D}", sneezing_face: "\u{1F927}", snowboarder: "\u{1F3C2}", snowflake: "\u2744\uFE0F", snowman: "\u26C4\uFE0F", snowman_with_snow: "\u2603\uFE0F", sob: "\u{1F62D}", soccer: "\u26BD\uFE0F", soon: "\u{1F51C}", sos: "\u{1F198}", sound: "\u{1F509}", space_invader: "\u{1F47E}", spades: "\u2660\uFE0F", spaghetti: "\u{1F35D}", sparkle: "\u2747\uFE0F", sparkler: "\u{1F387}", sparkles: "\u2728", sparkling_heart: "\u{1F496}", speak_no_evil: "\u{1F64A}", speaker: "\u{1F508}", speaking_head: "\u{1F5E3}", speech_balloon: "\u{1F4AC}", speedboat: "\u{1F6A4}", spider: "\u{1F577}", spider_web: "\u{1F578}", spiral_calendar: "\u{1F5D3}", spiral_notepad: "\u{1F5D2}", spoon: "\u{1F944}", squid: "\u{1F991}", stadium: "\u{1F3DF}", star: "\u2B50\uFE0F", star2: "\u{1F31F}", star_and_crescent: "\u262A\uFE0F", star_of_david: "\u2721\uFE0F", stars: "\u{1F320}", station: "\u{1F689}", statue_of_liberty: "\u{1F5FD}", steam_locomotive: "\u{1F682}", stew: "\u{1F372}", stop_button: "\u23F9", stop_sign: "\u{1F6D1}", stopwatch: "\u23F1", straight_ruler: "\u{1F4CF}", strawberry: "\u{1F353}", stuck_out_tongue: "\u{1F61B}", stuck_out_tongue_closed_eyes: "\u{1F61D}", stuck_out_tongue_winking_eye: "\u{1F61C}", studio_microphone: "\u{1F399}", stuffed_flatbread: "\u{1F959}", sun_behind_large_cloud: "\u{1F325}", sun_behind_rain_cloud: "\u{1F326}", sun_behind_small_cloud: "\u{1F324}", sun_with_face: "\u{1F31E}", sunflower: "\u{1F33B}", sunglasses: "\u{1F60E}", sunny: "\u2600\uFE0F", sunrise: "\u{1F305}", sunrise_over_mountains: "\u{1F304}", surfing_man: "\u{1F3C4}", surfing_woman: "\u{1F3C4}&zwj;\u2640\uFE0F", sushi: "\u{1F363}", suspension_railway: "\u{1F69F}", sweat: "\u{1F613}", sweat_drops: "\u{1F4A6}", sweat_smile: "\u{1F605}", sweet_potato: "\u{1F360}", swimming_man: "\u{1F3CA}", swimming_woman: "\u{1F3CA}&zwj;\u2640\uFE0F", symbols: "\u{1F523}", synagogue: "\u{1F54D}", syringe: "\u{1F489}", taco: "\u{1F32E}", tada: "\u{1F389}", tanabata_tree: "\u{1F38B}", taurus: "\u2649\uFE0F", taxi: "\u{1F695}", tea: "\u{1F375}", telephone_receiver: "\u{1F4DE}", telescope: "\u{1F52D}", tennis: "\u{1F3BE}", tent: "\u26FA\uFE0F", thermometer: "\u{1F321}", thinking: "\u{1F914}", thought_balloon: "\u{1F4AD}", ticket: "\u{1F3AB}", tickets: "\u{1F39F}", tiger: "\u{1F42F}", tiger2: "\u{1F405}", timer_clock: "\u23F2", tipping_hand_man: "\u{1F481}&zwj;\u2642\uFE0F", tired_face: "\u{1F62B}", tm: "\u2122\uFE0F", toilet: "\u{1F6BD}", tokyo_tower: "\u{1F5FC}", tomato: "\u{1F345}", tongue: "\u{1F445}", top: "\u{1F51D}", tophat: "\u{1F3A9}", tornado: "\u{1F32A}", trackball: "\u{1F5B2}", tractor: "\u{1F69C}", traffic_light: "\u{1F6A5}", train: "\u{1F68B}", train2: "\u{1F686}", tram: "\u{1F68A}", triangular_flag_on_post: "\u{1F6A9}", triangular_ruler: "\u{1F4D0}", trident: "\u{1F531}", triumph: "\u{1F624}", trolleybus: "\u{1F68E}", trophy: "\u{1F3C6}", tropical_drink: "\u{1F379}", tropical_fish: "\u{1F420}", truck: "\u{1F69A}", trumpet: "\u{1F3BA}", tulip: "\u{1F337}", tumbler_glass: "\u{1F943}", turkey: "\u{1F983}", turtle: "\u{1F422}", tv: "\u{1F4FA}", twisted_rightwards_arrows: "\u{1F500}", two_hearts: "\u{1F495}", two_men_holding_hands: "\u{1F46C}", two_women_holding_hands: "\u{1F46D}", u5272: "\u{1F239}", u5408: "\u{1F234}", u55b6: "\u{1F23A}", u6307: "\u{1F22F}\uFE0F", u6708: "\u{1F237}\uFE0F", u6709: "\u{1F236}", u6e80: "\u{1F235}", u7121: "\u{1F21A}\uFE0F", u7533: "\u{1F238}", u7981: "\u{1F232}", u7a7a: "\u{1F233}", umbrella: "\u2614\uFE0F", unamused: "\u{1F612}", underage: "\u{1F51E}", unicorn: "\u{1F984}", unlock: "\u{1F513}", up: "\u{1F199}", upside_down_face: "\u{1F643}", v: "\u270C\uFE0F", vertical_traffic_light: "\u{1F6A6}", vhs: "\u{1F4FC}", vibration_mode: "\u{1F4F3}", video_camera: "\u{1F4F9}", video_game: "\u{1F3AE}", violin: "\u{1F3BB}", virgo: "\u264D\uFE0F", volcano: "\u{1F30B}", volleyball: "\u{1F3D0}", vs: "\u{1F19A}", vulcan_salute: "\u{1F596}", walking_man: "\u{1F6B6}", walking_woman: "\u{1F6B6}&zwj;\u2640\uFE0F", waning_crescent_moon: "\u{1F318}", waning_gibbous_moon: "\u{1F316}", warning: "\u26A0\uFE0F", wastebasket: "\u{1F5D1}", watch: "\u231A\uFE0F", water_buffalo: "\u{1F403}", watermelon: "\u{1F349}", wave: "\u{1F44B}", wavy_dash: "\u3030\uFE0F", waxing_crescent_moon: "\u{1F312}", wc: "\u{1F6BE}", weary: "\u{1F629}", wedding: "\u{1F492}", weight_lifting_man: "\u{1F3CB}\uFE0F", weight_lifting_woman: "\u{1F3CB}\uFE0F&zwj;\u2640\uFE0F", whale: "\u{1F433}", whale2: "\u{1F40B}", wheel_of_dharma: "\u2638\uFE0F", wheelchair: "\u267F\uFE0F", white_check_mark: "\u2705", white_circle: "\u26AA\uFE0F", white_flag: "\u{1F3F3}\uFE0F", white_flower: "\u{1F4AE}", white_large_square: "\u2B1C\uFE0F", white_medium_small_square: "\u25FD\uFE0F", white_medium_square: "\u25FB\uFE0F", white_small_square: "\u25AB\uFE0F", white_square_button: "\u{1F533}", wilted_flower: "\u{1F940}", wind_chime: "\u{1F390}", wind_face: "\u{1F32C}", wine_glass: "\u{1F377}", wink: "\u{1F609}", wolf: "\u{1F43A}", woman: "\u{1F469}", woman_artist: "\u{1F469}&zwj;\u{1F3A8}", woman_astronaut: "\u{1F469}&zwj;\u{1F680}", woman_cartwheeling: "\u{1F938}&zwj;\u2640\uFE0F", woman_cook: "\u{1F469}&zwj;\u{1F373}", woman_facepalming: "\u{1F926}&zwj;\u2640\uFE0F", woman_factory_worker: "\u{1F469}&zwj;\u{1F3ED}", woman_farmer: "\u{1F469}&zwj;\u{1F33E}", woman_firefighter: "\u{1F469}&zwj;\u{1F692}", woman_health_worker: "\u{1F469}&zwj;\u2695\uFE0F", woman_judge: "\u{1F469}&zwj;\u2696\uFE0F", woman_juggling: "\u{1F939}&zwj;\u2640\uFE0F", woman_mechanic: "\u{1F469}&zwj;\u{1F527}", woman_office_worker: "\u{1F469}&zwj;\u{1F4BC}", woman_pilot: "\u{1F469}&zwj;\u2708\uFE0F", woman_playing_handball: "\u{1F93E}&zwj;\u2640\uFE0F", woman_playing_water_polo: "\u{1F93D}&zwj;\u2640\uFE0F", woman_scientist: "\u{1F469}&zwj;\u{1F52C}", woman_shrugging: "\u{1F937}&zwj;\u2640\uFE0F", woman_singer: "\u{1F469}&zwj;\u{1F3A4}", woman_student: "\u{1F469}&zwj;\u{1F393}", woman_teacher: "\u{1F469}&zwj;\u{1F3EB}", woman_technologist: "\u{1F469}&zwj;\u{1F4BB}", woman_with_turban: "\u{1F473}&zwj;\u2640\uFE0F", womans_clothes: "\u{1F45A}", womans_hat: "\u{1F452}", women_wrestling: "\u{1F93C}&zwj;\u2640\uFE0F", womens: "\u{1F6BA}", world_map: "\u{1F5FA}", worried: "\u{1F61F}", wrench: "\u{1F527}", writing_hand: "\u270D\uFE0F", x: "\u274C", yellow_heart: "\u{1F49B}", yen: "\u{1F4B4}", yin_yang: "\u262F\uFE0F", yum: "\u{1F60B}", zap: "\u26A1\uFE0F", zipper_mouth_face: "\u{1F910}", zzz: "\u{1F4A4}", octocat: '<img alt=":octocat:" height="20" width="20" align="absmiddle" src="https://assets-cdn.github.com/images/icons/emoji/octocat.png">', showdown: `<span style="font-family: 'Anonymous Pro', monospace; text-decoration: underline; text-decoration-style: dashed; text-decoration-color: #3e8b8a;text-underline-position: under;">S</span>` }, r.Converter = function(e2) {
      "use strict";
      var u7 = {}, d4 = [], a3 = [], s = {}, i3 = R2, c3 = { parsed: {}, raw: "", format: "" };
      t();
      function t() {
        e2 = e2 || {};
        for (var n2 in E3)
          E3.hasOwnProperty(n2) && (u7[n2] = E3[n2]);
        if (typeof e2 == "object")
          for (var f4 in e2)
            e2.hasOwnProperty(f4) && (u7[f4] = e2[f4]);
        else
          throw Error("Converter expects the passed parameter to be an object, but " + typeof e2 + " was passed instead.");
        u7.extensions && r.helper.forEach(u7.extensions, p3);
      }
      function p3(n2, f4) {
        if (f4 = f4 || null, r.helper.isString(n2))
          if (n2 = r.helper.stdExtName(n2), f4 = n2, r.extensions[n2]) {
            console.warn("DEPRECATION WARNING: " + n2 + " is an old extension that uses a deprecated loading method.Please inform the developer that the extension should be updated!"), l4(r.extensions[n2], n2);
            return;
          } else if (!r.helper.isUndefined(z[n2]))
            n2 = z[n2];
          else
            throw Error('Extension "' + n2 + '" could not be loaded. It was either not found or is not a valid extension.');
        typeof n2 == "function" && (n2 = n2()), r.helper.isArray(n2) || (n2 = [n2]);
        var _2 = T2(n2, f4);
        if (!_2.valid)
          throw Error(_2.error);
        for (var m2 = 0; m2 < n2.length; ++m2) {
          switch (n2[m2].type) {
            case "lang":
              d4.push(n2[m2]);
              break;
            case "output":
              a3.push(n2[m2]);
              break;
          }
          if (n2[m2].hasOwnProperty("listeners"))
            for (var w3 in n2[m2].listeners)
              n2[m2].listeners.hasOwnProperty(w3) && o3(w3, n2[m2].listeners[w3]);
        }
      }
      function l4(n2, f4) {
        typeof n2 == "function" && (n2 = n2(new r.Converter())), r.helper.isArray(n2) || (n2 = [n2]);
        var _2 = T2(n2, f4);
        if (!_2.valid)
          throw Error(_2.error);
        for (var m2 = 0; m2 < n2.length; ++m2)
          switch (n2[m2].type) {
            case "lang":
              d4.push(n2[m2]);
              break;
            case "output":
              a3.push(n2[m2]);
              break;
            default:
              throw Error("Extension loader error: Type unrecognized!!!");
          }
      }
      function o3(n2, f4) {
        if (!r.helper.isString(n2))
          throw Error("Invalid argument in converter.listen() method: name must be a string, but " + typeof n2 + " given");
        if (typeof f4 != "function")
          throw Error("Invalid argument in converter.listen() method: callback must be a function, but " + typeof f4 + " given");
        s.hasOwnProperty(n2) || (s[n2] = []), s[n2].push(f4);
      }
      function h3(n2) {
        var f4 = n2.match(/^\s*/)[0].length, _2 = new RegExp("^\\s{0," + f4 + "}", "gm");
        return n2.replace(_2, "");
      }
      this._dispatch = function(f4, _2, m2, w3) {
        if (s.hasOwnProperty(f4))
          for (var g6 = 0; g6 < s[f4].length; ++g6) {
            var y4 = s[f4][g6](f4, _2, this, m2, w3);
            y4 && typeof y4 < "u" && (_2 = y4);
          }
        return _2;
      }, this.listen = function(n2, f4) {
        return o3(n2, f4), this;
      }, this.makeHtml = function(n2) {
        if (!n2)
          return n2;
        var f4 = { gHtmlBlocks: [], gHtmlMdBlocks: [], gHtmlSpans: [], gUrls: {}, gTitles: {}, gDimensions: {}, gListLevel: 0, hashLinkCounts: {}, langExtensions: d4, outputModifiers: a3, converter: this, ghCodeBlocks: [], metadata: { parsed: {}, raw: "", format: "" } };
        return n2 = n2.replace(/¨/g, "\xA8T"), n2 = n2.replace(/\$/g, "\xA8D"), n2 = n2.replace(/\r\n/g, `
`), n2 = n2.replace(/\r/g, `
`), n2 = n2.replace(/\u00A0/g, "&nbsp;"), u7.smartIndentationFix && (n2 = h3(n2)), n2 = `

` + n2 + `

`, n2 = r.subParser("detab")(n2, u7, f4), n2 = n2.replace(/^[ \t]+$/mg, ""), r.helper.forEach(d4, function(_2) {
          n2 = r.subParser("runExtension")(_2, n2, u7, f4);
        }), n2 = r.subParser("metadata")(n2, u7, f4), n2 = r.subParser("hashPreCodeTags")(n2, u7, f4), n2 = r.subParser("githubCodeBlocks")(n2, u7, f4), n2 = r.subParser("hashHTMLBlocks")(n2, u7, f4), n2 = r.subParser("hashCodeTags")(n2, u7, f4), n2 = r.subParser("stripLinkDefinitions")(n2, u7, f4), n2 = r.subParser("blockGamut")(n2, u7, f4), n2 = r.subParser("unhashHTMLSpans")(n2, u7, f4), n2 = r.subParser("unescapeSpecialChars")(n2, u7, f4), n2 = n2.replace(/¨D/g, "$$"), n2 = n2.replace(/¨T/g, "\xA8"), n2 = r.subParser("completeHTMLDocument")(n2, u7, f4), r.helper.forEach(a3, function(_2) {
          n2 = r.subParser("runExtension")(_2, n2, u7, f4);
        }), c3 = f4.metadata, n2;
      }, this.makeMarkdown = this.makeMd = function(n2, f4) {
        if (n2 = n2.replace(/\r\n/g, `
`), n2 = n2.replace(/\r/g, `
`), n2 = n2.replace(/>[ \t]+</, ">\xA8NBSP;<"), !f4)
          if (window && window.document)
            f4 = window.document;
          else
            throw new Error("HTMLParser is undefined. If in a webworker or nodejs environment, you need to provide a WHATWG DOM and HTML such as JSDOM");
        var _2 = f4.createElement("div");
        _2.innerHTML = n2;
        var m2 = { preList: S(_2) };
        j2(_2);
        for (var w3 = _2.childNodes, g6 = "", y4 = 0; y4 < w3.length; y4++)
          g6 += r.subParser("makeMarkdown.node")(w3[y4], m2);
        function j2(v5) {
          for (var P2 = 0; P2 < v5.childNodes.length; ++P2) {
            var C = v5.childNodes[P2];
            C.nodeType === 3 ? !/\S/.test(C.nodeValue) && !/^[ ]+$/.test(C.nodeValue) ? (v5.removeChild(C), --P2) : (C.nodeValue = C.nodeValue.split(`
`).join(" "), C.nodeValue = C.nodeValue.replace(/(\s)+/g, "$1")) : C.nodeType === 1 && j2(C);
          }
        }
        function S(v5) {
          for (var P2 = v5.querySelectorAll("pre"), C = [], M = 0; M < P2.length; ++M)
            if (P2[M].childElementCount === 1 && P2[M].firstChild.tagName.toLowerCase() === "code") {
              var N4 = P2[M].firstChild.innerHTML.trim(), V2 = P2[M].firstChild.getAttribute("data-language") || "";
              if (V2 === "")
                for (var K2 = P2[M].firstChild.className.split(" "), D2 = 0; D2 < K2.length; ++D2) {
                  var Z2 = K2[D2].match(/^language-(.+)$/);
                  if (Z2 !== null) {
                    V2 = Z2[1];
                    break;
                  }
                }
              N4 = r.helper.unescapeHTMLEntities(N4), C.push(N4), P2[M].outerHTML = '<precode language="' + V2 + '" precodenum="' + M.toString() + '"></precode>';
            } else
              C.push(P2[M].innerHTML), P2[M].innerHTML = "", P2[M].setAttribute("prenum", M.toString());
          return C;
        }
        return g6;
      }, this.setOption = function(n2, f4) {
        u7[n2] = f4;
      }, this.getOption = function(n2) {
        return u7[n2];
      }, this.getOptions = function() {
        return u7;
      }, this.addExtension = function(n2, f4) {
        f4 = f4 || null, p3(n2, f4);
      }, this.useExtension = function(n2) {
        p3(n2);
      }, this.setFlavor = function(n2) {
        if (!H.hasOwnProperty(n2))
          throw Error(n2 + " flavor was not found");
        var f4 = H[n2];
        i3 = n2;
        for (var _2 in f4)
          f4.hasOwnProperty(_2) && (u7[_2] = f4[_2]);
      }, this.getFlavor = function() {
        return i3;
      }, this.removeExtension = function(n2) {
        r.helper.isArray(n2) || (n2 = [n2]);
        for (var f4 = 0; f4 < n2.length; ++f4) {
          for (var _2 = n2[f4], m2 = 0; m2 < d4.length; ++m2)
            d4[m2] === _2 && d4.splice(m2, 1);
          for (var w3 = 0; w3 < a3.length; ++w3)
            a3[w3] === _2 && a3.splice(w3, 1);
        }
      }, this.getAllExtensions = function() {
        return { language: d4, output: a3 };
      }, this.getMetadata = function(n2) {
        return n2 ? c3.raw : c3.parsed;
      }, this.getMetadataFormat = function() {
        return c3.format;
      }, this._setMetadataPair = function(n2, f4) {
        c3.parsed[n2] = f4;
      }, this._setMetadataFormat = function(n2) {
        c3.format = n2;
      }, this._setMetadataRaw = function(n2) {
        c3.raw = n2;
      };
    }, r.subParser("anchors", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("anchors.before", e2, u7, d4);
      var a3 = function(s, i3, c3, t, p3, l4, o3) {
        if (r.helper.isUndefined(o3) && (o3 = ""), c3 = c3.toLowerCase(), s.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          t = "";
        else if (!t)
          if (c3 || (c3 = i3.toLowerCase().replace(/ ?\n/g, " ")), t = "#" + c3, !r.helper.isUndefined(d4.gUrls[c3]))
            t = d4.gUrls[c3], r.helper.isUndefined(d4.gTitles[c3]) || (o3 = d4.gTitles[c3]);
          else
            return s;
        t = t.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var h3 = '<a href="' + t + '"';
        return o3 !== "" && o3 !== null && (o3 = o3.replace(/"/g, "&quot;"), o3 = o3.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), h3 += ' title="' + o3 + '"'), u7.openLinksInNewWindow && !/^#/.test(t) && (h3 += ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h3 += ">" + i3 + "</a>", h3;
      };
      return e2 = e2.replace(/\[((?:\[[^\]]*]|[^\[\]])*)] ?(?:\n *)?\[(.*?)]()()()()/g, a3), e2 = e2.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<([^>]*)>(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a3), e2 = e2.replace(/\[((?:\[[^\]]*]|[^\[\]])*)]()[ \t]*\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?:[ \t]*((["'])([^"]*?)\5))?[ \t]?\)/g, a3), e2 = e2.replace(/\[([^\[\]]+)]()()()()()/g, a3), u7.ghMentions && (e2 = e2.replace(/(^|\s)(\\)?(@([a-z\d]+(?:[a-z\d.-]+?[a-z\d]+)*))/gmi, function(s, i3, c3, t, p3) {
        if (c3 === "\\")
          return i3 + t;
        if (!r.helper.isString(u7.ghMentionsLink))
          throw new Error("ghMentionsLink option must be a string");
        var l4 = u7.ghMentionsLink.replace(/\{u}/g, p3), o3 = "";
        return u7.openLinksInNewWindow && (o3 = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), i3 + '<a href="' + l4 + '"' + o3 + ">" + t + "</a>";
      })), e2 = d4.converter._dispatch("anchors.after", e2, u7, d4), e2;
    });
    var Y2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+?\.[^'">\s]+?)()(\1)?(?=\s|$)(?!["<>])/gi, x2 = /([*~_]+|\b)(((https?|ftp|dict):\/\/|www\.)[^'">\s]+\.[^'">\s]+?)([.!?,()\[\]])?(\1)?(?=\s|$)(?!["<>])/gi, ee = /()<(((https?|ftp|dict):\/\/|www\.)[^'">\s]+)()>()/gi, de = /(^|\s)(?:mailto:)?([A-Za-z0-9!#$%&'*+-/=?^_`{|}~.]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)(?=$|\s)/gmi, ue = /<()(?:mailto:)?([-.\w]+@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi, I = function(e2) {
      "use strict";
      return function(u7, d4, a3, s, i3, c3, t) {
        a3 = a3.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var p3 = a3, l4 = "", o3 = "", h3 = d4 || "", n2 = t || "";
        return /^www\./i.test(a3) && (a3 = a3.replace(/^www\./i, "http://www.")), e2.excludeTrailingPunctuationFromURLs && c3 && (l4 = c3), e2.openLinksInNewWindow && (o3 = ' rel="noopener noreferrer" target="\xA8E95Eblank"'), h3 + '<a href="' + a3 + '"' + o3 + ">" + p3 + "</a>" + l4 + n2;
      };
    }, W3 = function(e2, u7) {
      "use strict";
      return function(d4, a3, s) {
        var i3 = "mailto:";
        return a3 = a3 || "", s = r.subParser("unescapeSpecialChars")(s, e2, u7), e2.encodeEmails ? (i3 = r.helper.encodeEmailAddress(i3 + s), s = r.helper.encodeEmailAddress(s)) : i3 = i3 + s, a3 + '<a href="' + i3 + '">' + s + "</a>";
      };
    };
    r.subParser("autoLinks", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("autoLinks.before", e2, u7, d4), e2 = e2.replace(ee, I(u7)), e2 = e2.replace(ue, W3(u7, d4)), e2 = d4.converter._dispatch("autoLinks.after", e2, u7, d4), e2;
    }), r.subParser("simplifiedAutoLinks", function(e2, u7, d4) {
      "use strict";
      return u7.simplifiedAutoLink && (e2 = d4.converter._dispatch("simplifiedAutoLinks.before", e2, u7, d4), u7.excludeTrailingPunctuationFromURLs ? e2 = e2.replace(x2, I(u7)) : e2 = e2.replace(Y2, I(u7)), e2 = e2.replace(de, W3(u7, d4)), e2 = d4.converter._dispatch("simplifiedAutoLinks.after", e2, u7, d4)), e2;
    }), r.subParser("blockGamut", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("blockGamut.before", e2, u7, d4), e2 = r.subParser("blockQuotes")(e2, u7, d4), e2 = r.subParser("headers")(e2, u7, d4), e2 = r.subParser("horizontalRule")(e2, u7, d4), e2 = r.subParser("lists")(e2, u7, d4), e2 = r.subParser("codeBlocks")(e2, u7, d4), e2 = r.subParser("tables")(e2, u7, d4), e2 = r.subParser("hashHTMLBlocks")(e2, u7, d4), e2 = r.subParser("paragraphs")(e2, u7, d4), e2 = d4.converter._dispatch("blockGamut.after", e2, u7, d4), e2;
    }), r.subParser("blockQuotes", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("blockQuotes.before", e2, u7, d4), e2 = e2 + `

`;
      var a3 = /(^ {0,3}>[ \t]?.+\n(.+\n)*\n*)+/gm;
      return u7.splitAdjacentBlockquotes && (a3 = /^ {0,3}>[\s\S]*?(?:\n\n)/gm), e2 = e2.replace(a3, function(s) {
        return s = s.replace(/^[ \t]*>[ \t]?/gm, ""), s = s.replace(/¨0/g, ""), s = s.replace(/^[ \t]+$/gm, ""), s = r.subParser("githubCodeBlocks")(s, u7, d4), s = r.subParser("blockGamut")(s, u7, d4), s = s.replace(/(^|\n)/g, "$1  "), s = s.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm, function(i3, c3) {
          var t = c3;
          return t = t.replace(/^  /mg, "\xA80"), t = t.replace(/¨0/g, ""), t;
        }), r.subParser("hashBlock")(`<blockquote>
` + s + `
</blockquote>`, u7, d4);
      }), e2 = d4.converter._dispatch("blockQuotes.after", e2, u7, d4), e2;
    }), r.subParser("codeBlocks", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("codeBlocks.before", e2, u7, d4), e2 += "\xA80";
      var a3 = /(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=¨0))/g;
      return e2 = e2.replace(a3, function(s, i3, c3) {
        var t = i3, p3 = c3, l4 = `
`;
        return t = r.subParser("outdent")(t, u7, d4), t = r.subParser("encodeCode")(t, u7, d4), t = r.subParser("detab")(t, u7, d4), t = t.replace(/^\n+/g, ""), t = t.replace(/\n+$/g, ""), u7.omitExtraWLInCodeBlocks && (l4 = ""), t = "<pre><code>" + t + l4 + "</code></pre>", r.subParser("hashBlock")(t, u7, d4) + p3;
      }), e2 = e2.replace(/¨0/, ""), e2 = d4.converter._dispatch("codeBlocks.after", e2, u7, d4), e2;
    }), r.subParser("codeSpans", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("codeSpans.before", e2, u7, d4), typeof e2 > "u" && (e2 = ""), e2 = e2.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm, function(a3, s, i3, c3) {
        var t = c3;
        return t = t.replace(/^([ \t]*)/g, ""), t = t.replace(/[ \t]*$/g, ""), t = r.subParser("encodeCode")(t, u7, d4), t = s + "<code>" + t + "</code>", t = r.subParser("hashHTMLSpans")(t, u7, d4), t;
      }), e2 = d4.converter._dispatch("codeSpans.after", e2, u7, d4), e2;
    }), r.subParser("completeHTMLDocument", function(e2, u7, d4) {
      "use strict";
      if (!u7.completeHTMLDocument)
        return e2;
      e2 = d4.converter._dispatch("completeHTMLDocument.before", e2, u7, d4);
      var a3 = "html", s = `<!DOCTYPE HTML>
`, i3 = "", c3 = `<meta charset="utf-8">
`, t = "", p3 = "";
      typeof d4.metadata.parsed.doctype < "u" && (s = "<!DOCTYPE " + d4.metadata.parsed.doctype + `>
`, a3 = d4.metadata.parsed.doctype.toString().toLowerCase(), (a3 === "html" || a3 === "html5") && (c3 = '<meta charset="utf-8">'));
      for (var l4 in d4.metadata.parsed)
        if (d4.metadata.parsed.hasOwnProperty(l4))
          switch (l4.toLowerCase()) {
            case "doctype":
              break;
            case "title":
              i3 = "<title>" + d4.metadata.parsed.title + `</title>
`;
              break;
            case "charset":
              a3 === "html" || a3 === "html5" ? c3 = '<meta charset="' + d4.metadata.parsed.charset + `">
` : c3 = '<meta name="charset" content="' + d4.metadata.parsed.charset + `">
`;
              break;
            case "language":
            case "lang":
              t = ' lang="' + d4.metadata.parsed[l4] + '"', p3 += '<meta name="' + l4 + '" content="' + d4.metadata.parsed[l4] + `">
`;
              break;
            default:
              p3 += '<meta name="' + l4 + '" content="' + d4.metadata.parsed[l4] + `">
`;
          }
      return e2 = s + "<html" + t + `>
<head>
` + i3 + c3 + p3 + `</head>
<body>
` + e2.trim() + `
</body>
</html>`, e2 = d4.converter._dispatch("completeHTMLDocument.after", e2, u7, d4), e2;
    }), r.subParser("detab", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("detab.before", e2, u7, d4), e2 = e2.replace(/\t(?=\t)/g, "    "), e2 = e2.replace(/\t/g, "\xA8A\xA8B"), e2 = e2.replace(/¨B(.+?)¨A/g, function(a3, s) {
        for (var i3 = s, c3 = 4 - i3.length % 4, t = 0; t < c3; t++)
          i3 += " ";
        return i3;
      }), e2 = e2.replace(/¨A/g, "    "), e2 = e2.replace(/¨B/g, ""), e2 = d4.converter._dispatch("detab.after", e2, u7, d4), e2;
    }), r.subParser("ellipsis", function(e2, u7, d4) {
      "use strict";
      return u7.ellipsis && (e2 = d4.converter._dispatch("ellipsis.before", e2, u7, d4), e2 = e2.replace(/\.\.\./g, "\u2026"), e2 = d4.converter._dispatch("ellipsis.after", e2, u7, d4)), e2;
    }), r.subParser("emoji", function(e2, u7, d4) {
      "use strict";
      if (!u7.emoji)
        return e2;
      e2 = d4.converter._dispatch("emoji.before", e2, u7, d4);
      var a3 = /:([\S]+?):/g;
      return e2 = e2.replace(a3, function(s, i3) {
        return r.helper.emojis.hasOwnProperty(i3) ? r.helper.emojis[i3] : s;
      }), e2 = d4.converter._dispatch("emoji.after", e2, u7, d4), e2;
    }), r.subParser("encodeAmpsAndAngles", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("encodeAmpsAndAngles.before", e2, u7, d4), e2 = e2.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g, "&amp;"), e2 = e2.replace(/<(?![a-z\/?$!])/gi, "&lt;"), e2 = e2.replace(/</g, "&lt;"), e2 = e2.replace(/>/g, "&gt;"), e2 = d4.converter._dispatch("encodeAmpsAndAngles.after", e2, u7, d4), e2;
    }), r.subParser("encodeBackslashEscapes", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("encodeBackslashEscapes.before", e2, u7, d4), e2 = e2.replace(/\\(\\)/g, r.helper.escapeCharactersCallback), e2 = e2.replace(/\\([`*_{}\[\]()>#+.!~=|:-])/g, r.helper.escapeCharactersCallback), e2 = d4.converter._dispatch("encodeBackslashEscapes.after", e2, u7, d4), e2;
    }), r.subParser("encodeCode", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("encodeCode.before", e2, u7, d4), e2 = e2.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/([*_{}\[\]\\=~-])/g, r.helper.escapeCharactersCallback), e2 = d4.converter._dispatch("encodeCode.after", e2, u7, d4), e2;
    }), r.subParser("escapeSpecialCharsWithinTagAttributes", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("escapeSpecialCharsWithinTagAttributes.before", e2, u7, d4);
      var a3 = /<\/?[a-z\d_:-]+(?:[\s]+[\s\S]+?)?>/gi, s = /<!(--(?:(?:[^>-]|-[^>])(?:[^-]|-[^-])*)--)>/gi;
      return e2 = e2.replace(a3, function(i3) {
        return i3.replace(/(.)<\/?code>(?=.)/g, "$1`").replace(/([\\`*_~=|])/g, r.helper.escapeCharactersCallback);
      }), e2 = e2.replace(s, function(i3) {
        return i3.replace(/([\\`*_~=|])/g, r.helper.escapeCharactersCallback);
      }), e2 = d4.converter._dispatch("escapeSpecialCharsWithinTagAttributes.after", e2, u7, d4), e2;
    }), r.subParser("githubCodeBlocks", function(e2, u7, d4) {
      "use strict";
      return u7.ghCodeBlocks ? (e2 = d4.converter._dispatch("githubCodeBlocks.before", e2, u7, d4), e2 += "\xA80", e2 = e2.replace(/(?:^|\n)(?: {0,3})(```+|~~~+)(?: *)([^\s`~]*)\n([\s\S]*?)\n(?: {0,3})\1/g, function(a3, s, i3, c3) {
        var t = u7.omitExtraWLInCodeBlocks ? "" : `
`;
        return c3 = r.subParser("encodeCode")(c3, u7, d4), c3 = r.subParser("detab")(c3, u7, d4), c3 = c3.replace(/^\n+/g, ""), c3 = c3.replace(/\n+$/g, ""), c3 = "<pre><code" + (i3 ? ' class="' + i3 + " language-" + i3 + '"' : "") + ">" + c3 + t + "</code></pre>", c3 = r.subParser("hashBlock")(c3, u7, d4), `

\xA8G` + (d4.ghCodeBlocks.push({ text: a3, codeblock: c3 }) - 1) + `G

`;
      }), e2 = e2.replace(/¨0/, ""), d4.converter._dispatch("githubCodeBlocks.after", e2, u7, d4)) : e2;
    }), r.subParser("hashBlock", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("hashBlock.before", e2, u7, d4), e2 = e2.replace(/(^\n+|\n+$)/g, ""), e2 = `

\xA8K` + (d4.gHtmlBlocks.push(e2) - 1) + `K

`, e2 = d4.converter._dispatch("hashBlock.after", e2, u7, d4), e2;
    }), r.subParser("hashCodeTags", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("hashCodeTags.before", e2, u7, d4);
      var a3 = function(s, i3, c3, t) {
        var p3 = c3 + r.subParser("encodeCode")(i3, u7, d4) + t;
        return "\xA8C" + (d4.gHtmlSpans.push(p3) - 1) + "C";
      };
      return e2 = r.helper.replaceRecursiveRegExp(e2, a3, "<code\\b[^>]*>", "</code>", "gim"), e2 = d4.converter._dispatch("hashCodeTags.after", e2, u7, d4), e2;
    }), r.subParser("hashElement", function(e2, u7, d4) {
      "use strict";
      return function(a3, s) {
        var i3 = s;
        return i3 = i3.replace(/\n\n/g, `
`), i3 = i3.replace(/^\n/, ""), i3 = i3.replace(/\n+$/g, ""), i3 = `

\xA8K` + (d4.gHtmlBlocks.push(i3) - 1) + `K

`, i3;
      };
    }), r.subParser("hashHTMLBlocks", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("hashHTMLBlocks.before", e2, u7, d4);
      var a3 = ["pre", "div", "h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "table", "dl", "ol", "ul", "script", "noscript", "form", "fieldset", "iframe", "math", "style", "section", "header", "footer", "nav", "article", "aside", "address", "audio", "canvas", "figure", "hgroup", "output", "video", "p"], s = function(n2, f4, _2, m2) {
        var w3 = n2;
        return _2.search(/\bmarkdown\b/) !== -1 && (w3 = _2 + d4.converter.makeHtml(f4) + m2), `

\xA8K` + (d4.gHtmlBlocks.push(w3) - 1) + `K

`;
      };
      u7.backslashEscapesHTMLTags && (e2 = e2.replace(/\\<(\/?[^>]+?)>/g, function(n2, f4) {
        return "&lt;" + f4 + "&gt;";
      }));
      for (var i3 = 0; i3 < a3.length; ++i3)
        for (var c3, t = new RegExp("^ {0,3}(<" + a3[i3] + "\\b[^>]*>)", "im"), p3 = "<" + a3[i3] + "\\b[^>]*>", l4 = "</" + a3[i3] + ">"; (c3 = r.helper.regexIndexOf(e2, t)) !== -1; ) {
          var o3 = r.helper.splitAtIndex(e2, c3), h3 = r.helper.replaceRecursiveRegExp(o3[1], s, p3, l4, "im");
          if (h3 === o3[1])
            break;
          e2 = o3[0].concat(h3);
        }
      return e2 = e2.replace(/(\n {0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g, r.subParser("hashElement")(e2, u7, d4)), e2 = r.helper.replaceRecursiveRegExp(e2, function(n2) {
        return `

\xA8K` + (d4.gHtmlBlocks.push(n2) - 1) + `K

`;
      }, "^ {0,3}<!--", "-->", "gm"), e2 = e2.replace(/(?:\n\n)( {0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g, r.subParser("hashElement")(e2, u7, d4)), e2 = d4.converter._dispatch("hashHTMLBlocks.after", e2, u7, d4), e2;
    }), r.subParser("hashHTMLSpans", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("hashHTMLSpans.before", e2, u7, d4);
      function a3(s) {
        return "\xA8C" + (d4.gHtmlSpans.push(s) - 1) + "C";
      }
      return e2 = e2.replace(/<[^>]+?\/>/gi, function(s) {
        return a3(s);
      }), e2 = e2.replace(/<([^>]+?)>[\s\S]*?<\/\1>/g, function(s) {
        return a3(s);
      }), e2 = e2.replace(/<([^>]+?)\s[^>]+?>[\s\S]*?<\/\1>/g, function(s) {
        return a3(s);
      }), e2 = e2.replace(/<[^>]+?>/gi, function(s) {
        return a3(s);
      }), e2 = d4.converter._dispatch("hashHTMLSpans.after", e2, u7, d4), e2;
    }), r.subParser("unhashHTMLSpans", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("unhashHTMLSpans.before", e2, u7, d4);
      for (var a3 = 0; a3 < d4.gHtmlSpans.length; ++a3) {
        for (var s = d4.gHtmlSpans[a3], i3 = 0; /¨C(\d+)C/.test(s); ) {
          var c3 = RegExp.$1;
          if (s = s.replace("\xA8C" + c3 + "C", d4.gHtmlSpans[c3]), i3 === 10) {
            console.error("maximum nesting of 10 spans reached!!!");
            break;
          }
          ++i3;
        }
        e2 = e2.replace("\xA8C" + a3 + "C", s);
      }
      return e2 = d4.converter._dispatch("unhashHTMLSpans.after", e2, u7, d4), e2;
    }), r.subParser("hashPreCodeTags", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("hashPreCodeTags.before", e2, u7, d4);
      var a3 = function(s, i3, c3, t) {
        var p3 = c3 + r.subParser("encodeCode")(i3, u7, d4) + t;
        return `

\xA8G` + (d4.ghCodeBlocks.push({ text: s, codeblock: p3 }) - 1) + `G

`;
      };
      return e2 = r.helper.replaceRecursiveRegExp(e2, a3, "^ {0,3}<pre\\b[^>]*>\\s*<code\\b[^>]*>", "^ {0,3}</code>\\s*</pre>", "gim"), e2 = d4.converter._dispatch("hashPreCodeTags.after", e2, u7, d4), e2;
    }), r.subParser("headers", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("headers.before", e2, u7, d4);
      var a3 = isNaN(parseInt(u7.headerLevelStart)) ? 1 : parseInt(u7.headerLevelStart), s = u7.smoothLivePreview ? /^(.+)[ \t]*\n={2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n=+[ \t]*\n+/gm, i3 = u7.smoothLivePreview ? /^(.+)[ \t]*\n-{2,}[ \t]*\n+/gm : /^(.+)[ \t]*\n-+[ \t]*\n+/gm;
      e2 = e2.replace(s, function(p3, l4) {
        var o3 = r.subParser("spanGamut")(l4, u7, d4), h3 = u7.noHeaderId ? "" : ' id="' + t(l4) + '"', n2 = a3, f4 = "<h" + n2 + h3 + ">" + o3 + "</h" + n2 + ">";
        return r.subParser("hashBlock")(f4, u7, d4);
      }), e2 = e2.replace(i3, function(p3, l4) {
        var o3 = r.subParser("spanGamut")(l4, u7, d4), h3 = u7.noHeaderId ? "" : ' id="' + t(l4) + '"', n2 = a3 + 1, f4 = "<h" + n2 + h3 + ">" + o3 + "</h" + n2 + ">";
        return r.subParser("hashBlock")(f4, u7, d4);
      });
      var c3 = u7.requireSpaceBeforeHeadingText ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
      e2 = e2.replace(c3, function(p3, l4, o3) {
        var h3 = o3;
        u7.customizedHeaderId && (h3 = o3.replace(/\s?\{([^{]+?)}\s*$/, ""));
        var n2 = r.subParser("spanGamut")(h3, u7, d4), f4 = u7.noHeaderId ? "" : ' id="' + t(o3) + '"', _2 = a3 - 1 + l4.length, m2 = "<h" + _2 + f4 + ">" + n2 + "</h" + _2 + ">";
        return r.subParser("hashBlock")(m2, u7, d4);
      });
      function t(p3) {
        var l4, o3;
        if (u7.customizedHeaderId) {
          var h3 = p3.match(/\{([^{]+?)}\s*$/);
          h3 && h3[1] && (p3 = h3[1]);
        }
        return l4 = p3, r.helper.isString(u7.prefixHeaderId) ? o3 = u7.prefixHeaderId : u7.prefixHeaderId === true ? o3 = "section-" : o3 = "", u7.rawPrefixHeaderId || (l4 = o3 + l4), u7.ghCompatibleHeaderId ? l4 = l4.replace(/ /g, "-").replace(/&amp;/g, "").replace(/¨T/g, "").replace(/¨D/g, "").replace(/[&+$,\/:;=?@"#{}|^¨~\[\]`\\*)(%.!'<>]/g, "").toLowerCase() : u7.rawHeaderId ? l4 = l4.replace(/ /g, "-").replace(/&amp;/g, "&").replace(/¨T/g, "\xA8").replace(/¨D/g, "$").replace(/["']/g, "-").toLowerCase() : l4 = l4.replace(/[^\w]/g, "").toLowerCase(), u7.rawPrefixHeaderId && (l4 = o3 + l4), d4.hashLinkCounts[l4] ? l4 = l4 + "-" + d4.hashLinkCounts[l4]++ : d4.hashLinkCounts[l4] = 1, l4;
      }
      return e2 = d4.converter._dispatch("headers.after", e2, u7, d4), e2;
    }), r.subParser("horizontalRule", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("horizontalRule.before", e2, u7, d4);
      var a3 = r.subParser("hashBlock")("<hr />", u7, d4);
      return e2 = e2.replace(/^ {0,2}( ?-){3,}[ \t]*$/gm, a3), e2 = e2.replace(/^ {0,2}( ?\*){3,}[ \t]*$/gm, a3), e2 = e2.replace(/^ {0,2}( ?_){3,}[ \t]*$/gm, a3), e2 = d4.converter._dispatch("horizontalRule.after", e2, u7, d4), e2;
    }), r.subParser("images", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("images.before", e2, u7, d4);
      var a3 = /!\[([^\]]*?)][ \t]*()\([ \t]?<?([\S]+?(?:\([\S]*?\)[\S]*?)?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, s = /!\[([^\]]*?)][ \t]*()\([ \t]?<([^>]*)>(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(?:(["'])([^"]*?)\6))?[ \t]?\)/g, i3 = /!\[([^\]]*?)][ \t]*()\([ \t]?<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*(?:(["'])([^"]*?)\6)?[ \t]?\)/g, c3 = /!\[([^\]]*?)] ?(?:\n *)?\[([\s\S]*?)]()()()()()/g, t = /!\[([^\[\]]+)]()()()()()/g;
      function p3(o3, h3, n2, f4, _2, m2, w3, g6) {
        return f4 = f4.replace(/\s/g, ""), l4(o3, h3, n2, f4, _2, m2, w3, g6);
      }
      function l4(o3, h3, n2, f4, _2, m2, w3, g6) {
        var y4 = d4.gUrls, j2 = d4.gTitles, S = d4.gDimensions;
        if (n2 = n2.toLowerCase(), g6 || (g6 = ""), o3.search(/\(<?\s*>? ?(['"].*['"])?\)$/m) > -1)
          f4 = "";
        else if (f4 === "" || f4 === null)
          if ((n2 === "" || n2 === null) && (n2 = h3.toLowerCase().replace(/ ?\n/g, " ")), f4 = "#" + n2, !r.helper.isUndefined(y4[n2]))
            f4 = y4[n2], r.helper.isUndefined(j2[n2]) || (g6 = j2[n2]), r.helper.isUndefined(S[n2]) || (_2 = S[n2].width, m2 = S[n2].height);
          else
            return o3;
        h3 = h3.replace(/"/g, "&quot;").replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), f4 = f4.replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback);
        var v5 = '<img src="' + f4 + '" alt="' + h3 + '"';
        return g6 && r.helper.isString(g6) && (g6 = g6.replace(/"/g, "&quot;").replace(r.helper.regexes.asteriskDashAndColon, r.helper.escapeCharactersCallback), v5 += ' title="' + g6 + '"'), _2 && m2 && (_2 = _2 === "*" ? "auto" : _2, m2 = m2 === "*" ? "auto" : m2, v5 += ' width="' + _2 + '"', v5 += ' height="' + m2 + '"'), v5 += " />", v5;
      }
      return e2 = e2.replace(c3, l4), e2 = e2.replace(i3, p3), e2 = e2.replace(s, l4), e2 = e2.replace(a3, l4), e2 = e2.replace(t, l4), e2 = d4.converter._dispatch("images.after", e2, u7, d4), e2;
    }), r.subParser("italicsAndBold", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("italicsAndBold.before", e2, u7, d4);
      function a3(s, i3, c3) {
        return i3 + s + c3;
      }
      return u7.literalMidWordUnderscores ? (e2 = e2.replace(/\b___(\S[\s\S]*?)___\b/g, function(s, i3) {
        return a3(i3, "<strong><em>", "</em></strong>");
      }), e2 = e2.replace(/\b__(\S[\s\S]*?)__\b/g, function(s, i3) {
        return a3(i3, "<strong>", "</strong>");
      }), e2 = e2.replace(/\b_(\S[\s\S]*?)_\b/g, function(s, i3) {
        return a3(i3, "<em>", "</em>");
      })) : (e2 = e2.replace(/___(\S[\s\S]*?)___/g, function(s, i3) {
        return /\S$/.test(i3) ? a3(i3, "<strong><em>", "</em></strong>") : s;
      }), e2 = e2.replace(/__(\S[\s\S]*?)__/g, function(s, i3) {
        return /\S$/.test(i3) ? a3(i3, "<strong>", "</strong>") : s;
      }), e2 = e2.replace(/_([^\s_][\s\S]*?)_/g, function(s, i3) {
        return /\S$/.test(i3) ? a3(i3, "<em>", "</em>") : s;
      })), u7.literalMidWordAsterisks ? (e2 = e2.replace(/([^*]|^)\B\*\*\*(\S[\s\S]*?)\*\*\*\B(?!\*)/g, function(s, i3, c3) {
        return a3(c3, i3 + "<strong><em>", "</em></strong>");
      }), e2 = e2.replace(/([^*]|^)\B\*\*(\S[\s\S]*?)\*\*\B(?!\*)/g, function(s, i3, c3) {
        return a3(c3, i3 + "<strong>", "</strong>");
      }), e2 = e2.replace(/([^*]|^)\B\*(\S[\s\S]*?)\*\B(?!\*)/g, function(s, i3, c3) {
        return a3(c3, i3 + "<em>", "</em>");
      })) : (e2 = e2.replace(/\*\*\*(\S[\s\S]*?)\*\*\*/g, function(s, i3) {
        return /\S$/.test(i3) ? a3(i3, "<strong><em>", "</em></strong>") : s;
      }), e2 = e2.replace(/\*\*(\S[\s\S]*?)\*\*/g, function(s, i3) {
        return /\S$/.test(i3) ? a3(i3, "<strong>", "</strong>") : s;
      }), e2 = e2.replace(/\*([^\s*][\s\S]*?)\*/g, function(s, i3) {
        return /\S$/.test(i3) ? a3(i3, "<em>", "</em>") : s;
      })), e2 = d4.converter._dispatch("italicsAndBold.after", e2, u7, d4), e2;
    }), r.subParser("lists", function(e2, u7, d4) {
      "use strict";
      function a3(c3, t) {
        d4.gListLevel++, c3 = c3.replace(/\n{2,}$/, `
`), c3 += "\xA80";
        var p3 = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0| {0,3}([*+-]|\d+[.])[ \t]+))/gm, l4 = /\n[ \t]*\n(?!¨0)/.test(c3);
        return u7.disableForced4SpacesIndentedSublists && (p3 = /(\n)?(^ {0,3})([*+-]|\d+[.])[ \t]+((\[(x|X| )?])?[ \t]*[^\r]+?(\n{1,2}))(?=\n*(¨0|\2([*+-]|\d+[.])[ \t]+))/gm), c3 = c3.replace(p3, function(o3, h3, n2, f4, _2, m2, w3) {
          w3 = w3 && w3.trim() !== "";
          var g6 = r.subParser("outdent")(_2, u7, d4), y4 = "";
          return m2 && u7.tasklists && (y4 = ' class="task-list-item" style="list-style-type: none;"', g6 = g6.replace(/^[ \t]*\[(x|X| )?]/m, function() {
            var j2 = '<input type="checkbox" disabled style="margin: 0px 0.35em 0.25em -1.6em; vertical-align: middle;"';
            return w3 && (j2 += " checked"), j2 += ">", j2;
          })), g6 = g6.replace(/^([-*+]|\d\.)[ \t]+[\S\n ]*/g, function(j2) {
            return "\xA8A" + j2;
          }), h3 || g6.search(/\n{2,}/) > -1 ? (g6 = r.subParser("githubCodeBlocks")(g6, u7, d4), g6 = r.subParser("blockGamut")(g6, u7, d4)) : (g6 = r.subParser("lists")(g6, u7, d4), g6 = g6.replace(/\n$/, ""), g6 = r.subParser("hashHTMLBlocks")(g6, u7, d4), g6 = g6.replace(/\n\n+/g, `

`), l4 ? g6 = r.subParser("paragraphs")(g6, u7, d4) : g6 = r.subParser("spanGamut")(g6, u7, d4)), g6 = g6.replace("\xA8A", ""), g6 = "<li" + y4 + ">" + g6 + `</li>
`, g6;
        }), c3 = c3.replace(/¨0/g, ""), d4.gListLevel--, t && (c3 = c3.replace(/\s+$/, "")), c3;
      }
      function s(c3, t) {
        if (t === "ol") {
          var p3 = c3.match(/^ *(\d+)\./);
          if (p3 && p3[1] !== "1")
            return ' start="' + p3[1] + '"';
        }
        return "";
      }
      function i3(c3, t, p3) {
        var l4 = u7.disableForced4SpacesIndentedSublists ? /^ ?\d+\.[ \t]/gm : /^ {0,3}\d+\.[ \t]/gm, o3 = u7.disableForced4SpacesIndentedSublists ? /^ ?[*+-][ \t]/gm : /^ {0,3}[*+-][ \t]/gm, h3 = t === "ul" ? l4 : o3, n2 = "";
        if (c3.search(h3) !== -1)
          (function _2(m2) {
            var w3 = m2.search(h3), g6 = s(c3, t);
            w3 !== -1 ? (n2 += `

<` + t + g6 + `>
` + a3(m2.slice(0, w3), !!p3) + "</" + t + `>
`, t = t === "ul" ? "ol" : "ul", h3 = t === "ul" ? l4 : o3, _2(m2.slice(w3))) : n2 += `

<` + t + g6 + `>
` + a3(m2, !!p3) + "</" + t + `>
`;
          })(c3);
        else {
          var f4 = s(c3, t);
          n2 = `

<` + t + f4 + `>
` + a3(c3, !!p3) + "</" + t + `>
`;
        }
        return n2;
      }
      return e2 = d4.converter._dispatch("lists.before", e2, u7, d4), e2 += "\xA80", d4.gListLevel ? e2 = e2.replace(/^(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c3, t, p3) {
        var l4 = p3.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i3(t, l4, true);
      }) : e2 = e2.replace(/(\n\n|^\n?)(( {0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(¨0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm, function(c3, t, p3, l4) {
        var o3 = l4.search(/[*+-]/g) > -1 ? "ul" : "ol";
        return i3(p3, o3, false);
      }), e2 = e2.replace(/¨0/, ""), e2 = d4.converter._dispatch("lists.after", e2, u7, d4), e2;
    }), r.subParser("metadata", function(e2, u7, d4) {
      "use strict";
      if (!u7.metadata)
        return e2;
      e2 = d4.converter._dispatch("metadata.before", e2, u7, d4);
      function a3(s) {
        d4.metadata.raw = s, s = s.replace(/&/g, "&amp;").replace(/"/g, "&quot;"), s = s.replace(/\n {4}/g, " "), s.replace(/^([\S ]+): +([\s\S]+?)$/gm, function(i3, c3, t) {
          return d4.metadata.parsed[c3] = t, "";
        });
      }
      return e2 = e2.replace(/^\s*«««+(\S*?)\n([\s\S]+?)\n»»»+\n/, function(s, i3, c3) {
        return a3(c3), "\xA8M";
      }), e2 = e2.replace(/^\s*---+(\S*?)\n([\s\S]+?)\n---+\n/, function(s, i3, c3) {
        return i3 && (d4.metadata.format = i3), a3(c3), "\xA8M";
      }), e2 = e2.replace(/¨M/g, ""), e2 = d4.converter._dispatch("metadata.after", e2, u7, d4), e2;
    }), r.subParser("outdent", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("outdent.before", e2, u7, d4), e2 = e2.replace(/^(\t|[ ]{1,4})/gm, "\xA80"), e2 = e2.replace(/¨0/g, ""), e2 = d4.converter._dispatch("outdent.after", e2, u7, d4), e2;
    }), r.subParser("paragraphs", function(e2, u7, d4) {
      "use strict";
      e2 = d4.converter._dispatch("paragraphs.before", e2, u7, d4), e2 = e2.replace(/^\n+/g, ""), e2 = e2.replace(/\n+$/g, "");
      for (var a3 = e2.split(/\n{2,}/g), s = [], i3 = a3.length, c3 = 0; c3 < i3; c3++) {
        var t = a3[c3];
        t.search(/¨(K|G)(\d+)\1/g) >= 0 ? s.push(t) : t.search(/\S/) >= 0 && (t = r.subParser("spanGamut")(t, u7, d4), t = t.replace(/^([ \t]*)/g, "<p>"), t += "</p>", s.push(t));
      }
      for (i3 = s.length, c3 = 0; c3 < i3; c3++) {
        for (var p3 = "", l4 = s[c3], o3 = false; /¨(K|G)(\d+)\1/.test(l4); ) {
          var h3 = RegExp.$1, n2 = RegExp.$2;
          h3 === "K" ? p3 = d4.gHtmlBlocks[n2] : o3 ? p3 = r.subParser("encodeCode")(d4.ghCodeBlocks[n2].text, u7, d4) : p3 = d4.ghCodeBlocks[n2].codeblock, p3 = p3.replace(/\$/g, "$$$$"), l4 = l4.replace(/(\n\n)?¨(K|G)\d+\2(\n\n)?/, p3), /^<pre\b[^>]*>\s*<code\b[^>]*>/.test(l4) && (o3 = true);
        }
        s[c3] = l4;
      }
      return e2 = s.join(`
`), e2 = e2.replace(/^\n+/g, ""), e2 = e2.replace(/\n+$/g, ""), d4.converter._dispatch("paragraphs.after", e2, u7, d4);
    }), r.subParser("runExtension", function(e2, u7, d4, a3) {
      "use strict";
      if (e2.filter)
        u7 = e2.filter(u7, a3.converter, d4);
      else if (e2.regex) {
        var s = e2.regex;
        s instanceof RegExp || (s = new RegExp(s, "g")), u7 = u7.replace(s, e2.replace);
      }
      return u7;
    }), r.subParser("spanGamut", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("spanGamut.before", e2, u7, d4), e2 = r.subParser("codeSpans")(e2, u7, d4), e2 = r.subParser("escapeSpecialCharsWithinTagAttributes")(e2, u7, d4), e2 = r.subParser("encodeBackslashEscapes")(e2, u7, d4), e2 = r.subParser("images")(e2, u7, d4), e2 = r.subParser("anchors")(e2, u7, d4), e2 = r.subParser("autoLinks")(e2, u7, d4), e2 = r.subParser("simplifiedAutoLinks")(e2, u7, d4), e2 = r.subParser("emoji")(e2, u7, d4), e2 = r.subParser("underline")(e2, u7, d4), e2 = r.subParser("italicsAndBold")(e2, u7, d4), e2 = r.subParser("strikethrough")(e2, u7, d4), e2 = r.subParser("ellipsis")(e2, u7, d4), e2 = r.subParser("hashHTMLSpans")(e2, u7, d4), e2 = r.subParser("encodeAmpsAndAngles")(e2, u7, d4), u7.simpleLineBreaks ? /\n\n¨K/.test(e2) || (e2 = e2.replace(/\n+/g, `<br />
`)) : e2 = e2.replace(/  +\n/g, `<br />
`), e2 = d4.converter._dispatch("spanGamut.after", e2, u7, d4), e2;
    }), r.subParser("strikethrough", function(e2, u7, d4) {
      "use strict";
      function a3(s) {
        return u7.simplifiedAutoLink && (s = r.subParser("simplifiedAutoLinks")(s, u7, d4)), "<del>" + s + "</del>";
      }
      return u7.strikethrough && (e2 = d4.converter._dispatch("strikethrough.before", e2, u7, d4), e2 = e2.replace(/(?:~){2}([\s\S]+?)(?:~){2}/g, function(s, i3) {
        return a3(i3);
      }), e2 = d4.converter._dispatch("strikethrough.after", e2, u7, d4)), e2;
    }), r.subParser("stripLinkDefinitions", function(e2, u7, d4) {
      "use strict";
      var a3 = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?([^>\s]+)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n+|(?=¨0))/gm, s = /^ {0,3}\[([^\]]+)]:[ \t]*\n?[ \t]*<?(data:.+?\/.+?;base64,[A-Za-z0-9+/=\n]+?)>?(?: =([*\d]+[A-Za-z%]{0,4})x([*\d]+[A-Za-z%]{0,4}))?[ \t]*\n?[ \t]*(?:(\n*)["|'(](.+?)["|')][ \t]*)?(?:\n\n|(?=¨0)|(?=\n\[))/gm;
      e2 += "\xA80";
      var i3 = function(c3, t, p3, l4, o3, h3, n2) {
        return t = t.toLowerCase(), e2.toLowerCase().split(t).length - 1 < 2 ? c3 : (p3.match(/^data:.+?\/.+?;base64,/) ? d4.gUrls[t] = p3.replace(/\s/g, "") : d4.gUrls[t] = r.subParser("encodeAmpsAndAngles")(p3, u7, d4), h3 ? h3 + n2 : (n2 && (d4.gTitles[t] = n2.replace(/"|'/g, "&quot;")), u7.parseImgDimensions && l4 && o3 && (d4.gDimensions[t] = { width: l4, height: o3 }), ""));
      };
      return e2 = e2.replace(s, i3), e2 = e2.replace(a3, i3), e2 = e2.replace(/¨0/, ""), e2;
    }), r.subParser("tables", function(e2, u7, d4) {
      "use strict";
      if (!u7.tables)
        return e2;
      var a3 = /^ {0,3}\|?.+\|.+\n {0,3}\|?[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*:?[ \t]*(?:[-=]){2,}[\s\S]+?(?:\n\n|¨0)/gm, s = /^ {0,3}\|.+\|[ \t]*\n {0,3}\|[ \t]*:?[ \t]*(?:[-=]){2,}[ \t]*:?[ \t]*\|[ \t]*\n( {0,3}\|.+\|[ \t]*\n)*(?:\n|¨0)/gm;
      function i3(o3) {
        return /^:[ \t]*--*$/.test(o3) ? ' style="text-align:left;"' : /^--*[ \t]*:[ \t]*$/.test(o3) ? ' style="text-align:right;"' : /^:[ \t]*--*[ \t]*:$/.test(o3) ? ' style="text-align:center;"' : "";
      }
      function c3(o3, h3) {
        var n2 = "";
        return o3 = o3.trim(), (u7.tablesHeaderId || u7.tableHeaderId) && (n2 = ' id="' + o3.replace(/ /g, "_").toLowerCase() + '"'), o3 = r.subParser("spanGamut")(o3, u7, d4), "<th" + n2 + h3 + ">" + o3 + `</th>
`;
      }
      function t(o3, h3) {
        var n2 = r.subParser("spanGamut")(o3, u7, d4);
        return "<td" + h3 + ">" + n2 + `</td>
`;
      }
      function p3(o3, h3) {
        for (var n2 = `<table>
<thead>
<tr>
`, f4 = o3.length, _2 = 0; _2 < f4; ++_2)
          n2 += o3[_2];
        for (n2 += `</tr>
</thead>
<tbody>
`, _2 = 0; _2 < h3.length; ++_2) {
          n2 += `<tr>
`;
          for (var m2 = 0; m2 < f4; ++m2)
            n2 += h3[_2][m2];
          n2 += `</tr>
`;
        }
        return n2 += `</tbody>
</table>
`, n2;
      }
      function l4(o3) {
        var h3, n2 = o3.split(`
`);
        for (h3 = 0; h3 < n2.length; ++h3)
          /^ {0,3}\|/.test(n2[h3]) && (n2[h3] = n2[h3].replace(/^ {0,3}\|/, "")), /\|[ \t]*$/.test(n2[h3]) && (n2[h3] = n2[h3].replace(/\|[ \t]*$/, "")), n2[h3] = r.subParser("codeSpans")(n2[h3], u7, d4);
        var f4 = n2[0].split("|").map(function(v5) {
          return v5.trim();
        }), _2 = n2[1].split("|").map(function(v5) {
          return v5.trim();
        }), m2 = [], w3 = [], g6 = [], y4 = [];
        for (n2.shift(), n2.shift(), h3 = 0; h3 < n2.length; ++h3)
          n2[h3].trim() !== "" && m2.push(n2[h3].split("|").map(function(v5) {
            return v5.trim();
          }));
        if (f4.length < _2.length)
          return o3;
        for (h3 = 0; h3 < _2.length; ++h3)
          g6.push(i3(_2[h3]));
        for (h3 = 0; h3 < f4.length; ++h3)
          r.helper.isUndefined(g6[h3]) && (g6[h3] = ""), w3.push(c3(f4[h3], g6[h3]));
        for (h3 = 0; h3 < m2.length; ++h3) {
          for (var j2 = [], S = 0; S < w3.length; ++S)
            r.helper.isUndefined(m2[h3][S]), j2.push(t(m2[h3][S], g6[S]));
          y4.push(j2);
        }
        return p3(w3, y4);
      }
      return e2 = d4.converter._dispatch("tables.before", e2, u7, d4), e2 = e2.replace(/\\(\|)/g, r.helper.escapeCharactersCallback), e2 = e2.replace(a3, l4), e2 = e2.replace(s, l4), e2 = d4.converter._dispatch("tables.after", e2, u7, d4), e2;
    }), r.subParser("underline", function(e2, u7, d4) {
      "use strict";
      return u7.underline && (e2 = d4.converter._dispatch("underline.before", e2, u7, d4), u7.literalMidWordUnderscores ? (e2 = e2.replace(/\b___(\S[\s\S]*?)___\b/g, function(a3, s) {
        return "<u>" + s + "</u>";
      }), e2 = e2.replace(/\b__(\S[\s\S]*?)__\b/g, function(a3, s) {
        return "<u>" + s + "</u>";
      })) : (e2 = e2.replace(/___(\S[\s\S]*?)___/g, function(a3, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a3;
      }), e2 = e2.replace(/__(\S[\s\S]*?)__/g, function(a3, s) {
        return /\S$/.test(s) ? "<u>" + s + "</u>" : a3;
      })), e2 = e2.replace(/(_)/g, r.helper.escapeCharactersCallback), e2 = d4.converter._dispatch("underline.after", e2, u7, d4)), e2;
    }), r.subParser("unescapeSpecialChars", function(e2, u7, d4) {
      "use strict";
      return e2 = d4.converter._dispatch("unescapeSpecialChars.before", e2, u7, d4), e2 = e2.replace(/¨E(\d+)E/g, function(a3, s) {
        var i3 = parseInt(s);
        return String.fromCharCode(i3);
      }), e2 = d4.converter._dispatch("unescapeSpecialChars.after", e2, u7, d4), e2;
    }), r.subParser("makeMarkdown.blockquote", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (e2.hasChildNodes())
        for (var a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3) {
          var c3 = r.subParser("makeMarkdown.node")(a3[i3], u7);
          c3 !== "" && (d4 += c3);
        }
      return d4 = d4.trim(), d4 = "> " + d4.split(`
`).join(`
> `), d4;
    }), r.subParser("makeMarkdown.codeBlock", function(e2, u7) {
      "use strict";
      var d4 = e2.getAttribute("language"), a3 = e2.getAttribute("precodenum");
      return "```" + d4 + `
` + u7.preList[a3] + "\n```";
    }), r.subParser("makeMarkdown.codeSpan", function(e2) {
      "use strict";
      return "`" + e2.innerHTML + "`";
    }), r.subParser("makeMarkdown.emphasis", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (e2.hasChildNodes()) {
        d4 += "*";
        for (var a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3)
          d4 += r.subParser("makeMarkdown.node")(a3[i3], u7);
        d4 += "*";
      }
      return d4;
    }), r.subParser("makeMarkdown.header", function(e2, u7, d4) {
      "use strict";
      var a3 = new Array(d4 + 1).join("#"), s = "";
      if (e2.hasChildNodes()) {
        s = a3 + " ";
        for (var i3 = e2.childNodes, c3 = i3.length, t = 0; t < c3; ++t)
          s += r.subParser("makeMarkdown.node")(i3[t], u7);
      }
      return s;
    }), r.subParser("makeMarkdown.hr", function() {
      "use strict";
      return "---";
    }), r.subParser("makeMarkdown.image", function(e2) {
      "use strict";
      var u7 = "";
      return e2.hasAttribute("src") && (u7 += "![" + e2.getAttribute("alt") + "](", u7 += "<" + e2.getAttribute("src") + ">", e2.hasAttribute("width") && e2.hasAttribute("height") && (u7 += " =" + e2.getAttribute("width") + "x" + e2.getAttribute("height")), e2.hasAttribute("title") && (u7 += ' "' + e2.getAttribute("title") + '"'), u7 += ")"), u7;
    }), r.subParser("makeMarkdown.links", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (e2.hasChildNodes() && e2.hasAttribute("href")) {
        var a3 = e2.childNodes, s = a3.length;
        d4 = "[";
        for (var i3 = 0; i3 < s; ++i3)
          d4 += r.subParser("makeMarkdown.node")(a3[i3], u7);
        d4 += "](", d4 += "<" + e2.getAttribute("href") + ">", e2.hasAttribute("title") && (d4 += ' "' + e2.getAttribute("title") + '"'), d4 += ")";
      }
      return d4;
    }), r.subParser("makeMarkdown.list", function(e2, u7, d4) {
      "use strict";
      var a3 = "";
      if (!e2.hasChildNodes())
        return "";
      for (var s = e2.childNodes, i3 = s.length, c3 = e2.getAttribute("start") || 1, t = 0; t < i3; ++t)
        if (!(typeof s[t].tagName > "u" || s[t].tagName.toLowerCase() !== "li")) {
          var p3 = "";
          d4 === "ol" ? p3 = c3.toString() + ". " : p3 = "- ", a3 += p3 + r.subParser("makeMarkdown.listItem")(s[t], u7), ++c3;
        }
      return a3 += `
<!-- -->
`, a3.trim();
    }), r.subParser("makeMarkdown.listItem", function(e2, u7) {
      "use strict";
      for (var d4 = "", a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3)
        d4 += r.subParser("makeMarkdown.node")(a3[i3], u7);
      return /\n$/.test(d4) ? d4 = d4.split(`
`).join(`
    `).replace(/^ {4}$/gm, "").replace(/\n\n+/g, `

`) : d4 += `
`, d4;
    }), r.subParser("makeMarkdown.node", function(e2, u7, d4) {
      "use strict";
      d4 = d4 || false;
      var a3 = "";
      if (e2.nodeType === 3)
        return r.subParser("makeMarkdown.txt")(e2, u7);
      if (e2.nodeType === 8)
        return "<!--" + e2.data + `-->

`;
      if (e2.nodeType !== 1)
        return "";
      var s = e2.tagName.toLowerCase();
      switch (s) {
        case "h1":
          d4 || (a3 = r.subParser("makeMarkdown.header")(e2, u7, 1) + `

`);
          break;
        case "h2":
          d4 || (a3 = r.subParser("makeMarkdown.header")(e2, u7, 2) + `

`);
          break;
        case "h3":
          d4 || (a3 = r.subParser("makeMarkdown.header")(e2, u7, 3) + `

`);
          break;
        case "h4":
          d4 || (a3 = r.subParser("makeMarkdown.header")(e2, u7, 4) + `

`);
          break;
        case "h5":
          d4 || (a3 = r.subParser("makeMarkdown.header")(e2, u7, 5) + `

`);
          break;
        case "h6":
          d4 || (a3 = r.subParser("makeMarkdown.header")(e2, u7, 6) + `

`);
          break;
        case "p":
          d4 || (a3 = r.subParser("makeMarkdown.paragraph")(e2, u7) + `

`);
          break;
        case "blockquote":
          d4 || (a3 = r.subParser("makeMarkdown.blockquote")(e2, u7) + `

`);
          break;
        case "hr":
          d4 || (a3 = r.subParser("makeMarkdown.hr")(e2, u7) + `

`);
          break;
        case "ol":
          d4 || (a3 = r.subParser("makeMarkdown.list")(e2, u7, "ol") + `

`);
          break;
        case "ul":
          d4 || (a3 = r.subParser("makeMarkdown.list")(e2, u7, "ul") + `

`);
          break;
        case "precode":
          d4 || (a3 = r.subParser("makeMarkdown.codeBlock")(e2, u7) + `

`);
          break;
        case "pre":
          d4 || (a3 = r.subParser("makeMarkdown.pre")(e2, u7) + `

`);
          break;
        case "table":
          d4 || (a3 = r.subParser("makeMarkdown.table")(e2, u7) + `

`);
          break;
        case "code":
          a3 = r.subParser("makeMarkdown.codeSpan")(e2, u7);
          break;
        case "em":
        case "i":
          a3 = r.subParser("makeMarkdown.emphasis")(e2, u7);
          break;
        case "strong":
        case "b":
          a3 = r.subParser("makeMarkdown.strong")(e2, u7);
          break;
        case "del":
          a3 = r.subParser("makeMarkdown.strikethrough")(e2, u7);
          break;
        case "a":
          a3 = r.subParser("makeMarkdown.links")(e2, u7);
          break;
        case "img":
          a3 = r.subParser("makeMarkdown.image")(e2, u7);
          break;
        default:
          a3 = e2.outerHTML + `

`;
      }
      return a3;
    }), r.subParser("makeMarkdown.paragraph", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (e2.hasChildNodes())
        for (var a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3)
          d4 += r.subParser("makeMarkdown.node")(a3[i3], u7);
      return d4 = d4.trim(), d4;
    }), r.subParser("makeMarkdown.pre", function(e2, u7) {
      "use strict";
      var d4 = e2.getAttribute("prenum");
      return "<pre>" + u7.preList[d4] + "</pre>";
    }), r.subParser("makeMarkdown.strikethrough", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (e2.hasChildNodes()) {
        d4 += "~~";
        for (var a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3)
          d4 += r.subParser("makeMarkdown.node")(a3[i3], u7);
        d4 += "~~";
      }
      return d4;
    }), r.subParser("makeMarkdown.strong", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (e2.hasChildNodes()) {
        d4 += "**";
        for (var a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3)
          d4 += r.subParser("makeMarkdown.node")(a3[i3], u7);
        d4 += "**";
      }
      return d4;
    }), r.subParser("makeMarkdown.table", function(e2, u7) {
      "use strict";
      var d4 = "", a3 = [[], []], s = e2.querySelectorAll("thead>tr>th"), i3 = e2.querySelectorAll("tbody>tr"), c3, t;
      for (c3 = 0; c3 < s.length; ++c3) {
        var p3 = r.subParser("makeMarkdown.tableCell")(s[c3], u7), l4 = "---";
        if (s[c3].hasAttribute("style")) {
          var o3 = s[c3].getAttribute("style").toLowerCase().replace(/\s/g, "");
          switch (o3) {
            case "text-align:left;":
              l4 = ":---";
              break;
            case "text-align:right;":
              l4 = "---:";
              break;
            case "text-align:center;":
              l4 = ":---:";
              break;
          }
        }
        a3[0][c3] = p3.trim(), a3[1][c3] = l4;
      }
      for (c3 = 0; c3 < i3.length; ++c3) {
        var h3 = a3.push([]) - 1, n2 = i3[c3].getElementsByTagName("td");
        for (t = 0; t < s.length; ++t) {
          var f4 = " ";
          typeof n2[t] < "u" && (f4 = r.subParser("makeMarkdown.tableCell")(n2[t], u7)), a3[h3].push(f4);
        }
      }
      var _2 = 3;
      for (c3 = 0; c3 < a3.length; ++c3)
        for (t = 0; t < a3[c3].length; ++t) {
          var m2 = a3[c3][t].length;
          m2 > _2 && (_2 = m2);
        }
      for (c3 = 0; c3 < a3.length; ++c3) {
        for (t = 0; t < a3[c3].length; ++t)
          c3 === 1 ? a3[c3][t].slice(-1) === ":" ? a3[c3][t] = r.helper.padEnd(a3[c3][t].slice(-1), _2 - 1, "-") + ":" : a3[c3][t] = r.helper.padEnd(a3[c3][t], _2, "-") : a3[c3][t] = r.helper.padEnd(a3[c3][t], _2);
        d4 += "| " + a3[c3].join(" | ") + ` |
`;
      }
      return d4.trim();
    }), r.subParser("makeMarkdown.tableCell", function(e2, u7) {
      "use strict";
      var d4 = "";
      if (!e2.hasChildNodes())
        return "";
      for (var a3 = e2.childNodes, s = a3.length, i3 = 0; i3 < s; ++i3)
        d4 += r.subParser("makeMarkdown.node")(a3[i3], u7, true);
      return d4.trim();
    }), r.subParser("makeMarkdown.txt", function(e2) {
      "use strict";
      var u7 = e2.nodeValue;
      return u7 = u7.replace(/ +/g, " "), u7 = u7.replace(/¨NBSP;/g, " "), u7 = r.helper.unescapeHTMLEntities(u7), u7 = u7.replace(/([*_~|`])/g, "\\$1"), u7 = u7.replace(/^(\s*)>/g, "\\$1>"), u7 = u7.replace(/^#/gm, "\\#"), u7 = u7.replace(/^(\s*)([-=]{3,})(\s*)$/, "$1\\$2$3"), u7 = u7.replace(/^( {0,3}\d+)\./gm, "$1\\."), u7 = u7.replace(/^( {0,3})([+-])/gm, "$1\\$2"), u7 = u7.replace(/]([\s]*)\(/g, "\\]$1\\("), u7 = u7.replace(/^ {0,3}\[([\S \t]*?)]:/gm, "\\[$1]:"), u7;
    });
    var re = this;
    typeof define == "function" && define.amd ? define(function() {
      "use strict";
      return r;
    }) : typeof $2 < "u" && $2.exports ? $2.exports = r : re.showdown = r;
  }).call(X2);
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
  const indent = text.match(/\t* *\n( *)/)[1];
  text = text.replace(regex`${/^/}${indent}`.gm, "");
  element2.innerHTML = markdownConverter.makeHtml(text);
  return element2;
};
var markdown_default = Markdown;

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
var toastOn = f3``;
var toastify = f3`
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
var toastClose = f3`
        background: transparent;
        border: 0;
        color: white;
        cursor: pointer;
        font-family: inherit;
        font-size: 1em;
        opacity: 0.4;
        padding: 0 5px;
    `;
var toastifyRight = f3`
        right: 15px;
        @media only screen and (max-width: 360px) {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            max-width: fit-content;
        }
    `;
var toastifyLeft = f3`
        left: 15px;
        @media only screen and (max-width: 360px) {
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
            max-width: fit-content;
        }
    `;
var toastifyTop = f3`
        top: -150px;
    `;
var toastifyBottom = f3`
        bottom: -150px;
    `;
var toastifyRounded = f3`
        border-radius: 25px;
    `;
var toastifyAvatar = f3`
        width: 1.5em;
        height: 1.5em;
        margin: -7px 5px;
        border-radius: 2px;
    `;
var toastifyCenter = f3`
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
    gravity: toastifyTop,
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
  *     Toastify({
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
      console.warn('DEPRECATION NOTICE: "backgroundColor" is being deprecated. Please use the "style.background" property.');
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
      const x2 = this._getAxisOffsetAValue("x", this.options);
      const y4 = this._getAxisOffsetAValue("y", this.options);
      const xOffset = this.options.position == "left" ? x2 : `-${x2}`;
      const yOffset = this.options.gravity == toastifyTop ? y4 : `-${y4}`;
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
    for (let i3 = 0; i3 < allToasts.length; i3++) {
      if (allToasts[i3].classList.contains(toastifyTop) === true) {
        classUsed = toastifyTop;
      } else {
        classUsed = toastifyBottom;
      }
      let height = allToasts[i3].offsetHeight;
      classUsed = classUsed.substr(9, classUsed.length - 1);
      let offset = 15;
      let width = window.innerWidth > 0 ? window.innerWidth : screen.width;
      if (width <= 360) {
        allToasts[i3].style[classUsed] = `${offsetSize[classUsed]}px`;
        offsetSize[classUsed] += height + offset;
      } else {
        if (allToasts[i3].classList.contains(toastifyLeft) === true) {
          allToasts[i3].style[classUsed] = `${topLeftOffsetSize[classUsed]}px`;
          topLeftOffsetSize[classUsed] += height + offset;
        } else {
          allToasts[i3].style[classUsed] = `${topRightOffsetSize[classUsed]}px`;
          topRightOffsetSize[classUsed] += height + offset;
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
