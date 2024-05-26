import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsNumber, Min, IsString, IsDate } from "class-validator";

@InputType()
export class FindOptionsProductCategoryInput{

    @Field(() => [Number], { nullable: true })
    @IsOptional()
    @IsNumber({}, { each: true })
    ids?: number[];

    @Field(() => String, {nullable:true})
    @IsOptional()
    @IsString()
    name?: string;

    @Field(() => Date, {nullable:true})
    @IsOptional()
    @IsDate()
    startDateRange?: Date;

    @Field(() => Date, {nullable:true})
    @IsOptional()
    @IsDate()
    endDateRange?: Date;
}