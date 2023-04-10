import Category from '../Domains/Category';
import Product from '../Domains/Product';
import { ICategory } from '../Interfaces/ICategory';
import { IProduct } from '../Interfaces/IProduct';
import CategoryODM from '../Models/CategoryODM';
import ProductODM from '../Models/ProductODM';
import HttpException from '../Util/HttpException';
import statusCodes from '../shared/statusCodes';
import CategoryService from './CategoryService';

export default class ProductService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private productODM: ProductODM;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private categoryODM: CategoryODM;
  private idNotFound: string;

  constructor() {
    this.productODM = new ProductODM();
    this.categoryODM = new CategoryODM();
    this.idNotFound = 'Invalid Id';
  }

  private static productDomain(product: IProduct | null): Product | null {
    if (product) {
      const newProduct = {
        _id: product._id?.toString(),
        categories: product.categories,
        name: product.name,
        qty: product.qty,
        price: product.price,
      };
      return new Product(newProduct);
    }
    return null;
  }

  public async getProducts() {
    try {
      const allProducts = await this.productODM.findAll();
      if (allProducts.length < 1) {
        throw new HttpException(statusCodes.notFound, 'The Product Collection is empty');
      }
      return {
        code: statusCodes.ok,
        message: allProducts.map((product) => ProductService.productDomain(product)),
      };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  public async findByCategoryName(product: IProduct) {
    const categories = await Promise.all(product.categories.map(async (item: ICategory) => {
      const findCategory = await this.categoryODM.findByCategoryName(item.name);
      const formatCategory: Category | null = CategoryService.categoryDomain(findCategory[0]);
      return { name: '', parent: null, ...formatCategory };
    }));
    return categories;
  }

  public async registerProducts(product: IProduct) {
    try {
      const categories = await new ProductService().findByCategoryName(product);
      const registered = await this.productODM.create({ ...product, categories });
      const productFormat = {
        id: registered._id,
        categories,
        name: registered.name,
        qty: registered.qty,
        price: registered.price,
      };
      return { code: statusCodes.created, message: productFormat };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  public async getProductById(id: string) {
    try {
      if (!id) throw new HttpException(statusCodes.notFound, this.idNotFound);
      const product = await this.productODM.findById(id);
      console.log(product);
      if (!product) throw new HttpException(statusCodes.unprocessable, 'Invalid Id');
      return { code: statusCodes.ok, message: ProductService.productDomain(product) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  public async updateProduct(id: string, product: IProduct) {
    try {
      if (!id) throw new HttpException(statusCodes.notFound, this.idNotFound);
      if (Object.keys(product).length < 4) {
        throw new HttpException(statusCodes.notFound, 'Product is empty or an item is missing');
      }
      const categories = await new ProductService().findByCategoryName(product);
      const updatedProduct = await this.productODM.update(id, { ...product, categories });
      console.log(updatedProduct);
      if (!updatedProduct) throw new HttpException(statusCodes.notFound, 'Product Not Found');
      return { code: statusCodes.created, message: ProductService.productDomain(updatedProduct) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }

  public async deleteProduct(id: string) {
    try {
      if (!id) throw new HttpException(statusCodes.notFound, this.idNotFound);
      const deletedProduct = await this.productODM.delete(id);
      return { code: statusCodes.ok, message: ProductService.productDomain(deletedProduct) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
