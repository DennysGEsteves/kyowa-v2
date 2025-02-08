import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/entities';
import { SupplierMapper } from 'src/adapters/mappers/supplier';
import { UpsertSupplierDTO } from 'src/controllers/supplier/dtos';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';

@Injectable()
export class CreateSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(dto: UpsertSupplierDTO): Promise<SupplierEntity> {
    const newSupplier = SupplierMapper.fromUpsertSupplierDTO(dto);
    const supplierDB = await this.supplierRepository.create(newSupplier);
    return SupplierMapper.fromDB(supplierDB);
  }
}
