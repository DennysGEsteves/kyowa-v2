import { Field, ObjectType } from '@nestjs/graphql';
import { ClientEntity } from 'src/entities';
import { PaginationMeta } from 'src/util/pagination';

@ObjectType()
export class GetClientsByPaginationResponse {
  @Field(() => [ClientEntity])
  items: ClientEntity[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
