import { Injectable, Scope } from '@nestjs/common';
import { ProductEntity } from 'src/entities';
import { ProductMapper } from 'src/adapters/mappers/product';
import { IProductRepository } from 'src/repositories/product/interfaces/i-product-repository';
import { UpsertProductDTO } from 'src/controllers/product/dtos';

@Injectable({ scope: Scope.REQUEST })
export class UpdateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: UpsertProductDTO): Promise<ProductEntity> {
    const product = ProductMapper.fromUpsertProductDTO(dto);
    const productDB = await this.productRepository.update(product);
    return ProductMapper.fromDB(productDB);
  }
}
