import { SealEntity } from '../../../entities/seal';

export const SEAL_REPOSITORY = Symbol('SEAL_REPOSITORY');

export interface ISealRepository {
  create(data: SealEntity): Promise<SealEntity>;
  findById(id: string): Promise<SealEntity | null>;
  findByIds(ids: string[]): Promise<SealEntity[]>;
}
