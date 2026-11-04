import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SaleEntity } from '../../entities/sale';
import {
  ISaleRepository,
  SALE_REPOSITORY,
} from '../../repositories/sale/interfaces/i-sale-repository';

@Injectable()
export class GetSaleByIdUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(id: string): Promise<SaleEntity> {
    const sale = await this.saleRepository.findById(id);

    if (!sale?.id) {
      throw new NotFoundException('Venda não encontrada.');
    }

    return sale;
  }
}
