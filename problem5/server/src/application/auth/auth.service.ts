import { IAuthRepository } from './auth.repository';
import { UserModel } from '~/model/user.model';
import * as jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { BadRequestException } from '~/common/presenters/error.presenter';

export interface IAuthService {
  createUser(params: {
    username: string,
    email: string,
    password: string,
  }): Promise<{ user: UserModel, token: string }>

  login(params: { email: string, password: string }): Promise<{ user: UserModel, token: string }>
}



export class AuthService implements IAuthService {
  constructor(private readonly authRepo: IAuthRepository) {}

  private signToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };

  async createUser(params: {
    username: string,
    email: string,
    password: string,
  }) {
    const salt = await bcrypt.genSalt(6);
    params.password = await bcrypt.hash(params.password, salt);
    const newUser = await this.authRepo.createUser(params);
    const token = this.signToken(newUser.id);
    return {
      user: newUser,
      token
    };
  }

  async login(params: { email: string, password: string }) {
    const { email, password } = params;
    const user = await this.authRepo.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password)))
      throw new BadRequestException('Email or Password is wrong!');
    const token = this.signToken(user.id);
    return {
      user,
      token,
    }
  }
}