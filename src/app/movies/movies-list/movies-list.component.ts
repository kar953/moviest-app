import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map, startWith, filter, combineAll, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { MoviesFeatureService } from '../../services/movies.service';
import { FormControl } from '@angular/forms';
import { genreType } from '../../models/genre-type.model';
import { Store, select } from '@ngrx/store';
import { MoviesAppState, MoviesFeatureSubState } from '../../app.state';
import { FavouriteMoviesFeatureSelectors } from '../../selectors/feature-selectors/favourite-movies.selector';
import { MoviesAppSelectors } from '../../selectors/movies-app.selector';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public selectedId: number;
  public moviesControl = new FormControl();
  public filteredMovies$: Observable<Movie[]>;
  public filteredMoviesInitial$: Observable<Movie[]>;
  public movies: Movie[];
  public showAutocomplete = false;
  public selectedGenreAction = false;
  public selectedGenreAdventure = false;
  public selectedFavourites = false;
  public filteredMovies: Movie[] = [];
  public favouriteMoviesSelector$ = this.store.pipe(select(MoviesAppSelectors.FavouriteMoviesFeatureState),
    select(FavouriteMoviesFeatureSelectors.favouriteMovies));
  public favouriteChip = 'favourites';
  public genreType = genreType;
  public resetAll = '';
  public movie: Movie;

  private _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    console.log('_filter', this.movies);
    return this.movies.filter(movie => (movie.name).toLowerCase().startsWith(filterValue));
  }

  constructor(private router: Router,
              private moviesFeatureService: MoviesFeatureService,
              private store: Store<MoviesAppState>) {
  }

  ngOnInit(): void {
    this.moviesFeatureService.loadMovies();
    this.loadMovies();

    this.filteredMoviesInitial$ = this.filteredMovies$ = this.moviesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public loadMovies(): void {
    this.moviesFeatureService.movies$.subscribe((movies: Movie[]) =>
      {
        console.log('LoadMovies()', movies);
        this.movies = movies;
      }
    );
  }

  public goToDetails(movie: Movie): void {
    this.selectedId = movie ? movie.id : null;

    this.router.navigate([`/movies/movie/${this.selectedId}`]);
  }

  public showOptions(event: any): void {
    (event.target.value).length > 0 ? this.showAutocomplete = true : this.showAutocomplete = false;
  }

  public onFilterChange(event): void {
    switch (event) {
      case genreType.action:
        this.selectedGenreAction = !this.selectedGenreAction;
        break;
      case genreType.adventure:
        this.selectedGenreAdventure = !this.selectedGenreAdventure;
        break;
      case this.favouriteChip:
        this.selectedFavourites = !this.selectedFavourites;
        break;
      case this.resetAll:
        this.selectedFavourites = false;
        this.selectedGenreAction = false;
        this.selectedGenreAdventure = false;
        break;
      default:
        break;
    }
    this.filterMoviesByChips();
  }

  private filterMoviesByChips(): void {
    this.moviesControl.setValue('');
    this.filteredMovies$ = this.filteredMoviesInitial$;
    if (this.selectedGenreAction) {
      this.filteredMovies$ = this.filteredMovies$
      .pipe(map(movies => movies.filter(action => action.genres.includes(genreType.action))));
    }
    if (this.selectedGenreAdventure) {
      this.filteredMovies$ = this.filteredMovies$
      .pipe(map(movies => movies.filter(adventure => adventure.genres.includes(genreType.adventure))));
    }
    if (this.selectedFavourites) {
      this.filteredMovies$ = this.filteredMovies$.pipe(withLatestFrom(this.favouriteMoviesSelector$),
        map(value => value['0'].filter(movie => value['1'].some(x => x.movieId === movie.id))));
    }
  }
}
