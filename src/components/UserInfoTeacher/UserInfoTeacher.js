import React, { useState, useEffect, useContext } from "react";
import Parse from "parse";
import Sidebar from "../Sidebar/Sidebar";
import CategoryButton from "../CategoryButton/CategoryButton";
import ThemeButton from "../ThemeButton/ThemeButton";
import { useHistory } from "react-router";
import { Image, Container, Row, Col } from "react-bootstrap";
import { getTeacherImage } from "../Utils";
import "./UserInfoTeacher.css";
import { hotjar } from "react-hotjar";
import { useTranslation } from "react-i18next";
import { fetchBatchTranslations } from "../../db/TranslationRepository";
import { LanguageContext } from "../../App";

export default function UserInfo() {

  // User info and status
  const [username, setUsername] = useState("");

  // Categories
  const [category_names, setCategoryNames] = useState([]);
  const [category_names_translated, setCategoryNamesTranslated] = useState([]);
  const [category_levels, setCategoryLevels] = useState([]);
  const [correct_questions, setCorrectQuestions] = useState([]);

  // Themes
  const [themes, setThemes] = useState([]);
  const [themeAnsweredQuestions, setThemeAnsweredQuestions] = useState({});

  // General
  const history = useHistory();
  const { t } = useTranslation();
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);

  const findCategories = async (id) => {
    // Create a new query for the "Progress" table to find entries based on user_id
    const query = new Parse.Query("Progress");
    query.equalTo("user_id", id);
    query.exists("translationId"); 
    let categoriesIds = await query.find(); // Retrieve all progress entries for the given user_id

    // Initialize arrays to store category data
    let categoryNames = [];
    let categoryNamesTranslated = [];
    let categoryLevels = [];
    let answeredQuestions = [];

    // Loop through the retrieved progress entries to extract relevant data
    for (let i = 0; i < categoriesIds.length; i++) {
      categoryNames.push(categoriesIds[i].get("category_name"));
      categoryNamesTranslated.push(categoriesIds[i].get("translationId"));
      categoryLevels.push(categoriesIds[i].get("current_level"));
      answeredQuestions.push(categoriesIds[i].get("correct_question_ids"));
    }

    // Fetch translations for the category names
    const translatedCategoryNames = await fetchBatchTranslations(
      categoryNamesTranslated,
      currentLanguage
    );

    // Replace category names with translations
    const translatedNamesArray = categoryNamesTranslated.map(
      (id) => translatedCategoryNames[id] || id
    );

    // Set the translated and original category names, levels, and answered question IDs
    setCategoryNames(categoryNames);
    setCategoryNamesTranslated(translatedNamesArray);
    setCategoryLevels(categoryLevels);

    var correctQuestions = [];

    // Loop through each category to fetch and filter questions based on level and category name
    for (let i = 0; i < categoryNames.length; i++) {
      const categoryQuestions = [];
      const qstns = answeredQuestions[i];
      const query = new Parse.Query("Questions");
      query.equalTo("level", categoryLevels[i]);
      query.equalTo("category", categoryNames[i]);
      const retrievedQ = await query.find();

      // Check if the retrieved question IDs match the user's correct question IDs
      retrievedQ.forEach((q) => {
        if (qstns.includes(q.id)) {
          categoryQuestions.push(q.id); // Add the question ID if it's a correct answer
        }
      });

      // Add the correctly answered questions for this category to the main array
      correctQuestions.push(categoryQuestions);
    }

    // Set the state with the correctly answered questions per category
    setCorrectQuestions(correctQuestions);
  };

  const findThemes = async () => {
    const Themes = Parse.Object.extend("Themes");
    const query = new Parse.Query(Themes);
    query.equalTo("languageId", currentLanguage);
    const themesData = await query.find();

    const themesArray = themesData.map((theme) => ({
      name: theme.get("name"),
      thumbnailImage: theme.get("thumbnailImage")?._url,
      translationId: theme.get("translationId"),
      description: theme.get("description"),
      descriptionImage: theme.get("descriptionImage")?._url,
      completionMessage: theme.get("completionMessage"),
      completionImage: theme.get("completionImage")?._url,
      categories: theme.get("categories"),
    }));

    setThemes(themesArray);
  };

  const findAnsweredQuestionsForThemes = async (userId) => {
    try {
      const query = new Parse.Query("Progress");
      query.equalTo("user_id", userId);
  
      const progressEntries = await query.find();
  
      const answeredQuestionsByTheme = {};
  
      // Loop through the retrieved progress entries to extract relevant data for themes
      progressEntries.forEach((entry) => {
        const themeName = entry.get("category_name");
        const correctQuestionIds = entry.get("correct_question_ids");
  
        // Add the correct questions for the theme to the answeredQuestionsByTheme object
        if (answeredQuestionsByTheme[themeName]) {
          // If theme exists, add the new correct question IDs
          answeredQuestionsByTheme[themeName] = [
            ...answeredQuestionsByTheme[themeName],
            ...correctQuestionIds,
          ];
        } else {
          // Otherwise, initialize the theme with the correct question IDs
          answeredQuestionsByTheme[themeName] = correctQuestionIds;
        }
      });
  
      // Update the state with the new theme questions data
      setThemeAnsweredQuestions(answeredQuestionsByTheme);
    } catch (error) {
      console.error("Error finding answered questions for themes:", error);
    }
  };

  const retrieveUser = async (e) => {
    const user = Parse.User.current();
    if (user) {
      var username = user.get("username");
      const userID = user.id;
      setUsername(username);
      findCategories(userID);
      findThemes();
      findAnsweredQuestionsForThemes(userID);
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
                {t("Hey")} {}
                {username}!
              </h1>
              <h3 className="teacher-welcome">
                {t("Welcome back.")} <br />
                {t("Choose a theme or a category to start")}
              </h3>
            </div>
          </Col>
          <Col className="teacher-img-col">
            <div className="teacher-img-div">
              <Image src={getTeacherImage(0)} className="teacher-img" />
            </div>
          </Col>
        </Row>
        {themes && themes.length > 0 && (
          <Row>
            <div className="section-header">
              <h2>{t("Themes")}</h2>
              <div className="chip">{t("New")}</div>
            </div>
          </Row>
        )}
        <Row>
          <div className="theme-row">
            {themes.map((theme, index) => {
              const correctCount =
                themeAnsweredQuestions[theme.name]?.length || 0;

              return (
                <ThemeButton
                  key={index}
                  themeName={theme.name}
                  thumbnailImage={theme.thumbnailImage}
                  descriptionImage={theme.descriptionImage}
                  themeDescription={theme.description}
                  correctAnswers={correctCount}
                  completionImage={theme.completionImage}
                  completionMessage={theme.completionMessage}
                />
              );
            })}
          </div>
        </Row>
        <Row>
          <div className="section-header">
            <h2> {t("Categories")} </h2>
          </div>
        </Row>
        <Row className="category-row">
          <CategoryButton
            category={category_names[0]}
            level={category_levels[0]}
            correct_answers={
              correct_questions ? correct_questions[0]?.length : 0
            }
            categoryNameTranslated={category_names_translated[0]} // Adding the translated category
          />
          <CategoryButton
            category={category_names[1]}
            level={category_levels[1]}
            correct_answers={
              correct_questions ? correct_questions[1]?.length : 0
            }
            categoryNameTranslated={category_names_translated[1]} // Adding the translated category
          />
          <CategoryButton
            category={category_names[2]}
            level={category_levels[2]}
            correct_answers={
              correct_questions ? correct_questions[2]?.length : 0
            }
            categoryNameTranslated={category_names_translated[2]} // Adding the translated category
          />
          <CategoryButton
            category={category_names[3]}
            level={category_levels[3]}
            correct_answers={
              correct_questions ? correct_questions[3]?.length : 0
            }
            categoryNameTranslated={category_names_translated[3]} // Adding the translated category
          />
        </Row>
      </div>
    </Container>
  );
}
