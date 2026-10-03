import type { ListNameParams } from "@/types/list-params";

export type ListProductsParams = ListNameParams;

export type CreateProductDTO = {
  name: string;
  fantasyName: string;
  categoryId?: string;
  ref?: string;
  unitId?: string;
  colorId?: string;
  sizeId?: string;
  designId?: string;
  shapeId?: string;
  originId?: string;
  modelId?: string;
  ncm?: string;
  cst?: string;
  ean?: string;
  buyPrice?: number;
  sellPrice?: number;
  hasSeals?: boolean;
  amountStart?: number;
  amountUnlimited?: boolean;
  isEcommerce?: boolean;
};

export type UpdateProductDTO = {
  name?: string;
  fantasyName?: string;
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
  isEcommerce?: boolean;
};
