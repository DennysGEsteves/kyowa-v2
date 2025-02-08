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
import { UpsertClientDTO } from './dtos';
import {
  GetClientsUseCase,
  CreateClientUseCase,
  UpdateClientUseCase,
  DeleteClientUseCase,
} from 'src/usecases/client';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { RoleType } from 'src/entities/user/types';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';

@Controller('clients')
@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
export class ClientController {
  constructor(
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Get()
  getClients() {
    return this.getClientsUseCase.execute();
  }

  @Post()
  public async createtClient(@Body() dto: UpsertClientDTO) {
    return this.createClientUseCase.execute(dto);
  }

  @Put('/:clientId')
  updateClient(
    @Param() params: { clientId: string },
    @Body() dto: UpsertClientDTO,
  ) {
    return this.updateClientUseCase.execute(dto, Number(params.clientId));
  }

  @Delete('/:clientId')
  deleteClient(@Param() params: { clientId: string }) {
    return this.deleteClientUseCase.execute(params.clientId);
  }
}
