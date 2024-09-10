import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router";
import { VscSmiley } from "react-icons/vsc";
import { BsChevronRight } from "react-icons/bs";
import { Trophy } from "react-bootstrap-icons";
import { getRewardImage } from "../Utils";
import Parse from "parse";
import "./RewardSection.css";
import { hotjar } from "react-hotjar";
import { useTranslation } from "react-i18next";

export default function RewardSection() {
  const [description, setDescription] = useState("");
  const [imgsrc, setImage] = useState("");
  const history = useHistory();
  const { t } = useTranslation();

  //Redirects the user to the page they were on when winning the badge
  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  //Redirects the user to the frontpage with their collection of badges
  const handleCollection = (e) => {
    e.preventDefault();
    history.push("/badgeinfo");
  };

  /*Gets the last element from the user's reward_badge_ids array and uses this to
  retrieve the correct badge image and description from the database*/
  const getReward = async () => {
    const user = Parse.User.current();
    var reward_id;
    if (user) {
      const reward_badge_ids = user.get("reward_badge_ids");
      reward_id = reward_badge_ids.at(-1);
    } else {
      alert("Failed to retrieve the user.");
    }
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    const rewardArray = await query.find();
    query.equalTo("objectId", reward_id);
    const reward = await query.first();
    const description = reward.attributes.description;
    const index = rewardArray.map((element) => element.id).indexOf(reward_id);
    const imgsrc = getRewardImage(index);
    setDescription(description);
    setImage(imgsrc);
    return reward;
  };

  useEffect(() => {
    getReward();
  }, []);

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  return (
    <Container fluid className="reward-container">
      <Row className="reward-row">
        <Col>
          <Image src={imgsrc} style={{ width: 366 }} />
        </Col>
        <Col className="text-div">
          <h2 className="h2-reward">
            {t("Congratulations!")} <br /> {t("You earned a badge")}
          </h2>
          <p className="p-reward">
            {t("You earned your badge for this task:")}
            <br /> <b>{description} </b> <Trophy className="trophy-icon" />{" "}
            <br />
            {t("You also earned 50 points! Good job!")}
            <br />
          </p>
          <div className="button-div ">
            <Button
              className="practice-again-btn quiz_btn"
              onClick={handleCollection}
            >
              {t("See collection")} <VscSmiley className="btn-icon" />
            </Button>
            <Button
              className="go-collection-btn quiz_btn"
              onClick={handleGoBack}
            >
              {t("go back")} <BsChevronRight className="btn-icon" />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
