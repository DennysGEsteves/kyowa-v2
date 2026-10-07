import type { ListPaginationParams } from "@types/list-params";
import type { Stock } from "@entities";

export type ListStockParams = ListPaginationParams;

export type CreateStockDTO = {
  productId: string;
  storeId: string;
  userId: string;
  sealNumbers: number[];
  createdAt?: string;
};
