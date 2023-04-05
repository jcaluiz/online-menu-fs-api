import { Request, Response } from 'express';
import statusCodes from '../statusCodes';

export default class ProductsController {
  static async test(
    _req: Request,
    res: Response,
  ) {
    return res.status(statusCodes.ok).json({ ok: true });
  }
}
