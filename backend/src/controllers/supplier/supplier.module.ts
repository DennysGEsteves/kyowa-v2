import { Module } from '@nestjs/common';
import { SupplierResolver } from './supplier.resolver';
import {
  CreateSupplierUseCase,
  GetSuppliersUseCase,
  UpdateSupplierUseCase,
  GetSupplierByIdUseCase,
} from 'src/usecases/supplier';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';
import { SupplierRepository } from 'src/repositories/supplier/supplier-repository';

@Module({
  providers: [
    SupplierResolver,
    CreateSupplierUseCase,
    GetSuppliersUseCase,
    UpdateSupplierUseCase,
    GetSupplierByIdUseCase,
    { provide: ISupplierRepository, useClass: SupplierRepository },
  ],
})
export class SupplierModule {}
