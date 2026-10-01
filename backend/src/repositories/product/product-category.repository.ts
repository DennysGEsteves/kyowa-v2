import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductCategoryEntity } from '../../entities/product';
import {
  CreateProductCategoryData,
  IProductCategoryRepository,
  UpdateProductCategoryData,
} from './interfaces/i-product-category-repository';
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

  async create(
    data: CreateProductCategoryData,
  ): Promise<ProductCategoryEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductCategoryEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductCategoryEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductCategoryData,
  ): Promise<ProductCategoryEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductCategoryDocument): ProductCategoryEntity {
    return new ProductCategoryEntity(document._id.toString(), document.name);
  }
}
