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
import { UserRole } from "../../types";
import { getMoiveDetails } from "../../third_parties/omdb_api";
import { HTTPError } from "../../utils";

export interface ICreateMoive {
  title: string;
}

export class ICreateMoiveDTO implements ICreateMoive {
  @Length(3, 128)
  title!: string;
}

async function create(req: Request<unknown, unknown, ICreateMoive>, res: AppResponce) {
  console.log("moive create call, res.locals === ", res.locals);
  console.log("moive create body, req.body === ", req.body);

  // throw new HTTPError("i dont like you", 403)

  const movie_details = await getMoiveDetails(req.body.title);

  const current_day = new Date();
  const previous_calendar_month_day = new Date();
  previous_calendar_month_day.setUTCMonth(current_day.getUTCMonth() - 1);

  console.log("current_day: ", current_day);
  console.log("previous_calendar_month_day: ", previous_calendar_month_day);

  const { all_count } = await StorageAPI.Movie.getMany({
    created_at_from: previous_calendar_month_day,
    created_at_to: current_day,
    limit: 1,
    offset: undefined,
    user_id: res.locals.userId,
  });

  if (res.locals.role === UserRole.BASIC && all_count >= 5) {
    throw new HTTPError("Limit reached", 403);
  }

  const moive = await StorageAPI.Movie.create({
    user_id: res.locals.userId,
    director: movie_details.director,
    genre: movie_details.genre,
    release_date: movie_details.release_date,
    title: req.body.title,
  });

  return moive
}

export const create_movie_route_config: RouteConfig = {
  path: "/",
  method: HTTPMethod.POST,
  validarots: {
    params: undefined,
    query: undefined,
    body: ICreateMoiveDTO,
  },
  handler: create,
}
