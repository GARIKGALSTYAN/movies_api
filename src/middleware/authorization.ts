import { Request, Response, NextFunction } from "express";
import JWT from 'jsonwebtoken';
import { SERVER_CONFIG } from "../env.config";
import { HTTPError } from "../utils";
import { AuthorizationResult } from "../types";


export async function authMiddlware(req: Request, res: Response, next: NextFunction) {
    try {
        const auth_header = req.headers.authorization;

        if (typeof auth_header !== "string") {
            throw new Error('Auth header is missing');
        }

        const [ token_type, token ] = auth_header.split(" ");

        if (token_type !== "Bearer") {
            throw new Error('Auth header type is unknown');
        }

        if (typeof token !== "string") {
            throw new Error('Auth token is not found');
        }

        const user_data = validate(token);
        res.locals = user_data;

        next();
    } catch (error) {
        console.log("err: ", error)
        

        let error_message = "Authorization failed";

        if (error instanceof Error && error.message) {
            console.log("err----->>: ", error.message)
            error_message = error.message;
        }

        console.log("new HTTPError(error_message, 401): ", new HTTPError(error_message, 401))

        next(new HTTPError(error_message, 401));
    }
}

function validate(jwt_token: string): AuthorizationResult {
    try {
        return JWT.verify(jwt_token, SERVER_CONFIG.auth_jwt_secret) as AuthorizationResult;
    } catch (error) {
        throw new Error("JWT token is invalid")
    }
}
