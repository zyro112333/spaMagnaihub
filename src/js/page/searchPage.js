import { renderPageLayout } from "../layouts/pageLayout.js";

export function renderSearchPage() {
  const app = document.getElementById("app");

  app.innerHTML = renderPageLayout({
    id: "search",
    title: "Search",
    content: `
      <p>Welcome to the Search page.</p>
    `,
  });
}