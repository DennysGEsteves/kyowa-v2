import { SupplierEntity } from 'src/entities';
import { SupplierDB } from '../types';
import { PaginationArgs } from 'src/util/pagination';
import { ISupplierPagination } from './i-supplier-pagination';

export abstract class ISupplierRepository {
  abstract create(supplier: SupplierEntity): Promise<SupplierDB>;
  abstract update(supplier: SupplierEntity): Promise<SupplierDB>;
  abstract delete(supplierId: string): Promise<void>;
  abstract findAll(): Promise<SupplierDB[]>;
  abstract findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<ISupplierPagination>;
  abstract findAllByName(name: string): Promise<SupplierDB[]>;
  abstract findByEmail(email: string): Promise<SupplierDB>;
}
