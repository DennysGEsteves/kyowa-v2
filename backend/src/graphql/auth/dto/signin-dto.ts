import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SigninDTO {
  @Field()
  email: string;

  @Field()
  password: string;
}
