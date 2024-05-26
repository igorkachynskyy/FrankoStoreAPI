import { Field, InputType } from '@nestjs/graphql';
import { IsBase64, IsNotEmpty, IsPositive, IsString } from 'class-validator';

@InputType()
export class CreateFileInput {
  @IsNotEmpty()
  @IsBase64()
  @Field(() => String)
  file: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  fileName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  fileExtension: string;

  @IsNotEmpty()
  @IsPositive()
  @Field(() => Number)
  fileSize: number;
}
