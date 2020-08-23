import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { loadMoviesAction, loadMoviesSuccess, loadMoviesFailure } from '../actions/favourite-movies.actions';
import { MoviesFeatureService } from '../services/movies.service';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class MoviesEffects {
  public loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMoviesAction),
      switchMap(() => {
        return this.service.getMovies().pipe(
          map(movies => {
            return loadMoviesSuccess({movies});
          }),
          catchError(() => {
            return of(loadMoviesFailure({ errorMessage: 'Failed to load movies' }));
          })
        );
      })
    )
  );

  public constructor(private readonly actions$: Actions, private readonly service: MoviesFeatureService) { }
}
