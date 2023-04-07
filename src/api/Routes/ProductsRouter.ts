import { NextFunction, Request, Response, Router } from 'express';
import ProductsController from '../Controllers/ProductsController';
import Authorization from '../Middlewares/Authorization';
import ErrorHandler from '../Middlewares/ErrorHandler';

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
  ) => new ProductsController(req, res, next).getProducts(),
  ErrorHandler.handle,
);

router.get(
  '/:id',
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => new Authorization(req, res, next).authentication(),
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => new ProductsController(req, res, next).getProductById(),
  ErrorHandler.handle,
);

router.post(
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
  ) => new ProductsController(req, res, next).registerProducts(),
  ErrorHandler.handle,
);

export default router;
