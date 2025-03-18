import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities';
import { ProductMapper } from 'src/adapters/mappers/product';
import { UpsertProductDTO } from 'src/controllers/product/dtos';
import { IProductRepository } from 'src/repositories/product/interfaces/i-product-repository';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(dto: UpsertProductDTO): Promise<ProductEntity> {
    const newProduct = ProductMapper.fromUpsertProductDTO(dto);
    const productDB = await this.productRepository.create(newProduct);
    return ProductMapper.fromDB(productDB);
  }
}
