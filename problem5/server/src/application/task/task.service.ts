import { PriorityEnum } from '~/common/enum/priority.enum';
import { TaskModel } from '~/model/task.model';
import { ITaskRepository } from './task.repository';
import { NotFoundException } from '~/common/presenters/error.presenter';

export interface ITaskService {
  createTask(params: {
    name: string;
    description: string;
    priority: PriorityEnum;
    due: Date;
  }, userId: number): Promise<TaskModel>;

  getListTask(userId: number, params: {
    search?: string;
    page?: number;
    perPage?: number;
    filter?: string;
  }): Promise<{
    count: number;
    tasks: TaskModel[];
    totalPages: number;
    currentPage: number,
  }>

  deleteTask(taskId: number): Promise<TaskModel>

  updateTask(taskId: number, params: {
    completed?: boolean,
    description?: string,
    due?: Date,
    name?: string,
    priority?: PriorityEnum
  }): Promise<TaskModel>
}

export class TaskService implements ITaskService {
  constructor(private readonly taskRepo: ITaskRepository) {}

  async createTask(params: { name: string; description: string; priority: PriorityEnum; due: Date; }, userId: number) {
    return await this.taskRepo.createTask({ ...params, userId });
  }

  async getListTask(userId: number, params: {
    search?: string;
    page?: number;
    perPage?: number;
    filter?: string;
  }) {
    const data = await this.taskRepo.getTasksByUserId(userId, params);
    const { page = 1, perPage = 6 } = params;
    return {
      count: data.count,
      tasks: data.rows,
      totalPages: Math.ceil(data.count / perPage),
      currentPage: page,
    }

  }

  async deleteTask(taskId: number) {
    const deletedTask = await this.taskRepo.deleteTask(taskId);
    if (!deletedTask) throw new NotFoundException('Task Not Found!')
    return deletedTask;
  }
  async updateTask(taskId: number, params: {
    completed?: boolean,
    description?: string,
    due?: Date,
    name?: string,
    priority?: PriorityEnum
  }) {
    const updatedTask = await this.taskRepo.updateTask(taskId, params);
    if (!updatedTask) throw new NotFoundException('Task Not Found!');
    return updatedTask;
  }
}