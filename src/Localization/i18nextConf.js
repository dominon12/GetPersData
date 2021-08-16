import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import translationEn from "./Locales/en/translation.json";
import translationRu from "./Locales/ru/translation.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ru: {
    translation: translationRu,
  },
};

const fallbackLng = "en";
const availableLanguages = ["en", "ru"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    fallbackLng: fallbackLng,
    preload: availableLanguages,

    detection: {
      checkWhitelist: true,
    },

    debug: false,

    whitelist: availableLanguages,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
