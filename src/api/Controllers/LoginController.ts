import { Request, Response } from 'express';
import Token from '../Middlewares/Token';
import statusCodes from '../statusCodes';
import HttpException from '../Utils/HttpException';

export default class LoginController {
  static login(
    req: Request,
    res: Response,
  ) {
    try {
      const { id, username, email } = req.body;
      const user = { id, username, email };
      const token = Token.createToken(user);
      const hasItBeenValidated = Token.isTokenValid(token);
      if (!hasItBeenValidated.validated) {
        throw Error();
      }
      return res.status(statusCodes.ok).json({ login: token });
    } catch (error) {
      throw new HttpException(401, 'Invalid Token');
    }
  }
}
