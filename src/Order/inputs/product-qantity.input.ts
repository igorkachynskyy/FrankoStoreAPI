import { Field, InputType, Int } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

@InputType()
export class ProductQuantityInput {

   @Field(() => Int)
   @IsNotEmpty()
   @IsNumber()
   productId: number;

   @Field(() => Int)
   @IsNotEmpty()
   @IsNumber()
   @Min(1)
   quantity: number;
}