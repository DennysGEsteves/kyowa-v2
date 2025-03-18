import { ProductEntity as ProductEntity } from 'src/entities';
import { ProductDB } from 'src/repositories/product/types';
import { slugify } from 'src/util/string';
import { SupplierMapper } from '../supplier';
import { UpsertProductDTO } from 'src/controllers/product/dtos';

export class ProductMapper {
  static fromUpsertProductDTO(dto: UpsertProductDTO): ProductEntity {
    return new ProductEntity({
      ...(dto.mid
        ? {
            mid: dto.mid,
          }
        : {
            nameFilter: slugify(dto.name),
          }),
      name: dto.name,
      fantasyName: dto.fantasyName,
      ezID: dto.ezID,
      ref: dto.ref,
      ncm: dto.ncm,
      cst: dto.cst,
      ean: dto.ean,
      buyBrice: dto.buyBrice,
      sellPrice: dto.sellPrice,
      hasSeals: dto.hasSeals,
      amountStart: dto.amountStart,
      amountSold: dto.amountSold,
      isAmountUnlimited: dto.isAmountUnlimited,
      supplierId: dto.supplierId,
      descriptors: dto.descriptors,
    });
  }

  static fromDB(product: ProductDB): ProductEntity {
    return new ProductEntity({
      mid: product.mid,
      id: product.id,
      name: product.name,
      fantasyName: product.fantasyName,
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

      supplier: product.supplier
        ? SupplierMapper.fromProductDB(product)
        : undefined,
    });
  }

  static fromDBList(products: ProductDB[]): ProductEntity[] {
    return products.map((product) => ProductMapper.fromDB(product));
  }
}
