import React, { useRef, useEffect } from "react";
import emailjs from "emailjs-com";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Tree } from "react-bootstrap-icons";
import "./Contact.css";
import { hotjar } from "react-hotjar";
import Swal from "sweetalert2";

export default function Contact() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_sfq75k1",
        "template_6009aok",
        form.current,
        "user_7OclaIRRNbXghSbtXYdJH"
      )
      .then(
        (result) => {
          Swal.fire({
            title: "Your message was sent!",
            text: "We will get back to you as soon as possible!",
            icon: "success",
            confirmButtonText: "OK",
          });
        },
        (error) => {
          Swal.fire({
            title: "Oops!",
            text: "Something went wrong, try again later!",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      );
    e.target.reset();
  };

  useEffect(() => {
    hotjar.initialize(2701912);
  }, []);

  return (
    <Container fluid className="contact-container">
      <Row className="justify-content-md-center email-row">
        <Col md="8" lg="5" className="email-col">
          <div className="text-center email-text-div">
            <Tree size={30} color="#4D4D4D" />
            <h1 className="welcome-h1">Send us an email</h1>
            <p className="welcome-p">We would love to hear from you</p>
          </div>
          <Form ref={form} action="#" onSubmit={sendEmail}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                name="user_name"
                placeholder="Your name"
                size="md"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                name="user_email"
                placeholder="your@email.com"
                size="md"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                as="textarea"
                name="message"
                placeholder="Send us a message here :)"
                style={{ height: "130px" }}
              />
            </Form.Group>
            <div className="btn-div">
              <Button
                variant="primary"
                type="submit"
                className="sub-btn email-btn"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
