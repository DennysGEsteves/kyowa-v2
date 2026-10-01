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
import { ProductColorEntity } from '../../entities/product';
import { CreateProductColorUseCase } from '../../usecases/product/color/create-color.usecase';
import { DeleteProductColorUseCase } from '../../usecases/product/color/delete-color.usecase';
import { GetProductColorByIdUseCase } from '../../usecases/product/color/get-color-by-id.usecase';
import { GetProductColorsUseCase } from '../../usecases/product/color/get-colors.usecase';
import { UpdateProductColorUseCase } from '../../usecases/product/color/update-color.usecase';
import { CreateProductColorDto } from './dto/create-product-color.dto';
import { UpdateProductColorDto } from './dto/update-product-color.dto';

@Controller('products/colors')
export class ProductColorController {
  constructor(
    private readonly createProductColorUseCase: CreateProductColorUseCase,
    private readonly getProductColorsUseCase: GetProductColorsUseCase,
    private readonly getProductColorByIdUseCase: GetProductColorByIdUseCase,
    private readonly updateProductColorUseCase: UpdateProductColorUseCase,
    private readonly deleteProductColorUseCase: DeleteProductColorUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductColorDto): Promise<ProductColorEntity> {
    return this.createProductColorUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductColorEntity[]> {
    return this.getProductColorsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductColorEntity> {
    return this.getProductColorByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductColorDto,
  ): Promise<ProductColorEntity> {
    return this.updateProductColorUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductColorUseCase.execute(id);
  }
}
