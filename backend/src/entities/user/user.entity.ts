import { CreateUserDto } from '../../controllers/user/dto/create-user.dto';
import { UpdateUserDto } from '../../controllers/user/dto/update-user.dto';
import { UserDocument } from '../../repositories/user/schemas/user.schema';
import { UserPermission } from './types/user-permission';

export interface IConstructorParams {
  id?: string;
  email: string;
  name: string;
  phone: string | null;
  login: string | null;
  permission: UserPermission;
  storeId?: string;
  active: boolean;
  pass?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserEntity {
  public id?: string;
  public email: string;
  public name: string;
  public phone: string | null;
  public login: string | null;
  public permission: UserPermission;
  public storeId?: string;
  public active: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  public pass?: string;

  constructor(params: IConstructorParams) {
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.pass = params.pass;
    this.phone = params.phone;
    this.login = params.login;
    this.permission = params.permission;
    this.storeId = params.storeId;
    this.active = params.active;
  }

  static fromPersistData(data: UserDocument): UserEntity {
    return new UserEntity({
      id: data._id.toString(),
      email: data.email,
      name: data.name,
      phone: data.phone,
      login: data.login,
      permission: data.permission,
      storeId: data.storeId.toString(),
      active: data.active,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      pass: data.pass,
    });
  }

  static fromCreateUserDto(dto: CreateUserDto): UserEntity {
    return new UserEntity({
      email: dto.email,
      name: dto.name,
      phone: dto.phone,
      login: dto.login,
      permission: dto.permission,
      storeId: dto.storeId,
      active: dto.active,
    });
  }

  static fromUpdateUserDto(
    oldUser: UserEntity,
    dto: UpdateUserDto,
  ): UserEntity {
    return new UserEntity({
      id: oldUser.id,
      email: dto.email ?? oldUser.email,
      name: dto.name ?? oldUser.name,
      phone: dto.phone ?? oldUser.phone,
      login: dto.login ?? oldUser.login,
      permission: dto.permission ?? oldUser.permission,
      storeId: dto.storeId ?? oldUser.storeId,
      active: dto.active ?? oldUser.active,
      pass: dto.pass ?? oldUser.pass,
      createdAt: oldUser.createdAt,
      updatedAt: oldUser.updatedAt,
    });
  }
}
