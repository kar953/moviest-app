import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

@NgModule({
  declarations: [
    MovieItemComponent,
    MoviesListComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MovieItemComponent,
    MoviesListComponent,
    MovieDetailsComponent
  ]
})
export class MoviesModule { }
