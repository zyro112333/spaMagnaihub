import { t, toggleLanguage } from "../i18n/i18n.js";

export function renderNavbar() {
  const items = [
    ["overview", "fa-circle-question", "has-text-warning"],
    ["search", "fa-magnifying-glass", "has-text-primary"],
    ["calculation", "fa-calculator", "has-text-link"],
    ["safety", "fa-triangle-exclamation", "has-text-danger"],
    ["contact", "fa-address-card", "has-text-info"],
  ];
  return `
    <header class="app-sticky app-shadow">
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="navbar-brand">
            <a class="navbar-item has-text-weight-bold is-uppercase app-logo" href="#/overview">
              <figure class="image"><img src="./img/icon/icon.png" alt="logo" /></figure>
              <p><span class="is-hidden-mobile">${t("nav.brandSpan")}</span> ${t("nav.brand")}</p>
            </a>
            <a class="navbar-burger" role="button" aria-expanded="false" data-target="topNavbar">
              <span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span><span aria-hidden="true"></span>
            </a>
          </div>
          <div class="navbar-menu has-text-weight-semibold has-text-centered" id="topNavbar">
            <div class="navbar-start app-top-navbar-right">
              ${items.map(([key, icon, color]) => `
              <a class="navbar-item" href="#/${key}">
                <span class="icon ${color}"><i class="fas ${icon}"></i></span>
                <span>${t("nav." + key)}</span>
              </a>`).join("")}
            </div>
            <div class="navbar-end">
              <a class="navbar-item" id="langToggle" href="javascript:void(0)">${t("nav.language")}</a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `;
}

export function initNavbar(root) {
  const burger = root.querySelector(".navbar-burger");
  const menu = root.querySelector("#topNavbar");
  burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
    burger.setAttribute("aria-expanded", String(burger.classList.contains("is-active")));
  });
  // Хэл солих: navbar-ыг дахин зурж, одоогийн page-ийг дахин render хийнэ
  root.querySelector("#langToggle").addEventListener("click", () => {
    toggleLanguage();
    mountNavbar(root);
    window.dispatchEvent(new Event("hashchange"));
  });
}

export function mountNavbar(root) {
  if (!root) return;
  root.innerHTML = renderNavbar();
  initNavbar(root);
}
