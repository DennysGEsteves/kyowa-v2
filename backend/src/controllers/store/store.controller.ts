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
import { StoreEntity } from '../../entities/store';
import { CreateStoreUseCase } from '../../usecases/store/create-store.usecase';
import { DeleteStoreUseCase } from '../../usecases/store/delete-store.usecase';
import { GetStoreByIdUseCase } from '../../usecases/store/get-store-by-id.usecase';
import { GetStoresUseCase } from '../../usecases/store/get-stores.usecase';
import { UpdateStoreUseCase } from '../../usecases/store/update-store.usecase';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoreController {
  constructor(
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly getStoresUseCase: GetStoresUseCase,
    private readonly getStoreByIdUseCase: GetStoreByIdUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
    private readonly deleteStoreUseCase: DeleteStoreUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateStoreDto): Promise<StoreEntity> {
    return this.createStoreUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<StoreEntity[]> {
    return this.getStoresUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<StoreEntity> {
    return this.getStoreByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateStoreDto,
  ): Promise<StoreEntity> {
    return this.updateStoreUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteStoreUseCase.execute(id);
  }
}
