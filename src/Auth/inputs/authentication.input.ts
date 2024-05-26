import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AuthenticationInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  login: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;
}
