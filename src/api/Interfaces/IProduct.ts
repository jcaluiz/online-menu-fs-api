import { ICategory } from './ICategory';

export interface IProduct {
  _id?: string;
  categories: Array<ICategory>;
  name: string;
  qty: number;
  price: number;
}
