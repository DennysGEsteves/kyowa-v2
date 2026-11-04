import { Inject, Injectable } from '@nestjs/common';
import { CreateSaleDto } from '../../controllers/sale/dto/create-sale.dto';
import { SaleEntity } from '../../entities/sale';
import {
  ISaleRepository,
  SALE_REPOSITORY,
} from '../../repositories/sale/interfaces/i-sale-repository';

@Injectable()
export class CreateSaleUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(dto: CreateSaleDto): Promise<SaleEntity> {
    const sale = SaleEntity.fromCreateSaleDto(dto);
    return this.saleRepository.create(sale);
  }
}
