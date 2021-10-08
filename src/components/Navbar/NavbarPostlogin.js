import React from "react";
import { Button, Container, Col, Row } from "react-bootstrap";
import Logo from "../../images/Logo/logo-postlogin.svg";
import "./NavbarPostlogin.css";
import "bootstrap/dist/css/bootstrap.css";
import { DoorOpen, HouseDoor } from "react-bootstrap-icons";

export default function Navbar_postlogin() {
  return (
    <Container fluid className="navbar-postlogin">
      <Row>
        <Col>
          <img
            className="logo-postlogin"
            src={Logo}
            alt="Logo of a calculator"
          ></img>
        </Col>
        <Col className="app-name-col-postlogin">
          <h6 className="navbar-brand-postlogin">Maths Camp</h6>
        </Col>
        <Col>
          <div className="btn-toolbar postlogin-toolbar">
            <Button className="btn-primary lg home-btn-postlogin">
              Home <HouseDoor size={15} />
            </Button>
            <Button className="btn-primary lg logout-btn-postlogin">
              Log out <DoorOpen size={15} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
