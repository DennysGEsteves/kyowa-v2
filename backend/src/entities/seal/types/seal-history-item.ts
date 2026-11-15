import { SealStatus } from './seal-status';

export const SEAL_HISTORY_EVENT_CREATED = 'created';
export const SEAL_HISTORY_EVENT_ASSIGNED_TO_SALE_CHECKOUT =
  'assigned_to_sale_checkout';
export const SEAL_HISTORY_EVENT_RETURNED_TO_STOCK = 'returned_to_stock';
export const SEAL_HISTORY_EVENT_CONSIGNMENT_CONVERTED_TO_SALE =
  'consignment_converted_to_sale';

export type SealHistoryItem = {
  status: SealStatus;
  userId: string;
  data: Record<string, unknown>;
  createdAt: Date;
};
