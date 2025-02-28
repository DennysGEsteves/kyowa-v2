import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SigninDTOPresenter {
  @Field(() => String)
  access_token: string;
}
