import { Injectable } from '@nestjs/common';
import { IClientRepository } from './interfaces/i-client-repository';
import { ClientEntity } from '../../entities/client';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { ClientDB } from './types';

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

  async update(client: ClientEntity): Promise<ClientDB> {
    return await this.db.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        nameFilter: client.nameFilter,
        cpf: client.cpf,
        rg: client.rg,
        nasc: client.nasc,
        occupation: client.occupation,
        email: client.email,
        address: client.address,
        phone: client.phone,
        obs: client.obs,
        active: client.active,
        interestProducts: client.interestProducts,
        origins: client.origins,
        architectID: client.architectID,
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
        nasc: client.nasc,
        occupation: client.occupation,
        email: client.email,
        address: client.address,
        phone: client.phone,
        obs: client.obs,
        active: client.active,
        interestProducts: client.interestProducts,
        origins: client.origins,
        architectID: client.architectID,
      },
    });
  }

  async delete(clientId: string): Promise<void> {
    await this.db.update({
      where: {
        id: clientId,
      },
      data: {
        active: false,
      },
    });
  }
}
