import { Field, ObjectType } from '@nestjs/graphql';
import { EntityModelBase } from 'src/common/Database/bases/entity-model.base';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'File' })
@ObjectType()
export class File extends EntityModelBase<File> {
  @Column('text', { name: 'Path' })
  @Field(() => String)
  path: string;

  @Column('int', { name: 'Size' })
  @Field(() => Number)
  size: number;

  @Column('varchar', { name: 'FileName', length: 255 })
  @Field(() => String)
  fileName: string;

  @Column('varchar', { name: 'FileExtension', length: 50 })
  @Field(() => String)
  fileExtension: string;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  @Field()
  updatedAt: Date;
}
