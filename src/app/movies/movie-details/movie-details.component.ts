import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesFeatureService } from '../../services/movies.service';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { map, find, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { updateFavouriteMovies } from '../../actions/favourite-movies.actions';
import { BaseComponentDirective } from '../base-component.directive';
import { MoviesAppState } from '../../app.state';
import { MoviesFeatureSelectors } from '../../selectors/feature-selectors/movies.selector';
import { FavouriteMoviesFeatureSelectors } from '../../selectors/feature-selectors/favourite-movies.selector';
import { MoviesAppSelectors } from '../../selectors/movies-app.selector';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent extends BaseComponentDirective implements OnInit {

  public inFavourites: boolean;
  public inFavouritesSelector$: Observable<boolean>;
  @Input() movie$: Observable<Movie>;

  constructor(
    private moviesService: MoviesFeatureService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<MoviesAppState>) {
    super();
  }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie$ = this.moviesService.getMovie(movieId);
    this.inFavouritesSelector$ = this.store.pipe(
      select(MoviesAppSelectors.FavouriteMoviesFeatureState),
      select(FavouriteMoviesFeatureSelectors.movieInFavourites, { id: movieId }));
    this.checkIfInFavourites(movieId);
  }

  public backToMovies(): void {
    this.router.navigate([`/movies/moviesList`]);
  }

  public checkIfInFavourites(id: number): void {
    this.inFavouritesSelector$.pipe(takeUntil(this.destroyed$)).subscribe(favouriteStatus => this.inFavourites = favouriteStatus);
  }

  public updateFavourite(movieId: number): void {
    const favouriteMovie: FavouriteMovie = { movieId, inFavourites: !this.inFavourites };

    this.store.dispatch(updateFavouriteMovies({ favouriteMovie }));
  }
}
