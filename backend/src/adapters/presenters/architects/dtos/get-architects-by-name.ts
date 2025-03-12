import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetArchitectsByNameResponse {
  @Field(() => ID)
  mid: string;

  @Field()
  name: string;
}
