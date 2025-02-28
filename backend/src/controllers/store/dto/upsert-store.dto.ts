import { InputType, Field, Int } from '@nestjs/graphql';
import { RoleType } from 'src/entities/user/types';

@InputType()
export class UpsertStoreDTO {
  @Field(() => Int, { nullable: true })
  id?: number;

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
