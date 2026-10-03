import { ProductCategoryEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_CATEGORY_REPOSITORY = Symbol(
  'PRODUCT_CATEGORY_REPOSITORY',
);

export type IProductCategoryRepository =
  IProductLookupRepository<ProductCategoryEntity>;
