import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class ProductDescriptorsInput {
  @Field()
  category: string;

  @Field()
  unit: string;

  @Field()
  colord: string;

  @Field()
  size: string;

  @Field()
  design: string;

  @Field()
  shape: string;

  @Field()
  origin: string;

  @Field()
  model: string;

  @Field()
  height: string;
}

@InputType()
export class UpsertProductDTO {
  @Field(() => ID, { nullable: true })
  mid?: string;

  @Field()
  name: string;

  @Field()
  fantasyName?: string;

  @Field({ nullable: true })
  nameFilter?: string;

  @Field({ nullable: true })
  ezID?: number;

  @Field({ nullable: true })
  ref?: string;

  @Field({ nullable: true })
  ncm?: string;

  @Field({ nullable: true })
  ean?: string;

  @Field({ nullable: true })
  cst?: string;

  @Field({ nullable: true })
  buyBrice?: number;

  @Field({ nullable: true })
  sellPrice?: number;

  @Field({ nullable: true })
  hasSeals?: boolean;

  @Field({ nullable: true })
  amountStart?: number;

  @Field({ nullable: true })
  amountSold?: number;

  @Field({ nullable: true })
  isAmountUnlimited?: boolean;

  @Field({ nullable: true })
  supplierId?: string;

  @Field(() => ProductDescriptorsInput, { nullable: true })
  descriptors?: ProductDescriptorsInput;
}
