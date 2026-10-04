import { ProductEntity } from '../../../../entities/product';

export type GetByNameResponse = {
  readonly id: string;
  readonly name: string;
  readonly fantasyName: string;
};

export function toGetByNameResponse(
  products: ProductEntity[],
): GetByNameResponse[] {
  return products.map((product) => ({
    id: product.id!,
    name: product.name,
    fantasyName: product.fantasyName,
  }));
}
