import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { ProductEntity } from '../../entities/product';
import { PaginatedResult } from '../../shared/types/pagination';
import { escapeRegExp } from '../../shared/util/string/escape-regexp';
import { toNameFilter } from '../../shared/util/string/name-filter';
import { IProductRepository } from './interfaces/i-product-repository';
import { Product, ProductDocument } from './schemas/product.schema';

const RELATION_FIELDS = [
  'providerId',
  'categoryId',
  'unitId',
  'colorId',
  'sizeId',
  'designId',
  'shapeId',
  'originId',
  'modelId',
] as const;

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data: ProductEntity): Promise<ProductEntity> {
    const created = await this.productModel.create({
      ...this.omitRelationStrings(data),
      ...this.mapRelationIds(data),
      amountUnlimited: data.amountUnlimited ?? false,
    });
    return ProductEntity.fromPersistData(created);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel.find().sort({ name: 1 }).exec();
    return products.map((product) => ProductEntity.fromPersistData(product));
  }

  async findPaginated(
    filters: { name?: string },
    pagination: { page: number; limit: number },
  ): Promise<PaginatedResult<ProductEntity>> {
    const query: FilterQuery<ProductDocument> = {};

    if (filters.name) {
      const normalizedName = toNameFilter(filters.name);
      if (normalizedName) {
        query.nameFilter = {
          $regex: escapeRegExp(normalizedName),
        };
      }
    }

    const skip = (pagination.page - 1) * pagination.limit;

    const [total, products] = await Promise.all([
      this.productModel.countDocuments(query).exec(),
      this.productModel
        .find(query)
        .sort({ name: 1 })
        .skip(skip)
        .limit(pagination.limit)
        .exec(),
    ]);

    const totalPages = total === 0 ? 0 : Math.ceil(total / pagination.limit);

    return {
      data: products.map((product) => ProductEntity.fromPersistData(product)),
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages,
      },
    };
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findById(id).exec();
    return product ? ProductEntity.fromPersistData(product) : null;
  }

  async update(id: string, data: ProductEntity): Promise<ProductEntity | null> {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        { ...this.omitRelationStrings(data), ...this.mapRelationIds(data) },
        { new: true, runValidators: true },
      )
      .exec();
    return product ? ProductEntity.fromPersistData(product) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private omitRelationStrings(data: ProductEntity): Record<string, unknown> {
    const copy: Record<string, unknown> = { ...data };
    for (const field of RELATION_FIELDS) {
      delete copy[field];
    }
    delete copy.id;
    delete copy.createdAt;
    delete copy.updatedAt;
    return copy;
  }

  private mapRelationIds(
    data: ProductEntity,
  ): Record<string, Types.ObjectId | null | undefined> {
    const mapped: Record<string, Types.ObjectId | null | undefined> = {};
    for (const field of RELATION_FIELDS) {
      const value = data[field];
      mapped[field] =
        value === null || value === undefined
          ? value
          : new Types.ObjectId(value);
    }
    return mapped;
  }
}
