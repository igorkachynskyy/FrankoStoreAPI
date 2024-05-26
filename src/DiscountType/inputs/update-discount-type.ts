import { InputType, PartialType } from "@nestjs/graphql";
import { CreateDiscoutTypeInput } from "./create-discount-type";


@InputType()
export class UpdateDiscountTypeInput extends PartialType(CreateDiscoutTypeInput){}