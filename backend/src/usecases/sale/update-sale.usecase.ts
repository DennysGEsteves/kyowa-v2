import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateSaleDto } from '../../controllers/sale/dto/update-sale.dto';
import { SaleEntity } from '../../entities/sale';
import {
  ISaleRepository,
  SALE_REPOSITORY,
} from '../../repositories/sale/interfaces/i-sale-repository';

@Injectable()
export class UpdateSaleUseCase {
  constructor(
    @Inject(SALE_REPOSITORY)
    private readonly saleRepository: ISaleRepository,
  ) {}

  async execute(id: string, dto: UpdateSaleDto): Promise<SaleEntity> {
    const sale = await this.saleRepository.findById(id);

    if (!sale?.id) {
      throw new NotFoundException('Venda não encontrada.');
    }

    const updatedEntity = SaleEntity.fromUpdateSaleDto(sale, dto);
    const updated = await this.saleRepository.update(id, updatedEntity);

    if (!updated) {
      throw new BadRequestException('Não foi possível atualizar a venda.');
    }

    return updated;
  }
}
