import { ProductShapeEntity } from '../../../entities/product';
import {
  CreateProductLookupData,
  IProductLookupRepository,
  UpdateProductLookupData,
} from './product-lookup-repository.types';

export const PRODUCT_SHAPE_REPOSITORY = Symbol('PRODUCT_SHAPE_REPOSITORY');

export type CreateProductShapeData = CreateProductLookupData;
export type UpdateProductShapeData = UpdateProductLookupData;
export type IProductShapeRepository = IProductLookupRepository<ProductShapeEntity>;
