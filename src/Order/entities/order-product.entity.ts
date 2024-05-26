import { Order } from "src/Order/entities/order.entity";
import { Product } from "src/Product/entities/product.entity";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

@Entity({ name: "OrderProduct" })
export class OrderProduct extends EntityBase<OrderProduct> {

   @ManyToOne(() => Product)
   @JoinColumn({ name: "Product" })
   product: Product;

   @ManyToOne(() => Order)
   @JoinColumn({ name: "Order" })
   order: Order;

   @Column('int', { name: "Quantity" })
   quantity: number;

   @Column('double precision', { name: "Price" })
   price: number;
}