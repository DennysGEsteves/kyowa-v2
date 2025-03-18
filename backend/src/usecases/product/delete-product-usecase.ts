import { Injectable } from '@nestjs/common';
import { IProductRepository } from 'src/repositories/product/interfaces/i-product-repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(productId: string): Promise<void> {
    return this.productRepository.delete(productId);
  }
}
