import { InputType, PartialType } from '@nestjs/graphql';
import { CreateFileInput } from './create-file.input';

@InputType()
export class UpdateFileInput extends PartialType(CreateFileInput) {}
