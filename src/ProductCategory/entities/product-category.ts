import { Field, ObjectType } from "@nestjs/graphql";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, Entity } from "typeorm";


@ObjectType()
@Entity({name: "ProductCategory"})
export class ProductCategory extends EntityBase<ProductCategory>{
    
    @Field(() => String)
    @Column('varchar',{name:"Name", unique:true, length:255})
    name:string;

    @Field(() => Date, {nullable:true})
    @Column('date', {name:"StartDateRange", nullable:true})
    startDateRange?:Date;

    @Field(() => Date, {nullable:true})
    @Column('date', {name:"EndDateRange", nullable:true})
    endDateRange?:Date;
}