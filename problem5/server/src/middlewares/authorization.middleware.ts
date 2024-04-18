import { NextFunction, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '~/common/types/request.type';
import sequelize from '~/infrastructure/sequelize.infra';
import { UserModel } from '~/model/user.model';

export const AuthorizationMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {

  let token: string | undefined;
  //Check JWT and getting token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  )
    token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      status: 'Unauthorize',
      message: 'You are not login!',
    })
  };
  //verify token
  const { id } = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
  const user = await sequelize.getRepository(UserModel).findByPk(id);
  //Check user exist;
  if (!user) {
    return res.status(403).json({
      status: 'Forbidden',
      message: 'Forbidden',
    })
  };
  //Send current user
  req.user = user;
  next();
}