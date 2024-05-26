import { Module } from "@nestjs/common";
import { ProductCategory } from "src/ProductCategory/entities/product-category";
import { ProductCategoryResolver } from "src/ProductCategory/product-category.resolver";
import { ProductCategoryService } from "src/ProductCategory/product-category.service";
import { DatabaseModule } from "src/common/Database/database.module";

@Module({
   imports:[DatabaseModule.forFeature([ProductCategory])],
   providers:[ProductCategoryService, ProductCategoryResolver],
   exports: [ProductCategoryService]
})
export class ProductCategoryModule{}