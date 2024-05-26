import { registerEnumType } from "@nestjs/graphql";

export enum MessageStatusEnum {
   Active = "Active",
   Readed = "Readed",
   Solved = "Solved",
   OnHold = "OnHold",
   Banned = "Banned"
}

registerEnumType(MessageStatusEnum, {
   name: 'MessageStatusEnum',
});