import { Injectable } from '@nestjs/common';
import { IProductRepository } from './interfaces/i-product-repository';
import { ProductEntity } from '../../entities/product';
import { PrismaService } from 'src/services/prisma/prisma-service';
import { ProductDB } from './types';
import { PaginationArgs } from 'src/util/pagination/pagination-args';
import { paginationDBQueryObj } from 'src/util/pagination/pagination-db-query';
import { IProductPagination } from './interfaces/i-product-pagination';

@Injectable()
export class ProductRepository implements IProductRepository {
  private db = undefined;

  constructor(private prisma: PrismaService) {
    this.db = prisma.product;
  }

  async findAll(): Promise<ProductDB[]> {
    return await this.db.findMany({
      include: {
        supplier: true,
      },
    });
  }

  async findAllByPagination(
    paginationArgs: PaginationArgs,
  ): Promise<IProductPagination> {
    const paginationDBQuery = paginationDBQueryObj(paginationArgs, ['name']);

    const [items, total] = await this.prisma.$transaction([
      this.db.findMany({
        include: {
          supplier: true,
        },
        ...paginationDBQuery,
      }),
      this.db.count({
        where: paginationDBQuery.where,
      }),
    ]);

    return {
      items,
      total,
    };
  }

  async findAllByName(name: string): Promise<ProductDB[]> {
    return await this.db.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findByEmail(email: string): Promise<ProductDB> {
    return await this.db.findUnique({
      where: {
        email,
      },
      include: {
        supplier: true,
      },
    });
  }

  async findById(id: number): Promise<ProductDB> {
    return await this.db.findUnique({
      where: {
        id,
      },
      include: {
        supplier: true,
      },
    });
  }

  async update(product: ProductEntity): Promise<ProductDB> {
    return await this.db.update({
      where: {
        mid: product.mid,
      },
      data: {
        name: product.name,
        fantasyName: product.fantasyName,
        nameFilter: product.nameFilter,
        ezID: product.ezID,
        ref: product.ref,
        ncm: product.ncm,
        cst: product.cst,
        ean: product.ean,
        buyBrice: product.buyBrice,
        sellPrice: product.sellPrice,
        hasSeals: product.hasSeals,
        amountStart: product.amountStart,
        amountSold: product.amountSold,
        isAmountUnlimited: product.isAmountUnlimited,
        supplierId: product.supplierId,
        descriptors: product.descriptors,
      },
    });
  }

  async create(product: ProductEntity): Promise<ProductDB> {
    return await this.db.create({
      data: {
        name: product.name,
        fantasyName: product.fantasyName,
        nameFilter: product.nameFilter,
        ezID: product.ezID,
        ref: product.ref,
        ncm: product.ncm,
        cst: product.cst,
        ean: product.ean,
        buyBrice: product.buyBrice,
        sellPrice: product.sellPrice,
        hasSeals: product.hasSeals,
        amountStart: product.amountStart,
        amountSold: product.amountSold,
        isAmountUnlimited: product.isAmountUnlimited,
        supplierId: product.supplierId,
        descriptors: product.descriptors,
      },
    });
  }

  async delete(productId: string): Promise<void> {
    await this.db.update({
      where: {
        mid: productId,
      },
      data: {
        active: false,
      },
    });
  }
}
