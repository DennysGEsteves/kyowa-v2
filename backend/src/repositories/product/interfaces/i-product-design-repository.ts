import { ProductDesignEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_DESIGN_REPOSITORY = Symbol('PRODUCT_DESIGN_REPOSITORY');

export type CreateProductDesignData = CreateProductLookupData;
export type UpdateProductDesignData = UpdateProductLookupData;
export type IProductDesignRepository =
  IProductLookupRepository<ProductDesignEntity>;
