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
  title: undefined | string
}
