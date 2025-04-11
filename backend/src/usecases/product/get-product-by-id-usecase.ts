import { Injectable } from '@nestjs/common';
import { ProductMapper } from 'src/adapters/mappers/product';
import { ProductEntity } from 'src/entities';
import { IProductRepository } from 'src/repositories/product/interfaces/i-product-repository';

@Injectable()
export class GetProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productId: number): Promise<ProductEntity> {
    const productDB = await this.productRepository.findById(productId);
    return ProductMapper.fromDB(productDB);
  }
}
