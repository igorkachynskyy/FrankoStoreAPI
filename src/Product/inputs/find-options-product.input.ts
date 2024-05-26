import { Field, InputType, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, IsString, IsNumber, Min, IsEnum,} from "class-validator";
import { SizeEnum } from "../enums/size.enum";
import { FindOptionsProductCategoryInput } from "../../ProductCategory/inputs/find-options-product-category.input";
import { NumericRangeInput } from "src/common/filter-input-types/numeric-range.input";


@InputType()
export class FindOptionsProductInput{
    @Field(() => [Number], { nullable: true })
    @IsOptional()
    @IsNumber({}, { each: true })
    ids?: number[];

    @Field(() => String, {nullable:true})
    @IsOptional()
    @IsString()
    name?:string;

    @Field(() => NumericRangeInput, {nullable:true})
    @IsOptional()
    retailPrice?:NumericRangeInput;

    @Field(() => String, {nullable:true})
    @IsOptional()
    @IsString()
    description?:string;

    @Field(() => NumericRangeInput, {nullable:true})
    @IsOptional()
    height?:NumericRangeInput;

    @Field(() => NumericRangeInput, {nullable:true})
    @IsOptional()
    width?:NumericRangeInput;

    @Field(() => NumericRangeInput, {nullable:true})
    @IsOptional()
    length?:NumericRangeInput;

    @Field(() => [SizeEnum], { nullable: true })
    @IsOptional()
    @IsEnum(SizeEnum, { each: true })
    sizes?: SizeEnum[];

    @Field(() => NumericRangeInput, {nullable:true})
    @IsOptional()
    amount?:NumericRangeInput;

    @Field(() => FindOptionsProductCategoryInput, {nullable:true})
    @IsOptional()
    @Type(() => FindOptionsProductCategoryInput)
    categories?:FindOptionsProductCategoryInput;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    skip?: number;

    @Field(() => Int, { nullable: true })
    @IsOptional()
    @IsNumber()
    take?: number;
}