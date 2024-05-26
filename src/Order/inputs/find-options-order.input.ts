import { Field, InputType, Int } from "@nestjs/graphql";
import { IsBoolean, IsEnum, IsNumber, IsOptional } from "class-validator";
import { OrderStatusEnum } from "src/Order/enums/order-status.enum";
import { DateRangeInput } from "src/common/filter-input-types/date-rage.input";
import { NumericRangeInput } from "src/common/filter-input-types/numeric-range.input";


@InputType()
export class FindOptionsOrderInput {
   @Field(() => [Number], { nullable: true })
   @IsOptional()
   @IsNumber({}, { each: true })
   ids?: number[];

   @Field(() => [Number], { nullable: true })
   @IsOptional()
   @IsNumber({}, { each: true })
   customerIds?: number[];

   @Field(() => [Number], { nullable: true })
   @IsOptional()
   @IsNumber({}, { each: true })
   executorIds?: number[];

   @Field(() => [OrderStatusEnum], { nullable: true })
   @IsOptional()
   @IsEnum(OrderStatusEnum, { each: true })
   statuses?: OrderStatusEnum[];

   @Field(() => NumericRangeInput, { nullable: true })
   @IsOptional()
   summaryPayment?: NumericRangeInput;

   @Field(() => DateRangeInput, { nullable: true })
   @IsOptional()
   createdAt?: DateRangeInput;

   @Field(() => DateRangeInput, { nullable: true })
   @IsOptional()
   updatedAt?: DateRangeInput;

   @Field(() => Int, { nullable: true })
   @IsOptional()
   @IsNumber()
   skip?: number;

   @Field(() => Int, { nullable: true })
   @IsOptional()
   @IsNumber()
   take?: number;

   @Field(() => Boolean, { nullable: true })
   @IsOptional()
   @IsBoolean()
   isPaid?: boolean;
}