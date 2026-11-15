import { SealEntity } from '../../../entities/seal';
import { SealStatus } from '../../../entities/seal/types/seal-status';

export const SEAL_REPOSITORY = Symbol('SEAL_REPOSITORY');

export interface ISealRepository {
  create(data: SealEntity): Promise<SealEntity>;
  findById(id: string): Promise<SealEntity | null>;
  findByIds(ids: string[]): Promise<SealEntity[]>;
  findByNumber(number: number): Promise<SealEntity[]>;
  findByStoreIdAndNumber(
    storeId: string,
    number: number,
  ): Promise<SealEntity | null>;
  update(
    id: string,
    data: {
      number: number;
      storeId: string;
      productId: string;
    },
    historyEntry: SealEntity['history'][number],
  ): Promise<SealEntity | null>;
  updateCheckoutAssignment(
    id: string,
    data: {
      status: SealStatus;
      saleId: string | null;
    },
    historyEntry: SealEntity['history'][number],
  ): Promise<SealEntity | null>;
}
