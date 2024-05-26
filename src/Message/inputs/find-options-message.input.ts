import { Field, InputType, Int } from "@nestjs/graphql";
import { IsEmail, IsNumber, IsOptional, IsPhoneNumber, IsString } from "class-validator";
import { DateRangeInput } from "src/common/filter-input-types/date-rage.input";


@InputType()
export class FindOptionsMessageInput {

   @Field(() => [Number], { nullable: true })
   @IsOptional()
   @IsNumber({}, { each: true })
   ids?: number[];

   @Field(() => [String], { nullable: true })
   @IsOptional()
   @IsEmail({}, { each: true })
   emails?: string[];

   @Field(() => [String], { nullable: true })
   @IsOptional()
   @IsPhoneNumber(null, { each: true })
   phoneNumbers?: string[];

   @Field(() => String, { nullable: true })
   @IsOptional()
   @IsString()
   search?: string;

   @Field(() => DateRangeInput, { nullable: true })
   @IsOptional()
   recevicedDate?: DateRangeInput;

   @Field(() => Int, { nullable: true })
   @IsOptional()
   @IsNumber()
   skip?: number;

   @Field(() => Int, { nullable: true })
   @IsOptional()
   @IsNumber()
   take?: number;
}