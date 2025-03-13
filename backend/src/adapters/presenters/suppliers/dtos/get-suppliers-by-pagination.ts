import { Field, ObjectType } from '@nestjs/graphql';
import { SupplierEntity } from 'src/entities';
import { PaginationMeta } from 'src/util/pagination';

@ObjectType()
export class GetSuppliersByPaginationResponse {
  @Field(() => [SupplierEntity])
  items: SupplierEntity[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
