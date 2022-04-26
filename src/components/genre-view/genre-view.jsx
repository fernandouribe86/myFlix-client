import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FavoriteMovies } from "../profile-view/favorite-movies";
import axios from 'axios';

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
        <Card>
          <Card.Body>
            <Container>
                <Card.Title >{this.state.genre}</Card.Title>
              <Col>
                <p>
                {this.state.description}
                </p>
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
                  Back to Movies List
                </Button>
              </Link>
            </Container>
          </Card.Body>
        </Card>
      );
    }
  }