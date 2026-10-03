import { ProductOriginEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_ORIGIN_REPOSITORY = Symbol('PRODUCT_ORIGIN_REPOSITORY');

export type IProductOriginRepository =
  IProductLookupRepository<ProductOriginEntity>;
