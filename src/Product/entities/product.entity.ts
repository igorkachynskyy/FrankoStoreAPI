import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { ProductCategory } from "../../ProductCategory/entities/product-category";
import { File } from "src/File/entities/file.entity";
import { SizeEnum } from "../enums/size.enum";
import { DiscountType } from "src/DiscountType/entities/discount-type";


@ObjectType()
@Entity({ name: "Product" })
export class Product extends EntityBase<Product> {

    @Field(() => String)
    @Column('varchar', { name: "Name", unique: true, length: 255 })
    name: string;

    @Field(() => [ProductCategory])
    @ManyToMany(() => ProductCategory, { nullable: false })
    @JoinTable({ name: "PruductCategory" })
    categories: ProductCategory[];

    @Field(() => Number)
    @Column("double precision", { name: "Height" })
    height: number;

    @Field(() => Number)
    @Column("double precision", { name: "Width" })
    width: number;

    @Field(() => Number)
    @Column("double precision", { name: "Length" })
    length: number;

    @Field(() => SizeEnum)
    @Column("enum", { name: "Size", enum: SizeEnum })
    size: SizeEnum;

    @Field(() => Number)
    @Column('double precision', { name: "RetailPrice" })
    retailPrice: number;

    @Field(() => String)
    @Column('text', { name: "Description" })
    description: string;

    @Field(() => Number)
    @Column('integer', { name: "Amount", default: 0 })
    amount: number;

    @Field(() => [File])
    @ManyToMany(() => File)
    @JoinTable({ name: "ProductImage" })
    images: File[];

    @Field(() => DiscountType, { nullable: true })
    @ManyToOne(() => DiscountType, { nullable: true })
    @JoinColumn({ name: "DiscountType" })
    discountType: DiscountType;
}