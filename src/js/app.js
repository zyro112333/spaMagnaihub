import { renderNavbar, initNavbar } from "./components/navbar.js";
import { initRouter } from "./router.js";
import { routes } from "./routes.js";

const navbarRoot = document.getElementById("navbar");

if (navbarRoot) {
  navbarRoot.innerHTML = renderNavbar();
  initNavbar();
}

initRouter(routes);