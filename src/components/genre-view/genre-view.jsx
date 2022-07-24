import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "../profile-view/favorite-movies";
import axios from 'axios';

import './genre-view.scss'

export class GenreView extends React.Component {

  constructor(){
    super();
    this.state = {
      genres: []
    }
  }
  
    componentDidMount(){
      axios.get('https://fernando-myflix-3.herokuapp.com/genres/')
        .then(response => {
          this.setState({
            genre: response.data.find( x => x._id == window.location.href.split("/genres/")[1] ).Name,
            description: response.data.find( x => x._id == window.location.href.split("/genres/")[1]).Description
        }) 
      })
        .catch(error => {
          console.log(error);
        });
    }
  
  
  
    render() {
  
      const { genre, movie, onBackClick } = this.props;
  
      return (
        <Card id="genreView">
          <Card.Body>
            <Container>
                <Card.Title id="genreTitle">{this.state.genre}</Card.Title>
              <Col>
                <p id="genreDescription">
                {this.state.description}
                </p>
              </Col>
  
              
            </Container>
            <Container className="d-flex justify-content-between">
              <Button
                id="genreBack"
                type="submit"
                onClick={() => {
                  onBackClick();
                }}
              >
                 BACK
              </Button>
              <Link to={`/`}>
                <Button id="genreBackToMovies" type="submit">
                  RETURN TO MOVIES
                </Button>
              </Link>
            </Container>
          </Card.Body>
        </Card>
      );
    }
  }