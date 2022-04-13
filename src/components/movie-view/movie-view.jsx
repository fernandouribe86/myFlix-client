import React from 'react';
import Card from 'react-bootstrap/Card';

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
    const { movie, onBackClick, director, genre } = this.props;

    return(
      <Card id="movieViewCard">
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} />
          </div>
          <div className="movie-title" >
            <p className="value" id="movieTitle">{movie.Title}</p>
          </div>
          <div className="movie-description">
              <p className="label">Description:</p>
              <p className="value">{movie.Description}</p>
          </div>
          <div className="movie-genre">
            <p className="label" >Genres:</p>
            <a href="#"> 
              <p className="value genres" id="genres">{genre.map(x=>x.Name)}</p> 
            </a>
          </div>
          <div className="movie-director">
            <p className="label">Directed By:</p>
            <a href="#">
              <p className="value directors">{director.map(x=>x.Name)}</p>
              </a>
          </div>
          <div class="button-container">
          <button onClick={() => {onBackClick(null);}} id="backButton">Back</button>
          </div>
        </div>
      </Card>
    );
  }
}