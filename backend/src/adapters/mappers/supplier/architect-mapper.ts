import { SupplierEntity as SupplierEntity } from 'src/entities';
// import { UpsertSupplierDTO } from 'src/controllers/supplier/dtos';
import { SupplierDB } from 'src/repositories/supplier/types';
import { SupplierType } from 'src/entities/supplier/types';

export class SupplierMapper {
  static fromUpsertSupplierDTO(dto: any, supplierId?: number): SupplierEntity {
    return new SupplierEntity({
      ...(supplierId ? { id: supplierId } : {}),
      name: dto.name,
      nameFilter: dto.nameFilter,
      cpnj: dto.cnpj,
      im: dto.im,
      ie: dto.ie,
      email: dto.email,
      address: dto.address,
      phone: dto.phone,
      obs: dto.obs,
      active: dto.active,
      type: dto.type,
    });
  }

  static fromDB(supplier: SupplierDB): SupplierEntity {
    return new SupplierEntity({
      id: supplier.id,
      name: supplier.name,
      nameFilter: supplier.nameFilter,
      cpnj: supplier.cpnj,
      im: supplier.im,
      ie: supplier.ie,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
      obs: supplier.obs,
      active: supplier.active,
      type: supplier.type as SupplierType,
    });
  }

  static fromDBList(suppliers: SupplierDB[]): SupplierEntity[] {
    return suppliers.map((supplier) => SupplierMapper.fromDB(supplier));
  }
}
