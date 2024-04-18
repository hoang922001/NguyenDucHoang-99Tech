import { Router } from 'express';
import authController from '~/application/auth/auth.ioc';
import { expressRouteAdapter } from './adapter/response.adapter';
import { ValidationMiddleware } from '~/middlewares/validation.middleware';
import { registerSchema } from '~/schemas/register.schema';
import { loginSchema } from '~/schemas/login.schema';

const router = Router();

router.post('/register', ValidationMiddleware(registerSchema), expressRouteAdapter(authController.register.bind(authController)));
router.post('/', ValidationMiddleware(loginSchema), expressRouteAdapter(authController.login.bind(authController)));

export default router;