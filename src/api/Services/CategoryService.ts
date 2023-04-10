import { ICategory } from '../Interfaces/ICategory';
import HttpException from '../Util/HttpException';
import statusCodes from '../shared/statusCodes';
import Category from '../Domains/Category';
import CategoryODM from '../Models/CategoryODM';
// import * as data from '../data/categories.json';

export default class CategoryService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private categoryODM: CategoryODM;

  constructor() {
    this.categoryODM = new CategoryODM();
  }

  public static categoryDomain(category: ICategory | null): Category | null {
    if (category) {
      const newCategory = {
        _id: category._id?.toString(),
        parent: category.parent,
        name: category.name,
      };
      return new Category(newCategory);
    }
    return null;
  }

  public async getCategories() {
    try {
      const allCategories = await this.categoryODM.findAll();
      return {
        code: statusCodes.ok,
        message: allCategories.map((category) => CategoryService.categoryDomain(category)),
      };
    } catch (error) {
      throw new HttpException(statusCodes.notFound, 'Products Not Found');
    }
  }

  // public async createCategories() {
  //   const newData = Object.values(data).filter((item) => !Array.isArray(item));
  //   console.log(newData);
  //   const create = await this.categoryODM.create();
  //   console.log('service linha 44');
  //   return create;
  // }
}
