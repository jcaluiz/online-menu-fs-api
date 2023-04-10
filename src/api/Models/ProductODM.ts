import { Schema, Types, UpdateQuery } from 'mongoose';
import { IProduct } from '../Interfaces/IProduct';
import AbstractODM from './AbstractODM';

export default class ProductODM extends AbstractODM<IProduct> {
  constructor() {
    const schema = new Schema<IProduct>({
      categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: true }],
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
    const productWithObjectIds = {
      ...product,
      categories: product.categories.map(({ id }) => new Types.ObjectId(id)),
    };
    return this.model.create(productWithObjectIds);
  }

  public async findById(id: string) {
    try {
      return await this.model.findById(id);
    } catch (error) {
      return null;
    }
  }

  public async update(id: string, product: IProduct) {
    try {
      const productWithObjectIds = {
        ...product,
        categories: product.categories.map(({ _id }) => new Types.ObjectId(_id)),
      };
      return await this.model.findOneAndUpdate(
        { _id: id },
        { ...productWithObjectIds } as UpdateQuery<IProduct>,
        { new: true },
      );
    } catch (error) {
      return null;
    }
  }

  public async delete(id: string) {
    try {
      return await this.model.findOneAndDelete(
        { _id: id },
      );
    } catch (error) {
      return null;
    }
  }
}
