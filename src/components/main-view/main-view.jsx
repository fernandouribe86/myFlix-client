import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { setMovies } from "../../actions/actions";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list'; 

import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view'; 
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from "../profile-view/profile-view";
import { NavbarView } from '../navbar-view/navbar-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './main-view.scss';

class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedMovie: null,
      directors: [],
      genres:[],
      user: null,
    };
  }

  getMovies(token){
    axios.get('https://fernando-myflix-3.herokuapp.com/movies', {
    headers: { Authorization: `Bearer ${token}`}
  })
  .then(response => {
    this.props.setMovies(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
}

  componentDidMount(){
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null){
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }

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

  // setSelectedMovie(newSelectedMovie) {
  //   this.setState({
  //     selectedMovie: newSelectedMovie
  //   });
  // }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {

    let { movies } = this.props;
    
    const { user, selectedMovie, directors, genres} = this.state;

    console.log(movies);

    return(
      <Router>
        <Container>
        <NavbarView user={user} />  
        <Row className="main-view justify-content-md-center">


          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;
           
            return <MoviesList movies={movies}/>;
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />
            return <Col>
            <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:_id" render={({ match, history }) => {
            
            if(!user) return  
            <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
           </Col>
            if(movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <MovieView genres ={this.state.genres} directors={this.state.directors} movie={movies.find(m => m._id === match.params._id)} onBackClick={() => history.goBack()} />
              </Col>
          }} />

          <Route 
            exact path="/directors/:_id" 
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Row>
                      <Col>
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      </Col>
                    </Row>
                  );
                if (movies.length === 0) return <div className="main-view" />;
  
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find((m) => m.Director.Name === match.params.Name)
                          .Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

          <Route 
            exact path="/genres/:_id" 
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Row>
                      <Col>
                        <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      </Col>
                    </Row>
                  );
                if (movies.length === 0) return <div className="main-view" />;
  
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genres.Name === match.params.Name)
                          .Genres
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

          <Route path='/users/:username'
        render={({history, match}) => {
          if(!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
          if(movies.length === 0) return <div className="main-view" />
          return<Col>
          
          <ProfileView history={history} movies={movies} user={user} />
          </Col>
        }} />

          <Route path={'/user-update/${user}'}
        render={({match, history}) => {
          if(!user) return <Redirect to="/" />
          return <Col>
            <UserUpdate user={user}
            onBackClick={() => history.goBack()}/>
          </Col>
        }} />
        
         </Row>
         </Container>
        </Router> 
          
          );    
        }
      }

      let mapStateToProps = state => {
        return { movies: state.movies }
      }

      export default connect(mapStateToProps, { setMovies } )(MainView);

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/

   
    //   <Container>
    //     <Row className ="justify-content-md-center main-view">
    //       {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
    //       {selectedMovie
    //         ? (
    //           <Col md={8}>
    //             <MovieView  director={directors.filter(x=>selectedMovie.Director.includes(x._id) )} genre={genres.filter(x=>selectedMovie.Genres.includes(x._id) )} movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
    //             </Col>
    //         )
    //         : movies.map(movie => (
    //             <Col md={3}>
    //           <MovieCard  key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }}/>
    //           </Col>

    //       ))
    //     }
    //     </Row>
    //     <Row>
    //       <Col>
    //       <button onClick={() => { this.onLoggedOut() }}>Logout</button>
    //       </Col>
    //     </Row>
    //   </Container>
    // };