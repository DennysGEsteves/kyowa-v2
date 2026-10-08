import { SealStatus } from './seal-status';

export interface SealSearchItem {
  id: string;
  number: number;
  status: SealStatus;
  productId: string;
  productName: string;
  sellPrice: number | null;
  storeId: string;
  storeName: string;
}
