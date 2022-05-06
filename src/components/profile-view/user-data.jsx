import React from "react";
import { Col, Row, Card, Button, CardGroup } from "react-bootstrap";
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
    const movies = this.props.movies;

    let favorites = userdata.Favorites;

    console.log(favorites);
    console.log(movies);

    let favoriteArr = [];

    favorites.forEach( x => {
      movies.forEach( y => {
        if(x == y._id){
          favoriteArr.push(y);
        }
      });
    });

    console.log(favoriteArr);

    return (
      <Col >
        <Row>
          <Card id="userDataCard" style={{ textAlign: 'center', marginTop: 20 }}>
            <Card.Title id="profile-header" style={{marginTop: 10}} >My Profile</Card.Title>
            <Card.Body >
            <label id="profile-label">Username:</label><p id="profile-text"> {userdata.Username}</p>
            <label id="profile-label">Email:</label><p id="profile-text"> {userdata.Email}</p>
            <label id="profile-label">Birthday:</label><p id="profile-text"> {userdata.Birthday}</p>
            <label id="profile-label">Favorites:</label>

              <p>
                {favoriteArr.map(x=>  
                <Link to={`/movies/${x._id}`}>  
                  <Button className="value movies" id="favoriteMovies"> 
                    {x.Title}
                      </Button> 
                  </Link>)}
                  </p> 

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