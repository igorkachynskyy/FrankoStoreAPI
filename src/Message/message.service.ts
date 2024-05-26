import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Message } from "src/Message/entities/message.entity";
import { MessageStatusEnum } from "src/Message/enums/message-status.entity";
import { CreateMessageInput } from "src/Message/inputs/create-message.input";
import { FindOptionsMessageInput } from "src/Message/inputs/find-options-message.input";
import { UpdateMessageInput } from "src/Message/inputs/update-message.input";
import { Between, FindOptionsWhere, In, Like, Repository } from "typeorm";


@Injectable()
export class MessageService {
   constructor(
      @InjectRepository(Message)
      private readonly messageRepository: Repository<Message>
   ) { }


   async getAllMessages(findOptions?: FindOptionsMessageInput) {

      const where: FindOptionsWhere<Message> = {};

      if (findOptions?.ids) {
         where.id = In(findOptions.ids);
      }

      if (findOptions?.emails) {
         where.email = In(findOptions.emails);
      }

      if (findOptions?.phoneNumbers) {
         where.phoneNumber = In(findOptions.phoneNumbers);
      }

      if (findOptions?.recevicedDate) {
         where.receivedDate = Between(findOptions.recevicedDate.start ?? new Date(), findOptions.recevicedDate.end)
      }

      if (findOptions?.search) {
         where.textMessage = Like(`%${findOptions.search}%`)
      }

      return this.messageRepository.find({ where: where, skip: findOptions?.skip, take: findOptions?.take })
   }

   async sentMessage(message: CreateMessageInput) {
      const newMessage = new Message({
         ...message,
         messageStatus: MessageStatusEnum.Active
      })

      return this.messageRepository.save(newMessage);
   }

   async updateMessage(message: UpdateMessageInput, messageId: number) {
      const newMessage = await this.messageRepository.findOne({ where: { id: messageId } })
      if (!newMessage) throw new BadRequestException("No message with such id!");

      newMessage.messageStatus = message.messageStatus ?? newMessage.messageStatus;

      return this.messageRepository.save(newMessage);
   }
}