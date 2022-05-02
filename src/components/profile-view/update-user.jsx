import React from "react";
import { Form, Button, Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";

export function UpdatedUser(props){
  const user = props.userdata
  const { handleSubmit, handleUpdate} = props;

  const deleteProfile = (e) => {
    axios.delete(`https://fernando-myflix-3.herokuapp.com/users/${userdata.Username}`)
    .then(response => {
      alert('Your profile has beeen deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token')

      window.open('/', '_self');
    })
    .catch(e => {
      console.log(e);
    });
  }
  
  return (
    <Container>
      <Col lg={12}>
        <Row>
          <Card id="userUpdateCard">
      <Card.Title id="profile-header">Update Profile</Card.Title>
          
      <Form  onSubmit={(e) =>handleSubmit(e)} >
    
        <Form.Group controlId="formUsername" >
          <Form.Label id="profile-label">Username:</Form.Label>
          <Form.Control id="form-field"
           type='text'
           name='Username'
           defaultValue={user.Username}
           placeholder="New Username"
           onChange={e => handleUpdate(e)} 
           />
        </Form.Group>
       
        <Form.Group controlId="formPassword" >
          <Form.Label id="profile-label">Password:</Form.Label>
          <Form.Control id="form-field"
           type='text'
           name='Password'
           placeholder="New Password (required when updating profile info)"
           onChange={e => handleUpdate(e)} 
           />
        </Form.Group>

        <Form.Group controlId="formEmail" >
          <Form.Label id="profile-label">Email:</Form.Label>
          <Form.Control id="form-field"
           type='text'
           name='Email'
           defaultValue={user.Email}
           onChange={e => handleUpdate(e)}         
           />
        </Form.Group>
      
        <Button id="update" variant="primary" type="submit" onClick={handleSubmit}>
          UPDATE
        </Button>

        <Card.Text id="message" >After updating, please log out, then log back in</Card.Text>

        <div id="deleteAccount">
            <Button  id="delete-btn" type="submit" onClick={deleteProfile}>
                DELETE PROFILE
            </Button>
            <Card.Text id="message" >Are you sure? This can't be undone...</Card.Text>
        </div>

    </Form>
    </Card>
    </Row>
    </Col> 
    </Container>
  )
}