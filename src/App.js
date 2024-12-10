import React, { createContext, useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FrontPage from "./pages/FrontPage";
import PracticePage from "./pages/PracticePage";
import EditMascotPage from "./pages/EditMascotPage";
import RewardPage from "./pages/RewardPage";
import Request from "./pages/Reset";
import BadgeInfoPage from "./pages/BadgeInfoPage";
import Break from "./pages/BreakPage";
import ContactPage from "./pages/ContactPage";
import Ranking from "./pages/Ranking";
import ThemePage from "./pages/ThemePage";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/rubik";
import "@fontsource/solway";
import i18n from "i18next";

export const LanguageContext = createContext();

function App() {
  // Initialize language from localStorage or default to "da"
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    return localStorage.getItem("appLanguage") || "da";
  });

  // Function to change language and persist it in localStorage
  const changeLanguage = (langCode) => {
    setCurrentLanguage(langCode);
    localStorage.setItem("appLanguage", langCode); // Persist to localStorage, because for some reason, i18n localstorage variable can't be accessed or changed
  };

  // Synchronize i18n lang whenever the language changes
  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage]);


  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/frontpage" component={FrontPage} />
            <Route exact path="/practice" component={PracticePage} />
            <Route exact path="/theme" component={ThemePage} />
            <Route exact path="/mascot" component={EditMascotPage} />
            <Route exact path="/reward" component={RewardPage} />
            <Route exact path="/requestReset" component={Request} />
            <Route exact path="/break" component={Break} />
            <Route exact path="/badgeinfo" component={BadgeInfoPage} />
            <Route exact path="/contact" component={ContactPage} />
            <Route exact path="/ranking" component={Ranking} />
          </Switch>
        </div>
      </Router>
    </LanguageContext.Provider>
  );
}

export default App;
