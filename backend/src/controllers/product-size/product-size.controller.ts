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
import { ProductSizeEntity } from '../../entities/product';
import { CreateProductSizeUseCase } from '../../usecases/product/size/create-size.usecase';
import { DeleteProductSizeUseCase } from '../../usecases/product/size/delete-size.usecase';
import { GetProductSizeByIdUseCase } from '../../usecases/product/size/get-size-by-id.usecase';
import { GetProductSizesUseCase } from '../../usecases/product/size/get-sizes.usecase';
import { UpdateProductSizeUseCase } from '../../usecases/product/size/update-size.usecase';
import { CreateProductSizeDto } from './dto/create-product-size.dto';
import { UpdateProductSizeDto } from './dto/update-product-size.dto';

@Controller('products/sizes')
export class ProductSizeController {
  constructor(
    private readonly createProductSizeUseCase: CreateProductSizeUseCase,
    private readonly getProductSizesUseCase: GetProductSizesUseCase,
    private readonly getProductSizeByIdUseCase: GetProductSizeByIdUseCase,
    private readonly updateProductSizeUseCase: UpdateProductSizeUseCase,
    private readonly deleteProductSizeUseCase: DeleteProductSizeUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductSizeDto): Promise<ProductSizeEntity> {
    return this.createProductSizeUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductSizeEntity[]> {
    return this.getProductSizesUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductSizeEntity> {
    return this.getProductSizeByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductSizeDto,
  ): Promise<ProductSizeEntity> {
    return this.updateProductSizeUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductSizeUseCase.execute(id);
  }
}
