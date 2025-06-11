let c = [];
let u = [];

function m(E) {
  for (var g = Math.sqrt(E), p = 2; p <= g; p++) if (!(E % p)) return !1;
  return !0;
}
function h(E) {
  return ((E - (E | 0)) * 4294967296) | 0;
}
function getC() {
  for (var b = 2, v = 0; v < 64; )
    m(b) &&
      (v < 8 && (c[v] = h(Math.pow(b, 1 / 2))),
      (u[v] = h(Math.pow(b, 1 / 3))),
      v++),
      b++;
}
getC();

module.exports = {
  c,
  u,
};
