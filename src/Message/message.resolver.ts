import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AccessJwtAuthenticationGuard } from "src/Auth/guards/access-jwt-authentication.guard";
import { Message } from "src/Message/entities/message.entity";
import { CreateMessageInput } from "src/Message/inputs/create-message.input";
import { FindOptionsMessageInput } from "src/Message/inputs/find-options-message.input";
import { UpdateMessageInput } from "src/Message/inputs/update-message.input";
import { MessageService } from "src/Message/message.service";


@Resolver()
@UseGuards(AccessJwtAuthenticationGuard)
export class MessageResolver {
   constructor(
      private readonly messageService: MessageService
   ) { }

   @Query(() => [Message])
   async getMessages(@Args('findOptions', { nullable: true }) findOptions: FindOptionsMessageInput) {
      return await this.messageService.getAllMessages(findOptions);
   }

   @Mutation(() => Message)
   async sentMessage(@Args('message') message: CreateMessageInput) {
      return await this.messageService.sentMessage(message);
   }

   @Mutation(() => Message)
   async updateMessage(@Args('message') message: UpdateMessageInput, @Args('id') messageId: number) {
      return await this.messageService.updateMessage(message, messageId);
   }
}