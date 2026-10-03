import { CreateProductCategoryDto } from '../../controllers/product-category/dto/create-product-category.dto';
import { UpdateProductCategoryDto } from '../../controllers/product-category/dto/update-product-category.dto';
import { ProductCategoryDocument } from '../../repositories/product/schemas/product-category.schema';

export interface IProductCategoryConstructorParams {
  id?: string;
  name: string;
}

export class ProductCategoryEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductCategoryConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(
    document: ProductCategoryDocument,
  ): ProductCategoryEntity {
    return new ProductCategoryEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductCategoryDto(
    dto: CreateProductCategoryDto,
  ): ProductCategoryEntity {
    return new ProductCategoryEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductCategoryDto(
    oldEntity: ProductCategoryEntity,
    dto: UpdateProductCategoryDto,
  ): ProductCategoryEntity {
    return new ProductCategoryEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
