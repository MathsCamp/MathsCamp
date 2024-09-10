import React, { useEffect } from "react";
import { Tree, CardList, Key } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { Container, Button, ButtonToolbar } from "react-bootstrap";
import "./LoginRegisterCard.css";
import "bootstrap/dist/css/bootstrap.css";
import { hotjar } from "react-hotjar";
import { useTranslation } from 'react-i18next';

export default function LoginRegisterCard() {
  const history = useHistory();
  const { t } = useTranslation();

  const handleLogin = (e) => {
    e.preventDefault();
    history.push("/login");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1 className="login-register-h1">
        {t('welcome to')} <br />
        {t('mathscamp')}
        </h1>
        <p className="login-register-p">{t('where exercising your brain is fun')}</p>
      </div>
      <ButtonToolbar className="btn-toolbar login-register-toolbar">
        <Button onClick={handleRegister} className="register-btn landing-btn">
        {t('register')}
          <br />
          <CardList size={70} />
        </Button>
        <Button onClick={handleLogin} className="login-btn landing-btn">
        {t('login')}
          <br />
          <Key size={70} />
        </Button>
      </ButtonToolbar>
    </Container>
  );
}
