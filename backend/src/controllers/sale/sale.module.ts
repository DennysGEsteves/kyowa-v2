import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SALE_REPOSITORY } from '../../repositories/sale/interfaces/i-sale-repository';
import { SaleRepository } from '../../repositories/sale/sale.repository';
import { Sale, SaleSchema } from '../../repositories/sale/schemas/sale.schema';
import { CreateSaleUseCase } from '../../usecases/sale/create-sale.usecase';
import { GetSaleByIdUseCase } from '../../usecases/sale/get-sale-by-id.usecase';
import { ListSalesPaginatedUseCase } from '../../usecases/sale/list-sales-paginated.usecase';
import { UpdateSaleUseCase } from '../../usecases/sale/update-sale.usecase';
import { SaleController } from './sale.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sale.name, schema: SaleSchema }]),
  ],
  controllers: [SaleController],
  providers: [
    {
      provide: SALE_REPOSITORY,
      useClass: SaleRepository,
    },
    CreateSaleUseCase,
    GetSaleByIdUseCase,
    ListSalesPaginatedUseCase,
    UpdateSaleUseCase,
  ],
  exports: [SALE_REPOSITORY],
})
export class SaleModule {}
