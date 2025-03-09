import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ArchitectEntity } from '../architect';
import { InterestProduct, Origin } from './types';

type IConstructorParams = {
  readonly mid?: string;
  readonly id?: number;
  readonly name: string;
  readonly nameFilter?: string;
  readonly cpf?: string;
  readonly rg?: string;
  readonly birthday?: Date;
  readonly occupation?: string;
  readonly email?: string;
  readonly address?: string;
  readonly phone?: string;
  readonly obs?: string;
  readonly active?: boolean;
  readonly interestProducts?: InterestProduct[];
  readonly origins?: Origin[];
  readonly createdAt?: Date;
  readonly architectId?: string;

  readonly architect?: ArchitectEntity;
};

@ObjectType()
export class ClientEntity {
  @Field(() => ID)
  public readonly mid?: string;

  @Field(() => Int)
  public readonly id?: number;

  @Field()
  public readonly name: string;

  @Field({ nullable: true })
  public readonly nameFilter?: string;

  @Field({ nullable: true })
  public readonly cpf?: string;

  @Field({ nullable: true })
  public readonly rg?: string;

  @Field({ nullable: true })
  public readonly birthday?: Date;

  @Field({ nullable: true })
  public readonly occupation?: string;

  @Field({ nullable: true })
  public readonly email?: string;

  @Field({ nullable: true })
  public readonly address?: string;

  @Field({ nullable: true })
  public readonly phone?: string;

  @Field({ nullable: true })
  public readonly obs?: string;

  @Field({ nullable: true })
  public readonly active?: boolean;

  @Field(() => [InterestProduct], { nullable: true })
  public readonly interestProducts?: InterestProduct[];

  @Field(() => [Origin], { nullable: true })
  public readonly origins?: Origin[];

  @Field({ nullable: true })
  public readonly createdAt?: Date;

  @Field({ nullable: true })
  public readonly architectId?: string;

  @Field(() => ArchitectEntity, { nullable: true })
  public readonly architect?: ArchitectEntity;

  constructor(params: IConstructorParams) {
    this.mid = params.mid;
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cpf = params.cpf;
    this.rg = params.rg;
    this.architectId = params.architectId;
    this.birthday = params.birthday;
    this.occupation = params.occupation;
    this.email = params.email;
    this.address = params.address;
    this.phone = params.phone;
    this.obs = params.obs;
    this.active = params.active;
    this.interestProducts = params.interestProducts;
    this.origins = params.origins;
    this.createdAt = params.createdAt;

    this.architect = params.architect;
  }
}
