import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { MovieModel } from '../../models/movie.model';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent {

  @Input() movie: MovieModel;

}
