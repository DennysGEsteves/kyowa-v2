import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductHeightEntity } from '../../entities/product';
import {
  CreateProductHeightData,
  IProductHeightRepository,
  UpdateProductHeightData,
} from './interfaces/i-product-height-repository';
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

  async create(data: CreateProductHeightData): Promise<ProductHeightEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductHeightEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductHeightEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductHeightData,
  ): Promise<ProductHeightEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductHeightDocument): ProductHeightEntity {
    return new ProductHeightEntity(document._id.toString(), document.name);
  }
}
