import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSizeEntity } from '../../entities/product';
import { IProductSizeRepository } from './interfaces/i-product-size-repository';
import {
  ProductSize,
  ProductSizeDocument,
} from './schemas/product-size.schema';

@Injectable()
export class ProductSizeRepository implements IProductSizeRepository {
  constructor(
    @InjectModel(ProductSize.name)
    private readonly model: Model<ProductSizeDocument>,
  ) {}

  async create(data: ProductSizeEntity): Promise<ProductSizeEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductSizeEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductSizeEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductSizeEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductSizeEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductSizeEntity.fromPersistData(item) : null;
  }

  async update(
    id: string,
    data: ProductSizeEntity,
  ): Promise<ProductSizeEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductSizeEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
