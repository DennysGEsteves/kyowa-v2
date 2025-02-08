import { SupplierEntity } from 'src/entities';
import { SupplierDB } from '../types';

export abstract class ISupplierRepository {
  abstract create(supplier: SupplierEntity): Promise<SupplierDB>;
  abstract update(supplier: SupplierEntity): Promise<SupplierDB>;
  abstract delete(supplierId: string): Promise<void>;
  abstract findAll(): Promise<SupplierDB[]>;
  abstract findByEmail(email: string): Promise<SupplierDB>;
}
