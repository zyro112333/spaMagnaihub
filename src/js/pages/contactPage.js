import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderContactPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "contact",
    title: t("contact.title"),
    content: `<p class="has-text-centered">${t("contact.text")}</p>`,
  });
}
