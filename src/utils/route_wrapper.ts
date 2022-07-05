import { Router, Request, NextFunction } from "express";
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { RouteConfig, AppResponce, Validators } from "../types";
import { HTTPError } from "./http_error";


async function validateNetworkInput(request: Request, validators: Validators) {
  const { body, params, query } = request;
  const { body: B, params: P, query: Q } = validators;

  console.log("validateNetworkInput: ", validators, B, P, Q);

  /* eslint-disable */
  if (B) {
    console.log("if (B) {}");
    console.log("B:: ", B);
    console.log("body:: ", body);
    // @ts-ignore
    const dto_class_instance = plainToInstance(B, body);
    console.log("dto_class_instance::", dto_class_instance)
    await validateOrReject(dto_class_instance);
  }
  if (P) {
    // @ts-ignore
    const dto_class_instance = plainToInstance(P, params);
    await validateOrReject(dto_class_instance);
  }

  if (Q) {
    // @ts-ignore
    const dto_class_instance = plainToInstance(Q, query);
    await validateOrReject(dto_class_instance);
  }
  /* eslint-enable */
}


export function routeWrapper(router: Router, conifgs: Array<RouteConfig>, router_name = "") {
  for (const route_config of conifgs) {

    const { method, path } = route_config;
    console.log( `${method.toUpperCase()} > ${router_name}${path}`);

    const wrapped_handler = async function (req: Request, res: AppResponce, next: NextFunction) {
      try {

        await validateNetworkInput(req, route_config.validarots);
        const responce = await route_config.handler(req, res);
        res.json(responce);

      } catch (error) {
        let error_message = "Request failed";
        let error_code = 500;

        /* eslint-disable */

        // @ts-ignore
        if (error.message) {
          // @ts-ignore
          error_message = error.message;
        }

        // @ts-ignore
        if (error.code) {
          // @ts-ignore
          error_code = error.code;
        }

        if (Array.isArray(error) && error[0]) {
          error_message = `Validation error, property: ${error[0].property} is incorrect`
        }

        /* eslint-enable */

        next(new HTTPError(error_message, error_code));
      }
    }

    router[method](path, wrapped_handler);
  }
}
