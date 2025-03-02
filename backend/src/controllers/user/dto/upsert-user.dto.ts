import { InputType, Field, ID } from '@nestjs/graphql';
import { RoleType } from 'src/entities/user/types';

@InputType()
export class UpsertUserDTO {
  @Field(() => ID, { nullable: true })
  mid?: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  phone?: string;

  @Field({ nullable: true })
  login?: string;

  @Field({ nullable: true })
  role?: RoleType;

  @Field({ nullable: true })
  storeId?: string;
}
