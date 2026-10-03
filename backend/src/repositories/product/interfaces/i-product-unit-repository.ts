import { ProductUnitEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_UNIT_REPOSITORY = Symbol('PRODUCT_UNIT_REPOSITORY');

export type IProductUnitRepository =
  IProductLookupRepository<ProductUnitEntity>;
