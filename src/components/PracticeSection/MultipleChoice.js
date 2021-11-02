import React, { useState, useEffect } from "react";
import Parse from "parse";
import {
  Container,
  Row,
  Form,
  Col,
  Button,
  Card,
  Image,
} from "react-bootstrap";
import "./MultipleChoice.css";
import {
  BsLifePreserver,
  BsCheckCircle,
  BsChevronRight,
  BsFileText,
} from "react-icons/bs";
import SpeakBoble from "../../images/Icons/SpeakBoble.svg";
import { useHistory } from "react-router";
import { getMascotImage } from "../Utils";

export default function MultipleChoice() {
  const [showHint, setShowHint] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState([]);
  const [chosenOption, setChosenOption] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const [hint, setHint] = useState("");
  const [image, setImage] = useState("");
  const [currentQuestionId, setId] = useState("");
  const [total_points, setTotalPoints] = useState(0);
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [active_mascot_index, setActiveMascotIndex] = useState(24);

  const fetchQuestion = async (info) => {
    var activeMascotIndex = await fetchMascots(info.activeMascotId);
    setActiveMascotIndex(activeMascotIndex);
    const query = new Parse.Query("Questions");
    console.log(
      "Retrievestudent returned level: " +
        info.level +
        ", correctids: " +
        info.correct
    );
    query.equalTo("category", info.category);
    query.equalTo("level", info.level);
    try {
      let question = await query.find();
      console.log(question);
      for (let i = 0; i < question.length; i++) {
        const currentId = question[i].id;
        console.log(currentId);
        if (!info.correct.includes(currentId)) {
          console.log("This question is unanswered");
          const correct_answer = question[i].get("correct_answer");
          const description = question[i].get("description");
          const options = question[i].get("options");
          const hint = question[i].get("hint");
          const image = question[i].get("img_src");
          setId(currentId);
          setDescription(description);
          setOptions(options);
          setCorrectAnswer(correct_answer);
          setHint(hint);
          setImage(image);
          break;
        } else {
          console.log("The question was in the correct id array");
        }
      }
    } catch (error) {
      alert(`Error! ${error.message}`);
    }
  };

  const retrieveStudent = () => {
    const category = getRandomCategory();
    const student = Parse.User.current();
    if (student) {
      const total_points = student.get("total_points");
      const level = student.get(category + "_level");
      const correct = student.get(category + "_correct_ids");
      console.log("Student retrieved correctids: " + correct);
      setTotalPoints(total_points);
      setCategory(category);
      var activeMascotId = student.get("active_mascot_id");
      return { level, correct, category, activeMascotId };
    } else {
      alert("The user couldn't be retrieved");
    }
  };

  const fetchMascots = async (active_mascot_id) => {
    const Mascots = new Parse.Object.extend("Mascot");
    const query = new Parse.Query(Mascots);
    const mascotArray = await query.find();
    var mascotIdArray = mascotArray.map((obj) => obj.id);
    var mascotIndex = mascotIdArray.indexOf(active_mascot_id);
    console.log(mascotIndex + " " + active_mascot_id);
    return mascotIndex;
  }

  useEffect(() => {
    fetchQuestion(retrieveStudent());
  }, []);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //Returns a random category
  const getRandomCategory = () => {
    const categories = [
      "number",
      "algebra",
      "measurement",
      //"statistics",
      "geometry",
    ];
    const randomNumber = getRandomInt(4);
    const category = categories[randomNumber];
    console.log("Category: " + category);
    return category;
  };

  const handleChange = (e) => {
    setChosenOption(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      const student = Parse.User.current();
      if (student) {
        if (correct_answer === chosenOption) {
          var new_total_points = total_points + 5;
          student.set("total_points", new_total_points);
          student.add(category + "_correct_ids", currentQuestionId);
          console.log(currentQuestionId);
          await student.save();
          var correct = student.get(category + "_correct_ids");
          console.log("Added to the database in submit: " + correct);
          console.log("The answer is correct!");
        } else {
          console.log("The answer is NOT correct!");
        }
        student.increment("total_answered_questions");
        await student.save();
      }
    } catch (error) {
      alert("Could not submit your answer, try again!");
    }
  };

  return (
    <Container fluid className="multiple-container">
      <Row>
        <Col md="auto" className="question-img-col">
          <Image src={image} />
        </Col>
        <Col className="question-col">
          <Card className="title-card">
            <Card.Body className="text-center">
              <Card.Title className="question-description">
                {description}
              </Card.Title>
            </Card.Body>
          </Card>
          <Form>
            <Card className="option-card">
              <Card.Body className="text-center">
                <fieldset className="options-form">
                  <Form.Group as={Row}>
                    <Col className="options">
                      {options.map((option) => (
                        <div key={`${option}`}>
                          <Form.Check
                            type="radio"
                            value={option}
                            label={`${option}`}
                            name="formHorizontalRadios"
                            className="option-text"
                            onChange={handleChange}
                          />
                        </div>
                      ))}
                    </Col>
                  </Form.Group>
                </fieldset>
              </Card.Body>
            </Card>

            <Form.Group as={Row} className="mb-8 mt-8">
              {submitted ? (
                <div className="btn-div">
                  <Button className="expl-btn quiz-btn">
                    Explanation
                    <BsFileText className="btn-icon" />
                  </Button>
                  <Button
                    className="next-btn quiz-btn"
                    onClick={() => fetchQuestion(retrieveStudent())}
                    type="submit"
                  >
                    Next question
                    <BsChevronRight className="btn-icon" />
                  </Button>
                </div>
              ) : (
                <div className="btn-div">
                  <Button className="hint-btn quiz-btn" onClick={setShowHint}>
                    Hint
                    <BsLifePreserver className="btn-icon" />
                  </Button>
                  <Button
                    id="sub-btn"
                    className="sub-btn quiz-btn"
                    onClick={handleSubmit}
                    type="submit"
                  >
                    Submit <BsCheckCircle className="btn-icon" />
                  </Button>
                </div>
              )}
            </Form.Group>
          </Form>
        </Col>
        <Col md="auto" className="img-col">
          <div style={{ display: showHint ? "" : "none" }}>
            <Image src={SpeakBoble} className="speakboble" />
            <div className="speakboble-text">
              <p>{hint}</p>
            </div>
          </div>
          <Image src={getMascotImage(active_mascot_index)} className="quiz-mascot-img" />
        </Col>
      </Row>
    </Container>
  );
}
