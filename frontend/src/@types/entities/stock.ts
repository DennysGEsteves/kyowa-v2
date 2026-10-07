import type { StockSealItem } from "./seal";

export type Stock = {
  id: string;
  productId: string;
  storeId: string;
  userId: string;
  sealIds: string[];
  createdAt: string;
};

export type StockDetail = Stock & {
  seals: StockSealItem[];
};

export function getStockSealCount(stock: Stock): number {
  return stock.sealIds.length;
}
