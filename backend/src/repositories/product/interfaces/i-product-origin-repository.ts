import { ProductOriginEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_ORIGIN_REPOSITORY = Symbol('PRODUCT_ORIGIN_REPOSITORY');

export type CreateProductOriginData = CreateProductLookupData;
export type UpdateProductOriginData = UpdateProductLookupData;
export type IProductOriginRepository =
  IProductLookupRepository<ProductOriginEntity>;
