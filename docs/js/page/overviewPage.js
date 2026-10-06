import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderOverviewPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "overview",
    title: "Overview",
    content: `
      <p>Welcome to the overview page.</p>
    `,
  });
}