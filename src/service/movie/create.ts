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

  return { answer: 545 };
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
