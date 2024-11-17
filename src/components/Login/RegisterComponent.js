import { Container, Form, Col, Row, Button, Spinner } from "react-bootstrap";
import { CardList, Tree, Eye, EyeSlash } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import React, { useState, useEffect } from "react";
import Parse from "parse";
import Swal from "sweetalert2";
import "./RegisterComponent.css";
import { hotjar } from "react-hotjar";
import { useTranslation } from "react-i18next";
import { currentLanguageCode } from "../../App";

export default function RegisterComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [classroomid, setClassroomid] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateClassroom = (e) => {
    setClassroomid(e.target.value);
  };

  const generateRandomEmail = () => {
    const randomEmail = "random" + getRandomInt(1000) + "@email.com";
    return randomEmail;
  };

  const generateProgressTables = async (u) => {
    const query = new Parse.Query("Category");
    let categories = await query.find();

    for (let i = 0; i < categories.length; i++) {
      const categoryName = categories[i].get("name");
      const progressTable = new Parse.Object("Progress");
      progressTable.set("user_id", u.id);
      progressTable.set("category_name", categoryName);
      progressTable.set("correct_question_ids", []);

      // Set the translationId based on the category name
      let translationId;
      switch (categoryName) {
        case "measurement":
          translationId = "da8048cd-e329-40bb-a97c-39de48f5f145";
          break;
        case "number":
          translationId = "7713ddd5-44c1-4de1-a466-a4fc38393a2e";
          break;
        case "geometry":
          translationId = "dd60705c-94da-4891-9257-0f47d49c5d93";
          break;
        case "algebra":
          translationId = "cd8dadd3-1ab1-4222-a450-bdf1c5a6dd53";
          break;
        default:
          translationId = null; // Handle unexpected category names if needed
          break;
      }

      if (translationId) {
        progressTable.set("translationId", translationId);
      }

      await progressTable.save();
    }
  };

  // Creating rows in the progress table in the same manner as the categories
  const generateThemeTables = async (u) => {
    const query = new Parse.Query("Themes");
    query.equalTo("languageId", currentLanguageCode);
    let themes = await query.find();

    console.log("-- Themes", themes);

    for (let i = 0; i < themes.length; i++) {
      const progressTable = new Parse.Object("Progress");
      progressTable.set("user_id", u.id);
      progressTable.set("category_name", themes[i].get("name"));
      progressTable.set("correct_question_ids", []);
      await progressTable.save();
    }
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  /*Signs the user in if there is a password and a username. signUp() checks 
  if the username and email are unique and stores the password securely */
  const handleReg = async (e) => {
    e.preventDefault();
    if (password === "" || username === "") {
      Swal.fire({
        title: t("oops!"),
        text: t("you need to fill out a username and password"),
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    console.log("I am setting the users information");

    setIsLoading(true);

    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    if (email === "" || email === undefined) {
      const randomEmail = generateRandomEmail();
      user.set("email", randomEmail);
    } else {
      user.set("email", email);
    }
    var date = new Date().toLocaleDateString();
    user.add("active_days", date);
    user.add("owned_mascot_ids", "syMxG0A2nM");
    try {
      await user.signUp();

      const classroom = Parse.Object.extend("Classroom");
      const query = new Parse.Query(classroom);
      query.equalTo("classroom_id", classroomid);
      const res = await query.find();

      const student = Parse.User.current();
      query
        .get(res[0]["id"])
        .then((ob) => {
          ob.add("students", student["id"]);
          ob.save();
        })
        .catch((error) => {
          console.log(error);
        });
      await generateProgressTables(user);
      await generateThemeTables(user); // Calling the generateThemeTables function
      history.push("/frontpage");
    } catch (error) {
      Swal.fire({
        title: "Oops!",
        text:
          "Something went wrong while registering you as a user: " +
          error.message +
          " Please try again!",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.log(error.message);
    } finally {
      // Set the loading state back to false once the registration is complete
      setIsLoading(false);
    }
  };

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  return (
    <Container className="login-container">
      <div className="text-center">
        <Tree size={30} color="#4D4D4D" />
        <h1 className="register-h1">{t("welcome!")}</h1>
        <p className="register-p">{t("create a user and play today")}</p>
      </div>
      <Container className="form-container">
        <Row>
          <Col>
            <Form onSubmit={handleReg}>
              <Form.Group controlId="formUserName" className="upperform">
                <Form.Label>{t("username")}</Form.Label>
                <Form.Control
                  type="name"
                  placeholder={t("enter an username")}
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
              <Form.Group controlId="formEmail" className="upperform">
                <Form.Label>{t("parental email (optional)")}</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter an email"
                  onChange={updateEmail}
                />
                <p className="information-text">
                  {t("this email will be used for password recovery")}
                </p>
              </Form.Group>
              {/* <Form.Group>
                <p>{t("choose language")}</p>
                <div className="language-flags">
                  <img
                    src={DanishFlag}
                    alt="Danish Flag"
                    className={`flag-image ${
                      language === "02" ? "selected" : ""
                    }`}
                    onClick={() => handleLanguageChange("02")}
                  />
                  <img
                    src={EnglishFlag}
                    alt="English Flag"
                    className={`flag-image ${
                      language === "01" ? "selected" : ""
                    }`}
                    onClick={() => handleLanguageChange("01")}
                  />
                </div>
              </Form.Group> */}
              <Form.Group controlId="formClassroom" className="upperform">
                <Form.Label>{t("classroom code")} </Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("enter classcode given by teacher")}
                  onChange={updateClassroom}
                />
                <p className="information-text">
                  {t("if no class type noClass")}
                </p>
              </Form.Group>
              <Button
                className="registerbtn"
                variant="primary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> {t("Preparing the app for you")}</span>
                  </>
                ) : (
                  <>
                    {t("register")} <CardList />
                  </>
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
