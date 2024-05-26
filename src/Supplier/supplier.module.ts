import { Module } from "@nestjs/common";
import { Supplier } from "src/Supplier/entities/supplier.entity";
import { SupplierResolver } from "src/Supplier/supplier.resolver";
import { SupplierService } from "src/Supplier/supplier.service";
import { DatabaseModule } from "src/common/Database/database.module";


@Module({
   imports: [DatabaseModule.forFeature([Supplier])],
   providers: [SupplierResolver, SupplierService]
})
export class SupplierModule{}