import { SealEntity } from '../../../entities/seal';

export const SEAL_REPOSITORY = Symbol('SEAL_REPOSITORY');

export interface ISealRepository {
  create(data: SealEntity): Promise<SealEntity>;
  findById(id: string): Promise<SealEntity | null>;
  findByIds(ids: string[]): Promise<SealEntity[]>;
  findByNumber(number: number): Promise<SealEntity[]>;
  update(
    id: string,
    data: {
      number: number;
      storeId: string;
      productId: string;
    },
    historyEntry: SealEntity['history'][number],
  ): Promise<SealEntity | null>;
}
