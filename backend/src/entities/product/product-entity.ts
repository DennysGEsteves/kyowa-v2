import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { ProductDescriptors } from './types';
import { SupplierEntity } from '../supplier';

type IConstructorParams = {
  readonly mid?: string;
  readonly id?: number;
  readonly name: string;
  readonly fantasyName: string;
  readonly nameFilter?: string;
  readonly ezID?: number;
  readonly ref?: string;
  readonly ncm?: string;
  readonly cst?: string;
  readonly ean?: string;
  readonly buyBrice?: number;
  readonly sellPrice?: number;
  readonly hasSeals?: boolean;
  readonly amountStart?: number;
  readonly amountSold?: number;
  readonly isAmountUnlimited?: boolean;
  readonly supplierId?: string;
  readonly descriptors: ProductDescriptors;

  readonly supplier?: SupplierEntity;
};

@ObjectType()
export class ProductEntity {
  @Field(() => ID)
  public readonly mid?: string;

  @Field(() => Int)
  public readonly id?: number;

  @Field()
  public readonly name: string;

  @Field()
  public readonly fantasyName?: string;

  @Field({ nullable: true })
  public readonly nameFilter?: string;

  @Field({ nullable: true })
  public readonly ezID?: number;

  @Field({ nullable: true })
  public readonly ref?: string;

  @Field({ nullable: true })
  public readonly ncm?: string;

  @Field({ nullable: true })
  public readonly ean?: string;

  @Field({ nullable: true })
  public readonly cst?: string;

  @Field({ nullable: true })
  public readonly buyBrice?: number;

  @Field({ nullable: true })
  public readonly sellPrice?: number;

  @Field({ nullable: true })
  public readonly hasSeals?: boolean;

  @Field({ nullable: true })
  public readonly amountStart?: number;

  @Field({ nullable: true })
  public readonly amountSold?: number;

  @Field({ nullable: true })
  public readonly isAmountUnlimited?: boolean;

  @Field({ nullable: true })
  public readonly supplierId?: string;

  @Field(() => ProductDescriptors, { nullable: true })
  public readonly descriptors?: ProductDescriptors;

  @Field(() => SupplierEntity, { nullable: true })
  public readonly supplier?: SupplierEntity;

  constructor(params: IConstructorParams) {
    this.mid = params.mid;
    this.id = params.id;
    this.name = params.name;
    this.fantasyName = params.fantasyName;
    this.nameFilter = params.nameFilter;
    this.ezID = params.ezID;
    this.ref = params.ref;
    this.ncm = params.ncm;
    this.ean = params.ean;
    this.cst = params.cst;
    this.buyBrice = params.buyBrice;
    this.sellPrice = params.sellPrice;
    this.hasSeals = params.hasSeals;
    this.amountStart = params.amountStart;
    this.amountSold = params.amountSold;
    this.isAmountUnlimited = params.isAmountUnlimited;
    this.supplierId = params.supplierId;
    this.descriptors = params.descriptors;

    this.supplier = params.supplier;
  }
}
