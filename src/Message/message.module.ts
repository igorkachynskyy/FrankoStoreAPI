import { Module } from "@nestjs/common";
import { Message } from "src/Message/entities/message.entity";
import { MessageResolver } from "src/Message/message.resolver";
import { MessageService } from "src/Message/message.service";
import { DatabaseModule } from "src/common/Database/database.module";


@Module({
   imports: [DatabaseModule.forFeature([Message])],
   providers: [MessageService, MessageResolver]
})
export class MessageModule { }