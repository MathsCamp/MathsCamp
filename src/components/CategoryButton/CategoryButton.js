import React from "react";
import Parse from "parse";
import { Button } from "react-bootstrap";
import "./CategoryButton.css";
import { BsFillFilterSquareFill } from "react-icons/bs";
import { useHistory } from "react-router";
import { useTranslation } from 'react-i18next';

export default function CategoryButton({ category, level, correct_answers }) {
  const history = useHistory();
  const { t } = useTranslation();

  const logActivity = async () => {
    const user = Parse.User.current();
    const userActivity = new Parse.Object("UserActivity");
    userActivity.set("user_id", user.id);
    userActivity.set("activity", "category_click");
    userActivity.set("value", category);
    userActivity.set("level", level);
    await userActivity.save();
  };

  const handlePractice = (e) => {
    e.preventDefault();
    logActivity();
    history.push({
      pathname: "/practice",
      state: category,
    });
  };

  return (
    <Button className="category-button" onClick={handlePractice}>
      <div className="left-div">
        <BsFillFilterSquareFill
          size={40}
          className="category-icon"
          color={"#FF6665"}
        />
        {category}
        <div className="level-div">{level}</div>
      </div>
      <div className="right-div">
        <p> {correct_answers}{t('/7 questions answered!')}</p>
        <div className="progressbar-div">
          <div
            className="progressbar"
            style={{
              backgroundColor: correct_answers >= 1 ? "#ffd27c" : {},
            }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 2 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 3 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 4 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 5 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 6 ? "#ffd27c" : {} }}
          ></div>
          <div
            className="progressbar"
            style={{ backgroundColor: correct_answers >= 7 ? "#ffd27c" : {} }}
          ></div>
        </div>
      </div>
    </Button>
  );
}
