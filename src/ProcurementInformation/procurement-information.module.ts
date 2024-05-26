import { Module } from "@nestjs/common";
import { ProcurementInformation } from "src/ProcurementInformation/entities/procurement-information.entity";
import { ProcurementInformationResolver } from "src/ProcurementInformation/procurement-information.resolver";
import { ProcurementInformationService } from "src/ProcurementInformation/procurement-information.service";
import { Product } from "src/Product/entities/product.entity";
import { ProductModule } from "src/Product/product.module";
import { Supplier } from "src/Supplier/entities/supplier.entity";
import { DatabaseModule } from "src/common/Database/database.module";

@Module({
   imports: [DatabaseModule.forFeature([ProcurementInformation, Product, Supplier]), ProductModule],
   providers: [ProcurementInformationService, ProcurementInformationResolver]
})
export class ProcurementInformationModule { }