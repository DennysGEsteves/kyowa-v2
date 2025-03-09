import { Field, ObjectType } from '@nestjs/graphql';
import { ArchitectEntity } from 'src/entities';
import { PaginationMeta } from 'src/util/pagination';

@ObjectType()
export class GetArchitectsByPaginationResponse {
  @Field(() => [ArchitectEntity])
  items: ArchitectEntity[];

  @Field(() => PaginationMeta)
  meta: PaginationMeta;
}
