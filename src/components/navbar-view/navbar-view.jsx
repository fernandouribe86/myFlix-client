import React from "react";
import { Container, Nav, Navbar,Button, Col, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import './navbar-view.scss';
import logo from '../../hero-assets/myflix-logo-on-white copy.png';
import GiDirectorChair from 'react-icons';


export function NavbarView({user}) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if(typeof window == "undefined") {
      return false;
    }
    if(localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };


  return (
    <Navbar className="main-nav" sticky="top" expand="lg" id="navbar">
          <Col lg={3} md={2} sm={1} xs={1}></Col>
          <Col lg={6} md={8} sm={10} xs={10} id="navbar-container">
          <Nav id="navbar-logo-container">
            <Nav.Link as={Link} to={`/`}>
              <img id="navbar-logo" src={logo} alt="myFlix Logo" />
            </Nav.Link>
          </Nav>
          <div id="navbar-contents-container">
              <Navbar.Toggle id="navbar-toggle" />
              <Navbar.Collapse id="navbar-collapse">
                <Nav className="ml-auto" id="nav-container">
                  {isAuth() && (
                      <Nav.Link id="profile-link" className="nav-item" as={Link} to={`/users/${user}`} >
                         {user}
                        </Nav.Link>
                  )}
                  
                  {isAuth() && (
                    <Button variant="link" onClick={() => { onLoggedOut() }} id="logout" >Logout</Button>
                  )}
                  {!isAuth() && (
                      <Nav.Link href="/" id="signInLink" className="nav-item text-center">Sign-in</Nav.Link>
                  )}
                  {!isAuth() && (
                      <Nav.Link href="/register" id="signUpLink" className="nav-item">Sign-up</Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
              </div>
              </Col>
              <Col lg={3} md={2} sm={1} xs={1}></Col>

    </Navbar>
  );
}