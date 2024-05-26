import { Module } from "@nestjs/common";
import { LiqPayController } from "src/LiqPay/liqpay.controller";
import { LiqPayService } from "src/LiqPay/liqpay.service";
import { OrderProduct } from "src/Order/entities/order-product.entity";
import { Order } from "src/Order/entities/order.entity";
import { OrderModule } from "src/Order/order.module";
import { DatabaseModule } from "src/common/Database/database.module";


@Module({
   imports: [DatabaseModule.forFeature([Order, OrderProduct])],
   controllers: [LiqPayController],
   providers: [LiqPayService],
   exports: [LiqPayService]
})
export class LiqPayModule {

}