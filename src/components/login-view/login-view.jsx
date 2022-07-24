import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const[ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Username Required');
      isReq = false;
    }else if(username.length < 6) {
      setUsernameErr('Username must be at least 6 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Password Required');
      isReq = false;
    }else if(password.length < 6) {
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq){
    /* Send a request to the server for authentication */
        axios.post('https://fernando-myflix-3.herokuapp.com/login', {
        Username: username,
        Password: password
      })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user');
        alert('Login information incorrect. Please try again.');
      });
    };
  }



  return (
	    <Container fluid id="login-container">
	       <Card border="secondary" id="loginCard">
	       <Card.Header className="text-center" id="loginHeader">Login</Card.Header>
	        <Row className="justify-content-center">
	          <Col lg={4} md={6} sm={8} xs={10}>

	            <Form id="loginFormBody">

	              <Form.Group controlId = "formUsername">
	                  <Form.Label> Username:* </Form.Label>
	                  <Form.Control type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} /> {/* code added here to display validation error*/}
	                  <div id="login-error">{usernameErr && <p>{usernameErr}</p>}</div>
	                </Form.Group>

	                <Form.Group controlId = "formPassword" >
	                    <Form.Label>Password:*</Form.Label>
	                    <Form.Control type="Password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
	                      {/*Code added here to display validation error*/}
	                      <div id="login-error">{passwordErr && <p>{passwordErr}</p>}</div>
	                  </Form.Group>
	                  <p id="required">* = required</p>
	                  <Button variant = "primary" type="submit" onClick={handleSubmit} id="loginButton">Login</Button>
                    <p id="registerCTA">
                      Don't have an account yet?
                    </p>
	                  <Link to={"/register"}>
	                    <Button variant = "secondary" type="button" id="RegisterButton">Create an Account</Button>
	                    </Link>
	              </Form>

	            </Col>
	            </Row>
	            </Card>
	    </Container>
  );
}
