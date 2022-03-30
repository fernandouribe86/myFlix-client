import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView} from '../movie-view/movie-view';

export class MainView extends React.Component {

  constructor(){
    super();
    this.state = {
      movies: [
          { _id: 1, Title: 'Star Wars Episode IV: A New Hope', Description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.', ImagePath: '../../assets/sw4.jpeg', Genre: 'Sci-Fi', Director: 'George Lucas'},
          { _id: 2, Title: 'INSIDE', Description: 'A musical comedy special shot and performed by Bo Burnham, alone, over the course of a very unusual year.', ImagePath: '../../assets/inside.jpg', Genre: 'Comedy', Director: 'Bo Burnham'},
          { _id: 3, Title: 'COCO', Description: 'Aspiring musician Miguel, confronted with his family\'s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.', ImagePath: '../../assets/coco.jpg', Genre: 'Family', Director: 'Adrian Molina'},
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );
  }
}

export default MainView
