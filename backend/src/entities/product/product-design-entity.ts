import { CreateProductDesignDto } from '../../controllers/product-design/dto/create-product-design.dto';
import { UpdateProductDesignDto } from '../../controllers/product-design/dto/update-product-design.dto';
import { ProductDesignDocument } from '../../repositories/product/schemas/product-design.schema';

export interface IProductDesignConstructorParams {
  id?: string;
  name: string;
}

export class ProductDesignEntity {
  public id?: string;
  public name: string;

  constructor(params: IProductDesignConstructorParams) {
    this.id = params.id;
    this.name = params.name;
  }

  static fromPersistData(document: ProductDesignDocument): ProductDesignEntity {
    return new ProductDesignEntity({
      id: document._id.toString(),
      name: document.name,
    });
  }

  static fromCreateProductDesignDto(
    dto: CreateProductDesignDto,
  ): ProductDesignEntity {
    return new ProductDesignEntity({
      name: dto.name,
    });
  }

  static fromUpdateProductDesignDto(
    oldEntity: ProductDesignEntity,
    dto: UpdateProductDesignDto,
  ): ProductDesignEntity {
    return new ProductDesignEntity({
      id: oldEntity.id,
      name: dto.name ?? oldEntity.name,
    });
  }
}
