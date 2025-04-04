import { Injectable } from '@nestjs/common';
import { IUserRepository } from './interfaces/i-user-repository';
import { UserEntity } from '../../entities/user';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { UserDB } from './types/';
import { RoleType } from 'src/entities/user/types';

@Injectable()
export class UserRepository implements IUserRepository {
  private db = undefined;

  constructor(readonly prisma: PrismaService) {
    this.db = prisma.user;
  }

  async findAll(): Promise<UserDB[]> {
    return await this.db.findMany({
      include: {
        managerStores: true,
      },
    });
  }

  async findAllByRole(role: RoleType): Promise<UserDB[]> {
    return await this.db.findMany({
      where: {
        role,
      },
      include: {
        managerStores: true,
      },
    });
  }

  async findById(id: number): Promise<UserDB> {
    return await this.db.findUnique({
      where: {
        id,
      },
      include: {
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
        managerStores: true,
      },
    });
  }

  async update(user: UserEntity): Promise<UserDB> {
    return await this.db.update({
      where: {
        mid: user.mid,
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

  async changeActiveValue(userId: number, isActive: boolean): Promise<void> {
    await this.db.update({
      where: {
        mid: userId,
      },
      data: {
        active: isActive,
      },
    });
  }
}
