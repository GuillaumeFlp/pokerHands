import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./locales/en/translation.json";
import translationFR from "./locales/fr/translation.json";

i18n.use(initReactI18next).init({
  // we init with resources
  resources: {
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
  },
  lng: window.env.defaultLanguage || "fr",
  fallbackLng: "fr",
  keySeparator: false, // we use content as keys
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
