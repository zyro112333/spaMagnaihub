import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderNotFoundPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "notFound",
    title: t("notFound.title"),
    content: `<p class="has-text-centered">${t("notFound.text")}</p>`,
  });
}
