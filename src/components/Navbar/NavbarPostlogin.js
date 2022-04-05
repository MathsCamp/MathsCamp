import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router";
import { DoorOpen, HouseDoor, Trophy } from "react-bootstrap-icons";
import { BsMailbox } from "react-icons/bs";
import Logo from "../../images/Logo/logo-postlogin.svg";
import Parse from "parse";
import "./NavbarPostlogin.css";

export default function NavbarPostlogin() {
  const history = useHistory();

  const handleLogOut = async (e) => {
    e.preventDefault();
    Parse.User.logOut();
    history.push("/");
  };

  const handleHome = (e) => {
    e.preventDefault();
    history.push("/frontpage");
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    history.push("/contact");
  };

  const handleMyPage = (e) => {
    e.preventDefault();
    history.push("/MyPage");
  };

  return (
    <Container fluid className="navbar">
      <Col>
        <div className="logo-container">
          <img
            className="logo"
            src={Logo}
            alt="Logo of a calculator"
            onClick={handleHome}
          ></img>
        </div>
      </Col>
      <Col className="app-name-col-postlogin">
        <h6 className="navbar-brand-postlogin">Maths Camp</h6>
      </Col>
      <Col>
        <div className="btn-toolbar postlogin-toolbar">
          <Button
            className="btn-primary lg ranking-btn-postlogin"
            onClick={handleMyPage}
          >
            Ranking <Trophy size={15} />
          </Button>
          <Button
            className="btn-primary lg home-btn-postlogin"
            onClick={handleHome}
          >
            Home <HouseDoor size={15} />
          </Button>
          <Button
            className="contact-link contact-btn"
            onClick={handleSendEmail}
          >
            Contact <BsMailbox size={15} />
          </Button>
          <Button
            className="btn-primary lg logout-btn-postlogin"
            onClick={handleLogOut}
          >
            Log out <DoorOpen size={15} />
          </Button>
        </div>
      </Col>
    </Container >
  );
}
