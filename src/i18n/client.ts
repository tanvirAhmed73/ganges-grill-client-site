import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import authBn from "./locales/bn/auth.json";
import commonBn from "./locales/bn/common.json";
import authEn from "./locales/en/auth.json";
import commonEn from "./locales/en/common.json";

const STORAGE_KEY = "ganges-locale";

export type I18nLng = "en" | "bn";

function readStoredLng(): I18nLng {
  if (typeof window === "undefined") return "en";
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    if (s === "bn" || s === "en") return s;
  } catch {
    /* ignore */
  }
  return "en";
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { common: commonEn, auth: authEn },
      bn: { common: commonBn, auth: authBn },
    },
    lng: readStoredLng(),
    fallbackLng: "en",
    ns: ["common", "auth"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export function syncI18nLanguage(lng: I18nLng) {
  if (i18n.language === lng) return;
  void i18n.changeLanguage(lng);
}

export default i18n;
