import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductUnitEntity } from '../../entities/product';
import {
  CreateProductUnitData,
  IProductUnitRepository,
  UpdateProductUnitData,
} from './interfaces/i-product-unit-repository';
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

  async create(data: CreateProductUnitData): Promise<ProductUnitEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductUnitEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductUnitEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductUnitData,
  ): Promise<ProductUnitEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductUnitDocument): ProductUnitEntity {
    return new ProductUnitEntity(document._id.toString(), document.name);
  }
}
