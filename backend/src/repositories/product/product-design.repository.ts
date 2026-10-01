import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDesignEntity } from '../../entities/product';
import {
  CreateProductDesignData,
  IProductDesignRepository,
  UpdateProductDesignData,
} from './interfaces/i-product-design-repository';
import {
  ProductDesign,
  ProductDesignDocument,
} from './schemas/product-design.schema';

@Injectable()
export class ProductDesignRepository implements IProductDesignRepository {
  constructor(
    @InjectModel(ProductDesign.name)
    private readonly model: Model<ProductDesignDocument>,
  ) {}

  async create(data: CreateProductDesignData): Promise<ProductDesignEntity> {
    const created = await this.model.create(data);
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductDesignEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => this.toEntity(item));
  }

  async findById(id: string): Promise<ProductDesignEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? this.toEntity(item) : null;
  }

  async update(
    id: string,
    data: UpdateProductDesignData,
  ): Promise<ProductDesignEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .exec();
    return item ? this.toEntity(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private toEntity(document: ProductDesignDocument): ProductDesignEntity {
    return new ProductDesignEntity(document._id.toString(), document.name);
  }
}
