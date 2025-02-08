import { ArchitectEntity as ArchitectEntity } from 'src/entities';
import { ArchitectDB } from '../types';

export abstract class IArchitectRepository {
  abstract create(architect: ArchitectEntity): Promise<ArchitectDB>;
  abstract update(architect: ArchitectEntity): Promise<ArchitectDB>;
  abstract delete(architectId: string): Promise<void>;
  abstract findAll(): Promise<ArchitectDB[]>;
  abstract findByEmail(email: string): Promise<ArchitectDB>;
}
