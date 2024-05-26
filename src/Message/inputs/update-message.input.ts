import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsEnum, IsOptional } from "class-validator";
import { MessageStatusEnum } from "src/Message/enums/message-status.entity";
import { CreateMessageInput } from "src/Message/inputs/create-message.input";


@InputType()
export class UpdateMessageInput extends PartialType(CreateMessageInput) {

   @Field(() => MessageStatusEnum)
   @IsEnum(MessageStatusEnum)
   @IsOptional()
   messageStatus?: MessageStatusEnum;
}