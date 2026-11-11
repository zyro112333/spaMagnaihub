import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";
import { mushrooms } from "../data/mushrooms.js";

export function renderOverviewPage() {
  const app = document.getElementById("app");
  const edible = mushrooms.filter((m) => m.code === "E").length;
  const poison = mushrooms.filter((m) => m.code === "P").length;
  const stat = (n, label, cls) => `
    <div class="column is-one-third">
      <div class="box has-text-centered"><p class="title ${cls}">${n}</p><p>${label}</p></div>
    </div>`;
  app.innerHTML = renderPageLayout({
    id: "overview",
    title: t("overview.title"),
    content: `
      <p class="has-text-centered mb-5">${t("overview.welcome")}</p>
      <div class="columns">
        ${stat(mushrooms.length, t("overview.total"), "has-text-primary")}
        ${stat(edible, t("overview.edible"), "has-text-success")}
        ${stat(poison, t("overview.poison"), "has-text-danger")}
      </div>
      <div class="notification is-warning is-light"><i class="fas fa-triangle-exclamation"></i> ${t("overview.warn")}</div>`,
  });
}
