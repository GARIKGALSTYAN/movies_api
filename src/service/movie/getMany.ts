import express, { NextFunction, Request, Response } from "express";
import {
  validate,
  validateOrReject,
  Contains,
  IsInt,
  Length,
  IsEmail,
  IsFQDN,
  IsDate,
  IsString,
  Min,
  Max,
} from 'class-validator';
import { AppResponce, HTTPMethod, RouteConfig } from "../../types";
import { StorageAPI } from "../../storage";
import { HTTPError } from "../../utils";
import { getMoiveDetails } from "../../third_parties/omdb_api";


async function getMany(req: Request, res: AppResponce) {
    console.log("moive get many call", res.locals);

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
