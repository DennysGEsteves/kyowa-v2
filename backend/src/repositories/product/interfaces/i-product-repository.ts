import { ProductEntity } from '../../../entities/product';

export const PRODUCT_REPOSITORY = Symbol('PRODUCT_REPOSITORY');

export interface CreateProductData {
  name: string;
  fantasyName: string;
  nameFilter?: string;
  ezId?: number | null;
  providerId?: string | null;
  categoryId?: string | null;
  ref?: string | null;
  unitId?: string | null;
  colorId?: string | null;
  sizeId?: string | null;
  designId?: string | null;
  shapeId?: string | null;
  originId?: string | null;
  modelId?: string | null;
  ncm?: string | null;
  cst?: string | null;
  ean?: string | null;
  buyPrice?: number | null;
  sellPrice?: number | null;
  hasSeals?: boolean | null;
  amountStart?: number | null;
  amountSold?: number | null;
  amountUnlimited?: boolean;
}

export interface UpdateProductData {
  name?: string;
  fantasyName?: string;
  nameFilter?: string;
  ezId?: number | null;
  providerId?: string | null;
  categoryId?: string | null;
  ref?: string | null;
  unitId?: string | null;
  colorId?: string | null;
  sizeId?: string | null;
  designId?: string | null;
  shapeId?: string | null;
  originId?: string | null;
  modelId?: string | null;
  ncm?: string | null;
  cst?: string | null;
  ean?: string | null;
  buyPrice?: number | null;
  sellPrice?: number | null;
  hasSeals?: boolean | null;
  amountStart?: number | null;
  amountSold?: number | null;
  amountUnlimited?: boolean;
}

export interface IProductRepository {
  create(data: CreateProductData): Promise<ProductEntity>;
  findAll(): Promise<ProductEntity[]>;
  findById(id: string): Promise<ProductEntity | null>;
  update(id: string, data: UpdateProductData): Promise<ProductEntity | null>;
  delete(id: string): Promise<boolean>;
}
