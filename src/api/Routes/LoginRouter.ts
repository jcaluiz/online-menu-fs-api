import { NextFunction, Request, Response, Router } from 'express';
import LoginController from '../Controllers/LoginController';
import ErrorHandler from '../Middlewares/ErrorHandler';
// import Authorization from '../Middlewares/Authorization';

const router = Router();

// const loginController = new LoginController();

// router.get(
//   '/',
//   (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => new Authorization(req, res, next).authentication(),
//   (
//     req: Request,
//     res: Response,
//     next: NextFunction,
//   ) => new LoginController(req, res, next).loginAccessRecord(),
//   ErrorHandler.handle,
// );

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
