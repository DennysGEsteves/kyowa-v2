import { Injectable } from '@nestjs/common';
import { SupplierEntity } from 'src/entities';
import { SupplierMapper } from 'src/adapters/mappers/supplier';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';

@Injectable()
export class GetSuppliersUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(): Promise<SupplierEntity[]> {
    const suppliersDB = await this.supplierRepository.findAll();
    const suppliers = SupplierMapper.fromDBList(suppliersDB);
    return suppliers;
  }
}
