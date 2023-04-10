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
      this.next(error);
    }
  }

  public async registerProducts() {
    try {
      let { price, ...rest } = this.req.body;
      const priceDecimal = parseFloat(price.toFixed(2));
      const { code, message } = await this.service.registerProducts({
        ...rest,
        price: priceDecimal});
      return this.res.status(code).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async getProductById() {
    try {
      const { id } = this.req.params;
      const { code, message } = await this.service.getProductById(id);
      return this.res.status(code).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateProduct() {
    try {
      const { params: { id }, body } = this.req;
      const { code, message } = await this.service.updateProduct(id, body);
      return this.res.status(code).json(message);
    } catch (error) {
      this.next(error);
    }
  }

  public async deleteProduct() {
    try {
      const { params: { id } } = this.req;
      const { code, message } = await this.service.deleteProduct(id);
      return this.res.status(code).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}
