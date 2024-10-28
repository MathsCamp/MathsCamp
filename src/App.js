import { React, useEffect, useState } from "react";
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
import ThemePage from "./pages/ThemePage"
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import "bootstrap/dist/css/bootstrap.css";
import "@fontsource/rubik";
import "@fontsource/solway";

export let currentLanguageCode = '02'; //02 for danish and 01 for english

function App() {

  return (
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
  );
}

export default App;
