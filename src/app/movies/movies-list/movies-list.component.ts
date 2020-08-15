import { Component, OnInit, ViewChild, ViewChildren, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MovieModel } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public selectedId: number;
  public moviesControl = new FormControl();
  public filteredMovies: Observable<MovieModel[]>;
  public movies: MovieModel[];
  public showAutocomplete = false;

  private _filter(value: string): MovieModel[] {
    const filterValue = value.toLowerCase();
    return this.movies.filter(movie => (movie.name).toLowerCase().startsWith(filterValue));
  }

  constructor(private router: Router, private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().subscribe(res => this.movies = res);

    this.filteredMovies = this.moviesControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  public goToDetails(movie: MovieModel ): void {
    this.selectedId = movie ? movie.id : null;

    this.router.navigate([`/movie/${this.selectedId}`]);
  }

  public showOptions(event: any): void {
    (event.target.value).length > 0 ? this.showAutocomplete = true : this.showAutocomplete = false;
    console.log(this.showAutocomplete);
  }
}
