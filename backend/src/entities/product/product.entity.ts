import { CreateProductDto } from '../../controllers/product/dto/create-product.dto';
import { UpdateProductDto } from '../../controllers/product/dto/update-product.dto';
import { ProductDocument } from '../../repositories/product/schemas/product.schema';
import { resolveNameFilter } from '../../util/string/name-filter';

export interface IProductConstructorParams {
  id?: string;
  name: string;
  fantasyName: string;
  nameFilter: string;
  ezId?: number | null;
  providerId?: string | null;
  categoryId?: string | null;
  ref?: string | null;
  unitId?: string | null;
  colorId?: string | null;
  sizeId?: string | null;
  designId?: string | null;
  shapeId?: string | null;
  originId?: string | null;
  modelId?: string | null;
  ncm?: string | null;
  cst?: string | null;
  ean?: string | null;
  buyPrice?: number | null;
  sellPrice?: number | null;
  hasSeals?: boolean | null;
  amountStart?: number | null;
  amountSold?: number | null;
  amountUnlimited?: boolean;
  isEcommerce?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductEntity {
  public id?: string;
  public name: string;
  public fantasyName: string;
  public nameFilter: string;
  public ezId: number | null;
  public providerId: string | null;
  public categoryId: string | null;
  public ref: string | null;
  public unitId: string | null;
  public colorId: string | null;
  public sizeId: string | null;
  public designId: string | null;
  public shapeId: string | null;
  public originId: string | null;
  public modelId: string | null;
  public ncm: string | null;
  public cst: string | null;
  public ean: string | null;
  public buyPrice: number | null;
  public sellPrice: number | null;
  public hasSeals: boolean | null;
  public amountStart: number | null;
  public amountSold: number | null;
  public amountUnlimited: boolean;
  public isEcommerce?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(params: IProductConstructorParams) {
    this.id = params.id;
    this.name = params.name;
    this.fantasyName = params.fantasyName;
    this.nameFilter = params.nameFilter;
    this.ezId = params.ezId ?? null;
    this.providerId = params.providerId ?? null;
    this.categoryId = params.categoryId ?? null;
    this.ref = params.ref ?? null;
    this.unitId = params.unitId ?? null;
    this.colorId = params.colorId ?? null;
    this.sizeId = params.sizeId ?? null;
    this.designId = params.designId ?? null;
    this.shapeId = params.shapeId ?? null;
    this.originId = params.originId ?? null;
    this.modelId = params.modelId ?? null;
    this.ncm = params.ncm ?? null;
    this.cst = params.cst ?? null;
    this.ean = params.ean ?? null;
    this.buyPrice = params.buyPrice ?? null;
    this.sellPrice = params.sellPrice ?? null;
    this.hasSeals = params.hasSeals ?? null;
    this.amountStart = params.amountStart ?? null;
    this.amountSold = params.amountSold ?? null;
    this.amountUnlimited = params.amountUnlimited ?? false;
    this.isEcommerce = params.isEcommerce;
    this.createdAt = params.createdAt;
    this.updatedAt = params.updatedAt;
  }

  static fromPersistData(document: ProductDocument): ProductEntity {
    return new ProductEntity({
      id: document._id.toString(),
      name: document.name,
      fantasyName: document.fantasyName,
      nameFilter: document.nameFilter,
      ezId: document.ezId,
      providerId: document.providerId?.toString() ?? null,
      categoryId: document.categoryId?.toString() ?? null,
      ref: document.ref,
      unitId: document.unitId?.toString() ?? null,
      colorId: document.colorId?.toString() ?? null,
      sizeId: document.sizeId?.toString() ?? null,
      designId: document.designId?.toString() ?? null,
      shapeId: document.shapeId?.toString() ?? null,
      originId: document.originId?.toString() ?? null,
      modelId: document.modelId?.toString() ?? null,
      ncm: document.ncm,
      cst: document.cst,
      ean: document.ean,
      buyPrice: document.buyPrice,
      sellPrice: document.sellPrice,
      hasSeals: document.hasSeals,
      amountStart: document.amountStart,
      amountSold: document.amountSold,
      amountUnlimited: document.amountUnlimited,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
    });
  }

  static fromCreateProductDto(dto: CreateProductDto): ProductEntity {
    return new ProductEntity({
      name: dto.name,
      fantasyName: dto.fantasyName,
      nameFilter: resolveNameFilter(dto.name),
      categoryId: dto.categoryId,
      ref: dto.ref,
      unitId: dto.unitId,
      colorId: dto.colorId,
      sizeId: dto.sizeId,
      designId: dto.designId,
      shapeId: dto.shapeId,
      originId: dto.originId,
      modelId: dto.modelId,
      ncm: dto.ncm,
      cst: dto.cst,
      ean: dto.ean,
      buyPrice: dto.buyPrice,
      sellPrice: dto.sellPrice,
      hasSeals: dto.hasSeals,
      amountStart: dto.amountStart,
      amountSold: dto.amountSold,
      amountUnlimited: dto.amountUnlimited,
      isEcommerce: dto.isEcommerce,
    });
  }

  static fromUpdateProductDto(
    oldProduct: ProductEntity,
    dto: UpdateProductDto,
  ): ProductEntity {
    const name = dto.name ?? oldProduct.name;

    return new ProductEntity({
      id: oldProduct.id,
      name,
      fantasyName: dto.fantasyName ?? oldProduct.fantasyName,
      nameFilter:
        dto.name !== undefined
          ? resolveNameFilter(name)
          : oldProduct.nameFilter,
      ezId: oldProduct.ezId,
      providerId:
        dto.providerId !== undefined ? dto.providerId : oldProduct.providerId,
      categoryId:
        dto.categoryId !== undefined ? dto.categoryId : oldProduct.categoryId,
      ref: dto.ref !== undefined ? dto.ref : oldProduct.ref,
      unitId: dto.unitId !== undefined ? dto.unitId : oldProduct.unitId,
      colorId: dto.colorId !== undefined ? dto.colorId : oldProduct.colorId,
      sizeId: dto.sizeId !== undefined ? dto.sizeId : oldProduct.sizeId,
      designId: dto.designId !== undefined ? dto.designId : oldProduct.designId,
      shapeId: dto.shapeId !== undefined ? dto.shapeId : oldProduct.shapeId,
      originId: dto.originId !== undefined ? dto.originId : oldProduct.originId,
      modelId: dto.modelId !== undefined ? dto.modelId : oldProduct.modelId,
      ncm: dto.ncm !== undefined ? dto.ncm : oldProduct.ncm,
      cst: dto.cst !== undefined ? dto.cst : oldProduct.cst,
      ean: dto.ean !== undefined ? dto.ean : oldProduct.ean,
      buyPrice: dto.buyPrice !== undefined ? dto.buyPrice : oldProduct.buyPrice,
      sellPrice:
        dto.sellPrice !== undefined ? dto.sellPrice : oldProduct.sellPrice,
      hasSeals: dto.hasSeals !== undefined ? dto.hasSeals : oldProduct.hasSeals,
      amountStart:
        dto.amountStart !== undefined
          ? dto.amountStart
          : oldProduct.amountStart,
      amountSold:
        dto.amountSold !== undefined ? dto.amountSold : oldProduct.amountSold,
      amountUnlimited:
        dto.amountUnlimited !== undefined
          ? dto.amountUnlimited
          : oldProduct.amountUnlimited,
      isEcommerce:
        dto.isEcommerce !== undefined
          ? dto.isEcommerce
          : oldProduct.isEcommerce,
      createdAt: oldProduct.createdAt,
      updatedAt: oldProduct.updatedAt,
    });
  }
}
