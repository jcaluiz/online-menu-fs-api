import { Router } from 'express';
import ProductsController from '../Controllers/ProductsController';
import Authorization from '../Middlewares/Authorization';

const router = Router();

router.get(
  '/',
  (req, res, next) => new Authorization(req, res, next).authentication(),
  ProductsController.test,
);

export default router;
