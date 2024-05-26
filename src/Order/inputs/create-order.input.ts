import { Field, InputType } from "@nestjs/graphql";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductQuantityInput } from "src/Order/inputs/product-qantity.input";
import { User } from "src/User/entities/user.entity";

@InputType()
export class CreateOrderInput {

   @Field(() => [ProductQuantityInput])
   @IsNotEmpty()
   products: ProductQuantityInput[];

   @Field(() => String, { nullable: true })
   @IsOptional()
   @IsString()
   deliveryAddress?: string;

   @Field(() => Boolean)
   @IsNotEmpty()
   @IsBoolean()
   isSelfDelivery: boolean;

   client: User;
}