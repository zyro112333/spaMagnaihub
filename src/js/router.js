// URL-ийн # (hash) өөрчлөгдөхөд ямар page ажиллахыг удирдана
export function initRouter(routes) {
  function renderRoute() {
    const hash = window.location.hash || "#/overview";
    const page = routes[hash];
    if (page) {
      page();
    } else {
      routes["#/404"]?.();
    }
  }
  window.addEventListener("load", renderRoute);
  window.addEventListener("hashchange", renderRoute);
}
