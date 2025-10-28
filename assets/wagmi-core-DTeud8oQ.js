var hc = (e) => {
  throw TypeError(e);
};
var Co = (e, t, n) => t.has(e) || hc("Cannot " + n);
var g = (e, t, n) => (
    Co(e, t, "read from private field"), n ? n.call(e) : t.get(e)
  ),
  U = (e, t, n) =>
    t.has(e)
      ? hc("Cannot add the same private member more than once")
      : t instanceof WeakSet
      ? t.add(e)
      : t.set(e, n),
  _ = (e, t, n, r) => (
    Co(e, t, "write to private field"), r ? r.call(e, n) : t.set(e, n), n
  ),
  q = (e, t, n) => (Co(e, t, "access private method"), n);
var Is = (e, t, n, r) => ({
  set _(s) {
    _(e, t, s, n);
  },
  get _() {
    return g(e, t, r);
  },
});
function _0(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const s in r)
        if (s !== "default" && !(s in e)) {
          const o = Object.getOwnPropertyDescriptor(r, s);
          o &&
            Object.defineProperty(
              e,
              s,
              o.get ? o : { enumerable: !0, get: () => r[s] }
            );
        }
    }
  }
  return Object.freeze(
    Object.defineProperty(e, Symbol.toStringTag, { value: "Module" })
  );
}
var L2 =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof globalThis < "u"
    ? globalThis
    : typeof self < "u"
    ? self
    : {};
function Wu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
function D2(e) {
  if (e.__esModule) return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r
        ? Reflect.construct(t, arguments, this.constructor)
        : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else n = {};
  return (
    Object.defineProperty(n, "__esModule", { value: !0 }),
    Object.keys(e).forEach(function (r) {
      var s = Object.getOwnPropertyDescriptor(e, r);
      Object.defineProperty(
        n,
        r,
        s.get
          ? s
          : {
              enumerable: !0,
              get: function () {
                return e[r];
              },
            }
      );
    }),
    n
  );
}
var Ku = { exports: {} },
  ro = {},
  Qu = { exports: {} },
  H = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var as = Symbol.for("react.element"),
  N0 = Symbol.for("react.portal"),
  F0 = Symbol.for("react.fragment"),
  j0 = Symbol.for("react.strict_mode"),
  z0 = Symbol.for("react.profiler"),
  U0 = Symbol.for("react.provider"),
  L0 = Symbol.for("react.context"),
  D0 = Symbol.for("react.forward_ref"),
  q0 = Symbol.for("react.suspense"),
  H0 = Symbol.for("react.memo"),
  G0 = Symbol.for("react.lazy"),
  pc = Symbol.iterator;
function V0(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (pc && e[pc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Zu = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Yu = Object.assign,
  Ju = {};
function yr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ju),
    (this.updater = n || Zu);
}
yr.prototype.isReactComponent = {};
yr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
yr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Xu() {}
Xu.prototype = yr.prototype;
function fa(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = Ju),
    (this.updater = n || Zu);
}
var da = (fa.prototype = new Xu());
da.constructor = fa;
Yu(da, yr.prototype);
da.isPureReactComponent = !0;
var bc = Array.isArray,
  ef = Object.prototype.hasOwnProperty,
  la = { current: null },
  tf = { key: !0, ref: !0, __self: !0, __source: !0 };
function nf(e, t, n) {
  var r,
    s = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      ef.call(t, r) && !tf.hasOwnProperty(r) && (s[r] = t[r]);
  var a = arguments.length - 2;
  if (a === 1) s.children = n;
  else if (1 < a) {
    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 2];
    s.children = c;
  }
  if (e && e.defaultProps)
    for (r in ((a = e.defaultProps), a)) s[r] === void 0 && (s[r] = a[r]);
  return {
    $$typeof: as,
    type: e,
    key: o,
    ref: i,
    props: s,
    _owner: la.current,
  };
}
function W0(e, t) {
  return {
    $$typeof: as,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function ha(e) {
  return typeof e == "object" && e !== null && e.$$typeof === as;
}
function K0(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var yc = /\/+/g;
function Oo(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? K0("" + e.key)
    : t.toString(36);
}
function Us(e, t, n, r, s) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case as:
          case N0:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (s = s(i)),
      (e = r === "" ? "." + Oo(i, 0) : r),
      bc(s)
        ? ((n = ""),
          e != null && (n = e.replace(yc, "$&/") + "/"),
          Us(s, t, n, "", function (u) {
            return u;
          }))
        : s != null &&
          (ha(s) &&
            (s = W0(
              s,
              n +
                (!s.key || (i && i.key === s.key)
                  ? ""
                  : ("" + s.key).replace(yc, "$&/") + "/") +
                e
            )),
          t.push(s)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), bc(e)))
    for (var a = 0; a < e.length; a++) {
      o = e[a];
      var c = r + Oo(o, a);
      i += Us(o, t, n, c, s);
    }
  else if (((c = V0(e)), typeof c == "function"))
    for (e = c.call(e), a = 0; !(o = e.next()).done; )
      (o = o.value), (c = r + Oo(o, a++)), (i += Us(o, t, n, c, s));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function As(e, t, n) {
  if (e == null) return e;
  var r = [],
    s = 0;
  return (
    Us(e, r, "", "", function (o) {
      return t.call(n, o, s++);
    }),
    r
  );
}
function Q0(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var be = { current: null },
  Ls = { transition: null },
  Z0 = {
    ReactCurrentDispatcher: be,
    ReactCurrentBatchConfig: Ls,
    ReactCurrentOwner: la,
  };
function rf() {
  throw Error("act(...) is not supported in production builds of React.");
}
H.Children = {
  map: As,
  forEach: function (e, t, n) {
    As(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      As(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      As(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!ha(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
H.Component = yr;
H.Fragment = F0;
H.Profiler = z0;
H.PureComponent = fa;
H.StrictMode = j0;
H.Suspense = q0;
H.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Z0;
H.act = rf;
H.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Yu({}, e.props),
    s = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = la.current)),
      t.key !== void 0 && (s = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var a = e.type.defaultProps;
    for (c in t)
      ef.call(t, c) &&
        !tf.hasOwnProperty(c) &&
        (r[c] = t[c] === void 0 && a !== void 0 ? a[c] : t[c]);
  }
  var c = arguments.length - 2;
  if (c === 1) r.children = n;
  else if (1 < c) {
    a = Array(c);
    for (var u = 0; u < c; u++) a[u] = arguments[u + 2];
    r.children = a;
  }
  return { $$typeof: as, type: e.type, key: s, ref: o, props: r, _owner: i };
};
H.createContext = function (e) {
  return (
    (e = {
      $$typeof: L0,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: U0, _context: e }),
    (e.Consumer = e)
  );
};
H.createElement = nf;
H.createFactory = function (e) {
  var t = nf.bind(null, e);
  return (t.type = e), t;
};
H.createRef = function () {
  return { current: null };
};
H.forwardRef = function (e) {
  return { $$typeof: D0, render: e };
};
H.isValidElement = ha;
H.lazy = function (e) {
  return { $$typeof: G0, _payload: { _status: -1, _result: e }, _init: Q0 };
};
H.memo = function (e, t) {
  return { $$typeof: H0, type: e, compare: t === void 0 ? null : t };
};
H.startTransition = function (e) {
  var t = Ls.transition;
  Ls.transition = {};
  try {
    e();
  } finally {
    Ls.transition = t;
  }
};
H.unstable_act = rf;
H.useCallback = function (e, t) {
  return be.current.useCallback(e, t);
};
H.useContext = function (e) {
  return be.current.useContext(e);
};
H.useDebugValue = function () {};
H.useDeferredValue = function (e) {
  return be.current.useDeferredValue(e);
};
H.useEffect = function (e, t) {
  return be.current.useEffect(e, t);
};
H.useId = function () {
  return be.current.useId();
};
H.useImperativeHandle = function (e, t, n) {
  return be.current.useImperativeHandle(e, t, n);
};
H.useInsertionEffect = function (e, t) {
  return be.current.useInsertionEffect(e, t);
};
H.useLayoutEffect = function (e, t) {
  return be.current.useLayoutEffect(e, t);
};
H.useMemo = function (e, t) {
  return be.current.useMemo(e, t);
};
H.useReducer = function (e, t, n) {
  return be.current.useReducer(e, t, n);
};
H.useRef = function (e) {
  return be.current.useRef(e);
};
H.useState = function (e) {
  return be.current.useState(e);
};
H.useSyncExternalStore = function (e, t, n) {
  return be.current.useSyncExternalStore(e, t, n);
};
H.useTransition = function () {
  return be.current.useTransition();
};
H.version = "18.3.1";
Qu.exports = H;
var V = Qu.exports;
const Y0 = Wu(V),
  q2 = _0({ __proto__: null, default: Y0 }, [V]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var J0 = V,
  X0 = Symbol.for("react.element"),
  eh = Symbol.for("react.fragment"),
  th = Object.prototype.hasOwnProperty,
  nh = J0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  rh = { key: !0, ref: !0, __self: !0, __source: !0 };
function sf(e, t, n) {
  var r,
    s = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) th.call(t, r) && !rh.hasOwnProperty(r) && (s[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) s[r] === void 0 && (s[r] = t[r]);
  return {
    $$typeof: X0,
    type: e,
    key: o,
    ref: i,
    props: s,
    _owner: nh.current,
  };
}
ro.Fragment = eh;
ro.jsx = sf;
ro.jsxs = sf;
Ku.exports = ro;
var sh = Ku.exports;
const oh = "modulepreload",
  ih = function (e) {
    return "/" + e;
  },
  mc = {},
  of = function (t, n, r) {
    let s = Promise.resolve();
    if (n && n.length > 0) {
      document.getElementsByTagName("link");
      const i = document.querySelector("meta[property=csp-nonce]"),
        a = i?.nonce || i?.getAttribute("nonce");
      s = Promise.allSettled(
        n.map((c) => {
          if (((c = ih(c)), c in mc)) return;
          mc[c] = !0;
          const u = c.endsWith(".css"),
            f = u ? '[rel="stylesheet"]' : "";
          if (document.querySelector(`link[href="${c}"]${f}`)) return;
          const d = document.createElement("link");
          if (
            ((d.rel = u ? "stylesheet" : oh),
            u || (d.as = "script"),
            (d.crossOrigin = ""),
            (d.href = c),
            a && d.setAttribute("nonce", a),
            document.head.appendChild(d),
            u)
          )
            return new Promise((l, h) => {
              d.addEventListener("load", l),
                d.addEventListener("error", () =>
                  h(new Error(`Unable to preload CSS for ${c}`))
                );
            });
        })
      );
    }
    function o(i) {
      const a = new Event("vite:preloadError", { cancelable: !0 });
      if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
        throw i;
    }
    return s.then((i) => {
      for (const a of i || []) a.status === "rejected" && o(a.reason);
      return t().catch(o);
    });
  };
function ah(e) {
  if (typeof window > "u") return;
  const t = (n) => e(n.detail);
  return (
    window.addEventListener("eip6963:announceProvider", t),
    window.dispatchEvent(new CustomEvent("eip6963:requestProvider")),
    () => window.removeEventListener("eip6963:announceProvider", t)
  );
}
function ch() {
  const e = new Set();
  let t = [];
  const n = () =>
    ah((s) => {
      t.some(({ info: o }) => o.uuid === s.info.uuid) ||
        ((t = [...t, s]), e.forEach((o) => o(t, { added: [s] })));
    });
  let r = n();
  return {
    _listeners() {
      return e;
    },
    clear() {
      e.forEach((s) => s([], { removed: [...t] })), (t = []);
    },
    destroy() {
      this.clear(), e.clear(), r?.();
    },
    findProvider({ rdns: s }) {
      return t.find((o) => o.info.rdns === s);
    },
    getProviders() {
      return t;
    },
    reset() {
      this.clear(), r?.(), (r = n());
    },
    subscribe(s, { emitImmediately: o } = {}) {
      return e.add(s), o && s(t, { added: t }), () => e.delete(s);
    },
  };
}
const uh = "1.1.0";
let je = class oi extends Error {
  constructor(t, n = {}) {
    const r =
        n.cause instanceof oi
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      s = (n.cause instanceof oi && n.cause.docsPath) || n.docsPath,
      o = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(s ? [`Docs: https://abitype.dev${s}`] : []),
        ...(r ? [`Details: ${r}`] : []),
        `Version: abitype@${uh}`,
      ].join(`
`);
    super(o),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiTypeError",
      }),
      n.cause && (this.cause = n.cause),
      (this.details = r),
      (this.docsPath = s),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
};
function St(e, t) {
  return e.exec(t)?.groups;
}
const af = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  cf =
    /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  uf = /^\(.+?\).*?$/,
  gc = /^tuple(?<array>(\[(\d*)\])*)$/;
function ii(e) {
  let t = e.type;
  if (gc.test(e.type) && "components" in e) {
    t = "(";
    const n = e.components.length;
    for (let s = 0; s < n; s++) {
      const o = e.components[s];
      (t += ii(o)), s < n - 1 && (t += ", ");
    }
    const r = St(gc, e.type);
    return (t += `)${r?.array ?? ""}`), ii({ ...e, type: t });
  }
  return (
    "indexed" in e && e.indexed && (t = `${t} indexed`),
    e.name ? `${t} ${e.name}` : t
  );
}
function Cr(e) {
  let t = "";
  const n = e.length;
  for (let r = 0; r < n; r++) {
    const s = e[r];
    (t += ii(s)), r !== n - 1 && (t += ", ");
  }
  return t;
}
function fh(e) {
  return e.type === "function"
    ? `function ${e.name}(${Cr(e.inputs)})${
        e.stateMutability && e.stateMutability !== "nonpayable"
          ? ` ${e.stateMutability}`
          : ""
      }${e.outputs?.length ? ` returns (${Cr(e.outputs)})` : ""}`
    : e.type === "event"
    ? `event ${e.name}(${Cr(e.inputs)})`
    : e.type === "error"
    ? `error ${e.name}(${Cr(e.inputs)})`
    : e.type === "constructor"
    ? `constructor(${Cr(e.inputs)})${
        e.stateMutability === "payable" ? " payable" : ""
      }`
    : e.type === "fallback"
    ? `fallback() external${e.stateMutability === "payable" ? " payable" : ""}`
    : "receive() external payable";
}
const ff = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function dh(e) {
  return ff.test(e);
}
function lh(e) {
  return St(ff, e);
}
const df = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function hh(e) {
  return df.test(e);
}
function ph(e) {
  return St(df, e);
}
const lf =
  /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function bh(e) {
  return lf.test(e);
}
function yh(e) {
  return St(lf, e);
}
const hf = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function pf(e) {
  return hf.test(e);
}
function mh(e) {
  return St(hf, e);
}
const bf =
  /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function gh(e) {
  return bf.test(e);
}
function wh(e) {
  return St(bf, e);
}
const yf = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function vh(e) {
  return yf.test(e);
}
function xh(e) {
  return St(yf, e);
}
const Eh = /^receive\(\) external payable$/;
function Ph(e) {
  return Eh.test(e);
}
const Sh = new Set(["indexed"]),
  ai = new Set(["calldata", "memory", "storage"]);
let $h = class extends je {
    constructor({ type: t }) {
      super("Unknown type.", {
        metaMessages: [
          `Type "${t}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownTypeError",
        });
    }
  },
  Ih = class extends je {
    constructor({ type: t }) {
      super("Unknown type.", {
        metaMessages: [`Type "${t}" is not a valid ABI type.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSolidityTypeError",
        });
    }
  },
  Ah = class extends je {
    constructor({ param: t }) {
      super("Invalid ABI parameter.", { details: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParameterError",
        });
    }
  },
  Ch = class extends je {
    constructor({ param: t, name: n }) {
      super("Invalid ABI parameter.", {
        details: t,
        metaMessages: [
          `"${n}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "SolidityProtectedKeywordError",
        });
    }
  },
  Oh = class extends je {
    constructor({ param: t, type: n, modifier: r }) {
      super("Invalid ABI parameter.", {
        details: t,
        metaMessages: [
          `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidModifierError",
        });
    }
  },
  Th = class extends je {
    constructor({ param: t, type: n, modifier: r }) {
      super("Invalid ABI parameter.", {
        details: t,
        metaMessages: [
          `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
          `Data location can only be specified for array, struct, or mapping types, but "${r}" was given.`,
        ],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidFunctionModifierError",
        });
    }
  },
  Bh = class extends je {
    constructor({ abiParameter: t }) {
      super("Invalid ABI parameter.", {
        details: JSON.stringify(t, null, 2),
        metaMessages: ["ABI parameter type is invalid."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidAbiTypeParameterError",
        });
    }
  },
  mr = class extends je {
    constructor({ signature: t, type: n }) {
      super(`Invalid ${n} signature.`, { details: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidSignatureError",
        });
    }
  },
  Rh = class extends je {
    constructor({ signature: t }) {
      super("Unknown signature.", { details: t }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "UnknownSignatureError",
        });
    }
  },
  kh = class extends je {
    constructor({ signature: t }) {
      super("Invalid struct signature.", {
        details: t,
        metaMessages: ["No properties exist."],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidStructSignatureError",
        });
    }
  },
  Mh = class extends je {
    constructor({ type: t }) {
      super("Circular reference detected.", {
        metaMessages: [`Struct "${t}" is a circular reference.`],
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "CircularReferenceError",
        });
    }
  },
  _h = class extends je {
    constructor({ current: t, depth: n }) {
      super("Unbalanced parentheses.", {
        metaMessages: [
          `"${t.trim()}" has too many ${
            n > 0 ? "opening" : "closing"
          } parentheses.`,
        ],
        details: `Depth "${n}"`,
      }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "InvalidParenthesisError",
        });
    }
  };
function Nh(e, t, n) {
  let r = "";
  if (n)
    for (const s of Object.entries(n)) {
      if (!s) continue;
      let o = "";
      for (const i of s[1]) o += `[${i.type}${i.name ? `:${i.name}` : ""}]`;
      r += `(${s[0]}{${o}})`;
    }
  return t ? `${t}:${e}${r}` : e;
}
const To = new Map([
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: !0 },
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
]);
function Fh(e, t = {}) {
  if (bh(e)) return jh(e, t);
  if (hh(e)) return zh(e, t);
  if (dh(e)) return Uh(e, t);
  if (gh(e)) return Lh(e, t);
  if (vh(e)) return Dh(e);
  if (Ph(e)) return { type: "receive", stateMutability: "payable" };
  throw new Rh({ signature: e });
}
function jh(e, t = {}) {
  const n = yh(e);
  if (!n) throw new mr({ signature: e, type: "function" });
  const r = qe(n.parameters),
    s = [],
    o = r.length;
  for (let a = 0; a < o; a++)
    s.push(wn(r[a], { modifiers: ai, structs: t, type: "function" }));
  const i = [];
  if (n.returns) {
    const a = qe(n.returns),
      c = a.length;
    for (let u = 0; u < c; u++)
      i.push(wn(a[u], { modifiers: ai, structs: t, type: "function" }));
  }
  return {
    name: n.name,
    type: "function",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: s,
    outputs: i,
  };
}
function zh(e, t = {}) {
  const n = ph(e);
  if (!n) throw new mr({ signature: e, type: "event" });
  const r = qe(n.parameters),
    s = [],
    o = r.length;
  for (let i = 0; i < o; i++)
    s.push(wn(r[i], { modifiers: Sh, structs: t, type: "event" }));
  return { name: n.name, type: "event", inputs: s };
}
function Uh(e, t = {}) {
  const n = lh(e);
  if (!n) throw new mr({ signature: e, type: "error" });
  const r = qe(n.parameters),
    s = [],
    o = r.length;
  for (let i = 0; i < o; i++) s.push(wn(r[i], { structs: t, type: "error" }));
  return { name: n.name, type: "error", inputs: s };
}
function Lh(e, t = {}) {
  const n = wh(e);
  if (!n) throw new mr({ signature: e, type: "constructor" });
  const r = qe(n.parameters),
    s = [],
    o = r.length;
  for (let i = 0; i < o; i++)
    s.push(wn(r[i], { structs: t, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: s,
  };
}
function Dh(e) {
  const t = xh(e);
  if (!t) throw new mr({ signature: e, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: t.stateMutability ?? "nonpayable",
  };
}
const qh =
    /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  Hh =
    /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  Gh = /^u?int$/;
function wn(e, t) {
  const n = Nh(e, t?.type, t?.structs);
  if (To.has(n)) return To.get(n);
  const r = uf.test(e),
    s = St(r ? Hh : qh, e);
  if (!s) throw new Ah({ param: e });
  if (s.name && Wh(s.name)) throw new Ch({ param: e, name: s.name });
  const o = s.name ? { name: s.name } : {},
    i = s.modifier === "indexed" ? { indexed: !0 } : {},
    a = t?.structs ?? {};
  let c,
    u = {};
  if (r) {
    c = "tuple";
    const d = qe(s.type),
      l = [],
      h = d.length;
    for (let b = 0; b < h; b++) l.push(wn(d[b], { structs: a }));
    u = { components: l };
  } else if (s.type in a) (c = "tuple"), (u = { components: a[s.type] });
  else if (Gh.test(s.type)) c = `${s.type}256`;
  else if (s.type === "address payable") c = "address";
  else if (((c = s.type), t?.type !== "struct" && !mf(c)))
    throw new Ih({ type: c });
  if (s.modifier) {
    if (!t?.modifiers?.has?.(s.modifier))
      throw new Oh({ param: e, type: t?.type, modifier: s.modifier });
    if (ai.has(s.modifier) && !Kh(c, !!s.array))
      throw new Th({ param: e, type: t?.type, modifier: s.modifier });
  }
  const f = { type: `${c}${s.array ?? ""}`, ...o, ...i, ...u };
  return To.set(n, f), f;
}
function qe(e, t = [], n = "", r = 0) {
  const s = e.trim().length;
  for (let o = 0; o < s; o++) {
    const i = e[o],
      a = e.slice(o + 1);
    switch (i) {
      case ",":
        return r === 0 ? qe(a, [...t, n.trim()]) : qe(a, t, `${n}${i}`, r);
      case "(":
        return qe(a, t, `${n}${i}`, r + 1);
      case ")":
        return qe(a, t, `${n}${i}`, r - 1);
      default:
        return qe(a, t, `${n}${i}`, r);
    }
  }
  if (n === "") return t;
  if (r !== 0) throw new _h({ current: n, depth: r });
  return t.push(n.trim()), t;
}
function mf(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    af.test(e) ||
    cf.test(e)
  );
}
const Vh =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function Wh(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    e === "tuple" ||
    af.test(e) ||
    cf.test(e) ||
    Vh.test(e)
  );
}
function Kh(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
function Qh(e) {
  const t = {},
    n = e.length;
  for (let i = 0; i < n; i++) {
    const a = e[i];
    if (!pf(a)) continue;
    const c = mh(a);
    if (!c) throw new mr({ signature: a, type: "struct" });
    const u = c.properties.split(";"),
      f = [],
      d = u.length;
    for (let l = 0; l < d; l++) {
      const b = u[l].trim();
      if (!b) continue;
      const p = wn(b, { type: "struct" });
      f.push(p);
    }
    if (!f.length) throw new kh({ signature: a });
    t[c.name] = f;
  }
  const r = {},
    s = Object.entries(t),
    o = s.length;
  for (let i = 0; i < o; i++) {
    const [a, c] = s[i];
    r[a] = gf(c, t);
  }
  return r;
}
const Zh = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function gf(e, t, n = new Set()) {
  const r = [],
    s = e.length;
  for (let o = 0; o < s; o++) {
    const i = e[o];
    if (uf.test(i.type)) r.push(i);
    else {
      const c = St(Zh, i.type);
      if (!c?.type) throw new Bh({ abiParameter: i });
      const { array: u, type: f } = c;
      if (f in t) {
        if (n.has(f)) throw new Mh({ type: f });
        r.push({
          ...i,
          type: `tuple${u ?? ""}`,
          components: gf(t[f] ?? [], t, new Set([...n, f])),
        });
      } else if (mf(f)) r.push(i);
      else throw new $h({ type: f });
    }
  }
  return r;
}
function wf(e) {
  const t = Qh(e),
    n = [],
    r = e.length;
  for (let s = 0; s < r; s++) {
    const o = e[s];
    pf(o) || n.push(Fh(o, t));
  }
  return n;
}
function Y(e) {
  return typeof e == "string" ? { address: e, type: "json-rpc" } : e;
}
const vf = "2.38.5";
let Bo = {
    getDocsUrl: ({ docsBaseUrl: e, docsPath: t = "", docsSlug: n }) =>
      t ? `${e ?? "https://viem.sh"}${t}${n ? `#${n}` : ""}` : void 0,
    version: `viem@${vf}`,
  },
  A = class ci extends Error {
    constructor(t, n = {}) {
      const r =
          n.cause instanceof ci
            ? n.cause.details
            : n.cause?.message
            ? n.cause.message
            : n.details,
        s = (n.cause instanceof ci && n.cause.docsPath) || n.docsPath,
        o = Bo.getDocsUrl?.({ ...n, docsPath: s }),
        i = [
          t || "An error occurred.",
          "",
          ...(n.metaMessages ? [...n.metaMessages, ""] : []),
          ...(o ? [`Docs: ${o}`] : []),
          ...(r ? [`Details: ${r}`] : []),
          ...(Bo.version ? [`Version: ${Bo.version}`] : []),
        ].join(`
`);
      super(i, n.cause ? { cause: n.cause } : void 0),
        Object.defineProperty(this, "details", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "docsPath", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "metaMessages", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "shortMessage", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "version", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: void 0,
        }),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "BaseError",
        }),
        (this.details = r),
        (this.docsPath = s),
        (this.metaMessages = n.metaMessages),
        (this.name = n.name ?? this.name),
        (this.shortMessage = t),
        (this.version = vf);
    }
    walk(t) {
      return xf(this, t);
    }
  };
function xf(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e && e.cause !== void 0
    ? xf(e.cause, t)
    : t
    ? null
    : e;
}
let wt = class extends A {
  constructor({ address: t }) {
    super(`Address "${t}" is invalid.`, {
      metaMessages: [
        "- Address must be a hex value of 20 bytes (40 hex characters).",
        "- Address must match its checksum counterpart.",
      ],
      name: "InvalidAddressError",
    });
  }
};
function He(e, { strict: t = !0 } = {}) {
  return !e || typeof e != "string"
    ? !1
    : t
    ? /^0x[0-9a-fA-F]*$/.test(e)
    : e.startsWith("0x");
}
let Ef = class extends A {
    constructor({ offset: t, position: n, size: r }) {
      super(
        `Slice ${
          n === "start" ? "starting" : "ending"
        } at offset "${t}" is out-of-bounds (size: ${r}).`,
        { name: "SliceOffsetOutOfBoundsError" }
      );
    }
  },
  Pf = class extends A {
    constructor({ size: t, targetSize: n, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r
          .slice(1)
          .toLowerCase()} size (${t}) exceeds padding size (${n}).`,
        { name: "SizeExceedsPaddingSizeError" }
      );
    }
  };
class wc extends A {
  constructor({ size: t, targetSize: n, type: r }) {
    super(
      `${r.charAt(0).toUpperCase()}${r
        .slice(1)
        .toLowerCase()} is expected to be ${n} ${r} long, but is ${t} ${r} long.`,
      { name: "InvalidBytesLengthError" }
    );
  }
}
function pt(e, { dir: t, size: n = 32 } = {}) {
  return typeof e == "string"
    ? Gt(e, { dir: t, size: n })
    : Yh(e, { dir: t, size: n });
}
function Gt(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  const r = e.replace("0x", "");
  if (r.length > n * 2)
    throw new Pf({ size: Math.ceil(r.length / 2), targetSize: n, type: "hex" });
  return `0x${r[t === "right" ? "padEnd" : "padStart"](n * 2, "0")}`;
}
function Yh(e, { dir: t, size: n = 32 } = {}) {
  if (n === null) return e;
  if (e.length > n)
    throw new Pf({ size: e.length, targetSize: n, type: "bytes" });
  const r = new Uint8Array(n);
  for (let s = 0; s < n; s++) {
    const o = t === "right";
    r[o ? s : n - s - 1] = e[o ? s : e.length - s - 1];
  }
  return r;
}
let Sf = class extends A {
    constructor({ max: t, min: n, signed: r, size: s, value: o }) {
      super(
        `Number "${o}" is not in safe ${
          s ? `${s * 8}-bit ${r ? "signed" : "unsigned"} ` : ""
        }integer range ${t ? `(${n} to ${t})` : `(above ${n})`}`,
        { name: "IntegerOutOfRangeError" }
      );
    }
  },
  Jh = class extends A {
    constructor(t) {
      super(
        `Bytes value "${t}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`,
        { name: "InvalidBytesBooleanError" }
      );
    }
  };
class Xh extends A {
  constructor(t) {
    super(
      `Hex value "${t}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`,
      { name: "InvalidHexBooleanError" }
    );
  }
}
let ep = class extends A {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed ${n} bytes. Given size: ${t} bytes.`, {
      name: "SizeOverflowError",
    });
  }
};
function X(e) {
  return He(e, { strict: !1 }) ? Math.ceil((e.length - 2) / 2) : e.length;
}
function bt(e, { dir: t = "left" } = {}) {
  let n = typeof e == "string" ? e.replace("0x", "") : e,
    r = 0;
  for (
    let s = 0;
    s < n.length - 1 &&
    n[t === "left" ? s : n.length - s - 1].toString() === "0";
    s++
  )
    r++;
  return (
    (n = t === "left" ? n.slice(r) : n.slice(0, n.length - r)),
    typeof e == "string"
      ? (n.length === 1 && t === "right" && (n = `${n}0`),
        `0x${n.length % 2 === 1 ? `0${n}` : n}`)
      : n
  );
}
function ze(e, { size: t }) {
  if (X(e) > t) throw new ep({ givenSize: X(e), maxSize: t });
}
function $e(e, t = {}) {
  const { signed: n } = t;
  t.size && ze(e, { size: t.size });
  const r = BigInt(e);
  if (!n) return r;
  const s = (e.length - 2) / 2,
    o = (1n << (BigInt(s) * 8n - 1n)) - 1n;
  return r <= o ? r : r - BigInt(`0x${"f".padStart(s * 2, "f")}`) - 1n;
}
function tp(e, t = {}) {
  let n = e;
  if ((t.size && (ze(n, { size: t.size }), (n = bt(n))), bt(n) === "0x00"))
    return !1;
  if (bt(n) === "0x01") return !0;
  throw new Xh(n);
}
function Ge(e, t = {}) {
  return Number($e(e, t));
}
function np(e, t = {}) {
  let n = Ne(e);
  return (
    t.size && (ze(n, { size: t.size }), (n = bt(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
const rp = Array.from({ length: 256 }, (e, t) =>
  t.toString(16).padStart(2, "0")
);
function vt(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? F(e, t)
    : typeof e == "string"
    ? vn(e, t)
    : typeof e == "boolean"
    ? pa(e, t)
    : ne(e, t);
}
function pa(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number"
    ? (ze(n, { size: t.size }), pt(n, { size: t.size }))
    : n;
}
function ne(e, t = {}) {
  let n = "";
  for (let s = 0; s < e.length; s++) n += rp[e[s]];
  const r = `0x${n}`;
  return typeof t.size == "number"
    ? (ze(r, { size: t.size }), pt(r, { dir: "right", size: t.size }))
    : r;
}
function F(e, t = {}) {
  const { signed: n, size: r } = t,
    s = BigInt(e);
  let o;
  r
    ? n
      ? (o = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (o = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (o = BigInt(Number.MAX_SAFE_INTEGER));
  const i = typeof o == "bigint" && n ? -o - 1n : 0;
  if ((o && s > o) || s < i) {
    const c = typeof e == "bigint" ? "n" : "";
    throw new Sf({
      max: o ? `${o}${c}` : void 0,
      min: `${i}${c}`,
      signed: n,
      size: r,
      value: `${e}${c}`,
    });
  }
  const a = `0x${(n && s < 0 ? (1n << BigInt(r * 8)) + BigInt(s) : s).toString(
    16
  )}`;
  return r ? pt(a, { size: r }) : a;
}
const sp = new TextEncoder();
function vn(e, t = {}) {
  const n = sp.encode(e);
  return ne(n, t);
}
const op = new TextEncoder();
function gr(e, t = {}) {
  return typeof e == "number" || typeof e == "bigint"
    ? ap(e, t)
    : typeof e == "boolean"
    ? ip(e, t)
    : He(e)
    ? Ne(e, t)
    : bn(e, t);
}
function ip(e, t = {}) {
  const n = new Uint8Array(1);
  return (
    (n[0] = Number(e)),
    typeof t.size == "number"
      ? (ze(n, { size: t.size }), pt(n, { size: t.size }))
      : n
  );
}
const nt = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function vc(e) {
  if (e >= nt.zero && e <= nt.nine) return e - nt.zero;
  if (e >= nt.A && e <= nt.F) return e - (nt.A - 10);
  if (e >= nt.a && e <= nt.f) return e - (nt.a - 10);
}
function Ne(e, t = {}) {
  let n = e;
  t.size &&
    (ze(n, { size: t.size }), (n = pt(n, { dir: "right", size: t.size })));
  let r = n.slice(2);
  r.length % 2 && (r = `0${r}`);
  const s = r.length / 2,
    o = new Uint8Array(s);
  for (let i = 0, a = 0; i < s; i++) {
    const c = vc(r.charCodeAt(a++)),
      u = vc(r.charCodeAt(a++));
    if (c === void 0 || u === void 0)
      throw new A(
        `Invalid byte sequence ("${r[a - 2]}${r[a - 1]}" in "${r}").`
      );
    o[i] = c * 16 + u;
  }
  return o;
}
function ap(e, t) {
  const n = F(e, t);
  return Ne(n);
}
function bn(e, t = {}) {
  const n = op.encode(e);
  return typeof t.size == "number"
    ? (ze(n, { size: t.size }), pt(n, { dir: "right", size: t.size }))
    : n;
}
const Cs = BigInt(2 ** 32 - 1),
  xc = BigInt(32);
function cp(e, t = !1) {
  return t
    ? { h: Number(e & Cs), l: Number((e >> xc) & Cs) }
    : { h: Number((e >> xc) & Cs) | 0, l: Number(e & Cs) | 0 };
}
function $f(e, t = !1) {
  const n = e.length;
  let r = new Uint32Array(n),
    s = new Uint32Array(n);
  for (let o = 0; o < n; o++) {
    const { h: i, l: a } = cp(e[o], t);
    [r[o], s[o]] = [i, a];
  }
  return [r, s];
}
const Ec = (e, t, n) => e >>> n,
  Pc = (e, t, n) => (e << (32 - n)) | (t >>> n),
  jn = (e, t, n) => (e >>> n) | (t << (32 - n)),
  zn = (e, t, n) => (e << (32 - n)) | (t >>> n),
  Os = (e, t, n) => (e << (64 - n)) | (t >>> (n - 32)),
  Ts = (e, t, n) => (e >>> (n - 32)) | (t << (64 - n)),
  up = (e, t, n) => (e << n) | (t >>> (32 - n)),
  fp = (e, t, n) => (t << n) | (e >>> (32 - n)),
  dp = (e, t, n) => (t << (n - 32)) | (e >>> (64 - n)),
  lp = (e, t, n) => (e << (n - 32)) | (t >>> (64 - n));
function rt(e, t, n, r) {
  const s = (t >>> 0) + (r >>> 0);
  return { h: (e + n + ((s / 2 ** 32) | 0)) | 0, l: s | 0 };
}
const hp = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0),
  pp = (e, t, n, r) => (t + n + r + ((e / 2 ** 32) | 0)) | 0,
  bp = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0),
  yp = (e, t, n, r, s) => (t + n + r + s + ((e / 2 ** 32) | 0)) | 0,
  mp = (e, t, n, r, s) =>
    (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (s >>> 0),
  gp = (e, t, n, r, s, o) => (t + n + r + s + o + ((e / 2 ** 32) | 0)) | 0,
  Un =
    typeof globalThis == "object" && "crypto" in globalThis
      ? globalThis.crypto
      : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function wp(
  e
) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
  );
}
function kr(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error("positive integer expected, got " + e);
}
function Kt(e, ...t) {
  if (!wp(e)) throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(
      "Uint8Array expected of length " + t + ", got length=" + e.length
    );
}
function vp(e) {
  if (typeof e != "function" || typeof e.create != "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  kr(e.outputLen), kr(e.blockLen);
}
function ar(e, t = !0) {
  if (e.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && e.finished) throw new Error("Hash#digest() has already been called");
}
function If(e, t) {
  Kt(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(
      "digestInto() expects output buffer of length at least " + n
    );
}
function xp(e) {
  return new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4));
}
function Qt(...e) {
  for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function Ro(e) {
  return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function Qe(e, t) {
  return (e << (32 - t)) | (e >>> t);
}
const Ep = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Pp(e) {
  return (
    ((e << 24) & 4278190080) |
    ((e << 8) & 16711680) |
    ((e >>> 8) & 65280) |
    ((e >>> 24) & 255)
  );
}
function Sp(e) {
  for (let t = 0; t < e.length; t++) e[t] = Pp(e[t]);
  return e;
}
const Sc = Ep ? (e) => e : Sp,
  Af =
    typeof Uint8Array.from([]).toHex == "function" &&
    typeof Uint8Array.fromHex == "function",
  $p = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function cv(e) {
  if ((Kt(e), Af)) return e.toHex();
  let t = "";
  for (let n = 0; n < e.length; n++) t += $p[e[n]];
  return t;
}
const st = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function $c(e) {
  if (e >= st._0 && e <= st._9) return e - st._0;
  if (e >= st.A && e <= st.F) return e - (st.A - 10);
  if (e >= st.a && e <= st.f) return e - (st.a - 10);
}
function uv(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  if (Af) return Uint8Array.fromHex(e);
  const t = e.length,
    n = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, o = 0; s < n; s++, o += 2) {
    const i = $c(e.charCodeAt(o)),
      a = $c(e.charCodeAt(o + 1));
    if (i === void 0 || a === void 0) {
      const c = e[o] + e[o + 1];
      throw new Error(
        'hex string expected, got non-hex character "' + c + '" at index ' + o
      );
    }
    r[s] = i * 16 + a;
  }
  return r;
}
function Ip(e) {
  if (typeof e != "string") throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(e));
}
function cs(e) {
  return typeof e == "string" && (e = Ip(e)), Kt(e), e;
}
function Ap(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Kt(s), (t += s.length);
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const o = e[r];
    n.set(o, s), (s += o.length);
  }
  return n;
}
class ba {}
function so(e) {
  const t = (r) => e().update(cs(r)).digest(),
    n = e();
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = () => e()),
    t
  );
}
function Cp(e) {
  const t = (r, s) => e(s).update(cs(r)).digest(),
    n = e({});
  return (
    (t.outputLen = n.outputLen),
    (t.blockLen = n.blockLen),
    (t.create = (r) => e(r)),
    t
  );
}
function Op(e = 32) {
  if (Un && typeof Un.getRandomValues == "function")
    return Un.getRandomValues(new Uint8Array(e));
  if (Un && typeof Un.randomBytes == "function")
    return Uint8Array.from(Un.randomBytes(e));
  throw new Error("crypto.getRandomValues must be defined");
}
const Tp = BigInt(0),
  Or = BigInt(1),
  Bp = BigInt(2),
  Rp = BigInt(7),
  kp = BigInt(256),
  Mp = BigInt(113),
  Cf = [],
  Of = [],
  Tf = [];
for (let e = 0, t = Or, n = 1, r = 0; e < 24; e++) {
  ([n, r] = [r, (2 * n + 3 * r) % 5]),
    Cf.push(2 * (5 * r + n)),
    Of.push((((e + 1) * (e + 2)) / 2) % 64);
  let s = Tp;
  for (let o = 0; o < 7; o++)
    (t = ((t << Or) ^ ((t >> Rp) * Mp)) % kp),
      t & Bp && (s ^= Or << ((Or << BigInt(o)) - Or));
  Tf.push(s);
}
const Bf = $f(Tf, !0),
  _p = Bf[0],
  Np = Bf[1],
  Ic = (e, t, n) => (n > 32 ? dp(e, t, n) : up(e, t, n)),
  Ac = (e, t, n) => (n > 32 ? lp(e, t, n) : fp(e, t, n));
function Rf(e, t = 24) {
  const n = new Uint32Array(10);
  for (let r = 24 - t; r < 24; r++) {
    for (let i = 0; i < 10; i++)
      n[i] = e[i] ^ e[i + 10] ^ e[i + 20] ^ e[i + 30] ^ e[i + 40];
    for (let i = 0; i < 10; i += 2) {
      const a = (i + 8) % 10,
        c = (i + 2) % 10,
        u = n[c],
        f = n[c + 1],
        d = Ic(u, f, 1) ^ n[a],
        l = Ac(u, f, 1) ^ n[a + 1];
      for (let h = 0; h < 50; h += 10) (e[i + h] ^= d), (e[i + h + 1] ^= l);
    }
    let s = e[2],
      o = e[3];
    for (let i = 0; i < 24; i++) {
      const a = Of[i],
        c = Ic(s, o, a),
        u = Ac(s, o, a),
        f = Cf[i];
      (s = e[f]), (o = e[f + 1]), (e[f] = c), (e[f + 1] = u);
    }
    for (let i = 0; i < 50; i += 10) {
      for (let a = 0; a < 10; a++) n[a] = e[i + a];
      for (let a = 0; a < 10; a++)
        e[i + a] ^= ~n[(a + 2) % 10] & n[(a + 4) % 10];
    }
    (e[0] ^= _p[r]), (e[1] ^= Np[r]);
  }
  Qt(n);
}
class us extends ba {
  constructor(t, n, r, s = !1, o = 24) {
    if (
      (super(),
      (this.pos = 0),
      (this.posOut = 0),
      (this.finished = !1),
      (this.destroyed = !1),
      (this.enableXOF = !1),
      (this.blockLen = t),
      (this.suffix = n),
      (this.outputLen = r),
      (this.enableXOF = s),
      (this.rounds = o),
      kr(r),
      !(0 < t && t < 200))
    )
      throw new Error("only keccak-f1600 function is supported");
    (this.state = new Uint8Array(200)), (this.state32 = xp(this.state));
  }
  clone() {
    return this._cloneInto();
  }
  keccak() {
    Sc(this.state32),
      Rf(this.state32, this.rounds),
      Sc(this.state32),
      (this.posOut = 0),
      (this.pos = 0);
  }
  update(t) {
    ar(this), (t = cs(t)), Kt(t);
    const { blockLen: n, state: r } = this,
      s = t.length;
    for (let o = 0; o < s; ) {
      const i = Math.min(n - this.pos, s - o);
      for (let a = 0; a < i; a++) r[this.pos++] ^= t[o++];
      this.pos === n && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: t, suffix: n, pos: r, blockLen: s } = this;
    (t[r] ^= n),
      n & 128 && r === s - 1 && this.keccak(),
      (t[s - 1] ^= 128),
      this.keccak();
  }
  writeInto(t) {
    ar(this, !1), Kt(t), this.finish();
    const n = this.state,
      { blockLen: r } = this;
    for (let s = 0, o = t.length; s < o; ) {
      this.posOut >= r && this.keccak();
      const i = Math.min(r - this.posOut, o - s);
      t.set(n.subarray(this.posOut, this.posOut + i), s),
        (this.posOut += i),
        (s += i);
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return kr(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if ((If(t, this), this.finished))
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    (this.destroyed = !0), Qt(this.state);
  }
  _cloneInto(t) {
    const {
      blockLen: n,
      suffix: r,
      outputLen: s,
      rounds: o,
      enableXOF: i,
    } = this;
    return (
      t || (t = new us(n, r, s, i, o)),
      t.state32.set(this.state32),
      (t.pos = this.pos),
      (t.posOut = this.posOut),
      (t.finished = this.finished),
      (t.rounds = o),
      (t.suffix = r),
      (t.outputLen = s),
      (t.enableXOF = i),
      (t.destroyed = this.destroyed),
      t
    );
  }
}
const Zt = (e, t, n) => so(() => new us(t, e, n)),
  Fp = Zt(6, 144, 224 / 8),
  jp = Zt(6, 136, 256 / 8),
  zp = Zt(6, 104, 384 / 8),
  Up = Zt(6, 72, 512 / 8),
  Lp = Zt(1, 144, 224 / 8),
  ya = Zt(1, 136, 256 / 8),
  Dp = Zt(1, 104, 384 / 8),
  qp = Zt(1, 72, 512 / 8),
  kf = (e, t, n) =>
    Cp((r = {}) => new us(t, e, r.dkLen === void 0 ? n : r.dkLen, !0)),
  Hp = kf(31, 168, 128 / 8),
  Gp = kf(31, 136, 256 / 8),
  fv = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        Keccak: us,
        keccakP: Rf,
        keccak_224: Lp,
        keccak_256: ya,
        keccak_384: Dp,
        keccak_512: qp,
        sha3_224: Fp,
        sha3_256: jp,
        sha3_384: zp,
        sha3_512: Up,
        shake128: Hp,
        shake256: Gp,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function oe(e, t) {
  const n = t || "hex",
    r = ya(He(e, { strict: !1 }) ? gr(e) : e);
  return n === "bytes" ? r : vt(r);
}
let wr = class extends Map {
  constructor(t) {
    super(),
      Object.defineProperty(this, "maxSize", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.maxSize = t);
  }
  get(t) {
    const n = super.get(t);
    return super.has(t) && n !== void 0 && (this.delete(t), super.set(t, n)), n;
  }
  set(t, n) {
    if ((super.set(t, n), this.maxSize && this.size > this.maxSize)) {
      const r = this.keys().next().value;
      r && this.delete(r);
    }
    return this;
  }
};
const Vp = /^0x[a-fA-F0-9]{40}$/,
  ko = new wr(8192);
function Ie(e, t) {
  const { strict: n = !0 } = t ?? {},
    r = `${e}.${n}`;
  if (ko.has(r)) return ko.get(r);
  const s = Vp.test(e)
    ? e.toLowerCase() === e
      ? !0
      : n
      ? fs(e) === e
      : !0
    : !1;
  return ko.set(r, s), s;
}
const Mo = new wr(8192);
function fs(e, t) {
  if (Mo.has(`${e}.${t}`)) return Mo.get(`${e}.${t}`);
  const n = e.substring(2).toLowerCase(),
    r = oe(bn(n), "bytes"),
    s = n.split("");
  for (let i = 0; i < 40; i += 2)
    r[i >> 1] >> 4 >= 8 && s[i] && (s[i] = s[i].toUpperCase()),
      (r[i >> 1] & 15) >= 8 && s[i + 1] && (s[i + 1] = s[i + 1].toUpperCase());
  const o = `0x${s.join("")}`;
  return Mo.set(`${e}.${t}`, o), o;
}
function Ht(e, t) {
  if (!Ie(e, { strict: !1 })) throw new wt({ address: e });
  return fs(e, t);
}
function Wp(e) {
  const t = oe(`0x${e.substring(4)}`).substring(26);
  return fs(`0x${t}`);
}
function Ve(e, { includeName: t = !1 } = {}) {
  if (e.type !== "function" && e.type !== "event" && e.type !== "error")
    throw new sb(e.type);
  return `${e.name}(${oo(e.inputs, { includeName: t })})`;
}
function oo(e, { includeName: t = !1 } = {}) {
  return e ? e.map((n) => Kp(n, { includeName: t })).join(t ? ", " : ",") : "";
}
function Kp(e, { includeName: t }) {
  return e.type.startsWith("tuple")
    ? `(${oo(e.components, { includeName: t })})${e.type.slice(5)}`
    : e.type + (t && e.name ? ` ${e.name}` : "");
}
class Qp extends A {
  constructor({ docsPath: t }) {
    super(
      [
        "A constructor was not found on the ABI.",
        "Make sure you are using the correct ABI and that the constructor exists on it.",
      ].join(`
`),
      { docsPath: t, name: "AbiConstructorNotFoundError" }
    );
  }
}
class Cc extends A {
  constructor({ docsPath: t }) {
    super(
      [
        "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
        "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists.",
      ].join(`
`),
      { docsPath: t, name: "AbiConstructorParamsNotFoundError" }
    );
  }
}
class Mf extends A {
  constructor({ data: t, params: n, size: r }) {
    super(
      [`Data size of ${r} bytes is too small for given parameters.`].join(`
`),
      {
        metaMessages: [
          `Params: (${oo(n, { includeName: !0 })})`,
          `Data:   ${t} (${r} bytes)`,
        ],
        name: "AbiDecodingDataSizeTooSmallError",
      }
    ),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = t),
      (this.params = n),
      (this.size = r);
  }
}
class ds extends A {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.', {
      name: "AbiDecodingZeroDataError",
    });
  }
}
class Zp extends A {
  constructor({ expectedLength: t, givenLength: n, type: r }) {
    super(
      [
        `ABI encoding array length mismatch for type ${r}.`,
        `Expected length: ${t}`,
        `Given length: ${n}`,
      ].join(`
`),
      { name: "AbiEncodingArrayLengthMismatchError" }
    );
  }
}
class Yp extends A {
  constructor({ expectedSize: t, value: n }) {
    super(
      `Size of bytes "${n}" (bytes${X(
        n
      )}) does not match expected size (bytes${t}).`,
      { name: "AbiEncodingBytesSizeMismatchError" }
    );
  }
}
class _f extends A {
  constructor({ expectedLength: t, givenLength: n }) {
    super(
      [
        "ABI encoding params/values length mismatch.",
        `Expected length (params): ${t}`,
        `Given length (values): ${n}`,
      ].join(`
`),
      { name: "AbiEncodingLengthMismatchError" }
    );
  }
}
class Jp extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Arguments (\`args\`) were provided to "${t}", but "${t}" on the ABI does not contain any parameters (\`inputs\`).`,
        "Cannot encode error result without knowing what the parameter types are.",
        "Make sure you are using the correct ABI and that the inputs exist on it.",
      ].join(`
`),
      { docsPath: n, name: "AbiErrorInputsNotFoundError" }
    );
  }
}
class Oc extends A {
  constructor(t, { docsPath: n } = {}) {
    super(
      [
        `Error ${t ? `"${t}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
      ].join(`
`),
      { docsPath: n, name: "AbiErrorNotFoundError" }
    );
  }
}
class Nf extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Encoded error signature "${t}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${t}.`,
      ].join(`
`),
      { docsPath: n, name: "AbiErrorSignatureNotFoundError" }
    ),
      Object.defineProperty(this, "signature", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.signature = t);
  }
}
class Xp extends A {
  constructor({ docsPath: t }) {
    super("Cannot extract event signature from empty topics.", {
      docsPath: t,
      name: "AbiEventSignatureEmptyTopicsError",
    });
  }
}
class Ff extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Encoded event signature "${t}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the event exists on it.",
        `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`,
      ].join(`
`),
      { docsPath: n, name: "AbiEventSignatureNotFoundError" }
    );
  }
}
class Tc extends A {
  constructor(t, { docsPath: n } = {}) {
    super(
      [
        `Event ${t ? `"${t}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the event exists on it.",
      ].join(`
`),
      { docsPath: n, name: "AbiEventNotFoundError" }
    );
  }
}
class cr extends A {
  constructor(t, { docsPath: n } = {}) {
    super(
      [
        `Function ${t ? `"${t}" ` : ""}not found on ABI.`,
        "Make sure you are using the correct ABI and that the function exists on it.",
      ].join(`
`),
      { docsPath: n, name: "AbiFunctionNotFoundError" }
    );
  }
}
class jf extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Function "${t}" does not contain any \`outputs\` on ABI.`,
        "Cannot decode function result without knowing what the parameter types are.",
        "Make sure you are using the correct ABI and that the function exists on it.",
      ].join(`
`),
      { docsPath: n, name: "AbiFunctionOutputsNotFoundError" }
    );
  }
}
class eb extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Encoded function signature "${t}" not found on ABI.`,
        "Make sure you are using the correct ABI and that the function exists on it.",
        `You can look up the signature here: https://openchain.xyz/signatures?query=${t}.`,
      ].join(`
`),
      { docsPath: n, name: "AbiFunctionSignatureNotFoundError" }
    );
  }
}
class tb extends A {
  constructor(t, n) {
    super("Found ambiguous types in overloaded ABI items.", {
      metaMessages: [
        `\`${t.type}\` in \`${Ve(t.abiItem)}\`, and`,
        `\`${n.type}\` in \`${Ve(n.abiItem)}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI.",
      ],
      name: "AbiItemAmbiguityError",
    });
  }
}
let zf = class extends A {
  constructor({ expectedSize: t, givenSize: n }) {
    super(`Expected bytes${t}, got bytes${n}.`, {
      name: "BytesSizeMismatchError",
    });
  }
};
class Mr extends A {
  constructor({ abiItem: t, data: n, params: r, size: s }) {
    super(
      [`Data size of ${s} bytes is too small for non-indexed event parameters.`]
        .join(`
`),
      {
        metaMessages: [
          `Params: (${oo(r, { includeName: !0 })})`,
          `Data:   ${n} (${s} bytes)`,
        ],
        name: "DecodeLogDataMismatch",
      }
    ),
      Object.defineProperty(this, "abiItem", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "params", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "size", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.abiItem = t),
      (this.data = n),
      (this.params = r),
      (this.size = s);
  }
}
class io extends A {
  constructor({ abiItem: t, param: n }) {
    super(
      [
        `Expected a topic for indexed event parameter${
          n.name ? ` "${n.name}"` : ""
        } on event "${Ve(t, { includeName: !0 })}".`,
      ].join(`
`),
      { name: "DecodeLogTopicsMismatch" }
    ),
      Object.defineProperty(this, "abiItem", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.abiItem = t);
  }
}
class nb extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Type "${t}" is not a valid encoding type.`,
        "Please provide a valid ABI type.",
      ].join(`
`),
      { docsPath: n, name: "InvalidAbiEncodingType" }
    );
  }
}
class rb extends A {
  constructor(t, { docsPath: n }) {
    super(
      [
        `Type "${t}" is not a valid decoding type.`,
        "Please provide a valid ABI type.",
      ].join(`
`),
      { docsPath: n, name: "InvalidAbiDecodingType" }
    );
  }
}
let Uf = class extends A {
  constructor(t) {
    super(
      [`Value "${t}" is not a valid array.`].join(`
`),
      { name: "InvalidArrayError" }
    );
  }
};
class sb extends A {
  constructor(t) {
    super(
      [
        `"${t}" is not a valid definition type.`,
        'Valid types: "function", "event", "error"',
      ].join(`
`),
      { name: "InvalidDefinitionTypeError" }
    );
  }
}
class ob extends A {
  constructor(t) {
    super(`Type "${t}" is not supported for packed encoding.`, {
      name: "UnsupportedPackedAbiType",
    });
  }
}
let Bc = class extends A {
    constructor({ offset: t }) {
      super(`Offset \`${t}\` cannot be negative.`, {
        name: "NegativeOffsetError",
      });
    }
  },
  Lf = class extends A {
    constructor({ length: t, position: n }) {
      super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`, {
        name: "PositionOutOfBoundsError",
      });
    }
  },
  ib = class extends A {
    constructor({ count: t, limit: n }) {
      super(
        `Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`,
        { name: "RecursiveReadLimitExceededError" }
      );
    }
  };
const ab = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new ib({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit,
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new Lf({ length: this.bytes.length, position: e });
  },
  decrementPosition(e) {
    if (e < 0) throw new Bc({ offset: e });
    const t = this.position - e;
    this.assertPosition(t), (this.position = t);
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0) throw new Bc({ offset: e });
    const t = this.position + e;
    this.assertPosition(t), (this.position = t);
  },
  inspectByte(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectBytes(e, t) {
    const n = t ?? this.position;
    return this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e);
  },
  inspectUint8(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectUint16(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 1), this.dataView.getUint16(t);
  },
  inspectUint24(e) {
    const t = e ?? this.position;
    return (
      this.assertPosition(t + 2),
      (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
    );
  },
  inspectUint32(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 3), this.dataView.getUint32(t);
  },
  pushByte(e) {
    this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++;
  },
  pushBytes(e) {
    this.assertPosition(this.position + e.length - 1),
      this.bytes.set(e, this.position),
      (this.position += e.length);
  },
  pushUint8(e) {
    this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++;
  },
  pushUint16(e) {
    this.assertPosition(this.position + 1),
      this.dataView.setUint16(this.position, e),
      (this.position += 2);
  },
  pushUint24(e) {
    this.assertPosition(this.position + 2),
      this.dataView.setUint16(this.position, e >> 8),
      this.dataView.setUint8(this.position + 2, e & 255),
      (this.position += 3);
  },
  pushUint32(e) {
    this.assertPosition(this.position + 3),
      this.dataView.setUint32(this.position, e),
      (this.position += 4);
  },
  readByte() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectByte();
    return this.position++, e;
  },
  readBytes(e, t) {
    this.assertReadLimit(), this._touch();
    const n = this.inspectBytes(e);
    return (this.position += t ?? e), n;
  },
  readUint8() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint8();
    return (this.position += 1), e;
  },
  readUint16() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint16();
    return (this.position += 2), e;
  },
  readUint24() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint24();
    return (this.position += 3), e;
  },
  readUint32() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint32();
    return (this.position += 4), e;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(e) {
    const t = this.position;
    return (
      this.assertPosition(e), (this.position = e), () => (this.position = t)
    );
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
    const e = this.getReadCount();
    this.positionReadCount.set(this.position, e + 1),
      e > 0 && this.recursiveReadCount++;
  },
};
function ma(e, { recursiveReadLimit: t = 8192 } = {}) {
  const n = Object.create(ab);
  return (
    (n.bytes = e),
    (n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)),
    (n.positionReadCount = new Map()),
    (n.recursiveReadLimit = t),
    n
  );
}
function ur(e, t, n, { strict: r } = {}) {
  return He(e, { strict: !1 })
    ? ui(e, t, n, { strict: r })
    : Hf(e, t, n, { strict: r });
}
function Df(e, t) {
  if (typeof t == "number" && t > 0 && t > X(e) - 1)
    throw new Ef({ offset: t, position: "start", size: X(e) });
}
function qf(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && X(e) !== n - t)
    throw new Ef({ offset: n, position: "end", size: X(e) });
}
function Hf(e, t, n, { strict: r } = {}) {
  Df(e, t);
  const s = e.slice(t, n);
  return r && qf(s, t, n), s;
}
function ui(e, t, n, { strict: r } = {}) {
  Df(e, t);
  const s = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return r && qf(s, t, n), s;
}
function cb(e, t = {}) {
  typeof t.size < "u" && ze(e, { size: t.size });
  const n = ne(e, t);
  return $e(n, t);
}
function ub(e, t = {}) {
  let n = e;
  if (
    (typeof t.size < "u" && (ze(n, { size: t.size }), (n = bt(n))),
    n.length > 1 || n[0] > 1)
  )
    throw new Jh(n);
  return !!n[0];
}
function yt(e, t = {}) {
  typeof t.size < "u" && ze(e, { size: t.size });
  const n = ne(e, t);
  return Ge(n, t);
}
function fb(e, t = {}) {
  let n = e;
  return (
    typeof t.size < "u" &&
      (ze(n, { size: t.size }), (n = bt(n, { dir: "right" }))),
    new TextDecoder().decode(n)
  );
}
function Ae(e) {
  return typeof e[0] == "string" ? $t(e) : db(e);
}
function db(e) {
  let t = 0;
  for (const s of e) t += s.length;
  const n = new Uint8Array(t);
  let r = 0;
  for (const s of e) n.set(s, r), (r += s.length);
  return n;
}
function $t(e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
const lb = /^(.*)\[([0-9]*)\]$/,
  Gf = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  ga =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
function It(e, t) {
  if (e.length !== t.length)
    throw new _f({ expectedLength: e.length, givenLength: t.length });
  const n = hb({ params: e, values: t }),
    r = va(n);
  return r.length === 0 ? "0x" : r;
}
function hb({ params: e, values: t }) {
  const n = [];
  for (let r = 0; r < e.length; r++) n.push(wa({ param: e[r], value: t[r] }));
  return n;
}
function wa({ param: e, value: t }) {
  const n = xa(e.type);
  if (n) {
    const [r, s] = n;
    return bb(t, { length: r, param: { ...e, type: s } });
  }
  if (e.type === "tuple") return vb(t, { param: e });
  if (e.type === "address") return pb(t);
  if (e.type === "bool") return mb(t);
  if (e.type.startsWith("uint") || e.type.startsWith("int")) {
    const r = e.type.startsWith("int"),
      [, , s = "256"] = ga.exec(e.type) ?? [];
    return gb(t, { signed: r, size: Number(s) });
  }
  if (e.type.startsWith("bytes")) return yb(t, { param: e });
  if (e.type === "string") return wb(t);
  throw new nb(e.type, { docsPath: "/docs/contract/encodeAbiParameters" });
}
function va(e) {
  let t = 0;
  for (let o = 0; o < e.length; o++) {
    const { dynamic: i, encoded: a } = e[o];
    i ? (t += 32) : (t += X(a));
  }
  const n = [],
    r = [];
  let s = 0;
  for (let o = 0; o < e.length; o++) {
    const { dynamic: i, encoded: a } = e[o];
    i ? (n.push(F(t + s, { size: 32 })), r.push(a), (s += X(a))) : n.push(a);
  }
  return Ae([...n, ...r]);
}
function pb(e) {
  if (!Ie(e)) throw new wt({ address: e });
  return { dynamic: !1, encoded: Gt(e.toLowerCase()) };
}
function bb(e, { length: t, param: n }) {
  const r = t === null;
  if (!Array.isArray(e)) throw new Uf(e);
  if (!r && e.length !== t)
    throw new Zp({
      expectedLength: t,
      givenLength: e.length,
      type: `${n.type}[${t}]`,
    });
  let s = !1;
  const o = [];
  for (let i = 0; i < e.length; i++) {
    const a = wa({ param: n, value: e[i] });
    a.dynamic && (s = !0), o.push(a);
  }
  if (r || s) {
    const i = va(o);
    if (r) {
      const a = F(o.length, { size: 32 });
      return { dynamic: !0, encoded: o.length > 0 ? Ae([a, i]) : a };
    }
    if (s) return { dynamic: !0, encoded: i };
  }
  return { dynamic: !1, encoded: Ae(o.map(({ encoded: i }) => i)) };
}
function yb(e, { param: t }) {
  const [, n] = t.type.split("bytes"),
    r = X(e);
  if (!n) {
    let s = e;
    return (
      r % 32 !== 0 &&
        (s = Gt(s, {
          dir: "right",
          size: Math.ceil((e.length - 2) / 2 / 32) * 32,
        })),
      { dynamic: !0, encoded: Ae([Gt(F(r, { size: 32 })), s]) }
    );
  }
  if (r !== Number.parseInt(n, 10))
    throw new Yp({ expectedSize: Number.parseInt(n, 10), value: e });
  return { dynamic: !1, encoded: Gt(e, { dir: "right" }) };
}
function mb(e) {
  if (typeof e != "boolean")
    throw new A(
      `Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`
    );
  return { dynamic: !1, encoded: Gt(pa(e)) };
}
function gb(e, { signed: t, size: n = 256 }) {
  if (typeof n == "number") {
    const r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
      s = t ? -r - 1n : 0n;
    if (e > r || e < s)
      throw new Sf({
        max: r.toString(),
        min: s.toString(),
        signed: t,
        size: n / 8,
        value: e.toString(),
      });
  }
  return { dynamic: !1, encoded: F(e, { size: 32, signed: t }) };
}
function wb(e) {
  const t = vn(e),
    n = Math.ceil(X(t) / 32),
    r = [];
  for (let s = 0; s < n; s++)
    r.push(Gt(ur(t, s * 32, (s + 1) * 32), { dir: "right" }));
  return { dynamic: !0, encoded: Ae([Gt(F(X(t), { size: 32 })), ...r]) };
}
function vb(e, { param: t }) {
  let n = !1;
  const r = [];
  for (let s = 0; s < t.components.length; s++) {
    const o = t.components[s],
      i = Array.isArray(e) ? s : o.name,
      a = wa({ param: o, value: e[i] });
    r.push(a), a.dynamic && (n = !0);
  }
  return { dynamic: n, encoded: n ? va(r) : Ae(r.map(({ encoded: s }) => s)) };
}
function xa(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function ls(e, t) {
  const n = typeof t == "string" ? Ne(t) : t,
    r = ma(n);
  if (X(n) === 0 && e.length > 0) throw new ds();
  if (X(t) && X(t) < 32)
    throw new Mf({
      data: typeof t == "string" ? t : ne(t),
      params: e,
      size: X(t),
    });
  let s = 0;
  const o = [];
  for (let i = 0; i < e.length; ++i) {
    const a = e[i];
    r.setPosition(s);
    const [c, u] = Vn(r, a, { staticPosition: 0 });
    (s += u), o.push(c);
  }
  return o;
}
function Vn(e, t, { staticPosition: n }) {
  const r = xa(t.type);
  if (r) {
    const [s, o] = r;
    return Eb(e, { ...t, type: o }, { length: s, staticPosition: n });
  }
  if (t.type === "tuple") return Ib(e, t, { staticPosition: n });
  if (t.type === "address") return xb(e);
  if (t.type === "bool") return Pb(e);
  if (t.type.startsWith("bytes")) return Sb(e, t, { staticPosition: n });
  if (t.type.startsWith("uint") || t.type.startsWith("int")) return $b(e, t);
  if (t.type === "string") return Ab(e, { staticPosition: n });
  throw new rb(t.type, { docsPath: "/docs/contract/decodeAbiParameters" });
}
const Rc = 32,
  fi = 32;
function xb(e) {
  const t = e.readBytes(32);
  return [fs(ne(Hf(t, -20))), 32];
}
function Eb(e, t, { length: n, staticPosition: r }) {
  if (!n) {
    const i = yt(e.readBytes(fi)),
      a = r + i,
      c = a + Rc;
    e.setPosition(a);
    const u = yt(e.readBytes(Rc)),
      f = _r(t);
    let d = 0;
    const l = [];
    for (let h = 0; h < u; ++h) {
      e.setPosition(c + (f ? h * 32 : d));
      const [b, p] = Vn(e, t, { staticPosition: c });
      (d += p), l.push(b);
    }
    return e.setPosition(r + 32), [l, 32];
  }
  if (_r(t)) {
    const i = yt(e.readBytes(fi)),
      a = r + i,
      c = [];
    for (let u = 0; u < n; ++u) {
      e.setPosition(a + u * 32);
      const [f] = Vn(e, t, { staticPosition: a });
      c.push(f);
    }
    return e.setPosition(r + 32), [c, 32];
  }
  let s = 0;
  const o = [];
  for (let i = 0; i < n; ++i) {
    const [a, c] = Vn(e, t, { staticPosition: r + s });
    (s += c), o.push(a);
  }
  return [o, s];
}
function Pb(e) {
  return [ub(e.readBytes(32), { size: 32 }), 32];
}
function Sb(e, t, { staticPosition: n }) {
  const [r, s] = t.type.split("bytes");
  if (!s) {
    const i = yt(e.readBytes(32));
    e.setPosition(n + i);
    const a = yt(e.readBytes(32));
    if (a === 0) return e.setPosition(n + 32), ["0x", 32];
    const c = e.readBytes(a);
    return e.setPosition(n + 32), [ne(c), 32];
  }
  return [ne(e.readBytes(Number.parseInt(s, 10), 32)), 32];
}
function $b(e, t) {
  const n = t.type.startsWith("int"),
    r = Number.parseInt(t.type.split("int")[1] || "256", 10),
    s = e.readBytes(32);
  return [r > 48 ? cb(s, { signed: n }) : yt(s, { signed: n }), 32];
}
function Ib(e, t, { staticPosition: n }) {
  const r = t.components.length === 0 || t.components.some(({ name: i }) => !i),
    s = r ? [] : {};
  let o = 0;
  if (_r(t)) {
    const i = yt(e.readBytes(fi)),
      a = n + i;
    for (let c = 0; c < t.components.length; ++c) {
      const u = t.components[c];
      e.setPosition(a + o);
      const [f, d] = Vn(e, u, { staticPosition: a });
      (o += d), (s[r ? c : u?.name] = f);
    }
    return e.setPosition(n + 32), [s, 32];
  }
  for (let i = 0; i < t.components.length; ++i) {
    const a = t.components[i],
      [c, u] = Vn(e, a, { staticPosition: n });
    (s[r ? i : a?.name] = c), (o += u);
  }
  return [s, o];
}
function Ab(e, { staticPosition: t }) {
  const n = yt(e.readBytes(32)),
    r = t + n;
  e.setPosition(r);
  const s = yt(e.readBytes(32));
  if (s === 0) return e.setPosition(t + 32), ["", 32];
  const o = e.readBytes(s, 32),
    i = fb(bt(o));
  return e.setPosition(t + 32), [i, 32];
}
function _r(e) {
  const { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return e.components?.some(_r);
  const n = xa(e.type);
  return !!(n && _r({ ...e, type: n[1] }));
}
const Cb = {
    1: "An `assert` condition failed.",
    17: "Arithmetic operation resulted in underflow or overflow.",
    18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
    33: "Attempted to convert to an invalid type.",
    34: "Attempted to access a storage byte array that is incorrectly encoded.",
    49: "Performed `.pop()` on an empty array",
    50: "Array index is out of bounds.",
    65: "Allocated too much memory or created an array which is too large.",
    81: "Attempted to call a zero-initialized variable of internal function type.",
  },
  Vf = {
    inputs: [{ name: "message", type: "string" }],
    name: "Error",
    type: "error",
  },
  Ob = {
    inputs: [{ name: "reason", type: "uint256" }],
    name: "Panic",
    type: "error",
  },
  Tb = (e) => oe(gr(e));
function Bb(e) {
  return Tb(e);
}
function Rb(e) {
  let t = !0,
    n = "",
    r = 0,
    s = "",
    o = !1;
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    if (
      (["(", ")", ","].includes(a) && (t = !0),
      a === "(" && r++,
      a === ")" && r--,
      !!t)
    ) {
      if (r === 0) {
        if (a === " " && ["event", "function", ""].includes(s)) s = "";
        else if (((s += a), a === ")")) {
          o = !0;
          break;
        }
        continue;
      }
      if (a === " ") {
        e[i - 1] !== "," && n !== "," && n !== ",(" && ((n = ""), (t = !1));
        continue;
      }
      (s += a), (n += a);
    }
  }
  if (!o) throw new A("Unable to normalize signature.");
  return s;
}
const kb = (e) => {
  const t = typeof e == "string" ? e : fh(e);
  return Rb(t);
};
function Wf(e) {
  return Bb(kb(e));
}
const hs = (e) => ur(Wf(e), 0, 4);
function Kf(e) {
  const { abi: t, data: n } = e,
    r = ur(n, 0, 4);
  if (r === "0x") throw new ds();
  const o = [...(t || []), Vf, Ob].find(
    (i) => i.type === "error" && r === hs(Ve(i))
  );
  if (!o) throw new Nf(r, { docsPath: "/docs/contract/decodeErrorResult" });
  return {
    abiItem: o,
    args:
      "inputs" in o && o.inputs && o.inputs.length > 0
        ? ls(o.inputs, ur(n, 4))
        : void 0,
    errorName: o.name,
  };
}
const ao = Wf,
  kc = "/docs/contract/decodeEventLog";
function Ea(e) {
  const { abi: t, data: n, strict: r, topics: s } = e,
    o = r ?? !0,
    [i, ...a] = s;
  if (!i) throw new Xp({ docsPath: kc });
  const c = t.find((p) => p.type === "event" && i === ao(Ve(p)));
  if (!(c && "name" in c) || c.type !== "event")
    throw new Ff(i, { docsPath: kc });
  const { name: u, inputs: f } = c,
    d = f?.some((p) => !("name" in p && p.name)),
    l = d ? [] : {},
    h = f.map((p, y) => [p, y]).filter(([p]) => "indexed" in p && p.indexed);
  for (let p = 0; p < h.length; p++) {
    const [y, x] = h[p],
      S = a[p];
    if (!S) throw new io({ abiItem: c, param: y });
    l[d ? x : y.name || x] = Mb({ param: y, value: S });
  }
  const b = f.filter((p) => !("indexed" in p && p.indexed));
  if (b.length > 0) {
    if (n && n !== "0x")
      try {
        const p = ls(b, n);
        if (p)
          if (d) for (let y = 0; y < f.length; y++) l[y] = l[y] ?? p.shift();
          else for (let y = 0; y < b.length; y++) l[b[y].name] = p[y];
      } catch (p) {
        if (o)
          throw p instanceof Mf || p instanceof Lf
            ? new Mr({ abiItem: c, data: n, params: b, size: X(n) })
            : p;
      }
    else if (o) throw new Mr({ abiItem: c, data: "0x", params: b, size: 0 });
  }
  return { eventName: u, args: Object.values(l).length > 0 ? l : void 0 };
}
function Mb({ param: e, value: t }) {
  return e.type === "string" ||
    e.type === "bytes" ||
    e.type === "tuple" ||
    e.type.match(/^(.*)\[(\d+)?\]$/)
    ? t
    : (ls([e], t) || [])[0];
}
function _b(e) {
  const { abi: t, data: n } = e,
    r = ur(n, 0, 4),
    s = t.find((o) => o.type === "function" && r === hs(Ve(o)));
  if (!s) throw new eb(r, { docsPath: "/docs/contract/decodeFunctionData" });
  return {
    functionName: s.name,
    args:
      "inputs" in s && s.inputs && s.inputs.length > 0
        ? ls(s.inputs, ur(n, 4))
        : void 0,
  };
}
function Bn(e) {
  const { abi: t, args: n = [], name: r } = e,
    s = He(r, { strict: !1 }),
    o = t.filter((a) =>
      s
        ? a.type === "function"
          ? hs(a) === r
          : a.type === "event"
          ? ao(a) === r
          : !1
        : "name" in a && a.name === r
    );
  if (o.length === 0) return;
  if (o.length === 1) return o[0];
  let i;
  for (const a of o) {
    if (!("inputs" in a)) continue;
    if (!n || n.length === 0) {
      if (!a.inputs || a.inputs.length === 0) return a;
      continue;
    }
    if (!a.inputs || a.inputs.length === 0 || a.inputs.length !== n.length)
      continue;
    if (
      n.every((u, f) => {
        const d = "inputs" in a && a.inputs[f];
        return d ? di(u, d) : !1;
      })
    ) {
      if (i && "inputs" in i && i.inputs) {
        const u = Qf(a.inputs, i.inputs, n);
        if (u)
          throw new tb({ abiItem: a, type: u[0] }, { abiItem: i, type: u[1] });
      }
      i = a;
    }
  }
  return i || o[0];
}
function di(e, t) {
  const n = typeof e,
    r = t.type;
  switch (r) {
    case "address":
      return Ie(e, { strict: !1 });
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return r === "tuple" && "components" in t
        ? Object.values(t.components).every((s, o) =>
            di(Object.values(e)[o], s)
          )
        : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
            r
          )
        ? n === "number" || n === "bigint"
        : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r)
        ? n === "string" || e instanceof Uint8Array
        : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r)
        ? Array.isArray(e) &&
          e.every((s) =>
            di(s, { ...t, type: r.replace(/(\[[0-9]{0,}\])$/, "") })
          )
        : !1;
  }
}
function Qf(e, t, n) {
  for (const r in e) {
    const s = e[r],
      o = t[r];
    if (
      s.type === "tuple" &&
      o.type === "tuple" &&
      "components" in s &&
      "components" in o
    )
      return Qf(s.components, o.components, n[r]);
    const i = [s.type, o.type];
    if (
      i.includes("address") && i.includes("bytes20")
        ? !0
        : i.includes("address") && i.includes("string")
        ? Ie(n[r], { strict: !1 })
        : i.includes("address") && i.includes("bytes")
        ? Ie(n[r], { strict: !1 })
        : !1
    )
      return i;
  }
}
const _o = "/docs/contract/decodeFunctionResult";
function Rn(e) {
  const { abi: t, args: n, functionName: r, data: s } = e;
  let o = t[0];
  if (r) {
    const a = Bn({ abi: t, args: n, name: r });
    if (!a) throw new cr(r, { docsPath: _o });
    o = a;
  }
  if (o.type !== "function") throw new cr(void 0, { docsPath: _o });
  if (!o.outputs) throw new jf(o.name, { docsPath: _o });
  const i = ls(o.outputs, s);
  if (i && i.length > 1) return i;
  if (i && i.length === 1) return i[0];
}
const No = "/docs/contract/encodeDeployData";
function co(e) {
  const { abi: t, args: n, bytecode: r } = e;
  if (!n || n.length === 0) return r;
  const s = t.find((i) => "type" in i && i.type === "constructor");
  if (!s) throw new Qp({ docsPath: No });
  if (!("inputs" in s)) throw new Cc({ docsPath: No });
  if (!s.inputs || s.inputs.length === 0) throw new Cc({ docsPath: No });
  const o = It(s.inputs, n);
  return $t([r, o]);
}
const Fo = "/docs/contract/encodeErrorResult";
function Mc(e) {
  const { abi: t, errorName: n, args: r } = e;
  let s = t[0];
  if (n) {
    const c = Bn({ abi: t, args: r, name: n });
    if (!c) throw new Oc(n, { docsPath: Fo });
    s = c;
  }
  if (s.type !== "error") throw new Oc(void 0, { docsPath: Fo });
  const o = Ve(s),
    i = hs(o);
  let a = "0x";
  if (r && r.length > 0) {
    if (!s.inputs) throw new Jp(s.name, { docsPath: Fo });
    a = It(s.inputs, r);
  }
  return $t([i, a]);
}
class Nb extends A {
  constructor(t) {
    super(`Filter type "${t}" is not supported.`, {
      name: "FilterTypeNotSupportedError",
    });
  }
}
const _c = "/docs/contract/encodeEventTopics";
function ps(e) {
  const { abi: t, eventName: n, args: r } = e;
  let s = t[0];
  if (n) {
    const c = Bn({ abi: t, name: n });
    if (!c) throw new Tc(n, { docsPath: _c });
    s = c;
  }
  if (s.type !== "event") throw new Tc(void 0, { docsPath: _c });
  const o = Ve(s),
    i = ao(o);
  let a = [];
  if (r && "inputs" in s) {
    const c = s.inputs?.filter((f) => "indexed" in f && f.indexed),
      u = Array.isArray(r)
        ? r
        : Object.values(r).length > 0
        ? c?.map((f) => r[f.name]) ?? []
        : [];
    u.length > 0 &&
      (a =
        c?.map((f, d) =>
          Array.isArray(u[d])
            ? u[d].map((l, h) => Nc({ param: f, value: u[d][h] }))
            : typeof u[d] < "u" && u[d] !== null
            ? Nc({ param: f, value: u[d] })
            : null
        ) ?? []);
  }
  return [i, ...a];
}
function Nc({ param: e, value: t }) {
  if (e.type === "string" || e.type === "bytes") return oe(gr(t));
  if (e.type === "tuple" || e.type.match(/^(.*)\[(\d+)?\]$/))
    throw new Nb(e.type);
  return It([e], [t]);
}
const Fc = "/docs/contract/encodeFunctionData";
function Fb(e) {
  const { abi: t, args: n, functionName: r } = e;
  let s = t[0];
  if (r) {
    const o = Bn({ abi: t, args: n, name: r });
    if (!o) throw new cr(r, { docsPath: Fc });
    s = o;
  }
  if (s.type !== "function") throw new cr(void 0, { docsPath: Fc });
  return { abi: [s], functionName: hs(Ve(s)) };
}
function Oe(e) {
  const { args: t } = e,
    { abi: n, functionName: r } =
      e.abi.length === 1 && e.functionName?.startsWith("0x") ? e : Fb(e),
    s = n[0],
    o = r,
    i = "inputs" in s && s.inputs ? It(s.inputs, t ?? []) : void 0;
  return $t([o, i ?? "0x"]);
}
const jo = "/docs/contract/encodeFunctionResult";
function jb(e) {
  const { abi: t, functionName: n, result: r } = e;
  let s = t[0];
  if (n) {
    const i = Bn({ abi: t, name: n });
    if (!i) throw new cr(n, { docsPath: jo });
    s = i;
  }
  if (s.type !== "function") throw new cr(void 0, { docsPath: jo });
  if (!s.outputs) throw new jf(s.name, { docsPath: jo });
  const o = (() => {
    if (s.outputs.length === 0) return [];
    if (s.outputs.length === 1) return [r];
    if (Array.isArray(r)) return r;
    throw new Uf(r);
  })();
  return It(s.outputs, o);
}
function mv(e, t) {
  if (e.length !== t.length)
    throw new _f({ expectedLength: e.length, givenLength: t.length });
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r],
      o = t[r];
    n.push(Zf(s, o));
  }
  return $t(n);
}
function Zf(e, t, n = !1) {
  if (e === "address") {
    const i = t;
    if (!Ie(i)) throw new wt({ address: i });
    return pt(i.toLowerCase(), { size: n ? 32 : null });
  }
  if (e === "string") return vn(t);
  if (e === "bytes") return t;
  if (e === "bool") return pt(pa(t), { size: n ? 32 : 1 });
  const r = e.match(ga);
  if (r) {
    const [i, a, c = "256"] = r,
      u = Number.parseInt(c, 10) / 8;
    return F(t, { size: n ? 32 : u, signed: a === "int" });
  }
  const s = e.match(Gf);
  if (s) {
    const [i, a] = s;
    if (Number.parseInt(a, 10) !== (t.length - 2) / 2)
      throw new zf({
        expectedSize: Number.parseInt(a, 10),
        givenSize: (t.length - 2) / 2,
      });
    return pt(t, { dir: "right", size: n ? 32 : null });
  }
  const o = e.match(lb);
  if (o && Array.isArray(t)) {
    const [i, a] = o,
      c = [];
    for (let u = 0; u < t.length; u++) c.push(Zf(a, t[u], !0));
    return c.length === 0 ? "0x" : $t(c);
  }
  throw new ob(e);
}
const ee = (e, t, n) =>
  JSON.stringify(e, (r, s) => (typeof s == "bigint" ? s.toString() : s), n);
function Yf({
  abiItem: e,
  args: t,
  includeFunctionName: n = !0,
  includeName: r = !1,
}) {
  if ("name" in e && "inputs" in e && e.inputs)
    return `${n ? e.name : ""}(${e.inputs
      .map(
        (s, o) =>
          `${r && s.name ? `${s.name}: ` : ""}${
            typeof t[o] == "object" ? ee(t[o]) : t[o]
          }`
      )
      .join(", ")})`;
}
function vr(e, t) {
  if (!Ie(e, { strict: !1 })) throw new wt({ address: e });
  if (!Ie(t, { strict: !1 })) throw new wt({ address: t });
  return e.toLowerCase() === t.toLowerCase();
}
function Pa(e) {
  const { abi: t, args: n, logs: r, strict: s = !0 } = e,
    o = (() => {
      if (e.eventName)
        return Array.isArray(e.eventName) ? e.eventName : [e.eventName];
    })();
  return r
    .map((i) => {
      try {
        const a = t.find((u) => u.type === "event" && i.topics[0] === ao(u));
        if (!a) return null;
        const c = Ea({ ...i, abi: [a], strict: s });
        return (o && !o.includes(c.eventName)) ||
          !zb({ args: c.args, inputs: a.inputs, matchArgs: n })
          ? null
          : { ...c, ...i };
      } catch (a) {
        let c, u;
        if (a instanceof Ff) return null;
        if (a instanceof Mr || a instanceof io) {
          if (s) return null;
          (c = a.abiItem.name),
            (u = a.abiItem.inputs?.some((f) => !("name" in f && f.name)));
        }
        return { ...i, args: u ? [] : {}, eventName: c };
      }
    })
    .filter(Boolean);
}
function zb(e) {
  const { args: t, inputs: n, matchArgs: r } = e;
  if (!r) return !0;
  if (!t) return !1;
  function s(o, i, a) {
    try {
      return o.type === "address"
        ? vr(i, a)
        : o.type === "string" || o.type === "bytes"
        ? oe(gr(i)) === a
        : i === a;
    } catch {
      return !1;
    }
  }
  return Array.isArray(t) && Array.isArray(r)
    ? r.every((o, i) => {
        if (o == null) return !0;
        const a = n[i];
        return a ? (Array.isArray(o) ? o : [o]).some((u) => s(a, u, t[i])) : !1;
      })
    : typeof t == "object" &&
      !Array.isArray(t) &&
      typeof r == "object" &&
      !Array.isArray(r)
    ? Object.entries(r).every(([o, i]) => {
        if (i == null) return !0;
        const a = n.find((u) => u.name === o);
        return a ? (Array.isArray(i) ? i : [i]).some((u) => s(a, u, t[o])) : !1;
      })
    : !1;
}
function Ub(e, t = "hex") {
  const n = Jf(e),
    r = ma(new Uint8Array(n.length));
  return n.encode(r), t === "hex" ? ne(r.bytes) : r.bytes;
}
function Jf(e) {
  return Array.isArray(e) ? Lb(e.map((t) => Jf(t))) : Db(e);
}
function Lb(e) {
  const t = e.reduce((s, o) => s + o.length, 0),
    n = Xf(t);
  return {
    length: t <= 55 ? 1 + t : 1 + n + t,
    encode(s) {
      t <= 55
        ? s.pushByte(192 + t)
        : (s.pushByte(247 + n),
          n === 1
            ? s.pushUint8(t)
            : n === 2
            ? s.pushUint16(t)
            : n === 3
            ? s.pushUint24(t)
            : s.pushUint32(t));
      for (const { encode: o } of e) o(s);
    },
  };
}
function Db(e) {
  const t = typeof e == "string" ? Ne(e) : e,
    n = Xf(t.length);
  return {
    length:
      t.length === 1 && t[0] < 128
        ? 1
        : t.length <= 55
        ? 1 + t.length
        : 1 + n + t.length,
    encode(s) {
      t.length === 1 && t[0] < 128
        ? s.pushBytes(t)
        : t.length <= 55
        ? (s.pushByte(128 + t.length), s.pushBytes(t))
        : (s.pushByte(183 + n),
          n === 1
            ? s.pushUint8(t.length)
            : n === 2
            ? s.pushUint16(t.length)
            : n === 3
            ? s.pushUint24(t.length)
            : s.pushUint32(t.length),
          s.pushBytes(t));
    },
  };
}
function Xf(e) {
  if (e < 2 ** 8) return 1;
  if (e < 2 ** 16) return 2;
  if (e < 2 ** 24) return 3;
  if (e < 2 ** 32) return 4;
  throw new A("Length is too large.");
}
function qb(e) {
  const { chainId: t, nonce: n, to: r } = e,
    s = e.contractAddress ?? e.address,
    o = oe($t(["0x05", Ub([t ? F(t) : "0x", s, n ? F(n) : "0x"])]));
  return r === "bytes" ? Ne(o) : o;
}
async function Hb({ hash: e, signature: t }) {
  const n = He(e) ? e : vt(e),
    { secp256k1: r } = await of(async () => {
      const { secp256k1: i } = await Promise.resolve().then(() => Og);
      return { secp256k1: i };
    }, void 0);
  return `0x${(() => {
    if (typeof t == "object" && "r" in t && "s" in t) {
      const { r: u, s: f, v: d, yParity: l } = t,
        h = Number(l ?? d),
        b = jc(h);
      return new r.Signature($e(u), $e(f)).addRecoveryBit(b);
    }
    const i = He(t) ? t : vt(t);
    if (X(i) !== 65) throw new Error("invalid signature length");
    const a = Ge(`0x${i.slice(130)}`),
      c = jc(a);
    return r.Signature.fromCompact(i.substring(2, 130)).addRecoveryBit(c);
  })()
    .recoverPublicKey(n.substring(2))
    .toHex(!1)}`;
}
function jc(e) {
  if (e === 0 || e === 1) return e;
  if (e === 27) return 0;
  if (e === 28) return 1;
  throw new Error("Invalid yParityOrV value");
}
async function ed({ hash: e, signature: t }) {
  return Wp(await Hb({ hash: e, signature: t }));
}
async function uo(e) {
  const { authorization: t, signature: n } = e;
  return ed({ hash: qb(t), signature: n ?? t });
}
const td = { gwei: 9, wei: 18 },
  Gb = { ether: -9, wei: 9 };
function nd(e, t) {
  let n = e.toString();
  const r = n.startsWith("-");
  r && (n = n.slice(1)), (n = n.padStart(t, "0"));
  let [s, o] = [n.slice(0, n.length - t), n.slice(n.length - t)];
  return (
    (o = o.replace(/(0+)$/, "")),
    `${r ? "-" : ""}${s || "0"}${o ? `.${o}` : ""}`
  );
}
function Sa(e, t = "wei") {
  return nd(e, td[t]);
}
function xe(e, t = "wei") {
  return nd(e, Gb[t]);
}
function bs(e) {
  const t = Object.entries(e)
      .map(([r, s]) => (s === void 0 || s === !1 ? null : [r, s]))
      .filter(Boolean),
    n = t.reduce((r, [s]) => Math.max(r, s.length), 0);
  return t.map(([r, s]) => `  ${`${r}:`.padEnd(n + 1)}  ${s}`).join(`
`);
}
class Vb extends A {
  constructor() {
    super(
      [
        "Cannot specify both a `gasPrice` and a `maxFeePerGas`/`maxPriorityFeePerGas`.",
        "Use `maxFeePerGas`/`maxPriorityFeePerGas` for EIP-1559 compatible networks, and `gasPrice` for others.",
      ].join(`
`),
      { name: "FeeConflictError" }
    );
  }
}
class Wb extends A {
  constructor({ transaction: t }) {
    super("Cannot infer a transaction type from provided transaction.", {
      metaMessages: [
        "Provided Transaction:",
        "{",
        bs(t),
        "}",
        "",
        "To infer the type, either provide:",
        "- a `type` to the Transaction, or",
        "- an EIP-1559 Transaction with `maxFeePerGas`, or",
        "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
        "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
        "- an EIP-7702 Transaction with `authorizationList`, or",
        "- a Legacy Transaction with `gasPrice`",
      ],
      name: "InvalidSerializableTransactionError",
    });
  }
}
class Kb extends A {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: s,
      data: o,
      gas: i,
      gasPrice: a,
      maxFeePerGas: c,
      maxPriorityFeePerGas: u,
      nonce: f,
      to: d,
      value: l,
    }
  ) {
    const h = bs({
      chain: s && `${s?.name} (id: ${s?.id})`,
      from: n?.address,
      to: d,
      value: typeof l < "u" && `${Sa(l)} ${s?.nativeCurrency?.symbol || "ETH"}`,
      data: o,
      gas: i,
      gasPrice: typeof a < "u" && `${xe(a)} gwei`,
      maxFeePerGas: typeof c < "u" && `${xe(c)} gwei`,
      maxPriorityFeePerGas: typeof u < "u" && `${xe(u)} gwei`,
      nonce: f,
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
      metaMessages: [
        ...(t.metaMessages ? [...t.metaMessages, " "] : []),
        "Request Arguments:",
        h,
      ].filter(Boolean),
      name: "TransactionExecutionError",
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.cause = t);
  }
}
class rd extends A {
  constructor({
    blockHash: t,
    blockNumber: n,
    blockTag: r,
    hash: s,
    index: o,
  }) {
    let i = "Transaction";
    r &&
      o !== void 0 &&
      (i = `Transaction at block time "${r}" at index "${o}"`),
      t &&
        o !== void 0 &&
        (i = `Transaction at block hash "${t}" at index "${o}"`),
      n &&
        o !== void 0 &&
        (i = `Transaction at block number "${n}" at index "${o}"`),
      s && (i = `Transaction with hash "${s}"`),
      super(`${i} could not be found.`, { name: "TransactionNotFoundError" });
  }
}
class sd extends A {
  constructor({ hash: t }) {
    super(
      `Transaction receipt with hash "${t}" could not be found. The Transaction may not be processed on a block yet.`,
      { name: "TransactionReceiptNotFoundError" }
    );
  }
}
class od extends A {
  constructor({ receipt: t }) {
    super(`Transaction with hash "${t.transactionHash}" reverted.`, {
      metaMessages: [
        'The receipt marked the transaction as "reverted". This could mean that the function on the contract you are trying to call threw an error.',
        " ",
        "You can attempt to extract the revert reason by:",
        "- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract",
        "- using the `call` Action with raw `data`",
      ],
      name: "TransactionReceiptRevertedError",
    }),
      Object.defineProperty(this, "receipt", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.receipt = t);
  }
}
class Qb extends A {
  constructor({ hash: t }) {
    super(
      `Timed out while waiting for transaction with hash "${t}" to be confirmed.`,
      { name: "WaitForTransactionReceiptTimeoutError" }
    );
  }
}
function id(e) {
  const { kzg: t } = e,
    n = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"),
    r = typeof e.blobs[0] == "string" ? e.blobs.map((o) => Ne(o)) : e.blobs,
    s = [];
  for (const o of r) s.push(Uint8Array.from(t.blobToKzgCommitment(o)));
  return n === "bytes" ? s : s.map((o) => ne(o));
}
function ad(e) {
  const { kzg: t } = e,
    n = e.to ?? (typeof e.blobs[0] == "string" ? "hex" : "bytes"),
    r = typeof e.blobs[0] == "string" ? e.blobs.map((i) => Ne(i)) : e.blobs,
    s =
      typeof e.commitments[0] == "string"
        ? e.commitments.map((i) => Ne(i))
        : e.commitments,
    o = [];
  for (let i = 0; i < r.length; i++) {
    const a = r[i],
      c = s[i];
    o.push(Uint8Array.from(t.computeBlobKzgProof(a, c)));
  }
  return n === "bytes" ? o : o.map((i) => ne(i));
}
function Zb(e, t, n, r) {
  if (typeof e.setBigUint64 == "function") return e.setBigUint64(t, n, r);
  const s = BigInt(32),
    o = BigInt(4294967295),
    i = Number((n >> s) & o),
    a = Number(n & o),
    c = r ? 4 : 0,
    u = r ? 0 : 4;
  e.setUint32(t + c, i, r), e.setUint32(t + u, a, r);
}
function Yb(e, t, n) {
  return (e & t) ^ (~e & n);
}
function Jb(e, t, n) {
  return (e & t) ^ (e & n) ^ (t & n);
}
class cd extends ba {
  constructor(t, n, r, s) {
    super(),
      (this.finished = !1),
      (this.length = 0),
      (this.pos = 0),
      (this.destroyed = !1),
      (this.blockLen = t),
      (this.outputLen = n),
      (this.padOffset = r),
      (this.isLE = s),
      (this.buffer = new Uint8Array(t)),
      (this.view = Ro(this.buffer));
  }
  update(t) {
    ar(this), (t = cs(t)), Kt(t);
    const { view: n, buffer: r, blockLen: s } = this,
      o = t.length;
    for (let i = 0; i < o; ) {
      const a = Math.min(s - this.pos, o - i);
      if (a === s) {
        const c = Ro(t);
        for (; s <= o - i; i += s) this.process(c, i);
        continue;
      }
      r.set(t.subarray(i, i + a), this.pos),
        (this.pos += a),
        (i += a),
        this.pos === s && (this.process(n, 0), (this.pos = 0));
    }
    return (this.length += t.length), this.roundClean(), this;
  }
  digestInto(t) {
    ar(this), If(t, this), (this.finished = !0);
    const { buffer: n, view: r, blockLen: s, isLE: o } = this;
    let { pos: i } = this;
    (n[i++] = 128),
      Qt(this.buffer.subarray(i)),
      this.padOffset > s - i && (this.process(r, 0), (i = 0));
    for (let d = i; d < s; d++) n[d] = 0;
    Zb(r, s - 8, BigInt(this.length * 8), o), this.process(r, 0);
    const a = Ro(t),
      c = this.outputLen;
    if (c % 4) throw new Error("_sha2: outputLen should be aligned to 32bit");
    const u = c / 4,
      f = this.get();
    if (u > f.length) throw new Error("_sha2: outputLen bigger than state");
    for (let d = 0; d < u; d++) a.setUint32(4 * d, f[d], o);
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    t || (t = new this.constructor()), t.set(...this.get());
    const {
      blockLen: n,
      buffer: r,
      length: s,
      finished: o,
      destroyed: i,
      pos: a,
    } = this;
    return (
      (t.destroyed = i),
      (t.finished = o),
      (t.length = s),
      (t.pos = a),
      s % n && t.buffer.set(r),
      t
    );
  }
  clone() {
    return this._cloneInto();
  }
}
const Tt = Uint32Array.from([
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
  ]),
  ae = Uint32Array.from([
    3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999,
    355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025,
    3675008525, 1694076839, 1203062813, 3204075428,
  ]),
  ce = Uint32Array.from([
    1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723,
    2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199,
    528734635, 4215389547, 1541459225, 327033209,
  ]),
  Xb = Uint32Array.from([
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
  ]),
  Bt = new Uint32Array(64);
class e1 extends cd {
  constructor(t = 32) {
    super(64, t, 8, !1),
      (this.A = Tt[0] | 0),
      (this.B = Tt[1] | 0),
      (this.C = Tt[2] | 0),
      (this.D = Tt[3] | 0),
      (this.E = Tt[4] | 0),
      (this.F = Tt[5] | 0),
      (this.G = Tt[6] | 0),
      (this.H = Tt[7] | 0);
  }
  get() {
    const { A: t, B: n, C: r, D: s, E: o, F: i, G: a, H: c } = this;
    return [t, n, r, s, o, i, a, c];
  }
  set(t, n, r, s, o, i, a, c) {
    (this.A = t | 0),
      (this.B = n | 0),
      (this.C = r | 0),
      (this.D = s | 0),
      (this.E = o | 0),
      (this.F = i | 0),
      (this.G = a | 0),
      (this.H = c | 0);
  }
  process(t, n) {
    for (let d = 0; d < 16; d++, n += 4) Bt[d] = t.getUint32(n, !1);
    for (let d = 16; d < 64; d++) {
      const l = Bt[d - 15],
        h = Bt[d - 2],
        b = Qe(l, 7) ^ Qe(l, 18) ^ (l >>> 3),
        p = Qe(h, 17) ^ Qe(h, 19) ^ (h >>> 10);
      Bt[d] = (p + Bt[d - 7] + b + Bt[d - 16]) | 0;
    }
    let { A: r, B: s, C: o, D: i, E: a, F: c, G: u, H: f } = this;
    for (let d = 0; d < 64; d++) {
      const l = Qe(a, 6) ^ Qe(a, 11) ^ Qe(a, 25),
        h = (f + l + Yb(a, c, u) + Xb[d] + Bt[d]) | 0,
        p = ((Qe(r, 2) ^ Qe(r, 13) ^ Qe(r, 22)) + Jb(r, s, o)) | 0;
      (f = u),
        (u = c),
        (c = a),
        (a = (i + h) | 0),
        (i = o),
        (o = s),
        (s = r),
        (r = (h + p) | 0);
    }
    (r = (r + this.A) | 0),
      (s = (s + this.B) | 0),
      (o = (o + this.C) | 0),
      (i = (i + this.D) | 0),
      (a = (a + this.E) | 0),
      (c = (c + this.F) | 0),
      (u = (u + this.G) | 0),
      (f = (f + this.H) | 0),
      this.set(r, s, o, i, a, c, u, f);
  }
  roundClean() {
    Qt(Bt);
  }
  destroy() {
    this.set(0, 0, 0, 0, 0, 0, 0, 0), Qt(this.buffer);
  }
}
const ud = $f(
    [
      "0x428a2f98d728ae22",
      "0x7137449123ef65cd",
      "0xb5c0fbcfec4d3b2f",
      "0xe9b5dba58189dbbc",
      "0x3956c25bf348b538",
      "0x59f111f1b605d019",
      "0x923f82a4af194f9b",
      "0xab1c5ed5da6d8118",
      "0xd807aa98a3030242",
      "0x12835b0145706fbe",
      "0x243185be4ee4b28c",
      "0x550c7dc3d5ffb4e2",
      "0x72be5d74f27b896f",
      "0x80deb1fe3b1696b1",
      "0x9bdc06a725c71235",
      "0xc19bf174cf692694",
      "0xe49b69c19ef14ad2",
      "0xefbe4786384f25e3",
      "0x0fc19dc68b8cd5b5",
      "0x240ca1cc77ac9c65",
      "0x2de92c6f592b0275",
      "0x4a7484aa6ea6e483",
      "0x5cb0a9dcbd41fbd4",
      "0x76f988da831153b5",
      "0x983e5152ee66dfab",
      "0xa831c66d2db43210",
      "0xb00327c898fb213f",
      "0xbf597fc7beef0ee4",
      "0xc6e00bf33da88fc2",
      "0xd5a79147930aa725",
      "0x06ca6351e003826f",
      "0x142929670a0e6e70",
      "0x27b70a8546d22ffc",
      "0x2e1b21385c26c926",
      "0x4d2c6dfc5ac42aed",
      "0x53380d139d95b3df",
      "0x650a73548baf63de",
      "0x766a0abb3c77b2a8",
      "0x81c2c92e47edaee6",
      "0x92722c851482353b",
      "0xa2bfe8a14cf10364",
      "0xa81a664bbc423001",
      "0xc24b8b70d0f89791",
      "0xc76c51a30654be30",
      "0xd192e819d6ef5218",
      "0xd69906245565a910",
      "0xf40e35855771202a",
      "0x106aa07032bbd1b8",
      "0x19a4c116b8d2d0c8",
      "0x1e376c085141ab53",
      "0x2748774cdf8eeb99",
      "0x34b0bcb5e19b48a8",
      "0x391c0cb3c5c95a63",
      "0x4ed8aa4ae3418acb",
      "0x5b9cca4f7763e373",
      "0x682e6ff3d6b2b8a3",
      "0x748f82ee5defb2fc",
      "0x78a5636f43172f60",
      "0x84c87814a1f0ab72",
      "0x8cc702081a6439ec",
      "0x90befffa23631e28",
      "0xa4506cebde82bde9",
      "0xbef9a3f7b2c67915",
      "0xc67178f2e372532b",
      "0xca273eceea26619c",
      "0xd186b8c721c0c207",
      "0xeada7dd6cde0eb1e",
      "0xf57d4f7fee6ed178",
      "0x06f067aa72176fba",
      "0x0a637dc5a2c898a6",
      "0x113f9804bef90dae",
      "0x1b710b35131c471b",
      "0x28db77f523047d84",
      "0x32caab7b40c72493",
      "0x3c9ebe0a15c9bebc",
      "0x431d67c49c100d4c",
      "0x4cc5d4becb3e42b6",
      "0x597f299cfc657e2a",
      "0x5fcb6fab3ad6faec",
      "0x6c44198c4a475817",
    ].map((e) => BigInt(e))
  ),
  t1 = ud[0],
  n1 = ud[1],
  Rt = new Uint32Array(80),
  kt = new Uint32Array(80);
class fd extends cd {
  constructor(t = 64) {
    super(128, t, 16, !1),
      (this.Ah = ce[0] | 0),
      (this.Al = ce[1] | 0),
      (this.Bh = ce[2] | 0),
      (this.Bl = ce[3] | 0),
      (this.Ch = ce[4] | 0),
      (this.Cl = ce[5] | 0),
      (this.Dh = ce[6] | 0),
      (this.Dl = ce[7] | 0),
      (this.Eh = ce[8] | 0),
      (this.El = ce[9] | 0),
      (this.Fh = ce[10] | 0),
      (this.Fl = ce[11] | 0),
      (this.Gh = ce[12] | 0),
      (this.Gl = ce[13] | 0),
      (this.Hh = ce[14] | 0),
      (this.Hl = ce[15] | 0);
  }
  get() {
    const {
      Ah: t,
      Al: n,
      Bh: r,
      Bl: s,
      Ch: o,
      Cl: i,
      Dh: a,
      Dl: c,
      Eh: u,
      El: f,
      Fh: d,
      Fl: l,
      Gh: h,
      Gl: b,
      Hh: p,
      Hl: y,
    } = this;
    return [t, n, r, s, o, i, a, c, u, f, d, l, h, b, p, y];
  }
  set(t, n, r, s, o, i, a, c, u, f, d, l, h, b, p, y) {
    (this.Ah = t | 0),
      (this.Al = n | 0),
      (this.Bh = r | 0),
      (this.Bl = s | 0),
      (this.Ch = o | 0),
      (this.Cl = i | 0),
      (this.Dh = a | 0),
      (this.Dl = c | 0),
      (this.Eh = u | 0),
      (this.El = f | 0),
      (this.Fh = d | 0),
      (this.Fl = l | 0),
      (this.Gh = h | 0),
      (this.Gl = b | 0),
      (this.Hh = p | 0),
      (this.Hl = y | 0);
  }
  process(t, n) {
    for (let w = 0; w < 16; w++, n += 4)
      (Rt[w] = t.getUint32(n)), (kt[w] = t.getUint32((n += 4)));
    for (let w = 16; w < 80; w++) {
      const v = Rt[w - 15] | 0,
        m = kt[w - 15] | 0,
        P = jn(v, m, 1) ^ jn(v, m, 8) ^ Ec(v, m, 7),
        E = zn(v, m, 1) ^ zn(v, m, 8) ^ Pc(v, m, 7),
        $ = Rt[w - 2] | 0,
        I = kt[w - 2] | 0,
        C = jn($, I, 19) ^ Os($, I, 61) ^ Ec($, I, 6),
        O = zn($, I, 19) ^ Ts($, I, 61) ^ Pc($, I, 6),
        R = bp(E, O, kt[w - 7], kt[w - 16]),
        M = yp(R, P, C, Rt[w - 7], Rt[w - 16]);
      (Rt[w] = M | 0), (kt[w] = R | 0);
    }
    let {
      Ah: r,
      Al: s,
      Bh: o,
      Bl: i,
      Ch: a,
      Cl: c,
      Dh: u,
      Dl: f,
      Eh: d,
      El: l,
      Fh: h,
      Fl: b,
      Gh: p,
      Gl: y,
      Hh: x,
      Hl: S,
    } = this;
    for (let w = 0; w < 80; w++) {
      const v = jn(d, l, 14) ^ jn(d, l, 18) ^ Os(d, l, 41),
        m = zn(d, l, 14) ^ zn(d, l, 18) ^ Ts(d, l, 41),
        P = (d & h) ^ (~d & p),
        E = (l & b) ^ (~l & y),
        $ = mp(S, m, E, n1[w], kt[w]),
        I = gp($, x, v, P, t1[w], Rt[w]),
        C = $ | 0,
        O = jn(r, s, 28) ^ Os(r, s, 34) ^ Os(r, s, 39),
        R = zn(r, s, 28) ^ Ts(r, s, 34) ^ Ts(r, s, 39),
        M = (r & o) ^ (r & a) ^ (o & a),
        D = (s & i) ^ (s & c) ^ (i & c);
      (x = p | 0),
        (S = y | 0),
        (p = h | 0),
        (y = b | 0),
        (h = d | 0),
        (b = l | 0),
        ({ h: d, l } = rt(u | 0, f | 0, I | 0, C | 0)),
        (u = a | 0),
        (f = c | 0),
        (a = o | 0),
        (c = i | 0),
        (o = r | 0),
        (i = s | 0);
      const T = hp(C, R, D);
      (r = pp(T, I, O, M)), (s = T | 0);
    }
    ({ h: r, l: s } = rt(this.Ah | 0, this.Al | 0, r | 0, s | 0)),
      ({ h: o, l: i } = rt(this.Bh | 0, this.Bl | 0, o | 0, i | 0)),
      ({ h: a, l: c } = rt(this.Ch | 0, this.Cl | 0, a | 0, c | 0)),
      ({ h: u, l: f } = rt(this.Dh | 0, this.Dl | 0, u | 0, f | 0)),
      ({ h: d, l } = rt(this.Eh | 0, this.El | 0, d | 0, l | 0)),
      ({ h, l: b } = rt(this.Fh | 0, this.Fl | 0, h | 0, b | 0)),
      ({ h: p, l: y } = rt(this.Gh | 0, this.Gl | 0, p | 0, y | 0)),
      ({ h: x, l: S } = rt(this.Hh | 0, this.Hl | 0, x | 0, S | 0)),
      this.set(r, s, o, i, a, c, u, f, d, l, h, b, p, y, x, S);
  }
  roundClean() {
    Qt(Rt, kt);
  }
  destroy() {
    Qt(this.buffer), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
class r1 extends fd {
  constructor() {
    super(48),
      (this.Ah = ae[0] | 0),
      (this.Al = ae[1] | 0),
      (this.Bh = ae[2] | 0),
      (this.Bl = ae[3] | 0),
      (this.Ch = ae[4] | 0),
      (this.Cl = ae[5] | 0),
      (this.Dh = ae[6] | 0),
      (this.Dl = ae[7] | 0),
      (this.Eh = ae[8] | 0),
      (this.El = ae[9] | 0),
      (this.Fh = ae[10] | 0),
      (this.Fl = ae[11] | 0),
      (this.Gh = ae[12] | 0),
      (this.Gl = ae[13] | 0),
      (this.Hh = ae[14] | 0),
      (this.Hl = ae[15] | 0);
  }
}
const dd = so(() => new e1()),
  gv = so(() => new fd()),
  wv = so(() => new r1()),
  s1 = dd;
function o1(e, t) {
  return s1(He(e, { strict: !1 }) ? gr(e) : e);
}
function i1(e) {
  const { commitment: t, version: n = 1 } = e,
    r = e.to ?? (typeof t == "string" ? "hex" : "bytes"),
    s = o1(t);
  return s.set([n], 0), r === "bytes" ? s : ne(s);
}
function a1(e) {
  const { commitments: t, version: n } = e,
    r = e.to,
    s = [];
  for (const o of t) s.push(i1({ commitment: o, to: r, version: n }));
  return s;
}
const zc = 6,
  ld = 32,
  $a = 4096,
  hd = ld * $a,
  Uc = hd * zc - 1 - 1 * $a * zc;
class c1 extends A {
  constructor({ maxSize: t, size: n }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${t} bytes`, `Given: ${n} bytes`],
      name: "BlobSizeTooLargeError",
    });
  }
}
class u1 extends A {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
}
function f1(e) {
  const t = typeof e.data == "string" ? Ne(e.data) : e.data,
    n = X(t);
  if (!n) throw new u1();
  if (n > Uc) throw new c1({ maxSize: Uc, size: n });
  const r = [];
  let s = !0,
    o = 0;
  for (; s; ) {
    const i = ma(new Uint8Array(hd));
    let a = 0;
    for (; a < $a; ) {
      const c = t.slice(o, o + (ld - 1));
      if ((i.pushByte(0), i.pushBytes(c), c.length < 31)) {
        i.pushByte(128), (s = !1);
        break;
      }
      a++, (o += 31);
    }
    r.push(i);
  }
  return r.map((i) => ne(i.bytes));
}
function d1(e) {
  const { data: t, kzg: n, to: r } = e,
    s = e.blobs ?? f1({ data: t }),
    o = e.commitments ?? id({ blobs: s, kzg: n, to: r }),
    i = e.proofs ?? ad({ blobs: s, commitments: o, kzg: n, to: r }),
    a = [];
  for (let c = 0; c < s.length; c++)
    a.push({ blob: s[c], commitment: o[c], proof: i[c] });
  return a;
}
const l1 = 2n ** 256n - 1n;
class li extends A {
  constructor({ blockNumber: t, chain: n, contract: r }) {
    super(`Chain "${n.name}" does not support contract "${r.name}".`, {
      metaMessages: [
        "This could be due to any of the following:",
        ...(t && r.blockCreated && r.blockCreated > t
          ? [
              `- The contract "${r.name}" was not deployed until block ${r.blockCreated} (current block ${t}).`,
            ]
          : [`- The chain does not have the contract "${r.name}" configured.`]),
      ],
      name: "ChainDoesNotSupportContract",
    });
  }
}
class h1 extends A {
  constructor({ chain: t, currentChainId: n }) {
    super(
      `The current chain of the wallet (id: ${n}) does not match the target chain for the transaction (id: ${t.id} – ${t.name}).`,
      {
        metaMessages: [
          `Current Chain ID:  ${n}`,
          `Expected Chain ID: ${t.id} – ${t.name}`,
        ],
        name: "ChainMismatchError",
      }
    );
  }
}
class p1 extends A {
  constructor() {
    super(
      [
        "No chain was provided to the request.",
        "Please provide a chain with the `chain` argument on the Action, or by supplying a `chain` to WalletClient.",
      ].join(`
`),
      { name: "ChainNotFoundError" }
    );
  }
}
class pd extends A {
  constructor() {
    super("No chain was provided to the Client.", {
      name: "ClientChainNotConfiguredError",
    });
  }
}
class tn extends A {
  constructor({ cause: t, message: n } = {}) {
    const r = n
      ?.replace("execution reverted: ", "")
      ?.replace("execution reverted", "");
    super(
      `Execution reverted ${
        r ? `with reason: ${r}` : "for an unknown reason"
      }.`,
      { cause: t, name: "ExecutionRevertedError" }
    );
  }
}
Object.defineProperty(tn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 3,
});
Object.defineProperty(tn, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/,
});
class Vs extends A {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${xe(n)} gwei` : ""
      }) cannot be higher than the maximum allowed value (2^256-1).`,
      { cause: t, name: "FeeCapTooHighError" }
    );
  }
}
Object.defineProperty(Vs, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/,
});
class hi extends A {
  constructor({ cause: t, maxFeePerGas: n } = {}) {
    super(
      `The fee cap (\`maxFeePerGas\`${
        n ? ` = ${xe(n)}` : ""
      } gwei) cannot be lower than the block base fee.`,
      { cause: t, name: "FeeCapTooLowError" }
    );
  }
}
Object.defineProperty(hi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/,
});
class pi extends A {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }is higher than the next one expected.`,
      { cause: t, name: "NonceTooHighError" }
    );
  }
}
Object.defineProperty(pi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too high/,
});
class bi extends A {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      [
        `Nonce provided for the transaction ${
          n ? `(${n}) ` : ""
        }is lower than the current nonce of the account.`,
        "Try increasing the nonce or find the latest nonce with `getTransactionCount`.",
      ].join(`
`),
      { cause: t, name: "NonceTooLowError" }
    );
  }
}
Object.defineProperty(bi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce too low|transaction already imported|already known/,
});
class yi extends A {
  constructor({ cause: t, nonce: n } = {}) {
    super(
      `Nonce provided for the transaction ${
        n ? `(${n}) ` : ""
      }exceeds the maximum allowed nonce.`,
      { cause: t, name: "NonceMaxValueError" }
    );
  }
}
Object.defineProperty(yi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /nonce has max value/,
});
class mi extends A {
  constructor({ cause: t } = {}) {
    super(
      [
        "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account.",
      ].join(`
`),
      {
        cause: t,
        metaMessages: [
          "This error could arise when the account does not have enough funds to:",
          " - pay for the total gas fee,",
          " - pay for the value to send.",
          " ",
          "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
          " - `gas` is the amount of gas needed for transaction to execute,",
          " - `gas fee` is the gas fee,",
          " - `value` is the amount of ether to send to the recipient.",
        ],
        name: "InsufficientFundsError",
      }
    );
  }
}
Object.defineProperty(mi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /insufficient funds|exceeds transaction sender account balance/,
});
class gi extends A {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction exceeds the limit allowed for the block.`,
      { cause: t, name: "IntrinsicGasTooHighError" }
    );
  }
}
Object.defineProperty(gi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too high|gas limit reached/,
});
class wi extends A {
  constructor({ cause: t, gas: n } = {}) {
    super(
      `The amount of gas ${
        n ? `(${n}) ` : ""
      }provided for the transaction is too low.`,
      { cause: t, name: "IntrinsicGasTooLowError" }
    );
  }
}
Object.defineProperty(wi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /intrinsic gas too low/,
});
class vi extends A {
  constructor({ cause: t }) {
    super("The transaction type is not supported for this chain.", {
      cause: t,
      name: "TransactionTypeNotSupportedError",
    });
  }
}
Object.defineProperty(vi, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /transaction type not valid/,
});
class Ws extends A {
  constructor({ cause: t, maxPriorityFeePerGas: n, maxFeePerGas: r } = {}) {
    super(
      [
        `The provided tip (\`maxPriorityFeePerGas\`${
          n ? ` = ${xe(n)} gwei` : ""
        }) cannot be higher than the fee cap (\`maxFeePerGas\`${
          r ? ` = ${xe(r)} gwei` : ""
        }).`,
      ].join(`
`),
      { cause: t, name: "TipAboveFeeCapError" }
    );
  }
}
Object.defineProperty(Ws, "nodeMessage", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value:
    /max priority fee per gas higher than max fee per gas|tip higher than fee cap/,
});
class ys extends A {
  constructor({ cause: t }) {
    super(`An error occurred while executing: ${t?.shortMessage}`, {
      cause: t,
      name: "UnknownNodeError",
    });
  }
}
function b1(e) {
  if (e.type) return e.type;
  if (typeof e.authorizationList < "u") return "eip7702";
  if (
    typeof e.blobs < "u" ||
    typeof e.blobVersionedHashes < "u" ||
    typeof e.maxFeePerBlobGas < "u" ||
    typeof e.sidecars < "u"
  )
    return "eip4844";
  if (typeof e.maxFeePerGas < "u" || typeof e.maxPriorityFeePerGas < "u")
    return "eip1559";
  if (typeof e.gasPrice < "u")
    return typeof e.accessList < "u" ? "eip2930" : "legacy";
  throw new Wb({ transaction: e });
}
async function y1({ address: e, authorization: t, signature: n }) {
  return vr(Ht(e), await uo({ authorization: t, signature: n }));
}
const m1 = (e) => e,
  ms = (e) => e;
class yn extends A {
  constructor({
    body: t,
    cause: n,
    details: r,
    headers: s,
    status: o,
    url: i,
  }) {
    super("HTTP request failed.", {
      cause: n,
      details: r,
      metaMessages: [
        o && `Status: ${o}`,
        `URL: ${ms(i)}`,
        t && `Request body: ${ee(t)}`,
      ].filter(Boolean),
      name: "HttpRequestError",
    }),
      Object.defineProperty(this, "body", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "headers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "status", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "url", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.body = t),
      (this.headers = s),
      (this.status = o),
      (this.url = i);
  }
}
class Ia extends A {
  constructor({ body: t, error: n, url: r }) {
    super("RPC Request failed.", {
      cause: n,
      details: n.message,
      metaMessages: [`URL: ${ms(r)}`, `Request body: ${ee(t)}`],
      name: "RpcRequestError",
    }),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.code = n.code),
      (this.data = n.data);
  }
}
class Lc extends A {
  constructor({ body: t, url: n }) {
    super("The request took too long to respond.", {
      details: "The request timed out.",
      metaMessages: [`URL: ${ms(n)}`, `Request body: ${ee(t)}`],
      name: "TimeoutError",
    });
  }
}
const g1 = -1;
class Ee extends A {
  constructor(
    t,
    { code: n, docsPath: r, metaMessages: s, name: o, shortMessage: i }
  ) {
    super(i, {
      cause: t,
      docsPath: r,
      metaMessages: s || t?.metaMessages,
      name: o || "RpcError",
    }),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.name = o || t.name),
      (this.code = t instanceof Ia ? t.code : n ?? g1);
  }
}
class Te extends Ee {
  constructor(t, n) {
    super(t, n),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = n.data);
  }
}
class Nr extends Ee {
  constructor(t) {
    super(t, {
      code: Nr.code,
      name: "ParseRpcError",
      shortMessage:
        "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text.",
    });
  }
}
Object.defineProperty(Nr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32700,
});
class Fr extends Ee {
  constructor(t) {
    super(t, {
      code: Fr.code,
      name: "InvalidRequestRpcError",
      shortMessage: "JSON is not a valid request object.",
    });
  }
}
Object.defineProperty(Fr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32600,
});
class jr extends Ee {
  constructor(t, { method: n } = {}) {
    super(t, {
      code: jr.code,
      name: "MethodNotFoundRpcError",
      shortMessage: `The method${
        n ? ` "${n}"` : ""
      } does not exist / is not available.`,
    });
  }
}
Object.defineProperty(jr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32601,
});
class zr extends Ee {
  constructor(t) {
    super(t, {
      code: zr.code,
      name: "InvalidParamsRpcError",
      shortMessage: [
        "Invalid parameters were provided to the RPC method.",
        "Double check you have provided the correct parameters.",
      ].join(`
`),
    });
  }
}
Object.defineProperty(zr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32602,
});
class xn extends Ee {
  constructor(t) {
    super(t, {
      code: xn.code,
      name: "InternalRpcError",
      shortMessage: "An internal error was received.",
    });
  }
}
Object.defineProperty(xn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32603,
});
class En extends Ee {
  constructor(t) {
    super(t, {
      code: En.code,
      name: "InvalidInputRpcError",
      shortMessage: [
        "Missing or invalid parameters.",
        "Double check you have provided the correct parameters.",
      ].join(`
`),
    });
  }
}
Object.defineProperty(En, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32e3,
});
class Ur extends Ee {
  constructor(t) {
    super(t, {
      code: Ur.code,
      name: "ResourceNotFoundRpcError",
      shortMessage: "Requested resource not found.",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ResourceNotFoundRpcError",
      });
  }
}
Object.defineProperty(Ur, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32001,
});
class Vt extends Ee {
  constructor(t) {
    super(t, {
      code: Vt.code,
      name: "ResourceUnavailableRpcError",
      shortMessage: "Requested resource not available.",
    });
  }
}
Object.defineProperty(Vt, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32002,
});
class fr extends Ee {
  constructor(t) {
    super(t, {
      code: fr.code,
      name: "TransactionRejectedRpcError",
      shortMessage: "Transaction creation failed.",
    });
  }
}
Object.defineProperty(fr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32003,
});
class nn extends Ee {
  constructor(t, { method: n } = {}) {
    super(t, {
      code: nn.code,
      name: "MethodNotSupportedRpcError",
      shortMessage: `Method${n ? ` "${n}"` : ""} is not supported.`,
    });
  }
}
Object.defineProperty(nn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32004,
});
class dr extends Ee {
  constructor(t) {
    super(t, {
      code: dr.code,
      name: "LimitExceededRpcError",
      shortMessage: "Request exceeds defined limit.",
    });
  }
}
Object.defineProperty(dr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32005,
});
class Lr extends Ee {
  constructor(t) {
    super(t, {
      code: Lr.code,
      name: "JsonRpcVersionUnsupportedError",
      shortMessage: "Version of JSON-RPC protocol is not supported.",
    });
  }
}
Object.defineProperty(Lr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32006,
});
class ue extends Te {
  constructor(t) {
    super(t, {
      code: ue.code,
      name: "UserRejectedRequestError",
      shortMessage: "User rejected the request.",
    });
  }
}
Object.defineProperty(ue, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4001,
});
class Dr extends Te {
  constructor(t) {
    super(t, {
      code: Dr.code,
      name: "UnauthorizedProviderError",
      shortMessage:
        "The requested method and/or account has not been authorized by the user.",
    });
  }
}
Object.defineProperty(Dr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4100,
});
class qr extends Te {
  constructor(t, { method: n } = {}) {
    super(t, {
      code: qr.code,
      name: "UnsupportedProviderMethodError",
      shortMessage: `The Provider does not support the requested method${
        n ? ` " ${n}"` : ""
      }.`,
    });
  }
}
Object.defineProperty(qr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4200,
});
class Hr extends Te {
  constructor(t) {
    super(t, {
      code: Hr.code,
      name: "ProviderDisconnectedError",
      shortMessage: "The Provider is disconnected from all chains.",
    });
  }
}
Object.defineProperty(Hr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4900,
});
class Gr extends Te {
  constructor(t) {
    super(t, {
      code: Gr.code,
      name: "ChainDisconnectedError",
      shortMessage: "The Provider is not connected to the requested chain.",
    });
  }
}
Object.defineProperty(Gr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4901,
});
class Pn extends Te {
  constructor(t) {
    super(t, {
      code: Pn.code,
      name: "SwitchChainError",
      shortMessage: "An error occurred when attempting to switch chain.",
    });
  }
}
Object.defineProperty(Pn, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 4902,
});
class lr extends Te {
  constructor(t) {
    super(t, {
      code: lr.code,
      name: "UnsupportedNonOptionalCapabilityError",
      shortMessage:
        "This Wallet does not support a capability that was not marked as optional.",
    });
  }
}
Object.defineProperty(lr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5700,
});
class Vr extends Te {
  constructor(t) {
    super(t, {
      code: Vr.code,
      name: "UnsupportedChainIdError",
      shortMessage: "This Wallet does not support the requested chain ID.",
    });
  }
}
Object.defineProperty(Vr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5710,
});
class Wr extends Te {
  constructor(t) {
    super(t, {
      code: Wr.code,
      name: "DuplicateIdError",
      shortMessage: "There is already a bundle submitted with this ID.",
    });
  }
}
Object.defineProperty(Wr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5720,
});
class Kr extends Te {
  constructor(t) {
    super(t, {
      code: Kr.code,
      name: "UnknownBundleIdError",
      shortMessage: "This bundle id is unknown / has not been submitted",
    });
  }
}
Object.defineProperty(Kr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5730,
});
class Qr extends Te {
  constructor(t) {
    super(t, {
      code: Qr.code,
      name: "BundleTooLargeError",
      shortMessage: "The call bundle is too large for the Wallet to process.",
    });
  }
}
Object.defineProperty(Qr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5740,
});
class Zr extends Te {
  constructor(t) {
    super(t, {
      code: Zr.code,
      name: "AtomicReadyWalletRejectedUpgradeError",
      shortMessage:
        "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade.",
    });
  }
}
Object.defineProperty(Zr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5750,
});
class hr extends Te {
  constructor(t) {
    super(t, {
      code: hr.code,
      name: "AtomicityNotSupportedError",
      shortMessage:
        "The wallet does not support atomic execution but the request requires it.",
    });
  }
}
Object.defineProperty(hr, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: 5760,
});
class w1 extends Ee {
  constructor(t) {
    super(t, {
      name: "UnknownRpcError",
      shortMessage: "An unknown RPC error occurred.",
    });
  }
}
const Bs = new wr(8192);
function v1(e, { enabled: t = !0, id: n }) {
  if (!t || !n) return e();
  if (Bs.get(n)) return Bs.get(n);
  const r = e().finally(() => Bs.delete(n));
  return Bs.set(n, r), r;
}
async function Ks(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Yr(
  e,
  { delay: t = 100, retryCount: n = 2, shouldRetry: r = () => !0 } = {}
) {
  return new Promise((s, o) => {
    const i = async ({ count: a = 0 } = {}) => {
      const c = async ({ error: u }) => {
        const f = typeof t == "function" ? t({ count: a, error: u }) : t;
        f && (await Ks(f)), i({ count: a + 1 });
      };
      try {
        const u = await e();
        s(u);
      } catch (u) {
        if (a < n && (await r({ count: a, error: u }))) return c({ error: u });
        o(u);
      }
    };
    i();
  });
}
function x1(e, t = {}) {
  return async (n, r = {}) => {
    const {
        dedupe: s = !1,
        methods: o,
        retryDelay: i = 150,
        retryCount: a = 3,
        uid: c,
      } = { ...t, ...r },
      { method: u } = n;
    if (o?.exclude?.includes(u))
      throw new nn(new Error("method not supported"), { method: u });
    if (o?.include && !o.include.includes(u))
      throw new nn(new Error("method not supported"), { method: u });
    const f = s ? vn(`${c}.${ee(n)}`) : void 0;
    return v1(
      () =>
        Yr(
          async () => {
            try {
              return await e(n);
            } catch (d) {
              const l = d;
              switch (l.code) {
                case Nr.code:
                  throw new Nr(l);
                case Fr.code:
                  throw new Fr(l);
                case jr.code:
                  throw new jr(l, { method: n.method });
                case zr.code:
                  throw new zr(l);
                case xn.code:
                  throw new xn(l);
                case En.code:
                  throw new En(l);
                case Ur.code:
                  throw new Ur(l);
                case Vt.code:
                  throw new Vt(l);
                case fr.code:
                  throw new fr(l);
                case nn.code:
                  throw new nn(l, { method: n.method });
                case dr.code:
                  throw new dr(l);
                case Lr.code:
                  throw new Lr(l);
                case ue.code:
                  throw new ue(l);
                case Dr.code:
                  throw new Dr(l);
                case qr.code:
                  throw new qr(l);
                case Hr.code:
                  throw new Hr(l);
                case Gr.code:
                  throw new Gr(l);
                case Pn.code:
                  throw new Pn(l);
                case lr.code:
                  throw new lr(l);
                case Vr.code:
                  throw new Vr(l);
                case Wr.code:
                  throw new Wr(l);
                case Kr.code:
                  throw new Kr(l);
                case Qr.code:
                  throw new Qr(l);
                case Zr.code:
                  throw new Zr(l);
                case hr.code:
                  throw new hr(l);
                case 5e3:
                  throw new ue(l);
                default:
                  throw d instanceof A ? d : new w1(l);
              }
            }
          },
          {
            delay: ({ count: d, error: l }) => {
              if (l && l instanceof yn) {
                const h = l?.headers?.get("Retry-After");
                if (h?.match(/\d/)) return Number.parseInt(h, 10) * 1e3;
              }
              return ~~(1 << d) * i;
            },
            retryCount: a,
            shouldRetry: ({ error: d }) => E1(d),
          }
        ),
      { enabled: s, id: f }
    );
  };
}
function E1(e) {
  return "code" in e && typeof e.code == "number"
    ? e.code === -1 || e.code === dr.code || e.code === xn.code
    : e instanceof yn && e.status
    ? e.status === 403 ||
      e.status === 408 ||
      e.status === 413 ||
      e.status === 429 ||
      e.status === 500 ||
      e.status === 502 ||
      e.status === 503 ||
      e.status === 504
    : !0;
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Aa =
    BigInt(0),
  xi = BigInt(1);
function gs(e) {
  return (
    e instanceof Uint8Array ||
    (ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array")
  );
}
function Ca(e) {
  if (!gs(e)) throw new Error("Uint8Array expected");
}
function Jr(e, t) {
  if (typeof t != "boolean") throw new Error(e + " boolean expected, got " + t);
}
function Rs(e) {
  const t = e.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function bd(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return e === "" ? Aa : BigInt("0x" + e);
}
const yd =
    typeof Uint8Array.from([]).toHex == "function" &&
    typeof Uint8Array.fromHex == "function",
  P1 = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Xr(e) {
  if ((Ca(e), yd)) return e.toHex();
  let t = "";
  for (let n = 0; n < e.length; n++) t += P1[e[n]];
  return t;
}
const ot = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
function Dc(e) {
  if (e >= ot._0 && e <= ot._9) return e - ot._0;
  if (e >= ot.A && e <= ot.F) return e - (ot.A - 10);
  if (e >= ot.a && e <= ot.f) return e - (ot.a - 10);
}
function Qs(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  if (yd) return Uint8Array.fromHex(e);
  const t = e.length,
    n = t / 2;
  if (t % 2)
    throw new Error("hex string expected, got unpadded hex of length " + t);
  const r = new Uint8Array(n);
  for (let s = 0, o = 0; s < n; s++, o += 2) {
    const i = Dc(e.charCodeAt(o)),
      a = Dc(e.charCodeAt(o + 1));
    if (i === void 0 || a === void 0) {
      const c = e[o] + e[o + 1];
      throw new Error(
        'hex string expected, got non-hex character "' + c + '" at index ' + o
      );
    }
    r[s] = i * 16 + a;
  }
  return r;
}
function mn(e) {
  return bd(Xr(e));
}
function md(e) {
  return Ca(e), bd(Xr(Uint8Array.from(e).reverse()));
}
function ws(e, t) {
  return Qs(e.toString(16).padStart(t * 2, "0"));
}
function gd(e, t) {
  return ws(e, t).reverse();
}
function ke(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Qs(t);
    } catch (o) {
      throw new Error(e + " must be hex string or Uint8Array, cause: " + o);
    }
  else if (gs(t)) r = Uint8Array.from(t);
  else throw new Error(e + " must be hex string or Uint8Array");
  const s = r.length;
  if (typeof n == "number" && s !== n)
    throw new Error(e + " of length " + n + " expected, got " + s);
  return r;
}
function Zs(...e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    Ca(s), (t += s.length);
  }
  const n = new Uint8Array(t);
  for (let r = 0, s = 0; r < e.length; r++) {
    const o = e[r];
    n.set(o, s), (s += o.length);
  }
  return n;
}
const zo = (e) => typeof e == "bigint" && Aa <= e;
function Oa(e, t, n) {
  return zo(e) && zo(t) && zo(n) && t <= e && e < n;
}
function Wn(e, t, n, r) {
  if (!Oa(t, n, r))
    throw new Error(
      "expected valid " + e + ": " + n + " <= n < " + r + ", got " + t
    );
}
function S1(e) {
  let t;
  for (t = 0; e > Aa; e >>= xi, t += 1);
  return t;
}
const fo = (e) => (xi << BigInt(e)) - xi,
  Uo = (e) => new Uint8Array(e),
  qc = (e) => Uint8Array.from(e);
function $1(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function") throw new Error("hmacFn must be a function");
  let r = Uo(e),
    s = Uo(e),
    o = 0;
  const i = () => {
      r.fill(1), s.fill(0), (o = 0);
    },
    a = (...d) => n(s, r, ...d),
    c = (d = Uo(0)) => {
      (s = a(qc([0]), d)),
        (r = a()),
        d.length !== 0 && ((s = a(qc([1]), d)), (r = a()));
    },
    u = () => {
      if (o++ >= 1e3) throw new Error("drbg: tried 1000 values");
      let d = 0;
      const l = [];
      for (; d < t; ) {
        r = a();
        const h = r.slice();
        l.push(h), (d += r.length);
      }
      return Zs(...l);
    };
  return (d, l) => {
    i(), c(d);
    let h;
    for (; !(h = l(u())); ) c();
    return i(), h;
  };
}
const I1 = {
  bigint: (e) => typeof e == "bigint",
  function: (e) => typeof e == "function",
  boolean: (e) => typeof e == "boolean",
  string: (e) => typeof e == "string",
  stringOrUint8Array: (e) => typeof e == "string" || gs(e),
  isSafeInteger: (e) => Number.isSafeInteger(e),
  array: (e) => Array.isArray(e),
  field: (e, t) => t.Fp.isValid(e),
  hash: (e) => typeof e == "function" && Number.isSafeInteger(e.outputLen),
};
function lo(e, t, n = {}) {
  const r = (s, o, i) => {
    const a = I1[o];
    if (typeof a != "function") throw new Error("invalid validator function");
    const c = e[s];
    if (!(i && c === void 0) && !a(c, e))
      throw new Error(
        "param " + String(s) + " is invalid. Expected " + o + ", got " + c
      );
  };
  for (const [s, o] of Object.entries(t)) r(s, o, !1);
  for (const [s, o] of Object.entries(n)) r(s, o, !0);
  return e;
}
function Hc(e) {
  const t = new WeakMap();
  return (n, ...r) => {
    const s = t.get(n);
    if (s !== void 0) return s;
    const o = e(n, ...r);
    return t.set(n, o), o;
  };
}
const A1 = "0.1.1";
function C1() {
  return A1;
}
let W = class Ei extends Error {
  constructor(t, n = {}) {
    const r = (() => {
        if (n.cause instanceof Ei) {
          if (n.cause.details) return n.cause.details;
          if (n.cause.shortMessage) return n.cause.shortMessage;
        }
        return n.cause &&
          "details" in n.cause &&
          typeof n.cause.details == "string"
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details;
      })(),
      s = (n.cause instanceof Ei && n.cause.docsPath) || n.docsPath,
      i = `https://oxlib.sh${s ?? ""}`,
      a = [
        t || "An error occurred.",
        ...(n.metaMessages ? ["", ...n.metaMessages] : []),
        ...(r || s
          ? ["", r ? `Details: ${r}` : void 0, s ? `See: ${i}` : void 0]
          : []),
      ].filter((c) => typeof c == "string").join(`
`);
    super(a, n.cause ? { cause: n.cause } : void 0),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docs", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "BaseError",
      }),
      Object.defineProperty(this, "version", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: `ox@${C1()}`,
      }),
      (this.cause = n.cause),
      (this.details = r),
      (this.docs = i),
      (this.docsPath = s),
      (this.shortMessage = t);
  }
  walk(t) {
    return wd(this, t);
  }
};
function wd(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e && e.cause
    ? wd(e.cause, t)
    : t
    ? null
    : e;
}
function vs(e, t) {
  if (Hn(e) > t) throw new G1({ givenSize: Hn(e), maxSize: t });
}
const it = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function Gc(e) {
  if (e >= it.zero && e <= it.nine) return e - it.zero;
  if (e >= it.A && e <= it.F) return e - (it.A - 10);
  if (e >= it.a && e <= it.f) return e - (it.a - 10);
}
function O1(e, t = {}) {
  const { dir: n, size: r = 32 } = t;
  if (r === 0) return e;
  if (e.length > r)
    throw new V1({ size: e.length, targetSize: r, type: "Bytes" });
  const s = new Uint8Array(r);
  for (let o = 0; o < r; o++) {
    const i = n === "right";
    s[i ? o : r - o - 1] = e[i ? o : e.length - o - 1];
  }
  return s;
}
function vd(e, t = {}) {
  const { dir: n = "left" } = t;
  let r = e,
    s = 0;
  for (
    let o = 0;
    o < r.length - 1 &&
    r[n === "left" ? o : r.length - o - 1].toString() === "0";
    o++
  )
    s++;
  return (r = n === "left" ? r.slice(s) : r.slice(0, r.length - s)), r;
}
function ho(e, t) {
  if (Ce(e) > t) throw new J1({ givenSize: Ce(e), maxSize: t });
}
function T1(e, t) {
  if (typeof t == "number" && t > 0 && t > Ce(e) - 1)
    throw new Od({ offset: t, position: "start", size: Ce(e) });
}
function B1(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && Ce(e) !== n - t)
    throw new Od({ offset: n, position: "end", size: Ce(e) });
}
function xd(e, t = {}) {
  const { dir: n, size: r = 32 } = t;
  if (r === 0) return e;
  const s = e.replace("0x", "");
  if (s.length > r * 2)
    throw new X1({ size: Math.ceil(s.length / 2), targetSize: r, type: "Hex" });
  return `0x${s[n === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
const R1 = "#__bigint";
function Ed(e, t, n) {
  return JSON.stringify(
    e,
    (r, s) => (typeof s == "bigint" ? s.toString() + R1 : s),
    n
  );
}
const k1 = new TextDecoder(),
  M1 = new TextEncoder();
function _1(e) {
  return e instanceof Uint8Array ? e : typeof e == "string" ? Pd(e) : N1(e);
}
function N1(e) {
  return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function Pd(e, t = {}) {
  const { size: n } = t;
  let r = e;
  n && (ho(e, n), (r = $n(e, n)));
  let s = r.slice(2);
  s.length % 2 && (s = `0${s}`);
  const o = s.length / 2,
    i = new Uint8Array(o);
  for (let a = 0, c = 0; a < o; a++) {
    const u = Gc(s.charCodeAt(c++)),
      f = Gc(s.charCodeAt(c++));
    if (u === void 0 || f === void 0)
      throw new W(
        `Invalid byte sequence ("${s[c - 2]}${s[c - 1]}" in "${s}").`
      );
    i[a] = u * 16 + f;
  }
  return i;
}
function F1(e, t = {}) {
  const { size: n } = t,
    r = M1.encode(e);
  return typeof n == "number" ? (vs(r, n), j1(r, n)) : r;
}
function j1(e, t) {
  return O1(e, { dir: "right", size: t });
}
function Hn(e) {
  return e.length;
}
function z1(e, t, n, r = {}) {
  const { strict: s } = r;
  return e.slice(t, n);
}
function U1(e, t = {}) {
  const { size: n } = t;
  typeof n < "u" && vs(e, n);
  const r = Ke(e, t);
  return Id(r, t);
}
function L1(e, t = {}) {
  const { size: n } = t;
  let r = e;
  if ((typeof n < "u" && (vs(r, n), (r = Sd(r))), r.length > 1 || r[0] > 1))
    throw new H1(r);
  return !!r[0];
}
function mt(e, t = {}) {
  const { size: n } = t;
  typeof n < "u" && vs(e, n);
  const r = Ke(e, t);
  return Ad(r, t);
}
function D1(e, t = {}) {
  const { size: n } = t;
  let r = e;
  return typeof n < "u" && (vs(r, n), (r = q1(r))), k1.decode(r);
}
function Sd(e) {
  return vd(e, { dir: "left" });
}
function q1(e) {
  return vd(e, { dir: "right" });
}
class H1 extends W {
  constructor(t) {
    super(`Bytes value \`${t}\` is not a valid boolean.`, {
      metaMessages: [
        "The bytes array must contain a single byte of either a `0` or `1` value.",
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Bytes.InvalidBytesBooleanError",
      });
  }
}
let G1 = class extends W {
    constructor({ givenSize: t, maxSize: n }) {
      super(`Size cannot exceed \`${n}\` bytes. Given size: \`${t}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeOverflowError",
        });
    }
  },
  V1 = class extends W {
    constructor({ size: t, targetSize: n, type: r }) {
      super(
        `${r.charAt(0).toUpperCase()}${r
          .slice(1)
          .toLowerCase()} size (\`${t}\`) exceeds padding size (\`${n}\`).`
      ),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Bytes.SizeExceedsPaddingSizeError",
        });
    }
  };
const W1 = new TextEncoder(),
  K1 = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function Q1(e, t = {}) {
  const { strict: n = !1 } = t;
  if (!e) throw new Vc(e);
  if (typeof e != "string") throw new Vc(e);
  if (n && !/^0x[0-9a-fA-F]*$/.test(e)) throw new Wc(e);
  if (!e.startsWith("0x")) throw new Wc(e);
}
function We(...e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
function Z1(e) {
  return e instanceof Uint8Array
    ? Ke(e)
    : Array.isArray(e)
    ? Ke(new Uint8Array(e))
    : e;
}
function $d(e, t = {}) {
  const n = `0x${Number(e)}`;
  return typeof t.size == "number" ? (ho(n, t.size), Sn(n, t.size)) : n;
}
function Ke(e, t = {}) {
  let n = "";
  for (let s = 0; s < e.length; s++) n += K1[e[s]];
  const r = `0x${n}`;
  return typeof t.size == "number" ? (ho(r, t.size), $n(r, t.size)) : r;
}
function he(e, t = {}) {
  const { signed: n, size: r } = t,
    s = BigInt(e);
  let o;
  r
    ? n
      ? (o = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (o = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (o = BigInt(Number.MAX_SAFE_INTEGER));
  const i = typeof o == "bigint" && n ? -o - 1n : 0;
  if ((o && s > o) || s < i) {
    const u = typeof e == "bigint" ? "n" : "";
    throw new Cd({
      max: o ? `${o}${u}` : void 0,
      min: `${i}${u}`,
      signed: n,
      size: r,
      value: `${e}${u}`,
    });
  }
  const c = `0x${(n && s < 0 ? (1n << BigInt(r * 8)) + BigInt(s) : s).toString(
    16
  )}`;
  return r ? Sn(c, r) : c;
}
function Ta(e, t = {}) {
  return Ke(W1.encode(e), t);
}
function Sn(e, t) {
  return xd(e, { dir: "left", size: t });
}
function $n(e, t) {
  return xd(e, { dir: "right", size: t });
}
function tt(e, t, n, r = {}) {
  const { strict: s } = r;
  T1(e, t);
  const o = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return s && B1(o, t, n), o;
}
function Ce(e) {
  return Math.ceil((e.length - 2) / 2);
}
function Id(e, t = {}) {
  const { signed: n } = t;
  t.size && ho(e, t.size);
  const r = BigInt(e);
  if (!n) return r;
  const s = (e.length - 2) / 2,
    o = (1n << (BigInt(s) * 8n)) - 1n,
    i = o >> 1n;
  return r <= i ? r : r - o - 1n;
}
function Ad(e, t = {}) {
  const { signed: n, size: r } = t;
  return Number(!n && !r ? e : Id(e, t));
}
function Y1(e, t = {}) {
  const { strict: n = !1 } = t;
  try {
    return Q1(e, { strict: n }), !0;
  } catch {
    return !1;
  }
}
class Cd extends W {
  constructor({ max: t, min: n, signed: r, size: s, value: o }) {
    super(
      `Number \`${o}\` is not in safe${s ? ` ${s * 8}-bit` : ""}${
        r ? " signed" : " unsigned"
      } integer range ${t ? `(\`${n}\` to \`${t}\`)` : `(above \`${n}\`)`}`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.IntegerOutOfRangeError",
      });
  }
}
class Vc extends W {
  constructor(t) {
    super(
      `Value \`${
        typeof t == "object" ? Ed(t) : t
      }\` of type \`${typeof t}\` is an invalid hex type.`,
      { metaMessages: ['Hex types must be represented as `"0x${string}"`.'] }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.InvalidHexTypeError",
      });
  }
}
class Wc extends W {
  constructor(t) {
    super(`Value \`${t}\` is an invalid hex value.`, {
      metaMessages: [
        'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).',
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.InvalidHexValueError",
      });
  }
}
class J1 extends W {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed \`${n}\` bytes. Given size: \`${t}\` bytes.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.SizeOverflowError",
      });
  }
}
class Od extends W {
  constructor({ offset: t, position: n, size: r }) {
    super(
      `Slice ${
        n === "start" ? "starting" : "ending"
      } at offset \`${t}\` is out-of-bounds (size: \`${r}\`).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.SliceOffsetOutOfBoundsError",
      });
  }
}
class X1 extends W {
  constructor({ size: t, targetSize: n, type: r }) {
    super(
      `${r.charAt(0).toUpperCase()}${r
        .slice(1)
        .toLowerCase()} size (\`${t}\`) exceeds padding size (\`${n}\`).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Hex.SizeExceedsPaddingSizeError",
      });
  }
}
function ey(e) {
  return {
    address: e.address,
    amount: he(e.amount),
    index: he(e.index),
    validatorIndex: he(e.validatorIndex),
  };
}
function Td(e) {
  return {
    ...(typeof e.baseFeePerGas == "bigint" && {
      baseFeePerGas: he(e.baseFeePerGas),
    }),
    ...(typeof e.blobBaseFee == "bigint" && { blobBaseFee: he(e.blobBaseFee) }),
    ...(typeof e.feeRecipient == "string" && { feeRecipient: e.feeRecipient }),
    ...(typeof e.gasLimit == "bigint" && { gasLimit: he(e.gasLimit) }),
    ...(typeof e.number == "bigint" && { number: he(e.number) }),
    ...(typeof e.prevRandao == "bigint" && { prevRandao: he(e.prevRandao) }),
    ...(typeof e.time == "bigint" && { time: he(e.time) }),
    ...(e.withdrawals && { withdrawals: e.withdrawals.map(ey) }),
  };
}
const Ys = [
    {
      inputs: [
        {
          components: [
            { name: "target", type: "address" },
            { name: "allowFailure", type: "bool" },
            { name: "callData", type: "bytes" },
          ],
          name: "calls",
          type: "tuple[]",
        },
      ],
      name: "aggregate3",
      outputs: [
        {
          components: [
            { name: "success", type: "bool" },
            { name: "returnData", type: "bytes" },
          ],
          name: "returnData",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getCurrentBlockTimestamp",
      outputs: [
        { internalType: "uint256", name: "timestamp", type: "uint256" },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  Pi = [
    {
      name: "query",
      type: "function",
      stateMutability: "view",
      inputs: [
        {
          type: "tuple[]",
          name: "queries",
          components: [
            { type: "address", name: "sender" },
            { type: "string[]", name: "urls" },
            { type: "bytes", name: "data" },
          ],
        },
      ],
      outputs: [
        { type: "bool[]", name: "failures" },
        { type: "bytes[]", name: "responses" },
      ],
    },
    {
      name: "HttpError",
      type: "error",
      inputs: [
        { type: "uint16", name: "status" },
        { type: "string", name: "message" },
      ],
    },
  ],
  Bd = [
    {
      inputs: [{ name: "dns", type: "bytes" }],
      name: "DNSDecodingFailed",
      type: "error",
    },
    {
      inputs: [{ name: "ens", type: "string" }],
      name: "DNSEncodingFailed",
      type: "error",
    },
    { inputs: [], name: "EmptyAddress", type: "error" },
    {
      inputs: [
        { name: "status", type: "uint16" },
        { name: "message", type: "string" },
      ],
      name: "HttpError",
      type: "error",
    },
    { inputs: [], name: "InvalidBatchGatewayResponse", type: "error" },
    {
      inputs: [{ name: "errorData", type: "bytes" }],
      name: "ResolverError",
      type: "error",
    },
    {
      inputs: [
        { name: "name", type: "bytes" },
        { name: "resolver", type: "address" },
      ],
      name: "ResolverNotContract",
      type: "error",
    },
    {
      inputs: [{ name: "name", type: "bytes" }],
      name: "ResolverNotFound",
      type: "error",
    },
    {
      inputs: [
        { name: "primary", type: "string" },
        { name: "primaryAddress", type: "bytes" },
      ],
      name: "ReverseAddressMismatch",
      type: "error",
    },
    {
      inputs: [{ internalType: "bytes4", name: "selector", type: "bytes4" }],
      name: "UnsupportedResolverProfile",
      type: "error",
    },
  ],
  Rd = [
    ...Bd,
    {
      name: "resolveWithGateways",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes" },
        { name: "data", type: "bytes" },
        { name: "gateways", type: "string[]" },
      ],
      outputs: [
        { name: "", type: "bytes" },
        { name: "address", type: "address" },
      ],
    },
  ],
  ty = [
    ...Bd,
    {
      name: "reverseWithGateways",
      type: "function",
      stateMutability: "view",
      inputs: [
        { type: "bytes", name: "reverseName" },
        { type: "uint256", name: "coinType" },
        { type: "string[]", name: "gateways" },
      ],
      outputs: [
        { type: "string", name: "resolvedName" },
        { type: "address", name: "resolver" },
        { type: "address", name: "reverseResolver" },
      ],
    },
  ],
  Kc = [
    {
      name: "text",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "key", type: "string" },
      ],
      outputs: [{ name: "", type: "string" }],
    },
  ],
  Qc = [
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [{ name: "name", type: "bytes32" }],
      outputs: [{ name: "", type: "address" }],
    },
    {
      name: "addr",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "name", type: "bytes32" },
        { name: "coinType", type: "uint256" },
      ],
      outputs: [{ name: "", type: "bytes" }],
    },
  ],
  kd = [
    {
      name: "isValidSignature",
      type: "function",
      stateMutability: "view",
      inputs: [
        { name: "hash", type: "bytes32" },
        { name: "signature", type: "bytes" },
      ],
      outputs: [{ name: "", type: "bytes4" }],
    },
  ],
  Zc = [
    {
      inputs: [
        { name: "_signer", type: "address" },
        { name: "_hash", type: "bytes32" },
        { name: "_signature", type: "bytes" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        { name: "_signer", type: "address" },
        { name: "_hash", type: "bytes32" },
        { name: "_signature", type: "bytes" },
      ],
      outputs: [{ type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
      name: "isValidSig",
    },
  ],
  Ev = [
    {
      type: "event",
      name: "Approval",
      inputs: [
        { indexed: !0, name: "owner", type: "address" },
        { indexed: !0, name: "spender", type: "address" },
        { indexed: !1, name: "value", type: "uint256" },
      ],
    },
    {
      type: "event",
      name: "Transfer",
      inputs: [
        { indexed: !0, name: "from", type: "address" },
        { indexed: !0, name: "to", type: "address" },
        { indexed: !1, name: "value", type: "uint256" },
      ],
    },
    {
      type: "function",
      name: "allowance",
      stateMutability: "view",
      inputs: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
      ],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "approve",
      stateMutability: "nonpayable",
      inputs: [
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ type: "bool" }],
    },
    {
      type: "function",
      name: "balanceOf",
      stateMutability: "view",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "decimals",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "uint8" }],
    },
    {
      type: "function",
      name: "name",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "string" }],
    },
    {
      type: "function",
      name: "symbol",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "string" }],
    },
    {
      type: "function",
      name: "totalSupply",
      stateMutability: "view",
      inputs: [],
      outputs: [{ type: "uint256" }],
    },
    {
      type: "function",
      name: "transfer",
      stateMutability: "nonpayable",
      inputs: [
        { name: "recipient", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ type: "bool" }],
    },
    {
      type: "function",
      name: "transferFrom",
      stateMutability: "nonpayable",
      inputs: [
        { name: "sender", type: "address" },
        { name: "recipient", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      outputs: [{ type: "bool" }],
    },
  ],
  ny = "0x82ad56cb",
  Md =
    "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe",
  ry =
    "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe",
  sy =
    "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572",
  Ba =
    "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
class oy extends A {
  constructor({ address: t }) {
    super(`State for account "${t}" is set multiple times.`, {
      name: "AccountStateConflictError",
    });
  }
}
class iy extends A {
  constructor() {
    super("state and stateDiff are set on the same account.", {
      name: "StateAssignmentConflictError",
    });
  }
}
function Yc(e) {
  return e.reduce(
    (t, { slot: n, value: r }) => `${t}        ${n}: ${r}
`,
    ""
  );
}
function ay(e) {
  return e
    .reduce(
      (t, { address: n, ...r }) => {
        let s = `${t}    ${n}:
`;
        return (
          r.nonce &&
            (s += `      nonce: ${r.nonce}
`),
          r.balance &&
            (s += `      balance: ${r.balance}
`),
          r.code &&
            (s += `      code: ${r.code}
`),
          r.state &&
            ((s += `      state:
`),
            (s += Yc(r.state))),
          r.stateDiff &&
            ((s += `      stateDiff:
`),
            (s += Yc(r.stateDiff))),
          s
        );
      },
      `  State Override:
`
    )
    .slice(0, -1);
}
class _d extends A {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: s,
      data: o,
      gas: i,
      gasPrice: a,
      maxFeePerGas: c,
      maxPriorityFeePerGas: u,
      nonce: f,
      to: d,
      value: l,
      stateOverride: h,
    }
  ) {
    const b = n ? Y(n) : void 0;
    let p = bs({
      from: b?.address,
      to: d,
      value: typeof l < "u" && `${Sa(l)} ${s?.nativeCurrency?.symbol || "ETH"}`,
      data: o,
      gas: i,
      gasPrice: typeof a < "u" && `${xe(a)} gwei`,
      maxFeePerGas: typeof c < "u" && `${xe(c)} gwei`,
      maxPriorityFeePerGas: typeof u < "u" && `${xe(u)} gwei`,
      nonce: f,
    });
    h &&
      (p += `
${ay(h)}`),
      super(t.shortMessage, {
        cause: t,
        docsPath: r,
        metaMessages: [
          ...(t.metaMessages ? [...t.metaMessages, " "] : []),
          "Raw Call Arguments:",
          p,
        ].filter(Boolean),
        name: "CallExecutionError",
      }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.cause = t);
  }
}
class Nd extends A {
  constructor(
    t,
    {
      abi: n,
      args: r,
      contractAddress: s,
      docsPath: o,
      functionName: i,
      sender: a,
    }
  ) {
    const c = Bn({ abi: n, args: r, name: i }),
      u = c
        ? Yf({ abiItem: c, args: r, includeFunctionName: !1, includeName: !1 })
        : void 0,
      f = c ? Ve(c, { includeName: !0 }) : void 0,
      d = bs({
        address: s && m1(s),
        function: f,
        args:
          u &&
          u !== "()" &&
          `${[...Array(i?.length ?? 0).keys()].map(() => " ").join("")}${u}`,
        sender: a,
      });
    super(
      t.shortMessage ||
        `An unknown error occurred while executing the contract function "${i}".`,
      {
        cause: t,
        docsPath: o,
        metaMessages: [
          ...(t.metaMessages ? [...t.metaMessages, " "] : []),
          d && "Contract Call:",
          d,
        ].filter(Boolean),
        name: "ContractFunctionExecutionError",
      }
    ),
      Object.defineProperty(this, "abi", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "args", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "contractAddress", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "formattedArgs", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "functionName", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "sender", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.abi = n),
      (this.args = r),
      (this.cause = t),
      (this.contractAddress = s),
      (this.functionName = i),
      (this.sender = a);
  }
}
class Si extends A {
  constructor({ abi: t, data: n, functionName: r, message: s }) {
    let o, i, a, c;
    if (n && n !== "0x")
      try {
        i = Kf({ abi: t, data: n });
        const { abiItem: f, errorName: d, args: l } = i;
        if (d === "Error") c = l[0];
        else if (d === "Panic") {
          const [h] = l;
          c = Cb[h];
        } else {
          const h = f ? Ve(f, { includeName: !0 }) : void 0,
            b =
              f && l
                ? Yf({
                    abiItem: f,
                    args: l,
                    includeFunctionName: !1,
                    includeName: !1,
                  })
                : void 0;
          a = [
            h ? `Error: ${h}` : "",
            b && b !== "()"
              ? `       ${[...Array(d?.length ?? 0).keys()]
                  .map(() => " ")
                  .join("")}${b}`
              : "",
          ];
        }
      } catch (f) {
        o = f;
      }
    else s && (c = s);
    let u;
    o instanceof Nf &&
      ((u = o.signature),
      (a = [
        `Unable to decode signature "${u}" as it was not found on the provided ABI.`,
        "Make sure you are using the correct ABI and that the error exists on it.",
        `You can look up the decoded signature here: https://openchain.xyz/signatures?query=${u}.`,
      ])),
      super(
        (c && c !== "execution reverted") || u
          ? [
              `The contract function "${r}" reverted with the following ${
                u ? "signature" : "reason"
              }:`,
              c || u,
            ].join(`
`)
          : `The contract function "${r}" reverted.`,
        { cause: o, metaMessages: a, name: "ContractFunctionRevertedError" }
      ),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "raw", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "reason", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "signature", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = i),
      (this.raw = n),
      (this.reason = c),
      (this.signature = u);
  }
}
class cy extends A {
  constructor({ functionName: t }) {
    super(`The contract function "${t}" returned no data ("0x").`, {
      metaMessages: [
        "This could be due to any of the following:",
        `  - The contract does not have the function "${t}",`,
        "  - The parameters passed to the contract function may be invalid, or",
        "  - The address is not a contract.",
      ],
      name: "ContractFunctionZeroDataError",
    });
  }
}
class uy extends A {
  constructor({ factory: t }) {
    super(
      `Deployment for counterfactual contract call failed${
        t ? ` for factory "${t}".` : ""
      }`,
      {
        metaMessages: [
          "Please ensure:",
          "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
          "- The `factoryData` is a valid encoded function call for contract deployment function on the factory.",
        ],
        name: "CounterfactualDeploymentFailedError",
      }
    );
  }
}
class po extends A {
  constructor({ data: t, message: n }) {
    super(n || "", { name: "RawContractError" }),
      Object.defineProperty(this, "code", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 3,
      }),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = t);
  }
}
function xr({ blockNumber: e, chain: t, contract: n }) {
  const r = t?.contracts?.[n];
  if (!r) throw new li({ chain: t, contract: { name: n } });
  if (e && r.blockCreated && r.blockCreated > e)
    throw new li({
      blockNumber: e,
      chain: t,
      contract: { name: n, blockCreated: r.blockCreated },
    });
  return r.address;
}
function bo(e, t) {
  const n = (e.details || "").toLowerCase(),
    r = e instanceof A ? e.walk((s) => s?.code === tn.code) : e;
  return r instanceof A
    ? new tn({ cause: e, message: r.details })
    : tn.nodeMessage.test(n)
    ? new tn({ cause: e, message: e.details })
    : Vs.nodeMessage.test(n)
    ? new Vs({ cause: e, maxFeePerGas: t?.maxFeePerGas })
    : hi.nodeMessage.test(n)
    ? new hi({ cause: e, maxFeePerGas: t?.maxFeePerGas })
    : pi.nodeMessage.test(n)
    ? new pi({ cause: e, nonce: t?.nonce })
    : bi.nodeMessage.test(n)
    ? new bi({ cause: e, nonce: t?.nonce })
    : yi.nodeMessage.test(n)
    ? new yi({ cause: e, nonce: t?.nonce })
    : mi.nodeMessage.test(n)
    ? new mi({ cause: e })
    : gi.nodeMessage.test(n)
    ? new gi({ cause: e, gas: t?.gas })
    : wi.nodeMessage.test(n)
    ? new wi({ cause: e, gas: t?.gas })
    : vi.nodeMessage.test(n)
    ? new vi({ cause: e })
    : Ws.nodeMessage.test(n)
    ? new Ws({
        cause: e,
        maxFeePerGas: t?.maxFeePerGas,
        maxPriorityFeePerGas: t?.maxPriorityFeePerGas,
      })
    : new ys({ cause: e });
}
function Fd(e, { docsPath: t, ...n }) {
  const r = (() => {
    const s = bo(e, n);
    return s instanceof ys ? e : s;
  })();
  return new _d(r, { docsPath: t, ...n });
}
function xs(e, { format: t }) {
  if (!t) return {};
  const n = {};
  function r(o) {
    const i = Object.keys(o);
    for (const a of i)
      a in e && (n[a] = e[a]),
        o[a] && typeof o[a] == "object" && !Array.isArray(o[a]) && r(o[a]);
  }
  const s = t(e || {});
  return r(s), n;
}
const fy = {
  legacy: "0x0",
  eip2930: "0x1",
  eip1559: "0x2",
  eip4844: "0x3",
  eip7702: "0x4",
};
function kn(e, t) {
  const n = {};
  return (
    typeof e.authorizationList < "u" &&
      (n.authorizationList = dy(e.authorizationList)),
    typeof e.accessList < "u" && (n.accessList = e.accessList),
    typeof e.blobVersionedHashes < "u" &&
      (n.blobVersionedHashes = e.blobVersionedHashes),
    typeof e.blobs < "u" &&
      (typeof e.blobs[0] != "string"
        ? (n.blobs = e.blobs.map((r) => ne(r)))
        : (n.blobs = e.blobs)),
    typeof e.data < "u" && (n.data = e.data),
    e.account && (n.from = e.account.address),
    typeof e.from < "u" && (n.from = e.from),
    typeof e.gas < "u" && (n.gas = F(e.gas)),
    typeof e.gasPrice < "u" && (n.gasPrice = F(e.gasPrice)),
    typeof e.maxFeePerBlobGas < "u" &&
      (n.maxFeePerBlobGas = F(e.maxFeePerBlobGas)),
    typeof e.maxFeePerGas < "u" && (n.maxFeePerGas = F(e.maxFeePerGas)),
    typeof e.maxPriorityFeePerGas < "u" &&
      (n.maxPriorityFeePerGas = F(e.maxPriorityFeePerGas)),
    typeof e.nonce < "u" && (n.nonce = F(e.nonce)),
    typeof e.to < "u" && (n.to = e.to),
    typeof e.type < "u" && (n.type = fy[e.type]),
    typeof e.value < "u" && (n.value = F(e.value)),
    n
  );
}
function dy(e) {
  return e.map((t) => ({
    address: t.address,
    r: t.r ? F(BigInt(t.r)) : t.r,
    s: t.s ? F(BigInt(t.s)) : t.s,
    chainId: F(t.chainId),
    nonce: F(t.nonce),
    ...(typeof t.yParity < "u" ? { yParity: F(t.yParity) } : {}),
    ...(typeof t.v < "u" && typeof t.yParity > "u" ? { v: F(t.v) } : {}),
  }));
}
function Ra() {
  let e = () => {},
    t = () => {};
  return {
    promise: new Promise((r, s) => {
      (e = r), (t = s);
    }),
    resolve: e,
    reject: t,
  };
}
const Lo = new Map();
function jd({ fn: e, id: t, shouldSplitBatch: n, wait: r = 0, sort: s }) {
  const o = async () => {
      const f = c();
      i();
      const d = f.map(({ args: l }) => l);
      d.length !== 0 &&
        e(d)
          .then((l) => {
            s && Array.isArray(l) && l.sort(s);
            for (let h = 0; h < f.length; h++) {
              const { resolve: b } = f[h];
              b?.([l[h], l]);
            }
          })
          .catch((l) => {
            for (let h = 0; h < f.length; h++) {
              const { reject: b } = f[h];
              b?.(l);
            }
          });
    },
    i = () => Lo.delete(t),
    a = () => c().map(({ args: f }) => f),
    c = () => Lo.get(t) || [],
    u = (f) => Lo.set(t, [...c(), f]);
  return {
    flush: i,
    async schedule(f) {
      const { promise: d, resolve: l, reject: h } = Ra();
      return (
        n?.([...a(), f]) && o(),
        c().length > 0
          ? (u({ args: f, resolve: l, reject: h }), d)
          : (u({ args: f, resolve: l, reject: h }), setTimeout(o, r), d)
      );
    },
  };
}
function Jc(e) {
  if (!(!e || e.length === 0))
    return e.reduce((t, { slot: n, value: r }) => {
      if (n.length !== 66)
        throw new wc({ size: n.length, targetSize: 66, type: "hex" });
      if (r.length !== 66)
        throw new wc({ size: r.length, targetSize: 66, type: "hex" });
      return (t[n] = r), t;
    }, {});
}
function ly(e) {
  const { balance: t, nonce: n, state: r, stateDiff: s, code: o } = e,
    i = {};
  if (
    (o !== void 0 && (i.code = o),
    t !== void 0 && (i.balance = F(t)),
    n !== void 0 && (i.nonce = F(n)),
    r !== void 0 && (i.state = Jc(r)),
    s !== void 0)
  ) {
    if (i.state) throw new iy();
    i.stateDiff = Jc(s);
  }
  return i;
}
function ka(e) {
  if (!e) return;
  const t = {};
  for (const { address: n, ...r } of e) {
    if (!Ie(n, { strict: !1 })) throw new wt({ address: n });
    if (t[n]) throw new oy({ address: n });
    t[n] = ly(r);
  }
  return t;
}
function Yt(e) {
  const {
      account: t,
      gasPrice: n,
      maxFeePerGas: r,
      maxPriorityFeePerGas: s,
      to: o,
    } = e,
    i = t ? Y(t) : void 0;
  if (i && !Ie(i.address)) throw new wt({ address: i.address });
  if (o && !Ie(o)) throw new wt({ address: o });
  if (typeof n < "u" && (typeof r < "u" || typeof s < "u")) throw new Vb();
  if (r && r > l1) throw new Vs({ maxFeePerGas: r });
  if (s && r && s > r)
    throw new Ws({ maxFeePerGas: r, maxPriorityFeePerGas: s });
}
async function Er(e, t) {
  const {
      account: n = e.account,
      authorizationList: r,
      batch: s = !!e.batch?.multicall,
      blockNumber: o,
      blockTag: i = e.experimental_blockTag ?? "latest",
      accessList: a,
      blobs: c,
      blockOverrides: u,
      code: f,
      data: d,
      factory: l,
      factoryData: h,
      gas: b,
      gasPrice: p,
      maxFeePerBlobGas: y,
      maxFeePerGas: x,
      maxPriorityFeePerGas: S,
      nonce: w,
      to: v,
      value: m,
      stateOverride: P,
      ...E
    } = t,
    $ = n ? Y(n) : void 0;
  if (f && (l || h))
    throw new A(
      "Cannot provide both `code` & `factory`/`factoryData` as parameters."
    );
  if (f && v) throw new A("Cannot provide both `code` & `to` as parameters.");
  const I = f && d,
    C = l && h && v && d,
    O = I || C,
    R = I
      ? zd({ code: f, data: d })
      : C
      ? by({ data: d, factory: l, factoryData: h, to: v })
      : d;
  try {
    Yt(t);
    const D = (typeof o == "bigint" ? F(o) : void 0) || i,
      T = u ? Td(u) : void 0,
      B = ka(P),
      N = e.chain?.formatters?.transactionRequest?.format,
      j = (N || kn)(
        {
          ...xs(E, { format: N }),
          accessList: a,
          account: $,
          authorizationList: r,
          blobs: c,
          data: R,
          gas: b,
          gasPrice: p,
          maxFeePerBlobGas: y,
          maxFeePerGas: x,
          maxPriorityFeePerGas: S,
          nonce: w,
          to: O ? void 0 : v,
          value: m,
        },
        "call"
      );
    if (s && hy({ request: j }) && !B && !T)
      try {
        return await py(e, { ...j, blockNumber: o, blockTag: i });
      } catch (Z) {
        if (!(Z instanceof pd) && !(Z instanceof li)) throw Z;
      }
    const L = (() => {
        const Z = [j, D];
        return B && T ? [...Z, B, T] : B ? [...Z, B] : T ? [...Z, {}, T] : Z;
      })(),
      K = await e.request({ method: "eth_call", params: L });
    return K === "0x" ? { data: void 0 } : { data: K };
  } catch (M) {
    const D = yy(M),
      { offchainLookup: T, offchainLookupSignature: B } = await of(async () => {
        const { offchainLookup: N, offchainLookupSignature: k } =
          await Promise.resolve().then(() => Py);
        return { offchainLookup: N, offchainLookupSignature: k };
      }, void 0);
    if (e.ccipRead !== !1 && D?.slice(0, 10) === B && v)
      return { data: await T(e, { data: D, to: v }) };
    throw O && D?.slice(0, 10) === "0x101bb98d"
      ? new uy({ factory: l })
      : Fd(M, { ...t, account: $, chain: e.chain });
  }
}
function hy({ request: e }) {
  const { data: t, to: n, ...r } = e;
  return !(
    !t ||
    t.startsWith(ny) ||
    !n ||
    Object.values(r).filter((s) => typeof s < "u").length > 0
  );
}
async function py(e, t) {
  const {
      batchSize: n = 1024,
      deployless: r = !1,
      wait: s = 0,
    } = typeof e.batch?.multicall == "object" ? e.batch.multicall : {},
    {
      blockNumber: o,
      blockTag: i = e.experimental_blockTag ?? "latest",
      data: a,
      to: c,
    } = t,
    u = (() => {
      if (r) return null;
      if (t.multicallAddress) return t.multicallAddress;
      if (e.chain)
        return xr({ blockNumber: o, chain: e.chain, contract: "multicall3" });
      throw new pd();
    })(),
    d = (typeof o == "bigint" ? F(o) : void 0) || i,
    { schedule: l } = jd({
      id: `${e.uid}.${d}`,
      wait: s,
      shouldSplitBatch(p) {
        return p.reduce((x, { data: S }) => x + (S.length - 2), 0) > n * 2;
      },
      fn: async (p) => {
        const y = p.map((w) => ({
            allowFailure: !0,
            callData: w.data,
            target: w.to,
          })),
          x = Oe({ abi: Ys, args: [y], functionName: "aggregate3" }),
          S = await e.request({
            method: "eth_call",
            params: [
              {
                ...(u === null
                  ? { data: zd({ code: Ba, data: x }) }
                  : { to: u, data: x }),
              },
              d,
            ],
          });
        return Rn({
          abi: Ys,
          args: [y],
          functionName: "aggregate3",
          data: S || "0x",
        });
      },
    }),
    [{ returnData: h, success: b }] = await l({ data: a, to: c });
  if (!b) throw new po({ data: h });
  return h === "0x" ? { data: void 0 } : { data: h };
}
function zd(e) {
  const { code: t, data: n } = e;
  return co({
    abi: wf(["constructor(bytes, bytes)"]),
    bytecode: Md,
    args: [t, n],
  });
}
function by(e) {
  const { data: t, factory: n, factoryData: r, to: s } = e;
  return co({
    abi: wf(["constructor(address, bytes, address, bytes)"]),
    bytecode: ry,
    args: [s, t, n, r],
  });
}
function yy(e) {
  if (!(e instanceof A)) return;
  const t = e.walk();
  return typeof t?.data == "object" ? t.data?.data : t.data;
}
class my extends A {
  constructor({
    callbackSelector: t,
    cause: n,
    data: r,
    extraData: s,
    sender: o,
    urls: i,
  }) {
    super(
      n.shortMessage ||
        "An error occurred while fetching for an offchain result.",
      {
        cause: n,
        metaMessages: [
          ...(n.metaMessages || []),
          n.metaMessages?.length ? "" : [],
          "Offchain Gateway Call:",
          i && ["  Gateway URL(s):", ...i.map((a) => `    ${ms(a)}`)],
          `  Sender: ${o}`,
          `  Data: ${r}`,
          `  Callback selector: ${t}`,
          `  Extra data: ${s}`,
        ].flat(),
        name: "OffchainLookupError",
      }
    );
  }
}
class gy extends A {
  constructor({ result: t, url: n }) {
    super(
      "Offchain gateway response is malformed. Response data must be a hex value.",
      {
        metaMessages: [`Gateway URL: ${ms(n)}`, `Response: ${ee(t)}`],
        name: "OffchainLookupResponseMalformedError",
      }
    );
  }
}
class wy extends A {
  constructor({ sender: t, to: n }) {
    super(
      "Reverted sender address does not match target contract address (`to`).",
      {
        metaMessages: [
          `Contract address: ${n}`,
          `OffchainLookup sender address: ${t}`,
        ],
        name: "OffchainLookupSenderMismatchError",
      }
    );
  }
}
const Es = "x-batch-gateway:true";
async function Ud(e) {
  const { data: t, ccipRequest: n } = e,
    {
      args: [r],
    } = _b({ abi: Pi, data: t }),
    s = [],
    o = [];
  return (
    await Promise.all(
      r.map(async (i, a) => {
        try {
          (o[a] = i.urls.includes(Es)
            ? await Ud({ data: i.data, ccipRequest: n })
            : await n(i)),
            (s[a] = !1);
        } catch (c) {
          (s[a] = !0), (o[a] = vy(c));
        }
      })
    ),
    jb({ abi: Pi, functionName: "query", result: [s, o] })
  );
}
function vy(e) {
  return e.name === "HttpRequestError" && e.status
    ? Mc({ abi: Pi, errorName: "HttpError", args: [e.status, e.shortMessage] })
    : Mc({
        abi: [Vf],
        errorName: "Error",
        args: ["shortMessage" in e ? e.shortMessage : e.message],
      });
}
const xy = "0x556f1830",
  Ld = {
    name: "OffchainLookup",
    type: "error",
    inputs: [
      { name: "sender", type: "address" },
      { name: "urls", type: "string[]" },
      { name: "callData", type: "bytes" },
      { name: "callbackFunction", type: "bytes4" },
      { name: "extraData", type: "bytes" },
    ],
  };
async function Ey(e, { blockNumber: t, blockTag: n, data: r, to: s }) {
  const { args: o } = Kf({ data: r, abi: [Ld] }),
    [i, a, c, u, f] = o,
    { ccipRead: d } = e,
    l = d && typeof d?.request == "function" ? d.request : Dd;
  try {
    if (!vr(s, i)) throw new wy({ sender: i, to: s });
    const h = a.includes(Es)
        ? await Ud({ data: c, ccipRequest: l })
        : await l({ data: c, sender: i, urls: a }),
      { data: b } = await Er(e, {
        blockNumber: t,
        blockTag: n,
        data: Ae([u, It([{ type: "bytes" }, { type: "bytes" }], [h, f])]),
        to: s,
      });
    return b;
  } catch (h) {
    throw new my({
      callbackSelector: u,
      cause: h,
      data: r,
      extraData: f,
      sender: i,
      urls: a,
    });
  }
}
async function Dd({ data: e, sender: t, urls: n }) {
  let r = new Error("An unknown error occurred.");
  for (let s = 0; s < n.length; s++) {
    const o = n[s],
      i = o.includes("{data}") ? "GET" : "POST",
      a = i === "POST" ? { data: e, sender: t } : void 0,
      c = i === "POST" ? { "Content-Type": "application/json" } : {};
    try {
      const u = await fetch(
        o.replace("{sender}", t.toLowerCase()).replace("{data}", e),
        { body: JSON.stringify(a), headers: c, method: i }
      );
      let f;
      if (
        (u.headers.get("Content-Type")?.startsWith("application/json")
          ? (f = (await u.json()).data)
          : (f = await u.text()),
        !u.ok)
      ) {
        r = new yn({
          body: a,
          details: f?.error ? ee(f.error) : u.statusText,
          headers: u.headers,
          status: u.status,
          url: o,
        });
        continue;
      }
      if (!He(f)) {
        r = new gy({ result: f, url: o });
        continue;
      }
      return f;
    } catch (u) {
      r = new yn({ body: a, details: u.message, url: o });
    }
  }
  throw r;
}
const Py = Object.freeze(
  Object.defineProperty(
    {
      __proto__: null,
      ccipRequest: Dd,
      offchainLookup: Ey,
      offchainLookupAbiItem: Ld,
      offchainLookupSignature: xy,
    },
    Symbol.toStringTag,
    { value: "Module" }
  )
);
function Ma({ chain: e, currentChainId: t }) {
  if (!e) throw new p1();
  if (t !== e.id) throw new h1({ chain: e, currentChainId: t });
}
function Pv(e) {
  return { formatters: void 0, fees: void 0, serializers: void 0, ...e };
}
const Sy = 3;
function In(
  e,
  { abi: t, address: n, args: r, docsPath: s, functionName: o, sender: i }
) {
  const a =
      e instanceof po
        ? e
        : e instanceof A
        ? e.walk((b) => "data" in b) || e.walk()
        : {},
    { code: c, data: u, details: f, message: d, shortMessage: l } = a,
    h =
      e instanceof ds
        ? new cy({ functionName: o })
        : [Sy, xn.code].includes(c) && (u || f || d || l)
        ? new Si({
            abi: t,
            data: typeof u == "object" ? u.data : u,
            functionName: o,
            message: a instanceof Ia ? f : l ?? d,
          })
        : e;
  return new Nd(h, {
    abi: t,
    args: r,
    contractAddress: n,
    docsPath: s,
    functionName: o,
    sender: i,
  });
}
class $y extends A {
  constructor(
    t,
    {
      account: n,
      docsPath: r,
      chain: s,
      data: o,
      gas: i,
      gasPrice: a,
      maxFeePerGas: c,
      maxPriorityFeePerGas: u,
      nonce: f,
      to: d,
      value: l,
    }
  ) {
    const h = bs({
      from: n?.address,
      to: d,
      value: typeof l < "u" && `${Sa(l)} ${s?.nativeCurrency?.symbol || "ETH"}`,
      data: o,
      gas: i,
      gasPrice: typeof a < "u" && `${xe(a)} gwei`,
      maxFeePerGas: typeof c < "u" && `${xe(c)} gwei`,
      maxPriorityFeePerGas: typeof u < "u" && `${xe(u)} gwei`,
      nonce: f,
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: r,
      metaMessages: [
        ...(t.metaMessages ? [...t.metaMessages, " "] : []),
        "Estimate Gas Arguments:",
        h,
      ].filter(Boolean),
      name: "EstimateGasExecutionError",
    }),
      Object.defineProperty(this, "cause", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.cause = t);
  }
}
function Iy(e, { docsPath: t, ...n }) {
  const r = (() => {
    const s = bo(e, n);
    return s instanceof ys ? e : s;
  })();
  return new $y(r, { docsPath: t, ...n });
}
function _a(e, { docsPath: t, ...n }) {
  const r = (() => {
    const s = bo(e, n);
    return s instanceof ys ? e : s;
  })();
  return new Kb(r, { docsPath: t, ...n });
}
const qd = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702",
};
function Hd(e, t) {
  const n = {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    chainId: e.chainId ? Ge(e.chainId) : void 0,
    gas: e.gas ? BigInt(e.gas) : void 0,
    gasPrice: e.gasPrice ? BigInt(e.gasPrice) : void 0,
    maxFeePerBlobGas: e.maxFeePerBlobGas ? BigInt(e.maxFeePerBlobGas) : void 0,
    maxFeePerGas: e.maxFeePerGas ? BigInt(e.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: e.maxPriorityFeePerGas
      ? BigInt(e.maxPriorityFeePerGas)
      : void 0,
    nonce: e.nonce ? Ge(e.nonce) : void 0,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    type: e.type ? qd[e.type] : void 0,
    typeHex: e.type ? e.type : void 0,
    value: e.value ? BigInt(e.value) : void 0,
    v: e.v ? BigInt(e.v) : void 0,
  };
  return (
    e.authorizationList && (n.authorizationList = Ay(e.authorizationList)),
    (n.yParity = (() => {
      if (e.yParity) return Number(e.yParity);
      if (typeof n.v == "bigint") {
        if (n.v === 0n || n.v === 27n) return 0;
        if (n.v === 1n || n.v === 28n) return 1;
        if (n.v >= 35n) return n.v % 2n === 0n ? 1 : 0;
      }
    })()),
    n.type === "legacy" &&
      (delete n.accessList,
      delete n.maxFeePerBlobGas,
      delete n.maxFeePerGas,
      delete n.maxPriorityFeePerGas,
      delete n.yParity),
    n.type === "eip2930" &&
      (delete n.maxFeePerBlobGas,
      delete n.maxFeePerGas,
      delete n.maxPriorityFeePerGas),
    n.type === "eip1559" && delete n.maxFeePerBlobGas,
    n
  );
}
function Ay(e) {
  return e.map((t) => ({
    address: t.address,
    chainId: Number(t.chainId),
    nonce: Number(t.nonce),
    r: t.r,
    s: t.s,
    yParity: Number(t.yParity),
  }));
}
function Gd(e, t) {
  const n = (e.transactions ?? []).map((r) =>
    typeof r == "string" ? r : Hd(r)
  );
  return {
    ...e,
    baseFeePerGas: e.baseFeePerGas ? BigInt(e.baseFeePerGas) : null,
    blobGasUsed: e.blobGasUsed ? BigInt(e.blobGasUsed) : void 0,
    difficulty: e.difficulty ? BigInt(e.difficulty) : void 0,
    excessBlobGas: e.excessBlobGas ? BigInt(e.excessBlobGas) : void 0,
    gasLimit: e.gasLimit ? BigInt(e.gasLimit) : void 0,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : void 0,
    hash: e.hash ? e.hash : null,
    logsBloom: e.logsBloom ? e.logsBloom : null,
    nonce: e.nonce ? e.nonce : null,
    number: e.number ? BigInt(e.number) : null,
    size: e.size ? BigInt(e.size) : void 0,
    timestamp: e.timestamp ? BigInt(e.timestamp) : void 0,
    transactions: n,
    totalDifficulty: e.totalDifficulty ? BigInt(e.totalDifficulty) : null,
  };
}
function xt(e, { args: t, eventName: n } = {}) {
  return {
    ...e,
    blockHash: e.blockHash ? e.blockHash : null,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    logIndex: e.logIndex ? Number(e.logIndex) : null,
    transactionHash: e.transactionHash ? e.transactionHash : null,
    transactionIndex: e.transactionIndex ? Number(e.transactionIndex) : null,
    ...(n ? { args: t, eventName: n } : {}),
  };
}
const Vd = { "0x0": "reverted", "0x1": "success" };
function Wd(e, t) {
  const n = {
    ...e,
    blockNumber: e.blockNumber ? BigInt(e.blockNumber) : null,
    contractAddress: e.contractAddress ? e.contractAddress : null,
    cumulativeGasUsed: e.cumulativeGasUsed ? BigInt(e.cumulativeGasUsed) : null,
    effectiveGasPrice: e.effectiveGasPrice ? BigInt(e.effectiveGasPrice) : null,
    gasUsed: e.gasUsed ? BigInt(e.gasUsed) : null,
    logs: e.logs ? e.logs.map((r) => xt(r)) : null,
    to: e.to ? e.to : null,
    transactionIndex: e.transactionIndex ? Ge(e.transactionIndex) : null,
    status: e.status ? Vd[e.status] : null,
    type: e.type ? qd[e.type] || e.type : null,
  };
  return (
    e.blobGasPrice && (n.blobGasPrice = BigInt(e.blobGasPrice)),
    e.blobGasUsed && (n.blobGasUsed = BigInt(e.blobGasUsed)),
    n
  );
}
function z(e, t, n) {
  const r = e[t.name];
  if (typeof r == "function") return r;
  const s = e[n];
  return typeof s == "function" ? s : (o) => t(e, o);
}
async function Na(e, { address: t, blockTag: n = "latest", blockNumber: r }) {
  const s = await e.request(
    {
      method: "eth_getTransactionCount",
      params: [t, typeof r == "bigint" ? F(r) : n],
    },
    { dedupe: !!r }
  );
  return Ge(s);
}
function Sv(e) {
  const { source: t } = e,
    n = new Map(),
    r = new wr(8192),
    s = new Map(),
    o = ({ address: i, chainId: a }) => `${i}.${a}`;
  return {
    async consume({ address: i, chainId: a, client: c }) {
      const u = o({ address: i, chainId: a }),
        f = this.get({ address: i, chainId: a, client: c });
      this.increment({ address: i, chainId: a });
      const d = await f;
      return await t.set({ address: i, chainId: a }, d), r.set(u, d), d;
    },
    async increment({ address: i, chainId: a }) {
      const c = o({ address: i, chainId: a }),
        u = n.get(c) ?? 0;
      n.set(c, u + 1);
    },
    async get({ address: i, chainId: a, client: c }) {
      const u = o({ address: i, chainId: a });
      let f = s.get(u);
      return (
        f ||
          ((f = (async () => {
            try {
              const l = await t.get({ address: i, chainId: a, client: c }),
                h = r.get(u) ?? 0;
              return h > 0 && l <= h ? h + 1 : (r.delete(u), l);
            } finally {
              this.reset({ address: i, chainId: a });
            }
          })()),
          s.set(u, f)),
        (n.get(u) ?? 0) + (await f)
      );
    },
    reset({ address: i, chainId: a }) {
      const c = o({ address: i, chainId: a });
      n.delete(c), s.delete(c);
    },
  };
}
function Kd(
  e,
  { errorInstance: t = new Error("timed out"), timeout: n, signal: r }
) {
  return new Promise((s, o) => {
    (async () => {
      let i;
      try {
        const a = new AbortController();
        n > 0 &&
          (i = setTimeout(() => {
            r ? a.abort() : o(t);
          }, n)),
          s(await e({ signal: a?.signal || null }));
      } catch (a) {
        a?.name === "AbortError" && o(t), o(a);
      } finally {
        clearTimeout(i);
      }
    })();
  });
}
function Cy() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    },
  };
}
const Xc = Cy();
function Oy(e, t = {}) {
  return {
    async request(n) {
      const {
          body: r,
          fetchFn: s = t.fetchFn ?? fetch,
          onRequest: o = t.onRequest,
          onResponse: i = t.onResponse,
          timeout: a = t.timeout ?? 1e4,
        } = n,
        c = { ...(t.fetchOptions ?? {}), ...(n.fetchOptions ?? {}) },
        { headers: u, method: f, signal: d } = c;
      try {
        const l = await Kd(
          async ({ signal: b }) => {
            const p = {
                ...c,
                body: Array.isArray(r)
                  ? ee(
                      r.map((w) => ({
                        jsonrpc: "2.0",
                        id: w.id ?? Xc.take(),
                        ...w,
                      }))
                    )
                  : ee({ jsonrpc: "2.0", id: r.id ?? Xc.take(), ...r }),
                headers: { "Content-Type": "application/json", ...u },
                method: f || "POST",
                signal: d || (a > 0 ? b : null),
              },
              y = new Request(e, p),
              x = (await o?.(y, p)) ?? { ...p, url: e };
            return await s(x.url ?? e, x);
          },
          { errorInstance: new Lc({ body: r, url: e }), timeout: a, signal: !0 }
        );
        i && (await i(l));
        let h;
        if (l.headers.get("Content-Type")?.startsWith("application/json"))
          h = await l.json();
        else {
          h = await l.text();
          try {
            h = JSON.parse(h || "{}");
          } catch (b) {
            if (l.ok) throw b;
            h = { error: h };
          }
        }
        if (!l.ok)
          throw new yn({
            body: r,
            details: ee(h.error) || l.statusText,
            headers: l.headers,
            status: l.status,
            url: e,
          });
        return h;
      } catch (l) {
        throw l instanceof yn || l instanceof Lc
          ? l
          : new yn({ body: r, cause: l, url: e });
      }
    },
  };
}
const Ty = `Ethereum Signed Message:
`;
function By(e) {
  const t =
      typeof e == "string"
        ? vn(e)
        : typeof e.raw == "string"
        ? e.raw
        : ne(e.raw),
    n = vn(`${Ty}${X(t)}`);
  return Ae([n, t]);
}
function Qd(e, t) {
  return oe(By(e), t);
}
class Ry extends A {
  constructor({ domain: t }) {
    super(`Invalid domain "${ee(t)}".`, {
      metaMessages: ["Must be a valid EIP-712 domain."],
    });
  }
}
class ky extends A {
  constructor({ primaryType: t, types: n }) {
    super(
      `Invalid primary type \`${t}\` must be one of \`${JSON.stringify(
        Object.keys(n)
      )}\`.`,
      {
        docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
        metaMessages: ["Check that the primary type is a key in `types`."],
      }
    );
  }
}
class My extends A {
  constructor({ type: t }) {
    super(`Struct type "${t}" is invalid.`, {
      metaMessages: ["Struct type must not be a Solidity type."],
      name: "InvalidStructTypeError",
    });
  }
}
function _y(e) {
  const { domain: t, message: n, primaryType: r, types: s } = e,
    o = (c, u) => {
      const f = { ...u };
      for (const d of c) {
        const { name: l, type: h } = d;
        h === "address" && (f[l] = f[l].toLowerCase());
      }
      return f;
    },
    i = s.EIP712Domain ? (t ? o(s.EIP712Domain, t) : {}) : {},
    a = (() => {
      if (r !== "EIP712Domain") return o(s[r], n);
    })();
  return ee({ domain: i, message: a, primaryType: r, types: s });
}
function Zd(e) {
  const { domain: t, message: n, primaryType: r, types: s } = e,
    o = (i, a) => {
      for (const c of i) {
        const { name: u, type: f } = c,
          d = a[u],
          l = f.match(ga);
        if (l && (typeof d == "number" || typeof d == "bigint")) {
          const [p, y, x] = l;
          F(d, { signed: y === "int", size: Number.parseInt(x, 10) / 8 });
        }
        if (f === "address" && typeof d == "string" && !Ie(d))
          throw new wt({ address: d });
        const h = f.match(Gf);
        if (h) {
          const [p, y] = h;
          if (y && X(d) !== Number.parseInt(y, 10))
            throw new zf({
              expectedSize: Number.parseInt(y, 10),
              givenSize: X(d),
            });
        }
        const b = s[f];
        b && (Ny(f), o(b, d));
      }
    };
  if (s.EIP712Domain && t) {
    if (typeof t != "object") throw new Ry({ domain: t });
    o(s.EIP712Domain, t);
  }
  if (r !== "EIP712Domain")
    if (s[r]) o(s[r], n);
    else throw new ky({ primaryType: r, types: s });
}
function Yd({ domain: e }) {
  return [
    typeof e?.name == "string" && { name: "name", type: "string" },
    e?.version && { name: "version", type: "string" },
    (typeof e?.chainId == "number" || typeof e?.chainId == "bigint") && {
      name: "chainId",
      type: "uint256",
    },
    e?.verifyingContract && { name: "verifyingContract", type: "address" },
    e?.salt && { name: "salt", type: "bytes32" },
  ].filter(Boolean);
}
function Ny(e) {
  if (
    e === "address" ||
    e === "bool" ||
    e === "string" ||
    e.startsWith("bytes") ||
    e.startsWith("uint") ||
    e.startsWith("int")
  )
    throw new My({ type: e });
}
function Fy(e) {
  const { domain: t = {}, message: n, primaryType: r } = e,
    s = { EIP712Domain: Yd({ domain: t }), ...e.types };
  Zd({ domain: t, message: n, primaryType: r, types: s });
  const o = ["0x1901"];
  return (
    t && o.push(jy({ domain: t, types: s })),
    r !== "EIP712Domain" && o.push(Jd({ data: n, primaryType: r, types: s })),
    oe(Ae(o))
  );
}
function jy({ domain: e, types: t }) {
  return Jd({ data: e, primaryType: "EIP712Domain", types: t });
}
function Jd({ data: e, primaryType: t, types: n }) {
  const r = Xd({ data: e, primaryType: t, types: n });
  return oe(r);
}
function Xd({ data: e, primaryType: t, types: n }) {
  const r = [{ type: "bytes32" }],
    s = [zy({ primaryType: t, types: n })];
  for (const o of n[t]) {
    const [i, a] = tl({
      types: n,
      name: o.name,
      type: o.type,
      value: e[o.name],
    });
    r.push(i), s.push(a);
  }
  return It(r, s);
}
function zy({ primaryType: e, types: t }) {
  const n = vt(Uy({ primaryType: e, types: t }));
  return oe(n);
}
function Uy({ primaryType: e, types: t }) {
  let n = "";
  const r = el({ primaryType: e, types: t });
  r.delete(e);
  const s = [e, ...Array.from(r).sort()];
  for (const o of s)
    n += `${o}(${t[o].map(({ name: i, type: a }) => `${a} ${i}`).join(",")})`;
  return n;
}
function el({ primaryType: e, types: t }, n = new Set()) {
  const s = e.match(/^\w*/u)?.[0];
  if (n.has(s) || t[s] === void 0) return n;
  n.add(s);
  for (const o of t[s]) el({ primaryType: o.type, types: t }, n);
  return n;
}
function tl({ types: e, name: t, type: n, value: r }) {
  if (e[n] !== void 0)
    return [{ type: "bytes32" }, oe(Xd({ data: r, primaryType: n, types: e }))];
  if (n === "bytes")
    return (
      (r = `0x${(r.length % 2 ? "0" : "") + r.slice(2)}`),
      [{ type: "bytes32" }, oe(r)]
    );
  if (n === "string") return [{ type: "bytes32" }, oe(vt(r))];
  if (n.lastIndexOf("]") === n.length - 1) {
    const s = n.slice(0, n.lastIndexOf("[")),
      o = r.map((i) => tl({ name: t, type: s, types: e, value: i }));
    return [
      { type: "bytes32" },
      oe(
        It(
          o.map(([i]) => i),
          o.map(([, i]) => i)
        )
      ),
    ];
  }
  return [{ type: n }, r];
}
const Ly = "0x6492649264926492649264926492649264926492649264926492649264926492",
  Dy = "1.1.1";
let Pe = class $i extends Error {
  constructor(t, n = {}) {
    const r =
        n.cause instanceof $i
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      s = (n.cause instanceof $i && n.cause.docsPath) || n.docsPath,
      o = [
        t || "An error occurred.",
        "",
        ...(n.metaMessages ? [...n.metaMessages, ""] : []),
        ...(s ? [`Docs: https://abitype.dev${s}`] : []),
        ...(r ? [`Details: ${r}`] : []),
        `Version: abitype@${Dy}`,
      ].join(`
`);
    super(o),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiTypeError",
      }),
      n.cause && (this.cause = n.cause),
      (this.details = r),
      (this.docsPath = s),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
};
function At(e, t) {
  return e.exec(t)?.groups;
}
const nl = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  rl =
    /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  sl = /^\(.+?\).*?$/,
  eu = /^tuple(?<array>(\[(\d*)\])*)$/;
function Ii(e) {
  let t = e.type;
  if (eu.test(e.type) && "components" in e) {
    t = "(";
    const n = e.components.length;
    for (let s = 0; s < n; s++) {
      const o = e.components[s];
      (t += Ii(o)), s < n - 1 && (t += ", ");
    }
    const r = At(eu, e.type);
    return (t += `)${r?.array ?? ""}`), Ii({ ...e, type: t });
  }
  return (
    "indexed" in e && e.indexed && (t = `${t} indexed`),
    e.name ? `${t} ${e.name}` : t
  );
}
function qn(e) {
  let t = "";
  const n = e.length;
  for (let r = 0; r < n; r++) {
    const s = e[r];
    (t += Ii(s)), r !== n - 1 && (t += ", ");
  }
  return t;
}
function Ai(e) {
  return e.type === "function"
    ? `function ${e.name}(${qn(e.inputs)})${
        e.stateMutability && e.stateMutability !== "nonpayable"
          ? ` ${e.stateMutability}`
          : ""
      }${e.outputs?.length ? ` returns (${qn(e.outputs)})` : ""}`
    : e.type === "event"
    ? `event ${e.name}(${qn(e.inputs)})`
    : e.type === "error"
    ? `error ${e.name}(${qn(e.inputs)})`
    : e.type === "constructor"
    ? `constructor(${qn(e.inputs)})${
        e.stateMutability === "payable" ? " payable" : ""
      }`
    : e.type === "fallback"
    ? `fallback() external${e.stateMutability === "payable" ? " payable" : ""}`
    : "receive() external payable";
}
const ol = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function qy(e) {
  return ol.test(e);
}
function Hy(e) {
  return At(ol, e);
}
const il = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
function Gy(e) {
  return il.test(e);
}
function Vy(e) {
  return At(il, e);
}
const al =
  /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
function Wy(e) {
  return al.test(e);
}
function Ky(e) {
  return At(al, e);
}
const cl = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
function Fa(e) {
  return cl.test(e);
}
function Qy(e) {
  return At(cl, e);
}
const ul =
  /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
function Zy(e) {
  return ul.test(e);
}
function Yy(e) {
  return At(ul, e);
}
const fl = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
function Jy(e) {
  return fl.test(e);
}
function Xy(e) {
  return At(fl, e);
}
const em = /^receive\(\) external payable$/;
function tm(e) {
  return em.test(e);
}
const tu = new Set(["memory", "indexed", "storage", "calldata"]),
  nm = new Set(["indexed"]),
  Ci = new Set(["calldata", "memory", "storage"]);
class rm extends Pe {
  constructor({ signature: t }) {
    super("Failed to parse ABI item.", {
      details: `parseAbiItem(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human#parseabiitem-1",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiItemError",
      });
  }
}
class sm extends Pe {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [
        `Type "${t}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownTypeError",
      });
  }
}
class om extends Pe {
  constructor({ type: t }) {
    super("Unknown type.", {
      metaMessages: [`Type "${t}" is not a valid ABI type.`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownSolidityTypeError",
      });
  }
}
class im extends Pe {
  constructor({ params: t }) {
    super("Failed to parse ABI parameters.", {
      details: `parseAbiParameters(${JSON.stringify(t, null, 2)})`,
      docsPath: "/api/human#parseabiparameters-1",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiParametersError",
      });
  }
}
class am extends Pe {
  constructor({ param: t }) {
    super("Invalid ABI parameter.", { details: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidParameterError",
      });
  }
}
class cm extends Pe {
  constructor({ param: t, name: n }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `"${n}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SolidityProtectedKeywordError",
      });
  }
}
class um extends Pe {
  constructor({ param: t, type: n, modifier: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidModifierError",
      });
  }
}
class fm extends Pe {
  constructor({ param: t, type: n, modifier: r }) {
    super("Invalid ABI parameter.", {
      details: t,
      metaMessages: [
        `Modifier "${r}" not allowed${n ? ` in "${n}" type` : ""}.`,
        `Data location can only be specified for array, struct, or mapping types, but "${r}" was given.`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidFunctionModifierError",
      });
  }
}
class dm extends Pe {
  constructor({ abiParameter: t }) {
    super("Invalid ABI parameter.", {
      details: JSON.stringify(t, null, 2),
      metaMessages: ["ABI parameter type is invalid."],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidAbiTypeParameterError",
      });
  }
}
class Pr extends Pe {
  constructor({ signature: t, type: n }) {
    super(`Invalid ${n} signature.`, { details: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidSignatureError",
      });
  }
}
class lm extends Pe {
  constructor({ signature: t }) {
    super("Unknown signature.", { details: t }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "UnknownSignatureError",
      });
  }
}
class hm extends Pe {
  constructor({ signature: t }) {
    super("Invalid struct signature.", {
      details: t,
      metaMessages: ["No properties exist."],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidStructSignatureError",
      });
  }
}
class pm extends Pe {
  constructor({ type: t }) {
    super("Circular reference detected.", {
      metaMessages: [`Struct "${t}" is a circular reference.`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "CircularReferenceError",
      });
  }
}
class bm extends Pe {
  constructor({ current: t, depth: n }) {
    super("Unbalanced parentheses.", {
      metaMessages: [
        `"${t.trim()}" has too many ${
          n > 0 ? "opening" : "closing"
        } parentheses.`,
      ],
      details: `Depth "${n}"`,
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "InvalidParenthesisError",
      });
  }
}
function ym(e, t, n) {
  let r = "";
  if (n)
    for (const s of Object.entries(n)) {
      if (!s) continue;
      let o = "";
      for (const i of s[1]) o += `[${i.type}${i.name ? `:${i.name}` : ""}]`;
      r += `(${s[0]}{${o}})`;
    }
  return t ? `${t}:${e}${r}` : e;
}
const Do = new Map([
  ["address", { type: "address" }],
  ["bool", { type: "bool" }],
  ["bytes", { type: "bytes" }],
  ["bytes32", { type: "bytes32" }],
  ["int", { type: "int256" }],
  ["int256", { type: "int256" }],
  ["string", { type: "string" }],
  ["uint", { type: "uint256" }],
  ["uint8", { type: "uint8" }],
  ["uint16", { type: "uint16" }],
  ["uint24", { type: "uint24" }],
  ["uint32", { type: "uint32" }],
  ["uint64", { type: "uint64" }],
  ["uint96", { type: "uint96" }],
  ["uint112", { type: "uint112" }],
  ["uint160", { type: "uint160" }],
  ["uint192", { type: "uint192" }],
  ["uint256", { type: "uint256" }],
  ["address owner", { type: "address", name: "owner" }],
  ["address to", { type: "address", name: "to" }],
  ["bool approved", { type: "bool", name: "approved" }],
  ["bytes _data", { type: "bytes", name: "_data" }],
  ["bytes data", { type: "bytes", name: "data" }],
  ["bytes signature", { type: "bytes", name: "signature" }],
  ["bytes32 hash", { type: "bytes32", name: "hash" }],
  ["bytes32 r", { type: "bytes32", name: "r" }],
  ["bytes32 root", { type: "bytes32", name: "root" }],
  ["bytes32 s", { type: "bytes32", name: "s" }],
  ["string name", { type: "string", name: "name" }],
  ["string symbol", { type: "string", name: "symbol" }],
  ["string tokenURI", { type: "string", name: "tokenURI" }],
  ["uint tokenId", { type: "uint256", name: "tokenId" }],
  ["uint8 v", { type: "uint8", name: "v" }],
  ["uint256 balance", { type: "uint256", name: "balance" }],
  ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
  ["uint256 value", { type: "uint256", name: "value" }],
  [
    "event:address indexed from",
    { type: "address", name: "from", indexed: !0 },
  ],
  ["event:address indexed to", { type: "address", name: "to", indexed: !0 }],
  [
    "event:uint indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
  [
    "event:uint256 indexed tokenId",
    { type: "uint256", name: "tokenId", indexed: !0 },
  ],
]);
function nu(e, t = {}) {
  if (Wy(e)) return mm(e, t);
  if (Gy(e)) return gm(e, t);
  if (qy(e)) return wm(e, t);
  if (Zy(e)) return vm(e, t);
  if (Jy(e)) return xm(e);
  if (tm(e)) return { type: "receive", stateMutability: "payable" };
  throw new lm({ signature: e });
}
function mm(e, t = {}) {
  const n = Ky(e);
  if (!n) throw new Pr({ signature: e, type: "function" });
  const r = Se(n.parameters),
    s = [],
    o = r.length;
  for (let a = 0; a < o; a++)
    s.push(Et(r[a], { modifiers: Ci, structs: t, type: "function" }));
  const i = [];
  if (n.returns) {
    const a = Se(n.returns),
      c = a.length;
    for (let u = 0; u < c; u++)
      i.push(Et(a[u], { modifiers: Ci, structs: t, type: "function" }));
  }
  return {
    name: n.name,
    type: "function",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: s,
    outputs: i,
  };
}
function gm(e, t = {}) {
  const n = Vy(e);
  if (!n) throw new Pr({ signature: e, type: "event" });
  const r = Se(n.parameters),
    s = [],
    o = r.length;
  for (let i = 0; i < o; i++)
    s.push(Et(r[i], { modifiers: nm, structs: t, type: "event" }));
  return { name: n.name, type: "event", inputs: s };
}
function wm(e, t = {}) {
  const n = Hy(e);
  if (!n) throw new Pr({ signature: e, type: "error" });
  const r = Se(n.parameters),
    s = [],
    o = r.length;
  for (let i = 0; i < o; i++) s.push(Et(r[i], { structs: t, type: "error" }));
  return { name: n.name, type: "error", inputs: s };
}
function vm(e, t = {}) {
  const n = Yy(e);
  if (!n) throw new Pr({ signature: e, type: "constructor" });
  const r = Se(n.parameters),
    s = [],
    o = r.length;
  for (let i = 0; i < o; i++)
    s.push(Et(r[i], { structs: t, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: n.stateMutability ?? "nonpayable",
    inputs: s,
  };
}
function xm(e) {
  const t = Xy(e);
  if (!t) throw new Pr({ signature: e, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: t.stateMutability ?? "nonpayable",
  };
}
const Em =
    /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  Pm =
    /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/,
  Sm = /^u?int$/;
function Et(e, t) {
  const n = ym(e, t?.type, t?.structs);
  if (Do.has(n)) return Do.get(n);
  const r = sl.test(e),
    s = At(r ? Pm : Em, e);
  if (!s) throw new am({ param: e });
  if (s.name && Im(s.name)) throw new cm({ param: e, name: s.name });
  const o = s.name ? { name: s.name } : {},
    i = s.modifier === "indexed" ? { indexed: !0 } : {},
    a = t?.structs ?? {};
  let c,
    u = {};
  if (r) {
    c = "tuple";
    const d = Se(s.type),
      l = [],
      h = d.length;
    for (let b = 0; b < h; b++) l.push(Et(d[b], { structs: a }));
    u = { components: l };
  } else if (s.type in a) (c = "tuple"), (u = { components: a[s.type] });
  else if (Sm.test(s.type)) c = `${s.type}256`;
  else if (s.type === "address payable") c = "address";
  else if (((c = s.type), t?.type !== "struct" && !dl(c)))
    throw new om({ type: c });
  if (s.modifier) {
    if (!t?.modifiers?.has?.(s.modifier))
      throw new um({ param: e, type: t?.type, modifier: s.modifier });
    if (Ci.has(s.modifier) && !Am(c, !!s.array))
      throw new fm({ param: e, type: t?.type, modifier: s.modifier });
  }
  const f = { type: `${c}${s.array ?? ""}`, ...o, ...i, ...u };
  return Do.set(n, f), f;
}
function Se(e, t = [], n = "", r = 0) {
  const s = e.trim().length;
  for (let o = 0; o < s; o++) {
    const i = e[o],
      a = e.slice(o + 1);
    switch (i) {
      case ",":
        return r === 0 ? Se(a, [...t, n.trim()]) : Se(a, t, `${n}${i}`, r);
      case "(":
        return Se(a, t, `${n}${i}`, r + 1);
      case ")":
        return Se(a, t, `${n}${i}`, r - 1);
      default:
        return Se(a, t, `${n}${i}`, r);
    }
  }
  if (n === "") return t;
  if (r !== 0) throw new bm({ current: n, depth: r });
  return t.push(n.trim()), t;
}
function dl(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    nl.test(e) ||
    rl.test(e)
  );
}
const $m =
  /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
function Im(e) {
  return (
    e === "address" ||
    e === "bool" ||
    e === "function" ||
    e === "string" ||
    e === "tuple" ||
    nl.test(e) ||
    rl.test(e) ||
    $m.test(e)
  );
}
function Am(e, t) {
  return t || e === "bytes" || e === "string" || e === "tuple";
}
function ll(e) {
  const t = {},
    n = e.length;
  for (let i = 0; i < n; i++) {
    const a = e[i];
    if (!Fa(a)) continue;
    const c = Qy(a);
    if (!c) throw new Pr({ signature: a, type: "struct" });
    const u = c.properties.split(";"),
      f = [],
      d = u.length;
    for (let l = 0; l < d; l++) {
      const b = u[l].trim();
      if (!b) continue;
      const p = Et(b, { type: "struct" });
      f.push(p);
    }
    if (!f.length) throw new hm({ signature: a });
    t[c.name] = f;
  }
  const r = {},
    s = Object.entries(t),
    o = s.length;
  for (let i = 0; i < o; i++) {
    const [a, c] = s[i];
    r[a] = hl(c, t);
  }
  return r;
}
const Cm = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
function hl(e, t, n = new Set()) {
  const r = [],
    s = e.length;
  for (let o = 0; o < s; o++) {
    const i = e[o];
    if (sl.test(i.type)) r.push(i);
    else {
      const c = At(Cm, i.type);
      if (!c?.type) throw new dm({ abiParameter: i });
      const { array: u, type: f } = c;
      if (f in t) {
        if (n.has(f)) throw new pm({ type: f });
        r.push({
          ...i,
          type: `tuple${u ?? ""}`,
          components: hl(t[f] ?? [], t, new Set([...n, f])),
        });
      } else if (dl(f)) r.push(i);
      else throw new sm({ type: f });
    }
  }
  return r;
}
function ru(e) {
  let t;
  if (typeof e == "string") t = nu(e);
  else {
    const n = ll(e),
      r = e.length;
    for (let s = 0; s < r; s++) {
      const o = e[s];
      if (!Fa(o)) {
        t = nu(o, n);
        break;
      }
    }
  }
  if (!t) throw new rm({ signature: e });
  return t;
}
function su(e) {
  const t = [];
  if (typeof e == "string") {
    const n = Se(e),
      r = n.length;
    for (let s = 0; s < r; s++) t.push(Et(n[s], { modifiers: tu }));
  } else {
    const n = ll(e),
      r = e.length;
    for (let s = 0; s < r; s++) {
      const o = e[s];
      if (Fa(o)) continue;
      const i = Se(o),
        a = i.length;
      for (let c = 0; c < a; c++)
        t.push(Et(i[c], { modifiers: tu, structs: n }));
    }
  }
  if (t.length === 0) throw new im({ params: e });
  return t;
}
class Om extends Map {
  constructor(t) {
    super(),
      Object.defineProperty(this, "maxSize", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.maxSize = t);
  }
  get(t) {
    const n = super.get(t);
    return super.has(t) && n !== void 0 && (this.delete(t), super.set(t, n)), n;
  }
  set(t, n) {
    if ((super.set(t, n), this.maxSize && this.size > this.maxSize)) {
      const r = this.keys().next().value;
      r && this.delete(r);
    }
    return this;
  }
}
const Tm = { checksum: new Om(8192) },
  qo = Tm.checksum;
function pl(e, t = {}) {
  const { as: n = typeof e == "string" ? "Hex" : "Bytes" } = t,
    r = ya(_1(e));
  return n === "Bytes" ? r : Ke(r);
}
const Bm = /^0x[a-fA-F0-9]{40}$/;
function yo(e, t = {}) {
  const { strict: n = !0 } = t;
  if (!Bm.test(e)) throw new ou({ address: e, cause: new Rm() });
  if (n) {
    if (e.toLowerCase() === e) return;
    if (bl(e) !== e) throw new ou({ address: e, cause: new km() });
  }
}
function bl(e) {
  if (qo.has(e)) return qo.get(e);
  yo(e, { strict: !1 });
  const t = e.substring(2).toLowerCase(),
    n = pl(F1(t), { as: "Bytes" }),
    r = t.split("");
  for (let o = 0; o < 40; o += 2)
    n[o >> 1] >> 4 >= 8 && r[o] && (r[o] = r[o].toUpperCase()),
      (n[o >> 1] & 15) >= 8 && r[o + 1] && (r[o + 1] = r[o + 1].toUpperCase());
  const s = `0x${r.join("")}`;
  return qo.set(e, s), s;
}
function Oi(e, t = {}) {
  const { strict: n = !0 } = t ?? {};
  try {
    return yo(e, { strict: n }), !0;
  } catch {
    return !1;
  }
}
class ou extends W {
  constructor({ address: t, cause: n }) {
    super(`Address "${t}" is invalid.`, { cause: n }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Address.InvalidAddressError",
      });
  }
}
class Rm extends W {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Address.InvalidInputError",
      });
  }
}
class km extends W {
  constructor() {
    super("Address does not match its checksum counterpart."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Address.InvalidChecksumError",
      });
  }
}
const Mm = /^(.*)\[([0-9]*)\]$/,
  _m = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,
  yl =
    /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/,
  iu = 2n ** 256n - 1n;
function Kn(e, t, n) {
  const { checksumAddress: r, staticPosition: s } = n,
    o = Ua(t.type);
  if (o) {
    const [i, a] = o;
    return Fm(
      e,
      { ...t, type: a },
      { checksumAddress: r, length: i, staticPosition: s }
    );
  }
  if (t.type === "tuple")
    return Lm(e, t, { checksumAddress: r, staticPosition: s });
  if (t.type === "address") return Nm(e, { checksum: r });
  if (t.type === "bool") return jm(e);
  if (t.type.startsWith("bytes")) return zm(e, t, { staticPosition: s });
  if (t.type.startsWith("uint") || t.type.startsWith("int")) return Um(e, t);
  if (t.type === "string") return Dm(e, { staticPosition: s });
  throw new Da(t.type);
}
const au = 32,
  Ti = 32;
function Nm(e, t = {}) {
  const { checksum: n = !1 } = t,
    r = e.readBytes(32);
  return [((o) => (n ? bl(o) : o))(Ke(z1(r, -20))), 32];
}
function Fm(e, t, n) {
  const { checksumAddress: r, length: s, staticPosition: o } = n;
  if (!s) {
    const c = mt(e.readBytes(Ti)),
      u = o + c,
      f = u + au;
    e.setPosition(u);
    const d = mt(e.readBytes(au)),
      l = es(t);
    let h = 0;
    const b = [];
    for (let p = 0; p < d; ++p) {
      e.setPosition(f + (l ? p * 32 : h));
      const [y, x] = Kn(e, t, { checksumAddress: r, staticPosition: f });
      (h += x), b.push(y);
    }
    return e.setPosition(o + 32), [b, 32];
  }
  if (es(t)) {
    const c = mt(e.readBytes(Ti)),
      u = o + c,
      f = [];
    for (let d = 0; d < s; ++d) {
      e.setPosition(u + d * 32);
      const [l] = Kn(e, t, { checksumAddress: r, staticPosition: u });
      f.push(l);
    }
    return e.setPosition(o + 32), [f, 32];
  }
  let i = 0;
  const a = [];
  for (let c = 0; c < s; ++c) {
    const [u, f] = Kn(e, t, { checksumAddress: r, staticPosition: o + i });
    (i += f), a.push(u);
  }
  return [a, i];
}
function jm(e) {
  return [L1(e.readBytes(32), { size: 32 }), 32];
}
function zm(e, t, { staticPosition: n }) {
  const [r, s] = t.type.split("bytes");
  if (!s) {
    const i = mt(e.readBytes(32));
    e.setPosition(n + i);
    const a = mt(e.readBytes(32));
    if (a === 0) return e.setPosition(n + 32), ["0x", 32];
    const c = e.readBytes(a);
    return e.setPosition(n + 32), [Ke(c), 32];
  }
  return [Ke(e.readBytes(Number.parseInt(s, 10), 32)), 32];
}
function Um(e, t) {
  const n = t.type.startsWith("int"),
    r = Number.parseInt(t.type.split("int")[1] || "256", 10),
    s = e.readBytes(32);
  return [r > 48 ? U1(s, { signed: n }) : mt(s, { signed: n }), 32];
}
function Lm(e, t, n) {
  const { checksumAddress: r, staticPosition: s } = n,
    o = t.components.length === 0 || t.components.some(({ name: c }) => !c),
    i = o ? [] : {};
  let a = 0;
  if (es(t)) {
    const c = mt(e.readBytes(Ti)),
      u = s + c;
    for (let f = 0; f < t.components.length; ++f) {
      const d = t.components[f];
      e.setPosition(u + a);
      const [l, h] = Kn(e, d, { checksumAddress: r, staticPosition: u });
      (a += h), (i[o ? f : d?.name] = l);
    }
    return e.setPosition(s + 32), [i, 32];
  }
  for (let c = 0; c < t.components.length; ++c) {
    const u = t.components[c],
      [f, d] = Kn(e, u, { checksumAddress: r, staticPosition: s });
    (i[o ? c : u?.name] = f), (a += d);
  }
  return [i, a];
}
function Dm(e, { staticPosition: t }) {
  const n = mt(e.readBytes(32)),
    r = t + n;
  e.setPosition(r);
  const s = mt(e.readBytes(32));
  if (s === 0) return e.setPosition(t + 32), ["", 32];
  const o = e.readBytes(s, 32),
    i = D1(Sd(o));
  return e.setPosition(t + 32), [i, 32];
}
function qm({ checksumAddress: e, parameters: t, values: n }) {
  const r = [];
  for (let s = 0; s < t.length; s++)
    r.push(ja({ checksumAddress: e, parameter: t[s], value: n[s] }));
  return r;
}
function ja({ checksumAddress: e = !1, parameter: t, value: n }) {
  const r = t,
    s = Ua(r.type);
  if (s) {
    const [o, i] = s;
    return Gm(n, {
      checksumAddress: e,
      length: o,
      parameter: { ...r, type: i },
    });
  }
  if (r.type === "tuple") return Zm(n, { checksumAddress: e, parameter: r });
  if (r.type === "address") return Hm(n, { checksum: e });
  if (r.type === "bool") return Wm(n);
  if (r.type.startsWith("uint") || r.type.startsWith("int")) {
    const o = r.type.startsWith("int"),
      [, , i = "256"] = yl.exec(r.type) ?? [];
    return Km(n, { signed: o, size: Number(i) });
  }
  if (r.type.startsWith("bytes")) return Vm(n, { type: r.type });
  if (r.type === "string") return Qm(n);
  throw new Da(r.type);
}
function za(e) {
  let t = 0;
  for (let o = 0; o < e.length; o++) {
    const { dynamic: i, encoded: a } = e[o];
    i ? (t += 32) : (t += Ce(a));
  }
  const n = [],
    r = [];
  let s = 0;
  for (let o = 0; o < e.length; o++) {
    const { dynamic: i, encoded: a } = e[o];
    i ? (n.push(he(t + s, { size: 32 })), r.push(a), (s += Ce(a))) : n.push(a);
  }
  return We(...n, ...r);
}
function Hm(e, t) {
  const { checksum: n = !1 } = t;
  return yo(e, { strict: n }), { dynamic: !1, encoded: Sn(e.toLowerCase()) };
}
function Gm(e, t) {
  const { checksumAddress: n, length: r, parameter: s } = t,
    o = r === null;
  if (!Array.isArray(e)) throw new og(e);
  if (!o && e.length !== r)
    throw new sg({
      expectedLength: r,
      givenLength: e.length,
      type: `${s.type}[${r}]`,
    });
  let i = !1;
  const a = [];
  for (let c = 0; c < e.length; c++) {
    const u = ja({ checksumAddress: n, parameter: s, value: e[c] });
    u.dynamic && (i = !0), a.push(u);
  }
  if (o || i) {
    const c = za(a);
    if (o) {
      const u = he(a.length, { size: 32 });
      return { dynamic: !0, encoded: a.length > 0 ? We(u, c) : u };
    }
    if (i) return { dynamic: !0, encoded: c };
  }
  return { dynamic: !1, encoded: We(...a.map(({ encoded: c }) => c)) };
}
function Vm(e, { type: t }) {
  const [, n] = t.split("bytes"),
    r = Ce(e);
  if (!n) {
    let s = e;
    return (
      r % 32 !== 0 && (s = $n(s, Math.ceil((e.length - 2) / 2 / 32) * 32)),
      { dynamic: !0, encoded: We(Sn(he(r, { size: 32 })), s) }
    );
  }
  if (r !== Number.parseInt(n, 10))
    throw new gl({ expectedSize: Number.parseInt(n, 10), value: e });
  return { dynamic: !1, encoded: $n(e) };
}
function Wm(e) {
  if (typeof e != "boolean")
    throw new W(
      `Invalid boolean value: "${e}" (type: ${typeof e}). Expected: \`true\` or \`false\`.`
    );
  return { dynamic: !1, encoded: Sn($d(e)) };
}
function Km(e, { signed: t, size: n }) {
  if (typeof n == "number") {
    const r = 2n ** (BigInt(n) - (t ? 1n : 0n)) - 1n,
      s = t ? -r - 1n : 0n;
    if (e > r || e < s)
      throw new Cd({
        max: r.toString(),
        min: s.toString(),
        signed: t,
        size: n / 8,
        value: e.toString(),
      });
  }
  return { dynamic: !1, encoded: he(e, { size: 32, signed: t }) };
}
function Qm(e) {
  const t = Ta(e),
    n = Math.ceil(Ce(t) / 32),
    r = [];
  for (let s = 0; s < n; s++) r.push($n(tt(t, s * 32, (s + 1) * 32)));
  return { dynamic: !0, encoded: We($n(he(Ce(t), { size: 32 })), ...r) };
}
function Zm(e, t) {
  const { checksumAddress: n, parameter: r } = t;
  let s = !1;
  const o = [];
  for (let i = 0; i < r.components.length; i++) {
    const a = r.components[i],
      c = Array.isArray(e) ? i : a.name,
      u = ja({ checksumAddress: n, parameter: a, value: e[c] });
    o.push(u), u.dynamic && (s = !0);
  }
  return {
    dynamic: s,
    encoded: s ? za(o) : We(...o.map(({ encoded: i }) => i)),
  };
}
function Ua(e) {
  const t = e.match(/^(.*)\[(\d+)?\]$/);
  return t ? [t[2] ? Number(t[2]) : null, t[1]] : void 0;
}
function es(e) {
  const { type: t } = e;
  if (t === "string" || t === "bytes" || t.endsWith("[]")) return !0;
  if (t === "tuple") return e.components?.some(es);
  const n = Ua(e.type);
  return !!(n && es({ ...e, type: n[1] }));
}
const Ym = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new eg({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit,
      });
  },
  assertPosition(e) {
    if (e < 0 || e > this.bytes.length - 1)
      throw new Xm({ length: this.bytes.length, position: e });
  },
  decrementPosition(e) {
    if (e < 0) throw new cu({ offset: e });
    const t = this.position - e;
    this.assertPosition(t), (this.position = t);
  },
  getReadCount(e) {
    return this.positionReadCount.get(e || this.position) || 0;
  },
  incrementPosition(e) {
    if (e < 0) throw new cu({ offset: e });
    const t = this.position + e;
    this.assertPosition(t), (this.position = t);
  },
  inspectByte(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectBytes(e, t) {
    const n = t ?? this.position;
    return this.assertPosition(n + e - 1), this.bytes.subarray(n, n + e);
  },
  inspectUint8(e) {
    const t = e ?? this.position;
    return this.assertPosition(t), this.bytes[t];
  },
  inspectUint16(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 1), this.dataView.getUint16(t);
  },
  inspectUint24(e) {
    const t = e ?? this.position;
    return (
      this.assertPosition(t + 2),
      (this.dataView.getUint16(t) << 8) + this.dataView.getUint8(t + 2)
    );
  },
  inspectUint32(e) {
    const t = e ?? this.position;
    return this.assertPosition(t + 3), this.dataView.getUint32(t);
  },
  pushByte(e) {
    this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++;
  },
  pushBytes(e) {
    this.assertPosition(this.position + e.length - 1),
      this.bytes.set(e, this.position),
      (this.position += e.length);
  },
  pushUint8(e) {
    this.assertPosition(this.position),
      (this.bytes[this.position] = e),
      this.position++;
  },
  pushUint16(e) {
    this.assertPosition(this.position + 1),
      this.dataView.setUint16(this.position, e),
      (this.position += 2);
  },
  pushUint24(e) {
    this.assertPosition(this.position + 2),
      this.dataView.setUint16(this.position, e >> 8),
      this.dataView.setUint8(this.position + 2, e & 255),
      (this.position += 3);
  },
  pushUint32(e) {
    this.assertPosition(this.position + 3),
      this.dataView.setUint32(this.position, e),
      (this.position += 4);
  },
  readByte() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectByte();
    return this.position++, e;
  },
  readBytes(e, t) {
    this.assertReadLimit(), this._touch();
    const n = this.inspectBytes(e);
    return (this.position += t ?? e), n;
  },
  readUint8() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint8();
    return (this.position += 1), e;
  },
  readUint16() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint16();
    return (this.position += 2), e;
  },
  readUint24() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint24();
    return (this.position += 3), e;
  },
  readUint32() {
    this.assertReadLimit(), this._touch();
    const e = this.inspectUint32();
    return (this.position += 4), e;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(e) {
    const t = this.position;
    return (
      this.assertPosition(e), (this.position = e), () => (this.position = t)
    );
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY) return;
    const e = this.getReadCount();
    this.positionReadCount.set(this.position, e + 1),
      e > 0 && this.recursiveReadCount++;
  },
};
function Jm(e, { recursiveReadLimit: t = 8192 } = {}) {
  const n = Object.create(Ym);
  return (
    (n.bytes = e),
    (n.dataView = new DataView(e.buffer, e.byteOffset, e.byteLength)),
    (n.positionReadCount = new Map()),
    (n.recursiveReadLimit = t),
    n
  );
}
class cu extends W {
  constructor({ offset: t }) {
    super(`Offset \`${t}\` cannot be negative.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Cursor.NegativeOffsetError",
      });
  }
}
class Xm extends W {
  constructor({ length: t, position: n }) {
    super(`Position \`${n}\` is out of bounds (\`0 < position < ${t}\`).`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Cursor.PositionOutOfBoundsError",
      });
  }
}
class eg extends W {
  constructor({ count: t, limit: n }) {
    super(
      `Recursive read limit of \`${n}\` exceeded (recursive read count: \`${t}\`).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Cursor.RecursiveReadLimitExceededError",
      });
  }
}
function tg(e, t, n = {}) {
  const { as: r = "Array", checksumAddress: s = !1 } = n,
    o = typeof t == "string" ? Pd(t) : t,
    i = Jm(o);
  if (Hn(o) === 0 && e.length > 0) throw new rg();
  if (Hn(o) && Hn(o) < 32)
    throw new ng({
      data: typeof t == "string" ? t : Ke(t),
      parameters: e,
      size: Hn(o),
    });
  let a = 0;
  const c = r === "Array" ? [] : {};
  for (let u = 0; u < e.length; ++u) {
    const f = e[u];
    i.setPosition(a);
    const [d, l] = Kn(i, f, { checksumAddress: s, staticPosition: 0 });
    (a += l), r === "Array" ? c.push(d) : (c[f.name ?? u] = d);
  }
  return c;
}
function La(e, t, n) {
  const { checksumAddress: r = !1 } = {};
  if (e.length !== t.length)
    throw new wl({ expectedLength: e.length, givenLength: t.length });
  const s = qm({ checksumAddress: r, parameters: e, values: t }),
    o = za(s);
  return o.length === 0 ? "0x" : o;
}
function Bi(e, t) {
  if (e.length !== t.length)
    throw new wl({ expectedLength: e.length, givenLength: t.length });
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const s = e[r],
      o = t[r];
    n.push(Bi.encode(s, o));
  }
  return We(...n);
}
(function (e) {
  function t(n, r, s = !1) {
    if (n === "address") {
      const c = r;
      return yo(c), Sn(c.toLowerCase(), s ? 32 : 0);
    }
    if (n === "string") return Ta(r);
    if (n === "bytes") return r;
    if (n === "bool") return Sn($d(r), s ? 32 : 1);
    const o = n.match(yl);
    if (o) {
      const [c, u, f = "256"] = o,
        d = Number.parseInt(f, 10) / 8;
      return he(r, { size: s ? 32 : d, signed: u === "int" });
    }
    const i = n.match(_m);
    if (i) {
      const [c, u] = i;
      if (Number.parseInt(u, 10) !== (r.length - 2) / 2)
        throw new gl({ expectedSize: Number.parseInt(u, 10), value: r });
      return $n(r, s ? 32 : 0);
    }
    const a = n.match(Mm);
    if (a && Array.isArray(r)) {
      const [c, u] = a,
        f = [];
      for (let d = 0; d < r.length; d++) f.push(t(u, r[d], !0));
      return f.length === 0 ? "0x" : We(...f);
    }
    throw new Da(n);
  }
  e.encode = t;
})(Bi || (Bi = {}));
function ml(e) {
  return (Array.isArray(e) && typeof e[0] == "string") || typeof e == "string"
    ? su(e)
    : e;
}
class ng extends W {
  constructor({ data: t, parameters: n, size: r }) {
    super(`Data size of ${r} bytes is too small for given parameters.`, {
      metaMessages: [`Params: (${qn(n)})`, `Data:   ${t} (${r} bytes)`],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.DataSizeTooSmallError",
      });
  }
}
class rg extends W {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.'),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.ZeroDataError",
      });
  }
}
class sg extends W {
  constructor({ expectedLength: t, givenLength: n, type: r }) {
    super(
      `Array length mismatch for type \`${r}\`. Expected: \`${t}\`. Given: \`${n}\`.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.ArrayLengthMismatchError",
      });
  }
}
class gl extends W {
  constructor({ expectedSize: t, value: n }) {
    super(
      `Size of bytes "${n}" (bytes${Ce(
        n
      )}) does not match expected size (bytes${t}).`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.BytesSizeMismatchError",
      });
  }
}
class wl extends W {
  constructor({ expectedLength: t, givenLength: n }) {
    super(
      [
        "ABI encoding parameters/values length mismatch.",
        `Expected length (parameters): ${t}`,
        `Given length (values): ${n}`,
      ].join(`
`)
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.LengthMismatchError",
      });
  }
}
class og extends W {
  constructor(t) {
    super(`Value \`${t}\` is not a valid array.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.InvalidArrayError",
      });
  }
}
class Da extends W {
  constructor(t) {
    super(`Type \`${t}\` is not a valid ABI Type.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiParameters.InvalidTypeError",
      });
  }
}
class vl extends ba {
  constructor(t, n) {
    super(), (this.finished = !1), (this.destroyed = !1), vp(t);
    const r = cs(n);
    if (((this.iHash = t.create()), typeof this.iHash.update != "function"))
      throw new Error("Expected instance of class which extends utils.Hash");
    (this.blockLen = this.iHash.blockLen),
      (this.outputLen = this.iHash.outputLen);
    const s = this.blockLen,
      o = new Uint8Array(s);
    o.set(r.length > s ? t.create().update(r).digest() : r);
    for (let i = 0; i < o.length; i++) o[i] ^= 54;
    this.iHash.update(o), (this.oHash = t.create());
    for (let i = 0; i < o.length; i++) o[i] ^= 106;
    this.oHash.update(o), Qt(o);
  }
  update(t) {
    return ar(this), this.iHash.update(t), this;
  }
  digestInto(t) {
    ar(this),
      Kt(t, this.outputLen),
      (this.finished = !0),
      this.iHash.digestInto(t),
      this.oHash.update(t),
      this.oHash.digestInto(t),
      this.destroy();
  }
  digest() {
    const t = new Uint8Array(this.oHash.outputLen);
    return this.digestInto(t), t;
  }
  _cloneInto(t) {
    t || (t = Object.create(Object.getPrototypeOf(this), {}));
    const {
      oHash: n,
      iHash: r,
      finished: s,
      destroyed: o,
      blockLen: i,
      outputLen: a,
    } = this;
    return (
      (t = t),
      (t.finished = s),
      (t.destroyed = o),
      (t.blockLen = i),
      (t.outputLen = a),
      (t.oHash = n._cloneInto(t.oHash)),
      (t.iHash = r._cloneInto(t.iHash)),
      t
    );
  }
  clone() {
    return this._cloneInto();
  }
  destroy() {
    (this.destroyed = !0), this.oHash.destroy(), this.iHash.destroy();
  }
}
const xl = (e, t, n) => new vl(e, t).update(n).digest();
xl.create = (e, t) => new vl(e, t);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ve =
    BigInt(0),
  pe = BigInt(1),
  rn = BigInt(2),
  ig = BigInt(3),
  El = BigInt(4),
  Pl = BigInt(5),
  Sl = BigInt(8);
function we(e, t) {
  const n = e % t;
  return n >= ve ? n : t + n;
}
function Re(e, t, n) {
  let r = e;
  for (; t-- > ve; ) (r *= r), (r %= n);
  return r;
}
function Ri(e, t) {
  if (e === ve) throw new Error("invert: expected non-zero number");
  if (t <= ve) throw new Error("invert: expected positive modulus, got " + t);
  let n = we(e, t),
    r = t,
    s = ve,
    o = pe;
  for (; n !== ve; ) {
    const a = r / n,
      c = r % n,
      u = s - o * a;
    (r = n), (n = c), (s = o), (o = u);
  }
  if (r !== pe) throw new Error("invert: does not exist");
  return we(s, t);
}
function $l(e, t) {
  const n = (e.ORDER + pe) / El,
    r = e.pow(t, n);
  if (!e.eql(e.sqr(r), t)) throw new Error("Cannot find square root");
  return r;
}
function ag(e, t) {
  const n = (e.ORDER - Pl) / Sl,
    r = e.mul(t, rn),
    s = e.pow(r, n),
    o = e.mul(t, s),
    i = e.mul(e.mul(o, rn), s),
    a = e.mul(o, e.sub(i, e.ONE));
  if (!e.eql(e.sqr(a), t)) throw new Error("Cannot find square root");
  return a;
}
function cg(e) {
  if (e < BigInt(3)) throw new Error("sqrt is not defined for small field");
  let t = e - pe,
    n = 0;
  for (; t % rn === ve; ) (t /= rn), n++;
  let r = rn;
  const s = qa(e);
  for (; uu(s, r) === 1; )
    if (r++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  if (n === 1) return $l;
  let o = s.pow(r, t);
  const i = (t + pe) / rn;
  return function (c, u) {
    if (c.is0(u)) return u;
    if (uu(c, u) !== 1) throw new Error("Cannot find square root");
    let f = n,
      d = c.mul(c.ONE, o),
      l = c.pow(u, t),
      h = c.pow(u, i);
    for (; !c.eql(l, c.ONE); ) {
      if (c.is0(l)) return c.ZERO;
      let b = 1,
        p = c.sqr(l);
      for (; !c.eql(p, c.ONE); )
        if ((b++, (p = c.sqr(p)), b === f))
          throw new Error("Cannot find square root");
      const y = pe << BigInt(f - b - 1),
        x = c.pow(d, y);
      (f = b), (d = c.sqr(x)), (l = c.mul(l, d)), (h = c.mul(h, x));
    }
    return h;
  };
}
function ug(e) {
  return e % El === ig ? $l : e % Sl === Pl ? ag : cg(e);
}
const fg = [
  "create",
  "isValid",
  "is0",
  "neg",
  "inv",
  "sqrt",
  "sqr",
  "eql",
  "add",
  "sub",
  "mul",
  "pow",
  "div",
  "addN",
  "subN",
  "mulN",
  "sqrN",
];
function dg(e) {
  const t = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "isSafeInteger",
      BITS: "isSafeInteger",
    },
    n = fg.reduce((r, s) => ((r[s] = "function"), r), t);
  return lo(e, n);
}
function lg(e, t, n) {
  if (n < ve) throw new Error("invalid exponent, negatives unsupported");
  if (n === ve) return e.ONE;
  if (n === pe) return t;
  let r = e.ONE,
    s = t;
  for (; n > ve; ) n & pe && (r = e.mul(r, s)), (s = e.sqr(s)), (n >>= pe);
  return r;
}
function Il(e, t, n = !1) {
  const r = new Array(t.length).fill(n ? e.ZERO : void 0),
    s = t.reduce(
      (i, a, c) => (e.is0(a) ? i : ((r[c] = i), e.mul(i, a))),
      e.ONE
    ),
    o = e.inv(s);
  return (
    t.reduceRight(
      (i, a, c) => (e.is0(a) ? i : ((r[c] = e.mul(i, r[c])), e.mul(i, a))),
      o
    ),
    r
  );
}
function uu(e, t) {
  const n = (e.ORDER - pe) / rn,
    r = e.pow(t, n),
    s = e.eql(r, e.ONE),
    o = e.eql(r, e.ZERO),
    i = e.eql(r, e.neg(e.ONE));
  if (!s && !o && !i) throw new Error("invalid Legendre symbol result");
  return s ? 1 : o ? 0 : -1;
}
function Al(e, t) {
  t !== void 0 && kr(t);
  const n = t !== void 0 ? t : e.toString(2).length,
    r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function qa(e, t, n = !1, r = {}) {
  if (e <= ve) throw new Error("invalid field: expected ORDER > 0, got " + e);
  const { nBitLength: s, nByteLength: o } = Al(e, t);
  if (o > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let i;
  const a = Object.freeze({
    ORDER: e,
    isLE: n,
    BITS: s,
    BYTES: o,
    MASK: fo(s),
    ZERO: ve,
    ONE: pe,
    create: (c) => we(c, e),
    isValid: (c) => {
      if (typeof c != "bigint")
        throw new Error(
          "invalid field element: expected bigint, got " + typeof c
        );
      return ve <= c && c < e;
    },
    is0: (c) => c === ve,
    isOdd: (c) => (c & pe) === pe,
    neg: (c) => we(-c, e),
    eql: (c, u) => c === u,
    sqr: (c) => we(c * c, e),
    add: (c, u) => we(c + u, e),
    sub: (c, u) => we(c - u, e),
    mul: (c, u) => we(c * u, e),
    pow: (c, u) => lg(a, c, u),
    div: (c, u) => we(c * Ri(u, e), e),
    sqrN: (c) => c * c,
    addN: (c, u) => c + u,
    subN: (c, u) => c - u,
    mulN: (c, u) => c * u,
    inv: (c) => Ri(c, e),
    sqrt: r.sqrt || ((c) => (i || (i = ug(e)), i(a, c))),
    toBytes: (c) => (n ? gd(c, o) : ws(c, o)),
    fromBytes: (c) => {
      if (c.length !== o)
        throw new Error(
          "Field.fromBytes: expected " + o + " bytes, got " + c.length
        );
      return n ? md(c) : mn(c);
    },
    invertBatch: (c) => Il(a, c),
    cmov: (c, u, f) => (f ? u : c),
  });
  return Object.freeze(a);
}
function Cl(e) {
  if (typeof e != "bigint") throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function Ol(e) {
  const t = Cl(e);
  return t + Math.ceil(t / 2);
}
function hg(e, t, n = !1) {
  const r = e.length,
    s = Cl(t),
    o = Ol(t);
  if (r < 16 || r < o || r > 1024)
    throw new Error("expected " + o + "-1024 bytes of input, got " + r);
  const i = n ? md(e) : mn(e),
    a = we(i, t - pe) + pe;
  return n ? gd(a, s) : ws(a, s);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const fu =
    BigInt(0),
  ki = BigInt(1);
function Ho(e, t) {
  const n = t.negate();
  return e ? n : t;
}
function Tl(e, t) {
  if (!Number.isSafeInteger(e) || e <= 0 || e > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function Go(e, t) {
  Tl(e, t);
  const n = Math.ceil(t / e) + 1,
    r = 2 ** (e - 1),
    s = 2 ** e,
    o = fo(e),
    i = BigInt(e);
  return { windows: n, windowSize: r, mask: o, maxNumber: s, shiftBy: i };
}
function du(e, t, n) {
  const { windowSize: r, mask: s, maxNumber: o, shiftBy: i } = n;
  let a = Number(e & s),
    c = e >> i;
  a > r && ((a -= o), (c += ki));
  const u = t * r,
    f = u + Math.abs(a) - 1,
    d = a === 0,
    l = a < 0,
    h = t % 2 !== 0;
  return { nextN: c, offset: f, isZero: d, isNeg: l, isNegF: h, offsetF: u };
}
function pg(e, t) {
  if (!Array.isArray(e)) throw new Error("array expected");
  e.forEach((n, r) => {
    if (!(n instanceof t)) throw new Error("invalid point at index " + r);
  });
}
function bg(e, t) {
  if (!Array.isArray(e)) throw new Error("array of scalars expected");
  e.forEach((n, r) => {
    if (!t.isValid(n)) throw new Error("invalid scalar at index " + r);
  });
}
const Vo = new WeakMap(),
  Bl = new WeakMap();
function Wo(e) {
  return Bl.get(e) || 1;
}
function yg(e, t) {
  return {
    constTimeNegate: Ho,
    hasPrecomputes(n) {
      return Wo(n) !== 1;
    },
    unsafeLadder(n, r, s = e.ZERO) {
      let o = n;
      for (; r > fu; ) r & ki && (s = s.add(o)), (o = o.double()), (r >>= ki);
      return s;
    },
    precomputeWindow(n, r) {
      const { windows: s, windowSize: o } = Go(r, t),
        i = [];
      let a = n,
        c = a;
      for (let u = 0; u < s; u++) {
        (c = a), i.push(c);
        for (let f = 1; f < o; f++) (c = c.add(a)), i.push(c);
        a = c.double();
      }
      return i;
    },
    wNAF(n, r, s) {
      let o = e.ZERO,
        i = e.BASE;
      const a = Go(n, t);
      for (let c = 0; c < a.windows; c++) {
        const {
          nextN: u,
          offset: f,
          isZero: d,
          isNeg: l,
          isNegF: h,
          offsetF: b,
        } = du(s, c, a);
        (s = u), d ? (i = i.add(Ho(h, r[b]))) : (o = o.add(Ho(l, r[f])));
      }
      return { p: o, f: i };
    },
    wNAFUnsafe(n, r, s, o = e.ZERO) {
      const i = Go(n, t);
      for (let a = 0; a < i.windows && s !== fu; a++) {
        const { nextN: c, offset: u, isZero: f, isNeg: d } = du(s, a, i);
        if (((s = c), !f)) {
          const l = r[u];
          o = o.add(d ? l.negate() : l);
        }
      }
      return o;
    },
    getPrecomputes(n, r, s) {
      let o = Vo.get(r);
      return (
        o || ((o = this.precomputeWindow(r, n)), n !== 1 && Vo.set(r, s(o))), o
      );
    },
    wNAFCached(n, r, s) {
      const o = Wo(n);
      return this.wNAF(o, this.getPrecomputes(o, n, s), r);
    },
    wNAFCachedUnsafe(n, r, s, o) {
      const i = Wo(n);
      return i === 1
        ? this.unsafeLadder(n, r, o)
        : this.wNAFUnsafe(i, this.getPrecomputes(i, n, s), r, o);
    },
    setWindowSize(n, r) {
      Tl(r, t), Bl.set(n, r), Vo.delete(n);
    },
  };
}
function mg(e, t, n, r) {
  pg(n, e), bg(r, t);
  const s = n.length,
    o = r.length;
  if (s !== o)
    throw new Error("arrays of points and scalars must have equal length");
  const i = e.ZERO,
    a = S1(BigInt(s));
  let c = 1;
  a > 12 ? (c = a - 3) : a > 4 ? (c = a - 2) : a > 0 && (c = 2);
  const u = fo(c),
    f = new Array(Number(u) + 1).fill(i),
    d = Math.floor((t.BITS - 1) / c) * c;
  let l = i;
  for (let h = d; h >= 0; h -= c) {
    f.fill(i);
    for (let p = 0; p < o; p++) {
      const y = r[p],
        x = Number((y >> BigInt(h)) & u);
      f[x] = f[x].add(n[p]);
    }
    let b = i;
    for (let p = f.length - 1, y = i; p > 0; p--)
      (y = y.add(f[p])), (b = b.add(y));
    if (((l = l.add(b)), h !== 0)) for (let p = 0; p < c; p++) l = l.double();
  }
  return l;
}
function Rl(e) {
  return (
    dg(e.Fp),
    lo(
      e,
      { n: "bigint", h: "bigint", Gx: "field", Gy: "field" },
      { nBitLength: "isSafeInteger", nByteLength: "isSafeInteger" }
    ),
    Object.freeze({ ...Al(e.n, e.nBitLength), ...e, p: e.Fp.ORDER })
  );
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function lu(
  e
) {
  e.lowS !== void 0 && Jr("lowS", e.lowS),
    e.prehash !== void 0 && Jr("prehash", e.prehash);
}
function gg(e) {
  const t = Rl(e);
  lo(
    t,
    { a: "field", b: "field" },
    {
      allowInfinityPoint: "boolean",
      allowedPrivateKeyLengths: "array",
      clearCofactor: "function",
      fromBytes: "function",
      isTorsionFree: "function",
      toBytes: "function",
      wrapPrivateKey: "boolean",
    }
  );
  const { endo: n, Fp: r, a: s } = t;
  if (n) {
    if (!r.eql(s, r.ZERO)) throw new Error("invalid endo: CURVE.a must be 0");
    if (
      typeof n != "object" ||
      typeof n.beta != "bigint" ||
      typeof n.splitScalar != "function"
    )
      throw new Error(
        'invalid endo: expected "beta": bigint and "splitScalar": function'
      );
  }
  return Object.freeze({ ...t });
}
class wg extends Error {
  constructor(t = "") {
    super(t);
  }
}
const ct = {
  Err: wg,
  _tlv: {
    encode: (e, t) => {
      const { Err: n } = ct;
      if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
      if (t.length & 1) throw new n("tlv.encode: unpadded data");
      const r = t.length / 2,
        s = Rs(r);
      if ((s.length / 2) & 128)
        throw new n("tlv.encode: long form length too big");
      const o = r > 127 ? Rs((s.length / 2) | 128) : "";
      return Rs(e) + o + s + t;
    },
    decode(e, t) {
      const { Err: n } = ct;
      let r = 0;
      if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
      if (t.length < 2 || t[r++] !== e) throw new n("tlv.decode: wrong tlv");
      const s = t[r++],
        o = !!(s & 128);
      let i = 0;
      if (!o) i = s;
      else {
        const c = s & 127;
        if (!c)
          throw new n("tlv.decode(long): indefinite length not supported");
        if (c > 4) throw new n("tlv.decode(long): byte length is too big");
        const u = t.subarray(r, r + c);
        if (u.length !== c)
          throw new n("tlv.decode: length bytes not complete");
        if (u[0] === 0) throw new n("tlv.decode(long): zero leftmost byte");
        for (const f of u) i = (i << 8) | f;
        if (((r += c), i < 128))
          throw new n("tlv.decode(long): not minimal encoding");
      }
      const a = t.subarray(r, r + i);
      if (a.length !== i) throw new n("tlv.decode: wrong value length");
      return { v: a, l: t.subarray(r + i) };
    },
  },
  _int: {
    encode(e) {
      const { Err: t } = ct;
      if (e < ht) throw new t("integer: negative integers are not allowed");
      let n = Rs(e);
      if ((Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1))
        throw new t("unexpected DER parsing assertion: unpadded hex");
      return n;
    },
    decode(e) {
      const { Err: t } = ct;
      if (e[0] & 128) throw new t("invalid signature integer: negative");
      if (e[0] === 0 && !(e[1] & 128))
        throw new t("invalid signature integer: unnecessary leading zero");
      return mn(e);
    },
  },
  toSig(e) {
    const { Err: t, _int: n, _tlv: r } = ct,
      s = ke("signature", e),
      { v: o, l: i } = r.decode(48, s);
    if (i.length) throw new t("invalid signature: left bytes after parsing");
    const { v: a, l: c } = r.decode(2, o),
      { v: u, l: f } = r.decode(2, c);
    if (f.length) throw new t("invalid signature: left bytes after parsing");
    return { r: n.decode(a), s: n.decode(u) };
  },
  hexFromSig(e) {
    const { _tlv: t, _int: n } = ct,
      r = t.encode(2, n.encode(e.r)),
      s = t.encode(2, n.encode(e.s)),
      o = r + s;
    return t.encode(48, o);
  },
};
function Ko(e, t) {
  return Xr(ws(e, t));
}
const ht = BigInt(0),
  se = BigInt(1);
BigInt(2);
const Qo = BigInt(3),
  vg = BigInt(4);
function xg(e) {
  const t = gg(e),
    { Fp: n } = t,
    r = qa(t.n, t.nBitLength),
    s =
      t.toBytes ||
      ((w, v, m) => {
        const P = v.toAffine();
        return Zs(Uint8Array.from([4]), n.toBytes(P.x), n.toBytes(P.y));
      }),
    o =
      t.fromBytes ||
      ((w) => {
        const v = w.subarray(1),
          m = n.fromBytes(v.subarray(0, n.BYTES)),
          P = n.fromBytes(v.subarray(n.BYTES, 2 * n.BYTES));
        return { x: m, y: P };
      });
  function i(w) {
    const { a: v, b: m } = t,
      P = n.sqr(w),
      E = n.mul(P, w);
    return n.add(n.add(E, n.mul(w, v)), m);
  }
  function a(w, v) {
    const m = n.sqr(v),
      P = i(w);
    return n.eql(m, P);
  }
  if (!a(t.Gx, t.Gy)) throw new Error("bad curve params: generator point");
  const c = n.mul(n.pow(t.a, Qo), vg),
    u = n.mul(n.sqr(t.b), BigInt(27));
  if (n.is0(n.add(c, u))) throw new Error("bad curve params: a or b");
  function f(w) {
    return Oa(w, se, t.n);
  }
  function d(w) {
    const {
      allowedPrivateKeyLengths: v,
      nByteLength: m,
      wrapPrivateKey: P,
      n: E,
    } = t;
    if (v && typeof w != "bigint") {
      if ((gs(w) && (w = Xr(w)), typeof w != "string" || !v.includes(w.length)))
        throw new Error("invalid private key");
      w = w.padStart(m * 2, "0");
    }
    let $;
    try {
      $ = typeof w == "bigint" ? w : mn(ke("private key", w, m));
    } catch {
      throw new Error(
        "invalid private key, expected hex or " + m + " bytes, got " + typeof w
      );
    }
    return P && ($ = we($, E)), Wn("private key", $, se, E), $;
  }
  function l(w) {
    if (!(w instanceof p)) throw new Error("ProjectivePoint expected");
  }
  const h = Hc((w, v) => {
      const { px: m, py: P, pz: E } = w;
      if (n.eql(E, n.ONE)) return { x: m, y: P };
      const $ = w.is0();
      v == null && (v = $ ? n.ONE : n.inv(E));
      const I = n.mul(m, v),
        C = n.mul(P, v),
        O = n.mul(E, v);
      if ($) return { x: n.ZERO, y: n.ZERO };
      if (!n.eql(O, n.ONE)) throw new Error("invZ was invalid");
      return { x: I, y: C };
    }),
    b = Hc((w) => {
      if (w.is0()) {
        if (t.allowInfinityPoint && !n.is0(w.py)) return;
        throw new Error("bad point: ZERO");
      }
      const { x: v, y: m } = w.toAffine();
      if (!n.isValid(v) || !n.isValid(m))
        throw new Error("bad point: x or y not FE");
      if (!a(v, m)) throw new Error("bad point: equation left != right");
      if (!w.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return !0;
    });
  class p {
    constructor(v, m, P) {
      if (v == null || !n.isValid(v)) throw new Error("x required");
      if (m == null || !n.isValid(m) || n.is0(m)) throw new Error("y required");
      if (P == null || !n.isValid(P)) throw new Error("z required");
      (this.px = v), (this.py = m), (this.pz = P), Object.freeze(this);
    }
    static fromAffine(v) {
      const { x: m, y: P } = v || {};
      if (!v || !n.isValid(m) || !n.isValid(P))
        throw new Error("invalid affine point");
      if (v instanceof p) throw new Error("projective point not allowed");
      const E = ($) => n.eql($, n.ZERO);
      return E(m) && E(P) ? p.ZERO : new p(m, P, n.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    static normalizeZ(v) {
      const m = Il(
        n,
        v.map((P) => P.pz)
      );
      return v.map((P, E) => P.toAffine(m[E])).map(p.fromAffine);
    }
    static fromHex(v) {
      const m = p.fromAffine(o(ke("pointHex", v)));
      return m.assertValidity(), m;
    }
    static fromPrivateKey(v) {
      return p.BASE.multiply(d(v));
    }
    static msm(v, m) {
      return mg(p, r, v, m);
    }
    _setWindowSize(v) {
      S.setWindowSize(this, v);
    }
    assertValidity() {
      b(this);
    }
    hasEvenY() {
      const { y: v } = this.toAffine();
      if (n.isOdd) return !n.isOdd(v);
      throw new Error("Field doesn't support isOdd");
    }
    equals(v) {
      l(v);
      const { px: m, py: P, pz: E } = this,
        { px: $, py: I, pz: C } = v,
        O = n.eql(n.mul(m, C), n.mul($, E)),
        R = n.eql(n.mul(P, C), n.mul(I, E));
      return O && R;
    }
    negate() {
      return new p(this.px, n.neg(this.py), this.pz);
    }
    double() {
      const { a: v, b: m } = t,
        P = n.mul(m, Qo),
        { px: E, py: $, pz: I } = this;
      let C = n.ZERO,
        O = n.ZERO,
        R = n.ZERO,
        M = n.mul(E, E),
        D = n.mul($, $),
        T = n.mul(I, I),
        B = n.mul(E, $);
      return (
        (B = n.add(B, B)),
        (R = n.mul(E, I)),
        (R = n.add(R, R)),
        (C = n.mul(v, R)),
        (O = n.mul(P, T)),
        (O = n.add(C, O)),
        (C = n.sub(D, O)),
        (O = n.add(D, O)),
        (O = n.mul(C, O)),
        (C = n.mul(B, C)),
        (R = n.mul(P, R)),
        (T = n.mul(v, T)),
        (B = n.sub(M, T)),
        (B = n.mul(v, B)),
        (B = n.add(B, R)),
        (R = n.add(M, M)),
        (M = n.add(R, M)),
        (M = n.add(M, T)),
        (M = n.mul(M, B)),
        (O = n.add(O, M)),
        (T = n.mul($, I)),
        (T = n.add(T, T)),
        (M = n.mul(T, B)),
        (C = n.sub(C, M)),
        (R = n.mul(T, D)),
        (R = n.add(R, R)),
        (R = n.add(R, R)),
        new p(C, O, R)
      );
    }
    add(v) {
      l(v);
      const { px: m, py: P, pz: E } = this,
        { px: $, py: I, pz: C } = v;
      let O = n.ZERO,
        R = n.ZERO,
        M = n.ZERO;
      const D = t.a,
        T = n.mul(t.b, Qo);
      let B = n.mul(m, $),
        N = n.mul(P, I),
        k = n.mul(E, C),
        j = n.add(m, P),
        L = n.add($, I);
      (j = n.mul(j, L)),
        (L = n.add(B, N)),
        (j = n.sub(j, L)),
        (L = n.add(m, E));
      let K = n.add($, C);
      return (
        (L = n.mul(L, K)),
        (K = n.add(B, k)),
        (L = n.sub(L, K)),
        (K = n.add(P, E)),
        (O = n.add(I, C)),
        (K = n.mul(K, O)),
        (O = n.add(N, k)),
        (K = n.sub(K, O)),
        (M = n.mul(D, L)),
        (O = n.mul(T, k)),
        (M = n.add(O, M)),
        (O = n.sub(N, M)),
        (M = n.add(N, M)),
        (R = n.mul(O, M)),
        (N = n.add(B, B)),
        (N = n.add(N, B)),
        (k = n.mul(D, k)),
        (L = n.mul(T, L)),
        (N = n.add(N, k)),
        (k = n.sub(B, k)),
        (k = n.mul(D, k)),
        (L = n.add(L, k)),
        (B = n.mul(N, L)),
        (R = n.add(R, B)),
        (B = n.mul(K, L)),
        (O = n.mul(j, O)),
        (O = n.sub(O, B)),
        (B = n.mul(j, N)),
        (M = n.mul(K, M)),
        (M = n.add(M, B)),
        new p(O, R, M)
      );
    }
    subtract(v) {
      return this.add(v.negate());
    }
    is0() {
      return this.equals(p.ZERO);
    }
    wNAF(v) {
      return S.wNAFCached(this, v, p.normalizeZ);
    }
    multiplyUnsafe(v) {
      const { endo: m, n: P } = t;
      Wn("scalar", v, ht, P);
      const E = p.ZERO;
      if (v === ht) return E;
      if (this.is0() || v === se) return this;
      if (!m || S.hasPrecomputes(this))
        return S.wNAFCachedUnsafe(this, v, p.normalizeZ);
      let { k1neg: $, k1: I, k2neg: C, k2: O } = m.splitScalar(v),
        R = E,
        M = E,
        D = this;
      for (; I > ht || O > ht; )
        I & se && (R = R.add(D)),
          O & se && (M = M.add(D)),
          (D = D.double()),
          (I >>= se),
          (O >>= se);
      return (
        $ && (R = R.negate()),
        C && (M = M.negate()),
        (M = new p(n.mul(M.px, m.beta), M.py, M.pz)),
        R.add(M)
      );
    }
    multiply(v) {
      const { endo: m, n: P } = t;
      Wn("scalar", v, se, P);
      let E, $;
      if (m) {
        const { k1neg: I, k1: C, k2neg: O, k2: R } = m.splitScalar(v);
        let { p: M, f: D } = this.wNAF(C),
          { p: T, f: B } = this.wNAF(R);
        (M = S.constTimeNegate(I, M)),
          (T = S.constTimeNegate(O, T)),
          (T = new p(n.mul(T.px, m.beta), T.py, T.pz)),
          (E = M.add(T)),
          ($ = D.add(B));
      } else {
        const { p: I, f: C } = this.wNAF(v);
        (E = I), ($ = C);
      }
      return p.normalizeZ([E, $])[0];
    }
    multiplyAndAddUnsafe(v, m, P) {
      const E = p.BASE,
        $ = (C, O) =>
          O === ht || O === se || !C.equals(E)
            ? C.multiplyUnsafe(O)
            : C.multiply(O),
        I = $(this, m).add($(v, P));
      return I.is0() ? void 0 : I;
    }
    toAffine(v) {
      return h(this, v);
    }
    isTorsionFree() {
      const { h: v, isTorsionFree: m } = t;
      if (v === se) return !0;
      if (m) return m(p, this);
      throw new Error(
        "isTorsionFree() has not been declared for the elliptic curve"
      );
    }
    clearCofactor() {
      const { h: v, clearCofactor: m } = t;
      return v === se ? this : m ? m(p, this) : this.multiplyUnsafe(t.h);
    }
    toRawBytes(v = !0) {
      return Jr("isCompressed", v), this.assertValidity(), s(p, this, v);
    }
    toHex(v = !0) {
      return Jr("isCompressed", v), Xr(this.toRawBytes(v));
    }
  }
  (p.BASE = new p(t.Gx, t.Gy, n.ONE)), (p.ZERO = new p(n.ZERO, n.ONE, n.ZERO));
  const { endo: y, nBitLength: x } = t,
    S = yg(p, y ? Math.ceil(x / 2) : x);
  return {
    CURVE: t,
    ProjectivePoint: p,
    normPrivateKeyToScalar: d,
    weierstrassEquation: i,
    isWithinCurveOrder: f,
  };
}
function Eg(e) {
  const t = Rl(e);
  return (
    lo(
      t,
      { hash: "hash", hmac: "function", randomBytes: "function" },
      { bits2int: "function", bits2int_modN: "function", lowS: "boolean" }
    ),
    Object.freeze({ lowS: !0, ...t })
  );
}
function Pg(e) {
  const t = Eg(e),
    { Fp: n, n: r, nByteLength: s, nBitLength: o } = t,
    i = n.BYTES + 1,
    a = 2 * n.BYTES + 1;
  function c(T) {
    return we(T, r);
  }
  function u(T) {
    return Ri(T, r);
  }
  const {
    ProjectivePoint: f,
    normPrivateKeyToScalar: d,
    weierstrassEquation: l,
    isWithinCurveOrder: h,
  } = xg({
    ...t,
    toBytes(T, B, N) {
      const k = B.toAffine(),
        j = n.toBytes(k.x),
        L = Zs;
      return (
        Jr("isCompressed", N),
        N
          ? L(Uint8Array.from([B.hasEvenY() ? 2 : 3]), j)
          : L(Uint8Array.from([4]), j, n.toBytes(k.y))
      );
    },
    fromBytes(T) {
      const B = T.length,
        N = T[0],
        k = T.subarray(1);
      if (B === i && (N === 2 || N === 3)) {
        const j = mn(k);
        if (!Oa(j, se, n.ORDER)) throw new Error("Point is not on curve");
        const L = l(j);
        let K;
        try {
          K = n.sqrt(L);
        } catch (ye) {
          const ie = ye instanceof Error ? ": " + ye.message : "";
          throw new Error("Point is not on curve" + ie);
        }
        const Z = (K & se) === se;
        return ((N & 1) === 1) !== Z && (K = n.neg(K)), { x: j, y: K };
      } else if (B === a && N === 4) {
        const j = n.fromBytes(k.subarray(0, n.BYTES)),
          L = n.fromBytes(k.subarray(n.BYTES, 2 * n.BYTES));
        return { x: j, y: L };
      } else {
        const j = i,
          L = a;
        throw new Error(
          "invalid Point, expected length of " +
            j +
            ", or uncompressed " +
            L +
            ", got " +
            B
        );
      }
    },
  });
  function b(T) {
    const B = r >> se;
    return T > B;
  }
  function p(T) {
    return b(T) ? c(-T) : T;
  }
  const y = (T, B, N) => mn(T.slice(B, N));
  class x {
    constructor(B, N, k) {
      Wn("r", B, se, r),
        Wn("s", N, se, r),
        (this.r = B),
        (this.s = N),
        k != null && (this.recovery = k),
        Object.freeze(this);
    }
    static fromCompact(B) {
      const N = s;
      return (
        (B = ke("compactSignature", B, N * 2)),
        new x(y(B, 0, N), y(B, N, 2 * N))
      );
    }
    static fromDER(B) {
      const { r: N, s: k } = ct.toSig(ke("DER", B));
      return new x(N, k);
    }
    assertValidity() {}
    addRecoveryBit(B) {
      return new x(this.r, this.s, B);
    }
    recoverPublicKey(B) {
      const { r: N, s: k, recovery: j } = this,
        L = E(ke("msgHash", B));
      if (j == null || ![0, 1, 2, 3].includes(j))
        throw new Error("recovery id invalid");
      const K = j === 2 || j === 3 ? N + t.n : N;
      if (K >= n.ORDER) throw new Error("recovery id 2 or 3 invalid");
      const Z = j & 1 ? "03" : "02",
        Ue = f.fromHex(Z + Ko(K, n.BYTES)),
        ye = u(K),
        ie = c(-L * ye),
        _n = c(k * ye),
        Ot = f.BASE.multiplyAndAddUnsafe(Ue, ie, _n);
      if (!Ot) throw new Error("point at infinify");
      return Ot.assertValidity(), Ot;
    }
    hasHighS() {
      return b(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new x(this.r, c(-this.s), this.recovery) : this;
    }
    toDERRawBytes() {
      return Qs(this.toDERHex());
    }
    toDERHex() {
      return ct.hexFromSig(this);
    }
    toCompactRawBytes() {
      return Qs(this.toCompactHex());
    }
    toCompactHex() {
      const B = s;
      return Ko(this.r, B) + Ko(this.s, B);
    }
  }
  const S = {
    isValidPrivateKey(T) {
      try {
        return d(T), !0;
      } catch {
        return !1;
      }
    },
    normPrivateKeyToScalar: d,
    randomPrivateKey: () => {
      const T = Ol(t.n);
      return hg(t.randomBytes(T), t.n);
    },
    precompute(T = 8, B = f.BASE) {
      return B._setWindowSize(T), B.multiply(BigInt(3)), B;
    },
  };
  function w(T, B = !0) {
    return f.fromPrivateKey(T).toRawBytes(B);
  }
  function v(T) {
    if (typeof T == "bigint") return !1;
    if (T instanceof f) return !0;
    const N = ke("key", T).length,
      k = n.BYTES,
      j = k + 1,
      L = 2 * k + 1;
    if (!(t.allowedPrivateKeyLengths || s === j)) return N === j || N === L;
  }
  function m(T, B, N = !0) {
    if (v(T) === !0) throw new Error("first arg must be private key");
    if (v(B) === !1) throw new Error("second arg must be public key");
    return f.fromHex(B).multiply(d(T)).toRawBytes(N);
  }
  const P =
      t.bits2int ||
      function (T) {
        if (T.length > 8192) throw new Error("input is too large");
        const B = mn(T),
          N = T.length * 8 - o;
        return N > 0 ? B >> BigInt(N) : B;
      },
    E =
      t.bits2int_modN ||
      function (T) {
        return c(P(T));
      },
    $ = fo(o);
  function I(T) {
    return Wn("num < 2^" + o, T, ht, $), ws(T, s);
  }
  function C(T, B, N = O) {
    if (["recovered", "canonical"].some((Xt) => Xt in N))
      throw new Error("sign() legacy options not supported");
    const { hash: k, randomBytes: j } = t;
    let { lowS: L, prehash: K, extraEntropy: Z } = N;
    L == null && (L = !0),
      (T = ke("msgHash", T)),
      lu(N),
      K && (T = ke("prehashed msgHash", k(T)));
    const Ue = E(T),
      ye = d(B),
      ie = [I(ye), I(Ue)];
    if (Z != null && Z !== !1) {
      const Xt = Z === !0 ? j(n.BYTES) : Z;
      ie.push(ke("extraEntropy", Xt));
    }
    const _n = Zs(...ie),
      Ot = Ue;
    function Io(Xt) {
      const Nn = P(Xt);
      if (!h(Nn)) return;
      const Ao = u(Nn),
        Ir = f.BASE.multiply(Nn).toAffine(),
        en = c(Ir.x);
      if (en === ht) return;
      const Ar = c(Ao * c(Ot + en * ye));
      if (Ar === ht) return;
      let Fn = (Ir.x === en ? 0 : 2) | Number(Ir.y & se),
        lc = Ar;
      return L && b(Ar) && ((lc = p(Ar)), (Fn ^= 1)), new x(en, lc, Fn);
    }
    return { seed: _n, k2sig: Io };
  }
  const O = { lowS: t.lowS, prehash: !1 },
    R = { lowS: t.lowS, prehash: !1 };
  function M(T, B, N = O) {
    const { seed: k, k2sig: j } = C(T, B, N),
      L = t;
    return $1(L.hash.outputLen, L.nByteLength, L.hmac)(k, j);
  }
  f.BASE._setWindowSize(8);
  function D(T, B, N, k = R) {
    const j = T;
    (B = ke("msgHash", B)), (N = ke("publicKey", N));
    const { lowS: L, prehash: K, format: Z } = k;
    if ((lu(k), "strict" in k))
      throw new Error("options.strict was renamed to lowS");
    if (Z !== void 0 && Z !== "compact" && Z !== "der")
      throw new Error("format must be compact or der");
    const Ue = typeof j == "string" || gs(j),
      ye =
        !Ue &&
        !Z &&
        typeof j == "object" &&
        j !== null &&
        typeof j.r == "bigint" &&
        typeof j.s == "bigint";
    if (!Ue && !ye)
      throw new Error(
        "invalid signature, expected Uint8Array, hex string or Signature instance"
      );
    let ie, _n;
    try {
      if ((ye && (ie = new x(j.r, j.s)), Ue)) {
        try {
          Z !== "compact" && (ie = x.fromDER(j));
        } catch (Fn) {
          if (!(Fn instanceof ct.Err)) throw Fn;
        }
        !ie && Z !== "der" && (ie = x.fromCompact(j));
      }
      _n = f.fromHex(N);
    } catch {
      return !1;
    }
    if (!ie || (L && ie.hasHighS())) return !1;
    K && (B = t.hash(B));
    const { r: Ot, s: Io } = ie,
      Xt = E(B),
      Nn = u(Io),
      Ao = c(Xt * Nn),
      Ir = c(Ot * Nn),
      en = f.BASE.multiplyAndAddUnsafe(_n, Ao, Ir)?.toAffine();
    return en ? c(en.x) === Ot : !1;
  }
  return {
    CURVE: t,
    getPublicKey: w,
    getSharedSecret: m,
    sign: M,
    verify: D,
    ProjectivePoint: f,
    Signature: x,
    utils: S,
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function Sg(
  e
) {
  return { hash: e, hmac: (t, ...n) => xl(e, t, Ap(...n)), randomBytes: Op };
}
function $g(e, t) {
  const n = (r) => Pg({ ...e, ...Sg(r) });
  return { ...n(t), create: n };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const kl =
    BigInt(
      "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"
    ),
  hu = BigInt(
    "0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"
  ),
  Ig = BigInt(0),
  Ag = BigInt(1),
  Mi = BigInt(2),
  pu = (e, t) => (e + t / Mi) / t;
function Cg(e) {
  const t = kl,
    n = BigInt(3),
    r = BigInt(6),
    s = BigInt(11),
    o = BigInt(22),
    i = BigInt(23),
    a = BigInt(44),
    c = BigInt(88),
    u = (e * e * e) % t,
    f = (u * u * e) % t,
    d = (Re(f, n, t) * f) % t,
    l = (Re(d, n, t) * f) % t,
    h = (Re(l, Mi, t) * u) % t,
    b = (Re(h, s, t) * h) % t,
    p = (Re(b, o, t) * b) % t,
    y = (Re(p, a, t) * p) % t,
    x = (Re(y, c, t) * y) % t,
    S = (Re(x, a, t) * p) % t,
    w = (Re(S, n, t) * f) % t,
    v = (Re(w, i, t) * b) % t,
    m = (Re(v, r, t) * u) % t,
    P = Re(m, Mi, t);
  if (!_i.eql(_i.sqr(P), e)) throw new Error("Cannot find square root");
  return P;
}
const _i = qa(kl, void 0, void 0, { sqrt: Cg }),
  Ha = $g(
    {
      a: Ig,
      b: BigInt(7),
      Fp: _i,
      n: hu,
      Gx: BigInt(
        "55066263022277343669578718895168534326250603453777594175500187360389116729240"
      ),
      Gy: BigInt(
        "32670510020758816978083085130507043184471273380659243275938904335757337482424"
      ),
      h: BigInt(1),
      lowS: !0,
      endo: {
        beta: BigInt(
          "0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"
        ),
        splitScalar: (e) => {
          const t = hu,
            n = BigInt("0x3086d221a7d46bcde86c90e49284eb15"),
            r = -Ag * BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),
            s = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),
            o = n,
            i = BigInt("0x100000000000000000000000000000000"),
            a = pu(o * e, t),
            c = pu(-r * e, t);
          let u = we(e - a * n - c * s, t),
            f = we(-a * r - c * o, t);
          const d = u > i,
            l = f > i;
          if ((d && (u = t - u), l && (f = t - f), u > i || f > i))
            throw new Error("splitScalar: Endomorphism failed, k=" + e);
          return { k1neg: d, k1: u, k2neg: l, k2: f };
        },
      },
    },
    dd
  ),
  Og = Object.freeze(
    Object.defineProperty(
      { __proto__: null, secp256k1: Ha },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function Ml(e, t = {}) {
  const { recovered: n } = t;
  if (typeof e.r > "u") throw new Zo({ signature: e });
  if (typeof e.s > "u") throw new Zo({ signature: e });
  if (n && typeof e.yParity > "u") throw new Zo({ signature: e });
  if (e.r < 0n || e.r > iu) throw new Ng({ value: e.r });
  if (e.s < 0n || e.s > iu) throw new Fg({ value: e.s });
  if (typeof e.yParity == "number" && e.yParity !== 0 && e.yParity !== 1)
    throw new Va({ value: e.yParity });
}
function Tg(e) {
  return _l(Ke(e));
}
function _l(e) {
  if (e.length !== 130 && e.length !== 132) throw new _g({ signature: e });
  const t = BigInt(tt(e, 0, 32)),
    n = BigInt(tt(e, 32, 64)),
    r = (() => {
      const s = +`0x${e.slice(130)}`;
      if (!Number.isNaN(s))
        try {
          return Ga(s);
        } catch {
          throw new Va({ value: s });
        }
    })();
  return typeof r > "u" ? { r: t, s: n } : { r: t, s: n, yParity: r };
}
function Bg(e) {
  if (!(typeof e.r > "u") && !(typeof e.s > "u")) return Rg(e);
}
function Rg(e) {
  const t =
    typeof e == "string"
      ? _l(e)
      : e instanceof Uint8Array
      ? Tg(e)
      : typeof e.r == "string"
      ? Mg(e)
      : e.v
      ? kg(e)
      : {
          r: e.r,
          s: e.s,
          ...(typeof e.yParity < "u" ? { yParity: e.yParity } : {}),
        };
  return Ml(t), t;
}
function kg(e) {
  return { r: e.r, s: e.s, yParity: Ga(e.v) };
}
function Mg(e) {
  const t = (() => {
    const n = e.v ? Number(e.v) : void 0;
    let r = e.yParity ? Number(e.yParity) : void 0;
    if (
      (typeof n == "number" && typeof r != "number" && (r = Ga(n)),
      typeof r != "number")
    )
      throw new Va({ value: e.yParity });
    return r;
  })();
  return { r: BigInt(e.r), s: BigInt(e.s), yParity: t };
}
function Ga(e) {
  if (e === 0 || e === 27) return 0;
  if (e === 1 || e === 28) return 1;
  if (e >= 35) return e % 2 === 0 ? 1 : 0;
  throw new jg({ value: e });
}
class _g extends W {
  constructor({ signature: t }) {
    super(`Value \`${t}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${Ce(Z1(t))} bytes.`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Signature.InvalidSerializedSizeError",
      });
  }
}
class Zo extends W {
  constructor({ signature: t }) {
    super(
      `Signature \`${Ed(
        t
      )}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Signature.MissingPropertiesError",
      });
  }
}
class Ng extends W {
  constructor({ value: t }) {
    super(
      `Value \`${t}\` is an invalid r value. r must be a positive integer less than 2^256.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Signature.InvalidRError",
      });
  }
}
class Fg extends W {
  constructor({ value: t }) {
    super(
      `Value \`${t}\` is an invalid s value. s must be a positive integer less than 2^256.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Signature.InvalidSError",
      });
  }
}
class Va extends W {
  constructor({ value: t }) {
    super(
      `Value \`${t}\` is an invalid y-parity value. Y-parity must be 0 or 1.`
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Signature.InvalidYParityError",
      });
  }
}
class jg extends W {
  constructor({ value: t }) {
    super(`Value \`${t}\` is an invalid v value. v must be 27, 28 or >=35.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Signature.InvalidVError",
      });
  }
}
function zg(e, t = {}) {
  return typeof e.chainId == "string" ? Ug(e) : { ...e, ...t.signature };
}
function Ug(e) {
  const { address: t, chainId: n, nonce: r } = e,
    s = Bg(e);
  return { address: t, chainId: Number(n), nonce: BigInt(r), ...s };
}
const Lg = "0x8010801080108010801080108010801080108010801080108010801080108010",
  Dg = ml(
    "(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data"
  );
function Nl(e) {
  if (typeof e == "string") {
    if (tt(e, -32) !== Lg) throw new Gg(e);
  } else Ml(e.authorization);
}
function qg(e) {
  Nl(e);
  const t = Ad(tt(e, -64, -32)),
    n = tt(e, -t - 64, -64),
    r = tt(e, 0, -t - 64),
    [s, o, i] = tg(Dg, n);
  return {
    authorization: zg({
      address: s.delegation,
      chainId: Number(s.chainId),
      nonce: s.nonce,
      yParity: s.yParity,
      r: s.r,
      s: s.s,
    }),
    signature: r,
    ...(i && i !== "0x" ? { data: i, to: o } : {}),
  };
}
function Hg(e) {
  try {
    return Nl(e), !0;
  } catch {
    return !1;
  }
}
let Gg = class extends W {
  constructor(t) {
    super(`Value \`${t}\` is an invalid ERC-8010 wrapped signature.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SignatureErc8010.InvalidWrappedSignatureError",
      });
  }
};
function Iv(e) {
  const { address: t, data: n, signature: r, to: s = "hex" } = e,
    o = $t([
      It(
        [{ type: "address" }, { type: "bytes" }, { type: "bytes" }],
        [t, n, r]
      ),
      Ly,
    ]);
  return s === "hex" ? o : Ne(o);
}
class Vg extends A {
  constructor({ value: t }) {
    super(`Number \`${t}\` is not a valid decimal number.`, {
      name: "InvalidDecimalNumberError",
    });
  }
}
function Wg(e, t) {
  if (!/^(-?)([0-9]*)\.?([0-9]*)$/.test(e)) throw new Vg({ value: e });
  let [n, r = "0"] = e.split(".");
  const s = n.startsWith("-");
  if ((s && (n = n.slice(1)), (r = r.replace(/(0+)$/, "")), t === 0))
    Math.round(+`.${r}`) === 1 && (n = `${BigInt(n) + 1n}`), (r = "");
  else if (r.length > t) {
    const [o, i, a] = [r.slice(0, t - 1), r.slice(t - 1, t), r.slice(t)],
      c = Math.round(+`${i}.${a}`);
    c > 9
      ? (r = `${BigInt(o) + BigInt(1)}0`.padStart(o.length + 1, "0"))
      : (r = `${o}${c}`),
      r.length > t && ((r = r.slice(1)), (n = `${BigInt(n) + 1n}`)),
      (r = r.slice(0, t));
  } else r = r.padEnd(t, "0");
  return BigInt(`${s ? "-" : ""}${n}${r}`);
}
function Av(e, t = "wei") {
  return Wg(e, td[t]);
}
function mo(e, { method: t }) {
  const n = {};
  return (
    e.transport.type === "fallback" &&
      e.transport.onResponse?.(
        ({ method: r, response: s, status: o, transport: i }) => {
          o === "success" && t === r && (n[s] = i.request);
        }
      ),
    (r) => n[r] || e.request
  );
}
async function Fl(e, t) {
  const {
      address: n,
      abi: r,
      args: s,
      eventName: o,
      fromBlock: i,
      strict: a,
      toBlock: c,
    } = t,
    u = mo(e, { method: "eth_newFilter" }),
    f = o ? ps({ abi: r, args: s, eventName: o }) : void 0,
    d = await e.request({
      method: "eth_newFilter",
      params: [
        {
          address: n,
          fromBlock: typeof i == "bigint" ? F(i) : i,
          toBlock: typeof c == "bigint" ? F(c) : c,
          topics: f,
        },
      ],
    });
  return {
    abi: r,
    args: s,
    eventName: o,
    id: d,
    request: u(d),
    strict: !!a,
    type: "event",
  };
}
class Kg extends A {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.", {
      name: "BaseFeeScalarError",
    });
  }
}
class Wa extends A {
  constructor() {
    super("Chain does not support EIP-1559 fees.", {
      name: "Eip1559FeesNotSupportedError",
    });
  }
}
class Qg extends A {
  constructor({ maxPriorityFeePerGas: t }) {
    super(
      `\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${xe(
        t
      )} gwei).`,
      { name: "MaxFeePerGasTooLowError" }
    );
  }
}
class jl extends A {
  constructor({ blockHash: t, blockNumber: n }) {
    let r = "Block";
    t && (r = `Block at hash "${t}"`),
      n && (r = `Block at number "${n}"`),
      super(`${r} could not be found.`, { name: "BlockNotFoundError" });
  }
}
async function et(
  e,
  {
    blockHash: t,
    blockNumber: n,
    blockTag: r = e.experimental_blockTag ?? "latest",
    includeTransactions: s,
  } = {}
) {
  const o = s ?? !1,
    i = n !== void 0 ? F(n) : void 0;
  let a = null;
  if (
    (t
      ? (a = await e.request(
          { method: "eth_getBlockByHash", params: [t, o] },
          { dedupe: !0 }
        ))
      : (a = await e.request(
          { method: "eth_getBlockByNumber", params: [i || r, o] },
          { dedupe: !!i }
        )),
    !a)
  )
    throw new jl({ blockHash: t, blockNumber: n });
  return (e.chain?.formatters?.block?.format || Gd)(a, "getBlock");
}
async function Ka(e) {
  const t = await e.request({ method: "eth_gasPrice" });
  return BigInt(t);
}
async function Zg(e, t) {
  return zl(e, t);
}
async function zl(e, t) {
  const { block: n, chain: r = e.chain, request: s } = t || {};
  try {
    const o = r?.fees?.maxPriorityFeePerGas ?? r?.fees?.defaultPriorityFee;
    if (typeof o == "function") {
      const a = n || (await z(e, et, "getBlock")({})),
        c = await o({ block: a, client: e, request: s });
      if (c === null) throw new Error();
      return c;
    }
    if (typeof o < "u") return o;
    const i = await e.request({ method: "eth_maxPriorityFeePerGas" });
    return $e(i);
  } catch {
    const [o, i] = await Promise.all([
      n ? Promise.resolve(n) : z(e, et, "getBlock")({}),
      z(e, Ka, "getGasPrice")({}),
    ]);
    if (typeof o.baseFeePerGas != "bigint") throw new Wa();
    const a = i - o.baseFeePerGas;
    return a < 0n ? 0n : a;
  }
}
async function Yg(e, t) {
  return Ni(e, t);
}
async function Ni(e, t) {
  const {
      block: n,
      chain: r = e.chain,
      request: s,
      type: o = "eip1559",
    } = t || {},
    i = await (async () =>
      typeof r?.fees?.baseFeeMultiplier == "function"
        ? r.fees.baseFeeMultiplier({ block: n, client: e, request: s })
        : r?.fees?.baseFeeMultiplier ?? 1.2)();
  if (i < 1) throw new Kg();
  const c = 10 ** (i.toString().split(".")[1]?.length ?? 0),
    u = (l) => (l * BigInt(Math.ceil(i * c))) / BigInt(c),
    f = n || (await z(e, et, "getBlock")({}));
  if (typeof r?.fees?.estimateFeesPerGas == "function") {
    const l = await r.fees.estimateFeesPerGas({
      block: n,
      client: e,
      multiply: u,
      request: s,
      type: o,
    });
    if (l !== null) return l;
  }
  if (o === "eip1559") {
    if (typeof f.baseFeePerGas != "bigint") throw new Wa();
    const l =
        typeof s?.maxPriorityFeePerGas == "bigint"
          ? s.maxPriorityFeePerGas
          : await zl(e, { block: f, chain: r, request: s }),
      h = u(f.baseFeePerGas);
    return { maxFeePerGas: s?.maxFeePerGas ?? h + l, maxPriorityFeePerGas: l };
  }
  return { gasPrice: s?.gasPrice ?? u(await z(e, Ka, "getGasPrice")({})) };
}
async function Mn(e) {
  const t = await e.request({ method: "eth_chainId" }, { dedupe: !0 });
  return Ge(t);
}
const Qa = ["blobVersionedHashes", "chainId", "fees", "gas", "nonce", "type"],
  bu = new Map();
async function Ps(e, t) {
  const {
      account: n = e.account,
      blobs: r,
      chain: s,
      gas: o,
      kzg: i,
      nonce: a,
      nonceManager: c,
      parameters: u = Qa,
      type: f,
    } = t,
    d = n && Y(n),
    l = { ...t, ...(d ? { from: d?.address } : {}) };
  let h;
  async function b() {
    return h || ((h = await z(e, et, "getBlock")({ blockTag: "latest" })), h);
  }
  let p;
  async function y() {
    return (
      p ||
      (s
        ? s.id
        : typeof t.chainId < "u"
        ? t.chainId
        : ((p = await z(e, Mn, "getChainId")({})), p))
    );
  }
  if (u.includes("nonce") && typeof a > "u" && d)
    if (c) {
      const x = await y();
      l.nonce = await c.consume({ address: d.address, chainId: x, client: e });
    } else
      l.nonce = await z(
        e,
        Na,
        "getTransactionCount"
      )({ address: d.address, blockTag: "pending" });
  if ((u.includes("blobVersionedHashes") || u.includes("sidecars")) && r && i) {
    const x = id({ blobs: r, kzg: i });
    if (u.includes("blobVersionedHashes")) {
      const S = a1({ commitments: x, to: "hex" });
      l.blobVersionedHashes = S;
    }
    if (u.includes("sidecars")) {
      const S = ad({ blobs: r, commitments: x, kzg: i }),
        w = d1({ blobs: r, commitments: x, proofs: S, to: "hex" });
      l.sidecars = w;
    }
  }
  if (
    (u.includes("chainId") && (l.chainId = await y()),
    (u.includes("fees") || u.includes("type")) && typeof f > "u")
  )
    try {
      l.type = b1(l);
    } catch {
      let x = bu.get(e.uid);
      typeof x > "u" &&
        ((x = typeof (await b())?.baseFeePerGas == "bigint"), bu.set(e.uid, x)),
        (l.type = x ? "eip1559" : "legacy");
    }
  if (u.includes("fees"))
    if (l.type !== "legacy" && l.type !== "eip2930") {
      if (typeof l.maxFeePerGas > "u" || typeof l.maxPriorityFeePerGas > "u") {
        const x = await b(),
          { maxFeePerGas: S, maxPriorityFeePerGas: w } = await Ni(e, {
            block: x,
            chain: s,
            request: l,
          });
        if (
          typeof t.maxPriorityFeePerGas > "u" &&
          t.maxFeePerGas &&
          t.maxFeePerGas < w
        )
          throw new Qg({ maxPriorityFeePerGas: w });
        (l.maxPriorityFeePerGas = w), (l.maxFeePerGas = S);
      }
    } else {
      if (typeof t.maxFeePerGas < "u" || typeof t.maxPriorityFeePerGas < "u")
        throw new Wa();
      if (typeof t.gasPrice > "u") {
        const x = await b(),
          { gasPrice: S } = await Ni(e, {
            block: x,
            chain: s,
            request: l,
            type: "legacy",
          });
        l.gasPrice = S;
      }
    }
  return (
    u.includes("gas") &&
      typeof o > "u" &&
      (l.gas = await z(
        e,
        Za,
        "estimateGas"
      )({
        ...l,
        account: d,
        prepare: d?.type === "local" ? [] : ["blobVersionedHashes"],
      })),
    Yt(l),
    delete l.parameters,
    l
  );
}
async function Za(e, t) {
  const { account: n = e.account, prepare: r = !0 } = t,
    s = n ? Y(n) : void 0,
    o = (() => {
      if (Array.isArray(r)) return r;
      if (s?.type !== "local") return ["blobVersionedHashes"];
    })();
  try {
    const {
        accessList: i,
        authorizationList: a,
        blobs: c,
        blobVersionedHashes: u,
        blockNumber: f,
        blockTag: d,
        data: l,
        gas: h,
        gasPrice: b,
        maxFeePerBlobGas: p,
        maxFeePerGas: y,
        maxPriorityFeePerGas: x,
        nonce: S,
        value: w,
        stateOverride: v,
        ...m
      } = r ? await Ps(e, { ...t, parameters: o }) : t,
      E = (typeof f == "bigint" ? F(f) : void 0) || d,
      $ = ka(v),
      I = await (async () => {
        if (m.to) return m.to;
        if (a && a.length > 0)
          return await uo({ authorization: a[0] }).catch(() => {
            throw new A(
              "`to` is required. Could not infer from `authorizationList`"
            );
          });
      })();
    Yt(t);
    const C = e.chain?.formatters?.transactionRequest?.format,
      R = (C || kn)(
        {
          ...xs(m, { format: C }),
          account: s,
          accessList: i,
          authorizationList: a,
          blobs: c,
          blobVersionedHashes: u,
          data: l,
          gas: h,
          gasPrice: b,
          maxFeePerBlobGas: p,
          maxFeePerGas: y,
          maxPriorityFeePerGas: x,
          nonce: S,
          to: I,
          value: w,
        },
        "estimateGas"
      );
    return BigInt(
      await e.request({
        method: "eth_estimateGas",
        params: $
          ? [R, E ?? e.experimental_blockTag ?? "latest", $]
          : E
          ? [R, E]
          : [R],
      })
    );
  } catch (i) {
    throw Iy(i, { ...t, account: s, chain: e.chain });
  }
}
async function Jg(e, t) {
  const {
      abi: n,
      address: r,
      args: s,
      functionName: o,
      dataSuffix: i,
      ...a
    } = t,
    c = Oe({ abi: n, args: s, functionName: o });
  try {
    return await z(
      e,
      Za,
      "estimateGas"
    )({ data: `${c}${i ? i.replace("0x", "") : ""}`, to: r, ...a });
  } catch (u) {
    const f = a.account ? Y(a.account) : void 0;
    throw In(u, {
      abi: n,
      address: r,
      args: s,
      docsPath: "/docs/contract/estimateContractGas",
      functionName: o,
      sender: f?.address,
    });
  }
}
async function Ya(
  e,
  {
    address: t,
    blockHash: n,
    fromBlock: r,
    toBlock: s,
    event: o,
    events: i,
    args: a,
    strict: c,
  } = {}
) {
  const u = c ?? !1,
    f = i ?? (o ? [o] : void 0);
  let d = [];
  f &&
    ((d = [
      f.flatMap((p) =>
        ps({ abi: [p], eventName: p.name, args: i ? void 0 : a })
      ),
    ]),
    o && (d = d[0]));
  let l;
  n
    ? (l = await e.request({
        method: "eth_getLogs",
        params: [{ address: t, topics: d, blockHash: n }],
      }))
    : (l = await e.request({
        method: "eth_getLogs",
        params: [
          {
            address: t,
            topics: d,
            fromBlock: typeof r == "bigint" ? F(r) : r,
            toBlock: typeof s == "bigint" ? F(s) : s,
          },
        ],
      }));
  const h = l.map((b) => xt(b));
  return f ? Pa({ abi: f, args: a, logs: h, strict: u }) : h;
}
async function Ul(e, t) {
  const {
      abi: n,
      address: r,
      args: s,
      blockHash: o,
      eventName: i,
      fromBlock: a,
      toBlock: c,
      strict: u,
    } = t,
    f = i ? Bn({ abi: n, name: i }) : void 0,
    d = f ? void 0 : n.filter((l) => l.type === "event");
  return z(
    e,
    Ya,
    "getLogs"
  )({
    address: r,
    args: s,
    blockHash: o,
    event: f,
    events: d,
    fromBlock: a,
    toBlock: c,
    strict: u,
  });
}
async function Fe(e, t) {
  const { abi: n, address: r, args: s, functionName: o, ...i } = t,
    a = Oe({ abi: n, args: s, functionName: o });
  try {
    const { data: c } = await z(e, Er, "call")({ ...i, data: a, to: r });
    return Rn({ abi: n, args: s, functionName: o, data: c || "0x" });
  } catch (c) {
    throw In(c, {
      abi: n,
      address: r,
      args: s,
      docsPath: "/docs/contract/readContract",
      functionName: o,
    });
  }
}
async function Xg(e, t) {
  const {
      abi: n,
      address: r,
      args: s,
      dataSuffix: o,
      functionName: i,
      ...a
    } = t,
    c = a.account ? Y(a.account) : e.account,
    u = Oe({ abi: n, args: s, functionName: i });
  try {
    const { data: f } = await z(
        e,
        Er,
        "call"
      )({
        batch: !1,
        data: `${u}${o ? o.replace("0x", "") : ""}`,
        to: r,
        ...a,
        account: c,
      }),
      d = Rn({ abi: n, args: s, functionName: i, data: f || "0x" }),
      l = n.filter((h) => "name" in h && h.name === t.functionName);
    return {
      result: d,
      request: {
        abi: l,
        address: r,
        args: s,
        dataSuffix: o,
        functionName: i,
        ...a,
        account: c,
      },
    };
  } catch (f) {
    throw In(f, {
      abi: n,
      address: r,
      args: s,
      docsPath: "/docs/contract/simulateContract",
      functionName: i,
      sender: c?.address,
    });
  }
}
const Yo = new Map(),
  yu = new Map();
let e6 = 0;
function Pt(e, t, n) {
  const r = ++e6,
    s = () => Yo.get(e) || [],
    o = () => {
      const f = s();
      Yo.set(
        e,
        f.filter((d) => d.id !== r)
      );
    },
    i = () => {
      const f = s();
      if (!f.some((l) => l.id === r)) return;
      const d = yu.get(e);
      if (f.length === 1 && d) {
        const l = d();
        l instanceof Promise && l.catch(() => {});
      }
      o();
    },
    a = s();
  if ((Yo.set(e, [...a, { id: r, fns: t }]), a && a.length > 0)) return i;
  const c = {};
  for (const f in t)
    c[f] = (...d) => {
      const l = s();
      if (l.length !== 0) for (const h of l) h.fns[f]?.(...d);
    };
  const u = n(c);
  return typeof u == "function" && yu.set(e, u), i;
}
function Sr(e, { emitOnBegin: t, initialWaitTime: n, interval: r }) {
  let s = !0;
  const o = () => (s = !1);
  return (
    (async () => {
      let a;
      t && (a = await e({ unpoll: o }));
      const c = (await n?.(a)) ?? r;
      await Ks(c);
      const u = async () => {
        s && (await e({ unpoll: o }), await Ks(r), u());
      };
      u();
    })(),
    o
  );
}
const t6 = new Map(),
  n6 = new Map();
function r6(e) {
  const t = (s, o) => ({
      clear: () => o.delete(s),
      get: () => o.get(s),
      set: (i) => o.set(s, i),
    }),
    n = t(e, t6),
    r = t(e, n6);
  return {
    clear: () => {
      n.clear(), r.clear();
    },
    promise: n,
    response: r,
  };
}
async function s6(e, { cacheKey: t, cacheTime: n = Number.POSITIVE_INFINITY }) {
  const r = r6(t),
    s = r.response.get();
  if (s && n > 0 && Date.now() - s.created.getTime() < n) return s.data;
  let o = r.promise.get();
  o || ((o = e()), r.promise.set(o));
  try {
    const i = await o;
    return r.response.set({ created: new Date(), data: i }), i;
  } finally {
    r.promise.clear();
  }
}
const o6 = (e) => `blockNumber.${e}`;
async function Ss(e, { cacheTime: t = e.cacheTime } = {}) {
  const n = await s6(() => e.request({ method: "eth_blockNumber" }), {
    cacheKey: o6(e.uid),
    cacheTime: t,
  });
  return BigInt(n);
}
async function go(e, { filter: t }) {
  const n = "strict" in t && t.strict,
    r = await t.request({ method: "eth_getFilterChanges", params: [t.id] });
  if (typeof r[0] == "string") return r;
  const s = r.map((o) => xt(o));
  return !("abi" in t) || !t.abi ? s : Pa({ abi: t.abi, logs: s, strict: n });
}
async function wo(e, { filter: t }) {
  return t.request({ method: "eth_uninstallFilter", params: [t.id] });
}
function i6(e, t) {
  const {
    abi: n,
    address: r,
    args: s,
    batch: o = !0,
    eventName: i,
    fromBlock: a,
    onError: c,
    onLogs: u,
    poll: f,
    pollingInterval: d = e.pollingInterval,
    strict: l,
  } = t;
  return (
    typeof f < "u"
      ? f
      : typeof a == "bigint"
      ? !0
      : !(
          e.transport.type === "webSocket" ||
          e.transport.type === "ipc" ||
          (e.transport.type === "fallback" &&
            (e.transport.transports[0].config.type === "webSocket" ||
              e.transport.transports[0].config.type === "ipc"))
        )
  )
    ? (() => {
        const y = l ?? !1,
          x = ee(["watchContractEvent", r, s, o, e.uid, i, d, y, a]);
        return Pt(x, { onLogs: u, onError: c }, (S) => {
          let w;
          a !== void 0 && (w = a - 1n);
          let v,
            m = !1;
          const P = Sr(
            async () => {
              if (!m) {
                try {
                  v = await z(
                    e,
                    Fl,
                    "createContractEventFilter"
                  )({
                    abi: n,
                    address: r,
                    args: s,
                    eventName: i,
                    strict: y,
                    fromBlock: a,
                  });
                } catch {}
                m = !0;
                return;
              }
              try {
                let E;
                if (v) E = await z(e, go, "getFilterChanges")({ filter: v });
                else {
                  const $ = await z(e, Ss, "getBlockNumber")({});
                  w && w < $
                    ? (E = await z(
                        e,
                        Ul,
                        "getContractEvents"
                      )({
                        abi: n,
                        address: r,
                        args: s,
                        eventName: i,
                        fromBlock: w + 1n,
                        toBlock: $,
                        strict: y,
                      }))
                    : (E = []),
                    (w = $);
                }
                if (E.length === 0) return;
                if (o) S.onLogs(E);
                else for (const $ of E) S.onLogs([$]);
              } catch (E) {
                v && E instanceof En && (m = !1), S.onError?.(E);
              }
            },
            { emitOnBegin: !0, interval: d }
          );
          return async () => {
            v && (await z(e, wo, "uninstallFilter")({ filter: v })), P();
          };
        });
      })()
    : (() => {
        const y = l ?? !1,
          x = ee(["watchContractEvent", r, s, o, e.uid, i, d, y]);
        let S = !0,
          w = () => (S = !1);
        return Pt(
          x,
          { onLogs: u, onError: c },
          (v) => (
            (async () => {
              try {
                const m = (() => {
                    if (e.transport.type === "fallback") {
                      const $ = e.transport.transports.find(
                        (I) =>
                          I.config.type === "webSocket" ||
                          I.config.type === "ipc"
                      );
                      return $ ? $.value : e.transport;
                    }
                    return e.transport;
                  })(),
                  P = i ? ps({ abi: n, eventName: i, args: s }) : [],
                  { unsubscribe: E } = await m.subscribe({
                    params: ["logs", { address: r, topics: P }],
                    onData($) {
                      if (!S) return;
                      const I = $.result;
                      try {
                        const { eventName: C, args: O } = Ea({
                            abi: n,
                            data: I.data,
                            topics: I.topics,
                            strict: l,
                          }),
                          R = xt(I, { args: O, eventName: C });
                        v.onLogs([R]);
                      } catch (C) {
                        let O, R;
                        if (C instanceof Mr || C instanceof io) {
                          if (l) return;
                          (O = C.abiItem.name),
                            (R = C.abiItem.inputs?.some(
                              (D) => !("name" in D && D.name)
                            ));
                        }
                        const M = xt(I, { args: R ? [] : {}, eventName: O });
                        v.onLogs([M]);
                      }
                    },
                    onError($) {
                      v.onError?.($);
                    },
                  });
                (w = E), S || w();
              } catch (m) {
                c?.(m);
              }
            })(),
            () => w()
          )
        );
      })();
}
class Jt extends A {
  constructor({ docsPath: t } = {}) {
    super(
      [
        "Could not find an Account to execute with this Action.",
        "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client.",
      ].join(`
`),
      { docsPath: t, docsSlug: "account", name: "AccountNotFoundError" }
    );
  }
}
class gn extends A {
  constructor({ docsPath: t, metaMessages: n, type: r }) {
    super(`Account type "${r}" is not supported.`, {
      docsPath: t,
      metaMessages: n,
      name: "AccountTypeNotSupportedError",
    });
  }
}
async function Ja(e, { serializedTransaction: t }) {
  return e.request(
    { method: "eth_sendRawTransaction", params: [t] },
    { retryCount: 0 }
  );
}
const Jo = new wr(128);
async function vo(e, t) {
  const {
    account: n = e.account,
    chain: r = e.chain,
    accessList: s,
    authorizationList: o,
    blobs: i,
    data: a,
    gas: c,
    gasPrice: u,
    maxFeePerBlobGas: f,
    maxFeePerGas: d,
    maxPriorityFeePerGas: l,
    nonce: h,
    type: b,
    value: p,
    ...y
  } = t;
  if (typeof n > "u")
    throw new Jt({ docsPath: "/docs/actions/wallet/sendTransaction" });
  const x = n ? Y(n) : null;
  try {
    Yt(t);
    const S = await (async () => {
      if (t.to) return t.to;
      if (t.to !== null && o && o.length > 0)
        return await uo({ authorization: o[0] }).catch(() => {
          throw new A(
            "`to` is required. Could not infer from `authorizationList`."
          );
        });
    })();
    if (x?.type === "json-rpc" || x === null) {
      let w;
      r !== null &&
        ((w = await z(e, Mn, "getChainId")({})),
        Ma({ currentChainId: w, chain: r }));
      const v = e.chain?.formatters?.transactionRequest?.format,
        P = (v || kn)(
          {
            ...xs(y, { format: v }),
            accessList: s,
            account: x,
            authorizationList: o,
            blobs: i,
            chainId: w,
            data: a,
            gas: c,
            gasPrice: u,
            maxFeePerBlobGas: f,
            maxFeePerGas: d,
            maxPriorityFeePerGas: l,
            nonce: h,
            to: S,
            type: b,
            value: p,
          },
          "sendTransaction"
        ),
        E = Jo.get(e.uid),
        $ = E ? "wallet_sendTransaction" : "eth_sendTransaction";
      try {
        return await e.request({ method: $, params: [P] }, { retryCount: 0 });
      } catch (I) {
        if (E === !1) throw I;
        const C = I;
        if (
          C.name === "InvalidInputRpcError" ||
          C.name === "InvalidParamsRpcError" ||
          C.name === "MethodNotFoundRpcError" ||
          C.name === "MethodNotSupportedRpcError"
        )
          return await e
            .request(
              { method: "wallet_sendTransaction", params: [P] },
              { retryCount: 0 }
            )
            .then((O) => (Jo.set(e.uid, !0), O))
            .catch((O) => {
              const R = O;
              throw R.name === "MethodNotFoundRpcError" ||
                R.name === "MethodNotSupportedRpcError"
                ? (Jo.set(e.uid, !1), C)
                : R;
            });
        throw C;
      }
    }
    if (x?.type === "local") {
      const w = await z(
          e,
          Ps,
          "prepareTransactionRequest"
        )({
          account: x,
          accessList: s,
          authorizationList: o,
          blobs: i,
          chain: r,
          data: a,
          gas: c,
          gasPrice: u,
          maxFeePerBlobGas: f,
          maxFeePerGas: d,
          maxPriorityFeePerGas: l,
          nonce: h,
          nonceManager: x.nonceManager,
          parameters: [...Qa, "sidecars"],
          type: b,
          value: p,
          ...y,
          to: S,
        }),
        v = r?.serializers?.transaction,
        m = await x.signTransaction(w, { serializer: v });
      return await z(e, Ja, "sendRawTransaction")({ serializedTransaction: m });
    }
    throw x?.type === "smart"
      ? new gn({
          metaMessages: [
            "Consider using the `sendUserOperation` Action instead.",
          ],
          docsPath: "/docs/actions/bundler/sendUserOperation",
          type: "smart",
        })
      : new gn({
          docsPath: "/docs/actions/wallet/sendTransaction",
          type: x?.type,
        });
  } catch (S) {
    throw S instanceof gn
      ? S
      : _a(S, { ...t, account: x, chain: t.chain || void 0 });
  }
}
async function pr(e, t) {
  return pr.internal(e, vo, "sendTransaction", t);
}
(function (e) {
  async function t(n, r, s, o) {
    const {
      abi: i,
      account: a = n.account,
      address: c,
      args: u,
      dataSuffix: f,
      functionName: d,
      ...l
    } = o;
    if (typeof a > "u")
      throw new Jt({ docsPath: "/docs/contract/writeContract" });
    const h = a ? Y(a) : null,
      b = Oe({ abi: i, args: u, functionName: d });
    try {
      return await z(
        n,
        r,
        s
      )({
        data: `${b}${f ? f.replace("0x", "") : ""}`,
        to: c,
        account: h,
        ...l,
      });
    } catch (p) {
      throw In(p, {
        abi: i,
        address: c,
        args: u,
        docsPath: "/docs/contract/writeContract",
        functionName: d,
        sender: h?.address,
      });
    }
  }
  e.internal = t;
})(pr || (pr = {}));
class a6 extends A {
  constructor(t) {
    super(`Call bundle failed with status: ${t.statusCode}`, {
      name: "BundleFailedError",
    }),
      Object.defineProperty(this, "result", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.result = t);
  }
}
const Ll = "0x5792579257925792579257925792579257925792579257925792579257925792",
  Dl = F(0, { size: 32 });
async function ql(e, t) {
  const {
      account: n = e.account,
      capabilities: r,
      chain: s = e.chain,
      experimental_fallback: o,
      experimental_fallbackDelay: i = 32,
      forceAtomic: a = !1,
      id: c,
      version: u = "2.0.0",
    } = t,
    f = n ? Y(n) : null,
    d = t.calls.map((l) => {
      const h = l,
        b = h.abi
          ? Oe({ abi: h.abi, functionName: h.functionName, args: h.args })
          : h.data;
      return {
        data: h.dataSuffix && b ? Ae([b, h.dataSuffix]) : b,
        to: h.to,
        value: h.value ? F(h.value) : void 0,
      };
    });
  try {
    const l = await e.request(
      {
        method: "wallet_sendCalls",
        params: [
          {
            atomicRequired: a,
            calls: d,
            capabilities: r,
            chainId: F(s.id),
            from: f?.address,
            id: c,
            version: u,
          },
        ],
      },
      { retryCount: 0 }
    );
    return typeof l == "string" ? { id: l } : l;
  } catch (l) {
    const h = l;
    if (
      o &&
      (h.name === "MethodNotFoundRpcError" ||
        h.name === "MethodNotSupportedRpcError" ||
        h.name === "UnknownRpcError" ||
        h.details.toLowerCase().includes("does not exist / is not available") ||
        h.details.toLowerCase().includes("missing or invalid. request()") ||
        h.details
          .toLowerCase()
          .includes("did not match any variant of untagged enum") ||
        h.details
          .toLowerCase()
          .includes("account upgraded to unsupported contract") ||
        h.details.toLowerCase().includes("eip-7702 not supported") ||
        h.details.toLowerCase().includes("unsupported wc_ method") ||
        h.details.toLowerCase().includes("feature toggled misconfigured") ||
        h.details
          .toLowerCase()
          .includes(
            "jsonrpcengine: response has no error or result for request"
          ))
    ) {
      if (r && Object.values(r).some((S) => !S.optional)) {
        const S =
          "non-optional `capabilities` are not supported on fallback to `eth_sendTransaction`.";
        throw new lr(new A(S, { details: S }));
      }
      if (a && d.length > 1) {
        const x =
          "`forceAtomic` is not supported on fallback to `eth_sendTransaction`.";
        throw new hr(new A(x, { details: x }));
      }
      const b = [];
      for (const x of d) {
        const S = vo(e, {
          account: f,
          chain: s,
          data: x.data,
          to: x.to,
          value: x.value ? $e(x.value) : void 0,
        });
        b.push(S), i > 0 && (await new Promise((w) => setTimeout(w, i)));
      }
      const p = await Promise.allSettled(b);
      if (p.every((x) => x.status === "rejected")) throw p[0].reason;
      const y = p.map((x) => (x.status === "fulfilled" ? x.value : Dl));
      return { id: Ae([...y, F(s.id, { size: 32 }), Ll]) };
    }
    throw _a(l, { ...t, account: f, chain: t.chain });
  }
}
async function Hl(e, t) {
  async function n(f) {
    if (f.endsWith(Ll.slice(2))) {
      const l = bt(ui(f, -64, -32)),
        h = ui(f, 0, -64)
          .slice(2)
          .match(/.{1,64}/g),
        b = await Promise.all(
          h.map((y) =>
            Dl.slice(2) !== y
              ? e.request(
                  { method: "eth_getTransactionReceipt", params: [`0x${y}`] },
                  { dedupe: !0 }
                )
              : void 0
          )
        ),
        p = b.some((y) => y === null)
          ? 100
          : b.every((y) => y?.status === "0x1")
          ? 200
          : b.every((y) => y?.status === "0x0")
          ? 500
          : 600;
      return {
        atomic: !1,
        chainId: Ge(l),
        receipts: b.filter(Boolean),
        status: p,
        version: "2.0.0",
      };
    }
    return e.request({ method: "wallet_getCallsStatus", params: [f] });
  }
  const {
      atomic: r = !1,
      chainId: s,
      receipts: o,
      version: i = "2.0.0",
      ...a
    } = await n(t.id),
    [c, u] = (() => {
      const f = a.status;
      return f >= 100 && f < 200
        ? ["pending", f]
        : f >= 200 && f < 300
        ? ["success", f]
        : f >= 300 && f < 700
        ? ["failure", f]
        : f === "CONFIRMED"
        ? ["success", 200]
        : f === "PENDING"
        ? ["pending", 100]
        : [void 0, f];
    })();
  return {
    ...a,
    atomic: r,
    chainId: s ? Ge(s) : void 0,
    receipts:
      o?.map((f) => ({
        ...f,
        blockNumber: $e(f.blockNumber),
        gasUsed: $e(f.gasUsed),
        status: Vd[f.status],
      })) ?? [],
    statusCode: u,
    status: c,
    version: i,
  };
}
async function Gl(e, t) {
  const {
      id: n,
      pollingInterval: r = e.pollingInterval,
      status: s = ({ statusCode: p }) => p === 200 || p >= 300,
      retryCount: o = 4,
      retryDelay: i = ({ count: p }) => ~~(1 << p) * 200,
      timeout: a = 6e4,
      throwOnFailure: c = !1,
    } = t,
    u = ee(["waitForCallsStatus", e.uid, n]),
    { promise: f, resolve: d, reject: l } = Ra();
  let h;
  const b = Pt(u, { resolve: d, reject: l }, (p) => {
    const y = Sr(
      async () => {
        const x = (S) => {
          clearTimeout(h), y(), S(), b();
        };
        try {
          const S = await Yr(
            async () => {
              const w = await z(e, Hl, "getCallsStatus")({ id: n });
              if (c && w.status === "failure") throw new a6(w);
              return w;
            },
            { retryCount: o, delay: i }
          );
          if (!s(S)) return;
          x(() => p.resolve(S));
        } catch (S) {
          x(() => p.reject(S));
        }
      },
      { interval: r, emitOnBegin: !0 }
    );
    return y;
  });
  return (
    (h = a
      ? setTimeout(() => {
          b(), clearTimeout(h), l(new c6({ id: n }));
        }, a)
      : void 0),
    await f
  );
}
class c6 extends A {
  constructor({ id: t }) {
    super(
      `Timed out while waiting for call bundle with id "${t}" to be confirmed.`,
      { name: "WaitForCallsStatusTimeoutError" }
    );
  }
}
const Fi = 256;
let ks = Fi,
  Ms;
function Vl(e = 11) {
  if (!Ms || ks + e > Fi * 2) {
    (Ms = ""), (ks = 0);
    for (let t = 0; t < Fi; t++)
      Ms += ((256 + Math.random() * 256) | 0).toString(16).substring(1);
  }
  return Ms.substring(ks, ks++ + e);
}
function xo(e) {
  const {
      batch: t,
      chain: n,
      ccipRead: r,
      key: s = "base",
      name: o = "Base Client",
      type: i = "base",
    } = e,
    a =
      e.experimental_blockTag ??
      (typeof n?.experimental_preconfirmationTime == "number"
        ? "pending"
        : void 0),
    c = n?.blockTime ?? 12e3,
    u = Math.min(Math.max(Math.floor(c / 2), 500), 4e3),
    f = e.pollingInterval ?? u,
    d = e.cacheTime ?? f,
    l = e.account ? Y(e.account) : void 0,
    {
      config: h,
      request: b,
      value: p,
    } = e.transport({ chain: n, pollingInterval: f }),
    y = { ...h, ...p },
    x = {
      account: l,
      batch: t,
      cacheTime: d,
      ccipRead: r,
      chain: n,
      key: s,
      name: o,
      pollingInterval: f,
      request: b,
      transport: y,
      type: i,
      uid: Vl(),
      ...(a ? { experimental_blockTag: a } : {}),
    };
  function S(w) {
    return (v) => {
      const m = v(w);
      for (const E in x) delete m[E];
      const P = { ...w, ...m };
      return Object.assign(P, { extend: S(P) });
    };
  }
  return Object.assign(x, { extend: S(x) });
}
function Xa(e) {
  if (!(e instanceof A)) return !1;
  const t = e.walk((n) => n instanceof Si);
  return t instanceof Si
    ? t.data?.errorName === "HttpError" ||
        t.data?.errorName === "ResolverError" ||
        t.data?.errorName === "ResolverNotContract" ||
        t.data?.errorName === "ResolverNotFound" ||
        t.data?.errorName === "ReverseAddressMismatch" ||
        t.data?.errorName === "UnsupportedResolverProfile"
    : !1;
}
function Wl(e) {
  if (e.length !== 66 || e.indexOf("[") !== 0 || e.indexOf("]") !== 65)
    return null;
  const t = `0x${e.slice(1, 65)}`;
  return He(t) ? t : null;
}
function ji(e) {
  let t = new Uint8Array(32).fill(0);
  if (!e) return ne(t);
  const n = e.split(".");
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const s = Wl(n[r]),
      o = s ? gr(s) : oe(bn(n[r]), "bytes");
    t = oe(Ae([t, o]), "bytes");
  }
  return ne(t);
}
function u6(e) {
  return `[${e.slice(2)}]`;
}
function f6(e) {
  const t = new Uint8Array(32).fill(0);
  return e ? Wl(e) || oe(bn(e)) : ne(t);
}
function ec(e) {
  const t = e.replace(/^\.|\.$/gm, "");
  if (t.length === 0) return new Uint8Array(1);
  const n = new Uint8Array(bn(t).byteLength + 2);
  let r = 0;
  const s = t.split(".");
  for (let o = 0; o < s.length; o++) {
    let i = bn(s[o]);
    i.byteLength > 255 && (i = bn(u6(f6(s[o])))),
      (n[r] = i.length),
      n.set(i, r + 1),
      (r += i.length + 1);
  }
  return n.byteLength !== r + 1 ? n.slice(0, r + 1) : n;
}
async function d6(e, t) {
  const {
      blockNumber: n,
      blockTag: r,
      coinType: s,
      name: o,
      gatewayUrls: i,
      strict: a,
    } = t,
    { chain: c } = e,
    u = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!c)
        throw new Error(
          "client chain not configured. universalResolverAddress is required."
        );
      return xr({ blockNumber: n, chain: c, contract: "ensUniversalResolver" });
    })(),
    f = c?.ensTlds;
  if (f && !f.some((l) => o.endsWith(l))) return null;
  const d = s != null ? [ji(o), BigInt(s)] : [ji(o)];
  try {
    const l = Oe({ abi: Qc, functionName: "addr", args: d }),
      h = {
        address: u,
        abi: Rd,
        functionName: "resolveWithGateways",
        args: [vt(ec(o)), l, i ?? [Es]],
        blockNumber: n,
        blockTag: r,
      },
      p = await z(e, Fe, "readContract")(h);
    if (p[0] === "0x") return null;
    const y = Rn({ abi: Qc, args: d, functionName: "addr", data: p[0] });
    return y === "0x" || bt(y) === "0x00" ? null : y;
  } catch (l) {
    if (a) throw l;
    if (Xa(l)) return null;
    throw l;
  }
}
class l6 extends A {
  constructor({ data: t }) {
    super(
      "Unable to extract image from metadata. The metadata may be malformed or invalid.",
      {
        metaMessages: [
          "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
          "",
          `Provided data: ${JSON.stringify(t)}`,
        ],
        name: "EnsAvatarInvalidMetadataError",
      }
    );
  }
}
class Tr extends A {
  constructor({ reason: t }) {
    super(`ENS NFT avatar URI is invalid. ${t}`, {
      name: "EnsAvatarInvalidNftUriError",
    });
  }
}
class tc extends A {
  constructor({ uri: t }) {
    super(
      `Unable to resolve ENS avatar URI "${t}". The URI may be malformed, invalid, or does not respond with a valid image.`,
      { name: "EnsAvatarUriResolutionError" }
    );
  }
}
class h6 extends A {
  constructor({ namespace: t }) {
    super(
      `ENS NFT avatar namespace "${t}" is not supported. Must be "erc721" or "erc1155".`,
      { name: "EnsAvatarUnsupportedNamespaceError" }
    );
  }
}
const p6 =
    /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/,
  b6 =
    /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/,
  y6 = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/,
  m6 = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function g6(e) {
  try {
    const t = await fetch(e, { method: "HEAD" });
    return t.status === 200
      ? t.headers.get("content-type")?.startsWith("image/")
      : !1;
  } catch (t) {
    return (typeof t == "object" && typeof t.response < "u") ||
      !Object.hasOwn(globalThis, "Image")
      ? !1
      : new Promise((n) => {
          const r = new Image();
          (r.onload = () => {
            n(!0);
          }),
            (r.onerror = () => {
              n(!1);
            }),
            (r.src = e);
        });
  }
}
function mu(e, t) {
  return e ? (e.endsWith("/") ? e.slice(0, -1) : e) : t;
}
function Kl({ uri: e, gatewayUrls: t }) {
  const n = y6.test(e);
  if (n) return { uri: e, isOnChain: !0, isEncoded: n };
  const r = mu(t?.ipfs, "https://ipfs.io"),
    s = mu(t?.arweave, "https://arweave.net"),
    o = e.match(p6),
    { protocol: i, subpath: a, target: c, subtarget: u = "" } = o?.groups || {},
    f = i === "ipns:/" || a === "ipns/",
    d = i === "ipfs:/" || a === "ipfs/" || b6.test(e);
  if (e.startsWith("http") && !f && !d) {
    let h = e;
    return (
      t?.arweave && (h = e.replace(/https:\/\/arweave.net/g, t?.arweave)),
      { uri: h, isOnChain: !1, isEncoded: !1 }
    );
  }
  if ((f || d) && c)
    return {
      uri: `${r}/${f ? "ipns" : "ipfs"}/${c}${u}`,
      isOnChain: !1,
      isEncoded: !1,
    };
  if (i === "ar:/" && c)
    return { uri: `${s}/${c}${u || ""}`, isOnChain: !1, isEncoded: !1 };
  let l = e.replace(m6, "");
  if (
    (l.startsWith("<svg") && (l = `data:image/svg+xml;base64,${btoa(l)}`),
    l.startsWith("data:") || l.startsWith("{"))
  )
    return { uri: l, isOnChain: !0, isEncoded: !1 };
  throw new tc({ uri: e });
}
function Ql(e) {
  if (
    typeof e != "object" ||
    (!("image" in e) && !("image_url" in e) && !("image_data" in e))
  )
    throw new l6({ data: e });
  return e.image || e.image_url || e.image_data;
}
async function w6({ gatewayUrls: e, uri: t }) {
  try {
    const n = await fetch(t).then((s) => s.json());
    return await nc({ gatewayUrls: e, uri: Ql(n) });
  } catch {
    throw new tc({ uri: t });
  }
}
async function nc({ gatewayUrls: e, uri: t }) {
  const { uri: n, isOnChain: r } = Kl({ uri: t, gatewayUrls: e });
  if (r || (await g6(n))) return n;
  throw new tc({ uri: t });
}
function v6(e) {
  let t = e;
  t.startsWith("did:nft:") &&
    (t = t.replace("did:nft:", "").replace(/_/g, "/"));
  const [n, r, s] = t.split("/"),
    [o, i] = n.split(":"),
    [a, c] = r.split(":");
  if (!o || o.toLowerCase() !== "eip155")
    throw new Tr({ reason: "Only EIP-155 supported" });
  if (!i) throw new Tr({ reason: "Chain ID not found" });
  if (!c) throw new Tr({ reason: "Contract address not found" });
  if (!s) throw new Tr({ reason: "Token ID not found" });
  if (!a) throw new Tr({ reason: "ERC namespace not found" });
  return {
    chainID: Number.parseInt(i, 10),
    namespace: a.toLowerCase(),
    contractAddress: c,
    tokenID: s,
  };
}
async function x6(e, { nft: t }) {
  if (t.namespace === "erc721")
    return Fe(e, {
      address: t.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }],
        },
      ],
      functionName: "tokenURI",
      args: [BigInt(t.tokenID)],
    });
  if (t.namespace === "erc1155")
    return Fe(e, {
      address: t.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }],
        },
      ],
      functionName: "uri",
      args: [BigInt(t.tokenID)],
    });
  throw new h6({ namespace: t.namespace });
}
async function E6(e, { gatewayUrls: t, record: n }) {
  return /eip155:/i.test(n)
    ? P6(e, { gatewayUrls: t, record: n })
    : nc({ uri: n, gatewayUrls: t });
}
async function P6(e, { gatewayUrls: t, record: n }) {
  const r = v6(n),
    s = await x6(e, { nft: r }),
    { uri: o, isOnChain: i, isEncoded: a } = Kl({ uri: s, gatewayUrls: t });
  if (i && (o.includes("data:application/json;base64,") || o.startsWith("{"))) {
    const u = a ? atob(o.replace("data:application/json;base64,", "")) : o,
      f = JSON.parse(u);
    return nc({ uri: Ql(f), gatewayUrls: t });
  }
  let c = r.tokenID;
  return (
    r.namespace === "erc1155" && (c = c.replace("0x", "").padStart(64, "0")),
    w6({ gatewayUrls: t, uri: o.replace(/(?:0x)?{id}/, c) })
  );
}
async function Zl(e, t) {
  const {
      blockNumber: n,
      blockTag: r,
      key: s,
      name: o,
      gatewayUrls: i,
      strict: a,
    } = t,
    { chain: c } = e,
    u = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!c)
        throw new Error(
          "client chain not configured. universalResolverAddress is required."
        );
      return xr({ blockNumber: n, chain: c, contract: "ensUniversalResolver" });
    })(),
    f = c?.ensTlds;
  if (f && !f.some((d) => o.endsWith(d))) return null;
  try {
    const d = {
        address: u,
        abi: Rd,
        args: [
          vt(ec(o)),
          Oe({ abi: Kc, functionName: "text", args: [ji(o), s] }),
          i ?? [Es],
        ],
        functionName: "resolveWithGateways",
        blockNumber: n,
        blockTag: r,
      },
      h = await z(e, Fe, "readContract")(d);
    if (h[0] === "0x") return null;
    const b = Rn({ abi: Kc, functionName: "text", data: h[0] });
    return b === "" ? null : b;
  } catch (d) {
    if (a) throw d;
    if (Xa(d)) return null;
    throw d;
  }
}
async function S6(
  e,
  {
    blockNumber: t,
    blockTag: n,
    assetGatewayUrls: r,
    name: s,
    gatewayUrls: o,
    strict: i,
    universalResolverAddress: a,
  }
) {
  const c = await z(
    e,
    Zl,
    "getEnsText"
  )({
    blockNumber: t,
    blockTag: n,
    key: "avatar",
    name: s,
    universalResolverAddress: a,
    gatewayUrls: o,
    strict: i,
  });
  if (!c) return null;
  try {
    return await E6(e, { record: c, gatewayUrls: r });
  } catch {
    return null;
  }
}
async function $6(e, t) {
  const {
      address: n,
      blockNumber: r,
      blockTag: s,
      coinType: o = 60n,
      gatewayUrls: i,
      strict: a,
    } = t,
    { chain: c } = e,
    u = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!c)
        throw new Error(
          "client chain not configured. universalResolverAddress is required."
        );
      return xr({ blockNumber: r, chain: c, contract: "ensUniversalResolver" });
    })();
  try {
    const f = {
        address: u,
        abi: ty,
        args: [n, o, i ?? [Es]],
        functionName: "reverseWithGateways",
        blockNumber: r,
        blockTag: s,
      },
      d = z(e, Fe, "readContract"),
      [l] = await d(f);
    return l || null;
  } catch (f) {
    if (a) throw f;
    if (Xa(f)) return null;
    throw f;
  }
}
async function I6(e, t) {
  const { blockNumber: n, blockTag: r, name: s } = t,
    { chain: o } = e,
    i = (() => {
      if (t.universalResolverAddress) return t.universalResolverAddress;
      if (!o)
        throw new Error(
          "client chain not configured. universalResolverAddress is required."
        );
      return xr({ blockNumber: n, chain: o, contract: "ensUniversalResolver" });
    })(),
    a = o?.ensTlds;
  if (a && !a.some((u) => s.endsWith(u)))
    throw new Error(
      `${s} is not a valid ENS TLD (${a?.join(", ")}) for chain "${
        o.name
      }" (id: ${o.id}).`
    );
  const [c] = await z(
    e,
    Fe,
    "readContract"
  )({
    address: i,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [
          { type: "address" },
          { type: "bytes32" },
          { type: "uint256" },
        ],
        stateMutability: "view",
        type: "function",
      },
    ],
    functionName: "findResolver",
    args: [vt(ec(s))],
    blockNumber: n,
    blockTag: r,
  });
  return c;
}
async function Yl(e, t) {
  const {
      account: n = e.account,
      blockNumber: r,
      blockTag: s = "latest",
      blobs: o,
      data: i,
      gas: a,
      gasPrice: c,
      maxFeePerBlobGas: u,
      maxFeePerGas: f,
      maxPriorityFeePerGas: d,
      to: l,
      value: h,
      ...b
    } = t,
    p = n ? Y(n) : void 0;
  try {
    Yt(t);
    const x = (typeof r == "bigint" ? F(r) : void 0) || s,
      S = e.chain?.formatters?.transactionRequest?.format,
      v = (S || kn)(
        {
          ...xs(b, { format: S }),
          account: p,
          blobs: o,
          data: i,
          gas: a,
          gasPrice: c,
          maxFeePerBlobGas: u,
          maxFeePerGas: f,
          maxPriorityFeePerGas: d,
          to: l,
          value: h,
        },
        "createAccessList"
      ),
      m = await e.request({ method: "eth_createAccessList", params: [v, x] });
    return { accessList: m.accessList, gasUsed: BigInt(m.gasUsed) };
  } catch (y) {
    throw Fd(y, { ...t, account: p, chain: e.chain });
  }
}
async function A6(e) {
  const t = mo(e, { method: "eth_newBlockFilter" }),
    n = await e.request({ method: "eth_newBlockFilter" });
  return { id: n, request: t(n), type: "block" };
}
async function Jl(
  e,
  {
    address: t,
    args: n,
    event: r,
    events: s,
    fromBlock: o,
    strict: i,
    toBlock: a,
  } = {}
) {
  const c = s ?? (r ? [r] : void 0),
    u = mo(e, { method: "eth_newFilter" });
  let f = [];
  c &&
    ((f = [c.flatMap((h) => ps({ abi: [h], eventName: h.name, args: n }))]),
    r && (f = f[0]));
  const d = await e.request({
    method: "eth_newFilter",
    params: [
      {
        address: t,
        fromBlock: typeof o == "bigint" ? F(o) : o,
        toBlock: typeof a == "bigint" ? F(a) : a,
        ...(f.length ? { topics: f } : {}),
      },
    ],
  });
  return {
    abi: c,
    args: n,
    eventName: r ? r.name : void 0,
    fromBlock: o,
    id: d,
    request: u(d),
    strict: !!i,
    toBlock: a,
    type: "event",
  };
}
async function Xl(e) {
  const t = mo(e, { method: "eth_newPendingTransactionFilter" }),
    n = await e.request({ method: "eth_newPendingTransactionFilter" });
  return { id: n, request: t(n), type: "transaction" };
}
async function C6(
  e,
  {
    address: t,
    blockNumber: n,
    blockTag: r = e.experimental_blockTag ?? "latest",
  }
) {
  const s = typeof n == "bigint" ? F(n) : void 0,
    o = await e.request({ method: "eth_getBalance", params: [t, s || r] });
  return BigInt(o);
}
async function O6(e) {
  const t = await e.request({ method: "eth_blobBaseFee" });
  return BigInt(t);
}
async function T6(
  e,
  { blockHash: t, blockNumber: n, blockTag: r = "latest" } = {}
) {
  const s = n !== void 0 ? F(n) : void 0;
  let o;
  return (
    t
      ? (o = await e.request(
          { method: "eth_getBlockTransactionCountByHash", params: [t] },
          { dedupe: !0 }
        ))
      : (o = await e.request(
          { method: "eth_getBlockTransactionCountByNumber", params: [s || r] },
          { dedupe: !!s }
        )),
    Ge(o)
  );
}
async function zi(e, { address: t, blockNumber: n, blockTag: r = "latest" }) {
  const s = n !== void 0 ? F(n) : void 0,
    o = await e.request(
      { method: "eth_getCode", params: [t, s || r] },
      { dedupe: !!s }
    );
  if (o !== "0x") return o;
}
class B6 extends A {
  constructor({ address: t }) {
    super(`No EIP-712 domain found on contract "${t}".`, {
      metaMessages: [
        "Ensure that:",
        `- The contract is deployed at the address "${t}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification.",
      ],
      name: "Eip712DomainNotFoundError",
    });
  }
}
async function R6(e, t) {
  const { address: n, factory: r, factoryData: s } = t;
  try {
    const [o, i, a, c, u, f, d] = await z(
      e,
      Fe,
      "readContract"
    )({
      abi: k6,
      address: n,
      functionName: "eip712Domain",
      factory: r,
      factoryData: s,
    });
    return {
      domain: {
        name: i,
        version: a,
        chainId: Number(c),
        verifyingContract: u,
        salt: f,
      },
      extensions: d,
      fields: o,
    };
  } catch (o) {
    const i = o;
    throw i.name === "ContractFunctionExecutionError" &&
      i.cause.name === "ContractFunctionZeroDataError"
      ? new B6({ address: n })
      : i;
  }
}
const k6 = [
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
];
function M6(e) {
  return {
    baseFeePerGas: e.baseFeePerGas.map((t) => BigInt(t)),
    gasUsedRatio: e.gasUsedRatio,
    oldestBlock: BigInt(e.oldestBlock),
    reward: e.reward?.map((t) => t.map((n) => BigInt(n))),
  };
}
async function _6(
  e,
  {
    blockCount: t,
    blockNumber: n,
    blockTag: r = "latest",
    rewardPercentiles: s,
  }
) {
  const o = typeof n == "bigint" ? F(n) : void 0,
    i = await e.request(
      { method: "eth_feeHistory", params: [F(t), o || r, s] },
      { dedupe: !!o }
    );
  return M6(i);
}
async function N6(e, { filter: t }) {
  const n = t.strict ?? !1,
    s = (await t.request({ method: "eth_getFilterLogs", params: [t.id] })).map(
      (o) => xt(o)
    );
  return t.abi ? Pa({ abi: t.abi, logs: s, strict: n }) : s;
}
function F6(e) {
  return e.map((t) => ({ ...t, value: BigInt(t.value) }));
}
function j6(e) {
  return {
    ...e,
    balance: e.balance ? BigInt(e.balance) : void 0,
    nonce: e.nonce ? Ge(e.nonce) : void 0,
    storageProof: e.storageProof ? F6(e.storageProof) : void 0,
  };
}
async function z6(
  e,
  { address: t, blockNumber: n, blockTag: r, storageKeys: s }
) {
  const o = r ?? "latest",
    i = n !== void 0 ? F(n) : void 0,
    a = await e.request({ method: "eth_getProof", params: [t, s, i || o] });
  return j6(a);
}
async function U6(
  e,
  { address: t, blockNumber: n, blockTag: r = "latest", slot: s }
) {
  const o = n !== void 0 ? F(n) : void 0;
  return await e.request({
    method: "eth_getStorageAt",
    params: [t, s, o || r],
  });
}
async function Eo(
  e,
  { blockHash: t, blockNumber: n, blockTag: r, hash: s, index: o }
) {
  const i = r || "latest",
    a = n !== void 0 ? F(n) : void 0;
  let c = null;
  if (
    (s
      ? (c = await e.request(
          { method: "eth_getTransactionByHash", params: [s] },
          { dedupe: !0 }
        ))
      : t
      ? (c = await e.request(
          {
            method: "eth_getTransactionByBlockHashAndIndex",
            params: [t, F(o)],
          },
          { dedupe: !0 }
        ))
      : (c = await e.request(
          {
            method: "eth_getTransactionByBlockNumberAndIndex",
            params: [a || i, F(o)],
          },
          { dedupe: !!a }
        )),
    !c)
  )
    throw new rd({
      blockHash: t,
      blockNumber: n,
      blockTag: i,
      hash: s,
      index: o,
    });
  return (e.chain?.formatters?.transaction?.format || Hd)(c, "getTransaction");
}
async function L6(e, { hash: t, transactionReceipt: n }) {
  const [r, s] = await Promise.all([
      z(e, Ss, "getBlockNumber")({}),
      t ? z(e, Eo, "getTransaction")({ hash: t }) : void 0,
    ]),
    o = n?.blockNumber || s?.blockNumber;
  return o ? r - o + 1n : 0n;
}
async function Ds(e, { hash: t }) {
  const n = await e.request(
    { method: "eth_getTransactionReceipt", params: [t] },
    { dedupe: !0 }
  );
  if (!n) throw new sd({ hash: t });
  return (e.chain?.formatters?.transactionReceipt?.format || Wd)(
    n,
    "getTransactionReceipt"
  );
}
async function D6(e, t) {
  const {
      account: n,
      authorizationList: r,
      allowFailure: s = !0,
      blockNumber: o,
      blockOverrides: i,
      blockTag: a,
      stateOverride: c,
    } = t,
    u = t.contracts,
    { batchSize: f = t.batchSize ?? 1024, deployless: d = t.deployless ?? !1 } =
      typeof e.batch?.multicall == "object" ? e.batch.multicall : {},
    l = (() => {
      if (t.multicallAddress) return t.multicallAddress;
      if (d) return null;
      if (e.chain)
        return xr({ blockNumber: o, chain: e.chain, contract: "multicall3" });
      throw new Error(
        "client chain not configured. multicallAddress is required."
      );
    })(),
    h = [[]];
  let b = 0,
    p = 0;
  for (let S = 0; S < u.length; S++) {
    const { abi: w, address: v, args: m, functionName: P } = u[S];
    try {
      const E = Oe({ abi: w, args: m, functionName: P });
      (p += (E.length - 2) / 2),
        f > 0 &&
          p > f &&
          h[b].length > 0 &&
          (b++, (p = (E.length - 2) / 2), (h[b] = [])),
        (h[b] = [...h[b], { allowFailure: !0, callData: E, target: v }]);
    } catch (E) {
      const $ = In(E, {
        abi: w,
        address: v,
        args: m,
        docsPath: "/docs/contract/multicall",
        functionName: P,
        sender: n,
      });
      if (!s) throw $;
      h[b] = [...h[b], { allowFailure: !0, callData: "0x", target: v }];
    }
  }
  const y = await Promise.allSettled(
      h.map((S) =>
        z(
          e,
          Fe,
          "readContract"
        )({
          ...(l === null ? { code: Ba } : { address: l }),
          abi: Ys,
          account: n,
          args: [S],
          authorizationList: r,
          blockNumber: o,
          blockOverrides: i,
          blockTag: a,
          functionName: "aggregate3",
          stateOverride: c,
        })
      )
    ),
    x = [];
  for (let S = 0; S < y.length; S++) {
    const w = y[S];
    if (w.status === "rejected") {
      if (!s) throw w.reason;
      for (let m = 0; m < h[S].length; m++)
        x.push({ status: "failure", error: w.reason, result: void 0 });
      continue;
    }
    const v = w.value;
    for (let m = 0; m < v.length; m++) {
      const { returnData: P, success: E } = v[m],
        { callData: $ } = h[S][m],
        { abi: I, address: C, functionName: O, args: R } = u[x.length];
      try {
        if ($ === "0x") throw new ds();
        if (!E) throw new po({ data: P });
        const M = Rn({ abi: I, args: R, data: P, functionName: O });
        x.push(s ? { result: M, status: "success" } : M);
      } catch (M) {
        const D = In(M, {
          abi: I,
          address: C,
          args: R,
          docsPath: "/docs/contract/multicall",
          functionName: O,
        });
        if (!s) throw D;
        x.push({ error: D, result: void 0, status: "failure" });
      }
    }
  }
  if (x.length !== u.length) throw new A("multicall results mismatch");
  return x;
}
async function Ui(e, t) {
  const {
    blockNumber: n,
    blockTag: r = e.experimental_blockTag ?? "latest",
    blocks: s,
    returnFullTransactions: o,
    traceTransfers: i,
    validation: a,
  } = t;
  try {
    const c = [];
    for (const l of s) {
      const h = l.blockOverrides ? Td(l.blockOverrides) : void 0,
        b = l.calls.map((y) => {
          const x = y,
            S = x.account ? Y(x.account) : void 0,
            w = x.abi ? Oe(x) : x.data,
            v = {
              ...x,
              account: S,
              data: x.dataSuffix ? Ae([w || "0x", x.dataSuffix]) : w,
              from: x.from ?? S?.address,
            };
          return Yt(v), kn(v);
        }),
        p = l.stateOverrides ? ka(l.stateOverrides) : void 0;
      c.push({ blockOverrides: h, calls: b, stateOverrides: p });
    }
    const f = (typeof n == "bigint" ? F(n) : void 0) || r;
    return (
      await e.request({
        method: "eth_simulateV1",
        params: [
          {
            blockStateCalls: c,
            returnFullTransactions: o,
            traceTransfers: i,
            validation: a,
          },
          f,
        ],
      })
    ).map((l, h) => ({
      ...Gd(l),
      calls: l.calls.map((b, p) => {
        const { abi: y, args: x, functionName: S, to: w } = s[h].calls[p],
          v = b.error?.data ?? b.returnData,
          m = BigInt(b.gasUsed),
          P = b.logs?.map((C) => xt(C)),
          E = b.status === "0x1" ? "success" : "failure",
          $ =
            y && E === "success" && v !== "0x"
              ? Rn({ abi: y, data: v, functionName: S })
              : null,
          I = (() => {
            if (E === "success") return;
            let C;
            if (
              (b.error?.data === "0x"
                ? (C = new ds())
                : b.error && (C = new po(b.error)),
              !!C)
            )
              return In(C, {
                abi: y ?? [],
                address: w ?? "0x",
                args: x,
                functionName: S ?? "<unknown>",
              });
          })();
        return {
          data: v,
          gasUsed: m,
          logs: P,
          status: E,
          ...(E === "success" ? { result: $ } : { error: I }),
        };
      }),
    }));
  } catch (c) {
    const u = c,
      f = bo(u, {});
    throw f instanceof ys ? u : f;
  }
}
function Li(e) {
  let t = !0,
    n = "",
    r = 0,
    s = "",
    o = !1;
  for (let i = 0; i < e.length; i++) {
    const a = e[i];
    if (
      (["(", ")", ","].includes(a) && (t = !0),
      a === "(" && r++,
      a === ")" && r--,
      !!t)
    ) {
      if (r === 0) {
        if (a === " " && ["event", "function", "error", ""].includes(s)) s = "";
        else if (((s += a), a === ")")) {
          o = !0;
          break;
        }
        continue;
      }
      if (a === " ") {
        e[i - 1] !== "," && n !== "," && n !== ",(" && ((n = ""), (t = !1));
        continue;
      }
      (s += a), (n += a);
    }
  }
  if (!o) throw new W("Unable to normalize signature.");
  return s;
}
function Di(e, t) {
  const n = typeof e,
    r = t.type;
  switch (r) {
    case "address":
      return Oi(e, { strict: !1 });
    case "bool":
      return n === "boolean";
    case "function":
      return n === "string";
    case "string":
      return n === "string";
    default:
      return r === "tuple" && "components" in t
        ? Object.values(t.components).every((s, o) =>
            Di(Object.values(e)[o], s)
          )
        : /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(
            r
          )
        ? n === "number" || n === "bigint"
        : /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(r)
        ? n === "string" || e instanceof Uint8Array
        : /[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(r)
        ? Array.isArray(e) &&
          e.every((s) =>
            Di(s, { ...t, type: r.replace(/(\[[0-9]{0,}\])$/, "") })
          )
        : !1;
  }
}
function e0(e, t, n) {
  for (const r in e) {
    const s = e[r],
      o = t[r];
    if (
      s.type === "tuple" &&
      o.type === "tuple" &&
      "components" in s &&
      "components" in o
    )
      return e0(s.components, o.components, n[r]);
    const i = [s.type, o.type];
    if (
      i.includes("address") && i.includes("bytes20")
        ? !0
        : i.includes("address") && i.includes("string")
        ? Oi(n[r], { strict: !1 })
        : i.includes("address") && i.includes("bytes")
        ? Oi(n[r], { strict: !1 })
        : !1
    )
      return i;
  }
}
function t0(e, t = {}) {
  const { prepare: n = !0 } = t,
    r = Array.isArray(e) || typeof e == "string" ? ru(e) : e;
  return { ...r, ...(n ? { hash: Gn(r) } : {}) };
}
function Po(e, t, n) {
  const { args: r = [], prepare: s = !0 } = n ?? {},
    o = Y1(t, { strict: !1 }),
    i = e.filter((u) =>
      o
        ? u.type === "function" || u.type === "error"
          ? n0(u) === tt(t, 0, 4)
          : u.type === "event"
          ? Gn(u) === t
          : !1
        : "name" in u && u.name === t
    );
  if (i.length === 0) throw new Js({ name: t });
  if (i.length === 1) return { ...i[0], ...(s ? { hash: Gn(i[0]) } : {}) };
  let a;
  for (const u of i) {
    if (!("inputs" in u)) continue;
    if (!r || r.length === 0) {
      if (!u.inputs || u.inputs.length === 0)
        return { ...u, ...(s ? { hash: Gn(u) } : {}) };
      continue;
    }
    if (!u.inputs || u.inputs.length === 0 || u.inputs.length !== r.length)
      continue;
    if (
      r.every((d, l) => {
        const h = "inputs" in u && u.inputs[l];
        return h ? Di(d, h) : !1;
      })
    ) {
      if (a && "inputs" in a && a.inputs) {
        const d = e0(u.inputs, a.inputs, r);
        if (d)
          throw new H6({ abiItem: u, type: d[0] }, { abiItem: a, type: d[1] });
      }
      a = u;
    }
  }
  const c = (() => {
    if (a) return a;
    const [u, ...f] = i;
    return { ...u, overloads: f };
  })();
  if (!c) throw new Js({ name: t });
  return { ...c, ...(s ? { hash: Gn(c) } : {}) };
}
function n0(...e) {
  const t = (() => {
    if (Array.isArray(e[0])) {
      const [n, r] = e;
      return Po(n, r);
    }
    return e[0];
  })();
  return tt(Gn(t), 0, 4);
}
function q6(...e) {
  const t = (() => {
      if (Array.isArray(e[0])) {
        const [r, s] = e;
        return Po(r, s);
      }
      return e[0];
    })(),
    n = typeof t == "string" ? t : Ai(t);
  return Li(n);
}
function Gn(...e) {
  const t = (() => {
    if (Array.isArray(e[0])) {
      const [n, r] = e;
      return Po(n, r);
    }
    return e[0];
  })();
  return typeof t != "string" && "hash" in t && t.hash ? t.hash : pl(Ta(q6(t)));
}
class H6 extends W {
  constructor(t, n) {
    super("Found ambiguous types in overloaded ABI Items.", {
      metaMessages: [
        `\`${t.type}\` in \`${Li(Ai(t.abiItem))}\`, and`,
        `\`${n.type}\` in \`${Li(Ai(n.abiItem))}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI.",
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiItem.AmbiguityError",
      });
  }
}
class Js extends W {
  constructor({ name: t, data: n, type: r = "item" }) {
    const s = t ? ` with name "${t}"` : n ? ` with data "${n}"` : "";
    super(`ABI ${r}${s} not found.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "AbiItem.NotFoundError",
      });
  }
}
function G6(...e) {
  const [t, n] = (() => {
      if (Array.isArray(e[0])) {
        const [o, i] = e;
        return [W6(o), i];
      }
      return e;
    })(),
    { bytecode: r, args: s } = n;
  return We(r, t.inputs?.length && s?.length ? La(t.inputs, s) : "0x");
}
function V6(e) {
  return t0(e);
}
function W6(e) {
  const t = e.find((n) => n.type === "constructor");
  if (!t) throw new Js({ name: "constructor" });
  return t;
}
function K6(...e) {
  const [t, n = []] = (() => {
      if (Array.isArray(e[0])) {
        const [u, f, d] = e;
        return [gu(u, f, { args: d }), d];
      }
      const [a, c] = e;
      return [a, c];
    })(),
    { overloads: r } = t,
    s = r ? gu([t, ...r], t.name, { args: n }) : t,
    o = Q6(s),
    i = n.length > 0 ? La(s.inputs, n) : void 0;
  return i ? We(o, i) : o;
}
function Ln(e, t = {}) {
  return t0(e, t);
}
function gu(e, t, n) {
  const r = Po(e, t, n);
  if (r.type !== "function") throw new Js({ name: t, type: "function" });
  return r;
}
function Q6(e) {
  return n0(e);
}
const Z6 = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  Ze = "0x0000000000000000000000000000000000000000",
  Y6 =
    "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
async function J6(e, t) {
  const {
      blockNumber: n,
      blockTag: r,
      calls: s,
      stateOverrides: o,
      traceAssetChanges: i,
      traceTransfers: a,
      validation: c,
    } = t,
    u = t.account ? Y(t.account) : void 0;
  if (i && !u)
    throw new A("`account` is required when `traceAssetChanges` is true");
  const f = u
      ? G6(V6("constructor(bytes, bytes)"), {
          bytecode: Md,
          args: [Y6, K6(Ln("function getBalance(address)"), [u.address])],
        })
      : void 0,
    d = i
      ? await Promise.all(
          t.calls.map(async (k) => {
            if (!k.data && !k.abi) return;
            const { accessList: j } = await Yl(e, {
              account: u.address,
              ...k,
              data: k.abi ? Oe(k) : k.data,
            });
            return j.map(({ address: L, storageKeys: K }) =>
              K.length > 0 ? L : null
            );
          })
        ).then((k) => k.flat().filter(Boolean))
      : [],
    l = await Ui(e, {
      blockNumber: n,
      blockTag: r,
      blocks: [
        ...(i
          ? [
              { calls: [{ data: f }], stateOverrides: o },
              {
                calls: d.map((k, j) => ({
                  abi: [Ln("function balanceOf(address) returns (uint256)")],
                  functionName: "balanceOf",
                  args: [u.address],
                  to: k,
                  from: Ze,
                  nonce: j,
                })),
                stateOverrides: [{ address: Ze, nonce: 0 }],
              },
            ]
          : []),
        {
          calls: [...s, {}].map((k) => ({ ...k, from: u?.address })),
          stateOverrides: o,
        },
        ...(i
          ? [
              { calls: [{ data: f }] },
              {
                calls: d.map((k, j) => ({
                  abi: [Ln("function balanceOf(address) returns (uint256)")],
                  functionName: "balanceOf",
                  args: [u.address],
                  to: k,
                  from: Ze,
                  nonce: j,
                })),
                stateOverrides: [{ address: Ze, nonce: 0 }],
              },
              {
                calls: d.map((k, j) => ({
                  to: k,
                  abi: [Ln("function decimals() returns (uint256)")],
                  functionName: "decimals",
                  from: Ze,
                  nonce: j,
                })),
                stateOverrides: [{ address: Ze, nonce: 0 }],
              },
              {
                calls: d.map((k, j) => ({
                  to: k,
                  abi: [Ln("function tokenURI(uint256) returns (string)")],
                  functionName: "tokenURI",
                  args: [0n],
                  from: Ze,
                  nonce: j,
                })),
                stateOverrides: [{ address: Ze, nonce: 0 }],
              },
              {
                calls: d.map((k, j) => ({
                  to: k,
                  abi: [Ln("function symbol() returns (string)")],
                  functionName: "symbol",
                  from: Ze,
                  nonce: j,
                })),
                stateOverrides: [{ address: Ze, nonce: 0 }],
              },
            ]
          : []),
      ],
      traceTransfers: a,
      validation: c,
    }),
    h = i ? l[2] : l[0],
    [b, p, , y, x, S, w, v] = i ? l : [],
    { calls: m, ...P } = h,
    E = m.slice(0, -1) ?? [],
    $ = b?.calls ?? [],
    I = p?.calls ?? [],
    C = [...$, ...I].map((k) => (k.status === "success" ? $e(k.data) : null)),
    O = y?.calls ?? [],
    R = x?.calls ?? [],
    M = [...O, ...R].map((k) => (k.status === "success" ? $e(k.data) : null)),
    D = (S?.calls ?? []).map((k) => (k.status === "success" ? k.result : null)),
    T = (v?.calls ?? []).map((k) => (k.status === "success" ? k.result : null)),
    B = (w?.calls ?? []).map((k) => (k.status === "success" ? k.result : null)),
    N = [];
  for (const [k, j] of M.entries()) {
    const L = C[k];
    if (typeof j != "bigint" || typeof L != "bigint") continue;
    const K = D[k - 1],
      Z = T[k - 1],
      Ue = B[k - 1],
      ye =
        k === 0
          ? { address: Z6, decimals: 18, symbol: "ETH" }
          : {
              address: d[k - 1],
              decimals: Ue || K ? Number(K ?? 1) : void 0,
              symbol: Z ?? void 0,
            };
    N.some((ie) => ie.token.address === ye.address) ||
      N.push({ token: ye, value: { pre: L, post: j, diff: j - L } });
  }
  return { assetChanges: N, block: P, results: E };
}
const r0 = "0x6492649264926492649264926492649264926492649264926492649264926492";
function X6(e) {
  if (tt(e, -32) !== r0) throw new n5(e);
}
function e5(e) {
  const { data: t, signature: n, to: r } = e;
  return We(La(ml("address, bytes, bytes"), [r, t, n]), r0);
}
function t5(e) {
  try {
    return X6(e), !0;
  } catch {
    return !1;
  }
}
class n5 extends W {
  constructor(t) {
    super(`Value \`${t}\` is an invalid ERC-6492 wrapped signature.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SignatureErc6492.InvalidWrappedSignatureError",
      });
  }
}
function r5({ r: e, s: t, to: n = "hex", v: r, yParity: s }) {
  const o = (() => {
      if (s === 0 || s === 1) return s;
      if (r && (r === 27n || r === 28n || r >= 35n))
        return r % 2n === 0n ? 1 : 0;
      throw new Error("Invalid `v` or `yParity` value");
    })(),
    i = `0x${new Ha.Signature($e(e), $e(t)).toCompactHex()}${
      o === 0 ? "1b" : "1c"
    }`;
  return n === "hex" ? i : Ne(i);
}
async function So(e, t) {
  const {
      address: n,
      hash: r,
      erc6492VerifierAddress: s = t.universalSignatureVerifierAddress ??
        e.chain?.contracts?.erc6492Verifier?.address,
      multicallAddress: o = t.multicallAddress ??
        e.chain?.contracts?.multicall3?.address,
    } = t,
    i = (() => {
      const a = t.signature;
      return He(a)
        ? a
        : typeof a == "object" && "r" in a && "s" in a
        ? r5(a)
        : ne(a);
    })();
  try {
    return Hg(i)
      ? await s5(e, { ...t, multicallAddress: o, signature: i })
      : await o5(e, { ...t, verifierAddress: s, signature: i });
  } catch (a) {
    try {
      if (vr(Ht(n), await ed({ hash: r, signature: i }))) return !0;
    } catch {}
    if (a instanceof An) return !1;
    throw a;
  }
}
async function s5(e, t) {
  const {
      address: n,
      blockNumber: r,
      blockTag: s,
      hash: o,
      multicallAddress: i,
    } = t,
    { authorization: a, data: c, signature: u, to: f } = qg(t.signature);
  if (
    (await zi(e, { address: n, blockNumber: r, blockTag: s })) ===
    $t(["0xef0100", a.address])
  )
    return await i5(e, {
      address: n,
      blockNumber: r,
      blockTag: s,
      hash: o,
      signature: u,
    });
  const l = {
    address: a.address,
    chainId: Number(a.chainId),
    nonce: Number(a.nonce),
    r: F(a.r, { size: 32 }),
    s: F(a.s, { size: 32 }),
    yParity: a.yParity,
  };
  if (!(await y1({ address: n, authorization: l }))) throw new An();
  const b = await z(
    e,
    Fe,
    "readContract"
  )({
    ...(i ? { address: i } : { code: Ba }),
    authorizationList: [l],
    abi: Ys,
    blockNumber: r,
    blockTag: "pending",
    functionName: "aggregate3",
    args: [
      [
        ...(c ? [{ allowFailure: !0, target: f ?? n, callData: c }] : []),
        {
          allowFailure: !0,
          target: n,
          callData: Oe({
            abi: kd,
            functionName: "isValidSignature",
            args: [o, u],
          }),
        },
      ],
    ],
  });
  if (b[b.length - 1]?.returnData?.startsWith("0x1626ba7e")) return !0;
  throw new An();
}
async function o5(e, t) {
  const {
      address: n,
      factory: r,
      factoryData: s,
      hash: o,
      signature: i,
      verifierAddress: a,
      ...c
    } = t,
    u = await (async () =>
      (!r && !s) || t5(i) ? i : e5({ data: s, signature: i, to: r }))(),
    f = a
      ? {
          to: a,
          data: Oe({ abi: Zc, functionName: "isValidSig", args: [n, o, u] }),
          ...c,
        }
      : { data: co({ abi: Zc, args: [n, o, u], bytecode: sy }), ...c },
    { data: d } = await z(
      e,
      Er,
      "call"
    )(f).catch((l) => {
      throw l instanceof _d ? new An() : l;
    });
  if (tp(d ?? "0x0")) return !0;
  throw new An();
}
async function i5(e, t) {
  const { address: n, blockNumber: r, blockTag: s, hash: o, signature: i } = t;
  if (
    (
      await z(
        e,
        Fe,
        "readContract"
      )({
        address: n,
        abi: kd,
        args: [o, i],
        blockNumber: r,
        blockTag: s,
        functionName: "isValidSignature",
      }).catch((c) => {
        throw c instanceof Nd ? new An() : c;
      })
    ).startsWith("0x1626ba7e")
  )
    return !0;
  throw new An();
}
class An extends Error {}
async function a5(
  e,
  { address: t, message: n, factory: r, factoryData: s, signature: o, ...i }
) {
  const a = Qd(n);
  return So(e, {
    address: t,
    factory: r,
    factoryData: s,
    hash: a,
    signature: o,
    ...i,
  });
}
async function c5(e, t) {
  const {
      address: n,
      factory: r,
      factoryData: s,
      signature: o,
      message: i,
      primaryType: a,
      types: c,
      domain: u,
      ...f
    } = t,
    d = Fy({ message: i, primaryType: a, types: c, domain: u });
  return So(e, {
    address: n,
    factory: r,
    factoryData: s,
    hash: d,
    signature: o,
    ...f,
  });
}
function s0(
  e,
  {
    emitOnBegin: t = !1,
    emitMissed: n = !1,
    onBlockNumber: r,
    onError: s,
    poll: o,
    pollingInterval: i = e.pollingInterval,
  }
) {
  const a =
    typeof o < "u"
      ? o
      : !(
          e.transport.type === "webSocket" ||
          e.transport.type === "ipc" ||
          (e.transport.type === "fallback" &&
            (e.transport.transports[0].config.type === "webSocket" ||
              e.transport.transports[0].config.type === "ipc"))
        );
  let c;
  return a
    ? (() => {
        const d = ee(["watchBlockNumber", e.uid, t, n, i]);
        return Pt(d, { onBlockNumber: r, onError: s }, (l) =>
          Sr(
            async () => {
              try {
                const h = await z(e, Ss, "getBlockNumber")({ cacheTime: 0 });
                if (c !== void 0) {
                  if (h === c) return;
                  if (h - c > 1 && n)
                    for (let b = c + 1n; b < h; b++)
                      l.onBlockNumber(b, c), (c = b);
                }
                (c === void 0 || h > c) && (l.onBlockNumber(h, c), (c = h));
              } catch (h) {
                l.onError?.(h);
              }
            },
            { emitOnBegin: t, interval: i }
          )
        );
      })()
    : (() => {
        const d = ee(["watchBlockNumber", e.uid, t, n]);
        return Pt(d, { onBlockNumber: r, onError: s }, (l) => {
          let h = !0,
            b = () => (h = !1);
          return (
            (async () => {
              try {
                const p = (() => {
                    if (e.transport.type === "fallback") {
                      const x = e.transport.transports.find(
                        (S) =>
                          S.config.type === "webSocket" ||
                          S.config.type === "ipc"
                      );
                      return x ? x.value : e.transport;
                    }
                    return e.transport;
                  })(),
                  { unsubscribe: y } = await p.subscribe({
                    params: ["newHeads"],
                    onData(x) {
                      if (!h) return;
                      const S = $e(x.result?.number);
                      l.onBlockNumber(S, c), (c = S);
                    },
                    onError(x) {
                      l.onError?.(x);
                    },
                  });
                (b = y), h || b();
              } catch (p) {
                s?.(p);
              }
            })(),
            () => b()
          );
        });
      })();
}
async function rc(e, t) {
  const {
      checkReplacement: n = !0,
      confirmations: r = 1,
      hash: s,
      onReplaced: o,
      retryCount: i = 6,
      retryDelay: a = ({ count: m }) => ~~(1 << m) * 200,
      timeout: c = 18e4,
    } = t,
    u = ee(["waitForTransactionReceipt", e.uid, s]),
    f = t.pollingInterval
      ? t.pollingInterval
      : e.chain?.experimental_preconfirmationTime
      ? e.chain.experimental_preconfirmationTime
      : e.pollingInterval;
  let d,
    l,
    h,
    b = !1,
    p,
    y;
  const { promise: x, resolve: S, reject: w } = Ra(),
    v = c
      ? setTimeout(() => {
          y?.(), p?.(), w(new Qb({ hash: s }));
        }, c)
      : void 0;
  return (
    (p = Pt(u, { onReplaced: o, resolve: S, reject: w }, async (m) => {
      if (
        ((h = await z(
          e,
          Ds,
          "getTransactionReceipt"
        )({ hash: s }).catch(() => {})),
        h && r <= 1)
      ) {
        clearTimeout(v), m.resolve(h), p?.();
        return;
      }
      y = z(
        e,
        s0,
        "watchBlockNumber"
      )({
        emitMissed: !0,
        emitOnBegin: !0,
        poll: !0,
        pollingInterval: f,
        async onBlockNumber(P) {
          const E = (I) => {
            clearTimeout(v), y?.(), I(), p?.();
          };
          let $ = P;
          if (!b)
            try {
              if (h) {
                if (r > 1 && (!h.blockNumber || $ - h.blockNumber + 1n < r))
                  return;
                E(() => m.resolve(h));
                return;
              }
              if (
                (n &&
                  !d &&
                  ((b = !0),
                  await Yr(
                    async () => {
                      (d = await z(e, Eo, "getTransaction")({ hash: s })),
                        d.blockNumber && ($ = d.blockNumber);
                    },
                    { delay: a, retryCount: i }
                  ),
                  (b = !1)),
                (h = await z(e, Ds, "getTransactionReceipt")({ hash: s })),
                r > 1 && (!h.blockNumber || $ - h.blockNumber + 1n < r))
              )
                return;
              E(() => m.resolve(h));
            } catch (I) {
              if (I instanceof rd || I instanceof sd) {
                if (!d) {
                  b = !1;
                  return;
                }
                try {
                  (l = d), (b = !0);
                  const C = await Yr(
                    () =>
                      z(
                        e,
                        et,
                        "getBlock"
                      )({ blockNumber: $, includeTransactions: !0 }),
                    {
                      delay: a,
                      retryCount: i,
                      shouldRetry: ({ error: M }) => M instanceof jl,
                    }
                  );
                  b = !1;
                  const O = C.transactions.find(
                    ({ from: M, nonce: D }) => M === l.from && D === l.nonce
                  );
                  if (
                    !O ||
                    ((h = await z(
                      e,
                      Ds,
                      "getTransactionReceipt"
                    )({ hash: O.hash })),
                    r > 1 && (!h.blockNumber || $ - h.blockNumber + 1n < r))
                  )
                    return;
                  let R = "replaced";
                  O.to === l.to && O.value === l.value && O.input === l.input
                    ? (R = "repriced")
                    : O.from === O.to && O.value === 0n && (R = "cancelled"),
                    E(() => {
                      m.onReplaced?.({
                        reason: R,
                        replacedTransaction: l,
                        transaction: O,
                        transactionReceipt: h,
                      }),
                        m.resolve(h);
                    });
                } catch (C) {
                  E(() => m.reject(C));
                }
              } else E(() => m.reject(I));
            }
        },
      });
    })),
    x
  );
}
function u5(
  e,
  {
    blockTag: t = e.experimental_blockTag ?? "latest",
    emitMissed: n = !1,
    emitOnBegin: r = !1,
    onBlock: s,
    onError: o,
    includeTransactions: i,
    poll: a,
    pollingInterval: c = e.pollingInterval,
  }
) {
  const u =
      typeof a < "u"
        ? a
        : !(
            e.transport.type === "webSocket" ||
            e.transport.type === "ipc" ||
            (e.transport.type === "fallback" &&
              (e.transport.transports[0].config.type === "webSocket" ||
                e.transport.transports[0].config.type === "ipc"))
          ),
    f = i ?? !1;
  let d;
  return u
    ? (() => {
        const b = ee(["watchBlocks", e.uid, t, n, r, f, c]);
        return Pt(b, { onBlock: s, onError: o }, (p) =>
          Sr(
            async () => {
              try {
                const y = await z(
                  e,
                  et,
                  "getBlock"
                )({ blockTag: t, includeTransactions: f });
                if (y.number !== null && d?.number != null) {
                  if (y.number === d.number) return;
                  if (y.number - d.number > 1 && n)
                    for (let x = d?.number + 1n; x < y.number; x++) {
                      const S = await z(
                        e,
                        et,
                        "getBlock"
                      )({ blockNumber: x, includeTransactions: f });
                      p.onBlock(S, d), (d = S);
                    }
                }
                (d?.number == null ||
                  (t === "pending" && y?.number == null) ||
                  (y.number !== null && y.number > d.number)) &&
                  (p.onBlock(y, d), (d = y));
              } catch (y) {
                p.onError?.(y);
              }
            },
            { emitOnBegin: r, interval: c }
          )
        );
      })()
    : (() => {
        let b = !0,
          p = !0,
          y = () => (b = !1);
        return (
          (async () => {
            try {
              r &&
                z(
                  e,
                  et,
                  "getBlock"
                )({ blockTag: t, includeTransactions: f })
                  .then((w) => {
                    b && p && (s(w, void 0), (p = !1));
                  })
                  .catch(o);
              const x = (() => {
                  if (e.transport.type === "fallback") {
                    const w = e.transport.transports.find(
                      (v) =>
                        v.config.type === "webSocket" || v.config.type === "ipc"
                    );
                    return w ? w.value : e.transport;
                  }
                  return e.transport;
                })(),
                { unsubscribe: S } = await x.subscribe({
                  params: ["newHeads"],
                  async onData(w) {
                    if (!b) return;
                    const v = await z(
                      e,
                      et,
                      "getBlock"
                    )({
                      blockNumber: w.result?.number,
                      includeTransactions: f,
                    }).catch(() => {});
                    b && (s(v, d), (p = !1), (d = v));
                  },
                  onError(w) {
                    o?.(w);
                  },
                });
              (y = S), b || y();
            } catch (x) {
              o?.(x);
            }
          })(),
          () => y()
        );
      })();
}
function f5(
  e,
  {
    address: t,
    args: n,
    batch: r = !0,
    event: s,
    events: o,
    fromBlock: i,
    onError: a,
    onLogs: c,
    poll: u,
    pollingInterval: f = e.pollingInterval,
    strict: d,
  }
) {
  const l =
      typeof u < "u"
        ? u
        : typeof i == "bigint"
        ? !0
        : !(
            e.transport.type === "webSocket" ||
            e.transport.type === "ipc" ||
            (e.transport.type === "fallback" &&
              (e.transport.transports[0].config.type === "webSocket" ||
                e.transport.transports[0].config.type === "ipc"))
          ),
    h = d ?? !1;
  return l
    ? (() => {
        const y = ee(["watchEvent", t, n, r, e.uid, s, f, i]);
        return Pt(y, { onLogs: c, onError: a }, (x) => {
          let S;
          i !== void 0 && (S = i - 1n);
          let w,
            v = !1;
          const m = Sr(
            async () => {
              if (!v) {
                try {
                  w = await z(
                    e,
                    Jl,
                    "createEventFilter"
                  )({
                    address: t,
                    args: n,
                    event: s,
                    events: o,
                    strict: h,
                    fromBlock: i,
                  });
                } catch {}
                v = !0;
                return;
              }
              try {
                let P;
                if (w) P = await z(e, go, "getFilterChanges")({ filter: w });
                else {
                  const E = await z(e, Ss, "getBlockNumber")({});
                  S && S !== E
                    ? (P = await z(
                        e,
                        Ya,
                        "getLogs"
                      )({
                        address: t,
                        args: n,
                        event: s,
                        events: o,
                        fromBlock: S + 1n,
                        toBlock: E,
                      }))
                    : (P = []),
                    (S = E);
                }
                if (P.length === 0) return;
                if (r) x.onLogs(P);
                else for (const E of P) x.onLogs([E]);
              } catch (P) {
                w && P instanceof En && (v = !1), x.onError?.(P);
              }
            },
            { emitOnBegin: !0, interval: f }
          );
          return async () => {
            w && (await z(e, wo, "uninstallFilter")({ filter: w })), m();
          };
        });
      })()
    : (() => {
        let y = !0,
          x = () => (y = !1);
        return (
          (async () => {
            try {
              const S = (() => {
                  if (e.transport.type === "fallback") {
                    const P = e.transport.transports.find(
                      (E) =>
                        E.config.type === "webSocket" || E.config.type === "ipc"
                    );
                    return P ? P.value : e.transport;
                  }
                  return e.transport;
                })(),
                w = o ?? (s ? [s] : void 0);
              let v = [];
              w &&
                ((v = [
                  w.flatMap((E) =>
                    ps({ abi: [E], eventName: E.name, args: n })
                  ),
                ]),
                s && (v = v[0]));
              const { unsubscribe: m } = await S.subscribe({
                params: ["logs", { address: t, topics: v }],
                onData(P) {
                  if (!y) return;
                  const E = P.result;
                  try {
                    const { eventName: $, args: I } = Ea({
                        abi: w ?? [],
                        data: E.data,
                        topics: E.topics,
                        strict: h,
                      }),
                      C = xt(E, { args: I, eventName: $ });
                    c([C]);
                  } catch ($) {
                    let I, C;
                    if ($ instanceof Mr || $ instanceof io) {
                      if (d) return;
                      (I = $.abiItem.name),
                        (C = $.abiItem.inputs?.some(
                          (R) => !("name" in R && R.name)
                        ));
                    }
                    const O = xt(E, { args: C ? [] : {}, eventName: I });
                    c([O]);
                  }
                },
                onError(P) {
                  a?.(P);
                },
              });
              (x = m), y || x();
            } catch (S) {
              a?.(S);
            }
          })(),
          () => x()
        );
      })();
}
function d5(
  e,
  {
    batch: t = !0,
    onError: n,
    onTransactions: r,
    poll: s,
    pollingInterval: o = e.pollingInterval,
  }
) {
  return (
    typeof s < "u"
      ? s
      : e.transport.type !== "webSocket" && e.transport.type !== "ipc"
  )
    ? (() => {
        const u = ee(["watchPendingTransactions", e.uid, t, o]);
        return Pt(u, { onTransactions: r, onError: n }, (f) => {
          let d;
          const l = Sr(
            async () => {
              try {
                if (!d)
                  try {
                    d = await z(e, Xl, "createPendingTransactionFilter")({});
                    return;
                  } catch (b) {
                    throw (l(), b);
                  }
                const h = await z(e, go, "getFilterChanges")({ filter: d });
                if (h.length === 0) return;
                if (t) f.onTransactions(h);
                else for (const b of h) f.onTransactions([b]);
              } catch (h) {
                f.onError?.(h);
              }
            },
            { emitOnBegin: !0, interval: o }
          );
          return async () => {
            d && (await z(e, wo, "uninstallFilter")({ filter: d })), l();
          };
        });
      })()
    : (() => {
        let u = !0,
          f = () => (u = !1);
        return (
          (async () => {
            try {
              const { unsubscribe: d } = await e.transport.subscribe({
                params: ["newPendingTransactions"],
                onData(l) {
                  if (!u) return;
                  const h = l.result;
                  r([h]);
                },
                onError(l) {
                  n?.(l);
                },
              });
              (f = d), u || f();
            } catch (d) {
              n?.(d);
            }
          })(),
          () => f()
        );
      })();
}
function l5(e) {
  const { scheme: t, statement: n, ...r } = e.match(h5)?.groups ?? {},
    {
      chainId: s,
      expirationTime: o,
      issuedAt: i,
      notBefore: a,
      requestId: c,
      ...u
    } = e.match(p5)?.groups ?? {},
    f = e
      .split("Resources:")[1]
      ?.split(
        `
- `
      )
      .slice(1);
  return {
    ...r,
    ...u,
    ...(s ? { chainId: Number(s) } : {}),
    ...(o ? { expirationTime: new Date(o) } : {}),
    ...(i ? { issuedAt: new Date(i) } : {}),
    ...(a ? { notBefore: new Date(a) } : {}),
    ...(c ? { requestId: c } : {}),
    ...(f ? { resources: f } : {}),
    ...(t ? { scheme: t } : {}),
    ...(n ? { statement: n } : {}),
  };
}
const h5 =
    /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/,
  p5 =
    /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;
function b5(e) {
  const {
    address: t,
    domain: n,
    message: r,
    nonce: s,
    scheme: o,
    time: i = new Date(),
  } = e;
  if (
    (n && r.domain !== n) ||
    (s && r.nonce !== s) ||
    (o && r.scheme !== o) ||
    (r.expirationTime && i >= r.expirationTime) ||
    (r.notBefore && i < r.notBefore)
  )
    return !1;
  try {
    if (
      !r.address ||
      !Ie(r.address, { strict: !1 }) ||
      (t && !vr(r.address, t))
    )
      return !1;
  } catch {
    return !1;
  }
  return !0;
}
async function y5(e, t) {
  const {
      address: n,
      domain: r,
      message: s,
      nonce: o,
      scheme: i,
      signature: a,
      time: c = new Date(),
      ...u
    } = t,
    f = l5(s);
  if (
    !f.address ||
    !b5({ address: n, domain: r, message: f, nonce: o, scheme: i, time: c })
  )
    return !1;
  const l = Qd(s);
  return So(e, { address: f.address, hash: l, signature: a, ...u });
}
async function sc(
  e,
  { serializedTransaction: t, throwOnReceiptRevert: n, timeout: r }
) {
  const s = await e.request(
      { method: "eth_sendRawTransactionSync", params: r ? [t, F(r)] : [t] },
      { retryCount: 0 }
    ),
    i = (e.chain?.formatters?.transactionReceipt?.format || Wd)(s);
  if (i.status === "reverted" && n) throw new od({ receipt: i });
  return i;
}
function o0(e) {
  return {
    call: (t) => Er(e, t),
    createAccessList: (t) => Yl(e, t),
    createBlockFilter: () => A6(e),
    createContractEventFilter: (t) => Fl(e, t),
    createEventFilter: (t) => Jl(e, t),
    createPendingTransactionFilter: () => Xl(e),
    estimateContractGas: (t) => Jg(e, t),
    estimateGas: (t) => Za(e, t),
    getBalance: (t) => C6(e, t),
    getBlobBaseFee: () => O6(e),
    getBlock: (t) => et(e, t),
    getBlockNumber: (t) => Ss(e, t),
    getBlockTransactionCount: (t) => T6(e, t),
    getBytecode: (t) => zi(e, t),
    getChainId: () => Mn(e),
    getCode: (t) => zi(e, t),
    getContractEvents: (t) => Ul(e, t),
    getEip712Domain: (t) => R6(e, t),
    getEnsAddress: (t) => d6(e, t),
    getEnsAvatar: (t) => S6(e, t),
    getEnsName: (t) => $6(e, t),
    getEnsResolver: (t) => I6(e, t),
    getEnsText: (t) => Zl(e, t),
    getFeeHistory: (t) => _6(e, t),
    estimateFeesPerGas: (t) => Yg(e, t),
    getFilterChanges: (t) => go(e, t),
    getFilterLogs: (t) => N6(e, t),
    getGasPrice: () => Ka(e),
    getLogs: (t) => Ya(e, t),
    getProof: (t) => z6(e, t),
    estimateMaxPriorityFeePerGas: (t) => Zg(e, t),
    getStorageAt: (t) => U6(e, t),
    getTransaction: (t) => Eo(e, t),
    getTransactionConfirmations: (t) => L6(e, t),
    getTransactionCount: (t) => Na(e, t),
    getTransactionReceipt: (t) => Ds(e, t),
    multicall: (t) => D6(e, t),
    prepareTransactionRequest: (t) => Ps(e, t),
    readContract: (t) => Fe(e, t),
    sendRawTransaction: (t) => Ja(e, t),
    sendRawTransactionSync: (t) => sc(e, t),
    simulate: (t) => Ui(e, t),
    simulateBlocks: (t) => Ui(e, t),
    simulateCalls: (t) => J6(e, t),
    simulateContract: (t) => Xg(e, t),
    verifyHash: (t) => So(e, t),
    verifyMessage: (t) => a5(e, t),
    verifySiweMessage: (t) => y5(e, t),
    verifyTypedData: (t) => c5(e, t),
    uninstallFilter: (t) => wo(e, t),
    waitForTransactionReceipt: (t) => rc(e, t),
    watchBlocks: (t) => u5(e, t),
    watchBlockNumber: (t) => s0(e, t),
    watchContractEvent: (t) => i6(e, t),
    watchEvent: (t) => f5(e, t),
    watchPendingTransactions: (t) => d5(e, t),
  };
}
function Cv(e) {
  const { key: t = "public", name: n = "Public Client" } = e;
  return xo({ ...e, key: t, name: n, type: "publicClient" }).extend(o0);
}
async function m5(e, { chain: t }) {
  const {
    id: n,
    name: r,
    nativeCurrency: s,
    rpcUrls: o,
    blockExplorers: i,
  } = t;
  await e.request(
    {
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: F(n),
          chainName: r,
          nativeCurrency: s,
          rpcUrls: o.default.http,
          blockExplorerUrls: i
            ? Object.values(i).map(({ url: a }) => a)
            : void 0,
        },
      ],
    },
    { dedupe: !0, retryCount: 0 }
  );
}
function g5(e, t) {
  const { abi: n, args: r, bytecode: s, ...o } = t,
    i = co({ abi: n, args: r, bytecode: s });
  return vo(e, { ...o, ...(o.authorizationList ? { to: null } : {}), data: i });
}
async function w5(e) {
  return e.account?.type === "local"
    ? [e.account.address]
    : (await e.request({ method: "eth_accounts" }, { dedupe: !0 })).map((n) =>
        fs(n)
      );
}
async function v5(e, t = {}) {
  const { account: n = e.account, chainId: r } = t,
    s = n ? Y(n) : void 0,
    o = r ? [s?.address, [F(r)]] : [s?.address],
    i = await e.request({ method: "wallet_getCapabilities", params: o }),
    a = {};
  for (const [c, u] of Object.entries(i)) {
    a[Number(c)] = {};
    for (let [f, d] of Object.entries(u))
      f === "addSubAccount" && (f = "unstable_addSubAccount"),
        (a[Number(c)][f] = d);
  }
  return typeof r == "number" ? a[r] : a;
}
async function x5(e) {
  return await e.request({ method: "wallet_getPermissions" }, { dedupe: !0 });
}
async function i0(e, t) {
  const { account: n = e.account, chainId: r, nonce: s } = t;
  if (!n) throw new Jt({ docsPath: "/docs/eip7702/prepareAuthorization" });
  const o = Y(n),
    i = (() => {
      if (t.executor) return t.executor === "self" ? t.executor : Y(t.executor);
    })(),
    a = { address: t.contractAddress ?? t.address, chainId: r, nonce: s };
  return (
    typeof a.chainId > "u" &&
      (a.chainId = e.chain?.id ?? (await z(e, Mn, "getChainId")({}))),
    typeof a.nonce > "u" &&
      ((a.nonce = await z(
        e,
        Na,
        "getTransactionCount"
      )({ address: o.address, blockTag: "pending" })),
      (i === "self" || (i?.address && vr(i.address, o.address))) &&
        (a.nonce += 1)),
    a
  );
}
async function E5(e) {
  return (
    await e.request(
      { method: "eth_requestAccounts" },
      { dedupe: !0, retryCount: 0 }
    )
  ).map((n) => Ht(n));
}
async function P5(e, t) {
  return e.request(
    { method: "wallet_requestPermissions", params: [t] },
    { retryCount: 0 }
  );
}
async function S5(e, t) {
  const { chain: n = e.chain } = t,
    r = t.timeout ?? Math.max((n?.blockTime ?? 0) * 3, 5e3),
    s = await ql(e, t);
  return await Gl(e, { ...t, id: s.id, timeout: r });
}
const Xo = new wr(128);
async function a0(e, t) {
  const {
      account: n = e.account,
      chain: r = e.chain,
      accessList: s,
      authorizationList: o,
      blobs: i,
      data: a,
      gas: c,
      gasPrice: u,
      maxFeePerBlobGas: f,
      maxFeePerGas: d,
      maxPriorityFeePerGas: l,
      nonce: h,
      pollingInterval: b,
      throwOnReceiptRevert: p,
      type: y,
      value: x,
      ...S
    } = t,
    w = t.timeout ?? Math.max((r?.blockTime ?? 0) * 3, 5e3);
  if (typeof n > "u")
    throw new Jt({ docsPath: "/docs/actions/wallet/sendTransactionSync" });
  const v = n ? Y(n) : null;
  try {
    Yt(t);
    const m = await (async () => {
      if (t.to) return t.to;
      if (t.to !== null && o && o.length > 0)
        return await uo({ authorization: o[0] }).catch(() => {
          throw new A(
            "`to` is required. Could not infer from `authorizationList`."
          );
        });
    })();
    if (v?.type === "json-rpc" || v === null) {
      let P;
      r !== null &&
        ((P = await z(e, Mn, "getChainId")({})),
        Ma({ currentChainId: P, chain: r }));
      const E = e.chain?.formatters?.transactionRequest?.format,
        I = (E || kn)(
          {
            ...xs(S, { format: E }),
            accessList: s,
            account: v,
            authorizationList: o,
            blobs: i,
            chainId: P,
            data: a,
            gas: c,
            gasPrice: u,
            maxFeePerBlobGas: f,
            maxFeePerGas: d,
            maxPriorityFeePerGas: l,
            nonce: h,
            to: m,
            type: y,
            value: x,
          },
          "sendTransaction"
        ),
        C = Xo.get(e.uid),
        O = C ? "wallet_sendTransaction" : "eth_sendTransaction",
        R = await (async () => {
          try {
            return await e.request(
              { method: O, params: [I] },
              { retryCount: 0 }
            );
          } catch (D) {
            if (C === !1) throw D;
            const T = D;
            if (
              T.name === "InvalidInputRpcError" ||
              T.name === "InvalidParamsRpcError" ||
              T.name === "MethodNotFoundRpcError" ||
              T.name === "MethodNotSupportedRpcError"
            )
              return await e
                .request(
                  { method: "wallet_sendTransaction", params: [I] },
                  { retryCount: 0 }
                )
                .then((B) => (Xo.set(e.uid, !0), B))
                .catch((B) => {
                  const N = B;
                  throw N.name === "MethodNotFoundRpcError" ||
                    N.name === "MethodNotSupportedRpcError"
                    ? (Xo.set(e.uid, !1), T)
                    : N;
                });
            throw T;
          }
        })(),
        M = await z(
          e,
          rc,
          "waitForTransactionReceipt"
        )({ checkReplacement: !1, hash: R, pollingInterval: b, timeout: w });
      if (p && M.status === "reverted") throw new od({ receipt: M });
      return M;
    }
    if (v?.type === "local") {
      const P = await z(
          e,
          Ps,
          "prepareTransactionRequest"
        )({
          account: v,
          accessList: s,
          authorizationList: o,
          blobs: i,
          chain: r,
          data: a,
          gas: c,
          gasPrice: u,
          maxFeePerBlobGas: f,
          maxFeePerGas: d,
          maxPriorityFeePerGas: l,
          nonce: h,
          nonceManager: v.nonceManager,
          parameters: [...Qa, "sidecars"],
          type: y,
          value: x,
          ...S,
          to: m,
        }),
        E = r?.serializers?.transaction,
        $ = await v.signTransaction(P, { serializer: E });
      return await z(
        e,
        sc,
        "sendRawTransactionSync"
      )({ serializedTransaction: $, throwOnReceiptRevert: p });
    }
    throw v?.type === "smart"
      ? new gn({
          metaMessages: [
            "Consider using the `sendUserOperation` Action instead.",
          ],
          docsPath: "/docs/actions/bundler/sendUserOperation",
          type: "smart",
        })
      : new gn({
          docsPath: "/docs/actions/wallet/sendTransactionSync",
          type: v?.type,
        });
  } catch (m) {
    throw m instanceof gn
      ? m
      : _a(m, { ...t, account: v, chain: t.chain || void 0 });
  }
}
async function $5(e, t) {
  const { id: n } = t;
  await e.request({ method: "wallet_showCallsStatus", params: [n] });
}
async function I5(e, t) {
  const { account: n = e.account } = t;
  if (!n) throw new Jt({ docsPath: "/docs/eip7702/signAuthorization" });
  const r = Y(n);
  if (!r.signAuthorization)
    throw new gn({
      docsPath: "/docs/eip7702/signAuthorization",
      metaMessages: [
        "The `signAuthorization` Action does not support JSON-RPC Accounts.",
      ],
      type: r.type,
    });
  const s = await i0(e, t);
  return r.signAuthorization(s);
}
async function A5(e, { account: t = e.account, message: n }) {
  if (!t) throw new Jt({ docsPath: "/docs/actions/wallet/signMessage" });
  const r = Y(t);
  if (r.signMessage) return r.signMessage({ message: n });
  const s =
    typeof n == "string"
      ? vn(n)
      : n.raw instanceof Uint8Array
      ? vt(n.raw)
      : n.raw;
  return e.request(
    { method: "personal_sign", params: [s, r.address] },
    { retryCount: 0 }
  );
}
async function C5(e, t) {
  const { account: n = e.account, chain: r = e.chain, ...s } = t;
  if (!n) throw new Jt({ docsPath: "/docs/actions/wallet/signTransaction" });
  const o = Y(n);
  Yt({ account: o, ...t });
  const i = await z(e, Mn, "getChainId")({});
  r !== null && Ma({ currentChainId: i, chain: r });
  const c =
    (r?.formatters || e.chain?.formatters)?.transactionRequest?.format || kn;
  return o.signTransaction
    ? o.signTransaction(
        { ...s, chainId: i },
        { serializer: e.chain?.serializers?.transaction }
      )
    : await e.request(
        {
          method: "eth_signTransaction",
          params: [
            {
              ...c({ ...s, account: o }, "signTransaction"),
              chainId: F(i),
              from: o.address,
            },
          ],
        },
        { retryCount: 0 }
      );
}
async function O5(e, t) {
  const { account: n = e.account, domain: r, message: s, primaryType: o } = t;
  if (!n) throw new Jt({ docsPath: "/docs/actions/wallet/signTypedData" });
  const i = Y(n),
    a = { EIP712Domain: Yd({ domain: r }), ...t.types };
  if (
    (Zd({ domain: r, message: s, primaryType: o, types: a }), i.signTypedData)
  )
    return i.signTypedData({ domain: r, message: s, primaryType: o, types: a });
  const c = _y({ domain: r, message: s, primaryType: o, types: a });
  return e.request(
    { method: "eth_signTypedData_v4", params: [i.address, c] },
    { retryCount: 0 }
  );
}
async function T5(e, { id: t }) {
  await e.request(
    { method: "wallet_switchEthereumChain", params: [{ chainId: F(t) }] },
    { retryCount: 0 }
  );
}
async function B5(e, t) {
  return await e.request(
    { method: "wallet_watchAsset", params: t },
    { retryCount: 0 }
  );
}
async function R5(e, t) {
  return pr.internal(e, a0, "sendTransactionSync", t);
}
function k5(e) {
  return {
    addChain: (t) => m5(e, t),
    deployContract: (t) => g5(e, t),
    getAddresses: () => w5(e),
    getCallsStatus: (t) => Hl(e, t),
    getCapabilities: (t) => v5(e, t),
    getChainId: () => Mn(e),
    getPermissions: () => x5(e),
    prepareAuthorization: (t) => i0(e, t),
    prepareTransactionRequest: (t) => Ps(e, t),
    requestAddresses: () => E5(e),
    requestPermissions: (t) => P5(e, t),
    sendCalls: (t) => ql(e, t),
    sendCallsSync: (t) => S5(e, t),
    sendRawTransaction: (t) => Ja(e, t),
    sendRawTransactionSync: (t) => sc(e, t),
    sendTransaction: (t) => vo(e, t),
    sendTransactionSync: (t) => a0(e, t),
    showCallsStatus: (t) => $5(e, t),
    signAuthorization: (t) => I5(e, t),
    signMessage: (t) => A5(e, t),
    signTransaction: (t) => C5(e, t),
    signTypedData: (t) => O5(e, t),
    switchChain: (t) => T5(e, t),
    waitForCallsStatus: (t) => Gl(e, t),
    watchAsset: (t) => B5(e, t),
    writeContract: (t) => pr(e, t),
    writeContractSync: (t) => R5(e, t),
  };
}
function Ov(e) {
  const { key: t = "wallet", name: n = "Wallet Client", transport: r } = e;
  return xo({
    ...e,
    key: t,
    name: n,
    transport: r,
    type: "walletClient",
  }).extend(k5);
}
function oc(
  {
    key: e,
    methods: t,
    name: n,
    request: r,
    retryCount: s = 3,
    retryDelay: o = 150,
    timeout: i,
    type: a,
  },
  c
) {
  const u = Vl();
  return {
    config: {
      key: e,
      methods: t,
      name: n,
      request: r,
      retryCount: s,
      retryDelay: o,
      timeout: i,
      type: a,
    },
    request: x1(r, { methods: t, retryCount: s, retryDelay: o, uid: u }),
    value: c,
  };
}
function M5(e, t = {}) {
  const {
    key: n = "custom",
    methods: r,
    name: s = "Custom Provider",
    retryDelay: o,
  } = t;
  return ({ retryCount: i }) =>
    oc({
      key: n,
      methods: r,
      name: s,
      request: e.request.bind(e),
      retryCount: t.retryCount ?? i,
      retryDelay: o,
      type: "custom",
    });
}
function Tv(e, t = {}) {
  const {
    key: n = "fallback",
    name: r = "Fallback",
    rank: s = !1,
    shouldThrow: o = _5,
    retryCount: i,
    retryDelay: a,
  } = t;
  return ({ chain: c, pollingInterval: u = 4e3, timeout: f, ...d }) => {
    let l = e,
      h = () => {};
    const b = oc(
      {
        key: n,
        name: r,
        async request({ method: p, params: y }) {
          let x;
          const S = async (w = 0) => {
            const v = l[w]({ ...d, chain: c, retryCount: 0, timeout: f });
            try {
              const m = await v.request({ method: p, params: y });
              return (
                h({
                  method: p,
                  params: y,
                  response: m,
                  transport: v,
                  status: "success",
                }),
                m
              );
            } catch (m) {
              if (
                (h({
                  error: m,
                  method: p,
                  params: y,
                  transport: v,
                  status: "error",
                }),
                o(m) ||
                  w === l.length - 1 ||
                  (x ??
                    (x = l.slice(w + 1).some((P) => {
                      const { include: E, exclude: $ } =
                        P({ chain: c }).config.methods || {};
                      return E ? E.includes(p) : $ ? !$.includes(p) : !0;
                    })),
                  !x))
              )
                throw m;
              return S(w + 1);
            }
          };
          return S();
        },
        retryCount: i,
        retryDelay: a,
        type: "fallback",
      },
      {
        onResponse: (p) => (h = p),
        transports: l.map((p) => p({ chain: c, retryCount: 0 })),
      }
    );
    if (s) {
      const p = typeof s == "object" ? s : {};
      N5({
        chain: c,
        interval: p.interval ?? u,
        onTransports: (y) => (l = y),
        ping: p.ping,
        sampleCount: p.sampleCount,
        timeout: p.timeout,
        transports: l,
        weights: p.weights,
      });
    }
    return b;
  };
}
function _5(e) {
  return !!(
    "code" in e &&
    typeof e.code == "number" &&
    (e.code === fr.code ||
      e.code === ue.code ||
      tn.nodeMessage.test(e.message) ||
      e.code === 5e3)
  );
}
function N5({
  chain: e,
  interval: t = 4e3,
  onTransports: n,
  ping: r,
  sampleCount: s = 10,
  timeout: o = 1e3,
  transports: i,
  weights: a = {},
}) {
  const { stability: c = 0.7, latency: u = 0.3 } = a,
    f = [],
    d = async () => {
      const l = await Promise.all(
        i.map(async (p) => {
          const y = p({ chain: e, retryCount: 0, timeout: o }),
            x = Date.now();
          let S, w;
          try {
            await (r
              ? r({ transport: y })
              : y.request({ method: "net_listening" })),
              (w = 1);
          } catch {
            w = 0;
          } finally {
            S = Date.now();
          }
          return { latency: S - x, success: w };
        })
      );
      f.push(l), f.length > s && f.shift();
      const h = Math.max(
          ...f.map((p) => Math.max(...p.map(({ latency: y }) => y)))
        ),
        b = i
          .map((p, y) => {
            const x = f.map((P) => P[y].latency),
              w = 1 - x.reduce((P, E) => P + E, 0) / x.length / h,
              v = f.map((P) => P[y].success),
              m = v.reduce((P, E) => P + E, 0) / v.length;
            return m === 0 ? [0, y] : [u * w + c * m, y];
          })
          .sort((p, y) => y[0] - p[0]);
      n(b.map(([, p]) => i[p])), await Ks(t), d();
    };
  d();
}
class F5 extends A {
  constructor() {
    super(
      "No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",
      { docsPath: "/docs/clients/intro", name: "UrlRequiredError" }
    );
  }
}
function Bv(e, t = {}) {
  const {
    batch: n,
    fetchFn: r,
    fetchOptions: s,
    key: o = "http",
    methods: i,
    name: a = "HTTP JSON-RPC",
    onFetchRequest: c,
    onFetchResponse: u,
    retryDelay: f,
    raw: d,
  } = t;
  return ({ chain: l, retryCount: h, timeout: b }) => {
    const { batchSize: p = 1e3, wait: y = 0 } = typeof n == "object" ? n : {},
      x = t.retryCount ?? h,
      S = b ?? t.timeout ?? 1e4,
      w = e || l?.rpcUrls.default.http[0];
    if (!w) throw new F5();
    const v = Oy(w, {
      fetchFn: r,
      fetchOptions: s,
      onRequest: c,
      onResponse: u,
      timeout: S,
    });
    return oc(
      {
        key: o,
        methods: i,
        name: a,
        async request({ method: m, params: P }) {
          const E = { method: m, params: P },
            { schedule: $ } = jd({
              id: w,
              wait: y,
              shouldSplitBatch(R) {
                return R.length > p;
              },
              fn: (R) => v.request({ body: R }),
              sort: (R, M) => R.id - M.id,
            }),
            I = async (R) => (n ? $(R) : [await v.request({ body: R })]),
            [{ error: C, result: O }] = await I(E);
          if (d) return { error: C, result: O };
          if (C) throw new Ia({ body: E, error: C, url: w });
          return O;
        },
        retryCount: x,
        retryDelay: f,
        timeout: S,
        type: "http",
      },
      { fetchOptions: s, url: w }
    );
  };
}
function Rv(e) {
  const { r: t, s: n } = Ha.Signature.fromCompact(e.slice(2, 130)),
    r = +`0x${e.slice(130)}`,
    [s, o] = (() => {
      if (r === 0 || r === 1) return [void 0, r];
      if (r === 27) return [BigInt(r), 0];
      if (r === 28) return [BigInt(r), 1];
      throw new Error("Invalid yParityOrV value");
    })();
  return typeof s < "u"
    ? { r: F(t, { size: 32 }), s: F(n, { size: 32 }), v: s, yParity: o }
    : { r: F(t, { size: 32 }), s: F(n, { size: 32 }), yParity: o };
}
var c0 = { exports: {} };
(function (e) {
  var t = Object.prototype.hasOwnProperty,
    n = "~";
  function r() {}
  Object.create &&
    ((r.prototype = Object.create(null)), new r().__proto__ || (n = !1));
  function s(c, u, f) {
    (this.fn = c), (this.context = u), (this.once = f || !1);
  }
  function o(c, u, f, d, l) {
    if (typeof f != "function")
      throw new TypeError("The listener must be a function");
    var h = new s(f, d || c, l),
      b = n ? n + u : u;
    return (
      c._events[b]
        ? c._events[b].fn
          ? (c._events[b] = [c._events[b], h])
          : c._events[b].push(h)
        : ((c._events[b] = h), c._eventsCount++),
      c
    );
  }
  function i(c, u) {
    --c._eventsCount === 0 ? (c._events = new r()) : delete c._events[u];
  }
  function a() {
    (this._events = new r()), (this._eventsCount = 0);
  }
  (a.prototype.eventNames = function () {
    var u = [],
      f,
      d;
    if (this._eventsCount === 0) return u;
    for (d in (f = this._events)) t.call(f, d) && u.push(n ? d.slice(1) : d);
    return Object.getOwnPropertySymbols
      ? u.concat(Object.getOwnPropertySymbols(f))
      : u;
  }),
    (a.prototype.listeners = function (u) {
      var f = n ? n + u : u,
        d = this._events[f];
      if (!d) return [];
      if (d.fn) return [d.fn];
      for (var l = 0, h = d.length, b = new Array(h); l < h; l++)
        b[l] = d[l].fn;
      return b;
    }),
    (a.prototype.listenerCount = function (u) {
      var f = n ? n + u : u,
        d = this._events[f];
      return d ? (d.fn ? 1 : d.length) : 0;
    }),
    (a.prototype.emit = function (u, f, d, l, h, b) {
      var p = n ? n + u : u;
      if (!this._events[p]) return !1;
      var y = this._events[p],
        x = arguments.length,
        S,
        w;
      if (y.fn) {
        switch ((y.once && this.removeListener(u, y.fn, void 0, !0), x)) {
          case 1:
            return y.fn.call(y.context), !0;
          case 2:
            return y.fn.call(y.context, f), !0;
          case 3:
            return y.fn.call(y.context, f, d), !0;
          case 4:
            return y.fn.call(y.context, f, d, l), !0;
          case 5:
            return y.fn.call(y.context, f, d, l, h), !0;
          case 6:
            return y.fn.call(y.context, f, d, l, h, b), !0;
        }
        for (w = 1, S = new Array(x - 1); w < x; w++) S[w - 1] = arguments[w];
        y.fn.apply(y.context, S);
      } else {
        var v = y.length,
          m;
        for (w = 0; w < v; w++)
          switch (
            (y[w].once && this.removeListener(u, y[w].fn, void 0, !0), x)
          ) {
            case 1:
              y[w].fn.call(y[w].context);
              break;
            case 2:
              y[w].fn.call(y[w].context, f);
              break;
            case 3:
              y[w].fn.call(y[w].context, f, d);
              break;
            case 4:
              y[w].fn.call(y[w].context, f, d, l);
              break;
            default:
              if (!S)
                for (m = 1, S = new Array(x - 1); m < x; m++)
                  S[m - 1] = arguments[m];
              y[w].fn.apply(y[w].context, S);
          }
      }
      return !0;
    }),
    (a.prototype.on = function (u, f, d) {
      return o(this, u, f, d, !1);
    }),
    (a.prototype.once = function (u, f, d) {
      return o(this, u, f, d, !0);
    }),
    (a.prototype.removeListener = function (u, f, d, l) {
      var h = n ? n + u : u;
      if (!this._events[h]) return this;
      if (!f) return i(this, h), this;
      var b = this._events[h];
      if (b.fn)
        b.fn === f && (!l || b.once) && (!d || b.context === d) && i(this, h);
      else {
        for (var p = 0, y = [], x = b.length; p < x; p++)
          (b[p].fn !== f || (l && !b[p].once) || (d && b[p].context !== d)) &&
            y.push(b[p]);
        y.length ? (this._events[h] = y.length === 1 ? y[0] : y) : i(this, h);
      }
      return this;
    }),
    (a.prototype.removeAllListeners = function (u) {
      var f;
      return (
        u
          ? ((f = n ? n + u : u), this._events[f] && i(this, f))
          : ((this._events = new r()), (this._eventsCount = 0)),
        this
      );
    }),
    (a.prototype.off = a.prototype.removeListener),
    (a.prototype.addListener = a.prototype.on),
    (a.prefixed = n),
    (a.EventEmitter = a),
    (e.exports = a);
})(c0);
var j5 = c0.exports;
const qi = Wu(j5),
  kv = Object.freeze(
    Object.defineProperty(
      { __proto__: null, EventEmitter: qi, default: qi },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function Rr(e, t, n) {
  const r = e[t.name];
  if (typeof r == "function") return r;
  const s = e[n];
  return typeof s == "function" ? s : (o) => t(e, o);
}
const qs = "2.22.1",
  z5 = () => `@wagmi/core@${qs}`;
var u0 = function (e, t, n, r) {
    if (n === "a" && !r)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !r : !t.has(e))
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it"
      );
    return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
  },
  Xs,
  f0;
let Ct = class Hi extends Error {
  get docsBaseUrl() {
    return "https://wagmi.sh/core";
  }
  get version() {
    return z5();
  }
  constructor(t, n = {}) {
    super(),
      Xs.add(this),
      Object.defineProperty(this, "details", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "docsPath", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "metaMessages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "shortMessage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "WagmiCoreError",
      });
    const r =
        n.cause instanceof Hi
          ? n.cause.details
          : n.cause?.message
          ? n.cause.message
          : n.details,
      s = (n.cause instanceof Hi && n.cause.docsPath) || n.docsPath;
    (this.message = [
      t || "An error occurred.",
      "",
      ...(n.metaMessages ? [...n.metaMessages, ""] : []),
      ...(s
        ? [
            `Docs: ${this.docsBaseUrl}${s}.html${
              n.docsSlug ? `#${n.docsSlug}` : ""
            }`,
          ]
        : []),
      ...(r ? [`Details: ${r}`] : []),
      `Version: ${this.version}`,
    ].join(`
`)),
      n.cause && (this.cause = n.cause),
      (this.details = r),
      (this.docsPath = s),
      (this.metaMessages = n.metaMessages),
      (this.shortMessage = t);
  }
  walk(t) {
    return u0(this, Xs, "m", f0).call(this, this, t);
  }
};
(Xs = new WeakSet()),
  (f0 = function e(t, n) {
    return n?.(t)
      ? t
      : t.cause
      ? u0(this, Xs, "m", e).call(this, t.cause, n)
      : t;
  });
class eo extends Ct {
  constructor() {
    super("Chain not configured."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ChainNotConfiguredError",
      });
  }
}
class U5 extends Ct {
  constructor() {
    super("Connector already connected."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ConnectorAlreadyConnectedError",
      });
  }
}
class L5 extends Ct {
  constructor() {
    super("Connector not connected."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ConnectorNotConnectedError",
      });
  }
}
class D5 extends Ct {
  constructor({ address: t, connector: n }) {
    super(`Account "${t}" not found for connector "${n.name}".`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ConnectorAccountNotFoundError",
      });
  }
}
class q5 extends Ct {
  constructor({ connectionChainId: t, connectorChainId: n }) {
    super(
      `The current chain of the connector (id: ${n}) does not match the connection's chain (id: ${t}).`,
      { metaMessages: [`Current Chain ID:  ${n}`, `Expected Chain ID: ${t}`] }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ConnectorChainMismatchError",
      });
  }
}
class H5 extends Ct {
  constructor({ connector: t }) {
    super(`Connector "${t.name}" unavailable while reconnecting.`, {
      details: [
        "During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uid`.",
        "All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.",
        "This error commonly occurs for connectors that asynchronously inject after reconnection has already started.",
      ].join(" "),
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ConnectorUnavailableReconnectingError",
      });
  }
}
async function G5(e, t) {
  let n;
  if (
    (typeof t.connector == "function"
      ? (n = e._internal.connectors.setup(t.connector))
      : (n = t.connector),
    n.uid === e.state.current)
  )
    throw new U5();
  try {
    e.setState((i) => ({ ...i, status: "connecting" })),
      n.emitter.emit("message", { type: "connecting" });
    const { connector: r, ...s } = t,
      o = await n.connect(s);
    return (
      n.emitter.off("connect", e._internal.events.connect),
      n.emitter.on("change", e._internal.events.change),
      n.emitter.on("disconnect", e._internal.events.disconnect),
      await e.storage?.setItem("recentConnectorId", n.id),
      e.setState((i) => ({
        ...i,
        connections: new Map(i.connections).set(n.uid, {
          accounts: s.withCapabilities
            ? o.accounts.map((a) => (typeof a == "object" ? a.address : a))
            : o.accounts,
          chainId: o.chainId,
          connector: n,
        }),
        current: n.uid,
        status: "connected",
      })),
      {
        accounts: s.withCapabilities
          ? o.accounts.map((i) =>
              typeof i == "object" ? i : { address: i, capabilities: {} }
            )
          : o.accounts,
        chainId: o.chainId,
      }
    );
  } catch (r) {
    throw (
      (e.setState((s) => ({
        ...s,
        status: s.current ? "connected" : "disconnected",
      })),
      r)
    );
  }
}
async function V5(e, t = {}) {
  const { assertChainId: n = !0 } = t;
  let r;
  if (t.connector) {
    const { connector: f } = t;
    if (e.state.status === "reconnecting" && !f.getAccounts && !f.getChainId)
      throw new H5({ connector: f });
    const [d, l] = await Promise.all([
      f.getAccounts().catch((h) => {
        if (t.account === null) return [];
        throw h;
      }),
      f.getChainId(),
    ]);
    r = { accounts: d, chainId: l, connector: f };
  } else r = e.state.connections.get(e.state.current);
  if (!r) throw new L5();
  const s = t.chainId ?? r.chainId,
    o = await r.connector.getChainId();
  if (n && o !== s) throw new q5({ connectionChainId: s, connectorChainId: o });
  const i = r.connector;
  if (i.getClient) return i.getClient({ chainId: s });
  const a = Y(t.account ?? r.accounts[0]);
  if (
    (a && (a.address = Ht(a.address)),
    t.account &&
      !r.accounts.some((f) => f.toLowerCase() === a.address.toLowerCase()))
  )
    throw new D5({ address: a.address, connector: i });
  const c = e.chains.find((f) => f.id === s),
    u = await r.connector.getProvider({ chainId: s });
  return xo({
    account: a,
    chain: c,
    name: "Connector Client",
    transport: (f) => M5(u)({ ...f, retryCount: 0 }),
  });
}
async function W5(e, t = {}) {
  let n;
  if (t.connector) n = t.connector;
  else {
    const { connections: s, current: o } = e.state;
    n = s.get(o)?.connector;
  }
  const r = e.state.connections;
  n &&
    (await n.disconnect(),
    n.emitter.off("change", e._internal.events.change),
    n.emitter.off("disconnect", e._internal.events.disconnect),
    n.emitter.on("connect", e._internal.events.connect),
    r.delete(n.uid)),
    e.setState((s) => {
      if (r.size === 0)
        return {
          ...s,
          connections: new Map(),
          current: null,
          status: "disconnected",
        };
      const o = r.values().next().value;
      return { ...s, connections: new Map(r), current: o.connector.uid };
    });
  {
    const s = e.state.current;
    if (!s) return;
    const o = e.state.connections.get(s)?.connector;
    if (!o) return;
    await e.storage?.setItem("recentConnectorId", o.id);
  }
}
function d0(e) {
  const t = e.state.current,
    n = e.state.connections.get(t),
    r = n?.accounts,
    s = r?.[0],
    o = e.chains.find((a) => a.id === n?.chainId),
    i = e.state.status;
  switch (i) {
    case "connected":
      return {
        address: s,
        addresses: r,
        chain: o,
        chainId: n?.chainId,
        connector: n?.connector,
        isConnected: !0,
        isConnecting: !1,
        isDisconnected: !1,
        isReconnecting: !1,
        status: i,
      };
    case "reconnecting":
      return {
        address: s,
        addresses: r,
        chain: o,
        chainId: n?.chainId,
        connector: n?.connector,
        isConnected: !!s,
        isConnecting: !1,
        isDisconnected: !1,
        isReconnecting: !0,
        status: i,
      };
    case "connecting":
      return {
        address: s,
        addresses: r,
        chain: o,
        chainId: n?.chainId,
        connector: n?.connector,
        isConnected: !1,
        isConnecting: !0,
        isDisconnected: !1,
        isReconnecting: !1,
        status: i,
      };
    case "disconnected":
      return {
        address: void 0,
        addresses: void 0,
        chain: void 0,
        chainId: void 0,
        connector: void 0,
        isConnected: !1,
        isConnecting: !1,
        isDisconnected: !0,
        isReconnecting: !1,
        status: i,
      };
  }
}
function K5(e, t) {
  const { chainId: n, ...r } = t,
    s = e.getClient({ chainId: n });
  return Rr(s, Fe, "readContract")(r);
}
function wu(e) {
  return e.state.chainId;
}
function Cn(e, t) {
  if (e === t) return !0;
  if (e && t && typeof e == "object" && typeof t == "object") {
    if (e.constructor !== t.constructor) return !1;
    let n, r;
    if (Array.isArray(e) && Array.isArray(t)) {
      if (((n = e.length), n !== t.length)) return !1;
      for (r = n; r-- !== 0; ) if (!Cn(e[r], t[r])) return !1;
      return !0;
    }
    if (
      typeof e.valueOf == "function" &&
      e.valueOf !== Object.prototype.valueOf
    )
      return e.valueOf() === t.valueOf();
    if (
      typeof e.toString == "function" &&
      e.toString !== Object.prototype.toString
    )
      return e.toString() === t.toString();
    const s = Object.keys(e);
    if (((n = s.length), n !== Object.keys(t).length)) return !1;
    for (r = n; r-- !== 0; ) if (!Object.hasOwn(t, s[r])) return !1;
    for (r = n; r-- !== 0; ) {
      const o = s[r];
      if (o && !Cn(e[o], t[o])) return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
let ei = [];
function vu(e) {
  const t = e.chains;
  return Cn(ei, t) ? ei : ((ei = t), t);
}
function Q5(e, t = {}) {
  try {
    return e.getClient(t);
  } catch {
    return;
  }
}
let _s = [];
function Gi(e) {
  const t = [...e.state.connections.values()];
  return e.state.status === "reconnecting" || Cn(_s, t) ? _s : ((_s = t), t);
}
let Ns = [];
function xu(e) {
  const t = e.connectors;
  return Ns.length === t.length && Ns.every((n, r) => n === t[r])
    ? Ns
    : ((Ns = t), t);
}
function Vi(e, t = {}) {
  return Q5(e, t)?.extend(o0);
}
let ti = !1;
async function l0(e, t = {}) {
  if (ti) return [];
  (ti = !0),
    e.setState((u) => ({
      ...u,
      status: u.current ? "reconnecting" : "connecting",
    }));
  const n = [];
  if (t.connectors?.length)
    for (const u of t.connectors) {
      let f;
      typeof u == "function" ? (f = e._internal.connectors.setup(u)) : (f = u),
        n.push(f);
    }
  else n.push(...e.connectors);
  let r;
  try {
    r = await e.storage?.getItem("recentConnectorId");
  } catch {}
  const s = {};
  for (const [, u] of e.state.connections) s[u.connector.id] = 1;
  r && (s[r] = 0);
  const o =
    Object.keys(s).length > 0
      ? [...n].sort((u, f) => (s[u.id] ?? 10) - (s[f.id] ?? 10))
      : n;
  let i = !1;
  const a = [],
    c = [];
  for (const u of o) {
    const f = await u.getProvider().catch(() => {});
    if (!f || c.some((h) => h === f) || !(await u.isAuthorized())) continue;
    const l = await u.connect({ isReconnecting: !0 }).catch(() => null);
    l &&
      (u.emitter.off("connect", e._internal.events.connect),
      u.emitter.on("change", e._internal.events.change),
      u.emitter.on("disconnect", e._internal.events.disconnect),
      e.setState((h) => {
        const b = new Map(i ? h.connections : new Map()).set(u.uid, {
          accounts: l.accounts,
          chainId: l.chainId,
          connector: u,
        });
        return { ...h, current: i ? h.current : u.uid, connections: b };
      }),
      a.push({ accounts: l.accounts, chainId: l.chainId, connector: u }),
      c.push(f),
      (i = !0));
  }
  return (
    (e.state.status === "reconnecting" || e.state.status === "connecting") &&
      (i
        ? e.setState((u) => ({ ...u, status: "connected" }))
        : e.setState((u) => ({
            ...u,
            connections: new Map(),
            current: null,
            status: "disconnected",
          }))),
    (ti = !1),
    a
  );
}
class Dn extends Ct {
  constructor() {
    super("Provider not found."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ProviderNotFoundError",
      });
  }
}
class Z5 extends Ct {
  constructor({ connector: t }) {
    super(`"${t.name}" does not support programmatic chain switching.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "SwitchChainNotSupportedError",
      });
  }
}
async function Y5(e, t) {
  const { addEthereumChainParameter: n, chainId: r } = t,
    s = e.state.connections.get(t.connector?.uid ?? e.state.current);
  if (s) {
    const i = s.connector;
    if (!i.switchChain) throw new Z5({ connector: i });
    return await i.switchChain({ addEthereumChainParameter: n, chainId: r });
  }
  const o = e.chains.find((i) => i.id === r);
  if (!o) throw new eo();
  return e.setState((i) => ({ ...i, chainId: r })), o;
}
async function J5(e, t) {
  const { chainId: n, timeout: r = 0, ...s } = t,
    o = e.getClient({ chainId: n }),
    a = await Rr(o, rc, "waitForTransactionReceipt")({ ...s, timeout: r });
  if (a.status === "reverted") {
    const c = Rr(o, Eo, "getTransaction"),
      { from: u, ...f } = await c({ hash: a.transactionHash }),
      l = await Rr(
        o,
        Er,
        "call"
      )({
        ...f,
        account: u,
        data: f.input,
        gasPrice: f.type !== "eip1559" ? f.gasPrice : void 0,
        maxFeePerGas: f.type === "eip1559" ? f.maxFeePerGas : void 0,
        maxPriorityFeePerGas:
          f.type === "eip1559" ? f.maxPriorityFeePerGas : void 0,
      }),
      h = l?.data ? np(`0x${l.data.substring(138)}`) : "unknown reason";
    throw new Error(h);
  }
  return { ...a, chainId: o.chain.id };
}
function X5(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => d0(e), n, {
    equalityFn(r, s) {
      const { connector: o, ...i } = r,
        { connector: a, ...c } = s;
      return Cn(i, c) && o?.id === a?.id && o?.uid === a?.uid;
    },
  });
}
function ew(e, t) {
  const { onChange: n } = t;
  return e.subscribe((r) => r.chainId, n);
}
function tw(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => Gi(e), n, { equalityFn: Cn });
}
function nw(e, t) {
  const { onChange: n } = t;
  return e._internal.connectors.subscribe((r, s) => {
    n(Object.values(r), s);
  });
}
function rw(e, t) {
  const { onChange: n } = t;
  return e.subscribe(() => Vi(e), n, {
    equalityFn(r, s) {
      return r?.uid === s?.uid;
    },
  });
}
async function sw(e, t) {
  const { account: n, chainId: r, connector: s, ...o } = t;
  let i;
  return (
    typeof n == "object" && n?.type === "local"
      ? (i = e.getClient({ chainId: r }))
      : (i = await V5(e, {
          account: n ?? void 0,
          assertChainId: !1,
          chainId: r,
          connector: s,
        })),
    await Rr(
      i,
      pr,
      "writeContract"
    )({ ...o, ...(n ? { account: n } : {}), chain: r ? { id: r } : null })
  );
}
function Mv(e) {
  return e;
}
ic.type = "injected";
function ic(e = {}) {
  const { shimDisconnect: t = !0, unstable_shimAsyncInject: n } = e;
  function r() {
    const c = e.target;
    if (typeof c == "function") {
      const u = c();
      if (u) return u;
    }
    return typeof c == "object"
      ? c
      : typeof c == "string"
      ? {
          ...(ow[c] ?? {
            id: c,
            name: `${c[0].toUpperCase()}${c.slice(1)}`,
            provider: `is${c[0].toUpperCase()}${c.slice(1)}`,
          }),
        }
      : {
          id: "injected",
          name: "Injected",
          provider(u) {
            return u?.ethereum;
          },
        };
  }
  let s, o, i, a;
  return (c) => ({
    get icon() {
      return r().icon;
    },
    get id() {
      return r().id;
    },
    get name() {
      return r().name;
    },
    get supportsSimulation() {
      return !0;
    },
    type: ic.type,
    async setup() {
      const u = await this.getProvider();
      u?.on &&
        e.target &&
        (i || ((i = this.onConnect.bind(this)), u.on("connect", i)),
        s ||
          ((s = this.onAccountsChanged.bind(this)),
          u.on("accountsChanged", s)));
    },
    async connect({ chainId: u, isReconnecting: f, withCapabilities: d } = {}) {
      const l = await this.getProvider();
      if (!l) throw new Dn();
      let h = [];
      if (f) h = await this.getAccounts().catch(() => []);
      else if (t)
        try {
          (h = (
            await l.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }],
            })
          )[0]?.caveats?.[0]?.value?.map((p) => Ht(p))),
            h.length > 0 && (h = await this.getAccounts());
        } catch (b) {
          const p = b;
          if (p.code === ue.code) throw new ue(p);
          if (p.code === Vt.code) throw p;
        }
      try {
        !h?.length &&
          !f &&
          (h = (await l.request({ method: "eth_requestAccounts" })).map((y) =>
            Ht(y)
          )),
          i && (l.removeListener("connect", i), (i = void 0)),
          s ||
            ((s = this.onAccountsChanged.bind(this)),
            l.on("accountsChanged", s)),
          o || ((o = this.onChainChanged.bind(this)), l.on("chainChanged", o)),
          a || ((a = this.onDisconnect.bind(this)), l.on("disconnect", a));
        let b = await this.getChainId();
        return (
          u &&
            b !== u &&
            (b =
              (
                await this.switchChain({ chainId: u }).catch((y) => {
                  if (y.code === ue.code) throw y;
                  return { id: b };
                })
              )?.id ?? b),
          t && (await c.storage?.removeItem(`${this.id}.disconnected`)),
          e.target || (await c.storage?.setItem("injected.connected", !0)),
          {
            accounts: d ? h.map((p) => ({ address: p, capabilities: {} })) : h,
            chainId: b,
          }
        );
      } catch (b) {
        const p = b;
        throw p.code === ue.code
          ? new ue(p)
          : p.code === Vt.code
          ? new Vt(p)
          : p;
      }
    },
    async disconnect() {
      const u = await this.getProvider();
      if (!u) throw new Dn();
      o && (u.removeListener("chainChanged", o), (o = void 0)),
        a && (u.removeListener("disconnect", a), (a = void 0)),
        i || ((i = this.onConnect.bind(this)), u.on("connect", i));
      try {
        await Kd(
          () =>
            u.request({
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }],
            }),
          { timeout: 100 }
        );
      } catch {}
      t && (await c.storage?.setItem(`${this.id}.disconnected`, !0)),
        e.target || (await c.storage?.removeItem("injected.connected"));
    },
    async getAccounts() {
      const u = await this.getProvider();
      if (!u) throw new Dn();
      return (await u.request({ method: "eth_accounts" })).map((d) => Ht(d));
    },
    async getChainId() {
      const u = await this.getProvider();
      if (!u) throw new Dn();
      const f = await u.request({ method: "eth_chainId" });
      return Number(f);
    },
    async getProvider() {
      if (typeof window > "u") return;
      let u;
      const f = r();
      return (
        typeof f.provider == "function"
          ? (u = f.provider(window))
          : typeof f.provider == "string"
          ? (u = Hs(window, f.provider))
          : (u = f.provider),
        u &&
          !u.removeListener &&
          ("off" in u && typeof u.off == "function"
            ? (u.removeListener = u.off)
            : (u.removeListener = () => {})),
        u
      );
    },
    async isAuthorized() {
      try {
        if (
          (t && (await c.storage?.getItem(`${this.id}.disconnected`))) ||
          (!e.target && !(await c.storage?.getItem("injected.connected")))
        )
          return !1;
        if (!(await this.getProvider())) {
          if (n !== void 0 && n !== !1) {
            const l = async () => (
                typeof window < "u" &&
                  window.removeEventListener("ethereum#initialized", l),
                !!(await this.getProvider())
              ),
              h = typeof n == "number" ? n : 1e3;
            if (
              await Promise.race([
                ...(typeof window < "u"
                  ? [
                      new Promise((p) =>
                        window.addEventListener(
                          "ethereum#initialized",
                          () => p(l()),
                          { once: !0 }
                        )
                      ),
                    ]
                  : []),
                new Promise((p) => setTimeout(() => p(l()), h)),
              ])
            )
              return !0;
          }
          throw new Dn();
        }
        return !!(await Yr(() => this.getAccounts())).length;
      } catch {
        return !1;
      }
    },
    async switchChain({ addEthereumChainParameter: u, chainId: f }) {
      const d = await this.getProvider();
      if (!d) throw new Dn();
      const l = c.chains.find((b) => b.id === f);
      if (!l) throw new Pn(new eo());
      const h = new Promise((b) => {
        const p = (y) => {
          "chainId" in y &&
            y.chainId === f &&
            (c.emitter.off("change", p), b());
        };
        c.emitter.on("change", p);
      });
      try {
        return (
          await Promise.all([
            d
              .request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: F(f) }],
              })
              .then(async () => {
                (await this.getChainId()) === f &&
                  c.emitter.emit("change", { chainId: f });
              }),
            h,
          ]),
          l
        );
      } catch (b) {
        const p = b;
        if (p.code === 4902 || p?.data?.originalError?.code === 4902)
          try {
            const { default: y, ...x } = l.blockExplorers ?? {};
            let S;
            u?.blockExplorerUrls
              ? (S = u.blockExplorerUrls)
              : y && (S = [y.url, ...Object.values(x).map((m) => m.url)]);
            let w;
            u?.rpcUrls?.length
              ? (w = u.rpcUrls)
              : (w = [l.rpcUrls.default?.http[0] ?? ""]);
            const v = {
              blockExplorerUrls: S,
              chainId: F(f),
              chainName: u?.chainName ?? l.name,
              iconUrls: u?.iconUrls,
              nativeCurrency: u?.nativeCurrency ?? l.nativeCurrency,
              rpcUrls: w,
            };
            return (
              await Promise.all([
                d
                  .request({ method: "wallet_addEthereumChain", params: [v] })
                  .then(async () => {
                    if ((await this.getChainId()) === f)
                      c.emitter.emit("change", { chainId: f });
                    else
                      throw new ue(
                        new Error("User rejected switch after adding network.")
                      );
                  }),
                h,
              ]),
              l
            );
          } catch (y) {
            throw new ue(y);
          }
        throw p.code === ue.code ? new ue(p) : new Pn(p);
      }
    },
    async onAccountsChanged(u) {
      if (u.length === 0) this.onDisconnect();
      else if (c.emitter.listenerCount("connect")) {
        const f = (await this.getChainId()).toString();
        this.onConnect({ chainId: f }),
          t && (await c.storage?.removeItem(`${this.id}.disconnected`));
      } else c.emitter.emit("change", { accounts: u.map((f) => Ht(f)) });
    },
    onChainChanged(u) {
      const f = Number(u);
      c.emitter.emit("change", { chainId: f });
    },
    async onConnect(u) {
      const f = await this.getAccounts();
      if (f.length === 0) return;
      const d = Number(u.chainId);
      c.emitter.emit("connect", { accounts: f, chainId: d });
      const l = await this.getProvider();
      l &&
        (i && (l.removeListener("connect", i), (i = void 0)),
        s ||
          ((s = this.onAccountsChanged.bind(this)), l.on("accountsChanged", s)),
        o || ((o = this.onChainChanged.bind(this)), l.on("chainChanged", o)),
        a || ((a = this.onDisconnect.bind(this)), l.on("disconnect", a)));
    },
    async onDisconnect(u) {
      const f = await this.getProvider();
      (u && u.code === 1013 && f && (await this.getAccounts()).length) ||
        (c.emitter.emit("disconnect"),
        f &&
          (o && (f.removeListener("chainChanged", o), (o = void 0)),
          a && (f.removeListener("disconnect", a), (a = void 0)),
          i || ((i = this.onConnect.bind(this)), f.on("connect", i))));
    },
  });
}
const ow = {
  coinbaseWallet: {
    id: "coinbaseWallet",
    name: "Coinbase Wallet",
    provider(e) {
      return e?.coinbaseWalletExtension
        ? e.coinbaseWalletExtension
        : Hs(e, "isCoinbaseWallet");
    },
  },
  metaMask: {
    id: "metaMask",
    name: "MetaMask",
    provider(e) {
      return Hs(e, (t) => {
        if (!t.isMetaMask || (t.isBraveWallet && !t._events && !t._state))
          return !1;
        const n = [
          "isApexWallet",
          "isAvalanche",
          "isBitKeep",
          "isBlockWallet",
          "isKuCoinWallet",
          "isMathWallet",
          "isOkxWallet",
          "isOKExWallet",
          "isOneInchIOSWallet",
          "isOneInchAndroidWallet",
          "isOpera",
          "isPhantom",
          "isPortal",
          "isRabby",
          "isTokenPocket",
          "isTokenary",
          "isUniswapWallet",
          "isZerion",
        ];
        for (const r of n) if (t[r]) return !1;
        return !0;
      });
    },
  },
  phantom: {
    id: "phantom",
    name: "Phantom",
    provider(e) {
      return e?.phantom?.ethereum ? e.phantom?.ethereum : Hs(e, "isPhantom");
    },
  },
};
function Hs(e, t) {
  function n(s) {
    return typeof t == "function" ? t(s) : typeof t == "string" ? s[t] : !0;
  }
  const r = e.ethereum;
  if (r?.providers) return r.providers.find((s) => n(s));
  if (r && n(r)) return r;
}
const iw = (e) => (t, n, r) => {
    const s = r.subscribe;
    return (
      (r.subscribe = (i, a, c) => {
        let u = i;
        if (a) {
          const f = c?.equalityFn || Object.is;
          let d = i(r.getState());
          (u = (l) => {
            const h = i(l);
            if (!f(d, h)) {
              const b = d;
              a((d = h), b);
            }
          }),
            c?.fireImmediately && a(d, d);
        }
        return s(u);
      }),
      e(t, n, r)
    );
  },
  aw = iw;
function cw(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (s) => {
      var o;
      const i = (c) => (c === null ? null : JSON.parse(c, void 0)),
        a = (o = n.getItem(s)) != null ? o : null;
      return a instanceof Promise ? a.then(i) : i(a);
    },
    setItem: (s, o) => n.setItem(s, JSON.stringify(o, void 0)),
    removeItem: (s) => n.removeItem(s),
  };
}
const Wi = (e) => (t) => {
    try {
      const n = e(t);
      return n instanceof Promise
        ? n
        : {
            then(r) {
              return Wi(r)(n);
            },
            catch(r) {
              return this;
            },
          };
    } catch (n) {
      return {
        then(r) {
          return this;
        },
        catch(r) {
          return Wi(r)(n);
        },
      };
    }
  },
  uw = (e, t) => (n, r, s) => {
    let o = {
        storage: cw(() => localStorage),
        partialize: (p) => p,
        version: 0,
        merge: (p, y) => ({ ...y, ...p }),
        ...t,
      },
      i = !1;
    const a = new Set(),
      c = new Set();
    let u = o.storage;
    if (!u)
      return e(
        (...p) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${o.name}', the given storage is currently unavailable.`
          ),
            n(...p);
        },
        r,
        s
      );
    const f = () => {
        const p = o.partialize({ ...r() });
        return u.setItem(o.name, { state: p, version: o.version });
      },
      d = s.setState;
    s.setState = (p, y) => {
      d(p, y), f();
    };
    const l = e(
      (...p) => {
        n(...p), f();
      },
      r,
      s
    );
    s.getInitialState = () => l;
    let h;
    const b = () => {
      var p, y;
      if (!u) return;
      (i = !1),
        a.forEach((S) => {
          var w;
          return S((w = r()) != null ? w : l);
        });
      const x =
        ((y = o.onRehydrateStorage) == null
          ? void 0
          : y.call(o, (p = r()) != null ? p : l)) || void 0;
      return Wi(u.getItem.bind(u))(o.name)
        .then((S) => {
          if (S)
            if (typeof S.version == "number" && S.version !== o.version) {
              if (o.migrate) return [!0, o.migrate(S.state, S.version)];
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return [!1, S.state];
          return [!1, void 0];
        })
        .then((S) => {
          var w;
          const [v, m] = S;
          if (((h = o.merge(m, (w = r()) != null ? w : l)), n(h, !0), v))
            return f();
        })
        .then(() => {
          x?.(h, void 0), (h = r()), (i = !0), c.forEach((S) => S(h));
        })
        .catch((S) => {
          x?.(void 0, S);
        });
    };
    return (
      (s.persist = {
        setOptions: (p) => {
          (o = { ...o, ...p }), p.storage && (u = p.storage);
        },
        clearStorage: () => {
          u?.removeItem(o.name);
        },
        getOptions: () => o,
        rehydrate: () => b(),
        hasHydrated: () => i,
        onHydrate: (p) => (
          a.add(p),
          () => {
            a.delete(p);
          }
        ),
        onFinishHydration: (p) => (
          c.add(p),
          () => {
            c.delete(p);
          }
        ),
      }),
      o.skipHydration || b(),
      h || l
    );
  },
  fw = uw,
  Eu = (e) => {
    let t;
    const n = new Set(),
      r = (u, f) => {
        const d = typeof u == "function" ? u(t) : u;
        if (!Object.is(d, t)) {
          const l = t;
          (t =
            f ?? (typeof d != "object" || d === null)
              ? d
              : Object.assign({}, t, d)),
            n.forEach((h) => h(t, l));
        }
      },
      s = () => t,
      a = {
        setState: r,
        getState: s,
        getInitialState: () => c,
        subscribe: (u) => (n.add(u), () => n.delete(u)),
      },
      c = (t = e(r, s, a));
    return a;
  },
  ni = (e) => (e ? Eu(e) : Eu);
class dw {
  constructor(t) {
    Object.defineProperty(this, "uid", {
      enumerable: !0,
      configurable: !0,
      writable: !0,
      value: t,
    }),
      Object.defineProperty(this, "_emitter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new qi(),
      });
  }
  on(t, n) {
    this._emitter.on(t, n);
  }
  once(t, n) {
    this._emitter.once(t, n);
  }
  off(t, n) {
    this._emitter.off(t, n);
  }
  emit(t, ...n) {
    const r = n[0];
    this._emitter.emit(t, { uid: this.uid, ...r });
  }
  listenerCount(t) {
    return this._emitter.listenerCount(t);
  }
}
function lw(e) {
  return new dw(e);
}
function hw(e, t) {
  return JSON.parse(e, (n, r) => {
    let s = r;
    return (
      s?.__type === "bigint" && (s = BigInt(s.value)),
      s?.__type === "Map" && (s = new Map(s.value)),
      t?.(n, s) ?? s
    );
  });
}
function Pu(e, t) {
  return e.slice(0, t).join(".") || ".";
}
function Su(e, t) {
  const { length: n } = e;
  for (let r = 0; r < n; ++r) if (e[r] === t) return r + 1;
  return 0;
}
function pw(e, t) {
  const n = typeof e == "function",
    r = typeof t == "function",
    s = [],
    o = [];
  return function (a, c) {
    if (typeof c == "object")
      if (s.length) {
        const u = Su(s, this);
        u === 0 ? (s[s.length] = this) : (s.splice(u), o.splice(u)),
          (o[o.length] = a);
        const f = Su(s, c);
        if (f !== 0)
          return r ? t.call(this, a, c, Pu(o, f)) : `[ref=${Pu(o, f)}]`;
      } else (s[0] = c), (o[0] = a);
    return n ? e.call(this, a, c) : c;
  };
}
function bw(e, t, n, r) {
  return JSON.stringify(
    e,
    pw((s, o) => {
      let i = o;
      return (
        typeof i == "bigint" && (i = { __type: "bigint", value: o.toString() }),
        i instanceof Map &&
          (i = { __type: "Map", value: Array.from(o.entries()) }),
        t?.(s, i) ?? i
      );
    }, r),
    n ?? void 0
  );
}
function yw(e) {
  const {
    deserialize: t = hw,
    key: n = "wagmi",
    serialize: r = bw,
    storage: s = h0,
  } = e;
  function o(i) {
    return i instanceof Promise ? i.then((a) => a).catch(() => null) : i;
  }
  return {
    ...s,
    key: n,
    async getItem(i, a) {
      const c = s.getItem(`${n}.${i}`),
        u = await o(c);
      return u ? t(u) ?? null : a ?? null;
    },
    async setItem(i, a) {
      const c = `${n}.${i}`;
      a === null ? await o(s.removeItem(c)) : await o(s.setItem(c, r(a)));
    },
    async removeItem(i) {
      await o(s.removeItem(`${n}.${i}`));
    },
  };
}
const h0 = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
function mw() {
  const e =
    typeof window < "u" && window.localStorage ? window.localStorage : h0;
  return {
    getItem(t) {
      return e.getItem(t);
    },
    removeItem(t) {
      e.removeItem(t);
    },
    setItem(t, n) {
      try {
        e.setItem(t, n);
      } catch {}
    },
  };
}
const Ki = 256;
let Fs = Ki,
  js;
function gw(e = 11) {
  if (!js || Fs + e > Ki * 2) {
    (js = ""), (Fs = 0);
    for (let t = 0; t < Ki; t++)
      js += ((256 + Math.random() * 256) | 0).toString(16).substring(1);
  }
  return js.substring(Fs, Fs++ + e);
}
function _v(e) {
  const {
      multiInjectedProviderDiscovery: t = !0,
      storage: n = yw({ storage: mw() }),
      syncConnectedChain: r = !0,
      ssr: s = !1,
      ...o
    } = e,
    i = typeof window < "u" && t ? ch() : void 0,
    a = ni(() => o.chains),
    c = ni(() => {
      const m = [],
        P = new Set();
      for (const E of o.connectors ?? []) {
        const $ = u(E);
        if ((m.push($), !s && $.rdns)) {
          const I = typeof $.rdns == "string" ? [$.rdns] : $.rdns;
          for (const C of I) P.add(C);
        }
      }
      if (!s && i) {
        const E = i.getProviders();
        for (const $ of E) P.has($.info.rdns) || m.push(u(f($)));
      }
      return m;
    });
  function u(m) {
    const P = lw(gw()),
      E = {
        ...m({
          emitter: P,
          chains: a.getState(),
          storage: n,
          transports: o.transports,
        }),
        emitter: P,
        uid: P.uid,
      };
    return P.on("connect", w), E.setup?.(), E;
  }
  function f(m) {
    const { info: P } = m,
      E = m.provider;
    return ic({ target: { ...P, id: P.rdns, provider: E } });
  }
  const d = new Map();
  function l(m = {}) {
    const P = m.chainId ?? y.getState().chainId,
      E = a.getState().find((I) => I.id === P);
    if (m.chainId && !E) throw new eo();
    {
      const I = d.get(y.getState().chainId);
      if (I && !E) return I;
      if (!E) throw new eo();
    }
    {
      const I = d.get(P);
      if (I) return I;
    }
    let $;
    if (o.client) $ = o.client({ chain: E });
    else {
      const I = E.id,
        C = a.getState().map((M) => M.id),
        O = {},
        R = Object.entries(o);
      for (const [M, D] of R)
        if (
          !(
            M === "chains" ||
            M === "client" ||
            M === "connectors" ||
            M === "transports"
          )
        )
          if (typeof D == "object")
            if (I in D) O[M] = D[I];
            else {
              if (C.some((B) => B in D)) continue;
              O[M] = D;
            }
          else O[M] = D;
      $ = xo({
        ...O,
        chain: E,
        batch: O.batch ?? { multicall: !0 },
        transport: (M) => o.transports[I]({ ...M, connectors: c }),
      });
    }
    return d.set(P, $), $;
  }
  function h() {
    return {
      chainId: a.getState()[0].id,
      connections: new Map(),
      current: null,
      status: "disconnected",
    };
  }
  let b;
  const p = "0.0.0-canary-";
  qs.startsWith(p)
    ? (b = Number.parseInt(qs.replace(p, ""), 10))
    : (b = Number.parseInt(qs.split(".")[0] ?? "0", 10));
  const y = ni(
    aw(
      n
        ? fw(h, {
            migrate(m, P) {
              if (P === b) return m;
              const E = h(),
                $ = x(m, E.chainId);
              return { ...E, chainId: $ };
            },
            name: "store",
            partialize(m) {
              return {
                connections: {
                  __type: "Map",
                  value: Array.from(m.connections.entries()).map(([P, E]) => {
                    const { id: $, name: I, type: C, uid: O } = E.connector;
                    return [
                      P,
                      { ...E, connector: { id: $, name: I, type: C, uid: O } },
                    ];
                  }),
                },
                chainId: m.chainId,
                current: m.current,
              };
            },
            merge(m, P) {
              typeof m == "object" && m && "status" in m && delete m.status;
              const E = x(m, P.chainId);
              return { ...P, ...m, chainId: E };
            },
            skipHydration: s,
            storage: n,
            version: b,
          })
        : h
    )
  );
  y.setState(h());
  function x(m, P) {
    return m &&
      typeof m == "object" &&
      "chainId" in m &&
      typeof m.chainId == "number" &&
      a.getState().some((E) => E.id === m.chainId)
      ? m.chainId
      : P;
  }
  r &&
    y.subscribe(
      ({ connections: m, current: P }) => (P ? m.get(P)?.chainId : void 0),
      (m) => {
        if (a.getState().some((E) => E.id === m))
          return y.setState((E) => ({ ...E, chainId: m ?? E.chainId }));
      }
    ),
    i?.subscribe((m) => {
      const P = new Set(),
        E = new Set();
      for (const I of c.getState())
        if ((P.add(I.id), I.rdns)) {
          const C = typeof I.rdns == "string" ? [I.rdns] : I.rdns;
          for (const O of C) E.add(O);
        }
      const $ = [];
      for (const I of m) {
        if (E.has(I.info.rdns)) continue;
        const C = u(f(I));
        P.has(C.id) || $.push(C);
      }
      (n && !y.persist.hasHydrated()) || c.setState((I) => [...I, ...$], !0);
    });
  function S(m) {
    y.setState((P) => {
      const E = P.connections.get(m.uid);
      return E
        ? {
            ...P,
            connections: new Map(P.connections).set(m.uid, {
              accounts: m.accounts ?? E.accounts,
              chainId: m.chainId ?? E.chainId,
              connector: E.connector,
            }),
          }
        : P;
    });
  }
  function w(m) {
    y.getState().status === "connecting" ||
      y.getState().status === "reconnecting" ||
      y.setState((P) => {
        const E = c.getState().find(($) => $.uid === m.uid);
        return E
          ? (E.emitter.listenerCount("connect") && E.emitter.off("connect", S),
            E.emitter.listenerCount("change") || E.emitter.on("change", S),
            E.emitter.listenerCount("disconnect") ||
              E.emitter.on("disconnect", v),
            {
              ...P,
              connections: new Map(P.connections).set(m.uid, {
                accounts: m.accounts,
                chainId: m.chainId,
                connector: E,
              }),
              current: m.uid,
              status: "connected",
            })
          : P;
      });
  }
  function v(m) {
    y.setState((P) => {
      const E = P.connections.get(m.uid);
      if (E) {
        const I = E.connector;
        I.emitter.listenerCount("change") &&
          E.connector.emitter.off("change", S),
          I.emitter.listenerCount("disconnect") &&
            E.connector.emitter.off("disconnect", v),
          I.emitter.listenerCount("connect") ||
            E.connector.emitter.on("connect", w);
      }
      if ((P.connections.delete(m.uid), P.connections.size === 0))
        return {
          ...P,
          connections: new Map(),
          current: null,
          status: "disconnected",
        };
      const $ = P.connections.values().next().value;
      return {
        ...P,
        connections: new Map(P.connections),
        current: $.connector.uid,
      };
    });
  }
  return {
    get chains() {
      return a.getState();
    },
    get connectors() {
      return c.getState();
    },
    storage: n,
    getClient: l,
    get state() {
      return y.getState();
    },
    setState(m) {
      let P;
      typeof m == "function" ? (P = m(y.getState())) : (P = m);
      const E = h();
      typeof P != "object" && (P = E),
        Object.keys(E).some((I) => !(I in P)) && (P = E),
        y.setState(P, !0);
    },
    subscribe(m, P, E) {
      return y.subscribe(
        m,
        P,
        E ? { ...E, fireImmediately: E.emitImmediately } : void 0
      );
    },
    _internal: {
      mipd: i,
      async revalidate() {
        const m = y.getState(),
          P = m.connections;
        let E = m.current;
        for (const [, $] of P) {
          const I = $.connector;
          (I.isAuthorized && (await I.isAuthorized())) ||
            (P.delete(I.uid), E === I.uid && (E = null));
        }
        y.setState(($) => ({ ...$, connections: P, current: E }));
      },
      store: y,
      ssr: !!s,
      syncConnectedChain: r,
      transports: o.transports,
      chains: {
        setState(m) {
          const P = typeof m == "function" ? m(a.getState()) : m;
          if (P.length !== 0) return a.setState(P, !0);
        },
        subscribe(m) {
          return a.subscribe(m);
        },
      },
      connectors: {
        providerDetailToConnector: f,
        setup: u,
        setState(m) {
          return c.setState(typeof m == "function" ? m(c.getState()) : m, !0);
        },
        subscribe(m) {
          return c.subscribe(m);
        },
      },
      events: { change: S, connect: w, disconnect: v },
    },
  };
}
function ww(e, t) {
  const { initialState: n, reconnectOnMount: r } = t;
  return (
    n &&
      !e._internal.store.persist.hasHydrated() &&
      e.setState({
        ...n,
        chainId: e.chains.some((s) => s.id === n.chainId)
          ? n.chainId
          : e.chains[0].id,
        connections: r ? n.connections : new Map(),
        status: r ? "reconnecting" : "disconnected",
      }),
    {
      async onMount() {
        e._internal.ssr &&
          (await e._internal.store.persist.rehydrate(),
          e._internal.mipd &&
            e._internal.connectors.setState((s) => {
              const o = new Set();
              for (const c of s ?? [])
                if (c.rdns) {
                  const u = Array.isArray(c.rdns) ? c.rdns : [c.rdns];
                  for (const f of u) o.add(f);
                }
              const i = [],
                a = e._internal.mipd?.getProviders() ?? [];
              for (const c of a) {
                if (o.has(c.info.rdns)) continue;
                const u = e._internal.connectors.providerDetailToConnector(c),
                  f = e._internal.connectors.setup(u);
                i.push(f);
              }
              return [...s, ...i];
            })),
          r
            ? l0(e)
            : e.storage &&
              e.setState((s) => ({ ...s, connections: new Map() }));
      },
    }
  );
}
function vw(e) {
  const {
      children: t,
      config: n,
      initialState: r,
      reconnectOnMount: s = !0,
    } = e,
    { onMount: o } = ww(n, { initialState: r, reconnectOnMount: s });
  n._internal.ssr || o();
  const i = V.useRef(!0);
  return (
    V.useEffect(() => {
      if (i.current && n._internal.ssr)
        return (
          o(),
          () => {
            i.current = !1;
          }
        );
    }, []),
    t
  );
}
const p0 = V.createContext(void 0);
function Nv(e) {
  const { children: t, config: n } = e,
    r = { value: n };
  return V.createElement(vw, e, V.createElement(p0.Provider, r, t));
}
const xw = "2.19.0",
  Ew = () => `wagmi@${xw}`;
class Pw extends Ct {
  constructor() {
    super(...arguments),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "WagmiError",
      });
  }
  get docsBaseUrl() {
    return "https://wagmi.sh/react";
  }
  get version() {
    return Ew();
  }
}
class Sw extends Pw {
  constructor() {
    super("`useConfig` must be used within `WagmiProvider`.", {
      docsPath: "/api/WagmiProvider",
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "WagmiProviderNotFoundError",
      });
  }
}
function Be(e = {}) {
  const t = e.config ?? V.useContext(p0);
  if (!t) throw new Sw();
  return t;
}
function $w(e, t) {
  const { onChange: n } = t;
  return e._internal.chains.subscribe((r, s) => {
    n(r, s);
  });
}
var b0 = { exports: {} },
  y0 = {},
  m0 = { exports: {} },
  g0 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var br = V;
function Iw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Aw = typeof Object.is == "function" ? Object.is : Iw,
  Cw = br.useState,
  Ow = br.useEffect,
  Tw = br.useLayoutEffect,
  Bw = br.useDebugValue;
function Rw(e, t) {
  var n = t(),
    r = Cw({ inst: { value: n, getSnapshot: t } }),
    s = r[0].inst,
    o = r[1];
  return (
    Tw(
      function () {
        (s.value = n), (s.getSnapshot = t), ri(s) && o({ inst: s });
      },
      [e, n, t]
    ),
    Ow(
      function () {
        return (
          ri(s) && o({ inst: s }),
          e(function () {
            ri(s) && o({ inst: s });
          })
        );
      },
      [e]
    ),
    Bw(n),
    n
  );
}
function ri(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Aw(e, n);
  } catch {
    return !0;
  }
}
function kw(e, t) {
  return t();
}
var Mw =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? kw
    : Rw;
g0.useSyncExternalStore =
  br.useSyncExternalStore !== void 0 ? br.useSyncExternalStore : Mw;
m0.exports = g0;
var _w = m0.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $o = V,
  Nw = _w;
function Fw(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var jw = typeof Object.is == "function" ? Object.is : Fw,
  zw = Nw.useSyncExternalStore,
  Uw = $o.useRef,
  Lw = $o.useEffect,
  Dw = $o.useMemo,
  qw = $o.useDebugValue;
y0.useSyncExternalStoreWithSelector = function (e, t, n, r, s) {
  var o = Uw(null);
  if (o.current === null) {
    var i = { hasValue: !1, value: null };
    o.current = i;
  } else i = o.current;
  o = Dw(
    function () {
      function c(h) {
        if (!u) {
          if (((u = !0), (f = h), (h = r(h)), s !== void 0 && i.hasValue)) {
            var b = i.value;
            if (s(b, h)) return (d = b);
          }
          return (d = h);
        }
        if (((b = d), jw(f, h))) return b;
        var p = r(h);
        return s !== void 0 && s(b, p) ? ((f = h), b) : ((f = h), (d = p));
      }
      var u = !1,
        f,
        d,
        l = n === void 0 ? null : n;
      return [
        function () {
          return c(t());
        },
        l === null
          ? void 0
          : function () {
              return c(l());
            },
      ];
    },
    [t, n, r, s]
  );
  var a = zw(e, o[0], o[1]);
  return (
    Lw(
      function () {
        (i.hasValue = !0), (i.value = a);
      },
      [a]
    ),
    qw(a),
    a
  );
};
b0.exports = y0;
var w0 = b0.exports;
const si = (e) => typeof e == "object" && !Array.isArray(e);
function Hw(e, t, n = t, r = Cn) {
  const s = V.useRef([]),
    o = w0.useSyncExternalStoreWithSelector(
      e,
      t,
      n,
      (i) => i,
      (i, a) => {
        if (si(i) && si(a) && s.current.length) {
          for (const c of s.current) if (!r(i[c], a[c])) return !1;
          return !0;
        }
        return r(i, a);
      }
    );
  return V.useMemo(() => {
    if (si(o)) {
      const i = { ...o };
      let a = {};
      for (const [c, u] of Object.entries(i))
        a = {
          ...a,
          [c]: {
            configurable: !1,
            enumerable: !0,
            get: () => (s.current.includes(c) || s.current.push(c), u),
          },
        };
      return Object.defineProperties(i, a), i;
    }
    return o;
  }, [o]);
}
function Fv(e = {}) {
  const t = Be(e);
  return Hw(
    (n) => X5(t, { onChange: n }),
    () => d0(t)
  );
}
var $r = class {
    constructor() {
      (this.listeners = new Set()),
        (this.subscribe = this.subscribe.bind(this));
    }
    subscribe(e) {
      return (
        this.listeners.add(e),
        this.onSubscribe(),
        () => {
          this.listeners.delete(e), this.onUnsubscribe();
        }
      );
    }
    hasListeners() {
      return this.listeners.size > 0;
    }
    onSubscribe() {}
    onUnsubscribe() {}
  },
  Gw = {
    setTimeout: (e, t) => setTimeout(e, t),
    clearTimeout: (e) => clearTimeout(e),
    setInterval: (e, t) => setInterval(e, t),
    clearInterval: (e) => clearInterval(e),
  },
  _t,
  ua,
  Nu,
  Vw =
    ((Nu = class {
      constructor() {
        U(this, _t, Gw);
        U(this, ua, !1);
      }
      setTimeoutProvider(e) {
        _(this, _t, e);
      }
      setTimeout(e, t) {
        return g(this, _t).setTimeout(e, t);
      }
      clearTimeout(e) {
        g(this, _t).clearTimeout(e);
      }
      setInterval(e, t) {
        return g(this, _t).setInterval(e, t);
      }
      clearInterval(e) {
        g(this, _t).clearInterval(e);
      }
    }),
    (_t = new WeakMap()),
    (ua = new WeakMap()),
    Nu),
  sn = new Vw();
function Ww(e) {
  setTimeout(e, 0);
}
var On = typeof window > "u" || "Deno" in globalThis;
function le() {}
function Kw(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Qi(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function v0(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Wt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function _e(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function $u(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: s,
    predicate: o,
    queryKey: i,
    stale: a,
  } = e;
  if (i) {
    if (r) {
      if (t.queryHash !== ac(i, t.options)) return !1;
    } else if (!ts(t.queryKey, i)) return !1;
  }
  if (n !== "all") {
    const c = t.isActive();
    if ((n === "active" && !c) || (n === "inactive" && c)) return !1;
  }
  return !(
    (typeof a == "boolean" && t.isStale() !== a) ||
    (s && s !== t.state.fetchStatus) ||
    (o && !o(t))
  );
}
function Iu(e, t) {
  const { exact: n, status: r, predicate: s, mutationKey: o } = e;
  if (o) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (Tn(t.options.mutationKey) !== Tn(o)) return !1;
    } else if (!ts(t.options.mutationKey, o)) return !1;
  }
  return !((r && t.state.status !== r) || (s && !s(t)));
}
function ac(e, t) {
  return (t?.queryKeyHashFn || Tn)(e);
}
function Tn(e) {
  return JSON.stringify(e, (t, n) =>
    Zi(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, s) => ((r[s] = n[s]), r), {})
      : n
  );
}
function ts(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
    ? !1
    : e && t && typeof e == "object" && typeof t == "object"
    ? Object.keys(t).every((n) => ts(e[n], t[n]))
    : !1;
}
var Qw = Object.prototype.hasOwnProperty;
function cc(e, t) {
  if (e === t) return e;
  const n = Au(e) && Au(t);
  if (!n && !(Zi(e) && Zi(t))) return t;
  const s = (n ? e : Object.keys(e)).length,
    o = n ? t : Object.keys(t),
    i = o.length,
    a = n ? new Array(i) : {};
  let c = 0;
  for (let u = 0; u < i; u++) {
    const f = n ? u : o[u],
      d = e[f],
      l = t[f];
    if (d === l) {
      (a[f] = d), (n ? u < s : Qw.call(e, f)) && c++;
      continue;
    }
    if (
      d === null ||
      l === null ||
      typeof d != "object" ||
      typeof l != "object"
    ) {
      a[f] = l;
      continue;
    }
    const h = cc(d, l);
    (a[f] = h), h === d && c++;
  }
  return s === i && c === s ? e : a;
}
function to(e, t) {
  if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Au(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function Zi(e) {
  if (!Cu(e)) return !1;
  const t = e.constructor;
  if (t === void 0) return !0;
  const n = t.prototype;
  return !(
    !Cu(n) ||
    !n.hasOwnProperty("isPrototypeOf") ||
    Object.getPrototypeOf(e) !== Object.prototype
  );
}
function Cu(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function Zw(e) {
  return new Promise((t) => {
    sn.setTimeout(t, e);
  });
}
function Yi(e, t, n) {
  return typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
    ? cc(e, t)
    : t;
}
function Yw(e, t, n = 0) {
  const r = [...e, t];
  return n && r.length > n ? r.slice(1) : r;
}
function Jw(e, t, n = 0) {
  const r = [t, ...e];
  return n && r.length > n ? r.slice(0, -1) : r;
}
var uc = Symbol();
function x0(e, t) {
  return !e.queryFn && t?.initialPromise
    ? () => t.initialPromise
    : !e.queryFn || e.queryFn === uc
    ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
    : e.queryFn;
}
function E0(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
var on,
  Nt,
  Qn,
  Fu,
  Xw =
    ((Fu = class extends $r {
      constructor() {
        super();
        U(this, on);
        U(this, Nt);
        U(this, Qn);
        _(this, Qn, (t) => {
          if (!On && window.addEventListener) {
            const n = () => t();
            return (
              window.addEventListener("visibilitychange", n, !1),
              () => {
                window.removeEventListener("visibilitychange", n);
              }
            );
          }
        });
      }
      onSubscribe() {
        g(this, Nt) || this.setEventListener(g(this, Qn));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = g(this, Nt)) == null || t.call(this), _(this, Nt, void 0));
      }
      setEventListener(t) {
        var n;
        _(this, Qn, t),
          (n = g(this, Nt)) == null || n.call(this),
          _(
            this,
            Nt,
            t((r) => {
              typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
            })
          );
      }
      setFocused(t) {
        g(this, on) !== t && (_(this, on, t), this.onFocus());
      }
      onFocus() {
        const t = this.isFocused();
        this.listeners.forEach((n) => {
          n(t);
        });
      }
      isFocused() {
        return typeof g(this, on) == "boolean"
          ? g(this, on)
          : globalThis.document?.visibilityState !== "hidden";
      }
    }),
    (on = new WeakMap()),
    (Nt = new WeakMap()),
    (Qn = new WeakMap()),
    Fu),
  fc = new Xw();
function Ji() {
  let e, t;
  const n = new Promise((s, o) => {
    (e = s), (t = o);
  });
  (n.status = "pending"), n.catch(() => {});
  function r(s) {
    Object.assign(n, s), delete n.resolve, delete n.reject;
  }
  return (
    (n.resolve = (s) => {
      r({ status: "fulfilled", value: s }), e(s);
    }),
    (n.reject = (s) => {
      r({ status: "rejected", reason: s }), t(s);
    }),
    n
  );
}
var e2 = Ww;
function t2() {
  let e = [],
    t = 0,
    n = (a) => {
      a();
    },
    r = (a) => {
      a();
    },
    s = e2;
  const o = (a) => {
      t
        ? e.push(a)
        : s(() => {
            n(a);
          });
    },
    i = () => {
      const a = e;
      (e = []),
        a.length &&
          s(() => {
            r(() => {
              a.forEach((c) => {
                n(c);
              });
            });
          });
    };
  return {
    batch: (a) => {
      let c;
      t++;
      try {
        c = a();
      } finally {
        t--, t || i();
      }
      return c;
    },
    batchCalls:
      (a) =>
      (...c) => {
        o(() => {
          a(...c);
        });
      },
    schedule: o,
    setNotifyFunction: (a) => {
      n = a;
    },
    setBatchNotifyFunction: (a) => {
      r = a;
    },
    setScheduler: (a) => {
      s = a;
    },
  };
}
var te = t2(),
  Zn,
  Ft,
  Yn,
  ju,
  n2 =
    ((ju = class extends $r {
      constructor() {
        super();
        U(this, Zn, !0);
        U(this, Ft);
        U(this, Yn);
        _(this, Yn, (t) => {
          if (!On && window.addEventListener) {
            const n = () => t(!0),
              r = () => t(!1);
            return (
              window.addEventListener("online", n, !1),
              window.addEventListener("offline", r, !1),
              () => {
                window.removeEventListener("online", n),
                  window.removeEventListener("offline", r);
              }
            );
          }
        });
      }
      onSubscribe() {
        g(this, Ft) || this.setEventListener(g(this, Yn));
      }
      onUnsubscribe() {
        var t;
        this.hasListeners() ||
          ((t = g(this, Ft)) == null || t.call(this), _(this, Ft, void 0));
      }
      setEventListener(t) {
        var n;
        _(this, Yn, t),
          (n = g(this, Ft)) == null || n.call(this),
          _(this, Ft, t(this.setOnline.bind(this)));
      }
      setOnline(t) {
        g(this, Zn) !== t &&
          (_(this, Zn, t),
          this.listeners.forEach((r) => {
            r(t);
          }));
      }
      isOnline() {
        return g(this, Zn);
      }
    }),
    (Zn = new WeakMap()),
    (Ft = new WeakMap()),
    (Yn = new WeakMap()),
    ju),
  no = new n2();
function r2(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function P0(e) {
  return (e ?? "online") === "online" ? no.isOnline() : !0;
}
var Xi = class extends Error {
  constructor(e) {
    super("CancelledError"),
      (this.revert = e?.revert),
      (this.silent = e?.silent);
  }
};
function S0(e) {
  let t = !1,
    n = 0,
    r;
  const s = Ji(),
    o = () => s.status !== "pending",
    i = (p) => {
      if (!o()) {
        const y = new Xi(p);
        l(y), e.onCancel?.(y);
      }
    },
    a = () => {
      t = !0;
    },
    c = () => {
      t = !1;
    },
    u = () =>
      fc.isFocused() &&
      (e.networkMode === "always" || no.isOnline()) &&
      e.canRun(),
    f = () => P0(e.networkMode) && e.canRun(),
    d = (p) => {
      o() || (r?.(), s.resolve(p));
    },
    l = (p) => {
      o() || (r?.(), s.reject(p));
    },
    h = () =>
      new Promise((p) => {
        (r = (y) => {
          (o() || u()) && p(y);
        }),
          e.onPause?.();
      }).then(() => {
        (r = void 0), o() || e.onContinue?.();
      }),
    b = () => {
      if (o()) return;
      let p;
      const y = n === 0 ? e.initialPromise : void 0;
      try {
        p = y ?? e.fn();
      } catch (x) {
        p = Promise.reject(x);
      }
      Promise.resolve(p)
        .then(d)
        .catch((x) => {
          if (o()) return;
          const S = e.retry ?? (On ? 0 : 3),
            w = e.retryDelay ?? r2,
            v = typeof w == "function" ? w(n, x) : w,
            m =
              S === !0 ||
              (typeof S == "number" && n < S) ||
              (typeof S == "function" && S(n, x));
          if (t || !m) {
            l(x);
            return;
          }
          n++,
            e.onFail?.(n, x),
            Zw(v)
              .then(() => (u() ? void 0 : h()))
              .then(() => {
                t ? l(x) : b();
              });
        });
    };
  return {
    promise: s,
    status: () => s.status,
    cancel: i,
    continue: () => (r?.(), s),
    cancelRetry: a,
    continueRetry: c,
    canStart: f,
    start: () => (f() ? b() : h().then(b), s),
  };
}
var an,
  zu,
  $0 =
    ((zu = class {
      constructor() {
        U(this, an);
      }
      destroy() {
        this.clearGcTimeout();
      }
      scheduleGc() {
        this.clearGcTimeout(),
          Qi(this.gcTime) &&
            _(
              this,
              an,
              sn.setTimeout(() => {
                this.optionalRemove();
              }, this.gcTime)
            );
      }
      updateGcTime(e) {
        this.gcTime = Math.max(
          this.gcTime || 0,
          e ?? (On ? 1 / 0 : 5 * 60 * 1e3)
        );
      }
      clearGcTimeout() {
        g(this, an) && (sn.clearTimeout(g(this, an)), _(this, an, void 0));
      }
    }),
    (an = new WeakMap()),
    zu),
  cn,
  Jn,
  Me,
  un,
  re,
  ns,
  fn,
  Le,
  at,
  Uu,
  s2 =
    ((Uu = class extends $0 {
      constructor(t) {
        super();
        U(this, Le);
        U(this, cn);
        U(this, Jn);
        U(this, Me);
        U(this, un);
        U(this, re);
        U(this, ns);
        U(this, fn);
        _(this, fn, !1),
          _(this, ns, t.defaultOptions),
          this.setOptions(t.options),
          (this.observers = []),
          _(this, un, t.client),
          _(this, Me, g(this, un).getQueryCache()),
          (this.queryKey = t.queryKey),
          (this.queryHash = t.queryHash),
          _(this, cn, Ou(this.options)),
          (this.state = t.state ?? g(this, cn)),
          this.scheduleGc();
      }
      get meta() {
        return this.options.meta;
      }
      get promise() {
        return g(this, re)?.promise;
      }
      setOptions(t) {
        if (
          ((this.options = { ...g(this, ns), ...t }),
          this.updateGcTime(this.options.gcTime),
          this.state && this.state.data === void 0)
        ) {
          const n = Ou(this.options);
          n.data !== void 0 &&
            (this.setData(n.data, { updatedAt: n.dataUpdatedAt, manual: !0 }),
            _(this, cn, n));
        }
      }
      optionalRemove() {
        !this.observers.length &&
          this.state.fetchStatus === "idle" &&
          g(this, Me).remove(this);
      }
      setData(t, n) {
        const r = Yi(this.state.data, t, this.options);
        return (
          q(this, Le, at).call(this, {
            data: r,
            type: "success",
            dataUpdatedAt: n?.updatedAt,
            manual: n?.manual,
          }),
          r
        );
      }
      setState(t, n) {
        q(this, Le, at).call(this, {
          type: "setState",
          state: t,
          setStateOptions: n,
        });
      }
      cancel(t) {
        const n = g(this, re)?.promise;
        return (
          g(this, re)?.cancel(t), n ? n.then(le).catch(le) : Promise.resolve()
        );
      }
      destroy() {
        super.destroy(), this.cancel({ silent: !0 });
      }
      reset() {
        this.destroy(), this.setState(g(this, cn));
      }
      isActive() {
        return this.observers.some((t) => _e(t.options.enabled, this) !== !1);
      }
      isDisabled() {
        return this.getObserversCount() > 0
          ? !this.isActive()
          : this.options.queryFn === uc ||
              this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
      }
      isStatic() {
        return this.getObserversCount() > 0
          ? this.observers.some(
              (t) => Wt(t.options.staleTime, this) === "static"
            )
          : !1;
      }
      isStale() {
        return this.getObserversCount() > 0
          ? this.observers.some((t) => t.getCurrentResult().isStale)
          : this.state.data === void 0 || this.state.isInvalidated;
      }
      isStaleByTime(t = 0) {
        return this.state.data === void 0
          ? !0
          : t === "static"
          ? !1
          : this.state.isInvalidated
          ? !0
          : !v0(this.state.dataUpdatedAt, t);
      }
      onFocus() {
        this.observers
          .find((n) => n.shouldFetchOnWindowFocus())
          ?.refetch({ cancelRefetch: !1 }),
          g(this, re)?.continue();
      }
      onOnline() {
        this.observers
          .find((n) => n.shouldFetchOnReconnect())
          ?.refetch({ cancelRefetch: !1 }),
          g(this, re)?.continue();
      }
      addObserver(t) {
        this.observers.includes(t) ||
          (this.observers.push(t),
          this.clearGcTimeout(),
          g(this, Me).notify({
            type: "observerAdded",
            query: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        this.observers.includes(t) &&
          ((this.observers = this.observers.filter((n) => n !== t)),
          this.observers.length ||
            (g(this, re) &&
              (g(this, fn)
                ? g(this, re).cancel({ revert: !0 })
                : g(this, re).cancelRetry()),
            this.scheduleGc()),
          g(this, Me).notify({
            type: "observerRemoved",
            query: this,
            observer: t,
          }));
      }
      getObserversCount() {
        return this.observers.length;
      }
      invalidate() {
        this.state.isInvalidated ||
          q(this, Le, at).call(this, { type: "invalidate" });
      }
      async fetch(t, n) {
        if (
          this.state.fetchStatus !== "idle" &&
          g(this, re)?.status() !== "rejected"
        ) {
          if (this.state.data !== void 0 && n?.cancelRefetch)
            this.cancel({ silent: !0 });
          else if (g(this, re))
            return g(this, re).continueRetry(), g(this, re).promise;
        }
        if ((t && this.setOptions(t), !this.options.queryFn)) {
          const c = this.observers.find((u) => u.options.queryFn);
          c && this.setOptions(c.options);
        }
        const r = new AbortController(),
          s = (c) => {
            Object.defineProperty(c, "signal", {
              enumerable: !0,
              get: () => (_(this, fn, !0), r.signal),
            });
          },
          o = () => {
            const c = x0(this.options, n),
              f = (() => {
                const d = {
                  client: g(this, un),
                  queryKey: this.queryKey,
                  meta: this.meta,
                };
                return s(d), d;
              })();
            return (
              _(this, fn, !1),
              this.options.persister ? this.options.persister(c, f, this) : c(f)
            );
          },
          a = (() => {
            const c = {
              fetchOptions: n,
              options: this.options,
              queryKey: this.queryKey,
              client: g(this, un),
              state: this.state,
              fetchFn: o,
            };
            return s(c), c;
          })();
        this.options.behavior?.onFetch(a, this),
          _(this, Jn, this.state),
          (this.state.fetchStatus === "idle" ||
            this.state.fetchMeta !== a.fetchOptions?.meta) &&
            q(this, Le, at).call(this, {
              type: "fetch",
              meta: a.fetchOptions?.meta,
            }),
          _(
            this,
            re,
            S0({
              initialPromise: n?.initialPromise,
              fn: a.fetchFn,
              onCancel: (c) => {
                c instanceof Xi &&
                  c.revert &&
                  this.setState({ ...g(this, Jn), fetchStatus: "idle" }),
                  r.abort();
              },
              onFail: (c, u) => {
                q(this, Le, at).call(this, {
                  type: "failed",
                  failureCount: c,
                  error: u,
                });
              },
              onPause: () => {
                q(this, Le, at).call(this, { type: "pause" });
              },
              onContinue: () => {
                q(this, Le, at).call(this, { type: "continue" });
              },
              retry: a.options.retry,
              retryDelay: a.options.retryDelay,
              networkMode: a.options.networkMode,
              canRun: () => !0,
            })
          );
        try {
          const c = await g(this, re).start();
          if (c === void 0)
            throw new Error(`${this.queryHash} data is undefined`);
          return (
            this.setData(c),
            g(this, Me).config.onSuccess?.(c, this),
            g(this, Me).config.onSettled?.(c, this.state.error, this),
            c
          );
        } catch (c) {
          if (c instanceof Xi) {
            if (c.silent) return g(this, re).promise;
            if (c.revert) {
              if (this.state.data === void 0) throw c;
              return this.state.data;
            }
          }
          throw (
            (q(this, Le, at).call(this, { type: "error", error: c }),
            g(this, Me).config.onError?.(c, this),
            g(this, Me).config.onSettled?.(this.state.data, c, this),
            c)
          );
        } finally {
          this.scheduleGc();
        }
      }
    }),
    (cn = new WeakMap()),
    (Jn = new WeakMap()),
    (Me = new WeakMap()),
    (un = new WeakMap()),
    (re = new WeakMap()),
    (ns = new WeakMap()),
    (fn = new WeakMap()),
    (Le = new WeakSet()),
    (at = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              fetchFailureCount: t.failureCount,
              fetchFailureReason: t.error,
            };
          case "pause":
            return { ...r, fetchStatus: "paused" };
          case "continue":
            return { ...r, fetchStatus: "fetching" };
          case "fetch":
            return {
              ...r,
              ...I0(r.data, this.options),
              fetchMeta: t.meta ?? null,
            };
          case "success":
            const s = {
              ...r,
              data: t.data,
              dataUpdateCount: r.dataUpdateCount + 1,
              dataUpdatedAt: t.dataUpdatedAt ?? Date.now(),
              error: null,
              isInvalidated: !1,
              status: "success",
              ...(!t.manual && {
                fetchStatus: "idle",
                fetchFailureCount: 0,
                fetchFailureReason: null,
              }),
            };
            return _(this, Jn, t.manual ? s : void 0), s;
          case "error":
            const o = t.error;
            return {
              ...r,
              error: o,
              errorUpdateCount: r.errorUpdateCount + 1,
              errorUpdatedAt: Date.now(),
              fetchFailureCount: r.fetchFailureCount + 1,
              fetchFailureReason: o,
              fetchStatus: "idle",
              status: "error",
            };
          case "invalidate":
            return { ...r, isInvalidated: !0 };
          case "setState":
            return { ...r, ...t.state };
        }
      };
      (this.state = n(this.state)),
        te.batch(() => {
          this.observers.forEach((r) => {
            r.onQueryUpdate();
          }),
            g(this, Me).notify({ query: this, type: "updated", action: t });
        });
    }),
    Uu);
function I0(e, t) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: P0(t.networkMode) ? "fetching" : "paused",
    ...(e === void 0 && { error: null, status: "pending" }),
  };
}
function Ou(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = t !== void 0,
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "pending",
    fetchStatus: "idle",
  };
}
var me,
  G,
  rs,
  fe,
  dn,
  Xn,
  ut,
  jt,
  ss,
  er,
  tr,
  ln,
  hn,
  zt,
  nr,
  Q,
  Br,
  ea,
  ta,
  na,
  ra,
  sa,
  oa,
  ia,
  A0,
  Lu,
  o2 =
    ((Lu = class extends $r {
      constructor(t, n) {
        super();
        U(this, Q);
        U(this, me);
        U(this, G);
        U(this, rs);
        U(this, fe);
        U(this, dn);
        U(this, Xn);
        U(this, ut);
        U(this, jt);
        U(this, ss);
        U(this, er);
        U(this, tr);
        U(this, ln);
        U(this, hn);
        U(this, zt);
        U(this, nr, new Set());
        (this.options = n),
          _(this, me, t),
          _(this, jt, null),
          _(this, ut, Ji()),
          this.bindMethods(),
          this.setOptions(n);
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (g(this, G).addObserver(this),
          Tu(g(this, G), this.options)
            ? q(this, Q, Br).call(this)
            : this.updateResult(),
          q(this, Q, ra).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return aa(g(this, G), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return aa(g(this, G), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        (this.listeners = new Set()),
          q(this, Q, sa).call(this),
          q(this, Q, oa).call(this),
          g(this, G).removeObserver(this);
      }
      setOptions(t) {
        const n = this.options,
          r = g(this, G);
        if (
          ((this.options = g(this, me).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof _e(this.options.enabled, g(this, G)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean"
          );
        q(this, Q, ia).call(this),
          g(this, G).setOptions(this.options),
          n._defaulted &&
            !to(this.options, n) &&
            g(this, me)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: g(this, G),
                observer: this,
              });
        const s = this.hasListeners();
        s && Bu(g(this, G), r, this.options, n) && q(this, Q, Br).call(this),
          this.updateResult(),
          s &&
            (g(this, G) !== r ||
              _e(this.options.enabled, g(this, G)) !==
                _e(n.enabled, g(this, G)) ||
              Wt(this.options.staleTime, g(this, G)) !==
                Wt(n.staleTime, g(this, G))) &&
            q(this, Q, ea).call(this);
        const o = q(this, Q, ta).call(this);
        s &&
          (g(this, G) !== r ||
            _e(this.options.enabled, g(this, G)) !==
              _e(n.enabled, g(this, G)) ||
            o !== g(this, zt)) &&
          q(this, Q, na).call(this, o);
      }
      getOptimisticResult(t) {
        const n = g(this, me).getQueryCache().build(g(this, me), t),
          r = this.createResult(n, t);
        return (
          a2(this, r) &&
            (_(this, fe, r),
            _(this, Xn, this.options),
            _(this, dn, g(this, G).state)),
          r
        );
      }
      getCurrentResult() {
        return g(this, fe);
      }
      trackResult(t, n) {
        return new Proxy(t, {
          get: (r, s) => (
            this.trackProp(s),
            n?.(s),
            s === "promise" &&
              (this.trackProp("data"),
              !this.options.experimental_prefetchInRender &&
                g(this, ut).status === "pending" &&
                g(this, ut).reject(
                  new Error(
                    "experimental_prefetchInRender feature flag is not enabled"
                  )
                )),
            Reflect.get(r, s)
          ),
        });
      }
      trackProp(t) {
        g(this, nr).add(t);
      }
      getCurrentQuery() {
        return g(this, G);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const n = g(this, me).defaultQueryOptions(t),
          r = g(this, me).getQueryCache().build(g(this, me), n);
        return r.fetch().then(() => this.createResult(r, n));
      }
      fetch(t) {
        return q(this, Q, Br)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), g(this, fe)));
      }
      createResult(t, n) {
        const r = g(this, G),
          s = this.options,
          o = g(this, fe),
          i = g(this, dn),
          a = g(this, Xn),
          u = t !== r ? t.state : g(this, rs),
          { state: f } = t;
        let d = { ...f },
          l = !1,
          h;
        if (n._optimisticResults) {
          const I = this.hasListeners(),
            C = !I && Tu(t, n),
            O = I && Bu(t, r, n, s);
          (C || O) && (d = { ...d, ...I0(f.data, t.options) }),
            n._optimisticResults === "isRestoring" && (d.fetchStatus = "idle");
        }
        let { error: b, errorUpdatedAt: p, status: y } = d;
        h = d.data;
        let x = !1;
        if (n.placeholderData !== void 0 && h === void 0 && y === "pending") {
          let I;
          o?.isPlaceholderData && n.placeholderData === a?.placeholderData
            ? ((I = o.data), (x = !0))
            : (I =
                typeof n.placeholderData == "function"
                  ? n.placeholderData(g(this, tr)?.state.data, g(this, tr))
                  : n.placeholderData),
            I !== void 0 &&
              ((y = "success"), (h = Yi(o?.data, I, n)), (l = !0));
        }
        if (n.select && h !== void 0 && !x)
          if (o && h === i?.data && n.select === g(this, ss)) h = g(this, er);
          else
            try {
              _(this, ss, n.select),
                (h = n.select(h)),
                (h = Yi(o?.data, h, n)),
                _(this, er, h),
                _(this, jt, null);
            } catch (I) {
              _(this, jt, I);
            }
        g(this, jt) &&
          ((b = g(this, jt)),
          (h = g(this, er)),
          (p = Date.now()),
          (y = "error"));
        const S = d.fetchStatus === "fetching",
          w = y === "pending",
          v = y === "error",
          m = w && S,
          P = h !== void 0,
          $ = {
            status: y,
            fetchStatus: d.fetchStatus,
            isPending: w,
            isSuccess: y === "success",
            isError: v,
            isInitialLoading: m,
            isLoading: m,
            data: h,
            dataUpdatedAt: d.dataUpdatedAt,
            error: b,
            errorUpdatedAt: p,
            failureCount: d.fetchFailureCount,
            failureReason: d.fetchFailureReason,
            errorUpdateCount: d.errorUpdateCount,
            isFetched: d.dataUpdateCount > 0 || d.errorUpdateCount > 0,
            isFetchedAfterMount:
              d.dataUpdateCount > u.dataUpdateCount ||
              d.errorUpdateCount > u.errorUpdateCount,
            isFetching: S,
            isRefetching: S && !w,
            isLoadingError: v && !P,
            isPaused: d.fetchStatus === "paused",
            isPlaceholderData: l,
            isRefetchError: v && P,
            isStale: dc(t, n),
            refetch: this.refetch,
            promise: g(this, ut),
            isEnabled: _e(n.enabled, t) !== !1,
          };
        if (this.options.experimental_prefetchInRender) {
          const I = (R) => {
              $.status === "error"
                ? R.reject($.error)
                : $.data !== void 0 && R.resolve($.data);
            },
            C = () => {
              const R = _(this, ut, ($.promise = Ji()));
              I(R);
            },
            O = g(this, ut);
          switch (O.status) {
            case "pending":
              t.queryHash === r.queryHash && I(O);
              break;
            case "fulfilled":
              ($.status === "error" || $.data !== O.value) && C();
              break;
            case "rejected":
              ($.status !== "error" || $.error !== O.reason) && C();
              break;
          }
        }
        return $;
      }
      updateResult() {
        const t = g(this, fe),
          n = this.createResult(g(this, G), this.options);
        if (
          (_(this, dn, g(this, G).state),
          _(this, Xn, this.options),
          g(this, dn).data !== void 0 && _(this, tr, g(this, G)),
          to(n, t))
        )
          return;
        _(this, fe, n);
        const r = () => {
          if (!t) return !0;
          const { notifyOnChangeProps: s } = this.options,
            o = typeof s == "function" ? s() : s;
          if (o === "all" || (!o && !g(this, nr).size)) return !0;
          const i = new Set(o ?? g(this, nr));
          return (
            this.options.throwOnError && i.add("error"),
            Object.keys(g(this, fe)).some((a) => {
              const c = a;
              return g(this, fe)[c] !== t[c] && i.has(c);
            })
          );
        };
        q(this, Q, A0).call(this, { listeners: r() });
      }
      onQueryUpdate() {
        this.updateResult(), this.hasListeners() && q(this, Q, ra).call(this);
      }
    }),
    (me = new WeakMap()),
    (G = new WeakMap()),
    (rs = new WeakMap()),
    (fe = new WeakMap()),
    (dn = new WeakMap()),
    (Xn = new WeakMap()),
    (ut = new WeakMap()),
    (jt = new WeakMap()),
    (ss = new WeakMap()),
    (er = new WeakMap()),
    (tr = new WeakMap()),
    (ln = new WeakMap()),
    (hn = new WeakMap()),
    (zt = new WeakMap()),
    (nr = new WeakMap()),
    (Q = new WeakSet()),
    (Br = function (t) {
      q(this, Q, ia).call(this);
      let n = g(this, G).fetch(this.options, t);
      return t?.throwOnError || (n = n.catch(le)), n;
    }),
    (ea = function () {
      q(this, Q, sa).call(this);
      const t = Wt(this.options.staleTime, g(this, G));
      if (On || g(this, fe).isStale || !Qi(t)) return;
      const r = v0(g(this, fe).dataUpdatedAt, t) + 1;
      _(
        this,
        ln,
        sn.setTimeout(() => {
          g(this, fe).isStale || this.updateResult();
        }, r)
      );
    }),
    (ta = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(g(this, G))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (na = function (t) {
      q(this, Q, oa).call(this),
        _(this, zt, t),
        !(
          On ||
          _e(this.options.enabled, g(this, G)) === !1 ||
          !Qi(g(this, zt)) ||
          g(this, zt) === 0
        ) &&
          _(
            this,
            hn,
            sn.setInterval(() => {
              (this.options.refetchIntervalInBackground || fc.isFocused()) &&
                q(this, Q, Br).call(this);
            }, g(this, zt))
          );
    }),
    (ra = function () {
      q(this, Q, ea).call(this),
        q(this, Q, na).call(this, q(this, Q, ta).call(this));
    }),
    (sa = function () {
      g(this, ln) && (sn.clearTimeout(g(this, ln)), _(this, ln, void 0));
    }),
    (oa = function () {
      g(this, hn) && (sn.clearInterval(g(this, hn)), _(this, hn, void 0));
    }),
    (ia = function () {
      const t = g(this, me).getQueryCache().build(g(this, me), this.options);
      if (t === g(this, G)) return;
      const n = g(this, G);
      _(this, G, t),
        _(this, rs, t.state),
        this.hasListeners() && (n?.removeObserver(this), t.addObserver(this));
    }),
    (A0 = function (t) {
      te.batch(() => {
        t.listeners &&
          this.listeners.forEach((n) => {
            n(g(this, fe));
          }),
          g(this, me)
            .getQueryCache()
            .notify({ query: g(this, G), type: "observerResultsUpdated" });
      });
    }),
    Lu);
function i2(e, t) {
  return (
    _e(t.enabled, e) !== !1 &&
    e.state.data === void 0 &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function Tu(e, t) {
  return i2(e, t) || (e.state.data !== void 0 && aa(e, t, t.refetchOnMount));
}
function aa(e, t, n) {
  if (_e(t.enabled, e) !== !1 && Wt(t.staleTime, e) !== "static") {
    const r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && dc(e, t));
  }
  return !1;
}
function Bu(e, t, n, r) {
  return (
    (e !== t || _e(r.enabled, e) === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    dc(e, n)
  );
}
function dc(e, t) {
  return _e(t.enabled, e) !== !1 && e.isStaleByTime(Wt(t.staleTime, e));
}
function a2(e, t) {
  return !to(e.getCurrentResult(), t);
}
function Ru(e) {
  return {
    onFetch: (t, n) => {
      const r = t.options,
        s = t.fetchOptions?.meta?.fetchMore?.direction,
        o = t.state.data?.pages || [],
        i = t.state.data?.pageParams || [];
      let a = { pages: [], pageParams: [] },
        c = 0;
      const u = async () => {
        let f = !1;
        const d = (b) => {
            Object.defineProperty(b, "signal", {
              enumerable: !0,
              get: () => (
                t.signal.aborted
                  ? (f = !0)
                  : t.signal.addEventListener("abort", () => {
                      f = !0;
                    }),
                t.signal
              ),
            });
          },
          l = x0(t.options, t.fetchOptions),
          h = async (b, p, y) => {
            if (f) return Promise.reject();
            if (p == null && b.pages.length) return Promise.resolve(b);
            const S = (() => {
                const P = {
                  client: t.client,
                  queryKey: t.queryKey,
                  pageParam: p,
                  direction: y ? "backward" : "forward",
                  meta: t.options.meta,
                };
                return d(P), P;
              })(),
              w = await l(S),
              { maxPages: v } = t.options,
              m = y ? Jw : Yw;
            return {
              pages: m(b.pages, w, v),
              pageParams: m(b.pageParams, p, v),
            };
          };
        if (s && o.length) {
          const b = s === "backward",
            p = b ? c2 : ku,
            y = { pages: o, pageParams: i },
            x = p(r, y);
          a = await h(y, x, b);
        } else {
          const b = e ?? o.length;
          do {
            const p = c === 0 ? i[0] ?? r.initialPageParam : ku(r, a);
            if (c > 0 && p == null) break;
            (a = await h(a, p)), c++;
          } while (c < b);
        }
        return a;
      };
      t.options.persister
        ? (t.fetchFn = () =>
            t.options.persister?.(
              u,
              {
                client: t.client,
                queryKey: t.queryKey,
                meta: t.options.meta,
                signal: t.signal,
              },
              n
            ))
        : (t.fetchFn = u);
    },
  };
}
function ku(e, { pages: t, pageParams: n }) {
  const r = t.length - 1;
  return t.length > 0 ? e.getNextPageParam(t[r], t, n[r], n) : void 0;
}
function c2(e, { pages: t, pageParams: n }) {
  return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, n[0], n) : void 0;
}
var os,
  Ye,
  de,
  pn,
  Je,
  Mt,
  Du,
  u2 =
    ((Du = class extends $0 {
      constructor(t) {
        super();
        U(this, Je);
        U(this, os);
        U(this, Ye);
        U(this, de);
        U(this, pn);
        _(this, os, t.client),
          (this.mutationId = t.mutationId),
          _(this, de, t.mutationCache),
          _(this, Ye, []),
          (this.state = t.state || C0()),
          this.setOptions(t.options),
          this.scheduleGc();
      }
      setOptions(t) {
        (this.options = t), this.updateGcTime(this.options.gcTime);
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        g(this, Ye).includes(t) ||
          (g(this, Ye).push(t),
          this.clearGcTimeout(),
          g(this, de).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        _(
          this,
          Ye,
          g(this, Ye).filter((n) => n !== t)
        ),
          this.scheduleGc(),
          g(this, de).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          });
      }
      optionalRemove() {
        g(this, Ye).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : g(this, de).remove(this));
      }
      continue() {
        return g(this, pn)?.continue() ?? this.execute(this.state.variables);
      }
      async execute(t) {
        const n = () => {
            q(this, Je, Mt).call(this, { type: "continue" });
          },
          r = {
            client: g(this, os),
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        _(
          this,
          pn,
          S0({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t, r)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (i, a) => {
              q(this, Je, Mt).call(this, {
                type: "failed",
                failureCount: i,
                error: a,
              });
            },
            onPause: () => {
              q(this, Je, Mt).call(this, { type: "pause" });
            },
            onContinue: n,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => g(this, de).canRun(this),
          })
        );
        const s = this.state.status === "pending",
          o = !g(this, pn).canStart();
        try {
          if (s) n();
          else {
            q(this, Je, Mt).call(this, {
              type: "pending",
              variables: t,
              isPaused: o,
            }),
              await g(this, de).config.onMutate?.(t, this, r);
            const a = await this.options.onMutate?.(t, r);
            a !== this.state.context &&
              q(this, Je, Mt).call(this, {
                type: "pending",
                context: a,
                variables: t,
                isPaused: o,
              });
          }
          const i = await g(this, pn).start();
          return (
            await g(this, de).config.onSuccess?.(
              i,
              t,
              this.state.context,
              this,
              r
            ),
            await this.options.onSuccess?.(i, t, this.state.context, r),
            await g(this, de).config.onSettled?.(
              i,
              null,
              this.state.variables,
              this.state.context,
              this,
              r
            ),
            await this.options.onSettled?.(i, null, t, this.state.context, r),
            q(this, Je, Mt).call(this, { type: "success", data: i }),
            i
          );
        } catch (i) {
          try {
            throw (
              (await g(this, de).config.onError?.(
                i,
                t,
                this.state.context,
                this,
                r
              ),
              await this.options.onError?.(i, t, this.state.context, r),
              await g(this, de).config.onSettled?.(
                void 0,
                i,
                this.state.variables,
                this.state.context,
                this,
                r
              ),
              await this.options.onSettled?.(
                void 0,
                i,
                t,
                this.state.context,
                r
              ),
              i)
            );
          } finally {
            q(this, Je, Mt).call(this, { type: "error", error: i });
          }
        } finally {
          g(this, de).runNext(this);
        }
      }
    }),
    (os = new WeakMap()),
    (Ye = new WeakMap()),
    (de = new WeakMap()),
    (pn = new WeakMap()),
    (Je = new WeakSet()),
    (Mt = function (t) {
      const n = (r) => {
        switch (t.type) {
          case "failed":
            return {
              ...r,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...r, isPaused: !0 };
          case "continue":
            return { ...r, isPaused: !1 };
          case "pending":
            return {
              ...r,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...r,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...r,
              data: void 0,
              error: t.error,
              failureCount: r.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      (this.state = n(this.state)),
        te.batch(() => {
          g(this, Ye).forEach((r) => {
            r.onMutationUpdate(t);
          }),
            g(this, de).notify({ mutation: this, type: "updated", action: t });
        });
    }),
    Du);
function C0() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
    submittedAt: 0,
  };
}
var ft,
  De,
  is,
  qu,
  f2 =
    ((qu = class extends $r {
      constructor(t = {}) {
        super();
        U(this, ft);
        U(this, De);
        U(this, is);
        (this.config = t),
          _(this, ft, new Set()),
          _(this, De, new Map()),
          _(this, is, 0);
      }
      build(t, n, r) {
        const s = new u2({
          client: t,
          mutationCache: this,
          mutationId: ++Is(this, is)._,
          options: t.defaultMutationOptions(n),
          state: r,
        });
        return this.add(s), s;
      }
      add(t) {
        g(this, ft).add(t);
        const n = zs(t);
        if (typeof n == "string") {
          const r = g(this, De).get(n);
          r ? r.push(t) : g(this, De).set(n, [t]);
        }
        this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        if (g(this, ft).delete(t)) {
          const n = zs(t);
          if (typeof n == "string") {
            const r = g(this, De).get(n);
            if (r)
              if (r.length > 1) {
                const s = r.indexOf(t);
                s !== -1 && r.splice(s, 1);
              } else r[0] === t && g(this, De).delete(n);
          }
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        const n = zs(t);
        if (typeof n == "string") {
          const s = g(this, De)
            .get(n)
            ?.find((o) => o.state.status === "pending");
          return !s || s === t;
        } else return !0;
      }
      runNext(t) {
        const n = zs(t);
        return typeof n == "string"
          ? g(this, De)
              .get(n)
              ?.find((s) => s !== t && s.state.isPaused)
              ?.continue() ?? Promise.resolve()
          : Promise.resolve();
      }
      clear() {
        te.batch(() => {
          g(this, ft).forEach((t) => {
            this.notify({ type: "removed", mutation: t });
          }),
            g(this, ft).clear(),
            g(this, De).clear();
        });
      }
      getAll() {
        return Array.from(g(this, ft));
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => Iu(n, r));
      }
      findAll(t = {}) {
        return this.getAll().filter((n) => Iu(t, n));
      }
      notify(t) {
        te.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((n) => n.state.isPaused);
        return te.batch(() =>
          Promise.all(t.map((n) => n.continue().catch(le)))
        );
      }
    }),
    (ft = new WeakMap()),
    (De = new WeakMap()),
    (is = new WeakMap()),
    qu);
function zs(e) {
  return e.options.scope?.id;
}
var dt,
  Ut,
  ge,
  lt,
  gt,
  Gs,
  ca,
  Hu,
  d2 =
    ((Hu = class extends $r {
      constructor(t, n) {
        super();
        U(this, gt);
        U(this, dt);
        U(this, Ut);
        U(this, ge);
        U(this, lt);
        _(this, dt, t),
          this.setOptions(n),
          this.bindMethods(),
          q(this, gt, Gs).call(this);
      }
      bindMethods() {
        (this.mutate = this.mutate.bind(this)),
          (this.reset = this.reset.bind(this));
      }
      setOptions(t) {
        const n = this.options;
        (this.options = g(this, dt).defaultMutationOptions(t)),
          to(this.options, n) ||
            g(this, dt)
              .getMutationCache()
              .notify({
                type: "observerOptionsUpdated",
                mutation: g(this, ge),
                observer: this,
              }),
          n?.mutationKey &&
          this.options.mutationKey &&
          Tn(n.mutationKey) !== Tn(this.options.mutationKey)
            ? this.reset()
            : g(this, ge)?.state.status === "pending" &&
              g(this, ge).setOptions(this.options);
      }
      onUnsubscribe() {
        this.hasListeners() || g(this, ge)?.removeObserver(this);
      }
      onMutationUpdate(t) {
        q(this, gt, Gs).call(this), q(this, gt, ca).call(this, t);
      }
      getCurrentResult() {
        return g(this, Ut);
      }
      reset() {
        g(this, ge)?.removeObserver(this),
          _(this, ge, void 0),
          q(this, gt, Gs).call(this),
          q(this, gt, ca).call(this);
      }
      mutate(t, n) {
        return (
          _(this, lt, n),
          g(this, ge)?.removeObserver(this),
          _(
            this,
            ge,
            g(this, dt).getMutationCache().build(g(this, dt), this.options)
          ),
          g(this, ge).addObserver(this),
          g(this, ge).execute(t)
        );
      }
    }),
    (dt = new WeakMap()),
    (Ut = new WeakMap()),
    (ge = new WeakMap()),
    (lt = new WeakMap()),
    (gt = new WeakSet()),
    (Gs = function () {
      const t = g(this, ge)?.state ?? C0();
      _(this, Ut, {
        ...t,
        isPending: t.status === "pending",
        isSuccess: t.status === "success",
        isError: t.status === "error",
        isIdle: t.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      });
    }),
    (ca = function (t) {
      te.batch(() => {
        if (g(this, lt) && this.hasListeners()) {
          const n = g(this, Ut).variables,
            r = g(this, Ut).context,
            s = {
              client: g(this, dt),
              meta: this.options.meta,
              mutationKey: this.options.mutationKey,
            };
          t?.type === "success"
            ? (g(this, lt).onSuccess?.(t.data, n, r, s),
              g(this, lt).onSettled?.(t.data, null, n, r, s))
            : t?.type === "error" &&
              (g(this, lt).onError?.(t.error, n, r, s),
              g(this, lt).onSettled?.(void 0, t.error, n, r, s));
        }
        this.listeners.forEach((n) => {
          n(g(this, Ut));
        });
      });
    }),
    Hu),
  Xe,
  Gu,
  l2 =
    ((Gu = class extends $r {
      constructor(t = {}) {
        super();
        U(this, Xe);
        (this.config = t), _(this, Xe, new Map());
      }
      build(t, n, r) {
        const s = n.queryKey,
          o = n.queryHash ?? ac(s, n);
        let i = this.get(o);
        return (
          i ||
            ((i = new s2({
              client: t,
              queryKey: s,
              queryHash: o,
              options: t.defaultQueryOptions(n),
              state: r,
              defaultOptions: t.getQueryDefaults(s),
            })),
            this.add(i)),
          i
        );
      }
      add(t) {
        g(this, Xe).has(t.queryHash) ||
          (g(this, Xe).set(t.queryHash, t),
          this.notify({ type: "added", query: t }));
      }
      remove(t) {
        const n = g(this, Xe).get(t.queryHash);
        n &&
          (t.destroy(),
          n === t && g(this, Xe).delete(t.queryHash),
          this.notify({ type: "removed", query: t }));
      }
      clear() {
        te.batch(() => {
          this.getAll().forEach((t) => {
            this.remove(t);
          });
        });
      }
      get(t) {
        return g(this, Xe).get(t);
      }
      getAll() {
        return [...g(this, Xe).values()];
      }
      find(t) {
        const n = { exact: !0, ...t };
        return this.getAll().find((r) => $u(n, r));
      }
      findAll(t = {}) {
        const n = this.getAll();
        return Object.keys(t).length > 0 ? n.filter((r) => $u(t, r)) : n;
      }
      notify(t) {
        te.batch(() => {
          this.listeners.forEach((n) => {
            n(t);
          });
        });
      }
      onFocus() {
        te.batch(() => {
          this.getAll().forEach((t) => {
            t.onFocus();
          });
        });
      }
      onOnline() {
        te.batch(() => {
          this.getAll().forEach((t) => {
            t.onOnline();
          });
        });
      }
    }),
    (Xe = new WeakMap()),
    Gu),
  J,
  Lt,
  Dt,
  rr,
  sr,
  qt,
  or,
  ir,
  Vu,
  jv =
    ((Vu = class {
      constructor(e = {}) {
        U(this, J);
        U(this, Lt);
        U(this, Dt);
        U(this, rr);
        U(this, sr);
        U(this, qt);
        U(this, or);
        U(this, ir);
        _(this, J, e.queryCache || new l2()),
          _(this, Lt, e.mutationCache || new f2()),
          _(this, Dt, e.defaultOptions || {}),
          _(this, rr, new Map()),
          _(this, sr, new Map()),
          _(this, qt, 0);
      }
      mount() {
        Is(this, qt)._++,
          g(this, qt) === 1 &&
            (_(
              this,
              or,
              fc.subscribe(async (e) => {
                e && (await this.resumePausedMutations(), g(this, J).onFocus());
              })
            ),
            _(
              this,
              ir,
              no.subscribe(async (e) => {
                e &&
                  (await this.resumePausedMutations(), g(this, J).onOnline());
              })
            ));
      }
      unmount() {
        var e, t;
        Is(this, qt)._--,
          g(this, qt) === 0 &&
            ((e = g(this, or)) == null || e.call(this),
            _(this, or, void 0),
            (t = g(this, ir)) == null || t.call(this),
            _(this, ir, void 0));
      }
      isFetching(e) {
        return g(this, J).findAll({ ...e, fetchStatus: "fetching" }).length;
      }
      isMutating(e) {
        return g(this, Lt).findAll({ ...e, status: "pending" }).length;
      }
      getQueryData(e) {
        const t = this.defaultQueryOptions({ queryKey: e });
        return g(this, J).get(t.queryHash)?.state.data;
      }
      ensureQueryData(e) {
        const t = this.defaultQueryOptions(e),
          n = g(this, J).build(this, t),
          r = n.state.data;
        return r === void 0
          ? this.fetchQuery(e)
          : (e.revalidateIfStale &&
              n.isStaleByTime(Wt(t.staleTime, n)) &&
              this.prefetchQuery(t),
            Promise.resolve(r));
      }
      getQueriesData(e) {
        return g(this, J)
          .findAll(e)
          .map(({ queryKey: t, state: n }) => {
            const r = n.data;
            return [t, r];
          });
      }
      setQueryData(e, t, n) {
        const r = this.defaultQueryOptions({ queryKey: e }),
          o = g(this, J).get(r.queryHash)?.state.data,
          i = Kw(t, o);
        if (i !== void 0)
          return g(this, J)
            .build(this, r)
            .setData(i, { ...n, manual: !0 });
      }
      setQueriesData(e, t, n) {
        return te.batch(() =>
          g(this, J)
            .findAll(e)
            .map(({ queryKey: r }) => [r, this.setQueryData(r, t, n)])
        );
      }
      getQueryState(e) {
        const t = this.defaultQueryOptions({ queryKey: e });
        return g(this, J).get(t.queryHash)?.state;
      }
      removeQueries(e) {
        const t = g(this, J);
        te.batch(() => {
          t.findAll(e).forEach((n) => {
            t.remove(n);
          });
        });
      }
      resetQueries(e, t) {
        const n = g(this, J);
        return te.batch(
          () => (
            n.findAll(e).forEach((r) => {
              r.reset();
            }),
            this.refetchQueries({ type: "active", ...e }, t)
          )
        );
      }
      cancelQueries(e, t = {}) {
        const n = { revert: !0, ...t },
          r = te.batch(() =>
            g(this, J)
              .findAll(e)
              .map((s) => s.cancel(n))
          );
        return Promise.all(r).then(le).catch(le);
      }
      invalidateQueries(e, t = {}) {
        return te.batch(
          () => (
            g(this, J)
              .findAll(e)
              .forEach((n) => {
                n.invalidate();
              }),
            e?.refetchType === "none"
              ? Promise.resolve()
              : this.refetchQueries(
                  { ...e, type: e?.refetchType ?? e?.type ?? "active" },
                  t
                )
          )
        );
      }
      refetchQueries(e, t = {}) {
        const n = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
          r = te.batch(() =>
            g(this, J)
              .findAll(e)
              .filter((s) => !s.isDisabled() && !s.isStatic())
              .map((s) => {
                let o = s.fetch(void 0, n);
                return (
                  n.throwOnError || (o = o.catch(le)),
                  s.state.fetchStatus === "paused" ? Promise.resolve() : o
                );
              })
          );
        return Promise.all(r).then(le);
      }
      fetchQuery(e) {
        const t = this.defaultQueryOptions(e);
        t.retry === void 0 && (t.retry = !1);
        const n = g(this, J).build(this, t);
        return n.isStaleByTime(Wt(t.staleTime, n))
          ? n.fetch(t)
          : Promise.resolve(n.state.data);
      }
      prefetchQuery(e) {
        return this.fetchQuery(e).then(le).catch(le);
      }
      fetchInfiniteQuery(e) {
        return (e.behavior = Ru(e.pages)), this.fetchQuery(e);
      }
      prefetchInfiniteQuery(e) {
        return this.fetchInfiniteQuery(e).then(le).catch(le);
      }
      ensureInfiniteQueryData(e) {
        return (e.behavior = Ru(e.pages)), this.ensureQueryData(e);
      }
      resumePausedMutations() {
        return no.isOnline()
          ? g(this, Lt).resumePausedMutations()
          : Promise.resolve();
      }
      getQueryCache() {
        return g(this, J);
      }
      getMutationCache() {
        return g(this, Lt);
      }
      getDefaultOptions() {
        return g(this, Dt);
      }
      setDefaultOptions(e) {
        _(this, Dt, e);
      }
      setQueryDefaults(e, t) {
        g(this, rr).set(Tn(e), { queryKey: e, defaultOptions: t });
      }
      getQueryDefaults(e) {
        const t = [...g(this, rr).values()],
          n = {};
        return (
          t.forEach((r) => {
            ts(e, r.queryKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      setMutationDefaults(e, t) {
        g(this, sr).set(Tn(e), { mutationKey: e, defaultOptions: t });
      }
      getMutationDefaults(e) {
        const t = [...g(this, sr).values()],
          n = {};
        return (
          t.forEach((r) => {
            ts(e, r.mutationKey) && Object.assign(n, r.defaultOptions);
          }),
          n
        );
      }
      defaultQueryOptions(e) {
        if (e._defaulted) return e;
        const t = {
          ...g(this, Dt).queries,
          ...this.getQueryDefaults(e.queryKey),
          ...e,
          _defaulted: !0,
        };
        return (
          t.queryHash || (t.queryHash = ac(t.queryKey, t)),
          t.refetchOnReconnect === void 0 &&
            (t.refetchOnReconnect = t.networkMode !== "always"),
          t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
          !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
          t.queryFn === uc && (t.enabled = !1),
          t
        );
      }
      defaultMutationOptions(e) {
        return e?._defaulted
          ? e
          : {
              ...g(this, Dt).mutations,
              ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
              ...e,
              _defaulted: !0,
            };
      }
      clear() {
        g(this, J).clear(), g(this, Lt).clear();
      }
    }),
    (J = new WeakMap()),
    (Lt = new WeakMap()),
    (Dt = new WeakMap()),
    (rr = new WeakMap()),
    (sr = new WeakMap()),
    (qt = new WeakMap()),
    (or = new WeakMap()),
    (ir = new WeakMap()),
    Vu);
function h2(e, t) {
  return cc(e, t);
}
function p2(e) {
  return JSON.stringify(e, (t, n) =>
    b2(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, s) => ((r[s] = n[s]), r), {})
      : typeof n == "bigint"
      ? n.toString()
      : n
  );
}
function b2(e) {
  if (!Mu(e)) return !1;
  const t = e.constructor;
  if (typeof t > "u") return !0;
  const n = t.prototype;
  return !(!Mu(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function Mu(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function O0(e) {
  const {
    _defaulted: t,
    behavior: n,
    gcTime: r,
    initialData: s,
    initialDataUpdatedAt: o,
    maxPages: i,
    meta: a,
    networkMode: c,
    queryFn: u,
    queryHash: f,
    queryKey: d,
    queryKeyHashFn: l,
    retry: h,
    retryDelay: b,
    structuralSharing: p,
    getPreviousPageParam: y,
    getNextPageParam: x,
    initialPageParam: S,
    _optimisticResults: w,
    enabled: v,
    notifyOnChangeProps: m,
    placeholderData: P,
    refetchInterval: E,
    refetchIntervalInBackground: $,
    refetchOnMount: I,
    refetchOnReconnect: C,
    refetchOnWindowFocus: O,
    retryOnMount: R,
    select: M,
    staleTime: D,
    suspense: T,
    throwOnError: B,
    config: N,
    connector: k,
    query: j,
    ...L
  } = e;
  return L;
}
function y2(e) {
  return {
    mutationFn(t) {
      return G5(e, t);
    },
    mutationKey: ["connect"],
  };
}
function m2(e) {
  return {
    mutationFn(t) {
      return W5(e, t);
    },
    mutationKey: ["disconnect"],
  };
}
function g2(e, t = {}) {
  return {
    async queryFn({ queryKey: n }) {
      const r = t.abi;
      if (!r) throw new Error("abi is required");
      const { functionName: s, scopeKey: o, ...i } = n[1],
        a = (() => {
          const c = n[1];
          if (c.address) return { address: c.address };
          if (c.code) return { code: c.code };
          throw new Error("address or code is required");
        })();
      if (!s) throw new Error("functionName is required");
      return K5(e, { abi: r, functionName: s, args: i.args, ...a, ...i });
    },
    queryKey: w2(t),
  };
}
function w2(e = {}) {
  const { abi: t, ...n } = e;
  return ["readContract", O0(n)];
}
function v2(e) {
  return {
    mutationFn(t) {
      return l0(e, t);
    },
    mutationKey: ["reconnect"],
  };
}
function x2(e) {
  return {
    mutationFn(t) {
      return Y5(e, t);
    },
    mutationKey: ["switchChain"],
  };
}
function E2(e, t = {}) {
  return {
    async queryFn({ queryKey: n }) {
      const { hash: r, ...s } = n[1];
      if (!r) throw new Error("hash is required");
      return J5(e, { ...s, onReplaced: t.onReplaced, hash: r });
    },
    queryKey: P2(t),
  };
}
function P2(e = {}) {
  const { onReplaced: t, ...n } = e;
  return ["waitForTransactionReceipt", O0(n)];
}
function S2(e) {
  return {
    mutationFn(t) {
      return sw(e, t);
    },
    mutationKey: ["writeContract"],
  };
}
var T0 = V.createContext(void 0),
  B0 = (e) => {
    const t = V.useContext(T0);
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  zv = ({ client: e, children: t }) => (
    V.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    ),
    sh.jsx(T0.Provider, { value: e, children: t })
  ),
  R0 = V.createContext(!1),
  $2 = () => V.useContext(R0);
R0.Provider;
function I2() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
var A2 = V.createContext(I2()),
  C2 = () => V.useContext(A2),
  O2 = (e, t) => {
    (e.suspense || e.throwOnError || e.experimental_prefetchInRender) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  T2 = (e) => {
    V.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  B2 = ({
    result: e,
    errorResetBoundary: t,
    throwOnError: n,
    query: r,
    suspense: s,
  }) =>
    e.isError &&
    !t.isReset() &&
    !e.isFetching &&
    r &&
    ((s && e.data === void 0) || E0(n, [e.error, r])),
  R2 = (e) => {
    if (e.suspense) {
      const n = (s) => (s === "static" ? s : Math.max(s ?? 1e3, 1e3)),
        r = e.staleTime;
      (e.staleTime = typeof r == "function" ? (...s) => n(r(...s)) : n(r)),
        typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3));
    }
  },
  k2 = (e, t) => e.isLoading && e.isFetching && !t,
  M2 = (e, t) => e?.suspense && t.isPending,
  _u = (e, t, n) =>
    t.fetchOptimistic(e).catch(() => {
      n.clearReset();
    });
function _2(e, t, n) {
  const r = $2(),
    s = C2(),
    o = B0(),
    i = o.defaultQueryOptions(e);
  o.getDefaultOptions().queries?._experimental_beforeQuery?.(i),
    (i._optimisticResults = r ? "isRestoring" : "optimistic"),
    R2(i),
    O2(i, s),
    T2(s);
  const a = !o.getQueryCache().get(i.queryHash),
    [c] = V.useState(() => new t(o, i)),
    u = c.getOptimisticResult(i),
    f = !r && e.subscribed !== !1;
  if (
    (V.useSyncExternalStore(
      V.useCallback(
        (d) => {
          const l = f ? c.subscribe(te.batchCalls(d)) : le;
          return c.updateResult(), l;
        },
        [c, f]
      ),
      () => c.getCurrentResult(),
      () => c.getCurrentResult()
    ),
    V.useEffect(() => {
      c.setOptions(i);
    }, [i, c]),
    M2(i, u))
  )
    throw _u(i, c, s);
  if (
    B2({
      result: u,
      errorResetBoundary: s,
      throwOnError: i.throwOnError,
      query: o.getQueryCache().get(i.queryHash),
      suspense: i.suspense,
    })
  )
    throw u.error;
  return (
    o.getDefaultOptions().queries?._experimental_afterQuery?.(i, u),
    i.experimental_prefetchInRender &&
      !On &&
      k2(u, r) &&
      (a ? _u(i, c, s) : o.getQueryCache().get(i.queryHash)?.promise)
        ?.catch(le)
        .finally(() => {
          c.updateResult();
        }),
    i.notifyOnChangeProps ? u : c.trackResult(u)
  );
}
function N2(e, t) {
  return _2(e, o2);
}
function $s(e, t) {
  const n = B0(),
    [r] = V.useState(() => new d2(n, e));
  V.useEffect(() => {
    r.setOptions(e);
  }, [r, e]);
  const s = V.useSyncExternalStore(
      V.useCallback((i) => r.subscribe(te.batchCalls(i)), [r]),
      () => r.getCurrentResult(),
      () => r.getCurrentResult()
    ),
    o = V.useCallback(
      (i, a) => {
        r.mutate(i, a).catch(le);
      },
      [r]
    );
  if (s.error && E0(r.options.throwOnError, [s.error])) throw s.error;
  return { ...s, mutate: o, mutateAsync: s.mutate };
}
function k0(e) {
  const t = N2({ ...e, queryKeyHashFn: p2 });
  return (t.queryKey = e.queryKey), t;
}
function M0(e = {}) {
  const t = Be(e);
  return V.useSyncExternalStore(
    (n) => ew(t, { onChange: n }),
    () => wu(t),
    () => wu(t)
  );
}
function F2(e = {}) {
  const t = Be(e);
  return V.useSyncExternalStore(
    (n) => $w(t, { onChange: n }),
    () => vu(t),
    () => vu(t)
  );
}
function j2(e = {}) {
  const t = Be(e);
  return V.useSyncExternalStore(
    (n) => nw(t, { onChange: n }),
    () => xu(t),
    () => xu(t)
  );
}
function Uv(e = {}) {
  const { mutation: t } = e,
    n = Be(e),
    r = y2(n),
    { mutate: s, mutateAsync: o, ...i } = $s({ ...t, ...r });
  return (
    V.useEffect(
      () =>
        n.subscribe(
          ({ status: a }) => a,
          (a, c) => {
            c === "connected" && a === "disconnected" && i.reset();
          }
        ),
      [n, i.reset]
    ),
    { ...i, connect: s, connectAsync: o, connectors: j2({ config: n }) }
  );
}
function z2(e = {}) {
  const t = Be(e);
  return V.useSyncExternalStore(
    (n) => tw(t, { onChange: n }),
    () => Gi(t),
    () => Gi(t)
  );
}
function Lv(e = {}) {
  const { mutation: t } = e,
    n = Be(e),
    r = m2(n),
    { mutate: s, mutateAsync: o, ...i } = $s({ ...t, ...r });
  return {
    ...i,
    connectors: z2({ config: n }).map((a) => a.connector),
    disconnect: s,
    disconnectAsync: o,
  };
}
function Dv(e = {}) {
  const t = Be(e);
  return w0.useSyncExternalStoreWithSelector(
    (n) => rw(t, { onChange: n }),
    () => Vi(t, e),
    () => Vi(t, e),
    (n) => n,
    (n, r) => n?.uid === r?.uid
  );
}
function qv(e = {}) {
  const { abi: t, address: n, functionName: r, query: s = {} } = e,
    o = e.code,
    i = Be(e),
    a = M0({ config: i }),
    c = g2(i, { ...e, chainId: e.chainId ?? a }),
    u = !!((n || o) && t && r && (s.enabled ?? !0));
  return k0({
    ...s,
    ...c,
    enabled: u,
    structuralSharing: s.structuralSharing ?? h2,
  });
}
function Hv(e = {}) {
  const { mutation: t } = e,
    n = Be(e),
    r = v2(n),
    { mutate: s, mutateAsync: o, ...i } = $s({ ...t, ...r });
  return { ...i, connectors: n.connectors, reconnect: s, reconnectAsync: o };
}
function Gv(e = {}) {
  const { mutation: t } = e,
    n = Be(e),
    r = x2(n),
    { mutate: s, mutateAsync: o, ...i } = $s({ ...t, ...r });
  return {
    ...i,
    chains: F2({ config: n }),
    switchChain: s,
    switchChainAsync: o,
  };
}
function Vv(e = {}) {
  const { hash: t, query: n = {} } = e,
    r = Be(e),
    s = M0({ config: r }),
    o = E2(r, { ...e, chainId: e.chainId ?? s }),
    i = !!(t && (n.enabled ?? !0));
  return k0({ ...n, ...o, enabled: i });
}
function Wv(e = {}) {
  const { mutation: t } = e,
    n = Be(e),
    r = S2(n),
    { mutate: s, mutateAsync: o, ...i } = $s({ ...t, ...r });
  return { ...i, writeContract: s, writeContractAsync: o };
}
export {
  Dv as $,
  ch as A,
  Mv as B,
  eo as C,
  F as D,
  qi as E,
  Pv as F,
  Be as G,
  Hv as H,
  ic as I,
  _v as J,
  Fv as K,
  Uv as L,
  Lv as M,
  Gv as N,
  qv as O,
  zv as P,
  jv as Q,
  Y0 as R,
  Pn as S,
  B0 as T,
  ue as U,
  N2 as V,
  Nv as W,
  Wv as X,
  Vv as Y,
  wf as Z,
  of as _,
  Cv as a,
  K5 as a0,
  Fy as a1,
  Qd as a2,
  ur as a3,
  oe as a4,
  $e as a5,
  Gl as a6,
  bn as a7,
  Ne as a8,
  bt as a9,
  Kf as aA,
  cy as aB,
  Si as aC,
  Nd as aD,
  Jt as aE,
  Y as aF,
  Yg as aG,
  i0 as aH,
  Mn as aI,
  ka as aJ,
  xt as aK,
  Wd as aL,
  ee as aM,
  Pt as aN,
  Sr as aO,
  xo as aP,
  dd as aQ,
  wv as aR,
  gv as aS,
  kv as aT,
  Tv as aU,
  A as aa,
  X as ab,
  Rv as ac,
  mv as ad,
  It as ae,
  vn as af,
  zi as ag,
  Fe as ah,
  pt as ai,
  Ev as aj,
  Ge as ak,
  vr as al,
  wp as am,
  uv as an,
  Kt as ao,
  Ap as ap,
  kr as aq,
  vp as ar,
  Op as as,
  xl as at,
  Ae as au,
  Sv as av,
  Iv as aw,
  z as ax,
  bs as ay,
  xe as az,
  vt as b,
  L2 as c,
  Sa as d,
  Ht as e,
  nd as f,
  Wu as g,
  Bv as h,
  He as i,
  sh as j,
  D2 as k,
  ya as l,
  Ov as m,
  M5 as n,
  o0 as o,
  Av as p,
  Oe as q,
  V as r,
  np as s,
  q2 as t,
  _b as u,
  ls as v,
  Ie as w,
  fv as x,
  cv as y,
  s1 as z,
};
//# sourceMappingURL=wagmi-core-DTeud8oQ.js.map
