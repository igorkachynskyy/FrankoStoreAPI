import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Min } from "class-validator";

@InputType()
export class NumericRangeInput {
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(0)
  min?: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Min(0)
  max?: number;
}