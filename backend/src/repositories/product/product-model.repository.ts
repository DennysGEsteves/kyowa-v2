import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModelEntity } from '../../entities/product';
import { IProductModelRepository } from './interfaces/i-product-model-repository';
import {
  ProductModel,
  ProductModelDocument,
} from './schemas/product-model.schema';

@Injectable()
export class ProductModelRepository implements IProductModelRepository {
  constructor(
    @InjectModel(ProductModel.name)
    private readonly model: Model<ProductModelDocument>,
  ) {}

  async create(data: ProductModelEntity): Promise<ProductModelEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductModelEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductModelEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductModelEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductModelEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductModelEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductModelEntity,
  ): Promise<ProductModelEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductModelEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
