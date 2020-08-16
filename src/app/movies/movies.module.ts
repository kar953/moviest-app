import { NgModule } from '@angular/core';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SharedModule } from '../shared/shared-module.module';
import { MovieItemComponent } from './movies-list/movie-item/movie-item.component';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: MoviesListComponent },
  { path: 'moviesList', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent }
];

@NgModule({
  declarations: [
    MovieItemComponent,
    MoviesListComponent,
    MovieDetailsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    MovieItemComponent,
    MoviesListComponent,
    MovieDetailsComponent
  ]
})
export class MoviesModule { }
