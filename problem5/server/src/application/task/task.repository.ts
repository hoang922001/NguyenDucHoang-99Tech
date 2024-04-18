import { PriorityEnum } from '~/common/enum/priority.enum';
import { TaskModel } from '~/model/task.model';
import sequelize from '~/infrastructure/sequelize.infra';
import { Op } from 'sequelize';

export interface ITaskRepository {
  createTask(params: {
    name: string;
    description: string;
    priority: PriorityEnum;
    due: Date;
    userId: number;
  }): Promise<TaskModel>

  getTasksByUserId(userId: number, params: {
    search?: string;
    page?: number;
    perPage?: number;
    filter?: string;
  }): Promise<{
    rows: TaskModel[];
    count: number;
  }>;

  deleteTask(taskId: number): Promise<TaskModel | null>;

  updateTask(taskId: number, params: {
    completed?: boolean,
    description?: string,
    due?: Date,
    name?: string,
    priority?: PriorityEnum
  }): Promise<TaskModel | null>;
}

export class TaskRepository implements ITaskRepository {
  private readonly taskRepo = sequelize.getRepository(TaskModel);

  async createTask(params: {
    name: string;
    description: string;
    priority: PriorityEnum;
    due: Date;
    userId: number;
  }) {
    return await this.taskRepo.create(params);
  }

  async getTasksByUserId(userId: number,
    params: {
      search?: string;
      page?: number;
      perPage?: number;
      filter?: string;
    }
  ) {
    const { search, page = 1, perPage = 6, filter } = params;
    const statusCondition = filter === 'true' ? { completed: true } : filter == 'false' ? { completed: false } : {};
    const searchCondition = search ? {
      [Op.or]: [
        {
          task_name: {
            [Op.substring]: search || '',
          },
        },
        {
          task_description: {
            [Op.substring]: search || '',
          },
        },
      ]
    } : {};

    return await this.taskRepo.findAndCountAll({
      where: {
        userId,
        ...statusCondition,
        ...searchCondition
      },
      offset: (page - 1) * perPage,
      limit: perPage * 1,
    })
  }

  async deleteTask(taskId: number) {
    const taskExisted = await this.taskRepo.findByPk(taskId)
    if (!taskExisted) return null
    await taskExisted.destroy();
    return taskExisted;
  }

  async updateTask(taskId: number, params: {
    completed?: boolean,
    description?: string,
    due?: Date,
    name?: string,
    priority?: PriorityEnum
  }) {
    const existedTask = await this.taskRepo.findByPk(taskId);
    if (!existedTask) return null;
    return await existedTask.update(params);
  }
}