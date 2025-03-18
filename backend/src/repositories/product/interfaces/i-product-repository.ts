import { ProductEntity } from 'src/entities';
import { ProductDB } from '../types';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { IProductPagination } from './i-product-pagination';

export abstract class IProductRepository {
  abstract create(product: ProductEntity): Promise<ProductDB>;
  abstract update(product: ProductEntity): Promise<ProductDB>;
  abstract delete(productId: string): Promise<void>;
  abstract findAll(paginationArgs?: PaginationArgs): Promise<ProductDB[]>;
  abstract findAllByName(name: string): Promise<ProductDB[]>;
  abstract findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<IProductPagination>;
  abstract findByEmail(email: string): Promise<ProductDB>;
}
