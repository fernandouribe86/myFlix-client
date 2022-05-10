import React from "react";
import Card from 'react-bootstrap/Card';
import { Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BsFillHeartFill } from 'react-icons/bs';


import { Link } from "react-router-dom";

import MovieCard from '../movie-card/movie-card';


import './movie-view.scss';

export class MovieView extends React.Component {

  state = { hide: ""}

  render() {
    const { movie, onBackClick, directors, genres, favoriteMovies } = this.props;

    let user = localStorage.getItem("user");

    let favorites = this.props.favoriteMovies;

    let selectedMovieId = movie._id;

    // LOOPS FOR MAPPING GENRES AND DIRECTORS
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

    const addFavorite = (e) => {
      axios.post(`https://fernando-myflix-3.herokuapp.com/users/${user}/movies/${movie._id}`)
      .then(response => {
        alert('Movie has been added to your list of favorites');
        this.setState({hide: "hidden"});
      })
      .catch(e=> {
        console.log(e);
      });
    };

    const removeFavorite = (e) => {
      axios.delete(`https://fernando-myflix-3.herokuapp.com/users/${user}/movies/${movie._id}`)
      .then(response => {
        alert('Movie has been removed to your list of favorites');
        this.setState({hide: ""});
      })
      .catch(e=> {
        console.log(e);
      });
    };

    return(
      <Card id="movieViewCard">
        <div id="movie-view">
          <div id="movie-header" >
              <div id="movieTitle">{movie.Title}</div>
              <div id="movieViewHearts">
                    {(JSON.stringify(favorites.find(x => x == selectedMovieId))=== "\"" + selectedMovieId + "\"")?
                      <Button onClick={removeFavorite}  id="heart-filled" variant="outline-none"> 
                        <BsFillHeartFill  id="heartActive"  />
                      </Button>:

                      <Button variant="outline-none" onClick={addFavorite} id="heart-outlined">
                        <BsFillHeartFill id="heartInactive" /> 
                      </Button>
                      }
              </div>
          </div>
          <div className="movie-description">
              <p className="label">Description:</p>
              <p className="value">{movie.Description}</p>
          </div>
          <div id="movie-genre" >
            <p className="label" >Genres:</p>
            <Col lg={12}>
           
              {arr.map(x=>  <Link to={`/genres/${x._id}`}><Button className="value genres" id="genres">{x.Name}</Button></Link>)}
              </Col>
          </div>
          <div id="movie-director">
            <p className="label">Directed By:</p>
            <Col lg={12} id="button-container-directors">
              {directorArr.map(x=> <Link to={`/directors/${x._id}`}><Button className="value directors" id="directors">{x.Name}</Button></Link>)}


          </Col>
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