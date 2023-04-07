import IUser from '../Interfaces/IUser';
import Token from '../Middlewares/Token';
import statusCodes from '../statusCodes';
import HttpException from '../Utils/HttpException';

export default class LoginService {
  protected token: Token;
  constructor() {
    this.token = new Token();
  }

  public async login(userBody: IUser): Promise<{ code: number; message: string }> {
    try {
      const { username, email } = userBody;
      const user = { username, email };
      const token = this.token.createToken(user);
      const hasItBeenValidated = this.token.isTokenValid(token);
      if (!hasItBeenValidated.validated) {
        throw new Error(hasItBeenValidated.message as string);
      }
      return { code: statusCodes.ok, message: token };
    } catch (error: any) {
      console.log(typeof error);
      throw new HttpException(statusCodes.unauthorized, error.message);
    }
  }
}
