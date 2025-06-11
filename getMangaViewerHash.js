const { finalize: sha256 } = require("./hash1");
const { finalize: sha512 } = require("./hash2");
const { c } = require("./getC");

function Ed(e, t) {
  return `${sha256(e).toString()}_${sha512(t).toString()}`;
}

function gh(e) {
  const t = Object.keys(e);
  t.sort();
  const r = [];
  for (const i of t) r.push(Ed(i, e[i]));
  const n = sha256(r.toString()).toString(),
    a = Ed("", "");
  return sha512(`${n}${a}`).toString();
}

function getMangaViewerHash(e) {
  const t = {};
  for (const [r, n] of Object.entries(e))
    (typeof n != "string" && typeof n != "number") || (t[r] = n.toString());
  return gh(t);
}

module.exports = { getMangaViewerHash };
