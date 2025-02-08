import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { RoleType } from 'src/entities/user/types';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';
import {
  GetStoresUseCase,
  UpdateStoreUseCase,
  CreateStoreUseCase,
} from 'src/usecases/store';
import { UpsertStoreDTO } from './dto/upsert-store-dto';

@Controller('stores')
@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
export class StoreController {
  constructor(
    private readonly getStoresUseCase: GetStoresUseCase,
    private readonly createStoreUseCase: CreateStoreUseCase,
    private readonly updateStoreUseCase: UpdateStoreUseCase,
  ) {}

  @Get()
  public getStores() {
    return this.getStoresUseCase.execute();
  }

  @Post()
  public createStore(@Body() dto: UpsertStoreDTO) {
    return this.createStoreUseCase.execute(dto);
  }

  @Put(':storeId')
  public updateStore(
    @Body() dto: UpsertStoreDTO,
    @Param() param: { storeId: string },
  ) {
    return this.updateStoreUseCase.execute(dto, Number(param.storeId));
  }
}
