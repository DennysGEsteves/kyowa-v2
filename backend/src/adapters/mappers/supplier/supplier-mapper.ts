import { SupplierEntity as SupplierEntity } from 'src/entities';
// import { UpsertSupplierDTO } from 'src/controllers/supplier/dtos';
import { SupplierDB } from 'src/repositories/supplier/types';
import { UpsertSupplierDTO } from 'src/controllers/supplier/dto';
import { slugify } from 'src/util/string';
import { ProductDB } from 'src/repositories/product/types';

export class SupplierMapper {
  static fromUpsertSupplierDTO(dto: UpsertSupplierDTO): SupplierEntity {
    return new SupplierEntity({
      ...(dto.mid
        ? {
            mid: dto.mid,
          }
        : {
            nameFilter: slugify(dto.name),
          }),
      name: dto.name,
      cnpj: dto.cnpj,
      im: dto.im,
      ie: dto.ie,
      email: dto.email,
      address: dto.address,
      phone: dto.phone,
      obs: dto.obs,
    });
  }

  static fromDB(supplier: SupplierDB): SupplierEntity {
    return new SupplierEntity({
      mid: supplier.mid,
      id: supplier.id,
      name: supplier.name,
      nameFilter: supplier.nameFilter,
      cnpj: supplier.cnpj,
      im: supplier.im,
      ie: supplier.ie,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
      obs: supplier.obs,
      active: supplier.active,
    });
  }

  static fromDBList(suppliers: SupplierDB[]): SupplierEntity[] {
    return suppliers.map((supplier) => SupplierMapper.fromDB(supplier));
  }

  static fromProductDB({ supplier }: ProductDB): SupplierEntity {
    return new SupplierEntity({
      mid: supplier.mid,
      id: supplier.id,
      name: supplier.name,
      nameFilter: supplier.nameFilter,
      cnpj: supplier.cnpj,
      im: supplier.im,
      ie: supplier.ie,
      email: supplier.email,
      address: supplier.address,
      phone: supplier.phone,
      obs: supplier.obs,
      active: supplier.active,
    });
  }
}
