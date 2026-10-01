import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ProductEntity } from '../../entities/product';
import {
  CreateProductData,
  IProductRepository,
  UpdateProductData,
} from './interfaces/i-product-repository';
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

  async create(data: CreateProductData): Promise<ProductEntity> {
    const created = await this.productModel.create({
      ...this.omitRelationStrings(data),
      ...this.mapRelationIds(data),
      amountUnlimited: data.amountUnlimited ?? false,
    });
    return this.toEntity(created);
  }

  async findAll(): Promise<ProductEntity[]> {
    const products = await this.productModel.find().sort({ name: 1 }).exec();
    return products.map((product) => this.toEntity(product));
  }

  async findById(id: string): Promise<ProductEntity | null> {
    const product = await this.productModel.findById(id).exec();
    return product ? this.toEntity(product) : null;
  }

  async update(
    id: string,
    data: UpdateProductData,
  ): Promise<ProductEntity | null> {
    const product = await this.productModel
      .findByIdAndUpdate(
        id,
        { ...this.omitRelationStrings(data), ...this.mapRelationIds(data) },
        { new: true, runValidators: true },
      )
      .exec();
    return product ? this.toEntity(product) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  private omitRelationStrings<T extends CreateProductData | UpdateProductData>(
    data: T,
  ): Omit<T, (typeof RELATION_FIELDS)[number]> {
    const copy = { ...data };
    for (const field of RELATION_FIELDS) {
      delete copy[field];
    }
    return copy;
  }

  private mapRelationIds(
    data: CreateProductData | UpdateProductData,
  ): Record<string, Types.ObjectId | null | undefined> {
    const mapped: Record<string, Types.ObjectId | null | undefined> = {};
    for (const field of RELATION_FIELDS) {
      if (!(field in data)) {
        continue;
      }
      const value = data[field];
      mapped[field] =
        value === null || value === undefined
          ? value
          : new Types.ObjectId(value);
    }
    return mapped;
  }

  private toEntity(document: ProductDocument): ProductEntity {
    return new ProductEntity(
      document._id.toString(),
      document.name,
      document.fantasyName,
      document.nameFilter,
      document.ezId,
      document.providerId?.toString() ?? null,
      document.categoryId?.toString() ?? null,
      document.ref,
      document.unitId?.toString() ?? null,
      document.colorId?.toString() ?? null,
      document.sizeId?.toString() ?? null,
      document.designId?.toString() ?? null,
      document.shapeId?.toString() ?? null,
      document.originId?.toString() ?? null,
      document.modelId?.toString() ?? null,
      document.ncm,
      document.cst,
      document.ean,
      document.buyPrice,
      document.sellPrice,
      document.hasSeals,
      document.amountStart,
      document.amountSold,
      document.amountUnlimited,
      document.createdAt,
      document.updatedAt,
    );
  }
}
