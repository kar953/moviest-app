import { Movie } from '../models/movie.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MOVIES } from './movies-data';
import { Injectable } from '@angular/core';
import { map, filter, tap } from 'rxjs/operators';
import { FavouriteMovie } from '../models/favourite-movie.model';
import { MoviesAppSelectors } from '../selectors/movies-app.selector';
import { Store, select } from '@ngrx/store';
import { MoviesAppState, MoviesFeatureSubState } from '../app.state';
import { loadMoviesAction } from '../actions/favourite-movies.actions';
import { MoviesFeatureSelectors } from '../selectors/feature-selectors/movies.selector';
import { delay } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class MoviesFeatureService {

  public movies$ = this.store.pipe(select(MoviesAppSelectors.MoviesFeatureState),
    select(MoviesFeatureSelectors.movies));

  public isLoading$ = this.store.pipe(select(MoviesAppSelectors.MoviesFeatureState),
  select(MoviesFeatureSelectors.isLoading));

  public constructor( private readonly store: Store<MoviesAppState>) {}

  public fetchMovies(): void {
    this.store.dispatch(loadMoviesAction());
  }

  getMovie(id: number): Observable<Movie>{
    return of(MOVIES.find( movie => movie.id === id));
  }

  getMovies(): Observable <Movie[] > {
    return of(MOVIES).pipe(
      delay(2500)
    );
  }
}

