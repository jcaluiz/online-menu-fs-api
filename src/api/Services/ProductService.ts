import Product from '../Domains/Product';
import { IProduct } from '../Interfaces/IProduct';
import ProductODM from '../Models/ProductODM';
import HttpException from '../Utils/HttpException';
import statusCodes from '../shared/statusCodes';

export default class ProductService {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private productODM: ProductODM;

  constructor() {
    this.productODM = new ProductODM();
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
      console.log(newProduct);
      return new Product(newProduct);
    }
    return null;
  }

  public async getProducts() {
    try {
      const allProducts = await this.productODM.findAll();
      return {
        code: statusCodes.ok,
        message: allProducts.map((product) => ProductService.productDomain(product)),
      };
    } catch (error) {
      throw new HttpException(statusCodes.notFound, 'Products Not Found');
    }
  }

  public async registerProducts(product: IProduct) {
    const registeredProduct = await this.productODM.create(product);
    return { code: statusCodes.ok, message: registeredProduct };
  }
}
