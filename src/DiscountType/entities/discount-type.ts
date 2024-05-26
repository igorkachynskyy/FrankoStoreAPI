import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity } from "typeorm";


@Entity({ name: "DiscountType" })
@ObjectType()
export class DiscountType extends EntityBase<DiscountType>{

    @Column('varchar', { name: "Name", length: 255, unique: true })
    @Field()
    name: string;

    @Column('double precision', { name: "Percentage" })
    @Field()
    percentage: number;
}