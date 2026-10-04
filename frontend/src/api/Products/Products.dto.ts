import type { ListNameParams } from "@/types/list-params";
import type { Product } from "@entities";

export type ListProductsParams = ListNameParams;

export type ProductNameSuggestion = {
  id: string;
  name: string;
  fantasyName: string;
};

export type ProductPriceUpdateListItem = Product & {
  category?: { id: string; name: string } | null;
  provider?: { id: string; name: string } | null;
};

export type ListUpdatePricesProductsParams = {
  page?: number;
  limit?: number;
  name?: string;
  providerName?: string;
  categoryId?: string;
};

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
