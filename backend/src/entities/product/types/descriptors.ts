import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductDescriptors {
  @Field()
  category: string;

  @Field()
  unit: string;

  @Field()
  colord: string;

  @Field()
  size: string;

  @Field()
  design: string;

  @Field()
  shape: string;

  @Field()
  origin: string;

  @Field()
  model: string;

  @Field()
  height: string;
}
