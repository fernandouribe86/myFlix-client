import React from 'react';
import axios from 'axios';

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import{ RegistrationView } from '../registration-view/registration-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [],
<<<<<<< Updated upstream
      selectedMovie: null
=======
      selectedMovie: null,
      user: '',
      directors:[]
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
  }
=======

      //Directors request
      axios.get('https://fernando-myflix-3.herokuapp.com/directors')
      .then(response => {
        this.setState({
          directors: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });

  

//   //Genres request
//   axios.get('https://fernando-myflix-3.herokuapp.com/genres')
//   .then(response => {
//     this.setState({
//       genres: response.data
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   })
  };
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
    const { movies, selectedMovie } = this.state;
=======
  
    const { movies, selectedMovie, user, directors} = this.state;
    console.log(directors);
    // console.log(genres);

>>>>>>> Stashed changes

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

    if(!user) return <LoginView onLoggedIn={ user => this.onLoggedIn(user)} />;

    //Before the movies have been loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <div className="main-view">
        {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
        {selectedMovie
<<<<<<< Updated upstream
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
=======
          ? <MovieView /*genre={genres.filter(x => selectedMovie.Genre.includes(x._id))}*/ director={directors.filter(x => selectedMovie.Director.includes(x._id))} movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
>>>>>>> Stashed changes
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
         ))
        }
      </div>
    );
  }
}

export default MainView
