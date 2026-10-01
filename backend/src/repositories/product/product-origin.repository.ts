import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductOriginEntity } from '../../entities/product';
import {
  CreateProductOriginData,
  IProductOriginRepository,
  UpdateProductOriginData,
} from './interfaces/i-product-origin-repository';
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

  async create(data: CreateProductOriginData): Promise<ProductOriginEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductOriginEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductOriginEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductOriginData,
  ): Promise<ProductOriginEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductOriginDocument): ProductOriginEntity {
    return new ProductOriginEntity(document._id.toString(), document.name);
  }
}
