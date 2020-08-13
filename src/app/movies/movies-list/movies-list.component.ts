import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { MovieModel } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public movies$: Observable<MovieModel[]>;
  public selectedId: number;

  constructor(private router: Router,  private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies$ = this.moviesService.getMovies();
  }

  public goToDetails(movie: MovieModel): void {
    this.selectedId = movie ? movie.id : null;

    this.router.navigate([`/movie/${this.selectedId}`]);
  }
}
