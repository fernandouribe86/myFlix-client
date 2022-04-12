import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// import './main-view.scss';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      directors: [],
      genres:[],
    };
  }

  componentDidMount(){
    axios.get('https://fernando-myflix-3.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
      axios.get('https://fernando-myflix-3.herokuapp.com/directors')
      .then(response => {
        this.setState({
          directors: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
      axios.get('https://fernando-myflix-3.herokuapp.com/genres')
      .then(response => {
        this.setState({
          genres: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    const { movies, selectedMovie, user, directors, genres} = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if(!user) return <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />;

    //Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;
// console.log(selectedMovie.Director.map(x=>directors.includes(x)) )
    console.log(selectedMovie);
    return (
      <Container>
        <Row className ="justify-content-md-center main-view">
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie
            ? (
              <Col md={8}>
                <MovieView  director={directors.filter(x=>selectedMovie.Director.includes(x._id) )} genre={genres.filter(x=>selectedMovie.Genres.includes(x._id) )} movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                </Col>
            )
            : movies.map(movie => (
                <Col md={3}>
              <MovieCard  key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
              </Col>
          ))
        }
        </Row>
      </Container>
    );
  }
}

export default MainView
