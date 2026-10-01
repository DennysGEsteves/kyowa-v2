import { ProductModelEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_MODEL_REPOSITORY = Symbol('PRODUCT_MODEL_REPOSITORY');

export type CreateProductModelData = CreateProductLookupData;
export type UpdateProductModelData = UpdateProductLookupData;
export type IProductModelRepository = IProductLookupRepository<ProductModelEntity>;
