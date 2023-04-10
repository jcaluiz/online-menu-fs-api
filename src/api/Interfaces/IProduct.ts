import { ICategory } from './ICategory';

/**
 * @author Luiz Alberto Carreiro Junior
 * @description Interface that corresponds to PRODUCT properties
 * @argument _id Corresponds to the ID of PRODUCT
 * @argument categories Corresponds to the categories that the PRODUCT belongs to
 * @argument name Corresponds to the product name
 * @argument qty Corresponds to the quantity of products stocked
 * @argument price Corresponds to the price of the product
 */

export interface IProduct {
  _id?: string;
  categories: Array<ICategory>;
  name: string;
  qty: number;
  price: number;
}
