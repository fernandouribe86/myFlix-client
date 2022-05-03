import React from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import axios from 'axios';
import { propTypes } from "prop-types";
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';

import { Link } from "react-router-dom";

import './profile-view.scss';
import { render } from "react-dom";

class UserData extends React.Component {

  render()
  {
    const userdata = this.props.userdata;

    let arr = [];

  this.props.movies.forEach(x=> {
    userdata.Favorites.forEach( y => {
      if (x._id == y) { arr.push(x) }
    })
  })

  console.log(arr);

    return (
      <Col fluid lg={7}>
        <Row>
          <Card id="userDataCard" style={{ textAlign: 'center', marginTop: 20 }}>
            <Card.Title id="profile-header" style={{marginTop: 10}} >My Profile</Card.Title>
            <Card.Body >
            <label id="profile-label">Username:</label><p id="profile-text"> {userdata.Username}</p>
            <label id="profile-label">Email:</label><p id="profile-text"> {userdata.Email}</p>
            <label id="profile-label">Birthday:</label><p id="profile-text"> {userdata.Birthday}</p>
            <label id="profile-label">Favorites:</label>
            <p id="profile-text"> 
              {userdata.Favorites}      <Button>Test</Button>     </p>

              <p>Test 2 {arr.map(x=>  <Link to={`/movies/${x._id}`}><Button className="value movies" id="movies"> {x.Title}</Button> </Link>)}</p>

              {/* <Button variant="outline-danger">Remove from Favorites</Button> */}


            </Card.Body>
          </Card>
        </Row>
      </Col>
    );
  
    }};

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies } )(UserData);