import 'reflect-metadata';
import express, { Request, Response, NextFunction } from "express";
import body_parser from "body-parser";
import { initStorageConnection } from "./storage";
import { authMiddlware } from "./middleware";
import { HTTPError } from "./utils";
import { movie_router, movie_router_root } from "./service";
import { SERVER_CONFIG } from "./env.config";


// LOGGER ??

initStorageConnection()
  .catch((error) => {
    console.log('initStorageConnection error: ', error);
  });

const app = express();
app.use(body_parser.json());

app.use(authMiddlware);
app.use(movie_router_root, movie_router);

app.use((error: HTTPError, req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("catch !!!", error)
    res.status(error.code).send(error.message)
  } catch (error) {
    next(new Error("Critiical exception"));
  }
});

app.listen(SERVER_CONFIG.port, () => {
  console.log(`Server started on port: ${SERVER_CONFIG.port}`)
});
