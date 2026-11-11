import { t, getCurrentLanguage } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { mushrooms } from "../data/mushrooms.js";

const TAG = { E: "is-success", C: "is-warning", P: "is-danger" };

export function renderSearchPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "search",
    title: t("search.title"),
    content: `
      <div class="field has-addons mb-5">
        <div class="control is-expanded"><input id="q" class="input" placeholder="${t("search.placeholder")}"></div>
        <div class="control"><div class="select">
          <select id="f"><option value="">${t("search.all")}</option>
            ${["E", "C", "P"].map((c) => `<option value="${c}">${t("codes." + c)}</option>`).join("")}
          </select></div></div>
      </div>
      <div id="list" class="columns is-multiline"></div>`,
  });
  const draw = () => {
    const lang = getCurrentLanguage();
    const q = document.getElementById("q").value.trim().toLowerCase();
    const f = document.getElementById("f").value;
    const rows = mushrooms.filter((m) =>
      (m.name[lang].toLowerCase().includes(q) || m.latin.toLowerCase().includes(q)) && (f === "" || m.code === f));
    document.getElementById("list").innerHTML = rows.length
      ? rows.map((m) => `
        <div class="column is-half-tablet is-one-third-desktop">
          <div class="card"><div class="card-content">
            <p class="title is-5"><span class="icon"><i class="fas ${m.icon}"></i></span> ${m.name[lang]}</p>
            <p class="subtitle is-6"><i>${m.latin}</i></p>
            <span class="tag ${TAG[m.code]}">${t("codes." + m.code)}</span>
            <details class="mt-3"><summary>${t("search.more")}</summary>
              <p class="mt-2">${m.text[lang]}</p>
              <ul class="mt-2">
                <li><b>${t("search.cap")}:</b> ${m.cap[0]}–${m.cap[1]} ${t("search.cm")}</li>
                <li><b>${t("search.season")}:</b> ${m.season[lang]}</li>
                <li><b>${t("search.habitat")}:</b> ${m.habitat[lang]}</li>
              </ul></details>
          </div></div>
        </div>`).join("")
      : `<p class="column">${t("search.none")}</p>`;
  };
  document.getElementById("q").addEventListener("input", draw);
  document.getElementById("f").addEventListener("change", draw);
  draw();
}
