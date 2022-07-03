import express, { NextFunction, Request, Response } from "express";
import {AppResponce} from "../../types";

export async function getMany(req: Request, res: AppResponce) {
    console.log("moive get many call", res.locals);
    res.end("meove get many");
}
