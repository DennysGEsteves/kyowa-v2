import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from 'src/entities';

@ObjectType()
export class GetStoresDTOPresenter {
  @Field(() => Int)
  public readonly id: number;

  @Field()
  public readonly name: string;

  @Field()
  public readonly email?: string;

  @Field({ nullable: true })
  public readonly address?: string;

  @Field({ nullable: true })
  public readonly phone?: string;

  @Field({ nullable: true })
  public readonly obs?: string;

  @Field({ nullable: true })
  public readonly managerId?: string;

  @Field({ nullable: true })
  public readonly manager?: UserEntity;
}
