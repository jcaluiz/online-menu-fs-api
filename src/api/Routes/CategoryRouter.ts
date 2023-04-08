import { NextFunction, Request, Response, Router } from 'express';
import Authorization from '../Middlewares/Authorization';
import ErrorHandler from '../Middlewares/ErrorHandler';
import CategoryController from '../Controllers/CategoryController';

const router = Router();

router.get(
  '/',
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => new Authorization(req, res, next).authentication(),
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => new CategoryController(req, res, next).getCategories(),
  ErrorHandler.handle,
);

export default router;
