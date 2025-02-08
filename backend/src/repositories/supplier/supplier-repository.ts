import { Injectable } from '@nestjs/common';
import { ISupplierRepository } from './interfaces/i-supplier-repository';
import { SupplierEntity } from '../../entities/supplier';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { SupplierDB } from './types';

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

  async update(supplier: SupplierEntity): Promise<SupplierDB> {
    return await this.db.update({
      where: {
        id: supplier.id,
      },
      data: {
        name: supplier.name,
        nameFilter: supplier.nameFilter,
        cpnj: supplier.cpnj,
        im: supplier.im,
        ie: supplier.ie,
        email: supplier.email,
        cep: supplier.cep,
        address: supplier.address,
        district: supplier.district,
        city: supplier.city,
        region: supplier.region,
        phone1: supplier.phone1,
        phone2: supplier.phone2,
        obs: supplier.obs,
        active: supplier.active,
        type: supplier.type,
      },
    });
  }

  async create(supplier: SupplierEntity): Promise<SupplierDB> {
    return await this.db.create({
      data: {
        name: supplier.name,
        nameFilter: supplier.nameFilter,
        cpnj: supplier.cpnj,
        im: supplier.im,
        ie: supplier.ie,
        email: supplier.email,
        cep: supplier.cep,
        address: supplier.address,
        district: supplier.district,
        city: supplier.city,
        region: supplier.region,
        phone1: supplier.phone1,
        phone2: supplier.phone2,
        obs: supplier.obs,
        active: supplier.active,
        type: supplier.type,
      },
    });
  }

  async delete(supplierId: string): Promise<void> {
    await this.db.update({
      where: {
        id: supplierId,
      },
      data: {
        active: false,
      },
    });
  }
}
