import { CreateProductShapeDto } from '../../controllers/product-shape/dto/create-product-shape.dto';
import { UpdateProductShapeDto } from '../../controllers/product-shape/dto/update-product-shape.dto';
import { ProductShapeDocument } from '../../repositories/product/schemas/product-shape.schema';

export interface IProductShapeConstructorParams {
  id?: string;
  name: string;
}

export class ProductShapeEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductShapeConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductShapeDocument): ProductShapeEntity {
    return new ProductShapeEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductShapeDto(
    dto: CreateProductShapeDto,
  ): ProductShapeEntity {
    return new ProductShapeEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductShapeDto(
    oldEntity: ProductShapeEntity,
    dto: UpdateProductShapeDto,
  ): ProductShapeEntity {
    return new ProductShapeEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
