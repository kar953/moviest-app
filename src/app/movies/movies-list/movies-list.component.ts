import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map, startWith, filter, combineAll, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { MoviesFeatureService } from '../../services/movies.service';
import { FormControl } from '@angular/forms';
import { genreType, GenreFilterStatus, genreFilterStatusList } from '../../models/genre-type.model';
import { Store, select } from '@ngrx/store';
import { MoviesAppState, MoviesFeatureSubState } from '../../app.state';
import { FavouriteMoviesFeatureSelectors } from '../../selectors/feature-selectors/favourite-movies.selector';
import { MoviesAppSelectors } from '../../selectors/movies-app.selector';
import { FavouriteMoviesService } from '../../services/favourite-movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, OnDestroy {
  public selectedId: number;
  public moviesControl = new FormControl();
  public filteredMovies$: Observable<Movie[]>;
  public filteredMoviesInitial$: Observable<Movie[]>;
  public movies: Movie[];
  public showAutocomplete = false;
  public selectedFavourites = false;
  public filteredMovies: Movie[] = [];
  public favouriteMoviesSelector$ = this.favouriteMoviesFeatureService.favouriteMoviesSelector$;
  public movie: Movie;
  public genreFilterStatus: GenreFilterStatus[] = genreFilterStatusList;
  public isLoading$: Observable<boolean> = this.moviesFeatureService.isLoading$;
  public loadingMessage = 'We are loading movies for you. Please wait...';

  private _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    return this.movies.filter(movie => (movie.name).toLowerCase().startsWith(filterValue));
  }

  constructor(private router: Router,
    private moviesFeatureService: MoviesFeatureService,
    private favouriteMoviesFeatureService: FavouriteMoviesService,
    private store: Store<MoviesAppState>) {
  }

  ngOnInit(): void {
    this.moviesFeatureService.fetchMovies();
    this.registerOnLoadMovies();
  }

  public registerOnLoadMovies(): void {
    this.moviesFeatureService.movies$.subscribe((movies: Movie[]) => {
      this.movies = movies;
      this.registerFiltering();
    }
    );
  }

  public registerFiltering(): void {
    this.filteredMoviesInitial$ = this.filteredMovies$ = this.moviesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public goToDetails(movie: Movie): void {
    this.selectedId = movie ? movie.id : null;
    this.router.navigate([`/movies/movie/${this.selectedId}`]);
  }

  public showOptions(event: any): void {
    (event.target.value).length > 0 ? this.showAutocomplete = true : this.showAutocomplete = false;
  }

  public onGenreFilterChange(event): void {
    this.genreFilterStatus.map(genre => {
      if (genre.genreType === event.filterType) {
        genre.filterActive = event.filterActive;
      }
    });
    this.filterMoviesByChips();
  }

  public onOtherFilterChange(filterType: string): void {
    switch (filterType) {
      case 'reset':
        this.resetChipsFilter();
        this.refreshFiltersPipes();
        break;
      case 'favourite':
        this.selectedFavourites = !this.selectedFavourites;
        if (this.selectedFavourites) {
          this.setFavouritesFilter();
        } else {
          this.refreshFiltersPipes();
          this.filterMoviesByChips();
        }
    }
  }

  public refreshFiltersPipes(): void {
    this.moviesControl.setValue('');
    this.filteredMovies$ = this.filteredMoviesInitial$;
  }

  public resetChipsFilter(): void {
    this.genreFilterStatus.map(movie => movie.filterActive = false);
    this.selectedFavourites = false;
  }

  private setFavouritesFilter(): void {
    this.filteredMovies$ = this.filteredMovies$.pipe(withLatestFrom(this.favouriteMoviesSelector$),
      map(value => value['0'].filter(movie => value['1'].some(x => x.movieId === movie.id))));
  }

  private filterMoviesByChips(): void {
    this.refreshFiltersPipes();
    if (this.selectedFavourites) {
      this.setFavouritesFilter();
    }
    this.genreFilterStatus.filter(genreFilter => genreFilter.filterActive === true).map(
      genreFilter => this.filteredMovies$ = this.filteredMovies$
        .pipe(map(movies => movies.filter(action => action.genres.includes(genreFilter.genreType)))));
  }

  ngOnDestroy(): void {
    this.resetChipsFilter();
  }
}
