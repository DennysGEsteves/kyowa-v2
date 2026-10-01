import { ProductUnitEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_UNIT_REPOSITORY = Symbol('PRODUCT_UNIT_REPOSITORY');

export type CreateProductUnitData = CreateProductLookupData;
export type UpdateProductUnitData = UpdateProductLookupData;
export type IProductUnitRepository = IProductLookupRepository<ProductUnitEntity>;
