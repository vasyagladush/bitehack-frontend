import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import pageTitlesEN from "../locales/en/pageTitles.json";
import translationEN from "../locales/en/translation.json";
import validationEN from "../locales/en/validation.json";
import pageTitlesPL from "../locales/pl/pageTitles.json";
import translationPL from "../locales/pl/translation.json";
import validationPL from "../locales/pl/validation.json";

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    debug: false,
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
      lookupQuerystring: "lang",
    },
    resources: {
      en: {
        translation: translationEN,
        validation: validationEN,
        pageTitles: pageTitlesEN,
      },
      pl: {
        translation: translationPL,
        validation: validationPL,
        pageTitles: pageTitlesPL,
      },
    },
    load: "languageOnly",
    fallbackLng: "en",
  });
