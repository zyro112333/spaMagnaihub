import { t } from "../i18n/i18n.js";
import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderSafetyPage() {
  const app = document.getElementById("app");
  app.innerHTML = renderPageLayout({
    id: "safety",
    title: t("safety.title"),
    content: `<div class="content"><ol>${t("safety.rules").map((r) => `<li>${r}</li>`).join("")}</ol></div>`,
  });
}
