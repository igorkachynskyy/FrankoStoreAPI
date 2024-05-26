import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsDateString } from 'class-validator';

@InputType()
export class DateRangeInput {
   @Field(() => Date, { nullable: true })
   @IsOptional()
   @IsDateString()
   start?: Date;

   @Field(() => Date, { nullable: true })
   @IsOptional()
   @IsDateString()
   end?: Date;
}
