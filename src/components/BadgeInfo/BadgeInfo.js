import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Trophy } from "react-bootstrap-icons";
import { BsChevronRight } from "react-icons/bs";
import { VscSmiley } from "react-icons/vsc";
import { useHistory } from "react-router";
import Parse from "parse";
import "./BadgeInfo.css";
import Swal from "sweetalert2";
import { getRewardImage } from "../Utils";
import { hotjar } from "react-hotjar";
import { useTranslation } from 'react-i18next';

export default function BadgeInfo() {
  const history = useHistory();
  const [rewards, setRewards] = useState([]);
  const [owned_rewards, setStudentRewards] = useState([]);
  const { t } = useTranslation();

  //Redirects the user to the frontpage
  const handleGoFrontpage = (e) => {
    e.preventDefault();
    history.push("/frontpage");
  };

  const handleGoQuiz = (e) => {
    e.preventDefault();
    history.push("/practice");
  };

  const fetchRewards = async () => {
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    const result = await query.find();
    setRewards(result);
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
            <p className="top-point-text text-center">{t('badge library')}</p>
          </div>
        </div>
        <div>
          <Button className="go-quiz-btn" onClick={handleGoQuiz}>
          {t('go to quiz')} <VscSmiley />
          </Button>
          <Button className="filter-btn" onClick={handleGoFrontpage}>
          {t('go to frontpage')} <BsChevronRight />
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
                  {reward.attributes.description}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
