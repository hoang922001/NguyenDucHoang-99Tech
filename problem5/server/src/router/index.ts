import { Application } from 'express';
import AuthRouter from './auth.router';
import TaskRouter from './task.router';

export const router = (app: Application) => {
  app.use('/api/v1/auth', AuthRouter);
  app.use('/api/v1/task', TaskRouter);
}