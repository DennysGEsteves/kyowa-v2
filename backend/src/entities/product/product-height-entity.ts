import { CreateProductHeightDto } from '../../controllers/product-height/dto/create-product-height.dto';
import { UpdateProductHeightDto } from '../../controllers/product-height/dto/update-product-height.dto';
import { ProductHeightDocument } from '../../repositories/product/schemas/product-height.schema';

export interface IProductHeightConstructorParams {
  id?: string;
  name: string;
}

export class ProductHeightEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductHeightConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductHeightDocument): ProductHeightEntity {
    return new ProductHeightEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductHeightDto(
    dto: CreateProductHeightDto,
  ): ProductHeightEntity {
    return new ProductHeightEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductHeightDto(
    oldEntity: ProductHeightEntity,
    dto: UpdateProductHeightDto,
  ): ProductHeightEntity {
    return new ProductHeightEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
