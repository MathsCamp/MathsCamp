import React, { useEffect, useState } from "react";
import "./Ranking.css";
import Parse from "parse";
import { hotjar } from "react-hotjar";
import Leaderboard from "../LeaderboardTable/LeaderboardTable";
import { Table, Image, Button } from "react-bootstrap";
import { getMascotImage } from "../Utils";
import UserInfoTable from "../UserInfoTable/UserInfoTable";
import { GetPoints } from "./GetPoints";
import { useTranslation } from 'react-i18next';

export default function MyPage() {
  const { t } = useTranslation();

  const [students_info, setStudentInfo] = useState([]);

  const [total_points, setTotal_points] = useState(0);
  const [total_coins, setTotal_coins] = useState(0);
  const [active_days, set_active_days] = useState([]);
  const [total_answered_questions, setTotal_answered_questions] = useState(0);
  const [owned_rewards, setStudentRewards] = useState([]);

  const [active_mascot_index, setActiveMascotIndex] = useState(24);
  const user = Parse.User.current();

  const retrieveUser = async (e) => {
    if (user) {
      var total_points = user.get("total_points");
      var totalCoins = user.get("coins");
      var active_days = user.get("active_days");
      var total_answered_questions = user.get("total_answered_questions");
      var rewards = user.get("reward_badge_ids");
      setTotal_points(total_points);
      setTotal_coins(totalCoins);
      set_active_days(active_days);
      setTotal_answered_questions(total_answered_questions);
      setStudentRewards(rewards);
    } else {
      e.preventDefault();
    }
  };

  const fetchMascots = async () => {
    var activeMascot = user.get("active_mascot_id");
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();

    try {
      var mascotIdArray = mascotArray.map((obj) => obj.id);
      var mascotIndex = mascotIdArray.indexOf(activeMascot);
      setActiveMascotIndex(mascotIndex);
    } catch (e) {
      console.log(e);
    }
  };

  const getClassroom = async (filt) => {
    const filtrer = ["today", "week", "all_time"];
    for (let i = 0; i < filtrer.length; i++) {
      let f = filtrer[i];
      if (f === filt) {
        document.getElementById(filt).classList.add("clicked");
      } else {
        document.getElementById(f).classList.remove("clicked");
      }
    }
    const classroom = Parse.Object.extend("Classroom");
    const query = new Parse.Query(classroom);
    query.contains("students", user["id"]);
    const CR = await query.find();
    const students = Parse.Object.extend("User");
    setStudentInfo([]);
    try {
      query
        .get(CR[0]["id"])
        .then(async function (object) {
          const studentids = object.get("students");

          for (let i = 0; i < studentids.length; i++) {
            const points = await GetPoints(studentids[i], filt);

            const q_student = new Parse.Query(students);
            q_student
              .get(studentids[i])
              .then(async function (student) {
                const name = student.get("username");
                const mascotId = student.get("active_mascot_id");
                const user = studentids[i];

                const stud = {
                  userID: user,
                  name: name,
                  mascotid: mascotId,
                  points: points,
                };

                setStudentInfo((students_info) => [...students_info, stud]);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    retrieveUser();
    fetchMascots();
    getClassroom("all_time");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    hotjar.initialize(2944506);
  })

  return (
    <div className="ranking-user-container">
      <div className="ranking-user-info-col">
        <div className="ranking-h1-table">
          <h1 className="ranking-user-welcome-h1"> {t('here is your classroom ranking!')} </h1>
          <div className="button-row">
            <Button
              className="filter-bnt"
              id="today"
              onClick={() => getClassroom("today")}
            >
              {t('today')}
            </Button>
            <Button
              className="filter-bnt"
              id="week"
              onClick={() => getClassroom("week")}
            >
              {t('this week')}
            </Button>
            <Button
              className="filter-bnt"
              id="all_time"
              onClick={() => getClassroom("all_time")}
            >
              {t('all time')}
            </Button>
          </div>
          <div className="ranking-table-div">
            <Table>
              <thead className="thead-light ranking-table-header">
                <tr>
                  <th scope="col" className="ranking-rank">
                  {t('RANK')}
                  </th>
                  <th scope="col" className="rank-mascot">
                  {t('MASCOT')}
                  </th>
                  <th scope="col">{t('NAME')}</th>
                  <th scope="col" className="ranking-points">
                  {t('POINTS')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {students_info
                  .sort(
                    ({ points: previousID }, { points: currentID }) =>
                      currentID - previousID
                  )
                  .slice(0, 10)
                  .map((student, index) => (
                    <tr key={index}>
                      <Leaderboard
                        userid={student.userID}
                        rank={index + 1}
                        username={student.name}
                        current_mascot={student.mascotid}
                        total_points={student.points}
                      />
                    </tr>
                  ))}
                {students_info
                  .sort(
                    ({ points: previousID }, { points: currentID }) =>
                      currentID - previousID
                  )
                  .map((student, index) => {
                    if (student.userID === user["id"] && index > 9) {
                      return (
                        <tr
                          key={index}
                          style={{
                            borderTopWidth: "25px",
                            borderTopStyle: "double",
                          }}
                        >
                          <Leaderboard
                            userid={student.userID}
                            rank={index + 1}
                            username={student.name}
                            current_mascot={student.mascotid}
                            total_points={student.points}
                          />
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="user_information">
          <div className="user-mascot-div">
            <Image
              src={getMascotImage(active_mascot_index)}
              className="user-mascot-img"
            />
          </div>
          <h1 className="user-welcome-h1 user-info-h1"> {t('your strikes')}</h1>
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
      </div>
    </div>
  );
}
