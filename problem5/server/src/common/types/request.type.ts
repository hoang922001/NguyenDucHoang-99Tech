import { UserModel } from '~/model/user.model';
import { Request } from 'express';

export type RequestWithUser = Request & { user?: Partial<UserModel> };