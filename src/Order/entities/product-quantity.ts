import { Field, ObjectType } from "@nestjs/graphql";
import { Product } from "src/Product/entities/product.entity";

@ObjectType()
export class ProductQuantity {
   @Field(() => Product)
   product: Product;

   @Field(() => Number)
   quantity: number;
}