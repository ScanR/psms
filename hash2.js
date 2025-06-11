const { c } = require("./getC");

let data;
let nDataBytes;
let hash;

const u = (high, low) => ({ high: high, low: low });

let f = [];
var d = [
  u(1116352408, 3609767458),
  u(1899447441, 602891725),
  u(3049323471, 3964484399),
  u(3921009573, 2173295548),
  u(961987163, 4081628472),
  u(1508970993, 3053834265),
  u(2453635748, 2937671579),
  u(2870763221, 3664609560),
  u(3624381080, 2734883394),
  u(310598401, 1164996542),
  u(607225278, 1323610764),
  u(1426881987, 3590304994),
  u(1925078388, 4068182383),
  u(2162078206, 991336113),
  u(2614888103, 633803317),
  u(3248222580, 3479774868),
  u(3835390401, 2666613458),
  u(4022224774, 944711139),
  u(264347078, 2341262773),
  u(604807628, 2007800933),
  u(770255983, 1495990901),
  u(1249150122, 1856431235),
  u(1555081692, 3175218132),
  u(1996064986, 2198950837),
  u(2554220882, 3999719339),
  u(2821834349, 766784016),
  u(2952996808, 2566594879),
  u(3210313671, 3203337956),
  u(3336571891, 1034457026),
  u(3584528711, 2466948901),
  u(113926993, 3758326383),
  u(338241895, 168717936),
  u(666307205, 1188179964),
  u(773529912, 1546045734),
  u(1294757372, 1522805485),
  u(1396182291, 2643833823),
  u(1695183700, 2343527390),
  u(1986661051, 1014477480),
  u(2177026350, 1206759142),
  u(2456956037, 344077627),
  u(2730485921, 1290863460),
  u(2820302411, 3158454273),
  u(3259730800, 3505952657),
  u(3345764771, 106217008),
  u(3516065817, 3606008344),
  u(3600352804, 1432725776),
  u(4094571909, 1467031594),
  u(275423344, 851169720),
  u(430227734, 3100823752),
  u(506948616, 1363258195),
  u(659060556, 3750685593),
  u(883997877, 3785050280),
  u(958139571, 3318307427),
  u(1322822218, 3812723403),
  u(1537002063, 2003034995),
  u(1747873779, 3602036899),
  u(1955562222, 1575990012),
  u(2024104815, 1125592928),
  u(2227730452, 2716904306),
  u(2361852424, 442776044),
  u(2428436474, 593698344),
  u(2756734187, 3733110249),
  u(3204031479, 2999351573),
  u(3329325298, 3815920427),
  u(3391569614, 3928383900),
  u(3515267271, 566280711),
  u(3940187606, 3454069534),
  u(4118630271, 4000239992),
  u(116418474, 1914138554),
  u(174292421, 2731055270),
  u(289380356, 3203993006),
  u(460393269, 320620315),
  u(685471733, 587496836),
  u(852142971, 1086792851),
  u(1017036298, 365543100),
  u(1126000580, 2618297676),
  u(1288033470, 3409855158),
  u(1501505948, 4234509866),
  u(1607167915, 987167468),
  u(1816402316, 1246189591),
];

function doReset() {
  hash = new initL([
    new initI(1779033703, 4089235720),
    new initI(3144134277, 2227873595),
    new initI(1013904242, 4271175723),
    new initI(2773480762, 1595750129),
    new initI(1359893119, 2917565137),
    new initI(2600822924, 725511199),
    new initI(528734635, 4215389547),
    new initI(1541459225, 327033209),
  ]);
}
function doProcessBlock(h, b) {
  for (
    var v = hash.words,
      E = v[0],
      g = v[1],
      p = v[2],
      _ = v[3],
      w = v[4],
      P = v[5],
      C = v[6],
      S = v[7],
      x = E.high,
      N = E.low,
      Z = g.high,
      H = g.low,
      ne = p.high,
      fe = p.low,
      _e = _.high,
      ee = _.low,
      ae = w.high,
      oe = w.low,
      Ie = P.high,
      Ne = P.low,
      je = C.high,
      Ue = C.low,
      Lt = S.high,
      wt = S.low,
      We = x,
      Q = N,
      O = Z,
      D = H,
      q = ne,
      J = fe,
      he = _e,
      ve = ee,
      y = ae,
      z = oe,
      R = Ie,
      W = Ne,
      V = je,
      G = Ue,
      te = Lt,
      X = wt,
      K = 0;
    K < 80;
    K++
  ) {
    var j,
      ie,
      Y = f[K];
    if (K < 16)
      (ie = Y.high = h[b + K * 2] | 0), (j = Y.low = h[b + K * 2 + 1] | 0);
    else {
      var A = f[K - 15],
        T = A.high,
        se = A.low,
        ue = ((T >>> 1) | (se << 31)) ^ ((T >>> 8) | (se << 24)) ^ (T >>> 7),
        be =
          ((se >>> 1) | (T << 31)) ^
          ((se >>> 8) | (T << 24)) ^
          ((se >>> 7) | (T << 25)),
        Fe = f[K - 2],
        Se = Fe.high,
        Ge = Fe.low,
        ut =
          ((Se >>> 19) | (Ge << 13)) ^ ((Se << 3) | (Ge >>> 29)) ^ (Se >>> 6),
        xr =
          ((Ge >>> 19) | (Se << 13)) ^
          ((Ge << 3) | (Se >>> 29)) ^
          ((Ge >>> 6) | (Se << 26)),
        oo = f[K - 7],
        _t = oo.high,
        Ht = oo.low,
        so = f[K - 16],
        s_ = so.high,
        vc = so.low;
      (j = be + Ht),
        (ie = ue + _t + (j >>> 0 < be >>> 0 ? 1 : 0)),
        (j = j + xr),
        (ie = ie + ut + (j >>> 0 < xr >>> 0 ? 1 : 0)),
        (j = j + vc),
        (ie = ie + s_ + (j >>> 0 < vc >>> 0 ? 1 : 0)),
        (Y.high = ie),
        (Y.low = j);
    }
    var a_ = (y & R) ^ (~y & V),
      wc = (z & W) ^ (~z & G),
      i_ = (We & O) ^ (We & q) ^ (O & q),
      l_ = (Q & D) ^ (Q & J) ^ (D & J),
      c_ =
        ((We >>> 28) | (Q << 4)) ^
        ((We << 30) | (Q >>> 2)) ^
        ((We << 25) | (Q >>> 7)),
      zc =
        ((Q >>> 28) | (We << 4)) ^
        ((Q << 30) | (We >>> 2)) ^
        ((Q << 25) | (We >>> 7)),
      u_ =
        ((y >>> 14) | (z << 18)) ^
        ((y >>> 18) | (z << 14)) ^
        ((y << 23) | (z >>> 9)),
      d_ =
        ((z >>> 14) | (y << 18)) ^
        ((z >>> 18) | (y << 14)) ^
        ((z << 23) | (y >>> 9)),
      Ec = d[K],
      f_ = Ec.high,
      Pc = Ec.low,
      Ot = X + d_,
      Tr = te + u_ + (Ot >>> 0 < X >>> 0 ? 1 : 0),
      Ot = Ot + wc,
      Tr = Tr + a_ + (Ot >>> 0 < wc >>> 0 ? 1 : 0),
      Ot = Ot + Pc,
      Tr = Tr + f_ + (Ot >>> 0 < Pc >>> 0 ? 1 : 0),
      Ot = Ot + j,
      Tr = Tr + ie + (Ot >>> 0 < j >>> 0 ? 1 : 0),
      Ac = zc + l_,
      m_ = c_ + i_ + (Ac >>> 0 < zc >>> 0 ? 1 : 0);
    (te = V),
      (X = G),
      (V = R),
      (G = W),
      (R = y),
      (W = z),
      (z = (ve + Ot) | 0),
      (y = (he + Tr + (z >>> 0 < ve >>> 0 ? 1 : 0)) | 0),
      (he = q),
      (ve = J),
      (q = O),
      (J = D),
      (O = We),
      (D = Q),
      (Q = (Ot + Ac) | 0),
      (We = (Tr + m_ + (Q >>> 0 < Ot >>> 0 ? 1 : 0)) | 0);
  }
  (N = E.low = N + Q),
    (E.high = x + We + (N >>> 0 < Q >>> 0 ? 1 : 0)),
    (H = g.low = H + D),
    (g.high = Z + O + (H >>> 0 < D >>> 0 ? 1 : 0)),
    (fe = p.low = fe + J),
    (p.high = ne + q + (fe >>> 0 < J >>> 0 ? 1 : 0)),
    (ee = _.low = ee + ve),
    (_.high = _e + he + (ee >>> 0 < ve >>> 0 ? 1 : 0)),
    (oe = w.low = oe + z),
    (w.high = ae + y + (oe >>> 0 < z >>> 0 ? 1 : 0)),
    (Ne = P.low = Ne + W),
    (P.high = Ie + R + (Ne >>> 0 < W >>> 0 ? 1 : 0)),
    (Ue = C.low = Ue + G),
    (C.high = je + V + (Ue >>> 0 < G >>> 0 ? 1 : 0)),
    (wt = S.low = wt + X),
    (S.high = Lt + te + (wt >>> 0 < X >>> 0 ? 1 : 0));
}
function doFinalize() {
  var h = data,
    b = h.words,
    v = nDataBytes * 8,
    E = h.sigBytes * 8;
  (b[E >>> 5] |= 128 << (24 - (E % 32))),
    (b[(((E + 128) >>> 10) << 5) + 30] = Math.floor(v / 4294967296)),
    (b[(((E + 128) >>> 10) << 5) + 31] = v),
    (h.sigBytes = b.length * 4),
    process();
  var g = toX32(hash);
  return g;
}

function hasher(d, hash) {
  this.toString = () => stringify(this);
  this.words = d;
  this.sigBytes = hash.sigBytes;
}

function toX32(hash) {
  for (var c = hash.words, u = c.length, d = [], f = 0; f < u; f++) {
    var m = c[f];
    d.push(m.high), d.push(m.low);
  }
  return new hasher(d, hash);
}

function process(g) {
  var p,
    _ = data,
    w = _.words,
    P = _.sigBytes,
    C = 32,
    S = C * 4,
    x = P / S;
  g ? (x = Math.ceil(x)) : (x = Math.max(x | 0, 0));
  var N = x * C,
    Z = Math.min(N * 4, P);
  if (N) {
    for (var H = 0; H < N; H += C) doProcessBlock(w, H);
    (p = w.splice(0, N)), (_.sigBytes -= Z);
  }
  return new initD(p, Z);
}

function stringify(g) {
  for (var p = g.words, _ = g.sigBytes, w = [], P = 0; P < _; P++) {
    var C = (p[P >>> 2] >>> (24 - (P % 4) * 8)) & 255;
    w.push((C >>> 4).toString(16)), w.push((C & 15).toString(16));
  }
  return w.join("");
}

function initI(c, u) {
  this.high = c;
  this.low = u;
}

function initL(c, u) {
  c = this.words = c || [];
  u != undefined ? (this.sigBytes = u) : (this.sigBytes = c.length * 8);
}

function initD(g, p) {
  this.toString = () => stringify(this);
  g = this.words = g || [];
  p != undefined ? (this.sigBytes = p) : (this.sigBytes = g.length * 4);
}

function parseH(g) {
  for (var p = g.length, _ = [], w = 0; w < p; w++)
    _[w >>> 2] |= (g.charCodeAt(w) & 255) << (24 - (w % 4) * 8);
  return new initD(_, p);
}

function parseB(g) {
  return parseH(unescape(encodeURIComponent(g)));
}

function reset() {
  data = { words: Array(0), sigBytes: 0 };
  nDataBytes = 0;
  doReset();
}

function clamp() {
  var g = data.words,
    p = data.sigBytes;
  (g[p >>> 2] &= 4294967295 << (32 - (p % 4) * 8)),
    (g.length = Math.ceil(p / 4));
}
function concatData(g) {
  var p = data.words,
    _ = g.words,
    w = data.sigBytes,
    P = g.sigBytes;
  if ((clamp(), w % 4))
    for (var C = 0; C < P; C++) {
      var S = (_[C >>> 2] >>> (24 - (C % 4) * 8)) & 255;
      p[(w + C) >>> 2] |= S << (24 - ((w + C) % 4) * 8);
    }
  else for (var x = 0; x < P; x += 4) p[(w + x) >>> 2] = _[x >>> 2];
  return (data.sigBytes += P), data;
}

function _append(g) {
  typeof g == "string" && (g = parseB(g));
  concatData(g);
  nDataBytes += g.sigBytes;
}

function finalize(g) {
  reset();
  g && _append(g);
  var p = doFinalize();
  return p;
}

for (var h = 0; h < 80; h++) f[h] = { high: undefined, low: undefined };

module.exports = {
  finalize,
};
