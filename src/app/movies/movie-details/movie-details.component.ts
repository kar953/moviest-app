import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { FavouriteMovie } from '../../models/favourite-movie.model';
import { map, takeUntil } from 'rxjs/operators';
import { BaseComponentDirective } from '../base.component';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent extends BaseComponentDirective implements OnInit {

  public inFavourites: boolean;
  public favourites$: Observable<FavouriteMovie[]>;
  @Input() movie$: Observable<MovieModel>;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router)
  {
    super();
  }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie$ = this.moviesService.getMovie(movieId);
    this.favourites$ = this.moviesService.getFavourites();
    this.checkIfInFavourites(movieId);
  }

  public backToMovies(movie: MovieModel): void {
    const movieId = movie ? movie.id : null;

    this.router.navigate([`/movies`]);
  }

  public checkIfInFavourites(id: number): void {
    const starred = this.favourites$.pipe(
      map(movies => movies.find(favMovie => {
        return favMovie.movieId === id ? this.inFavourites = true : this.inFavourites = false;
      }))
    );
    starred.pipe(takeUntil(this.destroyed$)).subscribe();
  }

  public addToFavourites(movieId: number): void {
    this.inFavourites = true;
  }
}
