import { CreateProductModelDto } from '../../controllers/product-model/dto/create-product-model.dto';
import { UpdateProductModelDto } from '../../controllers/product-model/dto/update-product-model.dto';
import { ProductModelDocument } from '../../repositories/product/schemas/product-model.schema';

export interface IProductModelConstructorParams {
  id?: string;
  name: string;
}

export class ProductModelEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductModelConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductModelDocument): ProductModelEntity {
    return new ProductModelEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductModelDto(
    dto: CreateProductModelDto,
  ): ProductModelEntity {
    return new ProductModelEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductModelDto(
    oldEntity: ProductModelEntity,
    dto: UpdateProductModelDto,
  ): ProductModelEntity {
    return new ProductModelEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
