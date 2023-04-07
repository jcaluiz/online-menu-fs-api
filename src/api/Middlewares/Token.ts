import jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../Interfaces/IUser';

export default class Token {
  public createToken = (user: IUser): string => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(user, secret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  };

  public isTokenValid = (token: string) => {
    try {
      const secret = process.env.JWT_SECRET || 'jwt_secret';
      const data = jwt.verify(token, secret);
      return { validated: true, message: data };
    } catch (error) {
      return { validated: false, message: 'Invalid Token' };
    }
  };

  public decode = (auth: string) => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const decoded = jwt.verify(auth, secret) as string;
    return decoded;
  };
}
