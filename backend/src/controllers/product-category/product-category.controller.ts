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
import { ProductCategoryEntity } from '../../entities/product';
import { CreateProductCategoryUseCase } from '../../usecases/product/category/create-category.usecase';
import { DeleteProductCategoryUseCase } from '../../usecases/product/category/delete-category.usecase';
import { GetProductCategoryByIdUseCase } from '../../usecases/product/category/get-category-by-id.usecase';
import { GetProductCategoriesUseCase } from '../../usecases/product/category/get-categories.usecase';
import { UpdateProductCategoryUseCase } from '../../usecases/product/category/update-category.usecase';
import { CreateProductCategoryDto } from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';

@Controller('products/categories')
export class ProductCategoryController {
  constructor(
    private readonly createProductCategoryUseCase: CreateProductCategoryUseCase,
    private readonly getProductCategoriesUseCase: GetProductCategoriesUseCase,
    private readonly getProductCategoryByIdUseCase: GetProductCategoryByIdUseCase,
    private readonly updateProductCategoryUseCase: UpdateProductCategoryUseCase,
    private readonly deleteProductCategoryUseCase: DeleteProductCategoryUseCase,
  ) {}

  @Post()
  create(
    @Body() dto: CreateProductCategoryDto,
  ): Promise<ProductCategoryEntity> {
    return this.createProductCategoryUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductCategoryEntity[]> {
    return this.getProductCategoriesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductCategoryEntity> {
    return this.getProductCategoryByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductCategoryDto,
  ): Promise<ProductCategoryEntity> {
    return this.updateProductCategoryUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductCategoryUseCase.execute(id);
  }
}
