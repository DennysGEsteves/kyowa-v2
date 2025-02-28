import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user';

type IConstructorParams = {
  readonly id?: number;
  readonly name: string;
  readonly email: string;
  readonly address?: string;
  readonly phone?: string;
  readonly obs?: string;
  readonly managerId?: string;

  readonly manager?: UserEntity;
};

@ObjectType()
export class StoreEntity {
  @Field(() => Int)
  public readonly id?: number;

  @Field()
  public readonly name: string;

  @Field()
  public readonly email: string;

  @Field({ nullable: true })
  public readonly address?: string;

  @Field({ nullable: true })
  public readonly phone?: string;

  @Field({ nullable: true })
  public readonly obs?: string;

  @Field({ nullable: true })
  public readonly managerId?: string;

  // @Field(() => [UserEntity], { nullable: true })
  public readonly manager?: UserEntity;

  constructor(params: IConstructorParams) {
    this.id = params.id;
    this.address = params.address;
    this.name = params.name;
    this.email = params.email;
    this.phone = params.phone;
    this.obs = params.obs;
    this.managerId = params.managerId;

    this.manager = params.manager;
  }
}
