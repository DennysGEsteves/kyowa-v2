import { ProductDesignEntity } from '../../../entities/product';
import { IProductLookupRepository } from './product-lookup-repository.types';

export const PRODUCT_DESIGN_REPOSITORY = Symbol('PRODUCT_DESIGN_REPOSITORY');

export type IProductDesignRepository =
  IProductLookupRepository<ProductDesignEntity>;
