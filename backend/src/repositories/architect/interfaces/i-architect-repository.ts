import { ArchitectEntity } from '../../../entities/architect';

export const ARCHITECT_REPOSITORY = Symbol('ARCHITECT_REPOSITORY');

export interface IArchitectRepository {
  create(data: ArchitectEntity): Promise<ArchitectEntity>;
  findAll(): Promise<ArchitectEntity[]>;
  findById(id: string): Promise<ArchitectEntity | null>;
  update(id: string, data: ArchitectEntity): Promise<ArchitectEntity | null>;
  delete(id: string): Promise<boolean>;
}
