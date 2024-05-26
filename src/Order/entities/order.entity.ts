import { Field, ObjectType } from "@nestjs/graphql";
import { ProductQuantity } from "src/Order/entities/product-quantity";
import { OrderStatusEnum } from "src/Order/enums/order-status.enum";
import { User } from "src/User/entities/user.entity";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm";

@Entity({ name: "Order" })
@ObjectType()
export class Order extends EntityBase<Order> {

   @Field(() => User)
   @ManyToOne(() => User)
   @JoinColumn({ name: "Customer" })
   customer: User;

   @Field(() => OrderStatusEnum)
   @Column('enum', { name: "Status", enum: OrderStatusEnum })
   status: OrderStatusEnum;

   @Field(() => User, { nullable: true })
   @ManyToOne(() => User, { nullable: true })
   @JoinColumn({ name: "ExecutorId" })
   executor: User;

   @Field(() => String, { nullable: true })
   @Column('text', { name: "DeliveryAddress", nullable: true })
   deliveryAddress: string;

   @Field(() => Boolean)
   @Column('boolean', { name: "IsSelfDelivery" })
   isSelfDelivery: boolean;

   @Field(() => Number)
   @Column('int', { name: "SummaryPayment" })
   summaryPayment: number;

   @Field(() => [ProductQuantity])
   products: ProductQuantity[];

   @Field(() => Date)
   @CreateDateColumn({ name: "CreatedAt" })
   createdAt: Date;

   @Field(() => Date)
   @UpdateDateColumn({ name: "UpdatedAt" })
   updatedAt: Date;

   @Field(() => String, { nullable: true })
   paymentUrl: string;

   @Field(() => Boolean, { defaultValue: false })
   isPaid: boolean;
}