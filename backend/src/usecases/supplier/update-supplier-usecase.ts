import { Injectable, Scope } from '@nestjs/common';
import { SupplierEntity } from 'src/entities';
import { SupplierMapper } from 'src/adapters/mappers/supplier';
// import { UpsertSupplierDTO } from 'src/controllers/supplier/dtos';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';
import { UpsertSupplierDTO } from 'src/controllers/supplier/dto';

@Injectable({ scope: Scope.REQUEST })
export class UpdateSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(dto: UpsertSupplierDTO): Promise<SupplierEntity> {
    const supplier = SupplierMapper.fromUpsertSupplierDTO(dto);
    await this.supplierRepository.update(supplier);
    return supplier;
  }
}
