import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, IsString } from "class-validator";
import { FindOptionsProductInput } from "src/Product/inputs/find-options-product.input";
import { DateRangeInput } from "src/common/filter-input-types/date-rage.input";
import { NumericRangeInput } from "src/common/filter-input-types/numeric-range.input";


@InputType()
export class FindOptionsProcurementInformationInput {
   @Field(() => NumericRangeInput)
   @IsOptional()
   purchasePrice?: NumericRangeInput;

   @Field(() => String)
   @IsOptional()
   @IsString()
   description?: string;

   @Field(() => NumericRangeInput)
   @IsOptional()
   amount?: NumericRangeInput;

   @Field(() => FindOptionsProductInput)
   @IsOptional()
   product: FindOptionsProductInput;

   @Field(() => DateRangeInput)
   @IsOptional()
   orderedDate: DateRangeInput;

   @Field(() => String)
   @IsOptional()
   supplierCompanyName: string;
}