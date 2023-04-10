import { ICategory } from '../Interfaces/ICategory';
import { IProduct } from '../Interfaces/IProduct';
// import Category from './Category';

export default class Product {
  protected id: string | undefined;
  protected categories: Array<ICategory>;
  protected name: string;
  protected qty: number;
  protected price: number;

  constructor(product: IProduct) {
    this.id = product._id;
    this.categories = product.categories;
    this.name = product.name;
    this.qty = product.qty;
    this.price = product.price;
  }
}
