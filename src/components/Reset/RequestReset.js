import { useState, useEffect } from "react";
import Parse from "parse";
import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { Tree, Envelope, ChevronRight } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import "./RequestReset.css";
import { hotjar } from "react-hotjar";
import { useTranslation } from 'react-i18next';

export default function RequestReset() {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const { t } = useTranslation();

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const doRequestPasswordReset = async () => {
    try {
      await Parse.User.requestPasswordReset(email);
      Swal.fire({
        title: t('succes'),
        text:  t('please check') + " " + `${email}` + t('to proceed'),
        icon: "success",
        confirmButtonText: t('ok'),
      });
      return true;
    } catch (error) {
      Swal.fire({
        title: t('error'),
        text: t('an error occured') + `${error.message}` + ". " +t('try again'),
        icon: "error",
        confirmButtonText: t('ok'),
      });
      return false;
    }
  };

  const handleGoBack = (e) => {
    e.preventDefault();
    history.goBack();
  };

  useEffect(() => {
    hotjar.initialize(2944506);
  }, []);

  return (
    <div>
      <Container className="email-container">
        <div className="text-center">
          <Tree size={30} color="#4D4D4D" />
          <h1 className="reset-h1">{t('password recovery')}</h1>
          <p className="reset-p">
          {t('enter the email')} <br />
          {t('click to send')}
          </p>
        </div>
        <Container className="form-container">
          <Row>
            <Col>
              <Form>
                <Form.Group controlId="formEmail" className="upperform">
                  <Form.Control
                    type="email"
                    placeholder={t('enter your email')}
                    onChange={updateEmail}
                  />
                </Form.Group>
                <Button
                  className="send-button"
                  variant="primary"
                  onClick={doRequestPasswordReset}
                >
                  Send <Envelope />
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
      <Button
        className="go-back-button"
        variant="primary"
        onClick={handleGoBack}
      >
        {t('Gå tilbage')} <ChevronRight />
      </Button>
    </div>
  );
}
