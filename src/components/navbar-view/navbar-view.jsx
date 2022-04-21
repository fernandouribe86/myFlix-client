import React from "react";
import { Container, Nav, Navbar,Button } from "react-bootstrap";
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
        <Container id="navbar-container">
          <div id="navbar-logo-container">
            <img id="navbar-logo" src={logo} alt="myFlix Logo" />
          </div>
          <div id="navbar-contents-container">
              <Navbar.Toggle id="navbar-toggle" aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="navbar-collapse">
                <Nav className="ml-auto">
                  {isAuth() && (
                      <Nav.Link id="profile-link" as={Link} to='/users/username' >
                         {user}
                        </Nav.Link>
                  )}
                  
                  {isAuth() && (
                    <Button className="navlink" variant="link" onClick={() => { onLoggedOut() }} id="logout">Logout</Button>
                  )}
                  {!isAuth() && (
                      <Nav.Link href="/">Sign-in</Nav.Link>
                  )}
                  {!isAuth() && (
                      <Nav.Link href="/register">Sign-up</Nav.Link>
                  )}
                </Nav>
              </Navbar.Collapse>
              </div>
        </Container>

    </Navbar>
  );
}