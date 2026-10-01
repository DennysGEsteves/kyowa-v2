import { ProductCategoryEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_CATEGORY_REPOSITORY = Symbol('PRODUCT_CATEGORY_REPOSITORY');

export type CreateProductCategoryData = CreateProductLookupData;
export type UpdateProductCategoryData = UpdateProductLookupData;
export type IProductCategoryRepository =
  IProductLookupRepository<ProductCategoryEntity>;
