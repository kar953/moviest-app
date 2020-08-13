import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieComponent } from './movie/movie.component';
import { MoviesListComponent } from './movies-list/movies-list.component';

@NgModule({
  declarations: [
    MovieComponent,
    MoviesListComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MovieComponent,
    MoviesListComponent
  ]
})
export class MoviesModule { }
