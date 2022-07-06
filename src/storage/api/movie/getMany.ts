
import { MoiveEntity } from "../../entities/movie";
import {
  IGetManyMovieResult,
  IGetManyMovieArgs,
} from "./types";
import { entityToOutType } from "./entityToOutType";


export async function getMany(args: IGetManyMovieArgs): Promise<IGetManyMovieResult> {
  const {
    user_id,
    created_at_from,
    created_at_to,
    limit,
    offset,
  } = args;

  const query = MoiveEntity.Repository.createQueryBuilder('movie');

  if (user_id !== undefined) {
    query.andWhere("movie.user_id = :user_id", { user_id });
  }

  if (created_at_from !== undefined) {
    query.andWhere("movie.created_at >= :created_at_from", { created_at_from });
  }

  if (created_at_to !== undefined) {
    query.andWhere("movie.created_at <= :created_at_to", { created_at_to });
  }

  if (limit !== undefined) {
    query.take(limit);
  }

  if (offset !== undefined) {
    query.skip (offset);
  }

  const [moives, all_count] = await Promise.all([query.getMany(), query.getCount()]);

  return {
    movies: moives.map(entityToOutType),
    all_count,
  }
}
