import React from "react";
import { Link } from "react-router-dom";
import { Col, Row, Card, Button, Container } from "react-bootstrap";

import './profile-view.scss';

export function FavoriteMovies({favoriteMoviesList, removeFav}) {
  return (
    <Container id="favoritesProfile">
   <Row>
     <Col>
      <h4 className="profile-header">Favorite Movies</h4>
     </Col>
    </Row>
   <Row>
       {/* {favoriteMoviesList.map(movie => { */}
         {/* return ( */}<Col>
                <Card.Body>
                  <Card.Title className="profileText"></Card.Title>
                  {/* <Button variant="outline-danger" onClick={() => removeFav(movie._id)}>Remove from Favorites</Button> */}
                  {/* <Link to={`/movies/${movie._id}`}>
                  <Button variant="danger">Details</Button>
                  </Link> */}
                </Card.Body>
           </Col>
         {/* )
       }) */}
       {/* } */}
   </Row>
   </Container>
  )
 }