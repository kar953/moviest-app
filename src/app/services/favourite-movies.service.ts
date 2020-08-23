import {pipe} from 'rxjs';
import { Injectable } from '@angular/core';
import { MoviesAppState } from '../app.state';
import { Store, select } from '@ngrx/store';
import { MoviesAppSelectors } from '../selectors/movies-app.selector';
import { FavouriteMoviesFeatureSelectors } from '../selectors/feature-selectors/favourite-movies.selector';

@Injectable({
  providedIn: 'root'
})
export class FavouriteMoviesService {

 public favouriteMoviesSelector$ = this.store.pipe(select(MoviesAppSelectors.FavouriteMoviesFeatureState),
    select(FavouriteMoviesFeatureSelectors.favouriteMovies));

  constructor( private readonly store: Store<MoviesAppState>) { }
}
