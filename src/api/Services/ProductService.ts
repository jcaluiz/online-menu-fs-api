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
    return { code: statusCodes.ok, message: ProductService.productDomain(registeredProduct) };
  }

  public async getProductById(id: string) {
    try {
      if (!id) throw new HttpException(statusCodes.notFound, 'Id Not Found');
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
      if (!id) throw new HttpException(statusCodes.notFound, 'Id Not Found');
      if (Object.keys(product).length < 4) {
        throw new HttpException(statusCodes.notFound, 'Product is empty or an item is missing');
      }
      const updatedProduct = await this.productODM.update(id, product);
      if (!updatedProduct) throw new HttpException(statusCodes.notFound, 'Product Not Found');
      return { code: statusCodes.ok, message: ProductService.productDomain(updatedProduct) };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new HttpException(error.status, error.message);
    }
  }
}
