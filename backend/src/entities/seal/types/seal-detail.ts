import { SealStatus } from './seal-status';

export interface SealHistoryViewItem {
  status: SealStatus;
  userId: string;
  userName: string;
  data: Record<string, unknown>;
  createdAt: Date;
}

export interface SealDetail {
  id: string;
  number: number;
  status: SealStatus;
  productId: string;
  productName: string;
  productFantasyName: string | null;
  sellPrice: number | null;
  storeId: string;
  storeName: string;
  history: SealHistoryViewItem[];
  createdAt?: Date;
  updatedAt?: Date;
}
