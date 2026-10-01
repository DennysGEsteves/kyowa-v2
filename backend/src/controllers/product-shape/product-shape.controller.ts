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
import { ProductShapeEntity } from '../../entities/product';
import { CreateProductShapeUseCase } from '../../usecases/product/shape/create-shape.usecase';
import { DeleteProductShapeUseCase } from '../../usecases/product/shape/delete-shape.usecase';
import { GetProductShapeByIdUseCase } from '../../usecases/product/shape/get-shape-by-id.usecase';
import { GetProductShapesUseCase } from '../../usecases/product/shape/get-shapes.usecase';
import { UpdateProductShapeUseCase } from '../../usecases/product/shape/update-shape.usecase';
import { CreateProductShapeDto } from './dto/create-product-shape.dto';
import { UpdateProductShapeDto } from './dto/update-product-shape.dto';

@Controller('products/shapes')
export class ProductShapeController {
  constructor(
    private readonly createProductShapeUseCase: CreateProductShapeUseCase,
    private readonly getProductShapesUseCase: GetProductShapesUseCase,
    private readonly getProductShapeByIdUseCase: GetProductShapeByIdUseCase,
    private readonly updateProductShapeUseCase: UpdateProductShapeUseCase,
    private readonly deleteProductShapeUseCase: DeleteProductShapeUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductShapeDto): Promise<ProductShapeEntity> {
    return this.createProductShapeUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductShapeEntity[]> {
    return this.getProductShapesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductShapeEntity> {
    return this.getProductShapeByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductShapeDto,
  ): Promise<ProductShapeEntity> {
    return this.updateProductShapeUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductShapeUseCase.execute(id);
  }
}
