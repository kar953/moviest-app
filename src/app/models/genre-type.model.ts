export type GenreType = 'action' | 'adventure' | 'biography' | 'comedy' | 'crime'
  | 'drama' | 'history' | 'mystery' | 'scifi' | 'sport' | 'thriller';

export interface GenreFilterStatus {
  genreType: GenreType;
  filterActive: boolean;
}

export const genreType = {
  action: 'action' as GenreType,
  adventure: 'adventure' as GenreType,
  biography: 'biography' as GenreType,
  comedy: 'comedy' as GenreType,
  crime: 'crime' as GenreType,
  drama: 'drama' as GenreType,
  history: 'history' as GenreType,
  mystery: 'mystery' as GenreType,
  scifi: 'scifi' as GenreType,
  sport: 'sport' as GenreType,
  thriller: 'thriller' as GenreType
};

export const genreFilterStatusList: GenreFilterStatus[] = [
  {genreType: genreType.action, filterActive: false},
  {genreType: genreType.adventure, filterActive: false},
  {genreType: genreType.biography, filterActive: false},
  {genreType: genreType.comedy, filterActive: false},
  {genreType: genreType.crime, filterActive: false},
  {genreType: genreType.drama, filterActive: false},
  {genreType: genreType.history, filterActive: false},
  {genreType: genreType.scifi, filterActive: false},
  {genreType: genreType.sport, filterActive: false},
  {genreType: genreType.thriller, filterActive: false},
];

