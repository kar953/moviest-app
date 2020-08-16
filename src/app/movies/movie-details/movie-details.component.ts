import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { map, find, takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import { updateFavouriteMovies } from '../../actions/favourite-movies.actions';
import * as AppSelectors from '../selectors/favourite-movies.selector';
import { BaseComponentDirective } from '../base-component.directive';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent extends BaseComponentDirective implements OnInit {

  public inFavourites: boolean;
  public inFavouritesSelector$: Observable<boolean>;
  @Input() movie$: Observable<Movie>;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router, private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.inFavouritesSelector$ = this.store.pipe(select(AppSelectors.getMovieInFavouriteStatus, { id: movieId }));
    this.movie$ = this.moviesService.getMovie(movieId);
    this.checkIfInFavourites(movieId);
  }

  public backToMovies(movie: Movie): void {
    const movieId = movie ? movie.id : null;

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
