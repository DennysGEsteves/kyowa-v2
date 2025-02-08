import { Injectable } from '@nestjs/common';
import { IArchitectRepository } from './interfaces/i-architect-repository';
import { ArchitectEntity } from '../../entities/architect';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { ArchitectDB } from './types';

@Injectable()
export class ArchitectRepository implements IArchitectRepository {
  private db = undefined;

  constructor(readonly prisma: PrismaService) {
    this.db = prisma.architect;
  }

  async findAll(): Promise<ArchitectDB[]> {
    return await this.db.findMany({
      includes: {
        seller: true,
        clients: true,
      },
    });
  }

  async findByEmail(email: string): Promise<ArchitectDB> {
    return await this.db.findUnique({
      where: {
        email,
      },
      includes: {
        seller: true,
        clients: true,
      },
    });
  }

  async update(architect: ArchitectEntity): Promise<ArchitectDB> {
    return await this.db.update({
      where: {
        id: architect.id,
      },
      data: {
        name: architect.name,
        nameFilter: architect.nameFilter,
        cpf: architect.cpf,
        nasc: architect.nasc,
        email: architect.email,
        cep: architect.cep,
        address: architect.address,
        district: architect.district,
        city: architect.city,
        region: architect.region,
        phone1: architect.phone1,
        phone2: architect.phone2,
        obs: architect.obs,
        active: architect.active,
        sellerId: architect.sellerId,
      },
    });
  }

  async create(architect: ArchitectEntity): Promise<ArchitectDB> {
    return await this.db.create({
      data: {
        name: architect.name,
        nameFilter: architect.nameFilter,
        cpf: architect.cpf,
        nasc: architect.nasc,
        email: architect.email,
        cep: architect.cep,
        address: architect.address,
        district: architect.district,
        city: architect.city,
        region: architect.region,
        phone1: architect.phone1,
        phone2: architect.phone2,
        obs: architect.obs,
        active: architect.active,
        sellerId: architect.sellerId,
      },
    });
  }

  async delete(architectId: string): Promise<void> {
    await this.db.update({
      where: {
        id: architectId,
      },
      data: {
        active: false,
      },
    });
  }
}
