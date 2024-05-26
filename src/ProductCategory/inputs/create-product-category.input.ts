import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";


@InputType()
export class CreateProductCategoryInput {

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    name: string;

    @Field(() => Date, {nullable:true})
    @IsOptional()
    @IsDate()
    startDateRange?: Date;

    @Field(() => Date, {nullable:true})
    @IsOptional()
    @IsDate()
    endDateRange?: Date;
}