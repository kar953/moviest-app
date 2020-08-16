import { createSelector } from '@ngrx/store';
import { AppState } from '../../app.state';
import { FavouriteMovie } from '../../models/favourite-movie.model';

export const favouriteMovies = (state: AppState) => state.favouriteMovies;


export const getMovieInFavouriteStatus = createSelector(
  favouriteMovies,
  (allFavouriteMovies: FavouriteMovie[], props) => {
    return allFavouriteMovies.find(movie => movie.movieId === props.id)?.inFavourites;
  }
);

export const getMoviesWithFavouriteStatus = createSelector(
  favouriteMovies,
  (allFavouriteMovies: FavouriteMovie[], props) => {
    return allFavouriteMovies.filter(movie => movie.inFavourites === true);
  }
);
