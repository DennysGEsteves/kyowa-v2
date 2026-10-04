import { ProductEntity } from '../../../entities/product';
import { PaginatedResult } from '../../../shared/types/pagination';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface ProductListFilters {
  name?: string;
}

export interface ProductUpdatePricesListFilters {
  name?: string;
  providerIds?: string[];
  categoryId?: string;
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
  findPaginatedForPriceUpdate(
    filters: ProductUpdatePricesListFilters,
    pagination: ProductPaginationParams,
  ): Promise<PaginatedResult<ProductEntity>>;
  updateProducsSellPrice(
    filters: ProductUpdatePricesListFilters,
    adjustmentPercent: number,
  ): Promise<number>;
  searchByName(name: string, limit: number): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, data: ProductEntity): Promise<ProductEntity | null>;
  delete(id: string): Promise<boolean>;
}
