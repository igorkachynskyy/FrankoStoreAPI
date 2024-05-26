import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Product } from "../../Product/entities/product.entity";
import { Supplier } from "src/Supplier/entities/supplier.entity";



@ObjectType()
@Entity({ name: "ProcurementInformation" })
export class ProcurementInformation extends EntityBase<ProcurementInformation>{

    @Field(() => Number)
    @Column('double precision', { name: "PurchasePrice" })
    purchasePrice: number;

    @Field(() => String)
    @Column('text', { name: "Description" })
    description: string;

    @Field(() => Number)
    @Column('integer', { name: "Amount" })
    amount: number;

    @Field(() => Product)
    @ManyToOne(() => Product)
    @JoinColumn({ name: "ProductId" })
    product: Product;

    @Field(() => Date)
    @CreateDateColumn({ name: "OrderedDate" })
    orderedDate: Date;

    @Field(() => Date, { nullable: true })
    @Column("date", { name: "DeliveredDate", nullable: true })
    deliveredDate: Date;

    @Field(() => Date)
    @Column("boolean", { name: "IsDelivered", default: false })
    isDelivered: boolean;

    @Field(() => Supplier)
    @ManyToOne(() => Supplier)
    @JoinColumn({ name: "Supplier" })
    supplier: Supplier;

}