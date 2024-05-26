import { registerEnumType } from "@nestjs/graphql";


export enum OrderActionEnum {
   Capture = 'capture',
   Release = 'release'
}


registerEnumType(OrderActionEnum, {
   name: 'OrderActionEnum',
});