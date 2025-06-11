const { c, u } = require("./getC");

let data;
let nDataBytes;
let hash;
let d = [];

function doReset() {
  hash = new initD(c.slice(0));
}

function doFinalize() {
  var m = data,
    h = m.words,
    b = nDataBytes * 8,
    v = m.sigBytes * 8;
  return (
    (h[v >>> 5] |= 128 << (24 - (v % 32))),
    (h[(((v + 64) >>> 9) << 4) + 14] = Math.floor(b / 4294967296)),
    (h[(((v + 64) >>> 9) << 4) + 15] = b),
    (m.sigBytes = h.length * 4),
    process(),
    hash
  );
}

function doProcessBlock(m, h) {
  for (
    var b = hash.words,
      v = b[0],
      E = b[1],
      g = b[2],
      p = b[3],
      _ = b[4],
      w = b[5],
      P = b[6],
      C = b[7],
      S = 0;
    S < 64;
    S++
  ) {
    if (S < 16) d[S] = m[h + S] | 0;
    else {
      var x = d[S - 15],
        N = ((x << 25) | (x >>> 7)) ^ ((x << 14) | (x >>> 18)) ^ (x >>> 3),
        Z = d[S - 2],
        H = ((Z << 15) | (Z >>> 17)) ^ ((Z << 13) | (Z >>> 19)) ^ (Z >>> 10);
      d[S] = N + d[S - 7] + H + d[S - 16];
    }
    var ne = (_ & w) ^ (~_ & P),
      fe = (v & E) ^ (v & g) ^ (E & g),
      _e =
        ((v << 30) | (v >>> 2)) ^
        ((v << 19) | (v >>> 13)) ^
        ((v << 10) | (v >>> 22)),
      ee =
        ((_ << 26) | (_ >>> 6)) ^
        ((_ << 21) | (_ >>> 11)) ^
        ((_ << 7) | (_ >>> 25)),
      ae = C + ee + ne + u[S] + d[S],
      oe = _e + fe;
    (C = P),
      (P = w),
      (w = _),
      (_ = (p + ae) | 0),
      (p = g),
      (g = E),
      (E = v),
      (v = (ae + oe) | 0);
  }
  (b[0] = (b[0] + v) | 0),
    (b[1] = (b[1] + E) | 0),
    (b[2] = (b[2] + g) | 0),
    (b[3] = (b[3] + p) | 0),
    (b[4] = (b[4] + _) | 0),
    (b[5] = (b[5] + w) | 0),
    (b[6] = (b[6] + P) | 0),
    (b[7] = (b[7] + C) | 0);
}

function process(g) {
  var p,
    _ = data,
    w = _.words,
    P = _.sigBytes,
    C = 16,
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

module.exports = {
  finalize,
};
