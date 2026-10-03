import { ProductHeightEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_HEIGHT_REPOSITORY = Symbol('PRODUCT_HEIGHT_REPOSITORY');

export type IProductHeightRepository =
  IProductLookupRepository<ProductHeightEntity>;
