import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


@InputType()
export class CreateDiscoutTypeInput{
    @IsNotEmpty()
    @IsString()
    @Field(() => String)
    name:string;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Number)
    percentage:number;
}