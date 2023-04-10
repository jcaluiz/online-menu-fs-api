import { Schema } from 'mongoose';
import { ICategory } from '../Interfaces/ICategory';
import AbstractODM from './AbstractODM';
// import * as data from '../data/categories.json';

export default class CategoryODM extends AbstractODM<ICategory> {
  constructor() {
    const schema = new Schema<ICategory>({
      parent: { type: Object, required: false },
      name: { type: String, required: true },
    });
    super(schema, 'Category');
  }

  public async findAll() {
    return this.model.find({});
  }

  public async findByCategoryName(name: string) {
    return this.model.find({ name });
  }
}
