import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetProductsByNameResponse {
  @Field(() => ID)
  mid: string;

  @Field()
  name: string;
}
