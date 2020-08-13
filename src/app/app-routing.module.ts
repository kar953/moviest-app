import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent } from './movies/movies-list/movies-list.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { MovieDetailsComponent } from './movies/movie-details/movie-details.component';

const routes: Routes = [
  { path: '', component: MoviesListComponent },
  { path: 'movies', component: MoviesListComponent },
  { path: 'movie/:id', component: MovieDetailsComponent },
  { path: '**', component: MoviesListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
