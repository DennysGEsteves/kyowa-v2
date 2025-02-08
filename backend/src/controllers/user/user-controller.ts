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
import { UpsertUserDTO } from './dtos';
import {
  GetUsersUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/usecases/user';
import { AuthGuard } from 'src/http/middlewares/auth/auth-guard';
import { RoleType } from 'src/entities/user/types';
import { Roles } from 'src/http/middlewares/auth/roles-decorator';

@Controller('users')
@UseGuards(AuthGuard)
@Roles(RoleType.ADMIN)
export class UserController {
  constructor(
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  getUsers() {
    return this.getUsersUseCase.execute();
  }

  @Post()
  createtUser(@Body() dto: UpsertUserDTO) {
    return this.createUserUseCase.execute(dto);
  }

  @Put('/:userId')
  updateUser(@Param() params: { userId: string }, @Body() dto: UpsertUserDTO) {
    return this.updateUserUseCase.execute(dto, Number(params.userId));
  }

  @Delete('/:userId')
  deleteUser(@Param() params: { userId: string }) {
    return this.deleteUserUseCase.execute(params.userId);
  }
}
