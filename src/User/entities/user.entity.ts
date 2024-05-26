import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from 'src/User/entities/role.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';
import { EntityModelBase } from 'src/common/Database/bases/entity-model.base';
import { DiscountType } from 'src/DiscountType/entities/discount-type';

@Entity({ name: 'User' })
@ObjectType()
export class User extends EntityModelBase<User> {
  @Column('varchar', { name: 'Username', unique: true, length: 255 })
  @Field(() => String)
  username: string;

  @Column('varchar', { name: 'FirstName', length: 255 })
  @Field(() => String)
  firstName: string;

  @Column('varchar', { name: 'LastName', length: 255 })
  @Field(() => String)
  lastName: string;

  @Column('varchar', { name: 'Email', unique: true, length: 255 })
  @Field(() => String)
  email: string;

  @Column('varchar', { name: 'Phone', unique: true, length: 255 })
  @Field(() => String)
  phone: string;

  @Column('text', { name: 'Website', nullable: true })
  @Field(() => String, { nullable: true })
  website?: string;

  @Column('varchar', { name: 'PasswordHash', length: 100 })
  passwordHash: string;

  @ManyToMany(() => Role)
  @JoinTable({ name: 'UserRole' })
  @Field(() => [Role], { nullable: 'itemsAndList' })
  roles: Role[];

  @OneToOne(() => DiscountType, {nullable:true})
  @JoinColumn({name: "DiscountType"})
  @Field(() => DiscountType, {nullable:true})
  dicountType:DiscountType;

  @Column('boolean', { name: 'IsDeleted', nullable: true })
  isDeleted: boolean;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
