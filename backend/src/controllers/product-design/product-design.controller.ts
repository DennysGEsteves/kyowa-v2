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
import { ProductDesignEntity } from '../../entities/product';
import { CreateProductDesignUseCase } from '../../usecases/product/design/create-design.usecase';
import { DeleteProductDesignUseCase } from '../../usecases/product/design/delete-design.usecase';
import { GetProductDesignByIdUseCase } from '../../usecases/product/design/get-design-by-id.usecase';
import { GetProductDesignsUseCase } from '../../usecases/product/design/get-designs.usecase';
import { UpdateProductDesignUseCase } from '../../usecases/product/design/update-design.usecase';
import { CreateProductDesignDto } from './dto/create-product-design.dto';
import { UpdateProductDesignDto } from './dto/update-product-design.dto';

@Controller('products/designs')
export class ProductDesignController {
  constructor(
    private readonly createProductDesignUseCase: CreateProductDesignUseCase,
    private readonly getProductDesignsUseCase: GetProductDesignsUseCase,
    private readonly getProductDesignByIdUseCase: GetProductDesignByIdUseCase,
    private readonly updateProductDesignUseCase: UpdateProductDesignUseCase,
    private readonly deleteProductDesignUseCase: DeleteProductDesignUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDesignDto): Promise<ProductDesignEntity> {
    return this.createProductDesignUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductDesignEntity[]> {
    return this.getProductDesignsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductDesignEntity> {
    return this.getProductDesignByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDesignDto,
  ): Promise<ProductDesignEntity> {
    return this.updateProductDesignUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteProductDesignUseCase.execute(id);
  }
}
