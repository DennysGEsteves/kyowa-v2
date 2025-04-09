import { Injectable } from '@nestjs/common';
import { SupplierMapper } from 'src/adapters/mappers/supplier';
import { SupplierEntity } from 'src/entities';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';

@Injectable()
export class GetSupplierByIdUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(supplierId: number): Promise<SupplierEntity> {
    const supplierDB = await this.supplierRepository.findById(supplierId);
    return SupplierMapper.fromDB(supplierDB);
  }
}
