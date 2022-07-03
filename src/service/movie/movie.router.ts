import express from "express";
import { create_movie_route_config } from "./create";
import { getMany } from "./getMany";
import { routeWrapper } from "../../utils"

export const movie_router = express.Router();

routeWrapper(
    movie_router,
    [
        create_movie_route_config,
    ],
    "/movies"
);

// movie_router.post("/", create);
// movie_router.get("/", getMany);
