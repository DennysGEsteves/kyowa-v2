import { CreateProductSizeDto } from '../../controllers/product-size/dto/create-product-size.dto';
import { UpdateProductSizeDto } from '../../controllers/product-size/dto/update-product-size.dto';
import { ProductSizeDocument } from '../../repositories/product/schemas/product-size.schema';

export interface IProductSizeConstructorParams {
  id?: string;
  name: string;
}

export class ProductSizeEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductSizeConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductSizeDocument): ProductSizeEntity {
    return new ProductSizeEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductSizeDto(
    dto: CreateProductSizeDto,
  ): ProductSizeEntity {
    return new ProductSizeEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductSizeDto(
    oldEntity: ProductSizeEntity,
    dto: UpdateProductSizeDto,
  ): ProductSizeEntity {
    return new ProductSizeEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
