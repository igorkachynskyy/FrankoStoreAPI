import { PrimaryGeneratedColumn } from 'typeorm';
import { ObjectBase } from './object.base';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class EntityModelBase<TEntityModel> extends ObjectBase<TEntityModel> {
  @PrimaryGeneratedColumn({ name: 'Id' })
  @Field(() => Int)
  id: number;
}
