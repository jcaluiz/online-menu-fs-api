import { NextFunction, Request, Response } from 'express';
import LoginService from '../Services/LoginService';
import IUser from '../Interfaces/IUser';

export default class LoginController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: LoginService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new LoginService();
  }

  public async login() {
    try {
      const user: IUser = {
        username: this.req.body.username,
        email: this.req.body.email,
      };
      const { code, message } = await this.service.login(user);
      return this.res.status(code).json({ token: message });
    } catch (error) {
      this.next(error);
    }
  }
}
