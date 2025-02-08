import { Injectable } from '@nestjs/common';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';

@Injectable()
export class DeleteSupplierUseCase {
  constructor(private readonly supplierRepository: ISupplierRepository) {}

  async execute(supplierId: string): Promise<void> {
    return this.supplierRepository.delete(supplierId);
  }
}
