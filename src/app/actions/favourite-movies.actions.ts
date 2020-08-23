import { createAction, props } from '@ngrx/store';
import { FavouriteMovie } from '../models/favourite-movie.model';
import { Movie } from '../models/movie.model';

export const loadMoviesAction = createAction('[Movies] Load movies');
export const loadMoviesSuccess = createAction('[Movies] Load Movies Success',
props<{movies: Movie[]}>());
export const loadMoviesFailure = createAction('[Movies] Load Movies failure',
props<{errorMessage: string}>());

export const updateFavouriteMovies = createAction('[Movies] Update to favourites',
props<{ favouriteMovie: FavouriteMovie }>());

