import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Parse from "parse";
import "./ThemePractice.css";
import ProgressStepper from "../ProgressStepper/ProgressStepper";
import SpeakBoble from "../../images/Icons/SpeakBoble.svg";
import { useLocation } from "react-router-dom";
import DiamondIcon from "../../images/Icons/Diamond.png";
import CoinIcon from "../../images/Icons/Coin.png";
import { registerPoints } from "../../db/submittingPoints";
import Confetti from "react-confetti";
// prettier-ignore
import { Container, Row, Form, Col, Button, Image } from "react-bootstrap";
// prettier-ignore
import { BsLifePreserver, BsCheckCircle, BsCoin, BsArrowRight } from "react-icons/bs";
import { Gem } from "react-bootstrap-icons";
import { useTranslation } from "react-i18next";
import { currentLanguageCode } from "../../App";
import { getTeacherImage } from "../Utils";

export default function ThemePractice() {
  //Translation and practical setup
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();

  // Parameters passed from the ThemeButton
  const theme = location.state?.themeName;
  const correctAnswers = location.state?.correctAnswers || 0;
  const completionImage = location.state?.completionImage;

  // Theme questions
  const [themeQuestions, setThemeQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = themeQuestions[currentQuestionIndex];
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [allQuestionsCompleted, setAllQuestionsCompleted] = useState(false);
  const [completedBefore, setCompletedBefore] = useState(false);

  // Rewards - coins and points
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const themeCompletionPointReward = 200;
  const themeCompletionCoinReward = 80;
  const [themeBadge, setThemeBadge] = useState(null);

  // Hint
  const [hint, setHint] = useState("");
  const [showHint, setShowHint] = useState(false);

  // Warning
  const [showWarning, setShowWarning] = useState(false);

  // Explanation
  const [showExplanation, setShowExplanation] = useState(false);

  // Motivation
  const [motivationMessage, setMotivationMessage] = useState("");
  const [showMotivation, setShowMotivation] = useState(false);
  const motivationCorrect = [
    t("Correct!"),
    t("Well done!"),
    t("Impressive,"),
    t("Super!"),
    t("Outstanding,"),
    t("Excellent"),
    t("Cool!"),
    t("Groovy,"),
  ];
  const motivationWrong = [
    t("That wasnt quite right. Try to look at your calculations again."),
    t("Math can be hard, but you can do it. Try again."),
    t("Not quite, but you still got this! Try again."),
  ];

  const getRandomMotivation = (motivationArray) => {
    let motivation =
      motivationArray[Math.floor(Math.random() * motivationArray.length)];
    return motivation;
  };

  // Step
  const [currentStep, setCurrentStep] = useState(1);

  // Input
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const fetchThemeQuestions = async () => {
    const Questions = Parse.Object.extend("Questions");
    const query = new Parse.Query(Questions);
    query.equalTo("theme", theme);
    query.equalTo("languageId", currentLanguageCode);
    query.ascending("order");
    try {
      const results = await query.find();
      setThemeQuestions(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const fetchStudentData = () => {
    const student = Parse.User.current();
    setTotalCoins(student.get("coins"));
    setTotalPoints(student.get("total_points"));
  };

  const fetchBadgeForTheme = async () => {
    const Rewards = Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    query.equalTo("type", theme);

    try {
      const badge = await query.first();
      if (badge) {
        setThemeBadge(badge);
      } else {
        console.error("No badge found for the theme.");
      }
    } catch (error) {
      console.error("Error fetching badge:", error);
    }
  };

  const updateUserProgress = async (questionId) => {
    const student = Parse.User.current();
    const Progress = Parse.Object.extend("Progress");
    const query = new Parse.Query(Progress);

    query.equalTo("user_id", student.id);
    query.equalTo("category_name", theme);

    try {
      const progressEntry = await query.first();

      if (progressEntry) {
        let answeredQuestions = progressEntry.get("correct_question_ids") || [];

        if (!answeredQuestions.includes(questionId)) {
          answeredQuestions.push(questionId);

          progressEntry.set("correct_question_ids", answeredQuestions);
          await progressEntry.save();

          student.increment("total_answered_questions");
          await student.save();

          console.log("Progress updated successfully");
        } else {
          console.log("Question already marked as correctly answered.");
        }
      } else {
        console.error("No progress entry found for the user and theme.");
      }
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const toggleHint = () => {
    if (showHint) {
      setShowHint(false);
    } else {
      setShowWarning(false);
      setShowMotivation(false);
      setShowHint(true);
    }
  };

  const isInputAnswerCorrect = (inputAnswer, correctAnswerString) => {
    const correctAnswersArray = correctAnswerString
      .split(", ")
      .map((answer) => answer.trim());
    return correctAnswersArray.includes(inputAnswer.trim().toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const correctAnswerString =
      themeQuestions[currentQuestionIndex]?.get("correct_answer") || "";

    // Have not input value
    if (inputValue.trim() === "") {
      setShowHint(false);
      setShowWarning(true);
    }
    // the input answer is correct
    else if (isInputAnswerCorrect(inputValue, correctAnswerString)) {
      setShowHint(false);
      setShowWarning(false);
      setIsAnswerCorrect(true);
      setShowExplanation(true);
      const randomPositiveMotivation = getRandomMotivation(motivationCorrect);
      setMotivationMessage(randomPositiveMotivation);
      setShowMotivation(true);
      await updateUserProgress(currentQuestion.id);
    }
    // the input answer is NOT correct
    else {
      setShowHint(false);
      setShowWarning(false);
      const randomNegativeMotivation = getRandomMotivation(motivationWrong);
      setMotivationMessage(randomNegativeMotivation);
      setShowMotivation(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < themeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setCurrentStep((prev) => prev + 1);
      setIsAnswerCorrect(false);
      setShowMotivation(false);
      setShowExplanation(false);
      setInputValue("");
    } else {
      setCurrentStep((prev) => prev + 1);
      setAllQuestionsCompleted(true);
      if (!completedBefore) {
        rewardUserForThemeCompletion();
      }
    }
  };

  const rewardUserForThemeCompletion = () => {
    const student = Parse.User.current();
    student.set("total_points", totalPoints + themeCompletionPointReward);
    student.set("coins", totalCoins + themeCompletionCoinReward);
    student.add("reward_badge_ids", themeBadge.id);
    student.save();
    registerPoints(student.id, themeCompletionCoinReward);
  };

  const goToFrontpage = () => {
    history.push("/frontpage");
  };

  useEffect(() => {
    if (correctAnswers <= 6) {
      setCompletedBefore(false);
      fetchStudentData();
      fetchThemeQuestions();
      fetchBadgeForTheme();
      setCurrentStep(correctAnswers + 1);
      setCurrentQuestionIndex(correctAnswers);
    }

    if (correctAnswers === 6) {
      setCompletedBefore(true);
      setCurrentStep(1);
      setCurrentQuestionIndex(0);
    }
  }, []);

  window.onbeforeunload = function() {
    return "Are you sure?";
  };

  useEffect(() => {
    if (currentQuestion) {
      setHint(currentQuestion.get("hint") || "");
    }
  }, [currentQuestion]);

  return (
    <Container>
      {!allQuestionsCompleted && (
        <Container className="outer-container">
          <Col className="question-container">
            <div className="text-section-container">
              <div>
                <h5 className="navbar-brand">
                  <p>
                    <Gem size={20} color="#F4C46B" /> {totalPoints}
                  </p>
                  <p className="coin-logo">
                    <BsCoin size={20} color="#F4C46B" /> {totalCoins}
                  </p>
                </h5>
                <div className="space-between">
                  <h2>{theme}</h2>
                  <ProgressStepper currentStep={currentStep} />
                </div>
                <hr className="line"></hr>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      currentQuestion?.get("description") || "No Question",
                  }}
                ></p>
              </div>
              <div>
                <p
                className="question"
                dangerouslySetInnerHTML={{
                  __html:
                  currentQuestion?.get("question") || "No Question",
                }}
                ></p>
                <Form onSubmit={handleSubmit}>
                  <Form.Group
                    as={Row}
                    controlId="danceMovesInput"
                    className="align-items-center"
                  >
                    <Col className="p-0 d-flex align-items-center">
                      <Form.Control
                        type="text"
                        placeholder={t("type your answer here")}
                        value={inputValue}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={isAnswerCorrect ? "correct-input" : ""}
                      />
                      {isAnswerCorrect && (
                        <BsCheckCircle className="correct-icon" />
                      )}
                    </Col>
                    <Col md="auto" className="p-0">
                      <Button
                        variant="primary"
                        className="hint-btn quiz-btn"
                        onClick={toggleHint}
                        style={{
                          visibility: isAnswerCorrect ? "hidden" : "visible",
                        }}
                      >
                        {t("hint")}
                        <BsLifePreserver className="btn-icon" />
                      </Button>

                      {!isAnswerCorrect && (
                        <Button
                          variant="primary"
                          type="submit"
                          className="sub-btn quiz-btn"
                        >
                          {t("submit")}
                          <BsCheckCircle className="btn-icon" />
                        </Button>
                      )}

                      {isAnswerCorrect && (
                        <Button
                          variant="primary"
                          onClick={handleNext}
                          className="next-btn quiz-btn"
                        >
                          {currentStep < 6
                            ? t("next question")
                            : t("collect rewards")}
                          <BsArrowRight className="btn-icon" />
                        </Button>
                      )}
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </div>

            <div>
              <img
                src={
                  currentQuestion?.get("question_image")?.url() ||
                  "default-image-url.jpg"
                }
                alt="Cover"
                className="cover-image"
              />
            </div>
          </Col>
          <Col md="auto" className="mascot-col">
            <div style={{ display: showHint ? "" : "none" }}>
              <Image src={SpeakBoble} className="speakboble" />
              {hint ? (
                <div className="speakboble-text text-xl-center">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentQuestion?.get("hint") || "No hint",
                    }}
                  />
                </div>
              ) : (
                <div className="speakboble-text">
                  <h2>{t("sorry,")}</h2>
                  <p>{t("theres no hint for this question.")}</p>
                </div>
              )}
            </div>
            <div style={{ display: showWarning ? "" : "none" }}>
              <Image src={SpeakBoble} className="speakboble" />
              <div className="speakboble-text">
                <h2>{t("hold your horses!")}</h2>
                <p>{t("you need to write an answer")}</p>
              </div>
            </div>
            <div style={{ display: showMotivation ? "" : "none" }}>
              <Image src={SpeakBoble} className="speakboble" />
              <div className="speakboble-text">
                <h4>{motivationMessage}</h4>
              </div>
            </div>
            <Image src={getTeacherImage(0)} className="quiz-mascot-img" />
            <div
              className="explanation"
              style={{ display: showExplanation ? "" : "none" }}
            >
              <h2> {t("explanation")} </h2>
              <p
                dangerouslySetInnerHTML={{
                  __html:
                    currentQuestion?.get("explanation") || "No explanation",
                }}
              ></p>
            </div>
          </Col>
        </Container>
      )}
      {allQuestionsCompleted && (
        <div className="d-flex justify-content-center">
          <Confetti></Confetti>
          <Col className="completed-container">
            <div className="completed-text-container">
              <div>
                <h5 className="navbar-brand">
                  <p>
                    <Gem size={20} color="#F4C46B" /> {totalPoints}
                  </p>
                  <p className="coin-logo">
                    <BsCoin size={20} color="#F4C46B" /> {totalCoins}
                  </p>
                </h5>
                <div className="space-between">
                  <h2>{theme}</h2>
                  <ProgressStepper currentStep={currentStep} />
                </div>
                <hr className="line"></hr>
              </div>
              <div className="d-flex flex-column">
                <h2 className="text-center"> {t("Well done!")} </h2>
                <div className="d-flex justify-content-center">
                  <img
                    src={completionImage || "default-image-url.jpg"}
                    alt="Cover"
                    className="completion-image"
                  />
                </div>
                <p
                  className="text-center mt-4 mb-4"
                  dangerouslySetInnerHTML={{
                    __html: completedBefore
                      ? t("you have already solved all problems for this theme")
                      : t("you have solved all problems for this theme"),
                  }}
                ></p>
              </div>
              {!completedBefore && (
                <div className="completion-reward-container">
                  <div className="d-flex justify-content-center">
                    <img
                      src={themeBadge.get("reward_image").url()}
                      alt="Badge"
                      className="badge-icon mt-5"
                    />
                    <p className="reward-title purple mt-4 pt-3">
                      {t("New")} {t("badge")}
                    </p>
                  </div>
                  <div>
                    <img
                      src={CoinIcon}
                      alt="Coin Icon"
                      className="completion-icon"
                    />
                    <p className="reward-title yellow">
                      {themeCompletionCoinReward} {t("coins")}
                    </p>
                  </div>
                  <div>
                    <img
                      src={DiamondIcon}
                      alt="Diamond Icon"
                      className="completion-icon"
                    />
                    <p className="reward-title blue">
                      {themeCompletionPointReward} {t("Point")}
                    </p>
                  </div>
                </div>
              )}
              <div className="d-flex justify-content-center pt-4">
                <Button
                  variant="primary"
                  onClick={goToFrontpage}
                  className="next-btn quiz-btn w-25 "
                >
                  {!completedBefore
                    ? t("collect and return to frontpage")
                    : t("go to frontpage")}
                </Button>
              </div>
            </div>
          </Col>
        </div>
      )}
    </Container>
  );
}
