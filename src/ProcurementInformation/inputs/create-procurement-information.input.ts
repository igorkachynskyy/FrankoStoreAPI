import { Field, InputType } from "@nestjs/graphql";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

@InputType()
export class CreateProcurementInformationInput{
  
  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  purchasePrice:number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  description:string;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  amount:number;

  @Field(() => Number)
  @IsNotEmpty()
  @IsNumber()
  productId:number;

  @Field(() => Date)
  @IsNotEmpty()
  @IsDate()
  orderedDate:Date;

  @Field(() => Number)
  @IsNotEmpty()
  supplierId: number;
}