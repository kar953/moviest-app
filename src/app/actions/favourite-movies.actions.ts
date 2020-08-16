import { createAction, props } from '@ngrx/store';
import { FavouriteMovie } from '../models/favourite-movie.model';

export const updateFavouriteMovies = createAction('[Movies] Update to favourites',
props<{ favouriteMovie: FavouriteMovie }>());

