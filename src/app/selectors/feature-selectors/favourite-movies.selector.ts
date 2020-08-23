import { createSelector } from '@ngrx/store';
import { find, map } from 'rxjs/operators';
import { FavouriteMoviesFeatureSubState } from '../../app.state';

export class FavouriteMoviesFeatureSelectors {

  public static readonly favouriteMovies = (p: FavouriteMoviesFeatureSubState) =>
    p.favMovies.filter(movie => movie.inFavourites === true)

  public static readonly movieInFavourites =
    (p: FavouriteMoviesFeatureSubState, props) =>
      p.favMovies.find(movie => movie.movieId === props.id)?.inFavourites
}
