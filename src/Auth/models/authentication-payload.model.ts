import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthenticationPayload {
  @Field(() => String)
  readonly accessToken: string;

  @Field(() => String)
  readonly refreshToken: string;
}
