import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

// const mapStateToProps = state => {
//   const { visibilityFilter } = state;
//   return { visibilityFilter };
// };

function MoviesList(props) {
  const { movies } = props;
  let filteredMovies = movies;

  // if (visibilityFilter !== '') {
  //   filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  // }

  if (!movies) return <div className="main-view"/>;

  return <>
    {/* { <Col md={12} >
      {/* <VisibilityFilterInput visibilityFilter={visibilityFilter} /> }
</Col>  */}
    {filteredMovies.map(m => (
      <Col xs={12} sm={10} md={8} lg={6} xl={4} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps)(MoviesList);