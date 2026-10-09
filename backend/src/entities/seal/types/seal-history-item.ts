import { SealStatus } from './seal-status';

export const SEAL_HISTORY_EVENT_CREATED = 'created';

export type SealHistoryItem = {
  status: SealStatus;
  userId: string;
  data: Record<string, unknown>;
  createdAt: Date;
};
