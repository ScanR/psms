const { getMangaViewerHash } = require("./getMangaViewerHash.js");
const Canvas = require("@napi-rs/canvas");
const { parseStringPromise } = require("xml2js");
const fs = require("fs");

const uwt = "";
const path = "./series";

const id = "";
const idSerie = "";

const numberFormat = new Intl.NumberFormat("fr-FR", {
  minimumIntegerDigits: 2,
});
const f = numberFormat.format;
const formatDate = (date) => date.slice(1, 11);

const main = async (id) => {
  let episode = id;
  const rssText = await fetch(
    `https://mgpk-cdn.magazinepocket.com/static/rss/${idSerie}/feed.xml`
  ).then((res) => res.text());
  const rss = await parseStringPromise(rssText);
  const mangaInfos = rss.rss.channel[0].item
    .map((item) => ({
      link: item.link[0],
      date: formatDate(JSON.stringify(new Date(item.pubDate))),
      episode: item.link[0].split("/").pop(),
    }))
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  let mangaInfo;
  if (!episode) {
    mangaInfo = mangaInfos[0];
    episode = mangaInfo.episode;
  } else {
    mangaInfo = mangaInfos.filter(({ episode }) => episode == id)[0];
    if (!mangaInfo) {
      mangaInfo = mangaInfos[0];
      episode = mangaInfo.episode;
      console.log(
        "ERREUR L'ID N'EST PAS LE BON, ON PRENDS LE DERNIER CHAPITRE A LA PLACE"
      );
    }
  }
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  const param = {
    platform: 3,
    episode_id: episode,
  };
  const mangaHash = getMangaViewerHash(param);

  const json = await fetch(
    `https://api.pocket.shonenmagazine.com/web/episode/viewer?platform=3&episode_id=${episode}`,
    {
      headers: { Cookie: `uwt=${uwt}`, "x-manga-hash": mangaHash },
    }
  ).then((res) => res.json());

  const seed = json.scramble_seed;

  const pages = json.page_list;
  if (!fs.existsSync("./series")) fs.mkdirSync("./series");
  const pathVolume = `./series/KH`;
  if (!fs.existsSync(pathVolume)) fs.mkdirSync(pathVolume);
  const folder = `${pathVolume}/${mangaInfo.date}`;
  if (fs.existsSync(folder)) return console.log(`chap déjà dl`);
  fs.mkdirSync(folder);
  const download = downloader(folder, seed);
  await Promise.all(pages.map(download));
  console.log(`chap end`);
};

const getUrlJson = async () =>
  await Promise.all(
    Object.entries(series).map(async ([key, value], index) => {
      const res = await fetch(`https://comic-days.com/`).then((res) =>
        res.text()
      );
      const document = parse(res);
      const urlMagazine = Array.from(
        document.querySelectorAll(
          ".gtm-top-days-premium-weekly-item,.gtm-top-days-premium-monthly-item"
        )
      ).filter((e) => e.querySelector("h4").innerText == value.nomHtml)[0]
        .attributes.href;
      return urlMagazine;
    })
  );

const downloader = (folder, seed) => {
  return async (value, index) => {
    const image = await unscrap(value, seed);
    fs.writeFileSync(`${folder}/${f(index + 1)}.jpg`, image);
  };
};

const unscrap = async (url, seed) => {
  const ie = (a) =>
    a === void 0 ? !1 : a === Math.max(Math.min(a, 2 ** 32 - 1), 1);

  const image = await Canvas.loadImage(url);
  const height = image.height;
  const width = image.width;
  const final = new Canvas.Canvas(width, height);
  const context = final.getContext("2d");

  context.drawImage(image, 0, 0);
  const t = ue(width, height, 4);
  if (!(!t || !ie(seed))) {
    context.clearRect(0, 0, t.width * 4, t.height * 4);
    for (const u of le(4, seed ?? 1))
      context.drawImage(
        image,
        u.source.x * t.width,
        u.source.y * t.height,
        t.width,
        t.height,
        u.dest.x * t.width,
        u.dest.y * t.height,
        t.width,
        t.height
      );
  }

  return await final.encode("jpeg");
};

const getCoordPieces = (width, largeur_piece) => {
  const largeur_colonnes = [
    largeur_piece,
    largeur_piece,
    largeur_piece,
    largeur_piece,
    width - largeur_piece * 4,
  ];
  const hauteur_lignes = 344;
  const pieces = [];
  for (ligne = 0; ligne < 4; ligne++) {
    for (colonne = 0; colonne < 4; colonne++) {
      const x = sum(largeur_colonnes.slice(0, colonne));
      const y = ligne * hauteur_lignes;
      const w = largeur_colonnes[colonne];
      const h = hauteur_lignes;
      pieces.push({
        x: x,
        y: y,
        w: w,
        h: h,
      });
    }
  }
  return pieces;
};

const sum = (array) => array.reduce((acc, value) => acc + value, 0);

const ue = (a, e, s) => {
  if (a < s * 8 || e < s * 8) return null;
  const o = Math.floor(a / 8),
    t = Math.floor(e / 8),
    u = Math.floor(o / s),
    r = Math.floor(t / s);
  return {
    width: u * 8,
    height: r * 8,
  };
};

function* ve(a) {
  const e = Uint32Array.of(a);
  for (;;)
    (e[0] ^= e[0] << 13),
      (e[0] ^= e[0] >>> 17),
      (e[0] ^= e[0] << 5),
      yield e[0];
}

function re(a, e) {
  const s = ve(e);
  return a
    .map((t) => [s.next().value, t])
    .sort((t, u) => +(t[0] > u[0]) - +(u[0] > t[0]))
    .map((t) => t[1]);
}

function* le(a, e) {
  yield* re(
    [...Array(a ** 2)].map((o, t) => t),
    e
  ).map((o, t) => ({
    source: {
      x: o % a,
      y: Math.floor(o / a),
    },
    dest: {
      x: t % a,
      y: Math.floor(t / a),
    },
  }));
}

main(id);
