import { NextFunction, Request, Response } from 'express';
import statusCodes from '../shared/statusCodes';
import Token from './Token';

export default class Authorization {
  private req: Request;
  private res: Response;
  private next: NextFunction;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  public authentication() {
    const { authorization } = this.req.headers;

    if (!authorization) {
      return this.res.status(statusCodes.unauthorized).json({ message: 'Token not found' });
    }

    const tokenClass = new Token();

    const { validated, message } = tokenClass.isTokenValid(authorization);

    if (!validated) {
      return this.res.status(statusCodes.unauthorized).json({ message });
    }

    this.next();
  }
}
