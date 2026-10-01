import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductSizeEntity } from '../../entities/product';
import {
  CreateProductSizeData,
  IProductSizeRepository,
  UpdateProductSizeData,
} from './interfaces/i-product-size-repository';
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

  async create(data: CreateProductSizeData): Promise<ProductSizeEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductSizeEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductSizeEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductSizeData,
  ): Promise<ProductSizeEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductSizeDocument): ProductSizeEntity {
    return new ProductSizeEntity(document._id.toString(), document.name);
  }
}
