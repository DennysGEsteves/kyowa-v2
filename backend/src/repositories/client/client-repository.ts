import { Injectable } from '@nestjs/common';
import { IClientRepository } from './interfaces/i-client-repository';
import { ClientEntity } from '../../entities/client';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { ClientDB } from './types';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { IClientPagination } from './interfaces/i-client-pagination';
import { paginationDBQueryObj } from 'src/util/pagination';

@Injectable()
export class ClientRepository implements IClientRepository {
  private db = undefined;

  constructor(readonly prisma: PrismaService) {
    this.db = prisma.client;
  }

  async findAll(): Promise<ClientDB[]> {
    return await this.db.findMany({
      include: {
        architect: true,
      },
    });
  }

  async findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<IClientPagination> {
    const paginationDBQuery = paginationDBQueryObj(paginationArgs, [
      'name',
      'email',
    ]);

    const [items, total] = await this.prisma.$transaction([
      this.db.findMany({
        include: {
          architect: true,
        },
        ...paginationDBQuery,
      }),
      this.db.count({
        where: paginationDBQuery.where,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  async findByEmail(email: string): Promise<ClientDB> {
    return await this.db.findUnique({
      where: {
        email,
      },
      include: {
        architect: true,
      },
    });
  }

  async findById(id: number): Promise<ClientDB> {
    return await this.db.findUnique({
      where: {
        id,
      },
      include: {
        architect: true,
      },
    });
  }

  async update(client: ClientEntity): Promise<ClientDB> {
    return await this.db.update({
      where: {
        mid: client.mid,
      },
      data: {
        name: client.name,
        nameFilter: client.nameFilter,
        cpf: client.cpf,
        rg: client.rg,
        birthday: client.birthday,
        occupation: client.occupation,
        email: client.email,
        address: client.address,
        phone: client.phone,
        obs: client.obs,
        active: client.active,
        interestProducts: client.interestProducts,
        origins: client.origins,
        architectId: client.architectId,
      },
    });
  }

  async create(client: ClientEntity): Promise<ClientDB> {
    return await this.db.create({
      data: {
        name: client.name,
        nameFilter: client.nameFilter,
        cpf: client.cpf,
        rg: client.rg,
        birthday: client.birthday,
        occupation: client.occupation,
        email: client.email,
        address: client.address,
        phone: client.phone,
        obs: client.obs,
        active: client.active,
        interestProducts: client.interestProducts,
        origins: client.origins,
        architectId: client.architectId,
      },
    });
  }

  async delete(clientId: string): Promise<void> {
    await this.db.update({
      where: {
        mid: clientId,
      },
      data: {
        active: false,
      },
    });
  }
}
