import { CreateProductColorDto } from '../../controllers/product-color/dto/create-product-color.dto';
import { UpdateProductColorDto } from '../../controllers/product-color/dto/update-product-color.dto';
import { ProductColorDocument } from '../../repositories/product/schemas/product-color.schema';

export interface IProductColorConstructorParams {
  id?: string;
  name: string;
}

export class ProductColorEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductColorConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductColorDocument): ProductColorEntity {
    return new ProductColorEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductColorDto(
    dto: CreateProductColorDto,
  ): ProductColorEntity {
    return new ProductColorEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductColorDto(
    oldEntity: ProductColorEntity,
    dto: UpdateProductColorDto,
  ): ProductColorEntity {
    return new ProductColorEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
