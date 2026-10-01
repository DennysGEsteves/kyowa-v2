import { ProductHeightEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_HEIGHT_REPOSITORY = Symbol('PRODUCT_HEIGHT_REPOSITORY');

export type CreateProductHeightData = CreateProductLookupData;
export type UpdateProductHeightData = UpdateProductLookupData;
export type IProductHeightRepository =
  IProductLookupRepository<ProductHeightEntity>;
