import React, { useEffect, useState } from "react";
import Parse from "parse";
import "./Sidebar.css";
import Swal from "sweetalert2";
import { Button, Image } from "react-bootstrap";
import { BsTrophy, BsX } from "react-icons/bs";
import { useHistory } from "react-router";
import { getMascotImage } from "../Utils";
import { getRewardImage } from "../Utils";
import UserInfoTable from "../UserInfoTable/UserInfoTable";
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const [rewards, setRewards] = useState([]);
  const [owned_rewards, setStudentRewards] = useState([]);
  const [recent_rewards, setRecentRewards] = useState([]);
  const [hasWonReward, setHasWonReward] = useState(false);
  const [username, setUsername] = useState("");
  const [total_points, setTotal_points] = useState(0);
  const [total_coins, setTotal_coins] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);
  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const history = useHistory();
  const { t } = useTranslation();

  const fetchRewards = async () => {
    const Rewards = new Parse.Object.extend("Reward");
    const query = new Parse.Query(Rewards);
    query.ascending();
    const result = await query.find();
    setRewards(result);
  };

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    return mascotIndex;
  };

  const handleChangeMascot = (e) => {
    e.preventDefault();
    history.push("/mascot");
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const retrieveStudent = async () => {
    const student = Parse.User.current();
    if (student) {
      var username = student.get("username");
      var total_points = student.get("total_points");
      var totalCoins = student.get("coins");
      var total_answered_questions = student.get("total_answered_questions");
      var active_days = student.get("active_days");
      var wonRewardId = getActiveDayReward(active_days.length);
      var rewards = student.get("reward_badge_ids");
      var activeMascot = student.get("active_mascot_id");
      var activeMascotIndex = await fetchMascots(activeMascot);
      setActiveMascotIndex(activeMascotIndex);
      setUsername(username);
      setTotal_points(total_points);
      setTotal_coins(totalCoins);
      set_active_days(active_days);
      setTotal_answered_questions(total_answered_questions);
      if (wonRewardId !== "" && !rewards.includes(wonRewardId)) {
        student.add("reward_badge_ids", wonRewardId);
        student.save();
        rewards = await student.get("reward_badge_ids");
        setHasWonReward(true);
        const points = student.get("total_points");
        const rewardPoints = points + 50;
        student.set("total_points", rewardPoints);
      }
      setStudentRewards(rewards);
      await getRecentRewards(student);
    } else {
      console.log("The user couldn't be retrieved");
      Swal.fire({
        title: t('Oops, something went wrong!'),
        text: t('Please try to refresh the page'),
        icon: "error",
        confirmButtonText: t('ok'),
      });
    }
  };

  const getRecentRewards = async (user) => {
    var rewards = user.get("reward_badge_ids");
    let rewards_owned = [];
    const reward_amount = rewards.length;
    for (var i = reward_amount; i > reward_amount - 3; i--) {
      console.log(rewards[i - 1]);
      rewards_owned.push(rewards[i - 1]);
    }
    setRecentRewards(rewards_owned);
    console.log(rewards);
    console.log(rewards_owned.length);
  };

  useEffect(() => {
    retrieveStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getActiveDayReward = (length) => {
    switch (length) {
      case 2: {
        return "nL66ZyFsgw";
      }
      case 5: {
        return "AIMc67Bzb7";
      }
      case 7: {
        return "PB5OfPZuSH";
      }
      case 11: {
        return "LaClB4CF1m";
      }
      case 15: {
        return "q8qhIKpKOZ";
      }
      default: {
        return "";
      }
    }
  };

  const handleSeeReward = () => {
    history.push("/reward");
  };

  const handleSeeBadgePage = () => {
    history.push("/badgeinfo");
  };

  const handleClose = () => {
    setHasWonReward(false);
  };

  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <div className="user-macot-div">
          <Image
            src={getMascotImage(active_mascot_index)}
            className="user-mascot-img-sb"
          />
        </div>
        <div className="user-info-div">
          <h1 className="username-h1">{username}</h1>
          <Button
            onClick={handleChangeMascot}
            className="user-change-mascot-btn-sb"
            variant="primary"
            type="submit"
          >
            {t('Change mascot!')}
          </Button>
        </div>
      </div>
      <div className="user-strike-div">
        <div className="user-strike-h2-div">
          <h2 className="user-strike-h2-sb">{t('your strikes')}</h2>
        </div>
        <div className="table-div">
          <UserInfoTable
            total_points={total_points}
            total_coins={total_coins}
            active_days={active_days.length}
            total_answered_questions={total_answered_questions}
            total_rewards={owned_rewards.length}
          />
        </div>
      </div>
      {hasWonReward ? (
        <div className="text-center reward_container">
          <p className="reward_message">
          {t('Congratulations! You have won a reward, check it out!')}
          </p>
          <Button className="see_reward_btn" onClick={handleSeeReward}>
          {t('See reward')}<BsTrophy />
          </Button>
          <Button className="close_btn" onClick={handleClose}>
          {t('close')} <BsX size={21} />
          </Button>
        </div>
      ) : (
        <div></div>
      )}
      <div className="user-bagde-div">
        <div className="user-badge-h2-div">
          <h2 className="user-badge-h2-sb">{t('Recent earned badges')}</h2>
        </div>
        <div className="show-bagde-div">
          <span className="pointer-cursor" onClick={handleSeeBadgePage}>
          {t('Click to see all your badges!')}
          </span>
        </div>
        <div className="badge-col text-center" style={{}}>
          {rewards.map((reward) => (
            <div className="reward-image-container" key={reward.id}>
              {recent_rewards.includes(reward.id) ? (
                <img
                  alt="reward"
                  className="unlocked-badge selector"
                  src={getRewardImage(rewards.indexOf(reward))}
                  title={reward.attributes.description}
                  //Take user to reward page on click
                  onClick={handleSeeBadgePage}
                />
              ) : (
                <p></p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
