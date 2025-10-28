import {
  y as ve,
  am as Kt,
  an as Te,
  ao as Hr,
  ap as ue,
  aq as Zr,
  ar as qr,
  as as Mn,
  at as Yr,
  au as xe,
  ai as ie,
  D as V,
  a1 as Kr,
  ae as st,
  a4 as ce,
  av as Xr,
  aw as ft,
  ax as se,
  ag as Wr,
  ah as Jr,
  Z as Qr,
  aa as A,
  ay as ea,
  az as yn,
  aA as ta,
  aB as na,
  aC as ra,
  aD as aa,
  a5 as Ve,
  aE as Xt,
  aF as Wt,
  q as ia,
  aG as oa,
  aH as sa,
  aI as Hn,
  aJ as fa,
  aK as ca,
  aL as ua,
  aM as la,
  aN as da,
  aO as pa,
  aP as ya,
  z as ma,
  aQ as ga,
  aR as ha,
  aS as ba,
} from "./wagmi-core-DTeud8oQ.js";
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Jt =
    BigInt(0),
  ht = BigInt(1);
function ze(e, t = "") {
  if (typeof e != "boolean") {
    const n = t && `"${t}"`;
    throw new Error(n + "expected boolean, got type=" + typeof e);
  }
  return e;
}
function me(e, t, n = "") {
  const r = Kt(e),
    a = e?.length,
    i = t !== void 0;
  if (!r || (i && a !== t)) {
    const o = n && `"${n}" `,
      s = i ? ` of length ${t}` : "",
      f = r ? `length=${a}` : `type=${typeof e}`;
    throw new Error(o + "expected Uint8Array" + s + ", got " + f);
  }
  return e;
}
function De(e) {
  const t = e.toString(16);
  return t.length & 1 ? "0" + t : t;
}
function Zn(e) {
  if (typeof e != "string")
    throw new Error("hex string expected, got " + typeof e);
  return e === "" ? Jt : BigInt("0x" + e);
}
function tt(e) {
  return Zn(ve(e));
}
function qn(e) {
  return Hr(e), Zn(ve(Uint8Array.from(e).reverse()));
}
function Qt(e, t) {
  return Te(e.toString(16).padStart(t * 2, "0"));
}
function Yn(e, t) {
  return Qt(e, t).reverse();
}
function J(e, t, n) {
  let r;
  if (typeof t == "string")
    try {
      r = Te(t);
    } catch (a) {
      throw new Error(e + " must be hex string or Uint8Array, cause: " + a);
    }
  else if (Kt(t)) r = Uint8Array.from(t);
  else throw new Error(e + " must be hex string or Uint8Array");
  return r.length, r;
}
const ct = (e) => typeof e == "bigint" && Jt <= e;
function _a(e, t, n) {
  return ct(e) && ct(t) && ct(n) && t <= e && e < n;
}
function wa(e, t, n, r) {
  if (!_a(t, n, r))
    throw new Error(
      "expected valid " + e + ": " + n + " <= n < " + r + ", got " + t
    );
}
function Kn(e) {
  let t;
  for (t = 0; e > Jt; e >>= ht, t += 1);
  return t;
}
const Ue = (e) => (ht << BigInt(e)) - ht;
function va(e, t, n) {
  if (typeof e != "number" || e < 2)
    throw new Error("hashLen must be a number");
  if (typeof t != "number" || t < 2)
    throw new Error("qByteLen must be a number");
  if (typeof n != "function") throw new Error("hmacFn must be a function");
  const r = (c) => new Uint8Array(c),
    a = (c) => Uint8Array.of(c);
  let i = r(e),
    o = r(e),
    s = 0;
  const f = () => {
      i.fill(1), o.fill(0), (s = 0);
    },
    u = (...c) => n(o, i, ...c),
    p = (c = r(0)) => {
      (o = u(a(0), c)),
        (i = u()),
        c.length !== 0 && ((o = u(a(1), c)), (i = u()));
    },
    l = () => {
      if (s++ >= 1e3) throw new Error("drbg: tried 1000 values");
      let c = 0;
      const b = [];
      for (; c < t; ) {
        i = u();
        const g = i.slice();
        b.push(g), (c += i.length);
      }
      return ue(...b);
    };
  return (c, b) => {
    f(), p(c);
    let g;
    for (; !(g = b(l())); ) p();
    return f(), g;
  };
}
function en(e, t, n = {}) {
  if (!e || typeof e != "object")
    throw new Error("expected valid options object");
  function r(a, i, o) {
    const s = e[a];
    if (o && s === void 0) return;
    const f = typeof s;
    if (f !== i || s === null)
      throw new Error(`param "${a}" is invalid: expected ${i}, got ${f}`);
  }
  Object.entries(t).forEach(([a, i]) => r(a, i, !1)),
    Object.entries(n).forEach(([a, i]) => r(a, i, !0));
}
function mn(e) {
  const t = new WeakMap();
  return (n, ...r) => {
    const a = t.get(n);
    if (a !== void 0) return a;
    const i = e(n, ...r);
    return t.set(n, i), i;
  };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const ee =
    BigInt(0),
  X = BigInt(1),
  ge = BigInt(2),
  Xn = BigInt(3),
  Wn = BigInt(4),
  Jn = BigInt(5),
  xa = BigInt(7),
  Qn = BigInt(8),
  Ea = BigInt(9),
  er = BigInt(16);
function ne(e, t) {
  const n = e % t;
  return n >= ee ? n : t + n;
}
function gn(e, t) {
  if (e === ee) throw new Error("invert: expected non-zero number");
  if (t <= ee) throw new Error("invert: expected positive modulus, got " + t);
  let n = ne(e, t),
    r = t,
    a = ee,
    i = X;
  for (; n !== ee; ) {
    const s = r / n,
      f = r % n,
      u = a - i * s;
    (r = n), (n = f), (a = i), (i = u);
  }
  if (r !== X) throw new Error("invert: does not exist");
  return ne(a, t);
}
function tn(e, t, n) {
  if (!e.eql(e.sqr(t), n)) throw new Error("Cannot find square root");
}
function tr(e, t) {
  const n = (e.ORDER + X) / Wn,
    r = e.pow(t, n);
  return tn(e, r, t), r;
}
function Oa(e, t) {
  const n = (e.ORDER - Jn) / Qn,
    r = e.mul(t, ge),
    a = e.pow(r, n),
    i = e.mul(t, a),
    o = e.mul(e.mul(i, ge), a),
    s = e.mul(i, e.sub(o, e.ONE));
  return tn(e, s, t), s;
}
function Pa(e) {
  const t = _e(e),
    n = nr(e),
    r = n(t, t.neg(t.ONE)),
    a = n(t, r),
    i = n(t, t.neg(r)),
    o = (e + xa) / er;
  return (s, f) => {
    let u = s.pow(f, o),
      p = s.mul(u, r);
    const l = s.mul(u, a),
      d = s.mul(u, i),
      c = s.eql(s.sqr(p), f),
      b = s.eql(s.sqr(l), f);
    (u = s.cmov(u, p, c)), (p = s.cmov(d, l, b));
    const g = s.eql(s.sqr(p), f),
      w = s.cmov(u, p, g);
    return tn(s, w, f), w;
  };
}
function nr(e) {
  if (e < Xn) throw new Error("sqrt is not defined for small field");
  let t = e - X,
    n = 0;
  for (; t % ge === ee; ) (t /= ge), n++;
  let r = ge;
  const a = _e(e);
  for (; hn(a, r) === 1; )
    if (r++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  if (n === 1) return tr;
  let i = a.pow(r, t);
  const o = (t + X) / ge;
  return function (f, u) {
    if (f.is0(u)) return u;
    if (hn(f, u) !== 1) throw new Error("Cannot find square root");
    let p = n,
      l = f.mul(f.ONE, i),
      d = f.pow(u, t),
      c = f.pow(u, o);
    for (; !f.eql(d, f.ONE); ) {
      if (f.is0(d)) return f.ZERO;
      let b = 1,
        g = f.sqr(d);
      for (; !f.eql(g, f.ONE); )
        if ((b++, (g = f.sqr(g)), b === p))
          throw new Error("Cannot find square root");
      const w = X << BigInt(p - b - 1),
        v = f.pow(l, w);
      (p = b), (l = f.sqr(v)), (d = f.mul(d, l)), (c = f.mul(c, v));
    }
    return c;
  };
}
function Sa(e) {
  return e % Wn === Xn
    ? tr
    : e % Qn === Jn
    ? Oa
    : e % er === Ea
    ? Pa(e)
    : nr(e);
}
const Ba = [
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
function Ia(e) {
  const t = {
      ORDER: "bigint",
      MASK: "bigint",
      BYTES: "number",
      BITS: "number",
    },
    n = Ba.reduce((r, a) => ((r[a] = "function"), r), t);
  return en(e, n), e;
}
function Ga(e, t, n) {
  if (n < ee) throw new Error("invalid exponent, negatives unsupported");
  if (n === ee) return e.ONE;
  if (n === X) return t;
  let r = e.ONE,
    a = t;
  for (; n > ee; ) n & X && (r = e.mul(r, a)), (a = e.sqr(a)), (n >>= X);
  return r;
}
function rr(e, t, n = !1) {
  const r = new Array(t.length).fill(n ? e.ZERO : void 0),
    a = t.reduce(
      (o, s, f) => (e.is0(s) ? o : ((r[f] = o), e.mul(o, s))),
      e.ONE
    ),
    i = e.inv(a);
  return (
    t.reduceRight(
      (o, s, f) => (e.is0(s) ? o : ((r[f] = e.mul(o, r[f])), e.mul(o, s))),
      i
    ),
    r
  );
}
function hn(e, t) {
  const n = (e.ORDER - X) / ge,
    r = e.pow(t, n),
    a = e.eql(r, e.ONE),
    i = e.eql(r, e.ZERO),
    o = e.eql(r, e.neg(e.ONE));
  if (!a && !i && !o) throw new Error("invalid Legendre symbol result");
  return a ? 1 : i ? 0 : -1;
}
function ar(e, t) {
  t !== void 0 && Zr(t);
  const n = t !== void 0 ? t : e.toString(2).length,
    r = Math.ceil(n / 8);
  return { nBitLength: n, nByteLength: r };
}
function _e(e, t, n = !1, r = {}) {
  if (e <= ee) throw new Error("invalid field: expected ORDER > 0, got " + e);
  let a,
    i,
    o = !1,
    s;
  if (typeof t == "object" && t != null) {
    if (r.sqrt || n) throw new Error("cannot specify opts in two arguments");
    const d = t;
    d.BITS && (a = d.BITS),
      d.sqrt && (i = d.sqrt),
      typeof d.isLE == "boolean" && (n = d.isLE),
      typeof d.modFromBytes == "boolean" && (o = d.modFromBytes),
      (s = d.allowedLengths);
  } else typeof t == "number" && (a = t), r.sqrt && (i = r.sqrt);
  const { nBitLength: f, nByteLength: u } = ar(e, a);
  if (u > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let p;
  const l = Object.freeze({
    ORDER: e,
    isLE: n,
    BITS: f,
    BYTES: u,
    MASK: Ue(f),
    ZERO: ee,
    ONE: X,
    allowedLengths: s,
    create: (d) => ne(d, e),
    isValid: (d) => {
      if (typeof d != "bigint")
        throw new Error(
          "invalid field element: expected bigint, got " + typeof d
        );
      return ee <= d && d < e;
    },
    is0: (d) => d === ee,
    isValidNot0: (d) => !l.is0(d) && l.isValid(d),
    isOdd: (d) => (d & X) === X,
    neg: (d) => ne(-d, e),
    eql: (d, c) => d === c,
    sqr: (d) => ne(d * d, e),
    add: (d, c) => ne(d + c, e),
    sub: (d, c) => ne(d - c, e),
    mul: (d, c) => ne(d * c, e),
    pow: (d, c) => Ga(l, d, c),
    div: (d, c) => ne(d * gn(c, e), e),
    sqrN: (d) => d * d,
    addN: (d, c) => d + c,
    subN: (d, c) => d - c,
    mulN: (d, c) => d * c,
    inv: (d) => gn(d, e),
    sqrt: i || ((d) => (p || (p = Sa(e)), p(l, d))),
    toBytes: (d) => (n ? Yn(d, u) : Qt(d, u)),
    fromBytes: (d, c = !0) => {
      if (s) {
        if (!s.includes(d.length) || d.length > u)
          throw new Error(
            "Field.fromBytes: expected " + s + " bytes, got " + d.length
          );
        const g = new Uint8Array(u);
        g.set(d, n ? 0 : g.length - d.length), (d = g);
      }
      if (d.length !== u)
        throw new Error(
          "Field.fromBytes: expected " + u + " bytes, got " + d.length
        );
      let b = n ? qn(d) : tt(d);
      if ((o && (b = ne(b, e)), !c && !l.isValid(b)))
        throw new Error("invalid field element: outside of range 0..ORDER");
      return b;
    },
    invertBatch: (d) => rr(l, d),
    cmov: (d, c, b) => (b ? c : d),
  });
  return Object.freeze(l);
}
function ir(e) {
  if (typeof e != "bigint") throw new Error("field order must be bigint");
  const t = e.toString(2).length;
  return Math.ceil(t / 8);
}
function or(e) {
  const t = ir(e);
  return t + Math.ceil(t / 2);
}
function Aa(e, t, n = !1) {
  const r = e.length,
    a = ir(t),
    i = or(t);
  if (r < 16 || r < i || r > 1024)
    throw new Error("expected " + i + "-1024 bytes of input, got " + r);
  const o = n ? qn(e) : tt(e),
    s = ne(o, t - X) + X;
  return n ? Yn(s, a) : Qt(s, a);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Oe =
    BigInt(0),
  he = BigInt(1);
function Me(e, t) {
  const n = t.negate();
  return e ? n : t;
}
function ut(e, t) {
  const n = rr(
    e.Fp,
    t.map((r) => r.Z)
  );
  return t.map((r, a) => e.fromAffine(r.toAffine(n[a])));
}
function sr(e, t) {
  if (!Number.isSafeInteger(e) || e <= 0 || e > t)
    throw new Error("invalid window size, expected [1.." + t + "], got W=" + e);
}
function lt(e, t) {
  sr(e, t);
  const n = Math.ceil(t / e) + 1,
    r = 2 ** (e - 1),
    a = 2 ** e,
    i = Ue(e),
    o = BigInt(e);
  return { windows: n, windowSize: r, mask: i, maxNumber: a, shiftBy: o };
}
function bn(e, t, n) {
  const { windowSize: r, mask: a, maxNumber: i, shiftBy: o } = n;
  let s = Number(e & a),
    f = e >> o;
  s > r && ((s -= i), (f += he));
  const u = t * r,
    p = u + Math.abs(s) - 1,
    l = s === 0,
    d = s < 0,
    c = t % 2 !== 0;
  return { nextN: f, offset: p, isZero: l, isNeg: d, isNegF: c, offsetF: u };
}
function Ua(e, t) {
  if (!Array.isArray(e)) throw new Error("array expected");
  e.forEach((n, r) => {
    if (!(n instanceof t)) throw new Error("invalid point at index " + r);
  });
}
function $a(e, t) {
  if (!Array.isArray(e)) throw new Error("array of scalars expected");
  e.forEach((n, r) => {
    if (!t.isValid(n)) throw new Error("invalid scalar at index " + r);
  });
}
const dt = new WeakMap(),
  fr = new WeakMap();
function pt(e) {
  return fr.get(e) || 1;
}
function _n(e) {
  if (e !== Oe) throw new Error("invalid wNAF");
}
class Da {
  constructor(t, n) {
    (this.BASE = t.BASE),
      (this.ZERO = t.ZERO),
      (this.Fn = t.Fn),
      (this.bits = n);
  }
  _unsafeLadder(t, n, r = this.ZERO) {
    let a = t;
    for (; n > Oe; ) n & he && (r = r.add(a)), (a = a.double()), (n >>= he);
    return r;
  }
  precomputeWindow(t, n) {
    const { windows: r, windowSize: a } = lt(n, this.bits),
      i = [];
    let o = t,
      s = o;
    for (let f = 0; f < r; f++) {
      (s = o), i.push(s);
      for (let u = 1; u < a; u++) (s = s.add(o)), i.push(s);
      o = s.double();
    }
    return i;
  }
  wNAF(t, n, r) {
    if (!this.Fn.isValid(r)) throw new Error("invalid scalar");
    let a = this.ZERO,
      i = this.BASE;
    const o = lt(t, this.bits);
    for (let s = 0; s < o.windows; s++) {
      const {
        nextN: f,
        offset: u,
        isZero: p,
        isNeg: l,
        isNegF: d,
        offsetF: c,
      } = bn(r, s, o);
      (r = f), p ? (i = i.add(Me(d, n[c]))) : (a = a.add(Me(l, n[u])));
    }
    return _n(r), { p: a, f: i };
  }
  wNAFUnsafe(t, n, r, a = this.ZERO) {
    const i = lt(t, this.bits);
    for (let o = 0; o < i.windows && r !== Oe; o++) {
      const { nextN: s, offset: f, isZero: u, isNeg: p } = bn(r, o, i);
      if (((r = s), !u)) {
        const l = n[f];
        a = a.add(p ? l.negate() : l);
      }
    }
    return _n(r), a;
  }
  getPrecomputes(t, n, r) {
    let a = dt.get(n);
    return (
      a ||
        ((a = this.precomputeWindow(n, t)),
        t !== 1 && (typeof r == "function" && (a = r(a)), dt.set(n, a))),
      a
    );
  }
  cached(t, n, r) {
    const a = pt(t);
    return this.wNAF(a, this.getPrecomputes(a, t, r), n);
  }
  unsafe(t, n, r, a) {
    const i = pt(t);
    return i === 1
      ? this._unsafeLadder(t, n, a)
      : this.wNAFUnsafe(i, this.getPrecomputes(i, t, r), n, a);
  }
  createCache(t, n) {
    sr(n, this.bits), fr.set(t, n), dt.delete(t);
  }
  hasCache(t) {
    return pt(t) !== 1;
  }
}
function Ca(e, t, n, r) {
  let a = t,
    i = e.ZERO,
    o = e.ZERO;
  for (; n > Oe || r > Oe; )
    n & he && (i = i.add(a)),
      r & he && (o = o.add(a)),
      (a = a.double()),
      (n >>= he),
      (r >>= he);
  return { p1: i, p2: o };
}
function La(e, t, n, r) {
  Ua(n, e), $a(r, t);
  const a = n.length,
    i = r.length;
  if (a !== i)
    throw new Error("arrays of points and scalars must have equal length");
  const o = e.ZERO,
    s = Kn(BigInt(a));
  let f = 1;
  s > 12 ? (f = s - 3) : s > 4 ? (f = s - 2) : s > 0 && (f = 2);
  const u = Ue(f),
    p = new Array(Number(u) + 1).fill(o),
    l = Math.floor((t.BITS - 1) / f) * f;
  let d = o;
  for (let c = l; c >= 0; c -= f) {
    p.fill(o);
    for (let g = 0; g < i; g++) {
      const w = r[g],
        v = Number((w >> BigInt(c)) & u);
      p[v] = p[v].add(n[g]);
    }
    let b = o;
    for (let g = p.length - 1, w = o; g > 0; g--)
      (w = w.add(p[g])), (b = b.add(w));
    if (((d = d.add(b)), c !== 0)) for (let g = 0; g < f; g++) d = d.double();
  }
  return d;
}
function wn(e, t, n) {
  if (t) {
    if (t.ORDER !== e)
      throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
    return Ia(t), t;
  } else return _e(e, { isLE: n });
}
function ka(e, t, n = {}, r) {
  if ((r === void 0 && (r = e === "edwards"), !t || typeof t != "object"))
    throw new Error(`expected valid ${e} CURVE object`);
  for (const f of ["p", "n", "h"]) {
    const u = t[f];
    if (!(typeof u == "bigint" && u > Oe))
      throw new Error(`CURVE.${f} must be positive bigint`);
  }
  const a = wn(t.p, n.Fp, r),
    i = wn(t.n, n.Fn, r),
    s = ["Gx", "Gy", "a", "b"];
  for (const f of s)
    if (!a.isValid(t[f]))
      throw new Error(`CURVE.${f} must be valid field element of CURVE.Fp`);
  return (t = Object.freeze(Object.assign({}, t))), { CURVE: t, Fp: a, Fn: i };
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const vn =
  (e, t) => (e + (e >= 0 ? t : -t) / cr) / t;
function Ra(e, t, n) {
  const [[r, a], [i, o]] = t,
    s = vn(o * e, n),
    f = vn(-a * e, n);
  let u = e - s * r - f * i,
    p = -s * a - f * o;
  const l = u < fe,
    d = p < fe;
  l && (u = -u), d && (p = -p);
  const c = Ue(Math.ceil(Kn(n) / 2)) + Ee;
  if (u < fe || u >= c || p < fe || p >= c)
    throw new Error("splitScalar (endomorphism): failed, k=" + e);
  return { k1neg: l, k1: u, k2neg: d, k2: p };
}
function bt(e) {
  if (!["compact", "recovered", "der"].includes(e))
    throw new Error(
      'Signature format must be "compact", "recovered", or "der"'
    );
  return e;
}
function yt(e, t) {
  const n = {};
  for (let r of Object.keys(t)) n[r] = e[r] === void 0 ? t[r] : e[r];
  return (
    ze(n.lowS, "lowS"),
    ze(n.prehash, "prehash"),
    n.format !== void 0 && bt(n.format),
    n
  );
}
class Na extends Error {
  constructor(t = "") {
    super(t);
  }
}
const oe = {
    Err: Na,
    _tlv: {
      encode: (e, t) => {
        const { Err: n } = oe;
        if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
        if (t.length & 1) throw new n("tlv.encode: unpadded data");
        const r = t.length / 2,
          a = De(r);
        if ((a.length / 2) & 128)
          throw new n("tlv.encode: long form length too big");
        const i = r > 127 ? De((a.length / 2) | 128) : "";
        return De(e) + i + a + t;
      },
      decode(e, t) {
        const { Err: n } = oe;
        let r = 0;
        if (e < 0 || e > 256) throw new n("tlv.encode: wrong tag");
        if (t.length < 2 || t[r++] !== e) throw new n("tlv.decode: wrong tlv");
        const a = t[r++],
          i = !!(a & 128);
        let o = 0;
        if (!i) o = a;
        else {
          const f = a & 127;
          if (!f)
            throw new n("tlv.decode(long): indefinite length not supported");
          if (f > 4) throw new n("tlv.decode(long): byte length is too big");
          const u = t.subarray(r, r + f);
          if (u.length !== f)
            throw new n("tlv.decode: length bytes not complete");
          if (u[0] === 0) throw new n("tlv.decode(long): zero leftmost byte");
          for (const p of u) o = (o << 8) | p;
          if (((r += f), o < 128))
            throw new n("tlv.decode(long): not minimal encoding");
        }
        const s = t.subarray(r, r + o);
        if (s.length !== o) throw new n("tlv.decode: wrong value length");
        return { v: s, l: t.subarray(r + o) };
      },
    },
    _int: {
      encode(e) {
        const { Err: t } = oe;
        if (e < fe) throw new t("integer: negative integers are not allowed");
        let n = De(e);
        if ((Number.parseInt(n[0], 16) & 8 && (n = "00" + n), n.length & 1))
          throw new t("unexpected DER parsing assertion: unpadded hex");
        return n;
      },
      decode(e) {
        const { Err: t } = oe;
        if (e[0] & 128) throw new t("invalid signature integer: negative");
        if (e[0] === 0 && !(e[1] & 128))
          throw new t("invalid signature integer: unnecessary leading zero");
        return tt(e);
      },
    },
    toSig(e) {
      const { Err: t, _int: n, _tlv: r } = oe,
        a = J("signature", e),
        { v: i, l: o } = r.decode(48, a);
      if (o.length) throw new t("invalid signature: left bytes after parsing");
      const { v: s, l: f } = r.decode(2, i),
        { v: u, l: p } = r.decode(2, f);
      if (p.length) throw new t("invalid signature: left bytes after parsing");
      return { r: n.decode(s), s: n.decode(u) };
    },
    hexFromSig(e) {
      const { _tlv: t, _int: n } = oe,
        r = t.encode(2, n.encode(e.r)),
        a = t.encode(2, n.encode(e.s)),
        i = r + a;
      return t.encode(48, i);
    },
  },
  fe = BigInt(0),
  Ee = BigInt(1),
  cr = BigInt(2),
  Ce = BigInt(3),
  ja = BigInt(4);
function we(e, t) {
  const { BYTES: n } = e;
  let r;
  if (typeof t == "bigint") r = t;
  else {
    let a = J("private key", t);
    try {
      r = e.fromBytes(a);
    } catch {
      throw new Error(
        `invalid private key: expected ui8a of size ${n}, got ${typeof t}`
      );
    }
  }
  if (!e.isValidNot0(r))
    throw new Error("invalid private key: out of range [1..N-1]");
  return r;
}
function Fa(e, t = {}) {
  const n = ka("weierstrass", e, t),
    { Fp: r, Fn: a } = n;
  let i = n.CURVE;
  const { h: o, n: s } = i;
  en(
    t,
    {},
    {
      allowInfinityPoint: "boolean",
      clearCofactor: "function",
      isTorsionFree: "function",
      fromBytes: "function",
      toBytes: "function",
      endo: "object",
      wrapPrivateKey: "boolean",
    }
  );
  const { endo: f } = t;
  if (
    f &&
    (!r.is0(i.a) || typeof f.beta != "bigint" || !Array.isArray(f.basises))
  )
    throw new Error(
      'invalid endo: expected "beta": bigint and "basises": array'
    );
  const u = lr(r, a);
  function p() {
    if (!r.isOdd)
      throw new Error(
        "compression is not supported: Field does not have .isOdd()"
      );
  }
  function l(C, h, m) {
    const { x: y, y: _ } = h.toAffine(),
      x = r.toBytes(y);
    if ((ze(m, "isCompressed"), m)) {
      p();
      const S = !r.isOdd(_);
      return ue(ur(S), x);
    } else return ue(Uint8Array.of(4), x, r.toBytes(_));
  }
  function d(C) {
    me(C, void 0, "Point");
    const { publicKey: h, publicKeyUncompressed: m } = u,
      y = C.length,
      _ = C[0],
      x = C.subarray(1);
    if (y === h && (_ === 2 || _ === 3)) {
      const S = r.fromBytes(x);
      if (!r.isValid(S)) throw new Error("bad point: is not on curve, wrong x");
      const P = g(S);
      let E;
      try {
        E = r.sqrt(P);
      } catch (H) {
        const k = H instanceof Error ? ": " + H.message : "";
        throw new Error("bad point: is not on curve, sqrt error" + k);
      }
      p();
      const B = r.isOdd(E);
      return ((_ & 1) === 1) !== B && (E = r.neg(E)), { x: S, y: E };
    } else if (y === m && _ === 4) {
      const S = r.BYTES,
        P = r.fromBytes(x.subarray(0, S)),
        E = r.fromBytes(x.subarray(S, S * 2));
      if (!w(P, E)) throw new Error("bad point: is not on curve");
      return { x: P, y: E };
    } else
      throw new Error(
        `bad point: got length ${y}, expected compressed=${h} or uncompressed=${m}`
      );
  }
  const c = t.toBytes || l,
    b = t.fromBytes || d;
  function g(C) {
    const h = r.sqr(C),
      m = r.mul(h, C);
    return r.add(r.add(m, r.mul(C, i.a)), i.b);
  }
  function w(C, h) {
    const m = r.sqr(h),
      y = g(C);
    return r.eql(m, y);
  }
  if (!w(i.Gx, i.Gy)) throw new Error("bad curve params: generator point");
  const v = r.mul(r.pow(i.a, Ce), ja),
    O = r.mul(r.sqr(i.b), BigInt(27));
  if (r.is0(r.add(v, O))) throw new Error("bad curve params: a or b");
  function G(C, h, m = !1) {
    if (!r.isValid(h) || (m && r.is0(h)))
      throw new Error(`bad point coordinate ${C}`);
    return h;
  }
  function j(C) {
    if (!(C instanceof $)) throw new Error("ProjectivePoint expected");
  }
  function q(C) {
    if (!f || !f.basises) throw new Error("no endo");
    return Ra(C, f.basises, a.ORDER);
  }
  const I = mn((C, h) => {
      const { X: m, Y: y, Z: _ } = C;
      if (r.eql(_, r.ONE)) return { x: m, y };
      const x = C.is0();
      h == null && (h = x ? r.ONE : r.inv(_));
      const S = r.mul(m, h),
        P = r.mul(y, h),
        E = r.mul(_, h);
      if (x) return { x: r.ZERO, y: r.ZERO };
      if (!r.eql(E, r.ONE)) throw new Error("invZ was invalid");
      return { x: S, y: P };
    }),
    L = mn((C) => {
      if (C.is0()) {
        if (t.allowInfinityPoint && !r.is0(C.Y)) return;
        throw new Error("bad point: ZERO");
      }
      const { x: h, y: m } = C.toAffine();
      if (!r.isValid(h) || !r.isValid(m))
        throw new Error("bad point: x or y not field elements");
      if (!w(h, m)) throw new Error("bad point: equation left != right");
      if (!C.isTorsionFree())
        throw new Error("bad point: not in prime-order subgroup");
      return !0;
    });
  function Q(C, h, m, y, _) {
    return (
      (m = new $(r.mul(m.X, C), m.Y, m.Z)),
      (h = Me(y, h)),
      (m = Me(_, m)),
      h.add(m)
    );
  }
  class $ {
    constructor(h, m, y) {
      (this.X = G("x", h)),
        (this.Y = G("y", m, !0)),
        (this.Z = G("z", y)),
        Object.freeze(this);
    }
    static CURVE() {
      return i;
    }
    static fromAffine(h) {
      const { x: m, y } = h || {};
      if (!h || !r.isValid(m) || !r.isValid(y))
        throw new Error("invalid affine point");
      if (h instanceof $) throw new Error("projective point not allowed");
      return r.is0(m) && r.is0(y) ? $.ZERO : new $(m, y, r.ONE);
    }
    static fromBytes(h) {
      const m = $.fromAffine(b(me(h, void 0, "point")));
      return m.assertValidity(), m;
    }
    static fromHex(h) {
      return $.fromBytes(J("pointHex", h));
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    precompute(h = 8, m = !0) {
      return te.createCache(this, h), m || this.multiply(Ce), this;
    }
    assertValidity() {
      L(this);
    }
    hasEvenY() {
      const { y: h } = this.toAffine();
      if (!r.isOdd) throw new Error("Field doesn't support isOdd");
      return !r.isOdd(h);
    }
    equals(h) {
      j(h);
      const { X: m, Y: y, Z: _ } = this,
        { X: x, Y: S, Z: P } = h,
        E = r.eql(r.mul(m, P), r.mul(x, _)),
        B = r.eql(r.mul(y, P), r.mul(S, _));
      return E && B;
    }
    negate() {
      return new $(this.X, r.neg(this.Y), this.Z);
    }
    double() {
      const { a: h, b: m } = i,
        y = r.mul(m, Ce),
        { X: _, Y: x, Z: S } = this;
      let P = r.ZERO,
        E = r.ZERO,
        B = r.ZERO,
        U = r.mul(_, _),
        H = r.mul(x, x),
        k = r.mul(S, S),
        D = r.mul(_, x);
      return (
        (D = r.add(D, D)),
        (B = r.mul(_, S)),
        (B = r.add(B, B)),
        (P = r.mul(h, B)),
        (E = r.mul(y, k)),
        (E = r.add(P, E)),
        (P = r.sub(H, E)),
        (E = r.add(H, E)),
        (E = r.mul(P, E)),
        (P = r.mul(D, P)),
        (B = r.mul(y, B)),
        (k = r.mul(h, k)),
        (D = r.sub(U, k)),
        (D = r.mul(h, D)),
        (D = r.add(D, B)),
        (B = r.add(U, U)),
        (U = r.add(B, U)),
        (U = r.add(U, k)),
        (U = r.mul(U, D)),
        (E = r.add(E, U)),
        (k = r.mul(x, S)),
        (k = r.add(k, k)),
        (U = r.mul(k, D)),
        (P = r.sub(P, U)),
        (B = r.mul(k, H)),
        (B = r.add(B, B)),
        (B = r.add(B, B)),
        new $(P, E, B)
      );
    }
    add(h) {
      j(h);
      const { X: m, Y: y, Z: _ } = this,
        { X: x, Y: S, Z: P } = h;
      let E = r.ZERO,
        B = r.ZERO,
        U = r.ZERO;
      const H = i.a,
        k = r.mul(i.b, Ce);
      let D = r.mul(m, x),
        F = r.mul(y, S),
        Z = r.mul(_, P),
        W = r.add(m, y),
        T = r.add(x, S);
      (W = r.mul(W, T)),
        (T = r.add(D, F)),
        (W = r.sub(W, T)),
        (T = r.add(m, _));
      let Y = r.add(x, P);
      return (
        (T = r.mul(T, Y)),
        (Y = r.add(D, Z)),
        (T = r.sub(T, Y)),
        (Y = r.add(y, _)),
        (E = r.add(S, P)),
        (Y = r.mul(Y, E)),
        (E = r.add(F, Z)),
        (Y = r.sub(Y, E)),
        (U = r.mul(H, T)),
        (E = r.mul(k, Z)),
        (U = r.add(E, U)),
        (E = r.sub(F, U)),
        (U = r.add(F, U)),
        (B = r.mul(E, U)),
        (F = r.add(D, D)),
        (F = r.add(F, D)),
        (Z = r.mul(H, Z)),
        (T = r.mul(k, T)),
        (F = r.add(F, Z)),
        (Z = r.sub(D, Z)),
        (Z = r.mul(H, Z)),
        (T = r.add(T, Z)),
        (D = r.mul(F, T)),
        (B = r.add(B, D)),
        (D = r.mul(Y, T)),
        (E = r.mul(W, E)),
        (E = r.sub(E, D)),
        (D = r.mul(W, F)),
        (U = r.mul(Y, U)),
        (U = r.add(U, D)),
        new $(E, B, U)
      );
    }
    subtract(h) {
      return this.add(h.negate());
    }
    is0() {
      return this.equals($.ZERO);
    }
    multiply(h) {
      const { endo: m } = t;
      if (!a.isValidNot0(h)) throw new Error("invalid scalar: out of range");
      let y, _;
      const x = (S) => te.cached(this, S, (P) => ut($, P));
      if (m) {
        const { k1neg: S, k1: P, k2neg: E, k2: B } = q(h),
          { p: U, f: H } = x(P),
          { p: k, f: D } = x(B);
        (_ = H.add(D)), (y = Q(m.beta, U, k, S, E));
      } else {
        const { p: S, f: P } = x(h);
        (y = S), (_ = P);
      }
      return ut($, [y, _])[0];
    }
    multiplyUnsafe(h) {
      const { endo: m } = t,
        y = this;
      if (!a.isValid(h)) throw new Error("invalid scalar: out of range");
      if (h === fe || y.is0()) return $.ZERO;
      if (h === Ee) return y;
      if (te.hasCache(this)) return this.multiply(h);
      if (m) {
        const { k1neg: _, k1: x, k2neg: S, k2: P } = q(h),
          { p1: E, p2: B } = Ca($, y, x, P);
        return Q(m.beta, E, B, _, S);
      } else return te.unsafe(y, h);
    }
    multiplyAndAddUnsafe(h, m, y) {
      const _ = this.multiplyUnsafe(m).add(h.multiplyUnsafe(y));
      return _.is0() ? void 0 : _;
    }
    toAffine(h) {
      return I(this, h);
    }
    isTorsionFree() {
      const { isTorsionFree: h } = t;
      return o === Ee ? !0 : h ? h($, this) : te.unsafe(this, s).is0();
    }
    clearCofactor() {
      const { clearCofactor: h } = t;
      return o === Ee ? this : h ? h($, this) : this.multiplyUnsafe(o);
    }
    isSmallOrder() {
      return this.multiplyUnsafe(o).is0();
    }
    toBytes(h = !0) {
      return ze(h, "isCompressed"), this.assertValidity(), c($, this, h);
    }
    toHex(h = !0) {
      return ve(this.toBytes(h));
    }
    toString() {
      return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`;
    }
    get px() {
      return this.X;
    }
    get py() {
      return this.X;
    }
    get pz() {
      return this.Z;
    }
    toRawBytes(h = !0) {
      return this.toBytes(h);
    }
    _setWindowSize(h) {
      this.precompute(h);
    }
    static normalizeZ(h) {
      return ut($, h);
    }
    static msm(h, m) {
      return La($, a, h, m);
    }
    static fromPrivateKey(h) {
      return $.BASE.multiply(we(a, h));
    }
  }
  ($.BASE = new $(i.Gx, i.Gy, r.ONE)),
    ($.ZERO = new $(r.ZERO, r.ONE, r.ZERO)),
    ($.Fp = r),
    ($.Fn = a);
  const K = a.BITS,
    te = new Da($, t.endo ? Math.ceil(K / 2) : K);
  return $.BASE.precompute(8), $;
}
function ur(e) {
  return Uint8Array.of(e ? 2 : 3);
}
function lr(e, t) {
  return {
    secretKey: t.BYTES,
    publicKey: 1 + e.BYTES,
    publicKeyUncompressed: 1 + 2 * e.BYTES,
    publicKeyHasPrefix: !0,
    signature: 2 * t.BYTES,
  };
}
function Ta(e, t = {}) {
  const { Fn: n } = e,
    r = t.randomBytes || Mn,
    a = Object.assign(lr(e.Fp, n), { seed: or(n.ORDER) });
  function i(c) {
    try {
      return !!we(n, c);
    } catch {
      return !1;
    }
  }
  function o(c, b) {
    const { publicKey: g, publicKeyUncompressed: w } = a;
    try {
      const v = c.length;
      return (b === !0 && v !== g) || (b === !1 && v !== w)
        ? !1
        : !!e.fromBytes(c);
    } catch {
      return !1;
    }
  }
  function s(c = r(a.seed)) {
    return Aa(me(c, a.seed, "seed"), n.ORDER);
  }
  function f(c, b = !0) {
    return e.BASE.multiply(we(n, c)).toBytes(b);
  }
  function u(c) {
    const b = s(c);
    return { secretKey: b, publicKey: f(b) };
  }
  function p(c) {
    if (typeof c == "bigint") return !1;
    if (c instanceof e) return !0;
    const { secretKey: b, publicKey: g, publicKeyUncompressed: w } = a;
    if (n.allowedLengths || b === g) return;
    const v = J("key", c).length;
    return v === g || v === w;
  }
  function l(c, b, g = !0) {
    if (p(c) === !0) throw new Error("first arg must be private key");
    if (p(b) === !1) throw new Error("second arg must be public key");
    const w = we(n, c);
    return e.fromHex(b).multiply(w).toBytes(g);
  }
  return Object.freeze({
    getPublicKey: f,
    getSharedSecret: l,
    keygen: u,
    Point: e,
    utils: {
      isValidSecretKey: i,
      isValidPublicKey: o,
      randomSecretKey: s,
      isValidPrivateKey: i,
      randomPrivateKey: s,
      normPrivateKeyToScalar: (c) => we(n, c),
      precompute(c = 8, b = e.BASE) {
        return b.precompute(c, !1);
      },
    },
    lengths: a,
  });
}
function Va(e, t, n = {}) {
  qr(t),
    en(
      n,
      {},
      {
        hmac: "function",
        lowS: "boolean",
        randomBytes: "function",
        bits2int: "function",
        bits2int_modN: "function",
      }
    );
  const r = n.randomBytes || Mn,
    a = n.hmac || ((m, ...y) => Yr(t, m, ue(...y))),
    { Fp: i, Fn: o } = e,
    { ORDER: s, BITS: f } = o,
    {
      keygen: u,
      getPublicKey: p,
      getSharedSecret: l,
      utils: d,
      lengths: c,
    } = Ta(e, n),
    b = {
      prehash: !1,
      lowS: typeof n.lowS == "boolean" ? n.lowS : !1,
      format: void 0,
      extraEntropy: !1,
    },
    g = "compact";
  function w(m) {
    const y = s >> Ee;
    return m > y;
  }
  function v(m, y) {
    if (!o.isValidNot0(y))
      throw new Error(`invalid signature ${m}: out of range 1..Point.Fn.ORDER`);
    return y;
  }
  function O(m, y) {
    bt(y);
    const _ = c.signature,
      x = y === "compact" ? _ : y === "recovered" ? _ + 1 : void 0;
    return me(m, x, `${y} signature`);
  }
  class G {
    constructor(y, _, x) {
      (this.r = v("r", y)),
        (this.s = v("s", _)),
        x != null && (this.recovery = x),
        Object.freeze(this);
    }
    static fromBytes(y, _ = g) {
      O(y, _);
      let x;
      if (_ === "der") {
        const { r: B, s: U } = oe.toSig(me(y));
        return new G(B, U);
      }
      _ === "recovered" && ((x = y[0]), (_ = "compact"), (y = y.subarray(1)));
      const S = o.BYTES,
        P = y.subarray(0, S),
        E = y.subarray(S, S * 2);
      return new G(o.fromBytes(P), o.fromBytes(E), x);
    }
    static fromHex(y, _) {
      return this.fromBytes(Te(y), _);
    }
    addRecoveryBit(y) {
      return new G(this.r, this.s, y);
    }
    recoverPublicKey(y) {
      const _ = i.ORDER,
        { r: x, s: S, recovery: P } = this;
      if (P == null || ![0, 1, 2, 3].includes(P))
        throw new Error("recovery id invalid");
      if (s * cr < _ && P > 1)
        throw new Error("recovery id is ambiguous for h>1 curve");
      const B = P === 2 || P === 3 ? x + s : x;
      if (!i.isValid(B)) throw new Error("recovery id 2 or 3 invalid");
      const U = i.toBytes(B),
        H = e.fromBytes(ue(ur((P & 1) === 0), U)),
        k = o.inv(B),
        D = q(J("msgHash", y)),
        F = o.create(-D * k),
        Z = o.create(S * k),
        W = e.BASE.multiplyUnsafe(F).add(H.multiplyUnsafe(Z));
      if (W.is0()) throw new Error("point at infinify");
      return W.assertValidity(), W;
    }
    hasHighS() {
      return w(this.s);
    }
    toBytes(y = g) {
      if ((bt(y), y === "der")) return Te(oe.hexFromSig(this));
      const _ = o.toBytes(this.r),
        x = o.toBytes(this.s);
      if (y === "recovered") {
        if (this.recovery == null)
          throw new Error("recovery bit must be present");
        return ue(Uint8Array.of(this.recovery), _, x);
      }
      return ue(_, x);
    }
    toHex(y) {
      return ve(this.toBytes(y));
    }
    assertValidity() {}
    static fromCompact(y) {
      return G.fromBytes(J("sig", y), "compact");
    }
    static fromDER(y) {
      return G.fromBytes(J("sig", y), "der");
    }
    normalizeS() {
      return this.hasHighS()
        ? new G(this.r, o.neg(this.s), this.recovery)
        : this;
    }
    toDERRawBytes() {
      return this.toBytes("der");
    }
    toDERHex() {
      return ve(this.toBytes("der"));
    }
    toCompactRawBytes() {
      return this.toBytes("compact");
    }
    toCompactHex() {
      return ve(this.toBytes("compact"));
    }
  }
  const j =
      n.bits2int ||
      function (y) {
        if (y.length > 8192) throw new Error("input is too large");
        const _ = tt(y),
          x = y.length * 8 - f;
        return x > 0 ? _ >> BigInt(x) : _;
      },
    q =
      n.bits2int_modN ||
      function (y) {
        return o.create(j(y));
      },
    I = Ue(f);
  function L(m) {
    return wa("num < 2^" + f, m, fe, I), o.toBytes(m);
  }
  function Q(m, y) {
    return (
      me(m, void 0, "message"), y ? me(t(m), void 0, "prehashed message") : m
    );
  }
  function $(m, y, _) {
    if (["recovered", "canonical"].some((F) => F in _))
      throw new Error("sign() legacy options not supported");
    const { lowS: x, prehash: S, extraEntropy: P } = yt(_, b);
    m = Q(m, S);
    const E = q(m),
      B = we(o, y),
      U = [L(B), L(E)];
    if (P != null && P !== !1) {
      const F = P === !0 ? r(c.secretKey) : P;
      U.push(J("extraEntropy", F));
    }
    const H = ue(...U),
      k = E;
    function D(F) {
      const Z = j(F);
      if (!o.isValidNot0(Z)) return;
      const W = o.inv(Z),
        T = e.BASE.multiply(Z).toAffine(),
        Y = o.create(T.x);
      if (Y === fe) return;
      const $e = o.create(W * o.create(k + Y * B));
      if ($e === fe) return;
      let dn = (T.x === Y ? 0 : 2) | Number(T.y & Ee),
        pn = $e;
      return x && w($e) && ((pn = o.neg($e)), (dn ^= 1)), new G(Y, pn, dn);
    }
    return { seed: H, k2sig: D };
  }
  function K(m, y, _ = {}) {
    m = J("message", m);
    const { seed: x, k2sig: S } = $(m, y, _);
    return va(t.outputLen, o.BYTES, a)(x, S);
  }
  function te(m) {
    let y;
    const _ = typeof m == "string" || Kt(m),
      x =
        !_ &&
        m !== null &&
        typeof m == "object" &&
        typeof m.r == "bigint" &&
        typeof m.s == "bigint";
    if (!_ && !x)
      throw new Error(
        "invalid signature, expected Uint8Array, hex string or Signature instance"
      );
    if (x) y = new G(m.r, m.s);
    else if (_) {
      try {
        y = G.fromBytes(J("sig", m), "der");
      } catch (S) {
        if (!(S instanceof oe.Err)) throw S;
      }
      if (!y)
        try {
          y = G.fromBytes(J("sig", m), "compact");
        } catch {
          return !1;
        }
    }
    return y || !1;
  }
  function C(m, y, _, x = {}) {
    const { lowS: S, prehash: P, format: E } = yt(x, b);
    if (((_ = J("publicKey", _)), (y = Q(J("message", y), P)), "strict" in x))
      throw new Error("options.strict was renamed to lowS");
    const B = E === void 0 ? te(m) : G.fromBytes(J("sig", m), E);
    if (B === !1) return !1;
    try {
      const U = e.fromBytes(_);
      if (S && B.hasHighS()) return !1;
      const { r: H, s: k } = B,
        D = q(y),
        F = o.inv(k),
        Z = o.create(D * F),
        W = o.create(H * F),
        T = e.BASE.multiplyUnsafe(Z).add(U.multiplyUnsafe(W));
      return T.is0() ? !1 : o.create(T.x) === H;
    } catch {
      return !1;
    }
  }
  function h(m, y, _ = {}) {
    const { prehash: x } = yt(_, b);
    return (
      (y = Q(y, x)), G.fromBytes(m, "recovered").recoverPublicKey(y).toBytes()
    );
  }
  return Object.freeze({
    keygen: u,
    getPublicKey: p,
    getSharedSecret: l,
    utils: d,
    lengths: c,
    Point: e,
    sign: K,
    verify: C,
    recoverPublicKey: h,
    Signature: G,
    hash: t,
  });
}
function za(e) {
  const t = {
      a: e.a,
      b: e.b,
      p: e.Fp.ORDER,
      n: e.n,
      h: e.h,
      Gx: e.Gx,
      Gy: e.Gy,
    },
    n = e.Fp;
  let r = e.allowedPrivateKeyLengths
    ? Array.from(
        new Set(e.allowedPrivateKeyLengths.map((o) => Math.ceil(o / 2)))
      )
    : void 0;
  const a = _e(t.n, {
      BITS: e.nBitLength,
      allowedLengths: r,
      modFromBytes: e.wrapPrivateKey,
    }),
    i = {
      Fp: n,
      Fn: a,
      allowInfinityPoint: e.allowInfinityPoint,
      endo: e.endo,
      isTorsionFree: e.isTorsionFree,
      clearCofactor: e.clearCofactor,
      fromBytes: e.fromBytes,
      toBytes: e.toBytes,
    };
  return { CURVE: t, curveOpts: i };
}
function Ma(e) {
  const { CURVE: t, curveOpts: n } = za(e),
    r = {
      hmac: e.hmac,
      randomBytes: e.randomBytes,
      lowS: e.lowS,
      bits2int: e.bits2int,
      bits2int_modN: e.bits2int_modN,
    };
  return { CURVE: t, curveOpts: n, hash: e.hash, ecdsaOpts: r };
}
function Ha(e, t) {
  const n = t.Point;
  return Object.assign({}, t, {
    ProjectivePoint: n,
    CURVE: Object.assign({}, e, ar(n.Fn.ORDER, n.Fn.BITS)),
  });
}
function Za(e) {
  const { CURVE: t, curveOpts: n, hash: r, ecdsaOpts: a } = Ma(e),
    i = Fa(t, n),
    o = Va(i, r, a);
  return Ha(e, o);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ function nn(
  e,
  t
) {
  const n = (r) => Za({ ...e, hash: r });
  return { ...n(t), create: n };
}
function qa(e, t) {
  let n;
  try {
    n = e();
  } catch {
    return;
  }
  return {
    getItem: (a) => {
      var i;
      const o = (f) => (f === null ? null : JSON.parse(f, void 0)),
        s = (i = n.getItem(a)) != null ? i : null;
      return s instanceof Promise ? s.then(o) : o(s);
    },
    setItem: (a, i) => n.setItem(a, JSON.stringify(i, void 0)),
    removeItem: (a) => n.removeItem(a),
  };
}
const _t = (e) => (t) => {
    try {
      const n = e(t);
      return n instanceof Promise
        ? n
        : {
            then(r) {
              return _t(r)(n);
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
          return _t(r)(n);
        },
      };
    }
  },
  Ya = (e, t) => (n, r, a) => {
    let i = {
        storage: qa(() => localStorage),
        partialize: (g) => g,
        version: 0,
        merge: (g, w) => ({ ...w, ...g }),
        ...t,
      },
      o = !1;
    const s = new Set(),
      f = new Set();
    let u = i.storage;
    if (!u)
      return e(
        (...g) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${i.name}', the given storage is currently unavailable.`
          ),
            n(...g);
        },
        r,
        a
      );
    const p = () => {
        const g = i.partialize({ ...r() });
        return u.setItem(i.name, { state: g, version: i.version });
      },
      l = a.setState;
    a.setState = (g, w) => {
      l(g, w), p();
    };
    const d = e(
      (...g) => {
        n(...g), p();
      },
      r,
      a
    );
    a.getInitialState = () => d;
    let c;
    const b = () => {
      var g, w;
      if (!u) return;
      (o = !1),
        s.forEach((O) => {
          var G;
          return O((G = r()) != null ? G : d);
        });
      const v =
        ((w = i.onRehydrateStorage) == null
          ? void 0
          : w.call(i, (g = r()) != null ? g : d)) || void 0;
      return _t(u.getItem.bind(u))(i.name)
        .then((O) => {
          if (O)
            if (typeof O.version == "number" && O.version !== i.version) {
              if (i.migrate) {
                const G = i.migrate(O.state, O.version);
                return G instanceof Promise ? G.then((j) => [!0, j]) : [!0, G];
              }
              console.error(
                "State loaded from storage couldn't be migrated since no migrate function was provided"
              );
            } else return [!1, O.state];
          return [!1, void 0];
        })
        .then((O) => {
          var G;
          const [j, q] = O;
          if (((c = i.merge(q, (G = r()) != null ? G : d)), n(c, !0), j))
            return p();
        })
        .then(() => {
          v?.(c, void 0), (c = r()), (o = !0), f.forEach((O) => O(c));
        })
        .catch((O) => {
          v?.(void 0, O);
        });
    };
    return (
      (a.persist = {
        setOptions: (g) => {
          (i = { ...i, ...g }), g.storage && (u = g.storage);
        },
        clearStorage: () => {
          u?.removeItem(i.name);
        },
        getOptions: () => i,
        rehydrate: () => b(),
        hasHydrated: () => o,
        onHydrate: (g) => (
          s.add(g),
          () => {
            s.delete(g);
          }
        ),
        onFinishHydration: (g) => (
          f.add(g),
          () => {
            f.delete(g);
          }
        ),
      }),
      i.skipHydration || b(),
      c || d
    );
  },
  go = Ya,
  xn = (e) => {
    let t;
    const n = new Set(),
      r = (u, p) => {
        const l = typeof u == "function" ? u(t) : u;
        if (!Object.is(l, t)) {
          const d = t;
          (t =
            p ?? (typeof l != "object" || l === null)
              ? l
              : Object.assign({}, t, l)),
            n.forEach((c) => c(t, d));
        }
      },
      a = () => t,
      s = {
        setState: r,
        getState: a,
        getInitialState: () => f,
        subscribe: (u) => (n.add(u), () => n.delete(u)),
      },
      f = (t = e(r, a, s));
    return s;
  },
  ho = (e) => (e ? xn(e) : xn);
var nt,
  R,
  dr,
  ye,
  En,
  pr,
  wt,
  rn,
  vt,
  xt,
  Ge = {},
  yr = [],
  Ka = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
  an = Array.isArray;
function le(e, t) {
  for (var n in t) e[n] = t[n];
  return e;
}
function mr(e) {
  e && e.parentNode && e.parentNode.removeChild(e);
}
function Xa(e, t, n) {
  var r,
    a,
    i,
    o = {};
  for (i in t)
    i == "key" ? (r = t[i]) : i == "ref" ? (a = t[i]) : (o[i] = t[i]);
  if (
    (arguments.length > 2 &&
      (o.children = arguments.length > 3 ? nt.call(arguments, 2) : n),
    typeof e == "function" && e.defaultProps != null)
  )
    for (i in e.defaultProps) o[i] === void 0 && (o[i] = e.defaultProps[i]);
  return Ne(e, o, r, a, null);
}
function Ne(e, t, n, r, a) {
  var i = {
    type: e,
    props: t,
    key: n,
    ref: r,
    __k: null,
    __: null,
    __b: 0,
    __e: null,
    __d: void 0,
    __c: null,
    constructor: void 0,
    __v: a ?? ++dr,
    __i: -1,
    __u: 0,
  };
  return a == null && R.vnode != null && R.vnode(i), i;
}
function rt(e) {
  return e.children;
}
function je(e, t) {
  (this.props = e), (this.context = t);
}
function Pe(e, t) {
  if (t == null) return e.__ ? Pe(e.__, e.__i + 1) : null;
  for (var n; t < e.__k.length; t++)
    if ((n = e.__k[t]) != null && n.__e != null) return n.__e;
  return typeof e.type == "function" ? Pe(e) : null;
}
function gr(e) {
  var t, n;
  if ((e = e.__) != null && e.__c != null) {
    for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
      if ((n = e.__k[t]) != null && n.__e != null) {
        e.__e = e.__c.base = n.__e;
        break;
      }
    return gr(e);
  }
}
function On(e) {
  ((!e.__d && (e.__d = !0) && ye.push(e) && !He.__r++) ||
    En !== R.debounceRendering) &&
    ((En = R.debounceRendering) || pr)(He);
}
function He() {
  var e, t, n, r, a, i, o, s;
  for (ye.sort(wt); (e = ye.shift()); )
    e.__d &&
      ((t = ye.length),
      (r = void 0),
      (i = (a = (n = e).__v).__e),
      (o = []),
      (s = []),
      n.__P &&
        (((r = le({}, a)).__v = a.__v + 1),
        R.vnode && R.vnode(r),
        on(
          n.__P,
          r,
          a,
          n.__n,
          n.__P.namespaceURI,
          32 & a.__u ? [i] : null,
          o,
          i ?? Pe(a),
          !!(32 & a.__u),
          s
        ),
        (r.__v = a.__v),
        (r.__.__k[r.__i] = r),
        _r(o, r, s),
        r.__e != i && gr(r)),
      ye.length > t && ye.sort(wt));
  He.__r = 0;
}
function hr(e, t, n, r, a, i, o, s, f, u, p) {
  var l,
    d,
    c,
    b,
    g,
    w = (r && r.__k) || yr,
    v = t.length;
  for (n.__d = f, Wa(n, t, w), f = n.__d, l = 0; l < v; l++)
    (c = n.__k[l]) != null &&
      ((d = c.__i === -1 ? Ge : w[c.__i] || Ge),
      (c.__i = l),
      on(e, c, d, a, i, o, s, f, u, p),
      (b = c.__e),
      c.ref &&
        d.ref != c.ref &&
        (d.ref && sn(d.ref, null, c), p.push(c.ref, c.__c || b, c)),
      g == null && b != null && (g = b),
      65536 & c.__u || d.__k === c.__k
        ? (f = br(c, f, e))
        : typeof c.type == "function" && c.__d !== void 0
        ? (f = c.__d)
        : b && (f = b.nextSibling),
      (c.__d = void 0),
      (c.__u &= -196609));
  (n.__d = f), (n.__e = g);
}
function Wa(e, t, n) {
  var r,
    a,
    i,
    o,
    s,
    f = t.length,
    u = n.length,
    p = u,
    l = 0;
  for (e.__k = [], r = 0; r < f; r++)
    (a = t[r]) != null && typeof a != "boolean" && typeof a != "function"
      ? ((o = r + l),
        ((a = e.__k[r] =
          typeof a == "string" ||
          typeof a == "number" ||
          typeof a == "bigint" ||
          a.constructor == String
            ? Ne(null, a, null, null, null)
            : an(a)
            ? Ne(rt, { children: a }, null, null, null)
            : a.constructor === void 0 && a.__b > 0
            ? Ne(a.type, a.props, a.key, a.ref ? a.ref : null, a.__v)
            : a).__ = e),
        (a.__b = e.__b + 1),
        (i = null),
        (s = a.__i = Ja(a, n, o, p)) !== -1 &&
          (p--, (i = n[s]) && (i.__u |= 131072)),
        i == null || i.__v === null
          ? (s == -1 && l--, typeof a.type != "function" && (a.__u |= 65536))
          : s !== o &&
            (s == o - 1
              ? l--
              : s == o + 1
              ? l++
              : (s > o ? l-- : l++, (a.__u |= 65536))))
      : (a = e.__k[r] = null);
  if (p)
    for (r = 0; r < u; r++)
      (i = n[r]) != null &&
        !(131072 & i.__u) &&
        (i.__e == e.__d && (e.__d = Pe(i)), wr(i, i));
}
function br(e, t, n) {
  var r, a;
  if (typeof e.type == "function") {
    for (r = e.__k, a = 0; r && a < r.length; a++)
      r[a] && ((r[a].__ = e), (t = br(r[a], t, n)));
    return t;
  }
  e.__e != t &&
    (t && e.type && !n.contains(t) && (t = Pe(e)),
    n.insertBefore(e.__e, t || null),
    (t = e.__e));
  do t = t && t.nextSibling;
  while (t != null && t.nodeType === 8);
  return t;
}
function Ja(e, t, n, r) {
  var a = e.key,
    i = e.type,
    o = n - 1,
    s = n + 1,
    f = t[n];
  if (f === null || (f && a == f.key && i === f.type && !(131072 & f.__u)))
    return n;
  if (r > (f != null && !(131072 & f.__u) ? 1 : 0))
    for (; o >= 0 || s < t.length; ) {
      if (o >= 0) {
        if ((f = t[o]) && !(131072 & f.__u) && a == f.key && i === f.type)
          return o;
        o--;
      }
      if (s < t.length) {
        if ((f = t[s]) && !(131072 & f.__u) && a == f.key && i === f.type)
          return s;
        s++;
      }
    }
  return -1;
}
function Pn(e, t, n) {
  t[0] === "-"
    ? e.setProperty(t, n ?? "")
    : (e[t] =
        n == null ? "" : typeof n != "number" || Ka.test(t) ? n : n + "px");
}
function Le(e, t, n, r, a) {
  var i;
  e: if (t === "style")
    if (typeof n == "string") e.style.cssText = n;
    else {
      if ((typeof r == "string" && (e.style.cssText = r = ""), r))
        for (t in r) (n && t in n) || Pn(e.style, t, "");
      if (n) for (t in n) (r && n[t] === r[t]) || Pn(e.style, t, n[t]);
    }
  else if (t[0] === "o" && t[1] === "n")
    (i = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1"))),
      (t =
        t.toLowerCase() in e || t === "onFocusOut" || t === "onFocusIn"
          ? t.toLowerCase().slice(2)
          : t.slice(2)),
      e.l || (e.l = {}),
      (e.l[t + i] = n),
      n
        ? r
          ? (n.u = r.u)
          : ((n.u = rn), e.addEventListener(t, i ? xt : vt, i))
        : e.removeEventListener(t, i ? xt : vt, i);
  else {
    if (a == "http://www.w3.org/2000/svg")
      t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (
      t != "width" &&
      t != "height" &&
      t != "href" &&
      t != "list" &&
      t != "form" &&
      t != "tabIndex" &&
      t != "download" &&
      t != "rowSpan" &&
      t != "colSpan" &&
      t != "role" &&
      t != "popover" &&
      t in e
    )
      try {
        e[t] = n ?? "";
        break e;
      } catch {}
    typeof n == "function" ||
      (n == null || (n === !1 && t[4] !== "-")
        ? e.removeAttribute(t)
        : e.setAttribute(t, t == "popover" && n == 1 ? "" : n));
  }
}
function Sn(e) {
  return function (t) {
    if (this.l) {
      var n = this.l[t.type + e];
      if (t.t == null) t.t = rn++;
      else if (t.t < n.u) return;
      return n(R.event ? R.event(t) : t);
    }
  };
}
function on(e, t, n, r, a, i, o, s, f, u) {
  var p,
    l,
    d,
    c,
    b,
    g,
    w,
    v,
    O,
    G,
    j,
    q,
    I,
    L,
    Q,
    $,
    K = t.type;
  if (t.constructor !== void 0) return null;
  128 & n.__u && ((f = !!(32 & n.__u)), (i = [(s = t.__e = n.__e)])),
    (p = R.__b) && p(t);
  e: if (typeof K == "function")
    try {
      if (
        ((v = t.props),
        (O = "prototype" in K && K.prototype.render),
        (G = (p = K.contextType) && r[p.__c]),
        (j = p ? (G ? G.props.value : p.__) : r),
        n.__c
          ? (w = (l = t.__c = n.__c).__ = l.__E)
          : (O
              ? (t.__c = l = new K(v, j))
              : ((t.__c = l = new je(v, j)),
                (l.constructor = K),
                (l.render = ei)),
            G && G.sub(l),
            (l.props = v),
            l.state || (l.state = {}),
            (l.context = j),
            (l.__n = r),
            (d = l.__d = !0),
            (l.__h = []),
            (l._sb = [])),
        O && l.__s == null && (l.__s = l.state),
        O &&
          K.getDerivedStateFromProps != null &&
          (l.__s == l.state && (l.__s = le({}, l.__s)),
          le(l.__s, K.getDerivedStateFromProps(v, l.__s))),
        (c = l.props),
        (b = l.state),
        (l.__v = t),
        d)
      )
        O &&
          K.getDerivedStateFromProps == null &&
          l.componentWillMount != null &&
          l.componentWillMount(),
          O && l.componentDidMount != null && l.__h.push(l.componentDidMount);
      else {
        if (
          (O &&
            K.getDerivedStateFromProps == null &&
            v !== c &&
            l.componentWillReceiveProps != null &&
            l.componentWillReceiveProps(v, j),
          !l.__e &&
            ((l.shouldComponentUpdate != null &&
              l.shouldComponentUpdate(v, l.__s, j) === !1) ||
              t.__v === n.__v))
        ) {
          for (
            t.__v !== n.__v && ((l.props = v), (l.state = l.__s), (l.__d = !1)),
              t.__e = n.__e,
              t.__k = n.__k,
              t.__k.some(function (te) {
                te && (te.__ = t);
              }),
              q = 0;
            q < l._sb.length;
            q++
          )
            l.__h.push(l._sb[q]);
          (l._sb = []), l.__h.length && o.push(l);
          break e;
        }
        l.componentWillUpdate != null && l.componentWillUpdate(v, l.__s, j),
          O &&
            l.componentDidUpdate != null &&
            l.__h.push(function () {
              l.componentDidUpdate(c, b, g);
            });
      }
      if (
        ((l.context = j),
        (l.props = v),
        (l.__P = e),
        (l.__e = !1),
        (I = R.__r),
        (L = 0),
        O)
      ) {
        for (
          l.state = l.__s,
            l.__d = !1,
            I && I(t),
            p = l.render(l.props, l.state, l.context),
            Q = 0;
          Q < l._sb.length;
          Q++
        )
          l.__h.push(l._sb[Q]);
        l._sb = [];
      } else
        do
          (l.__d = !1),
            I && I(t),
            (p = l.render(l.props, l.state, l.context)),
            (l.state = l.__s);
        while (l.__d && ++L < 25);
      (l.state = l.__s),
        l.getChildContext != null && (r = le(le({}, r), l.getChildContext())),
        O &&
          !d &&
          l.getSnapshotBeforeUpdate != null &&
          (g = l.getSnapshotBeforeUpdate(c, b)),
        hr(
          e,
          an(
            ($ =
              p != null && p.type === rt && p.key == null
                ? p.props.children
                : p)
          )
            ? $
            : [$],
          t,
          n,
          r,
          a,
          i,
          o,
          s,
          f,
          u
        ),
        (l.base = t.__e),
        (t.__u &= -161),
        l.__h.length && o.push(l),
        w && (l.__E = l.__ = null);
    } catch (te) {
      if (((t.__v = null), f || i != null)) {
        for (t.__u |= f ? 160 : 32; s && s.nodeType === 8 && s.nextSibling; )
          s = s.nextSibling;
        (i[i.indexOf(s)] = null), (t.__e = s);
      } else (t.__e = n.__e), (t.__k = n.__k);
      R.__e(te, t, n);
    }
  else
    i == null && t.__v === n.__v
      ? ((t.__k = n.__k), (t.__e = n.__e))
      : (t.__e = Qa(n.__e, t, n, r, a, i, o, f, u));
  (p = R.diffed) && p(t);
}
function _r(e, t, n) {
  t.__d = void 0;
  for (var r = 0; r < n.length; r++) sn(n[r], n[++r], n[++r]);
  R.__c && R.__c(t, e),
    e.some(function (a) {
      try {
        (e = a.__h),
          (a.__h = []),
          e.some(function (i) {
            i.call(a);
          });
      } catch (i) {
        R.__e(i, a.__v);
      }
    });
}
function Qa(e, t, n, r, a, i, o, s, f) {
  var u,
    p,
    l,
    d,
    c,
    b,
    g,
    w = n.props,
    v = t.props,
    O = t.type;
  if (
    (O === "svg"
      ? (a = "http://www.w3.org/2000/svg")
      : O === "math"
      ? (a = "http://www.w3.org/1998/Math/MathML")
      : a || (a = "http://www.w3.org/1999/xhtml"),
    i != null)
  ) {
    for (u = 0; u < i.length; u++)
      if (
        (c = i[u]) &&
        "setAttribute" in c == !!O &&
        (O ? c.localName === O : c.nodeType === 3)
      ) {
        (e = c), (i[u] = null);
        break;
      }
  }
  if (e == null) {
    if (O === null) return document.createTextNode(v);
    (e = document.createElementNS(a, O, v.is && v)),
      s && (R.__m && R.__m(t, i), (s = !1)),
      (i = null);
  }
  if (O === null) w === v || (s && e.data === v) || (e.data = v);
  else {
    if (
      ((i = i && nt.call(e.childNodes)), (w = n.props || Ge), !s && i != null)
    )
      for (w = {}, u = 0; u < e.attributes.length; u++)
        w[(c = e.attributes[u]).name] = c.value;
    for (u in w)
      if (((c = w[u]), u != "children")) {
        if (u == "dangerouslySetInnerHTML") l = c;
        else if (!(u in v)) {
          if (
            (u == "value" && "defaultValue" in v) ||
            (u == "checked" && "defaultChecked" in v)
          )
            continue;
          Le(e, u, null, c, a);
        }
      }
    for (u in v)
      (c = v[u]),
        u == "children"
          ? (d = c)
          : u == "dangerouslySetInnerHTML"
          ? (p = c)
          : u == "value"
          ? (b = c)
          : u == "checked"
          ? (g = c)
          : (s && typeof c != "function") || w[u] === c || Le(e, u, c, w[u], a);
    if (p)
      s ||
        (l && (p.__html === l.__html || p.__html === e.innerHTML)) ||
        (e.innerHTML = p.__html),
        (t.__k = []);
    else if (
      (l && (e.innerHTML = ""),
      hr(
        e,
        an(d) ? d : [d],
        t,
        n,
        r,
        O === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a,
        i,
        o,
        i ? i[0] : n.__k && Pe(n, 0),
        s,
        f
      ),
      i != null)
    )
      for (u = i.length; u--; ) mr(i[u]);
    s ||
      ((u = "value"),
      O === "progress" && b == null
        ? e.removeAttribute("value")
        : b !== void 0 &&
          (b !== e[u] ||
            (O === "progress" && !b) ||
            (O === "option" && b !== w[u])) &&
          Le(e, u, b, w[u], a),
      (u = "checked"),
      g !== void 0 && g !== e[u] && Le(e, u, g, w[u], a));
  }
  return e;
}
function sn(e, t, n) {
  try {
    if (typeof e == "function") {
      var r = typeof e.__u == "function";
      r && e.__u(), (r && t == null) || (e.__u = e(t));
    } else e.current = t;
  } catch (a) {
    R.__e(a, n);
  }
}
function wr(e, t, n) {
  var r, a;
  if (
    (R.unmount && R.unmount(e),
    (r = e.ref) && ((r.current && r.current !== e.__e) || sn(r, null, t)),
    (r = e.__c) != null)
  ) {
    if (r.componentWillUnmount)
      try {
        r.componentWillUnmount();
      } catch (i) {
        R.__e(i, t);
      }
    r.base = r.__P = null;
  }
  if ((r = e.__k))
    for (a = 0; a < r.length; a++)
      r[a] && wr(r[a], t, n || typeof e.type != "function");
  n || mr(e.__e), (e.__c = e.__ = e.__e = e.__d = void 0);
}
function ei(e, t, n) {
  return this.constructor(e, n);
}
function bo(e, t, n) {
  var r, a, i, o;
  R.__ && R.__(e, t),
    (a = (r = !1) ? null : t.__k),
    (i = []),
    (o = []),
    on(
      t,
      (e = t.__k = Xa(rt, null, [e])),
      a || Ge,
      Ge,
      t.namespaceURI,
      a ? null : t.firstChild ? nt.call(t.childNodes) : null,
      i,
      a ? a.__e : t.firstChild,
      r,
      o
    ),
    _r(i, e, o);
}
(nt = yr.slice),
  (R = {
    __e: function (e, t, n, r) {
      for (var a, i, o; (t = t.__); )
        if ((a = t.__c) && !a.__)
          try {
            if (
              ((i = a.constructor) &&
                i.getDerivedStateFromError != null &&
                (a.setState(i.getDerivedStateFromError(e)), (o = a.__d)),
              a.componentDidCatch != null &&
                (a.componentDidCatch(e, r || {}), (o = a.__d)),
              o)
            )
              return (a.__E = a);
          } catch (s) {
            e = s;
          }
      throw e;
    },
  }),
  (dr = 0),
  (je.prototype.setState = function (e, t) {
    var n;
    (n =
      this.__s != null && this.__s !== this.state
        ? this.__s
        : (this.__s = le({}, this.state))),
      typeof e == "function" && (e = e(le({}, n), this.props)),
      e && le(n, e),
      e != null && this.__v && (t && this._sb.push(t), On(this));
  }),
  (je.prototype.forceUpdate = function (e) {
    this.__v && ((this.__e = !0), e && this.__h.push(e), On(this));
  }),
  (je.prototype.render = rt),
  (ye = []),
  (pr =
    typeof Promise == "function"
      ? Promise.prototype.then.bind(Promise.resolve())
      : setTimeout),
  (wt = function (e, t) {
    return e.__v.__b - t.__v.__b;
  }),
  (He.__r = 0),
  (rn = 0),
  (vt = Sn(!1)),
  (xt = Sn(!0));
var Ae,
  z,
  mt,
  Bn,
  Et = 0,
  vr = [],
  M = R,
  In = M.__b,
  Gn = M.__r,
  An = M.diffed,
  Un = M.__c,
  $n = M.unmount,
  Dn = M.__;
function fn(e, t) {
  M.__h && M.__h(z, e, Et || t), (Et = 0);
  var n = z.__H || (z.__H = { __: [], __h: [] });
  return e >= n.__.length && n.__.push({}), n.__[e];
}
function _o(e) {
  return (Et = 1), ti(Er, e);
}
function ti(e, t, n) {
  var r = fn(Ae++, 2);
  if (
    ((r.t = e),
    !r.__c &&
      ((r.__ = [
        Er(void 0, t),
        function (s) {
          var f = r.__N ? r.__N[0] : r.__[0],
            u = r.t(f, s);
          f !== u && ((r.__N = [u, r.__[1]]), r.__c.setState({}));
        },
      ]),
      (r.__c = z),
      !z.u))
  ) {
    var a = function (s, f, u) {
      if (!r.__c.__H) return !0;
      var p = r.__c.__H.__.filter(function (d) {
        return !!d.__c;
      });
      if (
        p.every(function (d) {
          return !d.__N;
        })
      )
        return !i || i.call(this, s, f, u);
      var l = !1;
      return (
        p.forEach(function (d) {
          if (d.__N) {
            var c = d.__[0];
            (d.__ = d.__N), (d.__N = void 0), c !== d.__[0] && (l = !0);
          }
        }),
        !(!l && r.__c.props === s) && (!i || i.call(this, s, f, u))
      );
    };
    z.u = !0;
    var i = z.shouldComponentUpdate,
      o = z.componentWillUpdate;
    (z.componentWillUpdate = function (s, f, u) {
      if (this.__e) {
        var p = i;
        (i = void 0), a(s, f, u), (i = p);
      }
      o && o.call(this, s, f, u);
    }),
      (z.shouldComponentUpdate = a);
  }
  return r.__N || r.__;
}
function wo(e, t) {
  var n = fn(Ae++, 3);
  !M.__s && xr(n.__H, t) && ((n.__ = e), (n.i = t), z.__H.__h.push(n));
}
function vo(e, t) {
  var n = fn(Ae++, 7);
  return xr(n.__H, t) && ((n.__ = e()), (n.__H = t), (n.__h = e)), n.__;
}
function ni() {
  for (var e; (e = vr.shift()); )
    if (e.__P && e.__H)
      try {
        e.__H.__h.forEach(Fe), e.__H.__h.forEach(Ot), (e.__H.__h = []);
      } catch (t) {
        (e.__H.__h = []), M.__e(t, e.__v);
      }
}
(M.__b = function (e) {
  (z = null), In && In(e);
}),
  (M.__ = function (e, t) {
    e && t.__k && t.__k.__m && (e.__m = t.__k.__m), Dn && Dn(e, t);
  }),
  (M.__r = function (e) {
    Gn && Gn(e), (Ae = 0);
    var t = (z = e.__c).__H;
    t &&
      (mt === z
        ? ((t.__h = []),
          (z.__h = []),
          t.__.forEach(function (n) {
            n.__N && (n.__ = n.__N), (n.i = n.__N = void 0);
          }))
        : (t.__h.forEach(Fe), t.__h.forEach(Ot), (t.__h = []), (Ae = 0))),
      (mt = z);
  }),
  (M.diffed = function (e) {
    An && An(e);
    var t = e.__c;
    t &&
      t.__H &&
      (t.__H.__h.length &&
        ((vr.push(t) !== 1 && Bn === M.requestAnimationFrame) ||
          ((Bn = M.requestAnimationFrame) || ri)(ni)),
      t.__H.__.forEach(function (n) {
        n.i && (n.__H = n.i), (n.i = void 0);
      })),
      (mt = z = null);
  }),
  (M.__c = function (e, t) {
    t.some(function (n) {
      try {
        n.__h.forEach(Fe),
          (n.__h = n.__h.filter(function (r) {
            return !r.__ || Ot(r);
          }));
      } catch (r) {
        t.some(function (a) {
          a.__h && (a.__h = []);
        }),
          (t = []),
          M.__e(r, n.__v);
      }
    }),
      Un && Un(e, t);
  }),
  (M.unmount = function (e) {
    $n && $n(e);
    var t,
      n = e.__c;
    n &&
      n.__H &&
      (n.__H.__.forEach(function (r) {
        try {
          Fe(r);
        } catch (a) {
          t = a;
        }
      }),
      (n.__H = void 0),
      t && M.__e(t, n.__v));
  });
var Cn = typeof requestAnimationFrame == "function";
function ri(e) {
  var t,
    n = function () {
      clearTimeout(r), Cn && cancelAnimationFrame(t), setTimeout(e);
    },
    r = setTimeout(n, 100);
  Cn && (t = requestAnimationFrame(n));
}
function Fe(e) {
  var t = z,
    n = e.__c;
  typeof n == "function" && ((e.__c = void 0), n()), (z = t);
}
function Ot(e) {
  var t = z;
  (e.__c = e.__()), (z = t);
}
function xr(e, t) {
  return (
    !e ||
    e.length !== t.length ||
    t.some(function (n, r) {
      return n !== e[r];
    })
  );
}
function Er(e, t) {
  return typeof t == "function" ? t(e) : t;
}
const xo = [
  {
    inputs: [
      { name: "preOpGas", type: "uint256" },
      { name: "paid", type: "uint256" },
      { name: "validAfter", type: "uint48" },
      { name: "validUntil", type: "uint48" },
      { name: "targetSuccess", type: "bool" },
      { name: "targetResult", type: "bytes" },
    ],
    name: "ExecutionResult",
    type: "error",
  },
  {
    inputs: [
      { name: "opIndex", type: "uint256" },
      { name: "reason", type: "string" },
    ],
    name: "FailedOp",
    type: "error",
  },
  {
    inputs: [{ name: "sender", type: "address" }],
    name: "SenderAddressResult",
    type: "error",
  },
  {
    inputs: [{ name: "aggregator", type: "address" }],
    name: "SignatureValidationFailed",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          { name: "preOpGas", type: "uint256" },
          { name: "prefund", type: "uint256" },
          { name: "sigFailed", type: "bool" },
          { name: "validAfter", type: "uint48" },
          { name: "validUntil", type: "uint48" },
          { name: "paymasterContext", type: "bytes" },
        ],
        name: "returnInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" },
        ],
        name: "senderInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" },
        ],
        name: "factoryInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" },
        ],
        name: "paymasterInfo",
        type: "tuple",
      },
    ],
    name: "ValidationResult",
    type: "error",
  },
  {
    inputs: [
      {
        components: [
          { name: "preOpGas", type: "uint256" },
          { name: "prefund", type: "uint256" },
          { name: "sigFailed", type: "bool" },
          { name: "validAfter", type: "uint48" },
          { name: "validUntil", type: "uint48" },
          { name: "paymasterContext", type: "bytes" },
        ],
        name: "returnInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" },
        ],
        name: "senderInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" },
        ],
        name: "factoryInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "stake", type: "uint256" },
          { name: "unstakeDelaySec", type: "uint256" },
        ],
        name: "paymasterInfo",
        type: "tuple",
      },
      {
        components: [
          { name: "aggregator", type: "address" },
          {
            components: [
              { name: "stake", type: "uint256" },
              { name: "unstakeDelaySec", type: "uint256" },
            ],
            name: "stakeInfo",
            type: "tuple",
          },
        ],
        name: "aggregatorInfo",
        type: "tuple",
      },
    ],
    name: "ValidationResultWithAggregation",
    type: "error",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "userOpHash", type: "bytes32" },
      { indexed: !0, name: "sender", type: "address" },
      { indexed: !1, name: "factory", type: "address" },
      { indexed: !1, name: "paymaster", type: "address" },
    ],
    name: "AccountDeployed",
    type: "event",
  },
  { anonymous: !1, inputs: [], name: "BeforeExecution", type: "event" },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "account", type: "address" },
      { indexed: !1, name: "totalDeposit", type: "uint256" },
    ],
    name: "Deposited",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [{ indexed: !0, name: "aggregator", type: "address" }],
    name: "SignatureAggregatorChanged",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "account", type: "address" },
      { indexed: !1, name: "totalStaked", type: "uint256" },
      { indexed: !1, name: "unstakeDelaySec", type: "uint256" },
    ],
    name: "StakeLocked",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "account", type: "address" },
      { indexed: !1, name: "withdrawTime", type: "uint256" },
    ],
    name: "StakeUnlocked",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "account", type: "address" },
      { indexed: !1, name: "withdrawAddress", type: "address" },
      { indexed: !1, name: "amount", type: "uint256" },
    ],
    name: "StakeWithdrawn",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "userOpHash", type: "bytes32" },
      { indexed: !0, name: "sender", type: "address" },
      { indexed: !0, name: "paymaster", type: "address" },
      { indexed: !1, name: "nonce", type: "uint256" },
      { indexed: !1, name: "success", type: "bool" },
      { indexed: !1, name: "actualGasCost", type: "uint256" },
      { indexed: !1, name: "actualGasUsed", type: "uint256" },
    ],
    name: "UserOperationEvent",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "userOpHash", type: "bytes32" },
      { indexed: !0, name: "sender", type: "address" },
      { indexed: !1, name: "nonce", type: "uint256" },
      { indexed: !1, name: "revertReason", type: "bytes" },
    ],
    name: "UserOperationRevertReason",
    type: "event",
  },
  {
    anonymous: !1,
    inputs: [
      { indexed: !0, name: "account", type: "address" },
      { indexed: !1, name: "withdrawAddress", type: "address" },
      { indexed: !1, name: "amount", type: "uint256" },
    ],
    name: "Withdrawn",
    type: "event",
  },
  {
    inputs: [],
    name: "SIG_VALIDATION_FAILED",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "initCode", type: "bytes" },
      { name: "sender", type: "address" },
      { name: "paymasterAndData", type: "bytes" },
    ],
    name: "_validateSenderAndPaymaster",
    outputs: [],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "unstakeDelaySec", type: "uint32" }],
    name: "addStake",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "depositTo",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ name: "", type: "address" }],
    name: "deposits",
    outputs: [
      { name: "deposit", type: "uint112" },
      { name: "staked", type: "bool" },
      { name: "stake", type: "uint112" },
      { name: "unstakeDelaySec", type: "uint32" },
      { name: "withdrawTime", type: "uint48" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "account", type: "address" }],
    name: "getDepositInfo",
    outputs: [
      {
        components: [
          { name: "deposit", type: "uint112" },
          { name: "staked", type: "bool" },
          { name: "stake", type: "uint112" },
          { name: "unstakeDelaySec", type: "uint32" },
          { name: "withdrawTime", type: "uint48" },
        ],
        name: "info",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { name: "sender", type: "address" },
      { name: "key", type: "uint192" },
    ],
    name: "getNonce",
    outputs: [{ name: "nonce", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ name: "initCode", type: "bytes" }],
    name: "getSenderAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          { name: "verificationGasLimit", type: "uint256" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "maxFeePerGas", type: "uint256" },
          { name: "maxPriorityFeePerGas", type: "uint256" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
        name: "userOp",
        type: "tuple",
      },
    ],
    name: "getUserOpHash",
    outputs: [{ name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { name: "sender", type: "address" },
              { name: "nonce", type: "uint256" },
              { name: "initCode", type: "bytes" },
              { name: "callData", type: "bytes" },
              { name: "callGasLimit", type: "uint256" },
              { name: "verificationGasLimit", type: "uint256" },
              { name: "preVerificationGas", type: "uint256" },
              { name: "maxFeePerGas", type: "uint256" },
              { name: "maxPriorityFeePerGas", type: "uint256" },
              { name: "paymasterAndData", type: "bytes" },
              { name: "signature", type: "bytes" },
            ],
            name: "userOps",
            type: "tuple[]",
          },
          { name: "aggregator", type: "address" },
          { name: "signature", type: "bytes" },
        ],
        name: "opsPerAggregator",
        type: "tuple[]",
      },
      { name: "beneficiary", type: "address" },
    ],
    name: "handleAggregatedOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          { name: "verificationGasLimit", type: "uint256" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "maxFeePerGas", type: "uint256" },
          { name: "maxPriorityFeePerGas", type: "uint256" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
        name: "ops",
        type: "tuple[]",
      },
      { name: "beneficiary", type: "address" },
    ],
    name: "handleOps",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "key", type: "uint192" }],
    name: "incrementNonce",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "callData", type: "bytes" },
      {
        components: [
          {
            components: [
              { name: "sender", type: "address" },
              { name: "nonce", type: "uint256" },
              { name: "callGasLimit", type: "uint256" },
              { name: "verificationGasLimit", type: "uint256" },
              { name: "preVerificationGas", type: "uint256" },
              { name: "paymaster", type: "address" },
              { name: "maxFeePerGas", type: "uint256" },
              { name: "maxPriorityFeePerGas", type: "uint256" },
            ],
            name: "mUserOp",
            type: "tuple",
          },
          { name: "userOpHash", type: "bytes32" },
          { name: "prefund", type: "uint256" },
          { name: "contextOffset", type: "uint256" },
          { name: "preOpGas", type: "uint256" },
        ],
        name: "opInfo",
        type: "tuple",
      },
      { name: "context", type: "bytes" },
    ],
    name: "innerHandleOp",
    outputs: [{ name: "actualGasCost", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "uint192" },
    ],
    name: "nonceSequenceNumber",
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          { name: "verificationGasLimit", type: "uint256" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "maxFeePerGas", type: "uint256" },
          { name: "maxPriorityFeePerGas", type: "uint256" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
        name: "op",
        type: "tuple",
      },
      { name: "target", type: "address" },
      { name: "targetCallData", type: "bytes" },
    ],
    name: "simulateHandleOp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { name: "sender", type: "address" },
          { name: "nonce", type: "uint256" },
          { name: "initCode", type: "bytes" },
          { name: "callData", type: "bytes" },
          { name: "callGasLimit", type: "uint256" },
          { name: "verificationGasLimit", type: "uint256" },
          { name: "preVerificationGas", type: "uint256" },
          { name: "maxFeePerGas", type: "uint256" },
          { name: "maxPriorityFeePerGas", type: "uint256" },
          { name: "paymasterAndData", type: "bytes" },
          { name: "signature", type: "bytes" },
        ],
        name: "userOp",
        type: "tuple",
      },
    ],
    name: "simulateValidation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unlockStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ name: "withdrawAddress", type: "address" }],
    name: "withdrawStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { name: "withdrawAddress", type: "address" },
      { name: "withdrawAmount", type: "uint256" },
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  { stateMutability: "payable", type: "receive" },
];
function Or(e) {
  const { authorization: t, factory: n, factoryData: r } = e;
  if (n === "0x7702" || n === "0x7702000000000000000000000000000000000000") {
    if (!t) return "0x7702000000000000000000000000000000000000";
    const a = t.address;
    return xe([a, r ?? "0x"]);
  }
  return n ? xe([n, r ?? "0x"]) : "0x";
}
function Pr(e) {
  const {
      callGasLimit: t,
      callData: n,
      maxPriorityFeePerGas: r,
      maxFeePerGas: a,
      paymaster: i,
      paymasterData: o,
      paymasterPostOpGasLimit: s,
      paymasterVerificationGasLimit: f,
      sender: u,
      signature: p = "0x",
      verificationGasLimit: l,
    } = e,
    d = xe([ie(V(l || 0n), { size: 16 }), ie(V(t || 0n), { size: 16 })]),
    c = Or(e),
    b = xe([ie(V(r || 0n), { size: 16 }), ie(V(a || 0n), { size: 16 })]),
    g = e.nonce ?? 0n,
    w = i
      ? xe([
          i,
          ie(V(f || 0n), { size: 16 }),
          ie(V(s || 0n), { size: 16 }),
          o || "0x",
        ])
      : "0x",
    v = e.preVerificationGas ?? 0n;
  return {
    accountGasLimits: d,
    callData: n,
    initCode: c,
    gasFees: b,
    nonce: g,
    paymasterAndData: w,
    preVerificationGas: v,
    sender: u,
    signature: p,
  };
}
const ai = {
  PackedUserOperation: [
    { type: "address", name: "sender" },
    { type: "uint256", name: "nonce" },
    { type: "bytes", name: "initCode" },
    { type: "bytes", name: "callData" },
    { type: "bytes32", name: "accountGasLimits" },
    { type: "uint256", name: "preVerificationGas" },
    { type: "bytes32", name: "gasFees" },
    { type: "bytes", name: "paymasterAndData" },
  ],
};
function ii(e) {
  const { chainId: t, entryPointAddress: n, userOperation: r } = e,
    a = Pr(r);
  return {
    types: ai,
    primaryType: "PackedUserOperation",
    domain: { name: "ERC4337", version: "1", chainId: t, verifyingContract: n },
    message: a,
  };
}
function Eo(e) {
  const { chainId: t, entryPointAddress: n, entryPointVersion: r } = e,
    a = e.userOperation,
    {
      authorization: i,
      callData: o = "0x",
      callGasLimit: s,
      maxFeePerGas: f,
      maxPriorityFeePerGas: u,
      nonce: p,
      paymasterAndData: l = "0x",
      preVerificationGas: d,
      sender: c,
      verificationGasLimit: b,
    } = a;
  if (r === "0.8")
    return Kr(ii({ chainId: t, entryPointAddress: n, userOperation: a }));
  const g = (() => {
    if (r === "0.6") {
      const w = a.initCode?.slice(0, 42),
        v = a.initCode?.slice(42),
        O = Or({ authorization: i, factory: w, factoryData: v });
      return st(
        [
          { type: "address" },
          { type: "uint256" },
          { type: "bytes32" },
          { type: "bytes32" },
          { type: "uint256" },
          { type: "uint256" },
          { type: "uint256" },
          { type: "uint256" },
          { type: "uint256" },
          { type: "bytes32" },
        ],
        [c, p, ce(O), ce(o), s, b, d, f, u, ce(l)]
      );
    }
    if (r === "0.7") {
      const w = Pr(a);
      return st(
        [
          { type: "address" },
          { type: "uint256" },
          { type: "bytes32" },
          { type: "bytes32" },
          { type: "bytes32" },
          { type: "uint256" },
          { type: "bytes32" },
          { type: "bytes32" },
        ],
        [
          w.sender,
          w.nonce,
          ce(w.initCode),
          ce(w.callData),
          w.accountGasLimits,
          w.preVerificationGas,
          w.gasFees,
          ce(w.paymasterAndData),
        ]
      );
    }
    throw new Error(`entryPointVersion "${r}" not supported.`);
  })();
  return ce(
    st(
      [{ type: "bytes32" }, { type: "address" }, { type: "uint256" }],
      [ce(g), n, BigInt(t)]
    )
  );
}
async function Oo(e) {
  const {
    extend: t,
    nonceKeyManager: n = Xr({
      source: {
        get() {
          return Date.now();
        },
        set() {},
      },
    }),
    ...r
  } = e;
  let a = !1;
  const i = await e.getAddress();
  return {
    ...t,
    ...r,
    address: i,
    async getFactoryArgs() {
      return "isDeployed" in this && (await this.isDeployed())
        ? { factory: void 0, factoryData: void 0 }
        : e.getFactoryArgs();
    },
    async getNonce(o) {
      const s =
        o?.key ??
        BigInt(
          await n.consume({
            address: i,
            chainId: e.client.chain.id,
            client: e.client,
          })
        );
      return e.getNonce
        ? await e.getNonce({ ...o, key: s })
        : await Jr(e.client, {
            abi: Qr([
              "function getNonce(address, uint192) pure returns (uint256)",
            ]),
            address: e.entryPoint.address,
            functionName: "getNonce",
            args: [i, s],
          });
    },
    async isDeployed() {
      return a
        ? !0
        : ((a = !!(await se(e.client, Wr, "getCode")({ address: i }))), a);
    },
    ...(e.sign
      ? {
          async sign(o) {
            const [{ factory: s, factoryData: f }, u] = await Promise.all([
              this.getFactoryArgs(),
              e.sign(o),
            ]);
            return s && f ? ft({ address: s, data: f, signature: u }) : u;
          },
        }
      : {}),
    async signMessage(o) {
      const [{ factory: s, factoryData: f }, u] = await Promise.all([
        this.getFactoryArgs(),
        e.signMessage(o),
      ]);
      return s && f && s !== "0x7702"
        ? ft({ address: s, data: f, signature: u })
        : u;
    },
    async signTypedData(o) {
      const [{ factory: s, factoryData: f }, u] = await Promise.all([
        this.getFactoryArgs(),
        e.signTypedData(o),
      ]);
      return s && f && s !== "0x7702"
        ? ft({ address: s, data: f, signature: u })
        : u;
    },
    type: "smart",
  };
}
class Pt extends A {
  constructor({ cause: t }) {
    super("Smart Account is not deployed.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- No `factory`/`factoryData` or `initCode` properties are provided for Smart Account deployment.",
        "- An incorrect `sender` address is provided.",
      ],
      name: "AccountNotDeployedError",
    });
  }
}
Object.defineProperty(Pt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa20/,
});
class Se extends A {
  constructor({ cause: t, data: n, message: r } = {}) {
    const a = r
      ?.replace("execution reverted: ", "")
      ?.replace("execution reverted", "");
    super(
      `Execution reverted ${
        a ? `with reason: ${a}` : "for an unknown reason"
      }.`,
      { cause: t, name: "ExecutionRevertedError" }
    ),
      Object.defineProperty(this, "data", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0,
      }),
      (this.data = n);
  }
}
Object.defineProperty(Se, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32521,
});
Object.defineProperty(Se, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /execution reverted/,
});
class St extends A {
  constructor({ cause: t }) {
    super("Failed to send funds to beneficiary.", {
      cause: t,
      name: "FailedToSendToBeneficiaryError",
    });
  }
}
Object.defineProperty(St, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa91/,
});
class Bt extends A {
  constructor({ cause: t }) {
    super("Gas value overflowed.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- one of the gas values exceeded 2**120 (uint120)",
      ].filter(Boolean),
      name: "GasValuesOverflowError",
    });
  }
}
Object.defineProperty(Bt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa94/,
});
class It extends A {
  constructor({ cause: t }) {
    super(
      "The `handleOps` function was called by the Bundler with a gas limit too low.",
      { cause: t, name: "HandleOpsOutOfGasError" }
    );
  }
}
Object.defineProperty(It, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa95/,
});
class Gt extends A {
  constructor({ cause: t, factory: n, factoryData: r, initCode: a }) {
    super("Failed to simulate deployment for Smart Account.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- Invalid `factory`/`factoryData` or `initCode` properties are present",
        "- Smart Account deployment execution ran out of gas (low `verificationGasLimit` value)",
        `- Smart Account deployment execution reverted with an error
`,
        n && `factory: ${n}`,
        r && `factoryData: ${r}`,
        a && `initCode: ${a}`,
      ].filter(Boolean),
      name: "InitCodeFailedError",
    });
  }
}
Object.defineProperty(Gt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa13/,
});
class At extends A {
  constructor({ cause: t, factory: n, factoryData: r, initCode: a }) {
    super(
      "Smart Account initialization implementation did not create an account.",
      {
        cause: t,
        metaMessages: [
          "This could arise when:",
          "- `factory`/`factoryData` or `initCode` properties are invalid",
          `- Smart Account initialization implementation is incorrect
`,
          n && `factory: ${n}`,
          r && `factoryData: ${r}`,
          a && `initCode: ${a}`,
        ].filter(Boolean),
        name: "InitCodeMustCreateSenderError",
      }
    );
  }
}
Object.defineProperty(At, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa15/,
});
class Ut extends A {
  constructor({
    cause: t,
    factory: n,
    factoryData: r,
    initCode: a,
    sender: i,
  }) {
    super(
      "Smart Account initialization implementation does not return the expected sender.",
      {
        cause: t,
        metaMessages: [
          "This could arise when:",
          `Smart Account initialization implementation does not return a sender address
`,
          n && `factory: ${n}`,
          r && `factoryData: ${r}`,
          a && `initCode: ${a}`,
          i && `sender: ${i}`,
        ].filter(Boolean),
        name: "InitCodeMustReturnSenderError",
      }
    );
  }
}
Object.defineProperty(Ut, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa14/,
});
class $t extends A {
  constructor({ cause: t }) {
    super(
      "Smart Account does not have sufficient funds to execute the User Operation.",
      {
        cause: t,
        metaMessages: [
          "This could arise when:",
          "- the Smart Account does not have sufficient funds to cover the required prefund, or",
          "- a Paymaster was not provided",
        ].filter(Boolean),
        name: "InsufficientPrefundError",
      }
    );
  }
}
Object.defineProperty($t, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa21/,
});
class Dt extends A {
  constructor({ cause: t }) {
    super("Bundler attempted to call an invalid function on the EntryPoint.", {
      cause: t,
      name: "InternalCallOnlyError",
    });
  }
}
Object.defineProperty(Dt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa92/,
});
class Ct extends A {
  constructor({ cause: t }) {
    super(
      "Bundler used an invalid aggregator for handling aggregated User Operations.",
      { cause: t, name: "InvalidAggregatorError" }
    );
  }
}
Object.defineProperty(Ct, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa96/,
});
class Lt extends A {
  constructor({ cause: t, nonce: n }) {
    super("Invalid Smart Account nonce used for User Operation.", {
      cause: t,
      metaMessages: [n && `nonce: ${n}`].filter(Boolean),
      name: "InvalidAccountNonceError",
    });
  }
}
Object.defineProperty(Lt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa25/,
});
class kt extends A {
  constructor({ cause: t }) {
    super("Bundler has not set a beneficiary address.", {
      cause: t,
      name: "InvalidBeneficiaryError",
    });
  }
}
Object.defineProperty(kt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa90/,
});
class Ze extends A {
  constructor({ cause: t }) {
    super("Invalid fields set on User Operation.", {
      cause: t,
      name: "InvalidFieldsError",
    });
  }
}
Object.defineProperty(Ze, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32602,
});
class Rt extends A {
  constructor({ cause: t, paymasterAndData: n }) {
    super("Paymaster properties provided are invalid.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the `paymasterAndData` property is of an incorrect length\n",
        n && `paymasterAndData: ${n}`,
      ].filter(Boolean),
      name: "InvalidPaymasterAndDataError",
    });
  }
}
Object.defineProperty(Rt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa93/,
});
class be extends A {
  constructor({ cause: t }) {
    super("Paymaster deposit for the User Operation is too low.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the Paymaster has deposited less than the expected amount via the `deposit` function",
      ].filter(Boolean),
      name: "PaymasterDepositTooLowError",
    });
  }
}
Object.defineProperty(be, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32508,
});
Object.defineProperty(be, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa31/,
});
class Nt extends A {
  constructor({ cause: t }) {
    super("The `validatePaymasterUserOp` function on the Paymaster reverted.", {
      cause: t,
      name: "PaymasterFunctionRevertedError",
    });
  }
}
Object.defineProperty(Nt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa33/,
});
class jt extends A {
  constructor({ cause: t }) {
    super("The Paymaster contract has not been deployed.", {
      cause: t,
      name: "PaymasterNotDeployedError",
    });
  }
}
Object.defineProperty(jt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa30/,
});
class qe extends A {
  constructor({ cause: t }) {
    super(
      "UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.",
      { cause: t, name: "PaymasterRateLimitError" }
    );
  }
}
Object.defineProperty(qe, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32504,
});
class Ye extends A {
  constructor({ cause: t }) {
    super(
      "UserOperation rejected because paymaster (or signature aggregator) is throttled/banned.",
      { cause: t, name: "PaymasterStakeTooLowError" }
    );
  }
}
Object.defineProperty(Ye, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32505,
});
class Ft extends A {
  constructor({ cause: t }) {
    super("Paymaster `postOp` function reverted.", {
      cause: t,
      name: "PaymasterPostOpFunctionRevertedError",
    });
  }
}
Object.defineProperty(Ft, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa50/,
});
class Tt extends A {
  constructor({ cause: t, factory: n, factoryData: r, initCode: a }) {
    super("Smart Account has already been deployed.", {
      cause: t,
      metaMessages: [
        "Remove the following properties and try again:",
        n && "`factory`",
        r && "`factoryData`",
        a && "`initCode`",
      ].filter(Boolean),
      name: "SenderAlreadyConstructedError",
    });
  }
}
Object.defineProperty(Tt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa10/,
});
class Ke extends A {
  constructor({ cause: t }) {
    super(
      "UserOperation rejected because account signature check failed (or paymaster signature, if the paymaster uses its data as signature).",
      { cause: t, name: "SignatureCheckFailedError" }
    );
  }
}
Object.defineProperty(Ke, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32507,
});
class Vt extends A {
  constructor({ cause: t }) {
    super("The `validateUserOp` function on the Smart Account reverted.", {
      cause: t,
      name: "SmartAccountFunctionRevertedError",
    });
  }
}
Object.defineProperty(Vt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa23/,
});
class Xe extends A {
  constructor({ cause: t }) {
    super(
      "UserOperation rejected because account specified unsupported signature aggregator.",
      { cause: t, name: "UnsupportedSignatureAggregatorError" }
    );
  }
}
Object.defineProperty(Xe, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32506,
});
class zt extends A {
  constructor({ cause: t }) {
    super("User Operation expired.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the `validAfter` or `validUntil` values returned from `validateUserOp` on the Smart Account are not satisfied",
      ].filter(Boolean),
      name: "UserOperationExpiredError",
    });
  }
}
Object.defineProperty(zt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa22/,
});
class Mt extends A {
  constructor({ cause: t }) {
    super("Paymaster for User Operation expired.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the `validAfter` or `validUntil` values returned from `validatePaymasterUserOp` on the Paymaster are not satisfied",
      ].filter(Boolean),
      name: "UserOperationPaymasterExpiredError",
    });
  }
}
Object.defineProperty(Mt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa32/,
});
class Ht extends A {
  constructor({ cause: t }) {
    super("Signature provided for the User Operation is invalid.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Smart Account",
      ].filter(Boolean),
      name: "UserOperationSignatureError",
    });
  }
}
Object.defineProperty(Ht, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa24/,
});
class Zt extends A {
  constructor({ cause: t }) {
    super("Signature provided for the User Operation is invalid.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the `signature` for the User Operation is incorrectly computed, and unable to be verified by the Paymaster",
      ].filter(Boolean),
      name: "UserOperationPaymasterSignatureError",
    });
  }
}
Object.defineProperty(Zt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa34/,
});
class We extends A {
  constructor({ cause: t }) {
    super(
      "User Operation rejected by EntryPoint's `simulateValidation` during account creation or validation.",
      { cause: t, name: "UserOperationRejectedByEntryPointError" }
    );
  }
}
Object.defineProperty(We, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32500,
});
class Je extends A {
  constructor({ cause: t }) {
    super("User Operation rejected by Paymaster's `validatePaymasterUserOp`.", {
      cause: t,
      name: "UserOperationRejectedByPaymasterError",
    });
  }
}
Object.defineProperty(Je, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32501,
});
class Qe extends A {
  constructor({ cause: t }) {
    super("User Operation rejected with op code validation error.", {
      cause: t,
      name: "UserOperationRejectedByOpCodeError",
    });
  }
}
Object.defineProperty(Qe, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32502,
});
class et extends A {
  constructor({ cause: t }) {
    super(
      "UserOperation out of time-range: either wallet or paymaster returned a time-range, and it is already expired (or will expire soon).",
      { cause: t, name: "UserOperationOutOfTimeRangeError" }
    );
  }
}
Object.defineProperty(et, "code", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: -32503,
});
class oi extends A {
  constructor({ cause: t }) {
    super(
      `An error occurred while executing user operation: ${t?.shortMessage}`,
      { cause: t, name: "UnknownBundlerError" }
    );
  }
}
class qt extends A {
  constructor({ cause: t }) {
    super("User Operation verification gas limit exceeded.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the gas used for verification exceeded the `verificationGasLimit`",
      ].filter(Boolean),
      name: "VerificationGasLimitExceededError",
    });
  }
}
Object.defineProperty(qt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa40/,
});
class Yt extends A {
  constructor({ cause: t }) {
    super("User Operation verification gas limit is too low.", {
      cause: t,
      metaMessages: [
        "This could arise when:",
        "- the `verificationGasLimit` is too low to verify the User Operation",
      ].filter(Boolean),
      name: "VerificationGasLimitTooLowError",
    });
  }
}
Object.defineProperty(Yt, "message", {
  enumerable: !0,
  configurable: !0,
  writable: !0,
  value: /aa41/,
});
class si extends A {
  constructor(
    t,
    {
      callData: n,
      callGasLimit: r,
      docsPath: a,
      factory: i,
      factoryData: o,
      initCode: s,
      maxFeePerGas: f,
      maxPriorityFeePerGas: u,
      nonce: p,
      paymaster: l,
      paymasterAndData: d,
      paymasterData: c,
      paymasterPostOpGasLimit: b,
      paymasterVerificationGasLimit: g,
      preVerificationGas: w,
      sender: v,
      signature: O,
      verificationGasLimit: G,
    }
  ) {
    const j = ea({
      callData: n,
      callGasLimit: r,
      factory: i,
      factoryData: o,
      initCode: s,
      maxFeePerGas: typeof f < "u" && `${yn(f)} gwei`,
      maxPriorityFeePerGas: typeof u < "u" && `${yn(u)} gwei`,
      nonce: p,
      paymaster: l,
      paymasterAndData: d,
      paymasterData: c,
      paymasterPostOpGasLimit: b,
      paymasterVerificationGasLimit: g,
      preVerificationGas: w,
      sender: v,
      signature: O,
      verificationGasLimit: G,
    });
    super(t.shortMessage, {
      cause: t,
      docsPath: a,
      metaMessages: [
        ...(t.metaMessages ? [...t.metaMessages, " "] : []),
        "Request Arguments:",
        j,
      ].filter(Boolean),
      name: "UserOperationExecutionError",
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
class fi extends A {
  constructor({ hash: t }) {
    super(
      `User Operation receipt with hash "${t}" could not be found. The User Operation may not have been processed yet.`,
      { name: "UserOperationReceiptNotFoundError" }
    );
  }
}
class ci extends A {
  constructor({ hash: t }) {
    super(`User Operation with hash "${t}" could not be found.`, {
      name: "UserOperationNotFoundError",
    });
  }
}
class Ln extends A {
  constructor({ hash: t }) {
    super(
      `Timed out while waiting for User Operation with hash "${t}" to be confirmed.`,
      { name: "WaitForUserOperationReceiptTimeoutError" }
    );
  }
}
const ui = [Se, Ze, be, qe, Ye, Ke, Xe, et, We, Je, Qe];
function li(e, t) {
  const n = (e.details || "").toLowerCase();
  if (Pt.message.test(n)) return new Pt({ cause: e });
  if (St.message.test(n)) return new St({ cause: e });
  if (Bt.message.test(n)) return new Bt({ cause: e });
  if (It.message.test(n)) return new It({ cause: e });
  if (Gt.message.test(n))
    return new Gt({
      cause: e,
      factory: t.factory,
      factoryData: t.factoryData,
      initCode: t.initCode,
    });
  if (At.message.test(n))
    return new At({
      cause: e,
      factory: t.factory,
      factoryData: t.factoryData,
      initCode: t.initCode,
    });
  if (Ut.message.test(n))
    return new Ut({
      cause: e,
      factory: t.factory,
      factoryData: t.factoryData,
      initCode: t.initCode,
      sender: t.sender,
    });
  if ($t.message.test(n)) return new $t({ cause: e });
  if (Dt.message.test(n)) return new Dt({ cause: e });
  if (Lt.message.test(n)) return new Lt({ cause: e, nonce: t.nonce });
  if (Ct.message.test(n)) return new Ct({ cause: e });
  if (kt.message.test(n)) return new kt({ cause: e });
  if (Rt.message.test(n)) return new Rt({ cause: e });
  if (be.message.test(n)) return new be({ cause: e });
  if (Nt.message.test(n)) return new Nt({ cause: e });
  if (jt.message.test(n)) return new jt({ cause: e });
  if (Ft.message.test(n)) return new Ft({ cause: e });
  if (Vt.message.test(n)) return new Vt({ cause: e });
  if (Tt.message.test(n))
    return new Tt({
      cause: e,
      factory: t.factory,
      factoryData: t.factoryData,
      initCode: t.initCode,
    });
  if (zt.message.test(n)) return new zt({ cause: e });
  if (Mt.message.test(n)) return new Mt({ cause: e });
  if (Zt.message.test(n)) return new Zt({ cause: e });
  if (Ht.message.test(n)) return new Ht({ cause: e });
  if (qt.message.test(n)) return new qt({ cause: e });
  if (Yt.message.test(n)) return new Yt({ cause: e });
  const r = e.walk((a) => ui.some((i) => i.code === a.code));
  if (r) {
    if (r.code === Se.code)
      return new Se({ cause: e, data: r.data, message: r.details });
    if (r.code === Ze.code) return new Ze({ cause: e });
    if (r.code === be.code) return new be({ cause: e });
    if (r.code === qe.code) return new qe({ cause: e });
    if (r.code === Ye.code) return new Ye({ cause: e });
    if (r.code === Ke.code) return new Ke({ cause: e });
    if (r.code === Xe.code) return new Xe({ cause: e });
    if (r.code === et.code) return new et({ cause: e });
    if (r.code === We.code) return new We({ cause: e });
    if (r.code === Je.code) return new Je({ cause: e });
    if (r.code === Qe.code) return new Qe({ cause: e });
  }
  return new oi({ cause: e });
}
function Sr(e, { calls: t, docsPath: n, ...r }) {
  const a = (() => {
    const i = li(e, r);
    if (t && i instanceof Se) {
      const o = di(i),
        s = t?.filter((f) => f.abi);
      if (o && s.length > 0) return pi({ calls: s, revertData: o });
    }
    return i;
  })();
  return new si(a, { docsPath: n, ...r });
}
function di(e) {
  let t;
  return (
    e.walk((n) => {
      const r = n;
      if (
        typeof r.data == "string" ||
        typeof r.data?.revertData == "string" ||
        (!(r instanceof A) && typeof r.message == "string")
      ) {
        const a = (r.data?.revertData || r.data || r.message).match?.(
          /(0x[A-Za-z0-9]*)/
        );
        if (a) return (t = a[1]), !0;
      }
      return !1;
    }),
    t
  );
}
function pi(e) {
  const { calls: t, revertData: n } = e,
    {
      abi: r,
      functionName: a,
      args: i,
      to: o,
    } = (() => {
      const f = t?.filter((p) => !!p.abi);
      if (f.length === 1) return f[0];
      const u = f.filter((p) => {
        try {
          return !!ta({ abi: p.abi, data: n });
        } catch {
          return !1;
        }
      });
      return u.length === 1
        ? u[0]
        : {
            abi: [],
            functionName: f.reduce(
              (p, l) => `${p ? `${p} | ` : ""}${l.functionName}`,
              ""
            ),
            args: void 0,
            to: void 0,
          };
    })(),
    s =
      n === "0x"
        ? new na({ functionName: a })
        : new ra({ abi: r, data: n, functionName: a });
  return new aa(s, { abi: r, args: i, contractAddress: o, functionName: a });
}
function yi(e) {
  const t = {};
  return (
    e.callGasLimit && (t.callGasLimit = BigInt(e.callGasLimit)),
    e.preVerificationGas &&
      (t.preVerificationGas = BigInt(e.preVerificationGas)),
    e.verificationGasLimit &&
      (t.verificationGasLimit = BigInt(e.verificationGasLimit)),
    e.paymasterPostOpGasLimit &&
      (t.paymasterPostOpGasLimit = BigInt(e.paymasterPostOpGasLimit)),
    e.paymasterVerificationGasLimit &&
      (t.paymasterVerificationGasLimit = BigInt(
        e.paymasterVerificationGasLimit
      )),
    t
  );
}
function at(e) {
  const t = {};
  return (
    typeof e.callData < "u" && (t.callData = e.callData),
    typeof e.callGasLimit < "u" && (t.callGasLimit = V(e.callGasLimit)),
    typeof e.factory < "u" && (t.factory = e.factory),
    typeof e.factoryData < "u" && (t.factoryData = e.factoryData),
    typeof e.initCode < "u" && (t.initCode = e.initCode),
    typeof e.maxFeePerGas < "u" && (t.maxFeePerGas = V(e.maxFeePerGas)),
    typeof e.maxPriorityFeePerGas < "u" &&
      (t.maxPriorityFeePerGas = V(e.maxPriorityFeePerGas)),
    typeof e.nonce < "u" && (t.nonce = V(e.nonce)),
    typeof e.paymaster < "u" && (t.paymaster = e.paymaster),
    typeof e.paymasterAndData < "u" &&
      (t.paymasterAndData = e.paymasterAndData || "0x"),
    typeof e.paymasterData < "u" && (t.paymasterData = e.paymasterData),
    typeof e.paymasterPostOpGasLimit < "u" &&
      (t.paymasterPostOpGasLimit = V(e.paymasterPostOpGasLimit)),
    typeof e.paymasterVerificationGasLimit < "u" &&
      (t.paymasterVerificationGasLimit = V(e.paymasterVerificationGasLimit)),
    typeof e.preVerificationGas < "u" &&
      (t.preVerificationGas = V(e.preVerificationGas)),
    typeof e.sender < "u" && (t.sender = e.sender),
    typeof e.signature < "u" && (t.signature = e.signature),
    typeof e.verificationGasLimit < "u" &&
      (t.verificationGasLimit = V(e.verificationGasLimit)),
    typeof e.authorization < "u" && (t.eip7702Auth = mi(e.authorization)),
    t
  );
}
function mi(e) {
  return {
    address: e.address,
    chainId: V(e.chainId),
    nonce: V(e.nonce),
    r: e.r ? V(BigInt(e.r), { size: 32 }) : ie("0x", { size: 32 }),
    s: e.s ? V(BigInt(e.s), { size: 32 }) : ie("0x", { size: 32 }),
    yParity: e.yParity ? V(e.yParity, { size: 1 }) : ie("0x", { size: 32 }),
  };
}
async function gi(e, t) {
  const { chainId: n, entryPointAddress: r, context: a, ...i } = t,
    o = at(i),
    {
      paymasterPostOpGasLimit: s,
      paymasterVerificationGasLimit: f,
      ...u
    } = await e.request({
      method: "pm_getPaymasterData",
      params: [
        {
          ...o,
          callGasLimit: o.callGasLimit ?? "0x0",
          verificationGasLimit: o.verificationGasLimit ?? "0x0",
          preVerificationGas: o.preVerificationGas ?? "0x0",
        },
        r,
        V(n),
        a,
      ],
    });
  return {
    ...u,
    ...(s && { paymasterPostOpGasLimit: Ve(s) }),
    ...(f && { paymasterVerificationGasLimit: Ve(f) }),
  };
}
async function hi(e, t) {
  const { chainId: n, entryPointAddress: r, context: a, ...i } = t,
    o = at(i),
    {
      paymasterPostOpGasLimit: s,
      paymasterVerificationGasLimit: f,
      ...u
    } = await e.request({
      method: "pm_getPaymasterStubData",
      params: [
        {
          ...o,
          callGasLimit: o.callGasLimit ?? "0x0",
          verificationGasLimit: o.verificationGasLimit ?? "0x0",
          preVerificationGas: o.preVerificationGas ?? "0x0",
        },
        r,
        V(n),
        a,
      ],
    });
  return {
    ...u,
    ...(s && { paymasterPostOpGasLimit: Ve(s) }),
    ...(f && { paymasterVerificationGasLimit: Ve(f) }),
  };
}
const bi = [
  "factory",
  "fees",
  "gas",
  "paymaster",
  "nonce",
  "signature",
  "authorization",
];
async function cn(e, t) {
  const n = t,
    { account: r = e.account, parameters: a = bi, stateOverride: i } = n;
  if (!r) throw new Xt();
  const o = Wt(r),
    s = e,
    f = n.paymaster ?? s?.paymaster,
    u = typeof f == "string" ? f : void 0,
    { getPaymasterStubData: p, getPaymasterData: l } = (() => {
      if (f === !0)
        return {
          getPaymasterStubData: (I) => se(s, hi, "getPaymasterStubData")(I),
          getPaymasterData: (I) => se(s, gi, "getPaymasterData")(I),
        };
      if (typeof f == "object") {
        const { getPaymasterStubData: I, getPaymasterData: L } = f;
        return {
          getPaymasterStubData: L && I ? I : L,
          getPaymasterData: L && I ? L : void 0,
        };
      }
      return { getPaymasterStubData: void 0, getPaymasterData: void 0 };
    })(),
    d = n.paymasterContext ? n.paymasterContext : s?.paymasterContext;
  let c = { ...n, paymaster: u, sender: o.address };
  const [b, g, w, v, O] = await Promise.all([
    (async () =>
      n.calls
        ? o.encodeCalls(
            n.calls.map((I) => {
              const L = I;
              return L.abi ? { data: ia(L), to: L.to, value: L.value } : L;
            })
          )
        : n.callData)(),
    (async () => {
      if (!a.includes("factory")) return;
      if (n.initCode) return { initCode: n.initCode };
      if (n.factory && n.factoryData)
        return { factory: n.factory, factoryData: n.factoryData };
      const { factory: I, factoryData: L } = await o.getFactoryArgs();
      return o.entryPoint.version === "0.6"
        ? { initCode: I && L ? xe([I, L]) : void 0 }
        : { factory: I, factoryData: L };
    })(),
    (async () => {
      if (a.includes("fees")) {
        if (
          typeof n.maxFeePerGas == "bigint" &&
          typeof n.maxPriorityFeePerGas == "bigint"
        )
          return c;
        if (s?.userOperation?.estimateFeesPerGas) {
          const I = await s.userOperation.estimateFeesPerGas({
            account: o,
            bundlerClient: s,
            userOperation: c,
          });
          return { ...c, ...I };
        }
        try {
          const I = s.client ?? e,
            L = await se(
              I,
              oa,
              "estimateFeesPerGas"
            )({ chain: I.chain, type: "eip1559" });
          return {
            maxFeePerGas:
              typeof n.maxFeePerGas == "bigint"
                ? n.maxFeePerGas
                : BigInt(2n * L.maxFeePerGas),
            maxPriorityFeePerGas:
              typeof n.maxPriorityFeePerGas == "bigint"
                ? n.maxPriorityFeePerGas
                : BigInt(2n * L.maxPriorityFeePerGas),
          };
        } catch {
          return;
        }
      }
    })(),
    (async () => {
      if (a.includes("nonce"))
        return typeof n.nonce == "bigint" ? n.nonce : o.getNonce();
    })(),
    (async () => {
      if (a.includes("authorization")) {
        if (typeof n.authorization == "object") return n.authorization;
        if (o.authorization && !(await o.isDeployed()))
          return {
            ...(await sa(o.client, o.authorization)),
            r: "0xfffffffffffffffffffffffffffffff000000000000000000000000000000000",
            s: "0x7aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            yParity: 1,
          };
      }
    })(),
  ]);
  typeof b < "u" && (c.callData = b),
    typeof g < "u" && (c = { ...c, ...g }),
    typeof w < "u" && (c = { ...c, ...w }),
    typeof v < "u" && (c.nonce = v),
    typeof O < "u" && (c.authorization = O),
    a.includes("signature") &&
      (typeof n.signature < "u"
        ? (c.signature = n.signature)
        : (c.signature = await o.getStubSignature(c))),
    o.entryPoint.version === "0.6" && !c.initCode && (c.initCode = "0x");
  let G;
  async function j() {
    return (
      G || (e.chain ? e.chain.id : ((G = await se(e, Hn, "getChainId")({})), G))
    );
  }
  let q = !1;
  if (a.includes("paymaster") && p && !u && !n.paymasterAndData) {
    const {
      isFinal: I = !1,
      sponsor: L,
      ...Q
    } = await p({
      chainId: await j(),
      entryPointAddress: o.entryPoint.address,
      context: d,
      ...c,
    });
    (q = I), (c = { ...c, ...Q });
  }
  if (
    (o.entryPoint.version === "0.6" &&
      !c.paymasterAndData &&
      (c.paymasterAndData = "0x"),
    a.includes("gas"))
  ) {
    if (o.userOperation?.estimateGas) {
      const I = await o.userOperation.estimateGas(c);
      c = { ...c, ...I };
    }
    if (
      typeof c.callGasLimit > "u" ||
      typeof c.preVerificationGas > "u" ||
      typeof c.verificationGasLimit > "u" ||
      (c.paymaster && typeof c.paymasterPostOpGasLimit > "u") ||
      (c.paymaster && typeof c.paymasterVerificationGasLimit > "u")
    ) {
      const I = await se(
        s,
        Br,
        "estimateUserOperationGas"
      )({
        account: o,
        callGasLimit: 0n,
        preVerificationGas: 0n,
        verificationGasLimit: 0n,
        stateOverride: i,
        ...(c.paymaster
          ? { paymasterPostOpGasLimit: 0n, paymasterVerificationGasLimit: 0n }
          : {}),
        ...c,
      });
      c = {
        ...c,
        callGasLimit: c.callGasLimit ?? I.callGasLimit,
        preVerificationGas: c.preVerificationGas ?? I.preVerificationGas,
        verificationGasLimit: c.verificationGasLimit ?? I.verificationGasLimit,
        paymasterPostOpGasLimit:
          c.paymasterPostOpGasLimit ?? I.paymasterPostOpGasLimit,
        paymasterVerificationGasLimit:
          c.paymasterVerificationGasLimit ?? I.paymasterVerificationGasLimit,
      };
    }
  }
  if (a.includes("paymaster") && l && !u && !n.paymasterAndData && !q) {
    const I = await l({
      chainId: await j(),
      entryPointAddress: o.entryPoint.address,
      context: d,
      ...c,
    });
    c = { ...c, ...I };
  }
  return (
    delete c.calls,
    delete c.parameters,
    delete c.paymasterContext,
    typeof c.paymaster != "string" && delete c.paymaster,
    c
  );
}
async function Br(e, t) {
  const { account: n = e.account, entryPointAddress: r, stateOverride: a } = t;
  if (!n && !t.sender) throw new Xt();
  const i = n ? Wt(n) : void 0,
    o = fa(a),
    s = i
      ? await se(
          e,
          cn,
          "prepareUserOperation"
        )({
          ...t,
          parameters: [
            "authorization",
            "factory",
            "nonce",
            "paymaster",
            "signature",
          ],
        })
      : t;
  try {
    const f = [at(s), r ?? i?.entryPoint?.address],
      u = await e.request({
        method: "eth_estimateUserOperationGas",
        params: o ? [...f, o] : [...f],
      });
    return yi(u);
  } catch (f) {
    const u = t.calls;
    throw Sr(f, { ...s, ...(u ? { calls: u } : {}) });
  }
}
function _i(e) {
  return e.request({ method: "eth_supportedEntryPoints" });
}
function wi(e) {
  const t = { ...e };
  return (
    e.callGasLimit && (t.callGasLimit = BigInt(e.callGasLimit)),
    e.maxFeePerGas && (t.maxFeePerGas = BigInt(e.maxFeePerGas)),
    e.maxPriorityFeePerGas &&
      (t.maxPriorityFeePerGas = BigInt(e.maxPriorityFeePerGas)),
    e.nonce && (t.nonce = BigInt(e.nonce)),
    e.paymasterPostOpGasLimit &&
      (t.paymasterPostOpGasLimit = BigInt(e.paymasterPostOpGasLimit)),
    e.paymasterVerificationGasLimit &&
      (t.paymasterVerificationGasLimit = BigInt(
        e.paymasterVerificationGasLimit
      )),
    e.preVerificationGas &&
      (t.preVerificationGas = BigInt(e.preVerificationGas)),
    e.verificationGasLimit &&
      (t.verificationGasLimit = BigInt(e.verificationGasLimit)),
    t
  );
}
async function vi(e, { hash: t }) {
  const n = await e.request(
    { method: "eth_getUserOperationByHash", params: [t] },
    { dedupe: !0 }
  );
  if (!n) throw new ci({ hash: t });
  const {
    blockHash: r,
    blockNumber: a,
    entryPoint: i,
    transactionHash: o,
    userOperation: s,
  } = n;
  return {
    blockHash: r,
    blockNumber: BigInt(a),
    entryPoint: i,
    transactionHash: o,
    userOperation: wi(s),
  };
}
function xi(e) {
  const t = { ...e };
  return (
    e.actualGasCost && (t.actualGasCost = BigInt(e.actualGasCost)),
    e.actualGasUsed && (t.actualGasUsed = BigInt(e.actualGasUsed)),
    e.logs && (t.logs = e.logs.map((n) => ca(n))),
    e.receipt && (t.receipt = ua(t.receipt)),
    t
  );
}
async function Ir(e, { hash: t }) {
  const n = await e.request(
    { method: "eth_getUserOperationReceipt", params: [t] },
    { dedupe: !0 }
  );
  if (!n) throw new fi({ hash: t });
  return xi(n);
}
async function Ei(e, t) {
  const { account: n = e.account, entryPointAddress: r } = t;
  if (!n && !t.sender) throw new Xt();
  const a = n ? Wt(n) : void 0,
    i = a ? await se(e, cn, "prepareUserOperation")(t) : t,
    o = t.signature || (await a?.signUserOperation?.(i)),
    s = at({ ...i, signature: o });
  try {
    return await e.request(
      {
        method: "eth_sendUserOperation",
        params: [s, r ?? a?.entryPoint?.address],
      },
      { retryCount: 0 }
    );
  } catch (f) {
    const u = t.calls;
    throw Sr(f, { ...i, ...(u ? { calls: u } : {}), signature: o });
  }
}
function Oi(e, t) {
  const {
    hash: n,
    pollingInterval: r = e.pollingInterval,
    retryCount: a,
    timeout: i = 12e4,
  } = t;
  let o = 0;
  const s = la(["waitForUserOperationReceipt", e.uid, n]);
  return new Promise((f, u) => {
    const p = da(s, { resolve: f, reject: u }, (l) => {
      const d = (b) => {
          c(), b(), p();
        },
        c = pa(
          async () => {
            a && o >= a && d(() => l.reject(new Ln({ hash: n })));
            try {
              const b = await se(e, Ir, "getUserOperationReceipt")({ hash: n });
              d(() => l.resolve(b));
            } catch (b) {
              const g = b;
              g.name !== "UserOperationReceiptNotFoundError" &&
                d(() => l.reject(g));
            }
            o++;
          },
          { emitOnBegin: !0, interval: r }
        );
      return (
        i && setTimeout(() => d(() => l.reject(new Ln({ hash: n }))), i), c
      );
    });
  });
}
function Pi(e) {
  return {
    estimateUserOperationGas: (t) => Br(e, t),
    getChainId: () => Hn(e),
    getSupportedEntryPoints: () => _i(e),
    getUserOperation: (t) => vi(e, t),
    getUserOperationReceipt: (t) => Ir(e, t),
    prepareUserOperation: (t) => cn(e, t),
    sendUserOperation: (t) => Ei(e, t),
    waitForUserOperationReceipt: (t) => Oi(e, t),
  };
}
function Po(e) {
  const {
    client: t,
    key: n = "bundler",
    name: r = "Bundler Client",
    paymaster: a,
    paymasterContext: i,
    transport: o,
    userOperation: s,
  } = e;
  return Object.assign(
    ya({
      ...e,
      chain: e.chain ?? t?.chain,
      key: n,
      name: r,
      transport: o,
      type: "bundlerClient",
    }),
    { client: t, paymaster: a, paymasterContext: i, userOperation: s }
  ).extend(Pi);
}
const So = "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  Si = "0.1.1";
function Bi() {
  return Si;
}
class N extends Error {
  constructor(t, n = {}) {
    const r = (() => {
        if (n.cause instanceof N) {
          if (n.cause.details) return n.cause.details;
          if (n.cause.shortMessage) return n.cause.shortMessage;
        }
        return n.cause?.message ? n.cause.message : n.details;
      })(),
      a = (n.cause instanceof N && n.cause.docsPath) || n.docsPath,
      o = `https://oxlib.sh${a ?? ""}`,
      s = [
        t || "An error occurred.",
        ...(n.metaMessages ? ["", ...n.metaMessages] : []),
        ...(r || a
          ? ["", r ? `Details: ${r}` : void 0, a ? `See: ${o}` : void 0]
          : []),
      ].filter((f) => typeof f == "string").join(`
`);
    super(s, n.cause ? { cause: n.cause } : void 0),
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
        value: `ox@${Bi()}`,
      }),
      (this.cause = n.cause),
      (this.details = r),
      (this.docs = o),
      (this.docsPath = a),
      (this.shortMessage = t);
  }
  walk(t) {
    return Gr(this, t);
  }
}
function Gr(e, t) {
  return t?.(e)
    ? e
    : e && typeof e == "object" && "cause" in e && e.cause
    ? Gr(e.cause, t)
    : t
    ? null
    : e;
}
const Ii = "#__bigint";
function it(e, t, n) {
  return JSON.stringify(
    e,
    (r, a) => (typeof a == "bigint" ? a.toString() + Ii : a),
    n
  );
}
function Gi(e, t) {
  if (Ie(e) > t) throw new Hi({ givenSize: Ie(e), maxSize: t });
}
function Ai(e, t) {
  if (typeof t == "number" && t > 0 && t > Ie(e) - 1)
    throw new Nr({ offset: t, position: "start", size: Ie(e) });
}
function Ui(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && Ie(e) !== n - t)
    throw new Nr({ offset: n, position: "end", size: Ie(e) });
}
const re = { zero: 48, nine: 57, A: 65, F: 70, a: 97, f: 102 };
function kn(e) {
  if (e >= re.zero && e <= re.nine) return e - re.zero;
  if (e >= re.A && e <= re.F) return e - (re.A - 10);
  if (e >= re.a && e <= re.f) return e - (re.a - 10);
}
function un(e, t) {
  if (pe(e) > t) throw new Ti({ givenSize: pe(e), maxSize: t });
}
function $i(e, t) {
  if (typeof t == "number" && t > 0 && t > pe(e) - 1)
    throw new Cr({ offset: t, position: "start", size: pe(e) });
}
function Di(e, t, n) {
  if (typeof t == "number" && typeof n == "number" && pe(e) !== n - t)
    throw new Cr({ offset: n, position: "end", size: pe(e) });
}
function Ar(e, t = {}) {
  const { dir: n, size: r = 32 } = t;
  if (r === 0) return e;
  const a = e.replace("0x", "");
  if (a.length > r * 2)
    throw new Vi({ size: Math.ceil(a.length / 2), targetSize: r, type: "Hex" });
  return `0x${a[n === "right" ? "padEnd" : "padStart"](r * 2, "0")}`;
}
const Ci = new TextEncoder(),
  Li = Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function ki(e, t = {}) {
  const { strict: n = !1 } = t;
  if (!e) throw new Rn(e);
  if (typeof e != "string") throw new Rn(e);
  if (n && !/^0x[0-9a-fA-F]*$/.test(e)) throw new Nn(e);
  if (!e.startsWith("0x")) throw new Nn(e);
}
function ot(...e) {
  return `0x${e.reduce((t, n) => t + n.replace("0x", ""), "")}`;
}
function Ur(e) {
  return e instanceof Uint8Array
    ? Be(e)
    : Array.isArray(e)
    ? Be(new Uint8Array(e))
    : e;
}
function Be(e, t = {}) {
  let n = "";
  for (let a = 0; a < e.length; a++) n += Li[e[a]];
  const r = `0x${n}`;
  return typeof t.size == "number" ? (un(r, t.size), Dr(r, t.size)) : r;
}
function de(e, t = {}) {
  const { signed: n, size: r } = t,
    a = BigInt(e);
  let i;
  r
    ? n
      ? (i = (1n << (BigInt(r) * 8n - 1n)) - 1n)
      : (i = 2n ** (BigInt(r) * 8n) - 1n)
    : typeof e == "number" && (i = BigInt(Number.MAX_SAFE_INTEGER));
  const o = typeof i == "bigint" && n ? -i - 1n : 0;
  if ((i && a > i) || a < o) {
    const u = typeof e == "bigint" ? "n" : "";
    throw new Fi({
      max: i ? `${i}${u}` : void 0,
      min: `${o}${u}`,
      signed: n,
      size: r,
      value: `${e}${u}`,
    });
  }
  const f = `0x${(n && a < 0 ? (1n << BigInt(r * 8)) + BigInt(a) : a).toString(
    16
  )}`;
  return r ? Ri(f, r) : f;
}
function $r(e, t = {}) {
  return Be(Ci.encode(e), t);
}
function Ri(e, t) {
  return Ar(e, { dir: "left", size: t });
}
function Dr(e, t) {
  return Ar(e, { dir: "right", size: t });
}
function ae(e, t, n, r = {}) {
  const { strict: a } = r;
  $i(e, t);
  const i = `0x${e.replace("0x", "").slice((t ?? 0) * 2, (n ?? e.length) * 2)}`;
  return a && Di(i, t, n), i;
}
function pe(e) {
  return Math.ceil((e.length - 2) / 2);
}
function Ni(e, t = {}) {
  const { signed: n } = t;
  t.size && un(e, t.size);
  const r = BigInt(e);
  if (!n) return r;
  const a = (e.length - 2) / 2,
    i = (1n << (BigInt(a) * 8n)) - 1n,
    o = i >> 1n;
  return r <= o ? r : r - i - 1n;
}
function ji(e, t = {}) {
  const { strict: n = !1 } = t;
  try {
    return ki(e, { strict: n }), !0;
  } catch {
    return !1;
  }
}
class Fi extends N {
  constructor({ max: t, min: n, signed: r, size: a, value: i }) {
    super(
      `Number \`${i}\` is not in safe${a ? ` ${a * 8}-bit` : ""}${
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
class Rn extends N {
  constructor(t) {
    super(
      `Value \`${
        typeof t == "object" ? it(t) : t
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
class Nn extends N {
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
let Ti = class extends N {
    constructor({ givenSize: t, maxSize: n }) {
      super(`Size cannot exceed \`${n}\` bytes. Given size: \`${t}\` bytes.`),
        Object.defineProperty(this, "name", {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: "Hex.SizeOverflowError",
        });
    }
  },
  Cr = class extends N {
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
  };
class Vi extends N {
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
function zi(e) {
  if (!(e instanceof Uint8Array)) {
    if (!e) throw new ke(e);
    if (typeof e != "object") throw new ke(e);
    if (!("BYTES_PER_ELEMENT" in e)) throw new ke(e);
    if (e.BYTES_PER_ELEMENT !== 1 || e.constructor.name !== "Uint8Array")
      throw new ke(e);
  }
}
function Lr(e) {
  return e instanceof Uint8Array ? e : typeof e == "string" ? Rr(e) : kr(e);
}
function kr(e) {
  return e instanceof Uint8Array ? e : new Uint8Array(e);
}
function Rr(e, t = {}) {
  const { size: n } = t;
  let r = e;
  n && (un(e, n), (r = Dr(e, n)));
  let a = r.slice(2);
  a.length % 2 && (a = `0${a}`);
  const i = a.length / 2,
    o = new Uint8Array(i);
  for (let s = 0, f = 0; s < i; s++) {
    const u = kn(a.charCodeAt(f++)),
      p = kn(a.charCodeAt(f++));
    if (u === void 0 || p === void 0)
      throw new N(
        `Invalid byte sequence ("${a[f - 2]}${a[f - 1]}" in "${a}").`
      );
    o[s] = u * 16 + p;
  }
  return o;
}
function Ie(e) {
  return e.length;
}
function jn(e, t, n, r = {}) {
  const { strict: a } = r;
  Ai(e, t);
  const i = e.slice(t, n);
  return a && Ui(i, t, n), i;
}
function Fn(e, t = {}) {
  const { size: n } = t;
  typeof n < "u" && Gi(e, n);
  const r = Be(e, t);
  return Ni(r, t);
}
function Mi(e) {
  try {
    return zi(e), !0;
  } catch {
    return !1;
  }
}
class ke extends N {
  constructor(t) {
    super(
      `Value \`${
        typeof t == "object" ? it(t) : t
      }\` of type \`${typeof t}\` is an invalid Bytes value.`,
      { metaMessages: ["Bytes values must be of type `Bytes`."] }
    ),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Bytes.InvalidBytesTypeError",
      });
  }
}
class Hi extends N {
  constructor({ givenSize: t, maxSize: n }) {
    super(`Size cannot exceed \`${n}\` bytes. Given size: \`${t}\` bytes.`),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "Bytes.SizeOverflowError",
      });
  }
}
class Nr extends N {
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
        value: "Bytes.SliceOffsetOutOfBoundsError",
      });
  }
}
function jr(e, t = {}) {
  const { as: n = typeof e == "string" ? "Hex" : "Bytes" } = t,
    r = ma(Lr(e));
  return n === "Bytes" ? r : Be(r);
}
function Fr(e, t = {}) {
  const { compressed: n } = t,
    { prefix: r, x: a, y: i } = e;
  if (n === !1 || (typeof a == "bigint" && typeof i == "bigint")) {
    if (r !== 4) throw new Tn({ prefix: r, cause: new Xi() });
    return;
  }
  if (n === !0 || (typeof a == "bigint" && typeof i > "u")) {
    if (r !== 3 && r !== 2) throw new Tn({ prefix: r, cause: new Ki() });
    return;
  }
  throw new Yi({ publicKey: e });
}
function Zi(e) {
  const t = (() => {
    if (ji(e)) return Tr(e);
    if (Mi(e)) return qi(e);
    const { prefix: n, x: r, y: a } = e;
    return typeof r == "bigint" && typeof a == "bigint"
      ? { prefix: n ?? 4, x: r, y: a }
      : { prefix: n, x: r };
  })();
  return Fr(t), t;
}
function qi(e) {
  return Tr(Be(e));
}
function Tr(e) {
  if (e.length !== 132 && e.length !== 130 && e.length !== 68)
    throw new Wi({ publicKey: e });
  if (e.length === 130) {
    const r = BigInt(ae(e, 0, 32)),
      a = BigInt(ae(e, 32, 64));
    return { prefix: 4, x: r, y: a };
  }
  if (e.length === 132) {
    const r = Number(ae(e, 0, 1)),
      a = BigInt(ae(e, 1, 33)),
      i = BigInt(ae(e, 33, 65));
    return { prefix: r, x: a, y: i };
  }
  const t = Number(ae(e, 0, 1)),
    n = BigInt(ae(e, 1, 33));
  return { prefix: t, x: n };
}
function Go(e, t = {}) {
  Fr(e);
  const { prefix: n, x: r, y: a } = e,
    { includePrefix: i = !0 } = t;
  return ot(
    i ? de(n, { size: 1 }) : "0x",
    de(r, { size: 32 }),
    typeof a == "bigint" ? de(a, { size: 32 }) : "0x"
  );
}
class Yi extends N {
  constructor({ publicKey: t }) {
    super(`Value \`${it(t)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)",
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "PublicKey.InvalidError",
      });
  }
}
class Tn extends N {
  constructor({ prefix: t, cause: n }) {
    super(`Prefix "${t}" is invalid.`, { cause: n }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "PublicKey.InvalidPrefixError",
      });
  }
}
class Ki extends N {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "PublicKey.InvalidCompressedPrefixError",
      });
  }
}
class Xi extends N {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys."),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "PublicKey.InvalidUncompressedPrefixError",
      });
  }
}
let Wi = class extends N {
  constructor({ publicKey: t }) {
    super(`Value \`${t}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${pe(Ur(t))} bytes.`,
      ],
    }),
      Object.defineProperty(this, "name", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "PublicKey.InvalidSerializedSizeError",
      });
  }
};
const Vn = 2n ** 256n - 1n;
function Ji(e, t = {}) {
  const { recovered: n } = t;
  if (typeof e.r > "u") throw new gt({ signature: e });
  if (typeof e.s > "u") throw new gt({ signature: e });
  if (n && typeof e.yParity > "u") throw new gt({ signature: e });
  if (e.r < 0n || e.r > Vn) throw new no({ value: e.r });
  if (e.s < 0n || e.s > Vn) throw new ro({ value: e.s });
  if (typeof e.yParity == "number" && e.yParity !== 0 && e.yParity !== 1)
    throw new ln({ value: e.yParity });
}
function Uo(e) {
  if (e.length !== 130 && e.length !== 132) throw new to({ signature: e });
  const t = BigInt(ae(e, 0, 32)),
    n = BigInt(ae(e, 32, 64)),
    r = (() => {
      const a = +`0x${e.slice(130)}`;
      if (!Number.isNaN(a))
        try {
          return Qi(a);
        } catch {
          throw new ln({ value: a });
        }
    })();
  return typeof r > "u" ? { r: t, s: n } : { r: t, s: n, yParity: r };
}
function $o(e) {
  Ji(e);
  const t = e.r,
    n = e.s;
  return ot(
    de(t, { size: 32 }),
    de(n, { size: 32 }),
    typeof e.yParity == "number" ? de(eo(e.yParity), { size: 1 }) : "0x"
  );
}
function Qi(e) {
  if (e === 0 || e === 27) return 0;
  if (e === 1 || e === 28) return 1;
  if (e >= 35) return e % 2 === 0 ? 1 : 0;
  throw new ao({ value: e });
}
function eo(e) {
  if (e === 0) return 27;
  if (e === 1) return 28;
  throw new ln({ value: e });
}
class to extends N {
  constructor({ signature: t }) {
    super(`Value \`${t}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${pe(Ur(t))} bytes.`,
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
class gt extends N {
  constructor({ signature: t }) {
    super(
      `Signature \`${it(
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
class no extends N {
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
class ro extends N {
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
class ln extends N {
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
class ao extends N {
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
const io = new TextDecoder(),
  Re = Object.fromEntries(
    Array.from(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    ).map((e, t) => [t, e.charCodeAt(0)])
  );
({
  ...Object.fromEntries(
    Array.from(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
    ).map((e, t) => [e.charCodeAt(0), t])
  ),
});
function oo(e, t = {}) {
  const { pad: n = !0, url: r = !1 } = t,
    a = new Uint8Array(Math.ceil(e.length / 3) * 4);
  for (let f = 0, u = 0; u < e.length; f += 4, u += 3) {
    const p = (e[u] << 16) + (e[u + 1] << 8) + (e[u + 2] | 0);
    (a[f] = Re[p >> 18]),
      (a[f + 1] = Re[(p >> 12) & 63]),
      (a[f + 2] = Re[(p >> 6) & 63]),
      (a[f + 3] = Re[p & 63]);
  }
  const i = e.length % 3,
    o = Math.floor(e.length / 3) * 4 + (i && i + 1);
  let s = io.decode(new Uint8Array(a.buffer, 0, o));
  return (
    n && i === 1 && (s += "=="),
    n && i === 2 && (s += "="),
    r && (s = s.replaceAll("+", "-").replaceAll("/", "_")),
    s
  );
}
function so(e, t = {}) {
  return oo(Rr(e), t);
}
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Vr =
    {
      p: BigInt(
        "0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"
      ),
      n: BigInt(
        "0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"
      ),
      h: BigInt(1),
      a: BigInt(
        "0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"
      ),
      b: BigInt(
        "0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"
      ),
      Gx: BigInt(
        "0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"
      ),
      Gy: BigInt(
        "0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"
      ),
    },
  zr = {
    p: BigInt(
      "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"
    ),
    n: BigInt(
      "0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"
    ),
    h: BigInt(1),
    a: BigInt(
      "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"
    ),
    b: BigInt(
      "0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"
    ),
    Gx: BigInt(
      "0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"
    ),
    Gy: BigInt(
      "0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f"
    ),
  },
  Mr = {
    p: BigInt(
      "0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    ),
    n: BigInt(
      "0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"
    ),
    h: BigInt(1),
    a: BigInt(
      "0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"
    ),
    b: BigInt(
      "0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"
    ),
    Gx: BigInt(
      "0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"
    ),
    Gy: BigInt(
      "0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650"
    ),
  },
  fo = _e(Vr.p),
  co = _e(zr.p),
  uo = _e(Mr.p),
  lo = nn({ ...Vr, Fp: fo, lowS: !1 }, ga);
nn({ ...zr, Fp: co, lowS: !1 }, ha);
nn({ ...Mr, Fp: uo, lowS: !1, allowedPrivateKeyLengths: [130, 131, 132] }, ba);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const zn =
  lo;
Uint8Array.from([
  105, 171, 180, 181, 160, 222, 75, 198, 42, 42, 32, 31, 141, 37, 186, 233,
]);
function po(e = {}) {
  const {
      flag: t = 5,
      rpId: n = window.location.hostname,
      signCount: r = 0,
    } = e,
    a = jr($r(n)),
    i = de(t, { size: 1 }),
    o = de(r, { size: 4 });
  return ot(a, i, o);
}
function yo(e) {
  const {
    challenge: t,
    crossOrigin: n = !1,
    extraClientData: r,
    origin: a = window.location.origin,
  } = e;
  return JSON.stringify({
    type: "webauthn.get",
    challenge: so(t, { url: !0, pad: !1 }),
    origin: a,
    crossOrigin: n,
    ...r,
  });
}
function Do(e) {
  const {
      challenge: t,
      crossOrigin: n,
      extraClientData: r,
      flag: a,
      origin: i,
      rpId: o,
      signCount: s,
      userVerification: f = "required",
    } = e,
    u = po({ flag: a, rpId: o, signCount: s }),
    p = yo({ challenge: t, crossOrigin: n, extraClientData: r, origin: i }),
    l = jr($r(p)),
    d = p.indexOf('"challenge"'),
    c = p.indexOf('"type"'),
    b = {
      authenticatorData: u,
      clientDataJSON: p,
      challengeIndex: d,
      typeIndex: c,
      userVerificationRequired: f === "required",
    },
    g = ot(u, l);
  return { metadata: b, payload: g };
}
async function Co(e = {}) {
  const { extractable: t = !1 } = e,
    n = await globalThis.crypto.subtle.generateKey(
      { name: "ECDSA", namedCurve: "P-256" },
      t,
      ["sign", "verify"]
    ),
    r = await globalThis.crypto.subtle.exportKey("raw", n.publicKey),
    a = Zi(new Uint8Array(r));
  return { privateKey: n.privateKey, publicKey: a };
}
async function Lo(e) {
  const { payload: t, privateKey: n } = e,
    r = await globalThis.crypto.subtle.sign(
      { name: "ECDSA", hash: "SHA-256" },
      n,
      Lr(t)
    ),
    a = kr(new Uint8Array(r)),
    i = Fn(jn(a, 0, 32));
  let o = Fn(jn(a, 32, 64));
  return o > zn.CURVE.n / 2n && (o = zn.CURVE.n - o), { r: i, s: o };
}
export {
  bo as B,
  vo as T,
  Xa as _,
  qa as a,
  Po as b,
  ho as c,
  Lo as d,
  $o as e,
  Co as f,
  Do as g,
  _o as h,
  Uo as i,
  Oo as j,
  So as k,
  R as l,
  xo as m,
  Eo as n,
  go as p,
  ae as s,
  Go as t,
  wo as y,
};
//# sourceMappingURL=WebCryptoP256-Bp2Ccc3u.js.map
