import { Request, Response, NextFunction } from 'express';
// import statusCodes from '../shared/statusCodes';
import ProductService from '../Services/ProductService';

export default class ProductsController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: ProductService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new ProductService();
  }

  public async getProducts() {
    try {
      const { code, message } = await this.service.getProducts();
      return this.res.status(code).json(message);
    } catch (error) {
      this.next();
    }
  }

  public async registerProducts() {
    try {
      const { code, message } = await this.service.registerProducts(this.req.body);
      return this.res.status(code).json(message);
    } catch (error) {
      this.next();
    }
  }
}
