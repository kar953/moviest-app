import { Component, OnInit, ViewChild, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, merge } from 'rxjs';
import { map, startWith, filter, combineAll, combineLatest, withLatestFrom } from 'rxjs/operators';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { FormControl } from '@angular/forms';
import { genreType } from '../../models/genre-type.model';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as AppSelectors from '../selectors/favourite-movies.selector';

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
  public selectedActionGenre = false;
  public selectedFavourites = false;
  public filteredMovies = [];
  public favouriteMoviesSelector$ = this.store.pipe(select(AppSelectors.getMoviesWithFavouriteStatus));

  public genreType = genreType;

  private _filter(value: string): Movie[] {
    const filterValue = value.toLowerCase();
    return this.movies.filter(movie => (movie.name).toLowerCase().startsWith(filterValue));
  }

  constructor(private router: Router, private moviesService: MoviesService,  private store: Store<AppState>) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(res => this.movies = res);

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

  public onFilterChange(event): void {
    switch (event) {
      case genreType.action:
        this.selectedActionGenre = !this.selectedActionGenre;
        break;
      case 'favourites':
        this.selectedFavourites = !this.selectedFavourites;
        break;
      default:
        break;
    }
    this.filterMoviesByChips();
  }

  private filterMoviesByChips(): void {
    this.moviesControl.setValue('');
    this.filteredMovies$ = this.filteredMoviesInitial$;
    if (this.selectedActionGenre) {
      this.filteredMovies$ = this.filteredMovies$.pipe(map(x => x.filter(y => y.genres.includes(genreType.action))));
    }
    if (this.selectedFavourites) {
      this.filteredMovies$ = this.filteredMovies$.pipe(withLatestFrom(this.favouriteMoviesSelector$),
        map(value => value["0"].filter(movie => value["1"].some(x => x.movieId === movie.id))));
    }
  }
}
