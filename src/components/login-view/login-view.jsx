import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    props.onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group controlId = "formUsername">
          <Form.Label> Username: </Form.Label>
          <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId = "formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant = "primary" type="submit" onClick={handleSubmit}>Login</Button>

      <Form.Group controlId="formRegister">
        <h3>Don't have an account yet?</h3>
        <Form.Group controlId = "createUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" onChange={e => setNewUserUsername(e.target.value)} />
        </Form.Group>

        <Form.Group controlId="createPassword">
          <Form.Label>Password:</Form.Label>
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
        
        <Button variant = "primary" type="submit" onClick={handleSubmitNew}>Register</Button>
      </Form.Group>
    </Form>
  );
}