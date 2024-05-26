import { Field, InputType, Int } from "@nestjs/graphql";
import { IsOptional } from "class-validator";
import { User } from "src/User/entities/user.entity";


@InputType()
export class UpdateOrderInput {
   @Field(() => Int)
   @IsOptional()
   executorId: number;
}