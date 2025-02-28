import { UserEntity } from 'src/entities';
import { RoleType } from 'src/entities/user/types';
import { GetUsersDTOPresenter } from './dtos/get-users.dto';

export class UserPresenter {
  static toSignIn(user: UserEntity) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      login: user.login,
      role: user.role as RoleType,
      active: user.active,
      storeId: user.storeId,
      managerStores: user.managerStores,
    };
  }

  static toGetUsersDTO(users: UserEntity[]): GetUsersDTOPresenter[] {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      login: user.login,
      role: user.role,
      active: user.active,
      storeId: user.storeId,
    }));
  }
}
