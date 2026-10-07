import { StockSealItem } from './stock-seal-item';

export interface StockDetail {
  id: string;
  productId: string;
  storeId: string;
  userId: string;
  sealIds: string[];
  createdAt: Date;
  seals: StockSealItem[];
}
