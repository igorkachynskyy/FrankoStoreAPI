import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class ResetPasswordInput {
   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   oldPassword: string;

   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   newPassword: string;
}