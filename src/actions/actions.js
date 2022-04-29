export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';

// INITIALIZES THE MOVIES LIST WITH MOVIES
export function setMovies(value){
  return { type: SET_MOVIES, value };
}

// FILTERS MOVIES LIST
export function setFilter(value){
  return { type: SET_FILTER, value};
}

