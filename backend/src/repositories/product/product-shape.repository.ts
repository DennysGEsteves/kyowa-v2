import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductShapeEntity } from '../../entities/product';
import {
  CreateProductShapeData,
  IProductShapeRepository,
  UpdateProductShapeData,
} from './interfaces/i-product-shape-repository';
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

  async create(data: CreateProductShapeData): Promise<ProductShapeEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductShapeEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductShapeEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductShapeData,
  ): Promise<ProductShapeEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductShapeDocument): ProductShapeEntity {
    return new ProductShapeEntity(document._id.toString(), document.name);
  }
}
