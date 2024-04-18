import { NextFunction, Request, Response } from 'express';
import { ObjectSchema } from 'joi';
import { BadRequestException } from '~/common/presenters/error.presenter';

export const ValidationMiddleware = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message,
        name: 'Bad Request'
      })
    }
    next();
  };
};