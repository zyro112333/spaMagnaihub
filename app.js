/* ===== 2.1 Өгөгдлийн төрөл ба хувьсагч ===== */
const APP_NAME = "Монголын мөөг";   // const  - утга нь өөрчлөгдөхгүй (string)
let viewCount = 0;                  // let    - орчин үеийн хувьсагч (number)
var lastRoute = null;               // var    - хуучин хэлбэр (null эхлэл)
let isDetail = false;               // boolean

// Мөөгний мэдээлэл: E = идэж болно, C = болгоомжтой, P = хортой
const mushrooms = [
  { id: 1, emoji: "🍄", name: "Цагаан мөөг", latin: "Boletus edulis", code: "E", cap: [7, 20],
    season: "7-р сар – 9-р сар", habitat: "Хэнтий, Хөвсгөл, Сэлэнгийн нарс, гацуур, хуш, хус бүхий ой",
    text: "Махлаг, бүдүүн хөлтэй, бор малгайтай. Хамгийн үнэ цэнэтэй хүнсний мөөгний нэг. Шинэ, хатаасан аль ч хэлбэрээр хэрэглэнэ." },
  { id: 2, emoji: "🟡", name: "Шар мөөг", latin: "Cantharellus cibarius", code: "E", cap: [3, 10],
    season: "7-р сар – 9-р сар", habitat: "Шилмүүст болон холимог ойн мүк, шаргал хөрс",
    text: "Өнгө нь шаргал, малгай ба хөл нь нийлж юүлэн хэлбэртэй. Үл ялиг чидуны үнэртэй, жигнэхэд тохиромжтой." },
  { id: 3, emoji: "🟤", name: "Тосон мөөг", latin: "Suillus grevillei", code: "E", cap: [4, 10],
    season: "7-р сар – 9-р сар", habitat: "Шинэсэн ой (Хэнтий, Хөвсгөл, Хангай)",
    text: "Малгай нь нялцгай, шаргал бор. Хэрэглэхээсээ өмнө малгайн нялцгай арьсыг хуулна." },
  { id: 4, emoji: "⚪", name: "Хээрийн мөөг", latin: "Agaricus campestris", code: "E", cap: [5, 10],
    season: "7-р сар – 9-р сар", habitat: "Бороотой жилийн хээр, бэлчээр, нугын нуга",
    text: "Цагаан малгайтай, доод талын хуудас нь залуудаа ягаан, хөгшөөд хар хүрэн болдог. Хортой мөөгтэй андуурч болзошгүй тул болгоомжтой." },
  { id: 5, emoji: "🌰", name: "Хусны мөөг", latin: "Leccinum scabrum", code: "E", cap: [5, 15],
    season: "7-р сар – 10-р сар", habitat: "Хус бүхий ой, ойн захын хөндий",
    text: "Хөл нь хар толботой, хусны мөөг гэж нэрлэгдэнэ. Чанаж болгосны дараа хэрэглэнэ." },
  { id: 6, emoji: "🔴", name: "Ялаа мөөг", latin: "Amanita muscaria", code: "P", cap: [8, 20],
    season: "8-р сар – 9-р сар", habitat: "Хус, шинэсэн ой",
    text: "Улаан малгай дээр цагаан толботой. ХОРТОЙ — хэрэглэхгүй. Хоол боловсруулах болон мэдрэлийн системд хор нөлөөтэй." },
  { id: 7, emoji: "⚽", name: "Хөөс мөөг", latin: "Lycoperdon perlatum", code: "C", cap: [2, 6],
    season: "7-р сар – 9-р сар", habitat: "Нуга, ойн зах, бэлчээр",
    text: "Бөмбөлөг хэлбэртэй. Дотор нь цагаан, хатуу байхад л идэж болно; шаргал, хар болсон бол хэрэглэхгүй." }
];
const CODE_NAMES = { E: "Идэж болно", C: "Болгоомжтой", P: "Хортой" };

const app = document.getElementById("app");

/* ===== Router (SPA) — hash өөрчлөгдөхөд хуудас сэргээнэ ===== */
function router() {
  const parts = (location.hash.slice(1) || "/").split("/");   // "#/mushroom/3" -> ["", "mushroom", "3"]
  const page = parts[1];
  const arg = parts[2];
  viewCount = viewCount + 1;           // 2.3 арифметик оператор
  isDetail = (page === "mushroom");
  lastRoute = page || "home";

  switch (page) {                      // 2.5 switch
    case "mushrooms": pageList(); break;
    case "mushroom":  pageDetail(arg); break;
    case "tools":     pageTools(); break;
    default:          pageHome();
  }
  document.querySelectorAll("nav a").forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + (isDetail ? "mushrooms" : page || ""));
  });
}
window.addEventListener("hashchange", router);
window.addEventListener("load", router);

/* ===== Нүүр хуудас ===== */
function pageHome() {
  let edible = 0, poison = 0;
  for (const m of mushrooms) {
    if (m.code === "E") edible++;
    else if (m.code === "P") poison++;
  }
  app.innerHTML = `
    <section class="hero">
      <h1>🍄 Монгол оронд ургадаг мөөг</h1>
      <p>Хэнтий, Хөвсгөл, Хангай, Сэлэнгийн ой, хээрт ургадаг мөөгнүүдийг танин мэдэх сургалтын вэб.</p>
    </section>
    <div class="stats">
      <div class="stat"><b>${mushrooms.length}</b>Нийт мөөг</div>
      <div class="stat"><b>${edible}</b>Идэж болох</div>
      <div class="stat"><b>${poison}</b>Хортой</div>
      <div class="stat"><b>${viewCount}</b>Үзсэн хуудас</div>
    </div>
    <p>Дээд цэснээс <a href="#/mushrooms">Мөөгнүүд</a> хэсгийг үзэх эсвэл <a href="#/tools">Хэрэгсэл</a> хэсэгт тооцоо хийгээрэй.</p>`;
}

/* ===== Жагсаалт: хайлт + шүүлт ===== */
function pageList() {
  app.innerHTML = `
    <h2>Мөөгнүүд</h2>
    <div class="bar">
      <input id="q" placeholder="Нэрээр хайх...">
      <select id="f">
        <option value="">Бүгд</option>
        <option value="E">Идэж болно</option><option value="C">Болгоомжтой</option><option value="P">Хортой</option>
      </select>
    </div>
    <div id="list" class="grid"></div>`;
  const draw = () => {
    const q = document.getElementById("q").value.trim().toLowerCase();
    const f = document.getElementById("f").value;
    const rows = mushrooms.filter(m =>
      (m.name.toLowerCase().includes(q) || m.latin.toLowerCase().includes(q)) && (f === "" || m.code === f));
    document.getElementById("list").innerHTML = rows.length
      ? rows.map(m => `<a class="card" href="#/mushroom/${m.id}">
          <div class="emoji">${m.emoji}</div><b>${m.name}</b>
          <div class="latin">${m.latin}</div>
          <span class="badge ${m.code}">${CODE_NAMES[m.code]}</span></a>`).join("")
      : "<p>Олдсонгүй.</p>";
  };
  document.getElementById("q").oninput = draw;
  document.getElementById("f").onchange = draw;
  draw();
}

/* ===== Дэлгэрэнгүй ===== */
function pageDetail(arg) {
  const m = mushrooms.find(x => x.id === Number(arg));     // 2.2 String -> Number хөрвүүлэлт
  if (!m) { app.innerHTML = "<p>Мөөг олдсонгүй. <a href='#/mushrooms'>Жагсаалт руу</a></p>"; return; }
  app.innerHTML = `<div class="detail">
    <a href="#/mushrooms">← Буцах</a>
    <h2>${m.emoji} ${m.name} <span class="badge ${m.code}">${CODE_NAMES[m.code]}</span></h2>
    <div class="latin">${m.latin}</div>
    <p>${m.text}</p>
    <table>
      <tr><td>Малгайн голч</td><td>${m.cap[0]} – ${m.cap[1]} см</td></tr>
      <tr><td>Ургах улирал</td><td>${m.season}</td></tr>
      <tr><td>Ургах орчин</td><td>${m.habitat}</td></tr>
    </table></div>`;
}

/* ===== 2.2–2.5 Хэрэгслүүд ===== */
// --- Хэрэгсэл 1: ангиллын код (2.5 switch, ??, case-insensitive, анхааруулга) ---
function classify(raw) {
  let c = (raw ?? "").trim().toUpperCase();          // ?? : null/undefined бол "" ; toUpperCase: том/жижиг үсэг ялгахгүй
  if (c === "") return { ok: false, msg: "Код оруулна уу (E, C, P)." };
  if (!isNaN(Number(c))) return { ok: false, msg: "Тоо биш, үсэг оруулна уу." };   // 2.2 Number()
  switch (c) {
    case "E": return { ok: true, msg: "E — Идэж болно ✅" };
    case "C": return { ok: true, msg: "C — Болгоомжтой, мэргэжилтнээр шалгуулна ⚠️" };
    case "P": return { ok: true, msg: "P — Хортой ☠️ Хэрэглэж болохгүй" };
    default:  return { ok: false, msg: `"${c}" гэсэн код байхгүй. Зөвхөн E, C, P.` };
  }
}

// --- Хэрэгсэл 2: малгайн хэмжээ (2.4 if/else, ?: ; 2.3 **) ---
function capInfo(raw) {
  const d = Number(raw);                             // string -> number
  if (String(raw).trim() === "" || isNaN(d)) return { ok: false, msg: "Тоо оруулна уу.", types: `${typeof raw} → ${typeof d}` };
  if (d <= 0 || d > 50) return { ok: false, msg: "0-ээс 50 см хүртэл утга оруулна уу.", types: "" };
  let size;                                          // if / else if
  if (d >= 15) { size = "Том"; }
  else if (d >= 8) { size = "Дунд"; }
  else if (d >= 3) { size = "Жижиг"; }
  else { size = "Бүр жижиг"; }
  const pick = (d >= 5 && d <= 15) ? "хураахад тохиромжтой" : "хураахгүй орхино"; // ternary
  const area = (Math.PI * (d / 2) ** 2).toFixed(1);  // ** зэрэг
  return { ok: true, msg: `${size} мөөг (${pick}). Малгайн талбай ≈ ${area} см²`,
           types: `typeof raw = ${typeof raw}, typeof d = ${typeof d}, Boolean(d) = ${Boolean(d)}` };
}

// --- Хэрэгсэл 3: хураалтын тооцоо (2.3 оператор: *, %, /) ---
function harvest(kgRaw, priceRaw) {
  const kg = Number(kgRaw), price = Number(priceRaw);
  if (isNaN(kg) || isNaN(price) || kg <= 0 || price <= 0) return { ok: false, msg: "Жин ба үнийг эерэг тоогоор оруулна уу." };
  const total = kg * price;                          // нийт үнэ
  const grams = Math.round(kg * 1000);
  const packs = Math.floor(grams / 250);             // 250 гр-ын уут
  const rest = grams % 250;                          // үлдэгдэл (% - модуль)
  return { ok: true, msg: `Нийт ${total.toLocaleString()}₮ — ${packs} уут (250 гр) + ${rest} гр үлдэнэ.` };
}

function show(id, r) {
  const el = document.getElementById(id);
  el.className = "res" + (r.ok ? "" : " warn");
  el.innerHTML = (r.ok ? "" : "⚠ ") + r.msg + (r.types ? `<small>${r.types}</small>` : "");
}

function pageTools() {
  app.innerHTML = `
    <h2>Хэрэгсэл</h2>
    <div class="tool"><h3>1. Ангиллын код шалгах</h3>
      <div class="bar"><input id="c1" placeholder="E, C эсвэл P (том/жижиг үсэг)"><button id="b1">Шалгах</button></div>
      <div id="r1"></div></div>
    <div class="tool"><h3>2. Малгайн хэмжээ (см)</h3>
      <div class="bar"><input id="c2" placeholder="Жишээ: 9.5"><button id="b2">Тооцоолох</button></div>
      <div id="r2"></div></div>
    <div class="tool"><h3>3. Хураалтын тооцоо</h3>
      <div class="bar"><input id="c3" placeholder="Жин (кг)"><input id="c4" placeholder="1 кг-ын үнэ (₮)"><button id="b3">Бодох</button></div>
      <div id="r3"></div></div>`;
  const $ = id => document.getElementById(id);
  $("b1").onclick = () => show("r1", classify($("c1").value));
  $("b2").onclick = () => show("r2", capInfo($("c2").value));
  $("b3").onclick = () => show("r3", harvest($("c3").value, $("c4").value));
}
