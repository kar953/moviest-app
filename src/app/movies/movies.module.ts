import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MovieItemComponent } from './movie-item/movie-item.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { AngularMaterialModule } from '../angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MovieItemComponent,
    MoviesListComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MovieItemComponent,
    MoviesListComponent,
    MovieDetailsComponent,
    AngularMaterialModule,
  ]
})
export class MoviesModule { }
