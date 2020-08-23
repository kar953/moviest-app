import { FavouriteMovie } from './models/favourite-movie.model';
import { Movie } from './models/movie.model';
import { ActionReducerMap } from '@ngrx/store';
import { moviesReducer } from './reducers/movies.reducer';
import { favouriteMoviesReducer } from './reducers/favourite-movies.reducer';

export interface MoviesAppState {
  moviesState: MoviesFeatureSubState;
  favouriteMoviesState: FavouriteMoviesFeatureSubState;
}

export interface FavouriteMoviesFeatureSubState {
  favMovies: FavouriteMovie[];
}

export interface MoviesFeatureSubState {
  movies: Movie[];
  isLoading: boolean;
}


export const reducers: ActionReducerMap<MoviesAppState> = {
  favouriteMoviesState: favouriteMoviesReducer,
  moviesState: moviesReducer
};

