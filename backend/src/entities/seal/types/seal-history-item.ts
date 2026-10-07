import { SealStatus } from './seal-status';

export type SealHistoryItem = {
  status: SealStatus;
  userId: string;
  data: Record<string, unknown>;
  createdAt: Date;
};
