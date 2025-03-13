import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

type IConstructorParams = {
  readonly mid?: string;
  readonly id?: number;
  readonly name: string;
  readonly nameFilter?: string;
  readonly cnpj?: string;
  readonly im?: string;
  readonly ie?: string;
  readonly email?: string;
  readonly address?: string;
  readonly phone?: string;
  readonly obs?: string;
  readonly active?: boolean;
};
@ObjectType()
export class SupplierEntity {
  @Field(() => ID)
  public readonly mid?: string;

  @Field(() => Int)
  public readonly id?: number;

  @Field()
  public readonly name: string;

  @Field({ nullable: true })
  public readonly nameFilter?: string;

  @Field({ nullable: true })
  public readonly cnpj?: string;

  @Field({ nullable: true })
  public readonly im?: string;

  @Field({ nullable: true })
  public readonly ie?: string;

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

  constructor(params: IConstructorParams) {
    this.mid = params.mid;
    this.id = params.id;
    this.name = params.name;
    this.nameFilter = params.nameFilter;
    this.cnpj = params.cnpj;
    this.im = params.im;
    this.ie = params.ie;
    this.email = params.email;
    this.address = params.address;
    this.phone = params.phone;
    this.obs = params.obs;
    this.active = params.active;
  }
}
