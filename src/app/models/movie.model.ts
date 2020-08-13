import { GenreType } from './genre-type.model';
export interface MovieModel {
  id: number;
  key: string;
  name: string;
  description: string;
  genres: GenreType[];
  rate: string;
  length: string;
  img: string;
}
