import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../Controllers/LoginController';
import ErrorHandler from '../Middlewares/ErrorHandler';

const router = Router();

// const loginController = new LoginController();

router.post(
  '/',
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => new LoginController(req, res, next).login(),
  ErrorHandler.handle,
);

export default router;
