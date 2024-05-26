import { Module } from '@nestjs/common';
import { AuthModule } from './Auth/auth.module';
import { UserModule } from './User/user.module';
import { ConfigurationModule } from './common/Configuration/configuration.module';
import { GQLModule } from './common/GQL/gql.module';
import { DatabaseModule } from './common/Database/database.module';
import { InitModule } from './Init/init.module';
import { ProductModule } from './Product/product.module';
import { ProductCategoryModule } from 'src/ProductCategory/product-category.module';
import { SupplierModule } from 'src/Supplier/supplier.module';
import { ProcurementInformationModule } from 'src/ProcurementInformation/procurement-information.module';
import { DiscountTypeModule } from 'src/DiscountType/discount-type.module';
import { MessageModule } from 'src/Message/message.module';
import { NovaPostModule } from 'src/NovaPost/nova-post.module';
import { LiqPayModule } from 'src/LiqPay/liqpay.module';
import { OrderModule } from 'src/Order/order.module';

@Module({
  imports: [
    ConfigurationModule, GQLModule, DatabaseModule,
    InitModule, AuthModule, UserModule,
    ProductModule, ProductCategoryModule, SupplierModule, ProcurementInformationModule, DiscountTypeModule,
    MessageModule, NovaPostModule, OrderModule, LiqPayModule,
  ],
})
export class AppModule { }
