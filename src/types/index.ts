import { Response, Request } from "express";

export type AppResponce = Response<unknown, AuthorizationResult>

export interface AuthorizationResult {
  userId: number;
  name: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
  sub: string;
}

export enum UserRole {
  BASIC = "basic",
  PREMIUM = "premium",
}

export enum HTTPMethod {
  GET = "get",
  POST = "post",
  PATCH = "patch",
  DELETE = "delete",
}

export interface Validators {
  body: unknown,
  params: unknown,
  query: unknown,
}

export interface RouteConfig {
  path: string;
  method: HTTPMethod;
  validarots: Validators;
  handler: (req: Request, res: AppResponce) => Promise<unknown>,
}
