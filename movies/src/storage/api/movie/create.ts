
import { MoiveEntity } from "../../entities/movie";
import {
  IMovie,
  ICreateMoiveArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";


export async function create(args: ICreateMoiveArgs): Promise<IMovie> {
  const {
    director,
    genre,
    release_date,
    title,
    user_id,
  } = args;

  const moive = new MoiveEntity();

  moive.director = director;
  moive.genre = genre;
  moive.release_date = release_date;
  moive.title = title;
  moive.user_id = user_id;

  await MoiveEntity.Repository.save(moive);

  return entityToOutType(moive);
}
