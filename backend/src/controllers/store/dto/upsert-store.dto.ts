import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpsertStoreDTO {
  @Field(() => ID, { nullable: true })
  mid?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  obs?: string;

  @Field({ nullable: true })
  managerId?: string;
}
