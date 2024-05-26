import { Field, ObjectType } from "@nestjs/graphql";
import { MessageStatusEnum } from "src/Message/enums/message-status.entity";
import { EntityBase } from "src/common/Database/bases/entity.base";
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";


@Entity({ name: "Message" })
@ObjectType()
export class Message extends EntityBase<Message> {

   @Field(() => String)
   @Column('varchar', { name: "Email", length: 255 })
   email: string;

   @Field(() => String)
   @Column('varchar', { name: "PhoneNumber", length: 50 })
   phoneNumber: string;


   @Field(() => String)
   @Column('text', { name: "TextMassage" })
   textMessage: string;

   @Field(() => MessageStatusEnum)
   @Column('enum', { name: "MessageStatus", enum: MessageStatusEnum })
   messageStatus: MessageStatusEnum

   @Field(() => Date)
   @CreateDateColumn({ name: "ReceivedDate" })
   receivedDate: Date;

}