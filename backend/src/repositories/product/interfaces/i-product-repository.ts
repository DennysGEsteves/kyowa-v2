import { ProductEntity } from '../../../entities/product';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface IProductRepository {
  create(data: ProductEntity): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, data: ProductEntity): Promise<ProductEntity | null>;
  delete(id: string): Promise<boolean>;
}
