import { PrimaryGeneratedColumn } from 'typeorm';
import { ObjectBase } from './object.base';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class EntityBase<TEntity> extends ObjectBase<TEntity> {
  @Field(() => Number)
  @PrimaryGeneratedColumn({ name: 'Id' })
  id: number;
}
