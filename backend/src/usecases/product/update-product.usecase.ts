import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from '../../controllers/product/dto/update-product.dto';
import { ProductEntity } from '../../entities/product';
import {
  IProductRepository,
  PRODUCT_REPOSITORY,
} from '../../repositories/product/interfaces/i-product-repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto): Promise<ProductEntity> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    const updatedEntity = ProductEntity.fromUpdateProductDto(product, dto);
    const updated = await this.productRepository.update(id, updatedEntity);
    if (!updated) {
      throw new NotFoundException('Produto não encontrado');
    }
    return updated;
  }
}
