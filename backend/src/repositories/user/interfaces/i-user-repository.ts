import { UserEntity } from '../../../entities/user';
import { UserPermission } from '../../../entities/user/types/user-permission';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface CreateUserData {
  email: string;
  name: string;
  pass?: string;
  phone?: string | null;
  login?: string | null;
  permission: UserPermission;
  storeId: string;
  active?: boolean;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  pass?: string;
  phone?: string | null;
  login?: string | null;
  permission?: UserPermission;
  storeId?: string;
  active?: boolean;
}

export interface IUserRepository {
  create(data: CreateUserData): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, data: UpdateUserData): Promise<UserEntity | null>;
  delete(id: string): Promise<boolean>;
}
