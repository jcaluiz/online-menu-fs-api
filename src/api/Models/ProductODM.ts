import { Schema } from 'mongoose';
import { IProduct } from '../Interfaces/IProduct';
import AbstractODM from './AbstractODM';

export default class ProductODM extends AbstractODM<IProduct> {
  constructor() {
    const schema = new Schema<IProduct>({
      categories: { type: [String], required: true },
      name: { type: String, required: true },
      qty: { type: Number, required: true },
      price: { type: Number, required: true },
    });
    super(schema, 'Product');
  }

  public async findAll() {
    return this.model.find({});
  }

  public async create(product: IProduct): Promise<IProduct> {
    return this.model.create(product);
  }

  public async findById(id: string) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      return null;
    }
  }
}
