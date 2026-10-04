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
  Put,
  Query,
} from '@nestjs/common';
import { ListProductsPaginatedQueryDto } from './dto/list-products-query.dto';
import { ListUpdatePricesProductsQueryDto } from './dto/list-update-prices-products-query.dto';
import { SearchProductsByNameQueryDto } from './dto/search-products-by-name-query.dto';
import { ProductEntity } from '../../entities/product';
import { PaginatedResult } from '../../shared/types/pagination';
import { CreateProductUseCase } from '../../usecases/product/create-product.usecase';
import { DeleteProductUseCase } from '../../usecases/product/delete-product.usecase';
import { GetProductByIdUseCase } from '../../usecases/product/get-product-by-id.usecase';
import { GetProductsUseCase } from '../../usecases/product/get-products.usecase';
import { ListProductsPaginatedUseCase } from '../../usecases/product/list-products-paginated.usecase';
import { UpdateProductsPriceUseCase } from '../../usecases/product/update-product-price.usecase';
import { ListUpdatePricesProductsUseCase } from '../../usecases/product/list-update-prices-products.usecase';
import { SearchProductsByNameUseCase } from '../../usecases/product/search-products-by-name.usecase';
import { UpdateProductUseCase } from '../../usecases/product/update-product.usecase';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  GetByNameResponse,
  toGetByNameResponse,
} from './dto/presenters/get-by-name-response';
import { UpdateProductsPriceUseCaseDto } from './dto/update-product-price.dto';
import {
  toUpdateProductsPriceResponse,
  UpdateProductsPriceResponse,
} from './dto/presenters/update-product-price-response.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductsUseCase: GetProductsUseCase,
    private readonly listProductsPaginatedUseCase: ListProductsPaginatedUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly listUpdatePricesProductsUseCase: ListUpdatePricesProductsUseCase,
    private readonly updateProductsPriceUseCase: UpdateProductsPriceUseCase,
    private readonly searchProductsByNameUseCase: SearchProductsByNameUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateProductDto): Promise<ProductEntity> {
    return this.createProductUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ProductEntity[]> {
    return this.getProductsUseCase.execute();
  }

  @Get('paginated')
  findPaginated(
    @Query() query: ListProductsPaginatedQueryDto,
  ): Promise<PaginatedResult<ProductEntity>> {
    return this.listProductsPaginatedUseCase.execute(query);
  }

  @Get('update-prices/products')
  listForPriceUpdate(
    @Query() query: ListUpdatePricesProductsQueryDto,
  ): Promise<PaginatedResult<ProductEntity>> {
    return this.listUpdatePricesProductsUseCase.execute(query);
  }

  @Put('update-prices/apply')
  async updateProductsPrice(
    @Body() dto: UpdateProductsPriceUseCaseDto,
  ): Promise<UpdateProductsPriceResponse> {
    const updatedCount = await this.updateProductsPriceUseCase.execute(dto);
    return toUpdateProductsPriceResponse(updatedCount);
  }

  @Get('search-by-name')
  async searchByName(
    @Query() query: SearchProductsByNameQueryDto,
  ): Promise<GetByNameResponse[]> {
    const products = await this.searchProductsByNameUseCase.execute(query);
    return toGetByNameResponse(products);
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
