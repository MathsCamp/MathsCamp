import { Key, Tree, Eye, EyeSlash } from "react-bootstrap-icons";
import { Container, Form, Col, Row, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import Parse from "parse";
import Swal from "sweetalert2";
import "./LoginComponent.css";
import { hotjar } from "react-hotjar";
import { useTranslation } from "react-i18next";

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
        title: "Oops!",
        text: "You need to fill out a username and password",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else if (password.length > 0 || username.length > 0) {
      try {
        const user = await Parse.User.logIn(username, password);
        if (user) {
          var active = await user.get("active_days");
          var date = new Date().toLocaleDateString();
          if (!active.find((element) => element === date)) {
            user.add("active_days", date);
          }
          user.set("practice_timer_count", 1200);
          user.save();
          history.push("/frontpage");
        }
      } catch (error) {
        Swal.fire({
          title: "Oops!",
          text: "The username or password is incorrect!",
          icon: "error",
          confirmButtonText: "OK",
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
        <h1 className="welcome-h1"> {t("welcome back")} </h1>
        <p className="welcome-p"> {t("log in to play")} </p>
      </div>
      <Container className="form-container">
        <Row>
          <Col>
            <Form onSubmit={handleLogUser}>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>{t("username")}</Form.Label>
                <Form.Control
                  type="name"
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
                    placeholder={t("enter a password")}
                    onChange={updatePassword}
                    className="pr-5" // Add padding to the right to make space for the icon
                  />
                  <span
                    className="toggle-password-icon position-absolute"
                    style={{
                      right: "10px",
                      top: "70%",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontWeight: "700"
                    }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </div>
              </Form.Group>
              <Button className="login-button" variant="primary" type="submit">
                Log in <Key size={20} />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
