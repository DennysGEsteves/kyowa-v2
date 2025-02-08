import { StoreEntity } from 'src/entities/store/store-entity';
import { IStoreRepository } from './interfaces/i-store-repository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { StoreDB } from './type';

@Injectable()
export class StoreRepository implements IStoreRepository {
  private db = undefined;

  constructor(readonly prisma: PrismaService) {
    this.db = prisma.store;
  }

  public findAll(): Promise<StoreDB[]> {
    return this.db.findMany({
      includes: {
        manager: true,
      },
    });
  }

  public findById(id: string): Promise<StoreDB> {
    return this.db.findFirst({
      where: {
        id,
      },
      includes: {
        manager: true,
      },
    });
  }

  public create(store: StoreEntity): Promise<StoreDB> {
    return this.db.create({
      data: {
        name: store.name,
        email: store.email,
        cep: store.cep,
        address: store.address,
        district: store.district,
        city: store.city,
        region: store.region,
        phone1: store.phone1,
        phone2: store.phone2,
        obs: store.obs,
        managerId: store.managerId,
      },
    });
  }

  public update(store: StoreEntity): Promise<StoreDB> {
    return this.db.update({
      where: {
        id: store.id,
      },
      data: {
        name: store.name,
        email: store.email,
        cep: store.cep,
        address: store.address,
        district: store.district,
        city: store.city,
        region: store.region,
        phone1: store.phone1,
        phone2: store.phone2,
        obs: store.obs,
        managerId: store.managerId,
      },
    });
  }
}
