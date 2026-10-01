import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductEntity } from '../../entities/product';
import { CreateProductUseCase } from '../../usecases/product/create-product.usecase';
import { DeleteProductUseCase } from '../../usecases/product/delete-product.usecase';
import { GetProductByIdUseCase } from '../../usecases/product/get-product-by-id.usecase';
import { GetProductsUseCase } from '../../usecases/product/get-products.usecase';
import { UpdateProductUseCase } from '../../usecases/product/update-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.createProductUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.getProductsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.getProductByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<ProductEntity> {
    return this.updateProductUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductUseCase.execute(id);
  }
}
