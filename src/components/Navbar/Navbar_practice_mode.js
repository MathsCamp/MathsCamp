import React from 'react';
import {Button, Container, Col} from 'react-bootstrap';
import Logo from "../../images/Logo/logo-prelogin.svg";
import { DoorOpen, HouseDoor, Gem } from 'react-bootstrap-icons';
import "./Navbar_practice_mode.css";
import 'bootstrap/dist/css/bootstrap.css';


export default function Navbar_practice_mode(){
    return(
        <Container fluid className="navbar">
            <Col>
                <div className="logo-container">
                    <img className="logo" src={Logo} alt="Logo of a calculator"></img>   
                </div> 
            </Col>
            <Col className="app-name-col">
                <h5 className="navbar-brand"><Gem size={15} color="#F4C46B"/>  600</h5>
            </Col>
            <Col lg={1.5}>
                <div className="btn-toolbar">
                    <Button className="btn-primary lg home-btn">Home <HouseDoor size={15}/></Button>
                    <Button className="btn-primary lg logout-btn">Log out <DoorOpen size={15}/></Button>
                </div>
            </Col>
        </Container>       
    );
}