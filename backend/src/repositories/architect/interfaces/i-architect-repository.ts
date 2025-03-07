import { ArchitectEntity as ArchitectEntity } from 'src/entities';
import { ArchitectDB } from '../types';
import { PaginationArgs } from 'src/controllers/pagination-args';
import { IArchitectPagination } from './i-pagination';

export abstract class IArchitectRepository {
  abstract create(architect: ArchitectEntity): Promise<ArchitectDB>;
  abstract update(architect: ArchitectEntity): Promise<ArchitectDB>;
  abstract delete(architectId: string): Promise<void>;
  abstract findAll(paginationArgs?: PaginationArgs): Promise<ArchitectDB[]>;
  abstract findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<IArchitectPagination>;
  abstract findByEmail(email: string): Promise<ArchitectDB>;
}
