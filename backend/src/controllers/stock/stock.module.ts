import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SealModule } from '../seal/seal.module';
import { STOCK_REPOSITORY } from '../../repositories/stock/interfaces/i-stock-repository';
import { StockRepository } from '../../repositories/stock/stock.repository';
import { Stock, StockSchema } from '../../repositories/stock/schemas/stock.schema';
import { CreateStockUseCase } from '../../usecases/stock/create-stock.usecase';
import { GetStockDetailUseCase } from '../../usecases/stock/get-stock-detail.usecase';
import { ListStockPaginatedUseCase } from '../../usecases/stock/list-stock-paginated.usecase';
import { StockController } from './stock.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    SealModule,
  ],
  controllers: [StockController],
  providers: [
    {
      provide: STOCK_REPOSITORY,
      useClass: StockRepository,
    },
    CreateStockUseCase,
    GetStockDetailUseCase,
    ListStockPaginatedUseCase,
  ],
  exports: [STOCK_REPOSITORY],
})
export class StockModule {}
