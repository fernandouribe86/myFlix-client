import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { BsFillHeartFill } from 'react-icons/bs';
import { BsHeart } from 'react-icons/bs';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
        <Card id="movieCard">
                  <Card.Img variant="top" src={movie.ImagePath} style={{height: 200}}/>
                <Card.Body>
                  <Card.Title id="cardTitle">{movie.Title}</Card.Title>
                  <Card.Text id="cardText">{movie.Description}</Card.Text>
                  <div id="movieCardFooter">
                    <Button onClick={() => onMovieClick(movie)} variant="link" id="moreButton">...more</Button>
                    <a href="#">
                      <BsFillHeartFill id="heartActive"/>
                    </a>
                    <a href="#" id="heartLink">
                      <BsHeart id="heartInactive" />
                      </a>
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
