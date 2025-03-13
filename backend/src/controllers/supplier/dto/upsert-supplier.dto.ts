import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class UpsertSupplierDTO {
  @Field(() => ID, { nullable: true })
  mid?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  cnpj?: string;

  @Field({ nullable: true })
  im?: string;

  @Field({ nullable: true })
  ie?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  obs?: string;
}
