import { IController } from '~/interfaces/controller.interface';
import { IAuthService } from './auth.service';
import { Request } from 'express';
import { SuccessPresenter } from '~/common/presenters/success.presenter';
import { UserModel } from '~/model/user.model';

export class AuthController implements IController<AuthController> {
  private readonly presenter = new SuccessPresenter();
  constructor(private readonly authService: IAuthService) {}

  async register({ body: params }: Request) {
    const data = await this.authService.createUser(params);
    return this.presenter.create<{ user: UserModel, token: string }>(data);
  }

  async login({ body: params }: Request) {
    const data = await this.authService.login(params);
    return this.presenter.create<{ user: UserModel, token: string }>(data);
  }
}