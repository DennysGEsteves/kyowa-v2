import { ProductShapeEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_SHAPE_REPOSITORY = Symbol('PRODUCT_SHAPE_REPOSITORY');

export type IProductShapeRepository =
  IProductLookupRepository<ProductShapeEntity>;
