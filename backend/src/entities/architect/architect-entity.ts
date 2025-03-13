import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../user';

type IConstructorParams = {
  readonly mid?: string;
  readonly id?: number;
  readonly name: string;
  readonly nameFilter?: string;
  readonly cpf?: string;
  readonly birthday?: Date;
  readonly email?: string;
  readonly address?: string;
  readonly phone?: string;
  readonly obs?: string;
  readonly active?: boolean;
  readonly sellerId?: string;

  readonly seller?: UserEntity;
};

@ObjectType()
export class ArchitectEntity {
  @Field(() => ID)
  public readonly mid?: string;

  @Field(() => Int)
  public readonly id?: number;

  @Field()
  public readonly name: string;

  @Field()
  public readonly nameFilter?: string;

  @Field({ nullable: true })
  public readonly cpf?: string;

  @Field({ nullable: true })
  public readonly birthday?: Date;

  @Field()
  public readonly email?: string;

  @Field({ nullable: true })
  public readonly address?: string;

  @Field({ nullable: true })
  public readonly phone?: string;

  @Field({ nullable: true })
  public readonly obs?: string;

  @Field({ nullable: true })
  public readonly active?: boolean;

  @Field({ nullable: true })
  public readonly sellerId?: string;

  @Field(() => UserEntity, { nullable: true })
  public readonly seller?: UserEntity;

  constructor(params: IConstructorParams) {
    this.mid = params.mid;
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpf = params.cpf;
    this.birthday = params.birthday;
    this.email = params.email;
    this.address = params.address;
    this.phone = params.phone;
    this.obs = params.obs;
    this.active = params.active;
    this.sellerId = params.sellerId;

    this.seller = params.seller;
  }
}
