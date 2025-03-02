import { Field, HideField, ID, Int, ObjectType } from '@nestjs/graphql';
import { ArchitectEntity } from '../architect';
import { StoreEntity } from '../store';
import { RoleType } from './types';

interface IConstructorParams {
  readonly mid?: string;
  readonly id?: number;
  readonly email: string;
  readonly name: string;
  readonly pass?: string;
  readonly phone?: string;
  readonly login?: string;
  readonly role?: RoleType;
  readonly storeId?: string;
  readonly active?: boolean;

  readonly architects?: ArchitectEntity[];
  readonly managerStores?: StoreEntity[];
}

@ObjectType()
export class UserEntity {
  @Field(() => ID)
  public readonly mid?: string;

  @Field(() => Int)
  public readonly id?: number;

  @Field()
  public readonly email: string;

  @Field()
  public readonly name: string;

  @HideField()
  public readonly pass?: string;

  @Field({ nullable: true })
  public readonly phone?: string;

  @Field({ nullable: true })
  public readonly login?: string;

  @Field({ nullable: true })
  public readonly role?: RoleType;

  @Field({ nullable: true })
  public readonly storeId?: string;

  @Field({ nullable: true })
  public readonly active?: boolean;

  // @Field(() => [ArchitectEntity], { nullable: true })
  public readonly architects?: ArchitectEntity[];

  @Field(() => [StoreEntity], { nullable: true })
  public readonly managerStores?: StoreEntity[];

  constructor(params: IConstructorParams) {
    this.mid = params.mid;
    this.id = params.id;
    this.email = params.email;
    this.name = params.name;
    this.pass = params.pass;
    this.phone = params.phone;
    this.login = params.login;
    this.role = params.role;
    this.storeId = params.storeId;
    this.active = params.active;

    this.architects = params.architects;
    this.managerStores = params.managerStores;
  }
}
