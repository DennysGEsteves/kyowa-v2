import { UserEntity as UserEntity } from 'src/entities';
import { UserDB } from '../types/';

export abstract class IUserRepository {
  abstract create(user: UserEntity): Promise<UserDB>;
  abstract update(user: UserEntity): Promise<UserDB>;
  abstract delete(userId: string): Promise<void>;
  abstract findAll(): Promise<UserDB[]>;
  abstract findByEmail(email: string): Promise<UserDB>;
}
