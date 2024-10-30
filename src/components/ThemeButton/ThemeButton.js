import React, { useState } from "react";
import Parse from "parse";
import { Button, Modal } from "react-bootstrap";
import { BsArrowRight, BsFillPatchCheckFill } from "react-icons/bs";
import "./ThemeButton.css";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";

export default function ThemeButton({
  themeName,
  thumbnailImage,
  descriptionImage,
  themeDescription,
  correctAnswers,
  completionImage
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Loggin the userActivity
  const logActivity = async () => {
    const user = Parse.User.current();
    const userActivity = new Parse.Object("UserActivity");
    userActivity.set("user_id", user.id);
    userActivity.set("activity", "theme_click");
    userActivity.set("value", themeName);
    await userActivity.save();
  };

  // If the themebutton is clicked, it might show modal
  const handleThemeButtonClick = (e) => {
    e.preventDefault();
    //logActivity();
    if (correctAnswers >= 1 && correctAnswers < 6 ) {
      // Directly navigate to the practice page if only one question has been answered
      handleStart();
    } else {
      // Otherwise, open the modal
      setShowModal(true);
    }
  };

  // Close the modal and navigate to the theme practice page
  const handleStart = () => {
    setShowModal(false);
    history.push({
      pathname: "/theme",
      state: { themeName, correctAnswers, completionImage },
    });
  };

  return (
    <>
      <Button className="theme-button" onClick={handleThemeButtonClick}>
        <div className="top-div">
          <img className="theme-image" src={thumbnailImage} alt={themeName} />
        </div>
        <div className="bottom-div">
          <p className="theme-title">
            {themeName}
            {correctAnswers === 6 && (
              <BsFillPatchCheckFill className="completion-icon" />
            )}
          </p>
          <p className="amount-answered">
            {correctAnswers}
            {t("/6 questions answered!")}
          </p>
          <div className="progressbar-section">
            <div className="progressbar-div">
              <div
                className="progressbar"
                style={{
                  backgroundColor: correctAnswers >= 1 ? "#ffd27c" : {},
                }}
              ></div>
              <div
                className="progressbar"
                style={{
                  backgroundColor: correctAnswers >= 2 ? "#ffd27c" : {},
                }}
              ></div>
              <div
                className="progressbar"
                style={{
                  backgroundColor: correctAnswers >= 3 ? "#ffd27c" : {},
                }}
              ></div>
              <div
                className="progressbar"
                style={{
                  backgroundColor: correctAnswers >= 4 ? "#ffd27c" : {},
                }}
              ></div>
              <div
                className="progressbar"
                style={{
                  backgroundColor: correctAnswers >= 5 ? "#ffd27c" : {},
                }}
              ></div>
              <div
                className="progressbar"
                style={{
                  backgroundColor: correctAnswers >= 6 ? "#ffd27c" : {},
                }}
              ></div>
            </div>
          </div>
        </div>
      </Button>

      {/* Modal component */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        className="custom-modal-size"
      >
        <div className="theme-intro-modal">
          <div className="modal-header">
            <h1>{themeName}</h1>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={() => setShowModal(false)}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <p
            dangerouslySetInnerHTML={{ __html: themeDescription }}
            className="description"
          ></p>
          {correctAnswers === 6 && (
            <p className="replay-warning">
              {t("you have already completed this theme")}
            </p>
          )}
          <Button className="contact-link contact-btn" onClick={handleStart}>
            {correctAnswers === 6 ? t("play again") : t("start")}{" "}
            <BsArrowRight size={15} />
          </Button>
        </div>
        <div>
          <img className="theme-image" src={descriptionImage} alt={themeName} />
        </div>
      </Modal>
    </>
  );
}
