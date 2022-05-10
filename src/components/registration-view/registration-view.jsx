import React, {useState} from 'React';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PropTypes from 'prop-types';


import axios from 'axios';

export  function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const [ usernameErr, setUsernameErr ] = useState('');
  const[ passwordErr, setPasswordErr ] = useState('');
  const[ emailErr, setEmailErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
      setUsernameErr('Create Username');
      isReq = false;
    } else if(username.length < 6 ){
      setUsernameErr('Username must be at least 6 characters long');
      isReq = false;
    }
    if(!password){
      setPasswordErr('Create Password (Min 6 characters)')
      isReq = false;
    } else if (password.length < 6){
      setPasswordErr('Password must be at least 6 characters long');
      isReq = false;
    } if(!email) {
      setEmailErr('Must provide an email');
      isReq= false;
    } else if(email.indexOf('@') === -1){
      setEmailErr('Invalid Email');
      isReq = false;
    }

    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
        if(isReq){
      /* Send a request to the server for authentication */
      axios.post('https://fernando-myflix-3.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        alert('Account successfully created! Please login to continue.')
        window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch(e => {
        console.log('error registering the user')
      });
      }
};


  return (
        <Container fluid id="registration-container">
          <Card border="secondary" id="registerCard">
            <Card.Header className="text-center" id="registerHeader">Don't have an account yet?</Card.Header>
              <Row className="justify-content-center">
                <Col lg={4} md={6} sm={8} xs={10}>
                  <Form id="registerFormBody">
                        <Form.Group controlId = "createUsername">
                          <Form.Label>Create a username:*</Form.Label>
                          <Form.Control placeholder="Username" type="text" onChange={e => setUsername(e.target.value)} />
                          {/* code added here to display validation error*/}
                          <div id="login-error">{usernameErr && <p>{usernameErr}</p>}</div>
                        </Form.Group>

                        <Form.Group controlId="createPassword">
                          <Form.Label>Create a password:*</Form.Label>
                          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                          {/* code added here to display validation error*/}
                          <div id="login-error">{passwordErr && <p>{passwordErr}</p>} </div>
                        </Form.Group>

                        <Form.Group controlId="createEmail">
                          <Form.Label>Email:*</Form.Label>
                          <Form.Control type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                          {/* code added here to display validation error*/}
                    <div id="login-error">{emailErr && <p>{emailErr}</p>}</div>
                        </Form.Group>

                        <Form.Group controlId="createBirthday">
                          <Form.Label>Birthday:</Form.Label>
                          <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
                        </Form.Group>
                        <p id="required">* = required</p>
                        <Button type="submit" onClick={handleSubmit} id="RegisterButton">Register</Button>

                    </Form>
                  </Col>
                </Row>
          </Card>
          </Container>
  );
  }

  RegistrationView.propTypes={
    register: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.string.isRequired,
    })
  }
