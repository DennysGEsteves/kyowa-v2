import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDesignEntity } from '../../entities/product';
import { IProductDesignRepository } from './interfaces/i-product-design-repository';
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

  async create(data: ProductDesignEntity): Promise<ProductDesignEntity> {
    const created = await this.model.create({ name: data.name });
    return ProductDesignEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductDesignEntity[]> {
    const items = await this.model.find().sort({ name: 1 }).exec();
    return items.map((item) => ProductDesignEntity.fromPersistData(item));
  }

  async findById(id: string): Promise<ProductDesignEntity | null> {
    const item = await this.model.findById(id).exec();
    return item ? ProductDesignEntity.fromPersistData(item) : null;
  }

  async update(
    id: string,
    data: ProductDesignEntity,
  ): Promise<ProductDesignEntity | null> {
    const item = await this.model
      .findByIdAndUpdate(
        id,
        { name: data.name },
        { new: true, runValidators: true },
      )
      .exec();
    return item ? ProductDesignEntity.fromPersistData(item) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id).exec();
    return result !== null;
  }
}
