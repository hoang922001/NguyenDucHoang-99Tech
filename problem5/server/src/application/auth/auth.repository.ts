import { UserModel } from '~/model/user.model';
import sequelize from '~/infrastructure/sequelize.infra';

export interface IAuthRepository {
  createUser(params: {
    username: string,
    email: string,
    password: string,
  }): Promise<UserModel>
  findUserByEmail(email: string): Promise<UserModel | null>
}

export class AuthRepository implements IAuthRepository {
  private readonly userRepo = sequelize.getRepository(UserModel);

  async createUser(params: {
    username: string,
    email: string,
    password: string,
  }) {
    return await this.userRepo.create(params)
  }

  async findUserByEmail(email: string) {
    return await this.userRepo.findOne({
      where: {
        email,
      }
    })
  }
}