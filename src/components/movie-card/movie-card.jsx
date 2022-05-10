import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { BsFillHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';
import axios from 'axios';
import { UserData } from '../profile-view/user-data';

import { Link } from "react-router-dom";

import { MovieView } from '../movie-view/movie-view';

import './movie-card.scss';

export class MovieCard extends React.Component {

  state = { hide: ""}

  render() {
    const { movie, onMovieClick, userdata } = this.props;

    let user = localStorage.getItem("user");

    return (
        <Card id="movieCard">
                  <Card.Img variant="top" src={movie.ImagePath}  id ="poster" style={{width: "100%"}}/>
                <Card.Body>
                  <Card.Title id="cardTitle">{movie.Title}</Card.Title>
                  {/* <Card.Text id="cardText">{movie.Description}</Card.Text> */}
 
                  <div id="movieCardFooter">
                  <Link to={`/movies/${movie._id}`}>
                    <Button variant="link" id="moreButton">...more</Button>
                    </Link>
                </div>
                </Card.Body>
          </Card>

    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
