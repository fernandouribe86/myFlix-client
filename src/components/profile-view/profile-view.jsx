import React, { useState, useEffect } from "react";
import {  Button, Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";
import './profile-view.scss';
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import './profile-view.scss';

import UserData from './user-data';
import {UpdatedUser} from './update-user';
import {FavoriteMovies} from './favorite-movies';


export function ProfileView(props) {

  const [userdata, setUserdata] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMoviesList, setFavoriteMoviesList] = useState(props.favoriteMovies);
 

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (cancelToken, username) => {
    axios.get(`https://fernando-myflix-3.herokuapp.com/users/${username}`, {
      cancelToken: cancelToken
    })
      .then(response => {
        console.log(response);
        setUserdata(response.data);
        // setUpdatedUser(response.data)
        // setFavoriteMoviesList(props.movies.filter(m => response.data.Favorites.includes(m._id)));

      })
      .catch(err => {
          console.log(err);
      })
  }



  useEffect(() => {
    let source = axios.CancelToken.source();

    if (token !== null) {
      getUserData(source.token, props.user);
    } else {
      console.log('Not Authorized');
    }

    return() => {
      source.cancel();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://fernando-myflix-3.herokuapp.com/users/${userdata.Username}`, updatedUser)
    .then(response => {
      setUserdata(response.data);
      alert('Profile updated');
    })
    .catch(e => {
      console.log(e);
    });
  }


  const handleUpdate = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value
    });
  }

  const deleteProfile = (e) => {
    axios.delete(`https://fernando-myflix-3.herokuapp.com/users/${userdata.Username}`)
    .then(response => {
      alert('Your profile has beeen deleted');
      localStorage.removeItem('user');
      localStorage.removeItem('token')

      window.open('/', '_self');
    })
    .catch(e => {
      console.log(e);
    });
  }

  const removeFav = (id) => {
    axios.delete(`https://fernando-myflix-3.herokuapp.com/users/${userdata.Username}/movies/${id}`)
        .then(() => {
            // Change state of favoriteMovieList to render component
            setFavoriteMoviesList(favoriteMoviesList.filter(movie => movie._id != id));
        })
        .catch(e => {
            console.log(e);
        });
}

console.log(props.user);
console.log(props.favoriteMovies);

const movies = props.movies;

let favorites = props.favoriteMovies;
// setFavoriteMoviesList(props.favoriteMovies);


    console.log(favorites);
    console.log(movies);

    let favoriteArr = [];

    favoriteMoviesList.forEach( x => {
      movies.forEach( y => {
        if(x == y._id){
          favoriteArr.push(y);
        }
      });
    });

    console.log(favoriteArr);

return (
    
    <Container fluid>
      <div>
        
          <Link to="/">
            <Button id="return">Back to Movies</Button>
          </Link>
        
        </div>
    <Row>
    <Col  lg={7} md={6} sm={12} xs={12} id="profile-view">
      
        {/* Display userdata */}
        {/* <UserData userdata={props.u} /> */}
        
        <Col >
        <Row>
          <Card id="userDataCard" style={{ textAlign: 'center', marginTop: 20 }}>
            <Card.Title id="profile-header" style={{marginTop: 10}} >My Profile</Card.Title>
            <Card.Body >
            <label id="profile-label">Username:</label><p id="profile-text"> {userdata.Username}</p>
            <label id="profile-label">Email:</label><p id="profile-text"> {userdata.Email}</p>
            <label id="profile-label">Birthday:</label><p id="profile-text"> {userdata.Birthday}</p>
            <label id="profile-label">Favorites:</label>

              <p>
                {favoriteArr.map(x=>  
                <Link to={`/movies/${x._id}`}>  
                  <Button className="value movies" id="favoriteMovies"> 
                    {x.Title}
                      </Button> 
                  </Link>)}
                  </p> 

            </Card.Body>
          </Card>
        </Row>
      </Col>

      </Col>
      <Col>
        <UpdatedUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        

        
    </Col>
    </Row>
    </Container>
    
);


}