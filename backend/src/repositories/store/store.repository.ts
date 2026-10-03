import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StoreEntity } from '../../entities/store';
import { IStoreRepository } from './interfaces/i-store-repository';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async create(data: StoreEntity): Promise<StoreEntity> {
    const created = await this.storeModel.create({
      ...data,
      managerId: this.toObjectId(data.managerId),
    });
    return StoreEntity.fromPersistData(created);
  }

  async findAll(): Promise<StoreEntity[]> {
    const stores = await this.storeModel.find().sort({ name: 1 }).exec();
    return stores.map((store) => StoreEntity.fromPersistData(store));
  }

  async findById(id: string): Promise<StoreEntity | null> {
    const store = await this.storeModel.findById(id).exec();
    return store ? StoreEntity.fromPersistData(store) : null;
  }

  async update(id: string, data: StoreEntity): Promise<StoreEntity | null> {
    const store = await this.storeModel
      .findByIdAndUpdate(
        id,
        {
          ...data,
          managerId: this.toObjectId(data.managerId),
        },
        { new: true, runValidators: true },
      )
      .exec();
    return store ? StoreEntity.fromPersistData(store) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.storeModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toObjectId(value: string | null | undefined): Types.ObjectId | null {
    if (value === null || value === undefined) {
      return value ?? null;
    }
    return new Types.ObjectId(value);
  }
}
