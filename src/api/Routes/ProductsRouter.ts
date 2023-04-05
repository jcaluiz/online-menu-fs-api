import { Router } from 'express';
import ProductsController from '../Controllers/ProductsController';

const router = Router();

router.get('/', ProductsController.test);

export default router;
