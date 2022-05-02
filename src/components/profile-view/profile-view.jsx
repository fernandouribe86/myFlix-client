import React, { useState, useEffect } from "react";
import {  Button, Col, Row, Card, Container } from "react-bootstrap";
import axios from "axios";
import './profile-view.scss';
import { Nav } from "react-bootstrap";

import './profile-view.scss';

import UserData from './user-data';
import {UpdatedUser} from './update-user';
import {FavoriteMovies} from './favorite-movies';


export function ProfileView(props) {

  const [userdata, setUserdata] = useState({});
  const [updatedUser, setUpdatedUser] = useState({});
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);
 

  let token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getUserData = (cancelToken, username) => {
    axios.get(`https://fernando-myflix-3.herokuapp.com/users/${username}`, {
      cancelToken: cancelToken
    })
      .then(response => {
        console.log(response);
        setUserdata(response.data);
        setUpdatedUser(response.data)
        setFavoriteMoviesList(props.movies.filter(m => response.data.Favorites.includes(m._id)));

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


return (
    
    <Container fluid>
      <div>
        <Button id="return">
          <Nav.Link href="/">Back to Movies</Nav.Link>
        </Button>
        </div>
    <Row>
    <Col med={12} id="profile-view">
     
        {/* Display userdata */}
        <UserData userdata={userdata} />
        <UpdatedUser userdata={userdata} handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
        

        
    </Col>
    {/* Button to delete user */}
    <div>
            <Button className="mb-3" variant="danger" type="submit" style={{margin: 200}} onClick={deleteProfile}>
                Delete Profile
            </Button>
        </div>
    </Row>
    </Container>
    
);


}