import { mountNavbar } from "./components/navbar.js";
import { mountFooter } from "./components/footer.js";
import { initRouter } from "./router.js";
import { routes } from "./routes.js";

const navbarRoot = document.getElementById("navbar");
mountNavbar(navbarRoot);

const footerRoot = document.getElementById("footer");
mountFooter(footerRoot);

initRouter(routes);
