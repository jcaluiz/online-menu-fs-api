import IUser from '../Interfaces/IUser';
import Token from '../Middlewares/Token';
import LoginODM from '../Models/LoginODM';
import statusCodes from '../shared/statusCodes';
import HttpException from '../Util/HttpException';

export default class LoginService {
  protected token: Token;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  protected loginODM: LoginODM;

  constructor() {
    this.token = new Token();
    this.loginODM = new LoginODM();
  }

  // public async loginAccessRecord() {
  //   try {
  //     const allAcess = await this.loginODM.findAll();
  //     if (allAcess.length < 1) {
  //       throw new HttpException(statusCodes.notFound, 'There was no access');
  //     }
  //     return {
  //       code: statusCodes.ok,
  //       message: allAcess,
  //     };
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (error: any) {
  //     throw new HttpException(error.status, error.message);
  //   }
  // }

  public async login(userBody: IUser): Promise<{ code: number; message: string }> {
    try {
      const { username, email, password } = userBody;
      const user = { username, email, password };
      const token = this.token.createToken(user);
      const hasItBeenValidated = this.token.isTokenValid(token);
      if (!hasItBeenValidated.validated) {
        throw new HttpException(statusCodes.unauthorized, hasItBeenValidated.message as string);
      }
      const checkAccess = await this.loginODM.findOne({ email, password });
      if (checkAccess === null) {
        throw new HttpException(statusCodes.notFound, 'Usuário não encontrado');
      }
      console.log(checkAccess);
      return { code: statusCodes.ok, message: token };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
