import { Request } from 'express';
import { ITaskService } from './task.service';
import { RequestWithUser } from '~/common/types/request.type';
import { IController } from '~/interfaces/controller.interface';
import { SuccessPresenter } from '~/common/presenters/success.presenter';

export class TaskController implements IController<TaskController> {
  private readonly presenter = new SuccessPresenter();
  constructor(private readonly taskService: ITaskService) {}

  async createTask({ body: params, user }: RequestWithUser) {
    const task = await this.taskService.createTask(params, user?.id as number);
    return this.presenter.create({ task })
  }

  async deleteTask({ params }: Request) {
    return this.presenter.create(await this.taskService.deleteTask(+params.id))
  }

  async taskList({ user, query: params }: RequestWithUser) {
    return this.presenter.OK(await this.taskService.getListTask(user?.id as number, params))
  }

  async updatedTask({ body, params }: RequestWithUser) {
    return this.presenter.OK(await this.taskService.updateTask(+params.id, body))
  }
}