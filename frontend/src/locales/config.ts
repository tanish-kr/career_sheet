import i18n from "i18next";
import en from "./en.json";
import ja from "./ja.json";
import { initReactI18next } from "react-i18next";

export const resources = {
  en: { translation: en },
  ja: { translation: ja },
} as const;

i18n.use(initReactI18next).init({
  lng: "ja",
  resources,
  fallbackLng: false,
  returnEmptyString: false,
});

export { i18n };
