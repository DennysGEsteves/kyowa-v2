import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetSuppliersByNameResponse {
  @Field(() => ID)
  mid: string;

  @Field()
  name: string;
}
