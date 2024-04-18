import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { TaskService } from './task.service';

const taskRepo = new TaskRepository();
const taskService = new TaskService(taskRepo);
const taskController = new TaskController(taskService);

export default taskController;