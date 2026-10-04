import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductHeightEntity } from '../../entities/product';
import { IProductHeightRepository } from './interfaces/i-product-height-repository';
import {
  ProductHeight,
  ProductHeightDocument,
} from './schemas/product-height.schema';

@Injectable()
export class ProductHeightRepository implements IProductHeightRepository {
  constructor(
    @InjectModel(ProductHeight.name)
    private readonly model: Model<ProductHeightDocument>,
  ) {}

  async create(data: ProductHeightEntity): Promise<ProductHeightEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductHeightEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductHeightEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductHeightEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductHeightEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductHeightEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductHeightEntity,
  ): Promise<ProductHeightEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductHeightEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
