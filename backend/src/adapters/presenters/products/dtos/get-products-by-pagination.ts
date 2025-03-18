import { Field, ObjectType } from '@nestjs/graphql';
import { ProductEntity } from 'src/entities';
import { PaginationMeta } from 'src/util/pagination';

@ObjectType()
export class GetProductsByPaginationResponse {
  @Field(() => [ProductEntity])
  items: ProductEntity[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
