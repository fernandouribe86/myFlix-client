import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ newUserUsername, setNewUserUsername ] = useState('');
  const [ newUserPassword, setNewUserPassword ] = useState('');
  const [ newUserBirthday, setNewUserBirthday ] = useState('');
  const [ newUserEmail, setNewUserEmail ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  const handleSubmitNew = (e) => {
    e.preventDefault();
    console.log(newUserUsername, newUserPassword);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(newUserUsername);
  };

  return (
    <Container fluid id="login-container">
       <Card border="secondary" id="loginCard">
       <Card.Header className="text-center" id="loginHeader">Login</Card.Header>
        <Row className="justify-content-center">
          <Col lg={4} md={6} sm={8} xs={10}>
         
            <Form id="loginFormBody">

              <Form.Group controlId = "formUsername">
                  <Form.Label> Username: </Form.Label>
                  <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId = "formPassword" >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>
                  <Button variant = "primary" type="submit" onClick={handleSubmit} id="loginButton">Login</Button>
              </Form>
         
            </Col>
            </Row>
            </Card>
            <Card border="secondary" id="registerCard">
            <Card.Header className="text-center" id="registerHeader">Don't have an account yet?</Card.Header>
              <Row className="justify-content-center">
                <Col lg={4} md={6} sm={8} xs={10}>
                  <Form id="registerFormBody">
                        <Form.Group controlId = "createUsername">
                          <Form.Label>Create a username:</Form.Label>
                          <Form.Control type="text" onChange={e => setNewUserUsername(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="createPassword">
                          <Form.Label>Create a password:</Form.Label>
                          <Form.Control type="password" onChange={e => setNewUserPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="createEmail">
                          <Form.Label>Email:</Form.Label>
                          <Form.Control type="email" onChange={e => setNewUserEmail(e.target.value)} />
                        </Form.Group>
                        
                        <Form.Group controlId="createBirthday">
                          <Form.Label>Birthday:</Form.Label>
                          <Form.Control type="date" onChange={e => setNewUserBirthday(e.target.value)} />
                        </Form.Group>
                        <Button variant = "success" type="submit" onClick={handleSubmitNew} id="registerButton">Register</Button>
                    </Form>
                  </Col>
                </Row>
          </Card>
    </Container>
  );
}