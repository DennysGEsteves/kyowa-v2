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
import { UserEntity } from '../../entities/user';
import { CreateUserUseCase } from '../../usecases/user/create-user.usecase';
import { DeleteUserUseCase } from '../../usecases/user/delete-user.usecase';
import { GetUserByIdUseCase } from '../../usecases/user/get-user-by-id.usecase';
import { GetUsersUseCase } from '../../usecases/user/get-users.usecase';
import { UpdateUserUseCase } from '../../usecases/user/update-user.usecase';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto): Promise<UserEntity> {
    return this.createUserUseCase.execute(dto);
  }

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.getUsersUseCase.execute();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserEntity> {
    return this.getUserByIdUseCase.execute(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.updateUserUseCase.execute(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}
