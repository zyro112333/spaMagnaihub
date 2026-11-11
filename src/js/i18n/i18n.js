import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "mn";

export function getCurrentLanguage() {
  return localStorage.getItem("language") || DEFAULT_LANGUAGE;
}
export function setLanguage(language) {
  localStorage.setItem("language", language);
}
// t("nav.search") -> тухайн хэлний орчуулга
export function t(path) {
  const keys = path.split(".");
  let value = translations[getCurrentLanguage()];
  for (const key of keys) value = value?.[key];
  return value ?? path;
}
export function toggleLanguage() {
  const next = getCurrentLanguage() === "mn" ? "en" : "mn";
  setLanguage(next);
  return next;
}
