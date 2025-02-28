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
      include: {
        manager: true,
      },
    });
  }

  public findById(id: string): Promise<StoreDB> {
    return this.db.findFirst({
      where: {
        id,
      },
      include: {
        manager: true,
      },
    });
  }

  public create(store: StoreEntity): Promise<StoreDB> {
    return this.db.create({
      data: {
        name: store.name,
        email: store.email,
        address: store.address,
        phone: store.phone,
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
        address: store.address,
        phone: store.phone,
        obs: store.obs,
        managerId: store.managerId,
      },
    });
  }
}
