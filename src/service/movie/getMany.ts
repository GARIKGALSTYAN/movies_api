import {Request } from "express";
import { AppResponce, HTTPMethod, RouteConfig } from "../../types";
import { StorageAPI } from "../../storage";


async function getMany(req: Request, res: AppResponce) {
    const user_movies = await StorageAPI.Movie.getMany({
        user_id: res.locals.userId,
        limit: undefined,
        offset: undefined,
        created_at_from: undefined,
        created_at_to: undefined,
    });

    return user_movies;
}

export const get_many_movie_route_config: RouteConfig = {
  path: "/",
  method: HTTPMethod.GET,
  validarots: {
    params: undefined,
    query: undefined,
    body: undefined,
  },
  handler: getMany,
}
