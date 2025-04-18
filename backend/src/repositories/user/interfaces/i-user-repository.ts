import { UserEntity as UserEntity } from 'src/entities';
import { UserDB } from '../types/';
import { RoleType } from 'src/entities/user/types';

export abstract class IUserRepository {
  abstract create(user: UserEntity): Promise<UserDB>;
  abstract update(user: UserEntity): Promise<UserDB>;
  abstract changeActiveValue(userId: number, active: boolean): Promise<void>;
  abstract findAll(): Promise<UserDB[]>;
  abstract findById(id: number): Promise<UserDB>;
  abstract findAllByRole(role: RoleType): Promise<UserDB[]>;
  abstract findByEmail(email: string): Promise<UserDB>;
}
