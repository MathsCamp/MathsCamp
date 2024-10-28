import React, { Suspense } from "react"; // Import Suspense from React
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Parse from "parse";
import i18n from "./translation/i18n";
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en.json'; // English translation file
import daTranslation from './locales/da.json'; // Danish translation file

Parse.serverURL = "https://parseapi.back4app.com/";
Parse.initialize(
  "MNDUGjZbPtCERDbrW0dBWjPUh30R9QztjNuQqNu9",
  "21WLo8P29tkA7IXnOwv8slakAEA9tXGnBbXTzqtc"
);

// Translation setup
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      da: { translation: daTranslation },
    },
    lng: 'da', // Default language
    fallbackLng: 'da', // Fallback language
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

ReactDOM.render(
  <React.StrictMode>
    {/* Add Suspense around the App component */}
    <Suspense fallback={<div>Loading translations...</div>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
export default i18n;