import { createSelector } from '@ngrx/store';
import { find, map } from 'rxjs/operators';
import { MoviesFeatureSubState } from '../../app.state';

export class MoviesFeatureSelectors {

  public static readonly movies = (state: MoviesFeatureSubState) => state.movies;
  public static readonly isLoading = (state: MoviesFeatureSubState) => state.isLoading;
}


