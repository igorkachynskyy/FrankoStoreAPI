import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUrl} from 'class-validator';
import { RoleEnum } from 'src/User/enums/role.enum';

@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Field(() => String)
  phone: string;

  @IsOptional()
  @IsUrl()
  @Field(() => String, { nullable: true })
  website?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @IsArray()
  @IsEnum(RoleEnum, { each: true })
  @Field(() => [RoleEnum])
  roles: RoleEnum[];
}
