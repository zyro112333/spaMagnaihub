import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderCalculationPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "calculation",
    title: t("calc.title"),
    containerClass: "container is-max-desktop",
    content: `
      <div class="box">
        <div class="field"><label class="label">${t("calc.kg")}</label><input id="kg" class="input" inputmode="decimal"></div>
        <div class="field"><label class="label">${t("calc.price")}</label><input id="price" class="input" inputmode="decimal"></div>
        <button id="calcBtn" class="button is-primary">${t("calc.btn")}</button>
        <div id="result" class="mt-4"></div>
      </div>`,
  });
  document.getElementById("calcBtn").addEventListener("click", () => {
    const kg = Number(document.getElementById("kg").value);
    const price = Number(document.getElementById("price").value);
    const out = document.getElementById("result");
    if (isNaN(kg) || isNaN(price) || kg <= 0 || price <= 0) {
      out.innerHTML = `<div class="notification is-danger is-light">${t("calc.error")}</div>`;
      return;
    }
    const grams = Math.round(kg * 1000);
    const rows = [
      [t("calc.total"), (kg * price).toLocaleString() + " ₮"],
      [t("calc.packs"), Math.floor(grams / 250)],
      [t("calc.rest"), grams % 250],
      [t("calc.dry"), Math.round(grams * 0.1)],
    ];
    out.innerHTML = `<table class="table is-fullwidth is-striped"><tbody>
      ${rows.map(([k, v]) => `<tr><th>${k}</th><td>${v}</td></tr>`).join("")}</tbody></table>`;
  });
}
