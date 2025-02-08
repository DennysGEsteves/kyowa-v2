import { UserEntity } from 'src/entities';
import { RoleType, RoleTypeTranslated } from 'src/entities/user/types';
import { GetUsersDTO } from './dtos/get-users-dto';

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

  static toGetUsersDTO(users: UserEntity[]): GetUsersDTO[] {
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      login: user.login,
      role: RoleTypeTranslated[user.role],
      status: user.active ? 'ATIVO' : 'INATIVO',
      active: user.active,
    }));
  }
}
