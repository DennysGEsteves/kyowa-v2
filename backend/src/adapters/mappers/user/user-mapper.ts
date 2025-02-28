import { UserEntity } from 'src/entities';
import { RoleType } from 'src/entities/user/types';
import { UserDB } from 'src/repositories/user/types/';
import { StoreDB } from 'src/repositories/store/type';
// import { ArchitectMapper } from '../architect';
import { ArchitectDB } from 'src/repositories/architect/types';
import { UpsertUserDTO } from 'src/controllers/user/dto';

export class UserMapper {
  static fromUpsertUserDTO(dto: UpsertUserDTO): UserEntity {
    return new UserEntity({
      ...(dto.id ? { id: dto.id } : {}),
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      login: dto.login,
      role: dto.role,
      storeId: dto.storeId,
    });
  }

  static fromDB(user: UserDB): UserEntity {
    return new UserEntity({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      login: user.login,
      role: user.role as RoleType,
      active: user.active,
      storeId: user.storeId,
      pass: user.pass,

      // architects: ArchitectMapper.fromUserDB(user),
      // managerStores: user.managerStores,
    });
  }

  static fromDBList(users: UserDB[]): UserEntity[] {
    return users.map((user) => UserMapper.fromDB(user));
  }

  static fromStoreDB({ manager }: StoreDB): UserEntity {
    return new UserEntity({
      id: manager.id,
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      login: manager.login,
      role: manager.role as RoleType,
      active: manager.active,
      storeId: manager.storeId,
    });
  }

  static fromArchitectDB({ seller }: ArchitectDB): UserEntity {
    return new UserEntity({
      id: seller.id,
      name: seller.name,
      email: seller.email,
      phone: seller.phone,
      login: seller.login,
      role: seller.role as RoleType,
      active: seller.active,
      storeId: seller.storeId,
      pass: seller.pass,
    });
  }
}
