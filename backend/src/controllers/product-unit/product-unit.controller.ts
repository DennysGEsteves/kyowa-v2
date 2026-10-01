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
import { ProductUnitEntity } from '../../entities/product';
import { CreateProductUnitUseCase } from '../../usecases/product/unit/create-unit.usecase';
import { DeleteProductUnitUseCase } from '../../usecases/product/unit/delete-unit.usecase';
import { GetProductUnitByIdUseCase } from '../../usecases/product/unit/get-unit-by-id.usecase';
import { GetProductUnitsUseCase } from '../../usecases/product/unit/get-units.usecase';
import { UpdateProductUnitUseCase } from '../../usecases/product/unit/update-unit.usecase';
import { CreateProductUnitDto } from './dto/create-product-unit.dto';
import { UpdateProductUnitDto } from './dto/update-product-unit.dto';

@Controller('products/units')
export class ProductUnitController {
  constructor(
    private readonly createProductUnitUseCase: CreateProductUnitUseCase,
    private readonly getProductUnitsUseCase: GetProductUnitsUseCase,
    private readonly getProductUnitByIdUseCase: GetProductUnitByIdUseCase,
    private readonly updateProductUnitUseCase: UpdateProductUnitUseCase,
    private readonly deleteProductUnitUseCase: DeleteProductUnitUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductUnitDto): Promise<ProductUnitEntity> {
    return this.createProductUnitUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductUnitEntity[]> {
    return this.getProductUnitsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductUnitEntity> {
    return this.getProductUnitByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductUnitDto,
  ): Promise<ProductUnitEntity> {
    return this.updateProductUnitUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductUnitUseCase.execute(id);
  }
}
