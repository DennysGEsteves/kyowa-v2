import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetUsersDTOPresenter {
  @Field(() => ID)
  public readonly mid: string;

  @Field(() => Int, { nullable: true })
  public readonly id: number;

  @Field()
  public readonly email: string;

  @Field()
  public readonly name: string;

  @Field({ nullable: true })
  public readonly phone?: string;

  @Field({ nullable: true })
  public readonly login?: string;

  @Field({ nullable: true })
  public readonly role?: string;

  @Field({ nullable: true })
  public readonly storeId?: string;

  @Field({ nullable: true })
  public readonly active?: boolean;

  @Field({ nullable: true })
  public readonly status?: string;
}
