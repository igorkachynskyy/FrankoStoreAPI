import { Module } from "@nestjs/common";
import { LiqPayModule } from "src/LiqPay/liqpay.module";
import { OrderProduct } from "src/Order/entities/order-product.entity";
import { Order } from "src/Order/entities/order.entity";
import { OrderResolver } from "src/Order/order.resolver";
import { OrderService } from "src/Order/order.service";
import { Product } from "src/Product/entities/product.entity";
import { ProductModule } from "src/Product/product.module";
import { DatabaseModule } from "src/common/Database/database.module";


@Module({
   imports: [DatabaseModule.forFeature([Order, OrderProduct, Product]), ProductModule, LiqPayModule],
   providers: [OrderService, OrderResolver]
})
export class OrderModule { }