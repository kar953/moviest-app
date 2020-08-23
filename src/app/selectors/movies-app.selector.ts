import { MoviesAppState } from '../app.state';


export class MoviesAppSelectors {
  public static readonly MoviesFeatureState = (state: MoviesAppState ) => state.moviesState;
  public static readonly FavouriteMoviesFeatureState = (state: MoviesAppState ) => state.favouriteMoviesState;
}
