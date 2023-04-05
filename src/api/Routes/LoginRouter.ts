import { Router } from 'express';
import LoginController from '../Controllers/LoginController';
import ErrorHandler from '../Middlewares/ErrorHandler';

const router = Router();

router.post('/', LoginController.login, ErrorHandler.handle);

export default router;
