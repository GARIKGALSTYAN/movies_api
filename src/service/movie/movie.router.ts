import express from "express";
import { create_movie_route_config } from "./create";
import { get_many_movie_route_config } from "./getMany";
import { routeWrapper } from "../../utils"

export const movie_router = express.Router();
export const movie_router_root = "/movie";

routeWrapper(
    movie_router,
    [
        create_movie_route_config,
        get_many_movie_route_config,
    ],
    movie_router_root,
);

// movie_router.post("/", create);
// movie_router.get("/", getMany);
