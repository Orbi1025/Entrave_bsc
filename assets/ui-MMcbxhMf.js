import {
  r as h,
  g as Zm,
  j as C,
  R as Yt,
  t as yc,
} from "./wagmi-core-DTeud8oQ.js";
var wc = { exports: {} },
  Ae = {},
  Sc = { exports: {} },
  xc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(P, R) {
    var D = P.length;
    P.push(R);
    e: for (; 0 < D; ) {
      var z = (D - 1) >>> 1,
        V = P[z];
      if (0 < o(V, R)) (P[z] = R), (P[D] = V), (D = z);
      else break e;
    }
  }
  function n(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var R = P[0],
      D = P.pop();
    if (D !== R) {
      P[0] = D;
      e: for (var z = 0, V = P.length, qe = V >>> 1; z < qe; ) {
        var ke = 2 * (z + 1) - 1,
          Ct = P[ke],
          ve = ke + 1,
          Y = P[ve];
        if (0 > o(Ct, D))
          ve < V && 0 > o(Y, Ct)
            ? ((P[z] = Y), (P[ve] = D), (z = ve))
            : ((P[z] = Ct), (P[ke] = D), (z = ke));
        else if (ve < V && 0 > o(Y, D)) (P[z] = Y), (P[ve] = D), (z = ve);
        else break e;
      }
    }
    return R;
  }
  function o(P, R) {
    var D = P.sortIndex - R.sortIndex;
    return D !== 0 ? D : P.id - R.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function () {
      return i.now();
    };
  } else {
    var l = Date,
      u = l.now();
    e.unstable_now = function () {
      return l.now() - u;
    };
  }
  var s = [],
    a = [],
    f = 1,
    c = null,
    m = 3,
    g = !1,
    w = !1,
    y = !1,
    x = typeof setTimeout == "function" ? setTimeout : null,
    d = typeof clearTimeout == "function" ? clearTimeout : null,
    p = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function v(P) {
    for (var R = n(a); R !== null; ) {
      if (R.callback === null) r(a);
      else if (R.startTime <= P)
        r(a), (R.sortIndex = R.expirationTime), t(s, R);
      else break;
      R = n(a);
    }
  }
  function S(P) {
    if (((y = !1), v(P), !w))
      if (n(s) !== null) (w = !0), F(E);
      else {
        var R = n(a);
        R !== null && K(S, R.startTime - P);
      }
  }
  function E(P, R) {
    (w = !1), y && ((y = !1), d(M), (M = -1)), (g = !0);
    var D = m;
    try {
      for (
        v(R), c = n(s);
        c !== null && (!(c.expirationTime > R) || (P && !L()));

      ) {
        var z = c.callback;
        if (typeof z == "function") {
          (c.callback = null), (m = c.priorityLevel);
          var V = z(c.expirationTime <= R);
          (R = e.unstable_now()),
            typeof V == "function" ? (c.callback = V) : c === n(s) && r(s),
            v(R);
        } else r(s);
        c = n(s);
      }
      if (c !== null) var qe = !0;
      else {
        var ke = n(a);
        ke !== null && K(S, ke.startTime - R), (qe = !1);
      }
      return qe;
    } finally {
      (c = null), (m = D), (g = !1);
    }
  }
  var k = !1,
    _ = null,
    M = -1,
    A = 5,
    T = -1;
  function L() {
    return !(e.unstable_now() - T < A);
  }
  function W() {
    if (_ !== null) {
      var P = e.unstable_now();
      T = P;
      var R = !0;
      try {
        R = _(!0, P);
      } finally {
        R ? U() : ((k = !1), (_ = null));
      }
    } else k = !1;
  }
  var U;
  if (typeof p == "function")
    U = function () {
      p(W);
    };
  else if (typeof MessageChannel < "u") {
    var $ = new MessageChannel(),
      re = $.port2;
    ($.port1.onmessage = W),
      (U = function () {
        re.postMessage(null);
      });
  } else
    U = function () {
      x(W, 0);
    };
  function F(P) {
    (_ = P), k || ((k = !0), U());
  }
  function K(P, R) {
    M = x(function () {
      P(e.unstable_now());
    }, R);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (P) {
      P.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      w || g || ((w = !0), F(E));
    }),
    (e.unstable_forceFrameRate = function (P) {
      0 > P || 125 < P
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (A = 0 < P ? Math.floor(1e3 / P) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return m;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(s);
    }),
    (e.unstable_next = function (P) {
      switch (m) {
        case 1:
        case 2:
        case 3:
          var R = 3;
          break;
        default:
          R = m;
      }
      var D = m;
      m = R;
      try {
        return P();
      } finally {
        m = D;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (P, R) {
      switch (P) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          P = 3;
      }
      var D = m;
      m = P;
      try {
        return R();
      } finally {
        m = D;
      }
    }),
    (e.unstable_scheduleCallback = function (P, R, D) {
      var z = e.unstable_now();
      switch (
        (typeof D == "object" && D !== null
          ? ((D = D.delay), (D = typeof D == "number" && 0 < D ? z + D : z))
          : (D = z),
        P)
      ) {
        case 1:
          var V = -1;
          break;
        case 2:
          V = 250;
          break;
        case 5:
          V = 1073741823;
          break;
        case 4:
          V = 1e4;
          break;
        default:
          V = 5e3;
      }
      return (
        (V = D + V),
        (P = {
          id: f++,
          callback: R,
          priorityLevel: P,
          startTime: D,
          expirationTime: V,
          sortIndex: -1,
        }),
        D > z
          ? ((P.sortIndex = D),
            t(a, P),
            n(s) === null &&
              P === n(a) &&
              (y ? (d(M), (M = -1)) : (y = !0), K(S, D - z)))
          : ((P.sortIndex = V), t(s, P), w || g || ((w = !0), F(E))),
        P
      );
    }),
    (e.unstable_shouldYield = L),
    (e.unstable_wrapCallback = function (P) {
      var R = m;
      return function () {
        var D = m;
        m = R;
        try {
          return P.apply(this, arguments);
        } finally {
          m = D;
        }
      };
    });
})(xc);
Sc.exports = xc;
var Jm = Sc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var qm = h,
  De = Jm;
function N(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var Ec = new Set(),
  _r = {};
function fn(e, t) {
  $n(e, t), $n(e + "Capture", t);
}
function $n(e, t) {
  for (_r[e] = t, e = 0; e < t.length; e++) Ec.add(t[e]);
}
var mt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  Pl = Object.prototype.hasOwnProperty,
  eh =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Ws = {},
  Vs = {};
function th(e) {
  return Pl.call(Vs, e)
    ? !0
    : Pl.call(Ws, e)
    ? !1
    : eh.test(e)
    ? (Vs[e] = !0)
    : ((Ws[e] = !0), !1);
}
function nh(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function rh(e, t, n, r) {
  if (t === null || typeof t > "u" || nh(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function we(e, t, n, r, o, i, l) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = o),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = i),
    (this.removeEmptyString = l);
}
var ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ce[e] = new we(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ce[t] = new we(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ce[e] = new we(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ce[e] = new we(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ce[e] = new we(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ce[e] = new we(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ce[e] = new we(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ce[e] = new we(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ce[e] = new we(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var ku = /[\-:]([a-z])/g;
function Ru(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ku, Ru);
    ce[t] = new we(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(ku, Ru);
    ce[t] = new we(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(ku, Ru);
  ce[t] = new we(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ce[e] = new we(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ce.xlinkHref = new we(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ce[e] = new we(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Mu(e, t, n, r) {
  var o = ce.hasOwnProperty(t) ? ce[t] : null;
  (o !== null
    ? o.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (rh(t, n, o, r) && (n = null),
    r || o === null
      ? th(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : o.mustUseProperty
      ? (e[o.propertyName] = n === null ? (o.type === 3 ? !1 : "") : n)
      : ((t = o.attributeName),
        (r = o.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((o = o.type),
            (n = o === 3 || (o === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var xt = qm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  qr = Symbol.for("react.element"),
  Sn = Symbol.for("react.portal"),
  xn = Symbol.for("react.fragment"),
  Nu = Symbol.for("react.strict_mode"),
  kl = Symbol.for("react.profiler"),
  Cc = Symbol.for("react.provider"),
  _c = Symbol.for("react.context"),
  Tu = Symbol.for("react.forward_ref"),
  Rl = Symbol.for("react.suspense"),
  Ml = Symbol.for("react.suspense_list"),
  Ou = Symbol.for("react.memo"),
  kt = Symbol.for("react.lazy"),
  Pc = Symbol.for("react.offscreen"),
  Hs = Symbol.iterator;
function nr(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Hs && e[Hs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var q = Object.assign,
  Hi;
function cr(e) {
  if (Hi === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Hi = (t && t[1]) || "";
    }
  return (
    `
` +
    Hi +
    e
  );
}
var Ki = !1;
function Gi(e, t) {
  if (!e || Ki) return "";
  Ki = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (a) {
          r = a;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var o = a.stack.split(`
`),
          i = r.stack.split(`
`),
          l = o.length - 1,
          u = i.length - 1;
        1 <= l && 0 <= u && o[l] !== i[u];

      )
        u--;
      for (; 1 <= l && 0 <= u; l--, u--)
        if (o[l] !== i[u]) {
          if (l !== 1 || u !== 1)
            do
              if ((l--, u--, 0 > u || o[l] !== i[u])) {
                var s =
                  `
` + o[l].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= l && 0 <= u);
          break;
        }
    }
  } finally {
    (Ki = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? cr(e) : "";
}
function oh(e) {
  switch (e.tag) {
    case 5:
      return cr(e.type);
    case 16:
      return cr("Lazy");
    case 13:
      return cr("Suspense");
    case 19:
      return cr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Gi(e.type, !1)), e;
    case 11:
      return (e = Gi(e.type.render, !1)), e;
    case 1:
      return (e = Gi(e.type, !0)), e;
    default:
      return "";
  }
}
function Nl(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case xn:
      return "Fragment";
    case Sn:
      return "Portal";
    case kl:
      return "Profiler";
    case Nu:
      return "StrictMode";
    case Rl:
      return "Suspense";
    case Ml:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case _c:
        return (e.displayName || "Context") + ".Consumer";
      case Cc:
        return (e._context.displayName || "Context") + ".Provider";
      case Tu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Ou:
        return (
          (t = e.displayName || null), t !== null ? t : Nl(e.type) || "Memo"
        );
      case kt:
        (t = e._payload), (e = e._init);
        try {
          return Nl(e(t));
        } catch {}
    }
  return null;
}
function ih(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Nl(t);
    case 8:
      return t === Nu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function $t(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function kc(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function lh(e) {
  var t = kc(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var o = n.get,
      i = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return o.call(this);
        },
        set: function (l) {
          (r = "" + l), i.call(this, l);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (l) {
          r = "" + l;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function eo(e) {
  e._valueTracker || (e._valueTracker = lh(e));
}
function Rc(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = kc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function Lo(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function Tl(e, t) {
  var n = t.checked;
  return q({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function Ks(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = $t(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Mc(e, t) {
  (t = t.checked), t != null && Mu(e, "checked", t, !1);
}
function Ol(e, t) {
  Mc(e, t);
  var n = $t(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? Dl(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && Dl(e, t.type, $t(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function Gs(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function Dl(e, t, n) {
  (t !== "number" || Lo(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var fr = Array.isArray;
function Dn(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var o = 0; o < n.length; o++) t["$" + n[o]] = !0;
    for (n = 0; n < e.length; n++)
      (o = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== o && (e[n].selected = o),
        o && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + $t(n), t = null, o = 0; o < e.length; o++) {
      if (e[o].value === n) {
        (e[o].selected = !0), r && (e[o].defaultSelected = !0);
        return;
      }
      t !== null || e[o].disabled || (t = e[o]);
    }
    t !== null && (t.selected = !0);
  }
}
function Al(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(N(91));
  return q({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function Qs(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(N(92));
      if (fr(n)) {
        if (1 < n.length) throw Error(N(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: $t(n) };
}
function Nc(e, t) {
  var n = $t(t.value),
    r = $t(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function Ys(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Tc(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Il(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? Tc(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var to,
  Oc = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, o) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, o);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        to = to || document.createElement("div"),
          to.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = to.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Pr(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var hr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  uh = ["Webkit", "ms", "Moz", "O"];
Object.keys(hr).forEach(function (e) {
  uh.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (hr[t] = hr[e]);
  });
});
function Dc(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (hr.hasOwnProperty(e) && hr[e])
    ? ("" + t).trim()
    : t + "px";
}
function Ac(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        o = Dc(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, o) : (e[n] = o);
    }
}
var sh = q(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Ll(e, t) {
  if (t) {
    if (sh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(N(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(N(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(N(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(N(62));
  }
}
function Fl(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var jl = null;
function Du(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var zl = null,
  An = null,
  In = null;
function Xs(e) {
  if ((e = Gr(e))) {
    if (typeof zl != "function") throw Error(N(280));
    var t = e.stateNode;
    t && ((t = gi(t)), zl(e.stateNode, e.type, t));
  }
}
function Ic(e) {
  An ? (In ? In.push(e) : (In = [e])) : (An = e);
}
function Lc() {
  if (An) {
    var e = An,
      t = In;
    if (((In = An = null), Xs(e), t)) for (e = 0; e < t.length; e++) Xs(t[e]);
  }
}
function Fc(e, t) {
  return e(t);
}
function jc() {}
var Qi = !1;
function zc(e, t, n) {
  if (Qi) return e(t, n);
  Qi = !0;
  try {
    return Fc(e, t, n);
  } finally {
    (Qi = !1), (An !== null || In !== null) && (jc(), Lc());
  }
}
function kr(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = gi(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(N(231, t, typeof n));
  return n;
}
var Ul = !1;
if (mt)
  try {
    var rr = {};
    Object.defineProperty(rr, "passive", {
      get: function () {
        Ul = !0;
      },
    }),
      window.addEventListener("test", rr, rr),
      window.removeEventListener("test", rr, rr);
  } catch {
    Ul = !1;
  }
function ah(e, t, n, r, o, i, l, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, a);
  } catch (f) {
    this.onError(f);
  }
}
var vr = !1,
  Fo = null,
  jo = !1,
  $l = null,
  ch = {
    onError: function (e) {
      (vr = !0), (Fo = e);
    },
  };
function fh(e, t, n, r, o, i, l, u, s) {
  (vr = !1), (Fo = null), ah.apply(ch, arguments);
}
function dh(e, t, n, r, o, i, l, u, s) {
  if ((fh.apply(this, arguments), vr)) {
    if (vr) {
      var a = Fo;
      (vr = !1), (Fo = null);
    } else throw Error(N(198));
    jo || ((jo = !0), ($l = a));
  }
}
function dn(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Uc(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function bs(e) {
  if (dn(e) !== e) throw Error(N(188));
}
function ph(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = dn(e)), t === null)) throw Error(N(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var o = n.return;
    if (o === null) break;
    var i = o.alternate;
    if (i === null) {
      if (((r = o.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (o.child === i.child) {
      for (i = o.child; i; ) {
        if (i === n) return bs(o), e;
        if (i === r) return bs(o), t;
        i = i.sibling;
      }
      throw Error(N(188));
    }
    if (n.return !== r.return) (n = o), (r = i);
    else {
      for (var l = !1, u = o.child; u; ) {
        if (u === n) {
          (l = !0), (n = o), (r = i);
          break;
        }
        if (u === r) {
          (l = !0), (r = o), (n = i);
          break;
        }
        u = u.sibling;
      }
      if (!l) {
        for (u = i.child; u; ) {
          if (u === n) {
            (l = !0), (n = i), (r = o);
            break;
          }
          if (u === r) {
            (l = !0), (r = i), (n = o);
            break;
          }
          u = u.sibling;
        }
        if (!l) throw Error(N(189));
      }
    }
    if (n.alternate !== r) throw Error(N(190));
  }
  if (n.tag !== 3) throw Error(N(188));
  return n.stateNode.current === n ? e : t;
}
function $c(e) {
  return (e = ph(e)), e !== null ? Bc(e) : null;
}
function Bc(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Bc(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Wc = De.unstable_scheduleCallback,
  Zs = De.unstable_cancelCallback,
  mh = De.unstable_shouldYield,
  hh = De.unstable_requestPaint,
  te = De.unstable_now,
  vh = De.unstable_getCurrentPriorityLevel,
  Au = De.unstable_ImmediatePriority,
  Vc = De.unstable_UserBlockingPriority,
  zo = De.unstable_NormalPriority,
  gh = De.unstable_LowPriority,
  Hc = De.unstable_IdlePriority,
  pi = null,
  ot = null;
function yh(e) {
  if (ot && typeof ot.onCommitFiberRoot == "function")
    try {
      ot.onCommitFiberRoot(pi, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Qe = Math.clz32 ? Math.clz32 : xh,
  wh = Math.log,
  Sh = Math.LN2;
function xh(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((wh(e) / Sh) | 0)) | 0;
}
var no = 64,
  ro = 4194304;
function dr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Uo(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    o = e.suspendedLanes,
    i = e.pingedLanes,
    l = n & 268435455;
  if (l !== 0) {
    var u = l & ~o;
    u !== 0 ? (r = dr(u)) : ((i &= l), i !== 0 && (r = dr(i)));
  } else (l = n & ~o), l !== 0 ? (r = dr(l)) : i !== 0 && (r = dr(i));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & o) &&
    ((o = r & -r), (i = t & -t), o >= i || (o === 16 && (i & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Qe(t)), (o = 1 << n), (r |= e[n]), (t &= ~o);
  return r;
}
function Eh(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Ch(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      o = e.expirationTimes,
      i = e.pendingLanes;
    0 < i;

  ) {
    var l = 31 - Qe(i),
      u = 1 << l,
      s = o[l];
    s === -1
      ? (!(u & n) || u & r) && (o[l] = Eh(u, t))
      : s <= t && (e.expiredLanes |= u),
      (i &= ~u);
  }
}
function Bl(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function Kc() {
  var e = no;
  return (no <<= 1), !(no & 4194240) && (no = 64), e;
}
function Yi(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function Hr(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Qe(t)),
    (e[t] = n);
}
function _h(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var o = 31 - Qe(n),
      i = 1 << o;
    (t[o] = 0), (r[o] = -1), (e[o] = -1), (n &= ~i);
  }
}
function Iu(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Qe(n),
      o = 1 << r;
    (o & t) | (e[r] & t) && (e[r] |= t), (n &= ~o);
  }
}
var B = 0;
function Gc(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Qc,
  Lu,
  Yc,
  Xc,
  bc,
  Wl = !1,
  oo = [],
  Dt = null,
  At = null,
  It = null,
  Rr = new Map(),
  Mr = new Map(),
  Mt = [],
  Ph =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function Js(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      Dt = null;
      break;
    case "dragenter":
    case "dragleave":
      At = null;
      break;
    case "mouseover":
    case "mouseout":
      It = null;
      break;
    case "pointerover":
    case "pointerout":
      Rr.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Mr.delete(t.pointerId);
  }
}
function or(e, t, n, r, o, i) {
  return e === null || e.nativeEvent !== i
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: i,
        targetContainers: [o],
      }),
      t !== null && ((t = Gr(t)), t !== null && Lu(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      o !== null && t.indexOf(o) === -1 && t.push(o),
      e);
}
function kh(e, t, n, r, o) {
  switch (t) {
    case "focusin":
      return (Dt = or(Dt, e, t, n, r, o)), !0;
    case "dragenter":
      return (At = or(At, e, t, n, r, o)), !0;
    case "mouseover":
      return (It = or(It, e, t, n, r, o)), !0;
    case "pointerover":
      var i = o.pointerId;
      return Rr.set(i, or(Rr.get(i) || null, e, t, n, r, o)), !0;
    case "gotpointercapture":
      return (
        (i = o.pointerId), Mr.set(i, or(Mr.get(i) || null, e, t, n, r, o)), !0
      );
  }
  return !1;
}
function Zc(e) {
  var t = Zt(e.target);
  if (t !== null) {
    var n = dn(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Uc(n)), t !== null)) {
          (e.blockedOn = t),
            bc(e.priority, function () {
              Yc(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Eo(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Vl(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (jl = r), n.target.dispatchEvent(r), (jl = null);
    } else return (t = Gr(n)), t !== null && Lu(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function qs(e, t, n) {
  Eo(e) && n.delete(t);
}
function Rh() {
  (Wl = !1),
    Dt !== null && Eo(Dt) && (Dt = null),
    At !== null && Eo(At) && (At = null),
    It !== null && Eo(It) && (It = null),
    Rr.forEach(qs),
    Mr.forEach(qs);
}
function ir(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Wl ||
      ((Wl = !0),
      De.unstable_scheduleCallback(De.unstable_NormalPriority, Rh)));
}
function Nr(e) {
  function t(o) {
    return ir(o, e);
  }
  if (0 < oo.length) {
    ir(oo[0], e);
    for (var n = 1; n < oo.length; n++) {
      var r = oo[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Dt !== null && ir(Dt, e),
      At !== null && ir(At, e),
      It !== null && ir(It, e),
      Rr.forEach(t),
      Mr.forEach(t),
      n = 0;
    n < Mt.length;
    n++
  )
    (r = Mt[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Mt.length && ((n = Mt[0]), n.blockedOn === null); )
    Zc(n), n.blockedOn === null && Mt.shift();
}
var Ln = xt.ReactCurrentBatchConfig,
  $o = !0;
function Mh(e, t, n, r) {
  var o = B,
    i = Ln.transition;
  Ln.transition = null;
  try {
    (B = 1), Fu(e, t, n, r);
  } finally {
    (B = o), (Ln.transition = i);
  }
}
function Nh(e, t, n, r) {
  var o = B,
    i = Ln.transition;
  Ln.transition = null;
  try {
    (B = 4), Fu(e, t, n, r);
  } finally {
    (B = o), (Ln.transition = i);
  }
}
function Fu(e, t, n, r) {
  if ($o) {
    var o = Vl(e, t, n, r);
    if (o === null) ol(e, t, r, Bo, n), Js(e, r);
    else if (kh(o, e, t, n, r)) r.stopPropagation();
    else if ((Js(e, r), t & 4 && -1 < Ph.indexOf(e))) {
      for (; o !== null; ) {
        var i = Gr(o);
        if (
          (i !== null && Qc(i),
          (i = Vl(e, t, n, r)),
          i === null && ol(e, t, r, Bo, n),
          i === o)
        )
          break;
        o = i;
      }
      o !== null && r.stopPropagation();
    } else ol(e, t, r, null, n);
  }
}
var Bo = null;
function Vl(e, t, n, r) {
  if (((Bo = null), (e = Du(r)), (e = Zt(e)), e !== null))
    if (((t = dn(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Uc(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (Bo = e), null;
}
function Jc(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (vh()) {
        case Au:
          return 1;
        case Vc:
          return 4;
        case zo:
        case gh:
          return 16;
        case Hc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Tt = null,
  ju = null,
  Co = null;
function qc() {
  if (Co) return Co;
  var e,
    t = ju,
    n = t.length,
    r,
    o = "value" in Tt ? Tt.value : Tt.textContent,
    i = o.length;
  for (e = 0; e < n && t[e] === o[e]; e++);
  var l = n - e;
  for (r = 1; r <= l && t[n - r] === o[i - r]; r++);
  return (Co = o.slice(e, 1 < r ? 1 - r : void 0));
}
function _o(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function io() {
  return !0;
}
function ea() {
  return !1;
}
function Ie(e) {
  function t(n, r, o, i, l) {
    (this._reactName = n),
      (this._targetInst = o),
      (this.type = r),
      (this.nativeEvent = i),
      (this.target = l),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((n = e[u]), (this[u] = n ? n(i) : i[u]));
    return (
      (this.isDefaultPrevented = (
        i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1
      )
        ? io
        : ea),
      (this.isPropagationStopped = ea),
      this
    );
  }
  return (
    q(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = io));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = io));
      },
      persist: function () {},
      isPersistent: io,
    }),
    t
  );
}
var Zn = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  zu = Ie(Zn),
  Kr = q({}, Zn, { view: 0, detail: 0 }),
  Th = Ie(Kr),
  Xi,
  bi,
  lr,
  mi = q({}, Kr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Uu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== lr &&
            (lr && e.type === "mousemove"
              ? ((Xi = e.screenX - lr.screenX), (bi = e.screenY - lr.screenY))
              : (bi = Xi = 0),
            (lr = e)),
          Xi);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : bi;
    },
  }),
  ta = Ie(mi),
  Oh = q({}, mi, { dataTransfer: 0 }),
  Dh = Ie(Oh),
  Ah = q({}, Kr, { relatedTarget: 0 }),
  Zi = Ie(Ah),
  Ih = q({}, Zn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Lh = Ie(Ih),
  Fh = q({}, Zn, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  jh = Ie(Fh),
  zh = q({}, Zn, { data: 0 }),
  na = Ie(zh),
  Uh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  $h = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Bh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function Wh(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = Bh[e]) ? !!t[e] : !1;
}
function Uu() {
  return Wh;
}
var Vh = q({}, Kr, {
    key: function (e) {
      if (e.key) {
        var t = Uh[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = _o(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? $h[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Uu,
    charCode: function (e) {
      return e.type === "keypress" ? _o(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? _o(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Hh = Ie(Vh),
  Kh = q({}, mi, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  ra = Ie(Kh),
  Gh = q({}, Kr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Uu,
  }),
  Qh = Ie(Gh),
  Yh = q({}, Zn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  Xh = Ie(Yh),
  bh = q({}, mi, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  Zh = Ie(bh),
  Jh = [9, 13, 27, 32],
  $u = mt && "CompositionEvent" in window,
  gr = null;
mt && "documentMode" in document && (gr = document.documentMode);
var qh = mt && "TextEvent" in window && !gr,
  ef = mt && (!$u || (gr && 8 < gr && 11 >= gr)),
  oa = " ",
  ia = !1;
function tf(e, t) {
  switch (e) {
    case "keyup":
      return Jh.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function nf(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var En = !1;
function ev(e, t) {
  switch (e) {
    case "compositionend":
      return nf(t);
    case "keypress":
      return t.which !== 32 ? null : ((ia = !0), oa);
    case "textInput":
      return (e = t.data), e === oa && ia ? null : e;
    default:
      return null;
  }
}
function tv(e, t) {
  if (En)
    return e === "compositionend" || (!$u && tf(e, t))
      ? ((e = qc()), (Co = ju = Tt = null), (En = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return ef && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var nv = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function la(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!nv[e.type] : t === "textarea";
}
function rf(e, t, n, r) {
  Ic(r),
    (t = Wo(t, "onChange")),
    0 < t.length &&
      ((n = new zu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var yr = null,
  Tr = null;
function rv(e) {
  hf(e, 0);
}
function hi(e) {
  var t = Pn(e);
  if (Rc(t)) return e;
}
function ov(e, t) {
  if (e === "change") return t;
}
var of = !1;
if (mt) {
  var Ji;
  if (mt) {
    var qi = "oninput" in document;
    if (!qi) {
      var ua = document.createElement("div");
      ua.setAttribute("oninput", "return;"),
        (qi = typeof ua.oninput == "function");
    }
    Ji = qi;
  } else Ji = !1;
  of = Ji && (!document.documentMode || 9 < document.documentMode);
}
function sa() {
  yr && (yr.detachEvent("onpropertychange", lf), (Tr = yr = null));
}
function lf(e) {
  if (e.propertyName === "value" && hi(Tr)) {
    var t = [];
    rf(t, Tr, e, Du(e)), zc(rv, t);
  }
}
function iv(e, t, n) {
  e === "focusin"
    ? (sa(), (yr = t), (Tr = n), yr.attachEvent("onpropertychange", lf))
    : e === "focusout" && sa();
}
function lv(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return hi(Tr);
}
function uv(e, t) {
  if (e === "click") return hi(t);
}
function sv(e, t) {
  if (e === "input" || e === "change") return hi(t);
}
function av(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Xe = typeof Object.is == "function" ? Object.is : av;
function Or(e, t) {
  if (Xe(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var o = n[r];
    if (!Pl.call(t, o) || !Xe(e[o], t[o])) return !1;
  }
  return !0;
}
function aa(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function ca(e, t) {
  var n = aa(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = aa(n);
  }
}
function uf(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? uf(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function sf() {
  for (var e = window, t = Lo(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Lo(e.document);
  }
  return t;
}
function Bu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function cv(e) {
  var t = sf(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    uf(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Bu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var o = n.textContent.length,
          i = Math.min(r.start, o);
        (r = r.end === void 0 ? i : Math.min(r.end, o)),
          !e.extend && i > r && ((o = r), (r = i), (i = o)),
          (o = ca(n, i));
        var l = ca(n, r);
        o &&
          l &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== o.node ||
            e.anchorOffset !== o.offset ||
            e.focusNode !== l.node ||
            e.focusOffset !== l.offset) &&
          ((t = t.createRange()),
          t.setStart(o.node, o.offset),
          e.removeAllRanges(),
          i > r
            ? (e.addRange(t), e.extend(l.node, l.offset))
            : (t.setEnd(l.node, l.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var fv = mt && "documentMode" in document && 11 >= document.documentMode,
  Cn = null,
  Hl = null,
  wr = null,
  Kl = !1;
function fa(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Kl ||
    Cn == null ||
    Cn !== Lo(r) ||
    ((r = Cn),
    "selectionStart" in r && Bu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (wr && Or(wr, r)) ||
      ((wr = r),
      (r = Wo(Hl, "onSelect")),
      0 < r.length &&
        ((t = new zu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = Cn))));
}
function lo(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var _n = {
    animationend: lo("Animation", "AnimationEnd"),
    animationiteration: lo("Animation", "AnimationIteration"),
    animationstart: lo("Animation", "AnimationStart"),
    transitionend: lo("Transition", "TransitionEnd"),
  },
  el = {},
  af = {};
mt &&
  ((af = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete _n.animationend.animation,
    delete _n.animationiteration.animation,
    delete _n.animationstart.animation),
  "TransitionEvent" in window || delete _n.transitionend.transition);
function vi(e) {
  if (el[e]) return el[e];
  if (!_n[e]) return e;
  var t = _n[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in af) return (el[e] = t[n]);
  return e;
}
var cf = vi("animationend"),
  ff = vi("animationiteration"),
  df = vi("animationstart"),
  pf = vi("transitionend"),
  mf = new Map(),
  da =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function Kt(e, t) {
  mf.set(e, t), fn(t, [e]);
}
for (var tl = 0; tl < da.length; tl++) {
  var nl = da[tl],
    dv = nl.toLowerCase(),
    pv = nl[0].toUpperCase() + nl.slice(1);
  Kt(dv, "on" + pv);
}
Kt(cf, "onAnimationEnd");
Kt(ff, "onAnimationIteration");
Kt(df, "onAnimationStart");
Kt("dblclick", "onDoubleClick");
Kt("focusin", "onFocus");
Kt("focusout", "onBlur");
Kt(pf, "onTransitionEnd");
$n("onMouseEnter", ["mouseout", "mouseover"]);
$n("onMouseLeave", ["mouseout", "mouseover"]);
$n("onPointerEnter", ["pointerout", "pointerover"]);
$n("onPointerLeave", ["pointerout", "pointerover"]);
fn(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
fn(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
fn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fn(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
fn(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
fn(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var pr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  mv = new Set("cancel close invalid load scroll toggle".split(" ").concat(pr));
function pa(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), dh(r, t, void 0, e), (e.currentTarget = null);
}
function hf(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      o = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t)
        for (var l = r.length - 1; 0 <= l; l--) {
          var u = r[l],
            s = u.instance,
            a = u.currentTarget;
          if (((u = u.listener), s !== i && o.isPropagationStopped())) break e;
          pa(o, u, a), (i = s);
        }
      else
        for (l = 0; l < r.length; l++) {
          if (
            ((u = r[l]),
            (s = u.instance),
            (a = u.currentTarget),
            (u = u.listener),
            s !== i && o.isPropagationStopped())
          )
            break e;
          pa(o, u, a), (i = s);
        }
    }
  }
  if (jo) throw ((e = $l), (jo = !1), ($l = null), e);
}
function G(e, t) {
  var n = t[bl];
  n === void 0 && (n = t[bl] = new Set());
  var r = e + "__bubble";
  n.has(r) || (vf(t, e, 2, !1), n.add(r));
}
function rl(e, t, n) {
  var r = 0;
  t && (r |= 4), vf(n, e, r, t);
}
var uo = "_reactListening" + Math.random().toString(36).slice(2);
function Dr(e) {
  if (!e[uo]) {
    (e[uo] = !0),
      Ec.forEach(function (n) {
        n !== "selectionchange" && (mv.has(n) || rl(n, !1, e), rl(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[uo] || ((t[uo] = !0), rl("selectionchange", !1, t));
  }
}
function vf(e, t, n, r) {
  switch (Jc(t)) {
    case 1:
      var o = Mh;
      break;
    case 4:
      o = Nh;
      break;
    default:
      o = Fu;
  }
  (n = o.bind(null, t, n, e)),
    (o = void 0),
    !Ul ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (o = !0),
    r
      ? o !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: o })
        : e.addEventListener(t, n, !0)
      : o !== void 0
      ? e.addEventListener(t, n, { passive: o })
      : e.addEventListener(t, n, !1);
}
function ol(e, t, n, r, o) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var l = r.tag;
      if (l === 3 || l === 4) {
        var u = r.stateNode.containerInfo;
        if (u === o || (u.nodeType === 8 && u.parentNode === o)) break;
        if (l === 4)
          for (l = r.return; l !== null; ) {
            var s = l.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = l.stateNode.containerInfo),
              s === o || (s.nodeType === 8 && s.parentNode === o))
            )
              return;
            l = l.return;
          }
        for (; u !== null; ) {
          if (((l = Zt(u)), l === null)) return;
          if (((s = l.tag), s === 5 || s === 6)) {
            r = i = l;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  zc(function () {
    var a = i,
      f = Du(n),
      c = [];
    e: {
      var m = mf.get(e);
      if (m !== void 0) {
        var g = zu,
          w = e;
        switch (e) {
          case "keypress":
            if (_o(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = Hh;
            break;
          case "focusin":
            (w = "focus"), (g = Zi);
            break;
          case "focusout":
            (w = "blur"), (g = Zi);
            break;
          case "beforeblur":
          case "afterblur":
            g = Zi;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = ta;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Dh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = Qh;
            break;
          case cf:
          case ff:
          case df:
            g = Lh;
            break;
          case pf:
            g = Xh;
            break;
          case "scroll":
            g = Th;
            break;
          case "wheel":
            g = Zh;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = jh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = ra;
        }
        var y = (t & 4) !== 0,
          x = !y && e === "scroll",
          d = y ? (m !== null ? m + "Capture" : null) : m;
        y = [];
        for (var p = a, v; p !== null; ) {
          v = p;
          var S = v.stateNode;
          if (
            (v.tag === 5 &&
              S !== null &&
              ((v = S),
              d !== null && ((S = kr(p, d)), S != null && y.push(Ar(p, S, v)))),
            x)
          )
            break;
          p = p.return;
        }
        0 < y.length &&
          ((m = new g(m, w, null, n, f)), c.push({ event: m, listeners: y }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((m = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          m &&
            n !== jl &&
            (w = n.relatedTarget || n.fromElement) &&
            (Zt(w) || w[ht]))
        )
          break e;
        if (
          (g || m) &&
          ((m =
            f.window === f
              ? f
              : (m = f.ownerDocument)
              ? m.defaultView || m.parentWindow
              : window),
          g
            ? ((w = n.relatedTarget || n.toElement),
              (g = a),
              (w = w ? Zt(w) : null),
              w !== null &&
                ((x = dn(w)), w !== x || (w.tag !== 5 && w.tag !== 6)) &&
                (w = null))
            : ((g = null), (w = a)),
          g !== w)
        ) {
          if (
            ((y = ta),
            (S = "onMouseLeave"),
            (d = "onMouseEnter"),
            (p = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((y = ra),
              (S = "onPointerLeave"),
              (d = "onPointerEnter"),
              (p = "pointer")),
            (x = g == null ? m : Pn(g)),
            (v = w == null ? m : Pn(w)),
            (m = new y(S, p + "leave", g, n, f)),
            (m.target = x),
            (m.relatedTarget = v),
            (S = null),
            Zt(f) === a &&
              ((y = new y(d, p + "enter", w, n, f)),
              (y.target = v),
              (y.relatedTarget = x),
              (S = y)),
            (x = S),
            g && w)
          )
            t: {
              for (y = g, d = w, p = 0, v = y; v; v = vn(v)) p++;
              for (v = 0, S = d; S; S = vn(S)) v++;
              for (; 0 < p - v; ) (y = vn(y)), p--;
              for (; 0 < v - p; ) (d = vn(d)), v--;
              for (; p--; ) {
                if (y === d || (d !== null && y === d.alternate)) break t;
                (y = vn(y)), (d = vn(d));
              }
              y = null;
            }
          else y = null;
          g !== null && ma(c, m, g, y, !1),
            w !== null && x !== null && ma(c, x, w, y, !0);
        }
      }
      e: {
        if (
          ((m = a ? Pn(a) : window),
          (g = m.nodeName && m.nodeName.toLowerCase()),
          g === "select" || (g === "input" && m.type === "file"))
        )
          var E = ov;
        else if (la(m))
          if (of) E = sv;
          else {
            E = lv;
            var k = iv;
          }
        else
          (g = m.nodeName) &&
            g.toLowerCase() === "input" &&
            (m.type === "checkbox" || m.type === "radio") &&
            (E = uv);
        if (E && (E = E(e, a))) {
          rf(c, E, n, f);
          break e;
        }
        k && k(e, m, a),
          e === "focusout" &&
            (k = m._wrapperState) &&
            k.controlled &&
            m.type === "number" &&
            Dl(m, "number", m.value);
      }
      switch (((k = a ? Pn(a) : window), e)) {
        case "focusin":
          (la(k) || k.contentEditable === "true") &&
            ((Cn = k), (Hl = a), (wr = null));
          break;
        case "focusout":
          wr = Hl = Cn = null;
          break;
        case "mousedown":
          Kl = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Kl = !1), fa(c, n, f);
          break;
        case "selectionchange":
          if (fv) break;
        case "keydown":
        case "keyup":
          fa(c, n, f);
      }
      var _;
      if ($u)
        e: {
          switch (e) {
            case "compositionstart":
              var M = "onCompositionStart";
              break e;
            case "compositionend":
              M = "onCompositionEnd";
              break e;
            case "compositionupdate":
              M = "onCompositionUpdate";
              break e;
          }
          M = void 0;
        }
      else
        En
          ? tf(e, n) && (M = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (M = "onCompositionStart");
      M &&
        (ef &&
          n.locale !== "ko" &&
          (En || M !== "onCompositionStart"
            ? M === "onCompositionEnd" && En && (_ = qc())
            : ((Tt = f),
              (ju = "value" in Tt ? Tt.value : Tt.textContent),
              (En = !0))),
        (k = Wo(a, M)),
        0 < k.length &&
          ((M = new na(M, e, null, n, f)),
          c.push({ event: M, listeners: k }),
          _ ? (M.data = _) : ((_ = nf(n)), _ !== null && (M.data = _)))),
        (_ = qh ? ev(e, n) : tv(e, n)) &&
          ((a = Wo(a, "onBeforeInput")),
          0 < a.length &&
            ((f = new na("onBeforeInput", "beforeinput", null, n, f)),
            c.push({ event: f, listeners: a }),
            (f.data = _)));
    }
    hf(c, t);
  });
}
function Ar(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Wo(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var o = e,
      i = o.stateNode;
    o.tag === 5 &&
      i !== null &&
      ((o = i),
      (i = kr(e, n)),
      i != null && r.unshift(Ar(e, i, o)),
      (i = kr(e, t)),
      i != null && r.push(Ar(e, i, o))),
      (e = e.return);
  }
  return r;
}
function vn(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function ma(e, t, n, r, o) {
  for (var i = t._reactName, l = []; n !== null && n !== r; ) {
    var u = n,
      s = u.alternate,
      a = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 &&
      a !== null &&
      ((u = a),
      o
        ? ((s = kr(n, i)), s != null && l.unshift(Ar(n, s, u)))
        : o || ((s = kr(n, i)), s != null && l.push(Ar(n, s, u)))),
      (n = n.return);
  }
  l.length !== 0 && e.push({ event: t, listeners: l });
}
var hv = /\r\n?/g,
  vv = /\u0000|\uFFFD/g;
function ha(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      hv,
      `
`
    )
    .replace(vv, "");
}
function so(e, t, n) {
  if (((t = ha(t)), ha(e) !== t && n)) throw Error(N(425));
}
function Vo() {}
var Gl = null,
  Ql = null;
function Yl(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Xl = typeof setTimeout == "function" ? setTimeout : void 0,
  gv = typeof clearTimeout == "function" ? clearTimeout : void 0,
  va = typeof Promise == "function" ? Promise : void 0,
  yv =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof va < "u"
      ? function (e) {
          return va.resolve(null).then(e).catch(wv);
        }
      : Xl;
function wv(e) {
  setTimeout(function () {
    throw e;
  });
}
function il(e, t) {
  var n = t,
    r = 0;
  do {
    var o = n.nextSibling;
    if ((e.removeChild(n), o && o.nodeType === 8))
      if (((n = o.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(o), Nr(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = o;
  } while (n);
  Nr(t);
}
function Lt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function ga(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Jn = Math.random().toString(36).slice(2),
  nt = "__reactFiber$" + Jn,
  Ir = "__reactProps$" + Jn,
  ht = "__reactContainer$" + Jn,
  bl = "__reactEvents$" + Jn,
  Sv = "__reactListeners$" + Jn,
  xv = "__reactHandles$" + Jn;
function Zt(e) {
  var t = e[nt];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[ht] || n[nt])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = ga(e); e !== null; ) {
          if ((n = e[nt])) return n;
          e = ga(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function Gr(e) {
  return (
    (e = e[nt] || e[ht]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Pn(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(N(33));
}
function gi(e) {
  return e[Ir] || null;
}
var Zl = [],
  kn = -1;
function Gt(e) {
  return { current: e };
}
function Q(e) {
  0 > kn || ((e.current = Zl[kn]), (Zl[kn] = null), kn--);
}
function H(e, t) {
  kn++, (Zl[kn] = e.current), (e.current = t);
}
var Bt = {},
  he = Gt(Bt),
  Ce = Gt(!1),
  rn = Bt;
function Bn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return Bt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var o = {},
    i;
  for (i in n) o[i] = t[i];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    o
  );
}
function _e(e) {
  return (e = e.childContextTypes), e != null;
}
function Ho() {
  Q(Ce), Q(he);
}
function ya(e, t, n) {
  if (he.current !== Bt) throw Error(N(168));
  H(he, t), H(Ce, n);
}
function gf(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var o in r) if (!(o in t)) throw Error(N(108, ih(e) || "Unknown", o));
  return q({}, n, r);
}
function Ko(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Bt),
    (rn = he.current),
    H(he, e),
    H(Ce, Ce.current),
    !0
  );
}
function wa(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(N(169));
  n
    ? ((e = gf(e, t, rn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      Q(Ce),
      Q(he),
      H(he, e))
    : Q(Ce),
    H(Ce, n);
}
var ct = null,
  yi = !1,
  ll = !1;
function yf(e) {
  ct === null ? (ct = [e]) : ct.push(e);
}
function Ev(e) {
  (yi = !0), yf(e);
}
function Qt() {
  if (!ll && ct !== null) {
    ll = !0;
    var e = 0,
      t = B;
    try {
      var n = ct;
      for (B = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (ct = null), (yi = !1);
    } catch (o) {
      throw (ct !== null && (ct = ct.slice(e + 1)), Wc(Au, Qt), o);
    } finally {
      (B = t), (ll = !1);
    }
  }
  return null;
}
var Rn = [],
  Mn = 0,
  Go = null,
  Qo = 0,
  Le = [],
  Fe = 0,
  on = null,
  ft = 1,
  dt = "";
function Xt(e, t) {
  (Rn[Mn++] = Qo), (Rn[Mn++] = Go), (Go = e), (Qo = t);
}
function wf(e, t, n) {
  (Le[Fe++] = ft), (Le[Fe++] = dt), (Le[Fe++] = on), (on = e);
  var r = ft;
  e = dt;
  var o = 32 - Qe(r) - 1;
  (r &= ~(1 << o)), (n += 1);
  var i = 32 - Qe(t) + o;
  if (30 < i) {
    var l = o - (o % 5);
    (i = (r & ((1 << l) - 1)).toString(32)),
      (r >>= l),
      (o -= l),
      (ft = (1 << (32 - Qe(t) + o)) | (n << o) | r),
      (dt = i + e);
  } else (ft = (1 << i) | (n << o) | r), (dt = e);
}
function Wu(e) {
  e.return !== null && (Xt(e, 1), wf(e, 1, 0));
}
function Vu(e) {
  for (; e === Go; )
    (Go = Rn[--Mn]), (Rn[Mn] = null), (Qo = Rn[--Mn]), (Rn[Mn] = null);
  for (; e === on; )
    (on = Le[--Fe]),
      (Le[Fe] = null),
      (dt = Le[--Fe]),
      (Le[Fe] = null),
      (ft = Le[--Fe]),
      (Le[Fe] = null);
}
var Te = null,
  Ne = null,
  X = !1,
  Ge = null;
function Sf(e, t) {
  var n = ze(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Sa(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (Te = e), (Ne = Lt(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (Te = e), (Ne = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = on !== null ? { id: ft, overflow: dt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ze(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (Te = e),
            (Ne = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Jl(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function ql(e) {
  if (X) {
    var t = Ne;
    if (t) {
      var n = t;
      if (!Sa(e, t)) {
        if (Jl(e)) throw Error(N(418));
        t = Lt(n.nextSibling);
        var r = Te;
        t && Sa(e, t)
          ? Sf(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (X = !1), (Te = e));
      }
    } else {
      if (Jl(e)) throw Error(N(418));
      (e.flags = (e.flags & -4097) | 2), (X = !1), (Te = e);
    }
  }
}
function xa(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  Te = e;
}
function ao(e) {
  if (e !== Te) return !1;
  if (!X) return xa(e), (X = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Yl(e.type, e.memoizedProps))),
    t && (t = Ne))
  ) {
    if (Jl(e)) throw (xf(), Error(N(418)));
    for (; t; ) Sf(e, t), (t = Lt(t.nextSibling));
  }
  if ((xa(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(N(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ne = Lt(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ne = null;
    }
  } else Ne = Te ? Lt(e.stateNode.nextSibling) : null;
  return !0;
}
function xf() {
  for (var e = Ne; e; ) e = Lt(e.nextSibling);
}
function Wn() {
  (Ne = Te = null), (X = !1);
}
function Hu(e) {
  Ge === null ? (Ge = [e]) : Ge.push(e);
}
var Cv = xt.ReactCurrentBatchConfig;
function ur(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(N(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(N(147, e));
      var o = r,
        i = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === i
        ? t.ref
        : ((t = function (l) {
            var u = o.refs;
            l === null ? delete u[i] : (u[i] = l);
          }),
          (t._stringRef = i),
          t);
    }
    if (typeof e != "string") throw Error(N(284));
    if (!n._owner) throw Error(N(290, e));
  }
  return e;
}
function co(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      N(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Ea(e) {
  var t = e._init;
  return t(e._payload);
}
function Ef(e) {
  function t(d, p) {
    if (e) {
      var v = d.deletions;
      v === null ? ((d.deletions = [p]), (d.flags |= 16)) : v.push(p);
    }
  }
  function n(d, p) {
    if (!e) return null;
    for (; p !== null; ) t(d, p), (p = p.sibling);
    return null;
  }
  function r(d, p) {
    for (d = new Map(); p !== null; )
      p.key !== null ? d.set(p.key, p) : d.set(p.index, p), (p = p.sibling);
    return d;
  }
  function o(d, p) {
    return (d = Ut(d, p)), (d.index = 0), (d.sibling = null), d;
  }
  function i(d, p, v) {
    return (
      (d.index = v),
      e
        ? ((v = d.alternate),
          v !== null
            ? ((v = v.index), v < p ? ((d.flags |= 2), p) : v)
            : ((d.flags |= 2), p))
        : ((d.flags |= 1048576), p)
    );
  }
  function l(d) {
    return e && d.alternate === null && (d.flags |= 2), d;
  }
  function u(d, p, v, S) {
    return p === null || p.tag !== 6
      ? ((p = pl(v, d.mode, S)), (p.return = d), p)
      : ((p = o(p, v)), (p.return = d), p);
  }
  function s(d, p, v, S) {
    var E = v.type;
    return E === xn
      ? f(d, p, v.props.children, S, v.key)
      : p !== null &&
        (p.elementType === E ||
          (typeof E == "object" &&
            E !== null &&
            E.$$typeof === kt &&
            Ea(E) === p.type))
      ? ((S = o(p, v.props)), (S.ref = ur(d, p, v)), (S.return = d), S)
      : ((S = Oo(v.type, v.key, v.props, null, d.mode, S)),
        (S.ref = ur(d, p, v)),
        (S.return = d),
        S);
  }
  function a(d, p, v, S) {
    return p === null ||
      p.tag !== 4 ||
      p.stateNode.containerInfo !== v.containerInfo ||
      p.stateNode.implementation !== v.implementation
      ? ((p = ml(v, d.mode, S)), (p.return = d), p)
      : ((p = o(p, v.children || [])), (p.return = d), p);
  }
  function f(d, p, v, S, E) {
    return p === null || p.tag !== 7
      ? ((p = tn(v, d.mode, S, E)), (p.return = d), p)
      : ((p = o(p, v)), (p.return = d), p);
  }
  function c(d, p, v) {
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return (p = pl("" + p, d.mode, v)), (p.return = d), p;
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case qr:
          return (
            (v = Oo(p.type, p.key, p.props, null, d.mode, v)),
            (v.ref = ur(d, null, p)),
            (v.return = d),
            v
          );
        case Sn:
          return (p = ml(p, d.mode, v)), (p.return = d), p;
        case kt:
          var S = p._init;
          return c(d, S(p._payload), v);
      }
      if (fr(p) || nr(p))
        return (p = tn(p, d.mode, v, null)), (p.return = d), p;
      co(d, p);
    }
    return null;
  }
  function m(d, p, v, S) {
    var E = p !== null ? p.key : null;
    if ((typeof v == "string" && v !== "") || typeof v == "number")
      return E !== null ? null : u(d, p, "" + v, S);
    if (typeof v == "object" && v !== null) {
      switch (v.$$typeof) {
        case qr:
          return v.key === E ? s(d, p, v, S) : null;
        case Sn:
          return v.key === E ? a(d, p, v, S) : null;
        case kt:
          return (E = v._init), m(d, p, E(v._payload), S);
      }
      if (fr(v) || nr(v)) return E !== null ? null : f(d, p, v, S, null);
      co(d, v);
    }
    return null;
  }
  function g(d, p, v, S, E) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return (d = d.get(v) || null), u(p, d, "" + S, E);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case qr:
          return (d = d.get(S.key === null ? v : S.key) || null), s(p, d, S, E);
        case Sn:
          return (d = d.get(S.key === null ? v : S.key) || null), a(p, d, S, E);
        case kt:
          var k = S._init;
          return g(d, p, v, k(S._payload), E);
      }
      if (fr(S) || nr(S)) return (d = d.get(v) || null), f(p, d, S, E, null);
      co(p, S);
    }
    return null;
  }
  function w(d, p, v, S) {
    for (
      var E = null, k = null, _ = p, M = (p = 0), A = null;
      _ !== null && M < v.length;
      M++
    ) {
      _.index > M ? ((A = _), (_ = null)) : (A = _.sibling);
      var T = m(d, _, v[M], S);
      if (T === null) {
        _ === null && (_ = A);
        break;
      }
      e && _ && T.alternate === null && t(d, _),
        (p = i(T, p, M)),
        k === null ? (E = T) : (k.sibling = T),
        (k = T),
        (_ = A);
    }
    if (M === v.length) return n(d, _), X && Xt(d, M), E;
    if (_ === null) {
      for (; M < v.length; M++)
        (_ = c(d, v[M], S)),
          _ !== null &&
            ((p = i(_, p, M)), k === null ? (E = _) : (k.sibling = _), (k = _));
      return X && Xt(d, M), E;
    }
    for (_ = r(d, _); M < v.length; M++)
      (A = g(_, d, M, v[M], S)),
        A !== null &&
          (e && A.alternate !== null && _.delete(A.key === null ? M : A.key),
          (p = i(A, p, M)),
          k === null ? (E = A) : (k.sibling = A),
          (k = A));
    return (
      e &&
        _.forEach(function (L) {
          return t(d, L);
        }),
      X && Xt(d, M),
      E
    );
  }
  function y(d, p, v, S) {
    var E = nr(v);
    if (typeof E != "function") throw Error(N(150));
    if (((v = E.call(v)), v == null)) throw Error(N(151));
    for (
      var k = (E = null), _ = p, M = (p = 0), A = null, T = v.next();
      _ !== null && !T.done;
      M++, T = v.next()
    ) {
      _.index > M ? ((A = _), (_ = null)) : (A = _.sibling);
      var L = m(d, _, T.value, S);
      if (L === null) {
        _ === null && (_ = A);
        break;
      }
      e && _ && L.alternate === null && t(d, _),
        (p = i(L, p, M)),
        k === null ? (E = L) : (k.sibling = L),
        (k = L),
        (_ = A);
    }
    if (T.done) return n(d, _), X && Xt(d, M), E;
    if (_ === null) {
      for (; !T.done; M++, T = v.next())
        (T = c(d, T.value, S)),
          T !== null &&
            ((p = i(T, p, M)), k === null ? (E = T) : (k.sibling = T), (k = T));
      return X && Xt(d, M), E;
    }
    for (_ = r(d, _); !T.done; M++, T = v.next())
      (T = g(_, d, M, T.value, S)),
        T !== null &&
          (e && T.alternate !== null && _.delete(T.key === null ? M : T.key),
          (p = i(T, p, M)),
          k === null ? (E = T) : (k.sibling = T),
          (k = T));
    return (
      e &&
        _.forEach(function (W) {
          return t(d, W);
        }),
      X && Xt(d, M),
      E
    );
  }
  function x(d, p, v, S) {
    if (
      (typeof v == "object" &&
        v !== null &&
        v.type === xn &&
        v.key === null &&
        (v = v.props.children),
      typeof v == "object" && v !== null)
    ) {
      switch (v.$$typeof) {
        case qr:
          e: {
            for (var E = v.key, k = p; k !== null; ) {
              if (k.key === E) {
                if (((E = v.type), E === xn)) {
                  if (k.tag === 7) {
                    n(d, k.sibling),
                      (p = o(k, v.props.children)),
                      (p.return = d),
                      (d = p);
                    break e;
                  }
                } else if (
                  k.elementType === E ||
                  (typeof E == "object" &&
                    E !== null &&
                    E.$$typeof === kt &&
                    Ea(E) === k.type)
                ) {
                  n(d, k.sibling),
                    (p = o(k, v.props)),
                    (p.ref = ur(d, k, v)),
                    (p.return = d),
                    (d = p);
                  break e;
                }
                n(d, k);
                break;
              } else t(d, k);
              k = k.sibling;
            }
            v.type === xn
              ? ((p = tn(v.props.children, d.mode, S, v.key)),
                (p.return = d),
                (d = p))
              : ((S = Oo(v.type, v.key, v.props, null, d.mode, S)),
                (S.ref = ur(d, p, v)),
                (S.return = d),
                (d = S));
          }
          return l(d);
        case Sn:
          e: {
            for (k = v.key; p !== null; ) {
              if (p.key === k)
                if (
                  p.tag === 4 &&
                  p.stateNode.containerInfo === v.containerInfo &&
                  p.stateNode.implementation === v.implementation
                ) {
                  n(d, p.sibling),
                    (p = o(p, v.children || [])),
                    (p.return = d),
                    (d = p);
                  break e;
                } else {
                  n(d, p);
                  break;
                }
              else t(d, p);
              p = p.sibling;
            }
            (p = ml(v, d.mode, S)), (p.return = d), (d = p);
          }
          return l(d);
        case kt:
          return (k = v._init), x(d, p, k(v._payload), S);
      }
      if (fr(v)) return w(d, p, v, S);
      if (nr(v)) return y(d, p, v, S);
      co(d, v);
    }
    return (typeof v == "string" && v !== "") || typeof v == "number"
      ? ((v = "" + v),
        p !== null && p.tag === 6
          ? (n(d, p.sibling), (p = o(p, v)), (p.return = d), (d = p))
          : (n(d, p), (p = pl(v, d.mode, S)), (p.return = d), (d = p)),
        l(d))
      : n(d, p);
  }
  return x;
}
var Vn = Ef(!0),
  Cf = Ef(!1),
  Yo = Gt(null),
  Xo = null,
  Nn = null,
  Ku = null;
function Gu() {
  Ku = Nn = Xo = null;
}
function Qu(e) {
  var t = Yo.current;
  Q(Yo), (e._currentValue = t);
}
function eu(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Fn(e, t) {
  (Xo = e),
    (Ku = Nn = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Ee = !0), (e.firstContext = null));
}
function Be(e) {
  var t = e._currentValue;
  if (Ku !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), Nn === null)) {
      if (Xo === null) throw Error(N(308));
      (Nn = e), (Xo.dependencies = { lanes: 0, firstContext: e });
    } else Nn = Nn.next = e;
  return t;
}
var Jt = null;
function Yu(e) {
  Jt === null ? (Jt = [e]) : Jt.push(e);
}
function _f(e, t, n, r) {
  var o = t.interleaved;
  return (
    o === null ? ((n.next = n), Yu(t)) : ((n.next = o.next), (o.next = n)),
    (t.interleaved = n),
    vt(e, r)
  );
}
function vt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var Rt = !1;
function Xu(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Pf(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function pt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Ft(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), j & 2)) {
    var o = r.pending;
    return (
      o === null ? (t.next = t) : ((t.next = o.next), (o.next = t)),
      (r.pending = t),
      vt(e, n)
    );
  }
  return (
    (o = r.interleaved),
    o === null ? ((t.next = t), Yu(r)) : ((t.next = o.next), (o.next = t)),
    (r.interleaved = t),
    vt(e, n)
  );
}
function Po(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Iu(e, n);
  }
}
function Ca(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var o = null,
      i = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var l = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        i === null ? (o = i = l) : (i = i.next = l), (n = n.next);
      } while (n !== null);
      i === null ? (o = i = t) : (i = i.next = t);
    } else o = i = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: o,
      lastBaseUpdate: i,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function bo(e, t, n, r) {
  var o = e.updateQueue;
  Rt = !1;
  var i = o.firstBaseUpdate,
    l = o.lastBaseUpdate,
    u = o.shared.pending;
  if (u !== null) {
    o.shared.pending = null;
    var s = u,
      a = s.next;
    (s.next = null), l === null ? (i = a) : (l.next = a), (l = s);
    var f = e.alternate;
    f !== null &&
      ((f = f.updateQueue),
      (u = f.lastBaseUpdate),
      u !== l &&
        (u === null ? (f.firstBaseUpdate = a) : (u.next = a),
        (f.lastBaseUpdate = s)));
  }
  if (i !== null) {
    var c = o.baseState;
    (l = 0), (f = a = s = null), (u = i);
    do {
      var m = u.lane,
        g = u.eventTime;
      if ((r & m) === m) {
        f !== null &&
          (f = f.next =
            {
              eventTime: g,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var w = e,
            y = u;
          switch (((m = t), (g = n), y.tag)) {
            case 1:
              if (((w = y.payload), typeof w == "function")) {
                c = w.call(g, c, m);
                break e;
              }
              c = w;
              break e;
            case 3:
              w.flags = (w.flags & -65537) | 128;
            case 0:
              if (
                ((w = y.payload),
                (m = typeof w == "function" ? w.call(g, c, m) : w),
                m == null)
              )
                break e;
              c = q({}, c, m);
              break e;
            case 2:
              Rt = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (m = o.effects),
          m === null ? (o.effects = [u]) : m.push(u));
      } else
        (g = {
          eventTime: g,
          lane: m,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          f === null ? ((a = f = g), (s = c)) : (f = f.next = g),
          (l |= m);
      if (((u = u.next), u === null)) {
        if (((u = o.shared.pending), u === null)) break;
        (m = u),
          (u = m.next),
          (m.next = null),
          (o.lastBaseUpdate = m),
          (o.shared.pending = null);
      }
    } while (!0);
    if (
      (f === null && (s = c),
      (o.baseState = s),
      (o.firstBaseUpdate = a),
      (o.lastBaseUpdate = f),
      (t = o.shared.interleaved),
      t !== null)
    ) {
      o = t;
      do (l |= o.lane), (o = o.next);
      while (o !== t);
    } else i === null && (o.shared.lanes = 0);
    (un |= l), (e.lanes = l), (e.memoizedState = c);
  }
}
function _a(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        o = r.callback;
      if (o !== null) {
        if (((r.callback = null), (r = n), typeof o != "function"))
          throw Error(N(191, o));
        o.call(r);
      }
    }
}
var Qr = {},
  it = Gt(Qr),
  Lr = Gt(Qr),
  Fr = Gt(Qr);
function qt(e) {
  if (e === Qr) throw Error(N(174));
  return e;
}
function bu(e, t) {
  switch ((H(Fr, t), H(Lr, e), H(it, Qr), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Il(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Il(t, e));
  }
  Q(it), H(it, t);
}
function Hn() {
  Q(it), Q(Lr), Q(Fr);
}
function kf(e) {
  qt(Fr.current);
  var t = qt(it.current),
    n = Il(t, e.type);
  t !== n && (H(Lr, e), H(it, n));
}
function Zu(e) {
  Lr.current === e && (Q(it), Q(Lr));
}
var Z = Gt(0);
function Zo(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var ul = [];
function Ju() {
  for (var e = 0; e < ul.length; e++)
    ul[e]._workInProgressVersionPrimary = null;
  ul.length = 0;
}
var ko = xt.ReactCurrentDispatcher,
  sl = xt.ReactCurrentBatchConfig,
  ln = 0,
  J = null,
  oe = null,
  le = null,
  Jo = !1,
  Sr = !1,
  jr = 0,
  _v = 0;
function de() {
  throw Error(N(321));
}
function qu(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Xe(e[n], t[n])) return !1;
  return !0;
}
function es(e, t, n, r, o, i) {
  if (
    ((ln = i),
    (J = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (ko.current = e === null || e.memoizedState === null ? Mv : Nv),
    (e = n(r, o)),
    Sr)
  ) {
    i = 0;
    do {
      if (((Sr = !1), (jr = 0), 25 <= i)) throw Error(N(301));
      (i += 1),
        (le = oe = null),
        (t.updateQueue = null),
        (ko.current = Tv),
        (e = n(r, o));
    } while (Sr);
  }
  if (
    ((ko.current = qo),
    (t = oe !== null && oe.next !== null),
    (ln = 0),
    (le = oe = J = null),
    (Jo = !1),
    t)
  )
    throw Error(N(300));
  return e;
}
function ts() {
  var e = jr !== 0;
  return (jr = 0), e;
}
function tt() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return le === null ? (J.memoizedState = le = e) : (le = le.next = e), le;
}
function We() {
  if (oe === null) {
    var e = J.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = oe.next;
  var t = le === null ? J.memoizedState : le.next;
  if (t !== null) (le = t), (oe = e);
  else {
    if (e === null) throw Error(N(310));
    (oe = e),
      (e = {
        memoizedState: oe.memoizedState,
        baseState: oe.baseState,
        baseQueue: oe.baseQueue,
        queue: oe.queue,
        next: null,
      }),
      le === null ? (J.memoizedState = le = e) : (le = le.next = e);
  }
  return le;
}
function zr(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function al(e) {
  var t = We(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = oe,
    o = r.baseQueue,
    i = n.pending;
  if (i !== null) {
    if (o !== null) {
      var l = o.next;
      (o.next = i.next), (i.next = l);
    }
    (r.baseQueue = o = i), (n.pending = null);
  }
  if (o !== null) {
    (i = o.next), (r = r.baseState);
    var u = (l = null),
      s = null,
      a = i;
    do {
      var f = a.lane;
      if ((ln & f) === f)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action));
      else {
        var c = {
          lane: f,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        s === null ? ((u = s = c), (l = r)) : (s = s.next = c),
          (J.lanes |= f),
          (un |= f);
      }
      a = a.next;
    } while (a !== null && a !== i);
    s === null ? (l = r) : (s.next = u),
      Xe(r, t.memoizedState) || (Ee = !0),
      (t.memoizedState = r),
      (t.baseState = l),
      (t.baseQueue = s),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    o = e;
    do (i = o.lane), (J.lanes |= i), (un |= i), (o = o.next);
    while (o !== e);
  } else o === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function cl(e) {
  var t = We(),
    n = t.queue;
  if (n === null) throw Error(N(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    o = n.pending,
    i = t.memoizedState;
  if (o !== null) {
    n.pending = null;
    var l = (o = o.next);
    do (i = e(i, l.action)), (l = l.next);
    while (l !== o);
    Xe(i, t.memoizedState) || (Ee = !0),
      (t.memoizedState = i),
      t.baseQueue === null && (t.baseState = i),
      (n.lastRenderedState = i);
  }
  return [i, r];
}
function Rf() {}
function Mf(e, t) {
  var n = J,
    r = We(),
    o = t(),
    i = !Xe(r.memoizedState, o);
  if (
    (i && ((r.memoizedState = o), (Ee = !0)),
    (r = r.queue),
    ns(Of.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || i || (le !== null && le.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      Ur(9, Tf.bind(null, n, r, o, t), void 0, null),
      ue === null)
    )
      throw Error(N(349));
    ln & 30 || Nf(n, t, o);
  }
  return o;
}
function Nf(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = J.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (J.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Tf(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Df(t) && Af(e);
}
function Of(e, t, n) {
  return n(function () {
    Df(t) && Af(e);
  });
}
function Df(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Xe(e, n);
  } catch {
    return !0;
  }
}
function Af(e) {
  var t = vt(e, 1);
  t !== null && Ye(t, e, 1, -1);
}
function Pa(e) {
  var t = tt();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: zr,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Rv.bind(null, J, e)),
    [t.memoizedState, e]
  );
}
function Ur(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = J.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (J.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function If() {
  return We().memoizedState;
}
function Ro(e, t, n, r) {
  var o = tt();
  (J.flags |= e),
    (o.memoizedState = Ur(1 | t, n, void 0, r === void 0 ? null : r));
}
function wi(e, t, n, r) {
  var o = We();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (oe !== null) {
    var l = oe.memoizedState;
    if (((i = l.destroy), r !== null && qu(r, l.deps))) {
      o.memoizedState = Ur(t, n, i, r);
      return;
    }
  }
  (J.flags |= e), (o.memoizedState = Ur(1 | t, n, i, r));
}
function ka(e, t) {
  return Ro(8390656, 8, e, t);
}
function ns(e, t) {
  return wi(2048, 8, e, t);
}
function Lf(e, t) {
  return wi(4, 2, e, t);
}
function Ff(e, t) {
  return wi(4, 4, e, t);
}
function jf(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function zf(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), wi(4, 4, jf.bind(null, t, e), n)
  );
}
function rs() {}
function Uf(e, t) {
  var n = We();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qu(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function $f(e, t) {
  var n = We();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && qu(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Bf(e, t, n) {
  return ln & 21
    ? (Xe(n, t) || ((n = Kc()), (J.lanes |= n), (un |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Ee = !0)), (e.memoizedState = n));
}
function Pv(e, t) {
  var n = B;
  (B = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = sl.transition;
  sl.transition = {};
  try {
    e(!1), t();
  } finally {
    (B = n), (sl.transition = r);
  }
}
function Wf() {
  return We().memoizedState;
}
function kv(e, t, n) {
  var r = zt(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Vf(e))
  )
    Hf(t, n);
  else if (((n = _f(e, t, n, r)), n !== null)) {
    var o = ye();
    Ye(n, e, r, o), Kf(n, t, r);
  }
}
function Rv(e, t, n) {
  var r = zt(e),
    o = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Vf(e)) Hf(t, o);
  else {
    var i = e.alternate;
    if (
      e.lanes === 0 &&
      (i === null || i.lanes === 0) &&
      ((i = t.lastRenderedReducer), i !== null)
    )
      try {
        var l = t.lastRenderedState,
          u = i(l, n);
        if (((o.hasEagerState = !0), (o.eagerState = u), Xe(u, l))) {
          var s = t.interleaved;
          s === null
            ? ((o.next = o), Yu(t))
            : ((o.next = s.next), (s.next = o)),
            (t.interleaved = o);
          return;
        }
      } catch {
      } finally {
      }
    (n = _f(e, t, o, r)),
      n !== null && ((o = ye()), Ye(n, e, r, o), Kf(n, t, r));
  }
}
function Vf(e) {
  var t = e.alternate;
  return e === J || (t !== null && t === J);
}
function Hf(e, t) {
  Sr = Jo = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function Kf(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), Iu(e, n);
  }
}
var qo = {
    readContext: Be,
    useCallback: de,
    useContext: de,
    useEffect: de,
    useImperativeHandle: de,
    useInsertionEffect: de,
    useLayoutEffect: de,
    useMemo: de,
    useReducer: de,
    useRef: de,
    useState: de,
    useDebugValue: de,
    useDeferredValue: de,
    useTransition: de,
    useMutableSource: de,
    useSyncExternalStore: de,
    useId: de,
    unstable_isNewReconciler: !1,
  },
  Mv = {
    readContext: Be,
    useCallback: function (e, t) {
      return (tt().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: Be,
    useEffect: ka,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        Ro(4194308, 4, jf.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return Ro(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return Ro(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = tt();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = tt();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = kv.bind(null, J, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = tt();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Pa,
    useDebugValue: rs,
    useDeferredValue: function (e) {
      return (tt().memoizedState = e);
    },
    useTransition: function () {
      var e = Pa(!1),
        t = e[0];
      return (e = Pv.bind(null, e[1])), (tt().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = J,
        o = tt();
      if (X) {
        if (n === void 0) throw Error(N(407));
        n = n();
      } else {
        if (((n = t()), ue === null)) throw Error(N(349));
        ln & 30 || Nf(r, t, n);
      }
      o.memoizedState = n;
      var i = { value: n, getSnapshot: t };
      return (
        (o.queue = i),
        ka(Of.bind(null, r, i, e), [e]),
        (r.flags |= 2048),
        Ur(9, Tf.bind(null, r, i, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = tt(),
        t = ue.identifierPrefix;
      if (X) {
        var n = dt,
          r = ft;
        (n = (r & ~(1 << (32 - Qe(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = jr++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = _v++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Nv = {
    readContext: Be,
    useCallback: Uf,
    useContext: Be,
    useEffect: ns,
    useImperativeHandle: zf,
    useInsertionEffect: Lf,
    useLayoutEffect: Ff,
    useMemo: $f,
    useReducer: al,
    useRef: If,
    useState: function () {
      return al(zr);
    },
    useDebugValue: rs,
    useDeferredValue: function (e) {
      var t = We();
      return Bf(t, oe.memoizedState, e);
    },
    useTransition: function () {
      var e = al(zr)[0],
        t = We().memoizedState;
      return [e, t];
    },
    useMutableSource: Rf,
    useSyncExternalStore: Mf,
    useId: Wf,
    unstable_isNewReconciler: !1,
  },
  Tv = {
    readContext: Be,
    useCallback: Uf,
    useContext: Be,
    useEffect: ns,
    useImperativeHandle: zf,
    useInsertionEffect: Lf,
    useLayoutEffect: Ff,
    useMemo: $f,
    useReducer: cl,
    useRef: If,
    useState: function () {
      return cl(zr);
    },
    useDebugValue: rs,
    useDeferredValue: function (e) {
      var t = We();
      return oe === null ? (t.memoizedState = e) : Bf(t, oe.memoizedState, e);
    },
    useTransition: function () {
      var e = cl(zr)[0],
        t = We().memoizedState;
      return [e, t];
    },
    useMutableSource: Rf,
    useSyncExternalStore: Mf,
    useId: Wf,
    unstable_isNewReconciler: !1,
  };
function He(e, t) {
  if (e && e.defaultProps) {
    (t = q({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function tu(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : q({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Si = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? dn(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = ye(),
      o = zt(e),
      i = pt(r, o);
    (i.payload = t),
      n != null && (i.callback = n),
      (t = Ft(e, i, o)),
      t !== null && (Ye(t, e, o, r), Po(t, e, o));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = ye(),
      o = zt(e),
      i = pt(r, o);
    (i.tag = 1),
      (i.payload = t),
      n != null && (i.callback = n),
      (t = Ft(e, i, o)),
      t !== null && (Ye(t, e, o, r), Po(t, e, o));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = ye(),
      r = zt(e),
      o = pt(n, r);
    (o.tag = 2),
      t != null && (o.callback = t),
      (t = Ft(e, o, r)),
      t !== null && (Ye(t, e, r, n), Po(t, e, r));
  },
};
function Ra(e, t, n, r, o, i, l) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, i, l)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Or(n, r) || !Or(o, i)
      : !0
  );
}
function Gf(e, t, n) {
  var r = !1,
    o = Bt,
    i = t.contextType;
  return (
    typeof i == "object" && i !== null
      ? (i = Be(i))
      : ((o = _e(t) ? rn : he.current),
        (r = t.contextTypes),
        (i = (r = r != null) ? Bn(e, o) : Bt)),
    (t = new t(n, i)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = Si),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = o),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    t
  );
}
function Ma(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && Si.enqueueReplaceState(t, t.state, null);
}
function nu(e, t, n, r) {
  var o = e.stateNode;
  (o.props = n), (o.state = e.memoizedState), (o.refs = {}), Xu(e);
  var i = t.contextType;
  typeof i == "object" && i !== null
    ? (o.context = Be(i))
    : ((i = _e(t) ? rn : he.current), (o.context = Bn(e, i))),
    (o.state = e.memoizedState),
    (i = t.getDerivedStateFromProps),
    typeof i == "function" && (tu(e, t, i, n), (o.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function" ||
      (typeof o.UNSAFE_componentWillMount != "function" &&
        typeof o.componentWillMount != "function") ||
      ((t = o.state),
      typeof o.componentWillMount == "function" && o.componentWillMount(),
      typeof o.UNSAFE_componentWillMount == "function" &&
        o.UNSAFE_componentWillMount(),
      t !== o.state && Si.enqueueReplaceState(o, o.state, null),
      bo(e, n, o, r),
      (o.state = e.memoizedState)),
    typeof o.componentDidMount == "function" && (e.flags |= 4194308);
}
function Kn(e, t) {
  try {
    var n = "",
      r = t;
    do (n += oh(r)), (r = r.return);
    while (r);
    var o = n;
  } catch (i) {
    o =
      `
Error generating stack: ` +
      i.message +
      `
` +
      i.stack;
  }
  return { value: e, source: t, stack: o, digest: null };
}
function fl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function ru(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Ov = typeof WeakMap == "function" ? WeakMap : Map;
function Qf(e, t, n) {
  (n = pt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      ti || ((ti = !0), (pu = r)), ru(e, t);
    }),
    n
  );
}
function Yf(e, t, n) {
  (n = pt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var o = t.value;
    (n.payload = function () {
      return r(o);
    }),
      (n.callback = function () {
        ru(e, t);
      });
  }
  var i = e.stateNode;
  return (
    i !== null &&
      typeof i.componentDidCatch == "function" &&
      (n.callback = function () {
        ru(e, t),
          typeof r != "function" &&
            (jt === null ? (jt = new Set([this])) : jt.add(this));
        var l = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: l !== null ? l : "",
        });
      }),
    n
  );
}
function Na(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Ov();
    var o = new Set();
    r.set(t, o);
  } else (o = r.get(t)), o === void 0 && ((o = new Set()), r.set(t, o));
  o.has(n) || (o.add(n), (e = Kv.bind(null, e, t, n)), t.then(e, e));
}
function Ta(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Oa(e, t, n, r, o) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = o), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = pt(-1, 1)), (t.tag = 2), Ft(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Dv = xt.ReactCurrentOwner,
  Ee = !1;
function ge(e, t, n, r) {
  t.child = e === null ? Cf(t, null, n, r) : Vn(t, e.child, n, r);
}
function Da(e, t, n, r, o) {
  n = n.render;
  var i = t.ref;
  return (
    Fn(t, o),
    (r = es(e, t, n, r, i, o)),
    (n = ts()),
    e !== null && !Ee
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        gt(e, t, o))
      : (X && n && Wu(t), (t.flags |= 1), ge(e, t, r, o), t.child)
  );
}
function Aa(e, t, n, r, o) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" &&
      !fs(i) &&
      i.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = i), Xf(e, t, i, r, o))
      : ((e = Oo(n.type, null, r, t, t.mode, o)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((i = e.child), !(e.lanes & o))) {
    var l = i.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Or), n(l, r) && e.ref === t.ref)
    )
      return gt(e, t, o);
  }
  return (
    (t.flags |= 1),
    (e = Ut(i, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Xf(e, t, n, r, o) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (Or(i, r) && e.ref === t.ref)
      if (((Ee = !1), (t.pendingProps = r = i), (e.lanes & o) !== 0))
        e.flags & 131072 && (Ee = !0);
      else return (t.lanes = e.lanes), gt(e, t, o);
  }
  return ou(e, t, n, r, o);
}
function bf(e, t, n) {
  var r = t.pendingProps,
    o = r.children,
    i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        H(On, Re),
        (Re |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = i !== null ? i.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          H(On, Re),
          (Re |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = i !== null ? i.baseLanes : n),
        H(On, Re),
        (Re |= r);
    }
  else
    i !== null ? ((r = i.baseLanes | n), (t.memoizedState = null)) : (r = n),
      H(On, Re),
      (Re |= r);
  return ge(e, t, o, n), t.child;
}
function Zf(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function ou(e, t, n, r, o) {
  var i = _e(n) ? rn : he.current;
  return (
    (i = Bn(t, i)),
    Fn(t, o),
    (n = es(e, t, n, r, i, o)),
    (r = ts()),
    e !== null && !Ee
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~o),
        gt(e, t, o))
      : (X && r && Wu(t), (t.flags |= 1), ge(e, t, n, o), t.child)
  );
}
function Ia(e, t, n, r, o) {
  if (_e(n)) {
    var i = !0;
    Ko(t);
  } else i = !1;
  if ((Fn(t, o), t.stateNode === null))
    Mo(e, t), Gf(t, n, r), nu(t, n, r, o), (r = !0);
  else if (e === null) {
    var l = t.stateNode,
      u = t.memoizedProps;
    l.props = u;
    var s = l.context,
      a = n.contextType;
    typeof a == "object" && a !== null
      ? (a = Be(a))
      : ((a = _e(n) ? rn : he.current), (a = Bn(t, a)));
    var f = n.getDerivedStateFromProps,
      c =
        typeof f == "function" ||
        typeof l.getSnapshotBeforeUpdate == "function";
    c ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((u !== r || s !== a) && Ma(t, l, r, a)),
      (Rt = !1);
    var m = t.memoizedState;
    (l.state = m),
      bo(t, r, l, o),
      (s = t.memoizedState),
      u !== r || m !== s || Ce.current || Rt
        ? (typeof f == "function" && (tu(t, n, f, r), (s = t.memoizedState)),
          (u = Rt || Ra(t, n, u, r, m, s, a))
            ? (c ||
                (typeof l.UNSAFE_componentWillMount != "function" &&
                  typeof l.componentWillMount != "function") ||
                (typeof l.componentWillMount == "function" &&
                  l.componentWillMount(),
                typeof l.UNSAFE_componentWillMount == "function" &&
                  l.UNSAFE_componentWillMount()),
              typeof l.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = s)),
          (l.props = r),
          (l.state = s),
          (l.context = a),
          (r = u))
        : (typeof l.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (l = t.stateNode),
      Pf(e, t),
      (u = t.memoizedProps),
      (a = t.type === t.elementType ? u : He(t.type, u)),
      (l.props = a),
      (c = t.pendingProps),
      (m = l.context),
      (s = n.contextType),
      typeof s == "object" && s !== null
        ? (s = Be(s))
        : ((s = _e(n) ? rn : he.current), (s = Bn(t, s)));
    var g = n.getDerivedStateFromProps;
    (f =
      typeof g == "function" ||
      typeof l.getSnapshotBeforeUpdate == "function") ||
      (typeof l.UNSAFE_componentWillReceiveProps != "function" &&
        typeof l.componentWillReceiveProps != "function") ||
      ((u !== c || m !== s) && Ma(t, l, r, s)),
      (Rt = !1),
      (m = t.memoizedState),
      (l.state = m),
      bo(t, r, l, o);
    var w = t.memoizedState;
    u !== c || m !== w || Ce.current || Rt
      ? (typeof g == "function" && (tu(t, n, g, r), (w = t.memoizedState)),
        (a = Rt || Ra(t, n, a, r, m, w, s) || !1)
          ? (f ||
              (typeof l.UNSAFE_componentWillUpdate != "function" &&
                typeof l.componentWillUpdate != "function") ||
              (typeof l.componentWillUpdate == "function" &&
                l.componentWillUpdate(r, w, s),
              typeof l.UNSAFE_componentWillUpdate == "function" &&
                l.UNSAFE_componentWillUpdate(r, w, s)),
            typeof l.componentDidUpdate == "function" && (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof l.componentDidUpdate != "function" ||
              (u === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 4),
            typeof l.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && m === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = w)),
        (l.props = r),
        (l.state = w),
        (l.context = s),
        (r = a))
      : (typeof l.componentDidUpdate != "function" ||
          (u === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 4),
        typeof l.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && m === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return iu(e, t, n, r, i, o);
}
function iu(e, t, n, r, o, i) {
  Zf(e, t);
  var l = (t.flags & 128) !== 0;
  if (!r && !l) return o && wa(t, n, !1), gt(e, t, i);
  (r = t.stateNode), (Dv.current = t);
  var u =
    l && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && l
      ? ((t.child = Vn(t, e.child, null, i)), (t.child = Vn(t, null, u, i)))
      : ge(e, t, u, i),
    (t.memoizedState = r.state),
    o && wa(t, n, !0),
    t.child
  );
}
function Jf(e) {
  var t = e.stateNode;
  t.pendingContext
    ? ya(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && ya(e, t.context, !1),
    bu(e, t.containerInfo);
}
function La(e, t, n, r, o) {
  return Wn(), Hu(o), (t.flags |= 256), ge(e, t, n, r), t.child;
}
var lu = { dehydrated: null, treeContext: null, retryLane: 0 };
function uu(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function qf(e, t, n) {
  var r = t.pendingProps,
    o = Z.current,
    i = !1,
    l = (t.flags & 128) !== 0,
    u;
  if (
    ((u = l) ||
      (u = e !== null && e.memoizedState === null ? !1 : (o & 2) !== 0),
    u
      ? ((i = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (o |= 1),
    H(Z, o & 1),
    e === null)
  )
    return (
      ql(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((l = r.children),
          (e = r.fallback),
          i
            ? ((r = t.mode),
              (i = t.child),
              (l = { mode: "hidden", children: l }),
              !(r & 1) && i !== null
                ? ((i.childLanes = 0), (i.pendingProps = l))
                : (i = Ci(l, r, 0, null)),
              (e = tn(e, r, n, null)),
              (i.return = t),
              (e.return = t),
              (i.sibling = e),
              (t.child = i),
              (t.child.memoizedState = uu(n)),
              (t.memoizedState = lu),
              e)
            : os(t, l))
    );
  if (((o = e.memoizedState), o !== null && ((u = o.dehydrated), u !== null)))
    return Av(e, t, l, r, u, o, n);
  if (i) {
    (i = r.fallback), (l = t.mode), (o = e.child), (u = o.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(l & 1) && t.child !== o
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (t.deletions = null))
        : ((r = Ut(o, s)), (r.subtreeFlags = o.subtreeFlags & 14680064)),
      u !== null ? (i = Ut(u, i)) : ((i = tn(i, l, n, null)), (i.flags |= 2)),
      (i.return = t),
      (r.return = t),
      (r.sibling = i),
      (t.child = r),
      (r = i),
      (i = t.child),
      (l = e.child.memoizedState),
      (l =
        l === null
          ? uu(n)
          : {
              baseLanes: l.baseLanes | n,
              cachePool: null,
              transitions: l.transitions,
            }),
      (i.memoizedState = l),
      (i.childLanes = e.childLanes & ~n),
      (t.memoizedState = lu),
      r
    );
  }
  return (
    (i = e.child),
    (e = i.sibling),
    (r = Ut(i, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function os(e, t) {
  return (
    (t = Ci({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function fo(e, t, n, r) {
  return (
    r !== null && Hu(r),
    Vn(t, e.child, null, n),
    (e = os(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Av(e, t, n, r, o, i, l) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = fl(Error(N(422)))), fo(e, t, l, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((i = r.fallback),
        (o = t.mode),
        (r = Ci({ mode: "visible", children: r.children }, o, 0, null)),
        (i = tn(i, o, l, null)),
        (i.flags |= 2),
        (r.return = t),
        (i.return = t),
        (r.sibling = i),
        (t.child = r),
        t.mode & 1 && Vn(t, e.child, null, l),
        (t.child.memoizedState = uu(l)),
        (t.memoizedState = lu),
        i);
  if (!(t.mode & 1)) return fo(e, t, l, null);
  if (o.data === "$!") {
    if (((r = o.nextSibling && o.nextSibling.dataset), r)) var u = r.dgst;
    return (r = u), (i = Error(N(419))), (r = fl(i, r, void 0)), fo(e, t, l, r);
  }
  if (((u = (l & e.childLanes) !== 0), Ee || u)) {
    if (((r = ue), r !== null)) {
      switch (l & -l) {
        case 4:
          o = 2;
          break;
        case 16:
          o = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          o = 32;
          break;
        case 536870912:
          o = 268435456;
          break;
        default:
          o = 0;
      }
      (o = o & (r.suspendedLanes | l) ? 0 : o),
        o !== 0 &&
          o !== i.retryLane &&
          ((i.retryLane = o), vt(e, o), Ye(r, e, o, -1));
    }
    return cs(), (r = fl(Error(N(421)))), fo(e, t, l, r);
  }
  return o.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = Gv.bind(null, e)),
      (o._reactRetry = t),
      null)
    : ((e = i.treeContext),
      (Ne = Lt(o.nextSibling)),
      (Te = t),
      (X = !0),
      (Ge = null),
      e !== null &&
        ((Le[Fe++] = ft),
        (Le[Fe++] = dt),
        (Le[Fe++] = on),
        (ft = e.id),
        (dt = e.overflow),
        (on = t)),
      (t = os(t, r.children)),
      (t.flags |= 4096),
      t);
}
function Fa(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), eu(e.return, t, n);
}
function dl(e, t, n, r, o) {
  var i = e.memoizedState;
  i === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: o,
      })
    : ((i.isBackwards = t),
      (i.rendering = null),
      (i.renderingStartTime = 0),
      (i.last = r),
      (i.tail = n),
      (i.tailMode = o));
}
function ed(e, t, n) {
  var r = t.pendingProps,
    o = r.revealOrder,
    i = r.tail;
  if ((ge(e, t, r.children, n), (r = Z.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Fa(e, n, t);
        else if (e.tag === 19) Fa(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((H(Z, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (o) {
      case "forwards":
        for (n = t.child, o = null; n !== null; )
          (e = n.alternate),
            e !== null && Zo(e) === null && (o = n),
            (n = n.sibling);
        (n = o),
          n === null
            ? ((o = t.child), (t.child = null))
            : ((o = n.sibling), (n.sibling = null)),
          dl(t, !1, o, n, i);
        break;
      case "backwards":
        for (n = null, o = t.child, t.child = null; o !== null; ) {
          if (((e = o.alternate), e !== null && Zo(e) === null)) {
            t.child = o;
            break;
          }
          (e = o.sibling), (o.sibling = n), (n = o), (o = e);
        }
        dl(t, !0, n, null, i);
        break;
      case "together":
        dl(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function Mo(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function gt(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (un |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(N(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Ut(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Ut(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Iv(e, t, n) {
  switch (t.tag) {
    case 3:
      Jf(t), Wn();
      break;
    case 5:
      kf(t);
      break;
    case 1:
      _e(t.type) && Ko(t);
      break;
    case 4:
      bu(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        o = t.memoizedProps.value;
      H(Yo, r._currentValue), (r._currentValue = o);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (H(Z, Z.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? qf(e, t, n)
          : (H(Z, Z.current & 1),
            (e = gt(e, t, n)),
            e !== null ? e.sibling : null);
      H(Z, Z.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return ed(e, t, n);
        t.flags |= 128;
      }
      if (
        ((o = t.memoizedState),
        o !== null &&
          ((o.rendering = null), (o.tail = null), (o.lastEffect = null)),
        H(Z, Z.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), bf(e, t, n);
  }
  return gt(e, t, n);
}
var td, su, nd, rd;
td = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
su = function () {};
nd = function (e, t, n, r) {
  var o = e.memoizedProps;
  if (o !== r) {
    (e = t.stateNode), qt(it.current);
    var i = null;
    switch (n) {
      case "input":
        (o = Tl(e, o)), (r = Tl(e, r)), (i = []);
        break;
      case "select":
        (o = q({}, o, { value: void 0 })),
          (r = q({}, r, { value: void 0 })),
          (i = []);
        break;
      case "textarea":
        (o = Al(e, o)), (r = Al(e, r)), (i = []);
        break;
      default:
        typeof o.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Vo);
    }
    Ll(n, r);
    var l;
    n = null;
    for (a in o)
      if (!r.hasOwnProperty(a) && o.hasOwnProperty(a) && o[a] != null)
        if (a === "style") {
          var u = o[a];
          for (l in u) u.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (_r.hasOwnProperty(a)
              ? i || (i = [])
              : (i = i || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (
        ((u = o?.[a]),
        r.hasOwnProperty(a) && s !== u && (s != null || u != null))
      )
        if (a === "style")
          if (u) {
            for (l in u)
              !u.hasOwnProperty(l) ||
                (s && s.hasOwnProperty(l)) ||
                (n || (n = {}), (n[l] = ""));
            for (l in s)
              s.hasOwnProperty(l) &&
                u[l] !== s[l] &&
                (n || (n = {}), (n[l] = s[l]));
          } else n || (i || (i = []), i.push(a, n)), (n = s);
        else
          a === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (i = i || []).push(a, s))
            : a === "children"
            ? (typeof s != "string" && typeof s != "number") ||
              (i = i || []).push(a, "" + s)
            : a !== "suppressContentEditableWarning" &&
              a !== "suppressHydrationWarning" &&
              (_r.hasOwnProperty(a)
                ? (s != null && a === "onScroll" && G("scroll", e),
                  i || u === s || (i = []))
                : (i = i || []).push(a, s));
    }
    n && (i = i || []).push("style", n);
    var a = i;
    (t.updateQueue = a) && (t.flags |= 4);
  }
};
rd = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function sr(e, t) {
  if (!X)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function pe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags & 14680064),
        (r |= o.flags & 14680064),
        (o.return = e),
        (o = o.sibling);
  else
    for (o = e.child; o !== null; )
      (n |= o.lanes | o.childLanes),
        (r |= o.subtreeFlags),
        (r |= o.flags),
        (o.return = e),
        (o = o.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function Lv(e, t, n) {
  var r = t.pendingProps;
  switch ((Vu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return pe(t), null;
    case 1:
      return _e(t.type) && Ho(), pe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Hn(),
        Q(Ce),
        Q(he),
        Ju(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (ao(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), Ge !== null && (vu(Ge), (Ge = null)))),
        su(e, t),
        pe(t),
        null
      );
    case 5:
      Zu(t);
      var o = qt(Fr.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        nd(e, t, n, r, o),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(N(166));
          return pe(t), null;
        }
        if (((e = qt(it.current)), ao(t))) {
          (r = t.stateNode), (n = t.type);
          var i = t.memoizedProps;
          switch (((r[nt] = t), (r[Ir] = i), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              G("cancel", r), G("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", r);
              break;
            case "video":
            case "audio":
              for (o = 0; o < pr.length; o++) G(pr[o], r);
              break;
            case "source":
              G("error", r);
              break;
            case "img":
            case "image":
            case "link":
              G("error", r), G("load", r);
              break;
            case "details":
              G("toggle", r);
              break;
            case "input":
              Ks(r, i), G("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!i.multiple }),
                G("invalid", r);
              break;
            case "textarea":
              Qs(r, i), G("invalid", r);
          }
          Ll(n, i), (o = null);
          for (var l in i)
            if (i.hasOwnProperty(l)) {
              var u = i[l];
              l === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (i.suppressHydrationWarning !== !0 &&
                      so(r.textContent, u, e),
                    (o = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (i.suppressHydrationWarning !== !0 &&
                      so(r.textContent, u, e),
                    (o = ["children", "" + u]))
                : _r.hasOwnProperty(l) &&
                  u != null &&
                  l === "onScroll" &&
                  G("scroll", r);
            }
          switch (n) {
            case "input":
              eo(r), Gs(r, i, !0);
              break;
            case "textarea":
              eo(r), Ys(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = Vo);
          }
          (r = o), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (l = o.nodeType === 9 ? o : o.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = Tc(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = l.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = l.createElement(n, { is: r.is }))
                : ((e = l.createElement(n)),
                  n === "select" &&
                    ((l = e),
                    r.multiple
                      ? (l.multiple = !0)
                      : r.size && (l.size = r.size)))
              : (e = l.createElementNS(e, n)),
            (e[nt] = t),
            (e[Ir] = r),
            td(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((l = Fl(n, r)), n)) {
              case "dialog":
                G("cancel", e), G("close", e), (o = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                G("load", e), (o = r);
                break;
              case "video":
              case "audio":
                for (o = 0; o < pr.length; o++) G(pr[o], e);
                o = r;
                break;
              case "source":
                G("error", e), (o = r);
                break;
              case "img":
              case "image":
              case "link":
                G("error", e), G("load", e), (o = r);
                break;
              case "details":
                G("toggle", e), (o = r);
                break;
              case "input":
                Ks(e, r), (o = Tl(e, r)), G("invalid", e);
                break;
              case "option":
                o = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (o = q({}, r, { value: void 0 })),
                  G("invalid", e);
                break;
              case "textarea":
                Qs(e, r), (o = Al(e, r)), G("invalid", e);
                break;
              default:
                o = r;
            }
            Ll(n, o), (u = o);
            for (i in u)
              if (u.hasOwnProperty(i)) {
                var s = u[i];
                i === "style"
                  ? Ac(e, s)
                  : i === "dangerouslySetInnerHTML"
                  ? ((s = s ? s.__html : void 0), s != null && Oc(e, s))
                  : i === "children"
                  ? typeof s == "string"
                    ? (n !== "textarea" || s !== "") && Pr(e, s)
                    : typeof s == "number" && Pr(e, "" + s)
                  : i !== "suppressContentEditableWarning" &&
                    i !== "suppressHydrationWarning" &&
                    i !== "autoFocus" &&
                    (_r.hasOwnProperty(i)
                      ? s != null && i === "onScroll" && G("scroll", e)
                      : s != null && Mu(e, i, s, l));
              }
            switch (n) {
              case "input":
                eo(e), Gs(e, r, !1);
                break;
              case "textarea":
                eo(e), Ys(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + $t(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (i = r.value),
                  i != null
                    ? Dn(e, !!r.multiple, i, !1)
                    : r.defaultValue != null &&
                      Dn(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof o.onClick == "function" && (e.onclick = Vo);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return pe(t), null;
    case 6:
      if (e && t.stateNode != null) rd(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(N(166));
        if (((n = qt(Fr.current)), qt(it.current), ao(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[nt] = t),
            (i = r.nodeValue !== n) && ((e = Te), e !== null))
          )
            switch (e.tag) {
              case 3:
                so(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  so(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          i && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[nt] = t),
            (t.stateNode = r);
      }
      return pe(t), null;
    case 13:
      if (
        (Q(Z),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (X && Ne !== null && t.mode & 1 && !(t.flags & 128))
          xf(), Wn(), (t.flags |= 98560), (i = !1);
        else if (((i = ao(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!i) throw Error(N(318));
            if (
              ((i = t.memoizedState),
              (i = i !== null ? i.dehydrated : null),
              !i)
            )
              throw Error(N(317));
            i[nt] = t;
          } else
            Wn(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          pe(t), (i = !1);
        } else Ge !== null && (vu(Ge), (Ge = null)), (i = !0);
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || Z.current & 1 ? ie === 0 && (ie = 3) : cs())),
          t.updateQueue !== null && (t.flags |= 4),
          pe(t),
          null);
    case 4:
      return (
        Hn(), su(e, t), e === null && Dr(t.stateNode.containerInfo), pe(t), null
      );
    case 10:
      return Qu(t.type._context), pe(t), null;
    case 17:
      return _e(t.type) && Ho(), pe(t), null;
    case 19:
      if ((Q(Z), (i = t.memoizedState), i === null)) return pe(t), null;
      if (((r = (t.flags & 128) !== 0), (l = i.rendering), l === null))
        if (r) sr(i, !1);
        else {
          if (ie !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((l = Zo(e)), l !== null)) {
                for (
                  t.flags |= 128,
                    sr(i, !1),
                    r = l.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (i = n),
                    (e = r),
                    (i.flags &= 14680066),
                    (l = i.alternate),
                    l === null
                      ? ((i.childLanes = 0),
                        (i.lanes = e),
                        (i.child = null),
                        (i.subtreeFlags = 0),
                        (i.memoizedProps = null),
                        (i.memoizedState = null),
                        (i.updateQueue = null),
                        (i.dependencies = null),
                        (i.stateNode = null))
                      : ((i.childLanes = l.childLanes),
                        (i.lanes = l.lanes),
                        (i.child = l.child),
                        (i.subtreeFlags = 0),
                        (i.deletions = null),
                        (i.memoizedProps = l.memoizedProps),
                        (i.memoizedState = l.memoizedState),
                        (i.updateQueue = l.updateQueue),
                        (i.type = l.type),
                        (e = l.dependencies),
                        (i.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return H(Z, (Z.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          i.tail !== null &&
            te() > Gn &&
            ((t.flags |= 128), (r = !0), sr(i, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Zo(l)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              sr(i, !0),
              i.tail === null && i.tailMode === "hidden" && !l.alternate && !X)
            )
              return pe(t), null;
          } else
            2 * te() - i.renderingStartTime > Gn &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), sr(i, !1), (t.lanes = 4194304));
        i.isBackwards
          ? ((l.sibling = t.child), (t.child = l))
          : ((n = i.last),
            n !== null ? (n.sibling = l) : (t.child = l),
            (i.last = l));
      }
      return i.tail !== null
        ? ((t = i.tail),
          (i.rendering = t),
          (i.tail = t.sibling),
          (i.renderingStartTime = te()),
          (t.sibling = null),
          (n = Z.current),
          H(Z, r ? (n & 1) | 2 : n & 1),
          t)
        : (pe(t), null);
    case 22:
    case 23:
      return (
        as(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Re & 1073741824 && (pe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : pe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(N(156, t.tag));
}
function Fv(e, t) {
  switch ((Vu(t), t.tag)) {
    case 1:
      return (
        _e(t.type) && Ho(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Hn(),
        Q(Ce),
        Q(he),
        Ju(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return Zu(t), null;
    case 13:
      if ((Q(Z), (e = t.memoizedState), e !== null && e.dehydrated !== null)) {
        if (t.alternate === null) throw Error(N(340));
        Wn();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return Q(Z), null;
    case 4:
      return Hn(), null;
    case 10:
      return Qu(t.type._context), null;
    case 22:
    case 23:
      return as(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var po = !1,
  me = !1,
  jv = typeof WeakSet == "function" ? WeakSet : Set,
  O = null;
function Tn(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        ee(e, t, r);
      }
    else n.current = null;
}
function au(e, t, n) {
  try {
    n();
  } catch (r) {
    ee(e, t, r);
  }
}
var ja = !1;
function zv(e, t) {
  if (((Gl = $o), (e = sf()), Bu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var o = r.anchorOffset,
            i = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, i.nodeType;
          } catch {
            n = null;
            break e;
          }
          var l = 0,
            u = -1,
            s = -1,
            a = 0,
            f = 0,
            c = e,
            m = null;
          t: for (;;) {
            for (
              var g;
              c !== n || (o !== 0 && c.nodeType !== 3) || (u = l + o),
                c !== i || (r !== 0 && c.nodeType !== 3) || (s = l + r),
                c.nodeType === 3 && (l += c.nodeValue.length),
                (g = c.firstChild) !== null;

            )
              (m = c), (c = g);
            for (;;) {
              if (c === e) break t;
              if (
                (m === n && ++a === o && (u = l),
                m === i && ++f === r && (s = l),
                (g = c.nextSibling) !== null)
              )
                break;
              (c = m), (m = c.parentNode);
            }
            c = g;
          }
          n = u === -1 || s === -1 ? null : { start: u, end: s };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ql = { focusedElem: e, selectionRange: n }, $o = !1, O = t; O !== null; )
    if (((t = O), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (O = e);
    else
      for (; O !== null; ) {
        t = O;
        try {
          var w = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (w !== null) {
                  var y = w.memoizedProps,
                    x = w.memoizedState,
                    d = t.stateNode,
                    p = d.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? y : He(t.type, y),
                      x
                    );
                  d.__reactInternalSnapshotBeforeUpdate = p;
                }
                break;
              case 3:
                var v = t.stateNode.containerInfo;
                v.nodeType === 1
                  ? (v.textContent = "")
                  : v.nodeType === 9 &&
                    v.documentElement &&
                    v.removeChild(v.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(N(163));
            }
        } catch (S) {
          ee(t, t.return, S);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (O = e);
          break;
        }
        O = t.return;
      }
  return (w = ja), (ja = !1), w;
}
function xr(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var o = (r = r.next);
    do {
      if ((o.tag & e) === e) {
        var i = o.destroy;
        (o.destroy = void 0), i !== void 0 && au(t, n, i);
      }
      o = o.next;
    } while (o !== r);
  }
}
function xi(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function cu(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function od(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), od(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[nt], delete t[Ir], delete t[bl], delete t[Sv], delete t[xv])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function id(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function za(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || id(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function fu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Vo));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (fu(e, t, n), e = e.sibling; e !== null; ) fu(e, t, n), (e = e.sibling);
}
function du(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (du(e, t, n), e = e.sibling; e !== null; ) du(e, t, n), (e = e.sibling);
}
var se = null,
  Ke = !1;
function _t(e, t, n) {
  for (n = n.child; n !== null; ) ld(e, t, n), (n = n.sibling);
}
function ld(e, t, n) {
  if (ot && typeof ot.onCommitFiberUnmount == "function")
    try {
      ot.onCommitFiberUnmount(pi, n);
    } catch {}
  switch (n.tag) {
    case 5:
      me || Tn(n, t);
    case 6:
      var r = se,
        o = Ke;
      (se = null),
        _t(e, t, n),
        (se = r),
        (Ke = o),
        se !== null &&
          (Ke
            ? ((e = se),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : se.removeChild(n.stateNode));
      break;
    case 18:
      se !== null &&
        (Ke
          ? ((e = se),
            (n = n.stateNode),
            e.nodeType === 8
              ? il(e.parentNode, n)
              : e.nodeType === 1 && il(e, n),
            Nr(e))
          : il(se, n.stateNode));
      break;
    case 4:
      (r = se),
        (o = Ke),
        (se = n.stateNode.containerInfo),
        (Ke = !0),
        _t(e, t, n),
        (se = r),
        (Ke = o);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !me &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        o = r = r.next;
        do {
          var i = o,
            l = i.destroy;
          (i = i.tag),
            l !== void 0 && (i & 2 || i & 4) && au(n, t, l),
            (o = o.next);
        } while (o !== r);
      }
      _t(e, t, n);
      break;
    case 1:
      if (
        !me &&
        (Tn(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (u) {
          ee(n, t, u);
        }
      _t(e, t, n);
      break;
    case 21:
      _t(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((me = (r = me) || n.memoizedState !== null), _t(e, t, n), (me = r))
        : _t(e, t, n);
      break;
    default:
      _t(e, t, n);
  }
}
function Ua(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new jv()),
      t.forEach(function (r) {
        var o = Qv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(o, o));
      });
  }
}
function Ve(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var o = n[r];
      try {
        var i = e,
          l = t,
          u = l;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (se = u.stateNode), (Ke = !1);
              break e;
            case 3:
              (se = u.stateNode.containerInfo), (Ke = !0);
              break e;
            case 4:
              (se = u.stateNode.containerInfo), (Ke = !0);
              break e;
          }
          u = u.return;
        }
        if (se === null) throw Error(N(160));
        ld(i, l, o), (se = null), (Ke = !1);
        var s = o.alternate;
        s !== null && (s.return = null), (o.return = null);
      } catch (a) {
        ee(o, t, a);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) ud(t, e), (t = t.sibling);
}
function ud(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((Ve(t, e), et(e), r & 4)) {
        try {
          xr(3, e, e.return), xi(3, e);
        } catch (y) {
          ee(e, e.return, y);
        }
        try {
          xr(5, e, e.return);
        } catch (y) {
          ee(e, e.return, y);
        }
      }
      break;
    case 1:
      Ve(t, e), et(e), r & 512 && n !== null && Tn(n, n.return);
      break;
    case 5:
      if (
        (Ve(t, e),
        et(e),
        r & 512 && n !== null && Tn(n, n.return),
        e.flags & 32)
      ) {
        var o = e.stateNode;
        try {
          Pr(o, "");
        } catch (y) {
          ee(e, e.return, y);
        }
      }
      if (r & 4 && ((o = e.stateNode), o != null)) {
        var i = e.memoizedProps,
          l = n !== null ? n.memoizedProps : i,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            u === "input" && i.type === "radio" && i.name != null && Mc(o, i),
              Fl(u, l);
            var a = Fl(u, i);
            for (l = 0; l < s.length; l += 2) {
              var f = s[l],
                c = s[l + 1];
              f === "style"
                ? Ac(o, c)
                : f === "dangerouslySetInnerHTML"
                ? Oc(o, c)
                : f === "children"
                ? Pr(o, c)
                : Mu(o, f, c, a);
            }
            switch (u) {
              case "input":
                Ol(o, i);
                break;
              case "textarea":
                Nc(o, i);
                break;
              case "select":
                var m = o._wrapperState.wasMultiple;
                o._wrapperState.wasMultiple = !!i.multiple;
                var g = i.value;
                g != null
                  ? Dn(o, !!i.multiple, g, !1)
                  : m !== !!i.multiple &&
                    (i.defaultValue != null
                      ? Dn(o, !!i.multiple, i.defaultValue, !0)
                      : Dn(o, !!i.multiple, i.multiple ? [] : "", !1));
            }
            o[Ir] = i;
          } catch (y) {
            ee(e, e.return, y);
          }
      }
      break;
    case 6:
      if ((Ve(t, e), et(e), r & 4)) {
        if (e.stateNode === null) throw Error(N(162));
        (o = e.stateNode), (i = e.memoizedProps);
        try {
          o.nodeValue = i;
        } catch (y) {
          ee(e, e.return, y);
        }
      }
      break;
    case 3:
      if (
        (Ve(t, e), et(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          Nr(t.containerInfo);
        } catch (y) {
          ee(e, e.return, y);
        }
      break;
    case 4:
      Ve(t, e), et(e);
      break;
    case 13:
      Ve(t, e),
        et(e),
        (o = e.child),
        o.flags & 8192 &&
          ((i = o.memoizedState !== null),
          (o.stateNode.isHidden = i),
          !i ||
            (o.alternate !== null && o.alternate.memoizedState !== null) ||
            (us = te())),
        r & 4 && Ua(e);
      break;
    case 22:
      if (
        ((f = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((me = (a = me) || f), Ve(t, e), (me = a)) : Ve(t, e),
        et(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !f && e.mode & 1)
        )
          for (O = e, f = e.child; f !== null; ) {
            for (c = O = f; O !== null; ) {
              switch (((m = O), (g = m.child), m.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  xr(4, m, m.return);
                  break;
                case 1:
                  Tn(m, m.return);
                  var w = m.stateNode;
                  if (typeof w.componentWillUnmount == "function") {
                    (r = m), (n = m.return);
                    try {
                      (t = r),
                        (w.props = t.memoizedProps),
                        (w.state = t.memoizedState),
                        w.componentWillUnmount();
                    } catch (y) {
                      ee(r, n, y);
                    }
                  }
                  break;
                case 5:
                  Tn(m, m.return);
                  break;
                case 22:
                  if (m.memoizedState !== null) {
                    Ba(c);
                    continue;
                  }
              }
              g !== null ? ((g.return = m), (O = g)) : Ba(c);
            }
            f = f.sibling;
          }
        e: for (f = null, c = e; ; ) {
          if (c.tag === 5) {
            if (f === null) {
              f = c;
              try {
                (o = c.stateNode),
                  a
                    ? ((i = o.style),
                      typeof i.setProperty == "function"
                        ? i.setProperty("display", "none", "important")
                        : (i.display = "none"))
                    : ((u = c.stateNode),
                      (s = c.memoizedProps.style),
                      (l =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = Dc("display", l)));
              } catch (y) {
                ee(e, e.return, y);
              }
            }
          } else if (c.tag === 6) {
            if (f === null)
              try {
                c.stateNode.nodeValue = a ? "" : c.memoizedProps;
              } catch (y) {
                ee(e, e.return, y);
              }
          } else if (
            ((c.tag !== 22 && c.tag !== 23) ||
              c.memoizedState === null ||
              c === e) &&
            c.child !== null
          ) {
            (c.child.return = c), (c = c.child);
            continue;
          }
          if (c === e) break e;
          for (; c.sibling === null; ) {
            if (c.return === null || c.return === e) break e;
            f === c && (f = null), (c = c.return);
          }
          f === c && (f = null), (c.sibling.return = c.return), (c = c.sibling);
        }
      }
      break;
    case 19:
      Ve(t, e), et(e), r & 4 && Ua(e);
      break;
    case 21:
      break;
    default:
      Ve(t, e), et(e);
  }
}
function et(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (id(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(N(160));
      }
      switch (r.tag) {
        case 5:
          var o = r.stateNode;
          r.flags & 32 && (Pr(o, ""), (r.flags &= -33));
          var i = za(e);
          du(e, i, o);
          break;
        case 3:
        case 4:
          var l = r.stateNode.containerInfo,
            u = za(e);
          fu(e, u, l);
          break;
        default:
          throw Error(N(161));
      }
    } catch (s) {
      ee(e, e.return, s);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function Uv(e, t, n) {
  (O = e), sd(e);
}
function sd(e, t, n) {
  for (var r = (e.mode & 1) !== 0; O !== null; ) {
    var o = O,
      i = o.child;
    if (o.tag === 22 && r) {
      var l = o.memoizedState !== null || po;
      if (!l) {
        var u = o.alternate,
          s = (u !== null && u.memoizedState !== null) || me;
        u = po;
        var a = me;
        if (((po = l), (me = s) && !a))
          for (O = o; O !== null; )
            (l = O),
              (s = l.child),
              l.tag === 22 && l.memoizedState !== null
                ? Wa(o)
                : s !== null
                ? ((s.return = l), (O = s))
                : Wa(o);
        for (; i !== null; ) (O = i), sd(i), (i = i.sibling);
        (O = o), (po = u), (me = a);
      }
      $a(e);
    } else
      o.subtreeFlags & 8772 && i !== null ? ((i.return = o), (O = i)) : $a(e);
  }
}
function $a(e) {
  for (; O !== null; ) {
    var t = O;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              me || xi(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !me)
                if (n === null) r.componentDidMount();
                else {
                  var o =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : He(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    o,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var i = t.updateQueue;
              i !== null && _a(t, i, r);
              break;
            case 3:
              var l = t.updateQueue;
              if (l !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                _a(t, l, n);
              }
              break;
            case 5:
              var u = t.stateNode;
              if (n === null && t.flags & 4) {
                n = u;
                var s = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && n.focus();
                    break;
                  case "img":
                    s.src && (n.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var a = t.alternate;
                if (a !== null) {
                  var f = a.memoizedState;
                  if (f !== null) {
                    var c = f.dehydrated;
                    c !== null && Nr(c);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(N(163));
          }
        me || (t.flags & 512 && cu(t));
      } catch (m) {
        ee(t, t.return, m);
      }
    }
    if (t === e) {
      O = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (O = n);
      break;
    }
    O = t.return;
  }
}
function Ba(e) {
  for (; O !== null; ) {
    var t = O;
    if (t === e) {
      O = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (O = n);
      break;
    }
    O = t.return;
  }
}
function Wa(e) {
  for (; O !== null; ) {
    var t = O;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            xi(4, t);
          } catch (s) {
            ee(t, n, s);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var o = t.return;
            try {
              r.componentDidMount();
            } catch (s) {
              ee(t, o, s);
            }
          }
          var i = t.return;
          try {
            cu(t);
          } catch (s) {
            ee(t, i, s);
          }
          break;
        case 5:
          var l = t.return;
          try {
            cu(t);
          } catch (s) {
            ee(t, l, s);
          }
      }
    } catch (s) {
      ee(t, t.return, s);
    }
    if (t === e) {
      O = null;
      break;
    }
    var u = t.sibling;
    if (u !== null) {
      (u.return = t.return), (O = u);
      break;
    }
    O = t.return;
  }
}
var $v = Math.ceil,
  ei = xt.ReactCurrentDispatcher,
  is = xt.ReactCurrentOwner,
  Ue = xt.ReactCurrentBatchConfig,
  j = 0,
  ue = null,
  ne = null,
  ae = 0,
  Re = 0,
  On = Gt(0),
  ie = 0,
  $r = null,
  un = 0,
  Ei = 0,
  ls = 0,
  Er = null,
  xe = null,
  us = 0,
  Gn = 1 / 0,
  at = null,
  ti = !1,
  pu = null,
  jt = null,
  mo = !1,
  Ot = null,
  ni = 0,
  Cr = 0,
  mu = null,
  No = -1,
  To = 0;
function ye() {
  return j & 6 ? te() : No !== -1 ? No : (No = te());
}
function zt(e) {
  return e.mode & 1
    ? j & 2 && ae !== 0
      ? ae & -ae
      : Cv.transition !== null
      ? (To === 0 && (To = Kc()), To)
      : ((e = B),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Jc(e.type))),
        e)
    : 1;
}
function Ye(e, t, n, r) {
  if (50 < Cr) throw ((Cr = 0), (mu = null), Error(N(185)));
  Hr(e, n, r),
    (!(j & 2) || e !== ue) &&
      (e === ue && (!(j & 2) && (Ei |= n), ie === 4 && Nt(e, ae)),
      Pe(e, r),
      n === 1 && j === 0 && !(t.mode & 1) && ((Gn = te() + 500), yi && Qt()));
}
function Pe(e, t) {
  var n = e.callbackNode;
  Ch(e, t);
  var r = Uo(e, e === ue ? ae : 0);
  if (r === 0)
    n !== null && Zs(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && Zs(n), t === 1))
      e.tag === 0 ? Ev(Va.bind(null, e)) : yf(Va.bind(null, e)),
        yv(function () {
          !(j & 6) && Qt();
        }),
        (n = null);
    else {
      switch (Gc(r)) {
        case 1:
          n = Au;
          break;
        case 4:
          n = Vc;
          break;
        case 16:
          n = zo;
          break;
        case 536870912:
          n = Hc;
          break;
        default:
          n = zo;
      }
      n = vd(n, ad.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function ad(e, t) {
  if (((No = -1), (To = 0), j & 6)) throw Error(N(327));
  var n = e.callbackNode;
  if (jn() && e.callbackNode !== n) return null;
  var r = Uo(e, e === ue ? ae : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ri(e, r);
  else {
    t = r;
    var o = j;
    j |= 2;
    var i = fd();
    (ue !== e || ae !== t) && ((at = null), (Gn = te() + 500), en(e, t));
    do
      try {
        Vv();
        break;
      } catch (u) {
        cd(e, u);
      }
    while (!0);
    Gu(),
      (ei.current = i),
      (j = o),
      ne !== null ? (t = 0) : ((ue = null), (ae = 0), (t = ie));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((o = Bl(e)), o !== 0 && ((r = o), (t = hu(e, o)))), t === 1)
    )
      throw ((n = $r), en(e, 0), Nt(e, r), Pe(e, te()), n);
    if (t === 6) Nt(e, r);
    else {
      if (
        ((o = e.current.alternate),
        !(r & 30) &&
          !Bv(o) &&
          ((t = ri(e, r)),
          t === 2 && ((i = Bl(e)), i !== 0 && ((r = i), (t = hu(e, i)))),
          t === 1))
      )
        throw ((n = $r), en(e, 0), Nt(e, r), Pe(e, te()), n);
      switch (((e.finishedWork = o), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(N(345));
        case 2:
          bt(e, xe, at);
          break;
        case 3:
          if (
            (Nt(e, r), (r & 130023424) === r && ((t = us + 500 - te()), 10 < t))
          ) {
            if (Uo(e, 0) !== 0) break;
            if (((o = e.suspendedLanes), (o & r) !== r)) {
              ye(), (e.pingedLanes |= e.suspendedLanes & o);
              break;
            }
            e.timeoutHandle = Xl(bt.bind(null, e, xe, at), t);
            break;
          }
          bt(e, xe, at);
          break;
        case 4:
          if ((Nt(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, o = -1; 0 < r; ) {
            var l = 31 - Qe(r);
            (i = 1 << l), (l = t[l]), l > o && (o = l), (r &= ~i);
          }
          if (
            ((r = o),
            (r = te() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * $v(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Xl(bt.bind(null, e, xe, at), r);
            break;
          }
          bt(e, xe, at);
          break;
        case 5:
          bt(e, xe, at);
          break;
        default:
          throw Error(N(329));
      }
    }
  }
  return Pe(e, te()), e.callbackNode === n ? ad.bind(null, e) : null;
}
function hu(e, t) {
  var n = Er;
  return (
    e.current.memoizedState.isDehydrated && (en(e, t).flags |= 256),
    (e = ri(e, t)),
    e !== 2 && ((t = xe), (xe = n), t !== null && vu(t)),
    e
  );
}
function vu(e) {
  xe === null ? (xe = e) : xe.push.apply(xe, e);
}
function Bv(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            i = o.getSnapshot;
          o = o.value;
          try {
            if (!Xe(i(), o)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function Nt(e, t) {
  for (
    t &= ~ls,
      t &= ~Ei,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Qe(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Va(e) {
  if (j & 6) throw Error(N(327));
  jn();
  var t = Uo(e, 0);
  if (!(t & 1)) return Pe(e, te()), null;
  var n = ri(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Bl(e);
    r !== 0 && ((t = r), (n = hu(e, r)));
  }
  if (n === 1) throw ((n = $r), en(e, 0), Nt(e, t), Pe(e, te()), n);
  if (n === 6) throw Error(N(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    bt(e, xe, at),
    Pe(e, te()),
    null
  );
}
function ss(e, t) {
  var n = j;
  j |= 1;
  try {
    return e(t);
  } finally {
    (j = n), j === 0 && ((Gn = te() + 500), yi && Qt());
  }
}
function sn(e) {
  Ot !== null && Ot.tag === 0 && !(j & 6) && jn();
  var t = j;
  j |= 1;
  var n = Ue.transition,
    r = B;
  try {
    if (((Ue.transition = null), (B = 1), e)) return e();
  } finally {
    (B = r), (Ue.transition = n), (j = t), !(j & 6) && Qt();
  }
}
function as() {
  (Re = On.current), Q(On);
}
function en(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), gv(n)), ne !== null))
    for (n = ne.return; n !== null; ) {
      var r = n;
      switch ((Vu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Ho();
          break;
        case 3:
          Hn(), Q(Ce), Q(he), Ju();
          break;
        case 5:
          Zu(r);
          break;
        case 4:
          Hn();
          break;
        case 13:
          Q(Z);
          break;
        case 19:
          Q(Z);
          break;
        case 10:
          Qu(r.type._context);
          break;
        case 22:
        case 23:
          as();
      }
      n = n.return;
    }
  if (
    ((ue = e),
    (ne = e = Ut(e.current, null)),
    (ae = Re = t),
    (ie = 0),
    ($r = null),
    (ls = Ei = un = 0),
    (xe = Er = null),
    Jt !== null)
  ) {
    for (t = 0; t < Jt.length; t++)
      if (((n = Jt[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var o = r.next,
          i = n.pending;
        if (i !== null) {
          var l = i.next;
          (i.next = o), (r.next = l);
        }
        n.pending = r;
      }
    Jt = null;
  }
  return e;
}
function cd(e, t) {
  do {
    var n = ne;
    try {
      if ((Gu(), (ko.current = qo), Jo)) {
        for (var r = J.memoizedState; r !== null; ) {
          var o = r.queue;
          o !== null && (o.pending = null), (r = r.next);
        }
        Jo = !1;
      }
      if (
        ((ln = 0),
        (le = oe = J = null),
        (Sr = !1),
        (jr = 0),
        (is.current = null),
        n === null || n.return === null)
      ) {
        (ie = 1), ($r = t), (ne = null);
        break;
      }
      e: {
        var i = e,
          l = n.return,
          u = n,
          s = t;
        if (
          ((t = ae),
          (u.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var a = s,
            f = u,
            c = f.tag;
          if (!(f.mode & 1) && (c === 0 || c === 11 || c === 15)) {
            var m = f.alternate;
            m
              ? ((f.updateQueue = m.updateQueue),
                (f.memoizedState = m.memoizedState),
                (f.lanes = m.lanes))
              : ((f.updateQueue = null), (f.memoizedState = null));
          }
          var g = Ta(l);
          if (g !== null) {
            (g.flags &= -257),
              Oa(g, l, u, i, t),
              g.mode & 1 && Na(i, a, t),
              (t = g),
              (s = a);
            var w = t.updateQueue;
            if (w === null) {
              var y = new Set();
              y.add(s), (t.updateQueue = y);
            } else w.add(s);
            break e;
          } else {
            if (!(t & 1)) {
              Na(i, a, t), cs();
              break e;
            }
            s = Error(N(426));
          }
        } else if (X && u.mode & 1) {
          var x = Ta(l);
          if (x !== null) {
            !(x.flags & 65536) && (x.flags |= 256),
              Oa(x, l, u, i, t),
              Hu(Kn(s, u));
            break e;
          }
        }
        (i = s = Kn(s, u)),
          ie !== 4 && (ie = 2),
          Er === null ? (Er = [i]) : Er.push(i),
          (i = l);
        do {
          switch (i.tag) {
            case 3:
              (i.flags |= 65536), (t &= -t), (i.lanes |= t);
              var d = Qf(i, s, t);
              Ca(i, d);
              break e;
            case 1:
              u = s;
              var p = i.type,
                v = i.stateNode;
              if (
                !(i.flags & 128) &&
                (typeof p.getDerivedStateFromError == "function" ||
                  (v !== null &&
                    typeof v.componentDidCatch == "function" &&
                    (jt === null || !jt.has(v))))
              ) {
                (i.flags |= 65536), (t &= -t), (i.lanes |= t);
                var S = Yf(i, u, t);
                Ca(i, S);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      pd(n);
    } catch (E) {
      (t = E), ne === n && n !== null && (ne = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function fd() {
  var e = ei.current;
  return (ei.current = qo), e === null ? qo : e;
}
function cs() {
  (ie === 0 || ie === 3 || ie === 2) && (ie = 4),
    ue === null || (!(un & 268435455) && !(Ei & 268435455)) || Nt(ue, ae);
}
function ri(e, t) {
  var n = j;
  j |= 2;
  var r = fd();
  (ue !== e || ae !== t) && ((at = null), en(e, t));
  do
    try {
      Wv();
      break;
    } catch (o) {
      cd(e, o);
    }
  while (!0);
  if ((Gu(), (j = n), (ei.current = r), ne !== null)) throw Error(N(261));
  return (ue = null), (ae = 0), ie;
}
function Wv() {
  for (; ne !== null; ) dd(ne);
}
function Vv() {
  for (; ne !== null && !mh(); ) dd(ne);
}
function dd(e) {
  var t = hd(e.alternate, e, Re);
  (e.memoizedProps = e.pendingProps),
    t === null ? pd(e) : (ne = t),
    (is.current = null);
}
function pd(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = Fv(n, t)), n !== null)) {
        (n.flags &= 32767), (ne = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ie = 6), (ne = null);
        return;
      }
    } else if (((n = Lv(n, t, Re)), n !== null)) {
      ne = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ne = t;
      return;
    }
    ne = t = e;
  } while (t !== null);
  ie === 0 && (ie = 5);
}
function bt(e, t, n) {
  var r = B,
    o = Ue.transition;
  try {
    (Ue.transition = null), (B = 1), Hv(e, t, n, r);
  } finally {
    (Ue.transition = o), (B = r);
  }
  return null;
}
function Hv(e, t, n, r) {
  do jn();
  while (Ot !== null);
  if (j & 6) throw Error(N(327));
  n = e.finishedWork;
  var o = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(N(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var i = n.lanes | n.childLanes;
  if (
    (_h(e, i),
    e === ue && ((ne = ue = null), (ae = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      mo ||
      ((mo = !0),
      vd(zo, function () {
        return jn(), null;
      })),
    (i = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || i)
  ) {
    (i = Ue.transition), (Ue.transition = null);
    var l = B;
    B = 1;
    var u = j;
    (j |= 4),
      (is.current = null),
      zv(e, n),
      ud(n, e),
      cv(Ql),
      ($o = !!Gl),
      (Ql = Gl = null),
      (e.current = n),
      Uv(n),
      hh(),
      (j = u),
      (B = l),
      (Ue.transition = i);
  } else e.current = n;
  if (
    (mo && ((mo = !1), (Ot = e), (ni = o)),
    (i = e.pendingLanes),
    i === 0 && (jt = null),
    yh(n.stateNode),
    Pe(e, te()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (o = t[n]), r(o.value, { componentStack: o.stack, digest: o.digest });
  if (ti) throw ((ti = !1), (e = pu), (pu = null), e);
  return (
    ni & 1 && e.tag !== 0 && jn(),
    (i = e.pendingLanes),
    i & 1 ? (e === mu ? Cr++ : ((Cr = 0), (mu = e))) : (Cr = 0),
    Qt(),
    null
  );
}
function jn() {
  if (Ot !== null) {
    var e = Gc(ni),
      t = Ue.transition,
      n = B;
    try {
      if (((Ue.transition = null), (B = 16 > e ? 16 : e), Ot === null))
        var r = !1;
      else {
        if (((e = Ot), (Ot = null), (ni = 0), j & 6)) throw Error(N(331));
        var o = j;
        for (j |= 4, O = e.current; O !== null; ) {
          var i = O,
            l = i.child;
          if (O.flags & 16) {
            var u = i.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (O = a; O !== null; ) {
                  var f = O;
                  switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      xr(8, f, i);
                  }
                  var c = f.child;
                  if (c !== null) (c.return = f), (O = c);
                  else
                    for (; O !== null; ) {
                      f = O;
                      var m = f.sibling,
                        g = f.return;
                      if ((od(f), f === a)) {
                        O = null;
                        break;
                      }
                      if (m !== null) {
                        (m.return = g), (O = m);
                        break;
                      }
                      O = g;
                    }
                }
              }
              var w = i.alternate;
              if (w !== null) {
                var y = w.child;
                if (y !== null) {
                  w.child = null;
                  do {
                    var x = y.sibling;
                    (y.sibling = null), (y = x);
                  } while (y !== null);
                }
              }
              O = i;
            }
          }
          if (i.subtreeFlags & 2064 && l !== null) (l.return = i), (O = l);
          else
            e: for (; O !== null; ) {
              if (((i = O), i.flags & 2048))
                switch (i.tag) {
                  case 0:
                  case 11:
                  case 15:
                    xr(9, i, i.return);
                }
              var d = i.sibling;
              if (d !== null) {
                (d.return = i.return), (O = d);
                break e;
              }
              O = i.return;
            }
        }
        var p = e.current;
        for (O = p; O !== null; ) {
          l = O;
          var v = l.child;
          if (l.subtreeFlags & 2064 && v !== null) (v.return = l), (O = v);
          else
            e: for (l = p; O !== null; ) {
              if (((u = O), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      xi(9, u);
                  }
                } catch (E) {
                  ee(u, u.return, E);
                }
              if (u === l) {
                O = null;
                break e;
              }
              var S = u.sibling;
              if (S !== null) {
                (S.return = u.return), (O = S);
                break e;
              }
              O = u.return;
            }
        }
        if (
          ((j = o), Qt(), ot && typeof ot.onPostCommitFiberRoot == "function")
        )
          try {
            ot.onPostCommitFiberRoot(pi, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (B = n), (Ue.transition = t);
    }
  }
  return !1;
}
function Ha(e, t, n) {
  (t = Kn(n, t)),
    (t = Qf(e, t, 1)),
    (e = Ft(e, t, 1)),
    (t = ye()),
    e !== null && (Hr(e, 1, t), Pe(e, t));
}
function ee(e, t, n) {
  if (e.tag === 3) Ha(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Ha(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (jt === null || !jt.has(r)))
        ) {
          (e = Kn(n, e)),
            (e = Yf(t, e, 1)),
            (t = Ft(t, e, 1)),
            (e = ye()),
            t !== null && (Hr(t, 1, e), Pe(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function Kv(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = ye()),
    (e.pingedLanes |= e.suspendedLanes & n),
    ue === e &&
      (ae & n) === n &&
      (ie === 4 || (ie === 3 && (ae & 130023424) === ae && 500 > te() - us)
        ? en(e, 0)
        : (ls |= n)),
    Pe(e, t);
}
function md(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = ro), (ro <<= 1), !(ro & 130023424) && (ro = 4194304))
      : (t = 1));
  var n = ye();
  (e = vt(e, t)), e !== null && (Hr(e, t, n), Pe(e, n));
}
function Gv(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), md(e, n);
}
function Qv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        o = e.memoizedState;
      o !== null && (n = o.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(N(314));
  }
  r !== null && r.delete(t), md(e, n);
}
var hd;
hd = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || Ce.current) Ee = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Ee = !1), Iv(e, t, n);
      Ee = !!(e.flags & 131072);
    }
  else (Ee = !1), X && t.flags & 1048576 && wf(t, Qo, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      Mo(e, t), (e = t.pendingProps);
      var o = Bn(t, he.current);
      Fn(t, n), (o = es(null, t, r, e, o, n));
      var i = ts();
      return (
        (t.flags |= 1),
        typeof o == "object" &&
        o !== null &&
        typeof o.render == "function" &&
        o.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            _e(r) ? ((i = !0), Ko(t)) : (i = !1),
            (t.memoizedState =
              o.state !== null && o.state !== void 0 ? o.state : null),
            Xu(t),
            (o.updater = Si),
            (t.stateNode = o),
            (o._reactInternals = t),
            nu(t, r, e, n),
            (t = iu(null, t, r, !0, i, n)))
          : ((t.tag = 0), X && i && Wu(t), ge(null, t, o, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (Mo(e, t),
          (e = t.pendingProps),
          (o = r._init),
          (r = o(r._payload)),
          (t.type = r),
          (o = t.tag = Xv(r)),
          (e = He(r, e)),
          o)
        ) {
          case 0:
            t = ou(null, t, r, e, n);
            break e;
          case 1:
            t = Ia(null, t, r, e, n);
            break e;
          case 11:
            t = Da(null, t, r, e, n);
            break e;
          case 14:
            t = Aa(null, t, r, He(r.type, e), n);
            break e;
        }
        throw Error(N(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        ou(e, t, r, o, n)
      );
    case 1:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        Ia(e, t, r, o, n)
      );
    case 3:
      e: {
        if ((Jf(t), e === null)) throw Error(N(387));
        (r = t.pendingProps),
          (i = t.memoizedState),
          (o = i.element),
          Pf(e, t),
          bo(t, r, null, n);
        var l = t.memoizedState;
        if (((r = l.element), i.isDehydrated))
          if (
            ((i = {
              element: r,
              isDehydrated: !1,
              cache: l.cache,
              pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
              transitions: l.transitions,
            }),
            (t.updateQueue.baseState = i),
            (t.memoizedState = i),
            t.flags & 256)
          ) {
            (o = Kn(Error(N(423)), t)), (t = La(e, t, r, n, o));
            break e;
          } else if (r !== o) {
            (o = Kn(Error(N(424)), t)), (t = La(e, t, r, n, o));
            break e;
          } else
            for (
              Ne = Lt(t.stateNode.containerInfo.firstChild),
                Te = t,
                X = !0,
                Ge = null,
                n = Cf(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((Wn(), r === o)) {
            t = gt(e, t, n);
            break e;
          }
          ge(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        kf(t),
        e === null && ql(t),
        (r = t.type),
        (o = t.pendingProps),
        (i = e !== null ? e.memoizedProps : null),
        (l = o.children),
        Yl(r, o) ? (l = null) : i !== null && Yl(r, i) && (t.flags |= 32),
        Zf(e, t),
        ge(e, t, l, n),
        t.child
      );
    case 6:
      return e === null && ql(t), null;
    case 13:
      return qf(e, t, n);
    case 4:
      return (
        bu(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = Vn(t, null, r, n)) : ge(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        Da(e, t, r, o, n)
      );
    case 7:
      return ge(e, t, t.pendingProps, n), t.child;
    case 8:
      return ge(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return ge(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (o = t.pendingProps),
          (i = t.memoizedProps),
          (l = o.value),
          H(Yo, r._currentValue),
          (r._currentValue = l),
          i !== null)
        )
          if (Xe(i.value, l)) {
            if (i.children === o.children && !Ce.current) {
              t = gt(e, t, n);
              break e;
            }
          } else
            for (i = t.child, i !== null && (i.return = t); i !== null; ) {
              var u = i.dependencies;
              if (u !== null) {
                l = i.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (i.tag === 1) {
                      (s = pt(-1, n & -n)), (s.tag = 2);
                      var a = i.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var f = a.pending;
                        f === null
                          ? (s.next = s)
                          : ((s.next = f.next), (f.next = s)),
                          (a.pending = s);
                      }
                    }
                    (i.lanes |= n),
                      (s = i.alternate),
                      s !== null && (s.lanes |= n),
                      eu(i.return, n, t),
                      (u.lanes |= n);
                    break;
                  }
                  s = s.next;
                }
              } else if (i.tag === 10) l = i.type === t.type ? null : i.child;
              else if (i.tag === 18) {
                if (((l = i.return), l === null)) throw Error(N(341));
                (l.lanes |= n),
                  (u = l.alternate),
                  u !== null && (u.lanes |= n),
                  eu(l, n, t),
                  (l = i.sibling);
              } else l = i.child;
              if (l !== null) l.return = i;
              else
                for (l = i; l !== null; ) {
                  if (l === t) {
                    l = null;
                    break;
                  }
                  if (((i = l.sibling), i !== null)) {
                    (i.return = l.return), (l = i);
                    break;
                  }
                  l = l.return;
                }
              i = l;
            }
        ge(e, t, o.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (o = t.type),
        (r = t.pendingProps.children),
        Fn(t, n),
        (o = Be(o)),
        (r = r(o)),
        (t.flags |= 1),
        ge(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (o = He(r, t.pendingProps)),
        (o = He(r.type, o)),
        Aa(e, t, r, o, n)
      );
    case 15:
      return Xf(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (o = t.pendingProps),
        (o = t.elementType === r ? o : He(r, o)),
        Mo(e, t),
        (t.tag = 1),
        _e(r) ? ((e = !0), Ko(t)) : (e = !1),
        Fn(t, n),
        Gf(t, r, o),
        nu(t, r, o, n),
        iu(null, t, r, !0, e, n)
      );
    case 19:
      return ed(e, t, n);
    case 22:
      return bf(e, t, n);
  }
  throw Error(N(156, t.tag));
};
function vd(e, t) {
  return Wc(e, t);
}
function Yv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ze(e, t, n, r) {
  return new Yv(e, t, n, r);
}
function fs(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function Xv(e) {
  if (typeof e == "function") return fs(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Tu)) return 11;
    if (e === Ou) return 14;
  }
  return 2;
}
function Ut(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ze(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function Oo(e, t, n, r, o, i) {
  var l = 2;
  if (((r = e), typeof e == "function")) fs(e) && (l = 1);
  else if (typeof e == "string") l = 5;
  else
    e: switch (e) {
      case xn:
        return tn(n.children, o, i, t);
      case Nu:
        (l = 8), (o |= 8);
        break;
      case kl:
        return (
          (e = ze(12, n, t, o | 2)), (e.elementType = kl), (e.lanes = i), e
        );
      case Rl:
        return (e = ze(13, n, t, o)), (e.elementType = Rl), (e.lanes = i), e;
      case Ml:
        return (e = ze(19, n, t, o)), (e.elementType = Ml), (e.lanes = i), e;
      case Pc:
        return Ci(n, o, i, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Cc:
              l = 10;
              break e;
            case _c:
              l = 9;
              break e;
            case Tu:
              l = 11;
              break e;
            case Ou:
              l = 14;
              break e;
            case kt:
              (l = 16), (r = null);
              break e;
          }
        throw Error(N(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ze(l, n, t, o)), (t.elementType = e), (t.type = r), (t.lanes = i), t
  );
}
function tn(e, t, n, r) {
  return (e = ze(7, e, r, t)), (e.lanes = n), e;
}
function Ci(e, t, n, r) {
  return (
    (e = ze(22, e, r, t)),
    (e.elementType = Pc),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function pl(e, t, n) {
  return (e = ze(6, e, null, t)), (e.lanes = n), e;
}
function ml(e, t, n) {
  return (
    (t = ze(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function bv(e, t, n, r, o) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Yi(0)),
    (this.expirationTimes = Yi(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Yi(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = o),
    (this.mutableSourceEagerHydrationData = null);
}
function ds(e, t, n, r, o, i, l, u, s) {
  return (
    (e = new bv(e, t, n, u, s)),
    t === 1 ? ((t = 1), i === !0 && (t |= 8)) : (t = 0),
    (i = ze(3, null, null, t)),
    (e.current = i),
    (i.stateNode = e),
    (i.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    Xu(i),
    e
  );
}
function Zv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: Sn,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function gd(e) {
  if (!e) return Bt;
  e = e._reactInternals;
  e: {
    if (dn(e) !== e || e.tag !== 1) throw Error(N(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (_e(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(N(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (_e(n)) return gf(e, n, t);
  }
  return t;
}
function yd(e, t, n, r, o, i, l, u, s) {
  return (
    (e = ds(n, r, !0, e, o, i, l, u, s)),
    (e.context = gd(null)),
    (n = e.current),
    (r = ye()),
    (o = zt(n)),
    (i = pt(r, o)),
    (i.callback = t ?? null),
    Ft(n, i, o),
    (e.current.lanes = o),
    Hr(e, o, r),
    Pe(e, r),
    e
  );
}
function _i(e, t, n, r) {
  var o = t.current,
    i = ye(),
    l = zt(o);
  return (
    (n = gd(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = pt(i, l)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Ft(o, t, l)),
    e !== null && (Ye(e, o, l, i), Po(e, o, l)),
    l
  );
}
function oi(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ka(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function ps(e, t) {
  Ka(e, t), (e = e.alternate) && Ka(e, t);
}
function Jv() {
  return null;
}
var wd =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ms(e) {
  this._internalRoot = e;
}
Pi.prototype.render = ms.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(N(409));
  _i(e, t, null, null);
};
Pi.prototype.unmount = ms.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    sn(function () {
      _i(null, e, null, null);
    }),
      (t[ht] = null);
  }
};
function Pi(e) {
  this._internalRoot = e;
}
Pi.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Xc();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < Mt.length && t !== 0 && t < Mt[n].priority; n++);
    Mt.splice(n, 0, e), n === 0 && Zc(e);
  }
};
function hs(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function ki(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Ga() {}
function qv(e, t, n, r, o) {
  if (o) {
    if (typeof r == "function") {
      var i = r;
      r = function () {
        var a = oi(l);
        i.call(a);
      };
    }
    var l = yd(t, r, e, 0, null, !1, !1, "", Ga);
    return (
      (e._reactRootContainer = l),
      (e[ht] = l.current),
      Dr(e.nodeType === 8 ? e.parentNode : e),
      sn(),
      l
    );
  }
  for (; (o = e.lastChild); ) e.removeChild(o);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var a = oi(s);
      u.call(a);
    };
  }
  var s = ds(e, 0, !1, null, null, !1, !1, "", Ga);
  return (
    (e._reactRootContainer = s),
    (e[ht] = s.current),
    Dr(e.nodeType === 8 ? e.parentNode : e),
    sn(function () {
      _i(t, s, n, r);
    }),
    s
  );
}
function Ri(e, t, n, r, o) {
  var i = n._reactRootContainer;
  if (i) {
    var l = i;
    if (typeof o == "function") {
      var u = o;
      o = function () {
        var s = oi(l);
        u.call(s);
      };
    }
    _i(t, l, e, o);
  } else l = qv(n, t, e, o, r);
  return oi(l);
}
Qc = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = dr(t.pendingLanes);
        n !== 0 &&
          (Iu(t, n | 1), Pe(t, te()), !(j & 6) && ((Gn = te() + 500), Qt()));
      }
      break;
    case 13:
      sn(function () {
        var r = vt(e, 1);
        if (r !== null) {
          var o = ye();
          Ye(r, e, 1, o);
        }
      }),
        ps(e, 1);
  }
};
Lu = function (e) {
  if (e.tag === 13) {
    var t = vt(e, 134217728);
    if (t !== null) {
      var n = ye();
      Ye(t, e, 134217728, n);
    }
    ps(e, 134217728);
  }
};
Yc = function (e) {
  if (e.tag === 13) {
    var t = zt(e),
      n = vt(e, t);
    if (n !== null) {
      var r = ye();
      Ye(n, e, t, r);
    }
    ps(e, t);
  }
};
Xc = function () {
  return B;
};
bc = function (e, t) {
  var n = B;
  try {
    return (B = e), t();
  } finally {
    B = n;
  }
};
zl = function (e, t, n) {
  switch (t) {
    case "input":
      if ((Ol(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var o = gi(r);
            if (!o) throw Error(N(90));
            Rc(r), Ol(r, o);
          }
        }
      }
      break;
    case "textarea":
      Nc(e, n);
      break;
    case "select":
      (t = n.value), t != null && Dn(e, !!n.multiple, t, !1);
  }
};
Fc = ss;
jc = sn;
var eg = { usingClientEntryPoint: !1, Events: [Gr, Pn, gi, Ic, Lc, ss] },
  ar = {
    findFiberByHostInstance: Zt,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  tg = {
    bundleType: ar.bundleType,
    version: ar.version,
    rendererPackageName: ar.rendererPackageName,
    rendererConfig: ar.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: xt.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = $c(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: ar.findFiberByHostInstance || Jv,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ho = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ho.isDisabled && ho.supportsFiber)
    try {
      (pi = ho.inject(tg)), (ot = ho);
    } catch {}
}
Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = eg;
Ae.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!hs(t)) throw Error(N(200));
  return Zv(e, t, null, n);
};
Ae.createRoot = function (e, t) {
  if (!hs(e)) throw Error(N(299));
  var n = !1,
    r = "",
    o = wd;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (t = ds(e, 1, !1, null, null, n, !1, r, o)),
    (e[ht] = t.current),
    Dr(e.nodeType === 8 ? e.parentNode : e),
    new ms(t)
  );
};
Ae.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(N(188))
      : ((e = Object.keys(e).join(",")), Error(N(268, e)));
  return (e = $c(t)), (e = e === null ? null : e.stateNode), e;
};
Ae.flushSync = function (e) {
  return sn(e);
};
Ae.hydrate = function (e, t, n) {
  if (!ki(t)) throw Error(N(200));
  return Ri(null, e, t, !0, n);
};
Ae.hydrateRoot = function (e, t, n) {
  if (!hs(e)) throw Error(N(405));
  var r = (n != null && n.hydratedSources) || null,
    o = !1,
    i = "",
    l = wd;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (o = !0),
      n.identifierPrefix !== void 0 && (i = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (l = n.onRecoverableError)),
    (t = yd(t, null, e, 1, n ?? null, o, !1, i, l)),
    (e[ht] = t.current),
    Dr(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (o = n._getVersion),
        (o = o(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, o])
          : t.mutableSourceEagerHydrationData.push(n, o);
  return new Pi(t);
};
Ae.render = function (e, t, n) {
  if (!ki(t)) throw Error(N(200));
  return Ri(null, e, t, !1, n);
};
Ae.unmountComponentAtNode = function (e) {
  if (!ki(e)) throw Error(N(40));
  return e._reactRootContainer
    ? (sn(function () {
        Ri(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[ht] = null);
        });
      }),
      !0)
    : !1;
};
Ae.unstable_batchedUpdates = ss;
Ae.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!ki(n)) throw Error(N(200));
  if (e == null || e._reactInternals === void 0) throw Error(N(38));
  return Ri(e, t, n, !1, r);
};
Ae.version = "18.3.1-next-f1338f8080-20240426";
function Sd() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Sd);
    } catch (e) {
      console.error(e);
    }
}
Sd(), (wc.exports = Ae);
var vs = wc.exports;
const ng = Zm(vs);
function I(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function (o) {
    if ((e?.(o), n === !1 || !o.defaultPrevented)) return t?.(o);
  };
}
function Qa(e, t) {
  if (typeof e == "function") return e(t);
  e != null && (e.current = t);
}
function Mi(...e) {
  return (t) => {
    let n = !1;
    const r = e.map((o) => {
      const i = Qa(o, t);
      return !n && typeof i == "function" && (n = !0), i;
    });
    if (n)
      return () => {
        for (let o = 0; o < r.length; o++) {
          const i = r[o];
          typeof i == "function" ? i() : Qa(e[o], null);
        }
      };
  };
}
function fe(...e) {
  return h.useCallback(Mi(...e), e);
}
function rg(e, t) {
  const n = h.createContext(t),
    r = (i) => {
      const { children: l, ...u } = i,
        s = h.useMemo(() => u, Object.values(u));
      return C.jsx(n.Provider, { value: s, children: l });
    };
  r.displayName = e + "Provider";
  function o(i) {
    const l = h.useContext(n);
    if (l) return l;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function pn(e, t = []) {
  let n = [];
  function r(i, l) {
    const u = h.createContext(l),
      s = n.length;
    n = [...n, l];
    const a = (c) => {
      const { scope: m, children: g, ...w } = c,
        y = m?.[e]?.[s] || u,
        x = h.useMemo(() => w, Object.values(w));
      return C.jsx(y.Provider, { value: x, children: g });
    };
    a.displayName = i + "Provider";
    function f(c, m) {
      const g = m?.[e]?.[s] || u,
        w = h.useContext(g);
      if (w) return w;
      if (l !== void 0) return l;
      throw new Error(`\`${c}\` must be used within \`${i}\``);
    }
    return [a, f];
  }
  const o = () => {
    const i = n.map((l) => h.createContext(l));
    return function (u) {
      const s = u?.[e] || i;
      return h.useMemo(() => ({ [`__scope${e}`]: { ...u, [e]: s } }), [u, s]);
    };
  };
  return (o.scopeName = e), [r, og(o, ...t)];
}
function og(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({ useScope: o(), scopeName: o.scopeName }));
    return function (i) {
      const l = r.reduce((u, { useScope: s, scopeName: a }) => {
        const c = s(i)[`__scope${a}`];
        return { ...u, ...c };
      }, {});
      return h.useMemo(() => ({ [`__scope${t.scopeName}`]: l }), [l]);
    };
  };
  return (n.scopeName = t.scopeName), n;
}
function Qn(e) {
  const t = ig(e),
    n = h.forwardRef((r, o) => {
      const { children: i, ...l } = r,
        u = h.Children.toArray(i),
        s = u.find(lg);
      if (s) {
        const a = s.props.children,
          f = u.map((c) =>
            c === s
              ? h.Children.count(a) > 1
                ? h.Children.only(null)
                : h.isValidElement(a)
                ? a.props.children
                : null
              : c
          );
        return C.jsx(t, {
          ...l,
          ref: o,
          children: h.isValidElement(a) ? h.cloneElement(a, void 0, f) : null,
        });
      }
      return C.jsx(t, { ...l, ref: o, children: i });
    });
  return (n.displayName = `${e}.Slot`), n;
}
var y1 = Qn("Slot");
function ig(e) {
  const t = h.forwardRef((n, r) => {
    const { children: o, ...i } = n;
    if (h.isValidElement(o)) {
      const l = sg(o),
        u = ug(i, o.props);
      return (
        o.type !== h.Fragment && (u.ref = r ? Mi(r, l) : l),
        h.cloneElement(o, u)
      );
    }
    return h.Children.count(o) > 1 ? h.Children.only(null) : null;
  });
  return (t.displayName = `${e}.SlotClone`), t;
}
var xd = Symbol("radix.slottable");
function w1(e) {
  const t = ({ children: n }) => C.jsx(C.Fragment, { children: n });
  return (t.displayName = `${e}.Slottable`), (t.__radixId = xd), t;
}
function lg(e) {
  return (
    h.isValidElement(e) &&
    typeof e.type == "function" &&
    "__radixId" in e.type &&
    e.type.__radixId === xd
  );
}
function ug(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r],
      i = t[r];
    /^on[A-Z]/.test(r)
      ? o && i
        ? (n[r] = (...u) => {
            const s = i(...u);
            return o(...u), s;
          })
        : o && (n[r] = o)
      : r === "style"
      ? (n[r] = { ...o, ...i })
      : r === "className" && (n[r] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function sg(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
function Ed(e) {
  const t = e + "CollectionProvider",
    [n, r] = pn(t),
    [o, i] = n(t, { collectionRef: { current: null }, itemMap: new Map() }),
    l = (y) => {
      const { scope: x, children: d } = y,
        p = Yt.useRef(null),
        v = Yt.useRef(new Map()).current;
      return C.jsx(o, { scope: x, itemMap: v, collectionRef: p, children: d });
    };
  l.displayName = t;
  const u = e + "CollectionSlot",
    s = Qn(u),
    a = Yt.forwardRef((y, x) => {
      const { scope: d, children: p } = y,
        v = i(u, d),
        S = fe(x, v.collectionRef);
      return C.jsx(s, { ref: S, children: p });
    });
  a.displayName = u;
  const f = e + "CollectionItemSlot",
    c = "data-radix-collection-item",
    m = Qn(f),
    g = Yt.forwardRef((y, x) => {
      const { scope: d, children: p, ...v } = y,
        S = Yt.useRef(null),
        E = fe(x, S),
        k = i(f, d);
      return (
        Yt.useEffect(
          () => (
            k.itemMap.set(S, { ref: S, ...v }), () => void k.itemMap.delete(S)
          )
        ),
        C.jsx(m, { [c]: "", ref: E, children: p })
      );
    });
  g.displayName = f;
  function w(y) {
    const x = i(e + "CollectionConsumer", y);
    return Yt.useCallback(() => {
      const p = x.collectionRef.current;
      if (!p) return [];
      const v = Array.from(p.querySelectorAll(`[${c}]`));
      return Array.from(x.itemMap.values()).sort(
        (k, _) => v.indexOf(k.ref.current) - v.indexOf(_.ref.current)
      );
    }, [x.collectionRef, x.itemMap]);
  }
  return [{ Provider: l, Slot: a, ItemSlot: g }, w, r];
}
var ag = [
    "a",
    "button",
    "div",
    "form",
    "h2",
    "h3",
    "img",
    "input",
    "label",
    "li",
    "nav",
    "ol",
    "p",
    "select",
    "span",
    "svg",
    "ul",
  ],
  b = ag.reduce((e, t) => {
    const n = Qn(`Primitive.${t}`),
      r = h.forwardRef((o, i) => {
        const { asChild: l, ...u } = o,
          s = l ? n : t;
        return (
          typeof window < "u" && (window[Symbol.for("radix-ui")] = !0),
          C.jsx(s, { ...u, ref: i })
        );
      });
    return (r.displayName = `Primitive.${t}`), { ...e, [t]: r };
  }, {});
function Cd(e, t) {
  e && vs.flushSync(() => e.dispatchEvent(t));
}
function yt(e) {
  const t = h.useRef(e);
  return (
    h.useEffect(() => {
      t.current = e;
    }),
    h.useMemo(
      () =>
        (...n) =>
          t.current?.(...n),
      []
    )
  );
}
function cg(e, t = globalThis?.document) {
  const n = yt(e);
  h.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return (
      t.addEventListener("keydown", r, { capture: !0 }),
      () => t.removeEventListener("keydown", r, { capture: !0 })
    );
  }, [n, t]);
}
var fg = "DismissableLayer",
  gu = "dismissableLayer.update",
  dg = "dismissableLayer.pointerDownOutside",
  pg = "dismissableLayer.focusOutside",
  Ya,
  _d = h.createContext({
    layers: new Set(),
    layersWithOutsidePointerEventsDisabled: new Set(),
    branches: new Set(),
  }),
  Ni = h.forwardRef((e, t) => {
    const {
        disableOutsidePointerEvents: n = !1,
        onEscapeKeyDown: r,
        onPointerDownOutside: o,
        onFocusOutside: i,
        onInteractOutside: l,
        onDismiss: u,
        ...s
      } = e,
      a = h.useContext(_d),
      [f, c] = h.useState(null),
      m = f?.ownerDocument ?? globalThis?.document,
      [, g] = h.useState({}),
      w = fe(t, (_) => c(_)),
      y = Array.from(a.layers),
      [x] = [...a.layersWithOutsidePointerEventsDisabled].slice(-1),
      d = y.indexOf(x),
      p = f ? y.indexOf(f) : -1,
      v = a.layersWithOutsidePointerEventsDisabled.size > 0,
      S = p >= d,
      E = hg((_) => {
        const M = _.target,
          A = [...a.branches].some((T) => T.contains(M));
        !S || A || (o?.(_), l?.(_), _.defaultPrevented || u?.());
      }, m),
      k = vg((_) => {
        const M = _.target;
        [...a.branches].some((T) => T.contains(M)) ||
          (i?.(_), l?.(_), _.defaultPrevented || u?.());
      }, m);
    return (
      cg((_) => {
        p === a.layers.size - 1 &&
          (r?.(_), !_.defaultPrevented && u && (_.preventDefault(), u()));
      }, m),
      h.useEffect(() => {
        if (f)
          return (
            n &&
              (a.layersWithOutsidePointerEventsDisabled.size === 0 &&
                ((Ya = m.body.style.pointerEvents),
                (m.body.style.pointerEvents = "none")),
              a.layersWithOutsidePointerEventsDisabled.add(f)),
            a.layers.add(f),
            Xa(),
            () => {
              n &&
                a.layersWithOutsidePointerEventsDisabled.size === 1 &&
                (m.body.style.pointerEvents = Ya);
            }
          );
      }, [f, m, n, a]),
      h.useEffect(
        () => () => {
          f &&
            (a.layers.delete(f),
            a.layersWithOutsidePointerEventsDisabled.delete(f),
            Xa());
        },
        [f, a]
      ),
      h.useEffect(() => {
        const _ = () => g({});
        return (
          document.addEventListener(gu, _),
          () => document.removeEventListener(gu, _)
        );
      }, []),
      C.jsx(b.div, {
        ...s,
        ref: w,
        style: {
          pointerEvents: v ? (S ? "auto" : "none") : void 0,
          ...e.style,
        },
        onFocusCapture: I(e.onFocusCapture, k.onFocusCapture),
        onBlurCapture: I(e.onBlurCapture, k.onBlurCapture),
        onPointerDownCapture: I(e.onPointerDownCapture, E.onPointerDownCapture),
      })
    );
  });
Ni.displayName = fg;
var mg = "DismissableLayerBranch",
  Pd = h.forwardRef((e, t) => {
    const n = h.useContext(_d),
      r = h.useRef(null),
      o = fe(t, r);
    return (
      h.useEffect(() => {
        const i = r.current;
        if (i)
          return (
            n.branches.add(i),
            () => {
              n.branches.delete(i);
            }
          );
      }, [n.branches]),
      C.jsx(b.div, { ...e, ref: o })
    );
  });
Pd.displayName = mg;
function hg(e, t = globalThis?.document) {
  const n = yt(e),
    r = h.useRef(!1),
    o = h.useRef(() => {});
  return (
    h.useEffect(() => {
      const i = (u) => {
          if (u.target && !r.current) {
            let s = function () {
              kd(dg, n, a, { discrete: !0 });
            };
            const a = { originalEvent: u };
            u.pointerType === "touch"
              ? (t.removeEventListener("click", o.current),
                (o.current = s),
                t.addEventListener("click", o.current, { once: !0 }))
              : s();
          } else t.removeEventListener("click", o.current);
          r.current = !1;
        },
        l = window.setTimeout(() => {
          t.addEventListener("pointerdown", i);
        }, 0);
      return () => {
        window.clearTimeout(l),
          t.removeEventListener("pointerdown", i),
          t.removeEventListener("click", o.current);
      };
    }, [t, n]),
    { onPointerDownCapture: () => (r.current = !0) }
  );
}
function vg(e, t = globalThis?.document) {
  const n = yt(e),
    r = h.useRef(!1);
  return (
    h.useEffect(() => {
      const o = (i) => {
        i.target &&
          !r.current &&
          kd(pg, n, { originalEvent: i }, { discrete: !1 });
      };
      return (
        t.addEventListener("focusin", o),
        () => t.removeEventListener("focusin", o)
      );
    }, [t, n]),
    {
      onFocusCapture: () => (r.current = !0),
      onBlurCapture: () => (r.current = !1),
    }
  );
}
function Xa() {
  const e = new CustomEvent(gu);
  document.dispatchEvent(e);
}
function kd(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target,
    i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }),
    r ? Cd(o, i) : o.dispatchEvent(i);
}
var S1 = Ni,
  x1 = Pd,
  Wt = globalThis?.document ? h.useLayoutEffect : () => {},
  gg = "Portal",
  gs = h.forwardRef((e, t) => {
    const { container: n, ...r } = e,
      [o, i] = h.useState(!1);
    Wt(() => i(!0), []);
    const l = n || (o && globalThis?.document?.body);
    return l ? ng.createPortal(C.jsx(b.div, { ...r, ref: t }), l) : null;
  });
gs.displayName = gg;
function yg(e, t) {
  return h.useReducer((n, r) => t[n][r] ?? n, e);
}
var Et = (e) => {
  const { present: t, children: n } = e,
    r = wg(t),
    o =
      typeof n == "function" ? n({ present: r.isPresent }) : h.Children.only(n),
    i = fe(r.ref, Sg(o));
  return typeof n == "function" || r.isPresent
    ? h.cloneElement(o, { ref: i })
    : null;
};
Et.displayName = "Presence";
function wg(e) {
  const [t, n] = h.useState(),
    r = h.useRef(null),
    o = h.useRef(e),
    i = h.useRef("none"),
    l = e ? "mounted" : "unmounted",
    [u, s] = yg(l, {
      mounted: { UNMOUNT: "unmounted", ANIMATION_OUT: "unmountSuspended" },
      unmountSuspended: { MOUNT: "mounted", ANIMATION_END: "unmounted" },
      unmounted: { MOUNT: "mounted" },
    });
  return (
    h.useEffect(() => {
      const a = vo(r.current);
      i.current = u === "mounted" ? a : "none";
    }, [u]),
    Wt(() => {
      const a = r.current,
        f = o.current;
      if (f !== e) {
        const m = i.current,
          g = vo(a);
        e
          ? s("MOUNT")
          : g === "none" || a?.display === "none"
          ? s("UNMOUNT")
          : s(f && m !== g ? "ANIMATION_OUT" : "UNMOUNT"),
          (o.current = e);
      }
    }, [e, s]),
    Wt(() => {
      if (t) {
        let a;
        const f = t.ownerDocument.defaultView ?? window,
          c = (g) => {
            const y = vo(r.current).includes(CSS.escape(g.animationName));
            if (g.target === t && y && (s("ANIMATION_END"), !o.current)) {
              const x = t.style.animationFillMode;
              (t.style.animationFillMode = "forwards"),
                (a = f.setTimeout(() => {
                  t.style.animationFillMode === "forwards" &&
                    (t.style.animationFillMode = x);
                }));
            }
          },
          m = (g) => {
            g.target === t && (i.current = vo(r.current));
          };
        return (
          t.addEventListener("animationstart", m),
          t.addEventListener("animationcancel", c),
          t.addEventListener("animationend", c),
          () => {
            f.clearTimeout(a),
              t.removeEventListener("animationstart", m),
              t.removeEventListener("animationcancel", c),
              t.removeEventListener("animationend", c);
          }
        );
      } else s("ANIMATION_END");
    }, [t, s]),
    {
      isPresent: ["mounted", "unmountSuspended"].includes(u),
      ref: h.useCallback((a) => {
        (r.current = a ? getComputedStyle(a) : null), n(a);
      }, []),
    }
  );
}
function vo(e) {
  return e?.animationName || "none";
}
function Sg(e) {
  let t = Object.getOwnPropertyDescriptor(e.props, "ref")?.get,
    n = t && "isReactWarning" in t && t.isReactWarning;
  return n
    ? e.ref
    : ((t = Object.getOwnPropertyDescriptor(e, "ref")?.get),
      (n = t && "isReactWarning" in t && t.isReactWarning),
      n ? e.props.ref : e.props.ref || e.ref);
}
var xg = yc[" useInsertionEffect ".trim().toString()] || Wt;
function Ti({ prop: e, defaultProp: t, onChange: n = () => {}, caller: r }) {
  const [o, i, l] = Eg({ defaultProp: t, onChange: n }),
    u = e !== void 0,
    s = u ? e : o;
  {
    const f = h.useRef(e !== void 0);
    h.useEffect(() => {
      const c = f.current;
      c !== u &&
        console.warn(
          `${r} is changing from ${c ? "controlled" : "uncontrolled"} to ${
            u ? "controlled" : "uncontrolled"
          }. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
        ),
        (f.current = u);
    }, [u, r]);
  }
  const a = h.useCallback(
    (f) => {
      if (u) {
        const c = Cg(f) ? f(e) : f;
        c !== e && l.current?.(c);
      } else i(f);
    },
    [u, e, i, l]
  );
  return [s, a];
}
function Eg({ defaultProp: e, onChange: t }) {
  const [n, r] = h.useState(e),
    o = h.useRef(n),
    i = h.useRef(t);
  return (
    xg(() => {
      i.current = t;
    }, [t]),
    h.useEffect(() => {
      o.current !== n && (i.current?.(n), (o.current = n));
    }, [n, o]),
    [n, r, i]
  );
}
function Cg(e) {
  return typeof e == "function";
}
var _g = yc[" useId ".trim().toString()] || (() => {}),
  Pg = 0;
function nn(e) {
  const [t, n] = h.useState(_g());
  return (
    Wt(() => {
      n((r) => r ?? String(Pg++));
    }, [e]),
    t ? `radix-${t}` : ""
  );
}
const kg = ["top", "right", "bottom", "left"],
  Vt = Math.min,
  Me = Math.max,
  ii = Math.round,
  go = Math.floor,
  lt = (e) => ({ x: e, y: e }),
  Rg = { left: "right", right: "left", bottom: "top", top: "bottom" },
  Mg = { start: "end", end: "start" };
function yu(e, t, n) {
  return Me(e, Vt(t, n));
}
function wt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function St(e) {
  return e.split("-")[0];
}
function qn(e) {
  return e.split("-")[1];
}
function ys(e) {
  return e === "x" ? "y" : "x";
}
function ws(e) {
  return e === "y" ? "height" : "width";
}
const Ng = new Set(["top", "bottom"]);
function rt(e) {
  return Ng.has(St(e)) ? "y" : "x";
}
function Ss(e) {
  return ys(rt(e));
}
function Tg(e, t, n) {
  n === void 0 && (n = !1);
  const r = qn(e),
    o = Ss(e),
    i = ws(o);
  let l =
    o === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[i] > t.floating[i] && (l = li(l)), [l, li(l)];
}
function Og(e) {
  const t = li(e);
  return [wu(e), t, wu(t)];
}
function wu(e) {
  return e.replace(/start|end/g, (t) => Mg[t]);
}
const ba = ["left", "right"],
  Za = ["right", "left"],
  Dg = ["top", "bottom"],
  Ag = ["bottom", "top"];
function Ig(e, t, n) {
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? Za : ba) : t ? ba : Za;
    case "left":
    case "right":
      return t ? Dg : Ag;
    default:
      return [];
  }
}
function Lg(e, t, n, r) {
  const o = qn(e);
  let i = Ig(St(e), n === "start", r);
  return (
    o && ((i = i.map((l) => l + "-" + o)), t && (i = i.concat(i.map(wu)))), i
  );
}
function li(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Rg[t]);
}
function Fg(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function Rd(e) {
  return typeof e != "number"
    ? Fg(e)
    : { top: e, right: e, bottom: e, left: e };
}
function ui(e) {
  const { x: t, y: n, width: r, height: o } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n,
  };
}
function Ja(e, t, n) {
  let { reference: r, floating: o } = e;
  const i = rt(t),
    l = Ss(t),
    u = ws(l),
    s = St(t),
    a = i === "y",
    f = r.x + r.width / 2 - o.width / 2,
    c = r.y + r.height / 2 - o.height / 2,
    m = r[u] / 2 - o[u] / 2;
  let g;
  switch (s) {
    case "top":
      g = { x: f, y: r.y - o.height };
      break;
    case "bottom":
      g = { x: f, y: r.y + r.height };
      break;
    case "right":
      g = { x: r.x + r.width, y: c };
      break;
    case "left":
      g = { x: r.x - o.width, y: c };
      break;
    default:
      g = { x: r.x, y: r.y };
  }
  switch (qn(t)) {
    case "start":
      g[l] -= m * (n && a ? -1 : 1);
      break;
    case "end":
      g[l] += m * (n && a ? -1 : 1);
      break;
  }
  return g;
}
const jg = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: o = "absolute",
      middleware: i = [],
      platform: l,
    } = n,
    u = i.filter(Boolean),
    s = await (l.isRTL == null ? void 0 : l.isRTL(t));
  let a = await l.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: f, y: c } = Ja(a, r, s),
    m = r,
    g = {},
    w = 0;
  for (let y = 0; y < u.length; y++) {
    const { name: x, fn: d } = u[y],
      {
        x: p,
        y: v,
        data: S,
        reset: E,
      } = await d({
        x: f,
        y: c,
        initialPlacement: r,
        placement: m,
        strategy: o,
        middlewareData: g,
        rects: a,
        platform: l,
        elements: { reference: e, floating: t },
      });
    (f = p ?? f),
      (c = v ?? c),
      (g = { ...g, [x]: { ...g[x], ...S } }),
      E &&
        w <= 50 &&
        (w++,
        typeof E == "object" &&
          (E.placement && (m = E.placement),
          E.rects &&
            (a =
              E.rects === !0
                ? await l.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                  })
                : E.rects),
          ({ x: f, y: c } = Ja(a, m, s))),
        (y = -1));
  }
  return { x: f, y: c, placement: m, strategy: o, middlewareData: g };
};
async function Yn(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: i, rects: l, elements: u, strategy: s } = e,
    {
      boundary: a = "clippingAncestors",
      rootBoundary: f = "viewport",
      elementContext: c = "floating",
      altBoundary: m = !1,
      padding: g = 0,
    } = wt(t, e),
    w = Rd(g),
    x = u[m ? (c === "floating" ? "reference" : "floating") : c],
    d = ui(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(x))) == null ||
          n
            ? x
            : x.contextElement ||
              (await (i.getDocumentElement == null
                ? void 0
                : i.getDocumentElement(u.floating))),
        boundary: a,
        rootBoundary: f,
        strategy: s,
      })
    ),
    p =
      c === "floating"
        ? { x: r, y: o, width: l.floating.width, height: l.floating.height }
        : l.reference,
    v = await (i.getOffsetParent == null
      ? void 0
      : i.getOffsetParent(u.floating)),
    S = (await (i.isElement == null ? void 0 : i.isElement(v)))
      ? (await (i.getScale == null ? void 0 : i.getScale(v))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    E = ui(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: u,
            rect: p,
            offsetParent: v,
            strategy: s,
          })
        : p
    );
  return {
    top: (d.top - E.top + w.top) / S.y,
    bottom: (E.bottom - d.bottom + w.bottom) / S.y,
    left: (d.left - E.left + w.left) / S.x,
    right: (E.right - d.right + w.right) / S.x,
  };
}
const zg = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: r,
          placement: o,
          rects: i,
          platform: l,
          elements: u,
          middlewareData: s,
        } = t,
        { element: a, padding: f = 0 } = wt(e, t) || {};
      if (a == null) return {};
      const c = Rd(f),
        m = { x: n, y: r },
        g = Ss(o),
        w = ws(g),
        y = await l.getDimensions(a),
        x = g === "y",
        d = x ? "top" : "left",
        p = x ? "bottom" : "right",
        v = x ? "clientHeight" : "clientWidth",
        S = i.reference[w] + i.reference[g] - m[g] - i.floating[w],
        E = m[g] - i.reference[g],
        k = await (l.getOffsetParent == null ? void 0 : l.getOffsetParent(a));
      let _ = k ? k[v] : 0;
      (!_ || !(await (l.isElement == null ? void 0 : l.isElement(k)))) &&
        (_ = u.floating[v] || i.floating[w]);
      const M = S / 2 - E / 2,
        A = _ / 2 - y[w] / 2 - 1,
        T = Vt(c[d], A),
        L = Vt(c[p], A),
        W = T,
        U = _ - y[w] - L,
        $ = _ / 2 - y[w] / 2 + M,
        re = yu(W, $, U),
        F =
          !s.arrow &&
          qn(o) != null &&
          $ !== re &&
          i.reference[w] / 2 - ($ < W ? T : L) - y[w] / 2 < 0,
        K = F ? ($ < W ? $ - W : $ - U) : 0;
      return {
        [g]: m[g] + K,
        data: {
          [g]: re,
          centerOffset: $ - re - K,
          ...(F && { alignmentOffset: K }),
        },
        reset: F,
      };
    },
  }),
  Ug = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: o,
              middlewareData: i,
              rects: l,
              initialPlacement: u,
              platform: s,
              elements: a,
            } = t,
            {
              mainAxis: f = !0,
              crossAxis: c = !0,
              fallbackPlacements: m,
              fallbackStrategy: g = "bestFit",
              fallbackAxisSideDirection: w = "none",
              flipAlignment: y = !0,
              ...x
            } = wt(e, t);
          if ((n = i.arrow) != null && n.alignmentOffset) return {};
          const d = St(o),
            p = rt(u),
            v = St(u) === u,
            S = await (s.isRTL == null ? void 0 : s.isRTL(a.floating)),
            E = m || (v || !y ? [li(u)] : Og(u)),
            k = w !== "none";
          !m && k && E.push(...Lg(u, y, w, S));
          const _ = [u, ...E],
            M = await Yn(t, x),
            A = [];
          let T = ((r = i.flip) == null ? void 0 : r.overflows) || [];
          if ((f && A.push(M[d]), c)) {
            const $ = Tg(o, l, S);
            A.push(M[$[0]], M[$[1]]);
          }
          if (
            ((T = [...T, { placement: o, overflows: A }]),
            !A.every(($) => $ <= 0))
          ) {
            var L, W;
            const $ = (((L = i.flip) == null ? void 0 : L.index) || 0) + 1,
              re = _[$];
            if (
              re &&
              (!(c === "alignment" ? p !== rt(re) : !1) ||
                T.every((P) =>
                  rt(P.placement) === p ? P.overflows[0] > 0 : !0
                ))
            )
              return {
                data: { index: $, overflows: T },
                reset: { placement: re },
              };
            let F =
              (W = T.filter((K) => K.overflows[0] <= 0).sort(
                (K, P) => K.overflows[1] - P.overflows[1]
              )[0]) == null
                ? void 0
                : W.placement;
            if (!F)
              switch (g) {
                case "bestFit": {
                  var U;
                  const K =
                    (U = T.filter((P) => {
                      if (k) {
                        const R = rt(P.placement);
                        return R === p || R === "y";
                      }
                      return !0;
                    })
                      .map((P) => [
                        P.placement,
                        P.overflows
                          .filter((R) => R > 0)
                          .reduce((R, D) => R + D, 0),
                      ])
                      .sort((P, R) => P[1] - R[1])[0]) == null
                      ? void 0
                      : U[0];
                  K && (F = K);
                  break;
                }
                case "initialPlacement":
                  F = u;
                  break;
              }
            if (o !== F) return { reset: { placement: F } };
          }
          return {};
        },
      }
    );
  };
function qa(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width,
  };
}
function ec(e) {
  return kg.some((t) => e[t] >= 0);
}
const $g = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "hide",
        options: e,
        async fn(t) {
          const { rects: n } = t,
            { strategy: r = "referenceHidden", ...o } = wt(e, t);
          switch (r) {
            case "referenceHidden": {
              const i = await Yn(t, { ...o, elementContext: "reference" }),
                l = qa(i, n.reference);
              return {
                data: { referenceHiddenOffsets: l, referenceHidden: ec(l) },
              };
            }
            case "escaped": {
              const i = await Yn(t, { ...o, altBoundary: !0 }),
                l = qa(i, n.floating);
              return { data: { escapedOffsets: l, escaped: ec(l) } };
            }
            default:
              return {};
          }
        },
      }
    );
  },
  Md = new Set(["left", "top"]);
async function Bg(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    l = St(n),
    u = qn(n),
    s = rt(n) === "y",
    a = Md.has(l) ? -1 : 1,
    f = i && s ? -1 : 1,
    c = wt(t, e);
  let {
    mainAxis: m,
    crossAxis: g,
    alignmentAxis: w,
  } = typeof c == "number"
    ? { mainAxis: c, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: c.mainAxis || 0,
        crossAxis: c.crossAxis || 0,
        alignmentAxis: c.alignmentAxis,
      };
  return (
    u && typeof w == "number" && (g = u === "end" ? w * -1 : w),
    s ? { x: g * f, y: m * a } : { x: m * a, y: g * f }
  );
}
const Wg = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: i, placement: l, middlewareData: u } = t,
            s = await Bg(t, e);
          return l === ((n = u.offset) == null ? void 0 : n.placement) &&
            (r = u.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + s.x, y: i + s.y, data: { ...s, placement: l } };
        },
      }
    );
  },
  Vg = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: i = !0,
              crossAxis: l = !1,
              limiter: u = {
                fn: (x) => {
                  let { x: d, y: p } = x;
                  return { x: d, y: p };
                },
              },
              ...s
            } = wt(e, t),
            a = { x: n, y: r },
            f = await Yn(t, s),
            c = rt(St(o)),
            m = ys(c);
          let g = a[m],
            w = a[c];
          if (i) {
            const x = m === "y" ? "top" : "left",
              d = m === "y" ? "bottom" : "right",
              p = g + f[x],
              v = g - f[d];
            g = yu(p, g, v);
          }
          if (l) {
            const x = c === "y" ? "top" : "left",
              d = c === "y" ? "bottom" : "right",
              p = w + f[x],
              v = w - f[d];
            w = yu(p, w, v);
          }
          const y = u.fn({ ...t, [m]: g, [c]: w });
          return {
            ...y,
            data: { x: y.x - n, y: y.y - r, enabled: { [m]: i, [c]: l } },
          };
        },
      }
    );
  },
  Hg = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: i, middlewareData: l } = t,
            { offset: u = 0, mainAxis: s = !0, crossAxis: a = !0 } = wt(e, t),
            f = { x: n, y: r },
            c = rt(o),
            m = ys(c);
          let g = f[m],
            w = f[c];
          const y = wt(u, t),
            x =
              typeof y == "number"
                ? { mainAxis: y, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...y };
          if (s) {
            const v = m === "y" ? "height" : "width",
              S = i.reference[m] - i.floating[v] + x.mainAxis,
              E = i.reference[m] + i.reference[v] - x.mainAxis;
            g < S ? (g = S) : g > E && (g = E);
          }
          if (a) {
            var d, p;
            const v = m === "y" ? "width" : "height",
              S = Md.has(St(o)),
              E =
                i.reference[c] -
                i.floating[v] +
                ((S && ((d = l.offset) == null ? void 0 : d[c])) || 0) +
                (S ? 0 : x.crossAxis),
              k =
                i.reference[c] +
                i.reference[v] +
                (S ? 0 : ((p = l.offset) == null ? void 0 : p[c]) || 0) -
                (S ? x.crossAxis : 0);
            w < E ? (w = E) : w > k && (w = k);
          }
          return { [m]: g, [c]: w };
        },
      }
    );
  },
  Kg = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "size",
        options: e,
        async fn(t) {
          var n, r;
          const { placement: o, rects: i, platform: l, elements: u } = t,
            { apply: s = () => {}, ...a } = wt(e, t),
            f = await Yn(t, a),
            c = St(o),
            m = qn(o),
            g = rt(o) === "y",
            { width: w, height: y } = i.floating;
          let x, d;
          c === "top" || c === "bottom"
            ? ((x = c),
              (d =
                m ===
                ((await (l.isRTL == null ? void 0 : l.isRTL(u.floating)))
                  ? "start"
                  : "end")
                  ? "left"
                  : "right"))
            : ((d = c), (x = m === "end" ? "top" : "bottom"));
          const p = y - f.top - f.bottom,
            v = w - f.left - f.right,
            S = Vt(y - f[x], p),
            E = Vt(w - f[d], v),
            k = !t.middlewareData.shift;
          let _ = S,
            M = E;
          if (
            ((n = t.middlewareData.shift) != null && n.enabled.x && (M = v),
            (r = t.middlewareData.shift) != null && r.enabled.y && (_ = p),
            k && !m)
          ) {
            const T = Me(f.left, 0),
              L = Me(f.right, 0),
              W = Me(f.top, 0),
              U = Me(f.bottom, 0);
            g
              ? (M = w - 2 * (T !== 0 || L !== 0 ? T + L : Me(f.left, f.right)))
              : (_ =
                  y - 2 * (W !== 0 || U !== 0 ? W + U : Me(f.top, f.bottom)));
          }
          await s({ ...t, availableWidth: M, availableHeight: _ });
          const A = await l.getDimensions(u.floating);
          return w !== A.width || y !== A.height
            ? { reset: { rects: !0 } }
            : {};
        },
      }
    );
  };
function Oi() {
  return typeof window < "u";
}
function er(e) {
  return Nd(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function Oe(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function st(e) {
  var t;
  return (t = (Nd(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Nd(e) {
  return Oi() ? e instanceof Node || e instanceof Oe(e).Node : !1;
}
function be(e) {
  return Oi() ? e instanceof Element || e instanceof Oe(e).Element : !1;
}
function ut(e) {
  return Oi() ? e instanceof HTMLElement || e instanceof Oe(e).HTMLElement : !1;
}
function tc(e) {
  return !Oi() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof Oe(e).ShadowRoot;
}
const Gg = new Set(["inline", "contents"]);
function Yr(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = Ze(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !Gg.has(o);
}
const Qg = new Set(["table", "td", "th"]);
function Yg(e) {
  return Qg.has(er(e));
}
const Xg = [":popover-open", ":modal"];
function Di(e) {
  return Xg.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const bg = ["transform", "translate", "scale", "rotate", "perspective"],
  Zg = ["transform", "translate", "scale", "rotate", "perspective", "filter"],
  Jg = ["paint", "layout", "strict", "content"];
function xs(e) {
  const t = Es(),
    n = be(e) ? Ze(e) : e;
  return (
    bg.some((r) => (n[r] ? n[r] !== "none" : !1)) ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    Zg.some((r) => (n.willChange || "").includes(r)) ||
    Jg.some((r) => (n.contain || "").includes(r))
  );
}
function qg(e) {
  let t = Ht(e);
  for (; ut(t) && !Xn(t); ) {
    if (xs(t)) return t;
    if (Di(t)) return null;
    t = Ht(t);
  }
  return null;
}
function Es() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
const ey = new Set(["html", "body", "#document"]);
function Xn(e) {
  return ey.has(er(e));
}
function Ze(e) {
  return Oe(e).getComputedStyle(e);
}
function Ai(e) {
  return be(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Ht(e) {
  if (er(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (tc(e) && e.host) || st(e);
  return tc(t) ? t.host : t;
}
function Td(e) {
  const t = Ht(e);
  return Xn(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : ut(t) && Yr(t)
    ? t
    : Td(t);
}
function Br(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = Td(e),
    i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    l = Oe(o);
  if (i) {
    const u = Su(l);
    return t.concat(
      l,
      l.visualViewport || [],
      Yr(o) ? o : [],
      u && n ? Br(u) : []
    );
  }
  return t.concat(o, Br(o, [], n));
}
function Su(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Od(e) {
  const t = Ze(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = ut(e),
    i = o ? e.offsetWidth : n,
    l = o ? e.offsetHeight : r,
    u = ii(n) !== i || ii(r) !== l;
  return u && ((n = i), (r = l)), { width: n, height: r, $: u };
}
function Cs(e) {
  return be(e) ? e : e.contextElement;
}
function zn(e) {
  const t = Cs(e);
  if (!ut(t)) return lt(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: i } = Od(t);
  let l = (i ? ii(n.width) : n.width) / r,
    u = (i ? ii(n.height) : n.height) / o;
  return (
    (!l || !Number.isFinite(l)) && (l = 1),
    (!u || !Number.isFinite(u)) && (u = 1),
    { x: l, y: u }
  );
}
const ty = lt(0);
function Dd(e) {
  const t = Oe(e);
  return !Es() || !t.visualViewport
    ? ty
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function ny(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== Oe(e)) ? !1 : t;
}
function an(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(),
    i = Cs(e);
  let l = lt(1);
  t && (r ? be(r) && (l = zn(r)) : (l = zn(e)));
  const u = ny(i, n, r) ? Dd(i) : lt(0);
  let s = (o.left + u.x) / l.x,
    a = (o.top + u.y) / l.y,
    f = o.width / l.x,
    c = o.height / l.y;
  if (i) {
    const m = Oe(i),
      g = r && be(r) ? Oe(r) : r;
    let w = m,
      y = Su(w);
    for (; y && r && g !== w; ) {
      const x = zn(y),
        d = y.getBoundingClientRect(),
        p = Ze(y),
        v = d.left + (y.clientLeft + parseFloat(p.paddingLeft)) * x.x,
        S = d.top + (y.clientTop + parseFloat(p.paddingTop)) * x.y;
      (s *= x.x),
        (a *= x.y),
        (f *= x.x),
        (c *= x.y),
        (s += v),
        (a += S),
        (w = Oe(y)),
        (y = Su(w));
    }
  }
  return ui({ width: f, height: c, x: s, y: a });
}
function Ii(e, t) {
  const n = Ai(e).scrollLeft;
  return t ? t.left + n : an(st(e)).left + n;
}
function Ad(e, t) {
  const n = e.getBoundingClientRect(),
    r = n.left + t.scrollLeft - Ii(e, n),
    o = n.top + t.scrollTop;
  return { x: r, y: o };
}
function ry(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const i = o === "fixed",
    l = st(r),
    u = t ? Di(t.floating) : !1;
  if (r === l || (u && i)) return n;
  let s = { scrollLeft: 0, scrollTop: 0 },
    a = lt(1);
  const f = lt(0),
    c = ut(r);
  if (
    (c || (!c && !i)) &&
    ((er(r) !== "body" || Yr(l)) && (s = Ai(r)), ut(r))
  ) {
    const g = an(r);
    (a = zn(r)), (f.x = g.x + r.clientLeft), (f.y = g.y + r.clientTop);
  }
  const m = l && !c && !i ? Ad(l, s) : lt(0);
  return {
    width: n.width * a.x,
    height: n.height * a.y,
    x: n.x * a.x - s.scrollLeft * a.x + f.x + m.x,
    y: n.y * a.y - s.scrollTop * a.y + f.y + m.y,
  };
}
function oy(e) {
  return Array.from(e.getClientRects());
}
function iy(e) {
  const t = st(e),
    n = Ai(e),
    r = e.ownerDocument.body,
    o = Me(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    i = Me(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let l = -n.scrollLeft + Ii(e);
  const u = -n.scrollTop;
  return (
    Ze(r).direction === "rtl" && (l += Me(t.clientWidth, r.clientWidth) - o),
    { width: o, height: i, x: l, y: u }
  );
}
const nc = 25;
function ly(e, t) {
  const n = Oe(e),
    r = st(e),
    o = n.visualViewport;
  let i = r.clientWidth,
    l = r.clientHeight,
    u = 0,
    s = 0;
  if (o) {
    (i = o.width), (l = o.height);
    const f = Es();
    (!f || (f && t === "fixed")) && ((u = o.offsetLeft), (s = o.offsetTop));
  }
  const a = Ii(r);
  if (a <= 0) {
    const f = r.ownerDocument,
      c = f.body,
      m = getComputedStyle(c),
      g =
        (f.compatMode === "CSS1Compat" &&
          parseFloat(m.marginLeft) + parseFloat(m.marginRight)) ||
        0,
      w = Math.abs(r.clientWidth - c.clientWidth - g);
    w <= nc && (i -= w);
  } else a <= nc && (i += a);
  return { width: i, height: l, x: u, y: s };
}
const uy = new Set(["absolute", "fixed"]);
function sy(e, t) {
  const n = an(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    i = ut(e) ? zn(e) : lt(1),
    l = e.clientWidth * i.x,
    u = e.clientHeight * i.y,
    s = o * i.x,
    a = r * i.y;
  return { width: l, height: u, x: s, y: a };
}
function rc(e, t, n) {
  let r;
  if (t === "viewport") r = ly(e, n);
  else if (t === "document") r = iy(st(e));
  else if (be(t)) r = sy(t, n);
  else {
    const o = Dd(e);
    r = { x: t.x - o.x, y: t.y - o.y, width: t.width, height: t.height };
  }
  return ui(r);
}
function Id(e, t) {
  const n = Ht(e);
  return n === t || !be(n) || Xn(n)
    ? !1
    : Ze(n).position === "fixed" || Id(n, t);
}
function ay(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Br(e, [], !1).filter((u) => be(u) && er(u) !== "body"),
    o = null;
  const i = Ze(e).position === "fixed";
  let l = i ? Ht(e) : e;
  for (; be(l) && !Xn(l); ) {
    const u = Ze(l),
      s = xs(l);
    !s && u.position === "fixed" && (o = null),
      (
        i
          ? !s && !o
          : (!s && u.position === "static" && !!o && uy.has(o.position)) ||
            (Yr(l) && !s && Id(e, l))
      )
        ? (r = r.filter((f) => f !== l))
        : (o = u),
      (l = Ht(l));
  }
  return t.set(e, r), r;
}
function cy(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const l = [
      ...(n === "clippingAncestors"
        ? Di(t)
          ? []
          : ay(t, this._c)
        : [].concat(n)),
      r,
    ],
    u = l[0],
    s = l.reduce((a, f) => {
      const c = rc(t, f, o);
      return (
        (a.top = Me(c.top, a.top)),
        (a.right = Vt(c.right, a.right)),
        (a.bottom = Vt(c.bottom, a.bottom)),
        (a.left = Me(c.left, a.left)),
        a
      );
    }, rc(t, u, o));
  return {
    width: s.right - s.left,
    height: s.bottom - s.top,
    x: s.left,
    y: s.top,
  };
}
function fy(e) {
  const { width: t, height: n } = Od(e);
  return { width: t, height: n };
}
function dy(e, t, n) {
  const r = ut(t),
    o = st(t),
    i = n === "fixed",
    l = an(e, !0, i, t);
  let u = { scrollLeft: 0, scrollTop: 0 };
  const s = lt(0);
  function a() {
    s.x = Ii(o);
  }
  if (r || (!r && !i))
    if (((er(t) !== "body" || Yr(o)) && (u = Ai(t)), r)) {
      const g = an(t, !0, i, t);
      (s.x = g.x + t.clientLeft), (s.y = g.y + t.clientTop);
    } else o && a();
  i && !r && o && a();
  const f = o && !r && !i ? Ad(o, u) : lt(0),
    c = l.left + u.scrollLeft - s.x - f.x,
    m = l.top + u.scrollTop - s.y - f.y;
  return { x: c, y: m, width: l.width, height: l.height };
}
function hl(e) {
  return Ze(e).position === "static";
}
function oc(e, t) {
  if (!ut(e) || Ze(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return st(e) === n && (n = n.ownerDocument.body), n;
}
function Ld(e, t) {
  const n = Oe(e);
  if (Di(e)) return n;
  if (!ut(e)) {
    let o = Ht(e);
    for (; o && !Xn(o); ) {
      if (be(o) && !hl(o)) return o;
      o = Ht(o);
    }
    return n;
  }
  let r = oc(e, t);
  for (; r && Yg(r) && hl(r); ) r = oc(r, t);
  return r && Xn(r) && hl(r) && !xs(r) ? n : r || qg(e) || n;
}
const py = async function (e) {
  const t = this.getOffsetParent || Ld,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: dy(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function my(e) {
  return Ze(e).direction === "rtl";
}
const hy = {
  convertOffsetParentRelativeRectToViewportRelativeRect: ry,
  getDocumentElement: st,
  getClippingRect: cy,
  getOffsetParent: Ld,
  getElementRects: py,
  getClientRects: oy,
  getDimensions: fy,
  getScale: zn,
  isElement: be,
  isRTL: my,
};
function Fd(e, t) {
  return (
    e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height
  );
}
function vy(e, t) {
  let n = null,
    r;
  const o = st(e);
  function i() {
    var u;
    clearTimeout(r), (u = n) == null || u.disconnect(), (n = null);
  }
  function l(u, s) {
    u === void 0 && (u = !1), s === void 0 && (s = 1), i();
    const a = e.getBoundingClientRect(),
      { left: f, top: c, width: m, height: g } = a;
    if ((u || t(), !m || !g)) return;
    const w = go(c),
      y = go(o.clientWidth - (f + m)),
      x = go(o.clientHeight - (c + g)),
      d = go(f),
      v = {
        rootMargin: -w + "px " + -y + "px " + -x + "px " + -d + "px",
        threshold: Me(0, Vt(1, s)) || 1,
      };
    let S = !0;
    function E(k) {
      const _ = k[0].intersectionRatio;
      if (_ !== s) {
        if (!S) return l();
        _
          ? l(!1, _)
          : (r = setTimeout(() => {
              l(!1, 1e-7);
            }, 1e3));
      }
      _ === 1 && !Fd(a, e.getBoundingClientRect()) && l(), (S = !1);
    }
    try {
      n = new IntersectionObserver(E, { ...v, root: o.ownerDocument });
    } catch {
      n = new IntersectionObserver(E, v);
    }
    n.observe(e);
  }
  return l(!0), i;
}
function gy(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: i = !0,
      elementResize: l = typeof ResizeObserver == "function",
      layoutShift: u = typeof IntersectionObserver == "function",
      animationFrame: s = !1,
    } = r,
    a = Cs(e),
    f = o || i ? [...(a ? Br(a) : []), ...Br(t)] : [];
  f.forEach((d) => {
    o && d.addEventListener("scroll", n, { passive: !0 }),
      i && d.addEventListener("resize", n);
  });
  const c = a && u ? vy(a, n) : null;
  let m = -1,
    g = null;
  l &&
    ((g = new ResizeObserver((d) => {
      let [p] = d;
      p &&
        p.target === a &&
        g &&
        (g.unobserve(t),
        cancelAnimationFrame(m),
        (m = requestAnimationFrame(() => {
          var v;
          (v = g) == null || v.observe(t);
        }))),
        n();
    })),
    a && !s && g.observe(a),
    g.observe(t));
  let w,
    y = s ? an(e) : null;
  s && x();
  function x() {
    const d = an(e);
    y && !Fd(y, d) && n(), (y = d), (w = requestAnimationFrame(x));
  }
  return (
    n(),
    () => {
      var d;
      f.forEach((p) => {
        o && p.removeEventListener("scroll", n),
          i && p.removeEventListener("resize", n);
      }),
        c?.(),
        (d = g) == null || d.disconnect(),
        (g = null),
        s && cancelAnimationFrame(w);
    }
  );
}
const E1 = Yn,
  yy = Wg,
  wy = Vg,
  Sy = Ug,
  xy = Kg,
  Ey = $g,
  ic = zg,
  Cy = Hg,
  _y = (e, t, n) => {
    const r = new Map(),
      o = { platform: hy, ...n },
      i = { ...o.platform, _c: r };
    return jg(e, t, { ...o, platform: i });
  };
var Py = typeof document < "u",
  ky = function () {},
  Do = Py ? h.useLayoutEffect : ky;
function si(e, t) {
  if (e === t) return !0;
  if (typeof e != typeof t) return !1;
  if (typeof e == "function" && e.toString() === t.toString()) return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!si(e[r], t[r])) return !1;
      return !0;
    }
    if (((o = Object.keys(e)), (n = o.length), n !== Object.keys(t).length))
      return !1;
    for (r = n; r-- !== 0; ) if (!{}.hasOwnProperty.call(t, o[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const i = o[r];
      if (!(i === "_owner" && e.$$typeof) && !si(e[i], t[i])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function jd(e) {
  return typeof window > "u"
    ? 1
    : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function lc(e, t) {
  const n = jd(e);
  return Math.round(t * n) / n;
}
function vl(e) {
  const t = h.useRef(e);
  return (
    Do(() => {
      t.current = e;
    }),
    t
  );
}
function Ry(e) {
  e === void 0 && (e = {});
  const {
      placement: t = "bottom",
      strategy: n = "absolute",
      middleware: r = [],
      platform: o,
      elements: { reference: i, floating: l } = {},
      transform: u = !0,
      whileElementsMounted: s,
      open: a,
    } = e,
    [f, c] = h.useState({
      x: 0,
      y: 0,
      strategy: n,
      placement: t,
      middlewareData: {},
      isPositioned: !1,
    }),
    [m, g] = h.useState(r);
  si(m, r) || g(r);
  const [w, y] = h.useState(null),
    [x, d] = h.useState(null),
    p = h.useCallback((P) => {
      P !== k.current && ((k.current = P), y(P));
    }, []),
    v = h.useCallback((P) => {
      P !== _.current && ((_.current = P), d(P));
    }, []),
    S = i || w,
    E = l || x,
    k = h.useRef(null),
    _ = h.useRef(null),
    M = h.useRef(f),
    A = s != null,
    T = vl(s),
    L = vl(o),
    W = vl(a),
    U = h.useCallback(() => {
      if (!k.current || !_.current) return;
      const P = { placement: t, strategy: n, middleware: m };
      L.current && (P.platform = L.current),
        _y(k.current, _.current, P).then((R) => {
          const D = { ...R, isPositioned: W.current !== !1 };
          $.current &&
            !si(M.current, D) &&
            ((M.current = D),
            vs.flushSync(() => {
              c(D);
            }));
        });
    }, [m, t, n, L, W]);
  Do(() => {
    a === !1 &&
      M.current.isPositioned &&
      ((M.current.isPositioned = !1), c((P) => ({ ...P, isPositioned: !1 })));
  }, [a]);
  const $ = h.useRef(!1);
  Do(
    () => (
      ($.current = !0),
      () => {
        $.current = !1;
      }
    ),
    []
  ),
    Do(() => {
      if ((S && (k.current = S), E && (_.current = E), S && E)) {
        if (T.current) return T.current(S, E, U);
        U();
      }
    }, [S, E, U, T, A]);
  const re = h.useMemo(
      () => ({ reference: k, floating: _, setReference: p, setFloating: v }),
      [p, v]
    ),
    F = h.useMemo(() => ({ reference: S, floating: E }), [S, E]),
    K = h.useMemo(() => {
      const P = { position: n, left: 0, top: 0 };
      if (!F.floating) return P;
      const R = lc(F.floating, f.x),
        D = lc(F.floating, f.y);
      return u
        ? {
            ...P,
            transform: "translate(" + R + "px, " + D + "px)",
            ...(jd(F.floating) >= 1.5 && { willChange: "transform" }),
          }
        : { position: n, left: R, top: D };
    }, [n, u, F.floating, f.x, f.y]);
  return h.useMemo(
    () => ({ ...f, update: U, refs: re, elements: F, floatingStyles: K }),
    [f, U, re, F, K]
  );
}
const My = (e) => {
    function t(n) {
      return {}.hasOwnProperty.call(n, "current");
    }
    return {
      name: "arrow",
      options: e,
      fn(n) {
        const { element: r, padding: o } = typeof e == "function" ? e(n) : e;
        return r && t(r)
          ? r.current != null
            ? ic({ element: r.current, padding: o }).fn(n)
            : {}
          : r
          ? ic({ element: r, padding: o }).fn(n)
          : {};
      },
    };
  },
  Ny = (e, t) => ({ ...yy(e), options: [e, t] }),
  Ty = (e, t) => ({ ...wy(e), options: [e, t] }),
  Oy = (e, t) => ({ ...Cy(e), options: [e, t] }),
  Dy = (e, t) => ({ ...Sy(e), options: [e, t] }),
  Ay = (e, t) => ({ ...xy(e), options: [e, t] }),
  Iy = (e, t) => ({ ...Ey(e), options: [e, t] }),
  Ly = (e, t) => ({ ...My(e), options: [e, t] });
var Fy = "Arrow",
  zd = h.forwardRef((e, t) => {
    const { children: n, width: r = 10, height: o = 5, ...i } = e;
    return C.jsx(b.svg, {
      ...i,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : C.jsx("polygon", { points: "0,0 30,0 15,10" }),
    });
  });
zd.displayName = Fy;
var jy = zd;
function zy(e) {
  const [t, n] = h.useState(void 0);
  return (
    Wt(() => {
      if (e) {
        n({ width: e.offsetWidth, height: e.offsetHeight });
        const r = new ResizeObserver((o) => {
          if (!Array.isArray(o) || !o.length) return;
          const i = o[0];
          let l, u;
          if ("borderBoxSize" in i) {
            const s = i.borderBoxSize,
              a = Array.isArray(s) ? s[0] : s;
            (l = a.inlineSize), (u = a.blockSize);
          } else (l = e.offsetWidth), (u = e.offsetHeight);
          n({ width: l, height: u });
        });
        return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
      } else n(void 0);
    }, [e]),
    t
  );
}
var _s = "Popper",
  [Ud, $d] = pn(_s),
  [Uy, Bd] = Ud(_s),
  Wd = (e) => {
    const { __scopePopper: t, children: n } = e,
      [r, o] = h.useState(null);
    return C.jsx(Uy, { scope: t, anchor: r, onAnchorChange: o, children: n });
  };
Wd.displayName = _s;
var Vd = "PopperAnchor",
  Hd = h.forwardRef((e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e,
      i = Bd(Vd, n),
      l = h.useRef(null),
      u = fe(t, l),
      s = h.useRef(null);
    return (
      h.useEffect(() => {
        const a = s.current;
        (s.current = r?.current || l.current),
          a !== s.current && i.onAnchorChange(s.current);
      }),
      r ? null : C.jsx(b.div, { ...o, ref: u })
    );
  });
Hd.displayName = Vd;
var Ps = "PopperContent",
  [$y, By] = Ud(Ps),
  Kd = h.forwardRef((e, t) => {
    const {
        __scopePopper: n,
        side: r = "bottom",
        sideOffset: o = 0,
        align: i = "center",
        alignOffset: l = 0,
        arrowPadding: u = 0,
        avoidCollisions: s = !0,
        collisionBoundary: a = [],
        collisionPadding: f = 0,
        sticky: c = "partial",
        hideWhenDetached: m = !1,
        updatePositionStrategy: g = "optimized",
        onPlaced: w,
        ...y
      } = e,
      x = Bd(Ps, n),
      [d, p] = h.useState(null),
      v = fe(t, (Y) => p(Y)),
      [S, E] = h.useState(null),
      k = zy(S),
      _ = k?.width ?? 0,
      M = k?.height ?? 0,
      A = r + (i !== "center" ? "-" + i : ""),
      T =
        typeof f == "number"
          ? f
          : { top: 0, right: 0, bottom: 0, left: 0, ...f },
      L = Array.isArray(a) ? a : [a],
      W = L.length > 0,
      U = { padding: T, boundary: L.filter(Vy), altBoundary: W },
      {
        refs: $,
        floatingStyles: re,
        placement: F,
        isPositioned: K,
        middlewareData: P,
      } = Ry({
        strategy: "fixed",
        placement: A,
        whileElementsMounted: (...Y) =>
          gy(...Y, { animationFrame: g === "always" }),
        elements: { reference: x.anchor },
        middleware: [
          Ny({ mainAxis: o + M, alignmentAxis: l }),
          s &&
            Ty({
              mainAxis: !0,
              crossAxis: !1,
              limiter: c === "partial" ? Oy() : void 0,
              ...U,
            }),
          s && Dy({ ...U }),
          Ay({
            ...U,
            apply: ({
              elements: Y,
              rects: tr,
              availableWidth: Qm,
              availableHeight: Ym,
            }) => {
              const { width: Xm, height: bm } = tr.reference,
                Jr = Y.floating.style;
              Jr.setProperty("--radix-popper-available-width", `${Qm}px`),
                Jr.setProperty("--radix-popper-available-height", `${Ym}px`),
                Jr.setProperty("--radix-popper-anchor-width", `${Xm}px`),
                Jr.setProperty("--radix-popper-anchor-height", `${bm}px`);
            },
          }),
          S && Ly({ element: S, padding: u }),
          Hy({ arrowWidth: _, arrowHeight: M }),
          m && Iy({ strategy: "referenceHidden", ...U }),
        ],
      }),
      [R, D] = Yd(F),
      z = yt(w);
    Wt(() => {
      K && z?.();
    }, [K, z]);
    const V = P.arrow?.x,
      qe = P.arrow?.y,
      ke = P.arrow?.centerOffset !== 0,
      [Ct, ve] = h.useState();
    return (
      Wt(() => {
        d && ve(window.getComputedStyle(d).zIndex);
      }, [d]),
      C.jsx("div", {
        ref: $.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...re,
          transform: K ? re.transform : "translate(0, -200%)",
          minWidth: "max-content",
          zIndex: Ct,
          "--radix-popper-transform-origin": [
            P.transformOrigin?.x,
            P.transformOrigin?.y,
          ].join(" "),
          ...(P.hide?.referenceHidden && {
            visibility: "hidden",
            pointerEvents: "none",
          }),
        },
        dir: e.dir,
        children: C.jsx($y, {
          scope: n,
          placedSide: R,
          onArrowChange: E,
          arrowX: V,
          arrowY: qe,
          shouldHideArrow: ke,
          children: C.jsx(b.div, {
            "data-side": R,
            "data-align": D,
            ...y,
            ref: v,
            style: { ...y.style, animation: K ? void 0 : "none" },
          }),
        }),
      })
    );
  });
Kd.displayName = Ps;
var Gd = "PopperArrow",
  Wy = { top: "bottom", right: "left", bottom: "top", left: "right" },
  Qd = h.forwardRef(function (t, n) {
    const { __scopePopper: r, ...o } = t,
      i = By(Gd, r),
      l = Wy[i.placedSide];
    return C.jsx("span", {
      ref: i.onArrowChange,
      style: {
        position: "absolute",
        left: i.arrowX,
        top: i.arrowY,
        [l]: 0,
        transformOrigin: {
          top: "",
          right: "0 0",
          bottom: "center 0",
          left: "100% 0",
        }[i.placedSide],
        transform: {
          top: "translateY(100%)",
          right: "translateY(50%) rotate(90deg) translateX(-50%)",
          bottom: "rotate(180deg)",
          left: "translateY(50%) rotate(-90deg) translateX(50%)",
        }[i.placedSide],
        visibility: i.shouldHideArrow ? "hidden" : void 0,
      },
      children: C.jsx(jy, {
        ...o,
        ref: n,
        style: { ...o.style, display: "block" },
      }),
    });
  });
Qd.displayName = Gd;
function Vy(e) {
  return e !== null;
}
var Hy = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    const { placement: n, rects: r, middlewareData: o } = t,
      l = o.arrow?.centerOffset !== 0,
      u = l ? 0 : e.arrowWidth,
      s = l ? 0 : e.arrowHeight,
      [a, f] = Yd(n),
      c = { start: "0%", center: "50%", end: "100%" }[f],
      m = (o.arrow?.x ?? 0) + u / 2,
      g = (o.arrow?.y ?? 0) + s / 2;
    let w = "",
      y = "";
    return (
      a === "bottom"
        ? ((w = l ? c : `${m}px`), (y = `${-s}px`))
        : a === "top"
        ? ((w = l ? c : `${m}px`), (y = `${r.floating.height + s}px`))
        : a === "right"
        ? ((w = `${-s}px`), (y = l ? c : `${g}px`))
        : a === "left" &&
          ((w = `${r.floating.width + s}px`), (y = l ? c : `${g}px`)),
      { data: { x: w, y } }
    );
  },
});
function Yd(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var Ky = Wd,
  Gy = Hd,
  Qy = Kd,
  Yy = Qd,
  xu = function (e, t) {
    return (
      (xu =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (n, r) {
            n.__proto__ = r;
          }) ||
        function (n, r) {
          for (var o in r)
            Object.prototype.hasOwnProperty.call(r, o) && (n[o] = r[o]);
        }),
      xu(e, t)
    );
  };
function Xd(e, t) {
  if (typeof t != "function" && t !== null)
    throw new TypeError(
      "Class extends value " + String(t) + " is not a constructor or null"
    );
  xu(e, t);
  function n() {
    this.constructor = e;
  }
  e.prototype =
    t === null ? Object.create(t) : ((n.prototype = t.prototype), new n());
}
var je = function () {
  return (
    (je =
      Object.assign ||
      function (t) {
        for (var n, r = 1, o = arguments.length; r < o; r++) {
          n = arguments[r];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }),
    je.apply(this, arguments)
  );
};
function Li(e, t) {
  var n = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) &&
      t.indexOf(r) < 0 &&
      (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 &&
        Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
        (n[r[o]] = e[r[o]]);
  return n;
}
function bd(e, t, n, r) {
  var o = arguments.length,
    i =
      o < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, n)) : r,
    l;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
    i = Reflect.decorate(e, t, n, r);
  else
    for (var u = e.length - 1; u >= 0; u--)
      (l = e[u]) && (i = (o < 3 ? l(i) : o > 3 ? l(t, n, i) : l(t, n)) || i);
  return o > 3 && i && Object.defineProperty(t, n, i), i;
}
function Zd(e, t) {
  return function (n, r) {
    t(n, r, e);
  };
}
function Jd(e, t, n, r, o, i) {
  function l(d) {
    if (d !== void 0 && typeof d != "function")
      throw new TypeError("Function expected");
    return d;
  }
  for (
    var u = r.kind,
      s = u === "getter" ? "get" : u === "setter" ? "set" : "value",
      a = !t && e ? (r.static ? e : e.prototype) : null,
      f = t || (a ? Object.getOwnPropertyDescriptor(a, r.name) : {}),
      c,
      m = !1,
      g = n.length - 1;
    g >= 0;
    g--
  ) {
    var w = {};
    for (var y in r) w[y] = y === "access" ? {} : r[y];
    for (var y in r.access) w.access[y] = r.access[y];
    w.addInitializer = function (d) {
      if (m)
        throw new TypeError(
          "Cannot add initializers after decoration has completed"
        );
      i.push(l(d || null));
    };
    var x = (0, n[g])(u === "accessor" ? { get: f.get, set: f.set } : f[s], w);
    if (u === "accessor") {
      if (x === void 0) continue;
      if (x === null || typeof x != "object")
        throw new TypeError("Object expected");
      (c = l(x.get)) && (f.get = c),
        (c = l(x.set)) && (f.set = c),
        (c = l(x.init)) && o.unshift(c);
    } else (c = l(x)) && (u === "field" ? o.unshift(c) : (f[s] = c));
  }
  a && Object.defineProperty(a, r.name, f), (m = !0);
}
function qd(e, t, n) {
  for (var r = arguments.length > 2, o = 0; o < t.length; o++)
    n = r ? t[o].call(e, n) : t[o].call(e);
  return r ? n : void 0;
}
function ep(e) {
  return typeof e == "symbol" ? e : "".concat(e);
}
function tp(e, t, n) {
  return (
    typeof t == "symbol" &&
      (t = t.description ? "[".concat(t.description, "]") : ""),
    Object.defineProperty(e, "name", {
      configurable: !0,
      value: n ? "".concat(n, " ", t) : t,
    })
  );
}
function np(e, t) {
  if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
    return Reflect.metadata(e, t);
}
function rp(e, t, n, r) {
  function o(i) {
    return i instanceof n
      ? i
      : new n(function (l) {
          l(i);
        });
  }
  return new (n || (n = Promise))(function (i, l) {
    function u(f) {
      try {
        a(r.next(f));
      } catch (c) {
        l(c);
      }
    }
    function s(f) {
      try {
        a(r.throw(f));
      } catch (c) {
        l(c);
      }
    }
    function a(f) {
      f.done ? i(f.value) : o(f.value).then(u, s);
    }
    a((r = r.apply(e, t || [])).next());
  });
}
function op(e, t) {
  var n = {
      label: 0,
      sent: function () {
        if (i[0] & 1) throw i[1];
        return i[1];
      },
      trys: [],
      ops: [],
    },
    r,
    o,
    i,
    l = Object.create(
      (typeof Iterator == "function" ? Iterator : Object).prototype
    );
  return (
    (l.next = u(0)),
    (l.throw = u(1)),
    (l.return = u(2)),
    typeof Symbol == "function" &&
      (l[Symbol.iterator] = function () {
        return this;
      }),
    l
  );
  function u(a) {
    return function (f) {
      return s([a, f]);
    };
  }
  function s(a) {
    if (r) throw new TypeError("Generator is already executing.");
    for (; l && ((l = 0), a[0] && (n = 0)), n; )
      try {
        if (
          ((r = 1),
          o &&
            (i =
              a[0] & 2
                ? o.return
                : a[0]
                ? o.throw || ((i = o.return) && i.call(o), 0)
                : o.next) &&
            !(i = i.call(o, a[1])).done)
        )
          return i;
        switch (((o = 0), i && (a = [a[0] & 2, i.value]), a[0])) {
          case 0:
          case 1:
            i = a;
            break;
          case 4:
            return n.label++, { value: a[1], done: !1 };
          case 5:
            n.label++, (o = a[1]), (a = [0]);
            continue;
          case 7:
            (a = n.ops.pop()), n.trys.pop();
            continue;
          default:
            if (
              ((i = n.trys),
              !(i = i.length > 0 && i[i.length - 1]) &&
                (a[0] === 6 || a[0] === 2))
            ) {
              n = 0;
              continue;
            }
            if (a[0] === 3 && (!i || (a[1] > i[0] && a[1] < i[3]))) {
              n.label = a[1];
              break;
            }
            if (a[0] === 6 && n.label < i[1]) {
              (n.label = i[1]), (i = a);
              break;
            }
            if (i && n.label < i[2]) {
              (n.label = i[2]), n.ops.push(a);
              break;
            }
            i[2] && n.ops.pop(), n.trys.pop();
            continue;
        }
        a = t.call(e, n);
      } catch (f) {
        (a = [6, f]), (o = 0);
      } finally {
        r = i = 0;
      }
    if (a[0] & 5) throw a[1];
    return { value: a[0] ? a[1] : void 0, done: !0 };
  }
}
var Fi = Object.create
  ? function (e, t, n, r) {
      r === void 0 && (r = n);
      var o = Object.getOwnPropertyDescriptor(t, n);
      (!o || ("get" in o ? !t.__esModule : o.writable || o.configurable)) &&
        (o = {
          enumerable: !0,
          get: function () {
            return t[n];
          },
        }),
        Object.defineProperty(e, r, o);
    }
  : function (e, t, n, r) {
      r === void 0 && (r = n), (e[r] = t[n]);
    };
function ip(e, t) {
  for (var n in e)
    n !== "default" &&
      !Object.prototype.hasOwnProperty.call(t, n) &&
      Fi(t, e, n);
}
function ai(e) {
  var t = typeof Symbol == "function" && Symbol.iterator,
    n = t && e[t],
    r = 0;
  if (n) return n.call(e);
  if (e && typeof e.length == "number")
    return {
      next: function () {
        return (
          e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }
        );
      },
    };
  throw new TypeError(
    t ? "Object is not iterable." : "Symbol.iterator is not defined."
  );
}
function ks(e, t) {
  var n = typeof Symbol == "function" && e[Symbol.iterator];
  if (!n) return e;
  var r = n.call(e),
    o,
    i = [],
    l;
  try {
    for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; ) i.push(o.value);
  } catch (u) {
    l = { error: u };
  } finally {
    try {
      o && !o.done && (n = r.return) && n.call(r);
    } finally {
      if (l) throw l.error;
    }
  }
  return i;
}
function lp() {
  for (var e = [], t = 0; t < arguments.length; t++)
    e = e.concat(ks(arguments[t]));
  return e;
}
function up() {
  for (var e = 0, t = 0, n = arguments.length; t < n; t++)
    e += arguments[t].length;
  for (var r = Array(e), o = 0, t = 0; t < n; t++)
    for (var i = arguments[t], l = 0, u = i.length; l < u; l++, o++)
      r[o] = i[l];
  return r;
}
function Rs(e, t, n) {
  if (n || arguments.length === 2)
    for (var r = 0, o = t.length, i; r < o; r++)
      (i || !(r in t)) &&
        (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
  return e.concat(i || Array.prototype.slice.call(t));
}
function bn(e) {
  return this instanceof bn ? ((this.v = e), this) : new bn(e);
}
function sp(e, t, n) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var r = n.apply(e, t || []),
    o,
    i = [];
  return (
    (o = Object.create(
      (typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype
    )),
    u("next"),
    u("throw"),
    u("return", l),
    (o[Symbol.asyncIterator] = function () {
      return this;
    }),
    o
  );
  function l(g) {
    return function (w) {
      return Promise.resolve(w).then(g, c);
    };
  }
  function u(g, w) {
    r[g] &&
      ((o[g] = function (y) {
        return new Promise(function (x, d) {
          i.push([g, y, x, d]) > 1 || s(g, y);
        });
      }),
      w && (o[g] = w(o[g])));
  }
  function s(g, w) {
    try {
      a(r[g](w));
    } catch (y) {
      m(i[0][3], y);
    }
  }
  function a(g) {
    g.value instanceof bn
      ? Promise.resolve(g.value.v).then(f, c)
      : m(i[0][2], g);
  }
  function f(g) {
    s("next", g);
  }
  function c(g) {
    s("throw", g);
  }
  function m(g, w) {
    g(w), i.shift(), i.length && s(i[0][0], i[0][1]);
  }
}
function ap(e) {
  var t, n;
  return (
    (t = {}),
    r("next"),
    r("throw", function (o) {
      throw o;
    }),
    r("return"),
    (t[Symbol.iterator] = function () {
      return this;
    }),
    t
  );
  function r(o, i) {
    t[o] = e[o]
      ? function (l) {
          return (n = !n) ? { value: bn(e[o](l)), done: !1 } : i ? i(l) : l;
        }
      : i;
  }
}
function cp(e) {
  if (!Symbol.asyncIterator)
    throw new TypeError("Symbol.asyncIterator is not defined.");
  var t = e[Symbol.asyncIterator],
    n;
  return t
    ? t.call(e)
    : ((e = typeof ai == "function" ? ai(e) : e[Symbol.iterator]()),
      (n = {}),
      r("next"),
      r("throw"),
      r("return"),
      (n[Symbol.asyncIterator] = function () {
        return this;
      }),
      n);
  function r(i) {
    n[i] =
      e[i] &&
      function (l) {
        return new Promise(function (u, s) {
          (l = e[i](l)), o(u, s, l.done, l.value);
        });
      };
  }
  function o(i, l, u, s) {
    Promise.resolve(s).then(function (a) {
      i({ value: a, done: u });
    }, l);
  }
}
function fp(e, t) {
  return (
    Object.defineProperty
      ? Object.defineProperty(e, "raw", { value: t })
      : (e.raw = t),
    e
  );
}
var Xy = Object.create
    ? function (e, t) {
        Object.defineProperty(e, "default", { enumerable: !0, value: t });
      }
    : function (e, t) {
        e.default = t;
      },
  Eu = function (e) {
    return (
      (Eu =
        Object.getOwnPropertyNames ||
        function (t) {
          var n = [];
          for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (n[n.length] = r);
          return n;
        }),
      Eu(e)
    );
  };
function dp(e) {
  if (e && e.__esModule) return e;
  var t = {};
  if (e != null)
    for (var n = Eu(e), r = 0; r < n.length; r++)
      n[r] !== "default" && Fi(t, e, n[r]);
  return Xy(t, e), t;
}
function pp(e) {
  return e && e.__esModule ? e : { default: e };
}
function mp(e, t, n, r) {
  if (n === "a" && !r)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it"
    );
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}
function hp(e, t, n, r, o) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !o)
    throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !o : !t.has(e))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it"
    );
  return r === "a" ? o.call(e, n) : o ? (o.value = n) : t.set(e, n), n;
}
function vp(e, t) {
  if (t === null || (typeof t != "object" && typeof t != "function"))
    throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof e == "function" ? t === e : e.has(t);
}
function gp(e, t, n) {
  if (t != null) {
    if (typeof t != "object" && typeof t != "function")
      throw new TypeError("Object expected.");
    var r, o;
    if (n) {
      if (!Symbol.asyncDispose)
        throw new TypeError("Symbol.asyncDispose is not defined.");
      r = t[Symbol.asyncDispose];
    }
    if (r === void 0) {
      if (!Symbol.dispose)
        throw new TypeError("Symbol.dispose is not defined.");
      (r = t[Symbol.dispose]), n && (o = r);
    }
    if (typeof r != "function") throw new TypeError("Object not disposable.");
    o &&
      (r = function () {
        try {
          o.call(this);
        } catch (i) {
          return Promise.reject(i);
        }
      }),
      e.stack.push({ value: t, dispose: r, async: n });
  } else n && e.stack.push({ async: !0 });
  return t;
}
var by =
  typeof SuppressedError == "function"
    ? SuppressedError
    : function (e, t, n) {
        var r = new Error(n);
        return (
          (r.name = "SuppressedError"), (r.error = e), (r.suppressed = t), r
        );
      };
function yp(e) {
  function t(i) {
    (e.error = e.hasError
      ? new by(i, e.error, "An error was suppressed during disposal.")
      : i),
      (e.hasError = !0);
  }
  var n,
    r = 0;
  function o() {
    for (; (n = e.stack.pop()); )
      try {
        if (!n.async && r === 1)
          return (r = 0), e.stack.push(n), Promise.resolve().then(o);
        if (n.dispose) {
          var i = n.dispose.call(n.value);
          if (n.async)
            return (
              (r |= 2),
              Promise.resolve(i).then(o, function (l) {
                return t(l), o();
              })
            );
        } else r |= 1;
      } catch (l) {
        t(l);
      }
    if (r === 1)
      return e.hasError ? Promise.reject(e.error) : Promise.resolve();
    if (e.hasError) throw e.error;
  }
  return o();
}
function wp(e, t) {
  return typeof e == "string" && /^\.\.?\//.test(e)
    ? e.replace(
        /\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,
        function (n, r, o, i, l) {
          return r
            ? t
              ? ".jsx"
              : ".js"
            : o && (!i || !l)
            ? n
            : o + i + "." + l.toLowerCase() + "js";
        }
      )
    : e;
}
const Zy = {
    __extends: Xd,
    __assign: je,
    __rest: Li,
    __decorate: bd,
    __param: Zd,
    __esDecorate: Jd,
    __runInitializers: qd,
    __propKey: ep,
    __setFunctionName: tp,
    __metadata: np,
    __awaiter: rp,
    __generator: op,
    __createBinding: Fi,
    __exportStar: ip,
    __values: ai,
    __read: ks,
    __spread: lp,
    __spreadArrays: up,
    __spreadArray: Rs,
    __await: bn,
    __asyncGenerator: sp,
    __asyncDelegator: ap,
    __asyncValues: cp,
    __makeTemplateObject: fp,
    __importStar: dp,
    __importDefault: pp,
    __classPrivateFieldGet: mp,
    __classPrivateFieldSet: hp,
    __classPrivateFieldIn: vp,
    __addDisposableResource: gp,
    __disposeResources: yp,
    __rewriteRelativeImportExtension: wp,
  },
  C1 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        __addDisposableResource: gp,
        get __assign() {
          return je;
        },
        __asyncDelegator: ap,
        __asyncGenerator: sp,
        __asyncValues: cp,
        __await: bn,
        __awaiter: rp,
        __classPrivateFieldGet: mp,
        __classPrivateFieldIn: vp,
        __classPrivateFieldSet: hp,
        __createBinding: Fi,
        __decorate: bd,
        __disposeResources: yp,
        __esDecorate: Jd,
        __exportStar: ip,
        __extends: Xd,
        __generator: op,
        __importDefault: pp,
        __importStar: dp,
        __makeTemplateObject: fp,
        __metadata: np,
        __param: Zd,
        __propKey: ep,
        __read: ks,
        __rest: Li,
        __rewriteRelativeImportExtension: wp,
        __runInitializers: qd,
        __setFunctionName: tp,
        __spread: lp,
        __spreadArray: Rs,
        __spreadArrays: up,
        __values: ai,
        default: Zy,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
var gl = "focusScope.autoFocusOnMount",
  yl = "focusScope.autoFocusOnUnmount",
  uc = { bubbles: !1, cancelable: !0 },
  Jy = "FocusScope",
  Ms = h.forwardRef((e, t) => {
    const {
        loop: n = !1,
        trapped: r = !1,
        onMountAutoFocus: o,
        onUnmountAutoFocus: i,
        ...l
      } = e,
      [u, s] = h.useState(null),
      a = yt(o),
      f = yt(i),
      c = h.useRef(null),
      m = fe(t, (y) => s(y)),
      g = h.useRef({
        paused: !1,
        pause() {
          this.paused = !0;
        },
        resume() {
          this.paused = !1;
        },
      }).current;
    h.useEffect(() => {
      if (r) {
        let y = function (v) {
            if (g.paused || !u) return;
            const S = v.target;
            u.contains(S) ? (c.current = S) : Pt(c.current, { select: !0 });
          },
          x = function (v) {
            if (g.paused || !u) return;
            const S = v.relatedTarget;
            S !== null && (u.contains(S) || Pt(c.current, { select: !0 }));
          },
          d = function (v) {
            if (document.activeElement === document.body)
              for (const E of v) E.removedNodes.length > 0 && Pt(u);
          };
        document.addEventListener("focusin", y),
          document.addEventListener("focusout", x);
        const p = new MutationObserver(d);
        return (
          u && p.observe(u, { childList: !0, subtree: !0 }),
          () => {
            document.removeEventListener("focusin", y),
              document.removeEventListener("focusout", x),
              p.disconnect();
          }
        );
      }
    }, [r, u, g.paused]),
      h.useEffect(() => {
        if (u) {
          ac.add(g);
          const y = document.activeElement;
          if (!u.contains(y)) {
            const d = new CustomEvent(gl, uc);
            u.addEventListener(gl, a),
              u.dispatchEvent(d),
              d.defaultPrevented ||
                (qy(ow(Sp(u)), { select: !0 }),
                document.activeElement === y && Pt(u));
          }
          return () => {
            u.removeEventListener(gl, a),
              setTimeout(() => {
                const d = new CustomEvent(yl, uc);
                u.addEventListener(yl, f),
                  u.dispatchEvent(d),
                  d.defaultPrevented || Pt(y ?? document.body, { select: !0 }),
                  u.removeEventListener(yl, f),
                  ac.remove(g);
              }, 0);
          };
        }
      }, [u, a, f, g]);
    const w = h.useCallback(
      (y) => {
        if ((!n && !r) || g.paused) return;
        const x = y.key === "Tab" && !y.altKey && !y.ctrlKey && !y.metaKey,
          d = document.activeElement;
        if (x && d) {
          const p = y.currentTarget,
            [v, S] = ew(p);
          v && S
            ? !y.shiftKey && d === S
              ? (y.preventDefault(), n && Pt(v, { select: !0 }))
              : y.shiftKey &&
                d === v &&
                (y.preventDefault(), n && Pt(S, { select: !0 }))
            : d === p && y.preventDefault();
        }
      },
      [n, r, g.paused]
    );
    return C.jsx(b.div, { tabIndex: -1, ...l, ref: m, onKeyDown: w });
  });
Ms.displayName = Jy;
function qy(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if ((Pt(r, { select: t }), document.activeElement !== n)) return;
}
function ew(e) {
  const t = Sp(e),
    n = sc(t, e),
    r = sc(t.reverse(), e);
  return [n, r];
}
function Sp(e) {
  const t = [],
    n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const o = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || o
          ? NodeFilter.FILTER_SKIP
          : r.tabIndex >= 0
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      },
    });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function sc(e, t) {
  for (const n of e) if (!tw(n, { upTo: t })) return n;
}
function tw(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function nw(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Pt(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && nw(e) && t && e.select();
  }
}
var ac = rw();
function rw() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && n?.pause(), (e = cc(e, t)), e.unshift(t);
    },
    remove(t) {
      (e = cc(e, t)), e[0]?.resume();
    },
  };
}
function cc(e, t) {
  const n = [...e],
    r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function ow(e) {
  return e.filter((t) => t.tagName !== "A");
}
var wl = 0;
function xp() {
  h.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return (
      document.body.insertAdjacentElement("afterbegin", e[0] ?? fc()),
      document.body.insertAdjacentElement("beforeend", e[1] ?? fc()),
      wl++,
      () => {
        wl === 1 &&
          document
            .querySelectorAll("[data-radix-focus-guard]")
            .forEach((t) => t.remove()),
          wl--;
      }
    );
  }, []);
}
function fc() {
  const e = document.createElement("span");
  return (
    e.setAttribute("data-radix-focus-guard", ""),
    (e.tabIndex = 0),
    (e.style.outline = "none"),
    (e.style.opacity = "0"),
    (e.style.position = "fixed"),
    (e.style.pointerEvents = "none"),
    e
  );
}
var Ao = "right-scroll-bar-position",
  Io = "width-before-scroll-bar",
  iw = "with-scroll-bars-hidden",
  lw = "--removed-body-scroll-bar-size";
function Sl(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function uw(e, t) {
  var n = h.useState(function () {
    return {
      value: e,
      callback: t,
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && ((n.value = r), n.callback(r, o));
        },
      },
    };
  })[0];
  return (n.callback = t), n.facade;
}
var sw = typeof window < "u" ? h.useLayoutEffect : h.useEffect,
  dc = new WeakMap();
function aw(e, t) {
  var n = uw(null, function (r) {
    return e.forEach(function (o) {
      return Sl(o, r);
    });
  });
  return (
    sw(
      function () {
        var r = dc.get(n);
        if (r) {
          var o = new Set(r),
            i = new Set(e),
            l = n.current;
          o.forEach(function (u) {
            i.has(u) || Sl(u, null);
          }),
            i.forEach(function (u) {
              o.has(u) || Sl(u, l);
            });
        }
        dc.set(n, e);
      },
      [e]
    ),
    n
  );
}
function cw(e) {
  return e;
}
function fw(e, t) {
  t === void 0 && (t = cw);
  var n = [],
    r = !1,
    o = {
      read: function () {
        if (r)
          throw new Error(
            "Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`."
          );
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function (i) {
        var l = t(i, r);
        return (
          n.push(l),
          function () {
            n = n.filter(function (u) {
              return u !== l;
            });
          }
        );
      },
      assignSyncMedium: function (i) {
        for (r = !0; n.length; ) {
          var l = n;
          (n = []), l.forEach(i);
        }
        n = {
          push: function (u) {
            return i(u);
          },
          filter: function () {
            return n;
          },
        };
      },
      assignMedium: function (i) {
        r = !0;
        var l = [];
        if (n.length) {
          var u = n;
          (n = []), u.forEach(i), (l = n);
        }
        var s = function () {
            var f = l;
            (l = []), f.forEach(i);
          },
          a = function () {
            return Promise.resolve().then(s);
          };
        a(),
          (n = {
            push: function (f) {
              l.push(f), a();
            },
            filter: function (f) {
              return (l = l.filter(f)), n;
            },
          });
      },
    };
  return o;
}
function dw(e) {
  e === void 0 && (e = {});
  var t = fw(null);
  return (t.options = je({ async: !0, ssr: !1 }, e)), t;
}
var Ep = function (e) {
  var t = e.sideCar,
    n = Li(e, ["sideCar"]);
  if (!t)
    throw new Error(
      "Sidecar: please provide `sideCar` property to import the right car"
    );
  var r = t.read();
  if (!r) throw new Error("Sidecar medium not found");
  return h.createElement(r, je({}, n));
};
Ep.isSideCarExport = !0;
function pw(e, t) {
  return e.useMedium(t), Ep;
}
var Cp = dw(),
  xl = function () {},
  ji = h.forwardRef(function (e, t) {
    var n = h.useRef(null),
      r = h.useState({
        onScrollCapture: xl,
        onWheelCapture: xl,
        onTouchMoveCapture: xl,
      }),
      o = r[0],
      i = r[1],
      l = e.forwardProps,
      u = e.children,
      s = e.className,
      a = e.removeScrollBar,
      f = e.enabled,
      c = e.shards,
      m = e.sideCar,
      g = e.noRelative,
      w = e.noIsolation,
      y = e.inert,
      x = e.allowPinchZoom,
      d = e.as,
      p = d === void 0 ? "div" : d,
      v = e.gapMode,
      S = Li(e, [
        "forwardProps",
        "children",
        "className",
        "removeScrollBar",
        "enabled",
        "shards",
        "sideCar",
        "noRelative",
        "noIsolation",
        "inert",
        "allowPinchZoom",
        "as",
        "gapMode",
      ]),
      E = m,
      k = aw([n, t]),
      _ = je(je({}, S), o);
    return h.createElement(
      h.Fragment,
      null,
      f &&
        h.createElement(E, {
          sideCar: Cp,
          removeScrollBar: a,
          shards: c,
          noRelative: g,
          noIsolation: w,
          inert: y,
          setCallbacks: i,
          allowPinchZoom: !!x,
          lockRef: n,
          gapMode: v,
        }),
      l
        ? h.cloneElement(h.Children.only(u), je(je({}, _), { ref: k }))
        : h.createElement(p, je({}, _, { className: s, ref: k }), u)
    );
  });
ji.defaultProps = { enabled: !0, removeScrollBar: !0, inert: !1 };
ji.classNames = { fullWidth: Io, zeroRight: Ao };
var mw = function () {
  if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
};
function hw() {
  if (!document) return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = mw();
  return t && e.setAttribute("nonce", t), e;
}
function vw(e, t) {
  e.styleSheet
    ? (e.styleSheet.cssText = t)
    : e.appendChild(document.createTextNode(t));
}
function gw(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var yw = function () {
    var e = 0,
      t = null;
    return {
      add: function (n) {
        e == 0 && (t = hw()) && (vw(t, n), gw(t)), e++;
      },
      remove: function () {
        e--,
          !e && t && (t.parentNode && t.parentNode.removeChild(t), (t = null));
      },
    };
  },
  ww = function () {
    var e = yw();
    return function (t, n) {
      h.useEffect(
        function () {
          return (
            e.add(t),
            function () {
              e.remove();
            }
          );
        },
        [t && n]
      );
    };
  },
  _p = function () {
    var e = ww(),
      t = function (n) {
        var r = n.styles,
          o = n.dynamic;
        return e(r, o), null;
      };
    return t;
  },
  Sw = { left: 0, top: 0, right: 0, gap: 0 },
  El = function (e) {
    return parseInt(e || "", 10) || 0;
  },
  xw = function (e) {
    var t = window.getComputedStyle(document.body),
      n = t[e === "padding" ? "paddingLeft" : "marginLeft"],
      r = t[e === "padding" ? "paddingTop" : "marginTop"],
      o = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [El(n), El(r), El(o)];
  },
  Ew = function (e) {
    if ((e === void 0 && (e = "margin"), typeof window > "u")) return Sw;
    var t = xw(e),
      n = document.documentElement.clientWidth,
      r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0]),
    };
  },
  Cw = _p(),
  Un = "data-scroll-locked",
  _w = function (e, t, n, r) {
    var o = e.left,
      i = e.top,
      l = e.right,
      u = e.gap;
    return (
      n === void 0 && (n = "margin"),
      `
  .`
        .concat(
          iw,
          ` {
   overflow: hidden `
        )
        .concat(
          r,
          `;
   padding-right: `
        )
        .concat(u, "px ")
        .concat(
          r,
          `;
  }
  body[`
        )
        .concat(
          Un,
          `] {
    overflow: hidden `
        )
        .concat(
          r,
          `;
    overscroll-behavior: contain;
    `
        )
        .concat(
          [
            t && "position: relative ".concat(r, ";"),
            n === "margin" &&
              `
    padding-left: `
                .concat(
                  o,
                  `px;
    padding-top: `
                )
                .concat(
                  i,
                  `px;
    padding-right: `
                )
                .concat(
                  l,
                  `px;
    margin-left:0;
    margin-top:0;
    margin-right: `
                )
                .concat(u, "px ")
                .concat(
                  r,
                  `;
    `
                ),
            n === "padding" &&
              "padding-right: ".concat(u, "px ").concat(r, ";"),
          ]
            .filter(Boolean)
            .join(""),
          `
  }
  
  .`
        )
        .concat(
          Ao,
          ` {
    right: `
        )
        .concat(u, "px ")
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(
          Io,
          ` {
    margin-right: `
        )
        .concat(u, "px ")
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(Ao, " .")
        .concat(
          Ao,
          ` {
    right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  .`
        )
        .concat(Io, " .")
        .concat(
          Io,
          ` {
    margin-right: 0 `
        )
        .concat(
          r,
          `;
  }
  
  body[`
        )
        .concat(
          Un,
          `] {
    `
        )
        .concat(lw, ": ")
        .concat(
          u,
          `px;
  }
`
        )
    );
  },
  pc = function () {
    var e = parseInt(document.body.getAttribute(Un) || "0", 10);
    return isFinite(e) ? e : 0;
  },
  Pw = function () {
    h.useEffect(function () {
      return (
        document.body.setAttribute(Un, (pc() + 1).toString()),
        function () {
          var e = pc() - 1;
          e <= 0
            ? document.body.removeAttribute(Un)
            : document.body.setAttribute(Un, e.toString());
        }
      );
    }, []);
  },
  kw = function (e) {
    var t = e.noRelative,
      n = e.noImportant,
      r = e.gapMode,
      o = r === void 0 ? "margin" : r;
    Pw();
    var i = h.useMemo(
      function () {
        return Ew(o);
      },
      [o]
    );
    return h.createElement(Cw, { styles: _w(i, !t, o, n ? "" : "!important") });
  },
  Cu = !1;
if (typeof window < "u")
  try {
    var yo = Object.defineProperty({}, "passive", {
      get: function () {
        return (Cu = !0), !0;
      },
    });
    window.addEventListener("test", yo, yo),
      window.removeEventListener("test", yo, yo);
  } catch {
    Cu = !1;
  }
var gn = Cu ? { passive: !1 } : !1,
  Rw = function (e) {
    return e.tagName === "TEXTAREA";
  },
  Pp = function (e, t) {
    if (!(e instanceof Element)) return !1;
    var n = window.getComputedStyle(e);
    return (
      n[t] !== "hidden" &&
      !(n.overflowY === n.overflowX && !Rw(e) && n[t] === "visible")
    );
  },
  Mw = function (e) {
    return Pp(e, "overflowY");
  },
  Nw = function (e) {
    return Pp(e, "overflowX");
  },
  mc = function (e, t) {
    var n = t.ownerDocument,
      r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var o = kp(e, r);
      if (o) {
        var i = Rp(e, r),
          l = i[1],
          u = i[2];
        if (l > u) return !0;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return !1;
  },
  Tw = function (e) {
    var t = e.scrollTop,
      n = e.scrollHeight,
      r = e.clientHeight;
    return [t, n, r];
  },
  Ow = function (e) {
    var t = e.scrollLeft,
      n = e.scrollWidth,
      r = e.clientWidth;
    return [t, n, r];
  },
  kp = function (e, t) {
    return e === "v" ? Mw(t) : Nw(t);
  },
  Rp = function (e, t) {
    return e === "v" ? Tw(t) : Ow(t);
  },
  Dw = function (e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  },
  Aw = function (e, t, n, r, o) {
    var i = Dw(e, window.getComputedStyle(t).direction),
      l = i * r,
      u = n.target,
      s = t.contains(u),
      a = !1,
      f = l > 0,
      c = 0,
      m = 0;
    do {
      if (!u) break;
      var g = Rp(e, u),
        w = g[0],
        y = g[1],
        x = g[2],
        d = y - x - i * w;
      (w || d) && kp(e, u) && ((c += d), (m += w));
      var p = u.parentNode;
      u = p && p.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? p.host : p;
    } while ((!s && u !== document.body) || (s && (t.contains(u) || t === u)));
    return ((f && Math.abs(c) < 1) || (!f && Math.abs(m) < 1)) && (a = !0), a;
  },
  wo = function (e) {
    return "changedTouches" in e
      ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY]
      : [0, 0];
  },
  hc = function (e) {
    return [e.deltaX, e.deltaY];
  },
  vc = function (e) {
    return e && "current" in e ? e.current : e;
  },
  Iw = function (e, t) {
    return e[0] === t[0] && e[1] === t[1];
  },
  Lw = function (e) {
    return `
  .block-interactivity-`
      .concat(
        e,
        ` {pointer-events: none;}
  .allow-interactivity-`
      )
      .concat(
        e,
        ` {pointer-events: all;}
`
      );
  },
  Fw = 0,
  yn = [];
function jw(e) {
  var t = h.useRef([]),
    n = h.useRef([0, 0]),
    r = h.useRef(),
    o = h.useState(Fw++)[0],
    i = h.useState(_p)[0],
    l = h.useRef(e);
  h.useEffect(
    function () {
      l.current = e;
    },
    [e]
  ),
    h.useEffect(
      function () {
        if (e.inert) {
          document.body.classList.add("block-interactivity-".concat(o));
          var y = Rs([e.lockRef.current], (e.shards || []).map(vc), !0).filter(
            Boolean
          );
          return (
            y.forEach(function (x) {
              return x.classList.add("allow-interactivity-".concat(o));
            }),
            function () {
              document.body.classList.remove("block-interactivity-".concat(o)),
                y.forEach(function (x) {
                  return x.classList.remove("allow-interactivity-".concat(o));
                });
            }
          );
        }
      },
      [e.inert, e.lockRef.current, e.shards]
    );
  var u = h.useCallback(function (y, x) {
      if (
        ("touches" in y && y.touches.length === 2) ||
        (y.type === "wheel" && y.ctrlKey)
      )
        return !l.current.allowPinchZoom;
      var d = wo(y),
        p = n.current,
        v = "deltaX" in y ? y.deltaX : p[0] - d[0],
        S = "deltaY" in y ? y.deltaY : p[1] - d[1],
        E,
        k = y.target,
        _ = Math.abs(v) > Math.abs(S) ? "h" : "v";
      if ("touches" in y && _ === "h" && k.type === "range") return !1;
      var M = mc(_, k);
      if (!M) return !0;
      if ((M ? (E = _) : ((E = _ === "v" ? "h" : "v"), (M = mc(_, k))), !M))
        return !1;
      if (
        (!r.current && "changedTouches" in y && (v || S) && (r.current = E), !E)
      )
        return !0;
      var A = r.current || E;
      return Aw(A, x, y, A === "h" ? v : S);
    }, []),
    s = h.useCallback(function (y) {
      var x = y;
      if (!(!yn.length || yn[yn.length - 1] !== i)) {
        var d = "deltaY" in x ? hc(x) : wo(x),
          p = t.current.filter(function (E) {
            return (
              E.name === x.type &&
              (E.target === x.target || x.target === E.shadowParent) &&
              Iw(E.delta, d)
            );
          })[0];
        if (p && p.should) {
          x.cancelable && x.preventDefault();
          return;
        }
        if (!p) {
          var v = (l.current.shards || [])
              .map(vc)
              .filter(Boolean)
              .filter(function (E) {
                return E.contains(x.target);
              }),
            S = v.length > 0 ? u(x, v[0]) : !l.current.noIsolation;
          S && x.cancelable && x.preventDefault();
        }
      }
    }, []),
    a = h.useCallback(function (y, x, d, p) {
      var v = { name: y, delta: x, target: d, should: p, shadowParent: zw(d) };
      t.current.push(v),
        setTimeout(function () {
          t.current = t.current.filter(function (S) {
            return S !== v;
          });
        }, 1);
    }, []),
    f = h.useCallback(function (y) {
      (n.current = wo(y)), (r.current = void 0);
    }, []),
    c = h.useCallback(function (y) {
      a(y.type, hc(y), y.target, u(y, e.lockRef.current));
    }, []),
    m = h.useCallback(function (y) {
      a(y.type, wo(y), y.target, u(y, e.lockRef.current));
    }, []);
  h.useEffect(function () {
    return (
      yn.push(i),
      e.setCallbacks({
        onScrollCapture: c,
        onWheelCapture: c,
        onTouchMoveCapture: m,
      }),
      document.addEventListener("wheel", s, gn),
      document.addEventListener("touchmove", s, gn),
      document.addEventListener("touchstart", f, gn),
      function () {
        (yn = yn.filter(function (y) {
          return y !== i;
        })),
          document.removeEventListener("wheel", s, gn),
          document.removeEventListener("touchmove", s, gn),
          document.removeEventListener("touchstart", f, gn);
      }
    );
  }, []);
  var g = e.removeScrollBar,
    w = e.inert;
  return h.createElement(
    h.Fragment,
    null,
    w ? h.createElement(i, { styles: Lw(o) }) : null,
    g
      ? h.createElement(kw, { noRelative: e.noRelative, gapMode: e.gapMode })
      : null
  );
}
function zw(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && ((t = e.host), (e = e.host)), (e = e.parentNode);
  return t;
}
const Uw = pw(Cp, jw);
var Ns = h.forwardRef(function (e, t) {
  return h.createElement(ji, je({}, e, { ref: t, sideCar: Uw }));
});
Ns.classNames = ji.classNames;
var $w = function (e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  },
  wn = new WeakMap(),
  So = new WeakMap(),
  xo = {},
  Cl = 0,
  Mp = function (e) {
    return e && (e.host || Mp(e.parentNode));
  },
  Bw = function (e, t) {
    return t
      .map(function (n) {
        if (e.contains(n)) return n;
        var r = Mp(n);
        return r && e.contains(r)
          ? r
          : (console.error(
              "aria-hidden",
              n,
              "in not contained inside",
              e,
              ". Doing nothing"
            ),
            null);
      })
      .filter(function (n) {
        return !!n;
      });
  },
  Ww = function (e, t, n, r) {
    var o = Bw(t, Array.isArray(e) ? e : [e]);
    xo[n] || (xo[n] = new WeakMap());
    var i = xo[n],
      l = [],
      u = new Set(),
      s = new Set(o),
      a = function (c) {
        !c || u.has(c) || (u.add(c), a(c.parentNode));
      };
    o.forEach(a);
    var f = function (c) {
      !c ||
        s.has(c) ||
        Array.prototype.forEach.call(c.children, function (m) {
          if (u.has(m)) f(m);
          else
            try {
              var g = m.getAttribute(r),
                w = g !== null && g !== "false",
                y = (wn.get(m) || 0) + 1,
                x = (i.get(m) || 0) + 1;
              wn.set(m, y),
                i.set(m, x),
                l.push(m),
                y === 1 && w && So.set(m, !0),
                x === 1 && m.setAttribute(n, "true"),
                w || m.setAttribute(r, "true");
            } catch (d) {
              console.error("aria-hidden: cannot operate on ", m, d);
            }
        });
    };
    return (
      f(t),
      u.clear(),
      Cl++,
      function () {
        l.forEach(function (c) {
          var m = wn.get(c) - 1,
            g = i.get(c) - 1;
          wn.set(c, m),
            i.set(c, g),
            m || (So.has(c) || c.removeAttribute(r), So.delete(c)),
            g || c.removeAttribute(n);
        }),
          Cl--,
          Cl ||
            ((wn = new WeakMap()),
            (wn = new WeakMap()),
            (So = new WeakMap()),
            (xo = {}));
      }
    );
  },
  Np = function (e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [e]),
      o = $w(e);
    return o
      ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live], script"))),
        Ww(r, o, n, "aria-hidden"))
      : function () {
          return null;
        };
  },
  zi = "Dialog",
  [Tp] = pn(zi),
  [Vw, Je] = Tp(zi),
  Op = (e) => {
    const {
        __scopeDialog: t,
        children: n,
        open: r,
        defaultOpen: o,
        onOpenChange: i,
        modal: l = !0,
      } = e,
      u = h.useRef(null),
      s = h.useRef(null),
      [a, f] = Ti({ prop: r, defaultProp: o ?? !1, onChange: i, caller: zi });
    return C.jsx(Vw, {
      scope: t,
      triggerRef: u,
      contentRef: s,
      contentId: nn(),
      titleId: nn(),
      descriptionId: nn(),
      open: a,
      onOpenChange: f,
      onOpenToggle: h.useCallback(() => f((c) => !c), [f]),
      modal: l,
      children: n,
    });
  };
Op.displayName = zi;
var Dp = "DialogTrigger",
  Ap = h.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Je(Dp, n),
      i = fe(t, o.triggerRef);
    return C.jsx(b.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": o.open,
      "aria-controls": o.contentId,
      "data-state": Ds(o.open),
      ...r,
      ref: i,
      onClick: I(e.onClick, o.onOpenToggle),
    });
  });
Ap.displayName = Dp;
var Ts = "DialogPortal",
  [Hw, Ip] = Tp(Ts, { forceMount: void 0 }),
  Lp = (e) => {
    const { __scopeDialog: t, forceMount: n, children: r, container: o } = e,
      i = Je(Ts, t);
    return C.jsx(Hw, {
      scope: t,
      forceMount: n,
      children: h.Children.map(r, (l) =>
        C.jsx(Et, {
          present: n || i.open,
          children: C.jsx(gs, { asChild: !0, container: o, children: l }),
        })
      ),
    });
  };
Lp.displayName = Ts;
var ci = "DialogOverlay",
  Fp = h.forwardRef((e, t) => {
    const n = Ip(ci, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Je(ci, e.__scopeDialog);
    return i.modal
      ? C.jsx(Et, {
          present: r || i.open,
          children: C.jsx(Gw, { ...o, ref: t }),
        })
      : null;
  });
Fp.displayName = ci;
var Kw = Qn("DialogOverlay.RemoveScroll"),
  Gw = h.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Je(ci, n);
    return C.jsx(Ns, {
      as: Kw,
      allowPinchZoom: !0,
      shards: [o.contentRef],
      children: C.jsx(b.div, {
        "data-state": Ds(o.open),
        ...r,
        ref: t,
        style: { pointerEvents: "auto", ...r.style },
      }),
    });
  }),
  cn = "DialogContent",
  jp = h.forwardRef((e, t) => {
    const n = Ip(cn, e.__scopeDialog),
      { forceMount: r = n.forceMount, ...o } = e,
      i = Je(cn, e.__scopeDialog);
    return C.jsx(Et, {
      present: r || i.open,
      children: i.modal
        ? C.jsx(Qw, { ...o, ref: t })
        : C.jsx(Yw, { ...o, ref: t }),
    });
  });
jp.displayName = cn;
var Qw = h.forwardRef((e, t) => {
    const n = Je(cn, e.__scopeDialog),
      r = h.useRef(null),
      o = fe(t, n.contentRef, r);
    return (
      h.useEffect(() => {
        const i = r.current;
        if (i) return Np(i);
      }, []),
      C.jsx(zp, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: I(e.onCloseAutoFocus, (i) => {
          i.preventDefault(), n.triggerRef.current?.focus();
        }),
        onPointerDownOutside: I(e.onPointerDownOutside, (i) => {
          const l = i.detail.originalEvent,
            u = l.button === 0 && l.ctrlKey === !0;
          (l.button === 2 || u) && i.preventDefault();
        }),
        onFocusOutside: I(e.onFocusOutside, (i) => i.preventDefault()),
      })
    );
  }),
  Yw = h.forwardRef((e, t) => {
    const n = Je(cn, e.__scopeDialog),
      r = h.useRef(!1),
      o = h.useRef(!1);
    return C.jsx(zp, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      onCloseAutoFocus: (i) => {
        e.onCloseAutoFocus?.(i),
          i.defaultPrevented ||
            (r.current || n.triggerRef.current?.focus(), i.preventDefault()),
          (r.current = !1),
          (o.current = !1);
      },
      onInteractOutside: (i) => {
        e.onInteractOutside?.(i),
          i.defaultPrevented ||
            ((r.current = !0),
            i.detail.originalEvent.type === "pointerdown" && (o.current = !0));
        const l = i.target;
        n.triggerRef.current?.contains(l) && i.preventDefault(),
          i.detail.originalEvent.type === "focusin" &&
            o.current &&
            i.preventDefault();
      },
    });
  }),
  zp = h.forwardRef((e, t) => {
    const {
        __scopeDialog: n,
        trapFocus: r,
        onOpenAutoFocus: o,
        onCloseAutoFocus: i,
        ...l
      } = e,
      u = Je(cn, n),
      s = h.useRef(null),
      a = fe(t, s);
    return (
      xp(),
      C.jsxs(C.Fragment, {
        children: [
          C.jsx(Ms, {
            asChild: !0,
            loop: !0,
            trapped: r,
            onMountAutoFocus: o,
            onUnmountAutoFocus: i,
            children: C.jsx(Ni, {
              role: "dialog",
              id: u.contentId,
              "aria-describedby": u.descriptionId,
              "aria-labelledby": u.titleId,
              "data-state": Ds(u.open),
              ...l,
              ref: a,
              onDismiss: () => u.onOpenChange(!1),
            }),
          }),
          C.jsxs(C.Fragment, {
            children: [
              C.jsx(Xw, { titleId: u.titleId }),
              C.jsx(Zw, { contentRef: s, descriptionId: u.descriptionId }),
            ],
          }),
        ],
      })
    );
  }),
  Os = "DialogTitle",
  Up = h.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Je(Os, n);
    return C.jsx(b.h2, { id: o.titleId, ...r, ref: t });
  });
Up.displayName = Os;
var $p = "DialogDescription",
  Bp = h.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Je($p, n);
    return C.jsx(b.p, { id: o.descriptionId, ...r, ref: t });
  });
Bp.displayName = $p;
var Wp = "DialogClose",
  Vp = h.forwardRef((e, t) => {
    const { __scopeDialog: n, ...r } = e,
      o = Je(Wp, n);
    return C.jsx(b.button, {
      type: "button",
      ...r,
      ref: t,
      onClick: I(e.onClick, () => o.onOpenChange(!1)),
    });
  });
Vp.displayName = Wp;
function Ds(e) {
  return e ? "open" : "closed";
}
var Hp = "DialogTitleWarning",
  [_1, Kp] = rg(Hp, { contentName: cn, titleName: Os, docsSlug: "dialog" }),
  Xw = ({ titleId: e }) => {
    const t = Kp(Hp),
      n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
    return (
      h.useEffect(() => {
        e && (document.getElementById(e) || console.error(n));
      }, [n, e]),
      null
    );
  },
  bw = "DialogDescriptionWarning",
  Zw = ({ contentRef: e, descriptionId: t }) => {
    const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${
      Kp(bw).contentName
    }}.`;
    return (
      h.useEffect(() => {
        const o = e.current?.getAttribute("aria-describedby");
        t && o && (document.getElementById(t) || console.warn(r));
      }, [r, e, t]),
      null
    );
  },
  P1 = Op,
  k1 = Ap,
  R1 = Lp,
  M1 = Fp,
  N1 = jp,
  T1 = Up,
  O1 = Bp,
  D1 = Vp,
  Jw = h.createContext(void 0);
function As(e) {
  const t = h.useContext(Jw);
  return e || t || "ltr";
}
var _l = "rovingFocusGroup.onEntryFocus",
  qw = { bubbles: !1, cancelable: !0 },
  Xr = "RovingFocusGroup",
  [_u, Gp, e0] = Ed(Xr),
  [t0, Ui] = pn(Xr, [e0]),
  [n0, r0] = t0(Xr),
  Qp = h.forwardRef((e, t) =>
    C.jsx(_u.Provider, {
      scope: e.__scopeRovingFocusGroup,
      children: C.jsx(_u.Slot, {
        scope: e.__scopeRovingFocusGroup,
        children: C.jsx(o0, { ...e, ref: t }),
      }),
    })
  );
Qp.displayName = Xr;
var o0 = h.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        orientation: r,
        loop: o = !1,
        dir: i,
        currentTabStopId: l,
        defaultCurrentTabStopId: u,
        onCurrentTabStopIdChange: s,
        onEntryFocus: a,
        preventScrollOnEntryFocus: f = !1,
        ...c
      } = e,
      m = h.useRef(null),
      g = fe(t, m),
      w = As(i),
      [y, x] = Ti({ prop: l, defaultProp: u ?? null, onChange: s, caller: Xr }),
      [d, p] = h.useState(!1),
      v = yt(a),
      S = Gp(n),
      E = h.useRef(!1),
      [k, _] = h.useState(0);
    return (
      h.useEffect(() => {
        const M = m.current;
        if (M)
          return M.addEventListener(_l, v), () => M.removeEventListener(_l, v);
      }, [v]),
      C.jsx(n0, {
        scope: n,
        orientation: r,
        dir: w,
        loop: o,
        currentTabStopId: y,
        onItemFocus: h.useCallback((M) => x(M), [x]),
        onItemShiftTab: h.useCallback(() => p(!0), []),
        onFocusableItemAdd: h.useCallback(() => _((M) => M + 1), []),
        onFocusableItemRemove: h.useCallback(() => _((M) => M - 1), []),
        children: C.jsx(b.div, {
          tabIndex: d || k === 0 ? -1 : 0,
          "data-orientation": r,
          ...c,
          ref: g,
          style: { outline: "none", ...e.style },
          onMouseDown: I(e.onMouseDown, () => {
            E.current = !0;
          }),
          onFocus: I(e.onFocus, (M) => {
            const A = !E.current;
            if (M.target === M.currentTarget && A && !d) {
              const T = new CustomEvent(_l, qw);
              if ((M.currentTarget.dispatchEvent(T), !T.defaultPrevented)) {
                const L = S().filter((F) => F.focusable),
                  W = L.find((F) => F.active),
                  U = L.find((F) => F.id === y),
                  re = [W, U, ...L].filter(Boolean).map((F) => F.ref.current);
                bp(re, f);
              }
            }
            E.current = !1;
          }),
          onBlur: I(e.onBlur, () => p(!1)),
        }),
      })
    );
  }),
  Yp = "RovingFocusGroupItem",
  Xp = h.forwardRef((e, t) => {
    const {
        __scopeRovingFocusGroup: n,
        focusable: r = !0,
        active: o = !1,
        tabStopId: i,
        children: l,
        ...u
      } = e,
      s = nn(),
      a = i || s,
      f = r0(Yp, n),
      c = f.currentTabStopId === a,
      m = Gp(n),
      {
        onFocusableItemAdd: g,
        onFocusableItemRemove: w,
        currentTabStopId: y,
      } = f;
    return (
      h.useEffect(() => {
        if (r) return g(), () => w();
      }, [r, g, w]),
      C.jsx(_u.ItemSlot, {
        scope: n,
        id: a,
        focusable: r,
        active: o,
        children: C.jsx(b.span, {
          tabIndex: c ? 0 : -1,
          "data-orientation": f.orientation,
          ...u,
          ref: t,
          onMouseDown: I(e.onMouseDown, (x) => {
            r ? f.onItemFocus(a) : x.preventDefault();
          }),
          onFocus: I(e.onFocus, () => f.onItemFocus(a)),
          onKeyDown: I(e.onKeyDown, (x) => {
            if (x.key === "Tab" && x.shiftKey) {
              f.onItemShiftTab();
              return;
            }
            if (x.target !== x.currentTarget) return;
            const d = u0(x, f.orientation, f.dir);
            if (d !== void 0) {
              if (x.metaKey || x.ctrlKey || x.altKey || x.shiftKey) return;
              x.preventDefault();
              let v = m()
                .filter((S) => S.focusable)
                .map((S) => S.ref.current);
              if (d === "last") v.reverse();
              else if (d === "prev" || d === "next") {
                d === "prev" && v.reverse();
                const S = v.indexOf(x.currentTarget);
                v = f.loop ? s0(v, S + 1) : v.slice(S + 1);
              }
              setTimeout(() => bp(v));
            }
          }),
          children:
            typeof l == "function"
              ? l({ isCurrentTabStop: c, hasTabStop: y != null })
              : l,
        }),
      })
    );
  });
Xp.displayName = Yp;
var i0 = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last",
};
function l0(e, t) {
  return t !== "rtl"
    ? e
    : e === "ArrowLeft"
    ? "ArrowRight"
    : e === "ArrowRight"
    ? "ArrowLeft"
    : e;
}
function u0(e, t, n) {
  const r = l0(e.key, n);
  if (
    !(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) &&
    !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r))
  )
    return i0[r];
}
function bp(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (
      r === n ||
      (r.focus({ preventScroll: t }), document.activeElement !== n)
    )
      return;
}
function s0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Zp = Qp,
  Jp = Xp,
  Pu = ["Enter", " "],
  a0 = ["ArrowDown", "PageUp", "Home"],
  qp = ["ArrowUp", "PageDown", "End"],
  c0 = [...a0, ...qp],
  f0 = { ltr: [...Pu, "ArrowRight"], rtl: [...Pu, "ArrowLeft"] },
  d0 = { ltr: ["ArrowLeft"], rtl: ["ArrowRight"] },
  br = "Menu",
  [Wr, p0, m0] = Ed(br),
  [mn, em] = pn(br, [m0, $d, Ui]),
  $i = $d(),
  tm = Ui(),
  [h0, hn] = mn(br),
  [v0, Zr] = mn(br),
  nm = (e) => {
    const {
        __scopeMenu: t,
        open: n = !1,
        children: r,
        dir: o,
        onOpenChange: i,
        modal: l = !0,
      } = e,
      u = $i(t),
      [s, a] = h.useState(null),
      f = h.useRef(!1),
      c = yt(i),
      m = As(o);
    return (
      h.useEffect(() => {
        const g = () => {
            (f.current = !0),
              document.addEventListener("pointerdown", w, {
                capture: !0,
                once: !0,
              }),
              document.addEventListener("pointermove", w, {
                capture: !0,
                once: !0,
              });
          },
          w = () => (f.current = !1);
        return (
          document.addEventListener("keydown", g, { capture: !0 }),
          () => {
            document.removeEventListener("keydown", g, { capture: !0 }),
              document.removeEventListener("pointerdown", w, { capture: !0 }),
              document.removeEventListener("pointermove", w, { capture: !0 });
          }
        );
      }, []),
      C.jsx(Ky, {
        ...u,
        children: C.jsx(h0, {
          scope: t,
          open: n,
          onOpenChange: c,
          content: s,
          onContentChange: a,
          children: C.jsx(v0, {
            scope: t,
            onClose: h.useCallback(() => c(!1), [c]),
            isUsingKeyboardRef: f,
            dir: m,
            modal: l,
            children: r,
          }),
        }),
      })
    );
  };
nm.displayName = br;
var g0 = "MenuAnchor",
  Is = h.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = $i(n);
    return C.jsx(Gy, { ...o, ...r, ref: t });
  });
Is.displayName = g0;
var Ls = "MenuPortal",
  [y0, rm] = mn(Ls, { forceMount: void 0 }),
  om = (e) => {
    const { __scopeMenu: t, forceMount: n, children: r, container: o } = e,
      i = hn(Ls, t);
    return C.jsx(y0, {
      scope: t,
      forceMount: n,
      children: C.jsx(Et, {
        present: n || i.open,
        children: C.jsx(gs, { asChild: !0, container: o, children: r }),
      }),
    });
  };
om.displayName = Ls;
var $e = "MenuContent",
  [w0, Fs] = mn($e),
  im = h.forwardRef((e, t) => {
    const n = rm($e, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      i = hn($e, e.__scopeMenu),
      l = Zr($e, e.__scopeMenu);
    return C.jsx(Wr.Provider, {
      scope: e.__scopeMenu,
      children: C.jsx(Et, {
        present: r || i.open,
        children: C.jsx(Wr.Slot, {
          scope: e.__scopeMenu,
          children: l.modal
            ? C.jsx(S0, { ...o, ref: t })
            : C.jsx(x0, { ...o, ref: t }),
        }),
      }),
    });
  }),
  S0 = h.forwardRef((e, t) => {
    const n = hn($e, e.__scopeMenu),
      r = h.useRef(null),
      o = fe(t, r);
    return (
      h.useEffect(() => {
        const i = r.current;
        if (i) return Np(i);
      }, []),
      C.jsx(js, {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: I(e.onFocusOutside, (i) => i.preventDefault(), {
          checkForDefaultPrevented: !1,
        }),
        onDismiss: () => n.onOpenChange(!1),
      })
    );
  }),
  x0 = h.forwardRef((e, t) => {
    const n = hn($e, e.__scopeMenu);
    return C.jsx(js, {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1),
    });
  }),
  E0 = Qn("MenuContent.ScrollLock"),
  js = h.forwardRef((e, t) => {
    const {
        __scopeMenu: n,
        loop: r = !1,
        trapFocus: o,
        onOpenAutoFocus: i,
        onCloseAutoFocus: l,
        disableOutsidePointerEvents: u,
        onEntryFocus: s,
        onEscapeKeyDown: a,
        onPointerDownOutside: f,
        onFocusOutside: c,
        onInteractOutside: m,
        onDismiss: g,
        disableOutsideScroll: w,
        ...y
      } = e,
      x = hn($e, n),
      d = Zr($e, n),
      p = $i(n),
      v = tm(n),
      S = p0(n),
      [E, k] = h.useState(null),
      _ = h.useRef(null),
      M = fe(t, _, x.onContentChange),
      A = h.useRef(0),
      T = h.useRef(""),
      L = h.useRef(0),
      W = h.useRef(null),
      U = h.useRef("right"),
      $ = h.useRef(0),
      re = w ? Ns : h.Fragment,
      F = w ? { as: E0, allowPinchZoom: !0 } : void 0,
      K = (R) => {
        const D = T.current + R,
          z = S().filter((Y) => !Y.disabled),
          V = document.activeElement,
          qe = z.find((Y) => Y.ref.current === V)?.textValue,
          ke = z.map((Y) => Y.textValue),
          Ct = I0(ke, D, qe),
          ve = z.find((Y) => Y.textValue === Ct)?.ref.current;
        (function Y(tr) {
          (T.current = tr),
            window.clearTimeout(A.current),
            tr !== "" && (A.current = window.setTimeout(() => Y(""), 1e3));
        })(D),
          ve && setTimeout(() => ve.focus());
      };
    h.useEffect(() => () => window.clearTimeout(A.current), []), xp();
    const P = h.useCallback(
      (R) => U.current === W.current?.side && F0(R, W.current?.area),
      []
    );
    return C.jsx(w0, {
      scope: n,
      searchRef: T,
      onItemEnter: h.useCallback(
        (R) => {
          P(R) && R.preventDefault();
        },
        [P]
      ),
      onItemLeave: h.useCallback(
        (R) => {
          P(R) || (_.current?.focus(), k(null));
        },
        [P]
      ),
      onTriggerLeave: h.useCallback(
        (R) => {
          P(R) && R.preventDefault();
        },
        [P]
      ),
      pointerGraceTimerRef: L,
      onPointerGraceIntentChange: h.useCallback((R) => {
        W.current = R;
      }, []),
      children: C.jsx(re, {
        ...F,
        children: C.jsx(Ms, {
          asChild: !0,
          trapped: o,
          onMountAutoFocus: I(i, (R) => {
            R.preventDefault(), _.current?.focus({ preventScroll: !0 });
          }),
          onUnmountAutoFocus: l,
          children: C.jsx(Ni, {
            asChild: !0,
            disableOutsidePointerEvents: u,
            onEscapeKeyDown: a,
            onPointerDownOutside: f,
            onFocusOutside: c,
            onInteractOutside: m,
            onDismiss: g,
            children: C.jsx(Zp, {
              asChild: !0,
              ...v,
              dir: d.dir,
              orientation: "vertical",
              loop: r,
              currentTabStopId: E,
              onCurrentTabStopIdChange: k,
              onEntryFocus: I(s, (R) => {
                d.isUsingKeyboardRef.current || R.preventDefault();
              }),
              preventScrollOnEntryFocus: !0,
              children: C.jsx(Qy, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": xm(x.open),
                "data-radix-menu-content": "",
                dir: d.dir,
                ...p,
                ...y,
                ref: M,
                style: { outline: "none", ...y.style },
                onKeyDown: I(y.onKeyDown, (R) => {
                  const z =
                      R.target.closest("[data-radix-menu-content]") ===
                      R.currentTarget,
                    V = R.ctrlKey || R.altKey || R.metaKey,
                    qe = R.key.length === 1;
                  z &&
                    (R.key === "Tab" && R.preventDefault(),
                    !V && qe && K(R.key));
                  const ke = _.current;
                  if (R.target !== ke || !c0.includes(R.key)) return;
                  R.preventDefault();
                  const ve = S()
                    .filter((Y) => !Y.disabled)
                    .map((Y) => Y.ref.current);
                  qp.includes(R.key) && ve.reverse(), D0(ve);
                }),
                onBlur: I(e.onBlur, (R) => {
                  R.currentTarget.contains(R.target) ||
                    (window.clearTimeout(A.current), (T.current = ""));
                }),
                onPointerMove: I(
                  e.onPointerMove,
                  Vr((R) => {
                    const D = R.target,
                      z = $.current !== R.clientX;
                    if (R.currentTarget.contains(D) && z) {
                      const V = R.clientX > $.current ? "right" : "left";
                      (U.current = V), ($.current = R.clientX);
                    }
                  })
                ),
              }),
            }),
          }),
        }),
      }),
    });
  });
im.displayName = $e;
var C0 = "MenuGroup",
  zs = h.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return C.jsx(b.div, { role: "group", ...r, ref: t });
  });
zs.displayName = C0;
var _0 = "MenuLabel",
  lm = h.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return C.jsx(b.div, { ...r, ref: t });
  });
lm.displayName = _0;
var fi = "MenuItem",
  gc = "menu.itemSelect",
  Bi = h.forwardRef((e, t) => {
    const { disabled: n = !1, onSelect: r, ...o } = e,
      i = h.useRef(null),
      l = Zr(fi, e.__scopeMenu),
      u = Fs(fi, e.__scopeMenu),
      s = fe(t, i),
      a = h.useRef(!1),
      f = () => {
        const c = i.current;
        if (!n && c) {
          const m = new CustomEvent(gc, { bubbles: !0, cancelable: !0 });
          c.addEventListener(gc, (g) => r?.(g), { once: !0 }),
            Cd(c, m),
            m.defaultPrevented ? (a.current = !1) : l.onClose();
        }
      };
    return C.jsx(um, {
      ...o,
      ref: s,
      disabled: n,
      onClick: I(e.onClick, f),
      onPointerDown: (c) => {
        e.onPointerDown?.(c), (a.current = !0);
      },
      onPointerUp: I(e.onPointerUp, (c) => {
        a.current || c.currentTarget?.click();
      }),
      onKeyDown: I(e.onKeyDown, (c) => {
        const m = u.searchRef.current !== "";
        n ||
          (m && c.key === " ") ||
          (Pu.includes(c.key) && (c.currentTarget.click(), c.preventDefault()));
      }),
    });
  });
Bi.displayName = fi;
var um = h.forwardRef((e, t) => {
    const { __scopeMenu: n, disabled: r = !1, textValue: o, ...i } = e,
      l = Fs(fi, n),
      u = tm(n),
      s = h.useRef(null),
      a = fe(t, s),
      [f, c] = h.useState(!1),
      [m, g] = h.useState("");
    return (
      h.useEffect(() => {
        const w = s.current;
        w && g((w.textContent ?? "").trim());
      }, [i.children]),
      C.jsx(Wr.ItemSlot, {
        scope: n,
        disabled: r,
        textValue: o ?? m,
        children: C.jsx(Jp, {
          asChild: !0,
          ...u,
          focusable: !r,
          children: C.jsx(b.div, {
            role: "menuitem",
            "data-highlighted": f ? "" : void 0,
            "aria-disabled": r || void 0,
            "data-disabled": r ? "" : void 0,
            ...i,
            ref: a,
            onPointerMove: I(
              e.onPointerMove,
              Vr((w) => {
                r
                  ? l.onItemLeave(w)
                  : (l.onItemEnter(w),
                    w.defaultPrevented ||
                      w.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: I(
              e.onPointerLeave,
              Vr((w) => l.onItemLeave(w))
            ),
            onFocus: I(e.onFocus, () => c(!0)),
            onBlur: I(e.onBlur, () => c(!1)),
          }),
        }),
      })
    );
  }),
  P0 = "MenuCheckboxItem",
  sm = h.forwardRef((e, t) => {
    const { checked: n = !1, onCheckedChange: r, ...o } = e;
    return C.jsx(pm, {
      scope: e.__scopeMenu,
      checked: n,
      children: C.jsx(Bi, {
        role: "menuitemcheckbox",
        "aria-checked": di(n) ? "mixed" : n,
        ...o,
        ref: t,
        "data-state": $s(n),
        onSelect: I(o.onSelect, () => r?.(di(n) ? !0 : !n), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
sm.displayName = P0;
var am = "MenuRadioGroup",
  [k0, R0] = mn(am, { value: void 0, onValueChange: () => {} }),
  cm = h.forwardRef((e, t) => {
    const { value: n, onValueChange: r, ...o } = e,
      i = yt(r);
    return C.jsx(k0, {
      scope: e.__scopeMenu,
      value: n,
      onValueChange: i,
      children: C.jsx(zs, { ...o, ref: t }),
    });
  });
cm.displayName = am;
var fm = "MenuRadioItem",
  dm = h.forwardRef((e, t) => {
    const { value: n, ...r } = e,
      o = R0(fm, e.__scopeMenu),
      i = n === o.value;
    return C.jsx(pm, {
      scope: e.__scopeMenu,
      checked: i,
      children: C.jsx(Bi, {
        role: "menuitemradio",
        "aria-checked": i,
        ...r,
        ref: t,
        "data-state": $s(i),
        onSelect: I(r.onSelect, () => o.onValueChange?.(n), {
          checkForDefaultPrevented: !1,
        }),
      }),
    });
  });
dm.displayName = fm;
var Us = "MenuItemIndicator",
  [pm, M0] = mn(Us, { checked: !1 }),
  mm = h.forwardRef((e, t) => {
    const { __scopeMenu: n, forceMount: r, ...o } = e,
      i = M0(Us, n);
    return C.jsx(Et, {
      present: r || di(i.checked) || i.checked === !0,
      children: C.jsx(b.span, { ...o, ref: t, "data-state": $s(i.checked) }),
    });
  });
mm.displayName = Us;
var N0 = "MenuSeparator",
  hm = h.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e;
    return C.jsx(b.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...r,
      ref: t,
    });
  });
hm.displayName = N0;
var T0 = "MenuArrow",
  vm = h.forwardRef((e, t) => {
    const { __scopeMenu: n, ...r } = e,
      o = $i(n);
    return C.jsx(Yy, { ...o, ...r, ref: t });
  });
vm.displayName = T0;
var O0 = "MenuSub",
  [A1, gm] = mn(O0),
  mr = "MenuSubTrigger",
  ym = h.forwardRef((e, t) => {
    const n = hn(mr, e.__scopeMenu),
      r = Zr(mr, e.__scopeMenu),
      o = gm(mr, e.__scopeMenu),
      i = Fs(mr, e.__scopeMenu),
      l = h.useRef(null),
      { pointerGraceTimerRef: u, onPointerGraceIntentChange: s } = i,
      a = { __scopeMenu: e.__scopeMenu },
      f = h.useCallback(() => {
        l.current && window.clearTimeout(l.current), (l.current = null);
      }, []);
    return (
      h.useEffect(() => f, [f]),
      h.useEffect(() => {
        const c = u.current;
        return () => {
          window.clearTimeout(c), s(null);
        };
      }, [u, s]),
      C.jsx(Is, {
        asChild: !0,
        ...a,
        children: C.jsx(um, {
          id: o.triggerId,
          "aria-haspopup": "menu",
          "aria-expanded": n.open,
          "aria-controls": o.contentId,
          "data-state": xm(n.open),
          ...e,
          ref: Mi(t, o.onTriggerChange),
          onClick: (c) => {
            e.onClick?.(c),
              !(e.disabled || c.defaultPrevented) &&
                (c.currentTarget.focus(), n.open || n.onOpenChange(!0));
          },
          onPointerMove: I(
            e.onPointerMove,
            Vr((c) => {
              i.onItemEnter(c),
                !c.defaultPrevented &&
                  !e.disabled &&
                  !n.open &&
                  !l.current &&
                  (i.onPointerGraceIntentChange(null),
                  (l.current = window.setTimeout(() => {
                    n.onOpenChange(!0), f();
                  }, 100)));
            })
          ),
          onPointerLeave: I(
            e.onPointerLeave,
            Vr((c) => {
              f();
              const m = n.content?.getBoundingClientRect();
              if (m) {
                const g = n.content?.dataset.side,
                  w = g === "right",
                  y = w ? -5 : 5,
                  x = m[w ? "left" : "right"],
                  d = m[w ? "right" : "left"];
                i.onPointerGraceIntentChange({
                  area: [
                    { x: c.clientX + y, y: c.clientY },
                    { x, y: m.top },
                    { x: d, y: m.top },
                    { x: d, y: m.bottom },
                    { x, y: m.bottom },
                  ],
                  side: g,
                }),
                  window.clearTimeout(u.current),
                  (u.current = window.setTimeout(
                    () => i.onPointerGraceIntentChange(null),
                    300
                  ));
              } else {
                if ((i.onTriggerLeave(c), c.defaultPrevented)) return;
                i.onPointerGraceIntentChange(null);
              }
            })
          ),
          onKeyDown: I(e.onKeyDown, (c) => {
            const m = i.searchRef.current !== "";
            e.disabled ||
              (m && c.key === " ") ||
              (f0[r.dir].includes(c.key) &&
                (n.onOpenChange(!0), n.content?.focus(), c.preventDefault()));
          }),
        }),
      })
    );
  });
ym.displayName = mr;
var wm = "MenuSubContent",
  Sm = h.forwardRef((e, t) => {
    const n = rm($e, e.__scopeMenu),
      { forceMount: r = n.forceMount, ...o } = e,
      i = hn($e, e.__scopeMenu),
      l = Zr($e, e.__scopeMenu),
      u = gm(wm, e.__scopeMenu),
      s = h.useRef(null),
      a = fe(t, s);
    return C.jsx(Wr.Provider, {
      scope: e.__scopeMenu,
      children: C.jsx(Et, {
        present: r || i.open,
        children: C.jsx(Wr.Slot, {
          scope: e.__scopeMenu,
          children: C.jsx(js, {
            id: u.contentId,
            "aria-labelledby": u.triggerId,
            ...o,
            ref: a,
            align: "start",
            side: l.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: !1,
            disableOutsideScroll: !1,
            trapFocus: !1,
            onOpenAutoFocus: (f) => {
              l.isUsingKeyboardRef.current && s.current?.focus(),
                f.preventDefault();
            },
            onCloseAutoFocus: (f) => f.preventDefault(),
            onFocusOutside: I(e.onFocusOutside, (f) => {
              f.target !== u.trigger && i.onOpenChange(!1);
            }),
            onEscapeKeyDown: I(e.onEscapeKeyDown, (f) => {
              l.onClose(), f.preventDefault();
            }),
            onKeyDown: I(e.onKeyDown, (f) => {
              const c = f.currentTarget.contains(f.target),
                m = d0[l.dir].includes(f.key);
              c &&
                m &&
                (i.onOpenChange(!1), u.trigger?.focus(), f.preventDefault());
            }),
          }),
        }),
      }),
    });
  });
Sm.displayName = wm;
function xm(e) {
  return e ? "open" : "closed";
}
function di(e) {
  return e === "indeterminate";
}
function $s(e) {
  return di(e) ? "indeterminate" : e ? "checked" : "unchecked";
}
function D0(e) {
  const t = document.activeElement;
  for (const n of e)
    if (n === t || (n.focus(), document.activeElement !== t)) return;
}
function A0(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
function I0(e, t, n) {
  const o = t.length > 1 && Array.from(t).every((a) => a === t[0]) ? t[0] : t,
    i = n ? e.indexOf(n) : -1;
  let l = A0(e, Math.max(i, 0));
  o.length === 1 && (l = l.filter((a) => a !== n));
  const s = l.find((a) => a.toLowerCase().startsWith(o.toLowerCase()));
  return s !== n ? s : void 0;
}
function L0(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let i = 0, l = t.length - 1; i < t.length; l = i++) {
    const u = t[i],
      s = t[l],
      a = u.x,
      f = u.y,
      c = s.x,
      m = s.y;
    f > r != m > r && n < ((c - a) * (r - f)) / (m - f) + a && (o = !o);
  }
  return o;
}
function F0(e, t) {
  if (!t) return !1;
  const n = { x: e.clientX, y: e.clientY };
  return L0(n, t);
}
function Vr(e) {
  return (t) => (t.pointerType === "mouse" ? e(t) : void 0);
}
var j0 = nm,
  z0 = Is,
  U0 = om,
  $0 = im,
  B0 = zs,
  W0 = lm,
  V0 = Bi,
  H0 = sm,
  K0 = cm,
  G0 = dm,
  Q0 = mm,
  Y0 = hm,
  X0 = vm,
  b0 = ym,
  Z0 = Sm,
  Wi = "DropdownMenu",
  [J0] = pn(Wi, [em]),
  Se = em(),
  [q0, Em] = J0(Wi),
  Cm = (e) => {
    const {
        __scopeDropdownMenu: t,
        children: n,
        dir: r,
        open: o,
        defaultOpen: i,
        onOpenChange: l,
        modal: u = !0,
      } = e,
      s = Se(t),
      a = h.useRef(null),
      [f, c] = Ti({ prop: o, defaultProp: i ?? !1, onChange: l, caller: Wi });
    return C.jsx(q0, {
      scope: t,
      triggerId: nn(),
      triggerRef: a,
      contentId: nn(),
      open: f,
      onOpenChange: c,
      onOpenToggle: h.useCallback(() => c((m) => !m), [c]),
      modal: u,
      children: C.jsx(j0, {
        ...s,
        open: f,
        onOpenChange: c,
        dir: r,
        modal: u,
        children: n,
      }),
    });
  };
Cm.displayName = Wi;
var _m = "DropdownMenuTrigger",
  Pm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, disabled: r = !1, ...o } = e,
      i = Em(_m, n),
      l = Se(n);
    return C.jsx(z0, {
      asChild: !0,
      ...l,
      children: C.jsx(b.button, {
        type: "button",
        id: i.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? i.contentId : void 0,
        "data-state": i.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...o,
        ref: Mi(t, i.triggerRef),
        onPointerDown: I(e.onPointerDown, (u) => {
          !r &&
            u.button === 0 &&
            u.ctrlKey === !1 &&
            (i.onOpenToggle(), i.open || u.preventDefault());
        }),
        onKeyDown: I(e.onKeyDown, (u) => {
          r ||
            (["Enter", " "].includes(u.key) && i.onOpenToggle(),
            u.key === "ArrowDown" && i.onOpenChange(!0),
            ["Enter", " ", "ArrowDown"].includes(u.key) && u.preventDefault());
        }),
      }),
    });
  });
Pm.displayName = _m;
var e1 = "DropdownMenuPortal",
  km = (e) => {
    const { __scopeDropdownMenu: t, ...n } = e,
      r = Se(t);
    return C.jsx(U0, { ...r, ...n });
  };
km.displayName = e1;
var Rm = "DropdownMenuContent",
  Mm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Em(Rm, n),
      i = Se(n),
      l = h.useRef(!1);
    return C.jsx($0, {
      id: o.contentId,
      "aria-labelledby": o.triggerId,
      ...i,
      ...r,
      ref: t,
      onCloseAutoFocus: I(e.onCloseAutoFocus, (u) => {
        l.current || o.triggerRef.current?.focus(),
          (l.current = !1),
          u.preventDefault();
      }),
      onInteractOutside: I(e.onInteractOutside, (u) => {
        const s = u.detail.originalEvent,
          a = s.button === 0 && s.ctrlKey === !0,
          f = s.button === 2 || a;
        (!o.modal || f) && (l.current = !0);
      }),
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Mm.displayName = Rm;
var t1 = "DropdownMenuGroup",
  n1 = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(B0, { ...o, ...r, ref: t });
  });
n1.displayName = t1;
var r1 = "DropdownMenuLabel",
  Nm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(W0, { ...o, ...r, ref: t });
  });
Nm.displayName = r1;
var o1 = "DropdownMenuItem",
  Tm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(V0, { ...o, ...r, ref: t });
  });
Tm.displayName = o1;
var i1 = "DropdownMenuCheckboxItem",
  Om = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(H0, { ...o, ...r, ref: t });
  });
Om.displayName = i1;
var l1 = "DropdownMenuRadioGroup",
  u1 = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(K0, { ...o, ...r, ref: t });
  });
u1.displayName = l1;
var s1 = "DropdownMenuRadioItem",
  Dm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(G0, { ...o, ...r, ref: t });
  });
Dm.displayName = s1;
var a1 = "DropdownMenuItemIndicator",
  Am = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(Q0, { ...o, ...r, ref: t });
  });
Am.displayName = a1;
var c1 = "DropdownMenuSeparator",
  Im = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(Y0, { ...o, ...r, ref: t });
  });
Im.displayName = c1;
var f1 = "DropdownMenuArrow",
  d1 = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(X0, { ...o, ...r, ref: t });
  });
d1.displayName = f1;
var p1 = "DropdownMenuSubTrigger",
  Lm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(b0, { ...o, ...r, ref: t });
  });
Lm.displayName = p1;
var m1 = "DropdownMenuSubContent",
  Fm = h.forwardRef((e, t) => {
    const { __scopeDropdownMenu: n, ...r } = e,
      o = Se(n);
    return C.jsx(Z0, {
      ...o,
      ...r,
      ref: t,
      style: {
        ...e.style,
        "--radix-dropdown-menu-content-transform-origin":
          "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width":
          "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height":
          "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width":
          "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height":
          "var(--radix-popper-anchor-height)",
      },
    });
  });
Fm.displayName = m1;
var I1 = Cm,
  L1 = Pm,
  F1 = km,
  j1 = Mm,
  z1 = Nm,
  U1 = Tm,
  $1 = Om,
  B1 = Dm,
  W1 = Am,
  V1 = Im,
  H1 = Lm,
  K1 = Fm,
  Vi = "Tabs",
  [h1] = pn(Vi, [Ui]),
  jm = Ui(),
  [v1, Bs] = h1(Vi),
  zm = h.forwardRef((e, t) => {
    const {
        __scopeTabs: n,
        value: r,
        onValueChange: o,
        defaultValue: i,
        orientation: l = "horizontal",
        dir: u,
        activationMode: s = "automatic",
        ...a
      } = e,
      f = As(u),
      [c, m] = Ti({ prop: r, onChange: o, defaultProp: i ?? "", caller: Vi });
    return C.jsx(v1, {
      scope: n,
      baseId: nn(),
      value: c,
      onValueChange: m,
      orientation: l,
      dir: f,
      activationMode: s,
      children: C.jsx(b.div, { dir: f, "data-orientation": l, ...a, ref: t }),
    });
  });
zm.displayName = Vi;
var Um = "TabsList",
  $m = h.forwardRef((e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e,
      i = Bs(Um, n),
      l = jm(n);
    return C.jsx(Zp, {
      asChild: !0,
      ...l,
      orientation: i.orientation,
      dir: i.dir,
      loop: r,
      children: C.jsx(b.div, {
        role: "tablist",
        "aria-orientation": i.orientation,
        ...o,
        ref: t,
      }),
    });
  });
$m.displayName = Um;
var Bm = "TabsTrigger",
  Wm = h.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...i } = e,
      l = Bs(Bm, n),
      u = jm(n),
      s = Km(l.baseId, r),
      a = Gm(l.baseId, r),
      f = r === l.value;
    return C.jsx(Jp, {
      asChild: !0,
      ...u,
      focusable: !o,
      active: f,
      children: C.jsx(b.button, {
        type: "button",
        role: "tab",
        "aria-selected": f,
        "aria-controls": a,
        "data-state": f ? "active" : "inactive",
        "data-disabled": o ? "" : void 0,
        disabled: o,
        id: s,
        ...i,
        ref: t,
        onMouseDown: I(e.onMouseDown, (c) => {
          !o && c.button === 0 && c.ctrlKey === !1
            ? l.onValueChange(r)
            : c.preventDefault();
        }),
        onKeyDown: I(e.onKeyDown, (c) => {
          [" ", "Enter"].includes(c.key) && l.onValueChange(r);
        }),
        onFocus: I(e.onFocus, () => {
          const c = l.activationMode !== "manual";
          !f && !o && c && l.onValueChange(r);
        }),
      }),
    });
  });
Wm.displayName = Bm;
var Vm = "TabsContent",
  Hm = h.forwardRef((e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: i, ...l } = e,
      u = Bs(Vm, n),
      s = Km(u.baseId, r),
      a = Gm(u.baseId, r),
      f = r === u.value,
      c = h.useRef(f);
    return (
      h.useEffect(() => {
        const m = requestAnimationFrame(() => (c.current = !1));
        return () => cancelAnimationFrame(m);
      }, []),
      C.jsx(Et, {
        present: o || f,
        children: ({ present: m }) =>
          C.jsx(b.div, {
            "data-state": f ? "active" : "inactive",
            "data-orientation": u.orientation,
            role: "tabpanel",
            "aria-labelledby": s,
            hidden: !m,
            id: a,
            tabIndex: 0,
            ...l,
            ref: t,
            style: { ...e.style, animationDuration: c.current ? "0s" : void 0 },
            children: m && i,
          }),
      })
    );
  });
Hm.displayName = Vm;
function Km(e, t) {
  return `${e}-trigger-${t}`;
}
function Gm(e, t) {
  return `${e}-content-${t}`;
}
var G1 = zm,
  Q1 = $m,
  Y1 = Wm,
  X1 = Hm;
export {
  z1 as $,
  Gy as A,
  x1 as B,
  Qy as C,
  Ni as D,
  gy as E,
  C1 as F,
  Li as G,
  R1 as H,
  N1 as I,
  D1 as J,
  O1 as K,
  P1 as L,
  k1 as M,
  H1 as N,
  M1 as O,
  b as P,
  K1 as Q,
  S1 as R,
  y1 as S,
  T1 as T,
  F1 as U,
  j1 as V,
  U1 as W,
  $1 as X,
  W1 as Y,
  B1 as Z,
  rp as _,
  Ed as a,
  V1 as a0,
  I1 as a1,
  L1 as a2,
  Q1 as a3,
  Y1 as a4,
  X1 as a5,
  G1 as a6,
  nn as a7,
  Np as a8,
  xp as a9,
  Ns as aa,
  Qn as ab,
  Ms as ac,
  As as ad,
  Ky as ae,
  zy as af,
  Ti as b,
  pn as c,
  Et as d,
  I as e,
  yt as f,
  gs as g,
  Wt as h,
  Cd as i,
  ng as j,
  $d as k,
  w1 as l,
  Yy as m,
  Ry as n,
  be as o,
  wt as p,
  Ny as q,
  vs as r,
  E1 as s,
  Me as t,
  fe as u,
  ii as v,
  Vt as w,
  Ty as x,
  Dy as y,
  Ay as z,
};
//# sourceMappingURL=ui-MMcbxhMf.js.map
