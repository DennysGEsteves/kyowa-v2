import { ProductEntity } from '../../../entities/product';
import { PaginatedResult } from '../../../shared/types/pagination';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductListFilters {
  name?: string;
}

export interface ProductPaginationParams {
  page: number;
  limit: number;
}

export interface IProductRepository {
  create(data: ProductEntity): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findPaginated(
    filters: ProductListFilters,
    pagination: ProductPaginationParams,
  ): Promise<PaginatedResult<ProductEntity>>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, data: ProductEntity): Promise<ProductEntity | null>;
  delete(id: string): Promise<boolean>;
}
