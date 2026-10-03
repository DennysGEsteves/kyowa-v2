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
import { ClientEntity } from '../../entities/client';
import { CreateClientUseCase } from '../../usecases/client/create-client.usecase';
import { DeleteClientUseCase } from '../../usecases/client/delete-client.usecase';
import { GetClientByIdUseCase } from '../../usecases/client/get-client-by-id.usecase';
import { GetClientsUseCase } from '../../usecases/client/get-clients.usecase';
import { UpdateClientUseCase } from '../../usecases/client/update-client.usecase';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientsUseCase: GetClientsUseCase,
    private readonly getClientByIdUseCase: GetClientByIdUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateClientDto): Promise<ClientEntity> {
    return this.createClientUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<ClientEntity[]> {
    return this.getClientsUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ClientEntity> {
    return this.getClientByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateClientDto,
  ): Promise<ClientEntity> {
    return this.updateClientUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteClientUseCase.execute(id);
  }
}
