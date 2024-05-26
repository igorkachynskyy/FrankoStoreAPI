import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateSupplierInput {
   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   companyName:string;

   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   phoneNumber:string;

   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   address:string;

   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   website:string;

   @Field(() => String)
   @IsNotEmpty()
   @IsString()
   email:string;
}