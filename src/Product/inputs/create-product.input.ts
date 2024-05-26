import { Field, InputType } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { CreateFileInput } from "src/File/inputs/create-file.input";
import { CreateProductCategoryInput } from "../../ProductCategory/inputs/create-product-category.input";
import { SizeEnum } from "../enums/size.enum";


@InputType()
export class CreateProductInput{
    
    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    name:string;
    
    @Field(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    retailPrice:number;

    @Field(() => String)
    @IsNotEmpty()
    @IsString()
    description:string;

    @Field(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    height:number;

    @Field(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    width:number;

    @Field(() => Number)
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    length:number;

    @Field(() => SizeEnum)
    @IsNotEmpty()
    @IsEnum(SizeEnum)
    size:SizeEnum;

    @Field(() => [CreateProductCategoryInput])
    @IsArray()
    @ArrayNotEmpty()
    @ValidateNested({each:true})
    @Type(() => CreateProductCategoryInput)
    categories:CreateProductCategoryInput[]

    @Field(() => [CreateFileInput])
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => CreateFileInput)
    images:CreateFileInput[];
}