import jwt from 'jsonwebtoken';
import 'dotenv/config';
import IUser from '../Interfaces/IUser';

export default class Token {
  static createToken = (user: IUser): string => {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const token = jwt.sign(user, secret, {
      expiresIn: '1d',
      algorithm: 'HS256',
    });
    return token;
  };

  static isTokenValid = (token: string) => {
    try {
      const secret = process.env.JWT_SECRET || 'jwt_secret';
      const data = jwt.verify(token, secret);
      return { validated: true, message: data };
    } catch (error) {
      throw new Error('Invalid Token');
    }
  };
}
