import { createReducer, on } from '@ngrx/store';
import { FavouriteMovie } from '../models/favourite-movie.model';
import { updateFavouriteMovies } from '../actions/favourite-movies.actions';
import { FAVOURITE_MOVIES } from '../services/favourite-movies-data';
import { FavouriteMoviesFeatureSubState } from '../app.state';

const initialFavouriteMoviesState = {favMovies: FAVOURITE_MOVIES};

export const favouriteMoviesReducer = createReducer<FavouriteMoviesFeatureSubState>(initialFavouriteMoviesState,
  on(updateFavouriteMovies, (state, action) => {
    const newState = {...state, favMovies: [...state.favMovies]};
    const movieIndex = newState.favMovies.findIndex(c => c.movieId === action.favouriteMovie.movieId);
    movieIndex < 0 ? newState.favMovies.push(action.favouriteMovie) : newState.favMovies[movieIndex] = action.favouriteMovie;
    return newState;
  }
  ));
