// <section class="section">
//      <div class="container">
//          <h1> title </h1>
//          content
//      </div>
// </section>

export function renderPageLayout({
  id = "",
  title = "",
  content = "",
  sectionClass = "section",
  containerClass = "container",
  titleClass = "is-size-4-mobile is-size-3-tablet is-size-2-desktop has-text-weight-semibold has-text-centered txt-h",
}) {
  return `
    <section ${id ? `id="${id}"` : ""} class="${sectionClass}">
      <div class="${containerClass}">
        ${title ? `<h1 class="${titleClass}">${title}</h1>` : ""}
        ${content}
      </div>
    </section>
  `;
}
