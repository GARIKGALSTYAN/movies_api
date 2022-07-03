import { Router, Request, NextFunction } from "express";
import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { RouteConfig, AppResponce, Validators } from "../types";
import { HTTPError } from "./http_error";


async function validateNetworkInput(request: Request, validators: Validators) {
  const { body, params, query } = request;
  const { body: B, params: P, query: Q } = validators;

  console.log("validateNetworkInput: ", validators, B, P, Q);

  if (B) {
    console.log("if (B) {}");
    console.log("B:: ", B);
    console.log("body:: ", body);
    // eslint-disable-next-line
    // @ts-ignore
    const dto_class_instance = plainToInstance(B, body);
    console.log("dto_class_instance::", dto_class_instance)
    await validateOrReject(dto_class_instance);
  }
  if (P) {
    // eslint-disable-next-line
    // @ts-ignore
    const dto_class_instance = plainToInstance(P, params);
    await validateOrReject(dto_class_instance);
  }

  if (Q) {
    // eslint-disable-next-line
    // @ts-ignore
    const dto_class_instance = plainToInstance(Q, query);
    await validateOrReject(dto_class_instance);
  }
}


export function routeWrapper(router: Router, conifgs: Array<RouteConfig>, router_name = "") {
  console.log(`> ${router_name}`);
  for (const route_config of conifgs) {
    const {
      method,
      path,
    } = route_config;

    console.log(`  > ${method} : ${path}`);

    let wrapped_handler = async function (req: Request, res: AppResponce, next: NextFunction) {
      console.log("|wrapped_handler::: req.body", req);
      const {
        handler,
        validarots,
        // eslint-disable-next-line
        // @ts-ignore
      } = (this as RouteConfig);

      try {

        await validateNetworkInput(req, validarots);
        const responce = await handler(req, res);
        res.json(responce);

      } catch (error) {
        console.log(" on wrapper err: ", error);
                  // eslint-disable-next-line
          // @ts-ignore
        console.log("error.property:: ", error[0].property);
                  // eslint-disable-next-line
          // @ts-ignore
        console.log("error.constraints:: ", error[0].constraints);

        let error_message = "Request failed";
        let error_code = 500;

        if (error instanceof Error && error.message) {
          error_message = error.message;

        } else if (error instanceof HTTPError) {
          error_message = error.message;
          error_code = error.code;

        } else if (Array.isArray(error) &&
                   error[0] ) {
          // eslint-disable-next-line
          // @ts-ignore
          error_message = `Validation error, property: ${error[0].property} is incorrect`
        }

        next(new HTTPError(error_message, error_code));
      }
    }
    wrapped_handler = wrapped_handler.bind(route_config);

    router[method](path, wrapped_handler);
  }
}
