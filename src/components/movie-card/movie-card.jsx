import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

export class MovieCard extends React.Component {

  state = { hide: ""}

  render() {
    const { movie } = this.props;

    let user = localStorage.getItem("user");

    return (
        <Card id="movieCard">
                  <Card.Img variant="top" src={movie.ImagePath}  id ="poster" style={{width: "100%"}}/>
                <Card.Body>
                  <Card.Title id="cardTitle">{movie.Title}</Card.Title>
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
