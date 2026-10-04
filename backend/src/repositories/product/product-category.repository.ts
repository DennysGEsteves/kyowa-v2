import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCategoryEntity } from '../../entities/product';
import { IProductCategoryRepository } from './interfaces/i-product-category-repository';
import {
  ProductCategory,
  ProductCategoryDocument,
} from './schemas/product-category.schema';

@Injectable()
export class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(
    @InjectModel(ProductCategory.name)
    private readonly model: Model<ProductCategoryDocument>,
  ) {}

  async create(data: ProductCategoryEntity): Promise<ProductCategoryEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductCategoryEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductCategoryEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductCategoryEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductCategoryEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductCategoryEntity.fromPersistData(item) : null;
  }

  async findIdByName(name: string): Promise<string | null> {
    const item = await this.model.findOne({ name }).exec();
    return item ? item._id.toString() : null;
  }

  async update(
    id: string,
    data: ProductCategoryEntity,
  ): Promise<ProductCategoryEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductCategoryEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
