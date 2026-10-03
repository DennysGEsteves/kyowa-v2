import { CreateProductUnitDto } from '../../controllers/product-unit/dto/create-product-unit.dto';
import { UpdateProductUnitDto } from '../../controllers/product-unit/dto/update-product-unit.dto';
import { ProductUnitDocument } from '../../repositories/product/schemas/product-unit.schema';

export interface IProductUnitConstructorParams {
  id?: string;
  name: string;
}

export class ProductUnitEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductUnitConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductUnitDocument): ProductUnitEntity {
    return new ProductUnitEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductUnitDto(
    dto: CreateProductUnitDto,
  ): ProductUnitEntity {
    return new ProductUnitEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductUnitDto(
    oldEntity: ProductUnitEntity,
    dto: UpdateProductUnitDto,
  ): ProductUnitEntity {
    return new ProductUnitEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
