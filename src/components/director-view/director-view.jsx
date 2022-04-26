import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "../profile-view/favorite-movies";
import axios from 'axios';

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
      <Card>
        <Card.Body>
          <Container>
              <Card.Title >{this.state.directors} </Card.Title>
            <p>
              {this.state.birth} - {this.state.death}
              </p>
            <Col>
              <Card.Text>Bio: </Card.Text>
                {this.state.bio}
            </Col>

            
          </Container>
          <Container className="d-flex justify-content-between">
            <Button
              className="custom-btn"
              type="submit"
              onClick={() => {
                onBackClick();
              }}
            >
              Go back
            </Button>
            <Link to={`/`}>
              <Button className="custom-btn" type="submit">
                Back to List
              </Button>
            </Link>
          </Container>
        </Card.Body>
      </Card>
    );
  }
}