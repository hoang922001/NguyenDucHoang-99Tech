import { Router } from 'express';
import taskController from '~/application/task/task.ioc';
import { expressRouteAdapter } from './adapter/response.adapter';
import { ValidationMiddleware } from '~/middlewares/validation.middleware';
import { createTaskSchema } from '~/schemas/createTask.schema';
import { AuthorizationMiddleware } from '~/middlewares/authorization.middleware';
import { updateTaskSchema } from '~/schemas/updateTask.schema';


const router = Router();

router.post('/', AuthorizationMiddleware, ValidationMiddleware(createTaskSchema), expressRouteAdapter(taskController.createTask.bind(taskController)));
router.get('/list', AuthorizationMiddleware, expressRouteAdapter(taskController.taskList.bind(taskController)));
router.delete('/:id', AuthorizationMiddleware, expressRouteAdapter(taskController.deleteTask.bind(taskController)));
router.patch('/:id', AuthorizationMiddleware, ValidationMiddleware(updateTaskSchema), expressRouteAdapter(taskController.updatedTask.bind(taskController)));

export default router;