import { registerEnumType } from "@nestjs/graphql";

export enum SizeEnum{
    S = "S",
    M = "M",
    L = "L",
    XL = "XL",
    XXL = "XXL"
}

registerEnumType(SizeEnum, {
    name: 'SizeEnum',
  });