export interface IMovie {
  id: number;
  user_id: number;
  title: string;
  release_date: Date;
  genre: string;
  director: string;
}

export interface ICreateMoiveArgs {
  user_id: number;
  title: string;
  release_date: Date;
  genre: string;
  director: string;
}

export interface IGetManyMovieArgs {
  user_id: undefined | number;
  created_at_from: undefined | Date,
  created_at_to: undefined | Date,
  limit: undefined | number,
  offset: undefined | number,
}

export interface IGetManyMovieResult {
  movies: Array<IMovie>;
  all_count: number;
}
