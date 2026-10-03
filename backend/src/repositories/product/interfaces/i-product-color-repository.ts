import { ProductColorEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_COLOR_REPOSITORY = Symbol('PRODUCT_COLOR_REPOSITORY');

export type IProductColorRepository =
  IProductLookupRepository<ProductColorEntity>;
