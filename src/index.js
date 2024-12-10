import React, { Suspense } from "react"; // Import Suspense from React
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Parse from "parse";
import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import enTranslation from "./locales/en.json"; // English translation file
import daTranslation from "./locales/da.json"; // Danish translation file

Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize(
  "MNDUGjZbPtCERDbrW0dBWjPUh30R9QztjNuQqNu9",
  "21WLo8P29tkA7IXnOwv8slakAEA9tXGnBbXTzqtc"
);

// Translation setup
i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'da'],
    fallbackLng: "da",
    resources: {
      en: { translation: enTranslation },
      da: { translation: daTranslation },
    },
    lng: "da", // Default language
    
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: '/locales/{{lng}}.json', // Correct path to translation files
    },
    debug: true,
  });

ReactDOM.render(
  <React.StrictMode>
    {/* Add Suspense around the App component for the translation to properly work */}
    <Suspense fallback={<div>Loading translations...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
export default i18n;
