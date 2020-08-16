import { createReducer, on } from '@ngrx/store';
import { FavouriteMovie } from '../models/favourite-movie.model';
import { updateFavouriteMovies } from '../actions/favourite-movies.actions';

const initialFavouriteMovies = [{ movieId: 1, inFavourites: true }, { movieId: 2, inFavourites: true }];

export const favouriteMoviesReducer = createReducer<FavouriteMovie[]>(initialFavouriteMovies,
  on(updateFavouriteMovies, (state, action) => {
    const newFavouriteMovies = state.concat();
    const movieIndex = newFavouriteMovies.findIndex(c => c.movieId === action.favouriteMovie.movieId);
    movieIndex < 0 ? newFavouriteMovies.push(action.favouriteMovie) : newFavouriteMovies[movieIndex] = action.favouriteMovie;
    return newFavouriteMovies;
  }
  ));
