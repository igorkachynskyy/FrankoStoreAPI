import { Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateProductInput } from "./create-product.input";
import { IsNumber, IsOptional, Min } from "class-validator";


@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
    @Field(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    amount?:number;
}