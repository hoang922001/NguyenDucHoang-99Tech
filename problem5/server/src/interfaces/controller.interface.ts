import { NextFunction, Request, Response } from "express";
import { IResponse } from "./response.interface";

export type IController<T> = { [K in keyof T]: T[K] extends Function ?
  ((req: Request, res: Response, next?: NextFunction) => Promise<IResponse<unknown>>) : T[K] }
