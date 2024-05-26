import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsBoolean, IsDate, IsOptional } from "class-validator";
import { CreateProcurementInformationInput } from "src/ProcurementInformation/inputs/create-procurement-information.input";

@InputType()
export class UpdateProcurementInformationInput extends PartialType(CreateProcurementInformationInput){

   @Field(() => Date, {nullable:true})
   @IsOptional()
   @IsDate()
   deliveredDate:Date;

   @Field(() => Date, {nullable: true})
   @IsOptional()
   @IsBoolean()
   isDelivered: boolean;
}