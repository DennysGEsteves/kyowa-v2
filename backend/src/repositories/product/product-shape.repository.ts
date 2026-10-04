import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductShapeEntity } from '../../entities/product';
import { IProductShapeRepository } from './interfaces/i-product-shape-repository';
import {
  ProductShape,
  ProductShapeDocument,
} from './schemas/product-shape.schema';

@Injectable()
export class ProductShapeRepository implements IProductShapeRepository {
  constructor(
    @InjectModel(ProductShape.name)
    private readonly model: Model<ProductShapeDocument>,
  ) {}

  async create(data: ProductShapeEntity): Promise<ProductShapeEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductShapeEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductShapeEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductShapeEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductShapeEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductShapeEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductShapeEntity,
  ): Promise<ProductShapeEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductShapeEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
