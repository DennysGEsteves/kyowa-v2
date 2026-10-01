import { ProductSizeEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_SIZE_REPOSITORY = Symbol('PRODUCT_SIZE_REPOSITORY');

export type CreateProductSizeData = CreateProductLookupData;
export type UpdateProductSizeData = UpdateProductLookupData;
export type IProductSizeRepository = IProductLookupRepository<ProductSizeEntity>;
