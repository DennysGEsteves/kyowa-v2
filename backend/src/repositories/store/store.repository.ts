import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { StoreEntity } from '../../entities/store';
import {
  CreateStoreData,
  IStoreRepository,
  UpdateStoreData,
} from './interfaces/i-store-repository';
import { Store, StoreDocument } from './schemas/store.schema';

@Injectable()
export class StoreRepository implements IStoreRepository {
  constructor(
    @InjectModel(Store.name)
    private readonly storeModel: Model<StoreDocument>,
  ) {}

  async create(data: CreateStoreData): Promise<StoreEntity> {
    const created = await this.storeModel.create({
      ...data,
      managerId: this.toObjectId(data.managerId),
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<StoreEntity[]> {
    const stores = await this.storeModel.find().sort({ name: 1 }).exec();
    return stores.map((store) => this.toEntity(store));
  }

  async findById(id: string): Promise<StoreEntity | null> {
    const store = await this.storeModel.findById(id).exec();
    return store ? this.toEntity(store) : null;
  }

  async update(
    id: string,
    data: UpdateStoreData,
  ): Promise<StoreEntity | null> {
    const payload: Record<string, unknown> = { ...data };

    if ('managerId' in data) {
      payload.managerId = this.toObjectId(data.managerId);
    }

    const store = await this.storeModel
      .findByIdAndUpdate(id, payload, { new: true, runValidators: true })
      .exec();
    return store ? this.toEntity(store) : null;
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

  private toEntity(document: StoreDocument): StoreEntity {
    return new StoreEntity(
      document._id.toString(),
      document.name,
      document.email,
      document.cep,
      document.address,
      document.district,
      document.city,
      document.region,
      document.phone1,
      document.phone2,
      document.obs,
      document.managerId?.toString() ?? null,
    );
  }
}
