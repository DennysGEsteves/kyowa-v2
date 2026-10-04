import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductUnitEntity } from '../../entities/product';
import { IProductUnitRepository } from './interfaces/i-product-unit-repository';
import {
  ProductUnit,
  ProductUnitDocument,
} from './schemas/product-unit.schema';

@Injectable()
export class ProductUnitRepository implements IProductUnitRepository {
  constructor(
    @InjectModel(ProductUnit.name)
    private readonly model: Model<ProductUnitDocument>,
  ) {}

  async create(data: ProductUnitEntity): Promise<ProductUnitEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductUnitEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductUnitEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductUnitEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductUnitEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductUnitEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductUnitEntity,
  ): Promise<ProductUnitEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductUnitEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
