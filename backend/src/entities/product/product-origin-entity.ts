import { CreateProductOriginDto } from '../../controllers/product-origin/dto/create-product-origin.dto';
import { UpdateProductOriginDto } from '../../controllers/product-origin/dto/update-product-origin.dto';
import { ProductOriginDocument } from '../../repositories/product/schemas/product-origin.schema';

export interface IProductOriginConstructorParams {
  id?: string;
  name: string;
}

export class ProductOriginEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductOriginConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductOriginDocument): ProductOriginEntity {
    return new ProductOriginEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductOriginDto(
    dto: CreateProductOriginDto,
  ): ProductOriginEntity {
    return new ProductOriginEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductOriginDto(
    oldEntity: ProductOriginEntity,
    dto: UpdateProductOriginDto,
  ): ProductOriginEntity {
    return new ProductOriginEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
