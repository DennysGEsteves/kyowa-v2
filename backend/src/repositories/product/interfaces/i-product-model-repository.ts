import { ProductModelEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_MODEL_REPOSITORY = Symbol('PRODUCT_MODEL_REPOSITORY');

export type IProductModelRepository =
  IProductLookupRepository<ProductModelEntity>;
