import { UseGuards } from '@nestjs/common';
import { AccessJwtAuthenticationGuard } from '../guards/access-jwt-authentication.guard';
import { RoleAuthorizationGuard } from '../guards/role-authorization.guard';

export const UseAuth = () => UseGuards(AccessJwtAuthenticationGuard, RoleAuthorizationGuard);
