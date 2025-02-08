import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UpsertSupplierDTO } from './dtos';
import {
  GetSuppliersUseCase,
  CreateSupplierUseCase,
  UpdateSupplierUseCase,
  DeleteSupplierUseCase,
} from 'src/usecases/supplier';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { RoleType } from 'src/entities/user/types';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';

@Controller('suppliers')
@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
export class SupplierController {
  constructor(
    private readonly getSuppliersUseCase: GetSuppliersUseCase,
    private readonly createSupplierUseCase: CreateSupplierUseCase,
    private readonly updateSupplierUseCase: UpdateSupplierUseCase,
    private readonly deleteSupplierUseCase: DeleteSupplierUseCase,
  ) {}

  @Get()
  getSuppliers() {
    return this.getSuppliersUseCase.execute();
  }

  @Post()
  public async createtSupplier(@Body() dto: UpsertSupplierDTO) {
    return this.createSupplierUseCase.execute(dto);
  }

  @Put('/:supplierId')
  updateSupplier(
    @Param() params: { supplierId: string },
    @Body() dto: UpsertSupplierDTO,
  ) {
    return this.updateSupplierUseCase.execute(dto, Number(params.supplierId));
  }

  @Delete('/:supplierId')
  deleteSupplier(@Param() params: { supplierId: string }) {
    return this.deleteSupplierUseCase.execute(params.supplierId);
  }
}
