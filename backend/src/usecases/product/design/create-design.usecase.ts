import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDesignDto } from '../../../controllers/product-design/dto/create-product-design.dto';
import { ProductDesignEntity } from '../../../entities/product';
import {
  IProductDesignRepository,
  PRODUCT_DESIGN_REPOSITORY,
} from '../../../repositories/product/interfaces/i-product-design-repository';

@Injectable()
export class CreateProductDesignUseCase {
  constructor(
    @Inject(PRODUCT_DESIGN_REPOSITORY)
    private readonly repository: IProductDesignRepository,
  ) {}

  async execute(dto: CreateProductDesignDto): Promise<ProductDesignEntity> {
    const entity = ProductDesignEntity.fromCreateProductDesignDto(dto);
    return this.repository.create(entity);
  }
}
