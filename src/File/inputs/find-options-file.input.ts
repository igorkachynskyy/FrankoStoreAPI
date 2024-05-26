import { Field, InputType } from "@nestjs/graphql";
import { IsBase64, IsNumber, IsOptional, IsPositive, IsString, Min } from "class-validator";


@InputType()
export class FindOptionsFileInput {

    @Field(() => Number)
    @IsOptional()
    @IsNumber()
    @Min(0)
    id: number;

    @IsOptional()
    @IsBase64()
    @Field(() => String)
    file: string;

    @IsOptional()
    @IsString()
    @Field(() => String)
    fileName: string;

    @IsOptional()
    @IsString()
    @Field(() => String)
    fileExtension: string;

    @IsOptional()
    @IsPositive()
    @Field(() => Number)
    fileSize: number;
}