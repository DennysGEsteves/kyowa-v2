import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductColorEntity } from '../../entities/product';
import { IProductColorRepository } from './interfaces/i-product-color-repository';
import {
  ProductColor,
  ProductColorDocument,
} from './schemas/product-color.schema';

@Injectable()
export class ProductColorRepository implements IProductColorRepository {
  constructor(
    @InjectModel(ProductColor.name)
    private readonly model: Model<ProductColorDocument>,
  ) {}

  async create(data: ProductColorEntity): Promise<ProductColorEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductColorEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductColorEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductColorEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductColorEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductColorEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductColorEntity,
  ): Promise<ProductColorEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductColorEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
