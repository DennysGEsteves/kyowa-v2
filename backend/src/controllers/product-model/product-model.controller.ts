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
import { ProductModelEntity } from '../../entities/product';
import { CreateProductModelUseCase } from '../../usecases/product/model/create-model.usecase';
import { DeleteProductModelUseCase } from '../../usecases/product/model/delete-model.usecase';
import { GetProductModelByIdUseCase } from '../../usecases/product/model/get-model-by-id.usecase';
import { GetProductModelsUseCase } from '../../usecases/product/model/get-models.usecase';
import { UpdateProductModelUseCase } from '../../usecases/product/model/update-model.usecase';
import { CreateProductModelDto } from './dto/create-product-model.dto';
import { UpdateProductModelDto } from './dto/update-product-model.dto';

@Controller('products/models')
export class ProductModelController {
  constructor(
    private readonly createProductModelUseCase: CreateProductModelUseCase,
    private readonly getProductModelsUseCase: GetProductModelsUseCase,
    private readonly getProductModelByIdUseCase: GetProductModelByIdUseCase,
    private readonly updateProductModelUseCase: UpdateProductModelUseCase,
    private readonly deleteProductModelUseCase: DeleteProductModelUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductModelDto): Promise<ProductModelEntity> {
    return this.createProductModelUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductModelEntity[]> {
    return this.getProductModelsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductModelEntity> {
    return this.getProductModelByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductModelDto,
  ): Promise<ProductModelEntity> {
    return this.updateProductModelUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductModelUseCase.execute(id);
  }
}
