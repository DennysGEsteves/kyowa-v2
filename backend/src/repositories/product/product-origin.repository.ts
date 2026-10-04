import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductOriginEntity } from '../../entities/product';
import { IProductOriginRepository } from './interfaces/i-product-origin-repository';
import {
  ProductOrigin,
  ProductOriginDocument,
} from './schemas/product-origin.schema';

@Injectable()
export class ProductOriginRepository implements IProductOriginRepository {
  constructor(
    @InjectModel(ProductOrigin.name)
    private readonly model: Model<ProductOriginDocument>,
  ) {}

  async create(data: ProductOriginEntity): Promise<ProductOriginEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductOriginEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductOriginEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductOriginEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductOriginEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductOriginEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductOriginEntity,
  ): Promise<ProductOriginEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductOriginEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
