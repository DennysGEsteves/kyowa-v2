import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ArchitectEntity } from 'src/entities';

@ObjectType()
class PaginationMeta {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  totalPages: number;
}

@ObjectType()
export class GetArchitectsByPaginationResponse {
  @Field(() => [ArchitectEntity])
  items: ArchitectEntity[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
