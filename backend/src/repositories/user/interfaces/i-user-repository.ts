import { UserEntity } from '../../../entities/user';

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface IUserRepository {
  create(data: UserEntity): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  update(id: string, data: UserEntity): Promise<UserEntity | null>;
  delete(id: string): Promise<boolean>;
}
