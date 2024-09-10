import React, { useState, useEffect } from "react";
import Parse from "parse";
import Sidebar from "../Sidebar/Sidebar";
import CategoryButton from "../CategoryButton/CategoryButton";
import { useHistory } from "react-router";
import { Button, Image, Container, Row, Col } from "react-bootstrap";
import { BsPerson } from "react-icons/bs";
import { getMascotImage } from "../Utils";
import { getTeacherImage } from "../Utils";
import "./UserInfoTeacher.css";
import { hotjar } from "react-hotjar";
import { async } from "parse/lib/browser/Storage";
import { useTranslation } from 'react-i18next';

export default function UserInfo() {
  const [username, setUsername] = useState("");
  const [total_answered_questions, setTotal_answered_questions] = useState(0);
  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const [category_names, setCategoryNames] = useState([]);
  const [category_levels, setCategoryLevels] = useState([]);
  const [correct_question_ids, setCorrectQuestionIds] = useState([]);
  const [correct_questions, setCorrectQuestions] = useState([]);
  const history = useHistory();
  const { t } = useTranslation();

  const findCategories = async (id) => {
    const query = new Parse.Query("Progress");
    query.equalTo("user_id", id);
    let categoriesIds = await query.find();
    console.log(categoriesIds);
    let categoryNames = [];
    let categoryLevels = [];
    let answeredQuestions = [];
    for (let i = 0; i < categoriesIds.length; i++) {
      categoryNames.push(categoriesIds[i].get("category_name"));
      categoryLevels.push(categoriesIds[i].get("current_level"));
      answeredQuestions.push(categoriesIds[i].get("correct_question_ids"));
    }
    setCategoryNames(categoryNames);
    setCategoryLevels(categoryLevels);
    setCorrectQuestionIds(answeredQuestions);
    var correctQuestions = [];

    for (let i = 0; i < categoryNames.length; i++) {
      const categoryQuestions = [];
      const qstns = answeredQuestions[i];
      console.log(qstns);
      const query = new Parse.Query("Questions");
      console.log(categoryNames[i]);
      query.equalTo("level", categoryLevels[i]);
      query.equalTo("category", categoryNames[i]);
      const retrievedQ = await query.find();
      console.log(retrievedQ);
      retrievedQ.forEach((q) => {
        try {
          if (qstns.includes(q.id)) {
            categoryQuestions.push(q.id);
          }
        } catch (e) {
          console.log(e.message);
        }
      });
      correctQuestions.push(categoryQuestions);
    }
    console.log(correctQuestions);
    setCorrectQuestions(correctQuestions);
  };

  const retrieveUser = async (e) => {
    const user = Parse.User.current();
    if (user) {
      var username = user.get("username");
      const userID = user.id;
      var total_answered_questions = user.get("total_answered_questions");
      var activeMascot = user.get("active_mascot_id");
      var activeMascotIndex = await fetchMascots(activeMascot);
      setUsername(username);
      setTotal_answered_questions(total_answered_questions);
      setActiveMascotIndex(activeMascotIndex);
      findCategories(userID);
    } else {
      e.preventDefault();
      history.push("/login");
    }
  };

  useEffect(() => {
    retrieveUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    return mascotIndex;
  };

  return (
    <Container fluid className="user-container">
      <div className="sidebar-color-container">
        <Sidebar />
      </div>
      <div className="category-div">
        <Row>
          <Col className="welcome-col">
            <div className="teacher-speaker-bubble-div">
              <h1 className="teacher-welcome">
              {t('Hey')} {}
                {username}!
              </h1>
              <h3 className="teacher-welcome">
              {t('Welcome back.')} <br />
              {t('Start practicing by selecting a category below.')}
              </h3>
            </div>
          </Col>
          <Col className="teacher-img-col">
            <div className="teacher-img-div">
              <Image src={getTeacherImage(0)} className="teacher-img" />
            </div>
          </Col>
        </Row>
        <Row className="category-row">
          <CategoryButton
            category={category_names[0]}
            level={category_levels[0]}
            correct_answers={
              correct_questions ? correct_questions[0]?.length : 0
            }
          />
          <CategoryButton
            category={category_names[1]}
            level={category_levels[1]}
            correct_answers={
              correct_questions ? correct_questions[1]?.length : 0
            }
          />
          <CategoryButton
            category={category_names[2]}
            level={category_levels[2]}
            correct_answers={
              correct_questions ? correct_questions[2]?.length : 0
            }
          />
          <CategoryButton
            category={category_names[3]}
            level={category_levels[3]}
            correct_answers={
              correct_questions ? correct_questions[3]?.length : 0
            }
          />
        </Row>
      </div>
    </Container>
  );
}
