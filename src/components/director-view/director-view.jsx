import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "../profile-view/favorite-movies";
import axios from 'axios';

import './director-view.scss';

export class DirectorView extends React.Component {

  constructor(){
  super();
  this.state = {
    directors: []
  }
}

  componentDidMount(){
    axios.get('https://fernando-myflix-3.herokuapp.com/directors')
      .then(response => {
        this.setState({
          directors: response.data.find( x => x._id == window.location.href.split("/directors/")[1] ).Name,
          birth: response.data.find( x => x._id == window.location.href.split("/directors/")[1]).Birth,
          death: response.data.find( x => x._id == window.location.href.split("/directors/")[1]).Death,
          bio: response.data.find( x => x._id == window.location.href.split("/directors/")[1]).Bio
      }) 
    })
      .catch(error => {
        console.log(error);
      });
  }



  render() {

    const { director, movie, onBackClick } = this.props;

    return (
      <Card id="directorView">
        <Card.Body>
          <Container>
              <Card.Title id="directorName">{this.state.directors} </Card.Title>
            <p id="life">
              {this.state.birth} - {this.state.death}
              </p>
            <Col>
              <Card.Text id="bioTitle">About </Card.Text>
                <p id="bio">{this.state.bio}</p>
            </Col>

            
          </Container>
          <Container className="d-flex justify-content-between">
            <Button
              id="directorBack"
              type="submit"
              onClick={() => {
                onBackClick();
              }}
            >
              BACK
            </Button>
            <Link to={`/`}>
              <Button id="directorBackToMovies" type="submit">
                BACK TO MOVIES
              </Button>
            </Link>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}