import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductModelEntity } from '../../entities/product';
import {
  CreateProductModelData,
  IProductModelRepository,
  UpdateProductModelData,
} from './interfaces/i-product-model-repository';
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

  async create(data: CreateProductModelData): Promise<ProductModelEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductModelEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductModelEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductModelData,
  ): Promise<ProductModelEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductModelDocument): ProductModelEntity {
    return new ProductModelEntity(document._id.toString(), document.name);
  }
}
