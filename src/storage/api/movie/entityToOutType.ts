import { MoiveEntity } from "../../entities/movie";
import { IMovie } from "./types";

export function entityToOutType(entity: MoiveEntity): IMovie {
  return {
    id: entity.id,
    user_id: entity.user_id,
    title: entity.title,
    release_date: entity.release_date,
    genre: entity.genre,
    director: entity.director,
  };
}
