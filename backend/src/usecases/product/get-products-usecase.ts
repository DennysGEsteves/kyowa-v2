import { Injectable } from '@nestjs/common';
import { ProductEntity } from 'src/entities';
import { ProductMapper } from 'src/adapters/mappers/product';
import { IProductRepository } from 'src/repositories/product/interfaces/i-product-repository';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { GetProductsByPaginationResponse } from 'src/adapters/presenters/products/dtos/get-products-by-pagination';
import { GetProductsByNameResponse } from 'src/adapters/presenters/products/dtos/get-products-by-name';

@Injectable()
export class GetProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(): Promise<ProductEntity[]> {
    const productsDB = await this.productRepository.findAll();
    return ProductMapper.fromDBList(productsDB);
  }

  async executeByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<GetProductsByPaginationResponse> {
    const res =
      await this.productRepository.findAllByPagination(paginationArgs);

    const products = ProductMapper.fromDBList(res.items);

    return {
      items: products,
      meta: {
        total: res.total,
        page: paginationArgs.page,
        totalPages: Math.ceil(res.total / paginationArgs.limit),
      },
    };
  }

  async executeByName(name: string): Promise<GetProductsByNameResponse[]> {
    const productsDB = await this.productRepository.findAllByName(name);
    const products = ProductMapper.fromDBList(productsDB);

    return products.map((product) => ({
      mid: product.mid,
      name: product.name,
    }));
  }
}
