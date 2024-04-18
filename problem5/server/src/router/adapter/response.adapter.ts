import { NextFunction, Request, Response } from 'express';
import { IResponse } from '~/interfaces/response.interface';

export const expressRouteAdapter = <T>(controllerHandler: Function) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const controllerResponse: IResponse<T> = await controllerHandler(request, response, next);
      return response.status(controllerResponse.statusCode ?? 200).json({ data: controllerResponse.data })
    } catch (err: any) {
      const status = err.status ?? 500;
      const message = err.message ?? 'Something went wrong!';
      response.status(status).json({
        status,
        message,
      })
    }
  };
};
