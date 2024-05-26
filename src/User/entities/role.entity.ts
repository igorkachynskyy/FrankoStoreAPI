import { Field, ObjectType } from '@nestjs/graphql';
import { EntityBase } from 'src/common/Database/bases/entity.base';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Role' })
@ObjectType()
export class Role extends EntityBase<Role> {
  @Column('varchar', { name: 'Name', unique: true })
  @Field(() => String)
  name: string;
}
