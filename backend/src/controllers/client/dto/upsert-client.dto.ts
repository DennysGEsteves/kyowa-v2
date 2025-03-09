import { InputType, Field, ID } from '@nestjs/graphql';
import { InterestProduct, Origin } from 'src/entities/client/types';

@InputType()
export class UpsertClientDTO {
  @Field(() => ID, { nullable: true })
  mid?: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  cpf?: string;

  @Field({ nullable: true })
  rg?: string;

  @Field({ nullable: true })
  birthday?: Date;

  @Field({ nullable: true })
  occupation?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  obs?: string;

  @Field({ nullable: true })
  active?: boolean;

  @Field(() => [InterestProduct], { nullable: true })
  interestProducts?: InterestProduct[];

  @Field(() => [Origin], { nullable: true })
  origins?: Origin[];

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  architectId?: string;
}
