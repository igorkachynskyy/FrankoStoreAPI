import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";


@InputType()
export class CreateMessageInput {

   @Field(() => String)
   @IsNotEmpty()
   @IsEmail()
   email: string;

   @Field(() => String)
   @IsNotEmpty()
   @IsPhoneNumber()
   phoneNumber: string;


   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   textMessage: string;

}