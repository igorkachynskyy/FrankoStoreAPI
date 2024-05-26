import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DiscountType } from "./entities/discount-type";
import { User } from "src/User/entities/user.entity";
import { DiscountTypeResolver } from "./discount-type.resolver";
import { DiscountTypeService } from "./discount-type.service";
import { Product } from "src/Product/entities/product.entity";


@Module({
    imports: [TypeOrmModule.forFeature([DiscountType, User, Product])],
    providers: [DiscountTypeResolver, DiscountTypeService]
})
export class DiscountTypeModule { }