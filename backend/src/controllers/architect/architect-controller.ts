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
import { UpsertArchitectDTO } from './dtos';
import {
  GetArchitectsUseCase,
  CreateArchitectUseCase,
  UpdateArchitectUseCase,
  DeleteArchitectUseCase,
} from 'src/usecases/architect';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { RoleType } from 'src/entities/user/types';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';

@Controller('architects')
@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
export class ArchitectController {
  constructor(
    private readonly getArchitectsUseCase: GetArchitectsUseCase,
    private readonly createArchitectUseCase: CreateArchitectUseCase,
    private readonly updateArchitectUseCase: UpdateArchitectUseCase,
    private readonly deleteArchitectUseCase: DeleteArchitectUseCase,
  ) {}

  @Get()
  getArchitects() {
    return this.getArchitectsUseCase.execute();
  }

  @Post()
  public async createtArchitect(@Body() dto: UpsertArchitectDTO) {
    return this.createArchitectUseCase.execute(dto);
  }

  @Put('/:architectId')
  updateArchitect(
    @Param() params: { architectId: string },
    @Body() dto: UpsertArchitectDTO,
  ) {
    return this.updateArchitectUseCase.execute(dto, Number(params.architectId));
  }

  @Delete('/:architectId')
  deleteArchitect(@Param() params: { architectId: string }) {
    return this.deleteArchitectUseCase.execute(params.architectId);
  }
}
