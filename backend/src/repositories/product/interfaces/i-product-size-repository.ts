import { ProductSizeEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_SIZE_REPOSITORY = Symbol('PRODUCT_SIZE_REPOSITORY');

export type IProductSizeRepository =
  IProductLookupRepository<ProductSizeEntity>;
