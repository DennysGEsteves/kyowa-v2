import { SealStatus } from '../../seal/types/seal-status';

export interface StockSealItem {
  id: string;
  number: number;
  status: SealStatus;
}
