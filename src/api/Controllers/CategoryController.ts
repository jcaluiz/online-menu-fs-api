import { NextFunction, Request, Response } from 'express';
import CategoryService from '../Services/CategoryService';

export default class CategoryController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CategoryService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CategoryService();
  }

  public async getCategories() {
    try {
      const { code, message } = await this.service.getCategories();
      return this.res.status(code).json(message);
    } catch (error) {
      this.next(error);
    }
  }
}
