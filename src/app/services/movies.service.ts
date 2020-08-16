import { MovieModel } from '../models/movie.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { MOVIES } from './movies-data';
import { Injectable } from '@angular/core';
import { map, filter } from 'rxjs/operators';
import { FavouriteMovie } from '../models/favourite-movie.model';
import { FAVOURITES } from './favourite-movies-data';

@Injectable({providedIn: 'root'})
export class MoviesService {

  getMovies(): Observable <MovieModel[] > {
    return of(MOVIES);
  }

  getMovie(id: number): Observable<MovieModel>{
    return of(MOVIES.find( movie => movie.id === id));
  }

  getFavourites(): Observable<FavouriteMovie[]> {
    return of(FAVOURITES);
  }}
