import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'da'],
    fallbackLng: 'da',
    debug: true,
    react: {
      useSuspense: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Correct path to translation files
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
