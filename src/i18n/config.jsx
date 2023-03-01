import i18next from "i18next";

i18next.init({
  fallbackLng: "US",
  resources: {
    US: {
      translations: require("../languages/english/translations.json"),
    },
    JP: {
      translations: require("../languages/japanese/translations.json"),
    },
  },
  ns: ["translations"],
  defaultNS: "translations",
  returnObjects: true,
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false, // not needed for react!!
  },
  react: {
    wait: true,
  },
});

i18next.languages = ["zh-Hant", "US"];

export default i18next;
