import { Injectable, Scope } from '@nestjs/common';
import { SupplierEntity } from 'src/entities';
import { SupplierMapper } from 'src/adapters/mappers/supplier';
import { UpsertSupplierDTO } from 'src/controllers/supplier/dtos';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';

@Injectable({ scope: Scope.REQUEST })
export class UpdateSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(
    dto: UpsertSupplierDTO,
    supplierId: number,
  ): Promise<SupplierEntity> {
    const supplier = SupplierMapper.fromUpsertSupplierDTO(dto, supplierId);
    await this.supplierRepository.update(supplier);
    return supplier;
  }
}
