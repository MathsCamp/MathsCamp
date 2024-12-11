import { Key, Tree, Eye, EyeSlash } from "react-bootstrap-icons";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import React, { useState, useEffect, useContext } from "react";
import Parse from "parse";
import Swal from "sweetalert2";
import "./LoginComponent.css";
import { hotjar } from "react-hotjar";
import { LanguageContext } from "../../App";
import { useTranslation } from "react-i18next";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { changeLanguage } = useContext(LanguageContext);
  const history = useHistory();

  const { t } = useTranslation();

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogUser = async (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      Swal.fire({
        title: t("oops"),
        text: t("fill username and password"),
        icon: "error",
        confirmButtonText: t("ok"),
      });
    } else {
      try {
        const user = await Parse.User.logIn(username, password);
        if (user) {
          const active = user.get("active_days") || [];
          const language = user.get("LanguageId") || "da"; // Default to danish
          const date = new Date().toLocaleDateString();

          if (!active.includes(date)) {
            user.add("active_days", date);
          }
          changeLanguage(language); // Change app language based on user preference
          user.set("practice_timer_count", 1200);
          await user.save();
          history.push("/frontpage");
        }
      } catch (error) {
        Swal.fire({
          title: t("oops"),
          text: t("incorrect credentials"),
          icon: "error",
          confirmButtonText: t("ok"),
        });
      }
    }
  };

  const handleResetPassword = () => {
    history.push("/requestReset");
  };

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1 className="welcome-h1">{t("welcome back")}</h1>
        <p className="welcome-p">{t("log in to play")}</p>
      </div>
      <Container className="form-container">
        <Row>
          <Col>
            <Form onSubmit={handleLogUser}>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>{t("username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("enter your username")}
                  onChange={updateUsername}
                />
              </Form.Group>
              <Form.Group
                controlId="formPassword"
                className="upperform position-relative"
              >
                <Form.Label>{t("password")}</Form.Label>
                <div className="password-input-container">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={t("enter your password")}
                    onChange={updatePassword}
                  />
                  <span
                    className="toggle-password-icon position-absolute"
                    style={{
                      right: "10px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontWeight: "700",
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </div>
              </Form.Group>
              <Button className="login-button" variant="primary" type="submit">
                {t("login")} <Key size={20} />
              </Button>
              <Button
                className="reset-password-button mt-2"
                variant="link"
                onClick={handleResetPassword}
              >
                {t("forgot password")}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
