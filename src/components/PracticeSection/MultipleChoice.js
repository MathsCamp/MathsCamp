import React from "react";
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
import { BsLifePreserver, BsCheckCircle } from "react-icons/bs";
import Mascot from "../../images/Mascots/mascot1.png";

export default function MultipleChoice({
  question,
  category,
  option_A,
  option_B,
  option_C,
  option_D,
  option_E,
  correct_answer,
  hint,
}) {
  return (
    <Container fluid className="multiple-container">
      <Row>
        <Col className="question-col">
          <Card className="title-card">
            <Card.Body className="text-center">
              <Card.Title className="question-description">
                {question}
              </Card.Title>
            </Card.Body>
          </Card>
          <Form>
            <Card className="option-card">
              <Card.Body className="text-center">
                <fieldset className="options-form">
                  <Form.Group as={Row}>
                    <Col sm={0}>
                      <Form.Check
                        type="radio"
                        value={option_A}
                        label={`${option_A}`}
                        name="formHorizontalRadios"
                        id="option1"
                        className="option-text"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option_B}`}
                        name="formHorizontalRadios"
                        id="option2"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option_C}`}
                        name="formHorizontalRadios"
                        id="option3"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option_D}`}
                        name="formHorizontalRadios"
                        id="option4"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option_E}`}
                        name="formHorizontalRadios"
                        id="option5"
                      />
                    </Col>
                  </Form.Group>
                </fieldset>
              </Card.Body>
            </Card>
            <Form.Group as={Row} className="mb-8 mt-8">
              <div className="btn-div">
                <Button className="hint-btn quiz-btn">
                  Hint
                  <BsLifePreserver className="btn-icon" />
                </Button>
                <Button className="submit-btn quiz-btn" type="submit">
                  Submit <BsCheckCircle className="btn-icon" />
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Col>
        <Col md="auto" className="img-col">
          <Image src={Mascot} className="quiz-mascot-img" />
        </Col>
      </Row>
    </Container>
  );
}
