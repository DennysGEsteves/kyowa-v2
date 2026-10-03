import { Inject, Injectable } from '@nestjs/common';
import { CreateProductOriginDto } from '../../../controllers/product-origin/dto/create-product-origin.dto';
import { ProductOriginEntity } from '../../../entities/product';
import {
  IProductOriginRepository,
  PRODUCT_ORIGIN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-origin-repository';

@Injectable()
export class CreateProductOriginUseCase {
  constructor(
    @Inject(PRODUCT_ORIGIN_REPOSITORY)
    private readonly repository: IProductOriginRepository,
  ) {}

  async execute(dto: CreateProductOriginDto): Promise<ProductOriginEntity> {
    const entity = ProductOriginEntity.fromCreateProductOriginDto(dto);
    return this.repository.create(entity);
  }
}
