import { Injectable } from '@nestjs/common';
import { ISupplierRepository } from './interfaces/i-supplier-repository';
import { SupplierEntity } from '../../entities/supplier';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { SupplierDB } from './types';
import { PaginationArgs, paginationDBQueryObj } from 'src/util/pagination';
import { ISupplierPagination } from './interfaces/i-supplier-pagination';

@Injectable()
export class SupplierRepository implements ISupplierRepository {
  private db = undefined;

  constructor(readonly prisma: PrismaService) {
    this.db = prisma.supplier;
  }

  async findAll(): Promise<SupplierDB[]> {
    return await this.db.findMany();
  }

  async findByEmail(email: string): Promise<SupplierDB> {
    return await this.db.findUnique({
      where: {
        email,
      },
    });
  }

  async findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<ISupplierPagination> {
    const paginationDBQuery = paginationDBQueryObj(paginationArgs, [
      'name',
      'email',
    ]);

    const [items, total] = await this.prisma.$transaction([
      this.db.findMany(paginationDBQuery),
      this.db.count({
        where: paginationDBQuery.where,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  async findAllByName(name: string): Promise<SupplierDB[]> {
    return await this.db.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async update(supplier: SupplierEntity): Promise<SupplierDB> {
    return await this.db.update({
      where: {
        mid: supplier.mid,
      },
      data: {
        name: supplier.name,
        nameFilter: supplier.nameFilter,
        cnpj: supplier.cnpj,
        im: supplier.im,
        ie: supplier.ie,
        email: supplier.email,
        address: supplier.address,
        phone: supplier.phone,
        obs: supplier.obs,
        active: supplier.active,
      },
    });
  }

  async create(supplier: SupplierEntity): Promise<SupplierDB> {
    return await this.db.create({
      data: {
        name: supplier.name,
        nameFilter: supplier.nameFilter,
        cnpj: supplier.cnpj,
        im: supplier.im,
        ie: supplier.ie,
        email: supplier.email,
        address: supplier.address,
        phone: supplier.phone,
        obs: supplier.obs,
        active: supplier.active,
      },
    });
  }

  async delete(supplierId: string): Promise<void> {
    await this.db.update({
      where: {
        mid: supplierId,
      },
      data: {
        active: false,
      },
    });
  }
}
