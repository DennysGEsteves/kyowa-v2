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
import { ProductHeightEntity } from '../../entities/product';
import { CreateProductHeightUseCase } from '../../usecases/product/height/create-height.usecase';
import { DeleteProductHeightUseCase } from '../../usecases/product/height/delete-height.usecase';
import { GetProductHeightByIdUseCase } from '../../usecases/product/height/get-height-by-id.usecase';
import { GetProductHeightsUseCase } from '../../usecases/product/height/get-heights.usecase';
import { UpdateProductHeightUseCase } from '../../usecases/product/height/update-height.usecase';
import { CreateProductHeightDto } from './dto/create-product-height.dto';
import { UpdateProductHeightDto } from './dto/update-product-height.dto';

@Controller('products/heights')
export class ProductHeightController {
  constructor(
    private readonly createProductHeightUseCase: CreateProductHeightUseCase,
    private readonly getProductHeightsUseCase: GetProductHeightsUseCase,
    private readonly getProductHeightByIdUseCase: GetProductHeightByIdUseCase,
    private readonly updateProductHeightUseCase: UpdateProductHeightUseCase,
    private readonly deleteProductHeightUseCase: DeleteProductHeightUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductHeightDto): Promise<ProductHeightEntity> {
    return this.createProductHeightUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductHeightEntity[]> {
    return this.getProductHeightsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductHeightEntity> {
    return this.getProductHeightByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductHeightDto,
  ): Promise<ProductHeightEntity> {
    return this.updateProductHeightUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductHeightUseCase.execute(id);
  }
}
