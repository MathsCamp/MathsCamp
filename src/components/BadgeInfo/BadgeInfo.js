import React, { useEffect, useState, useContext } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Trophy } from "react-bootstrap-icons";
import { BsChevronRight } from "react-icons/bs";
import { useHistory } from "react-router";
import Parse from "parse";
import "./BadgeInfo.css";
import Swal from "sweetalert2";
import { getRewardImage } from "../Utils";
import { hotjar } from "react-hotjar";
import { useTranslation } from "react-i18next";
import { fetchBatchTranslations } from "../../db/TranslationRepository";
import { LanguageContext } from "../../App";

export default function BadgeInfo() {
  const history = useHistory();
  const [rewards, setRewards] = useState([]);
  const [owned_rewards, setStudentRewards] = useState([]);
  const [translations, setTranslations] = useState({});
  const { t } = useTranslation();
  const { currentLanguage } = useContext(LanguageContext);

  //Redirects the user to the frontpage
  const handleGoFrontpage = (e) => {
    e.preventDefault();
    history.push("/frontpage");
  };

  const fetchRewards = async () => {
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    query.containedIn("languageId", [currentLanguage, "any"]);
    const result = await query.find();
    setRewards(result);

    // Extract translationIds to fetch translations
    const translationIds = result.map((reward) => reward.get("description"));

    if (translationIds.length > 0) {
      const fetchedTranslations = await fetchBatchTranslations(
        translationIds,
        currentLanguage
      );
      setTranslations(fetchedTranslations);
    }
  };

  useEffect(() => {
    fetchRewards();
    hotjar.initialize(2944506);
  }, []);

  const retrieveStudent = async () => {
    const student = Parse.User.current();
    if (student) {
      var owned_rewards = student.get("reward_badge_ids");
      setStudentRewards(owned_rewards);
    } else {
      console.log("The user couldn't be retrieved");
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    retrieveStudent();
  }, []);

  return (
    <Container className="rewardi-container">
      <div className="rewardi-point-container">
        <div className="points-div">
          <Trophy color="#F2B84B" size={50} />
          <div className="header-circle">
            <p className="top-point-text text-center">{t("badge library")}</p>
          </div>
        </div>
        <div>
          <Button className="filter-btn" onClick={handleGoFrontpage}>
            {t("go to frontpage")} <BsChevronRight />
          </Button>
        </div>
      </div>
      <Row>
        {rewards.map((reward) => (
          <Col key={reward.id}>
            <Card className="reward-card">
              {owned_rewards.includes(reward.id) ? (
                <Card.Img
                  className="unlocked-card selector"
                  variant="top"
                  src={getRewardImage(rewards.indexOf(reward))}
                />
              ) : (
                <Card.Img
                  className="locked-card selector"
                  variant="top"
                  src={getRewardImage(rewards.indexOf(reward))}
                />
              )}
              <Card.Body className="text-center">
                <Card.Title className="point-text">
                  {translations[reward.get("description")] ||
                    reward.get("description")}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
