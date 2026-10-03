import { Inject, Injectable } from '@nestjs/common';
import { CreateProductHeightDto } from '../../../controllers/product-height/dto/create-product-height.dto';
import { ProductHeightEntity } from '../../../entities/product';
import {
  IProductHeightRepository,
  PRODUCT_HEIGHT_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-height-repository';

@Injectable()
export class CreateProductHeightUseCase {
  constructor(
    @Inject(PRODUCT_HEIGHT_REPOSITORY)
    private readonly repository: IProductHeightRepository,
  ) {}

  async execute(dto: CreateProductHeightDto): Promise<ProductHeightEntity> {
    const entity = ProductHeightEntity.fromCreateProductHeightDto(dto);
    return this.repository.create(entity);
  }
}
