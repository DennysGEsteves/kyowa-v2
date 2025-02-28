import { InputType, Field, Int } from '@nestjs/graphql';
import { RoleType } from 'src/entities/user/types';

@InputType()
export class UpsertUserDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

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
