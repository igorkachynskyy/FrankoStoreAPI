import { InputType, PartialType } from "@nestjs/graphql";
import { CreateSupplierInput } from "src/Supplier/inputs/create-supplier.input";


@InputType()
export class UpdateSupplierInput extends PartialType(CreateSupplierInput){}