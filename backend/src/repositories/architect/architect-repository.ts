import { Injectable } from '@nestjs/common';
import { IArchitectRepository } from './interfaces/i-architect-repository';
import { ArchitectEntity } from '../../entities/architect';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { ArchitectDB } from './types';
import { PaginationArgs } from 'src/controllers/pagination-args';
import { paginationDBQueryObj } from 'src/util/pagination-db-query/pagination-db-query';
import { IArchitectPagination } from './interfaces/i-pagination';

@Injectable()
export class ArchitectRepository implements IArchitectRepository {
  private db = undefined;

  constructor(private prisma: PrismaService) {
    this.db = prisma.architect;
  }

  async findAll(): Promise<ArchitectDB[]> {
    return await this.db.findMany({
      include: {
        seller: true,
        clients: true,
      },
    });
  }

  async findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<IArchitectPagination> {
    const paginationDBQuery = paginationDBQueryObj(paginationArgs, [
      'name',
      'email',
    ]);

    const [items, total] = await this.prisma.$transaction([
      this.db.findMany({
        include: {
          seller: true,
          clients: true,
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

  async findByEmail(email: string): Promise<ArchitectDB> {
    return await this.db.findUnique({
      where: {
        email,
      },
      include: {
        seller: true,
        clients: true,
      },
    });
  }

  async update(architect: ArchitectEntity): Promise<ArchitectDB> {
    return await this.db.update({
      where: {
        mid: architect.mid,
      },
      data: {
        name: architect.name,
        cpf: architect.cpf,
        birthday: architect.birthday,
        email: architect.email,
        address: architect.address,
        phone: architect.phone,
        obs: architect.obs,
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
        birthday: architect.birthday,
        email: architect.email,
        address: architect.address,
        phone: architect.phone,
        obs: architect.obs,
        active: architect.active,
        sellerId: architect.sellerId,
      },
    });
  }

  async delete(architectId: string): Promise<void> {
    await this.db.update({
      where: {
        mid: architectId,
      },
      data: {
        active: false,
      },
    });
  }
}
