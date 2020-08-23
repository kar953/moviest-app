import { MOVIES } from '../services/movies-data';
import { MoviesAppState, MoviesFeatureSubState } from '../app.state';
import { Movie } from '../models/movie.model';
import { createReducer, on } from '@ngrx/store';
import { loadMovies, loadMoviesSuccess, loadMoviesFailure } from '../actions/favourite-movies.actions';
import { FavouriteMovie } from '../models/favourite-movie.model';


export const moviesInitialState: MoviesFeatureSubState = {movies: [], isLoading: false};

export const moviesReducer = createReducer<MoviesFeatureSubState>(
  moviesInitialState,
  on(loadMovies, (state) => {
    console.log('in reducer');
    return {
    ...moviesInitialState,
    isLoading: true
  };
}),
  on(loadMoviesSuccess, (state, action) => {
    console.log('loadSuccess reducer', action.movies);
    return {
    ...moviesInitialState,
    movies: action.movies,
    isLoading: false
  };
}),
  on(loadMoviesFailure, (state, {errorMessage}) => ({
    ...moviesInitialState,
    errorMessage,
    isLoading: false
  }))
);

