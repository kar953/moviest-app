import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MovieModel } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie$: Observable<MovieModel>;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const movieId = Number(this.route.snapshot.paramMap.get('id'));
    this.movie$ = this.moviesService.getMovie(movieId);
  }

  public backToMovies(movie: MovieModel): void {
    const movieId = movie ? movie.id : null;

    this.router.navigate([`/movies`]);
  }

}
