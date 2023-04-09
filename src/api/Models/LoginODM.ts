import { Schema } from 'mongoose';
import IUser from '../Interfaces/IUser';
import AbstractODM from './AbstractODM';

export default class LoginODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema<IUser>({
      username: { type: String, required: false },
      email: { type: String, required: true },
      password: { type: String, required: false },
    });
    super(schema, 'Users');
  }

  // public async create(user: IUser): Promise<IUser> {
  //   return this.model.create({ ...user });
  // }

  public async findOne(user: IUser) {
    return this.model.findOne({ ...user });
  }
}
