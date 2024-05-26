import { registerEnumType } from '@nestjs/graphql';

export enum RoleEnum {
  Customer = 'Customer',
  Admin = 'Admin',
  Manager = 'Manager'
}

registerEnumType(RoleEnum, {
  name: 'RoleEnum',
});
