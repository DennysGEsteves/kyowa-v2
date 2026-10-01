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
import { ProductOriginEntity } from '../../entities/product';
import { CreateProductOriginUseCase } from '../../usecases/product/origin/create-origin.usecase';
import { DeleteProductOriginUseCase } from '../../usecases/product/origin/delete-origin.usecase';
import { GetProductOriginByIdUseCase } from '../../usecases/product/origin/get-origin-by-id.usecase';
import { GetProductOriginsUseCase } from '../../usecases/product/origin/get-origins.usecase';
import { UpdateProductOriginUseCase } from '../../usecases/product/origin/update-origin.usecase';
import { CreateProductOriginDto } from './dto/create-product-origin.dto';
import { UpdateProductOriginDto } from './dto/update-product-origin.dto';

@Controller('products/origins')
export class ProductOriginController {
  constructor(
    private readonly createProductOriginUseCase: CreateProductOriginUseCase,
    private readonly getProductOriginsUseCase: GetProductOriginsUseCase,
    private readonly getProductOriginByIdUseCase: GetProductOriginByIdUseCase,
    private readonly updateProductOriginUseCase: UpdateProductOriginUseCase,
    private readonly deleteProductOriginUseCase: DeleteProductOriginUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductOriginDto): Promise<ProductOriginEntity> {
    return this.createProductOriginUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductOriginEntity[]> {
    return this.getProductOriginsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductOriginEntity> {
    return this.getProductOriginByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductOriginDto,
  ): Promise<ProductOriginEntity> {
    return this.updateProductOriginUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductOriginUseCase.execute(id);
  }
}
