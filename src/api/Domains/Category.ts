import { ICategory } from '../Interfaces/ICategory';

export default class Category {
  protected id: string | undefined;
  protected parent: ICategory | null | undefined;
  protected name: string;

  constructor(category: ICategory) {
    this.id = category._id;
    this.parent = category.parent;
    this.name = category.name;
  }
}
