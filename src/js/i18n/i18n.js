import { translations } from "./translations.js";

const DEFAULT_LANGUAGE = "en";

export function getCurrentLanguage() {
  return localStorage.getItem("language") || DEFAULT_LANGUAGE;
}

export function setLanguage(language) {
  localStorage.setItem("language", language);
}

export function t(path) {
  const language = getCurrentLanguage();
  const keys = path.split(".");

  let value = translations[language];

  for (const key of keys) {
    value = value?.[key];
  }

  return value ?? path;
}

export function toggleLanguage() {
  const current = getCurrentLanguage();
  const next = current === "mn" ? "en" : "mn";
  setLanguage(next);
  return next;
}
