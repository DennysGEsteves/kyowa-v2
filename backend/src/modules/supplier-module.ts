import { Module } from '@nestjs/common';
import {
  CreateSupplierUseCase,
  GetSuppliersUseCase,
  UpdateSupplierUseCase,
  DeleteSupplierUseCase,
} from 'src/usecases/supplier';
import { SupplierController } from 'src/controllers/supplier/supplier-controller';
import { ISupplierRepository } from 'src/repositories/supplier/interfaces/i-supplier-repository';
import { SupplierRepository } from 'src/repositories/supplier/supplier-repository';

@Module({
  imports: [],
  controllers: [SupplierController],
  providers: [
    CreateSupplierUseCase,
    GetSuppliersUseCase,
    UpdateSupplierUseCase,
    DeleteSupplierUseCase,
    { provide: ISupplierRepository, useClass: SupplierRepository },
  ],
  exports: [ISupplierRepository],
})
export class SupplierModule {}
