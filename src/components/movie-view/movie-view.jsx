import React from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';


import { Link } from "react-router-dom";

import MovieCard from '../movie-card/movie-card';

import './movie-view.scss';

export class MovieView extends React.Component {

  // keypressCallback(event) {
  //   console.log(event.key);
  // }

  // componentDidMount(){
  //   document.addEventListener('keypress', this.keypressCallback);
  // }

  // componentWillUnmount(){
  //   document.removeEventListener('keypress', this.keypressCallback);
  // }

  render() {
    const { movie, onBackClick, directors, genres } = this.props;

    console.log(movie);

  let arr = [];

  genres.forEach(x=> {
    movie.Genres.forEach( y => {
      if (x._id == y) { arr.push(x) }
    })
  })

  let directorArr = []

  directors.forEach(x=> {
    movie.Director.forEach( y => {
      if (x._id == y) { directorArr.push(x) }
    })
  })

console.log(arr);


    return(
      <Card id="movieViewCard">
        <div id="movie-view">
          <div className="movie-poster">
          <Card.Img variant="top" src={movie.ImagePath} />
    
          </div>
          <div className="movie-title" >
            <p className="value" id="movieTitle">{movie.Title}</p>
          </div>
          <div className="movie-description">
              <p className="label">Description:</p>
              <p className="value">{movie.Description}</p>
          </div>
          <div id="movie-genre" >
            <p className="label" >Genres:</p>
           
              {arr.map(x=>  <Link to={`/genres/${x._id}`}><Button className="value genres" id="genres"> {x.Name}</Button> </Link>)}

          </div>
          <div id="movie-director">
            <p className="label">Directed By:</p>
            <div id="button-container-directors">
              {directorArr.map(x=> <Link to={`/directors/${x._id}`}><Button className="value directors" id="directors">{x.Name}</Button> </Link>)}


          </div>
          </div>
          <div class="button-container">
            <Router>
                  <Route path="/movies/:movieId" render={({ match, history }) => {
    return <Col md={8}>
          <MovieCard movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
    </Col>}}>
                  <Link>
                    <Button onClick={() => {onBackClick(null);}} id="backButton">Back</Button>
                  </Link>
              </Route>
          </Router>
          </div>
        </div>
      </Card>
      
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genres: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired,
    }).isRequired,
}).isRequired,
  onBackClick: PropTypes.func.isRequired
};