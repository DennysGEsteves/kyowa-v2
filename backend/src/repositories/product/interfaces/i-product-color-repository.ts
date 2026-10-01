import { ProductColorEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_COLOR_REPOSITORY = Symbol('PRODUCT_COLOR_REPOSITORY');

export type CreateProductColorData = CreateProductLookupData;
export type UpdateProductColorData = UpdateProductLookupData;
export type IProductColorRepository = IProductLookupRepository<ProductColorEntity>;
