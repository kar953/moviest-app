import { Component, OnInit } from '@angular/core';
import { movies } from '../../../content/movie.mock-data';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  public movies = movies;

  constructor() { }

  ngOnInit(): void {
  }

}
