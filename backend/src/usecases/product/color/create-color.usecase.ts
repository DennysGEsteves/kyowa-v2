import { Inject, Injectable } from '@nestjs/common';
import { CreateProductColorDto } from '../../../controllers/product-color/dto/create-product-color.dto';
import { ProductColorEntity } from '../../../entities/product';
import {
  IProductColorRepository,
  PRODUCT_COLOR_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-color-repository';

@Injectable()
export class CreateProductColorUseCase {
  constructor(
    @Inject(PRODUCT_COLOR_REPOSITORY)
    private readonly repository: IProductColorRepository,
  ) {}

  async execute(dto: CreateProductColorDto): Promise<ProductColorEntity> {
    const entity = ProductColorEntity.fromCreateProductColorDto(dto);
    return this.repository.create(entity);
  }
}
