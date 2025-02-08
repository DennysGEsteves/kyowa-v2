import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/i-user-repository';
import { UserEntity } from '../../entities/user';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { UserDB } from './types/';

@Injectable()
export class UserRepository implements IUserRepository {
  private db = undefined;

  constructor(readonly prisma: PrismaService) {
    this.db = prisma.user;
  }

  async findAll(): Promise<UserDB[]> {
    return await this.db.findMany({
      include: {
        architects: true,
        managerStores: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserDB> {
    return await this.db.findUnique({
      where: {
        email,
      },
      include: {
        architects: true,
        managerStores: true,
      },
    });
  }

  async update(user: UserEntity): Promise<UserDB> {
    return await this.db.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        login: user.login,
        role: user.role,
        storeId: user.storeId,
      },
    });
  }

  async create(user: UserEntity): Promise<UserDB> {
    return await this.db.create({
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        login: user.login,
        role: user.role,
        active: true,
        storeId: user.storeId,
      },
    });
  }

  async delete(userId: string): Promise<void> {
    await this.db.update({
      where: {
        id: userId,
      },
      data: {
        active: false,
      },
    });
  }
}
